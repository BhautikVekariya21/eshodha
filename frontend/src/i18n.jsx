import React from 'react'

/* Hindi dictionary — keys fall back to English content (API data) when absent */
export const DICT = {
  hi: {
    // topbar
    'top.phone': '1800 419 4567 (निःशुल्क)',
    'top.iso': 'ISO 9001 : 2015 प्रमाणित',
    'top.pay': 'ऑनलाइन भुगतान',
    'top.support': 'सहायता',
    'top.investors': 'निवेशक',
    'top.media': 'मीडिया',
    // nav
    'nav.home': 'होम',
    'nav.about': 'हमारे बारे में',
    'nav.products': 'उत्पाद',
    'nav.operations': 'संचालन',
    'nav.quality': 'गुणवत्ता',
    'nav.industries': 'उद्योग',
    'nav.sustainability': 'स्थिरता',
    'nav.services': 'सेवाएँ',
    'nav.more': 'अधिक',
    'nav.quote': 'कोटेशन पाएँ',
    'nav.signin': 'साइन इन',
    'nav.account': 'मेरा खाता',
    'nav.logout': 'साइन आउट',
    'nav.admin': 'एडमिन',
    // home hero
    'home.kicker': 'एकीकृत इस्पात संयंत्र · स्थापना 1996 · बेंगलुरु, भारत',
    'home.titleA': 'स्टील कॉइल के हर ग्रेड।',
    'home.titleB': 'अयस्क से उत्कृष्टता तक।',
    'home.text': 'eShodha Industries एक पूर्ण एकीकृत परिचालन चलाता है — कच्चे माल, आयरनमेकिंग, स्टीलमेकिंग, कास्टिंग, रोलिंग, कोटिंग, परीक्षण और प्रेषण — 40+ देशों में विश्व-स्तरीय स्टील कॉइल पहुँचाते हुए।',
    'home.cta1': 'उत्पाद देखें',
    'home.cta2': 'प्लांट भ्रमण करें',
    'home.stat1': 'स्थापित क्षमता',
    'home.stat2': 'स्टील ग्रेड',
    'home.stat3': 'संचालन के वर्ष',
    'home.stat4': 'समय पर प्रेषण',
    // home sections
    'home.sectors.eyebrow': 'क्षेत्रों में विश्वसनीय',
    'home.sectors.title': 'एक आपूर्तिकर्ता। स्टील उपयोग करने वाला हर उद्योग।',
    'home.about.eyebrow': 'हम कौन हैं',
    'home.about.cta1': 'हमारी कहानी',
    'home.about.cta2': 'देखें हम स्टील कैसे बनाते हैं',
    'home.products.eyebrow': 'उत्पाद पोर्टफोलियो',
    'home.products.title': 'सभी कॉइल ग्रेड, एक ही पते पर',
    'home.products.text': 'हॉट रोल्ड से कलर कोटेड तक — हर ग्रेड, चौड़ाई, मोटाई और फिनिश में फ्लैट स्टील कॉइल, भारतीय और अंतरराष्ट्रीय मानकों के अनुसार।',
    'home.products.all': 'पूर्ण उत्पाद सूची व डेटाशीट',
    'home.flow.eyebrow': 'एंड-टू-एंड संचालन',
    'home.flow.title': 'कच्चे अयस्क से तैयार कॉइल तक — छह प्रमुख चरण',
    'home.flow.text': 'किसी भी चरण पर क्लिक करें और संचालन पृष्ठ पर पूरे 16-चरण प्रक्रिया को देखें।',
    'home.flow.cta': 'पूरी 16-चरण प्रक्रिया देखें',
    'home.quality.eyebrow': 'गुणवत्ता आश्वासन',
    'home.quality.cta': 'हमारी गुणवत्ता प्रणाली देखें',
    'home.ind.eyebrow': 'हम जिन उद्योगों की सेवा करते हैं',
    'home.ind.title': 'हर क्षेत्र के लिए अनुप्रयोग-अनुरूप स्टील',
    'home.ind.text': 'हर उद्योग को समर्पित की-अकाउंट टीम, एप्लीकेशन इंजीनियरिंग सहायता और ग्रेड सिफ़ारिशें मिलती हैं।',
    'home.ind.more': 'और जानें',
    'home.sus.eyebrow': 'स्थिरता',
    'home.sus.cta': 'हमारा ESG कार्यक्रम',
    'home.voices.eyebrow': 'ग्राहकों की आवाज़ें',
    'home.voices.title': 'हमारे साथी क्या कहते हैं',
    'home.news.eyebrow': 'समाचार',
    'home.news.title': 'eShodha से ताज़ा खबर',
    'home.news.all': 'सभी समाचार',
    'home.svc.eyebrow': 'सेवाएँ',
    'home.svc.title': 'मिल से बढ़कर — एक सेवा साथी',
    'home.svc.all': 'सभी सेवाएँ देखें',
    'home.svc.explore': 'देखें',
    // home CTA
    'home.cta.title': 'कोई विशेष ग्रेड, चौड़ाई या कोटिंग चाहिए?',
    'home.cta.text': 'अपनी आवश्यकता भेजें — हमारे एप्लीकेशन इंजीनियर 24 घंटे में तकनीकी प्रस्ताव भेजेंगे।',
    'home.cta.b1': 'कोटेशन का अनुरोध करें',
    'home.cta.b2': 'इंजीनियर से बात करें',
    // footer
    'foot.about': 'एक एकीकृत स्टील निर्माता — आयरन अयस्क और कोकिंग कोल से लेकर परीक्षणित, प्रमाणित और वितरित कॉइल तक, भारत और 40+ निर्यात बाज़ारों में।',
    'foot.company': 'कंपनी',
    'foot.products': 'उत्पाद और संचालन',
    'foot.stay': 'अपडेट रहें',
    'foot.stay.text': 'मासिक मार्केट नोट: कॉइल कीमत रुझान, ग्रेड लॉन्च और प्लांट अपडेट। कोई स्पैम नहीं।',
    'foot.subscribe': 'सब्सक्राइब',
    // page heroes
    'about.title': '1996 में गढ़ी गई। आज भी मज़बूत होती।',
    'products.title': 'स्टील कॉइल के हर ग्रेड',
    'process.title': 'अयस्क अंदर। प्रमाणित कॉइल बाहर।',
    'process.sub': 'सोलह जुड़े हुए चरण 24×7 एक ही उत्पादन योजना के अंतर्गत चलते हैं — नीचे प्रत्येक चरण पर क्लिक करके देखें कि हम हर ग्रेड की कॉइल कैसे बनाते हैं।',
    'infrastructure.title': '3.5 MTPA का एकीकृत परिसर',
    'quality.title': 'शून्य दोष। पूर्ण ट्रेसेबिलिटी।',
    'industries.title': 'अनुप्रयोग के अनुरूप स्टील',
    'sustainability.title': 'हरी स्टील — 2035 नेट-ज़ीरो की ओर',
    'services.title': 'कॉइल से परे सेवाएँ',
    'careers.title': 'जहाँ स्टील जन्म लेता है, वहीं करियर बनाएँ',
    'investors.title': 'निरंतर वृद्धि, मज़बूत गवर्नेंस',
    'news.title': 'eShodha न्यूज़रूम',
    'contact.title': 'आइए स्टील पर बात करें',
    'payments.title': 'अपना चालान ऑनलाइन भरें',
    'support.title': 'घंटों में जवाब, दिनों में नहीं',
    // auth
    'auth.signin': 'साइन इन',
    'auth.register': 'खाता बनाएँ',
    'auth.logout': 'साइन आउट',
    // common
    'common.loading': 'लोड हो रहा है…',
    'common.submit': 'भेजें',
  },
}

const LangCtx = React.createContext({ lang: 'en', setLang: () => {}, t: (k, f) => f ?? k })

export function LangProvider({ children }) {
  const [lang, setLang] = React.useState(() => {
    try { return localStorage.getItem('eshodha-lang') === 'hi' ? 'hi' : 'en' } catch { return 'en' }
  })
  React.useEffect(() => {
    try { localStorage.setItem('eshodha-lang', lang) } catch { /* ignore */ }
    document.documentElement.setAttribute('lang', lang === 'hi' ? 'hi' : 'en')
  }, [lang])
  const t = React.useCallback((key, fallback) => DICT[lang]?.[key] ?? fallback ?? key, [lang])
  return <LangCtx.Provider value={{ lang, setLang, t }}>{children}</LangCtx.Provider>
}

export const useLang = () => React.useContext(LangCtx)
