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
import { PropertyPage } from './pages/PropertyPage'
import { EventPage } from './pages/EventPage'
import ceoFounderImage from './static/images.jpg'
import { homepageStoryGroups, storyPath } from './data/storyCatalog'
import conversationsData from './data/conversations.json'
import eventsData from './data/events.json'

gsap.registerPlugin(ScrollTrigger)

const featuredStories = homepageStoryGroups.featured
const latestStories = homepageStoryGroups.latest
const mostRead = homepageStoryGroups.trending

const tickerItems = homepageStoryGroups.latest.map((story) => ({
  text: `${story.category.split(' | ').pop()}: ${story.title}`,
  link: storyPath(story.slug),
}))

const conversations = conversationsData.filter(c => c.featured).slice(0, 3)
const events = eventsData.filter(e => e.featured)

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
      <Route
        path="/properties/:id"
        element={<PropertyPage navItems={navItems} footerSections={footerSections} />}
      />
      <Route
        path="/events"
        element={<EventPage navItems={navItems} footerSections={footerSections} />}
      />
      <Route
        path="/events/:slug"
        element={<EventPage navItems={navItems} footerSections={footerSections} />}
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
