export const featuredStories = [
  {
    category: "Policy & Regulation",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    title: "Rate easing is changing buyer timing, but not in the way developers expected.",
    meta: "85K views \u00b7 4 min read",
    summary: "A closer read on financing sentiment, launch discipline, and how policy noise is feeding selective demand.",
  },
  {
    category: "Cities | Bengaluru",
    image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80",
    title: "Peripheral growth is no longer a fringe story. Infrastructure sequencing now decides pricing power.",
    meta: "41K views \u00b7 5 min read",
    summary: "Where absorption is real, where speculation is outrunning fundamentals, and which micro-markets are diverging.",
  },
  {
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80",
    title: "Office demand is stabilising, yet leasing headlines still hide asset-quality dispersion.",
    meta: "37K views \u00b7 4 min read",
    summary: "Top Storey tracks what headline leasing numbers miss: tenant mix, location resilience, and replacement risk.",
  },
]

export const leadStory = {
  category: "Lead Story | Markets",
  image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80",
  title: "India\u2019s next real estate cycle will be decided by discipline, not just demand.",
  summary: "Developers are launching into a more selective market. Capital is rewarding credibility over noise. The next phase belongs to platforms that can separate narrative from evidence.",
}

export const sideLeadStories = [
  {
    category: "Cities | Mumbai Metropolitan Region",
    image: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80",
    title: "Inventory is rising, but genuine premium scarcity is still localised.",
  },
  {
    category: "Commercial",
    image: "https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80",
    title: "Office recovery stories keep improving, though asset-quality dispersion remains sharp.",
  },
]

export const marketColumns = [
  {
    heading: "Residential",
    items: ["Affordable", "Luxury/Premium", "Second Homes", "Senior Living", "Farmhouses"],
  },
  {
    heading: "Commercial",
    items: ["Retail", "Malls/High Streets", "REITs"],
  },
  {
    heading: "Analytical Coverage",
    items: ["Mixed-use Development", "Land Development", "Policy & Regulation", "Trends & Cycles"],
  },
  {
    heading: "Other Asset Classes",
    items: ["Co-living", "Co-working", "Student Housing"],
  },
]

export const mostRead = [
  {
    label: "Most clicked",
    title: "Why premium launches are holding velocity while mass housing demand fragments.",
    meta: "62K views \u00b7 4 min read",
  },
  {
    label: "Most shared",
    title: "What the latest land deals actually reveal about developer risk appetite.",
    meta: "49K views \u00b7 6 min read",
  },
  {
    label: "Most discussed",
    title: "Is branded real estate research becoming marketing theatre or public utility?",
    meta: "44K views \u00b7 5 min read",
  },
]

export const tickerItems = [
  "Policy watch: approval velocity is reshaping launch timing across major urban markets.",
  "Capital flows: investors are getting more selective on execution credibility and land discipline.",
  "Cities: infrastructure sequencing is now a bigger pricing variable than headline supply.",
  "Commercial: leasing recovery remains uneven across asset quality and micro-market depth.",
  "Research: Top Storey tracks what promotional narratives leave out of the market cycle.",
]

interface NavChildGroup {
  label: string
  items: string[]
}

export interface NavItemData {
  label: string
  href: string
  children?: NavChildGroup[]
}

export const navItems: NavItemData[] = [
  { label: "Latest", href: "#latest" },
  { label: "Featured", href: "#featured" },
  {
    label: "Cities",
    href: "#cities",
    children: [
      { label: "Metro Watch", items: ["Delhi/NCR", "Mumbai Metropolitan Region", "Bengaluru", "Hyderabad"] },
      { label: "Growth Corridors", items: ["Pune", "Chennai", "Kolkata", "Emerging Markets"] },
    ],
  },
  {
    label: "Markets",
    href: "#markets",
    children: [
      { label: "Residential", items: ["Affordable", "Luxury/Premium", "Second Homes", "Senior Living", "Farmhouses"] },
      { label: "Commercial", items: ["Retail", "Malls/High Streets", "REITs"] },
      { label: "Intelligence", items: ["Mixed-use Development", "Land Development", "Policy & Regulation", "Trends & Cycles"] },
      { label: "Alternative Living", items: ["Co-living", "Co-working", "Student Housing"] },
    ],
  },
  {
    label: "Conversations",
    href: "#conversations",
    children: [
      { label: "Formats", items: ["Developer Interviews", "Investor Perspectives", "Policy Voices"] },
      { label: "Studio", items: ["Industry Leaders", "Roundtables (Video Podcast)"] },
    ],
  },
  {
    label: "Events",
    href: "#events",
    children: [
      { label: "Calendar", items: ["Upcoming Events", "Past Events", "Roundtables", "Webinars"] },
      { label: "Collaborations", items: ["Partnerships / Tie ups / Announcements"] },
    ],
  },
  {
    label: "About",
    href: "#about",
    children: [
      { label: "Inside TopStorey", items: ["Our Philosophy", "Editorial Policy", "Approach & Methodology", "Contact"] },
    ],
  },
]

export const aboutLinks = [
  {
    title: "Our Philosophy",
    description: "A clearer explanation of what Top Storey stands for and how the platform operates.",
  },
  {
    title: "Editorial Policy",
    description: "Our approach, thought process, and methodology behind selecting and curating stories.",
  },
  {
    title: "Contact",
    description: "Reach out to the newsroom for tips, partnerships, or editorial enquiries.",
  },
]

export const footerSections = {
  sections: [
    { label: "Latest News", href: "#latest" },
    { label: "Featured Reports", href: "#featured" },
    { label: "Market Analysis", href: "#markets" },
    { label: "City Data", href: "#search" },
    { label: "Podcasts", href: "#conversations" },
  ],
  company: [
    { label: "About Us", href: "#about" },
    { label: "Editorial Board", href: "#about" },
    { label: "Careers", href: "#" },
    { label: "Contact", href: "#about" },
    { label: "Advertise", href: "#" },
  ],
  legal: [
    { label: "Terms of Service", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Cookie Policy", href: "#" },
    { label: "Accessibility", href: "#" },
  ],
}
