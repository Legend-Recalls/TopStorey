import { useState, useEffect, useLayoutEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import {
  Masthead,
  NewsTicker,
  HeroSection,
  FeaturedTrendingSection,
  StudioSection,
  Markets,
  PropertySearch,
  About,
  ContactCard,
  Footer,
} from './components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollCoordinator } from './hooks/useScrollCoordinator'
import { StoryPage } from './pages/StoryPage'
import ceoFounderImage from './static/images.jpg'

gsap.registerPlugin(ScrollTrigger)

const featuredStories = [
  {
    category: 'Policy & Regulation',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    title: 'Rate easing is changing buyer timing, but not in the way developers expected.',
    slug: 'rate-easing-changing-buyer-timing',
    meta: '85K views · 4 min read',
    summary:
      'A closer read on financing sentiment, launch discipline, and how policy noise is feeding selective demand.',
  },
  {
    category: 'Cities | Bengaluru',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1200&q=80',
    title: 'Peripheral growth is no longer a fringe story. Infrastructure sequencing now decides pricing power.',
    slug: 'peripheral-growth-infrastructure-sequencing-pricing-power',
    meta: '41K views · 5 min read',
    summary:
      'Where absorption is real, where speculation is outrunning fundamentals, and which micro-markets are diverging.',
  },
  {
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1200&q=80',
    title: 'Office demand is stabilising, yet leasing headlines still hide asset-quality dispersion.',
    slug: 'office-demand-stabilising-leasing-headlines-hide-dispersion',
    meta: '37K views · 4 min read',
    summary:
      'Top Storey tracks what headline leasing numbers miss: tenant mix, location resilience, and replacement risk.',
  },
]

const latestStories = [
  {
    category: 'Lead Story | Markets',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?auto=format&fit=crop&w=1600&q=80',
    title: "India's next real estate cycle will be decided by discipline, not just demand.",
    slug: 'indias-next-real-estate-cycle-discipline-demand',
    summary:
      'Developers are launching into a more selective market. Capital is rewarding credibility over noise. The next phase belongs to platforms that can separate narrative from evidence.',
  },
  {
    category: 'Cities | Mumbai Metropolitan Region',
    image:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=1200&q=80',
    title: 'Inventory is rising, but genuine premium scarcity is still localised.',
    slug: 'inventory-rising-premium-scarcity-localised',
  },
  {
    category: 'Commercial',
    image:
      'https://images.unsplash.com/photo-1497366412874-3415097a27e7?auto=format&fit=crop&w=1200&q=80',
    title: 'Office recovery stories keep improving, though asset-quality dispersion remains sharp.',
    slug: 'office-recovery-asset-quality-dispersion',
  },
  {
    category: 'Policy & Regulation',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
    title: 'Approval velocity is becoming the hidden variable behind launch timing.',
    slug: 'approval-velocity-hidden-variable-launch-timing',
    summary:
      'Regulatory clarity is not just reducing friction. It is reshaping which developers can convert land into credible supply.',
  },
  {
    category: 'Residential | Bengaluru',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1600&q=80',
    title: 'Peripheral growth corridors are separating infrastructure-led demand from speculation.',
    slug: 'peripheral-growth-corridors-infrastructure-led-demand',
    summary:
      'Absorption is becoming more selective as buyers distinguish delivery confidence from corridor storytelling.',
  },
  {
    category: 'Capital Markets',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1600&q=80',
    title: 'Investor patience is thinning for platforms that cannot prove execution discipline.',
    slug: 'investor-patience-thinning-execution-discipline',
    summary:
      'Capital is still available, but underwriting now rewards governance, delivery history, and cleaner land pipelines.',
  },
]

const marketColumns = [
  {
    heading: 'Residential',
    eyebrow: 'Asset Class 01',
    framing: 'Where households, capital, and policy converge — the deepest, most cyclical pool we cover.',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80',
    items: [
      { label: 'Affordable', note: 'Mass-market, sub-₹50L' },
      { label: 'Luxury / Premium', note: '₹5Cr+ stock' },
      { label: 'Second Homes', note: 'Leisure & hill' },
      { label: 'Senior Living', note: 'Care-integrated' },
      { label: 'Farmhouses', note: 'Peri-urban land plays' },
    ],
    stat: { value: '47%', label: 'of total coverage' },
  },
  {
    heading: 'Commercial',
    eyebrow: 'Asset Class 02',
    framing: 'Yield, scale, institutionalisation — the segment driving REIT-listed liquidity.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    items: [
      { label: 'Retail', note: 'High-street & strata' },
      { label: 'Malls / High Streets', note: 'Anchored centres' },
      { label: 'REITs', note: 'Listed real estate' },
    ],
    stat: { value: '₹1.4T', label: 'tracked AUM' },
  },
  {
    heading: 'Analytical Coverage',
    eyebrow: 'Asset Class 03',
    framing: 'Cross-cutting themes — the variables shaping every other segment we cover.',
    image:
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1400&q=80',
    items: [
      { label: 'Mixed-use Development', note: 'Vertical urbanism' },
      { label: 'Land Development', note: 'Title, FAR, FSI' },
      { label: 'Policy & Regulation', note: 'RERA, GST, FDI' },
      { label: 'Trends & Cycles', note: 'Macro & demand' },
    ],
    stat: { value: '24', label: 'sub-themes mapped' },
  },
  {
    heading: 'Other Asset Classes',
    eyebrow: 'Asset Class 04',
    framing: 'Operator-led, lease-light — the segments redefining how space gets used.',
    image:
      'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1400&q=80',
    items: [
      { label: 'Co-living', note: 'Managed residential' },
      { label: 'Co-working', note: 'Flex office' },
      { label: 'Student Housing', note: 'Tier-1 university hubs' },
    ],
    stat: { value: '3.2x', label: 'YoY coverage growth' },
  },
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
    meta: '45 min listen · Hosted by L. Sterling',
  },
  {
    title: 'Panel: Sustainable Building Materials & ESG Compliance',
    meta: '52 min listen · Industry panel',
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
    meta: 'Virtual · Free for subscribers',
  },
]

const mostRead = [
  {
    label: 'Most clicked',
    title: 'Why premium launches are holding velocity while mass housing demand fragments.',
    slug: 'premium-launches-holding-velocity-mass-housing-fragments',
    meta: '62K views · 4 min read',
  },
  {
    label: 'Most shared',
    title: 'What the latest land deals actually reveal about developer risk appetite.',
    slug: 'latest-land-deals-developer-risk-appetite',
    meta: '49K views · 6 min read',
  },
  {
    label: 'Most discussed',
    title: 'Is branded real estate research becoming marketing theatre or public utility?',
    slug: 'branded-real-estate-research-marketing-theatre-public-utility',
    meta: '44K views · 5 min read',
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
    label: 'Cities',
    href: '#search',
    children: [
      {
        label: 'Metro Watch',
        items: ['Delhi/NCR', 'Mumbai Metropolitan Region', 'Bengaluru', 'Hyderabad'],
      },
      {
        label: 'Growth Corridors',
        items: ['Pune', 'Chennai', 'Kolkata', 'Emerging Markets'],
      },
    ],
  },
  {
    label: 'Markets',
    href: '#markets',
    children: [
      {
        label: 'Residential',
        items: ['Affordable', 'Luxury / Premium', 'Second Homes', 'Senior Living', 'Farmhouses'],
      },
      {
        label: 'Commercial',
        items: ['Retail', 'Malls / High Streets', 'REITs'],
      },
      {
        label: 'Mixed-use Development',
        items: [],
      },
      {
        label: 'Land Development',
        items: [],
      },
      {
        label: 'Policy & Regulation',
        items: [],
      },
      {
        label: 'Trends & Cycles',
        items: [],
      },
      {
        label: 'Other Asset Classes',
        items: ['Co-living', 'Co-working', 'Student Housing'],
      },
    ],
  },
  {
    label: 'Conversations',
    href: '#conversations',
    children: [
      {
        label: 'Formats',
        items: ['Developer Interviews', 'Investor Perspectives', 'Policy Voices'],
      },
      {
        label: 'Studio',
        items: ['Industry Leaders', 'Roundtables (Video Podcast)'],
      },
    ],
  },
  {
    label: 'Events',
    href: '#events',
    children: [
      {
        label: 'Calendar',
        items: ['Upcoming Events', 'Past Events', 'Roundtables', 'Webinars'],
      },
      {
        label: 'Collaborations',
        items: ['Partnerships / Tie ups / Announcements'],
      },
    ],
  },
  {
    label: 'About',
    href: '#about',
    children: [
      {
        label: 'Inside Top Storey',
        items: ['Our Philosophy', 'Editorial Policy', 'Approach & Methodology', 'Contact'],
      },
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

const founderProfile = {
  image: ceoFounderImage,
  role: 'Founder & CEO',
  summary:
    'The principal voice behind Top Storey, shaping its editorial discipline, market lens, and accountability-first approach.',
}

const footerSections = {
  sections: ['Latest News', 'Featured Reports', 'Market Analysis', 'City Data', 'Podcasts'],
  company: ['About Us', 'Editorial Board', 'Careers', 'Contact', 'Advertise'],
  legal: ['Terms of Service', 'Privacy Policy', 'Cookie Policy', 'Accessibility'],
}

function ScrollProgress() {
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY
      const maxScroll = ScrollTrigger.maxScroll(window)
      const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0
      setWidth(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return <div className="scroll-progress" style={{ width: `${width}%` }} />
}

function HomePage() {
  useScrollCoordinator()

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      // --- Reveal animations ---
      ScrollTrigger.batch('.reveal-item', {
        start: 'top 85%',
        onEnter: (batch) => {
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power3.out',
          })
        },
      })
    })

    // No manual scroll hijacking — let GSAP handle pinned scrub naturally

    return () => {
      ctx.revert()
    }
  }, [])

  return (
    <>
      <ScrollProgress />
      <div className="page-shell">
        {/* Masthead is a direct child of page-shell — position:sticky works across full page */}
        <Masthead navItems={navItems} />

        <header className="hero snap-section" id="latest">
          <NewsTicker items={tickerItems} />
          <HeroSection stories={latestStories} />
        </header>

        <main className="content-flow">
          {/* GSAP horizontal scroll section — has its own pin */}
          <FeaturedTrendingSection featured={featuredStories} trending={mostRead} />

          <section className="section snap-section" id="search">
            <div className="section-heading reveal-item">
              <p className="eyebrow">Search Properties</p>
              <h2>Find your next investment across India's top real estate markets.</h2>
            </div>
            <div className="reveal-item">
              <PropertySearch />
            </div>
          </section>

          {/* GSAP horizontal scroll section — is its own snap-section */}
          <Markets columns={marketColumns} />

          <StudioSection conversations={conversations} events={events} />

          <section className="section snap-section approach-section" id="about">
            <About links={aboutLinks} founder={founderProfile} />
            <ContactCard
              title="Independent journalism with accountability built into the frame."
              description="In an industry often shaped by promotion, Top Storey is positioned as an analytical newsroom. The product should feel like a publication first."
              bullets={['Rigorous journalism', 'Disciplined research', 'Market-grounded analysis']}
            />
          </section>
        </main>

        <Footer sections={footerSections} />
      </div>
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/stories/:slug"
        element={<StoryPage navItems={navItems} footerSections={footerSections} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
