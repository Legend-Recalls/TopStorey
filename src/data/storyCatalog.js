const authors = {
  newsroom: {
    name: 'Top Storey Newsroom',
    role: 'Market Desk',
  },
  markets: {
    name: 'Aarav Menon',
    role: 'Markets Editor',
  },
  cities: {
    name: 'Meera Sanyal',
    role: 'Cities Correspondent',
  },
  capital: {
    name: 'Rhea Kapoor',
    role: 'Capital Markets Analyst',
  },
}

const leadSections = [
  {
    heading: 'Demand Is No Longer Enough',
    paragraphs: [
      'The next phase of India real estate will not be settled by broad demand alone. Household formation, office absorption, and infrastructure investment remain powerful, but buyers and capital providers are asking sharper questions about delivery, pricing discipline, and balance-sheet resilience.',
      'That shift changes the tone of the market. Launch calendars still look active, yet the strongest projects are increasingly those where title clarity, construction sequencing, and end-user depth can be demonstrated without relying on promotional momentum.',
    ],
  },
  {
    heading: 'Capital Is Repricing Trust',
    paragraphs: [
      'Institutional capital has not left the sector. It has become more selective. The premium now sits with platforms that can prove execution history across cycles, especially in locations where infrastructure promises have often run ahead of ground reality.',
      'For developers, this means the market is rewarding patience as much as ambition. Land banks that once looked like optionality now invite scrutiny unless approvals, financing, and product-market fit are visible together.',
    ],
  },
  {
    heading: 'City Markets Are Splitting',
    paragraphs: [
      'Within the same metropolitan region, two micro-markets can now behave like different economies. A corridor with completed transit, employment density, and social infrastructure can sustain pricing power, while a nearby speculative belt may need discounts to move inventory.',
      'The result is a more complicated cycle than the headline numbers suggest. National demand can look healthy even as individual neighbourhoods show stress, and the reverse is also true in premium pockets with limited credible supply.',
    ],
  },
  {
    heading: 'Policy Still Sets The Clock',
    paragraphs: [
      'Approval velocity is becoming one of the least visible but most important variables in launch timing. Developers with cleaner processes can move while demand is present; those with unresolved permissions risk entering the market after buyer sentiment has cooled.',
      'This matters because the cost of delay has increased. Construction finance, land carrying costs, and customer expectations now leave less room for slow conversion from land to saleable product.',
    ],
  },
  {
    heading: 'What To Watch Next',
    paragraphs: [
      'The clearest signal over the next few quarters will be whether sales velocity remains tied to launch excitement or settles around delivered credibility. Watch repeat buyers, cancellation rates, and the spread between quoted and transacted prices.',
      'The market is not turning defensive. It is becoming more demanding. That is a healthier story, but it is also a less forgiving one.',
    ],
  },
]

const genericSections = {
  finance: [
    {
      heading: 'Financing Sentiment Is Turning Selective',
      paragraphs: [
        'Cheaper credit can lift buyer confidence, but it does not lift every project equally. Lenders and households are still differentiating between visible delivery and optimistic launch narratives.',
        'The result is a market where timing matters less as a blanket call and more as a test of project credibility, local price elasticity, and the buyer profile being targeted.',
      ],
    },
    {
      heading: 'Launch Discipline Matters',
      paragraphs: [
        'Developers with deep pipelines are spacing launches more carefully, especially in markets where competing supply is beginning to rise. That discipline is less dramatic than a volume surge, but it is more durable.',
        'The strongest operators are using rate relief to protect absorption rather than stretch pricing beyond what end-users can justify.',
      ],
    },
    {
      heading: 'The Buyer Lens',
      paragraphs: [
        'For buyers, the key question is whether lower financing costs improve affordability enough to offset higher ticket sizes. In premium housing, the answer depends heavily on location and delivery confidence.',
        'In mass housing, the calculation is tighter. Even modest price increases can erase the benefit of softer rates if income growth has not kept pace.',
      ],
    },
  ],
  cities: [
    {
      heading: 'Infrastructure Is The Real Filter',
      paragraphs: [
        'Peripheral growth is no longer a single story. Corridors with road, transit, schools, hospitals, and employment access are beginning to separate from corridors that still depend mainly on future promises.',
        'This distinction is now visible in sales conversations. Buyers are asking not only what is planned, but what is funded, under construction, and already changing commute patterns.',
      ],
    },
    {
      heading: 'Speculation Has A Shorter Runway',
      paragraphs: [
        'Land-led enthusiasm can still move early prices, but it has less room to run when mortgage costs and rental alternatives remain part of the decision. Developers are being pushed to prove livability earlier in the cycle.',
        'The best-performing micro-markets are therefore not always the newest. They are often the places where infrastructure has quietly moved from announcement to habit.',
      ],
    },
    {
      heading: 'Local Detail Beats City Averages',
      paragraphs: [
        'Citywide absorption numbers can hide a great deal of variation. A single metro can contain oversupplied mid-market pockets, scarce premium inventory, and emerging rental-led corridors at the same time.',
        'For investors and homebuyers alike, the useful question is no longer whether a city is rising. It is which part of the city has the evidence to support the price being asked.',
      ],
    },
  ],
  commercial: [
    {
      heading: 'The Recovery Is Uneven',
      paragraphs: [
        'Office demand has improved, but the recovery is not evenly distributed across buildings or districts. Tenants are prioritising Grade A assets with transport access, power reliability, and operating resilience.',
        'This leaves older or poorly located stock facing a harder reset, even when aggregate leasing numbers suggest a broad rebound.',
      ],
    },
    {
      heading: 'Quality Is The New Headline',
      paragraphs: [
        'Headline square footage tells only part of the story. Tenant mix, lease tenure, expansion options, and replacement risk now matter more than simple occupancy claims.',
        'Owners who can invest in asset upgrades are better placed to hold rents, while weaker assets may need concessions to compete.',
      ],
    },
    {
      heading: 'Institutional Demand Stays Focused',
      paragraphs: [
        'Capital remains interested in commercial real estate, especially assets that can support predictable income. But underwriting is now more sensitive to tenant concentration and renewal risk.',
        'The strongest portfolios are being judged by durability, not just scale.',
      ],
    },
  ],
  policy: [
    {
      heading: 'Approvals Are A Market Variable',
      paragraphs: [
        'Regulatory timing has become a material part of project strategy. Where permissions move predictably, developers can match launches to demand windows with greater confidence.',
        'Where approvals stall, the delay can reshape pricing, financing, and even product design before the project reaches buyers.',
      ],
    },
    {
      heading: 'Clearer Rules Reward Prepared Operators',
      paragraphs: [
        'Greater transparency does not remove friction for everyone. It tends to favour operators with documentation discipline, cleaner land pipelines, and teams that can manage compliance without slowing execution.',
        'That advantage is now visible in how quickly some developers can convert market interest into credible supply.',
      ],
    },
    {
      heading: 'The Cost Of Delay Is Rising',
      paragraphs: [
        'The market has less patience for vague timelines. Customers, lenders, and partners now price delays more quickly than they did in the previous cycle.',
        'As a result, approval velocity is becoming a quiet but decisive measure of competitiveness.',
      ],
    },
  ],
  capital: [
    {
      heading: 'Execution Is Being Underwritten First',
      paragraphs: [
        'Capital remains available, but it is no longer responding to scale alone. Investors want evidence that land, approvals, construction, and sales velocity can be managed together.',
        'This has raised the bar for platforms that once relied on growth narratives without consistent delivery proof.',
      ],
    },
    {
      heading: 'Governance Is Moving Up The Stack',
      paragraphs: [
        'Governance is becoming a commercial advantage. Cleaner reporting, sharper risk controls, and transparent project-level economics can reduce the uncertainty premium attached to real estate platforms.',
        'The strongest sponsors are treating governance as part of the product, not a back-office obligation.',
      ],
    },
    {
      heading: 'Patience Has Limits',
      paragraphs: [
        'Investors can tolerate long cycles when the path is legible. They are less tolerant of avoidable opacity, repeated delays, or land pipelines that cannot be converted into cash flow.',
        'That distinction is likely to define which platforms can raise capital on favourable terms.',
      ],
    },
  ],
  editorial: [
    {
      heading: 'A Research Product Must Prove Its Distance',
      paragraphs: [
        'Real estate coverage sits close to commercial interest, which makes editorial distance especially important. Readers need to know when a story is analysis, when it is access, and when it is promotion.',
        'The publications that earn trust will be those that make their method visible without turning every article into a disclaimer.',
      ],
    },
    {
      heading: 'The Market Needs Better Questions',
      paragraphs: [
        'Better journalism does not mean louder opinion. It means asking what a claim depends on, who benefits if it is accepted, and what evidence would change the conclusion.',
        'That approach is slower than promotional coverage, but it is more useful for readers making high-stakes decisions.',
      ],
    },
    {
      heading: 'Trust Compounds Slowly',
      paragraphs: [
        'A publication earns authority one accurate, well-framed story at a time. In real estate, that means following up after launch announcements and tracking what actually happened.',
        'The discipline is simple: do not let the first version of a market narrative become the last.',
      ],
    },
  ],
}

function makeStory({
  slug,
  title,
  category,
  image,
  summary,
  meta,
  label,
  taxonomy,
  author = authors.newsroom,
  deck,
  publishedLabel = 'Monday, May 24, 2026',
  readTime = '5 min read',
  views = '42K views',
  sections,
  keyFacts,
  pullQuote,
}) {
  return {
    slug,
    title,
    category,
    image,
    summary,
    meta: meta ?? `${views} - ${readTime}`,
    label,
    taxonomy,
    byline: author,
    deck,
    publishedLabel,
    readTime,
    views,
    sections,
    keyFacts,
    pullQuote,
  }
}

export const allStories = [
  makeStory({
    slug: 'indias-next-real-estate-cycle-discipline-demand',
    category: 'Lead Story | Markets',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80',
    title: "India's next real estate cycle will be decided by discipline, not just demand.",
    summary:
      'Developers are launching into a more selective market. Capital is rewarding credibility over noise. The next phase belongs to platforms that can separate narrative from evidence.',
    taxonomy: ['Markets', 'Residential', 'Capital'],
    author: authors.markets,
    deck:
      'Developers are entering a market where demand remains real, but buyers and capital providers are rewarding proof over projection. The next cycle belongs to platforms that can turn narrative into verified execution.',
    readTime: '6 min read',
    views: '91K views',
    sections: leadSections,
    keyFacts: [
      { label: 'Primary signal', value: 'Execution discipline' },
      { label: 'Risk marker', value: 'Approval delays' },
      { label: 'Capital mood', value: 'Selective but active' },
      { label: 'Watch list', value: 'Cancellation rates and quoted-price gaps' },
    ],
    pullQuote: {
      quote:
        'The market is not turning defensive. It is becoming more demanding, and that makes credibility the scarce asset.',
      attribution: 'Top Storey market desk',
    },
  }),
  makeStory({
    slug: 'inventory-rising-premium-scarcity-localised',
    category: 'Cities | Mumbai Metropolitan Region',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    title: 'Inventory is rising, but genuine premium scarcity is still localised.',
    summary:
      'New supply is widening buyer choice, yet the premium pockets with access, views, and delivery credibility remain far tighter than metro-level inventory numbers suggest.',
    taxonomy: ['Cities', 'Residential', 'Markets'],
    author: authors.cities,
    deck:
      'Metro-wide inventory growth is masking a sharper split between ordinary supply and the few premium pockets where location, access, and credible delivery still create scarcity.',
    sections: genericSections.cities,
    keyFacts: [
      { label: 'City lens', value: 'Mumbai Metropolitan Region' },
      { label: 'Buyer focus', value: 'Premium scarcity' },
      { label: 'Pressure point', value: 'Rising unsold stock' },
      { label: 'Reading', value: 'Local detail beats metro averages' },
    ],
    pullQuote: {
      quote:
        'Inventory is not the same as choice when only a small share of projects meet the premium buyer test.',
      attribution: 'Cities desk',
    },
  }),
  makeStory({
    slug: 'office-recovery-asset-quality-dispersion',
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80',
    title: 'Office recovery stories keep improving, though asset-quality dispersion remains sharp.',
    summary:
      'Leasing momentum is healthier, but Grade A assets and weaker office stock are now moving through different versions of the recovery.',
    taxonomy: ['Commercial', 'Markets'],
    author: authors.markets,
    deck:
      'The office recovery is real, but it is not evenly shared. Tenants are concentrating demand in better buildings while older stock faces a more difficult reset.',
    sections: genericSections.commercial,
    keyFacts: [
      { label: 'Sector', value: 'Commercial office' },
      { label: 'Tenant lens', value: 'Grade A preference' },
      { label: 'Risk', value: 'Replacement demand' },
      { label: 'Signal', value: 'Lease quality over headline area' },
    ],
    pullQuote: {
      quote:
        'The recovery headline is getting better, but the gap between strong and weak assets is becoming harder to ignore.',
      attribution: 'Commercial desk',
    },
  }),
  makeStory({
    slug: 'approval-velocity-hidden-variable-launch-timing',
    category: 'Policy & Regulation',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    title: 'Approval velocity is becoming the hidden variable behind launch timing.',
    summary:
      'Regulatory clarity is not just reducing friction. It is reshaping which developers can convert land into credible supply.',
    taxonomy: ['Policy & Regulation', 'Markets'],
    author: authors.newsroom,
    deck:
      'In a more selective cycle, the speed and certainty of approvals can determine whether developers meet demand or arrive after sentiment has moved on.',
    sections: genericSections.policy,
    keyFacts: [
      { label: 'Variable', value: 'Approval velocity' },
      { label: 'Market impact', value: 'Launch timing' },
      { label: 'Advantage', value: 'Cleaner documentation' },
      { label: 'Cost', value: 'Delayed demand conversion' },
    ],
    pullQuote: {
      quote:
        'Approvals are no longer just a compliance step. They are part of the market clock.',
      attribution: 'Policy desk',
    },
  }),
  makeStory({
    slug: 'peripheral-growth-corridors-infrastructure-led-demand',
    category: 'Residential | Bengaluru',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80',
    title: 'Peripheral growth corridors are separating infrastructure-led demand from speculation.',
    summary:
      'Absorption is becoming more selective as buyers distinguish delivery confidence from corridor storytelling.',
    taxonomy: ['Cities', 'Residential', 'Bengaluru'],
    author: authors.cities,
    deck:
      'Bengaluru growth corridors are being sorted by evidence. Completed links, employment access, and social infrastructure now matter more than optimistic geography.',
    sections: genericSections.cities,
    keyFacts: [
      { label: 'City', value: 'Bengaluru' },
      { label: 'Theme', value: 'Peripheral growth' },
      { label: 'Demand filter', value: 'Infrastructure readiness' },
      { label: 'Buyer question', value: 'What is already usable?' },
    ],
    pullQuote: {
      quote:
        'The corridor story only holds when the commute, the school run, and the workday begin to make sense together.',
      attribution: 'Cities desk',
    },
  }),
  makeStory({
    slug: 'investor-patience-thinning-execution-discipline',
    category: 'Capital Markets',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    title: 'Investor patience is thinning for platforms that cannot prove execution discipline.',
    summary:
      'Capital is still available, but underwriting now rewards governance, delivery history, and cleaner land pipelines.',
    taxonomy: ['Capital', 'Markets'],
    author: authors.capital,
    deck:
      'Investors are still looking at real estate, but the tolerance for vague timelines and hard-to-verify land pipelines is narrowing quickly.',
    sections: genericSections.capital,
    keyFacts: [
      { label: 'Capital mood', value: 'Selective' },
      { label: 'Underwriting focus', value: 'Execution history' },
      { label: 'Governance role', value: 'Commercial advantage' },
      { label: 'Risk marker', value: 'Opaque pipelines' },
    ],
    pullQuote: {
      quote:
        'Capital can wait for a long cycle, but it is less willing to wait for an unclear one.',
      attribution: 'Capital markets desk',
    },
  }),
  makeStory({
    slug: 'rate-easing-changing-buyer-timing',
    category: 'Policy & Regulation',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    title: 'Rate easing is changing buyer timing, but not in the way developers expected.',
    summary:
      'A closer read on financing sentiment, launch discipline, and how policy noise is feeding selective demand.',
    meta: '85K views - 4 min read',
    taxonomy: ['Policy & Regulation', 'Residential'],
    author: authors.markets,
    deck:
      'Rate easing is improving buyer confidence, but the benefit is flowing unevenly toward projects that already have pricing discipline and delivery credibility.',
    sections: genericSections.finance,
    keyFacts: [
      { label: 'Signal', value: 'Selective buyer timing' },
      { label: 'Policy lens', value: 'Rate easing' },
      { label: 'Developer test', value: 'Launch discipline' },
      { label: 'Buyer risk', value: 'Affordability gap' },
    ],
    pullQuote: {
      quote:
        'Cheaper borrowing helps, but it does not rescue a project whose price or timeline already asks too much.',
      attribution: 'Markets editor',
    },
  }),
  makeStory({
    slug: 'peripheral-growth-infrastructure-sequencing-pricing-power',
    category: 'Cities | Bengaluru',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    title: 'Peripheral growth is no longer a fringe story. Infrastructure sequencing now decides pricing power.',
    summary:
      'Where absorption is real, where speculation is outrunning fundamentals, and which micro-markets are diverging.',
    meta: '41K views - 5 min read',
    taxonomy: ['Cities', 'Bengaluru', 'Residential'],
    author: authors.cities,
    deck:
      'Peripheral markets are becoming central to the city story, but pricing power now depends on the order in which infrastructure, employment, and social amenities arrive.',
    sections: genericSections.cities,
    keyFacts: [
      { label: 'Market', value: 'Bengaluru outskirts' },
      { label: 'Driver', value: 'Infrastructure sequencing' },
      { label: 'Risk', value: 'Speculative pricing' },
      { label: 'Opportunity', value: 'Evidence-led corridors' },
    ],
    pullQuote: {
      quote:
        'A growth corridor becomes investable when the sequence of everyday life begins to work.',
      attribution: 'Cities desk',
    },
  }),
  makeStory({
    slug: 'office-demand-stabilising-leasing-headlines-hide-dispersion',
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    title: 'Office demand is stabilising, yet leasing headlines still hide asset-quality dispersion.',
    summary:
      'Top Storey tracks what headline leasing numbers miss: tenant mix, location resilience, and replacement risk.',
    meta: '37K views - 4 min read',
    taxonomy: ['Commercial', 'Markets'],
    author: authors.markets,
    deck:
      'Stabilising office demand is welcome, but aggregate leasing data can still hide the assets carrying most of the risk.',
    sections: genericSections.commercial,
    keyFacts: [
      { label: 'Sector', value: 'Office' },
      { label: 'Hidden split', value: 'Asset quality' },
      { label: 'Tenant focus', value: 'Location resilience' },
      { label: 'Investor lens', value: 'Renewal risk' },
    ],
    pullQuote: {
      quote:
        'The leasing number is the start of the story. The tenant mix and asset quality decide how durable it is.',
      attribution: 'Commercial desk',
    },
  }),
  makeStory({
    slug: 'premium-launches-holding-velocity-mass-housing-fragments',
    category: 'Residential',
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    label: 'Most clicked',
    title: 'Why premium launches are holding velocity while mass housing demand fragments.',
    summary:
      'Premium buyers are still moving when supply is credible, while mass-market demand remains more exposed to affordability and financing pressure.',
    meta: '62K views - 4 min read',
    taxonomy: ['Residential', 'Markets'],
    author: authors.markets,
    deck:
      'Premium housing continues to show resilience in select pockets, but the broader mass-market segment is more sensitive to ticket sizes, income growth, and financing conditions.',
    sections: genericSections.finance,
    keyFacts: [
      { label: 'Segment', value: 'Residential' },
      { label: 'Strength', value: 'Premium velocity' },
      { label: 'Weakness', value: 'Mass-market affordability' },
      { label: 'Signal', value: 'Buyer income confidence' },
    ],
    pullQuote: {
      quote:
        'Premium resilience is not a blanket signal. It is concentrated where the product and location justify the ticket size.',
      attribution: 'Residential desk',
    },
  }),
  makeStory({
    slug: 'latest-land-deals-developer-risk-appetite',
    category: 'Capital Markets',
    image:
      'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?auto=format&fit=crop&w=1200&q=80',
    label: 'Most shared',
    title: 'What the latest land deals actually reveal about developer risk appetite.',
    summary:
      'Recent acquisitions show where developers are willing to take duration risk and where they are backing away from speculative bets.',
    meta: '49K views - 6 min read',
    taxonomy: ['Capital', 'Land Development', 'Markets'],
    author: authors.capital,
    deck:
      'Land transactions are becoming a clearer signal of confidence. The important question is not only where developers are buying, but what assumptions those purchases require.',
    sections: genericSections.capital,
    keyFacts: [
      { label: 'Asset', value: 'Land' },
      { label: 'Signal', value: 'Risk appetite' },
      { label: 'Constraint', value: 'Approval clarity' },
      { label: 'Investor watch', value: 'Conversion timeline' },
    ],
    pullQuote: {
      quote:
        'A land deal is a thesis written in capital. The quality of that thesis depends on how quickly it can become product.',
      attribution: 'Capital markets desk',
    },
  }),
  makeStory({
    slug: 'branded-real-estate-research-marketing-theatre-public-utility',
    category: 'Editorial',
    image:
      'https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80',
    label: 'Most discussed',
    title: 'Is branded real estate research becoming marketing theatre or public utility?',
    summary:
      'As research becomes part of brand positioning, the industry needs clearer lines between evidence, access, and promotion.',
    meta: '44K views - 5 min read',
    taxonomy: ['Editorial', 'Research', 'Markets'],
    author: authors.newsroom,
    deck:
      'Real estate research is becoming central to brand trust, but that makes editorial method and disclosure more important rather than less.',
    sections: genericSections.editorial,
    keyFacts: [
      { label: 'Theme', value: 'Editorial trust' },
      { label: 'Risk', value: 'Marketing theatre' },
      { label: 'Reader need', value: 'Evidence and method' },
      { label: 'Publication test', value: 'Visible distance' },
    ],
    pullQuote: {
      quote:
        'Research earns authority when it can explain its evidence, not when it simply borrows the costume of analysis.',
      attribution: 'Editorial desk',
    },
  }),
]

const latestStorySlugs = [
  'indias-next-real-estate-cycle-discipline-demand',
  'inventory-rising-premium-scarcity-localised',
  'office-recovery-asset-quality-dispersion',
  'approval-velocity-hidden-variable-launch-timing',
  'peripheral-growth-corridors-infrastructure-led-demand',
  'investor-patience-thinning-execution-discipline',
]

const featuredStorySlugs = [
  'rate-easing-changing-buyer-timing',
  'peripheral-growth-infrastructure-sequencing-pricing-power',
  'office-demand-stabilising-leasing-headlines-hide-dispersion',
]

const trendingStorySlugs = [
  'premium-launches-holding-velocity-mass-housing-fragments',
  'latest-land-deals-developer-risk-appetite',
  'branded-real-estate-research-marketing-theatre-public-utility',
]

export const storyPath = (slug) => `/stories/${slug}`

export function getStoryBySlug(slug) {
  return allStories.find((story) => story.slug === slug) ?? null
}

function pickCards(slugs) {
  return slugs.map((slug) => {
    const story = getStoryBySlug(slug)

    return {
      slug: story.slug,
      category: story.category,
      image: story.image,
      title: story.title,
      meta: story.meta,
      summary: story.summary,
      label: story.label,
    }
  })
}

export const homepageStoryGroups = {
  latest: pickCards(latestStorySlugs),
  featured: pickCards(featuredStorySlugs),
  trending: pickCards(trendingStorySlugs),
}

export function getRelatedStories(slug, limit = 3) {
  const current = getStoryBySlug(slug)

  if (!current) {
    return allStories.slice(0, limit)
  }

  return allStories
    .filter((story) => story.slug !== slug)
    .map((story) => {
      const shared = story.taxonomy.filter((tag) => current.taxonomy.includes(tag)).length
      return { story, shared }
    })
    .sort((a, b) => b.shared - a.shared || a.story.title.localeCompare(b.story.title))
    .slice(0, limit)
    .map(({ story }) => story)
}
