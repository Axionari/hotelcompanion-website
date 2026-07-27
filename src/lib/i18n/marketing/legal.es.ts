import type { LegalDoc } from '@/components/cds/LegalLayout'

/* Professional Spanish for the six legal/trust documents.
   Copy source: HotelCompanion__Site_Copy_ES.md {#privacy} {#terms} {#cookies}
   {#security} {#responsible-ai} {#trust-center}. Verbatim.
   NOTE: this ES legal text is a professional translation and MUST be reviewed by
   counsel before public launch. The ES copy source carries the same caveat
   ("Traducción legal — que asesoría jurídica la revise antes del lanzamiento público").
   Block sequence mirrors legal.ts (EN) one-for-one. */

export const LAST_UPDATED_ES = 'Última actualización: julio 2026'

export const privacyEs: LegalDoc = {
  eyebrow: 'LEGAL · PRIVACIDAD',
  title: 'Aviso de Privacidad',
  lastUpdated: LAST_UPDATED_ES,
  intro: [
    'Tus huéspedes te confían su experiencia.',
    'Tú deberías poder confiarnos tus datos.',
    'En Hotel Companion, la privacidad, la seguridad y la IA responsable son principios fundamentales—no funciones añadidas después. Este Aviso de Privacidad explica qué información recopilamos, cómo la usamos y cómo la protegemos.',
    'Al usar Hotel Companion, aceptas las prácticas descritas a continuación.',
  ],
  blocks: [
    { type: 'h2', text: 'Información que Recopilamos' },
    {
      type: 'p',
      text: 'Según cómo se implemente Hotel Companion, podemos recopilar la información necesaria para prestar nuestros servicios. Esto puede incluir:',
    },
    {
      type: 'term',
      label: 'Información de la Cuenta',
      text: 'Nombre; correo de trabajo; empresa; cargo; datos de contacto.',
    },
    {
      type: 'term',
      label: 'Información de la Organización',
      text: 'Información del hotel; configuración de la propiedad; contenido de la base de conocimiento; procedimientos operativos; amenidades; información del destino; ajustes del negocio.',
    },
    {
      type: 'term',
      label: 'Interacciones con Huéspedes',
      text: 'Según la implementación de tu organización, Hotel Companion puede procesar: preguntas de huéspedes; solicitudes; interacciones de servicio; conversaciones por voz; conversaciones por texto; comentarios; solicitudes operativas. Los datos de interacción se procesan para mejorar la prestación del servicio y generar inteligencia organizacional.',
    },
    {
      type: 'term',
      label: 'Información Técnica',
      text: 'Información del dispositivo; tipo de navegador; dirección IP; datos de registro; métricas de rendimiento; información de diagnóstico. Esto nos ayuda a mantener la confiabilidad y la seguridad de la plataforma.',
    },

    { type: 'h2', text: 'Cómo Usamos la Información' },
    {
      type: 'p',
      text: 'Usamos la información para: Prestar los servicios de Hotel Companion. Responder a solicitudes de huéspedes. Coordinar flujos de trabajo operativos. Generar Inteligencia de Huéspedes. Mejorar el rendimiento del producto. Mantener la seguridad de la plataforma. Brindar soporte al cliente. Desarrollar nuevas capacidades. Cumplir obligaciones legales.',
    },
    { type: 'p', text: 'No vendemos información personal.' },

    { type: 'h2', text: 'Inteligencia Artificial' },
    {
      type: 'p',
      text: 'Hotel Companion usa inteligencia artificial para ayudar a las organizaciones a entender las necesidades de los huéspedes, coordinar operaciones y mejorar la hospitalidad.',
    },
    {
      type: 'p',
      text: 'Las respuestas generadas por IA pueden asistir a los empleados, pero no deben reemplazar el juicio humano en situaciones que requieran discreción profesional o respuesta de emergencia.',
    },
    {
      type: 'p',
      text: 'Las organizaciones siguen siendo responsables de las decisiones tomadas usando nuestra plataforma.',
    },

    { type: 'h2', text: 'Conocimiento Organizacional' },
    {
      type: 'p',
      text: 'Una de las capacidades centrales de Hotel Companion es preservar el conocimiento organizacional.',
    },
    {
      type: 'p',
      text: 'El conocimiento aportado por tu organización sigue siendo propiedad intelectual de tu organización.',
    },
    {
      type: 'p',
      text: 'Hotel Companion procesa esta información únicamente para prestar y mejorar los servicios que autorices.',
    },

    { type: 'h2', text: 'Seguridad de los Datos' },
    { type: 'p', text: 'La seguridad es un principio de diseño fundamental de Companion OS.' },
    {
      type: 'p',
      text: 'Empleamos salvaguardas administrativas, técnicas y organizacionales estándar de la industria diseñadas para proteger la información del cliente. Estas incluyen: cifrado en tránsito; cifrado en reposo; controles de acceso basados en roles; autenticación; registro de auditoría; monitoreo de infraestructura; mejoras de seguridad continuas.',
    },
    {
      type: 'p',
      text: 'Ningún sistema de seguridad es perfecto, pero proteger la información del cliente sigue siendo una de nuestras máximas prioridades.',
    },

    { type: 'h2', text: 'Retención de Datos' },
    {
      type: 'p',
      text: 'La información se conserva solo el tiempo necesario para prestar los servicios, cumplir obligaciones contractuales, resolver disputas y satisfacer requisitos legales aplicables.',
    },
    {
      type: 'p',
      text: 'Las organizaciones pueden solicitar la eliminación de sus datos conforme a la ley aplicable y los acuerdos contractuales.',
    },

    { type: 'h2', text: 'Servicios de Terceros' },
    { type: 'p', text: 'Hotel Companion se integra con servicios de terceros seleccionados por nuestros clientes.' },
    {
      type: 'p',
      text: 'Estos pueden incluir sistemas de hospitalidad, proveedores de infraestructura en la nube, servicios de analítica, proveedores de autenticación y plataformas de comunicación.',
    },
    { type: 'p', text: 'Cada proveedor externo mantiene sus propias prácticas de privacidad.' },

    { type: 'h2', text: 'Procesamiento Internacional de Datos' },
    { type: 'p', text: 'Hotel Companion presta servicio a organizaciones a nivel global.' },
    {
      type: 'p',
      text: 'La información puede procesarse en jurisdicciones fuera de tu país donde opere nuestra infraestructura o nuestros proveedores de servicios.',
    },
    {
      type: 'p',
      text: 'Cuando corresponde, se implementan salvaguardas apropiadas para las transferencias internacionales de datos.',
    },

    { type: 'h2', text: 'Cookies' },
    {
      type: 'p',
      text: 'Usamos cookies y tecnologías similares para: mantener sesiones seguras; recordar preferencias; medir el rendimiento del sitio; mejorar la experiencia de usuario; analizar el uso de la plataforma.',
    },
    { type: 'p', text: 'Puedes gestionar tus preferencias de cookies desde la configuración de tu navegador.' },
    { type: 'link', label: 'Lee nuestra Política de Cookies', href: '/cookies' },

    { type: 'h2', text: 'Tus Derechos' },
    {
      type: 'p',
      text: 'Según tu jurisdicción, puedes tener derechos sobre tu información personal, incluidos: acceso; corrección; eliminación; restricción; oposición; portabilidad de datos; retiro del consentimiento cuando aplique.',
    },
    { type: 'p', text: 'Las solicitudes pueden enviarse a través de los datos de contacto a continuación.' },

    { type: 'h2', text: 'Privacidad de Menores' },
    { type: 'p', text: 'Hotel Companion está dirigido a organizaciones de hospitalidad y usuarios de negocio.' },
    { type: 'p', text: 'No está diseñado para el uso directo por parte de menores.' },

    { type: 'h2', text: 'Actualizaciones de esta Política' },
    {
      type: 'p',
      text: 'Podemos actualizar este Aviso de Privacidad de vez en cuando conforme evolucionan nuestros productos.',
    },
    { type: 'p', text: 'Los cambios sustanciales se reflejarán actualizando la fecha de “Última actualización”.' },

    { type: 'h2', text: 'Contacto' },
    {
      type: 'p',
      text: 'Las preguntas sobre este Aviso de Privacidad pueden dirigirse a: privacy@hotelcompanion.ai',
    },
    { type: 'p', text: 'Hotel Companion — Construido por Axionari — Ciudad de México, México' },

    { type: 'h2', text: 'Nuestro Compromiso' },
    { type: 'p', text: 'La hospitalidad se construye sobre la confianza.' },
    { type: 'p', text: 'La tecnología debería fortalecer esa confianza—no comprometerla.' },
    {
      type: 'p',
      text: 'Estamos comprometidos a construir sistemas inteligentes que respeten la privacidad, protejan la información y ayuden a las organizaciones a crear experiencias excepcionales de forma responsable.',
    },
  ],
}

export const termsEs: LegalDoc = {
  eyebrow: 'LEGAL · TÉRMINOS',
  title: 'Términos del Servicio',
  lastUpdated: LAST_UPDATED_ES,
  intro: [
    'Bienvenido a Hotel Companion.',
    'Estos Términos del Servicio rigen tu acceso y uso de Hotel Companion, Companion OS, nuestros sitios web, aplicaciones, APIs y servicios relacionados.',
    'Al acceder o usar nuestros servicios, aceptas estos Términos.',
    'Si usas Hotel Companion en nombre de una organización, declaras que tienes la autoridad para obligar a esa organización a estos Términos.',
  ],
  blocks: [
    { type: 'h2', text: 'Definiciones' },
    {
      type: 'term',
      label: 'Hotel Companion',
      text: 'La plataforma de inteligencia hotelera provista por Axionari, construida sobre Companion OS.',
    },
    {
      type: 'term',
      label: 'Companion OS',
      text: 'La Plataforma de Inteligencia Organizacional subyacente que impulsa a Hotel Companion.',
    },
    { type: 'term', label: 'Cliente', text: 'La organización que se suscribe a Hotel Companion o lo usa.' },
    {
      type: 'term',
      label: 'Usuarios',
      text: 'Empleados, administradores, contratistas o representantes autorizados del Cliente.',
    },
    {
      type: 'term',
      label: 'Huésped',
      text: 'Cualquier persona que interactúe con Hotel Companion en nombre del Cliente.',
    },

    { type: 'h2', text: 'Uso del Servicio' },
    {
      type: 'p',
      text: 'Hotel Companion está diseñado para ayudar a las organizaciones de hospitalidad a mejorar la experiencia del huésped, coordinar operaciones y generar inteligencia organizacional.',
    },
    { type: 'p', text: 'Aceptas usar el servicio únicamente para fines de negocio lícitos y conforme a estos Términos.' },
    {
      type: 'p',
      text: 'No puedes: usar la plataforma para actividades ilícitas. Intentar accesos no autorizados a sistemas o datos. Interferir con la disponibilidad o la seguridad de la plataforma. Realizar ingeniería inversa salvo donde lo permita la ley aplicable. Usar la plataforma para generar contenido dañino, abusivo o fraudulento. Eludir las limitaciones de uso o los controles de seguridad.',
    },

    { type: 'h2', text: 'Responsabilidades del Cliente' },
    {
      type: 'p',
      text: 'Los Clientes son responsables de: mantener información de cuenta precisa. Gestionar a los usuarios autorizados. Proteger las credenciales de acceso. Cumplir las leyes de privacidad aplicables. Obtener los consentimientos requeridos de los huéspedes. Revisar las recomendaciones generadas por IA antes de depender de ellas en situaciones que requieran juicio humano.',
    },
    { type: 'p', text: 'El Cliente sigue siendo responsable de las decisiones tomadas usando la plataforma.' },

    { type: 'h2', text: 'Inteligencia Artificial' },
    {
      type: 'p',
      text: 'Hotel Companion usa inteligencia artificial para asistir con la comunicación, las recomendaciones, la coordinación de flujos de trabajo y la inteligencia organizacional.',
    },
    {
      type: 'p',
      text: 'Las respuestas generadas por IA están destinadas a apoyar—no a reemplazar—el juicio profesional.',
    },
    {
      type: 'p',
      text: 'Los Clientes reconocen que los resultados de la IA pueden contener imprecisiones ocasionales y deben revisarse cuando corresponda.',
    },

    { type: 'h2', text: 'Datos del Cliente' },
    {
      type: 'p',
      text: 'Los Clientes conservan la propiedad de todos los datos que proporcionan a Hotel Companion. Esto incluye: bases de conocimiento; documentación operativa; políticas; interacciones con huéspedes; contenido cargado; información de negocio.',
    },
    {
      type: 'p',
      text: 'Hotel Companion recibe únicamente los derechos necesarios para procesar esta información y prestar los servicios contratados.',
    },
    { type: 'p', text: 'No adquirimos la propiedad de los Datos del Cliente.' },

    { type: 'h2', text: 'Propiedad Intelectual' },
    {
      type: 'p',
      text: 'Hotel Companion, Companion OS, el software, los diseños, la documentación, las marcas, el branding y la propiedad intelectual relacionada siguen siendo propiedad exclusiva de Axionari o sus licenciantes.',
    },
    { type: 'p', text: 'Estos Términos no transfieren la propiedad de nuestra propiedad intelectual.' },

    { type: 'h2', text: 'Confidencialidad' },
    { type: 'p', text: 'Cada parte acepta proteger la información confidencial recibida de la otra.' },
    {
      type: 'p',
      text: 'La información confidencial incluye información de negocio, operativa, técnica, financiera y estratégica no pública divulgada durante la relación.',
    },
    {
      type: 'p',
      text: 'La información confidencial no puede divulgarse salvo por requerimiento legal o con autorización previa por escrito.',
    },

    { type: 'h2', text: 'Disponibilidad' },
    { type: 'p', text: 'Nos esforzamos por prestar servicios confiables y disponibles de forma continua.' },
    {
      type: 'p',
      text: 'Sin embargo, la disponibilidad puede verse afectada ocasionalmente por: mantenimiento programado; actualizaciones de seguridad; fallas de infraestructura; interrupciones de servicios de terceros; eventos de fuerza mayor.',
    },
    { type: 'p', text: 'No garantizamos una disponibilidad ininterrumpida.' },

    { type: 'h2', text: 'Integraciones' },
    {
      type: 'p',
      text: 'Hotel Companion puede integrarse con sistemas de hospitalidad de terceros y plataformas externas.',
    },
    {
      type: 'p',
      text: 'La disponibilidad y funcionalidad de esas integraciones puede depender de proveedores externos.',
    },
    { type: 'p', text: 'No somos responsables de cambios, interrupciones o descontinuación de servicios de terceros.' },

    { type: 'h2', text: 'Suscripción y Tarifas' },
    {
      type: 'p',
      text: 'Los términos comerciales, precios de suscripción, servicios de implementación y calendarios de pago se rigen por tu Orden de Compra, Contrato Marco de Servicios u otro acuerdo comercial.',
    },
    {
      type: 'p',
      text: 'El incumplimiento en el pago de las tarifas aplicables puede resultar en la suspensión o terminación del servicio.',
    },

    { type: 'h2', text: 'Uso Aceptable' },
    {
      type: 'p',
      text: 'No puedes usar Hotel Companion para: violar leyes aplicables. Infringir derechos de propiedad intelectual. Distribuir malware. Intentar accesos no autorizados. Interferir con la operación de la plataforma. Generar contenido ilegal o fraudulento. Suplantar a otra persona u organización. Usar la plataforma de formas que amenacen su seguridad o confiabilidad.',
    },

    { type: 'h2', text: 'Suspensión' },
    {
      type: 'p',
      text: 'Podemos suspender el acceso a la plataforma si es necesario para: proteger la seguridad de la plataforma. Prevenir abusos. Responder a requerimientos legales. Atender violaciones sustanciales de estos Términos.',
    },
    { type: 'p', text: 'Cuando sea práctico, daremos aviso razonable antes de la suspensión.' },

    { type: 'h2', text: 'Terminación' },
    {
      type: 'p',
      text: 'Cualquiera de las partes puede terminar los servicios conforme a los acuerdos contractuales aplicables.',
    },
    {
      type: 'p',
      text: 'Al terminar: cesará el acceso del Cliente. Los datos del Cliente se tratarán conforme a las obligaciones contractuales y la ley aplicable. Ciertas obligaciones legales sobreviven a la terminación, incluidas las de confidencialidad y propiedad intelectual.',
    },

    { type: 'h2', text: 'Descargo de Responsabilidad' },
    { type: 'p', text: 'Hotel Companion se provee “tal cual” y “según disponibilidad”.' },
    {
      type: 'p',
      text: 'Aunque nos esforzamos por la precisión y la confiabilidad, no garantizamos que la plataforma sea ininterrumpida, libre de errores o adecuada para todo propósito particular.',
    },
    {
      type: 'p',
      text: 'Los Clientes siguen siendo responsables de las decisiones operativas tomadas usando la plataforma.',
    },

    { type: 'h2', text: 'Limitación de Responsabilidad' },
    {
      type: 'p',
      text: 'En la máxima medida permitida por la ley aplicable, Axionari no será responsable por daños indirectos, incidentales, consecuentes, especiales, punitivos o ejemplares, incluidos la pérdida de ganancias, la interrupción del negocio, la pérdida de reputación o la pérdida de datos.',
    },
    {
      type: 'p',
      text: 'Nuestra responsabilidad agregada no excederá los montos pagados por el Cliente bajo el acuerdo aplicable durante los doce meses previos al evento que dio origen al reclamo, salvo que la ley exija lo contrario.',
    },

    { type: 'h2', text: 'Indemnización' },
    {
      type: 'p',
      text: 'Los Clientes aceptan indemnizar y eximir de responsabilidad a Axionari frente a reclamos derivados de: el mal uso de la plataforma por parte del Cliente. La violación de estos Términos. La violación de la ley aplicable. El contenido proporcionado por el Cliente. El uso no autorizado de los servicios.',
    },

    { type: 'h2', text: 'Ley Aplicable' },
    {
      type: 'p',
      text: 'Estos Términos se regirán por las leyes especificadas en el acuerdo comercial aplicable entre las partes.',
    },
    {
      type: 'p',
      text: 'Cualquier disputa se resolverá en la jurisdicción acordada, salvo que la ley aplicable exija lo contrario.',
    },

    { type: 'h2', text: 'Cambios a estos Términos' },
    {
      type: 'p',
      text: 'Podemos actualizar estos Términos periódicamente para reflejar cambios en nuestros servicios o requisitos legales.',
    },
    { type: 'p', text: 'La versión más reciente siempre estará disponible en nuestro sitio web.' },
    {
      type: 'p',
      text: 'El uso continuado de los servicios después de que los cambios entren en vigor constituye la aceptación de los Términos actualizados.',
    },

    { type: 'h2', text: 'Contacto' },
    { type: 'p', text: 'Las preguntas sobre estos Términos pueden dirigirse a: legal@hotelcompanion.ai' },
    { type: 'p', text: 'Hotel Companion — Construido por Axionari — Ciudad de México, México' },

    { type: 'h2', text: 'Declaración Final' },
    { type: 'p', text: 'La hospitalidad se construye sobre la confianza.' },
    {
      type: 'p',
      text: 'Estos Términos buscan establecer una relación clara y transparente entre Hotel Companion y las organizaciones a las que servimos.',
    },
    {
      type: 'p',
      text: 'Nuestro objetivo es simple: construir tecnología que ayude a las organizaciones de hospitalidad a entender a sus huéspedes, preservar su conocimiento y crear experiencias excepcionales de forma responsable.',
    },
  ],
}

export const cookiesEs: LegalDoc = {
  eyebrow: 'LEGAL · COOKIES',
  title: 'Política de Cookies',
  lastUpdated: LAST_UPDATED_ES,
  intro: [
    'Esta Política de Cookies explica cómo Hotel Companion usa cookies y tecnologías similares en nuestro sitio web y servicios.',
    'Las cookies nos ayudan a brindar una experiencia segura, confiable y más útil, respetando tu privacidad y dándote control sobre tus preferencias.',
  ],
  blocks: [
    { type: 'h2', text: '¿Qué Son las Cookies?' },
    {
      type: 'p',
      text: 'Las cookies son pequeños archivos de texto que se almacenan en tu dispositivo cuando visitas un sitio web.',
    },
    {
      type: 'p',
      text: 'Ayudan a los sitios a recordar información sobre tu visita, mejorar el rendimiento, mantener sesiones seguras y entender cómo se usan los servicios.',
    },
    {
      type: 'p',
      text: 'Por lo general, las cookies no te identifican directamente, pero pueden asociarse con información que ayuda a mejorar tu experiencia.',
    },

    { type: 'h2', text: 'Por Qué Usamos Cookies' },
    {
      type: 'p',
      text: 'Usamos cookies para: mantener sesiones seguras. Recordar tus preferencias. Proteger contra fraude y accesos no autorizados. Mejorar el rendimiento del sitio. Entender cómo usan el sitio los visitantes. Medir la efectividad de nuestro contenido. Brindar una experiencia consistente entre dispositivos. Dar soporte a la funcionalidad del sitio.',
    },
    { type: 'p', text: 'No usamos cookies para vender tu información personal.' },

    { type: 'h2', text: 'Tipos de Cookies que Usamos' },
    {
      type: 'term',
      label: 'Cookies Esenciales',
      text: 'Necesarias para el funcionamiento del sitio. Habilitan funciones centrales como: inicio de sesión seguro; gestión de sesiones; autenticación; protecciones de seguridad; balanceo de carga; envío de formularios. Sin ellas, el sitio no puede funcionar correctamente. Estas cookies no pueden desactivarse.',
    },
    {
      type: 'term',
      label: 'Cookies de Rendimiento',
      text: 'Nos ayudan a entender cómo interactúan los visitantes con el sitio. Nos permiten mejorar: rendimiento de páginas; navegación; calidad del contenido; confiabilidad del sitio; experiencia de usuario. La información recopilada se agrega siempre que es posible y no se usa para identificar a visitantes individuales.',
    },
    {
      type: 'term',
      label: 'Cookies de Analítica',
      text: 'Nos ayudan a entender: qué páginas son más útiles; cómo navegan los visitantes; dónde encuentran fricción; qué contenido genera más interacción. Estas ideas nos ayudan a mejorar la experiencia de Hotel Companion.',
    },
    {
      type: 'term',
      label: 'Cookies Funcionales',
      text: 'Recuerdan tus elecciones, como: preferencias de idioma; región; ajustes de accesibilidad; preferencias de visualización; formularios completados previamente. Hacen que tus próximas visitas sean más cómodas.',
    },
    {
      type: 'term',
      label: 'Cookies de Marketing',
      text: 'De vez en cuando podemos usar cookies que ayudan a medir la efectividad de campañas de marketing. Nos ayudan a entender cómo descubren Hotel Companion los visitantes y qué recursos educativos son más valiosos. No usamos cookies publicitarias para vender información personal ni crear perfiles con fines publicitarios no relacionados.',
    },

    { type: 'h2', text: 'Cookies de Terceros' },
    { type: 'p', text: 'Algunas partes del sitio pueden depender de proveedores externos de confianza.' },
    {
      type: 'p',
      text: 'Ejemplos: proveedores de analítica; plataformas de agendamiento; videos incrustados; herramientas de soporte al cliente; mapas; proveedores de pago.',
    },
    {
      type: 'p',
      text: 'Cada proveedor externo mantiene sus propias prácticas de privacidad y cookies. Te recomendamos revisar sus respectivas políticas.',
    },

    { type: 'h2', text: 'Gestión de Cookies' },
    {
      type: 'p',
      text: 'La mayoría de los navegadores te permiten: ver las cookies almacenadas. Eliminar cookies. Bloquear cookies. Restringir cookies de terceros. Recibir notificaciones antes de que se almacenen cookies.',
    },
    {
      type: 'p',
      text: 'Ten en cuenta que desactivar ciertas cookies puede afectar la funcionalidad del sitio y tu experiencia general.',
    },

    { type: 'h2', text: 'Consentimiento de Cookies' },
    {
      type: 'p',
      text: 'Cuando lo exija la ley aplicable, solicitaremos tu consentimiento antes de colocar cookies no esenciales en tu dispositivo.',
    },
    {
      type: 'p',
      text: 'Puedes actualizar o retirar tu consentimiento en cualquier momento a través de tus preferencias de cookies.',
    },

    { type: 'h2', text: 'No Rastrear (Do Not Track)' },
    { type: 'p', text: 'Algunos navegadores ofrecen una opción de “No Rastrear”.' },
    {
      type: 'p',
      text: 'Debido a que actualmente no existe un estándar universal de la industria que rija estas señales, nuestro sitio puede no responder de forma consistente a todas las solicitudes de No Rastrear.',
    },

    { type: 'h2', text: 'Cambios a esta Política' },
    {
      type: 'p',
      text: 'Conforme evolucionan nuestros servicios, podemos actualizar esta Política de Cookies para reflejar cambios en la tecnología, requisitos legales o nuestro uso de cookies.',
    },
    { type: 'p', text: 'La versión más reciente siempre estará disponible en esta página.' },

    { type: 'h2', text: 'Contacto' },
    {
      type: 'p',
      text: 'Las preguntas sobre esta Política de Cookies pueden dirigirse a: privacy@hotelcompanion.ai',
    },
    { type: 'p', text: 'Hotel Companion — Construido por Axionari — Ciudad de México, México' },

    { type: 'h2', text: 'Transparencia por Diseño' },
    { type: 'p', text: 'La hospitalidad se construye sobre la confianza.' },
    { type: 'p', text: 'Ese principio se extiende más allá de nuestra plataforma, hacia cómo operamos nuestro sitio web.' },
    {
      type: 'p',
      text: 'Creemos que siempre deberías entender qué información se recopila, por qué se recopila y cómo nos ayuda a ofrecerte una mejor experiencia.',
    },
  ],
}

export const securityEs: LegalDoc = {
  eyebrow: 'CONFIANZA · SEGURIDAD',
  title: 'Seguridad de nivel empresarial para una hospitalidad empresarial.',
  intro: [
    'Hotel Companion está construido sobre Companion OS, una plataforma de inteligencia diseñada con la seguridad, la privacidad y la resiliencia operativa como principios fundamentales—no como añadidos posteriores.',
    'A medida que las organizaciones dependen cada vez más de la IA para apoyar la experiencia del huésped y las operaciones, proteger los datos del cliente y el conocimiento organizacional se vuelve esencial para ganar confianza.',
  ],
  blocks: [
    { type: 'h2', text: 'Nuestros Principios de Seguridad' },
    {
      type: 'term',
      label: 'Seguridad por Diseño',
      text: 'La seguridad está integrada en toda la plataforma—desde la arquitectura y la infraestructura hasta el desarrollo de aplicaciones y las operaciones. Cada nueva capacidad se evalúa con la seguridad, la privacidad y la resiliencia en mente.',
    },
    {
      type: 'term',
      label: 'Propiedad de los Datos del Cliente',
      text: 'El conocimiento de tu organización te pertenece. Hotel Companion procesa tu información únicamente para prestar los servicios que autorizas. Nunca vendemos datos del cliente. Nunca reclamamos la propiedad de tu conocimiento organizacional.',
    },
    {
      type: 'term',
      label: 'Defensa en Profundidad',
      text: 'Empleamos múltiples capas de salvaguardas técnicas y organizacionales diseñadas para reducir el riesgo y proteger la información del cliente. La seguridad no es una sola función—es un sistema continuo.',
    },

    { type: 'h2', text: 'Seguridad de la Plataforma' },
    {
      type: 'term',
      label: 'Cifrado',
      text: 'Los datos del cliente se protegen con cifrado estándar de la industria: cifrado en tránsito; cifrado en reposo; protocolos de comunicación seguros; respaldos cifrados.',
    },
    {
      type: 'term',
      label: 'Autenticación',
      text: 'El acceso a Hotel Companion se protege mediante mecanismos de autenticación modernos: autenticación segura; autenticación multifactor (donde se admite); protección de sesión; seguridad de contraseñas; verificación de identidad.',
    },
    {
      type: 'term',
      label: 'Control de Acceso',
      text: 'Las organizaciones mantienen el control sobre quién puede acceder a la información: permisos basados en roles; controles administrativos; gestión de usuarios; principio de mínimo privilegio; segregación de permisos.',
    },
    {
      type: 'term',
      label: 'Infraestructura',
      text: 'Hotel Companion se aloja en una infraestructura moderna en la nube diseñada para alta disponibilidad, resiliencia y seguridad: monitoreo continuo; respaldos automatizados; redundancia de infraestructura; seguridad de red; prácticas de despliegue seguras.',
    },

    { type: 'h2', text: 'Desarrollo Seguro' },
    {
      type: 'p',
      text: 'La seguridad está integrada en nuestro ciclo de vida de desarrollo de software. Nuestras prácticas de ingeniería incluyen: revisiones de código; gestión de dependencias; pruebas continuas; monitoreo de seguridad; remediación de vulnerabilidades; pipelines de despliegue seguros.',
    },

    { type: 'h2', text: 'Seguridad de la Inteligencia Artificial' },
    { type: 'p', text: 'La IA introduce nuevas oportunidades—y nuevas responsabilidades.' },
    {
      type: 'p',
      text: 'Hotel Companion está diseñado para usar la IA de forma responsable mientras protege el conocimiento organizacional y la confianza del cliente. Nuestro enfoque incluye: acceso controlado al conocimiento organizacional; supervisión humana para las decisiones operativas; gestión responsable de instrucciones (prompts); minimización de datos; mejoras continuas de la plataforma.',
    },
    { type: 'p', text: 'La IA asiste a las personas. Las personas siguen siendo responsables de las decisiones.' },

    { type: 'h2', text: 'Protección del Conocimiento Organizacional' },
    {
      type: 'p',
      text: 'Una de las responsabilidades únicas de Hotel Companion es proteger el conocimiento institucional.',
    },
    {
      type: 'p',
      text: 'Las bases de conocimiento, los procedimientos operativos, la documentación interna y la experiencia organizacional se tratan como activos de negocio protegidos.',
    },
    { type: 'p', text: 'Las organizaciones mantienen la propiedad y el control de su información.' },

    { type: 'h2', text: 'Privacidad' },
    { type: 'p', text: 'La privacidad y la seguridad trabajan juntas.' },
    {
      type: 'p',
      text: 'Hotel Companion está diseñado para apoyar a las organizaciones en la protección de la información de los huéspedes mientras habilita experiencias excepcionales.',
    },
    { type: 'link', label: 'Lee nuestro Aviso de Privacidad', href: '/privacy' },

    { type: 'h2', text: 'Divulgación Responsable' },
    {
      type: 'p',
      text: 'Si crees haber identificado una vulnerabilidad de seguridad, te invitamos a una divulgación responsable. Contacto: security@hotelcompanion.ai',
    },
    {
      type: 'p',
      text: 'Agradecemos los reportes responsables e investigaremos con prontitud toda inquietud de seguridad legítima.',
    },

    { type: 'h2', text: 'Hoja de Ruta de Cumplimiento' },
    {
      type: 'p',
      text: 'A medida que Hotel Companion crece, estamos comprometidos a alinearnos con estándares de seguridad y privacidad reconocidos, apropiados para clientes empresariales.',
    },
    {
      type: 'p',
      text: 'Nuestra hoja de ruta incluye el soporte de marcos de seguridad y mejores prácticas ampliamente adoptados conforme evolucionan los requisitos de los clientes.',
    },

    { type: 'h2', text: 'La Seguridad Nunca Está Terminada' },
    { type: 'p', text: 'La seguridad no es un hito.' },
    {
      type: 'p',
      text: 'Es un compromiso continuo de proteger a nuestros clientes, a sus huéspedes y a la inteligencia organizacional que impulsa una hospitalidad excepcional.',
    },

    { type: 'h2', text: '¿Preguntas?' },
    { type: 'p', text: 'Para consultas relacionadas con seguridad, contacta: security@hotelcompanion.ai' },
  ],
}

export const responsibleAiEs: LegalDoc = {
  eyebrow: 'CONFIANZA · IA RESPONSABLE',
  title: 'La inteligencia artificial debería hacer la hospitalidad más humana—no menos.',
  intro: [
    'En Hotel Companion, la IA existe para ayudar a las organizaciones a entender a los huéspedes, preservar el conocimiento, coordinar operaciones y apoyar mejores decisiones.',
    'Nuestra filosofía es simple: la IA debería potenciar a las personas, no reemplazarlas.',
  ],
  blocks: [
    { type: 'h2', text: 'Nuestros Principios' },
    {
      type: 'term',
      label: 'La Hospitalidad Primero',
      text: 'La hospitalidad siempre ha sido sobre las personas. La IA debería potenciar la calidez, la capacidad de respuesta y la consistencia—no reemplazar las relaciones humanas genuinas. La tecnología triunfa cuando los huéspedes recuerdan la experiencia, no el software.',
    },
    {
      type: 'term',
      label: 'Supervisión Humana',
      text: 'Hotel Companion asiste en la toma de decisiones. No reemplaza el juicio profesional. Las decisiones operativas, financieras, legales o de seguridad críticas siempre deben involucrar una revisión humana apropiada. Las personas siguen siendo responsables de los resultados.',
    },
    {
      type: 'term',
      label: 'Transparencia',
      text: 'Los huéspedes y los empleados deberían saber cuándo están interactuando con sistemas asistidos por IA. Creemos que la confianza comienza con la claridad. Las organizaciones deberían desplegar la IA de formas abiertas, honestas y respetuosas de las expectativas del usuario.',
    },
    {
      type: 'term',
      label: 'Inteligencia Organizacional',
      text: 'Hotel Companion está diseñado para ayudar a las organizaciones a aprender—no a tomar decisiones en su nombre. Cada conversación contribuye a una comprensión más profunda de las necesidades de los huéspedes, los patrones operativos y el conocimiento organizacional. El objetivo es la mejora continua, no la automatización por sí misma.',
    },
    {
      type: 'term',
      label: 'Privacidad por Diseño',
      text: 'La IA responsable comienza con prácticas de datos responsables. Minimizamos la recopilación de datos, protegemos la información del cliente y procesamos el conocimiento organizacional solo para fines autorizados. Los datos del cliente permanecen bajo su control.',
    },
    {
      type: 'term',
      label: 'Precisión',
      text: 'Los sistemas de IA son probabilísticos. Aunque Hotel Companion está diseñado para ofrecer respuestas útiles, relevantes y con contexto, el contenido generado por IA puede ser ocasionalmente incompleto o impreciso. Las organizaciones deben revisar los resultados importantes antes de actuar sobre ellos.',
    },
    {
      type: 'term',
      label: 'Equidad',
      text: 'Nos esforzamos por diseñar sistemas que brinden experiencias consistentes y respetuosas para todos los huéspedes. Conforme evoluciona la tecnología de IA, evaluamos continuamente nuestros sistemas para mejorar la calidad, reducir sesgos no intencionados y fortalecer la confiabilidad.',
    },
    {
      type: 'term',
      label: 'Mejora Continua',
      text: 'La IA responsable es una práctica continua. Mejoramos regularmente nuestra plataforma con base en los comentarios de los clientes, la experiencia operativa, los avances tecnológicos y las mejores prácticas emergentes.',
    },

    { type: 'h2', text: 'Cómo Usamos la IA' },
    {
      type: 'p',
      text: 'Hotel Companion usa la IA para apoyar: conversaciones con huéspedes; recuperación de conocimiento; coordinación operativa; generación de recomendaciones; automatización de flujos de trabajo; aprendizaje organizacional; inteligencia de hospitalidad.',
    },
    {
      type: 'p',
      text: 'La plataforma está diseñada para asistir—no para operar de forma autónoma—a las organizaciones de hospitalidad.',
    },

    { type: 'h2', text: 'Lo que No Hacemos' },
    { type: 'p', text: 'No construimos IA destinada a reemplazar a los profesionales de la hospitalidad.' },
    { type: 'p', text: 'No vendemos datos del cliente.' },
    { type: 'p', text: 'No reclamamos la propiedad del conocimiento organizacional.' },
    { type: 'p', text: 'No usamos el conocimiento del cliente para fines comerciales no relacionados.' },
    { type: 'p', text: 'No prometemos que la IA sea infalible.' },

    { type: 'h2', text: 'El Papel de las Personas' },
    { type: 'p', text: 'La hospitalidad excepcional depende de la empatía, el juicio, la creatividad y el cuidado.' },
    { type: 'p', text: 'Estas cualidades siguen siendo exclusivamente humanas.' },
    {
      type: 'p',
      text: 'Hotel Companion atiende las interacciones rutinarias, revela el conocimiento relevante y apoya mejores decisiones para que los equipos dediquen más tiempo a crear experiencias memorables.',
    },

    { type: 'h2', text: 'Construyendo Confianza' },
    { type: 'p', text: 'La IA responsable se trata, en última instancia, de la confianza.' },
    {
      type: 'p',
      text: 'La confianza se gana a través de la transparencia, la responsabilidad, la privacidad, la seguridad y el diseño cuidadoso—no a través de afirmaciones sobre la inteligencia por sí solas.',
    },
    {
      type: 'p',
      text: 'Estamos comprometidos a construir sistemas de IA que las organizaciones puedan adoptar con confianza y con los que los huéspedes puedan interactuar con comodidad.',
    },

    { type: 'h2', text: 'Nuestro Compromiso' },
    { type: 'p', text: 'Creemos que el futuro de la hospitalidad no es artificial.' },
    {
      type: 'p',
      text: 'Es más humano que nunca—apoyado por una inteligencia que ayuda a cada persona a dar lo mejor de sí.',
    },
  ],
}

export const trustEs: LegalDoc = {
  eyebrow: 'CENTRO DE CONFIANZA',
  title: 'La confianza es la base de toda gran experiencia de hospitalidad.',
  intro: [
    'También es la base de toda gran plataforma tecnológica.',
    'Este Centro de Confianza ofrece una visión general de los principios, políticas y prácticas que guían cómo Hotel Companion protege la información del cliente, construye IA de forma responsable y opera con transparencia.',
  ],
  blocks: [
    {
      type: 'term',
      label: 'Seguridad',
      text: 'Protegemos los datos del cliente mediante prácticas de seguridad modernas, salvaguardas por capas, infraestructura segura y monitoreo continuo.',
    },
    { type: 'link', label: 'Conoce sobre Seguridad', href: '/security' },
    {
      type: 'term',
      label: 'Privacidad',
      text: 'Estamos comprometidos con un manejo responsable de datos, la propiedad del conocimiento organizacional por parte del cliente y prácticas de privacidad transparentes.',
    },
    { type: 'link', label: 'Lee nuestro Aviso de Privacidad', href: '/privacy' },
    {
      type: 'term',
      label: 'IA Responsable',
      text: 'Nuestra IA está diseñada para potenciar a los profesionales de la hospitalidad, preservar el conocimiento organizacional y apoyar mejores decisiones manteniendo a las personas en control.',
    },
    { type: 'link', label: 'Conoce sobre IA Responsable', href: '/responsible-ai' },
    {
      type: 'term',
      label: 'Términos del Servicio',
      text: 'Nuestros Términos definen la relación entre Hotel Companion y las organizaciones a las que servimos.',
    },
    { type: 'link', label: 'Ver Términos del Servicio', href: '/terms' },
    {
      type: 'term',
      label: 'Política de Cookies',
      text: 'Conoce cómo usamos cookies y tecnologías similares para brindar una experiencia segura, confiable y de alta calidad.',
    },
    { type: 'link', label: 'Lee la Política de Cookies', href: '/cookies' },

    { type: 'h2', text: 'Divulgación Responsable' },
    {
      type: 'p',
      text: 'Si crees haber identificado una vulnerabilidad de seguridad, contacta: security@hotelcompanion.ai',
    },
    {
      type: 'p',
      text: 'Investigamos todos los reportes legítimos de forma responsable y agradecemos la divulgación coordinada.',
    },

    { type: 'h2', text: 'Contacto' },
    {
      type: 'p',
      text: 'Las preguntas sobre seguridad, privacidad, cumplimiento o IA responsable pueden dirigirse a: security@hotelcompanion.ai · privacy@hotelcompanion.ai · legal@hotelcompanion.ai',
    },

    { type: 'h2', text: 'Nuestro Compromiso' },
    { type: 'p', text: 'La confianza no es una función.' },
    {
      type: 'p',
      text: 'Es el resultado de proteger la información de forma consistente, respetar la privacidad, diseñar la IA de forma responsable y operar con transparencia.',
    },
    { type: 'p', text: 'Ese compromiso está integrado en Hotel Companion, Companion OS y en todo lo que creamos.' },
  ],
}
