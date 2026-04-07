import {
  Masthead,
  Navigation,
  NewsTicker,
  HeroSection,
  StoryList,
  MostRead,
  Markets,
  Cities,
  Conversations,
  Events,
  About,
  ContactCard,
  Footer,
} from './components'

const latestStories = [
  {
    category: 'Policy & Regulation',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    title: 'Rate easing is changing buyer timing, but not in the way developers expected.',
    meta: '85K views • 4 min read',
    summary:
      'A closer read on financing sentiment, launch discipline, and how policy noise is feeding selective demand.',
  },
  {
    category: 'Cities | Bengaluru',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    title: 'Peripheral growth is no longer a fringe story. Infrastructure sequencing now decides pricing power.',
    meta: '41K views • 5 min read',
    summary:
      'Where absorption is real, where speculation is outrunning fundamentals, and which micro-markets are diverging.',
  },
  {
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    title: 'Office demand is stabilising, yet leasing headlines still hide asset-quality dispersion.',
    meta: '37K views • 4 min read',
    summary:
      'Top Storey tracks what headline leasing numbers miss: tenant mix, location resilience, and replacement risk.',
  },
]

const leadStory = {
  category: 'Lead Story | Markets',
  image:
    'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80',
  title: "India's next real estate cycle will be decided by discipline, not just demand.",
  summary:
    'Developers are launching into a more selective market, buyers are scrutinising execution more closely, and capital is rewarding credibility over noise. The next phase belongs to platforms that can separate narrative from evidence.',
}

const sideLeadStories = [
  {
    category: 'Cities | Mumbai Metropolitan Region',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    title: 'Inventory is rising, but genuine premium scarcity is still localised.',
  },
  {
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80',
    title: 'Office recovery stories keep improving, though asset-quality dispersion remains sharp.',
  },
]

const featuredReports = [
  'Research-driven reports from journalists, analysts, and sector specialists.',
  'Data-backed perspectives on developers, projects, capital flows, and structural shifts.',
  'Long-form analysis designed to outlast the news cycle.',
]

const marketColumns = [
  {
    heading: 'Residential',
    items: ['Affordable', 'Luxury/Premium', 'Second Homes', 'Senior Living', 'Farmhouses'],
  },
  {
    heading: 'Commercial',
    items: ['Retail', 'Malls/High Streets', 'REITs'],
  },
  {
    heading: 'Analytical Coverage',
    items: [
      'Mixed-use Development',
      'Land Development',
      'Policy & Regulation',
      'Trends & Cycles',
    ],
  },
  {
    heading: 'Other Asset Classes',
    items: ['Co-living', 'Co-working', 'Student Housing'],
  },
]

const cities = [
  'Delhi/NCR',
  'Mumbai Metropolitan Region',
  'Bengaluru',
  'Hyderabad',
  'Pune',
  'Chennai',
  'Kolkata',
  'Emerging Markets',
]

const conversations = [
  {
    title: 'Navigating Distressed Assets in 2024',
    type: 'Podcast',
    episode: 'Ep. 162',
    image:
      'https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80',
  },
  {
    title: 'Interview: CEO of Blackstone on European Expansion',
    meta: '45 min listen • Hosted by L. Sterling',
  },
  {
    title: 'Panel: Sustainable Building Materials & ESG Compliance',
    meta: '52 min listen • Industry panel',
  },
]

const events = [
  {
    title: 'Global Real Estate Leaders Summit 2024',
    label: 'Live Summit',
    location: 'London, UK (Hybrid)',
    description:
      'Join 500+ institutional investors and developers for a two-day macro-economic briefing.',
    cta: 'Register Now',
    countdown: [
      { value: '14', unit: 'Days' },
      { value: '08', unit: 'Hours' },
      { value: '45', unit: 'Mins' },
      { value: '22', unit: 'Secs' },
    ],
  },
  {
    month: 'Nov',
    day: '12',
    title: 'Webinar: Asian Markets Q4 Outlook',
    meta: 'Virtual • Free for subscribers',
  },
]

const mostRead = [
  {
    label: 'Most clicked',
    title: 'Why premium launches are holding velocity while mass housing demand fragments.',
    meta: '62K views • 4 min read',
  },
  {
    label: 'Most shared',
    title: 'What the latest land deals actually reveal about developer risk appetite.',
    meta: '49K views • 6 min read',
  },
  {
    label: 'Most discussed',
    title: 'Is branded real estate research becoming marketing theatre or public utility?',
    meta: '44K views • 5 min read',
  },
]

const tickerItems = [
  'Policy watch: approval velocity is reshaping launch timing across major urban markets.',
  'Capital flows: investors are getting more selective on execution credibility and land discipline.',
  'Cities: infrastructure sequencing is now a bigger pricing variable than headline supply.',
  'Commercial: leasing recovery remains uneven across asset quality and micro-market depth.',
  'Research: Top Storey tracks what promotional narratives leave out of the market cycle.',
]

const navItems = [
  { label: 'Latest', href: '#latest' },
  { label: 'Featured', href: '#featured' },
  {
    label: 'Markets',
    href: '#markets',
    children: [
      'Residential',
      'Affordable',
      'Luxury/Premium',
      'Second Homes',
      'Senior Living',
      'Farmhouses',
      'Commercial',
      'Retail',
      'Malls/High Streets',
      'REITs',
      'Mixed-use Development',
      'Land Development',
      'Policy & Regulation',
      'Trends & Cycles',
      'Co-living',
      'Co-working',
      'Student Housing',
    ],
  },
  {
    label: 'Cities',
    href: '#cities',
    children: cities,
  },
  {
    label: 'Conversations',
    href: '#conversations',
    children: [
      'Developer Interviews',
      'Investor Perspectives',
      'Policy Voices',
      'Industry Leaders',
      'Roundtables (Video Podcast)',
    ],
  },
  {
    label: 'Events',
    href: '#events',
    children: [
      'Upcoming Events',
      'Past Events',
      'Roundtables',
      'Webinars',
      'Partnerships / Tie ups / Announcements',
    ],
  },
  {
    label: 'About',
    href: '#about',
    children: [
      'Our Philosophy',
      'Editorial Policy',
      'Approach & Methodology',
      'Contact',
    ],
  },
]

const aboutLinks = [
  {
    title: 'Our Philosophy',
    description: 'A clearer explanation of what Top Storey stands for and how the platform operates.',
  },
  {
    title: 'Editorial Policy',
    description: 'Our approach, thought process, and methodology behind selecting and curating stories.',
  },
  {
    title: 'Contact',
    description: 'A clearer explanation of what Top Storey stands for and how the platform operates.',
  },
]

const footerSections = {
  sections: ['Latest News', 'Featured Reports', 'Market Analysis', 'City Data', 'Podcasts'],
  company: ['About Us', 'Editorial Board', 'Careers', 'Contact', 'Advertise'],
  legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility'],
}

export default function App() {
  return (
    <div className="page-shell">
      <header className="hero">
        <Masthead />
        <NewsTicker items={tickerItems} />
        <Navigation items={navItems} />
        <HeroSection leadStory={leadStory} sideStories={sideLeadStories} />
      </header>

      <main className="news-layout">
        <section className="section main-column" id="latest">
          <div className="section-heading">
            <p className="eyebrow">Latest</p>
            <h2>The most recent stories and market updates across the real estate sector.</h2>
          </div>

          <StoryList stories={latestStories} />
        </section>

        <aside className="sidebar-column">
          <section className="section sidebar-section">
            <div className="section-heading compact-heading">
              <p className="eyebrow">Most Read</p>
              <h2>What is resonating with readers right now.</h2>
            </div>
            <MostRead items={mostRead} />
            <a href="#featured" className="sidebar-link">
              View all trending stories
            </a>
          </section>
        </aside>

        <section className="section split-band" id="featured">
          <div className="section-heading">
            <p className="eyebrow">Featured</p>
            <h2>Research-led reports and insight grounded in evidence, not industry theatre.</h2>
          </div>
          <div className="bullet-card">
            {featuredReports.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </section>

        <section className="section" id="markets">
          <div className="section-heading">
            <p className="eyebrow">Markets</p>
            <h2>Coverage organised by asset class, cycle, and sector dynamics.</h2>
          </div>
          <Markets columns={marketColumns} />
        </section>

        <section className="section split-band" id="cities">
          <div className="section-heading">
            <p className="eyebrow">Cities</p>
            <h2>Geography-led analysis with region-specific search and reporting depth.</h2>
          </div>
          <Cities cities={cities} />
        </section>

        <section className="section split-section" id="conversations">
          <div className="section-heading">
            <p className="eyebrow">Conversations</p>
            <h2>Interviews, opinions, and debate from across the industry.</h2>
          </div>
          <Conversations items={conversations} />
        </section>

        <section className="section split-section" id="events">
          <div className="section-heading">
            <p className="eyebrow">Events</p>
            <h2>Upcoming forums, archived sessions, and newsroom-led industry engagement.</h2>
          </div>
          <Events items={events} />
        </section>

        <section className="section approach-section" id="about">
          <About links={aboutLinks} />
          <ContactCard
            title="Independent journalism with accountability built into the frame."
            description="In an industry often shaped by promotion, Top Storey is positioned as an analytical newsroom. The product should feel like a publication first."
            bullets={['Rigorous journalism', 'Disciplined research', 'Market-grounded analysis']}
          />
        </section>
      </main>

      <Footer sections={footerSections} />
    </div>
  )
}
