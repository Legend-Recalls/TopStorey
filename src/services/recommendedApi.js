import { supabase } from './supabaseClient'

/**
 * Recommended Properties configuration client (public frontend).
 *
 * Reads a single settings row (id = 1) from the `recommended_properties`
 * table. This table is written to by the admin panel to control which
 * properties are pinned to the top of the recommended rail on subpages,
 * and on which page types the rail appears.
 *
 * The frontend only ever READS this table (RLS allows public SELECT), so
 * this client exposes a single getConfig() helper with a defensive
 * fail-safe: if Supabase is unreachable or the table is missing, we
 * resolve with permissive defaults so the rail still renders using the
 * auto-fill property pool and no page is ever broken.
 */

// Defaults used when the row is absent or the fetch fails. All page types
// enabled and no pinned properties (rail shows the plain auto-fill list).
export const DEFAULT_CONFIG = Object.freeze({
  pinnedPropertyIds: [],
  enabledPropertyPage: true,
  enabledStoryPage: true,
  enabledEventPage: true,
})

const TABLE = 'recommended_properties'

function mapRow(row) {
  if (!row) return { ...DEFAULT_CONFIG }
  return {
    pinnedPropertyIds: Array.isArray(row.pinned_property_ids)
      ? row.pinned_property_ids.filter((id) => typeof id === 'string')
      : [],
    enabledPropertyPage: row.enabled_property_page !== false,
    enabledStoryPage: row.enabled_story_page !== false,
    enabledEventPage: row.enabled_event_page !== false,
  }
}

export const recommendedApi = {
  /**
   * Fetch the recommended-properties configuration.
   * Always resolves (never rejects) with a normalized config object.
   */
  async getConfig() {
    try {
      const { data, error } = await supabase
        .from(TABLE)
        .select(
          'pinned_property_ids, enabled_property_page, enabled_story_page, enabled_event_page',
        )
        .eq('id', 1)
        .maybeSingle()

      if (error) throw error
      return mapRow(data)
    } catch (err) {
      console.warn(
        '[topstorey] Failed to load recommended properties config; using defaults.',
        err,
      )
      return { ...DEFAULT_CONFIG }
    }
  },
}

export default recommendedApi
