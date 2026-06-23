import sqlite3, json, time, sys

db = sqlite3.connect(r'C:\Users\Administrator\.local\share\mimocode\mimocode.db')
db.row_factory = sqlite3.Row

# Inspect key table schemas
for tbl in ['session', 'message', 'part', 'task', 'task_event', 'actor_registry', 'project']:
    print(f'=== SCHEMA: {tbl} ===')
    cols = db.execute(f'PRAGMA table_info({tbl})').fetchall()
    for c in cols:
        print(f"  {c['name']} ({c['type']}) {'PK' if c['pk'] else ''}")
    print()

# Get recent sessions (last 30 days)
cutoff = (time.time() - 30*86400) * 1000  # ms
print('=== RECENT SESSIONS (last 30 days) ===')
sessions = db.execute('''
    SELECT id, project_id, time_created
    FROM session 
    WHERE time_created > ?
    ORDER BY time_created DESC
    LIMIT 30
''', (cutoff,)).fetchall()

session_ids = []
for s in sessions:
    ts = time.strftime('%Y-%m-%d %H:%M', time.localtime(s['time_created'] / 1000))
    print(f"  id={s['id']} project={s['project_id']} time={ts}")
    session_ids.append(s['id'])

print(f"\nTotal recent sessions: {len(session_ids)}")
print()

# If no recent sessions, try ALL sessions
if not session_ids:
    print('=== ALL SESSIONS (most recent 20) ===')
    sessions = db.execute('''
        SELECT id, project_id, time_created
        FROM session 
        ORDER BY time_created DESC
        LIMIT 20
    ''').fetchall()
    for s in sessions:
        ts = time.strftime('%Y-%m-%d %H:%M', time.localtime(s['time_created'] / 1000))
        print(f"  id={s['id']} project={s['project_id']} time={ts}")
        session_ids.append(s['id'])
    print(f"\nTotal sessions found: {len(session_ids)}")
    print()

if not session_ids:
    print("No sessions found at all. Stopping.")
    db.close()
    sys.exit(0)

# Tool usage patterns
placeholders = ','.join(['?' for _ in session_ids])
print('=== TOOL USAGE PATTERNS ===')
try:
    tool_usage = db.execute(f'''
        SELECT json_extract(p.data, '$.tool') as tool,
               substr(json_extract(p.data, '$.state.input'), 1, 200) as input_preview,
               count(*) as n
        FROM message m
        JOIN part p ON p.message_id = m.id
        WHERE json_extract(m.data, '$.role') = 'assistant'
          AND json_extract(p.data, '$.type') = 'tool'
          AND m.session_id IN ({placeholders})
        GROUP BY tool, input_preview
        ORDER BY n DESC
        LIMIT 50
    ''', session_ids).fetchall()

    for t in tool_usage:
        tool = t['tool'] or 'unknown'
        inp = (t['input_preview'] or '')[:150]
        print(f"  [{t['n']}x] {tool}: {inp}")
except Exception as e:
    # Try with correct column name
    print(f"  Error with session_id column: {e}")
    # Check message table columns
    msg_cols = db.execute("PRAGMA table_info(message)").fetchall()
    print("  message columns:", [c['name'] for c in msg_cols])

print()

# Messages per session
print('=== MESSAGES PER SESSION ===')
try:
    msg_counts = db.execute(f'''
        SELECT m.session_id, count(*) as cnt,
               sum(case when json_extract(m.data, '$.role') = 'user' then 1 else 0 end) as user_msgs,
               sum(case when json_extract(m.data, '$.role') = 'assistant' then 1 else 0 end) as asst_msgs
        FROM message m
        WHERE m.session_id IN ({placeholders})
        GROUP BY m.session_id
        ORDER BY cnt DESC
    ''', session_ids).fetchall()

    for mc in msg_counts:
        print(f"  session={mc['session_id']} total={mc['cnt']} user={mc['user_msgs']} assistant={mc['asst_msgs']}")
except Exception as e:
    print(f"  Error: {e}")

print()

# User keyword search
print('=== USER MESSAGES WITH KEYWORDS ===')
keywords = ['again', 'every time', 'like last time', 'the usual', 'repeat', 'same as before', 'same as']
for kw in keywords:
    try:
        results = db.execute(f'''
            SELECT substr(json_extract(m.data, '$.content'), 1, 300) as msg,
                   m.session_id,
                   m.time_created
            FROM message m
            WHERE json_extract(m.data, '$.role') = 'user'
              AND m.session_id IN ({placeholders})
              AND json_extract(m.data, '$.content') LIKE ?
            ORDER BY m.time_created DESC
            LIMIT 5
        ''', session_ids + [f'%{kw}%']).fetchall()
        if results:
            print(f"\n  Keyword '{kw}':")
            for r in results:
                ts = time.strftime('%Y-%m-%d %H:%M', time.localtime(r['time_created'] / 1000))
                print(f"    [{r['session_id']}] {ts}: {(r['msg'] or '')[:200]}")
    except:
        pass

db.close()
