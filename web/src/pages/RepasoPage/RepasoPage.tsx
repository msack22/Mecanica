import { useState, useMemo, useEffect, useRef } from 'react'
import { mecanicaData } from '../../data/mecanicaData'
import { procedimientosData, type Procedimiento } from '../../data/procedimientosData'
import { RenderWidget } from '../../components/widgets/Widgets'
import { TagPills } from './components/TagPills'
import { OverviewMap } from '../../components/OverviewMap'
import styles from './repasoPage.module.css'

type SearchResult = {
  type: 'system' | 'topic' | 'concept' | 'procedure'
  systemKey: string
  topicKey: string | null
  procedureId?: string
  title: string
  subtitle: string
  icon: string
}

export function RepasoPage() {
  const [activeTab, setActiveTab] = useState<'repaso' | 'procedimientos'>('repaso')
  const [activeSystemKey, setActiveSystemKey] = useState<string | null>(null)
  const [activeTopicKey, setActiveTopicKey] = useState<string | null>(null)
  const [procFilterSystem, setProcFilterSystem] = useState<string | null>('mec') // default mecánico
  const [searchQuery, setSearchQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [viewMode, setViewMode] = useState<'diagram' | 'real'>('diagram')
  const [hoveredSystem, setHoveredSystem] = useState<string | null>(null)

  const searchRef = useRef<HTMLDivElement>(null)

  // Cerrar sugerencias al hacer clic afuera
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Buscar en sistemas, temas, viñetas y procedimientos
  const suggestions = useMemo<SearchResult[]>(() => {
    if (!searchQuery.trim()) return []

    const query = searchQuery.toLowerCase().trim()
    const results: SearchResult[] = []

    // 1. Buscar en Repaso
    mecanicaData.forEach((sys) => {
      const sysMatch =
        sys.label.toLowerCase().includes(query) || sys.hint.toLowerCase().includes(query)

      sys.topics.forEach((topic) => {
        const topicMatch =
          topic.title.toLowerCase().includes(query) ||
          topic.subtitle.toLowerCase().includes(query) ||
          (topic.body && topic.body.toLowerCase().includes(query))

        if (topicMatch) {
          results.push({
            type: 'topic',
            systemKey: sys.key,
            topicKey: topic.key,
            title: topic.title,
            subtitle: `Sistema: ${sys.label} · ${topic.subtitle}`,
            icon: sys.icon,
          })
        }

        topic.recorridos?.forEach((rec) => {
          rec.items.forEach((item) => {
            if (item.t.toLowerCase().includes(query)) {
              results.push({
                type: 'concept',
                systemKey: sys.key,
                topicKey: topic.key,
                title: item.t,
                subtitle: `En ${topic.title} (${sys.label})`,
                icon: '📝',
              })
            }
          })
        })
      })

      if (sysMatch && !results.some((r) => r.type === 'system' && r.systemKey === sys.key)) {
        results.push({
          type: 'system',
          systemKey: sys.key,
          topicKey: sys.topics[0]?.key ?? null,
          title: sys.label,
          subtitle: `Sistema completo: ${sys.hint}`,
          icon: sys.icon,
        })
      }
    })

    // 2. Buscar en Procedimientos (Videos)
    procedimientosData.forEach((proc) => {
      const procMatch =
        proc.title.toLowerCase().includes(query) ||
        proc.description.toLowerCase().includes(query) ||
        proc.steps.some((s) => s.toLowerCase().includes(query))

      if (procMatch) {
        const sys = mecanicaData.find((s) => s.key === proc.systemKey)
        results.push({
          type: 'procedure',
          systemKey: proc.systemKey,
          topicKey: null,
          procedureId: proc.id,
          title: `Video: ${proc.title}`,
          subtitle: `Procedimiento de reparación · ${sys?.label ?? 'General'}`,
          icon: '🎥',
        })
      }
    })

    return results.slice(0, 8)
  }, [searchQuery])

  // Navegar al seleccionar un resultado
  const handleSelectResult = (result: SearchResult) => {
    if (result.type === 'procedure') {
      setActiveTab('procedimientos')
      setProcFilterSystem(result.systemKey)
      // Opcional: Hacer scroll al video específico
      setTimeout(() => {
        const el = document.getElementById(result.procedureId || '')
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 100)
    } else {
      setActiveTab('repaso')
      setActiveSystemKey(result.systemKey)
      if (result.topicKey) {
        setActiveTopicKey(result.topicKey)
      } else {
        const sys = mecanicaData.find((s) => s.key === result.systemKey)
        setActiveTopicKey(sys?.topics[0]?.key ?? null)
      }
      setViewMode('diagram')
    }
    setSearchQuery('')
    setShowSuggestions(false)
  }

  // Seleccionar sistema
  const handleSelectSystem = (systemKey: string) => {
    setActiveTab('repaso')
    setActiveSystemKey(systemKey)
    const sys = mecanicaData.find((s) => s.key === systemKey)
    setActiveTopicKey(sys?.topics[0]?.key ?? null)
    setViewMode('diagram')
  }

  // Seleccionar tema
  const handleSelectTopic = (topicKey: string, defaultViewMode: 'diagram' | 'real' = 'diagram') => {
    setActiveTopicKey(topicKey)
    setViewMode(defaultViewMode)
  }

  // Volver al inicio (macro)
  const handleGoHome = () => {
    setActiveTab('repaso')
    setActiveSystemKey(null)
    setActiveTopicKey(null)
  }

  // Encontrar sistema y tema activos (Repaso)
  const activeSystem = useMemo(() => {
    return mecanicaData.find((s) => s.key === activeSystemKey) || null
  }, [activeSystemKey])

  const activeTopic = useMemo(() => {
    if (!activeSystem) return null
    return activeSystem.topics.find((t) => t.key === activeTopicKey) || activeSystem.topics[0] || null
  }, [activeSystem, activeTopicKey])

  // Temas de flujos y fotos para el activeSystem
  const flowTopics = useMemo(() => {
    if (!activeSystem) return []
    return activeSystem.topics
  }, [activeSystem])

  const photoTopics = useMemo(() => {
    if (!activeSystem) return []
    return activeSystem.topics.filter((t) => !!t.imageUrl)
  }, [activeSystem])

  // Procedimientos filtrados
  const filteredProcedimientos = useMemo(() => {
    if (procFilterSystem === null) return procedimientosData
    return procedimientosData.filter((p) => p.systemKey === procFilterSystem)
  }, [procFilterSystem])

  return (
    <div className={styles.page}>
      {/* Cabecera / Barra Superior */}
      <header className={styles.header}>
        <div className={styles.logoArea} onClick={handleGoHome}>
          <div className={styles.logoRow}>
            <span className={styles.carLogo}>🚗</span>
            <h1 className={styles.mainTitle}>Manual de Mecánica</h1>
          </div>
          <div className={styles.subtitle}>Volkswagen Gol Trend 1.6 MSI EA111</div>
        </div>

        {/* Pestañas de navegación de secciones principales */}
        <div className={styles.navTabs}>
          <button
            className={`${styles.navTab} ${activeTab === 'repaso' ? styles.navTabActive : ''}`}
            onClick={() => setActiveTab('repaso')}
          >
            Repaso de Sistemas
          </button>
          <button
            className={`${styles.navTab} ${activeTab === 'procedimientos' ? styles.navTabActive : ''}`}
            onClick={() => setActiveTab('procedimientos')}
          >
            Procedimientos de Taller
          </button>
        </div>

        {/* Buscador Global con sugerencias flotantes */}
        <div className={styles.searchWrapper} ref={searchRef}>
          <div className={styles.searchInputWrapper}>
            <span className={styles.searchIcon}>🔍</span>
            <input
              type="text"
              placeholder="Buscar componentes, videos o fallas..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setShowSuggestions(true)
              }}
              onFocus={() => setShowSuggestions(true)}
              className={styles.searchInput}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setShowSuggestions(false)
                }}
                className={styles.clearSearchBtn}
                aria-label="Limpiar búsqueda"
              >
                ✕
              </button>
            )}
          </div>

          {showSuggestions && searchQuery.trim() && (
            <div className={styles.searchResults}>
              {suggestions.length > 0 ? (
                suggestions.map((res, index) => (
                  <button
                    key={`${res.type}-${res.systemKey}-${res.topicKey}-${index}`}
                    onClick={() => handleSelectResult(res)}
                    className={styles.searchResultItem}
                  >
                    <span className={styles.resultIcon}>{res.icon}</span>
                    <div className={styles.resultText}>
                      <span className={styles.resultTitle}>{res.title}</span>
                      <span className={styles.resultSubtitle}>{res.subtitle}</span>
                    </div>
                  </button>
                ))
              ) : (
                <div className={styles.noResults}>No se encontraron resultados para "{searchQuery}"</div>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Migas de Pan (Breadcrumbs) - Solo visible en Repaso de Sistemas */}
      {activeTab === 'repaso' && activeSystem && (
        <nav className={styles.breadcrumbs}>
          <span className={styles.breadcrumbLink} onClick={handleGoHome}>
            Inicio
          </span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbActive}>
            {activeSystem.icon} {activeSystem.label}
          </span>
          {activeTopic && (
            <>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbActive}>{activeTopic.title}</span>
            </>
          )}
        </nav>
      )}

      {/* Migas de Pan para Procedimientos */}
      {activeTab === 'procedimientos' && (
        <nav className={styles.breadcrumbs}>
          <span className={styles.breadcrumbLink} onClick={handleGoHome}>
            Inicio
          </span>
          <span className={styles.breadcrumbSeparator}>/</span>
          <span className={styles.breadcrumbActive}>Procedimientos de Taller</span>
          {procFilterSystem && (
            <>
              <span className={styles.breadcrumbSeparator}>/</span>
              <span className={styles.breadcrumbActive}>
                {mecanicaData.find((s) => s.key === procFilterSystem)?.label || 'General'}
              </span>
            </>
          )}
        </nav>
      )}

      {/* RENDERIZADO BASADO EN LA PESTAÑA ACTIVA */}
      {activeTab === 'repaso' ? (
        // ==========================================
        // SECCIÓN 1: REPASO DE SISTEMAS
        // ==========================================
        !activeSystem ? (
          // Nivel 1: Vista Macro (Inicio con Mapa de Sistemas)
          <OverviewMap
            systems={mecanicaData}
            onSelectSystem={handleSelectSystem}
            hoveredSystem={hoveredSystem}
            onHoverSystem={setHoveredSystem}
          />
        ) : (
          // Nivel 2 y 3: Vista Micro (Sistema + Sandbox de Temas)
          <div className={styles.layout}>
            {/* Barra Lateral Izquierda (Listado de Temas del Sistema) */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarHeader}>
                <button onClick={handleGoHome} className={styles.backBtn}>
                  ← Volver al Mapa
                </button>
                <h2 className={styles.sidebarTitle}>
                  {activeSystem.icon} {activeSystem.label}
                </h2>
              </div>

              <nav className={styles.topicList}>
                {/* Grupo Flujos */}
                <div className={styles.sidebarGroupLabel}>Flujos</div>
                {flowTopics.map((topic) => {
                  const isActive = activeTopic?.key === topic.key && viewMode === 'diagram'
                  return (
                    <button
                      key={`flow-${topic.key}`}
                      onClick={() => handleSelectTopic(topic.key, 'diagram')}
                      className={`${styles.topicItem} ${isActive ? styles.topicItemActive : ''}`}
                    >
                      <span>{topic.title}</span>
                    </button>
                  )
                })}

                {/* Grupo Fotos (solo si hay fotos reales) */}
                {photoTopics.length > 0 && (
                  <>
                    <div className={styles.sidebarGroupLabel} style={{ marginTop: '16px' }}>Fotos</div>
                    {photoTopics.map((topic) => {
                      const isActive = activeTopic?.key === topic.key && viewMode === 'real'
                      return (
                        <button
                          key={`photo-${topic.key}`}
                          onClick={() => handleSelectTopic(topic.key, 'real')}
                          className={`${styles.topicItem} ${isActive ? (styles.topicItemActivePhoto ?? styles.topicItemActive) : ''}`}
                        >
                          <span>{topic.title}</span>
                        </button>
                      )
                    })}
                  </>
                )}
              </nav>
            </aside>

            {/* Área Principal (Detalle del tema seleccionado) */}
            <main className={styles.sandbox}>
              {activeTopic ? (
                <div className={styles.detailCard}>
                  {/* Cabecera del tema */}
                  <div className={styles.topicTitleArea}>
                    <h2 className={styles.topicHeading}>{activeTopic.title}</h2>
                    <p className={styles.topicSubtitle}>{activeTopic.subtitle}</p>
                    {activeTopic.tags && (
                      <div className={styles.tagsWrap}>
                        <TagPills tags={activeTopic.tags} />
                      </div>
                    )}
                  </div>

                  {/* Explicación textual */}
                  {activeTopic.body && (
                    <p className={styles.topicBodyText}>{activeTopic.body}</p>
                  )}

                  {/* Pestañas de modo de visualización si hay imagen real disponible */}
                  {activeTopic.widget && (
                    <>
                      {activeTopic.imageUrl && (
                        <div className={styles.tabsContainer}>
                          <div className={styles.tabs}>
                            <button
                              onClick={() => setViewMode('diagram')}
                              className={`${styles.tabBtn} ${viewMode === 'diagram' ? styles.tabBtnActive : ''}`}
                            >
                              Diagrama Interactivo
                            </button>
                            <button
                              onClick={() => setViewMode('real')}
                              className={`${styles.tabBtn} ${viewMode === 'real' ? styles.tabBtnActive : ''}`}
                            >
                              Foto Real (Identificar)
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Contenedor del Widget interactivo o foto real */}
                      <div className={styles.widgetBox}>
                        <RenderWidget widgetKey={activeTopic.widget} viewMode={viewMode} />
                      </div>
                    </>
                  )}

                  {/* Recorridos / Viñetas de práctica */}
                  {activeTopic.recorridos && activeTopic.recorridos.length > 0 && (
                    <div className={styles.practiceContainer}>
                      <h3 className={styles.sectionTitle}>Temas Clave de Repaso</h3>
                      {activeTopic.recorridos.map((rec, rIdx) => (
                        <div key={rIdx} className={styles.practiceSection}>
                          <h4 className={styles.practiceHeading}>{rec.title}</h4>
                          <div className={styles.bulletsList}>
                            {rec.items.map((item, iIdx) => (
                              <div
                                key={iIdx}
                                className={`${styles.bulletItem} ${styles[`bullet${item.c}`]}`}
                              >
                                {item.t}
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Consejos y Advertencias de Seguridad */}
                  {(activeTopic.tip || activeTopic.warning) && (
                    <div className={styles.alertsContainer}>
                      <h3 className={styles.sectionTitle}>Notas Prácticas</h3>
                      {activeTopic.tip && (
                        <div className={`${styles.alertBox} ${styles.tipBox}`}>
                          <span className={styles.tipIcon}>💡</span>
                          <div className={styles.alertText}>
                            <strong>Consejo práctico:</strong> {activeTopic.tip}
                          </div>
                        </div>
                      )}
                      {activeTopic.warning && (
                        <div className={`${styles.alertBox} ${styles.warningBox}`}>
                          <span className={styles.warningIcon}>⚠️</span>
                          <div className={styles.alertText}>
                            <strong>Atención / Seguridad:</strong> {activeTopic.warning}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className={styles.detailCard}>
                  <p>Seleccioná un tema de la barra lateral para comenzar.</p>
                </div>
              )}
            </main>
          </div>
        )
      ) : (
        // ==========================================
        // SECCIÓN 2: PROCEDIMIENTOS DE TALLER (VIDEOS)
        // ==========================================
        <div className={styles.layout}>
          {/* Barra Lateral Izquierda (Filtro por Sistema que Repara) */}
          <aside className={styles.sidebar}>
            <div className={styles.sidebarHeader}>
              <button onClick={handleGoHome} className={styles.backBtn}>
                ← Volver al Inicio
              </button>
              <h2 className={styles.sidebarTitle}>Sistemas a Reparar</h2>
            </div>

            <nav className={styles.topicList}>
              <button
                onClick={() => setProcFilterSystem(null)}
                className={`${styles.topicItem} ${procFilterSystem === null ? styles.topicItemActive : ''}`}
              >
                📂 Mostrar Todos
              </button>

              {mecanicaData.map((sys) => {
                const isActive = procFilterSystem === sys.key
                return (
                  <button
                    key={sys.key}
                    onClick={() => setProcFilterSystem(sys.key)}
                    className={`${styles.topicItem} ${isActive ? styles.topicItemActive : ''}`}
                  >
                    <span>
                      {sys.icon} {sys.label}
                    </span>
                  </button>
                )
              })}
            </nav>
          </aside>

          {/* Área Principal (Listado de Tarjetas de Videos y Pasos) */}
          <main className={styles.sandbox}>
            <div className={styles.procGrid}>
              {filteredProcedimientos.length > 0 ? (
                filteredProcedimientos.map((proc) => {
                  const sys = mecanicaData.find((s) => s.key === proc.systemKey)
                  return (
                    <article key={proc.id} id={proc.id} className={styles.procCard}>
                      <div className={styles.procCardHeader}>
                        <div className={styles.procCardTitleArea}>
                          <span
                            className={styles.procBadge}
                            style={{
                              background: sys ? `${sys.color}15` : 'rgba(255, 255, 255, 0.05)',
                              color: sys ? sys.color : '#fff',
                              border: sys ? `1px solid ${sys.color}30` : '1px solid rgba(255,255,255,0.1)',
                            }}
                          >
                            {sys?.icon} {sys?.label || 'General'}
                          </span>
                          <h3 className={styles.procCardTitle}>{proc.title}</h3>
                        </div>
                      </div>

                      <p className={styles.procDesc}>{proc.description}</p>

                      <div className={styles.procLayout}>
                        {/* Reproductor incrustado de YouTube para no dejar la app */}
                        <div className={styles.videoWrapper}>
                          <iframe
                            src={`https://www.youtube.com/embed/${proc.youtubeId}`}
                            title={proc.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className={styles.videoIframe}
                          ></iframe>
                        </div>

                        {/* Pasos clave y enlaces alternativos */}
                        <div className={styles.procDetails}>
                          <h4 className={styles.procStepsTitle}>Puntos clave a repasar:</h4>
                          <ul className={styles.procStepsList}>
                            {proc.steps.map((step, idx) => (
                              <li key={idx} className={styles.procStepItem}>
                                {step}
                              </li>
                            ))}
                          </ul>

                          <a
                            href={proc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.procLinkBtn}
                          >
                            🎥 Ver directamente en YouTube ↗
                          </a>
                        </div>
                      </div>
                    </article>
                  )
                })
              ) : (
                <div className={styles.noProcBox}>
                  <h3>Sin Procedimientos Disponibles</h3>
                  <p style={{ marginTop: '8px', fontSize: '13px' }}>
                    Aún no registramos videos o guías paso a paso para la categoría seleccionada.
                    ¡Añadiremos tutoriales prácticos próximamente!
                  </p>
                </div>
              )}
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
