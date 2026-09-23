import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { usePageData, useTitle, Loading, ErrorBox } from '../hooks.jsx'
import { SectionHead } from '../components/UI.jsx'

export default function News() {
  useTitle('News & Media — Press Releases | eShodha Industries')
  const { data, loading, error } = usePageData(api.news)
  if (loading) return <Loading />
  if (error) return <ErrorBox message={error} />
  const { news } = data

  return (
    <>
      <section className="page-hero">
        <div className="ph-bg" style={{ backgroundImage: `url('${news.items[1].image}')` }} />
        <div className="wrap">
          <div className="crumbs"><Link to="/">Home</Link> <span className="sep">/</span> News &amp; Media</div>
          <h1>{news.title}</h1>
          <p>{news.sub}</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHead eyebrow="Latest Stories" title="Press Releases" />
          <div className="grid g3">
            {news.items.map((n, i) => (
              <a href="#" onClick={(e) => e.preventDefault()} className={`news-card reveal${i ? ` d${(i % 3) || 3}` : ''}`} key={n.title}>
                <img className="nc-media" src={n.image} alt={n.title} />
                <div className="nc-body">
                  <div className="news-meta"><span className="cat">{n.cat}</span><span>{n.date}</span></div>
                  <h3>{n.title}</h3>
                  <p>{n.text}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="section light">
        <div className="wrap split">
          <div>
            <span className="eyebrow">Media Contact</span>
            <h2 style={{ fontSize: 'clamp(26px,3.6vw,38px)', margin: '14px 0 16px' }}>{news.media.title}</h2>
            <p className="lead" style={{ fontSize: 16.5 }}>{news.media.text}</p>
            <div className="fm-box" style={{ marginTop: 24, maxWidth: 420 }}>
              <b>{news.media.box.b}</b><span>{news.media.box.l}</span>
            </div>
          </div>
          <div className="media reveal"><img src={news.media.image} alt="Molten steel pour" /></div>
        </div>
      </section>
    </>
  )
}
