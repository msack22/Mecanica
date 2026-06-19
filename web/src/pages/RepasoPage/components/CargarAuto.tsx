import { useState, useEffect, useRef } from 'react'
import styles from './cargarAuto.module.css'

interface Car {
  id: number;
  user_id: number;
  alias: string;
  brand: string;
  model: string;
  year: number;
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
  lastAlertSentDate?: string | null;
}

interface User {
  id: number;
  email: string;
  name: string;
  token: string;
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
  const [user, setUser] = useState<User | null>(null);
  const [cars, setCars] = useState<Car[]>([]);
  const [activeCarId, setActiveCarId] = useState<number | null>(null);

  // Formulario Auth
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Formulario de Agregar Auto
  const [showAddCarModal, setShowAddCarModal] = useState(false);
  const [newCarAlias, setNewCarAlias] = useState('');
  const [newCarBrand, setNewCarBrand] = useState('Volkswagen');
  const [newCarModel, setNewCarModel] = useState('Gol Trend');
  const [newCarYear, setNewCarYear] = useState(2015);
  const [newCarKm, setNewCarKm] = useState(90000);

  // Alertas
  const [isAlertSending, setIsAlertSending] = useState(false);
  const [alertStatusMessage, setAlertStatusMessage] = useState<string | null>(null);

  const initialLoadRef = useRef(false);

  // 1. Cargar token de sesión
  useEffect(() => {
    const savedToken = localStorage.getItem('mecanica_auth_token');
    const savedUser = localStorage.getItem('mecanica_auth_user');
    
    if (savedToken && savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser({ ...parsedUser, token: savedToken });
      } catch {
        localStorage.removeItem('mecanica_auth_token');
        localStorage.removeItem('mecanica_auth_user');
      }
    }
  }, []);

  // 2. Cargar autos cuando el usuario se autentica
  useEffect(() => {
    if (!user) {
      setCars([]);
      setActiveCarId(null);
      return;
    }

    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3002/api/cars', {
          headers: { 'Authorization': `Bearer ${user.token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setCars(data);
          if (data.length > 0) {
            setActiveCarId(data[0].id);
          }
        }
      } catch (err) {
        console.error("Error al obtener autos del backend:", err);
      }
    };

    fetchCars();
  }, [user]);

  // Auto seleccionado
  const activeCar = cars.find(c => c.id === activeCarId) || null;

  // 3. Debounced Auto-Save para los cambios del auto activo
  useEffect(() => {
    if (!user || !activeCar) return;

    // Evitar que guarde en MySQL en el render inicial de carga
    if (!initialLoadRef.current) {
      initialLoadRef.current = true;
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        await fetch(`http://localhost:3002/api/cars/${activeCar.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${user.token}`
          },
          body: JSON.stringify(activeCar)
        });
      } catch (err) {
        console.error("Error auto-guardando auto:", err);
      }
    }, 800);

    return () => clearTimeout(delayDebounceFn);
  }, [activeCar, user]);

  // Manejador de Login / Registro tradicional
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    const url = authMode === 'login' ? 'login' : 'register';
    const body = authMode === 'login' 
      ? { email: authEmail, password: authPassword }
      : { email: authEmail, password: authPassword, name: authName };

    try {
      const response = await fetch(`http://localhost:3002/api/auth/${url}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('mecanica_auth_token', data.token);
        localStorage.setItem('mecanica_auth_user', JSON.stringify(data.user));
        initialLoadRef.current = false;
        setUser({ ...data.user, token: data.token });
      } else {
        setAuthError(data.error || 'Ocurrió un error en la autenticación.');
      }
    } catch (err) {
      setAuthError('No se pudo conectar al servidor de autenticación local. Verifica que el backend esté ejecutándose.');
    } finally {
      setAuthLoading(false);
    }
  };

  // Mock de inicio de sesión con Google Chrome Email
  const handleGoogleMockLogin = () => {
    // Simulamos que lee la cuenta activa de Google Chrome del usuario
    const chromeEmail = "tu-email@gmail.com";
    setAuthEmail(chromeEmail);
    setAuthName("Matias Sack");
    setAuthMode('register');
    setAuthError(null);
    setAlertStatusMessage("✨ Cuenta de Google detectada. Crea tu contraseña para registrarte rápidamente.");
  };

  const handleLogout = () => {
    localStorage.removeItem('mecanica_auth_token');
    localStorage.removeItem('mecanica_auth_user');
    setUser(null);
  };

  // Agregar auto nuevo
  const handleAddCarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCarAlias.trim() || !user) return;

    try {
      const response = await fetch('http://localhost:3002/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({
          alias: newCarAlias,
          brand: newCarBrand,
          model: newCarModel,
          year: newCarYear,
          kmActual: newCarKm,
          kmAnual: 12000
        })
      });

      if (response.ok) {
        const newCar = await response.json();
        setCars(prev => [...prev, newCar]);
        setActiveCarId(newCar.id);
        setShowAddCarModal(false);
        setNewCarAlias('');
        setNewCarKm(90000);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Eliminar auto
  const handleDeleteCar = async () => {
    if (!activeCar || !user) return;
    if (!window.confirm(`¿Estás seguro de eliminar el auto "${activeCar.alias}"? Se borrará todo su historial.`)) return;

    try {
      const response = await fetch(`http://localhost:3002/api/cars/${activeCar.id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${user.token}` }
      });

      if (response.ok) {
        const remaining = cars.filter(c => c.id !== activeCar.id);
        setCars(remaining);
        if (remaining.length > 0) {
          setActiveCarId(remaining[0].id);
        } else {
          setActiveCarId(null);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleCarValueChange = (field: keyof Car, value: any) => {
    if (!activeCarId) return;
    setCars(prev => prev.map(car => {
      if (car.id === activeCarId) {
        return { ...car, [field]: value };
      }
      return car;
    }));
  };

  // Cálculos de estado para cada mantenimiento
  const calculateItemStatus = (spec: MaintenanceSpec) => {
    if (!activeCar) return null;
    
    const lastDateVal = (activeCar as any)[`${spec.key}Date`];
    const lastKmVal = spec.limitKm !== null ? Number((activeCar as any)[`${spec.key}Km`] || 0) : null;

    if (!lastDateVal) {
      return { status: 'overdue' as const, text: 'Sin registro', percentage: 0, kmRemaining: 0, daysRemaining: 0 };
    }

    const today = new Date();
    const lastDate = new Date(lastDateVal);
    
    const expirationDate = new Date(lastDate);
    expirationDate.setMonth(expirationDate.getMonth() + spec.limitMonths);
    const daysRemainingDate = Math.ceil((expirationDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

    let kmRemaining = 999999;
    let daysRemainingKm = 999999;
    
    if (spec.limitKm !== null && lastKmVal !== null) {
      const expirationKm = lastKmVal + spec.limitKm;
      kmRemaining = expirationKm - activeCar.kmActual;
      
      if (activeCar.kmAnual > 0) {
        daysRemainingKm = Math.ceil((kmRemaining / activeCar.kmAnual) * 365);
      }
    }

    const finalDaysRemaining = Math.min(daysRemainingDate, daysRemainingKm);

    let percentage = 0;
    const timePercentage = Math.max(0, Math.min(100, ((spec.limitMonths * 30.4) - finalDaysRemaining) / (spec.limitMonths * 30.4) * 100));
    let kmPercentage = 0;
    if (spec.limitKm !== null && lastKmVal !== null) {
      const kmUsed = activeCar.kmActual - lastKmVal;
      kmPercentage = Math.max(0, Math.min(100, (kmUsed / spec.limitKm) * 100));
    }
    percentage = Math.max(timePercentage, kmPercentage);

    let status: 'ok' | 'near' | 'overdue' = 'ok';
    if (finalDaysRemaining <= 0 || (spec.limitKm !== null && kmRemaining <= 0)) {
      status = 'overdue';
    } else if (finalDaysRemaining < 30 || (spec.limitKm !== null && kmRemaining < 1000)) {
      status = 'near';
    }

    let text = '';
    const projectedExp = new Date(today.getTime() + finalDaysRemaining * 24 * 3600 * 1000);
    const months = Math.floor(finalDaysRemaining / 30);
    const days = Math.round(finalDaysRemaining % 30);

    const timeStr = months > 0 
      ? `${months} mes${months > 1 ? 'es' : ''}${days > 0 ? ` y ${days} día${days > 1 ? 's' : ''}` : ''}`
      : `${finalDaysRemaining} día${finalDaysRemaining !== 1 ? 's' : ''}`;

    if (status === 'overdue') {
      const pastKm = spec.limitKm !== null ? lastKmVal! + spec.limitKm - activeCar.kmActual : 0;
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
  })).filter(x => x.calc !== null) as { spec: MaintenanceSpec, calc: any }[];

  const overdueOrNearItems = calculatedItems.filter(item => item.calc.status !== 'ok');

  // Lanzar alertas manuales o automáticas al backend local
  const triggerAlert = async (forceManual = false) => {
    if (!activeCar || !user) return;
    if (overdueOrNearItems.length === 0) {
      if (forceManual) {
        setAlertStatusMessage('ℹ️ Todos los mantenimientos están al día. No se requieren alertas.');
      }
      return;
    }

    if (!activeCar.email && !activeCar.whatsapp) {
      setAlertStatusMessage('⚠️ Configura un correo o WhatsApp en el auto activo para recibir las alertas.');
      return;
    }

    // LÓGICA DE ALERTA CADA 10 DÍAS PARA EVITAR SPAM EN ENVIOS AUTOMÁTICOS
    const today = new Date();
    if (!forceManual && activeCar.lastAlertSentDate) {
      const lastSent = new Date(activeCar.lastAlertSentDate);
      const diffTime = Math.abs(today.getTime() - lastSent.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 10) {
        console.log(`Alerta automática bloqueada. Pasaron ${diffDays} días de la última (intervalo: 10 días).`);
        return;
      }
    }

    setIsAlertSending(true);
    setAlertStatusMessage('⏳ Conectando con el servidor de alertas...');

    const detailLines = overdueOrNearItems.map(item => {
      const prefix = item.calc.status === 'overdue' ? '🛑 [VENCIDO]' : '⚠️ [PRÓXIMO]';
      return `${prefix} ${item.spec.label}: ${item.calc.text}`;
    });

    const alertMessageText = `¡Hola! Aquí tienes el estado de alertas de mantenimiento preventivo para tu vehículo "${activeCar.alias}" (${activeCar.brand} ${activeCar.model} - Km Actual: ${activeCar.kmActual.toLocaleString()} km):\n\n${detailLines.join('\n')}\n\nRevisa el manual interactivo para ver los procedimientos de taller y consejos.`;
    const alertMessageHtml = `<h3>Alerta de Mantenimiento Preventivo</h3>
      <p>Hola, aquí tienes el reporte de alertas pendientes para tu vehículo <strong>"${activeCar.alias}"</strong> (${activeCar.brand} ${activeCar.model} - Km actual: <strong>${activeCar.kmActual.toLocaleString()} km</strong>):</p>
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
          email: activeCar.enableEmail && activeCar.email ? activeCar.email : undefined,
          whatsapp: activeCar.enableWhatsapp && activeCar.whatsapp ? activeCar.whatsapp : undefined,
          title: `[Alerta Mecánica] Vencimientos para tu ${activeCar.model} 🚗`,
          message: alertMessageText,
          html: alertMessageHtml,
          carId: activeCar.id // Pasar carId para actualizar lastAlertSentDate en MySQL
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        let channelText = '';
        if (data.emailSent && data.whatsappSent) channelText = 'Email y WhatsApp';
        else if (data.emailSent) channelText = 'Email';
        else if (data.whatsappSent) channelText = 'WhatsApp';
        else channelText = 'Ninguno';

        setAlertStatusMessage(`✅ Alertas automáticas enviadas con éxito por: ${channelText}.`);
        
        // Actualizar el estado local para reflejar la última fecha de alerta de inmediato
        const todayStr = new Date().toDateString();
        handleCarValueChange('lastAlertSentDate', todayStr);
      } else {
        setAlertStatusMessage(`❌ Error del servidor de alertas: ${data.error || 'Desconocido'}`);
      }
    } catch (error) {
      setAlertStatusMessage('❌ No se pudo conectar con el servidor local de alertas (Puerto 3002). Asegúrate de tenerlo ejecutándose en segundo plano.');
    } finally {
      setIsAlertSending(false);
      setTimeout(() => setAlertStatusMessage(null), 10000);
    }
  };

  // Chequeo de alertas automático al cargar si hay items en estado crítico y pasaron 10 días
  useEffect(() => {
    if (activeCar && overdueOrNearItems.length > 0) {
      const today = new Date();
      let shouldAlert = true;
      
      if (activeCar.lastAlertSentDate) {
        const lastSent = new Date(activeCar.lastAlertSentDate);
        const diffTime = Math.abs(today.getTime() - lastSent.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays < 10) {
          shouldAlert = false;
        }
      }
      
      if (shouldAlert) {
        const timer = setTimeout(() => triggerAlert(false), 3000);
        return () => clearTimeout(timer);
      }
    }
  }, [activeCarId, activeCar?.kmActual]);

  // Si el usuario no está logueado, mostrar la pantalla de Login / Registro
  if (!user) {
    return (
      <div className={styles.authContainer}>
        <div className={styles.authTabs}>
          <button 
            className={`${styles.authTab} ${authMode === 'login' ? styles.authTabActive : ''}`}
            onClick={() => setAuthMode('login')}
          >
            Iniciar Sesión
          </button>
          <button 
            className={`${styles.authTab} ${authMode === 'register' ? styles.authTabActive : ''}`}
            onClick={() => setAuthMode('register')}
          >
            Crear Cuenta
          </button>
        </div>

        <div className={styles.card}>
          <div className={styles.cardTitle}>
            {authMode === 'login' ? '🔑 Ingresá a tu cuenta' : '📝 Registrate en el Manual'}
          </div>

          <button onClick={handleGoogleMockLogin} className={styles.googleBtn}>
            <span style={{ fontSize: '16px' }}>🌐</span> Registrarse/Ingresar con Google Chrome
          </button>

          <div className={styles.orDivider}>o usa tu mail y contraseña</div>

          <form onSubmit={handleAuthSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {authMode === 'register' && (
              <div className={styles.formGroup}>
                <label className={styles.label}>Nombre completo</label>
                <input
                  type="text"
                  className={styles.input}
                  placeholder="Tu nombre"
                  value={authName}
                  onChange={(e) => setAuthName(e.target.value)}
                  required
                />
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.label}>Correo electrónico</label>
              <input
                type="email"
                className={styles.input}
                placeholder="ejemplo@correo.com"
                value={authEmail}
                onChange={(e) => setAuthEmail(e.target.value)}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Contraseña</label>
              <input
                type="password"
                className={styles.input}
                placeholder="••••••••"
                value={authPassword}
                onChange={(e) => setAuthPassword(e.target.value)}
                required
              />
            </div>

            {authError && (
              <div style={{ color: '#ef4444', fontSize: '12px', background: 'rgba(239, 68, 68, 0.08)', padding: '8px', borderRadius: '6px' }}>
                ⚠️ {authError}
              </div>
            )}

            {alertStatusMessage && (
              <div style={{ color: '#2ecc71', fontSize: '12.5px', background: 'rgba(46, 204, 113, 0.08)', padding: '8px', borderRadius: '6px' }}>
                {alertStatusMessage}
              </div>
            )}

            <button type="submit" className={styles.btnPrimary} disabled={authLoading}>
              {authLoading ? 'Procesando...' : authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Barra superior de control del usuario autenticado */}
      <div className={styles.userHeaderBar}>
        <div className={styles.userWelcome}>
          👤 ¡Hola, {user.name || user.email}!
        </div>
        
        <div className={styles.carControls}>
          <select 
            className={styles.selectCar} 
            value={activeCarId || ''} 
            onChange={(e) => {
              initialLoadRef.current = false;
              setActiveCarId(Number(e.target.value));
            }}
          >
            {cars.map(c => (
              <option key={c.id} value={c.id}>🚗 {c.alias} ({c.year})</option>
            ))}
            {cars.length === 0 && <option value="">Sin vehículos registrados</option>}
          </select>

          <button className={styles.btnSecondary} onClick={() => setShowAddCarModal(true)}>
            ➕ Agregar Auto
          </button>
          
          <button className={styles.btnLogout} onClick={handleLogout}>
            Cerrar Sesión
          </button>
        </div>
      </div>

      {activeCar ? (
        <div className={styles.grid}>
          {/* Columna Izquierda: Datos del Auto y Contacto */}
          <div className={styles.card}>
            <div className={styles.cardTitle}>🚗 Datos de tu Vehículo</div>
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Alias o Nombre del Vehículo</label>
              <input
                type="text"
                className={styles.input}
                value={activeCar.alias}
                onChange={(e) => handleCarValueChange('alias', e.target.value)}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Kilometraje Actual (km)</label>
              <input
                type="number"
                className={styles.input}
                value={activeCar.kmActual}
                onChange={(e) => handleCarValueChange('kmActual', Number(e.target.value))}
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Km Promedio Anual (km/año)</label>
              <input
                type="number"
                className={styles.input}
                value={activeCar.kmAnual}
                onChange={(e) => handleCarValueChange('kmAnual', Number(e.target.value))}
              />
            </div>

            <div className={styles.cardTitle} style={{ marginTop: '12px' }}>🔔 Canales de Alerta</div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Email para Alertas</label>
              <input
                type="email"
                className={styles.input}
                placeholder="correo@ejemplo.com"
                value={activeCar.email}
                onChange={(e) => handleCarValueChange('email', e.target.value)}
              />
              <div className={styles.checkboxGroup} onClick={() => handleCarValueChange('enableEmail', !activeCar.enableEmail)}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={activeCar.enableEmail}
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
                value={activeCar.whatsapp}
                onChange={(e) => handleCarValueChange('whatsapp', e.target.value)}
              />
              <div className={styles.checkboxGroup} onClick={() => handleCarValueChange('enableWhatsapp', !activeCar.enableWhatsapp)}>
                <input
                  type="checkbox"
                  className={styles.checkbox}
                  checked={activeCar.enableWhatsapp}
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

            <button onClick={handleDeleteCar} className={styles.btnDanger}>
              🗑️ Eliminar Vehículo
            </button>
          </div>

          {/* Columna Derecha: Dashboard y Fechas de Mantenimiento */}
          <div className={styles.statusDashboard}>
            {overdueOrNearItems.length > 0 && (
              <div className={styles.alertPanel}>
                <span className={styles.alertIcon}>⚠️</span>
                <div className={styles.alertText}>
                  <span className={styles.alertTitle}>Tienes mantenimientos críticos pendientes</span>
                  <span className={styles.alertDesc}>
                    Hay {overdueOrNearItems.length} componente{overdueOrNearItems.length > 1 ? 's' : ''} que requiere{overdueOrNearItems.length > 1 ? 'n' : ''} tu atención. Se enviará un recordatorio automático por WhatsApp/Email una vez cada 10 días.
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
                        value={(activeCar as any)[`${spec.key}Date`] || ''}
                        onChange={(e) => handleCarValueChange(`${spec.key}Date` as any, e.target.value)}
                      />
                    </div>

                    {spec.limitKm !== null && (
                      <div className={styles.formGroup}>
                        <label className={styles.label}>Kilometraje del Servicio (km)</label>
                        <input
                          type="number"
                          className={styles.input}
                          value={(activeCar as any)[`${spec.key}Km`] || ''}
                          onChange={(e) => handleCarValueChange(`${spec.key}Km` as any, Number(e.target.value))}
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
      ) : (
        <div className={styles.card} style={{ alignItems: 'center', padding: '40px' }}>
          <span>🚗</span>
          <h3 style={{ marginTop: '12px' }}>Aún no tienes ningún auto cargado.</h3>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '13px', marginTop: '4px' }}>Carga un vehículo para controlar su plan de mantenimiento.</p>
          <button className={styles.btnPrimary} style={{ marginTop: '16px' }} onClick={() => setShowAddCarModal(true)}>
            ➕ Cargar Mi Primer Auto
          </button>
        </div>
      )}

      {/* MODAL / DIALOG PARA AGREGAR AUTO */}
      {showAddCarModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowAddCarModal(false)}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>➕ Registrar Nuevo Auto</div>
              <form onSubmit={handleAddCarSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Nombre o Alias del Auto</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="ej. Gol Trend de Matias"
                    value={newCarAlias}
                    onChange={(e) => setNewCarAlias(e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Marca</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={newCarBrand}
                      onChange={(e) => setNewCarBrand(e.target.value)}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Modelo</label>
                    <input
                      type="text"
                      className={styles.input}
                      value={newCarModel}
                      onChange={(e) => setNewCarModel(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.formGrid}>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Año</label>
                    <input
                      type="number"
                      className={styles.input}
                      value={newCarYear}
                      onChange={(e) => setNewCarYear(Number(e.target.value))}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Kilometraje Actual</label>
                    <input
                      type="number"
                      className={styles.input}
                      value={newCarKm}
                      onChange={(e) => setNewCarKm(Number(e.target.value))}
                    />
                  </div>
                </div>

                <div className={styles.modalButtons}>
                  <button type="button" className={styles.btnSecondary} onClick={() => setShowAddCarModal(false)}>
                    Cancelar
                  </button>
                  <button type="submit" className={styles.btnPrimary}>
                    Guardar Vehículo
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
