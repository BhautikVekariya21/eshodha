import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { Counter, usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { Icon, PageHero, SectionHead, CtaBand } from '../components/UI.jsx'

export default function About() {
  useTitle('About Us — eShodha Industries | Integrated Steel Coil Manufacturer')
  const { data, loading, error } = usePageData(api.about)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { about: a } = data

  return (
    <>
      <PageHero img={a.image} crumbs={[{ label: 'About Us' }]} title={a.title} sub={a.sub} />

      {/* STORY */}
      <section className="section">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 18px' }}>{a.storyTitle}</h2>
            <div className="two-col-text">
              {a.story.map((p, i) => <p key={i} dangerouslySetInnerHTML={{ __html: p }} />)}
            </div>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 28 }}>
              <Link to="/process" className="btn btn-primary">Explore Our Operations</Link>
              <a href="#team" className="btn btn-outline">Meet the Leadership</a>
            </div>
          </div>
          <div className="media reveal"><img src="/img/hero-coils.jpg" alt="Coil yard at eShodha Industries" /></div>
        </div>
      </section>

      {/* VISION / MISSION / VALUES */}
      <section className="section dark">
        <div className="wrap">
          <SectionHead center eyebrow="Purpose" title="Vision, Mission & Values" />
          <div className="grid g3">
            {a.vmv.map((v, i) => (
              <div className={`card dark reveal${i ? ` d${i}` : ''}`} key={v.title}>
                <div className="icon" style={{ background: 'rgba(242,97,26,.14)' }}>
                  <Icon name={v.icon} size={26} style={{ color: 'var(--orange)' }} />
                </div>
                <h3>{v.title}</h3>
                <p>{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="section">
        <div className="wrap">
          <SectionHead center eyebrow="Milestones" title="30 Years, Upstream and Downstream" />
          <div className="timeline">
            {a.timeline.map((t, i) => (
              <div className={`tl-item reveal${i ? ` d${i % 4}` : ''}`} key={t.year}>
                <div className="tl-year">{t.year}</div>
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEADERSHIP */}
      <section className="section light" id="team">
        <div className="wrap">
          <SectionHead eyebrow="Leadership" title="The Team Behind the Furnace"
            text="A blend of metallurgists, operators and digital engineers with an average of 22 years in steel." />
          <div className="grid g4">
            {a.leaders.map((l, i) => (
              <div className={`team-card reveal${i ? ` d${i}` : ''}`} key={l.name}>
                <img className="tm-media" src={l.image} alt={l.name} />
                <div className="tm-body"><h3>{l.name}</h3><div className="role">{l.role}</div><p>{l.text}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="stats-band section tight">
        <div className="wrap">
          <div className="grid g4" style={{ alignItems: 'center' }}>
            {a.stats.map((s, i) => (
              <div className={`stat reveal${i ? ` d${i}` : ''}`} key={s.label}>
                <div className="num">
                  <Counter value={s.num} decimals={s.decimals} prefix={s.prefix} />
                  {s.suffix && <i>{s.suffix}</i>}
                </div>
                <div className="lbl">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBand title="Want to see the plant for yourself?"
        text="We host customer audits, academic tours and investor visits every month."
        primary={<Link to="/contact#tour" className="btn btn-primary btn-lg">Book a Plant Tour</Link>}
        secondary={<Link to="/process" className="btn btn-ghost btn-lg">Virtual Walkthrough</Link>} />
    </>
  )
}
