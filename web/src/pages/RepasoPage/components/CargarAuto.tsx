import { useState, useEffect } from 'react'
import styles from './cargarAuto.module.css'

interface CarConfig {
  kmActual: number;
  kmAnual: number;
  email: string;
  whatsapp: string;
  enableEmail: boolean;
  enableWhatsapp: boolean;
  aceiteDate: string;
  aceiteKm: number;
  bujiasDate: string;
  bujiasKm: number;
  frenosDate: string;
  correaDate: string;
  correaKm: number;
  refrigeranteDate: string;
  refrigeranteKm: number;
  lastAlertSentDate?: string; // Evitar spam repetido en un mismo día
}

const DEFAULT_CONFIG: CarConfig = {
  kmActual: 90000,
  kmAnual: 12000,
  email: '',
  whatsapp: '',
  enableEmail: true,
  enableWhatsapp: true,
  aceiteDate: '2025-10-10',
  aceiteKm: 85000,
  bujiasDate: '2024-06-01',
  bujiasKm: 70000,
  frenosDate: '2025-06-01',
  correaDate: '2022-06-01',
  correaKm: 60000,
  refrigeranteDate: '2024-06-01',
  refrigeranteKm: 70000
}

type MaintenanceKey = 'aceite' | 'bujias' | 'frenos' | 'correa' | 'refrigerante';

interface MaintenanceSpec {
  label: string;
  key: MaintenanceKey;
  limitKm: number | null;
  limitMonths: number;
  icon: string;
}

const SPECS: MaintenanceSpec[] = [
  { label: 'Aceite + Filtro', key: 'aceite', limitKm: 10000, limitMonths: 12, icon: '🛢️' },
  { label: 'Bujías + Filtro Aire/Comb.', key: 'bujias', limitKm: 30000, limitMonths: 24, icon: '🔌' },
  { label: 'Líquido de Frenos', key: 'frenos', limitKm: null, limitMonths: 24, icon: '🛑' },
  { label: 'Correa de Distribución', key: 'correa', limitKm: 60000, limitMonths: 48, icon: '🔄' },
  { label: 'Líquido Refrigerante', key: 'refrigerante', limitKm: 60000, limitMonths: 36, icon: '💧' }
]

export function CargarAuto() {
  const [config, setConfig] = useState<CarConfig>(DEFAULT_CONFIG);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAlertSending, setIsAlertSending] = useState(false);
  const [alertStatusMessage, setAlertStatusMessage] = useState<string | null>(null);

  // Cargar datos desde MySQL en el arranque
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        console.log("Solicitando configuración al backend...");
        const response = await fetch('http://localhost:3002/api/car-config');
        if (response.ok) {
          const data = await response.json();
          setConfig(data);
        } else {
          // Fallback a localStorage si falla la API
          const saved = localStorage.getItem('mecanica_mi_auto');
          if (saved) setConfig(JSON.parse(saved));
        }
      } catch (err) {
        console.warn("No se pudo conectar al backend MySQL, usando localStorage como respaldo:", err);
        const saved = localStorage.getItem('mecanica_mi_auto');
        if (saved) setConfig(JSON.parse(saved));
      } finally {
        setIsLoaded(true);
      }
    };
    fetchConfig();
  }, []);

  // Debounced auto-save hacia MySQL y localStorage
  useEffect(() => {
    if (!isLoaded) return;
    
    const delayDebounceFn = setTimeout(async () => {
      try {
        await fetch('http://localhost:3002/api/car-config', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(config)
        });
        localStorage.setItem('mecanica_mi_auto', JSON.stringify(config));
      } catch (err) {
        console.warn("Fallo al auto-guardar en la base de datos MySQL, respaldando en localStorage:", err);
        localStorage.setItem('mecanica_mi_auto', JSON.stringify(config));
      }
    }, 800); // 800ms debounce

    return () => clearTimeout(delayDebounceFn);
  }, [config, isLoaded]);

  // Cálculos de estado para cada mantenimiento
  const calculateItemStatus = (spec: MaintenanceSpec) => {
    const lastDateVal = (config as any)[`${spec.key}Date`];
    const lastKmVal = spec.limitKm !== null ? Number((config as any)[`${spec.key}Km`] || 0) : null;

    if (!lastDateVal) {
      return { status: 'overdue' as const, text: 'Sin registro', percentage: 0, kmRemaining: 0, daysRemaining: 0 };
    }

    const today = new Date();
    const lastDate = new Date(lastDateVal);
    
    // 1. Calcular expiración por Fecha
    const expirationDate = new Date(lastDate);
    expirationDate.setMonth(expirationDate.getMonth() + spec.limitMonths);
    const daysRemainingDate = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    // 2. Calcular expiración por Kilómetros (si aplica)
    let kmRemaining = 999999;
    let daysRemainingKm = 999999;
    
    if (spec.limitKm !== null && lastKmVal !== null) {
      const expirationKm = lastKmVal + spec.limitKm;
      kmRemaining = expirationKm - config.kmActual;
      
      // Proyectar días restantes en función del kilometraje anual promedio
      if (config.kmAnual > 0) {
        daysRemainingKm = Math.ceil((kmRemaining / config.kmAnual) * 365);
      }
    }

    // El vencimiento real es lo que ocurra primero
    const finalDaysRemaining = Math.min(daysRemainingDate, daysRemainingKm);

    // Calcular porcentaje de vida útil consumida
    let percentage = 0;
    
    const timePercentage = Math.max(0, Math.min(100, ((spec.limitMonths * 30.4) - finalDaysRemaining) / (spec.limitMonths * 30.4) * 100));
    let kmPercentage = 0;
    if (spec.limitKm !== null && lastKmVal !== null) {
      const kmUsed = config.kmActual - lastKmVal;
      kmPercentage = Math.max(0, Math.min(100, (kmUsed / spec.limitKm) * 100));
    }
    percentage = Math.max(timePercentage, kmPercentage);

    // Determinar Estado
    let status: 'ok' | 'near' | 'overdue' = 'ok';
    if (finalDaysRemaining <= 0 || (spec.limitKm !== null && kmRemaining <= 0)) {
      status = 'overdue';
    } else if (finalDaysRemaining < 30 || (spec.limitKm !== null && kmRemaining < 1000)) {
      status = 'near';
    }

    // Texto descriptivo
    let text = '';
    const projectedExp = new Date(today.getTime() + finalDaysRemaining * 24 * 3600 * 1000);
    const projectedYear = projectedExp.getFullYear();
    const months = Math.floor(finalDaysRemaining / 30);
    const days = Math.round(finalDaysRemaining % 30);

    const timeStr = months > 0 
      ? `${months} mes${months > 1 ? 'es' : ''}${days > 0 ? ` y ${days} día${days > 1 ? 's' : ''}` : ''}`
      : `${finalDaysRemaining} día${finalDaysRemaining !== 1 ? 's' : ''}`;

    if (status === 'overdue') {
      const pastKm = spec.limitKm !== null ? lastKmVal! + spec.limitKm - config.kmActual : 0;
      text = spec.limitKm !== null && pastKm < 0
        ? `Vencido hace ${Math.abs(pastKm).toLocaleString()} km o por tiempo`
        : `Vencido hace ${Math.abs(finalDaysRemaining)} días`;
    } else {
      text = spec.limitKm !== null
        ? `Faltan ${Math.max(0, kmRemaining).toLocaleString()} km o ${timeStr} (Est. ${projectedExp.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' })})`
        : `Faltan ${timeStr} (Est. ${projectedExp.toLocaleDateString('es-AR', { month: 'short', year: 'numeric' })})`;
    }

    return {
      status,
      text,
      percentage,
      kmRemaining,
      daysRemaining: finalDaysRemaining
    };
  };

  const calculatedItems = SPECS.map(spec => ({
    spec,
    calc: calculateItemStatus(spec)
  }));

  const overdueOrNearItems = calculatedItems.filter(item => item.calc.status !== 'ok');

  // Lanzar alertas manuales o automáticas al backend local
  const triggerAlert = async (forceManual = false) => {
    if (overdueOrNearItems.length === 0) {
      if (forceManual) {
        setAlertStatusMessage('ℹ️ Todos los mantenimientos están al día. No se requieren alertas.');
      }
      return;
    }

    if (!config.email && !config.whatsapp) {
      setAlertStatusMessage('⚠️ Configura un correo o WhatsApp para poder enviar las alertas.');
      return;
    }

    const todayStr = new Date().toDateString();
    if (!forceManual && config.lastAlertSentDate === todayStr) {
      // Evitar spammear en carga automática en un mismo día
      return;
    }

    setIsAlertSending(true);
    setAlertStatusMessage('⏳ Conectando con el servidor de alertas...');

    // Armar el mensaje de alerta
    const detailLines = overdueOrNearItems.map(item => {
      const prefix = item.calc.status === 'overdue' ? '🛑 [VENCIDO]' : '⚠️ [PRÓXIMO]';
      return `${prefix} ${item.spec.label}: ${item.calc.text}`;
    });

    const alertMessageText = `¡Hola! Aquí tienes el estado de alertas de mantenimiento preventivo para tu Volkswagen Gol Trend (Km Actual: ${config.kmActual.toLocaleString()} km):\n\n${detailLines.join('\n')}\n\nRevisa el manual interactivo para ver los procedimientos y consejos de cambio.`;
    const alertMessageHtml = `<h3>Alerta de Mantenimiento Preventivo</h3>
      <p>Hola, aquí tienes el reporte de alertas pendientes para tu Volkswagen Gol Trend (Km actual: <strong>${config.kmActual.toLocaleString()} km</strong>):</p>
      <ul>
        ${overdueOrNearItems.map(item => {
          const color = item.calc.status === 'overdue' ? '#ef4444' : '#f59e0b';
          const prefix = item.calc.status === 'overdue' ? 'VENCIDO' : 'PRÓXIMO';
          return `<li style="margin-bottom: 8px;">
            <strong style="color: ${color};">[${prefix}] ${item.spec.label}</strong>: ${item.calc.text}
          </li>`;
        }).join('')}
      </ul>
      <p><em>Este es un recordatorio automático generado desde tu Manual de Mecánica Local.</em></p>`;

    try {
      const response = await fetch('http://localhost:3002/api/send-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: config.enableEmail && config.email ? config.email : undefined,
          whatsapp: config.enableWhatsapp && config.whatsapp ? config.whatsapp : undefined,
          title: '[Alerta de Mecánica] Vencimientos de Mantenimiento Preventivo 🚗',
          message: alertMessageText,
          html: alertMessageHtml
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        let channelText = '';
        if (data.emailSent && data.whatsappSent) channelText = 'Email y WhatsApp';
        else if (data.emailSent) channelText = 'Email';
        else if (data.whatsappSent) channelText = 'WhatsApp';
        else channelText = 'Ninguno';

        setAlertStatusMessage(`✅ Alerta enviada con éxito por: ${channelText}.`);
        setConfig(prev => ({ ...prev, lastAlertSentDate: todayStr }));
      } else {
        setAlertStatusMessage(`❌ Error del servidor de alertas: ${data.error || 'Desconocido'}`);
      }
    } catch (error) {
      console.error(error);
      setAlertStatusMessage('❌ No se pudo conectar con el servidor local de alertas (Puerto 3002). Asegúrate de tenerlo ejecutándose en segundo plano.');
    } finally {
      setIsAlertSending(false);
      setTimeout(() => setAlertStatusMessage(null), 10000);
    }
  };

  // Chequeo de alertas automático al cargar si hay items en estado crítico
  useEffect(() => {
    if (overdueOrNearItems.length > 0) {
      const todayStr = new Date().toDateString();
      if (config.lastAlertSentDate !== todayStr) {
        // Ejecutar trigger después de 3 segundos para que cargue la UI
        const timer = setTimeout(() => triggerAlert(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [config.kmActual]);

  const handleInputChange = (field: keyof CarConfig, value: any) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {/* Columna Izquierda: Datos del Auto y Contacto */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>🚗 Datos de tu Vehículo</div>
          
          <div className={styles.formGroup}>
            <label className={styles.label}>Kilometraje Actual (km)</label>
            <input
              type="number"
              className={styles.input}
              value={config.kmActual}
              onChange={(e) => handleInputChange('kmActual', Number(e.target.value))}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Km Promedio Anual (km/año)</label>
            <input
              type="number"
              className={styles.input}
              value={config.kmAnual}
              onChange={(e) => handleInputChange('kmAnual', Number(e.target.value))}
            />
          </div>

          <div className={styles.cardTitle} style={{ marginTop: '12px' }}>🔔 Canales de Alerta</div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Email para Alertas</label>
            <input
              type="email"
              className={styles.input}
              placeholder="correo@ejemplo.com"
              value={config.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
            />
            <div className={styles.checkboxGroup} onClick={() => handleInputChange('enableEmail', !config.enableEmail)}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={config.enableEmail}
                onChange={() => {}}
              />
              <span className={styles.label}>Habilitar alertas por Email</span>
            </div>
          </div>

          <div className={styles.formGroup} style={{ marginTop: '8px' }}>
            <label className={styles.label}>WhatsApp (Nro con prefijo)</label>
            <input
              type="text"
              className={styles.input}
              placeholder="e.g. 5491122334455"
              value={config.whatsapp}
              onChange={(e) => handleInputChange('whatsapp', e.target.value)}
            />
            <div className={styles.checkboxGroup} onClick={() => handleInputChange('enableWhatsapp', !config.enableWhatsapp)}>
              <input
                type="checkbox"
                className={styles.checkbox}
                checked={config.enableWhatsapp}
                onChange={() => {}}
              />
              <span className={styles.label}>Habilitar alertas por WhatsApp</span>
            </div>
          </div>

          {overdueOrNearItems.length > 0 && (
            <button
              onClick={() => triggerAlert(true)}
              className={styles.btnPrimary}
              style={{ marginTop: '12px' }}
              disabled={isAlertSending}
            >
              {isAlertSending ? 'Enviando...' : '📧 Enviar Reporte de Alertas'}
            </button>
          )}

          {alertStatusMessage && (
            <div style={{ fontSize: '12px', marginTop: '8px', padding: '8px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', lineHeight: '1.4' }}>
              {alertStatusMessage}
            </div>
          )}
        </div>

        {/* Columna Derecha: Dashboard y Fechas de Mantenimiento */}
        <div className={styles.statusDashboard}>
          {overdueOrNearItems.length > 0 && (
            <div className={styles.alertPanel}>
              <span className={styles.alertIcon}>⚠️</span>
              <div className={styles.alertText}>
                <span className={styles.alertTitle}>Tienes mantenimientos críticos pendientes</span>
                <span className={styles.alertDesc}>
                  Hay {overdueOrNearItems.length} componente{overdueOrNearItems.length > 1 ? 's' : ''} que requiere{overdueOrNearItems.length > 1 ? 'n' : ''} tu atención para evitar averías.
                </span>
              </div>
            </div>
          )}

          <div className={styles.card}>
            <div className={styles.cardTitle}>📊 Estado de Componentes</div>
            <div className={styles.statusGrid}>
              {calculatedItems.map(({ spec, calc }) => {
                const isOverdue = calc.status === 'overdue';
                const isNear = calc.status === 'near';
                
                const badgeClass = isOverdue
                  ? styles.badgeOverdue
                  : isNear
                    ? styles.badgeNear
                    : styles.badgeOk;
                
                const progressClass = isOverdue
                  ? styles.progressOverdue
                  : isNear
                    ? styles.progressNear
                    : styles.progressOk;

                return (
                  <div key={spec.key} className={styles.statusCard}>
                    <div className={styles.statusCardHeader}>
                      <div className={styles.statusCardTitle}>
                        {spec.icon} {spec.label}
                      </div>
                      <span className={`${styles.statusBadge} ${badgeClass}`}>
                        {calc.status === 'overdue' ? 'Vencido' : calc.status === 'near' ? 'Atención' : 'Al día'}
                      </span>
                    </div>

                    <div className={styles.statusCardBody}>
                      <div className={styles.metricRow}>
                        <span className={styles.metricLabel}>Estado:</span>
                        <span className={styles.metricValue}>{calc.text}</span>
                      </div>

                      <div className={styles.progressBarOuter}>
                        <div
                          className={`${styles.progressBarInner} ${progressClass}`}
                          style={{ width: `${calc.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Formulario de registro de fechas */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>✍️ Registrar Últimos Mantenimientos Realizados</div>
            <div className={styles.formGrid}>
              {SPECS.map((spec) => (
                <div key={spec.key} className={styles.maintenanceItemForm}>
                  <div className={styles.maintenanceItemFormTitle}>
                    {spec.icon} {spec.label}
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Fecha del Servicio</label>
                    <input
                      type="date"
                      className={styles.input}
                      value={(config as any)[`${spec.key}Date`] || ''}
                      onChange={(e) => handleInputChange(`${spec.key}Date` as any, e.target.value)}
                    />
                  </div>

                  {spec.limitKm !== null && (
                    <div className={styles.formGroup}>
                      <label className={styles.label}>Kilometraje del Servicio (km)</label>
                      <input
                        type="number"
                        className={styles.input}
                        value={(config as any)[`${spec.key}Km`] || ''}
                        onChange={(e) => handleInputChange(`${spec.key}Km` as any, Number(e.target.value))}
                      />
                    </div>
                  )}
                  <div className={styles.logStatus}>
                    Límite oficial: {spec.limitKm !== null ? `${spec.limitKm.toLocaleString()} km o ` : ''}{spec.limitMonths / 12} año{spec.limitMonths > 12 ? 's' : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
