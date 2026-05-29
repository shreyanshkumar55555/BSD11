import { useEffect, useMemo, useRef, useState } from 'react'

function nowId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .trim()
}

function detectTopic(message) {
  const m = normalize(message)

  if (/(price|pricing|rate|cost|budget|emi|loan)\b/.test(m)) {
    return 'pricing'
  }

  if (
    /(location|connectivity|airport|metro|railway|station|distance|highway|nearby|mall)\b/.test(
      m,
    )
  ) {
    return 'location'
  }

  if (
    /(amenit|facility|features|security|roads|school|hospital|park|cycle|club|water|electricity)\b/.test(
      m,
    )
  ) {
    return 'amenities'
  }

  if (/(investment|future|roi|profit|growth|resale)\b/.test(m)) {
    return 'investment'
  }

  if (/(visit|site visit|book|appointment|schedule)\b/.test(m)) {
    return 'sitevisit'
  }

  if (/(legal|registry|paper|document|rera)\b/.test(m)) {
    return 'legal'
  }

  return 'general'
}

function getFollowUpReply(lastTopic) {
  switch (lastTopic) {
    case 'pricing':
      return `👍 Great!

Please share:
• Your budget range
• Preferred plot size
• Investment or residential purpose

Based on this, I can suggest the best available option for you.`

    case 'location':
      return `📍 BSD ExpressCity offers strong connectivity and future growth potential.

Would you also like information about:
• Nearby schools & hospitals
• Investment opportunities
• Commercial plots
• Site visit booking`

    case 'amenities':
      return `🏡 BSD ExpressCity is designed with modern township planning and lifestyle-focused amenities.

Would you also like to know about:
• Nearby connectivity
• Investment benefits
• Plot pricing
• Site visit options`

    case 'investment':
      return `📈 Excellent choice!

This location is rapidly developing because of:
• Highway connectivity
• Growing infrastructure
• Nearby commercial expansion

Would you like:
• Best investment plot suggestions
• Commercial opportunities
• Future appreciation insights`

    case 'sitevisit':
      return `📅 Perfect!

Please share:
• Preferred date
• Preferred timing
• Your city/location

Our team will help arrange your site visit.`

    case 'legal':
      return `📄 Sure!

Our team can guide you regarding:
• Registry process
• Ownership documents
• Plot paperwork
• Layout approvals

Would you like our team to contact you directly?`

    default:
      return `😊 Glad to help!

You can ask about:
🏡 Plot pricing
📍 Nearby locations
🏗 Amenities
📈 Investment opportunities
📅 Site visits`
  }
}

function pickReply(message) {
  const m = normalize(message)

  // Greetings
  if (/(hi|hello|hey|hii|namaste|good morning|good evening)\b/.test(m)) {
    return `Hi! 👋 Welcome to BSD ExpressCity Assist.

I can help you with:
🏡 Plot pricing & sizes
📍 Nearby locations & connectivity
🏗 Modern amenities
📈 Investment guidance
📄 Legal/documentation support
📅 Site visit booking`
  }

  // Pricing
  if (/(price|pricing|rate|cost|budget|emi|loan)\b/.test(m)) {
    return `💰 Plot pricing depends on:
• Plot size
• Facing/location
• Availability

🏡 Available Plot Sizes:
• 1200 sq.ft
• 1800 sq.ft
• 3000 sq.ft
• Premium commercial plots

We can also guide you regarding investment planning and payment options.`
  }

  // Plot Sizes
  if (/(1200|1,200|1800|1,800|3000|3,000|plot size|sizes|sq\.? ?ft)\b/.test(m)) {
    return `📐 Available Plot Configurations:

• 1200 sq.ft → Compact residential plots
• 1800 sq.ft → Standard family plots
• 3000 sq.ft → Premium villa plots
• Commercial plots also available

I can also help you choose the best option based on your budget or investment goals.`
  }

  // Amenities
  if (
    /(amenit|facility|features|security|roads|school|hospital|park|cycle|club|water|electricity)\b/.test(
      m,
    )
  ) {
    return `🏡 BSD ExpressCity Amenities:

• Grand entrance gate
• Wide developed roads
• 24×7 security surveillance
• Green parks & open spaces
• Commercial complex
• School & hospital access
• Water & electricity connectivity
• Cycle track & landscaped areas
• Street lighting
• Proper drainage system
• Pollution-free environment
• Kids play area
• Future-ready infrastructure
• Peaceful residential surroundings
• Investment-friendly location
• Spacious road network
• Modern township planning

BSD ExpressCity is designed to provide a comfortable, secure, and future-ready lifestyle.`
  }

  // Location / Connectivity
  if (
    /(location|where|connectivity|connect|airport|metro|railway|station|distance|highway|nearby|mall)\b/.test(
      m,
    )
  ) {
    return `📍 BSD ExpressCity is strategically located on the Lucknow–Kanpur growth corridor.

🚗 Nearby Important Locations:

✈ Airport → Approx. 20 mins
🚆 Charbagh Railway Station → Approx. 25 mins
🚇 Transport Nagar Metro → Approx. 10 mins
🛍 Phoenix Palassio Mall → Approx. 15 mins
🛒 Lulu Mall Lucknow → Approx. 18 mins
🏥 SGPGI Hospital → Approx. 20 mins
🛣 Shaheed Path → Nearby connectivity

The project offers excellent connectivity for:
✔ Residential living
✔ Daily commuting
✔ Commercial opportunities
✔ Long-term investment growth`
  }

  // Investment
  if (/(investment|future|roi|profit|growth|returns|resale)\b/.test(m)) {
    return `📈 BSD ExpressCity has strong future growth potential because of:

• Rapid infrastructure development
• Highway & metro connectivity
• Nearby commercial expansion
• Growing residential demand

Suitable for:
✔ Long-term investment
✔ Residential construction
✔ Rental opportunities
✔ Future resale value`
  }

  // CONTACT / OFFICE
  // IMPORTANT: Keep this ABOVE commercial condition
  if (
    /(contact|address|office address|office location|office|email|phone|number|call)\b/.test(
      m,
    )
  ) {
    return `📞 Contact Information:

🏢 Office Address:
104, First Floor,
JB Metro Height,
Near RTO Office &
Transport Nagar Metro,
Lucknow

📧 Email:
info@bsdprojects.in
contact@bsdprojects.in

📅 Site visits are also available on request.`
  }

  // Legal
  if (
    /(legal|registry|paper|document|approval|ownership|map|rera)\b/.test(
      m,
    )
  ) {
    return `📄 Property Documentation Support:

• Registry process guidance
• Ownership verification
• Plot paperwork assistance
• Site verification
• Layout approvals

Our team can also help you with detailed documentation support.`
  }

  // Construction
  if (/(build|construction|villa|house|home)\b/.test(m)) {
    return `🏠 BSD ExpressCity is suitable for:

• Villas
• Duplex homes
• Residential construction
• Future custom homes

We can also help you choose:
✔ Corner plots
✔ Park-facing plots
✔ Premium-facing plots`
  }

  // Commercial
  // NOTE: office removed from regex
  if (/(commercial|shop|showroom|business)\b/.test(m)) {
    return `🏢 Commercial plot options are also available.

Suitable for:
• Shops
• Showrooms
• Business spaces
• Commercial investment

Commercial-facing plots usually offer strong future appreciation potential.`
  }

  // Site Visit
  if (/(visit|site visit|book|appointment|schedule)\b/.test(m)) {
    return `📅 Site visits are available.

Please share:
• Preferred date
• Preferred timing
• Your city/location

Our team will help arrange the best slot for you.`
  }

  // Thanks
  if (/(thanks|thank you|thx)\b/.test(m)) {
    return `You're welcome 😊

Feel free to ask anything about:
🏡 Plots & pricing
📍 Nearby facilities
🏗 Amenities
📈 Investment opportunities
📄 Legal support
📅 Site visits`
  }

  // Random / unrelated queries
  if (
    /(movie|cricket|ipl|anime|pubg|bgmi|game|girlfriend|boyfriend|meme|food|song|weather|joke)\b/.test(
      m,
    )
  ) {
    return `😄 I mainly assist with BSD ExpressCity and property-related information.

But I’d love to help you explore:
🏡 Smart property investments
📈 Future growth opportunities
📍 Best plot options in Lucknow`
  }

  // Default
  return `I can help you with:

🏡 Plot pricing & sizes
📍 Nearby locations & connectivity
🏗 Modern amenities
📈 Investment opportunities
📄 Legal/documentation support
🏢 Commercial plots
📅 Site visit booking

What would you like to know?`
}

export default function Chatbot({ onOpenContact }) {
  const quickReplies = useMemo(
    () => [
      'Plot Pricing',
      'Plot Sizes',
      'Amenities',
      'Nearby Locations',
      'Investment',
      'Legal Details',
      'Book Site Visit',
    ],
    [],
  )

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState('')
  const [lastTopic, setLastTopic] = useState('general')

  const [messages, setMessages] = useState(() => [
    {
      id: nowId(),
      role: 'bot',
      text: `Hi! 👋 I’m BSD ExpressCity Assist.

Ask me about:
🏡 Plot pricing & sizes
📍 Nearby locations
🏗 Modern amenities
📈 Investment opportunities
📄 Legal details
📅 Site visits`,
    },
  ])

  const bodyRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    bodyRef.current?.scrollTo({
      top: bodyRef.current.scrollHeight,
      behavior: 'smooth',
    })
  }, [messages, open])

  const send = (text) => {
    const userText = String(text || '').trim()

    if (!userText) return

    const normalized = normalize(userText)

    let botReply = ''

    // Smart follow-up handling
    if (
      /^(ok|okay|haan|yes|hmm|hmmm|nice|good|great|acha|achha)$/i.test(
        normalized,
      )
    ) {
      botReply = getFollowUpReply(lastTopic)
    } else {
      botReply = pickReply(userText)

      const topic = detectTopic(userText)
      setLastTopic(topic)
    }

    setMessages((prev) => [
      ...prev,
      {
        id: nowId(),
        role: 'user',
        text: userText,
      },
      {
        id: nowId(),
        role: 'bot',
        text: botReply,
      },
    ])
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const text = draft

    setDraft('')

    send(text)
  }

  return (
    <div className="chatbot" aria-live="polite">
      <button
        type="button"
        className="chatbot-fab"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="chatbot-panel"
      >
        <span className="chatbot-fab-dot" aria-hidden="true" />
        {open ? 'Close' : 'Chat'}
      </button>

      {open ? (
        <div
          id="chatbot-panel"
          className="chatbot-panel"
          role="dialog"
          aria-label="Chatbot"
        >
          <div className="chatbot-header">
            <div>
              <div className="chatbot-title">BSD Assist</div>
              <div className="chatbot-sub">
                Property Guidance • Investment Help
              </div>
            </div>

            <button
              type="button"
              className="chatbot-x"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ×
            </button>
          </div>

          <div className="chatbot-body" ref={bodyRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`chatbot-msg ${
                  m.role === 'user'
                    ? 'chatbot-msg--user'
                    : 'chatbot-msg--bot'
                }`}
              >
                {m.text}
              </div>
            ))}

            <div className="chatbot-quick">
              {quickReplies.map((q) => (
                <button
                  key={q}
                  type="button"
                  className="chatbot-chip"
                  onClick={() => send(q)}
                >
                  {q}
                </button>
              ))}

              <button
                type="button"
                className="chatbot-chip chatbot-chip--gold"
                onClick={() => {
                  setOpen(false)
                  onOpenContact?.()
                }}
              >
                Open Contact Form
              </button>
            </div>
          </div>

          <form className="chatbot-input" onSubmit={onSubmit}>
            <input
              ref={inputRef}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask anything about BSD ExpressCity..."
              aria-label="Type your message"
            />

            <button type="submit">Send</button>
          </form>
        </div>
      ) : null}
    </div>
  )
}