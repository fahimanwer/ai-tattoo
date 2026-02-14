/**
 * Spanish translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const esFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Visualiza tu tatuaje antes de comprometerte.',
    whatsYourName: '¿Cómo te llamas?',
    namePlaceholder: 'Tu nombre',
    nameDescription: 'Usaremos esto para personalizar tu experiencia.',
    welcome: 'Bienvenido',
    welcomeDescription: 'Personalicemos tu experiencia de Tattoo Design AI ahora.',
    describeYou: '¿Cuál te \n describe mejor?',
    describeYouDescription:
      'Esto nos ayuda a personalizar la experiencia según tu relación con los tatuajes',
    whatToDo: '¿Qué te gustaría\n hacer?',
    whatToDoDescription:
      'Esto nos ayuda a entender cómo quieres explorar los tatuajes y qué herramientas te serían más útiles.',
    designTattoo: 'Diseña el \n tatuaje que quieres',
    designTattooDescription:
      'Escribe unas palabras o sube una imagen y genera diseños de tatuajes únicos al instante.',
    whereTattoo: '¿Dónde quieres\n el tatuaje?',
    whereTattooDescription:
      'La ubicación afecta el diseño, el tamaño y el flujo, lo que nos ayuda a adaptar las ideas a tu cuerpo.',
    pickStyles: 'Elige hasta 5 \n estilos que te gusten',
    pickStylesDescription:
      'Tu elección de estilos nos ayuda a encontrar diseños que coincidan con tus gustos.',
    whenTattoo: '¿Cuándo piensas\n hacerte el tatuaje?',
    whenTattooDescription:
      'Esto nos ayuda a adaptar\n la experiencia a tu cronograma.',
    whatVibe: '¿Qué vibra\n buscas?',
    whatVibeDescription:
      'Los tatuajes llevan emociones - esto nos ayuda a entender la historia detrás del tuyo.',
    settingUp: 'Estamos preparando\n todo para ti',
    youreAllSet: '¡Todo listo!',
    youreAllSetDescription: 'Estás listo para comenzar.',

    // CTA
    alreadyHaveAccount: '¿Ya tienes una cuenta? ',
    signIn: 'Iniciar sesión',

    // User description options
    userDescription: {
      artist: 'Creo tatuajes',
      client: 'Me voy a hacer un tatuaje',
      model: 'Uso tatuajes para contenido',
      explorer: 'Solo estoy explorando',
    },

    // Goal options
    goal: {
      tryOn: 'Probar tatuajes en mis fotos',
      generate: 'Generar ideas de tatuajes',
      browse: 'Solo navegar o buscar inspiración',
      coverUp: 'Cubrir/Rehacer un tatuaje existente',
    },

    // Location options
    location: {
      wrist: 'Muñeca',
      chest: 'Pecho',
      hand: 'Mano',
      back: 'Espalda',
      legs: 'Piernas',
      forearm: 'Antebrazo',
      neck: 'Cuello',
      jaw: 'Mandíbula',
      forehead: 'Frente',
      knuckles: 'Nudillos',
      fingers: 'Dedos',
      cheek: 'Mejilla',
      shoulder: 'Hombro',
      temple: 'Sien',
      ribs: 'Costillas',
      abdomen: 'Abdomen',
      face: 'Cara',
      hips: 'Caderas',
      thigh: 'Muslo',
      tricep: 'Tríceps',
      bicep: 'Bíceps',
      collarbone: 'Clavícula',
      ankle: 'Tobillo',
      foot: 'Pie',
      palm: 'Palma',
      notSure: 'No estoy seguro',
    },

    // Style options
    styles: {
      traditional: 'Tradicional',
      realism: 'Realismo',
      minimal: 'Minimalista',
      celtic: 'Celta',
      blackwork: 'Blackwork',
      illustrative: 'Ilustrativo',
      lettering: 'Lettering',
      irezumi: 'Irezumi',
      geometric: 'Geométrico',
      religious: 'Religioso',
      anime: 'Anime',
      fineLine: 'Fine Line',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Caligrafía',
      portrait: 'Retrato',
      floral: 'Floral',
      polynesian: 'Polinesio',
      tribal: 'Tribal',
      maori: 'Maorí',
      gothic: 'Gótico',
      patchwork: 'Patchwork',
      abstract: 'Abstracto',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrología',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Esta semana',
      thisMonth: 'Este mes',
      oneToThreeMonths: 'En 1-3 meses',
      someday: 'Algún día, solo estoy explorando',
    },

    // Vibe options
    vibe: {
      bold: 'Audaz',
      confident: 'Seguro',
      soft: 'Suave',
      dark: 'Oscuro',
      edgy: 'Atrevido',
      elegant: 'Elegante',
      spiritual: 'Espiritual',
      cute: 'Tierno',
      symbolic: 'Simbólico',
      playful: 'Juguetón',
      clean: 'Limpio',
      modern: 'Moderno',
      meaningful: 'Significativo',
      personalStory: 'Historia personal',
      family: 'Familia',
      love: 'Amor',
      memory: 'Recuerdo',
      rebirth: 'Renacimiento',
      freedom: 'Libertad',
      mystical: 'Místico',
      rebellious: 'Rebelde',
      serene: 'Sereno',
      empowered: 'Empoderado',
      ethereal: 'Etéreo',
      fearless: 'Intrépido',
      wanderlust: 'Wanderlust',
      transcendent: 'Trascendente',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Entendiendo la visión de {{name}}',
      understandingVisionDefault: 'Entendiendo tu visión',
      tailoringDesigns: 'Adaptando diseños a tu estilo',
      settingUpCoverUp: 'Preparando herramientas de cobertura',
      personalizingExperience: 'Personalizando tu experiencia',
      preparingStudio: 'Preparando tu estudio de diseño',
      configuringWorkspace: 'Configurando tu espacio de trabajo',
      applyingPreferences: 'Aplicando tus preferencias',
      journeyStartsNow: 'Tu viaje de tatuaje comienza ahora',
    },

    // Reviews
    reviews: {
      review1Title: '¡Increíble app!',
      review1Body:
        '¡La app funciona, se ve y se siente genial! Impresionado con lo bien que aplica el tatuaje, considerando iluminación y sombras con precisión.',
      review1Author: 'Jacob C.',
      review2Title: 'Realmente útil',
      review2Body:
        'Los diseños son limpios y detallados. Algunas imágenes tardan un poco más en generarse, pero en general es una de las mejores apps de tatuajes IA.',
      review2Author: 'Alexrays1',
      review3Title: 'Me encanta',
      review3Body: 'Altamente recomendado \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Genera tatuajes al instante',
    containerDesc1:
      'Escribe unas palabras y genera diseños de tatuajes únicos al instante.',
    containerTitle2: 'Personaliza tu diseño',
    containerDesc2:
      'Ajusta colores, disposición y estilo para que el tatuaje sea perfectamente tuyo.',
    containerTitle3: 'Previsualiza en tu piel',
    containerDesc3:
      'Previsualiza cualquier tatuaje en tu piel — ajusta tamaño y ubicación al instante.',
    paused: 'Pausado',

    // Relative time
    time: {
      today: 'Hoy',
      yesterday: 'Ayer',
      daysAgo: 'Hace {{count}} días',
      weeksAgo: 'Hace {{count}} semanas',
      monthsAgo: 'Hace {{count}} meses',
      yearsAgo: 'Hace {{count}} años',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Tecnología de prueba',
      tryOnTechnologyDesc: 'Ve tatuajes en tu piel antes de comprometerte',
      aiTattooGenerator: 'Generador de tatuajes IA',
      aiTattooGeneratorDesc: 'Crea diseños únicos a partir de tus ideas',
      coverUpAssistant: 'Asistente de cobertura',
      coverUpAssistantDesc: 'Transforma tatuajes existentes en arte nuevo',
      artistTools: 'Herramientas de artista',
      artistToolsDesc:
        'Muestra a los clientes diseños en su cuerpo al instante',
      precisePlacement: 'Ubicación precisa',
      precisePlacementDesc:
        'Tamaño perfecto para tu tatuaje en {{location}}',
      styleMatchedDesigns: 'Diseños según tu estilo',
      styleMatchedDesignsDesc:
        'Inspiración de tatuajes {{style}} seleccionada',
      readyWhenYouAre: 'Listo cuando tú lo estés',
      readyWhenYouAreDesc: 'Empieza a diseñar hoy, tatúate mañana',
      realisticTryOn: 'Prueba realista',
      realisticTryOnDesc: 'Ve exactamente cómo se verá en ti',
      saveAndShare: 'Guardar y compartir',
      saveAndShareDesc:
        'Guarda tus favoritos y compártelos con tu artista',
      aiDesignStudio: 'Estudio de diseño IA',
      aiDesignStudioDesc: 'Genera diseños de tatuajes únicos al instante',

      // Personalized greetings
      greetingArtist: 'Tu nueva herramienta de experiencia para clientes está lista',
      greetingCoverUp: 'Listo para transformar tu tatuaje',
      greetingGenerate: 'Tu estudio de diseño IA te espera',
      greetingDefault: 'Tu viaje de tatuaje comienza ahora',
      welcomeAboard: '¡Bienvenido a bordo, {{name}}!',
      welcomeName: 'Bienvenido {{name}}',

      // Urgency messages
      urgencyArtist: 'Muestra a los clientes previsualizaciones reales al instante.',
      urgencyCoverUp: 'Renueva tu tatuaje con confianza.',
      urgencyTryOn: 'Prueba tu tatuaje antes de comprometerte.',
      urgencyDefault: 'Diseños ilimitados. Cero arrepentimientos.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Continuar',
    restorePurchase: 'Restaurar compra',
    current: 'ACTUAL',

    // Plan terms
    week: 'Semana',
    month: 'Mes',
    weekly: 'Semanal',
    monthly: 'Mensual',
    perWeek: '/Semana',

    // Content
    loadingPlans: 'Cargando planes\u2026',
    restoreSubscription: 'Restaurar suscripción',
    fairUseNote: 'La generación de diseños IA incluye límites de uso justo.',
    saveBadge: 'Ahorra {{percent}}%',
    subtitle:
      'Explora ideas de tatuajes, refina diseños con variaciones infinitas, pruébalos en cualquier parte del cuerpo y exporta resultados de alta calidad con confianza.',

    // Personalized headlines
    headlineArtist: 'Muestra a los clientes su tatuaje antes de tatuar',
    headlineCoverUp: 'Transforma tu tatuaje con confianza',
    headlineTryOn: 'Ve tu tatuaje antes de comprometerte',
    headlineDesign: 'Diseña el tatuaje que siempre quisiste',
    headlineBrowse: 'Encuentra tu diseño de tatuaje perfecto',

    // Purchase flow alerts
    successTitle: '¡Éxito!',
    subscriptionActiveMessage:
      '¡Tu suscripción ya está activa. Disfruta de diseños de tatuajes ilimitados!',
    almostThereTitle: '¡Casi listo!',
    createAccountMessage:
      'Crea una cuenta para activar tu suscripción y empezar a diseñar.',
    purchaseRestoredTitle: '¡Compra restaurada!',
    subscriptionNowActive: 'Tu suscripción ya está activa.',
    purchaseFoundTitle: '¡Compra encontrada!',
    purchasesRestoredMessage: 'Tus compras han sido restauradas.',
    noPurchasesFoundTitle: 'No se encontraron compras',
    noPurchasesFoundMessage:
      'No se encontraron compras anteriores para restaurar.',
    purchaseFailedTitle: 'Compra fallida',
    purchaseFailedMessage:
      'No se pudo completar la compra. Inténtalo de nuevo.',
    errorRestoringTitle: 'Error al restaurar compras',
    errorRestoringMessage:
      'No se pudieron restaurar las compras. Inténtalo de nuevo.',
    subscriptionActivated: '¡Suscripción activada!',

    // Alerts
    purchaseError: 'Error de compra',
    restoreSuccess: 'Compra restaurada',
    restoreError: 'Error al restaurar',
    noPurchaseFound: 'No se encontró compra anterior',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Cancelar generación',
    cancelGenerationTitle: '¿Cancelar generación?',
    cancelGenerationMessage:
      'Estás a punto de cancelar la generación actual. Esto eliminará la generación actual e iniciará una nueva sesión.',
    clearEverythingTitle: '¿Borrar todo?',
    clearEverythingMessage:
      'Estás a punto de borrar esta sesión. Esto eliminará todos los tatuajes generados. Guarda lo que quieras conservar antes de continuar.',
    clearEverything: 'Borrar todo',

    // Input
    enterText: 'Introducir texto',
    describeTattoo: 'Describe tu tatuaje o elige una sugerencia abajo',

    // Try on alert
    tryOnTitle: 'Probar {{style}}',
    tryOnMessage:
      '¡Toma una foto de tu cuerpo para ver cómo se ve este tatuaje en ti!',
    choosePhoto: 'Elegir foto',
    later: 'Después',

    // Preview on body
    previewOnBody: 'Previsualizar tatuaje en el cuerpo',
    imageSelectedCombine: '1 imagen seleccionada – agrega una más para combinar',

    // Suggestions
    createTattoo: 'Crear un tatuaje {{title}}',
    createStyleTattoo: 'Crear un tatuaje estilo {{title}}',
    tryStyle: 'Probar estilo {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Actualizando tu tatuaje...',
      startingNew: 'Iniciando nuevo tatuaje...',
      warmingUp: 'La máquina de tatuar se está calentando...',
      summoningSpirits: 'Invocando los espíritus de la tinta...',
      drawingInspiration: 'Buscando inspiración en el universo...',
      brewingMasterpiece: 'Tu obra maestra casi está lista...',
      sprinkleCreativity: 'Añadiendo una pizca de creatividad...',
      perfectingPixels: 'Perfeccionando cada píxel de tu tatuaje...',
      injectingCreativity: 'Inyectando creatividad en tu piel...',
      mixingShade: 'Mezclando el tono perfecto...',
      sharpeningNeedles: 'Afilando agujas virtuales...',
      calibratingVibes: 'Calibrando tus vibras de tatuaje...',
      consultingOracle: 'Consultando el oráculo del tatuaje...',
    },

    // Error states
    error: {
      keepCreating: 'Sigue creando sin límites',
      limitReachedFree:
        'Has alcanzado tu límite de generación actual. Mejora ahora para explorar variaciones, refinar diseños y seguir creando sin esperar.',
      unlockUnlimited: 'Desbloquea diseños ilimitados \u2192',
      limitReachedSubscribed:
        'Has alcanzado tu límite para este período',
      limitReachedSubscribedDesc:
        'Se ha alcanzado el límite de generación de tu plan. Tu límite se restablecerá al inicio de tu próximo período de facturación.',
      tryAgainLater: 'Intentar más tarde',
      contactSupport: 'Contactar soporte',
    },

    // Session history actions
    actions: 'Acciones',
    saveToGallery: 'Guardar en galería',

    // Result image actions
    imageActions: 'Acciones de imagen',
    copyToClipboard: 'Copiar al portapapeles',
    imageCopied: 'Imagen copiada al portapapeles',
    imageCopyFailed: 'Error al copiar la imagen',
    imageSaved: '¡Imagen guardada en la galería!',
    imageSaveFailed: 'Error al guardar la imagen. Inténtalo de nuevo.',

    // Context alerts
    photoAccessTitle: 'Se necesita acceso a las fotos',
    photoAccessMessage:
      'Para guardar imágenes en tu galería, necesitamos acceso a tus fotos. Puedes activarlo en Ajustes.',
    resetSessionTitle: '¿Restablecer sesión?',
    resetSessionMessage:
      '¿Estás seguro de que quieres restablecer la sesión? Esto borrará todos los tatuajes generados e iniciará una nueva sesión.',
    resetButton: 'Restablecer',
    shareError: 'Error al compartir la imagen',
    imageDataError: 'Error al obtener los datos de la imagen',
    pickImageError: 'Error al seleccionar la imagen de la galería',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Imagen no encontrada',
    useTattoo: 'Usar tatuaje',
    useTattooError: 'No se pudo usar este tatuaje. Inténtalo de nuevo.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Todas las fotos',
    addPhotos: 'Agregar {{count}} foto',
    addPhotos_other: 'Agregar {{count}} fotos',
    recentPhotos: 'Fotos recientes',
    selectOneMore: 'Selecciona 1 más para combinar',

    // Options
    tryOn: 'Probar',
    tryOnDescriptionWithTattoo:
      'Agrega una foto de tu cuerpo para previsualizar',
    tryOnDescriptionNoTattoo:
      'Selecciona un tatuaje primero, luego agrega tu foto',
    createNewTattoo: 'Crear nuevo tatuaje',
    createNewTattooDescription:
      'Describe tu idea de tatuaje y lo generaremos',
    tattooCoverUp: 'Idea de cobertura de tatuaje',
    tattooCoverUpDescription:
      'Genera una idea para cubrir un tatuaje existente usando una foto como referencia',
    removeTattoo: 'Eliminar tatuaje',
    removeTattooDescription:
      'Eliminar un tatuaje existente de la foto',
    promptHistory: 'Historial de prompts',
    promptHistoryDescription: 'Ver tus prompts anteriores',
    requestFeature: 'Sugerir una función',
    requestFeatureDescription:
      'Dinos qué te gustaría que Tattoo Design AI soporte a continuación',

    // Try on alerts
    addYourPhoto: 'Agrega tu foto',
    addPhotoQuestion:
      '¿Cómo te gustaría agregar una foto de donde quieres el tatuaje?',
    takePhoto: 'Tomar foto',
    chooseFromLibrary: 'Elegir de la biblioteca',
    createTattooFirst: 'Crea un tatuaje primero',
    createTattooFirstMessage:
      'Para probar un tatuaje, necesitas:\n\n1. Generar o seleccionar un diseño de tatuaje\n2. Luego agregar una foto de tu cuerpo\n\n¡Los combinaremos para mostrarte cómo se ve!',
    createTattoo: 'Crear tatuaje',
  },

  tattoos: {
    // Screen header
    title: 'Mis tatuajes',

    // Loading
    loading: 'Cargando tatuajes...',

    // Empty state
    emptyTitle: 'Aún no hay tatuajes guardados',
    emptyDescription:
      '¡Crea y guarda tu primer diseño de tatuaje! Desliza hacia abajo para actualizar.',

    // Cloud restore
    restoringFromCloud: 'Restaurando desde la nube...',
    noCloudGenerations: 'No se encontraron generaciones en la nube',
    restoredCount: '{{restored}} de {{total}} tatuajes restaurados',
    restoreFailedTitle: 'Error al restaurar',
    restoreFailedMessage:
      'No se pudo restaurar desde la nube. Inténtalo de nuevo.',
    cloudFound: '{{count}} tatuaje encontrado en la nube',
    cloudFound_other: '{{count}} tatuajes encontrados en la nube',
    restoring: 'Restaurando...',
    restore: 'Restaurar',
    cloudCount: '{{count}} en la nube',

    // Detail screen
    tattooNotFound: 'Tatuaje no encontrado',
    backToHome: 'Volver al inicio',
    shareError: 'No se pudo compartir la imagen. Inténtalo de nuevo.',
    imageAccessError: 'No se puede acceder al archivo de imagen.',
    deleteTitle: 'Eliminar tatuaje',
    deleteMessage:
      '¿Estás seguro de que quieres eliminar este diseño? Esta acción no se puede deshacer.',
    deleteError: 'No se pudo eliminar la imagen. Inténtalo de nuevo.',
  },

  generation: {
    // Loading
    applyingDesign: 'Aplicando tu diseño de tatuaje...',

    // Error
    invalidRequest: 'Solicitud inválida',
    generationFailed: 'Error en la generación',
    failedToGenerate: 'No se pudo generar el diseño del tatuaje',
    startOver: 'Empezar de nuevo',

    // Success
    tattooReady: '¡Tu tatuaje está listo!',
    tattooReadyDescription:
      'Así se vería tu diseño aplicado',
    saveToGallery: 'Guardar en galería',
    generateAnother: 'Generar otro',

    // Save alerts
    savedTitle: '¡Guardado!',
    savedMessage:
      'Tu diseño de tatuaje ha sido guardado en tu galería de fotos.',
    viewInGallery: 'Ver en la galería',

    // Generate another alert
    generateAnotherTitle: '¿Generar otro?',
    generateAnotherMessage:
      'Aún no has guardado este tatuaje. ¿Te gustaría guardarlo antes de continuar?',
    continueWithoutSaving: 'Continuar sin guardar',
    saveAndContinue: 'Guardar y continuar',

    // Cancel alert
    cancelGenerationTitle: '¿Cancelar generación?',
    cancelGenerationMessage:
      'Tu tatuaje todavía se está generando. Si cancelas ahora, esta generación contará en tu límite de uso. ¿Estás seguro?',
    keepGenerating: 'Seguir generando',
    unableToSave: 'No se pudo guardar la imagen. Inténtalo de nuevo.',
  },

  home: {
    // Section headers
    discoverStyles: 'Descubre nuevos estilos',
    moreStyles: 'Más estilos',
    moods: 'Estados de ánimo',
    discoverSketches: 'Descubre diseños de bocetos',

    // Quick actions
    generateFromIdea: 'Generar desde una idea',
    generateFromIdeaDesc: 'Crea un tatuaje a partir de tu imaginación',
    seeItOnSkin: 'Vélo en tu piel',
    seeItOnSkinDesc: 'Toma una foto y previsualiza el tatuaje',
    blendTattoo: 'Fusionar tatuaje',
    blendTattooDesc: 'Sube un tatuaje existente y modifícalo',
    removeTattoo: 'Eliminar tatuaje',
    removeTattooDesc: 'Elimina un tatuaje existente de la piel',
  },

  explore: {
    // Section headers
    byStyles: 'Explorar por estilos',
    byMoods: 'Explorar por estados de ánimo',
    byBodyPart: 'Explorar por parte del cuerpo',

    // Filter labels
    styles: 'Estilos',
    bodyPart: 'Parte del cuerpo',
  },

  featureRequest: {
    title: 'Comparte tus ideas',
    placeholder: 'Ideas para mejorar tu experiencia...',
    needHelp: '¿Necesitas ayuda? ',
    contactUs: 'Contáctanos',
    successToast:
      '¡Sugerencia enviada! Gracias por tu comentario.',
    errorToast:
      'Error al enviar la sugerencia. Inténtalo de nuevo.',
  },

  promptHistory: {
    title: 'Historial de prompts',
    clearAll: 'Borrar todo',
    clearAllTitle: 'Borrar historial de prompts',
    clearAllMessage:
      '¿Estás seguro de que quieres eliminar todos los prompts guardados?',
    deletePromptTitle: 'Eliminar prompt',
    deletePromptMessage: '¿Eliminar este prompt del historial?',
    emptyTitle: 'Aún no hay prompts',
    emptyDescription:
      'Tus prompts aparecerán aquí después de generar un tatuaje',
  },
};
