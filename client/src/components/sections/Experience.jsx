import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

/* ─── DATA ───────────────────────────────────────────── */
const EXPERIENCES = [
  {
    id: 'loadedge',
    company: 'LoadEdge Dispatch & Logistics',
    role: 'Social Media Manager',
    period: 'Jan 2026 — Present · 7 months',
    type: 'LOGISTICS',
    typeColor: { text: '#FB923C', bg: 'rgba(251,146,60,.1)', border: 'rgba(251,146,60,.25)' },
    roleColor: '#FB923C',
    description: 'Managing digital presence for a US freight dispatching company. Building brand awareness across LinkedIn, Facebook & Instagram to connect carriers and shippers across the freight industry.',
    tags: ['LinkedIn Growth', 'Content Strategy', 'Freight Industry'],
    tagColor: { text: '#FDBA74', bg: 'rgba(251,146,60,.08)', border: 'rgba(251,146,60,.25)' },
    scene: 'truck',
  },
  {
    id: 'warpmill',
    company: 'WarpMill Technologies',
    role: 'SDO — Houston, Texas',
    period: 'Nov 2025 — Present · 9 months',
    type: 'TECH / HOSPITALITY',
    typeColor: { text: '#22D3EE', bg: 'rgba(34,211,238,.1)', border: 'rgba(34,211,238,.25)' },
    roleColor: '#22D3EE',
    description: 'Hotel management systems, inbound and outbound services, and e-commerce operations for a US-based tech company operating remotely from Houston, Texas.',
    tags: ['Hotel Ops', 'E-Commerce', 'Remote · US'],
    tagColor: { text: '#67E8F9', bg: 'rgba(34,211,238,.07)', border: 'rgba(34,211,238,.22)' },
    scene: 'warpmill',
  },
  {
    id: 'skillsrator',
    company: 'Skillsrator',
    role: 'Amazon PPC Specialist',
    period: 'Jan 2025 1 yr 7 months',
    type: 'AMAZON PPC',
    typeColor: { text: '#22C55E', bg: 'rgba(34,197,94,.1)', border: 'rgba(34,197,94,.25)' },
    roleColor: '#22C55E',
    description: 'Reduced ACoS 40% in 30 days for a beauty client. Launched a private label to £10K+ first month. Managing 15+ accounts across US & UK with $50K/mo ad budgets via SP, SB, and SD campaigns.',
    tags: ['SP / SB / SD', 'Bid Strategy', 'ROAS Scaling'],
    tagColor: { text: '#4ADE80', bg: 'rgba(34,197,94,.08)', border: 'rgba(34,197,94,.25)' },
    scene: 'amazon',
  },
  {
    id: 'tiktok',
    company: 'TikTok Shop',
    role: 'Virtual Assistant',
    period: 'Nov 2022 3 yrs 9 months',
    type: 'SOCIAL COMMERCE',
    typeColor: { text: '#C084FC', bg: 'rgba(192,132,252,.1)', border: 'rgba(192,132,252,.25)' },
    roleColor: '#C084FC',
    description: 'Full-service TikTok Shop VA — product listings, order management, creator outreach, and ad campaign support across the TikTok e-commerce ecosystem.',
    tags: ['TikTok Ads', 'Shop Management', 'Creator Outreach'],
    tagColor: { text: '#D8B4FE', bg: 'rgba(192,132,252,.08)', border: 'rgba(192,132,252,.25)' },
    scene: 'tiktok',
  },
  {
    id: 'jksm',
    company: 'JKSM – Pepsi Cola Bottlers Multan',
    role: 'Production Supervisor',
    period: 'Apr 2019 — May 2024 · 5 years 2 months',
    type: 'MANUFACTURING',
    typeColor: { text: '#FCD34D', bg: 'rgba(251,191,36,.1)', border: 'rgba(251,191,36,.25)' },
    roleColor: '#FCD34D',
    description: 'Supervised production branch employees at one of Pakistans largest beverage bottling operations. The operational discipline built here now drives every ad account I manage.',
    tags: ['Production Ops', 'Team Leadership', 'Quality Control'],
    tagColor: { text: '#FDE68A', bg: 'rgba(251,191,36,.07)', border: 'rgba(251,191,36,.22)' },
    scene: 'factory',
  },
]

/* ─── SCENE COMPONENTS ───────────────────────────────── */

function TruckScene() {
  return (
    <div className="exp-scene" style={{ background: 'linear-gradient(175deg,#060D20 0%,#091526 60%,#0C1C32 100%)' }}>
      {/* Stars */}
      {[[8,8,3.2],[14,28,2.8],[6,45,4],[18,60,3.5],[10,75,2.5],[22,88,3.8],[4,92,2.2]].map(([top,left,td],i) => (
        <div key={i} className="absolute rounded-full bg-white" style={{ top:`${top}%`, left:`${left}%`, width:top>15?2:1.5, height:top>15?2:1.5, '--td':`${td}s`, animation:'twinkle var(--td) ease-in-out infinite' }} />
      ))}
      {/* Moon */}
      <div className="absolute rounded-full" style={{ top:10,right:50,width:28,height:28,background:'rgba(200,215,255,.07)' }} />
      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0" style={{ height:48, background:'#080F1C', borderTop:'1px solid rgba(255,255,255,.04)' }}>
        <div className="absolute overflow-hidden" style={{ top:18,left:0,right:0,height:3 }}>
          <div className="flex" style={{ animation:'roadScroll .55s linear infinite', width:'200%' }}>
            {Array.from({length:14}).map((_,i)=>(
              <div key={i} style={{ width:48,height:3,background:'#F59E0B',marginRight:38,flexShrink:0,opacity:.65 }} />
            ))}
          </div>
        </div>
      </div>
      {/* Horizon */}
      <div className="absolute left-0 right-0" style={{ bottom:49,height:1,background:'linear-gradient(90deg,transparent,rgba(251,146,60,.18),transparent)' }} />
      {/* Truck */}
      <div className="absolute" style={{ bottom:46, animation:'truckDrive 5.5s linear infinite' }}>
        {/* Exhaust puffs */}
        {[[11,160,-10,0],[8,156,-5,.38]].map(([s,l,t,d],i)=>(
          <div key={i} className="absolute rounded-full" style={{ width:s,height:s,background:'rgba(140,155,180,.5)',left:l,top:t,animation:`exhaustPuff 1.1s ease-out infinite`,animationDelay:`${d}s` }} />
        ))}
        {/* Speed lines */}
        {[[-65,18,52,.08],[-75,28,40,.2],[-58,36,60,.04]].map(([l,t,w,d],i)=>(
          <div key={i} className="absolute" style={{ left:l,top:t,width:w,height:1,background:'rgba(255,255,255,.25)',borderRadius:1,animation:`spd .4s ease-out infinite`,animationDelay:`${d}s`,transformOrigin:'right' }} />
        ))}
        <svg width="235" height="68" viewBox="0 0 235 68" style={{ overflow:'visible' }}>
          <rect x="0" y="9" width="160" height="43" rx="3" fill="#182A48" stroke="#243D66" strokeWidth="1"/>
          {[32,68,104,138].map(x=><line key={x} x1={x} y1="9" x2={x} y2="52" stroke="rgba(255,255,255,.06)" strokeWidth="1.5"/>)}
          <rect x="0" y="9" width="160" height="4" rx="2" fill="#F59E0B" opacity=".4"/>
          <rect x="0" y="19" width="5" height="8" rx="1" fill="rgba(239,68,68,.65)"/>
          <rect x="0" y="32" width="5" height="6" rx="1" fill="rgba(251,146,60,.5)"/>
          <text x="80" y="36" fill="rgba(255,255,255,.12)" fontSize="10" fontWeight="700" fontFamily="Inter,sans-serif" textAnchor="middle">LOADEDGE</text>
          <rect x="157" y="44" width="6" height="8" rx="1" fill="#0E1D30"/>
          <rect x="160" y="4" width="62" height="48" rx="5" fill="#1D4ED8" stroke="#2563EB" strokeWidth="1"/>
          <line x1="186" y1="9" x2="186" y2="50" stroke="rgba(255,255,255,.09)" strokeWidth="1"/>
          <polygon points="167,8 220,8 220,31 172,34" fill="rgba(147,197,253,.18)" stroke="rgba(147,197,253,.3)" strokeWidth=".7"/>
          <rect x="162" y="11" width="20" height="19" rx="2" fill="rgba(147,197,253,.1)" stroke="rgba(147,197,253,.18)" strokeWidth=".5"/>
          <rect x="220" y="29" width="8" height="22" rx="2" fill="#1E3A6E"/>
          {[34,39,44].map(y=><line key={y} x1="220" y1={y} x2="228" y2={y} stroke="rgba(255,255,255,.09)" strokeWidth="1"/>)}
          <circle cx="222" cy="24" r="5" fill="rgba(253,224,71,.9)"/>
          <circle cx="222" cy="24" r="3" fill="rgba(253,230,130,.7)"/>
          <polygon points="227,19 275,8 275,40 227,29" fill="rgba(253,224,71,.035)"/>
          <rect x="212" y="7" width="10" height="5" rx="1" fill="#1E3A6E" stroke="rgba(255,255,255,.12)" strokeWidth=".5"/>
          <rect x="180" y="-5" width="5" height="17" rx="2" fill="#374151"/>
          {[34,112].map(cx=>(
            <g key={cx}><circle cx={cx} cy="56" r="13" fill="#0E1520" stroke="#1F2E45" strokeWidth="2"/><circle cx={cx} cy="56" r="8" fill="#080D15"/><circle cx={cx} cy="56" r="4" fill="#1F2E45" stroke="#2D3F5A" strokeWidth="1"/><circle cx={cx} cy="56" r="2" fill="#4B5563"/></g>
          ))}
          <circle cx="187" cy="56" r="12" fill="#0E1520" stroke="#1F2E45" strokeWidth="2"/>
          <circle cx="187" cy="56" r="7" fill="#080D15"/>
          <circle cx="187" cy="56" r="3" fill="#1F2E45" stroke="#2D3F5A" strokeWidth="1"/>
          <circle cx="187" cy="56" r="2" fill="#4B5563"/>
        </svg>
      </div>
    </div>
  )
}

function AmazonScene() {
  const BARS = [
    { min:'18px', max:'78px',  dur:'2.3s', del:'0s',    opacity:.22, border:.32 },
    { min:'38px', max:'108px', dur:'2.9s', del:'-.45s', opacity:.32, border:.42 },
    { min:'28px', max:'88px',  dur:'2.1s', del:'-.9s',  opacity:.19, border:.29 },
    { min:'52px', max:'128px', dur:'3.1s', del:'-1.3s', opacity:.38, border:.52 },
    { min:'22px', max:'68px',  dur:'2.5s', del:'-1.7s', opacity:.18, border:.28 },
    { min:'42px', max:'96px',  dur:'2.0s', del:'-2.1s', opacity:.28, border:.38 },
    { min:'58px', max:'135px', dur:'2.7s', del:'-2.5s', opacity:.42, border:.58 },
    { min:'15px', max:'60px',  dur:'1.9s', del:'-2.9s', opacity:.16, border:.26 },
  ]
  return (
    <div className="exp-scene" style={{ background:'linear-gradient(175deg,#050D07 0%,#071209 60%,#0A1A0D 100%)' }}>
      {[110,80,50,20].map(b=><div key={b} className="absolute left-0 right-0" style={{ bottom:b,height:1,background:'rgba(34,197,94,.07)' }}/>)}
      {/* Bars */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end gap-[7px] px-[18px]" style={{ paddingBottom:36,height:'100%' }}>
        {BARS.map((b,i)=>(
          <div key={i} className="rounded-t flex-shrink-0 self-end" style={{ width:20, '--bmin':b.min,'--bmax':b.max,'--bd':b.dur,'--bdel':b.del, background:`rgba(34,197,94,${b.opacity})`, border:`1px solid rgba(34,197,94,${b.border})`, animation:'barRise var(--bd) ease-in-out infinite var(--bdel)' }} />
        ))}
      </div>
      {/* Money */}
      {[{md:'3s',mdel:'0s',r:115,b:38,s:16,sym:'£'},{md:'2.6s',mdel:'-.75s',r:155,b:32,s:13,sym:'$'},{md:'3.4s',mdel:'-1.5s',r:98,b:44,s:19,sym:'£'},{md:'2.9s',mdel:'-2.1s',r:135,b:28,s:14,sym:'$'},{md:'3.2s',mdel:'-.4s',r:170,b:48,s:12,sym:'+'}].map((m,i)=>(
        <div key={i} className="anim-money" style={{ '--md':m.md,'--mdel':m.mdel,right:m.r,bottom:m.b,fontSize:m.s }} >{m.sym}</div>
      ))}
      <div className="absolute top-4 right-4 font-mono text-[10px]" style={{ color:'rgba(34,197,94,.55)' }}>ACoS ▼ 40%</div>
      {/* Box */}
      <div className="absolute" style={{ right:28,bottom:42,animation:'boxBounce 2s ease-in-out infinite',opacity:.28 }}>
        <svg width="38" height="38" viewBox="0 0 38 38"><rect x="4" y="11" width="30" height="24" rx="2" fill="none" stroke="rgba(34,197,94,.4)" strokeWidth="1.5"/><line x1="4" y1="19" x2="34" y2="19" stroke="rgba(34,197,94,.25)" strokeWidth="1"/><line x1="19" y1="11" x2="19" y2="35" stroke="rgba(34,197,94,.2)" strokeWidth="1"/><polygon points="4,11 19,4 34,11" fill="none" stroke="rgba(34,197,94,.4)" strokeWidth="1.5"/></svg>
      </div>
    </div>
  )
}

function TikTokScene() {
  const hearts = [
    { hd:'2.3s', hdel:'0s',    hc:'rgba(244,63,94,.85)', hr:'-10deg', right:34, bottom:58, size:18 },
    { hd:'2.9s', hdel:'-.55s', hc:'rgba(192,132,252,.85)',hr:'7deg',  right:56, bottom:52, size:15 },
    { hd:'2.5s', hdel:'-1.1s', hc:'rgba(244,63,94,.6)',  hr:'-5deg', right:26, bottom:63, size:13 },
    { hd:'3.1s', hdel:'-1.7s', hc:'rgba(251,146,60,.65)',hr:'11deg', right:67, bottom:56, size:14 },
    { hd:'2.7s', hdel:'-2.3s', hc:'rgba(192,132,252,.9)',hr:'-8deg', right:42, bottom:48, size:22 },
    { hd:'2.1s', hdel:'-2.9s', hc:'rgba(244,63,94,.7)',  hr:'5deg',  right:78, bottom:60, size:12 },
  ]
  const notifs = [
    { nd:'3.2s', ndel:'0s',    right:105, top:28, text:'+127 followers' },
    { nd:'3.7s', ndel:'-1.3s', right:92,  top:52, text:'1.2K views' },
    { nd:'2.9s', ndel:'-2.5s', right:108, top:76, text:'Order placed!' },
  ]
  return (
    <div className="exp-scene" style={{ background:'linear-gradient(175deg,#0C0510 0%,#110718 100%)' }}>
      {/* Phone */}
      <div className="absolute" style={{ right:44,top:'50%',transform:'translateY(-50%)',width:48,height:88,borderRadius:8,border:'1.5px solid rgba(192,132,252,.22)',background:'rgba(192,132,252,.04)' }}>
        <div className="absolute" style={{ top:4,left:'50%',transform:'translateX(-50%)',width:9,height:3,borderRadius:2,background:'rgba(192,132,252,.2)' }}/>
        <div className="absolute" style={{ inset:'8px 5px',borderRadius:5,animation:'screenPulse 2.5s ease-in-out infinite' }}/>
        <div className="absolute flex items-center justify-center" style={{ top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:15,height:15,borderRadius:'50%',background:'rgba(192,132,252,.14)',border:'1px solid rgba(192,132,252,.28)' }}>
          <div style={{ width:0,height:0,borderTop:'4px solid transparent',borderBottom:'4px solid transparent',borderLeft:'7px solid rgba(192,132,252,.6)',marginLeft:1 }}/>
        </div>
      </div>
      {/* Hearts */}
      {hearts.map((h,i)=>(
        <div key={i} className="anim-heart" style={{ '--hd':h.hd,'--hdel':h.hdel,'--hc':h.hc,'--hr':h.hr,right:h.right,bottom:h.bottom,fontSize:h.size }}>♥</div>
      ))}
      {/* Notifications */}
      {notifs.map((n,i)=>(
        <div key={i} className="absolute font-mono rounded-full" style={{ '--nd':n.nd,'--ndel':n.ndel,right:n.right,top:n.top,background:'rgba(192,132,252,.12)',border:'1px solid rgba(192,132,252,.3)',padding:'3px 8px',fontSize:9,color:'#C084FC',animation:'notifPop var(--nd) ease-out infinite var(--ndel)' }}>{n.text}</div>
      ))}
      <div className="absolute rounded-full" style={{ right:55,top:'50%',transform:'translateY(-50%)',width:110,height:110,background:'rgba(192,132,252,.05)',filter:'blur(28px)' }}/>
    </div>
  )
}

function WarpMillScene() {
  return (
    <div className="exp-scene" style={{ background:'linear-gradient(175deg,#050B1A 0%,#070F26 100%)' }}>
      <div className="absolute" style={{ right:20,top:'50%',transform:'translateY(-50%)',opacity:.2 }}>
        <svg width="148" height="148" viewBox="0 0 148 148">
          <g style={{ transformOrigin:'58px 58px',animation:'gearClockwise 9s linear infinite' }}>
            <circle cx="58" cy="58" r="28" fill="none" stroke="#3B82F6" strokeWidth="2.5"/>
            <circle cx="58" cy="58" r="10" fill="#1A3A70" stroke="#3B82F6" strokeWidth="1.5"/>
            {[['55,24','6,13'],['55,79','6,13'],['24,55','13,6'],['79,55','13,6']].map(([pos,dim],i)=>{
              const [x,y]=pos.split(','), [w,h]=dim.split(',')
              return <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="#3B82F6"/>
            })}
            {[[33,31,'rotate(45 36 37)'],[73,31,'rotate(-45 76 37)'],[33,73,'rotate(-45 36 79)'],[73,73,'rotate(45 76 79)']].map(([x,y,t],i)=>(
              <rect key={i} x={x} y={y} width="6" height="13" rx="2" fill="#3B82F6" transform={t}/>
            ))}
          </g>
          <g style={{ transformOrigin:'100px 48px',animation:'gearCounter 4.5s linear infinite' }}>
            <circle cx="100" cy="48" r="19" fill="none" stroke="#22D3EE" strokeWidth="2"/>
            <circle cx="100" cy="48" r="7" fill="#0E2D4A" stroke="#22D3EE" strokeWidth="1.5"/>
            {[['97,24','6,10'],['97,62','6,10'],['76,45','10,6'],['114,45','10,6']].map(([pos,dim],i)=>{
              const [x,y]=pos.split(','), [w,h]=dim.split(',')
              return <rect key={i} x={x} y={y} width={w} height={h} rx="2" fill="#22D3EE"/>
            })}
          </g>
          <g style={{ transformOrigin:'102px 100px',animation:'gearClockwise 3s linear infinite' }}>
            <circle cx="102" cy="100" r="12" fill="none" stroke="#818CF8" strokeWidth="1.5"/>
            <circle cx="102" cy="100" r="4" fill="#1a1f3a" stroke="#818CF8" strokeWidth="1"/>
            {[['99,84','6,8'],['99,108','6,8'],['86,97','8,6'],['110,97','8,6']].map(([pos,dim],i)=>{
              const [x,y]=pos.split(','), [w,h]=dim.split(',')
              return <rect key={i} x={x} y={y} width={w} height={h} rx="1" fill="#818CF8"/>
            })}
          </g>
        </svg>
      </div>
      <div className="absolute right-0 bottom-0" style={{ opacity:.1 }}>
        <svg width="110" height="125" viewBox="0 0 110 125">
          <rect x="10" y="22" width="90" height="103" fill="#93C5FD"/>
          <rect x="6" y="16" width="98" height="10" fill="#BFDBFE"/>
          {[[22,36],[47,36],[72,36],[22,58],[47,58],[72,58],[22,80],[47,80],[72,80]].map(([x,y],i)=>(
            <rect key={i} x={x} y={y} width="16" height="12" rx="1" fill={`rgba(255,255,255,${[.45,.25,.5,.3,.55,.2,.45,.3,.4][i]})`}/>
          ))}
          <rect x="38" y="102" width="34" height="23" rx="1" fill="rgba(255,255,255,.12)"/>
        </svg>
      </div>
    </div>
  )
}

function FactoryScene() {
  return (
    <div className="exp-scene" style={{ background:'linear-gradient(175deg,#0D0800 0%,#130C00 60%,#1A1000 100%)' }}>
      <div className="absolute right-0 bottom-0" style={{ opacity:.14 }}>
        <svg width="175" height="128" viewBox="0 0 175 128">
          <rect x="38" y="48" width="130" height="80" fill="#D97706"/>
          <rect x="32" y="42" width="142" height="10" fill="#B45309"/>
          {[52,94,132].map((x,i)=><rect key={i} x={x} y={[8,18,12][i]} width={[16,14,16][i]} height={[44,34,40][i]} fill="#92400E"/>)}
          {[[54,62,20,16,.3],[92,62,20,16,.4],[130,62,20,16,.22]].map(([x,y,w,h,o],i)=><rect key={i} x={x} y={y} width={w} height={h} rx="1" fill={`rgba(253,230,138,${o})`}/>)}
          <rect x="90" y="98" width="24" height="30" rx="1" fill="rgba(0,0,0,.18)"/>
          <rect x="0" y="85" width="52" height="6" rx="2" fill="#78350F"/>
        </svg>
      </div>
      {/* Conveyor belt */}
      <div className="absolute left-0 right-0 overflow-hidden" style={{ bottom:30,height:7 }}>
        <div className="flex" style={{ animation:'conveyorMove .38s linear infinite',width:'200%' }}>
          {Array.from({length:20}).map((_,i)=>(
            <div key={i} style={{ width:20,height:7,background:'#854D0E',borderRight:'2px solid #92400E',flexShrink:0 }}/>
          ))}
        </div>
      </div>
      {/* Bottles */}
      {[0,-1.5,-3].map((delay,i)=>(
        <div key={i} className="absolute" style={{ bottom:36,animation:`bottleTravel 4s linear infinite`,animationDelay:`${delay}s`,opacity:.5 }}>
          <svg width="16" height="30" viewBox="0 0 16 30"><rect x="5" y="0" width="6" height="5" rx="1" fill="rgba(59,130,246,.5)"/><rect x="2" y="5" width="12" height="21" rx="3" fill="rgba(37,99,235,.4)" stroke="rgba(59,130,246,.35)" strokeWidth="1"/><rect x="4" y="9" width="8" height="8" rx="1" fill="rgba(239,68,68,.22)"/></svg>
        </div>
      ))}
      {/* Smoke */}
      {[[13,65,8,0],[9,74,6,-.75],[11,56,10,-1.5],[10,85,12,-.3]].map(([s,r,t,d],i)=>(
        <div key={i} className="absolute rounded-full" style={{ width:s,height:s,background:'rgba(140,140,150,.55)',right:r,top:t,'--sd':`${d}s`,animation:'smokeRise 2.2s ease-out infinite var(--sd)' }}/>
      ))}
    </div>
  )
}

const SCENE_MAP = {
  truck:    TruckScene,
  amazon:   AmazonScene,
  tiktok:   TikTokScene,
  warpmill: WarpMillScene,
  factory:  FactoryScene,
}

const OVERLAY_MAP = {
  truck:    'linear-gradient(to right,rgba(6,9,18,.97) 0%,rgba(6,9,18,.9) 42%,rgba(6,9,18,.22) 100%)',
  amazon:   'linear-gradient(to right,rgba(5,13,7,.97) 0%,rgba(5,13,7,.9) 48%,rgba(5,13,7,.25) 100%)',
  tiktok:   'linear-gradient(to right,rgba(12,5,16,.97) 0%,rgba(12,5,16,.9) 38%,rgba(12,5,16,.18) 100%)',
  warpmill: 'linear-gradient(to right,rgba(5,11,26,.97) 0%,rgba(5,11,26,.9) 43%,rgba(5,11,26,.2) 100%)',
  factory:  'linear-gradient(to right,rgba(13,8,0,.97) 0%,rgba(13,8,0,.9) 43%,rgba(13,8,0,.2) 100%)',
}

/* ─── CARD ───────────────────────────────────────────── */
function ExpCard({ exp, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const SceneComp = SCENE_MAP[exp.scene]

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08, ease: 'easeOut' }}
      className="relative rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,255,255,.08)', minHeight: 160 }}
    >
      <SceneComp />
      <div className="exp-overlay" style={{ background: OVERLAY_MAP[exp.scene] }} />
      <div className="exp-content">
        <div
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-semibold mb-2.5 font-mono"
          style={{ background: exp.typeColor.bg, border: `1px solid ${exp.typeColor.border}`, color: exp.typeColor.text }}
        >
          {exp.type}
        </div>
        <div className="font-display font-bold text-[15px] mb-1">{exp.company}</div>
        <div className="text-[13px] font-medium mb-1" style={{ color: exp.roleColor }}>{exp.role}</div>
        <div className="font-mono text-[10px] text-[#334155] mb-2.5">{exp.period}</div>
        <p className="text-[13px] text-[#64748B] leading-relaxed max-w-[440px]">{exp.description}</p>
        <div className="flex flex-wrap gap-1.5 mt-2.5">
          {exp.tags.map(tag => (
            <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full font-medium" style={{ color: exp.tagColor.text, background: exp.tagColor.bg, border: `1px solid ${exp.tagColor.border}` }}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

/* ─── SECTION ────────────────────────────────────────── */
export default function Experience() {
  return (
    <section id="experience" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="section-label">// career</div>
        <h2 className="font-display font-bold text-3xl mb-7">Where I've made an impact.</h2>
        <div className="flex flex-col gap-4">
          {EXPERIENCES.map((exp, i) => (
            <ExpCard key={exp.id} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
