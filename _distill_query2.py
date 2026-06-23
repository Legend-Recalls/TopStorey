import sqlite3, json, time, sys

db = sqlite3.connect(r'C:\Users\Administrator\.local\share\mimocode\mimocode.db')
db.row_factory = sqlite3.Row

# Get all sessions in last 30 days
cutoff = (time.time() - 30*86400) * 1000
sessions = db.execute('''
    SELECT id, project_id, title, time_created, directory
    FROM session 
    WHERE time_created > ?
    ORDER BY time_created DESC
''', (cutoff,)).fetchall()

session_ids = [s['id'] for s in sessions]

print('=== SESSION TITLES ===')
for s in sessions:
    ts = time.strftime('%Y-%m-%d %H:%M', time.localtime(s['time_created'] / 1000))
    title = (s['title'] or 'No title')[:80]
    print(f"  {ts} | {s['id']} | {title}")

print()

# Get user messages to understand intent
print('=== USER MESSAGES (last 30 days) ===')
placeholders = ','.join(['?' for _ in session_ids])
user_msgs = db.execute(f'''
    SELECT m.session_id, m.time_created,
           substr(json_extract(m.data, '$.content'), 1, 500) as content
    FROM message m
    WHERE json_extract(m.data, '$.role') = 'user'
      AND m.session_id IN ({placeholders})
    ORDER BY m.time_created ASC
''', session_ids).fetchall()

for um in user_msgs:
    ts = time.strftime('%Y-%m-%d %H:%M', time.localtime(um['time_created'] / 1000))
    content = (um['content'] or '').replace('\n', ' ')[:300]
    print(f"  [{um['session_id']}] {ts}: {content}")

print()

# Get assistant tool call summaries (what actions were taken)
print('=== ASSISTANT TOOL CALLS (grouped by tool) ===')
tool_counts = db.execute(f'''
    SELECT json_extract(p.data, '$.tool') as tool,
           count(*) as n
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND m.session_id IN ({placeholders})
    GROUP BY tool
    ORDER BY n DESC
''', session_ids).fetchall()

for tc in tool_counts:
    tool = tc['tool'] or 'unknown'
    print(f"  {tool}: {tc['n']}x")

print()

# Look at write operations specifically (files created/modified)
print('=== FILE WRITE OPERATIONS ===')
writes = db.execute(f'''
    SELECT json_extract(p.data, '$.tool') as tool,
           json_extract(p.data, '$.state.input') as input_data,
           m.session_id,
           m.time_created
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND json_extract(p.data, '$.tool') = 'write'
      AND m.session_id IN ({placeholders})
    ORDER BY m.time_created DESC
''', session_ids).fetchall()

for w in writes:
    ts = time.strftime('%Y-%m-%d %H:%M', time.localtime(w['time_created'] / 1000))
    try:
        inp = json.loads(w['input_data'])
        fp = inp.get('filePath', 'unknown')
    except:
        fp = 'parse error'
    print(f"  [{w['session_id']}] {ts} -> {fp}")

print()

# Look at edit operations
print('=== FILE EDIT OPERATIONS ===')
edits = db.execute(f'''
    SELECT json_extract(p.data, '$.state.input') as input_data,
           m.session_id,
           m.time_created
    FROM message m
    JOIN part p ON p.message_id = m.id
    WHERE json_extract(m.data, '$.role') = 'assistant'
      AND json_extract(p.data, '$.type') = 'tool'
      AND json_extract(p.data, '$.tool') = 'edit'
      AND m.session_id IN ({placeholders})
    ORDER BY m.time_created DESC
''', session_ids).fetchall()

for e in edits:
    ts = time.strftime('%Y-%m-%d %H:%M', time.localtime(e['time_created'] / 1000))
    try:
        inp = json.loads(e['input_data'])
        fp = inp.get('filePath', 'unknown')
    except:
        fp = 'parse error'
    print(f"  [{e['session_id']}] {ts} -> {fp}")

print()

# Check memory files for patterns
print('=== MEMORY CONTENT ===')
import os, glob as g

memory_root = r'C:\Users\Administrator\.local\share\mimocode\memory'
for root, dirs, files in os.walk(memory_root):
    for f in files:
        if f.endswith('.md'):
            fp = os.path.join(root, f)
            rel = os.path.relpath(fp, memory_root)
            try:
                with open(fp, 'r', encoding='utf-8') as fh:
                    content = fh.read()
                print(f"\n--- {rel} ({len(content)} bytes) ---")
                print(content[:1000])
            except:
                pass

db.close()
