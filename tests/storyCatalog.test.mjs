import test from 'node:test'
import assert from 'node:assert/strict'

import {
  allStories,
  getRelatedStories,
  getStoryBySlug,
  homepageStoryGroups,
  storyPath,
} from '../src/data/storyCatalog.js'
import { getImageShape } from '../src/utils/imageShape.js'

test('homepage story surfaces expose unique routeable slugs', () => {
  const slugs = allStories.map((story) => story.slug)
  assert.equal(new Set(slugs).size, slugs.length)

  const homepageCards = [
    ...homepageStoryGroups.latest,
    ...homepageStoryGroups.featured,
    ...homepageStoryGroups.trending,
  ]

  assert.ok(homepageCards.length >= 9)

  for (const card of homepageCards) {
    assert.equal(storyPath(card.slug), `/stories/${card.slug}`)
    assert.equal(getStoryBySlug(card.slug)?.title, card.title)
  }
})

test('lead story detail has article sections for newspaper-style rendering', () => {
  const story = getStoryBySlug('indias-next-real-estate-cycle-discipline-demand')

  assert.ok(story)
  assert.match(story.title, /discipline/i)
  assert.ok(story.deck.length > 80)
  assert.ok(story.byline.name)
  assert.ok(story.publishedLabel)
  assert.ok(story.sections.length >= 5)
  assert.ok(story.keyFacts.length >= 4)
  assert.ok(story.pullQuote.quote.length > 40)
})

test('related stories exclude the current story and prefer shared taxonomy', () => {
  const related = getRelatedStories('indias-next-real-estate-cycle-discipline-demand', 3)

  assert.equal(related.length, 3)
  assert.ok(related.every((story) => story.slug !== 'indias-next-real-estate-cycle-discipline-demand'))
  assert.ok(related.some((story) => story.taxonomy.includes('Markets')))
})

test('story image shape classification supports common article media ratios', () => {
  assert.equal(getImageShape(2400, 900), 'panorama')
  assert.equal(getImageShape(1600, 1000), 'landscape')
  assert.equal(getImageShape(1200, 1200), 'square')
  assert.equal(getImageShape(900, 1400), 'portrait')
  assert.equal(getImageShape(0, 1400), 'unknown')
})
