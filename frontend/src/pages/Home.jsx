import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { Counter, usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, SectionHead, TickList, Testimonials, StatBand, CtaBand } from '../components/UI.jsx'

export default function Home() {
  useTitle('eShodha Industries — Integrated Steel Coil Manufacturing | HR, CR, GI, PPGI, Stainless Coils')
  const { data, loading, error } = usePageData(api.home)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { home: h, testimonials, news } = data

  return (
    <>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" style={{ backgroundImage: `url('${h.heroImage}')` }} />
        <div className="wrap">
          <span className="kicker">{h.kicker}</span>
          <h1>{h.heroTitleA} <em>{h.heroTitleB}</em></h1>
          <p>{h.heroText}</p>
          <div className="hero-actions">
            <Link to="/products" className="btn btn-primary">Explore Products <Icon name="arrowR" size={16} sw={2.5} /></Link>
            <Link to="/process" className="btn btn-ghost">Take the Plant Tour <Icon name="play" size={16} sw={2} /></Link>
          </div>
        </div>
        <div className="hero-strip">
          <div className="wrap">
            {h.heroStats.map((s, i) => (
              <div className="hs-item" key={i}><b>{s.num}<span style={{ fontSize: 16 }}>{s.suffix}</span></b><span>{s.label}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTOR CHIPS */}
      <section className="section tight">
        <div className="wrap">
          <div className="section-head center reveal" style={{ marginBottom: 30 }}>
            <span className="eyebrow">Trusted Across Sectors</span>
            <h2 style={{ fontSize: 24 }}>One Supplier. Every Steel-Consuming Industry.</h2>
          </div>
          <div className="chips reveal" style={{ justifyContent: 'center' }}>
            {h.sectorChips.map((c, i) => <span className={`chip${i === 0 ? ' hl' : ''}`} key={i}>{c}</span>)}
          </div>
        </div>
      </section>

      {/* ABOUT TEASER */}
      <section className="section light">
        <div className="wrap split">
          <div className="media reveal"><img src={h.about.image} alt="Molten steel being poured at eShodha Industries BOF shop" /></div>
          <div className="reveal d1">
            <span className="eyebrow">Who We Are</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 16px' }}>{h.about.title}</h2>
            <p className="lead" style={{ fontSize: 16.5 }}>{h.about.text}</p>
            <TickList items={h.about.ticks} />
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
              <Link to="/about" className="btn btn-dark">Our Story</Link>
              <Link to="/process" className="btn btn-outline">See How We Make Steel</Link>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="section">
        <div className="wrap">
          <SectionHead center eyebrow="Product Portfolio" title="All Coil Grades, One Address"
            text="Hot rolled to colour coated — flat steel coils in every grade, width, thickness and finish, made to Indian and international standards." />
          <div className="grid g3">
            {h.productCards.map((c, i) => (
              <div className={`card reveal${i ? ` d${i % 3}` : ''}`} key={c.title}>
                <div className="icon"><Icon name={c.icon} size={26} /></div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <Link className="more" to={`/products#${c.anchor}`}>View Grades <Icon name="arrowR" size={14} sw={2.5} /></Link>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }} className="reveal">
            <Link to="/products" className="btn btn-primary btn-lg">Full Product Catalogue &amp; Datasheets</Link>
          </div>
        </div>
      </section>

      {/* MINI FLOW */}
      <section className="section dark">
        <div className="wrap">
          <SectionHead center eyebrow="End-to-End Operations" title="From Raw Ore to Ready Coil — Six Macro Stages"
            text="Click any stage to walk the full 16-step process on our operations page." />
          <div className="mini-flow reveal">
            {h.miniFlow.map((m) => (
              <Link className="mf-node" to="/process" key={m.n}>
                <span className="mf-num">{m.n}</span><b>{m.title}</b><span>{m.sub}</span>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 40 }} className="reveal">
            <Link to="/process" className="btn btn-primary">Walk the Full 16-Stage Process</Link>
          </div>
        </div>
      </section>

      {/* QUALITY */}
      <section className="section">
        <div className="wrap split rev">
          <div className="media reveal"><img src={h.quality.image} alt="Metallurgical lab at eShodha Industries" /></div>
          <div className="reveal d1">
            <span className="eyebrow">Quality Assurance</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 16px' }}>{h.quality.title}</h2>
            <p className="lead" style={{ fontSize: 16.5 }}>{h.quality.text}</p>
            <div className="cert-row" style={{ margin: '26px 0 32px' }}>
              {h.quality.certs.map((c) => (
                <div className="cert" key={c.name}>
                  <span className="ci"><Icon name="check" size={19} sw={2.5} /></span>
                  <div><b>{c.name}</b><span>{c.sub}</span></div>
                </div>
              ))}
            </div>
            <Link to="/quality" className="btn btn-dark">Inside Our Quality System</Link>
          </div>
        </div>
      </section>

      <StatBand stats={h.bigStats.map((s) => ({ ...s, prefix: '' }))} />

      {/* INDUSTRIES */}
      <section className="section light">
        <div className="wrap">
          <SectionHead eyebrow="Industries We Serve" title="Application-Matched Steel for Every Sector"
            text="Each industry gets a dedicated key-account team, application engineering support and grade recommendations." />
          <div className="grid g3">
            {h.industries.map((c, i) => (
              <div className={`card reveal${i ? ` d${i % 3}` : ''}`} key={c.title}>
                <div className="icon"><Icon name={c.icon} size={26} /></div>
                <h3>{c.title}</h3>
                <p>{c.text}</p>
                <Link className="more" to="/industries">Learn More <Icon name="arrowR" size={14} sw={2.5} /></Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SUSTAINABILITY */}
      <section className="section">
        <div className="wrap split">
          <div className="media reveal"><img src={h.sustainability.image} alt="eShodha Industries green steel plant with solar arrays" /></div>
          <div className="reveal d1">
            <span className="eyebrow">Sustainability</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 16px' }}>{h.sustainability.title}</h2>
            <p className="lead" style={{ fontSize: 16.5 }}>{h.sustainability.text}</p>
            <TickList items={h.sustainability.ticks} />
            <Link to="/sustainability" className="btn btn-dark">Our ESG Programme</Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section light">
        <div className="wrap">
          <SectionHead center eyebrow="Customer Voices" title="What Our Partners Say" />
          <Testimonials items={testimonials} />
        </div>
      </section>

      {/* NEWS */}
      <section className="section">
        <div className="wrap">
          <div className="section-head reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', maxWidth: 'none', gap: 24, flexWrap: 'wrap' }}>
            <div><span className="eyebrow">Newsroom</span><h2 style={{ marginTop: 12 }}>Latest from eShodha</h2></div>
            <Link to="/news" className="btn btn-outline btn-sm">All News</Link>
          </div>
          <div className="grid g3">
            {news.map((n, i) => (
              <Link to="/news" className={`news-card reveal${i ? ` d${i}` : ''}`} key={n.title}>
                <img className="nc-media" src={n.image} alt={n.title} />
                <div className="nc-body">
                  <div className="news-meta"><span className="cat">{n.cat}</span><span>{n.date}</span></div>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Need a specific grade, width or coating weight?"
        text="Send us your requirement — our application engineers respond with a technical offer within 24 hours."
        primary={<Link to="/contact#rfq" className="btn btn-primary btn-lg">Request a Quote</Link>}
        secondary={<Link to="/contact" className="btn btn-ghost btn-lg">Talk to an Engineer</Link>} />
    </>
  )
}
