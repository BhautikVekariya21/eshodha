import React from 'react'
import { Link } from 'react-router-dom'
import { api } from '../api.js'
import { Icon } from './UI.jsx'

const DEFAULT_CHIPS = ['Payment terms', 'MOQ', 'Delivery time', 'Track my order', 'Raise a ticket', 'Talk to human']
const SESSION_KEY = 'eshodha_chat_sid'

function getSessionId() {
  let sid = localStorage.getItem(SESSION_KEY)
  if (!sid) {
    sid = (crypto.randomUUID ? crypto.randomUUID() : 's-' + Date.now() + '-' + Math.random().toString(36).slice(2))
    localStorage.setItem(SESSION_KEY, sid)
  }
  return sid
}

export default function ChatWidget() {
  const [open, setOpen] = React.useState(false)
  const [msgs, setMsgs] = React.useState([])
  const [chips, setChips] = React.useState(DEFAULT_CHIPS)
  const [val, setVal] = React.useState('')
  const [typing, setTyping] = React.useState(false)
  const [loaded, setLoaded] = React.useState(false)
  const endRef = React.useRef(null)

  const scrollToEnd = () => {
    requestAnimationFrame(() => endRef.current?.scrollIntoView({ behavior: 'smooth' }))
  }

  React.useEffect(() => {
    if (open && !loaded) {
      setLoaded(true)
      ;(async () => {
        try {
          const h = await api.chatHistory(getSessionId())
          if (h.length) {
            setMsgs(h.map((m) => ({ who: m.sender === 'user' ? 'user' : 'bot', text: m.message })))
          } else {
            setMsgs([{ who: 'bot', text: "Namaste! I'm Shodha Assist ⚙\nAsk me about grades, prices, payments, delivery — or type your order number." }])
          }
        } catch {
          setMsgs([{ who: 'bot', text: "Namaste! I'm Shodha Assist ⚙\nAsk me about grades, prices, payments, delivery — or type your order number." }])
        }
        scrollToEnd()
      })()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const send = async (text) => {
    const message = (text ?? val).trim()
    if (!message || typing) return
    setVal('')
    setMsgs((m) => [...m, { who: 'user', text: message }])
    setTyping(true)
    scrollToEnd()
    try {
      const res = await api.chat(getSessionId(), message)
      // small delay so the bot feels like it's typing
      setTimeout(() => {
        setMsgs((m) => [...m, { who: 'bot', text: res.reply }])
        setChips(res.suggestions || DEFAULT_CHIPS)
        setTyping(false)
        scrollToEnd()
      }, 500)
    } catch {
      setTyping(false)
      setMsgs((m) => [...m, { who: 'bot', text: 'Sorry — I could not reach the server. Please try again, or call 1800 419 4567.' }])
      scrollToEnd()
    }
  }

  return (
    <>
      {open && (
        <div className="chat-panel">
          <div className="chat-head">
            <span className="bot-avatar"><Icon name="headset" size={19} /></span>
            <div style={{ flex: 1 }}>
              <b>Shodha Assist</b>
              <span>● Online — replies instantly</span>
            </div>
            <button className="chat-close" aria-label="Close chat" onClick={() => setOpen(false)}>
              <Icon name="close" size={16} sw={2.5} />
            </button>
          </div>

          <div className="chat-msgs">
            {msgs.map((m, i) => (
              <div className={`msg ${m.who}`} key={i}>
                {m.text.split('\n').map((line, j) => (
                  <React.Fragment key={j}>
                    {line.startsWith('/') || line.startsWith('http') || /\/(payments|support|contact|products|careers)/.test(line)
                      ? line.split(/(\/(?:payments|support|contact|products|careers)[#a-z]*)/g).map((part, k) =>
                          /^\/(payments|support|contact|products|careers)/.test(part)
                            ? <Link key={k} to={part} onClick={() => setOpen(false)}>{part}</Link>
                            : <React.Fragment key={k}>{part}</React.Fragment>)
                      : line}
                    {j < m.text.split('\n').length - 1 && <br />}
                  </React.Fragment>
                ))}
              </div>
            ))}
            {typing && <div className="typing"><i /><i /><i /></div>}
            <div ref={endRef} />
          </div>

          <div className="chat-chips">
            {chips.map((c) => (
              <button className="chip-btn" key={c} onClick={() => send(c)}>{c}</button>
            ))}
          </div>

          <form className="chat-input" onSubmit={(e) => { e.preventDefault(); send() }}>
            <input value={val} onChange={(e) => setVal(e.target.value)}
              placeholder="Type your question…" aria-label="Chat message" />
            <button type="submit" aria-label="Send"><Icon name="send" size={17} /></button>
          </form>
        </div>
      )}

      <button className="chat-fab" aria-label="Customer support chat" onClick={() => setOpen(!open)}>
        <Icon name={open ? 'close' : 'headset'} size={24} />
        {!open && <span className="chat-dot" />}
      </button>
    </>
  )
}
