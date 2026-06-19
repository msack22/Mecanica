import type { SystemCategory } from '../types'

export const mecanicaData: SystemCategory[] = [
  {
    key: 'mec',
    label: 'Mecánico',
    icon: '🔧',
    hint: 'Ciclo de 4 tiempos, válvulas, levas, cigüeñal y distribución',
    color: '#0F6E56',
    topics: [
      {
        key: 'ciclo_4_tiempos',
        title: 'Ciclo de 4 Tiempos',
        subtitle: 'El ciclo termodinámico de combustión',
        widget: 'ciclo_4_tiempos',
        imageUrl: '/images/cilindros_bloque.png',
        body: 'El ciclo de 4 tiempos (Admisión, Compresión, Explosión, Escape) es el principio fundamental de funcionamiento de la gran mayoría de los motores de combustión interna. En cada ciclo, el pistón realiza cuatro recorridos (dos de subida y dos de bajada) y el cigüeñal da dos vueltas completas.',
        tip: 'El inyector solo pulveriza combustible en el paso 1 (Admisión), y la chispa de la bujía solo salta al final del paso 2 para iniciar el paso 3 (Explosión).',
        warning: 'Las válvulas abren y cierran en momentos críticos: admisión abierta en paso 1, escape abierta en paso 4. Si la sincronía falla, el pistón puede chocar con las válvulas.',
        recorridos: [
          {
            title: 'Los 4 Tiempos en Detalle',
            items: [
              { c: 'verde', t: '1. ADMISIÓN: La válvula de admisión abre, el pistón baja y succiona la mezcla de aire y nafta al cilindro.' },
              { c: 'azul', t: '2. COMPRESIÓN: Ambas válvulas se cierran, el pistón sube y comprime la mezcla elevando su temperatura.' },
              { c: 'rojo', t: '3. EXPLOSIÓN: La bujía genera una chispa, la mezcla explota y empuja el pistón violentamente hacia abajo.' },
              { c: 'gris', t: '4. ESCAPE: La válvula de escape abre, el pistón sube y expulsa los gases quemados hacia el escape.' }
            ]
          }
        ]
      },
      {
        key: 'conexiones_internas',
        title: 'Conexiones Internas',
        subtitle: 'Cómo se transmite el movimiento del pistón',
        widget: 'conexiones_internas',
        imageUrl: '/images/biela_piston_desmontados.png',
        body: 'Para convertir la fuerza lineal de la explosión en fuerza rotativa, el pistón se conecta al cigüeñal a través de la biela. Esta unión requiere pasadores de acero y cojinetes lubricados para soportar las altas presiones y revoluciones sin fundirse.',
        tip: 'El bulón conecta el pistón con el extremo superior de la biela, mientras que la muñequilla conecta el extremo inferior de la biela al cigüeñal.',
        warning: 'La falta de lubricación en la muñequilla del cigüeñal provoca el desgaste del cojinete, produciendo el famoso "golpe de biela" y la eventual rotura del motor.',
        recorridos: [
          {
            title: 'Uniones del Bloque',
            items: [
              { c: 'rojo', t: 'El bulón: Pasador de acero endurecido que atraviesa el pistón y permite que la biela pivotee.' },
              { c: 'verde', t: 'La muñequilla: El "codo" descentrado del cigüeñal que recibe el abrazo de la biela.' },
              { c: 'naranja', t: 'Las válvulas: Controladas por la leva para abrir y por un resorte de alta tensión para cerrar herméticamente.' }
            ]
          }
        ]
      },
      {
        key: 'motor_niveles',
        title: 'Motor por Niveles',
        subtitle: 'La estructura de arriba a abajo del motor',
        widget: 'motor_niveles',
        body: 'Mirando el motor de frente, se divide en cuatro grandes capas o niveles. Cada nivel tiene componentes específicos a los que se accede de forma secuencial al desarmar.',
        tip: 'Para desmontar el motor se va de arriba a abajo (Nivel 4 → Nivel 1). Para armarlo, se sigue el orden inverso.',
        imageUrl: '/images/motor_completo.png',
        recorridos: [
          {
            title: 'Capas del Motor',
            items: [
              { c: 'naranja', t: 'Nivel 4 (Tapa de válvulas): Cubre el árbol de levas y contiene el tapón de carga de aceite.' },
              { c: 'verde', t: 'Nivel 3 (Culata/Tapa de cilindros): Aloja las válvulas, inyectores y la cámara de combustión.' },
              { c: 'violeta', t: 'Nivel 2 (Bloque del motor): La pieza central que contiene los cilindros, pistones, bielas y cigüeñal.' },
              { c: 'naranja', t: 'Nivel 1 (Cárter): Depósito inferior donde se acumula y enfría el aceite del motor.' }
            ]
          }
        ]
      },
      {
        key: 'ciguenal_arbol_levas',
        title: 'Cigüeñal y Árbol de Levas',
        subtitle: 'El sistema de sincronización mecánica',
        widget: 'ciguenal_arbol_levas',
        imageUrl: '/images/arbol_levas_culata.png',
        body: 'El cigüeñal está abajo en el bloque y gira impulsado por los pistones. El árbol de levas está arriba en la culata y gira para empujar las válvulas. Ambos deben estar perfectamente sincronizados a través de la correa de distribución.',
        tip: 'La regla clave de la mecánica de 4 tiempos: el árbol de levas gira a la MITAD de la velocidad del cigüeñal (Relación 2:1).',
        warning: 'En motores 8v hay un solo árbol de levas. En motores 16v hay dos árboles (uno para válvulas de admisión y otro para escape).',
        recorridos: [
          {
            title: 'Ejes en Movimiento',
            items: [
              { c: 'azul', t: 'Cigüeñal: Convierte la fuerza de las bielas en rotación y la transmite al volante motor.' },
              { c: 'naranja', t: 'Árbol de levas: Posee levas (lóbulos) que empujan las válvulas mecánicamente.' },
              { c: 'violeta', t: 'Sincronización: 2 vueltas del cigüeñal equivalen exactamente a 1 vuelta del árbol de levas.' }
            ]
          }
        ]
      },
      {
        key: 'sincronizacion_correa',
        title: 'Sincronización y Marcas',
        subtitle: 'Alineación de la puesta a punto del motor',
        widget: 'sincronizacion_correa',
        body: 'Cuando se realiza el cambio de la correa de distribución, es vital alinear las marcas de sincronización del engranaje del cigüeñal y del árbol de levas con las referencias del bloque y la tapa de cilindros. Esto garantiza que las válvulas abran cuando el pistón está en el lugar correcto.',
        tip: 'PMR (Punto Muerto Superior): Es la posición donde el pistón 1 se encuentra en lo más alto de su recorrido.',
        warning: 'Si la correa se coloca desalineada por un diente, el motor fallará. Si se desalinea por varios, las válvulas chocarán con los pistones al dar marcha.',
        imageUrl: '/images/correa_distribucion.png',
        recorridos: [
          {
            title: 'Marcas de Puesta a Punto',
            items: [
              { c: 'rojo', t: 'Marca de Cigüeñal: Alinea el piñón inferior con la marca fija del bloque (PMS Cilindro 1).' },
              { c: 'naranja', t: 'Marca de Levas: Alinea el engranaje superior con la marca en la tapa trasera de la correa.' },
              { c: 'verde', t: 'Paso de Seguridad: Siempre girar el motor 2 vueltas a mano antes de darle arranque eléctrico.' }
            ]
          }
        ]
      },
      {
        key: 'bloqueo_poleas',
        title: 'Bloqueo de Poleas',
        subtitle: 'Mantener las poleas fijas durante el cambio',
        widget: 'bloqueo_poleas',
        imageUrl: '/images/bloqueo_engranaje.png',
        body: 'Al retirar la correa de distribución vieja, las poleas quedan libres. Los resortes de las válvulas que están comprimidos ejercen fuerza sobre las levas y pueden hacer girar el árbol de levas inesperadamente, perdiendo la sincronía.',
        tip: 'Se puede improvisar pintando una línea continua con corrector blanco sobre el engranaje y la tapa trasera antes de remover la correa vieja.',
        warning: 'Nunca uses pinzas de fuerza directamente sobre los dientes de los engranajes, ya que los filos dañarán la correa nueva en pocos kilómetros.',
        recorridos: [
          {
            title: 'Procedimiento Seguro',
            items: [
              { c: 'violeta', t: 'Herramienta de bloqueo: Pasador que entra en la polea y bloquea el giro contra la culata.' },
              { c: 'naranja', t: 'Línea de corrector: Si el árbol se mueve, la marca blanca quedará cortada en dos.' },
              { c: 'verde', t: 'Ajuste del tensor: Ajustar la correa nueva de modo que pueda girarse 90° con los dedos.' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'lub',
    label: 'Lubricación',
    icon: '🛢',
    hint: 'Circuito de aceite, aros de pistón, cárter y filtración',
    color: '#854F0B',
    topics: [
      {
        key: 'aros_piston_detalle',
        title: 'Detalle de Aros de Pistón',
        subtitle: 'Los 3 aros metálicos del pistón',
        widget: 'aros_piston_detalle',
        body: 'Cada pistón tiene tres ranuras donde se alojan tres aros (anillos) partidos de metal elástico. Estos aros ejercen presión hacia afuera contra la pared del cilindro para sellar y controlar la lubricación.',
        tip: 'Los aros nunca rozan contra el metal seco del cilindro; deslizan sobre una película microscópica de aceite de 2-5 micrones.',
        warning: 'El desgaste de los aros permite que los gases de combustión escapen hacia el cárter, reduciendo la compresión y la potencia del motor.',
        imageUrl: '/images/aros_piston.png',
        recorridos: [
          {
            title: 'Los Tres Aros',
            items: [
              { c: 'violeta', t: 'Aro 1 (Compresión superior): Sella la fuerza de la explosión a 800°C en la cámara.' },
              { c: 'azul', t: 'Aro 2 (Compresión inferior): Doble barrera contra gases y ayuda a dosificar el aceite.' },
              { c: 'naranja', t: 'Aro 3 (Rascador de aceite): Limpia el exceso de aceite de la pared y lo devuelve al cárter.' }
            ]
          }
        ]
      },
      {
        key: 'aros_piston_separacion',
        title: 'Separación de Aceite',
        subtitle: 'Motor sano vs aros gastados',
        widget: 'aros_piston_separacion',
        body: 'El motor está dividido en dos zonas: la zona de combustión (arriba, donde explota la nafta y debe estar libre de aceite) y la zona de lubricación (abajo en el cárter). Los aros actúan como la barrera hermética entre ambas.',
        tip: 'Si el aro rascador de aceite (Aro 3) se gasta, no limpiará bien la pared. El aceite subirá a la cámara y se quemará.',
        warning: 'El aceite quemado en la combustión produce humo azulado por el escape, consume el nivel de aceite rápidamente y ensucia la bujía provocando fallas de encendido.',
        imageUrl: '/images/piston_sucio.png',
        recorridos: [
          {
            title: 'Síntomas de Aros Dañados',
            items: [
              { c: 'azul', t: 'Humo azul o gris por el escape, sobre todo al acelerar.' },
              { c: 'rojo', t: 'Consumo acelerado de aceite (baja el nivel en la varilla semana a semana).' },
              { c: 'naranja', t: 'Pérdida de compresión y potencia del motor (el auto se siente achanchado).' }
            ]
          }
        ]
      },
      {
        key: 'circuito_lubricacion',
        title: 'Circuito de Lubricación',
        subtitle: 'El flujo del aceite protector en el motor',
        widget: 'circuito_lubricacion',
        imageUrl: '/images/carter_bomba_aceite.png',
        body: 'El aceite motor se acumula en el cárter inferior. Al dar marcha, la bomba de aceite (conectada directamente al cigüeñal) succiona el lubricante a través del chupador y lo fuerza a pasar por el filtro de aceite. Desde allí, fluye a alta presión por las galerías del bloque hacia los cojinetes de cigüeñal y bielas, y sube por un conducto ascendente a la culata para bañar el árbol de levas antes de retornar por gravedad al cárter.',
        tip: 'La bomba de aceite está montada físicamente en el extremo delantero del cigüeñal. Para llegar a ella, es obligatorio desmontar la correa de distribución, retirar el engranaje inferior del cigüeñal, remover el chapón protector y quitar por completo el cárter de aluminio.',
        warning: 'Si la luz de presión de aceite (aceitera roja) se enciende en el tablero, apagá el motor DE INMEDIATO. Circular sin presión de aceite fundirá los cojinetes y el árbol de levas en menos de un minuto.',
        recorridos: [
          {
            title: 'Recorrido del Aceite',
            items: [
              { c: 'naranja', t: '1. Succión: El colador (chupador) filtra partículas grandes en el fondo del cárter.' },
              { c: 'azul', t: '2. Filtración: El filtro retiene micropartículas metálicas y de carbón antes del motor.' },
              { c: 'rojo', t: '3. Galería Principal: El canal central distribuye aceite a presión a los cojinetes móviles.' },
              { c: 'violeta', t: '4. Culata superior: El flujo baña las levas a 90°C y retorna por canales de drenaje.' }
            ]
          }
        ]
      },
      {
        key: 'retenes_juntas',
        title: 'Retenes & Juntas',
        subtitle: 'Sellar pérdidas de aceite y fluidos del motor',
        widget: 'retenes_juntas',
        imageUrl: '/images/retenes_juntas_real.png',
        body: 'El motor y la caja de velocidades contienen múltiples piezas de caucho y silicona que evitan las fugas de lubricantes. Los retenes sellan los ejes giratorios (cigüeñal, levas, semiejes) mientras que las juntas sellan superficies estáticas unidas por tornillos (tapa de válvulas, culata, cárter).',
        tip: 'La junta de la tapa de válvulas es muy accesible y propensa a perder aceite que gotea sobre el escape caliente, generando olor a quemado.',
        warning: 'Una junta de culata quemada es la falla más costosa: mezcla el aceite con el refrigerante (creando una pasta tipo mayonesa) y recalienta el motor.',
        recorridos: [
          {
            title: 'Puntos Críticos de Fuga',
            items: [
              { c: 'rojo', t: 'Retén de cigüeñal trasero: Exige separar la caja del motor. Se suele cambiar junto al embrague.' },
              { c: 'naranja', t: 'Junta de cárter: Ubicada abajo del motor, causa el goteo constante en el piso de la cochera.' },
              { c: 'azul', t: 'Retenes de semiejes: Sellan el aceite de la transmisión donde encastran los palieres en la caja.' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'ref',
    label: 'Refrigeración',
    icon: '💧',
    hint: 'Circuito de agua, radiador, bomba de agua y termostato',
    color: '#185FA5',
    topics: [
      {
        key: 'circuito_refrigeracion',
        title: 'Circuito de Refrigeración',
        subtitle: 'El control térmico del motor',
        widget: 'circuito_refrigeracion',
        body: 'El líquido refrigerante (agua destilada con anticongelante/anticorrosivo) absorbe el calor excesivo del motor circulando por canales internos y se enfría al pasar por el radiador frontal asistido por el electroventilador.',
        tip: 'La bomba de agua está ubicada en el bloque motor detrás de las tapas plásticas de distribución. Para cambiarla se debe drenar el refrigerante por la manguera inferior, remover el chapón, quitar la rueda derecha, desmontar la correa de accesorios, poner a punto y retirar la correa de distribución.',
        warning: 'Nunca uses agua común de la canilla. Los minerales oxidan las camisas de agua del bloque de cilindros y rompen la bomba de agua.',
        imageUrl: '/images/circuito_agua_vano.png',
        recorridos: [
          {
            title: 'Piezas del Circuito',
            items: [
              { c: 'rojo', t: 'Radiador: Intercambiador frontal de calor que enfría el refrigerante con el aire de marcha.' },
              { c: 'naranja', t: 'Termostato: Válvula térmica oculta en la culata que abre a ~88°C.' },
              { c: 'azul', t: 'Bomba de agua: Mueve el refrigerante. Está movida por la correa de distribución.' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'comb',
    label: 'Combustible',
    icon: '⛽',
    hint: 'Inyección, inyectores, alimentación de nafta y ECU',
    color: '#BA7517',
    topics: [
      {
        key: 'mono_vs_multipunto',
        title: 'Mono vs Multipunto',
        subtitle: 'La evolución de la inyección de combustible',
        widget: 'mono_vs_multipunto',
        imageUrl: '/images/flauta_inyectores.png',
        body: 'Los motores antiguos usaban carburador o un único inyector central (monopunto) en la entrada del colector de admisión. Los modernos (como el Gol Trend) utilizan inyección multipunto, con un inyector dedicado por cada cilindro.',
        tip: 'La inyección multipunto es mucho más eficiente porque la computadora (ECU) inyecta la cantidad exacta para cada cilindro de forma individual.',
        recorridos: [
          {
            title: 'Sistemas de Inyección',
            items: [
              { c: 'gris', t: 'Monopunto: Un solo inyector dosifica la mezcla para los 4 cilindros compartidos.' },
              { c: 'verde', t: 'Multipunto: 4 inyectores controlados electrónicamente colocados al final del colector.' }
            ]
          }
        ]
      },
      {
        key: 'circuito_combustible',
        title: 'Circuito de Combustible',
        subtitle: 'Cómo viaja la nafta desde el tanque hasta los inyectores',
        widget: 'circuito_combustible',
        imageUrl: '/images/circuito_combustible_real.png',
        body: 'El circuito de combustible se encarga de almacenar, filtrar y presurizar la nafta para suministrarla a los inyectores en cantidad y presión correctas. Comienza en el tanque y termina en la flauta de inyectores, con un retorno para el combustible sobrante.',
        tip: 'Si sentís olor a nafta cruda en el habitáculo, revisá inmediatamente el acople de la manguera de retorno de combustible, que suele resecarse.',
        warning: 'El circuito trabaja presurizado a ~3 bar. Antes de desconectar cualquier manguera, liberá la presión quitando el fusible de la bomba y dándole arranque al motor hasta que se apague.',
        recorridos: [
          {
            title: 'Recorrido del Combustible',
            items: [
              { c: 'verde', t: 'Tanque y Bomba: La bomba eléctrica sumergida envía nafta a presión.' },
              { c: 'azul', t: 'Filtro de Nafta: Retiene impurezas antes de que lleguen al motor (se cambia cada 15.000 km).' },
              { c: 'naranja', t: 'Rampa (Flauta) de Inyectores: Distribuye el combustible presurizado a cada inyector.' },
              { c: 'rojo', t: 'Inyectores y Retorno: Inyectan nafta al cilindro; el regulador de presión devuelve el excedente al tanque.' }
            ]
          }
        ]
      },
      {
        key: 'potencia_opciones',
        title: 'Opciones de Potencia',
        subtitle: 'Formas de mejorar el rendimiento del motor',
        widget: 'potencia_opciones',
        imageUrl: '/images/filtro_deportivo.png',
        body: 'El motor 1.6 MSI del Gol Trend entrega 110 hp de fábrica. Hay modificaciones de menor a mayor complejidad para mejorar su potencia y torque, optimizando la entrada de aire, salida de gases y la cartografía de la ECU.',
        tip: 'La reprogramación (remap) es la mejor relación costo/potencia sin comprometer componentes internos.',
        warning: 'Instalar un kit de turbo sin forjar bielas y pistones es extremadamente arriesgado y reduce drásticamente la vida útil del motor.',
        recorridos: [
          {
            title: 'Formas de Potenciar',
            items: [
              { c: 'verde', t: 'Reprogramación ECU (remap): Modifica parámetros de inyección para ganar ~15 hp.' },
              { c: 'naranja', t: 'Escape deportivo + admisión: Facilita la respiración del motor para ganar ~10 hp.' },
              { c: 'rojo', t: 'Kit turbo: Fuerza aire comprimido. Requiere refuerzos internos y alto presupuesto.' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'ele',
    label: 'Eléctrico',
    icon: '⚡',
    hint: 'Batería, alternador, bobina, fusibles y sensores',
    color: '#534AB7',
    topics: [
      {
        key: 'cableado_electrico',
        title: 'Cableado Eléctrico',
        subtitle: 'Los circuitos de potencia y señal del auto',
        widget: 'cableado_electrico',
        imageUrl: '/images/fusiblera_electrica.png',
        body: 'El sistema eléctrico se divide en tres circuitos principales: arranque, carga y encendido/chispa. Los cables tienen colores estándar para facilitar el diagnóstico, y las fichas de los sensores tienen guías únicas.',
        tip: 'El cable ROJO siempre transporta 12V de alimentación. El cable NEGRO o MARRÓN se conecta a la carrocería (masa/tierra).',
        warning: 'Antes de cambiar un repuesto eléctrico caro, revisá siempre el fusible correspondiente en la fusiblera. ¡Se cambia gratis en segundos!',
        recorridos: [
          {
            title: 'Circuitos del Gol',
            items: [
              { c: 'verde', t: 'Circuito de encendido: Batería → ECU → Bobina (12V a 25.000V) → Bujías para la chispa.' },
              { c: 'azul', t: 'Circuito de carga: Motor gira → Alternador genera electricidad → Carga batería.' },
            ]
          }
        ]
      },
      {
        key: 'obd2_scanner',
        title: 'Scanner OBD2 ELM327',
        subtitle: 'Cómo diagnosticar fallas con el puerto OBD2',
        widget: 'obd2_scanner',
        imageUrl: '/images/obd2_scanner_real.png',
        body: 'El puerto OBD2 (On-Board Diagnostics) permite conectar un scanner Bluetooth ELM327 para leer los códigos de error almacenados en la ECU. Es la forma más rápida y precisa de diagnosticar fallas en sensores, emisiones y encendido sin desarmar nada del motor.',
        tip: 'La app Torque Lite es gratis y suficiente para leer y borrar códigos de falla. Siempre anotá el código antes de borrarlo para no perder el historial.',
        warning: 'Borrar los códigos apaga el Check Engine pero NO repara la falla. Si el sensor sigue roto, el error volverá a aparecer en pocos kilómetros.',
        recorridos: [
          {
            title: 'Procedimiento de Conexión',
            items: [
              { c: 'verde', t: '1. Enchufar el ELM327 en el puerto OBD2 de 16 pines debajo del volante (lado izquierdo).' },
              { c: 'azul', t: '2. Poner el auto en contacto (llave en ACC) pero sin darle arranque.' },
              { c: 'naranja', t: '3. Activar Bluetooth, emparejar con el scanner (código 1234 o 0000) y abrir la app Torque.' },
              { c: 'rojo', t: '4. Leer los códigos y buscar el significado de los errores (ej: P0300 = Falla de encendido).' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'trans',
    label: 'Transmisión',
    icon: '⚙️',
    hint: 'Embrague, caja de cambios, diferencial y tracción',
    color: '#3B6D11',
    topics: [
      {
        key: 'transmision_embrague',
        title: 'Transmisión & Embrague',
        subtitle: 'Cómo viaja la fuerza del motor a las ruedas',
        widget: 'cambio_disco_embrague',
        body: 'El embrague es el mecanismo que conecta y desconecta la rotación del motor de la caja de cambios. Al soltar el pedal, el disco de embrague queda aprisionado contra el volante del motor transmitiendo el giro.',
        tip: 'El pedal de embrague no hace el cambio de marcha; solo separa el motor para que los engranajes de la caja giren libres.',
        warning: 'Apoyar el pie levemente sobre el pedal de embrague mientras manejás provoca patinamiento microscópico y gasta el disco en pocos meses.',
        imageUrl: '/images/disco_embrague.png',
        recorridos: [
          {
            title: 'Componentes de Fricción',
            items: [
              { c: 'azul', t: 'Volante motor: Disco pesado de acero unido al cigüeñal que gira constantemente.' },
              { c: 'violeta', t: 'Disco de embrague: Placa con material de fricción que acopla contra el volante.' },
              { c: 'naranja', t: 'Plato de presión: Prensa de resorte que empuja el disco contra el volante.' }
            ]
          }
        ]
      },
      {
        key: 'caja_cambios',
        title: 'Caja de Cambios y Diferencial',
        subtitle: 'Cómo funciona la relación de marchas y la tracción',
        widget: 'caja_cambios',
        imageUrl: '/images/caja_cambios_real.png',
        body: 'La caja de cambios MQ200 del Gol Trend permite adaptar las revoluciones del motor a la velocidad del vehículo mediante diferentes relaciones de engranajes. El diferencial divide la fuerza entre ambas ruedas delanteras, permitiendo que giren a distinta velocidad en las curvas.',
        tip: 'El aceite de caja (Valvulina 75W90 sintético) no se consume, pero se degrada. Conviene revisarlo o cambiarlo cada 100.000 km.',
        warning: 'Si al poner reversa hace ruido a raspado ("canta"), asegurate de detener el auto a cero y pisar el embrague a fondo durante 3 segundos antes de acoplar.',
        recorridos: [
          {
            title: 'Componentes de la Transmisión',
            items: [
              { c: 'verde', t: 'Eje Primario: Recibe el giro directo del motor a través del embrague.' },
              { c: 'azul', t: 'Eje Secundario: Contiene los engranajes locos y sincronizadores de cada marcha.' },
              { c: 'naranja', t: 'Diferencial: Corona y satélites que transmiten la fuerza a los semiejes.' },
              { c: 'rojo', t: 'Tapón de Vaciado: Ubicado en la parte inferior, requiere llave Allen de 17mm para el drenaje de aceite.' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'esc',
    label: 'Escape',
    icon: '💨',
    hint: 'Colector de escape, catalizador, sonda lambda y humos',
    color: '#5F5E5A',
    topics: [
      {
        key: 'sistema_escape',
        title: 'Sistema de Escape',
        subtitle: 'La salida y filtración de gases quemados',
        widget: 'sistema_escape',
        imageUrl: '/images/caño_escape_inferior.png',
        body: 'El escape canaliza los gases desde la culata del motor hasta la parte trasera del coche. A lo largo de la tubería, los gases bajan de 800°C a ~80°C y se reduce la contaminación mediante el catalizador.',
        tip: 'La sonda lambda mide la concentración de oxígeno en el escape y le avisa a la ECU para ajustar la mezcla de combustible en tiempo real.',
        warning: 'Un catalizador roto por golpes contra el suelo produce un tintineo metálico interno ("maraqueo") y restringe el flujo de escape ahogando al motor.',
        recorridos: [
          {
            title: 'Componentes del Caño',
            items: [
              { c: 'rojo', t: 'Colector (Manifold): Junta los gases de los 4 cilindros en un solo tubo a 800°C.' },
              { c: 'naranja', t: 'Catalizador: Filtro cerámico con metales preciosos que neutraliza gases tóxicos.' },
              { c: 'verde', t: 'Silenciadores (Intermedio y final): Reducen las ondas sonoras mediante deflectores.' }
            ]
          }
        ]
      },
      {
        key: 'colores_humo',
        title: 'Colores de Humo',
        subtitle: 'Diagnóstico de motor por escape',
        widget: 'colores_humo',
        imageUrl: '/images/escape_humo_azul.png',
        body: 'El color del humo que sale del caño de escape es un excelente indicador del estado interno del motor y de qué fluido se está quemando en los cilindros.',
        tip: 'Un leve humo o vapor blanco al arrancar en frío que desaparece en dos minutos es normal: es condensación de agua en el caño de escape.',
        warning: 'Humo azul constante indica que el motor está consumiendo aceite. Requiere desarme de culata o rectificación del bloque de cilindros.',
        recorridos: [
          {
            title: 'Diagnóstico por Colores',
            items: [
              { c: 'azul', t: 'Humo Azul/Grisáceo: Aceite quemándose. Indica desgaste de aros o retenes de válvulas.' },
              { c: 'gris', t: 'Humo Blanco constante: Líquido refrigerante en los cilindros (junta de culata rota).' },
              { c: 'rojo', t: 'Humo Negro: Mezcla rica. Hay exceso de nafta (inyector sucio o filtro de aire tapado).' }
            ]
          }
        ]
      }
    ]
  },
  {
    key: 'abajo',
    label: 'Chasis y Suspensión',
    icon: '🔩',
    hint: 'Tren delantero, amortiguadores, dirección y vista desde abajo',
    color: '#888780',
    topics: [
      {
        key: 'tren_delantero',
        title: 'Tren Delantero Completo',
        subtitle: 'El conjunto de piezas que sostienen la rueda',
        widget: 'tren_delantero',
        body: 'El tren delantero es el conjunto de componentes articulados de goma y metal que conectan el chasis con las ruedas delanteras, permitiendo la amortiguación y el control de dirección del vehículo.',
        tip: 'Las bieletas estabilizadoras y las rótulas son los componentes mecánicos que más desgaste sufren y los más comunes de cambiar en el Gol.',
        warning: 'Una rótula muy desgastada (con juego excesivo) puede llegar a salirse de su alojamiento en marcha, provocando que la rueda se desprenda físicamente. Es de seguridad crítica.',
        imageUrl: '/images/tren_delantero.png',
        recorridos: [
          {
            title: 'Componentes del Tren',
            items: [
              { c: 'azul', t: 'Amortiguador y Resorte: Absorben los pozos y mantienen el neumático pegado al piso.' },
              { c: 'naranja', t: 'Rótula: Articulación esférica que permite a la rueda subir/bajar y doblar a la vez.' },
              { c: 'verde', t: 'Silent block (Buje): Cilindro de goma que aísla las vibraciones del brazo de suspensión.' },
              { c: 'naranja', t: 'Bieleta: Barra de conexión que une la suspensión a la barra estabilizadora.' }
            ]
          }
        ]
      },
      {
        key: 'diagnostico_ruidos',
        title: 'Diagnóstico por Ruidos',
        subtitle: 'Guía práctica para identificar fallas por sonido',
        widget: 'diagnostico_ruidos',
        body: 'Los ruidos extraños en la suspensión o frenos suelen tener causas sumamente específicas. Identificar el momento exacto en el que ocurren permite localizar la pieza defectuosa sin desarmar.',
        tip: 'Zumbido constante que sube con la velocidad (como si tuvieras un avión adentro del auto) indica rulemán o rodamiento de rueda gastado.',
        recorridos: [
          {
            title: 'Sonidos Comunes',
            items: [
              { c: 'rojo', t: 'Golpe seco (clonc) en lomos de burro: Buje de brazo o rótula rota.' },
              { c: 'naranja', t: 'Toc-toc metálico constante en calles empedradas: Bieletas de barra estabilizadora.' },
              { c: 'rojo', t: 'Crujido (crack-crack) al doblar el volante en bajas velocidades: Junta homocinética exterior seca.' },
              { c: 'azul', t: 'Chillido de metal al frenar: Pastillas de freno gastadas (tocando el testigo metálico).' }
            ]
          }
        ]
      },
      {
        key: 'lift_camino_tierra',
        title: 'Lift para Camino de Tierra',
        subtitle: 'Cómo levantar el auto para terrenos difíciles',
        widget: 'lift_camino_tierra',
        imageUrl: '/images/espiral_elevado.png',
        body: 'El Gol de fábrica es bajo y suele tocar el cárter en huellas profundas de tierra. Para transitar caminos rurales, se puede elevar la suspensión modificando amortiguadores y espirales.',
        tip: 'La Opción B (+5cm) es el punto óptimo entre altura de despeje y estabilidad en ruta sin deformar los semiejes.',
        warning: 'Al realizar cualquier lift de suspensión, es OBLIGATORIO alinear las ruedas inmediatamente para evitar un desgaste acelerado de las cubiertas y pérdida de control.',
        recorridos: [
          {
            title: 'Alturas de Elevación',
            items: [
              { c: 'verde', t: 'Opción A (+3cm): Espirales reforzados de GNC/trabajo. Mantiene amortiguadores stock.' },
              { c: 'naranja', t: 'Opción B (+5cm): Espirales elevados y amortiguadores de mayor recorrido. Opción ideal.' },
              { c: 'rojo', t: 'Opción C (+8cm): Espaciadores en cazoletas y suplementos. Altera la geometría del semieje.' }
            ]
          }
        ]
      },
      {
        key: 'vista_desde_abajo',
        title: 'Vista desde Abajo',
        subtitle: 'Esquema completo del chasis inferior',
        widget: 'vista_desde_abajo',
        imageUrl: '/images/chasis_coche_elevador.png',
        body: 'Ver el auto levantado en una fosa o elevador revela la disposición completa de los componentes mecánicos, el recorrido del escape y la ubicación de las suspensiones.',
        tip: 'Desde abajo, lo primero que se ve debajo del motor es el protector de cárter (chapón) que protege el cárter de aceite.',
        recorridos: [
          {
            title: 'Componentes Inferiores',
            items: [
              { c: 'naranja', t: 'Frente: Motor, caja de velocidades, dirección hidráulica y palieres (semiejes).' },
              { c: 'gris', t: 'Medio: Caño de escape, escudo térmico y freno de mano (cables).' },
              { c: 'azul', t: 'Atrás: Tanque de combustible, eje rígido trasero y amortiguadores.' }
            ]
          }
        ]
      },
      {
        key: 'bujes_cojinetes',
        title: 'Bujes & Cojinetes',
        subtitle: 'Rodamientos y silent blocks del chasis',
        widget: 'bujes_cojinetes',
        imageUrl: '/images/bujes_cojinetes_real.png',
        body: 'El chasis utiliza dos tipos de piezas de unión: los rodamientos/cojinetes (que tienen bolas de acero para permitir que las ruedas o ejes giren rápido) y los bujes/silent blocks (que son casquillos de goma vulcanizada para absorber las vibraciones sin necesidad de lubricación).',
        tip: 'Los silent blocks del brazo de suspensión (parrilla) son los que más fallan en el Gol Trend. Su desgaste produce golpes sordos en badenes.',
        warning: 'Un rodamiento de rueda (rulemán) desgastado genera un zumbido progresivo como un avión. Si se engrana o traba en velocidad, puede clavar la rueda.',
        recorridos: [
          {
            title: 'Diferencias de Componentes',
            items: [
              { c: 'azul', t: 'Rodamiento de rueda: Rodillos de acero lubricados que permiten el giro de la maza de rueda.' },
              { c: 'verde', t: 'Silent block: Aislamiento elástico de goma que une las parrillas de suspensión al chasis.' },
              { c: 'naranja', t: 'Soportes de motor: Bujes de goma reforzada que absorben las vibraciones del bloque motor.' }
            ]
          }
        ]
      },
      {
        key: 'sistema_frenos',
        title: 'Sistema de Frenos',
        subtitle: 'Funcionamiento del circuito hidráulico de frenado',
        widget: 'sistema_frenos',
        imageUrl: '/images/sistema_frenos_real.png',
        body: 'El sistema de frenos hidráulico multiplica la fuerza aplicada al pedal usando la bomba maestra y el vacío del motor (servofreno). La presión del líquido de frenos empuja los pistones en las pinzas delanteras para apretar las pastillas contra el disco, y expande las zapatas dentro de los tambores traseros.',
        tip: 'El líquido de frenos absorbe humedad del aire. Se debe cambiar por completo cada 2 años para evitar que hierva ante frenadas intensas.',
        warning: 'Si al frenar fuerte el pedal vibra notablemente, es el módulo ABS actuando para evitar que las ruedas se bloqueen. Nunca dejes de pisar el pedal.',
        recorridos: [
          {
            title: 'Componentes Hidráulicos',
            items: [
              { c: 'rojo', t: 'Servofreno (Servo): Multiplica por 4 la fuerza del pie aprovechando la succión de admisión.' },
              { c: 'azul', t: 'Bomba maestra: Cilindro con pistones hidráulicos que presuriza todo el circuito de tuberías.' },
              { c: 'verde', t: 'Módulo ABS: Regula y libera intermitentemente la presión en la rueda que tiende a bloquearse.' }
            ]
          }
        ]
      },
      {
        key: 'ubicacion_frenos',
        title: 'Ubicación de Frenos',
        subtitle: 'Dónde encontrar cada pieza en el auto',
        widget: 'ubicacion_frenos',
        imageUrl: '/images/ubicacion_frenos_real.png',
        body: 'Saber ubicar las piezas de freno es clave para el mantenimiento básico. El servofreno y la bomba maestra se encuentran en el vano motor del lado del conductor, pegados al firewall. Los discos y pinzas están en las ruedas delanteras, y los tambores en el eje rígido trasero.',
        tip: 'El depósito de líquido de frenos es de plástico semitransparente. Podés verificar el nivel MIN/MAX a simple vista sin destaparlo.',
        warning: 'Los sensores ABS de rueda miden la velocidad de giro. Están expuestos al barro y agua en la mangueta; limpiarlos suele apagar la luz de falla en el tablero.',
        recorridos: [
          {
            title: 'Guía de Inspección Rápida',
            items: [
              { c: 'verde', t: 'Vano motor (izq): Depósito de líquido, bomba maestra y servo negro redondo grande.' },
              { c: 'naranja', t: 'Ruedas delanteras: Pinzas rojas/grises y pastillas de freno (cambiar si miden menos de 3mm).' },
              { c: 'gris', t: 'Ruedas traseras: Campanas o tambores (campana de fundición visible detrás de la llanta).' }
            ]
          }
        ]
      }
    ]
  }
]

