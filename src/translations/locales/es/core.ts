/**
 * Spanish translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const esCore = {
  common: {
    // Actions
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    done: 'Listo',
    close: 'Cerrar',
    back: 'Atrás',
    next: 'Siguiente',
    skip: 'Omitir',
    continue: 'Continuar',
    retry: 'Reintentar',
    delete: 'Eliminar',
    edit: 'Editar',
    share: 'Compartir',
    send: 'Enviar',
    search: 'Buscar',
    seeAll: 'Ver todo',
    tryAgain: 'Intentar de nuevo',
    ok: 'OK',
    yes: 'Sí',
    no: 'No',
    or: 'o',
    upgrade: 'Mejorar',
    processing: 'Procesando...',
    openSettings: 'Abrir ajustes',
    readMore: 'Leer más',
    createTattoo: 'Crear tatuaje',
    style: 'Estilo',

    // States
    on: 'Activado',
    off: 'Desactivado',
    enabled: 'Habilitado',
    disabled: 'Deshabilitado',

    // Errors
    somethingWentWrong: 'Algo salió mal',
    unexpectedError: 'Ocurrió un error inesperado',
  },

  tabs: {
    home: 'Inicio',
    explore: 'Explorar',
    myTattoos: 'Mis tatuajes',
    profile: 'Perfil',
    tryOnTattoo: 'Probar tatuaje',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: '¡Bienvenido de nuevo!',
    signInDescription: 'Elige tu método de inicio de sesión preferido',
    signIn: 'Iniciar sesión',
    alreadyHaveAccount: '¿Ya tienes una cuenta? ',
    termsOfService: 'Términos de servicio',
    privacyPolicy: 'Política de privacidad',
    byContinuingAgree: 'Al continuar, aceptas nuestros ',
    inkognitoMode: 'Modo Ink-ognito',
    inkognitoDescription: 'Tus diseños se quedan contigo, no con nosotros.',
    signInToContinue:
      '¡Inicia sesión para continuar y crear tu tatuaje!',
    signInBenefit:
      'Al iniciar sesión, podemos rastrear tus generaciones gratuitas de tatuajes y asegurarnos de que tu cuenta esté configurada correctamente.',
    notSignedIn: '(No has iniciado sesión)',
  },

  profile: {
    // Screen header
    title: 'Perfil',

    // Section headers
    account: 'Cuenta',
    planAndUsage: 'Plan y uso',
    settings: 'Ajustes',
    support: 'Soporte',
    legal: 'Legal',
    dangerZone: 'Zona de peligro',
    supportAndFeedback: 'Soporte y comentarios',
    followUs: 'Síguenos',

    // Sign-in prompt
    notSignedIn: 'No has iniciado sesión',
    signInPrompt:
      'Inicia sesión para acceder a los detalles de tu cuenta, información de suscripción y funciones personalizadas',

    // Account
    email: 'Correo electrónico',
    name: 'Nombre',
    model: 'Modelo',
    userId: 'ID de usuario',
    memberSince: 'Miembro desde',
    signOut: 'Cerrar sesión',
    logOut: 'Cerrar sesión',
    signOutConfirmTitle: 'Cerrar sesión',
    signOutConfirmMessage: '¿Estás seguro de que quieres cerrar sesión?',
    unknownUser: 'Usuario desconocido',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Período de uso activo',
    currentPlan: 'Plan actual',
    planDetails: 'Detalles del plan',
    status: 'Estado',
    renewsOn: 'Se renueva el',
    expiresOn: 'Expira el',
    daysRemaining: 'Días restantes',
    daysValue: '{{count}} días',
    price: 'Precio',
    billingPeriod: 'Período de facturación',
    managePlan: 'Gestionar plan',
    upgradePlan: 'Mejorar plan',
    upgradeNow: 'Mejorar ahora',
    limitReachedFooter:
      'Has alcanzado tu límite de generación. Mejora tu plan para continuar.',
    noSubscription: 'Sin suscripción',
    cancelledActive: 'Cancelado (Activo)',
    cancelledActiveUntilExpiration: 'Cancelado (Activo hasta expiración)',
    activeUntilExpiration: 'Activo hasta expiración',
    accessEndsOn: 'El acceso termina el',
    autoRenew: 'Renovación automática',
    cancelledAt: 'Cancelado el',
    expiredOn: 'Expirado el',
    refreshing: 'Actualizando...',
    refreshData: 'Actualizar datos',
    limitReachedFooterLong:
      'Has alcanzado tu límite de generación de tatuajes con IA para este plan. Mejora para seguir creando tatuajes o contáctanos.',
    weMissYouFooter:
      '¿Listo para crear más tatuajes increíbles? Vuelve y diseñemos algo increíble juntos.',
    unknown: 'Desconocido',
    free: 'Gratis',
    pro: 'Pro',
    active: 'Activo',
    expired: 'Expirado',
    cancelled: 'Cancelado',
    generationsUsed: 'Generaciones usadas',
    generationsRemaining: 'Generaciones restantes',
    unlimited: 'Ilimitado',
    na: 'N/A',

    // We Miss You
    weMissYou: '¡Te echamos de menos!',
    previousPlan: 'Plan anterior',
    comeBackAndCreate: 'Vuelve y crea',

    // Enjoying the app
    enjoyingApp: '¿Te gusta la app?',
    enjoyingAppDescription:
      'Si te gusta Tattoo Design AI, una reseña ayuda a otros amantes de los tatuajes a descubrirnos. También puedes enviarnos comentarios o ideas para nuevas funciones en cualquier momento.',
    rateOnPlayStore: 'Valorar en Play Store',
    rateOnAppStore: 'Valorar en App Store',
    sendFeedback: 'Enviar comentarios',

    // Are you an artist
    areYouArtist: '¿Eres artista?',
    artistDescription:
      '¿Interesado en colaborar? ¿Tienes sugerencias o quejas? ¡Nos encantaría saber de ti!',
    writeToUs: 'Escríbenos',

    // Support
    contactSupport: 'Contactar soporte',
    requestFeature: 'Sugerir una función',
    rateApp: 'Valorar la app',
    shareApp: 'Compartir la app',
    shareWithFriends: 'Compartir con amigos',
    shareMessage: 'Descubre Tattoo Design AI \n',

    // Settings
    appearance: 'Apariencia',
    light: 'Claro',
    dark: 'Oscuro',
    system: 'Sistema',
    language: 'Idioma',
    languageAuto: 'Automático (Sistema)',
    showOnboarding: 'Mostrar introducción',
    promptEnhancement: 'Mejora del prompt',
    promptEnhancementDisabledTitle: 'Mejora del prompt desactivada',
    promptEnhancementDisabledMessage:
      'Los resultados pueden variar sin mejora. Puedes reactivarla en cualquier momento.',

    // Legal
    termsOfService: 'Términos de servicio',
    privacyPolicy: 'Política de privacidad',

    // Danger
    deleteAccount: 'Eliminar cuenta',
    deleteAccountConfirmTitle: 'Eliminar cuenta',
    deleteAccountConfirmMessage:
      '¿Estás seguro? Esto no se puede deshacer. Nota: esto NO cancela las suscripciones activas.',
    dangerZoneFooter:
      'Eliminar tu cuenta es permanente. Esto NO cancela las suscripciones activas.',
    resetOnboarding: 'Restablecer introducción',

    // Version
    version: 'Versión',
  },

  emails: {
    support: {
      subject: 'Solicitud de soporte Tattoo Design AI',
      body: 'Hola,\n\nNecesito ayuda con la app Tattoo Design AI.\n\n{{userInfo}}\n\nDescripción:\n[Por favor describe tu problema aquí]\n\n¡Gracias!',
    },
    featureRequest: {
      subject: 'Ayuda con solicitud de función Tattoo Design AI',
      body: 'Hola,\n\nNecesito ayuda para enviar una solicitud de función.\n\n',
    },
    feedback: {
      subject: 'Comentarios sobre Tattoo Design AI',
      body: '¡Hola!\n\nTengo comentarios sobre Tattoo Design AI:\n\n[Tus comentarios aquí]{{userInfo}}\n\n¡Gracias!',
    },
    artist: {
      subject: '¿Eres artista? - Tattoo Design AI',
      body: '¡Hola!\n\nMe interesa colaborar o tengo sugerencias/quejas.\n\n{{userInfo}}\n\n[Por favor comparte tus sugerencias, quejas, o cuéntanos sobre ti como artista]\n\n¡Gracias!',
    },
    userIdLabel: 'ID de usuario: {{id}}',
    emailLabel: 'Correo electrónico: {{email}}',
    accountLabel: 'Correo de mi cuenta: {{email}}',
    myUserIdLabel: 'Mi ID de usuario: {{id}}',
    accountInfo: '\n\nCuenta: {{email}}',
  },

  notFound: {
    title: '¡Ups!',
    description: 'Esta pantalla no existe.',
    goHome: '¡Ir a la pantalla de inicio!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Comencemos',
    photoAccessDescription:
      'Necesitamos acceso a tus fotos para agregar imágenes',
    photoAccessDeniedTitle: 'Se necesita acceso a las fotos',
    photoAccessDeniedDescription:
      'Esta función requiere acceso a tu biblioteca de fotos para ver y guardar tus tatuajes. Puedes gestionar el acceso a fotos en los ajustes de tu dispositivo.',
    photoLibraryNeeded:
      'Necesitamos acceso a tu biblioteca de fotos para que puedas ver y guardar tus tatuajes.',

    // Camera
    cameraAccessTitle: 'Comencemos',
    cameraAccessDescription:
      'Necesitamos acceso a tu cámara para tomar fotos.',
    cameraAccessDeniedTitle: 'Se necesita acceso a la cámara',
    cameraAccessDeniedDescription:
      'Esta función requiere acceso a tu cámara. Puedes gestionar el acceso a la cámara en los ajustes de tu dispositivo.',
  },
};
