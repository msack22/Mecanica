import { useState } from 'react'
import widgetsStyles from '../../../components/widgets/widgets.module.css'

type PlanItem = {
  label: string
  rect: [number, number, number, number]
  title: string
  body: string
  tip: string
}

export function MantenimientoPreventivo() {
  const [activeIdx, setActiveIdx] = useState<number>(0)

  const items: PlanItem[] = [
    {
      label: '🛢 Aceite + filtro',
      rect: [38, 248, 604, 44],
      title: 'Aceite + filtro de aceite — cada 10.000 km o 1 año',
      body: 'El más importante de todos. Aceite recomendado para el EA111: 5W-40 sintético o semi-sintético. Siempre cambiar el filtro junto con el aceite — nunca uno sin el otro. Si el auto tiene mucho tiempo sin cambio, hacer flush primero. Cantidad: aprox. 3.5 litros en el Gol Trend 1.6.',
      tip: '✓ Podés hacerlo vos mismo: drenás por el tapón del cárter, cambiás el filtro (llave de filtro), cargás el aceite nuevo por arriba. Costo del aceite + filtro en Argentina: accesible.'
    },
    {
      label: '🔌 Bujías + filtros',
      rect: [38, 198, 604, 40],
      title: 'Bujías + filtro de aire + filtro de nafta — cada 30.000 km o 2 años',
      body: 'Bujías: el EA111 usa bujías de iridio o platino — duran más que las normales pero cuestan más. Al cambiarlas verificar que el gap (separación entre electrodos) sea el correcto (aprox. 1mm). Filtro de aire: se revisa cada 15.000 km y se cambia cada 30.000. Filtro de nafta: cada 30.000 km si es inline. Si está integrado en el tanque solo cuando falla.',
      tip: '✓ Las bujías y el filtro de aire son fáciles de cambiar vos mismo. Las bujías se sacan con llave de bujía (llave de cubo especial larga).'
    },
    {
      label: '🛑 Líquido de frenos',
      rect: [38, 158, 484, 30],
      title: 'Líquido de frenos DOT4 — cada 2 años sin importar km',
      body: 'Este es el más importante que se hace por tiempo y no por km. El DOT4 absorbe humedad del ambiente con el tiempo. Con humedad absorbida su punto de ebullición baja — en una frenada de emergencia puede hervir y el pedal se va al piso. El Gol Trend usa DOT4. Se cambia "sangrando" el sistema para sacar el líquido viejo y el aire.',
      tip: '⚠ Muchos mecánicos no lo mencionan y los dueños no lo cambian nunca. Es el mantenimiento más ignorado y uno de los más importantes para la seguridad.'
    },
    {
      label: '🔄 Correa distribución',
      rect: [38, 108, 364, 40],
      title: 'Correa distribución + kit completo — cada 60.000 km o 4 años',
      body: 'Kit completo: correa + tensador + rodillo + bomba de agua + retén cigüeñal delantero + retén árbol de levas. Nunca cambiar solo la correa sin el tensador y la bomba — si el tensador falla después la correa se rompe igual. Es el trabajo más importante del motor. Si comprás un Gol sin historial de correa → cambiarla al comprar.',
      tip: '⚠ Este trabajo lo hace un mecánico de confianza. No es para hacer en casa sin experiencia. Un error de sincronización funde el motor.'
    },
    {
      label: '💧 Refrigerante',
      rect: [38, 66, 364, 32],
      title: 'Refrigerante + anticongelante — cada 60.000 km o 3 años',
      body: 'El refrigerante se degrada con el tiempo y pierde sus propiedades anticorrosión. El Gol Trend usa refrigerante G12 (rosa/rojo) o G13 — NO mezclar con el refrigerante verde común. Al cambiar, enjuagar el sistema con agua destilada antes de cargar el nuevo. Verificar también las mangueras gruesas — si están blandas o con grietas → cambiar.',
      tip: '✓ Nunca mezclar colores de refrigerante — pueden reaccionar y formar un gel que tapa los canales del radiador.'
    },
    {
      label: '📋 Todo el plan',
      rect: [38, 60, 604, 284],
      title: 'Plan completo de mantenimiento — resumen',
      body: 'Cada 10.000 km / 1 año: aceite 5W-40 + filtro de aceite. Cada 30.000 km / 2 años: bujías iridio/platino + filtro de aire + filtro de nafta. Cada 2 años (tiempo): líquido de frenos DOT4. Cada 60.000 km / 4 años: kit correa distribución completo + refrigerante G12. Revisar en cada cambio de aceite: nivel refrigerante, nivel líquido frenos, presión y estado de neumáticos, luces.',
      tip: '💡 Regla de oro: si comprás un Gol usado sin historial → cambiá aceite, filtros, bujías y correa de distribución inmediatamente. Eso te da una base limpia y sabés exactamente desde cuándo empieza el contador.'
    }
  ]

  const current = items[activeIdx]

  return (
    <div className={widgetsStyles.widgetWrap} style={{ padding: '0px' }}>
      {/* Botones de navegación interna */}
      <div className={widgetsStyles.controlRow} style={{ marginTop: '10px' }}>
        {items.map((it, idx) => (
          <button
            key={idx}
            className={`${widgetsStyles.controlBtn} ${activeIdx === idx ? widgetsStyles.controlBtnActiveGreen : ''}`}
            onClick={() => setActiveIdx(idx)}
          >
            {it.label}
          </button>
        ))}
      </div>

      {/* Caja de información detallada */}
      <div className={widgetsStyles.infoBox} style={{ minHeight: '120px', padding: '16px' }}>
        <div className={widgetsStyles.infoTitle} style={{ fontSize: '14px', fontWeight: 'bold' }}>{current.title}</div>
        <div className={widgetsStyles.infoBody} style={{ fontSize: '13px', marginTop: '6px', lineHeight: '1.5' }}>{current.body}</div>
        {current.tip && (
          <div className={widgetsStyles.infoTip} style={{ fontSize: '12px', marginTop: '8px', color: '#BA7517' }}>
            {current.tip}
          </div>
        )}
      </div>

      {/* SVG Interactivo */}
      <svg className={widgetsStyles.svg} viewBox="0 0 680 380">
        <defs>
          <marker id="amant" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </marker>
        </defs>

        {/* Eje de kilometraje */}
        <line x1="40" y1="300" x2="640" y2="300" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <line x1="640" y1="295" x2="640" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>

        {/* Marcas km */}
        <line x1="40" y1="295" x2="40" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <line x1="160" y1="295" x2="160" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <line x1="280" y1="295" x2="280" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <line x1="400" y1="295" x2="400" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <line x1="520" y1="295" x2="520" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>
        <line x1="640" y1="295" x2="640" y2="305" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5"/>

        <text x="40" y="318" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.6)">0</text>
        <text x="160" y="318" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.6)">10.000</text>
        <text x="280" y="318" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.6)">30.000</text>
        <text x="400" y="318" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.6)">60.000</text>
        <text x="520" y="318" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.6)">100.000</text>
        <text x="640" y="318" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.6)">120.000</text>

        {/* ACEITE + FILTRO (cada 10.000 km / 1 año) */}
        <g id="bar-aceite" opacity={activeIdx === 0 || activeIdx === 5 ? 1 : 0.45}>
          <rect x="40" y="250" width="120" height="40" rx="6" fill="#1D9E75" opacity="0.85"/>
          <rect x="160" y="250" width="120" height="40" rx="6" fill="#1D9E75" opacity="0.85"/>
          <rect x="280" y="250" width="120" height="40" rx="6" fill="#1D9E75" opacity="0.85"/>
          <rect x="400" y="250" width="120" height="40" rx="6" fill="#1D9E75" opacity="0.85"/>
          <rect x="520" y="250" width="120" height="40" rx="6" fill="#1D9E75" opacity="0.85"/>
          <text x="100" y="274" textAnchor="middle" fontSize="9" fontWeight="600" fill="#085041">Aceite + filtro</text>
          <text x="220" y="274" textAnchor="middle" fontSize="9" fontWeight="600" fill="#085041">Aceite + filtro</text>
          <text x="340" y="274" textAnchor="middle" fontSize="9" fontWeight="600" fill="#085041">Aceite + filtro</text>
          <text x="460" y="274" textAnchor="middle" fontSize="9" fontWeight="600" fill="#085041">Aceite + filtro</text>
          <text x="580" y="274" textAnchor="middle" fontSize="9" fontWeight="600" fill="#085041">Aceite + filtro</text>
        </g>
        <text x="36" y="245" textAnchor="end" fontSize="9" fill="#1D9E75">cada 10.000 km</text>
        <text x="36" y="257" textAnchor="end" fontSize="9" fill="#1D9E75">/ 1 año</text>

        {/* BUJÍAS + FILTRO AIRE (cada 30.000 km / 2 años) */}
        <g id="bar-bujias" opacity={activeIdx === 1 || activeIdx === 5 ? 1 : 0.45}>
          <rect x="40" y="200" width="240" height="36" rx="6" fill="#534AB7" opacity="0.8"/>
          <rect x="280" y="200" width="240" height="36" rx="6" fill="#534AB7" opacity="0.8"/>
          <rect x="520" y="200" width="120" height="36" rx="6" fill="#534AB7" opacity="0.8"/>
          <text x="160" y="222" textAnchor="middle" fontSize="9" fill="#EEEDFE">Bujías + filtro aire + filtro nafta</text>
          <text x="400" y="222" textAnchor="middle" fontSize="9" fill="#EEEDFE">Bujías + filtro aire + filtro nafta</text>
          <text x="580" y="222" textAnchor="middle" fontSize="9" fill="#EEEDFE">Bujías + f. aire</text>
        </g>
        <text x="36" y="208" textAnchor="end" fontSize="9" fill="#534AB7">cada 30.000 km</text>
        <text x="36" y="220" textAnchor="end" fontSize="9" fill="#534AB7">/ 2 años</text>

        {/* LÍQUIDO FRENOS (cada 2 años independiente del km) */}
        <g id="bar-frenos" opacity={activeIdx === 2 || activeIdx === 5 ? 1 : 0.45}>
          <rect x="40" y="160" width="480" height="28" rx="6" fill="#E24B4A" opacity="0.75"/>
          <text x="280" y="178" textAnchor="middle" fontSize="9" fill="#FCEBEB">Líquido de frenos DOT4 — cada 2 años sin importar km</text>
        </g>
        <text x="36" y="168" textAnchor="end" fontSize="9" fill="#E24B4A">2 años</text>
        <text x="36" y="180" textAnchor="end" fontSize="9" fill="#E24B4A">(tiempo)</text>

        {/* CORREA DISTRIBUCIÓN (cada 60.000 km / 4 años) */}
        <g id="bar-correa" opacity={activeIdx === 3 || activeIdx === 5 ? 1 : 0.45}>
          <rect x="40" y="110" width="360" height="36" rx="6" fill="#BA7517" opacity="0.85"/>
          <text x="220" y="132" textAnchor="middle" fontSize="9" fontWeight="600" fill="#412402">Correa dist. + bomba agua + tensador + retenes</text>
        </g>
        <line x1="400" y1="110" x2="400" y2="146" stroke="#BA7517" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.6"/>
        <text x="36" y="120" textAnchor="end" fontSize="9" fill="#BA7517">60.000 km</text>
        <text x="36" y="132" textAnchor="end" fontSize="9" fill="#BA7517">/ 4 años</text>

        {/* REFRIGERANTE (cada 60.000 km / 3 años) */}
        <g id="bar-refrig" opacity={activeIdx === 4 || activeIdx === 5 ? 1 : 0.45}>
          <rect x="40" y="68" width="360" height="28" rx="6" fill="#185FA5" opacity="0.8"/>
          <text x="220" y="86" textAnchor="middle" fontSize="9" fill="#E6F1FB">Refrigerante + anticongelante</text>
        </g>
        <text x="36" y="76" textAnchor="end" fontSize="9" fill="#185FA5">60.000 km</text>
        <text x="36" y="88" textAnchor="end" fontSize="9" fill="#185FA5">/ 3 años</text>

        {/* Línea tiempo */}
        <text x="340" y="345" textAnchor="middle" fontSize="10" fill="rgba(255,255,255,0.4)">lo que llegue primero — km o tiempo</text>

        {/* HIGHLIGHT */}
        {activeIdx !== null && (
          <rect
            x={items[activeIdx].rect[0] - 4}
            y={items[activeIdx].rect[1] - 4}
            width={items[activeIdx].rect[2] + 8}
            height={items[activeIdx].rect[3] + 8}
            rx="8"
            fill="none"
            stroke="#3b82f6"
            strokeWidth="2.5"
            opacity="1"
            style={{ transition: 'all 0.3s ease' }}
          />
        )}
      </svg>
    </div>
  )
}
