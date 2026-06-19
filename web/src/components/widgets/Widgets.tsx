import { useState } from 'react'
import type { TopicWidget } from '../../types'
import { HotspotImage, type Hotspot } from './HotspotImage'
import styles from './widgets.module.css'

type WidgetProps = {
  viewMode: 'diagram' | 'real'
}

// ==========================================
// 1. WIDGET: Ciclo 4 Tiempos
// ==========================================
function Ciclo4TiemposWidget({ viewMode }: WidgetProps) {
  const [step, setStep] = useState(0)

  const steps = [
    {
      title: "1 · Admisión",
      l1: "Válvula de admisión se abre.",
      l2: "El pistón baja y succiona la",
      l3: "mezcla de aire y nafta al cilindro.",
      l4: "✓ Admisión: abierta", l4c: "#1D9E75",
      l5: "✗ Escape: cerrada", l5c: "#888780",
      l6: "↓ Inyector: activo", l6c: "#BA7517",
      pistonY: 228, gasH: 170, gasColor: "#9FE1CB", gasOp: 0.4,
      vadmOp: 0.9, vadmColor: "#1D9E75",
      vescOp: 0.3, vescColor: "rgba(255,255,255,0.3)",
      sparks: 0, inarrow: 1, outarrow: 0,
      arrowY1: 190, arrowY2: 225, arrowDir: "down",
      bielaY1: 254, bielaY2: 310, cpinY: 310
    },
    {
      title: "2 · Compresión",
      l1: "Ambas válvulas se cierran.",
      l2: "El pistón sube y comprime la",
      l3: "mezcla aire + nafta fuertemente.",
      l4: "✗ Admisión: cerrada", l4c: "#888780",
      l5: "✗ Escape: cerrada", l5c: "#888780",
      l6: "— Inyector: inactivo", l6c: "#888780",
      pistonY: 148, gasH: 90, gasColor: "#9FE1CB", gasOp: 0.7,
      vadmOp: 0.3, vadmColor: "rgba(255,255,255,0.3)",
      vescOp: 0.3, vescColor: "rgba(255,255,255,0.3)",
      sparks: 0, inarrow: 0, outarrow: 0,
      arrowY1: 225, arrowY2: 190, arrowDir: "up",
      bielaY1: 174, bielaY2: 230, cpinY: 346
    },
    {
      title: "3 · Explosión",
      l1: "La bujía genera una chispa.",
      l2: "La mezcla explota y el empuje",
      l3: "mueve el pistón hacia abajo.",
      l4: "✗ Admisión: cerrada", l4c: "#888780",
      l5: "✗ Escape: cerrada", l5c: "#888780",
      l6: "— Inyector: inactivo", l6c: "#888780",
      pistonY: 228, gasH: 170, gasColor: "#EF9F27", gasOp: 0.6,
      vadmOp: 0.3, vadmColor: "rgba(255,255,255,0.3)",
      vescOp: 0.3, vescColor: "rgba(255,255,255,0.3)",
      sparks: 1, inarrow: 0, outarrow: 0,
      arrowY1: 190, arrowY2: 225, arrowDir: "down",
      bielaY1: 254, bielaY2: 310, cpinY: 310
    },
    {
      title: "4 · Escape",
      l1: "Válvula de escape se abre.",
      l2: "El pistón sube y expulsa los",
      l3: "gases quemados fuera del motor.",
      l4: "✗ Admisión: cerrada", l4c: "#888780",
      l5: "✓ Escape: abierta", l5c: "#1D9E75",
      l6: "— Inyector: inactivo", l6c: "#888780",
      pistonY: 148, gasH: 90, gasColor: "#B4B2A9", gasOp: 0.35,
      vadmOp: 0.3, vadmColor: "rgba(255,255,255,0.3)",
      vescOp: 0.9, vescColor: "#1D9E75",
      sparks: 0, inarrow: 0, outarrow: 1,
      arrowY1: 225, arrowY2: 190, arrowDir: "up",
      bielaY1: 174, bielaY2: 230, cpinY: 346
    }
  ]

  const s = steps[step]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/motor_completo.png"
        alt="Motor EA111 de Volkswagen Gol"
        hotspots={[
          { id: '1', x: 48, y: 53, title: 'Tapa de Válvulas', desc: 'Capa metálica superior que cubre el árbol de levas y protege la distribución superior.' },
          { id: '2', x: 29, y: 43, title: 'Tapón de Carga de Aceite', desc: 'Tapón de carga de lubricante. Dice "OIL" y tiene el logo de lubricación.' },
          { id: '3', x: 43, y: 64, title: 'Cables de Bujías', desc: 'Llevan la alta tensión (25.000V) de la bobina a las bujías en la tapa.' },
          { id: '4', x: 91, y: 56, title: 'Depósito de Refrigerante', desc: 'Almacena el líquido de refrigeración. Muestra el nivel MIN/MAX.' },
          { id: '5', x: 10, y: 35, title: 'Batería 12V', desc: 'Fuente de energía eléctrica principal para arranque, luces y computadora (ECU).' },
          { id: '6', x: 20, y: 68, title: 'Alternador', desc: 'Genera corriente eléctrica al girar para alimentar circuitos y cargar la batería.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {steps.map((st, i) => (
          <button
            key={i}
            className={`${styles.controlBtn} ${step === i ? styles.controlBtnActiveGreen : ''}`}
            onClick={() => setStep(i)}
          >
            {st.title.split(' · ')[1]}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{s.title}</div>
        <div className={styles.infoBody}>{s.l1} {s.l2} {s.l3}</div>
        <div style={{ display: 'flex', gap: '12px', marginTop: '6px', fontSize: '11px' }}>
          <span style={{ color: s.l4c }}>{s.l4}</span>
          <span style={{ color: s.l5c }}>{s.l5}</span>
          <span style={{ color: s.l6c }}>{s.l6}</span>
        </div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 380">
        <defs>
          <marker id="arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" />
          </marker>
          <marker id="arrowGrey" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#888780" strokeWidth="1.5" strokeLinecap="round" />
          </marker>
        </defs>

        {/* Paredes del cilindro */}
        <rect x="280" y="50" width="180" height="240" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="3" />

        {/* Cámara de gas */}
        <rect x="283" y="53" width="174" height={s.gasH} fill={s.gasColor} opacity={s.gasOp} />

        {/* Válvula admisión */}
        <rect x="283" y="50" width="60" height="10" rx="3" fill={s.vadmColor} opacity={s.vadmOp} />
        <text x="270" y="46" textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.5)">admisión</text>

        {/* Válvula escape */}
        <rect x="397" y="50" width="60" height="10" rx="3" fill={s.vescColor} opacity={s.vescOp} />
        <text x="465" y="46" fontSize="10" fill="rgba(255,255,255,0.5)">escape</text>

        {/* Bujía */}
        <rect x="351" y="34" width="38" height="18" rx="4" fill="rgba(255,255,255,0.2)" />
        <text x="370" y="28" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.5)">bujía</text>

        {/* Inyector */}
        <rect x="285" y="54" width="16" height="10" rx="2" fill="#BA7517" opacity="0.8" />
        <text x="270" y="68" textAnchor="end" fontSize="10" fill="rgba(255,255,255,0.5)">inyector</text>

        {/* Pistón */}
        <rect x="283" y={s.pistonY} width="174" height="26" rx="4" fill="rgba(255,255,255,0.6)" />

        {/* Biela */}
        <line x1="370" y1={s.pistonY + 26} x2="370" y2={s.cpinY} stroke="rgba(255,255,255,0.4)" strokeWidth="5" strokeLinecap="round" />

        {/* Cigüeñal */}
        <circle cx="370" cy="328" r="20" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
        <circle cx="370" cy={s.cpinY} r="5" fill="rgba(255,255,255,0.6)" />
        
        {/* Labels de piezas */}
        <text x="465" y="332" fontSize="10" fill="rgba(255,255,255,0.5)">cigüeñal</text>
        <text x="465" y="280" fontSize="10" fill="rgba(255,255,255,0.5)">biela</text>
        <text x="465" y={s.pistonY + 16} fontSize="10" fill="rgba(255,255,255,0.5)">pistón</text>

        {/* Flecha del pistón */}
        <line
          x1="248"
          y1={s.arrowDir === 'down' ? 175 : 210}
          x2="248"
          y2={s.arrowDir === 'down' ? 210 : 175}
          stroke={s.arrowDir === 'down' ? '#1D9E75' : '#888780'}
          strokeWidth="2"
          markerEnd={s.arrowDir === 'down' ? 'url(#arrow)' : 'url(#arrowGrey)'}
        />
        <text x="238" y="195" textAnchor="end" fontSize="9" fill="rgba(255,255,255,0.4)">
          {s.arrowDir === 'down' ? 'Baja' : 'Sube'}
        </text>

        {/* Sparks */}
        {s.sparks === 1 && (
          <g>
            <circle cx="370" cy="70" r="14" fill="#EF9F27" opacity="0.6" />
            <circle cx="370" cy="70" r="5" fill="#FFFFFF" />
          </g>
        )}

        {/* Entrada mezcla aire/nafta */}
        {s.inarrow === 1 && (
          <line x1="313" y1="34" x2="313" y2="48" stroke="#1D9E75" strokeWidth="2" markerEnd="url(#arrow)" />
        )}

        {/* Salida gases escape */}
        {s.outarrow === 1 && (
          <line x1="427" y1="48" x2="427" y2="34" stroke="#888780" strokeWidth="2" markerEnd="url(#arrowGrey)" />
        )}
      </svg>
    </div>
  )
}

// ==========================================
// 2. WIDGET: Conexiones Internas
// ==========================================
function ConexionesInternasWidget({ viewMode }: WidgetProps) {
  const [tab, setTab] = useState<'bulon' | 'mune' | 'valvulas'>('bulon')

  const infos = {
    bulon: {
      title: "El Bulón (Pasador de pistón)",
      desc: "Es un pasador cilíndrico de acero templado que atraviesa la parte interna del pistón y abraza el pie de la biela. Permite que la biela pivotee lateralmente mientras el pistón realiza su recorrido estrictamente vertical (arriba y abajo). Debe ser sumamente rígido para soportar los embates de la combustión sin deformarse.",
      tip: "El bulón trabaja a altas presiones. Si tiene juego excesivo, el pistón cabecea en el cilindro provocando desgastes prematuros."
    },
    mune: {
      title: "La Muñequilla (Codo de cigüeñal)",
      desc: "Es el eje descentrado del cigüeñal sobre el cual se atornilla la cabeza de la biela (mediante cojinetes de metal antifricción). Como la muñequilla está desplazada respecto al eje central de giro, el movimiento lineal de la biela se convierte mecánicamente en la rotación del cigüeñal.",
      tip: "Está permanentemente bañada en aceite a presión. Si baja la presión de aceite, se funde el cojinete de biela."
    },
    valvulas: {
      title: "Válvulas (Leva y resorte)",
      desc: "Las válvulas regulan el ingreso de aire fresco y la salida de gases. El árbol de levas presiona la válvula hacia abajo para abrirla. Al seguir girando la leva, la fuerza cesa y un resorte helicoidal de alta tensión empuja la válvula de vuelta hacia arriba, sellando herméticamente la cámara.",
      tip: "El resorte realiza todo el trabajo de cerrado. Si un resorte se vence o rompe, la válvula quedará colgada y el pistón la doblará."
    }
  }

  const i = infos[tab]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/biela_piston_desmontados.png"
        alt="Pistón, bulón y biela reales desmontados"
        hotspots={[
          { id: '1', x: 45, y: 22, title: 'Cabeza de Pistón', desc: 'Soporta la fuerza de la combustión. Posee las ranuras para los aros.' },
          { id: '2', x: 45, y: 44, title: 'El Bulón (Pasador)', desc: 'Pasador de acero cilíndrico que une el pistón al pie de la biela.' },
          { id: '3', x: 45, y: 68, title: 'Cuerpo de la Biela', desc: 'Brazo de acero forjado en forma de "H" que transmite la fuerza.' },
          { id: '4', x: 45, y: 88, title: 'Tapa y Cojinetes de Biela', desc: 'Medias lunas de fricción que abrazan la muñequilla del cigüeñal.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button
          className={`${styles.controlBtn} ${tab === 'bulon' ? styles.controlBtnActiveRed : ''}`}
          onClick={() => setTab('bulon')}
        >
          Bulón
        </button>
        <button
          className={`${styles.controlBtn} ${tab === 'mune' ? styles.controlBtnActiveGreen : ''}`}
          onClick={() => setTab('mune')}
        >
          Muñequilla
        </button>
        <button
          className={`${styles.controlBtn} ${tab === 'valvulas' ? styles.controlBtnActiveOrange : ''}`}
          onClick={() => setTab('valvulas')}
        >
          Válvulas
        </button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{i.title}</div>
        <div className={styles.infoBody}>{i.desc}</div>
        {i.tip && <div className={styles.infoTip}>💡 {i.tip}</div>}
      </div>

      <svg className={styles.svg} viewBox="0 0 680 380">
        <defs>
          <marker id="acon" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="#1D9E75" strokeWidth="1.5" strokeLinecap="round" />
          </marker>
        </defs>

        {/* Camisa de cilindro */}
        <rect x="280" y="70" width="14" height="240" fill="rgba(255,255,255,0.15)" />
        <rect x="466" y="70" width="14" height="240" fill="rgba(255,255,255,0.15)" />

        {/* Leva y árbol arriba */}
        <rect x="280" y="60" width="200" height="10" rx="4" fill="rgba(255,255,255,0.2)" />
        
        {/* Leva (rotativa) */}
        <ellipse
          cx="370"
          cy="58"
          rx="18"
          ry="22"
          fill="#BA7517"
          opacity={tab === 'valvulas' ? 0.9 : 0.15}
          transform={tab === 'valvulas' ? 'rotate(30 370 58)' : ''}
        />
        {tab === 'valvulas' && (
          <text x="370" y="44" textAnchor="middle" fontSize="10" fill="#BA7517" fontWeight="600">leva</text>
        )}

        {/* Válvula */}
        <g opacity={tab === 'valvulas' ? 1 : 0.15}>
          {/* Resorte */}
          <line x1="370" y1="80" x2="370" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="1" />
          <path d="M 362 100 Q 370 108 378 100 Q 386 92 378 84" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <path d="M 362 108 Q 370 116 378 108" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          <text x="400" y="98" fontSize="10" fill="rgba(255,255,255,0.6)">resorte</text>

          {/* Vástago de válvula */}
          <rect x="367" y="100" width="6" height="70" fill="#BA7517" opacity="0.8" />
          <ellipse cx="370" cy="170" rx="20" ry="6" fill="#BA7517" opacity="0.7" />
          <text x="400" y="166" fontSize="10" fill="#BA7517" fontWeight="600">válvula de admisión</text>
        </g>

        {/* Pistón */}
        <rect x="294" y="180" width="172" height="44" rx="6" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
        <text x="380" y="206" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.6)">pistón</text>

        {/* Bulón */}
        <rect
          x="358"
          y="192"
          width="44"
          height="20"
          rx="10"
          fill="#E24B4A"
          opacity={tab === 'bulon' ? 0.95 : 0.15}
        />
        {tab === 'bulon' && (
          <text x="410" y="205" fontSize="10" fill="#E24B4A" fontWeight="600">← bulón</text>
        )}

        {/* Biela */}
        <rect
          x="362"
          y="224"
          width="16"
          height="90"
          rx="4"
          fill="#534AB7"
          opacity={tab === 'valvulas' ? 0.2 : 0.8}
        />
        <text x="340" y="270" textAnchor="end" fontSize="10" fill="#534AB7" fontWeight="600" opacity={tab === 'valvulas' ? 0.2 : 1}>biela</text>

        {/* Muñequilla */}
        <rect
          x="348"
          y="308"
          width="64"
          height="24"
          rx="8"
          fill="#1D9E75"
          opacity={tab === 'mune' ? 0.95 : 0.15}
        />
        {tab === 'mune' && (
          <text x="420" y="324" fontSize="10" fill="#1D9E75" fontWeight="600">← muñequilla</text>
        )}

        {/* Cigüeñal */}
        <rect x="280" y="330" width="200" height="16" rx="6" fill="rgba(255,255,255,0.2)" />
        <text x="380" y="360" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">cigüeñal</text>
      </svg>
    </div>
  )
}

// ==========================================
// 3. WIDGET: Motor por Niveles
// ==========================================
function MotorNivelesWidget({ viewMode }: WidgetProps) {
  const [level, setLevel] = useState(0)

  const niveles = [
    {
      label: "Nivel 4 — Tapa",
      hl: "hl-niv4",
      title: "Nivel 4 — Tapa de Válvulas",
      body: "Es la cubierta superior de plástico o aluminio que se visualiza inmediatamente al abrir el capó. Su función principal es sellar la culata herméticamente para retener el aceite. Aloja el tapón de carga de lubricante (que lleva la inscripción 'OIL') y la bobina de encendido está atornillada encima de ella, distribuyendo los cables a las bujías.",
      tip: "Debajo de esta tapa se sitúa el árbol de levas de admisión y escape."
    },
    {
      label: "Nivel 3 — Culata",
      hl: "hl-niv3",
      title: "Nivel 3 — Culata (Tapa de cilindros)",
      body: "La culata está fijada justo debajo de la tapa de válvulas. Contiene las válvulas, guías y resortes, y los inyectores de nafta están atornillados aquí. También contiene la cámara de combustión donde salta la chispa. La junta de culata es un sello plano que separa este nivel del bloque.",
      tip: "⚠ Si el motor sufre un recalentamiento grave, la culata de aluminio se deforma y quema la junta de culata."
    },
    {
      label: "Nivel 2 — Bloque",
      hl: "hl-niv2",
      title: "Nivel 2 — Bloque del Motor",
      body: "El bloque es la estructura principal y más pesada del motor. Posee 4 cavidades perfectamente pulidas llamadas cilindros, donde se desplazan los pistones. Aloja internamente las bielas y el cigüeñal en su base. El bloque cuenta además con conductos internos por donde circula refrigerante y aceite a presión.",
      tip: "El bloque del motor Gol AP es de hierro de fundición, extremadamente duro pero pesado."
    },
    {
      label: "Nivel 1 — Cárter",
      hl: "hl-niv1",
      title: "Nivel 1 — Cárter de Aceite",
      body: "El cárter es la bandeja inferior que cierra el motor por debajo y sirve como depósito del lubricante. Cuando el motor se apaga, todo el aceite decanta aquí. Posee una varilla de medición que asoma por arriba y un tapón roscado en su base para vaciarlo en cada mantenimiento.",
      tip: "⚠ Un golpe fuerte en el cárter contra un pozo o piedra puede fisurarlo y vaciar el aceite, fundiendo el motor en instantes."
    },
    {
      label: "Correas y Poleas",
      hl: "hl-correas",
      title: "Correa de Distribución y Correas Auxiliares",
      body: "En el lateral del motor encontramos dos sistemas independientes. El interno es la correa de distribución (azul), dentada para sincronizar el cigüeñal con el árbol de levas y mover la bomba de agua. El externo es la correa auxiliar (verde), lisa, que mueve accesorios como el alternador y la dirección asistida.",
      tip: "⚠ La correa de distribución y la bomba de agua deben reemplazarse siempre juntas cada 60.000 km."
    }
  ]

  const n = niveles[level]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/motor_completo.png"
        alt="Motor Gol EA111 real"
        hotspots={[
          { id: '1', x: 48, y: 53, title: 'Tapa de Válvulas', desc: 'Capa metálica superior que cubre el árbol de levas y protege la distribución superior.' },
          { id: '2', x: 29, y: 43, title: 'Tapón de Carga de Aceite', desc: 'Tapón de carga de lubricante. Dice "OIL" y tiene el logo de lubricación.' },
          { id: '3', x: 43, y: 64, title: 'Cables de Bujías', desc: 'Llevan la alta tensión (25.000V) de la bobina a las bujías en la tapa.' },
          { id: '4', x: 91, y: 56, title: 'Depósito de Refrigerante', desc: 'Almacena el líquido de refrigeración. Muestra el nivel MIN/MAX.' },
          { id: '5', x: 10, y: 35, title: 'Batería 12V', desc: 'Fuente de energía eléctrica principal para arranque, luces y computadora (ECU).' },
          { id: '6', x: 20, y: 68, title: 'Alternador', desc: 'Genera corriente eléctrica al girar para alimentar circuitos y cargar la batería.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {niveles.map((nv, idx) => (
          <button
            key={idx}
            className={`${styles.controlBtn} ${level === idx ? styles.controlBtnActive : ''}`}
            onClick={() => setLevel(idx)}
          >
            {nv.label.replace(' — Tapa', '').replace(' — Culata', '').replace(' — Bloque', '').replace(' — Cárter', '')}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{n.title}</div>
        <div className={styles.infoBody}>{n.body}</div>
        <div className={styles.infoTip}>💡 {n.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 520">
        {/* NIVEL 4: TAPA */}
        <g opacity={level === 0 || level === 5 ? 1 : 0.25}>
          <rect x="180" y="20" width="280" height="50" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x="320" y="42" textAnchor="middle" fontSize="11" fontWeight="500" fill="#ffffff">Tapa de válvulas</text>
          <text x="320" y="58" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)">árbol de levas · tapón aceite</text>
          
          <rect x="340" y="22" width="110" height="30" rx="5" fill="#534AB7" opacity="0.6" />
          <text x="395" y="41" textAnchor="middle" fontSize="9" fill="#ffffff">Bobina + cables</text>
        </g>

        {/* NIVEL 3: CULATA */}
        <g opacity={level === 1 || level === 5 ? 1 : 0.25}>
          <rect x="180" y="100" width="280" height="60" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x="320" y="122" textAnchor="middle" fontSize="11" fontWeight="500" fill="#ffffff">Culata (cabeza)</text>
          <text x="320" y="138" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)">válvulas · inyectores · cámara</text>

          {/* Junta culata */}
          <rect x="180" y="160" width="280" height="8" fill="rgba(255,255,255,0.3)" />
          <text x="470" y="166" fontSize="8" fill="rgba(255,255,255,0.5)">← junta de culata</text>
        </g>

        {/* NIVEL 2: BLOQUE */}
        <g opacity={level === 2 || level === 5 ? 1 : 0.25}>
          <rect x="180" y="168" width="280" height="130" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <text x="320" y="190" textAnchor="middle" fontSize="11" fontWeight="500" fill="#ffffff">Bloque del motor (corazón)</text>
          {/* Cilindros */}
          <rect x="192" y="205" width="52" height="80" rx="4" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          <rect x="252" y="205" width="52" height="80" rx="4" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          <rect x="312" y="205" width="52" height="80" rx="4" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          <rect x="372" y="205" width="52" height="80" rx="4" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.5" />
          <text x="320" y="246" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)">4 cilindros + pistones</text>
        </g>

        {/* NIVEL 1: CARTER */}
        <g opacity={level === 3 || level === 5 ? 1 : 0.25}>
          <rect x="180" y="298" width="280" height="50" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          <text x="320" y="320" textAnchor="middle" fontSize="11" fontWeight="500" fill="#ffffff">Cárter de aceite</text>
          <text x="320" y="336" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)">depósito aceite · tapón vaciado</text>
          <rect x="183" y="318" width="274" height="27" fill="#BA7517" opacity="0.1" />
        </g>

        {/* CORREAS Y POLEAS */}
        <g opacity={level === 4 || level === 5 ? 1 : 0.25}>
          {/* Poleas */}
          <circle cx="580" cy="110" r="24" fill="none" stroke="#BA7517" strokeWidth="1.5" />
          <circle cx="580" cy="300" r="32" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
          
          {/* Correa distribución */}
          <rect x="562" y="134" width="36" height="136" fill="none" stroke="#534AB7" strokeWidth="6" opacity="0.4" />
          <text x="540" y="200" textAnchor="end" fontSize="9" fill="#534AB7">correa dist.</text>
          
          {/* Alternador y correa auxiliar */}
          <circle cx="580" cy="390" r="18" fill="none" stroke="#1D9E75" strokeWidth="1.5" />
          <rect x="568" y="332" width="24" height="40" fill="none" stroke="#1D9E75" strokeWidth="3" opacity="0.4" />
          <text x="540" y="360" textAnchor="end" fontSize="9" fill="#1D9E75">correa aux.</text>
          <text x="580" y="460" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.3)">lado de correas (lateral)</text>
        </g>

        {/* HIGHLIGHT BOXES */}
        {level === 0 && <rect x="176" y="16" width="288" height="58" rx="10" fill="none" stroke="#BA7517" strokeWidth="2.5" />}
        {level === 1 && <rect x="176" y="96" width="288" height="74" rx="8" fill="none" stroke="#1D9E75" strokeWidth="2.5" />}
        {level === 2 && <rect x="176" y="164" width="288" height="138" rx="8" fill="none" stroke="#534AB7" strokeWidth="2.5" />}
        {level === 3 && <rect x="176" y="294" width="288" height="58" rx="8" fill="none" stroke="#854F0B" strokeWidth="2.5" />}
        {level === 4 && <rect x="530" y="80" width="130" height="340" rx="10" fill="none" stroke="#E24B4A" strokeWidth="2" />}
      </svg>
    </div>
  )
}

// ==========================================
// 4. WIDGET: Aros Detalle
// ==========================================
function ArosDetalleWidget({ viewMode }: WidgetProps) {
  const [aro, setAro] = useState(0)

  const aros = [
    {
      label: "Aro 1",
      title: "Aro 1 — Primer aro de compresión",
      body: "Es el anillo más cercano a la cabeza del pistón y, por ende, a la explosión. Sella herméticamente los gases a presiones extremas y temperaturas de hasta 800°C. Al bajar el pistón, desliza sobre la fina película de aceite lubricante de la camisa para disipar calor hacia el bloque.",
      tip: "Está hecho de aleaciones de acero muy resistentes con recubrimiento de cromo."
    },
    {
      label: "Aro 2",
      title: "Aro 2 — Segundo aro de compresión",
      body: "Ubicado debajo del aro 1. Su función es dual: actúa como barrera de respaldo (si algo de gas de combustión logra fugar del primer aro, este lo frena) y además ayuda al aro rascador a dosificar la cantidad de aceite que sube desde el cárter, arrastrando el excedente.",
      tip: "Tiene una forma ligeramente cónica para 'raspar' de arriba a abajo."
    },
    {
      label: "Aro 3",
      title: "Aro 3 — Aro rascador de aceite",
      body: "Este aro tiene canales y un resorte expulsor interno. Su trabajo exclusivo es el control de aceite. Al bajar el pistón, el aro rascador barre todo el aceite excedente pegado a la pared del cilindro y lo drena de vuelta al cárter a través de pequeños orificios ubicados en la ranura del pistón.",
      tip: "⚠ Si el aro rascador se daña o se pega por carbonilla, el aceite sube y se quema → humo azul."
    },
    {
      label: "Lubricación",
      title: "¿Por qué no se desgasta rozando?",
      body: "Los aros rozan constantemente contra la camisa de hierro a altas velocidades, pero nunca entran en contacto en seco. El aro rascador dosifica una película microscópica de aceite de solo 2 micrones de grosor. Los aros deslizan hidrodinámicamente sobre ella, como un surfista sobre el agua.",
      tip: "Por eso el aceite limpio y en buen estado es fundamental. Aceite viejo = roce seco = motor fundido."
    }
  ]

  const a = aros[aro]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/aros_piston.png"
        alt="Aros de pistón reales"
        hotspots={[
          { id: '1', x: 24, y: 48, title: 'Aro 1: Compresión', desc: 'El primer anillo de acero endurecido. Sella los gases calientes de combustión a 800°C.' },
          { id: '2', x: 49, y: 48, title: 'Aro 2: Compresión', desc: 'Segundo anillo. Refuerza el sellado y ayuda a rascar el remanente de aceite.' },
          { id: '3', x: 77, y: 48, title: 'Aro 3: Rascador de aceite', desc: 'Anillo con resorte expansor. Raspa el exceso de aceite de la camisa y lo drena al cárter.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {aros.map((ar, idx) => (
          <button
            key={idx}
            className={`${styles.controlBtn} ${aro === idx ? styles.controlBtnActiveGreen : ''}`}
            onClick={() => setAro(idx)}
          >
            {ar.label}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{a.title}</div>
        <div className={styles.infoBody}>{a.body}</div>
        <div className={styles.infoTip}>💡 {a.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 340">
        {/* Paredes cilindro */}
        <rect x="240" y="20" width="16" height="280" fill="rgba(255,255,255,0.15)" />
        <rect x="424" y="20" width="16" height="280" fill="rgba(255,255,255,0.15)" />

        {/* Película de aceite */}
        <rect x="256" y="20" width="6" height="280" fill="#BA7517" opacity="0.25" />
        <rect x="418" y="20" width="6" height="280" fill="#BA7517" opacity="0.25" />
        <text x="230" y="160" textAnchor="middle" fontSize="8" fill="#BA7517" transform="rotate(-90,230,160)">película de aceite</text>

        {/* Cuerpo del pistón */}
        <rect x="262" y="60" width="156" height="190" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <text x="340" y="160" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.5)">pistón</text>

        {/* Aro 1 */}
        <rect x="252" y="72" width="16" height="12" rx="2" fill="#534AB7" opacity={aro === 0 ? 1 : 0.4} />
        <rect x="412" y="72" width="16" height="12" rx="2" fill="#534AB7" opacity={aro === 0 ? 1 : 0.4} />

        {/* Aro 2 */}
        <rect x="252" y="98" width="16" height="12" rx="2" fill="#534AB7" opacity={aro === 1 ? 1 : 0.4} />
        <rect x="412" y="98" width="16" height="12" rx="2" fill="#534AB7" opacity={aro === 1 ? 1 : 0.4} />

        {/* Aro 3 */}
        <rect x="252" y="132" width="16" height="14" rx="2" fill="#BA7517" opacity={aro === 2 ? 1 : 0.4} />
        <rect x="412" y="132" width="16" height="14" rx="2" fill="#BA7517" opacity={aro === 2 ? 1 : 0.4} />

        {/* Highlights */}
        {aro === 0 && (
          <g>
            <rect x="249" y="69" width="22" height="18" fill="none" stroke="#e24b4a" strokeWidth="1.5" />
            <rect x="409" y="69" width="22" height="18" fill="none" stroke="#e24b4a" strokeWidth="1.5" />
            <text x="435" y="83" fontSize="10" fill="#e24b4a" fontWeight="600">Aro 1 compresión</text>
          </g>
        )}
        {aro === 1 && (
          <g>
            <rect x="249" y="95" width="22" height="18" fill="none" stroke="#e24b4a" strokeWidth="1.5" />
            <rect x="409" y="95" width="22" height="18" fill="none" stroke="#e24b4a" strokeWidth="1.5" />
            <text x="435" y="109" fontSize="10" fill="#e24b4a" fontWeight="600">Aro 2 compresión</text>
          </g>
        )}
        {aro === 2 && (
          <g>
            <rect x="249" y="129" width="22" height="20" fill="none" stroke="#e24b4a" strokeWidth="1.5" />
            <rect x="409" y="129" width="22" height="20" fill="none" stroke="#e24b4a" strokeWidth="1.5" />
            <text x="435" y="143" fontSize="10" fill="#e24b4a" fontWeight="600">Aro 3 rascador de aceite</text>
          </g>
        )}
      </svg>
    </div>
  )
}

// ==========================================
// 5. WIDGET: Aros Separacion
// ==========================================
function ArosSeparacionWidget({ viewMode }: WidgetProps) {
  const [falla, setFalla] = useState(false)

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/piston_sucio.png"
        alt="Pistón dañado real"
        hotspots={[
          { id: '1', x: 50, y: 25, title: 'Acumulación de Carbón', desc: 'Causado por el aceite quemado en la cámara. Empaña la bujía y provoca fallas.' },
          { id: '2', x: 50, y: 37, title: 'Aros desgastados', desc: 'Perdieron tensión. Dejan pasar el aceite hacia la cámara de combustión.' },
          { id: '3', x: 58, y: 63, title: 'Rayaduras por roce seco', desc: 'La falta de lubricación por aros rotos hace rozar metal con metal, destruyendo el cilindro.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button
          className={`${styles.controlBtn} ${!falla ? styles.controlBtnActiveGreen : ''}`}
          onClick={() => setFalla(false)}
        >
          Motor sano
        </button>
        <button
          className={`${styles.controlBtn} ${falla ? styles.controlBtnActiveRed : ''}`}
          onClick={() => setFalla(true)}
        >
          Aros gastados (Falla)
        </button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{falla ? 'Aros gastados y fuga de aceite' : 'Motor sano y hermético'}</div>
        <div className={styles.infoBody}>
          {falla
            ? 'Los aros perdieron elasticidad o se rompieron. Al bajar el pistón, el aro 3 no barre el aceite de la pared del cilindro. El aceite sube a la zona de combustión, se quema con la chispa y genera humo azul y residuos de carbón.'
            : 'Los aros de compresión sellan la fuerza de la explosión en la cámara de combustión (verde) y el aro rascador limpia perfectamente la película de aceite de la camisa, manteniéndolo en la zona de cárter (ámbar).'}
        </div>
        {falla && <div className={styles.infoTip} style={{ color: '#e24b4a' }}>⚠ Síntoma: Humo azul por el escape, consumo constante de aceite en varilla y bujías sucias.</div>}
      </div>

      <svg className={styles.svg} viewBox="0 0 680 340">
        {/* Camisa */}
        <rect x="270" y="20" width="18" height="290" fill="rgba(255,255,255,0.15)" />
        <rect x="512" y="20" width="18" height="290" fill="rgba(255,255,255,0.15)" />

        {/* Zonas */}
        <rect x="288" y="20" width="224" height="120" fill={falla ? '#BA7517' : '#1D9E75'} opacity={falla ? 0.25 : 0.08} />
        <text x="400" y="60" textAnchor="middle" fontSize="11" fill={falla ? '#e24b4a' : '#1D9E75'} fontWeight="600">
          {falla ? 'ZONA COMBUSTIÓN CONTAMINADA' : 'ZONA COMBUSTIÓN (LIMPIA)'}
        </text>

        <rect x="288" y="250" width="224" height="60" fill="#BA7517" opacity="0.1" />
        <text x="400" y="280" textAnchor="middle" fontSize="10" fill="#BA7517">ZONA ACEITE (CÁRTER)</text>

        {/* Pistón */}
        <rect x="300" y="125" width="200" height="130" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />

        {/* Aros */}
        <rect x="288" y="130" width="14" height="10" rx="2" fill="#534AB7" opacity={falla ? 0.35 : 1} />
        <rect x="526" y="130" width="14" height="10" rx="2" fill="#534AB7" opacity={falla ? 0.35 : 1} />
        <rect x="288" y="150" width="14" height="10" rx="2" fill="#534AB7" opacity={falla ? 0.35 : 1} />
        <rect x="526" y="150" width="14" height="10" rx="2" fill="#534AB7" opacity={falla ? 0.35 : 1} />
        <rect x="288" y="200" width="14" height="10" rx="2" fill="#BA7517" opacity={falla ? 0.35 : 1} />
        <rect x="526" y="200" width="14" height="10" rx="2" fill="#BA7517" opacity={falla ? 0.35 : 1} />

        {/* Fuga de aceite */}
        {falla && (
          <g>
            <path d="M 310 230 Q 315 190 310 160 Q 305 140 315 110" fill="none" stroke="#BA7517" strokeWidth="2.5" strokeDasharray="5 3" />
            <path d="M 490 230 Q 485 190 490 160 Q 495 140 485 110" fill="none" stroke="#BA7517" strokeWidth="2.5" stroke-dasharray="5 3" />
            <text x="400" y="170" textAnchor="middle" fontSize="10" fill="#e24b4a" fontWeight="600">aceite fugando hacia arriba</text>
          </g>
        )}

        {/* Línea divisoria */}
        {!falla && (
          <line x1="270" y1="180" x2="530" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="6 4" />
        )}
      </svg>
    </div>
  )
}

// ==========================================
// 6. WIDGET: Ciguenal y Levas
// ==========================================
function CiguenalLevasWidget({ viewMode }: WidgetProps) {
  const [tab, setTab] = useState<'cig' | 'levas' | 'juntos' | 'correa'>('cig')

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/arbol_levas_culata.png"
        alt="Árbol de levas y culata reales de motor EA111"
        hotspots={[
          { id: '1', x: 45, y: 32, title: 'Árbol de levas', desc: 'Eje superior de acero que controla la sincronía de apertura valvular.' },
          { id: '2', x: 55, y: 46, title: 'Lóbulos de Leva', desc: 'Las crestas o codos excéntricos del eje que empujan los taqués/válvulas.' },
          { id: '3', x: 32, y: 65, title: 'Guías de Válvulas y Resortes', desc: 'Los resortes helicoidales de alta tensión que cierran herméticamente las válvulas.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${tab === 'cig' ? styles.controlBtnActive : ''}`} onClick={() => setTab('cig')}>Cigüeñal</button>
        <button className={`${styles.controlBtn} ${tab === 'levas' ? styles.controlBtnActive : ''}`} onClick={() => setTab('levas')}>Árbol levas</button>
        <button className={`${styles.controlBtn} ${tab === 'juntos' ? styles.controlBtnActive : ''}`} onClick={() => setTab('juntos')}>Trabajo conjunto</button>
        <button className={`${styles.controlBtn} ${tab === 'correa' ? styles.controlBtnActiveRed : ''}`} onClick={() => setTab('correa')}>Correa</button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>
          {tab === 'cig' && 'El Cigüeñal (Eje de transmisión inferior)'}
          {tab === 'levas' && 'El Árbol de Levas (Control superior)'}
          {tab === 'juntos' && 'Sincronía de velocidad (Relación 2:1)'}
          {tab === 'correa' && 'Correa de distribución'}
        </div>
        <div className={styles.infoBody}>
          {tab === 'cig' && 'Situado en la base del bloque. Recibe el empuje alternado de los 4 pistones y bielas y lo transforma en giro continuo. Al final del cigüeñal se acopla el volante motor que conecta al embrague.'}
          {tab === 'levas' && 'Ubicado en la parte superior (culata). Es un eje con lóbulos descentrados (levas) que, al girar, empujan hacia abajo los taqués abriendo las válvulas. Su sincronía determina el correcto flujo de aire.'}
          {tab === 'juntos' && 'Para realizar el ciclo de 4 tiempos completo, el motor necesita dar 2 vueltas del cigüeñal por cada 1 vuelta del árbol de levas. La correa de distribución acopla ambos ejes en esta exacta proporción (2:1).'}
          {tab === 'correa' && 'Es una banda de caucho dentada reforzada con fibras. Su misión es sincronizar las poleas. Si salta un diente, la puesta a punto se desfasa y el motor andará mal. Si se corta, válvulas y pistones colisionarán.'}
        </div>
        {tab === 'correa' && <div className={styles.infoTip} style={{ color: '#e24b4a' }}>⚠ Mantenimiento crítico: Reemplazar obligatoriamente cada 60.000 km.</div>}
      </div>

      <svg className={styles.svg} viewBox="0 0 680 340">
        {tab === 'cig' && (
          <g>
            {/* Cigüeñal principal */}
            <rect x="220" y="160" width="360" height="20" rx="6" fill="rgba(255,255,255,0.3)" />
            {/* Muñequillas */}
            <rect x="250" y="130" width="18" height="30" rx="4" fill="#534AB7" />
            <rect x="310" y="150" width="18" height="30" rx="4" fill="#534AB7" />
            <rect x="370" y="130" width="18" height="30" rx="4" fill="#534AB7" />
            <rect x="430" y="150" width="18" height="30" rx="4" fill="#534AB7" />
            {/* Bielas */}
            <line x1="259" y1="130" x2="259" y2="80" stroke="#534AB7" strokeWidth="4" />
            <line x1="319" y1="150" x2="319" y2="70" stroke="#534AB7" strokeWidth="4" />
            {/* Volante */}
            <circle cx="590" cy="170" r="26" fill="none" stroke="#1D9E75" strokeWidth="2" />
            <text x="590" y="210" textAnchor="middle" fontSize="10" fill="#1D9E75">volante motor</text>
            <text x="400" y="200" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.4)">cigüeñal (eje de giros)</text>
          </g>
        )}

        {tab === 'levas' && (
          <g>
            {/* Árbol */}
            <rect x="220" y="100" width="360" height="14" rx="4" fill="rgba(255,255,255,0.2)" />
            {/* Levas */}
            <ellipse cx="260" cy="100" rx="8" ry="18" fill="#BA7517" />
            <ellipse cx="290" cy="100" rx="8" ry="12" fill="rgba(255,255,255,0.3)" />
            <ellipse cx="320" cy="100" rx="8" ry="18" fill="#BA7517" />
            <ellipse cx="350" cy="100" rx="8" ry="12" fill="rgba(255,255,255,0.3)" />
            <text x="400" y="140" textAnchor="middle" fontSize="11" fill="#BA7517">árbol de levas (1 por culata en Gol AP)</text>
          </g>
        )}

        {tab === 'juntos' && (
          <g>
            {/* Árbol arriba */}
            <rect x="250" y="60" width="300" height="10" fill="rgba(255,255,255,0.2)" />
            <ellipse cx="280" cy="60" rx="6" ry="14" fill="#BA7517" />
            <ellipse cx="340" cy="60" rx="6" ry="14" fill="#BA7517" />
            <text x="450" y="50" fontSize="10" fill="#BA7517">árbol de levas (gira 1x)</text>

            {/* Cigüeñal abajo */}
            <rect x="250" y="220" width="300" height="14" fill="rgba(255,255,255,0.2)" />
            <rect x="274" y="196" width="12" height="24" fill="#534AB7" />
            <rect x="334" y="210" width="12" height="24" fill="#534AB7" />
            <text x="450" y="250" fontSize="10" fill="rgba(255,255,255,0.5)">cigüeñal (gira 2x)</text>

            {/* Correa conectora */}
            <rect x="230" y="55" width="12" height="180" fill="none" stroke="#1D9E75" strokeWidth="2" strokeDasharray="5 3" />
            <text x="215" y="150" textAnchor="middle" fontSize="9" fill="#1D9E75" transform="rotate(-90 215 150)">correa distribución</text>
          </g>
        )}

        {tab === 'correa' && (
          <g>
            {/* Polea levas */}
            <circle cx="340" cy="100" r="30" fill="none" stroke="#BA7517" strokeWidth="2" />
            <text x="340" y="97" textAnchor="middle" fontSize="9" fill="#BA7517">polea levas</text>
            
            {/* Polea cigüeñal */}
            <circle cx="340" cy="240" r="46" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="2" />
            <text x="340" y="237" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.5)">polea cigüeñal</text>

            {/* Correa */}
            <rect x="320" y="118" width="40" height="106" fill="none" stroke="#534AB7" strokeWidth="8" opacity="0.5" />
            <text x="390" y="170" fontSize="11" fill="#534AB7" fontWeight="600">Correa dentada</text>
          </g>
        )}
      </svg>
    </div>
  )
}

// ==========================================
// 7. WIDGET: Sincronizacion Correa
// ==========================================
function SincronizacionCorreaWidget({ viewMode }: WidgetProps) {
  const [tab, setTab] = useState<'marcas' | 'pasos' | 'error'>('marcas')

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/correa_distribucion.png"
        alt="Correa de distribución montada"
        hotspots={[
          { id: '1', x: 44, y: 50, title: 'Engranaje de Árbol de levas', desc: 'Polea superior de 1x. Sincroniza la apertura de las válvulas.' },
          { id: '2', x: 63, y: 64, title: 'Correa dentada', desc: 'Hecha de caucho de alta densidad con dientes internos antideslizantes.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${tab === 'marcas' ? styles.controlBtnActive : ''}`} onClick={() => setTab('marcas')}>Marcas</button>
        <button className={`${styles.controlBtn} ${tab === 'pasos' ? styles.controlBtnActive : ''}`} onClick={() => setTab('pasos')}>Pasos de Cambio</button>
        <button className={`${styles.controlBtn} ${tab === 'error' ? styles.controlBtnActiveRed : ''}`} onClick={() => setTab('error')}>Fallas por Error</button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>
          {tab === 'marcas' && 'Puntos de Puesta a Punto'}
          {tab === 'pasos' && 'Proceso de Cambio Paso a Paso'}
          {tab === 'error' && 'Consecuencias de Colocación Errónea'}
        </div>
        <div className={styles.infoBody}>
          {tab === 'marcas' && 'Para sincronizar la distribución, cada polea posee marcas grabadas de fábrica. Antes de desmontar la correa vieja, se debe girar el motor a mano hasta alinear el punto del árbol de levas con la tapa de cilindros y la marca del cigüeñal (PMS) con la referencia del bloque.'}
          {tab === 'pasos' && 'El proceso correcto: 1) Alinear marcas a mano, 2) Trabar/marcar engranes con corrector, 3) Aflojar rodamiento tensor y retirar correa vieja, 4) Colocar correa nueva en orden (cigüeñal → levas → bomba → tensor) y ajustar el tensor, 5) Dar 2 vueltas completas de motor a mano y verificar que las marcas coincidan perfectamente.'}
          {tab === 'error' && 'Si la correa queda corrida por 1 diente: el auto arranca pero falla, vibra, consume nafta y pierde toda la potencia. Si queda corrida por más dientes: las válvulas de admisión o escape abrirán en el momento en que el pistón sube al PMS, chocando metal con metal y doblando las válvulas.'}
        </div>
        {tab === 'error' && <div className={styles.infoTip} style={{ color: '#e24b4a' }}>⚠ Costo alto: Reparar válvulas dobladas requiere desmontar toda la culata y rectificarla.</div>}
      </div>

      {tab === 'pasos' ? (
        <div style={{ padding: '8px 4px' }}>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>1</div>
            <div className={styles.stepContent}>
              <div className={styles.stepTextPrimary}>Girar motor a mano y alinear marcas PMS</div>
              <div className={styles.stepTextSecondary}>Usá una llave en la polea del cigüeñal con la correa vieja colocada.</div>
            </div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>2</div>
            <div className={styles.stepContent}>
              <div className={styles.stepTextPrimary}>Pintar marcas de respaldo con corrector</div>
              <div className={styles.stepTextSecondary}>Hacé líneas blancas que crucen el diente del engranaje y la chapa trasera.</div>
            </div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>3</div>
            <div className={styles.stepContent}>
              <div className={styles.stepTextPrimary}>Aflojar rodamiento tensor y cambiar correa</div>
              <div className={styles.stepTextSecondary}>Aflojá la tuerca del tensor. Quitá la correa vieja e instalá la nueva sin mover poleas.</div>
            </div>
          </div>
          <div className={styles.stepCard}>
            <div className={styles.stepNum}>4</div>
            <div className={styles.stepContent}>
              <div className={styles.stepTextPrimary}>Verificar dando 2 vueltas de cigüeñal a mano</div>
              <div className={styles.stepTextSecondary}>⚠ CRÍTICO: Girar el motor a mano 2 vueltas. Si se traba, NO sigas. Si gira libre y coinciden marcas, está OK.</div>
            </div>
          </div>
        </div>
      ) : (
        <svg className={styles.svg} viewBox="0 0 680 340">
          {tab === 'marcas' ? (
            <g>
              {/* Polea arriba */}
              <circle cx="340" cy="110" r="32" fill="none" stroke="#BA7517" strokeWidth="1.5" />
              {/* Marca superior */}
              <polygon points="340,78 334,90 346,90" fill="#E24B4A" />
              <rect x="336" y="66" width="8" height="12" fill="rgba(255,255,255,0.4)" />
              <text x="390" y="85" fontSize="10" fill="#E24B4A">← punto árbol de levas</text>

              {/* Polea abajo */}
              <circle cx="340" cy="240" r="44" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              {/* Marca inferior */}
              <polygon points="340,196 334,208 346,208" fill="#E24B4A" />
              <rect x="336" y="184" width="8" height="12" fill="rgba(255,255,255,0.4)" />
              <text x="390" y="202" fontSize="10" fill="#E24B4A">← punto cigüeñal (PMS)</text>

              {/* Correa */}
              <rect x="322" y="132" width="36" height="74" fill="none" stroke="#534AB7" strokeWidth="6" opacity="0.3" />

              <rect x="230" y="280" width="220" height="32" rx="6" fill="rgba(29, 158, 117, 0.1)" stroke="#1D9E75" strokeWidth="1" />
              <text x="340" y="300" textAnchor="middle" fontSize="11" fill="#1D9E75" fontWeight="600">✓ Alineación perfecta = Motor sincronizado</text>
            </g>
          ) : (
            <g>
              {/* Desalineado */}
              <circle cx="340" cy="110" r="32" fill="none" stroke="#E24B4A" strokeWidth="1.5" />
              <polygon points="320,84 314,96 326,96" fill="#E24B4A" />
              <rect x="336" y="66" width="8" height="12" fill="rgba(255,255,255,0.4)" />
              <text x="390" y="85" fontSize="10" fill="#E24B4A">✗ diente desfasado</text>

              {/* Colisión pistón-válvula */}
              <rect x="100" y="160" width="180" height="110" rx="8" fill="rgba(226, 75, 74, 0.1)" stroke="#E24B4A" strokeWidth="1" />
              <text x="190" y="186" textAnchor="middle" fontSize="12" fill="#E24B4A" fontWeight="600">Choque mecánico</text>
              <text x="190" y="210" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)">Pistón sube al PMS</text>
              <text x="190" y="226" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.7)">y la válvula abre antes.</text>
              <text x="190" y="250" textAnchor="middle" fontSize="10" fill="#E24B4A">Válvulas dobladas = Culata rota</text>
            </g>
          )}
        </svg>
      )}
    </div>
  )
}

// ==========================================
// 8. WIDGET: Bloqueo Poleas
// ==========================================
function BloqueoPoleasWidget({ viewMode }: WidgetProps) {
  const [tab, setTab] = useState<'prob' | 'sol'>('prob')

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/bloqueo_engranaje.png"
        alt="Bloqueador mecánico de poleas de distribución"
        hotspots={[
          { id: '1', x: 50, y: 46, title: 'Herramienta de traba', desc: 'Pasador/grapa metálica instalada entre los dientes de las poleas para bloquear el movimiento relativo.' },
          { id: '2', x: 26, y: 35, title: 'Engranaje del Árbol de levas', desc: 'Polea superior de distribución que se mantiene alineada a la marca fija del bloque.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${tab === 'prob' ? styles.controlBtnActiveRed : ''}`} onClick={() => setTab('prob')}>El Problema</button>
        <button className={`${styles.controlBtn} ${tab === 'sol' ? styles.controlBtnActiveGreen : ''}`} onClick={() => setTab('sol')}>La Solución</button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{tab === 'prob' ? 'Giro involuntario por resortes de válvulas' : 'Bloqueo físico o marcas auxiliares'}</div>
        <div className={styles.infoBody}>
          {tab === 'prob'
            ? 'Al sacar la correa, las poleas quedan flotando. Como las levas empujan las válvulas comprimiendo sus resortes, la misma fuerza del resorte empuja de vuelta a la leva, haciendo girar el árbol de levas en seco y desfasando la sincronía.'
            : 'Para evitar el giro, se puede trabar el engranaje con un perno de bloqueo especial. En el Gol, al no tener polea loca y ser simple, el método más rápido y confiable de respaldo es pintar marcas de alineación con corrector blanco antes de soltar la correa.'}
        </div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 340">
        {tab === 'prob' ? (
          <g>
            {/* Polea girando */}
            <circle cx="340" cy="120" r="36" fill="none" stroke="#E24B4A" strokeWidth="1.5" />
            <polygon points="340,84 333,96 347,96" fill="#1D9E75" />
            <path d="M 370 90 Q 395 105 385 125" fill="none" stroke="#E24B4A" strokeWidth="2.5" strokeDasharray="4 3" />
            <text x="400" y="112" fontSize="10" fill="#E24B4A">gira sola por resorte</text>
            <text x="340" y="122" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">árbol levas</text>

            <rect x="230" y="200" width="220" height="90" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
            <text x="340" y="224" textAnchor="middle" fontSize="11" fill="#E24B4A" fontWeight="600">Resorte comprimido empuja leva</text>
            <text x="340" y="244" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.65)">Si no se bloquea, el árbol girará</text>
            <text x="340" y="260" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.65)">hacia la posición donde el resorte se relaje.</text>
          </g>
        ) : (
          <g>
            {/* Polea bloqueada */}
            <circle cx="340" cy="120" r="36" fill="none" stroke="#1D9E75" strokeWidth="2" />
            {/* Perno de bloqueo */}
            <rect x="356" y="108" width="55" height="14" rx="4" fill="#534AB7" />
            <rect x="411" y="113" width="35" height="6" rx="2" fill="#534AB7" opacity="0.6" />
            <text x="455" y="118" fontSize="10" fill="#534AB7" fontWeight="600">perno de bloqueo</text>

            {/* Marcas de corrector */}
            <line x1="334" y1="84" x2="346" y2="84" stroke="white" strokeWidth="3" />
            <line x1="334" y1="84" x2="310" y2="70" stroke="white" strokeWidth="3" />
            <text x="340" y="65" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.6)">corrector blanco</text>

            <rect x="230" y="200" width="220" height="90" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.06)" />
            <text x="340" y="224" textAnchor="middle" fontSize="11" fill="#1D9E75" fontWeight="600">Truco del corrector mecánico</text>
            <text x="340" y="244" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.65)">Pintar una línea que cruce el engranaje</text>
            <text x="340" y="260" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.65)">y la chapa fija de fondo antes de desarmar.</text>
          </g>
        )}
      </svg>
    </div>
  )
}

// ==========================================
// 9. WIDGET: Colores Humo
// ==========================================
function ColoresHumoWidget({ viewMode }: WidgetProps) {
  const [color, setColor] = useState<'blanco' | 'azul' | 'negro'>('blanco')

  const humos = {
    blanco: {
      title: "Humo Blanco (Refrigerante / vapor)",
      desc: "El refrigerante o agua está ingresando a los cilindros. Al ocurrir la chispa, el agua hierve y se evacúa como vapor blanco denso por el escape. Causado habitualmente por junta de culata quemada, culata fisurada o bloque deformado. En invierno, un sutil vapor al encender el auto que dura 2 minutos es normal (condensación).",
      tip: "Revisá el tapón de aceite: si tiene una pasta lechosa ('mayonesa'), indica mezcla de agua con aceite.",
      smokeColor: "#ffffff",
      smokeOp: 0.85
    },
    azul: {
      title: "Humo Azulado / Gris (Aceite de motor)",
      desc: "El aceite lubricante está cruzando a la cámara de combustión. Causado por aros de pistón desgastados o retenes de válvulas secos/rotos. El motor consume el lubricante del cárter obligando a reponer nivel de forma periódica. Si el humo azul ocurre solo al arrancar en frío y cesa en caliente, suele indicar retenes de válvulas.",
      tip: "Requiere desarme y rectificación o cambio de aros en el bloque.",
      smokeColor: "#85B7EB",
      smokeOp: 0.6
    },
    negro: {
      title: "Humo Negro (Exceso de combustible)",
      desc: "La mezcla de combustión es demasiado rica (mucha nafta y poco aire). Indica combustible sin quemar. Las causas más usuales son: filtro de aire completamente tapado, inyector que gotea en lugar de pulverizar, sensor MAP/MAF defectuoso o sonda lambda muerta.",
      tip: "✓ Se soluciona de forma más sencilla: limpieza de inyectores, filtros nuevos o cambio de sensor.",
      smokeColor: "#444441",
      smokeOp: 0.85
    }
  }

  const h = humos[color]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/escape_humo_azul.png"
        alt="Escape del auto emitiendo humo azulado"
        hotspots={[
          { id: '1', x: 48, y: 55, title: 'Cola de Escape', desc: 'Salida final de los gases. El hollín aceitoso indica que el motor está quemando lubricante.' },
          { id: '2', x: 74, y: 46, title: 'Humo azul / gris denso', desc: 'Color característico provocado por el aceite de motor ingresando a la cámara de combustión (aros o guías rotas).' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${color === 'blanco' ? styles.controlBtnActive : ''}`} onClick={() => setColor('blanco')}>⬜ Blanco</button>
        <button className={`${styles.controlBtn} ${color === 'azul' ? styles.controlBtnActive : ''}`} onClick={() => setColor('azul')}>🔵 Azul/Gris</button>
        <button className={`${styles.controlBtn} ${color === 'negro' ? styles.controlBtnActive : ''}`} onClick={() => setColor('negro')}>⬛ Negro</button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{h.title}</div>
        <div className={styles.infoBody}>{h.desc}</div>
        <div className={styles.infoTip}>💡 {h.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 320">
        {/* Caño escape */}
        <rect x="30" y="240" width="80" height="30" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
        <rect x="110" y="248" width="40" height="14" rx="4" fill="rgba(255,255,255,0.2)" />

        {/* Humo nube */}
        <ellipse cx="210" cy="180" rx="36" ry="24" fill={h.smokeColor} opacity={h.smokeOp} />
        <ellipse cx="235" cy="140" rx="28" ry="22" fill={h.smokeColor} opacity={h.smokeOp - 0.1} />
        <ellipse cx="210" cy="100" rx="22" ry="18" fill={h.smokeColor} opacity={h.smokeOp - 0.25} />
        <ellipse cx="230" cy="70" rx="16" ry="14" fill={h.smokeColor} opacity={h.smokeOp - 0.4} />

        <line x1="150" y1="255" x2="190" y2="220" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" />
        <text x="210" y="250" fontSize="12" fill="rgba(255,255,255,0.7)" fontWeight="500">
          {color === 'blanco' ? 'Vapor de agua' : color === 'azul' ? 'Aceite quemado' : 'Nafta cruda'}
        </text>
      </svg>
    </div>
  )
}

// ==========================================
// 10. WIDGET: Sistema Escape
// ==========================================
function SistemaEscapeWidget({ viewMode }: WidgetProps) {
  const [part, setPart] = useState<'colector' | 'catalizador' | 'sonda' | 'silenciadores' | 'temperatura'>('colector')

  const parts = {
    colector: {
      title: "Colector de Escape (Manifold)",
      desc: "Atornillado directo a la salida de la culata. Colecta los gases a alta temperatura (800°C) de los 4 cilindros y los une en una sola tubería central de escape. En el Gol es de fundición de hierro robusto.",
      tip: "Si se fisura, produce un ruido metálico de soplado 'tick-tick' en frío que cesa cuando calienta y dilata."
    },
    catalizador: {
      title: "El Catalizador",
      desc: "Contiene un panel cerámico con microcanales impregnados de metales preciosos (platino, paladio, rodio). Funciona a más de 300°C provocando una reacción química que neutraliza gases tóxicos (Monóxido de carbono CO, Hidrocarburos HC y Óxidos de nitrógeno NOx) convirtiéndolos en vapor de agua y dióxido de carbono.",
      tip: "⚠ Si el auto patina y se arranca empujándolo, nafta cruda puede bajar al catalizador encendido y derretir el panel cerámico."
    },
    sonda: {
      title: "Sonda Lambda (Sensor de Oxígeno)",
      desc: "Ubicada antes y/o después del catalizador. Analiza la cantidad de oxígeno remanente en los gases de escape y le envía una señal de voltaje constante a la ECU. Con esta información, la ECU sabe si la mezcla nafta/aire está rica o pobre y corrige la inyección en milisegundos.",
      tip: "Si falla la sonda lambda, el motor consume un 20% más de combustible de fábrica."
    },
    silenciadores: {
      title: "Silenciador Intermedio y Final",
      desc: "Cajas metálicas con deflectores internos (laberintos) y lana de vidrio. Al pasar los gases a través de ellos, las ondas de sonido rebotan y se cancelan acústicamente. También reducen drásticamente la temperatura de escape antes de la salida.",
      tip: "Suelen oxidarse y pincharse debido a la condensación ácida del escape."
    },
    temperatura: {
      title: "Mapa de Temperatura de Escape",
      desc: "La temperatura cae radicalmente a lo largo del recorrido. 800°C en el manifold del motor, ~400°C en el catalizador para que actúe, ~200°C en el silenciador intermedio y sale a unos confortables ~80°C por la cola del caño de escape final.",
      tip: "Debido a esto, el escape dilata varios milímetros de largo; por eso se sostiene con colgantes de goma flexible."
    }
  }

  const p = parts[part]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/caño_escape_inferior.png"
        alt="Escape y caño inferior real"
        hotspots={[
          { id: '1', x: 25, y: 35, title: 'Manifold de Escape', desc: 'Colector de fundición de hierro que junta los gases calientes de los 4 cilindros.' },
          { id: '2', x: 50, y: 50, title: 'Catalizador', desc: 'Filtro cerámico que convierte gases nocivos en inocuos (vapor de agua y CO2).' },
          { id: '3', x: 75, y: 62, title: 'Silenciadores', desc: 'Cajas metálicas con deflectores acústicos que amortiguan el sonido de salida.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${part === 'colector' ? styles.controlBtnActive : ''}`} onClick={() => setPart('colector')}>Colector</button>
        <button className={`${styles.controlBtn} ${part === 'catalizador' ? styles.controlBtnActive : ''}`} onClick={() => setPart('catalizador')}>Catalizador</button>
        <button className={`${styles.controlBtn} ${part === 'sonda' ? styles.controlBtnActive : ''}`} onClick={() => setPart('sonda')}>Sonda λ</button>
        <button className={`${styles.controlBtn} ${part === 'silenciadores' ? styles.controlBtnActive : ''}`} onClick={() => setPart('silenciadores')}>Silenciadores</button>
        <button className={`${styles.controlBtn} ${part === 'temperatura' ? styles.controlBtnActiveOrange : ''}`} onClick={() => setPart('temperatura')}>Temperatura</button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{p.title}</div>
        <div className={styles.infoBody}>{p.desc}</div>
        <div className={styles.infoTip}>💡 {p.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 300">
        <defs>
          <linearGradient id="escGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#E24B4A" />
            <stop offset="40%" stopColor="#BA7517" />
            <stop offset="100%" stopColor="#1D9E75" />
          </linearGradient>
        </defs>

        {/* Auto silueta */}
        <rect x="30" y="80" width="620" height="140" rx="20" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" />
        
        {/* Motor */}
        <rect x="35" y="100" width="80" height="80" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" />
        <text x="75" y="145" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">motor</text>

        {/* Colector */}
        <rect x="115" y="110" width="70" height="60" rx="6" fill="rgba(255,255,255,0.06)" stroke={part === 'colector' ? '#E24B4A' : 'rgba(255,255,255,0.15)'} strokeWidth={part === 'colector' ? 2 : 1} />
        <text x="150" y="145" textAnchor="middle" fontSize="9" fill={part === 'colector' ? '#E24B4A' : 'rgba(255,255,255,0.4)'}>colector</text>

        {/* Catalizador */}
        <rect x="225" y="110" width="80" height="60" rx="8" fill="rgba(255,255,255,0.06)" stroke={part === 'catalizador' ? '#BA7517' : 'rgba(255,255,255,0.15)'} strokeWidth={part === 'catalizador' ? 2 : 1} />
        <text x="265" y="145" textAnchor="middle" fontSize="9" fill={part === 'catalizador' ? '#BA7517' : 'rgba(255,255,255,0.4)'}>catalizador</text>

        {/* Sonda lambda */}
        <rect x="310" y="110" width="40" height="30" rx="4" fill="none" stroke={part === 'sonda' ? '#534AB7' : 'rgba(255,255,255,0.15)'} strokeWidth={part === 'sonda' ? 2 : 0.5} />
        <line x1="330" y1="110" x2="330" y2="135" stroke="#534AB7" strokeWidth="2" />
        <text x="330" y="102" textAnchor="middle" fontSize="8" fill="#534AB7">sonda λ</text>

        {/* Silenciador intermedio */}
        <rect x="365" y="105" width="90" height="70" rx="8" fill="rgba(255,255,255,0.06)" stroke={part === 'silenciadores' ? '#3B82F6' : 'rgba(255,255,255,0.15)'} strokeWidth={part === 'silenciadores' ? 2 : 1} />
        <text x="410" y="145" textAnchor="middle" fontSize="9" fill={part === 'silenciadores' ? '#3B82F6' : 'rgba(255,255,255,0.4)'}>intermedio</text>

        {/* Silenciador final */}
        <rect x="505" y="105" width="100" height="70" rx="8" fill="rgba(255,255,255,0.06)" stroke={part === 'silenciadores' ? '#1D9E75' : 'rgba(255,255,255,0.15)'} strokeWidth={part === 'silenciadores' ? 2 : 1} />
        <text x="555" y="145" textAnchor="middle" fontSize="9" fill={part === 'silenciadores' ? '#1D9E75' : 'rgba(255,255,255,0.4)'}>final</text>

        {/* Caño de cola */}
        <line x1="605" y1="140" x2="640" y2="140" stroke="rgba(255,255,255,0.4)" strokeWidth="4" />

        {/* Tuberías conectoras */}
        <line x1="185" y1="140" x2="225" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
        <line x1="305" y1="140" x2="365" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />
        <line x1="455" y1="140" x2="505" y2="140" stroke="rgba(255,255,255,0.3)" strokeWidth="4" />

        {/* Barra temperatura */}
        {part === 'temperatura' && (
          <g>
            <rect x="35" y="240" width="610" height="8" rx="4" fill="url(#tempGrad)" />
            <text x="75" y="260" textAnchor="middle" fontSize="9" fill="#E24B4A">~800°C</text>
            <text x="265" y="260" textAnchor="middle" fontSize="9" fill="#BA7517">~400°C</text>
            <text x="410" y="260" textAnchor="middle" fontSize="9" fill="#3B82F6">~200°C</text>
            <text x="555" y="260" textAnchor="middle" fontSize="9" fill="#1D9E75">~80°C</text>
          </g>
        )}
      </svg>
    </div>
  )
}

// ==========================================
// 11. WIDGET: Cambio Disco Embrague
// ==========================================
function CambioDiscoWidget({ viewMode }: WidgetProps) {
  const [step, setStep] = useState(0)

  const pasos = [
    {
      label: "① Diagnóstico",
      title: "Paso 1 — Detectar desgaste del embrague",
      body: "El auto patina: al acelerar en un cambio alto, el motor sube de revoluciones pero el auto no gana velocidad. Se percibe olor a quemado de fricción ('olor a embrague quemado'). El pedal se siente muy alto para acoplar o trepida al salir en primera.",
      tip: "El kit de embrague Gol Trend dura 80.000-120.000 km promedio según el uso."
    },
    {
      label: "② Desarme",
      title: "Paso 2 — Levantar y desconectar semiejes",
      body: "Se asegura el auto sobre caballetes rígidos de fosa. Se drena la grasa de la caja de cambios. Se retiran los dos semiejes de las copas de salida de la caja de velocidades para liberar la transmisión.",
      tip: "⚠ Nunca te metas bajo el auto sostenido solo por el gato hidráulico."
    },
    {
      label: "③ Soporte y Pernos",
      title: "Paso 3 — Sujetar motor y quitar pernos de caja",
      body: "Se coloca un puente superior de motor o soporte bajo el bloque (el motor y la caja se sostienen mutuamente, al desunirlos el motor caería si no se apoya). Se retiran los 6 a 8 bulones de la campana de caja.",
      tip: "Es necesario desconectar el cable del pedal y el sensor de velocidad."
    },
    {
      label: "④ Desunir Caja",
      title: "Paso 4 — Separar la caja de cambios",
      body: "Se desliza la caja hacia el lateral derecho del auto y se desengancha del eje primario estriado. Pesa aproximadamente 25 kg — requiere el auxilio de un compañero o gato de caja. Al separar, quedan expuestos el disco y la prensa.",
      tip: "No fuerces la caja de lado; debe deslizarse perfectamente recta para no doblar la estría del primario."
    },
    {
      label: "⑤ Centrar y Cambiar",
      title: "Paso 5 — Centrar y cambiar el disco",
      body: "Se desatornilla la prensa vieja, se retira el disco. Se coloca el disco nuevo en su posición exacta. Es OBLIGATORIO usar una herramienta centradora de plástico para alinear el estriado del disco con el rulemán de empuje del cigüeñal antes de ajustar la prensa.",
      tip: "⚠ Si el disco no está perfectamente centrado, el eje de la caja no entrará al rearmar."
    },
    {
      label: "⑥ Rearmar",
      title: "Paso 6 — Acoplar caja y reajustar",
      body: "Se desliza la caja hacia el motor, se encastra el primario en el disco centrado. Se colocan los bulones en cruz. Se rearmar semiejes, se carga grasa de caja nueva y se calibra la tensión del pedal.",
      tip: "Aprovechá a cambiar el retén de bancada del cigüeñal y rulemán de empuje ('crapodina')."
    }
  ]

  const s = pasos[step]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/disco_embrague.png"
        alt="Embrague real y prensa"
        hotspots={[
          { id: '1', x: 26, y: 50, title: 'Disco de Embrague', desc: 'Disco con forros de fricción remachados y estrías para el eje primario.' },
          { id: '2', x: 74, y: 50, title: 'Plato de Presión (Prensa)', desc: 'Prensa que aprisiona el disco contra el volante del cigüeñal.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {pasos.map((ps, idx) => (
          <button
            key={idx}
            className={`${styles.controlBtn} ${step === idx ? styles.controlBtnActiveGreen : ''}`}
            onClick={() => setStep(idx)}
          >
            {ps.label}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{s.title}</div>
        <div className={styles.infoBody}>{s.body}</div>
        <div className={styles.infoTip}>💡 {s.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 340">
        {/* Motor */}
        <rect x="60" y="100" width="130" height="130" rx="8" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.1)" />
        <text x="125" y="165" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">motor</text>

        {/* Volante */}
        <circle cx="190" cy="165" r="24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />

        {/* Disco */}
        <ellipse cx="230" cy="165" rx="8" ry="24" fill={step >= 4 ? '#1D9E75' : '#534AB7'} opacity={step === 4 ? 0.9 : 0.6} />

        {/* Prensa */}
        <rect x="240" y="140" width="16" height="50" rx="3" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.3)" />

        {/* Caja de cambios */}
        <rect
          x={step >= 3 ? "320" : "260"}
          y="100"
          width="140"
          height="130"
          rx="8"
          fill="rgba(255,255,255,0.06)"
          stroke={step >= 3 ? '#E24B4A' : 'rgba(255,255,255,0.15)'}
          strokeWidth="1"
        />
        <text x={step >= 3 ? 390 : 330} y="165" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">caja cambios</text>

        {/* Separación flecha */}
        {step >= 3 && (
          <g>
            <path d="M 260 165 L 310 165" fill="none" stroke="#E24B4A" strokeWidth="2" strokeDasharray="3 3" markerEnd="url(#acon)" />
            <text x="285" y="150" textAnchor="middle" fontSize="9" fill="#E24B4A">desacoplada</text>
          </g>
        )}

        {/* Centrador */}
        {step === 4 && (
          <g>
            <rect x="210" y="160" width="44" height="10" fill="#BA7517" />
            <text x="232" y="150" textAnchor="middle" fontSize="9" fill="#BA7517">centrador</text>
          </g>
        )}
      </svg>
    </div>
  )
}

// ==========================================
// 12. WIDGET: Tren Delantero
// ==========================================
function TrenDelanteroWidget({ viewMode }: WidgetProps) {
  const [part, setPart] = useState<'amort' | 'parrilla' | 'rotula' | 'mangueta' | 'estabilizadora' | 'ruleman'>('amort')

  const parts = {
    amort: {
      title: "Amortiguador y Resorte (Columna McPherson)",
      desc: "El resorte espiral sostiene el peso de la carrocería y amortigua los impactos al comprimirse. El amortiguador hidráulico interno frena y controla los rebotes elásticos del resorte. Juntos forman la pata McPherson.",
      tip: "Si empujás el capó del auto hacia abajo y al soltarlo rebota más de una vez, los amortiguadores delanteros están vencidos.",
      color: '#3B82F6'
    },
    parrilla: {
      title: "Brazo de Suspensión (Parrilla inferior)",
      desc: "Brazo de acero en forma de A que une la carrocería con la rueda. En el chasis se acopla mediante silent blocks de goma que absorben vibraciones. En el portamazas se une mediante la rótula.",
      tip: "Los bujes de parrilla (silent blocks) rotos producen un golpe metálico 'clonc' seco al pasar badenes o al frenar bruscamente.",
      color: '#1D9E75'
    },
    rotula: {
      title: "La Rótula de Suspensión",
      desc: "Articulación esférica de metal engrasada que permite a la rueda girar a los lados (dirección) y subir/bajar (suspensión) de forma simultánea. Soporta grandes esfuerzos de torsión.",
      tip: "⚠ Componente crítico de seguridad: si tiene juego debe cambiarse de inmediato. Si se corta en marcha, la rueda se cae.",
      color: '#BA7517'
    },
    mangueta: {
      title: "Mangueta (Portamazas o porta-ruedas)",
      desc: "La pieza de fundición central a la que se atornilla todo. Arriba la sostiene la pata McPherson, abajo el brazo de suspensión y de lado el tirante de dirección. Aloja la maza y rodamiento de rueda.",
      tip: "No suele romperse salvo por choques directos o cordoneadas brutales.",
      color: '#888780'
    },
    estabilizadora: {
      title: "Barra Estabilizadora y Bieletas",
      desc: "Barra de acero elástica que cruza de rueda a rueda por el chasis. Limita la inclinación lateral del auto en curvas. Las bieletas son tirantes cortos de goma/rótula que conectan la barra a la suspensión.",
      tip: "Si escuchás un ruido 'toc-toc' constante y molesto al circular por empedrados, casi seguro son las bieletas rotas.",
      color: '#E24B4A'
    },
    ruleman: {
      title: "Rodamiento de Rueda (Rulemán)",
      desc: "Rodamiento de doble hilera de bolas prensado dentro de la mangueta. Permite que la rueda y el disco giren libres alrededor del eje estriado del semieje.",
      tip: "Produce un zumbido sordo tipo 'avión' a más de 60 km/h que aumenta al girar el volante al lado contrario.",
      color: '#534AB7'
    }
  }

  const p = parts[part]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/tren_delantero.png"
        alt="Suspensión real McPherson y frenos"
        hotspots={[
          { id: '1', x: 50, y: 18, title: 'Resorte Helicoidal', desc: 'Resorte de alta resistencia que absorbe el peso del vehículo en baches.' },
          { id: '2', x: 73, y: 68, title: 'Disco de Freno Ventilado', desc: 'Disco de hierro. Las ranuras ayudan a disipar el calor y el agua al frenar.' },
          { id: '3', x: 88, y: 60, title: 'Caliper de Freno (Brembo)', desc: 'Maza de freno hidráulica que empuja las pastillas contra el disco.' },
          { id: '4', x: 34, y: 74, title: 'Brazo de Suspensión (Parrilla)', desc: 'Parrilla inferior metálica articulada conectada al chasis.' },
          { id: '5', x: 24, y: 58, title: 'Fuelle de Homocinética', desc: 'Goma protectora corrugada que retiene la grasa del semieje.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${part === 'amort' ? styles.controlBtnActive : ''}`} onClick={() => setPart('amort')}>McPherson</button>
        <button className={`${styles.controlBtn} ${part === 'parrilla' ? styles.controlBtnActive : ''}`} onClick={() => setPart('parrilla')}>Parrilla</button>
        <button className={`${styles.controlBtn} ${part === 'rotula' ? styles.controlBtnActiveRed : ''}`} onClick={() => setPart('rotula')}>Rótula</button>
        <button className={`${styles.controlBtn} ${part === 'mangueta' ? styles.controlBtnActive : ''}`} onClick={() => setPart('mangueta')}>Mangueta</button>
        <button className={`${styles.controlBtn} ${part === 'estabilizadora' ? styles.controlBtnActive : ''}`} onClick={() => setPart('estabilizadora')}>Bieletas</button>
        <button className={`${styles.controlBtn} ${part === 'ruleman' ? styles.controlBtnActive : ''}`} onClick={() => setPart('ruleman')}>Rulemán</button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle} style={{ color: p.color }}>{p.title}</div>
        <div className={styles.infoBody}>{p.desc}</div>
        <div className={styles.infoTip}>💡 {p.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 400">
        {/* Chasis arriba */}
        <rect x="220" y="20" width="240" height="30" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.1)" />
        <text x="340" y="40" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">Carrocería / Chasis</text>

        {/* Pata McPherson (Resorte + amort) */}
        <g opacity={part === 'amort' ? 1 : 0.2}>
          <path d="M 155 50 L 155 60 L 145 65 L 165 75 L 145 85 L 165 95 L 145 105 L 165 115 L 155 120" fill="none" stroke="#3B82F6" strokeWidth="3" />
          <rect x="148" y="120" width="14" height="80" rx="4" fill="none" stroke="#3B82F6" strokeWidth="2" />
          <text x="90" y="100" fontSize="9" fill="#3B82F6">McPherson</text>
        </g>

        {/* Mangueta */}
        <g opacity={part === 'mangueta' ? 1 : 0.2}>
          <rect x="120" y="200" width="70" height="70" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.3)" />
          <text x="155" y="235" textAnchor="middle" fontSize="9" fill="#ffffff">Mangueta</text>
        </g>

        {/* Rueda */}
        <circle cx="100" cy="300" r="50" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <circle cx="100" cy="300" r="16" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" />

        {/* Rulemán */}
        <circle cx="100" cy="300" r="22" fill="none" stroke="#534AB7" strokeWidth="3" opacity={part === 'ruleman' ? 1 : 0.15} />

        {/* Parrilla, rótula y buje */}
        <g>
          {/* Brazo */}
          <path d="M 190 270 Q 155 280 120 270" fill="none" stroke="#1D9E75" strokeWidth="5" strokeLinecap="round" opacity={part === 'parrilla' ? 1 : 0.2} />
          {/* Rótula */}
          <circle cx="120" cy="270" r="8" fill="#BA7517" opacity={part === 'rotula' ? 1 : 0.2} />
          {part === 'rotula' && <text x="120" y="290" textAnchor="middle" fontSize="8" fill="#BA7517">rótula</text>}
          {/* Buje */}
          <ellipse cx="190" cy="270" rx="8" ry="6" fill="#1D9E75" opacity={part === 'parrilla' ? 0.9 : 0.2} />
        </g>

        {/* Barra estabilizadora y bieleta */}
        <g>
          <path d="M 160 360 Q 250 380 340 380" fill="none" stroke="#E24B4A" strokeWidth="4" strokeLinecap="round" opacity={part === 'estabilizadora' ? 1 : 0.2} />
          <line x1="160" y1="360" x2="145" y2="295" stroke="#BA7517" strokeWidth="3" opacity={part === 'estabilizadora' ? 1 : 0.2} />
          <circle cx="160" cy="360" r="6" fill="#888780" opacity={part === 'estabilizadora' ? 1 : 0.2} />
          <circle cx="145" cy="295" r="6" fill="#888780" opacity={part === 'estabilizadora' ? 1 : 0.2} />
        </g>

        {/* Highlight box */}
        {part === 'amort' && <rect x="135" y="45" width="45" height="160" fill="none" stroke="#e24b4a" strokeWidth="1.5" />}
        {part === 'parrilla' && <rect x="110" y="260" width="90" height="30" fill="none" stroke="#e24b4a" strokeWidth="1.5" />}
        {part === 'mangueta' && <rect x="115" y="195" width="80" height="80" fill="none" stroke="#e24b4a" strokeWidth="1.5" />}
        {part === 'estabilizadora' && <rect x="135" y="290" width="35" height="80" fill="none" stroke="#e24b4a" strokeWidth="1.5" />}
      </svg>
    </div>
  )
}

// ==========================================
// 13. WIDGET: Diagnostico Ruidos
// ==========================================
function DiagnosticoRuidosWidget({ viewMode }: WidgetProps) {
  const [moment, setMoment] = useState<'badenes' | 'frenar' | 'doblar' | 'constante'>('badenes')
  const [selectedRuido, setSelectedRuido] = useState<number | null>(0)

  const ruidos = {
    badenes: [
      { icon: '💥', name: 'Golpe seco (clonc)', color: '#E24B4A', causa: 'Silent block (buje) roto o rótula de suspensión gastada. El brazo tiene juego libre y golpea el metal del chasis al comprimirse la suspensión.', urg: '⚠ URGENTE — Una rótula suelta puede causar el desprendimiento de la rueda.', sol: 'Levantar el auto y revisar el juego axial de la rueda.' },
      { icon: '🔔', name: 'Golpe metálico (toc toc)', color: '#BA7517', causa: 'Holgura en las articulaciones de la bieleta estabilizadora o bujes de barra desgastados.', urg: 'Baja gravedad.', sol: 'Reemplazar las dos bieletas delanteras (es una reparación muy económica).' },
      { icon: '💨', name: 'Golpe sordo amortiguado', color: '#3B82F6', causa: 'Falta de líquido o gas interno en el amortiguador (llegó al límite de vida útil). El amortiguador hace tope de compresión.', urg: 'Intermedia.', sol: 'Cambiar el par de amortiguadores delanteros.' }
    ],
    frenar: [
      { icon: '😬', name: 'Chillido agudo (squeak)', color: '#BA7517', causa: 'Las pastillas de freno llegaron a su límite y roza el testigo metálico contra el disco.', urg: 'Intermedia.', sol: 'Reemplazar pastillas antes de rayar los discos.' },
      { icon: '⚙️', name: 'Golpe metálico raspado', color: '#E24B4A', causa: 'Las pastillas se quedaron sin material de fricción y roza metal contra metal directo al disco.', urg: '⚠ URGENTE — Destrucción de disco y pérdida severa de potencia de frenado.', sol: 'Cambio inmediato de pastillas y discos de freno.' },
      { icon: '📳', name: 'Vibración del pedal', color: '#534AB7', causa: 'Disco de freno alabeado (deformado por choque térmico al frenar y pasar por agua).', urg: 'Intermedia.', sol: 'Rectificar discos si tienen espesor suficiente, o cambiarlos.' }
    ],
    doblar: [
      { icon: '🦀', name: 'Crack crack al avanzar lento', color: '#E24B4A', causa: 'Junta homocinética exterior rota por pérdida de grasa (fuelle de goma roto).', urg: '⚠ URGENTE — Puede desarmarse el semieje y perder la tracción.', sol: 'Cambiar junta homocinética y fuelle nuevo.' },
      { id: '1', icon: '🌀', name: 'Zumbido que cambia al doblar', color: '#534AB7', causa: 'Desgaste en la pista del rulemán de rueda.', urg: 'Intermedia.', sol: 'Reemplazar el rulemán de rueda con prensa en taller.' }
    ],
    constante: [
      { icon: '✈️', name: 'Zumbido proporcional a velocidad', color: '#534AB7', causa: 'Rulemán de rueda completamente seco y gastado. El zumbido se percibe como el sonido de una turbina.', urg: 'Intermedia.', sol: 'Rulemán a cambiar de inmediato.' },
      { icon: '🔔', name: 'Chirrido rítmico de correa', color: '#BA7517', causa: 'Correa auxiliar suelta, reseca o gastada rozando en las poleas del alternador.', urg: 'Baja gravedad.', sol: 'Tensar correa auxiliar o reemplazarla.' }
    ]
  }

  const list = ruidos[moment]
  const activeRuido = selectedRuido !== null ? list[selectedRuido] : null

  return (
    <div className={styles.widgetWrap}>
      <div style={{ marginBottom: '12px' }}>
        <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginBottom: '6px' }}>¿Cuándo ocurre el ruido?</div>
        <div className={styles.controlRow} style={{ justifyContent: 'flex-start' }}>
          <button className={`${styles.controlBtn} ${moment === 'badenes' ? styles.controlBtnActive : ''}`} onClick={() => { setMoment('badenes'); setSelectedRuido(0); }}>Badenes</button>
          <button className={`${styles.controlBtn} ${moment === 'frenar' ? styles.controlBtnActive : ''}`} onClick={() => { setMoment('frenar'); setSelectedRuido(0); }}>Al frenar</button>
          <button className={`${styles.controlBtn} ${moment === 'doblar' ? styles.controlBtnActive : ''}`} onClick={() => { setMoment('doblar'); setSelectedRuido(0); }}>Al doblar</button>
          <button className={`${styles.controlBtn} ${moment === 'constante' ? styles.controlBtnActive : ''}`} onClick={() => { setMoment('constante'); setSelectedRuido(0); }}>En marcha</button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', marginBottom: '14px' }}>
        {list.map((r, idx) => (
          <div
            key={idx}
            className={styles.practiceCard}
            style={{ borderColor: selectedRuido === idx ? r.color : 'rgba(255,255,255,0.08)' }}
            onClick={() => setSelectedRuido(idx)}
          >
            <span style={{ fontSize: '20px' }}>{r.icon}</span>
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: r.color }}>{r.name}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)' }}>Momento: {moment}</div>
            </div>
          </div>
        ))}
      </div>

      {activeRuido && (
        <div className={styles.infoBox} style={{ borderLeft: `3px solid ${activeRuido.color}`, background: 'rgba(255, 255, 255, 0.01)' }}>
          <div className={styles.infoTitle} style={{ color: activeRuido.color }}>{activeRuido.icon} {activeRuido.name}</div>
          <div className={styles.infoBody} style={{ fontSize: '12px' }}>
            <strong>Causa:</strong> {activeRuido.causa}
          </div>
          {activeRuido.urg && (
            <div style={{ fontSize: '11px', color: '#e24b4a', marginTop: '6px', fontWeight: 600 }}>{activeRuido.urg}</div>
          )}
          <div style={{ fontSize: '11px', color: '#1d9e75', marginTop: '4px' }}>
            <strong>Diagnóstico/Solución:</strong> {activeRuido.sol}
          </div>
        </div>
      )}
    </div>
  )
}

// ==========================================
// 14. WIDGET: Vista Desde Abajo
// ==========================================
function VistaDesdeAbajoWidget({ viewMode }: WidgetProps) {
  const [part, setPart] = useState<'motor' | 'caja' | 'escape' | 'tanque' | 'frenos'>('motor')

  const parts = {
    motor: {
      title: "Motor (Bloque y Cárter de aceite)",
      desc: "Ubicado adelante. Al mirar desde abajo, se visualiza el chapón protector y el cárter metálico del motor. Posee el tornillo tapón roscado para vaciar el lubricante.",
      tip: "El cárter es de aluminio en el Gol Trend; cuidado al ajustarlo para no barrer la rosca."
    },
    caja: {
      title: "Caja de velocidades y semiejes",
      desc: "Instalada al costado derecho del motor. Contiene el diferencial que distribuye el giro y los dos palieres (semiejes) con homocinéticas que van a cada rueda delantera.",
      tip: "El nivel de aceite de caja (grasa) se controla por un tapón lateral."
    },
    escape: {
      title: "Recorrido del caño de escape",
      desc: "Nace en el manifold adelante, baja por debajo de la caja, pasa por el catalizador en la zona media y recorre todo el chasis longitudinalmente hacia los dos silenciadores traseros.",
      tip: "Está colgado de soportes elásticos de goma para aislar ruidos del habitáculo."
    },
    tanque: {
      title: "Tanque de combustible",
      desc: "Ubicado en la parte trasera del coche, justo debajo del asiento trasero para protección contra choques. Es de plástico termoformado y aloja la bomba eléctrica de nafta en su interior.",
      tip: "Capacidad: 55 litros."
    },
    frenos: {
      title: "Eje trasero y frenos de tambor",
      desc: "El eje trasero es rígido y contiene las campanas de freno (tambor). A diferencia de los discos delanteros, el tambor usa zapatas internas que se expanden contra la campana.",
      tip: "El freno de mano tira mecánicamente de cables que actúan directamente en las campanas traseras."
    }
  }

  const pt = parts[part]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/chasis_coche_elevador.png"
        alt="Chasis del Gol Trend visto desde abajo en elevador"
        hotspots={[
          { id: '1', x: 50, y: 15, title: 'Chapón Protector y Cárter', desc: 'Protector de cárter de aluminio atornillado en el frente para resguardar el motor.' },
          { id: '2', x: 50, y: 52, title: 'Tubo de Escape Central', desc: 'Recorrido central del caño de escape, recubierto por escudos térmicos de aluminio.' },
          { id: '3', x: 50, y: 82, title: 'Tanque de Combustible', desc: 'Depósito de combustible de plástico de alta resistencia, ubicado debajo de las plazas traseras.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${part === 'motor' ? styles.controlBtnActive : ''}`} onClick={() => setPart('motor')}>Motor</button>
        <button className={`${styles.controlBtn} ${part === 'caja' ? styles.controlBtnActive : ''}`} onClick={() => setPart('caja')}>Caja/Semiejes</button>
        <button className={`${styles.controlBtn} ${part === 'escape' ? styles.controlBtnActive : ''}`} onClick={() => setPart('escape')}>Escape</button>
        <button className={`${styles.controlBtn} ${part === 'tanque' ? styles.controlBtnActive : ''}`} onClick={() => setPart('tanque')}>Tanque</button>
        <button className={`${styles.controlBtn} ${part === 'frenos' ? styles.controlBtnActive : ''}`} onClick={() => setPart('frenos')}>Frenos traseros</button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{pt.title}</div>
        <div className={styles.infoBody}>{pt.desc}</div>
        <div className={styles.infoTip}>💡 {pt.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 440">
        {/* Auto contorno */}
        <rect x="100" y="20" width="480" height="400" rx="30" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" />

        <text x="340" y="16" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">▲ FRENTE</text>
        <text x="340" y="434" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">▼ ATRÁS</text>

        {/* Ruedas */}
        <rect x="102" y="30" width="45" height="90" rx="6" fill="rgba(255,255,255,0.08)" />
        <rect x="533" y="30" width="45" height="90" rx="6" fill="rgba(255,255,255,0.08)" />
        <rect x="102" y="320" width="45" height="90" rx="6" fill="rgba(255,255,255,0.08)" />
        <rect x="533" y="320" width="45" height="90" rx="6" fill="rgba(255,255,255,0.08)" />

        {/* Motor */}
        <rect x="200" y="40" width="140" height="90" rx="8" fill="rgba(255,255,255,0.06)" stroke={part === 'motor' ? '#3b82f6' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
        <text x="270" y="90" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">motor</text>

        {/* Caja */}
        <rect x="340" y="40" width="120" height="90" rx="8" fill="rgba(255,255,255,0.06)" stroke={part === 'caja' ? '#534AB7' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
        <text x="400" y="90" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.5)">caja de cambios</text>

        {/* Semiejes */}
        <line x1="147" y1="80" x2="200" y2="80" stroke="#BA7517" strokeWidth="4" opacity={part === 'caja' ? 1 : 0.25} />
        <line x1="460" y1="80" x2="533" y2="80" stroke="#BA7517" strokeWidth="4" opacity={part === 'caja' ? 1 : 0.25} />

        {/* Escape */}
        <path d="M 270 130 L 270 200 L 380 200 L 380 340 L 410 390 L 440 390" fill="none" stroke="#888780" strokeWidth="6" opacity={part === 'escape' ? 1 : 0.25} />
        <rect x="360" y="240" width="40" height="60" rx="4" fill="rgba(255,255,255,0.1)" stroke="#888780" strokeWidth="1" opacity={part === 'escape' ? 1 : 0.25} />

        {/* Tanque */}
        <rect x="180" y="320" width="160" height="70" rx="8" fill="rgba(255,255,255,0.06)" stroke={part === 'tanque' ? '#BA7517' : 'rgba(255,255,255,0.1)'} strokeWidth="1" />
        <text x="260" y="360" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.5)">tanque nafta</text>

        {/* Campana freno trasero */}
        <rect x="135" y="340" width="12" height="50" fill="#E24B4A" opacity={part === 'frenos' ? 0.95 : 0.2} />
        <rect x="533" y="340" width="12" height="50" fill="#E24B4A" opacity={part === 'frenos' ? 0.95 : 0.2} />
      </svg>
    </div>
  )
}

// ==========================================
// 15. WIDGET: Cableado Electrico
// ==========================================
function CableadoElectricoWidget({ viewMode }: WidgetProps) {
  const [state, setState] = useState<'off' | 'acc' | 'start' | 'run'>('off')
  const [sparkIdx, setSparkIdx] = useState(0)

  // Ciclo de chispa secuencial 1 -> 3 -> 4 -> 2 para motor en marcha
  useEffect(() => {
    if (state !== 'run') return
    const interval = setInterval(() => {
      setSparkIdx((prev) => (prev + 1) % 4)
    }, 200)
    return () => clearInterval(interval)
  }, [state])

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/fusiblera_electrica.png"
        alt="Fusiblera y componentes eléctricos reales"
        hotspots={[
          { id: '1', x: 41, y: 44, title: 'Fusiblera principal', desc: 'Ubicada en el vano motor. Aloja los fusibles de protección de alta corriente (bomba de agua, electroventilador, inyección).' },
          { id: '2', x: 45, y: 91, title: 'Batería 12V Varta', desc: 'Fuente de corriente continua del Gol. Almacena la energía para el arranque inicial.' },
          { id: '3', x: 86, y: 56, title: 'Alternador (Oculto abajo)', desc: 'Generador movido por correa que recarga la batería y provee corriente con el motor en marcha.' }
        ]}
      />
    )
  }

  // Orden de encendido del motor 4 cilindros del Gol: 1 - 3 - 4 - 2
  const sparkOrder = [1, 3, 4, 2]
  const activeSparkBujia = state === 'run' ? sparkOrder[sparkIdx] : null

  return (
    <div className={styles.widgetWrap}>
      {/* Controles de Llave */}
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${state === 'off' ? styles.controlBtnActive : ''}`} onClick={() => setState('off')}>🔑 Apagado</button>
        <button className={`${styles.controlBtn} ${state === 'acc' ? styles.controlBtnActive : ''}`} onClick={() => setState('acc')}>🔋 Contacto</button>
        <button className={`${styles.controlBtn} ${state === 'start' ? styles.controlBtnActiveOrange : ''}`} onClick={() => setState('start')}>⚡ Arranque</button>
        <button className={`${styles.controlBtn} ${state === 'run' ? styles.controlBtnActiveGreen : ''}`} onClick={() => setState('run')}>🚗 En Marcha</button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>
          {state === 'off' && 'Llave en APAGADO - Sin Consumo'}
          {state === 'acc' && 'Llave en CONTACTO - Computadora y Sensores Activos'}
          {state === 'start' && 'Llave en ARRANQUE - Motor de Arranque Girando'}
          {state === 'run' && 'Motor en MARCHA - Alternador Cargando y Bujías en Ciclo'}
        </div>
        <div className={styles.infoBody}>
          {state === 'off' && 'Todos los sistemas principales están desactivados. Solo hay un consumo mínimo de memoria de la ECU y reloj.'}
          {state === 'acc' && 'La batería alimenta la fusiblera de cabina y la ECU. La bomba de combustible presuriza la rampa durante 2 segundos.'}
          {state === 'start' && 'La batería envía toda la potencia (~150 Amperes) al motor de arranque acoplado al volante motor para hacerlo girar mecánicamente.'}
          {state === 'run' && 'El motor gira solo. El alternador genera ~14.2V cargando la batería y alimentando todo el circuito. Las bujías tiran chispa en orden secuencial: 1 → 3 → 4 → 2.'}
        </div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 340">
        {/* Fondo y marco */}
        <rect x="10" y="10" width="660" height="320" rx="10" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.03)" />

        {/* Batería */}
        <rect x="40" y="200" width="100" height="70" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
        <rect x="45" y="192" width="16" height="8" fill="#E24B4A" />
        <rect x="119" y="192" width="16" height="8" fill="#888780" />
        <text x="53" y="188" fontSize="8" fill="#E24B4A">+</text>
        <text x="127" y="188" fontSize="8" fill="#888780">-</text>
        <text x="90" y="240" textAnchor="middle" fontSize="11" fill="#ffffff" fontWeight="600">Batería 12V</text>

        {/* Alternador */}
        <circle cx="90" cy="80" r="30" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
        <g className={state === 'run' ? styles.spinning : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
          <circle cx="90" cy="80" r="24" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
          <line x1="90" y1="56" x2="90" y2="104" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
          <line x1="66" y1="80" x2="114" y2="80" stroke="rgba(255,255,255,0.25)" strokeWidth="2" />
        </g>
        <text x="90" y="125" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)">Alternador</text>

        {/* Motor de Arranque */}
        <rect x="210" y="205" width="90" height="50" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.12)" />
        <text x="255" y="235" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.7)">M. Arranque</text>
        {state === 'start' && (
          <circle cx="255" cy="230" r="20" fill="none" stroke="#BA7517" strokeWidth="2" strokeDasharray="5 3" className={styles.spinning} style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
        )}

        {/* ECU / Fusiblera */}
        <rect x="210" y="50" width="100" height="70" rx="6" fill="rgba(255,255,255,0.04)" stroke="#BA7517" strokeWidth="1" />
        <text x="260" y="80" textAnchor="middle" fontSize="10" fill="#BA7517" fontWeight="600">Fusiblera & ECU</text>
        <text x="260" y="98" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)">
          {state !== 'off' ? '💻 ACTIVE' : '💤 STANDBY'}
        </text>

        {/* Bobina de Encendido */}
        <rect x="390" y="50" width="80" height="60" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" />
        <text x="430" y="80" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.7)" fontWeight="600">Bobina (DIS)</text>
        <text x="430" y="96" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.4)">12V → 25KV</text>

        {/* 4 Bujías / Cilindros */}
        {[1, 2, 3, 4].map((cyl, idx) => {
          const xPos = 380 + idx * 65
          const hasSpark = activeSparkBujia === cyl
          return (
            <g key={cyl}>
              {/* Cuerpo Bujía */}
              <rect x={xPos} y="180" width="22" height="40" rx="2" fill="rgba(255,255,255,0.2)" stroke="rgba(255,255,255,0.3)" />
              <line x1={xPos + 11} y1="180" x2={xPos + 11} y2="150" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
              <text x={xPos + 11} y={235} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">Bujía {cyl}</text>

              {/* Cable de bobina a bujía */}
              <path d={`M 430 110 C 430 150, ${xPos + 11} 120, ${xPos + 11} 150`} fill="none" stroke={state === 'run' ? '#E24B4A' : 'rgba(255,255,255,0.15)'} strokeWidth="1.5" />

              {/* Chispa */}
              {hasSpark && (
                <g>
                  <circle cx={xPos + 11} cy="225" r="12" fill="#3b82f6" opacity="0.6" />
                  <polygon points={`${xPos + 11},215 ${xPos + 6},225 ${xPos + 16},225`} fill="#ffffff" />
                  <circle cx={xPos + 11} cy="225" r="3" fill="#ffffff" />
                </g>
              )}
            </g>
          )
        })}

        {/* Líneas de cableado animadas */}
        {/* Retorno Masa Negativa */}
        <path d="M 127 192 L 127 160 L 650 160" fill="none" stroke="#888780" strokeWidth="2" />
        
        {/* Batería -> Fusiblera */}
        <path
          d="M 53 192 L 53 145 L 210 145 L 210 100"
          fill="none"
          stroke={state !== 'off' ? '#E24B4A' : 'rgba(255,255,255,0.15)'}
          strokeWidth="2.5"
          className={state !== 'off' ? styles.flowing : ''}
          strokeDasharray={state !== 'off' ? '6 4' : 'none'}
        />

        {/* Fusiblera -> Bobina */}
        <path
          d="M 310 85 L 390 85"
          fill="none"
          stroke={state === 'run' ? '#E24B4A' : 'rgba(255,255,255,0.15)'}
          strokeWidth="2.5"
          className={state === 'run' ? styles.flowing : ''}
          strokeDasharray={state === 'run' ? '6 4' : 'none'}
        />

        {/* Batería -> Motor de arranque */}
        <path
          d="M 53 270 L 53 300 L 210 300 L 210 230"
          fill="none"
          stroke={state === 'start' ? '#E24B4A' : 'rgba(255,255,255,0.15)'}
          strokeWidth="3"
          className={state === 'start' ? styles.flowing : ''}
          strokeDasharray={state === 'start' ? '8 4' : 'none'}
        />

        {/* Alternador -> Batería (Carga) */}
        <path
          d="M 90 110 L 90 200"
          fill="none"
          stroke={state === 'run' ? '#3b82f6' : 'rgba(255,255,255,0.15)'}
          strokeWidth="2.5"
          className={state === 'run' ? styles.flowing : ''}
          strokeDasharray={state === 'run' ? '6 4' : 'none'}
        />
        {state === 'run' && (
          <text x="115" y="150" fontSize="8" fill="#3b82f6" fontWeight="bold">← Recarga (14V)</text>
        )}
      </svg>
    </div>
  )
}


// ==========================================
// 16. WIDGET: Mono Vs Multipunto
// ==========================================
function MonoMultiWidget({ viewMode }: WidgetProps) {
  const [mode, setMode] = useState<'mono' | 'multi'>('multi')

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${mode === 'mono' ? styles.controlBtnActiveOrange : ''}`} onClick={() => setMode('mono')}>Mono-inyector (TBI)</button>
        <button className={`${styles.controlBtn} ${mode === 'multi' ? styles.controlBtnActiveGreen : ''}`} onClick={() => setMode('multi')}>Inyección Multipunto</button>
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{mode === 'mono' ? 'Inyección monopunto (Carburador electrónico)' : 'Inyección multipunto (Moderna)'}</div>
        <div className={styles.infoBody}>
          {mode === 'mono'
            ? 'Posee un solo inyector central colocado en el cuerpo de mariposa de admisión (arriba del todo). Rocía nafta para los 4 cilindros al mismo tiempo. La mezcla viaja larga distancia por el múltiple y se reparte de forma despareja.'
            : 'Posee un inyector independiente colocado en el múltiple justo en la entrada de la culata de cada cilindro. La ECU abre cada inyector de forma secuencial en el paso exacto de Admisión, inyectando la dosis exacta sin condensación.'}
        </div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 320">
        {/* Colector de admisión */}
        <rect x="220" y="80" width="240" height="24" rx="4" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
        <text x="340" y="95" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">colector de admisión</text>

        {/* Ramas colector */}
        <line x1="260" y1="104" x2="160" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <line x1="310" y1="104" x2="280" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <line x1="370" y1="104" x2="400" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
        <line x1="420" y1="104" x2="520" y2="180" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />

        {/* Cilindros */}
        <rect x="130" y="180" width="60" height="70" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
        <rect x="250" y="180" width="60" height="70" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
        <rect x="370" y="180" width="60" height="70" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
        <rect x="490" y="180" width="60" height="70" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.15)" />
        <text x="160" y="220" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">Cil. 1</text>
        <text x="280" y="220" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">Cil. 2</text>
        <text x="400" y="220" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">Cil. 3</text>
        <text x="520" y="220" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">Cil. 4</text>

        {mode === 'mono' ? (
          <g>
            {/* Inyector central */}
            <rect x="325" y="30" width="30" height="24" fill="#BA7517" rx="3" />
            <polygon points="340,54 335,66 345,66" fill="#BA7517" />
            <text x="340" y="24" textAnchor="middle" fontSize="9" fill="#BA7517" fontWeight="600">mono-inyector único</text>
            <text x="340" y="140" textAnchor="middle" fontSize="10" fill="#BA7517">mezcla viaja por todo el colector</text>
          </g>
        ) : (
          <g>
            {/* 4 Inyectores */}
            <rect x="145" y="130" width="30" height="15" rx="3" fill="#BA7517" transform="rotate(-37 145 130)" />
            <rect x="265" y="135" width="30" height="15" rx="3" fill="#BA7517" transform="rotate(-60 265 135)" />
            <rect x="385" y="135" width="30" height="15" rx="3" fill="#BA7517" transform="rotate(-120 385 135)" />
            <rect x="505" y="130" width="30" height="15" rx="3" fill="#BA7517" transform="rotate(-143 505 130)" />
            <text x="340" y="30" textAnchor="middle" fontSize="11" fill="#1D9E75" fontWeight="600">4 inyectores independientes en puerto culata</text>
          </g>
        )}
      </svg>
    </div>
  )
}

// ==========================================
// 17. WIDGET: Potencia Opciones
// ==========================================
function PotenciaOpcionesWidget({ viewMode }: WidgetProps) {
  const [opt, setOpt] = useState(0)

  const opciones = [
    {
      label: "ECU Remap",
      title: "Reprogramación de ECU (Chip Tuning)",
      gain: "125 hp",
      pct: 125,
      body: "Consiste en modificar los parámetros del software del cerebro del auto (avance del encendido, tiempos de inyección). Se realiza por puerto OBD-II sin tocar ninguna pieza física. Entrega una mejora en el torque a bajas vueltas y es 100% reversible.",
      tip: "✓ Excelente relación costo/potencia. El motor permanece totalmente original."
    },
    {
      label: "Escape + Admisión",
      title: "Múltiple de escape + Filtro de aire cónico",
      gain: "120 hp",
      pct: 120,
      body: "Se instala un múltiple de escape de tubos largos (diseño 4-1) que evacúa rápido los gases, eliminando la retención, y un filtro de aire de algodón de baja restricción que aspira aire frío. El motor respira mucho mejor.",
      tip: "El sonido del motor se vuelve más deportivo."
    },
    {
      label: "Combo Completo",
      title: "Remap + Múltiple + Admisión",
      gain: "138 hp",
      pct: 138,
      body: "El punto óptimo para el motor 1.6 MSI aspirado. Al reprogramar la ECU con el múltiple de escape y el filtro instalados, la computadora puede aprovechar al máximo el aire extra que entra y la salida fluida de gases. Es el límite seguro.",
      tip: "✓ El auto se siente sumamente ágil y responde al instante al pisar el acelerador."
    },
    {
      label: "Kit Turbo",
      title: "Sobrealimentación por Turbocompresor",
      gain: "175 hp",
      pct: 175,
      body: "Se monta un turbocompresor que comprime el aire de admisión a presión. Permite saltar a más de 170 hp, pero el motor original (pistones y bielas) no soporta el esfuerzo. Para durar requiere forjar el motor, lo que triplica el costo.",
      tip: "⚠ Alto riesgo de rotura si no se refuerza internamente el bloque."
    }
  ]

  const o = opciones[opt]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/filtro_deportivo.png"
        alt="Admisión deportiva con filtro cónico"
        hotspots={[
          { id: '1', x: 45, y: 38, title: 'Filtro cónico de alto flujo', desc: 'Filtro de algodón lavable de baja restricción para que el motor aspire más aire frío.' },
          { id: '2', x: 72, y: 55, title: 'Múltiple de escape deportivo 4-1', desc: 'Colector de tubos largos e independientes que elimina la contrapresión y facilita la salida de gases.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {opciones.map((op, idx) => (
          <button
            key={idx}
            className={`${styles.controlBtn} ${opt === idx ? styles.controlBtnActive : ''}`}
            onClick={() => setOpt(idx)}
          >
            {op.label}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{o.title} — Potencia final: {o.gain}</div>
        <div className={styles.infoBody}>{o.body}</div>
        <div className={styles.infoTip}>💡 {o.tip}</div>
      </div>

      <div style={{ padding: '8px 12px' }}>
        <div className={styles.barWrap}>
          <div className={styles.barHeader}>
            <span>Gol 1.6 MSI de Fábrica</span>
            <span>110 hp</span>
          </div>
          <div className={styles.barBg}>
            <div className={styles.barFill} style={{ width: `${(110/180)*100}%`, background: 'rgba(255,255,255,0.3)' }}></div>
          </div>
        </div>

        <div className={styles.barWrap}>
          <div className={styles.barHeader}>
            <span style={{ color: opt === 3 ? '#e24b4a' : '#1d9e75', fontWeight: 'bold' }}>Opción seleccionada: {o.title}</span>
            <span style={{ color: opt === 3 ? '#e24b4a' : '#1d9e75', fontWeight: 'bold' }}>{o.gain}</span>
          </div>
          <div className={styles.barBg}>
            <div
              className={styles.barFill}
              style={{
                width: `${(o.pct/180)*100}%`,
                background: opt === 3 ? '#e24b4a' : '#1d9e75'
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 18. WIDGET: Lift Camino Tierra
// ==========================================
function LiftCaminoTierraWidget({ viewMode }: WidgetProps) {
  const [height, setHeight] = useState<0 | 1 | 2>(1)

  const heights = [
    { label: 'Stock (14cm)', gain: '0cm', desc: 'Altura original de fábrica del Gol Trend. El guardabarros queda al ras del neumático. Adecuado para asfalto liso, pero golpea el protector de cárter al transitar por huellas profundas de tierra.', tip: 'Chapón protector de cárter obligatorio.' },
    { label: 'Medio (+3/5cm)', gain: '3-5cm', desc: 'La elevación recomendada. Se colocan espirales reforzados elevados de trabajo y amortiguadores de mayor recorrido (Sachs/Monroe). Permite pasar cunetas y huellas rurales sin rozar el chasis, reteniendo el confort y estabilidad en ruta.', tip: 'No requiere espaciadores adicionales, las homocinéticas trabajan en un ángulo seguro.' },
    { label: 'Extremo (+8cm)', gain: '8cm', desc: 'Elevación máxima. Requiere espirales largos, amortiguadores de vástago largo, bieletas de barra estabilizadora alargadas y suplementos de cazoleta de aluminio. Cambia notablemente la estética y el despeje del suelo.', tip: '⚠ Requiere regular comba y alineación completa del auto. El andar en ruta se vuelve más inestable por el centro de gravedad elevado.' }
  ]

  const h = heights[height]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/espiral_elevado.png"
        alt="Suspensión McPherson elevada con espiral reforzado"
        hotspots={[
          { id: '1', x: 48, y: 35, title: 'Espiral Reforzado Elevado', desc: 'Resorte de mayor altura libre y sección de alambre para elevar el chasis.' },
          { id: '2', x: 48, y: 65, title: 'Amortiguador Reforzado', desc: 'Amortiguador con vástago extendido que evita golpes al estirar la suspensión.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {heights.map((ht, idx) => (
          <button
            key={idx}
            className={`${styles.controlBtn} ${height === idx ? styles.controlBtnActive : ''}`}
            onClick={() => setHeight(idx as any)}
          >
            {ht.label}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>Opción de Elevación: {h.label}</div>
        <div className={styles.infoBody}>{h.desc}</div>
        <div className={styles.infoTip}>💡 {h.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 320">
        {/* Carrocería de perfil */}
        <rect
          x="140"
          y={height === 0 ? 110 : height === 1 ? 90 : 70}
          width="400"
          height="80"
          rx="10"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          style={{ transition: 'y 0.3s ease' }}
        />
        <rect
          x="220"
          y={height === 0 ? 70 : height === 1 ? 50 : 30}
          width="240"
          height="40"
          rx="8"
          fill="rgba(255,255,255,0.06)"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1"
          style={{ transition: 'y 0.3s ease' }}
        />

        {/* Rueda delantera */}
        <circle cx="220" cy="220" r="46" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
        <circle cx="220" cy="220" r="14" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" />

        {/* Rueda trasera */}
        <circle cx="460" cy="220" r="46" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
        <circle cx="460" cy="220" r="14" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.3)" />

        {/* Suelo */}
        <line x1="60" y1="266" x2="620" y2="266" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

        {/* Indicador altura */}
        <line
          x1="580"
          y1={height === 0 ? 190 : height === 1 ? 170 : 150}
          x2="580"
          y2="266"
          stroke="#1D9E75"
          strokeWidth="2"
          markerEnd="url(#acon)"
          style={{ transition: 'y1 0.3s ease' }}
        />
        <text
          x="600"
          y={height === 0 ? 230 : height === 1 ? 220 : 210}
          fontSize="10"
          fill="#1D9E75"
          fontWeight="bold"
          style={{ transition: 'y 0.3s ease' }}
        >
          {height === 0 ? 'Stock: ~14cm' : height === 1 ? 'Lift: +4cm' : 'Lift: +8cm'}
        </text>
      </svg>
    </div>
  )
}

// ==========================================
function CircuitoRefrigeracionWidget({ viewMode }: WidgetProps) {
  const [isHot, setIsHot] = useState(false)
  const [activeTab, setActiveTab] = useState<'flujo' | 'desarmado'>('flujo')

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/circuito_agua_vano.png"
        alt="Circuito de refrigeración del motor real"
        hotspots={[
          { id: '1', x: 73, y: 55, title: 'Depósito de Expansión', desc: 'Depósito translúcido con líquido rosa refrigerante G13. Posee marcas de nivel MIN/MAX.' },
          { id: '2', x: 34, y: 52, title: 'Mazo de mangueras y Termostato', desc: 'Mangueras negras que conducen el agua hacia el bloque y el radiador. El termostato regula el paso.' },
          { id: '3', x: 25, y: 86, title: 'Bomba de Agua (Oculta)', desc: 'Está instalada en el bloque motor (detrás de las tapas de distribución) y es movida por la correa dentada.' },
          { id: '4', x: 10, y: 75, title: 'Radiador Frontal', desc: 'Ubicado en el frente para intercambiar calor con el aire del exterior impulsado por el electroventilador.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${activeTab === 'flujo' ? styles.controlBtnActive : ''}`} onClick={() => setActiveTab('flujo')}>Simulación de Flujo</button>
        <button className={`${styles.controlBtn} ${activeTab === 'desarmado' ? styles.controlBtnActiveOrange : ''}`} onClick={() => setActiveTab('desarmado')}>Guía de Desarmado</button>
      </div>

      {activeTab === 'flujo' ? (
        <>
          <div className={styles.controlRow} style={{ marginTop: '8px', gap: '8px' }}>
            <button className={`${styles.controlBtn} ${!isHot ? styles.controlBtnActive : ''}`} onClick={() => setIsHot(false)}>Motor Frío (Ralentí inicial)</button>
            <button className={`${styles.controlBtn} ${isHot ? styles.controlBtnActiveGreen : ''}`} onClick={() => setIsHot(true)}>Motor Caliente (+88°C)</button>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoTitle}>{!isHot ? 'Termostato Cerrado - Calentamiento Rápido' : 'Termostato Abierto - Ciclo de Enfriamiento'}</div>
            <div className={styles.infoBody}>
              {!isHot
                ? 'El agua circula únicamente dentro del bloque motor y la calefacción (bucle de bypass). El termostato bloquea el paso hacia el radiador para que el motor alcance rápido sus ~90°C de temperatura de trabajo.'
                : 'El termostato se abre a los ~88°C. El refrigerante caliente fluye por la manguera superior al radiador, es enfríado por el aire y el electroventilador, y la bomba de agua lo reintroduce frío por abajo.'
              }
            </div>
          </div>

          <svg className={styles.svg} viewBox="0 0 680 340">
            {/* Fondo y etiquetas */}
            <rect x="10" y="10" width="660" height="320" rx="10" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.03)" />
            
            {/* Bloque Motor */}
            <rect x="420" y="70" width="180" height="200" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            <text x="510" y="160" textAnchor="middle" fontSize="13" fontWeight="600" fill="#ffffff">Bloque Motor</text>
            <text x="510" y="180" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">EA111 1.6 MSI</text>

            {/* Canales Internos del Motor (Celeste si frío, Rojo/Naranja si caliente) */}
            <path d="M 450 110 L 570 110 L 570 230 L 450 230 Z" fill="none" stroke={isHot ? '#ef4444' : '#3b82f6'} strokeWidth="5" opacity="0.3" />

            {/* Radiador Frontal */}
            <rect x="80" y="70" width="120" height="200" rx="8" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
            {/* Celdas del radiador */}
            <line x1="100" y1="85" x2="100" y2="255" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <line x1="120" y1="85" x2="120" y2="255" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <line x1="140" y1="85" x2="140" y2="255" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <line x1="160" y1="85" x2="160" y2="255" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <line x1="180" y1="85" x2="180" y2="255" stroke="rgba(255,255,255,0.15)" strokeWidth="2" />
            <text x="140" y="60" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.6)" fontWeight="600">Radiador</text>

            {/* Electroventilador */}
            <g className={isHot ? styles.spinning : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <circle cx="140" cy="170" r="35" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
              {/* Aspas */}
              <line x1="140" y1="135" x2="140" y2="205" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
              <line x1="105" y1="170" x2="175" y2="170" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
              <line x1="115" y1="145" x2="165" y2="195" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
              <line x1="115" y1="195" x2="165" y2="145" stroke="rgba(255,255,255,0.4)" strokeWidth="3" />
              <circle cx="140" cy="170" r="8" fill="rgba(255,255,255,0.6)" />
            </g>

            {/* Depósito de Expansión */}
            <rect x="470" y="20" width="80" height="40" rx="6" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" />
            <text x="510" y="44" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">Depósito</text>
            {/* Nivel de refrigerante rosa/rosa caliente */}
            <rect x="471" y="38" width="78" height="21" rx="2" fill="#E24B4A" opacity="0.3" />
            <line x1="540" y1="35" x2="550" y2="35" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            <text x="560" y="38" fontSize="7" fill="rgba(255,255,255,0.4)">MAX</text>

            {/* Manguera Superior (Caliente) */}
            <path
              d="M 420 100 L 200 100"
              fill="none"
              stroke={isHot ? '#E24B4A' : '#888780'}
              strokeWidth="5"
              strokeDasharray={isHot ? '8 4' : 'none'}
              className={isHot ? styles.flowing : ''}
              style={{ transition: 'stroke 0.3s ease' }}
            />
            <text x="310" y="90" textAnchor="middle" fontSize="9" fill={isHot ? '#E24B4A' : 'rgba(255,255,255,0.4)'} fontWeight="600">
              Manguera Superior (Caliente)
            </text>

            {/* Termostato (Válvula) */}
            <g>
              <circle cx="410" cy="100" r="14" fill="#111622" stroke={isHot ? '#1D9E75' : '#E24B4A'} strokeWidth="2" />
              <text x="410" y="103" textAnchor="middle" fontSize="8" fontWeight="bold" fill={isHot ? '#1D9E75' : '#E24B4A'}>
                {isHot ? 'ABR' : 'CER'}
              </text>
              <text x="410" y="125" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)">Termostato</text>
            </g>

            {/* Manguera Inferior (Retorno Frío) */}
            <path
              d="M 200 240 L 420 240"
              fill="none"
              stroke={isHot ? '#3b82f6' : '#888780'}
              strokeWidth="5"
              strokeDasharray={isHot ? '8 4' : 'none'}
              className={isHot ? styles.flowing : ''}
              style={{ transition: 'stroke 0.3s ease' }}
            />
            <text x="310" y="258" textAnchor="middle" fontSize="9" fill={isHot ? '#3b82f6' : 'rgba(255,255,255,0.4)'} fontWeight="600">
              Manguera Inferior (Retorno Frío)
            </text>

            {/* Bomba de Agua */}
            <g>
              <circle cx="430" cy="240" r="14" fill="#111622" stroke="#3b82f6" strokeWidth="2" />
              <path d="M 423 240 L 437 240 M 430 233 L 430 247" stroke="#3b82f6" strokeWidth="1.5" />
              <circle cx="430" cy="240" r="4" fill="#ffffff" />
              <text x="430" y="268" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.6)">Bomba de Agua</text>
            </g>

            {/* Canal de Bypass (Retorno corto interno del bloque cuando está frío) */}
            <path
              d="M 450 110 C 370 120, 370 220, 450 230"
              fill="none"
              stroke={!isHot ? '#3b82f6' : 'rgba(255,255,255,0.1)'}
              strokeWidth="3.5"
              strokeDasharray={!isHot ? '6 3' : 'none'}
              className={!isHot ? styles.flowing : ''}
              opacity={!isHot ? 0.9 : 0.2}
              style={{ transition: 'stroke 0.3s ease, opacity 0.3s ease' }}
            />
            {!isHot && (
              <text x="350" y="170" textAnchor="middle" fontSize="8" fill="#3b82f6" fontWeight="bold">
                Bypass Activo
              </text>
            )}
          </svg>
        </>
      ) : (
        <div className={styles.practiceContainer} style={{ marginTop: '8px' }}>
          <div className={styles.practiceSection}>
            <h4 className={styles.practiceHeading}>🔧 Desarmado Paso a Paso: Cambiar Bomba de Agua (EA111)</h4>
            <div className={styles.bulletsList}>
              <div className={`${styles.bulletItem} ${styles.bulletazul}`}>
                <strong>Paso 1: Vaciar refrigerante</strong><br />
                Aflojar el tapón o quitar la manguera inferior del radiador. Drenar por completo el refrigerante en una bandeja limpia.
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletgris}`}>
                <strong>Paso 2: Acceso inferior y accesorios</strong><br />
                Desmontar el protector de cárter (chapón), levantar la rueda delantera derecha, quitar el guardaplast y aflojar la polea tensora para retirar la correa de accesorios (alternador/dirección).
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletnaranja}`}>
                <strong>Paso 3: Puesta a punto</strong><br />
                Girar el cigüeñal hasta alinear las marcas PMS (Punto Muerto Superior) en el engranaje del árbol de levas y cigüeñal.
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletrojo}`}>
                <strong>Paso 4: Desmontar distribución</strong><br />
                Aflojar la polea tensora de distribución y retirar la correa dentada con precaución de no mover las marcas.
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletverde}`}>
                <strong>Paso 5: Extraer la bomba de agua</strong><br />
                Retirar los 3 tornillos Allen de fijación que unen la bomba al bloque del motor, removerla y limpiar bien los restos de junta vieja.
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletvioleta}`}>
                <strong>Paso 6: Instalación y purgado</strong><br />
                Colocar junta nueva con un sutil sellador, ajustar los tornillos, armar la distribución, rellenar con líquido nuevo y purgar el aire.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


// ==========================================
// 20. WIDGET: Circuito de Lubricación (Aceite)
// ==========================================
function CircuitoLubricacionWidget({ viewMode }: WidgetProps) {
  const [isLowPressure, setIsLowPressure] = useState(false)
  const [activeTab, setActiveTab] = useState<'flujo' | 'desarmado'>('flujo')

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/carter_bomba_aceite.png"
        alt="Bomba de aceite y cárter desmontado real"
        hotspots={[
          { id: '1', x: 50, y: 10, title: 'Engranaje de Distribución del Cigüeñal', desc: 'Engranaje inferior del cigüeñal que impulsa mecánicamente la distribución y la bomba de aceite.' },
          { id: '2', x: 63, y: 41, title: 'Cuerpo de la Bomba de Aceite', desc: 'Bomba de engranajes instalada en el frente del bloque motor, montada directamente alrededor de la punta del cigüeñal.' },
          { id: '3', x: 63, y: 60, title: 'Tubo de Succión (Chupador)', desc: 'Tubo de aluminio largo que succiona el aceite desde el fondo del cárter.' },
          { id: '4', x: 65, y: 87, title: 'Colador del Chupador (Malla)', desc: 'Malla metálica fina en la punta del chupador que retiene partículas grandes e impurezas del fondo del cárter.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      {/* Selector de Pestaña */}
      <div className={styles.controlRow}>
        <button className={`${styles.controlBtn} ${activeTab === 'flujo' ? styles.controlBtnActive : ''}`} onClick={() => setActiveTab('flujo')}>Simulación de Flujo</button>
        <button className={`${styles.controlBtn} ${activeTab === 'desarmado' ? styles.controlBtnActiveOrange : ''}`} onClick={() => setActiveTab('desarmado')}>Guía de Desarmado</button>
      </div>

      {activeTab === 'flujo' ? (
        <>
          <div className={styles.controlRow} style={{ marginTop: '8px', gap: '8px' }}>
            <button className={`${styles.controlBtn} ${!isLowPressure ? styles.controlBtnActiveGreen : ''}`} onClick={() => setIsLowPressure(false)}>Presión Correcta (Engrase Normal)</button>
            <button className={`${styles.controlBtn} ${isLowPressure ? styles.controlBtnActiveRed : ''}`} onClick={() => setIsLowPressure(true)}>Falta de Presión (Alerta Crítica)</button>
          </div>

          <div className={styles.infoBox}>
            <div className={styles.infoTitle}>{!isLowPressure ? 'Presión Normal - Película Protectora Activa' : 'Falta de Presión - Fricción y Desgaste Crítico'}</div>
            <div className={styles.infoBody}>
              {!isLowPressure
                ? 'El lubricante es succionado y filtrado, fluyendo a presión por las galerías del bloque. Baña permanentemente los cojinetes del cigüeñal y sube a la culata para lubricar las levas a alta presión.'
                : 'La bomba de aceite no genera presión (bomba rota o falta de nivel). El aceite deja de fluir. En segundos, las levas superiores y los cojinetes del cigüeñal rozan metal contra metal a más de 120°C, fundiendo el motor.'
              }
            </div>
          </div>

          <svg className={styles.svg} viewBox="0 0 680 340">
            {/* Fondo */}
            <rect x="10" y="10" width="660" height="320" rx="10" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.03)" />

            {/* Motor (Corte) */}
            {/* Tapa de válvulas */}
            <rect x="250" y="30" width="180" height="40" rx="6" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
            <text x="340" y="52" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.5)">Tapa de Válvulas</text>

            {/* Bloque motor */}
            <rect x="250" y="70" width="180" height="150" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.12)" />
            <text x="340" y="145" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.4)">Bloque Cilindros</text>

            {/* Cárter inferior (Aceite) */}
            <rect x="250" y="220" width="180" height="60" rx="4" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" />
            {/* Nivel de aceite */}
            <rect x="251" y="245" width="178" height="34" rx="2" fill="#BA7517" opacity="0.4" />
            <text x="340" y="265" textAnchor="middle" fontSize="10" fill="#BA7517" fontWeight="bold">Aceite Motor (Cárter)</text>

            {/* Chupador y Filtro */}
            <line x1="320" y1="260" x2="320" y2="200" stroke="#BA7517" strokeWidth="4" />
            <circle cx="320" cy="260" r="10" fill="none" stroke="#BA7517" strokeWidth="2" />
            <text x="305" y="263" fontSize="8" fill="rgba(255,255,255,0.5)">chupador</text>

            {/* Bomba de aceite (Engranaje) */}
            <g className={!isLowPressure ? styles.spinning : ''} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
              <circle cx="320" cy="200" r="14" fill="#111622" stroke="#BA7517" strokeWidth="2" />
              <line x1="320" y1="186" x2="320" y2="214" stroke="#BA7517" strokeWidth="2" />
              <line x1="306" y1="200" x2="334" y2="200" stroke="#BA7517" strokeWidth="2" />
            </g>
            <text x="340" y="204" fontSize="8" fill="rgba(255,255,255,0.5)">bomba</text>

            {/* Filtro de Aceite */}
            <rect x="150" y="170" width="50" height="40" rx="4" fill="rgba(255,255,255,0.05)" stroke="#3b82f6" strokeWidth="1.5" />
            <text x="175" y="195" textAnchor="middle" fontSize="9" fill="#3b82f6">Filtro</text>

            {/* Árbol de levas (Arriba) */}
            <circle cx="340" cy="52" r="12" fill={isLowPressure ? '#ef4444' : '#BA7517'} stroke={isLowPressure ? '#ef4444' : 'rgba(255,255,255,0.3)'} strokeWidth="1.5" className={isLowPressure ? styles.pulsingRed : ''} />
            <text x="340" y="38" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)">Levas</text>

            {/* Cigüeñal / Cojinete (Abajo) */}
            <circle cx="340" cy="180" r="15" fill={isLowPressure ? '#ef4444' : '#BA7517'} stroke={isLowPressure ? '#ef4444' : 'rgba(255,255,255,0.3)'} strokeWidth="1.5" className={isLowPressure ? styles.pulsingRed : ''} />
            <text x="340" y="183" textAnchor="middle" fontSize="7" fill="#ffffff">Cojinete</text>

            {/* Galerías y Canales de Aceite */}
            {/* Bomba -> Filtro */}
            <path d="M 306 200 L 200 200" fill="none" stroke="#BA7517" strokeWidth="3.5" opacity={isLowPressure ? 0.25 : 0.9} />
            {/* Filtro -> Galería Principal */}
            <path d="M 175 170 L 175 140 L 340 140 L 340 165" fill="none" stroke="#BA7517" strokeWidth="3.5" opacity={isLowPressure ? 0.25 : 0.9} />
            {/* Galería Principal -> Culata (Arriba) */}
            <path d="M 340 140 L 300 140 L 300 52 L 328 52" fill="none" stroke="#BA7517" strokeWidth="3" opacity={isLowPressure ? 0.2 : 0.8} />

            {/* Animaciones de flujo ( flowing ) */}
            {!isLowPressure && (
              <>
                <path d="M 306 200 L 200 200" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="5 5" className={styles.flowing} />
                <path d="M 175 170 L 175 140 L 340 140 L 340 165" fill="none" stroke="#ffffff" strokeWidth="1.5" strokeDasharray="5 5" className={styles.flowing} />
                <path d="M 340 140 L 300 140 L 300 52 L 328 52" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeDasharray="5 5" className={styles.flowing} />
              </>
            )}

            {/* Mensajes de Alerta */}
            {isLowPressure && (
              <g>
                <rect x="450" y="140" width="180" height="50" rx="6" fill="rgba(239, 68, 68, 0.15)" stroke="#ef4444" strokeWidth="1.5" />
                <text x="540" y="162" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#ef4444">¡BAJA PRESIÓN DE ACEITE!</text>
                <text x="540" y="178" textAnchor="middle" fontSize="8" fill="#ef4444">Fricción severa y sobrecalentamiento</text>
              </g>
            )}
          </svg>
        </>
      ) : (
        <div className={styles.practiceContainer} style={{ marginTop: '8px' }}>
          <div className={styles.practiceSection}>
            <h4 className={styles.practiceHeading}>🔧 Desarmado Paso a Paso: Acceso a la Bomba de Aceite (EA111)</h4>
            <div className={styles.bulletsList}>
              <div className={`${styles.bulletItem} ${styles.bulletnaranja}`}>
                <strong>Paso 1: Drenar el aceite viejo</strong><br />
                Quitar el tapón roscado del cárter (llave de 19mm) y dejar vaciar por completo el aceite caliente en un recipiente adecuado.
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletgris}`}>
                <strong>Paso 2: Retirar el protector de cárter</strong><br />
                Desatornillar y quitar el chapón protector metálico inferior para liberar la zona de trabajo.
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletazul}`}>
                <strong>Paso 3: Remover el cárter de aluminio</strong><br />
                Retirar los ~16 tornillos Allen o hexagonales que sujetan el cárter de aluminio al bloque del motor, golpearlo suavemente y quitarlo.
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletrojo}`}>
                <strong>Paso 4: Desmontar la distribución inferior</strong><br />
                Desmontar la correa de distribución y retirar el engranaje dentado inferior del cigüeñal.
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletverde}`}>
                <strong>Paso 5: Desmontar la bomba de aceite</strong><br />
                La bomba está encastrada en el eje del cigüeñal. Quitar los tornillos del frente del bloque motor y deslizarla hacia afuera junto con el chupador.
              </div>
              <div className={`${styles.bulletItem} ${styles.bulletvioleta}`}>
                <strong>Paso 6: Limpieza y sellado nuevo</strong><br />
                Limpiar bien los restos de junta de silicona vieja en el bloque. Colocar junta tórica y bomba nueva, aplicar sellador en el cárter y rearmar todo.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}


// ==========================================
// 21. WIDGET: Bujes & Cojinetes
// ==========================================
function BujesCojinetesWidget({ viewMode }: WidgetProps) {
  const [activePieza, setActivePieza] = useState(0)

  const piezas = [
    {
      key: 'rod-wheel',
      label: '🔵 Rodamiento de rueda',
      rect: { x: 122, y: 262, w: 56, h: 56 },
      title: 'Rodamiento de rueda — dentro de la mangueta',
      body: 'Permite que la rueda gire libremente alrededor del semieje. Son bolitas de acero dentro de dos anillos de metal bañados en grasa. Hay uno por rueda (4 en total). Cuando se gastan las bolitas pierden su forma esférica perfecta y el rodamiento empieza a tener juego y hacer ruido.',
      tip: 'Síntoma: zumbido tipo avión que sube con la velocidad. Para confirmar: a 80 km/h hacés una curva suave — si el zumbido baja es el rodamiento del lado que descarga peso. Se cambia con prensa hidráulica.'
    },
    {
      key: 'biela',
      label: '🔵 Cojinetes de biela',
      rect: { x: 276, y: 116, w: 116, h: 28 },
      title: 'Cojinetes de biela — dentro del motor',
      body: 'Son semicasquillos de metal (como medias lunas) que van entre la biela y la muñequilla del cigüeñal. No tienen bolitas — son superficies planas bañadas en aceite. El aceite a presión forma una película que evita el contacto metal con metal. Cuando el aceite falla o el cojinete se desgasta, aparece el golpe metálico al arrancar.',
      tip: '⚠ Golpe metálico "tok tok" al arrancar que no desaparece → cojinetes de biela desgastados. Es el sonido más serio que puede hacer un motor. Test de compresión obligatorio.'
    },
    {
      key: 'alt',
      label: '🔵 Cojinetes alternador',
      rect: { x: 163, y: 88, w: 24, h: 24 },
      title: 'Cojinetes del alternador',
      body: 'El alternador tiene dos cojinetes internos que permiten que el rotor gire dentro de la carcasa. Cuando se gastan aparece un chirrido o zumbido proveniente del alternador. Se puede confirmar sacando la correa auxiliar momentáneamente — si el ruido desaparece era el alternador.',
      tip: 'Muchas veces conviene cambiar el alternador completo en lugar de los cojinetes — el trabajo de desarmar el alternador es similar al costo del alternador reacondicionado.'
    },
    {
      key: 'silent',
      label: '🟢 Silent blocks brazo',
      rect: { x: 114, y: 276, w: 100, h: 26 },
      title: 'Silent blocks del brazo de suspensión',
      body: 'Los bujes de goma que unen el brazo de suspensión al chasis. Son silent blocks de goma vulcanizada entre dos metales. La goma permite un movimiento limitado y absorbe las vibraciones sin necesitar lubricación. Con el tiempo la goma se endurece, se agrieta y pierde elasticidad.',
      tip: 'Síntoma: golpe sordo al pasar badenes, especialmente con el auto frío. Se ven a simple vista desde abajo — goma agrietada o separada del metal = cambio. Son los que más frecuentemente se gastan en el Gol.'
    },
    {
      key: 'barra',
      label: '🟢 Bujes barra estab.',
      rect: { x: 188, y: 330, w: 296, h: 26 },
      title: 'Bujes de la barra estabilizadora',
      body: 'La barra estabilizadora va fijada al chasis mediante dos bujes de goma. También tiene bujes en los extremos donde se conectan las bieletas. Cuando los bujes se gastan, la barra empieza a moverse más de lo normal y aparece un ruido de golpe o chirrido al doblar o en badenes.',
      tip: '✓ Son los más baratos de todo el tren delantero. Se cambian con el auto en el aire en menos de una hora. Antes de cambiar bieletas, revisar primero los bujes de la barra — a veces el ruido viene de ahí.'
    },
    {
      key: 'soporte',
      label: '🟢 Soporte de motor',
      rect: { x: 216, y: 172, w: 248, h: 20 },
      title: 'Soportes de motor (cauchos de motor)',
      body: 'El motor no va atornillado rígido al chasis — va sobre 3-4 soportes de goma que absorben las vibraciones del motor antes de que lleguen a la carrocería. Cuando los soportes se gastan o rompen, el motor empieza a moverse excesivamente y se siente una vibración fuerte dentro del auto, especialmente al arrancar o al acelerar.',
      tip: 'Síntoma clásico: vibración fuerte en el volante y el habitáculo al acelerar o al ralentí. Para confirmar: con el motor encendido, alguien mira el motor desde afuera mientras otro acelera suavemente — si el motor salta o se mueve mucho → soporte roto.'
    }
  ]

  const p = piezas[activePieza]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/bujes_cojinetes_real.png"
        alt="Bujes y rodamientos de chasis reales"
        hotspots={[
          { id: '1', x: 25, y: 50, title: 'Silent Block de goma agrietado', desc: 'Buje de suspensión dañado con goma gastada y separada de la camisa de metal.' },
          { id: '2', x: 70, y: 50, title: 'Rodamiento de Bolas (Rulemán)', desc: 'Rodamiento de bolas SKF con sus anillos y esferas de acero lubricados.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {piezas.map((pieza, idx) => (
          <button
            key={pieza.key}
            className={`${styles.controlBtn} ${activePieza === idx ? styles.controlBtnActive : ''}`}
            onClick={() => setActivePieza(idx)}
          >
            {pieza.label}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{p.title}</div>
        <div className={styles.infoBody}>{p.body}</div>
        <div className={styles.infoTip} style={{ color: p.label.startsWith('🔵') ? '#534AB7' : '#1D9E75' }}>💡 {p.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 420">
        <rect x="60" y="140" width="560" height="100" rx="16" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.05)" strokeWidth="1" opacity="0.3"/>
        
        <circle cx="150" cy="290" r="55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
        <circle cx="150" cy="290" r="18" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
        
        <circle cx="530" cy="290" r="55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
        <circle cx="530" cy="290" r="18" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
        
        <rect x="220" y="50" width="240" height="130" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="340" y="120" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.4)">motor + caja</text>

        {/* 1. Rodamiento rueda */}
        <g opacity={activePieza === 0 ? 1 : 0.3}>
          <circle cx="150" cy="290" r="26" fill="none" stroke="#534AB7" strokeWidth="3" opacity="0.8"/>
          <text x="60" y="265" textAnchor="end" fontSize="9" fill="#534AB7">rodamiento</text>
          <text x="60" y="277" textAnchor="end" fontSize="9" fill="#534AB7">de rueda</text>
          <line x1="62" y1="271" x2="124" y2="282" stroke="#534AB7" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
          
          <circle cx="530" cy="290" r="26" fill="none" stroke="#534AB7" strokeWidth="3" opacity="0.8"/>
          <text x="620" y="277" fontSize="9" fill="#534AB7">rodamiento</text>
          <text x="620" y="289" fontSize="9" fill="#534AB7">de rueda</text>
        </g>

        {/* 2. Cojinetes de biela */}
        <g opacity={activePieza === 1 ? 1 : 0.3}>
          <circle cx="290" cy="130" r="12" fill="none" stroke="#534AB7" strokeWidth="2" opacity="0.7"/>
          <circle cx="320" cy="130" r="12" fill="none" stroke="#534AB7" strokeWidth="2" opacity="0.7"/>
          <circle cx="350" cy="130" r="12" fill="none" stroke="#534AB7" strokeWidth="2" opacity="0.7"/>
          <circle cx="380" cy="130" r="12" fill="none" stroke="#534AB7" strokeWidth="2" opacity="0.7"/>
          <text x="335" y="95" textAnchor="middle" fontSize="9" fill="#534AB7">cojinetes de biela</text>
          <text x="335" y="107" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">(dentro del motor)</text>
          <line x1="335" y1="109" x2="335" y2="118" stroke="#534AB7" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5"/>
        </g>

        {/* 3. Cojinete alternador */}
        <g opacity={activePieza === 2 ? 1 : 0.3}>
          <circle cx="175" cy="100" r="10" fill="none" stroke="#534AB7" strokeWidth="2" opacity="0.7"/>
          <text x="100" y="88" textAnchor="end" fontSize="9" fill="#534AB7">cojinetes</text>
          <text x="100" y="100" textAnchor="end" fontSize="9" fill="#534AB7">alternador</text>
          <line x1="102" y1="94" x2="165" y2="98" stroke="#534AB7" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5"/>
        </g>

        {/* 4. Silent block brazo */}
        <g opacity={activePieza === 3 ? 1 : 0.3}>
          <rect x="190" y="278" width="20" height="24" rx="6" fill="#1D9E75" opacity="0.8"/>
          <rect x="116" y="278" width="20" height="24" rx="6" fill="#1D9E75" opacity="0.8"/>
          <line x1="136" y1="290" x2="190" y2="290" stroke="#1D9E75" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
          <text x="62" y="295" textAnchor="end" fontSize="9" fill="#1D9E75">silent blocks</text>
          <text x="62" y="307" textAnchor="end" fontSize="9" fill="#1D9E75">brazo susp.</text>
          <line x1="64" y1="299" x2="116" y2="290" stroke="#1D9E75" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
          
          <rect x="470" y="278" width="20" height="24" rx="6" fill="#1D9E75" opacity="0.8"/>
          <rect x="544" y="278" width="20" height="24" rx="6" fill="#1D9E75" opacity="0.8"/>
          <line x1="490" y1="290" x2="544" y2="290" stroke="#1D9E75" strokeWidth="4" strokeLinecap="round" opacity="0.5"/>
        </g>

        {/* 5. Bujes barra estabilizadora */}
        <g opacity={activePieza === 4 ? 1 : 0.3}>
          <ellipse cx="200" cy="340" rx="10" ry="8" fill="#1D9E75" opacity="0.7"/>
          <ellipse cx="480" cy="340" rx="10" ry="8" fill="#1D9E75" opacity="0.7"/>
          <line x1="210" y1="340" x2="470" y2="340" stroke="#1D9E75" strokeWidth="4" strokeLinecap="round" opacity="0.35"/>
          <text x="340" y="357" textAnchor="middle" fontSize="9" fill="#1D9E75">bujes de la barra estabilizadora</text>
          <text x="340" y="369" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.4)">(gomas que la fijan al chasis)</text>
        </g>

        {/* 6. Soporte motor */}
        <g opacity={activePieza === 5 ? 1 : 0.3}>
          <rect x="218" y="174" width="24" height="16" rx="5" fill="#1D9E75" opacity="0.8"/>
          <rect x="438" y="174" width="24" height="16" rx="5" fill="#1D9E75" opacity="0.8"/>
          <text x="165" y="175" textAnchor="end" fontSize="9" fill="#1D9E75">soporte</text>
          <text x="165" y="187" textAnchor="end" fontSize="9" fill="#1D9E75">motor</text>
          <line x1="167" y1="181" x2="218" y2="182" stroke="#1D9E75" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.5"/>
          
          <text x="515" y="175" fontSize="9" fill="#1D9E75">soporte</text>
          <text x="515" y="187" fontSize="9" fill="#1D9E75">motor</text>
        </g>

        {/* Highlight box */}
        <rect
          x={p.rect.x - 4}
          y={p.rect.y - 4}
          width={p.rect.w + 8}
          height={p.rect.h + 8}
          rx="8"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}

// ==========================================
// 22. WIDGET: OBD2 Scanner
// ==========================================
function ObdScannerWidget({ viewMode }: WidgetProps) {
  const [activeTema, setActiveTema] = useState(0)

  const temas = [
    {
      key: 'usar',
      label: 'Cómo usarlo',
      rect: { x: 28, y: 118, w: 374, h: 130 },
      title: 'Cómo usar el ELM327 paso a paso',
      body: '① Ubicás el puerto OBD2 bajo el volante del lado izquierdo. ② Enchufás el ELM327 con el auto apagado. ③ Prendés el contacto (sin arrancar). ④ Activás el Bluetooth del celular y lo vinculás (clave: 1234). ⑤ Abrís la app Torque. ⑥ En la app vas a Configuración → Adaptador OBD2 → Elegir dispositivo Bluetooth → ELM327. ⑦ En la pantalla principal tocás "Leer códigos de falla".',
      tip: '✓ La app Torque Lite es gratis y suficiente para leer y borrar códigos. Torque Pro ($3 USD) tiene más funciones de monitoreo en tiempo real.'
    },
    {
      key: 'app',
      label: 'Qué ves en la app',
      rect: { x: 318, y: 118, w: 74, h: 122 },
      title: 'Qué información te muestra la app',
      body: 'En tiempo real podés ver: RPM del motor, temperatura del refrigerante, voltaje de la batería, posición del acelerador (TPS), presión del múltiple de admisión (MAP), flujo de aire (MAF), correcciones de combustible a corto y largo plazo, velocidad, y los códigos de falla activos y pendientes.',
      tip: 'La temperatura del refrigerante es especialmente útil — podés ver exactamente cuándo el termostato abre (cuando sube de ~88°C) y verificar que el ventilador eléctrico se prende cuando corresponde.'
    },
    {
      key: 'ecu',
      label: 'Qué es la ECU',
      rect: { x: 438, y: 78, w: 114, h: 64 },
      title: 'La ECU — la memoria del auto',
      body: 'La ECU recibe señales de todos los sensores constantemente. Cuando una lectura está fuera del rango normal, guarda un código de error en memoria y prende la luz del check engine. El error queda guardado aunque el problema desaparezca — por eso el scanner puede leer fallas intermitentes que ya no están activas.',
      tip: 'Una falla "pendiente" significa que la ECU la detectó una vez pero no está segura todavía. Una falla "confirmada" se detectó varias veces → check engine prendido.'
    },
    {
      key: 'sensores',
      label: 'Los sensores',
      rect: { x: 558, y: 38, w: 104, h: 204 },
      title: 'Los sensores más comunes en el Gol Trend',
      body: 'Lambda (sonda O₂): mide el oxígeno en el escape → código P0130-P0141. MAF/MAP: mide el aire que entra al motor → código P0100-P0113. Temperatura refrigerante: controla el ventilador y el mapa de combustible → P0115-P0128. TPS (acelerador): posición del pedal → P0120-P0124. Sensor ABS: velocidad de cada rueda → C0035-C0050.',
      tip: 'En el Gol Trend los más frecuentes son: P0171 (mezcla pobre → sensor lambda o MAF), P0300 (falla de encendido → bujías o bobina) y C0040/C0050 (sensor ABS).'
    },
    {
      key: 'codigos',
      label: 'Leer los códigos',
      rect: { x: 28, y: 308, w: 624, h: 64 },
      title: 'Cómo leer un código OBD2 — la estructura',
      body: 'Todo código tiene 5 caracteres. La primera letra dice el sistema: P = powertrain (motor y caja), B = carrocería, C = chasis, U = red. El primer número dice si es genérico (0) o específico del fabricante (1). Los últimos 3 números identifican la falla exacta. Ejemplo: P0300 = motor (P), genérico (0), falla de encendido múltiple (300).',
      tip: 'Para buscar qué significa un código: googleás el código + "Volkswagen Gol" y encontrás la explicación exacta. Hay bases de datos gratuitas como obd-codes.com.'
    },
    {
      key: 'borrar',
      label: 'Borrar errores',
      rect: { x: 318, y: 118, w: 74, h: 122 },
      title: 'Borrar códigos — cuándo y cómo',
      body: 'En la app Torque tenés una opción "Borrar códigos de falla". Esto apaga el check engine. PERO: si el problema sigue, el código vuelve en unos km. Borrar el código sin reparar el problema es solo cosmético. Lo correcto es: leer el código → identificar el problema → repararlo → borrar el código → manejar para confirmar que no vuelve.',
      tip: '⚠ Si borrás los códigos antes de llevar el auto a un taller pierden el historial de fallas. Siempre anotar o fotografiar los códigos antes de borrarlos.'
    }
  ]

  const t = temas[activeTema]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/obd2_scanner_real.png"
        alt="Scanner ELM327 conectado al puerto OBD2 real"
        hotspots={[
          { id: '1', x: 50, y: 55, title: 'Scanner Bluetooth ELM327', desc: 'Dispositivo azul conectado a la ficha OBD2 del auto. Envía datos al celular.' },
          { id: '2', x: 50, y: 20, title: 'Puerto OBD2 (bajo tablero)', desc: 'Conector trapezoidal negro de 16 pines del lado del conductor.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {temas.map((tema, idx) => (
          <button
            key={tema.key}
            className={`${styles.controlBtn} ${activeTema === idx ? styles.controlBtnActive : ''}`}
            onClick={() => setActiveTema(idx)}
          >
            {tema.label}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{t.title}</div>
        <div className={styles.infoBody}>{t.body}</div>
        <div className={styles.infoTip}>💡 {t.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 380">
        {/* Puerto OBD2 */}
        <g opacity={activeTema === 0 || activeTema === 4 ? 1 : 0.3}>
          <rect x="30" y="140" width="120" height="70" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
          {[0, 1, 2, 3, 4, 5, 6].map(i => (
            <rect key={`p1-${i}`} x={40 + i * 12} y="154" width="6" height="6" rx="1" fill="rgba(255,255,255,0.4)" />
          ))}
          {[0, 1, 4, 5, 6].map(i => (
            <rect key={`p2-${i}`} x={40 + i * 12} y="168" width="6" height="6" rx="1" fill="rgba(255,255,255,0.4)" />
          ))}
          <text x="90" y="200" textAnchor="middle" fontSize="9" fontWeight="500" fill="#ffffff">Puerto OBD2</text>
          <text x="90" y="212" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)">bajo el volante</text>
        </g>

        {/* Ubicación */}
        <rect x="30" y="240" width="120" height="60" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.1)" strokeWidth="0.5" opacity={activeTema === 0 ? 1 : 0.3}/>
        <text x="90" y="262" textAnchor="middle" fontSize="10" fontWeight="500" fill="#ffffff" opacity={activeTema === 0 ? 1 : 0.3}>¿Dónde está?</text>
        <text x="90" y="278" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" opacity={activeTema === 0 ? 1 : 0.3}>Bajo el volante,</text>
        <text x="90" y="292" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)" opacity={activeTema === 0 ? 1 : 0.3}>lado izquierdo</text>

        {/* Scanner */}
        <g opacity={activeTema === 0 || activeTema === 1 || activeTema === 5 ? 1 : 0.3}>
          <rect x="200" y="140" width="80" height="50" rx="8" fill="rgba(255,255,255,0.02)" stroke="#534AB7" strokeWidth="1.5"/>
          <rect x="208" y="150" width="14" height="10" rx="2" fill="#534AB7" opacity="0.6"/>
          <circle cx="250" cy="158" r="8" fill="rgba(255,255,255,0.02)" stroke="#534AB7" strokeWidth="1"/>
          <text x="240" y="203" textAnchor="middle" fontSize="9" fontWeight="500" fill="#534AB7">ELM327</text>
          <text x="240" y="215" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)">bluetooth</text>
          <line x1="150" y1="175" x2="200" y2="165" stroke="#534AB7" strokeWidth="2" strokeLinecap="round" opacity="0.6"/>
        </g>

        {/* Signals */}
        <path d="M 285 150 Q 295 158 285 166" fill="none" stroke="#534AB7" strokeWidth="1.5" opacity="0.6"/>
        <path d="M 290 145 Q 305 158 290 171" fill="none" stroke="#534AB7" strokeWidth="1.5" opacity="0.4"/>
        <path d="M 295 140 Q 315 158 295 176" fill="none" stroke="#534AB7" strokeWidth="1.5" opacity="0.2"/>

        {/* Celular con app */}
        <g id="o-celular" opacity={activeTema === 1 || activeTema === 5 ? 1 : 0.3}>
          <rect x="320" y="120" width="70" height="120" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
          <rect x="326" y="130" width="58" height="100" rx="4" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" opacity="0.5"/>
          <rect x="328" y="132" width="54" height="96" rx="3" fill="#1a1a1a"/>
          <text x="355" y="152" textAnchor="middle" fontSize="8" fill="#1D9E75">TORQUE</text>
          <circle cx="345" cy="172" r="14" fill="none" stroke="#1D9E75" strokeWidth="2"/>
          <text x="345" y="176" textAnchor="middle" fontSize="7" fill="#1D9E75">RPM</text>
          <circle cx="367" cy="172" r="14" fill="none" stroke="#E24B4A" strokeWidth="2"/>
          <text x="367" y="176" textAnchor="middle" fontSize="7" fill="#E24B4A">°C</text>
          <rect x="330" y="193" width="50" height="16" rx="3" fill="#E24B4A" opacity="0.2"/>
          <text x="355" y="204" textAnchor="middle" fontSize="7" fill="#E24B4A">P0300</text>
          <text x="355" y="220" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.4)">V: 14.2V</text>
          <text x="355" y="230" textAnchor="middle" fontSize="6" fill="rgba(255,255,255,0.4)">TPS: 12%</text>
        </g>

        {/* ECU */}
        <g opacity={activeTema === 2 ? 1 : 0.3}>
          <rect x="440" y="80" width="110" height="60" rx="8" fill="rgba(255,255,255,0.02)" stroke="#BA7517" strokeWidth="1.5"/>
          <text x="495" y="106" textAnchor="middle" fontSize="11" fontWeight="500" fill="#BA7517">ECU</text>
          <text x="495" y="122" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">guarda errores</text>
          <path d="M 440 110 L 280 110 L 240 165" fill="none" stroke="#BA7517" strokeWidth="1.5" strokeDasharray="5 3" opacity="0.5"/>
        </g>

        {/* Sensores */}
        <g opacity={activeTema === 3 ? 1 : 0.3}>
          {['Sensor lambda', 'Sensor MAF/MAP', 'Sensor temp.', 'Sensor ABS', 'TPS (acelerador)'].map((s, idx) => (
            <g key={s}>
              <rect x="560" y={40 + idx * 40} width="100" height="30" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5"/>
              <text x="610" y={59 + idx * 40} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.6)">{s}</text>
              <line x1="560" y1={55 + idx * 40} x2="550" y2="110" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
            </g>
          ))}
          <line x1="550" y1="110" x2="440" y2="110" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
        </g>

        {/* Código OBD2 */}
        <g opacity={activeTema === 4 ? 1 : 0.3}>
          <rect x="30" y="310" width="620" height="60" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5"/>
          <text x="340" y="330" textAnchor="middle" fontSize="11" fontWeight="500" fill="#ffffff">Estructura de un código OBD: P 0 3 0 0</text>
          <text x="100" y="352" textAnchor="middle" fontSize="10" fill="#534AB7">P = motor/caja</text>
          <text x="240" y="352" textAnchor="middle" fontSize="10" fill="#1D9E75">0 = genérico</text>
          <text x="370" y="352" textAnchor="middle" fontSize="10" fill="#BA7517">3 = sistema (combustible)</text>
          <text x="560" y="352" textAnchor="middle" fontSize="10" fill="#E24B4A">00 = falla específica</text>
        </g>

        {/* Highlight box */}
        <rect
          x={t.rect.x - 4}
          y={t.rect.y - 4}
          width={t.rect.w + 8}
          height={t.rect.h + 8}
          rx="8"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}

// ==========================================
// 23. WIDGET: Retenes & Juntas
// ==========================================
function RetenesJuntasWidget({ viewMode }: WidgetProps) {
  const [activePieza, setActivePieza] = useState(0)

  const piezas = [
    {
      key: 'cig-del',
      label: 'Retén cigüeñal delantero',
      rect: { x: 184, y: 194, w: 22, h: 32 },
      color: '#E24B4A',
      title: 'Retén cigüeñal delantero — lado correa de distribución',
      body: 'Sella el extremo delantero del cigüeñal donde sale la polea de distribución. Está escondido detrás de la tapa de distribución — para cambiarlo hay que sacar la correa. Por eso cuando se cambia la correa de distribución, se cambia este retén también. Si falla, el aceite mancha la correa y la puede dañar.',
      tip: '⚠ Aceite en la correa de distribución → retén cigüeñal delantero. Cambio URGENTE — el aceite destruye la goma de la correa.'
    },
    {
      key: 'cig-tras',
      label: 'Retén cigüeñal trasero',
      rect: { x: 474, y: 194, w: 22, h: 32 },
      color: '#E24B4A',
      title: 'Retén cigüeñal trasero — entre motor y caja de cambios',
      body: 'Sella el extremo trasero del cigüeñal donde se une con el volante motor y el embrague. Para cambiarlo hay que separar la caja de cambios del motor — el mismo proceso que el cambio de disco de embrague. Si falla, el aceite contamina el disco de embrague y lo destruye.',
      tip: '⚠ Manchas de aceite en el disco de embrague o embrague que patina con olor a aceite quemado → retén trasero. Se cambia junto con el disco de embrague.'
    },
    {
      key: 'levas',
      label: 'Retén árbol de levas',
      rect: { x: 184, y: 64, w: 22, h: 20 },
      color: '#BA7517',
      title: 'Retén del árbol de levas — delantero, en la culata',
      body: 'Sella el extremo del árbol de levas donde sale la polea. También está detrás de la tapa de distribución. Si falla, el aceite sale por ahí y puede contaminar la correa de distribución igual que el retén del cigüeñal. Se cambia junto con la correa.',
      tip: 'Mismo trabajo que el retén cigüeñal delantero — si entrás a cambiar la correa, cambiás los dos retenes de paso. Cuesta muy poco y el trabajo ya está hecho.'
    },
    {
      key: 'semiejes',
      label: 'Retenes semiejes',
      rect: { x: 486, y: 158, w: 12, h: 104 },
      color: '#534AB7',
      title: 'Retenes de semiejes — en la caja de cambios',
      body: 'Dos retenes, uno donde cada semieje sale de la caja de cambios. Sellan el aceite de la caja mientras los semiejes giran. Cuando fallan, el aceite de la caja gotea en la zona del semieje. Se detectan fácil desde abajo: mancha de aceite marrón/rojizo en la zona donde el semieje entra a la caja.',
      tip: '✓ Para cambiarlos hay que sacar el semieje de la caja (se saca haciendo palanca). Trabajo accesible sin separar la caja completa.'
    },
    {
      key: 'j-culata',
      label: 'Junta de culata',
      rect: { x: 198, y: 112, w: 284, h: 12 },
      color: '#1D9E75',
      title: 'Junta de culata — la más crítica del motor',
      body: 'Sella la unión entre el bloque y la culata. Tiene que soportar la presión de la explosión, el calor extremo y separar los circuitos de aceite y refrigerante que corren adentro del bloque. Si se quema, los circuitos se mezclan: aceite lechoso, humo blanco por el escape, motor se recalienta.',
      tip: '⚠ El motor recalentado quema la junta de culata. Es la falla más cara después de fundir el motor — requiere rectificar la culata además de cambiar la junta.'
    },
    {
      key: 'j-carter',
      label: 'Junta del cárter',
      rect: { x: 198, y: 294, w: 284, h: 10 },
      color: '#888780',
      title: 'Junta del cárter — sella el aceite abajo',
      body: 'Sella la unión entre el cárter y el bloque del motor. Si falla, el aceite gotea por abajo del motor — la mancha más común que ves en el piso del garaje. La junta puede ser de corcho, goma o papel según el modelo. A veces se puede sellar con sellador de silicona sin cambiar la junta.',
      tip: '✓ Manchas de aceite negro en el piso, justo debajo del motor → junta de cárter o tapón de drenaje mal apretado. Revisar el tapón primero — es lo más simple.'
    },
    {
      key: 'j-tapa',
      label: 'Junta tapa de válvulas',
      rect: { x: 198, y: 54, w: 284, h: 10 },
      color: '#185FA5',
      title: 'Junta de la tapa de válvulas — arriba del motor',
      body: 'Sella la tapa de válvulas contra la culata. Es la falla más común y más visible — si el aceite gotea por arriba del motor quemándose en el escape (huele a aceite quemado) → esta junta. Se detecta fácil: aceite en la parte superior del motor, especialmente en los costados de la tapa.',
      tip: '✓ Es una de las reparaciones más simples del motor. Sacás la tapa de válvulas (pocos tornillos), cambiás la junta de goma, volvés a poner. Podés hacerlo vos mismo.'
    }
  ]

  const p = piezas[activePieza]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/retenes_juntas_real.png"
        alt="Retenes y juntas reales sobre una mesa de taller"
        hotspots={[
          { id: '1', x: 70, y: 65, title: 'Retén de Cigüeñal', desc: 'Anillo de goma con resorte metálico interno que sella el aceite del eje giratorio.' },
          { id: '2', x: 40, y: 55, title: 'Junta de Tapa de Válvulas', desc: 'Junta de elastómero plana que evita fugas en el cierre estático superior de culata.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {piezas.map((pieza, idx) => (
          <button
            key={pieza.key}
            className={`${styles.controlBtn} ${activePieza === idx ? styles.controlBtnActive : ''}`}
            onClick={() => setActivePieza(idx)}
          >
            {pieza.label}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{p.title}</div>
        <div className={styles.infoBody}>{p.body}</div>
        <div className={styles.infoTip} style={{ color: p.color }}>💡 {p.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 460">
        {/* BLOQUE MOTOR */}
        <rect x="200" y="120" width="280" height="180" rx="10" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
        <text x="340" y="205" textAnchor="middle" fontSize="12" fill="rgba(255,255,255,0.3)">bloque motor</text>

        {/* CULATA */}
        <rect x="200" y="60" width="280" height="56" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <text x="340" y="92" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.3)">culata</text>

        {/* CÁRTER */}
        <rect x="200" y="300" width="280" height="44" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <text x="340" y="326" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.3)">cárter</text>

        {/* CAJA CAMBIOS */}
        <rect x="490" y="150" width="110" height="120" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
        <text x="545" y="210" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.3)">caja de</text>
        <text x="545" y="225" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.3)">cambios</text>

        {/* 1. Retén delantero */}
        <g opacity={activePieza === 0 ? 1 : 0.35}>
          <rect x="186" y="196" width="18" height="28" rx="3" fill="#E24B4A" opacity="0.85"/>
          <text x="174" y="190" textAnchor="end" fontSize="10" fontWeight="500" fill="#E24B4A">Retén</text>
          <text x="174" y="203" textAnchor="end" fontSize="10" fill="#E24B4A">cigüeñal</text>
          <text x="174" y="216" textAnchor="end" fontSize="10" fill="#E24B4A">delantero</text>
          <line x1="176" y1="207" x2="186" y2="210" stroke="#E24B4A" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
          <rect x="100" y="206" width="86" height="8" rx="3" fill="rgba(255,255,255,0.1)" />
        </g>

        {/* 2. Retén trasero */}
        <g opacity={activePieza === 1 ? 1 : 0.35}>
          <rect x="476" y="196" width="18" height="28" rx="3" fill="#E24B4A" opacity="0.85"/>
          <text x="500" y="190" fontSize="10" fontWeight="500" fill="#E24B4A">Retén</text>
          <text x="500" y="203" fontSize="10" fill="#E24B4A">cigüeñal</text>
          <text x="500" y="216" fontSize="10" fill="#E24B4A">trasero</text>
          <line x1="494" y1="207" x2="500" y2="210" stroke="#E24B4A" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
          <rect x="494" y="206" width="6" height="8" rx="2" fill="rgba(255,255,255,0.1)" />
        </g>

        {/* 3. Retén árbol levas */}
        <g opacity={activePieza === 2 ? 1 : 0.35}>
          <rect x="186" y="68" width="18" height="16" rx="3" fill="#BA7517" opacity="0.85"/>
          <text x="174" y="64" textAnchor="end" fontSize="10" fontWeight="500" fill="#BA7517">Retén</text>
          <text x="174" y="76" textAnchor="end" fontSize="10" fill="#BA7517">árbol levas</text>
          <line x1="176" y1="72" x2="186" y2="76" stroke="#BA7517" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
          <rect x="100" y="72" width="86" height="6" rx="2" fill="rgba(255,255,255,0.1)" />
        </g>

        {/* 4. Retenes semiejes */}
        <g opacity={activePieza === 3 ? 1 : 0.35}>
          <rect x="488" y="160" width="8" height="18" rx="3" fill="#534AB7" opacity="0.85"/>
          <rect x="488" y="242" width="8" height="18" rx="3" fill="#534AB7" opacity="0.85"/>
          <text x="480" y="155" textAnchor="end" fontSize="10" fontWeight="500" fill="#534AB7">Retenes</text>
          <text x="480" y="167" textAnchor="end" fontSize="10" fill="#534AB7">semiejes</text>
          <text x="480" y="179" textAnchor="end" fontSize="10" fill="#534AB7">(caja)</text>
          <line x1="480" y1="168" x2="488" y2="168" stroke="#534AB7" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
          <line x1="480" y1="168" x2="488" y2="252" stroke="#534AB7" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
        </g>

        {/* 5. Junta de culata */}
        <g opacity={activePieza === 4 ? 1 : 0.35}>
          <rect x="200" y="114" width="280" height="8" fill="#1D9E75" opacity="0.6"/>
          <text x="510" y="122" fontSize="10" fontWeight="500" fill="#1D9E75">Junta de culata</text>
          <text x="510" y="134" fontSize="9" fill="rgba(255,255,255,0.5)">la más crítica</text>
          <line x1="508" y1="120" x2="480" y2="120" stroke="#1D9E75" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
        </g>

        {/* 6. Junta cárter */}
        <g opacity={activePieza === 5 ? 1 : 0.35}>
          <rect x="200" y="296" width="280" height="6" fill="#888780" opacity="0.7"/>
          <text x="510" y="302" fontSize="10" fontWeight="500" fill="#888780">Junta cárter</text>
          <text x="510" y="314" fontSize="9" fill="rgba(255,255,255,0.5)">sella el aceite</text>
          <line x1="508" y1="300" x2="480" y2="300" stroke="#888780" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
        </g>

        {/* 7. Junta tapa válvulas */}
        <g opacity={activePieza === 6 ? 1 : 0.35}>
          <rect x="200" y="56" width="280" height="6" fill="#185FA5" opacity="0.7"/>
          <text x="100" y="60" textAnchor="end" fontSize="10" fontWeight="500" fill="#185FA5">Junta tapa</text>
          <text x="100" y="72" textAnchor="end" fontSize="10" fill="#185FA5">de válvulas</text>
          <line x1="102" y1="63" x2="200" y2="60" stroke="#185FA5" strokeWidth="0.5" strokeDasharray="3 2" opacity="0.6"/>
        </g>

        {/* Highlight box */}
        <rect
          x={p.rect.x - 4}
          y={p.rect.y - 4}
          width={p.rect.w + 8}
          height={p.rect.h + 8}
          rx="4"
          fill="none"
          stroke={p.color}
          strokeWidth="2.5"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}

// ==========================================
// 24. WIDGET: Sistema de Frenos
// ==========================================
function SistemaFrenosWidget({ viewMode }: WidgetProps) {
  const [activePart, setActivePart] = useState(0)

  const partes = [
    {
      key: 'pedal',
      label: 'Pedal + Servo',
      rect: { x: 28, y: 158, w: 164, h: 68 },
      title: 'Pedal y servo de freno',
      body: 'Cuando pisás el pedal, el servo (servofreno o bomba de vacío) multiplica tu fuerza usando el vacío que genera el motor. Sin servo tenés que apretar mucho más fuerte para frenar — si el auto se apaga y pisás el freno, el pedal se siente duro porque el servo no tiene vacío. Eso es normal.',
      tip: 'Si el pedal siempre está duro con el motor en marcha → servo de freno fallando.'
    },
    {
      key: 'bomba',
      label: 'Bomba maestra',
      rect: { x: 196, y: 108, w: 84, h: 110 },
      title: 'Bomba maestra y depósito',
      body: 'Convierte la fuerza mecánica del pedal en presión hidráulica. Tiene el depósito de líquido de frenos encima con marcas MIN y MAX. Si el nivel baja, puede entrar aire al circuito → pedal blando. El líquido de frenos es higroscópico — absorbe humedad del ambiente con el tiempo, lo que baja su punto de ebullición.',
      tip: '⚠ El líquido de frenos se cambia cada 2 años aunque no se use. Con humedad absorbida puede hervir en frenadas intensas → pedal blando de golpe.'
    },
    {
      key: 'abs',
      label: 'ABS',
      rect: { x: 298, y: 163, w: 84, h: 54 },
      title: 'Módulo ABS (Anti-lock Braking System)',
      body: 'El ABS evita que las ruedas se bloqueen al frenar fuerte. Sensores en cada rueda miden la velocidad — si una rueda frena más rápido que las demás (está trabando), el ABS libera y vuelve a aplicar la presión de esa rueda hasta 10-15 veces por segundo. El "pedal que vibra" al frenar fuerte es el ABS trabajando — es normal y correcto.',
      tip: '✓ Si se prende la luz ABS en el tablero → algún sensor de rueda falló. El auto frena igual pero sin la asistencia del ABS.'
    },
    {
      key: 'disco',
      label: 'Frenos delanteros (disco)',
      rect: { x: 122, y: 292, w: 76, h: 76 },
      title: 'Frenos de disco delanteros',
      body: 'Una pinza hidráulica aprieta dos pastillas contra el disco (como pinzas de bicicleta). La presión del líquido empuja los pistones de la pinza hacia adentro → las pastillas aprietan el disco → fricción → el auto frena. Los delanteros hacen el 70-80% del trabajo de frenado porque el peso se transfiere hacia adelante.',
      tip: '⚠ Pastillas: cambiar cuando quedan menos de 3mm. Disco: cambiar si está rayado profundamente o tiene menos del grosor mínimo marcado en el canto.'
    },
    {
      key: 'tambor',
      label: 'Frenos traseros (tambor)',
      rect: { x: 122, y: 292, w: 76, h: 76 },
      title: 'Frenos de tambor traseros',
      body: 'Funcionan diferente a los discos. Adentro del tambor (cilindro que gira con la rueda) hay zapatas semicirculares cubiertas de material de fricción. Cuando frenás, un pistón hidráulico las abre hacia afuera contra el tambor. Son menos eficientes que los discos pero suficientes para la parte trasera donde hay menos carga.',
      tip: 'Las zapatas duran más que las pastillas delanteras porque trabajan menos. Se desgastan por el interior — no se ven a simple vista sin desmontar el tambor.'
    },
    {
      key: 'sensor',
      label: 'Sensor ABS',
      rect: { x: 188, y: 320, w: 22, h: 22 },
      title: 'Sensores de velocidad de rueda (ABS)',
      body: 'Uno por rueda, pegado a la mangueta mirando el anillo dentado del buje. Miden cuántas vueltas por segundo da cada rueda y le mandan esa información al módulo ABS. Si un sensor falla → luz ABS en el tablero. Son fáciles de cambiar y accesibles económicamente.',
      tip: 'El sensor ABS también es usado por el ESP (control de estabilidad) si el Gol lo tiene. Si se saca el sensor para limpiar, hay que tener cuidado con el conector — son frágiles.'
    }
  ]

  const p = partes[activePart]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/tren_delantero.png"
        alt="Conjunto de disco y pinza de freno delanteros"
        hotspots={[
          { id: '1', x: 73, y: 68, title: 'Disco de Freno Ventilado', desc: 'Rotor de acero que disipa el calor. Las pastillas muerden esta superficie.' },
          { id: '2', x: 86, y: 60, title: 'Caliper o Pinza de Freno', desc: 'Contiene el pistón hidráulico que empuja las pastillas contra el disco.' }
        ]}
      />
    )
  }

  const esTrasero = p.label.includes('trasero')

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {partes.map((parte, idx) => (
          <button
            key={parte.key}
            className={`${styles.controlBtn} ${activePart === idx ? styles.controlBtnActive : ''}`}
            onClick={() => setActivePart(idx)}
          >
            {parte.label}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{p.title}</div>
        <div className={styles.infoBody}>{p.body}</div>
        <div className={styles.infoTip}>💡 {p.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 420">
        {/* Pedal */}
        <g opacity={activePart === 0 ? 1 : 0.3}>
          <rect x="30" y="160" width="70" height="100" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          <rect x="45" y="220" width="40" height="30" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.12)" strokeWidth="1.5"/>
          <text x="65" y="185" textAnchor="middle" fontSize="10" fontWeight="500" fill="#ffffff">Pedal</text>
          <text x="65" y="200" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">freno</text>
        </g>

        {/* Servo */}
        <g opacity={activePart === 0 ? 1 : 0.3}>
          <circle cx="155" cy="190" r="34" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
          <text x="155" y="187" textAnchor="middle" fontSize="10" fontWeight="500" fill="#ffffff">Servo</text>
          <text x="155" y="200" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">multiplica</text>
          <text x="155" y="212" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">la fuerza</text>
          <line x1="100" y1="210" x2="121" y2="200" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        </g>

        {/* Bomba maestra */}
        <g opacity={activePart === 1 ? 1 : 0.3}>
          <rect x="198" y="165" width="80" height="50" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
          <text x="238" y="186" textAnchor="middle" fontSize="10" fontWeight="500" fill="#ffffff">Bomba</text>
          <text x="238" y="200" textAnchor="middle" fontSize="10" fontWeight="500" fill="#ffffff">maestra</text>
          <text x="238" y="214" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">genera presión</text>
          <line x1="189" y1="190" x2="198" y2="190" stroke="rgba(255,255,255,0.1)" strokeWidth="2" strokeLinecap="round" opacity="0.5"/>
        </g>

        {/* Depósito */}
        <g opacity={activePart === 1 ? 1 : 0.3}>
          <rect x="205" y="110" width="66" height="50" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.08)" strokeWidth="1"/>
          <rect x="208" y="128" width="60" height="18" fill="#E24B4A" opacity="0.15"/>
          <text x="238" y="126" textAnchor="middle" fontSize="9" fontWeight="500" fill="#ffffff">Depósito</text>
          <text x="238" y="140" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)">líquido frenos</text>
          <text x="238" y="152" textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.5)">MIN / MAX</text>
        </g>

        {/* ABS */}
        <g opacity={activePart === 2 ? 1 : 0.3}>
          <rect x="300" y="165" width="80" height="50" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
          <text x="340" y="186" textAnchor="middle" fontSize="11" fontWeight="500" fill="#ffffff">ABS</text>
          <text x="340" y="200" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">módulo</text>
          <text x="340" y="214" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">hidráulico</text>
        </g>

        {/* Tuberías */}
        <path d="M 278 190 L 300 190" fill="none" stroke="#185FA5" strokeWidth="3" strokeLinecap="round" opacity="0.5"/>
        <path d="M 340 165 L 340 100 L 160 100 L 160 310" fill="none" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>
        <path d="M 380 190 L 540 190 L 540 310" fill="none" stroke="#185FA5" strokeWidth="2.5" strokeLinecap="round" opacity="0.4"/>

        {/* Discos delanteros */}
        <g opacity={!esTrasero ? 1 : 0.2}>
          <circle cx="160" cy="330" r="38" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
          <circle cx="160" cy="330" r="30" fill="none" stroke="#E24B4A" strokeWidth="3" opacity="0.5"/>
          <rect x="140" y="310" width="40" height="40" rx="4" fill="rgba(255,255,255,0.01)" stroke="#E24B4A" strokeWidth="2"/>
          <rect x="143" y="313" width="8" height="34" rx="2" fill="#E24B4A" opacity="0.7"/>
          <rect x="169" y="313" width="8" height="34" rx="2" fill="#E24B4A" opacity="0.7"/>
          <text x="160" y="385" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">disco del. izq.</text>
          
          <circle cx="540" cy="330" r="38" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
          <circle cx="540" cy="330" r="30" fill="none" stroke="#E24B4A" strokeWidth="3" opacity="0.5"/>
          <rect x="520" y="310" width="40" height="40" rx="4" fill="rgba(255,255,255,0.01)" stroke="#E24B4A" strokeWidth="2"/>
          <rect x="523" y="313" width="8" height="34" rx="2" fill="#E24B4A" opacity="0.7"/>
          <rect x="549" y="313" width="8" height="34" rx="2" fill="#E24B4A" opacity="0.7"/>
          <text x="540" y="385" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">disco del. der.</text>
        </g>

        {/* Tambores traseros (sólo si esTrasero) */}
        <g opacity={esTrasero ? 1 : 0.05}>
          <circle cx="160" cy="330" r="34" fill="none" stroke="#888780" strokeWidth="2"/>
          <rect x="145" y="315" width="30" height="30" rx="15" fill="rgba(255,255,255,0.01)" stroke="#888780" strokeWidth="1.5"/>
          <text x="160" y="385" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">tambor tras. izq.</text>

          <circle cx="540" cy="330" r="34" fill="none" stroke="#888780" strokeWidth="2"/>
          <rect x="525" y="315" width="30" height="30" rx="15" fill="rgba(255,255,255,0.01)" stroke="#888780" strokeWidth="1.5"/>
          <text x="540" y="385" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">tambor tras. der.</text>
        </g>

        {/* Sensores ABS */}
        <g opacity={activePart === 5 ? 1 : 0.3}>
          <circle cx="198" cy="330" r="8" fill="#534AB7" opacity="0.7"/>
          <circle cx="502" cy="330" r="8" fill="#534AB7" opacity="0.7"/>
          <text x="198" y="312" textAnchor="middle" fontSize="8" fill="#534AB7">sensor ABS</text>
          <text x="502" y="312" textAnchor="middle" fontSize="8" fill="#534AB7">sensor ABS</text>
        </g>

        {/* Highlight box */}
        <rect
          x={p.rect.x - 4}
          y={p.rect.y - 4}
          width={p.rect.w + 8}
          height={p.rect.h + 8}
          rx="8"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}

// ==========================================
// 25. WIDGET: Ubicación de Frenos
// ==========================================
function UbicacionFrenosWidget({ viewMode }: WidgetProps) {
  const [activePieza, setActivePieza] = useState(0)

  const piezas = [
    {
      key: 'servo',
      label: 'Servo',
      rect: { x: 137, y: 92, w: 76, h: 76 },
      title: 'Servo de freno — lado izquierdo del tabique',
      body: 'Es la pieza más grande y fácil de encontrar. Abrís el capó y mirás hacia la izquierda, pegado al tabique que separa el motor del habitáculo. Es ese disco grande negro o gris de unos 20-25cm de diámetro. Inconfundible. Del servo sale la bomba maestra hacia adentro del compartimento.',
      tip: 'No tiene mantenimiento propio — solo se cambia si falla. Falla poco frecuente.'
    },
    {
      key: 'bomba',
      label: 'Bomba maestra',
      rect: { x: 205, y: 92, w: 80, h: 60 },
      title: 'Bomba maestra + depósito — sale del servo',
      body: 'Está pegada al servo, del mismo lado izquierdo. Del servo sale un cilindro metálico (la bomba) y encima tiene un depósito de plástico semitransparente donde podés ver el nivel del líquido de frenos. Es lo que revisás cuando chequeás el líquido de frenos — tiene marcas MIN y MAX visibles.',
      tip: '✓ Para revisar el nivel: mirar el depósito desde arriba sin abrirlo. Si está bajo MIN → agregar líquido DOT 4 (el tipo específico que usa el Gol Trend).'
    },
    {
      key: 'abs',
      label: 'Módulo ABS',
      rect: { x: 418, y: 68, w: 84, h: 54 },
      title: 'Módulo ABS — lado derecho del compartimento motor',
      body: 'Está del otro lado del motor, lado derecho. Es una caja metálica de unos 10x10cm con varias tuberías metálicas de freno conectadas (son las líneas de freno que van a cada rueda). Tiene un conector eléctrico grande. En el Gol Trend está cerca de la batería o del filtro de aire.',
      tip: 'Si la luz ABS se prende en el tablero → primero revisar los sensores de rueda (más baratos y comunes) antes de culpar al módulo.'
    },
    {
      key: 'disco',
      label: 'Disco + pinza (del.)',
      rect: { x: 116, y: 298, w: 88, h: 88 },
      title: 'Disco y pinza delantera — dentro de la rueda',
      body: 'Se ve desde afuera de la rueda sin sacarla — mirás por los rayos de la llanta y ves el disco (anillo metálico plateado) y la pinza (pieza metálica que lo abraza). Para ver las pastillas hay que mirar por la abertura de la pinza. Si las pastillas tienen menos de 3mm de grosor → cambio urgente.',
      tip: 'Para revisar el disco: con la rueda sacada, lo girás con la mano y mirás. Sin rayas profundas y sin variaciones de grosor = OK.'
    },
    {
      key: 'sensor',
      label: 'Sensor ABS (rueda)',
      rect: { x: 194, y: 344, w: 18, h: 30 },
      title: 'Sensor ABS — en la mangueta, junto a la rueda',
      body: 'Pequeño cilindro negro de unos 2cm de diámetro, atornillado a la mangueta apuntando hacia el anillo dentado del rodamiento. Desde abajo del auto se ve claramente en la zona de cada rueda. Tiene un cable que sube hacia el chasis. Se ensucia con barro y agua — es el fallo más común del sistema ABS.',
      tip: '✓ Si la luz ABS se prende → limpiar primero el sensor con un trapo. Muchas veces es solo suciedad acumulada.'
    },
    {
      key: 'tambor',
      label: 'Tambor trasero',
      rect: { x: 268, y: 328, w: 144, h: 64 },
      title: 'Tambores traseros — desde abajo, atrás del auto',
      body: 'Son los cilindros metálicos que cubren los frenos traseros. Se ven desde abajo mirando hacia atrás del auto, uno en cada lado. Para ver las zapatas hay que sacar el tambor (se saca simplemente tirando hacia afuera con la rueda sacada). Las zapatas van por adentro y no son visibles a simple vista.',
      tip: 'Para saber si las zapatas están bien sin desmontar: medir el grosor del tambor en el canto — tiene un valor mínimo grabado. Si está cerca del mínimo → cambio.'
    }
  ]

  const p = piezas[activePieza]

  if (viewMode === 'real') {
    return (
      <HotspotImage
        src="/images/motor_completo.png"
        alt="Vano motor del Volkswagen Gol Trend"
        hotspots={[
          { id: '1', x: 20, y: 45, title: 'Servo y depósito de freno', desc: 'Ubicados contra el panel parallamas trasero del lado del conductor.' },
          { id: '2', x: 70, y: 35, title: 'Ubicación Módulo ABS', desc: 'Caja de válvulas de freno acoplada del lado del acompañante en el motor.' }
        ]}
      />
    )
  }

  return (
    <div className={styles.widgetWrap}>
      <div className={styles.controlRow}>
        {piezas.map((pieza, idx) => (
          <button
            key={pieza.key}
            className={`${styles.controlBtn} ${activePieza === idx ? styles.controlBtnActive : ''}`}
            onClick={() => setActivePieza(idx)}
          >
            {pieza.label}
          </button>
        ))}
      </div>

      <div className={styles.infoBox}>
        <div className={styles.infoTitle}>{p.title}</div>
        <div className={styles.infoBody}>{p.body}</div>
        <div className={styles.infoTip}>💡 {p.tip}</div>
      </div>

      <svg className={styles.svg} viewBox="0 0 680 460">
        <text x="340" y="16" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">Vista desde arriba — compartimento del motor y debajo del auto</text>

        {/* Compartimento motor */}
        <rect x="150" y="24" width="380" height="200" rx="12" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.1)" strokeWidth="1" opacity="0.4"/>
        <rect x="210" y="60" width="200" height="130" rx="8" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
        <text x="310" y="130" textAnchor="middle" fontSize="11" fill="rgba(255,255,255,0.4)">motor</text>

        {/* Servo */}
        <g opacity={activePieza === 0 ? 1 : 0.3}>
          <circle cx="175" cy="130" r="36" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
          <text x="175" y="126" textAnchor="middle" fontSize="10" fontWeight="500" fill="#ffffff">Servo</text>
          <text x="175" y="140" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">freno</text>
          <rect x="150" y="88" width="50" height="16" rx="4" fill="#1D9E75" opacity="0.85"/>
          <text x="175" y="99" textAnchor="middle" fontSize="9" fill="#fff">visible</text>
        </g>

        {/* Bomba maestra */}
        <g opacity={activePieza === 1 ? 1 : 0.3}>
          <rect x="207" y="118" width="55" height="28" rx="6" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
          <text x="234" y="132" textAnchor="middle" fontSize="9" fontWeight="500" fill="#ffffff">B. maestra</text>
          <rect x="212" y="96" width="45" height="22" rx="4" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
          <rect x="214" y="100" width="41" height="8" fill="#E24B4A" opacity="0.2"/>
        </g>

        {/* ABS */}
        <g opacity={activePieza === 2 ? 1 : 0.3}>
          <rect x="420" y="70" width="80" height="50" rx="8" fill="rgba(255,255,255,0.01)" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5"/>
          <text x="460" y="92" textAnchor="middle" fontSize="10" fontWeight="500" fill="#ffffff">Módulo</text>
          <text x="460" y="106" textAnchor="middle" fontSize="10" fontWeight="500" fill="#ffffff">ABS</text>
          <rect x="455" y="74" width="44" height="16" rx="4" fill="#1D9E75" opacity="0.85"/>
          <text x="477" y="85" textAnchor="middle" fontSize="9" fill="#fff">visible</text>
        </g>

        <line x1="150" y1="224" x2="530" y2="224" stroke="rgba(255,255,255,0.15)" strokeWidth="2" opacity="0.5"/>

        {/* Ruedas */}
        <circle cx="160" cy="360" r="55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
        <circle cx="160" cy="360" r="18" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>
        
        <circle cx="520" cy="360" r="55" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2.5"/>
        <circle cx="520" cy="360" r="18" fill="rgba(255,255,255,0.02)" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5"/>

        {/* Disco */}
        <g opacity={activePieza === 3 ? 1 : 0.3}>
          <circle cx="160" cy="360" r="44" fill="none" stroke="#E24B4A" strokeWidth="3" opacity="0.6"/>
          <rect x="138" y="340" width="44" height="40" rx="5" fill="rgba(255,255,255,0.01)" stroke="#E24B4A" strokeWidth="2"/>
          <text x="160" y="358" textAnchor="middle" fontSize="8" fill="#E24B4A">pinza</text>
          <text x="160" y="370" textAnchor="middle" fontSize="8" fill="#E24B4A">+ past.</text>
        </g>

        {/* Sensor ABS */}
        <g opacity={activePieza === 4 ? 1 : 0.3}>
          <rect x="196" y="350" width="14" height="20" rx="3" fill="#534AB7" opacity="0.85"/>
          <text x="215" y="350" fontSize="8" fill="#534AB7">sensor ABS</text>
          <line x1="210" y1="352" x2="200" y2="358" stroke="#534AB7" strokeWidth="0.5" strokeDasharray="2 2" opacity="0.6"/>
        </g>

        {/* Tambor trasero */}
        <g opacity={activePieza === 5 ? 1 : 0.3}>
          <rect x="270" y="330" width="140" height="60" rx="8" fill="rgba(255,255,255,0.01)" stroke="#888780" strokeWidth="1.5"/>
          <text x="340" y="356" textAnchor="middle" fontSize="10" fontWeight="500" fill="#ffffff">Tambores traseros</text>
          <text x="340" y="372" textAnchor="middle" fontSize="9" fill="rgba(255,255,255,0.5)">se ven desde abajo</text>
        </g>

        {/* Highlight box */}
        <rect
          x={p.rect.x - 4}
          y={p.rect.y - 4}
          width={p.rect.w + 8}
          height={p.rect.h + 8}
          rx="8"
          fill="none"
          stroke="#3b82f6"
          strokeWidth="2.5"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}


// ==========================================
// CENTRAL DISPATCHER COMPONENT
// ==========================================
export function RenderWidget({ widgetKey, viewMode }: { widgetKey: TopicWidget; viewMode: 'diagram' | 'real' }) {
  switch (widgetKey) {
    case 'ciclo_4_tiempos':
      return <Ciclo4TiemposWidget viewMode={viewMode} />
    case 'conexiones_internas':
      return <ConexionesInternasWidget viewMode={viewMode} />
    case 'circuito_refrigeracion':
      return <CircuitoRefrigeracionWidget viewMode={viewMode} />
    case 'circuito_lubricacion':
      return <CircuitoLubricacionWidget viewMode={viewMode} />
    case 'motor_niveles':
      return <MotorNivelesWidget viewMode={viewMode} />
    case 'aros_piston_detalle':
      return <ArosDetalleWidget viewMode={viewMode} />
    case 'aros_piston_separacion':
      return <ArosSeparacionWidget viewMode={viewMode} />
    case 'ciguenal_arbol_levas':
      return <CiguenalLevasWidget viewMode={viewMode} />
    case 'sincronizacion_correa':
      return <SincronizacionCorreaWidget viewMode={viewMode} />
    case 'bloqueo_poleas':
      return <BloqueoPoleasWidget viewMode={viewMode} />
    case 'colores_humo':
      return <ColoresHumoWidget viewMode={viewMode} />
    case 'sistema_escape':
      return <SistemaEscapeWidget viewMode={viewMode} />
    case 'cambio_disco_embrague':
      return <CambioDiscoWidget viewMode={viewMode} />
    case 'tren_delantero':
      return <TrenDelanteroWidget viewMode={viewMode} />
    case 'diagnostico_ruidos':
      return <DiagnosticoRuidosWidget viewMode={viewMode} />
    case 'vista_desde_abajo':
      return <VistaDesdeAbajoWidget viewMode={viewMode} />
    case 'cableado_electrico':
      return <CableadoElectricoWidget viewMode={viewMode} />
    case 'mono_vs_multipunto':
      return <MonoMultiWidget viewMode={viewMode} />
    case 'potencia_opciones':
      return <PotenciaOpcionesWidget viewMode={viewMode} />
    case 'lift_camino_tierra':
      return <LiftCaminoTierraWidget viewMode={viewMode} />
    case 'obd2_scanner':
      return <ObdScannerWidget viewMode={viewMode} />
    case 'retenes_juntas':
      return <RetenesJuntasWidget viewMode={viewMode} />
    case 'bujes_cojinetes':
      return <BujesCojinetesWidget viewMode={viewMode} />
    case 'sistema_frenos':
      return <SistemaFrenosWidget viewMode={viewMode} />
    case 'ubicacion_frenos':
      return <UbicacionFrenosWidget viewMode={viewMode} />
    default:
      return null
  }
}
