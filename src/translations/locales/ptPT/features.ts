/**
 * European Portuguese translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const ptPTFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Visualize a sua tatuagem antes de se comprometer.',
    whatsYourName: 'Como se chama?',
    namePlaceholder: 'O seu nome',
    nameDescription: 'Vamos usar isto para personalizar a sua experiencia.',
    welcome: 'Bem-vindo',
    welcomeDescription:
      'Vamos personalizar a sua experiencia no Tattoo Design AI agora.',
    describeYou: 'O que melhor \n o descreve?',
    describeYouDescription:
      'Isto ajuda-nos a personalizar a experiencia com base na sua relacao com tatuagens',
    whatToDo: 'O que gostaria\n de fazer?',
    whatToDoDescription:
      'Isto ajuda-nos a perceber como quer explorar tatuagens e que ferramentas seriam mais uteis para si.',
    designTattoo: 'Desenhe a \n tatuagem que quer',
    designTattooDescription:
      'Escreva algumas palavras ou carregue uma imagem e gere designs de tatuagens unicos instantaneamente.',
    whereTattoo: 'Onde quer\n a tatuagem?',
    whereTattooDescription:
      'A localizacao afeta o design, tamanho e fluidez, o que nos ajuda a adaptar ideias ao seu corpo.',
    pickStyles: 'Escolha ate 5 \n estilos que goste',
    pickStylesDescription:
      'As suas escolhas de estilo ajudam-nos a encontrar designs que combinam com o seu gosto.',
    whenTattoo: 'Quando esta a pensar\n fazer a tatuagem?',
    whenTattooDescription:
      'Isto ajuda-nos a adaptar\n a experiencia ao seu calendario.',
    whatVibe: 'Que ambiente\n procura?',
    whatVibeDescription:
      'As tatuagens carregam emocoes, isto ajuda-nos a perceber a historia por detras da sua.',
    settingUp: 'A preparar tudo\n para si',
    youreAllSet: 'Esta tudo pronto!',
    youreAllSetDescription: 'Esta tudo pronto para comecar.',

    // CTA
    alreadyHaveAccount: 'Ja tem uma conta? ',
    signIn: 'Iniciar sessao',

    // User description options
    userDescription: {
      artist: 'Eu crio tatuagens',
      client: 'Vou fazer uma tatuagem',
      model: 'Uso tatuagens para conteudo',
      explorer: 'Estou so a explorar',
    },

    // Goal options
    goal: {
      tryOn: 'Experimentar tatuagens nas minhas fotos',
      generate: 'Gerar ideias de tatuagens',
      browse: 'So a ver ou a procurar inspiracao',
      coverUp: 'Cobrir/Reformular uma tatuagem existente',
    },

    // Location options
    location: {
      wrist: 'Pulso',
      chest: 'Peito',
      hand: 'Mao',
      back: 'Costas',
      legs: 'Pernas',
      forearm: 'Antebraco',
      neck: 'Pescoco',
      jaw: 'Queixo',
      forehead: 'Testa',
      knuckles: 'Nos dos dedos',
      fingers: 'Dedos',
      cheek: 'Bochecha',
      shoulder: 'Ombro',
      temple: 'Tempora',
      ribs: 'Costelas',
      abdomen: 'Abdomen',
      face: 'Rosto',
      hips: 'Ancas',
      thigh: 'Coxa',
      tricep: 'Tricep',
      bicep: 'Bicep',
      collarbone: 'Clavicula',
      ankle: 'Tornozelo',
      foot: 'Pe',
      palm: 'Palma',
      notSure: 'Nao tenho a certeza',
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
      geometric: 'Geometrico',
      religious: 'Religioso',
      anime: 'Anime',
      fineLine: 'Linha fina',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Caligrafia',
      portrait: 'Retrato',
      floral: 'Floral',
      polynesian: 'Polinesio',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gotico',
      patchwork: 'Patchwork',
      abstract: 'Abstrato',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologia',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Esta semana',
      thisMonth: 'Este mes',
      oneToThreeMonths: 'Em 1-3 meses',
      someday: 'Um dia, estou so a explorar',
    },

    // Vibe options
    vibe: {
      bold: 'Arrojado',
      confident: 'Confiante',
      soft: 'Suave',
      dark: 'Sombrio',
      edgy: 'Ousado',
      elegant: 'Elegante',
      spiritual: 'Espiritual',
      cute: 'Fofo',
      symbolic: 'Simbolico',
      playful: 'Divertido',
      clean: 'Limpo',
      modern: 'Moderno',
      meaningful: 'Significativo',
      personalStory: 'Historia pessoal',
      family: 'Familia',
      love: 'Amor',
      memory: 'Memoria',
      rebirth: 'Renascimento',
      freedom: 'Liberdade',
      mystical: 'Mistico',
      rebellious: 'Rebelde',
      serene: 'Sereno',
      empowered: 'Empoderado',
      ethereal: 'Etereo',
      fearless: 'Destemido',
      wanderlust: 'Wanderlust',
      transcendent: 'Transcendente',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'A compreender a visao de {{name}}',
      understandingVisionDefault: 'A compreender a sua visao',
      tailoringDesigns: 'A adaptar designs ao seu estilo',
      settingUpCoverUp: 'A configurar ferramentas de cobertura',
      personalizingExperience: 'A personalizar a sua experiencia',
      preparingStudio: 'A preparar o seu estudio de design',
      configuringWorkspace: 'A configurar o seu espaco de trabalho',
      applyingPreferences: 'A aplicar as suas preferencias',
      journeyStartsNow: 'A sua jornada de tatuagem comeca agora',
    },

    // Reviews
    reviews: {
      review1Title: 'Aplicacao fantastica!',
      review1Body:
        'A aplicacao funciona, e tem um aspeto e sensacao otimos! Impressionado com a qualidade da aplicacao da tatuagem, tendo em conta a iluminacao e sombreamento com precisao.',
      review1Author: 'Jacob C.',
      review2Title: 'Realmente util',
      review2Body:
        'Os designs de tatuagens sao limpos e detalhados. Algumas imagens demoram um pouco mais a gerar, mas no geral e uma das melhores aplicacoes de tatuagens com IA que existem.',
      review2Author: 'Alexrays1',
      review3Title: 'Adoro isto',
      review3Body: 'Altamente recomendado \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Gere tatuagens instantaneamente',
    containerDesc1:
      'Escreva algumas palavras e gere designs de tatuagens unicos instantaneamente.',
    containerTitle2: 'Personalize o seu design',
    containerDesc2:
      'Ajuste cores, disposicao e estilo para tornar a tatuagem perfeita para si.',
    containerTitle3: 'Visualize na sua pele',
    containerDesc3:
      'Visualize qualquer tatuagem na sua pele — ajuste o tamanho e posicao instantaneamente.',
    paused: 'Pausado',

    // Relative time
    time: {
      today: 'Hoje',
      yesterday: 'Ontem',
      daysAgo: 'Ha {{count}} dias',
      weeksAgo: 'Ha {{count}} semanas',
      monthsAgo: 'Ha {{count}} meses',
      yearsAgo: 'Ha {{count}} anos',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Tecnologia de experimentacao',
      tryOnTechnologyDesc:
        'Veja tatuagens na sua pele antes de se comprometer',
      aiTattooGenerator: 'Gerador de tatuagens com IA',
      aiTattooGeneratorDesc: 'Crie designs unicos a partir das suas ideias',
      coverUpAssistant: 'Assistente de cobertura',
      coverUpAssistantDesc: 'Transforme tatuagens existentes em nova arte',
      artistTools: 'Ferramentas para artistas',
      artistToolsDesc:
        'Mostre designs aos clientes no corpo deles instantaneamente',
      precisePlacement: 'Posicionamento preciso',
      precisePlacementDesc:
        'Tamanho perfeito para a sua tatuagem no {{location}}',
      styleMatchedDesigns: 'Designs adaptados ao estilo',
      styleMatchedDesignsDesc:
        'Inspiracao curada de tatuagens {{style}}',
      readyWhenYouAre: 'Pronto quando estiver',
      readyWhenYouAreDesc: 'Comece a desenhar hoje, tatue amanha',
      realisticTryOn: 'Experimentacao realista',
      realisticTryOnDesc: 'Veja exatamente como ficara em si',
      saveAndShare: 'Guardar e partilhar',
      saveAndShareDesc:
        'Guarde os seus favoritos e partilhe com o seu tatuador',
      aiDesignStudio: 'Estudio de design com IA',
      aiDesignStudioDesc: 'Gere designs de tatuagens unicos instantaneamente',

      // Personalized greetings
      greetingArtist:
        'A sua nova ferramenta de experiencia para clientes esta pronta',
      greetingCoverUp: 'Pronto para transformar a sua tatuagem',
      greetingGenerate: 'O seu estudio de design com IA aguarda',
      greetingDefault: 'A sua jornada de tatuagem comeca agora',
      welcomeAboard: 'Bem-vindo a bordo, {{name}}!',
      welcomeName: 'Bem-vindo {{name}}',

      // Urgency messages
      urgencyArtist: 'Mostre aos clientes pre-visualizacoes reais instantaneamente.',
      urgencyCoverUp: 'Corrija a sua tatuagem com confianca.',
      urgencyTryOn: 'Experimente a sua tatuagem antes de se comprometer.',
      urgencyDefault: 'Designs ilimitados. Zero arrependimentos.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Continuar',
    restorePurchase: 'Restaurar compra',
    current: 'ATUAL',

    // Plan terms
    week: 'Semana',
    month: 'Mes',
    weekly: 'Semanal',
    perWeek: '/Semana',

    // Content
    loadingPlans: 'A carregar planos...',
    restoreSubscription: 'Restaurar subscricao',
    fairUseNote: 'A geracao de designs com IA inclui limites de utilizacao justa.',
    saveBadge: 'Poupe {{percent}}%',
    subtitle:
      'Explore ideias de tatuagens, refine designs atraves de variacoes infinitas, experimente-os em qualquer parte do corpo e exporte resultados de alta qualidade com confianca.',

    // Personalized headlines
    headlineArtist: 'Mostre aos clientes a tatuagem antes de tatuar',
    headlineCoverUp: 'Transforme a sua tatuagem com confianca',
    headlineTryOn: 'Veja a sua tatuagem antes de se comprometer',
    headlineDesign: 'Desenhe a tatuagem que sempre quis',
    headlineBrowse: 'Encontre o design de tatuagem perfeito',

    // Purchase flow alerts
    successTitle: 'Sucesso!',
    subscriptionActiveMessage:
      'A sua subscricao esta agora ativa. Desfrute de designs de tatuagens ilimitados!',
    almostThereTitle: 'Quase la!',
    createAccountMessage:
      'Crie uma conta para ativar a sua subscricao e comecar a desenhar.',
    purchaseRestoredTitle: 'Compra restaurada!',
    subscriptionNowActive: 'A sua subscricao esta agora ativa.',
    purchaseFoundTitle: 'Compra encontrada!',
    purchasesRestoredMessage: 'As suas compras foram restauradas.',
    noPurchasesFoundTitle: 'Nenhuma compra encontrada',
    noPurchasesFoundMessage:
      'Nao foram encontradas compras anteriores para restaurar.',
    purchaseFailedTitle: 'Compra falhada',
    purchaseFailedMessage:
      'Nao foi possivel concluir a compra. Por favor, tente novamente.',
    errorRestoringTitle: 'Erro ao restaurar compras',
    errorRestoringMessage:
      'Nao foi possivel restaurar as compras. Por favor, tente novamente.',
    subscriptionActivated: 'Subscricao ativada!',

    // Alerts
    purchaseError: 'Erro na compra',
    restoreSuccess: 'Compra restaurada',
    restoreError: 'Restauro falhado',
    noPurchaseFound: 'Nenhuma compra anterior encontrada',

    // Pricing overhaul
    annual: 'Anual',
    year: 'Ano',
    perYear: '/Ano',
    freeTrialBadge: 'TESTE GRATUITO DE {{days}} DIAS',
    startTrialButton: 'Iniciar teste gratuito de {{days}} dias',
    specialOffer: 'Oferta Especial',
    limitedTimeOffer: 'Oferta por Tempo Limitado',
    discountSubtitle: 'Apenas novos utilizadores — desbloqueie acesso completo hoje',
    savePercent: 'Poupe {{percent}}%',
    annualPerWeek: '{{price}}/semana',
    todayOnly: 'Só Hoje',
    offerExpires: 'A oferta expira em',
    perWeekBilled: 'por semana, faturado {{period}}',
    originalPrice: 'Era {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Cancelar geracao',
    cancelGenerationTitle: 'Cancelar geracao?',
    cancelGenerationMessage:
      'Esta prestes a cancelar a geracao atual. Isto ira remover a geracao atual e iniciar uma nova sessao.',
    clearEverythingTitle: 'Limpar tudo?',
    clearEverythingMessage:
      'Esta prestes a limpar esta sessao. Isto ira remover todas as tatuagens geradas. Guarde o que pretender manter antes de continuar.',
    clearEverything: 'Limpar tudo',

    // Input
    enterText: 'Introduzir texto',
    describeTattoo:
      'Descreva a sua tatuagem ou escolha uma sugestao abaixo',

    // Try on alert
    tryOnTitle: 'Experimentar {{style}}',
    tryOnMessage:
      'Tire uma fotografia da parte do corpo para ver como esta tatuagem fica em si!',
    choosePhoto: 'Escolher fotografia',
    later: 'Mais tarde',

    // Preview on body
    previewOnBody: 'Pre-visualizar tatuagem no corpo',
    imageSelectedCombine:
      '1 imagem selecionada - adicione mais uma para combinar',

    // Suggestions
    createTattoo: 'Criar uma tatuagem {{title}}',
    createStyleTattoo: 'Criar uma tatuagem estilo {{title}}',
    tryStyle: 'Experimentar estilo {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'A atualizar a sua tatuagem...',
      startingNew: 'A iniciar nova tatuagem...',
      warmingUp: 'A aquecer a maquina de tatuar...',
      summoningSpirits: 'A invocar os espiritos da tinta...',
      drawingInspiration: 'A buscar inspiracao no universo...',
      brewingMasterpiece: 'Quase pronto a criar a sua obra-prima...',
      sprinkleCreativity: 'A adicionar um toque de criatividade...',
      perfectingPixels: 'A aperfeicoar cada pixel da sua tatuagem...',
      injectingCreativity: 'A injetar criatividade na sua pele...',
      mixingShade: 'A misturar o tom perfeito de genialidade...',
      sharpeningNeedles: 'A afiar agulhas virtuais...',
      calibratingVibes: 'A calibrar as vibes da sua tatuagem...',
      consultingOracle: 'A consultar o oraculo das tatuagens...',
    },

    // Error states
    error: {
      keepCreating: 'Continue a criar sem limites',
      limitReachedFree:
        'Atingiu o seu limite de geracao atual. Atualize agora para explorar variacoes, refinar designs e continuar a criar sem esperar.',
      unlockUnlimited: 'Desbloquear designs ilimitados \u2192',
      limitReachedSubscribed:
        'Atingiu o seu limite para este periodo',
      limitReachedSubscribedDesc:
        'O limite de geracao do seu plano foi atingido. O seu limite sera reposto no inicio do proximo periodo de faturacao.',
      tryAgainLater: 'Tente novamente mais tarde',
      contactSupport: 'Contactar suporte',
    },

    // Session history actions
    actions: 'Acoes',
    saveToGallery: 'Guardar na galeria',

    // Result image actions
    imageActions: 'Acoes de imagem',
    copyToClipboard: 'Copiar para a area de transferencia',
    imageCopied: 'Imagem copiada para a area de transferencia',
    imageCopyFailed: 'Falha ao copiar imagem',
    imageSaved: 'Imagem guardada na galeria!',
    imageSaveFailed:
      'Falha ao guardar imagem. Por favor, tente novamente.',

    // Context alerts
    photoAccessTitle: 'Acesso a fotos necessario',
    photoAccessMessage:
      'Para guardar imagens na sua galeria, precisamos de acesso as suas fotos. Pode ativar isto nas Definicoes.',
    resetSessionTitle: 'Reiniciar sessao?',
    resetSessionMessage:
      'Tem a certeza de que pretende reiniciar a sessao? Isto ira limpar todas as tatuagens geradas e iniciar uma nova sessao.',
    resetButton: 'Reiniciar',
    shareError: 'Falha ao partilhar imagem',
    imageDataError: 'Falha ao obter dados da imagem',
    pickImageError: 'Falha ao selecionar imagem da galeria',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Imagem nao encontrada',
    useTattoo: 'Usar tatuagem',
    useTattooError:
      'Falha ao usar esta tatuagem. Por favor, tente novamente.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Todas as fotos',
    addPhotos: 'Adicionar {{count}} foto',
    addPhotos_other: 'Adicionar {{count}} fotos',
    recentPhotos: 'Fotos recentes',
    selectOneMore: 'Selecione mais 1 para combinar',

    // Options
    tryOn: 'Experimentar',
    tryOnDescriptionWithTattoo:
      'Adicione uma foto do seu corpo para pre-visualizar',
    tryOnDescriptionNoTattoo:
      'Selecione primeiro uma tatuagem, depois adicione a sua foto',
    createNewTattoo: 'Criar nova tatuagem',
    createNewTattooDescription:
      'Descreva a sua ideia de tatuagem e nos geramos-la',
    tattooCoverUp: 'Ideia de cobertura de tatuagem',
    tattooCoverUpDescription:
      'Gere uma ideia para cobrir uma tatuagem existente usando uma foto como referencia',
    removeTattoo: 'Remover tatuagem',
    removeTattooDescription:
      'Remover uma tatuagem existente da foto',
    promptHistory: 'Historico de prompts',
    promptHistoryDescription: 'Ver os seus prompts anteriores',
    requestFeature: 'Pedir uma funcionalidade',
    requestFeatureDescription:
      'Diga-nos o que gostaria que o Tattoo Design AI suportasse a seguir',

    // Try on alerts
    addYourPhoto: 'Adicione a sua foto',
    addPhotoQuestion:
      'Como gostaria de adicionar uma foto de onde quer a tatuagem?',
    takePhoto: 'Tirar fotografia',
    chooseFromLibrary: 'Escolher da biblioteca',
    createTattooFirst: 'Crie primeiro uma tatuagem',
    createTattooFirstMessage:
      'Para experimentar uma tatuagem, precisa de:\n\n1. Gerar ou selecionar um design de tatuagem\n2. Depois adicionar uma foto do seu corpo\n\nVamos combina-los para mostrar como fica!',
    createTattoo: 'Criar tatuagem',
  },

  tattoos: {
    // Screen header
    title: 'As minhas tatuagens',

    // Loading
    loading: 'A carregar tatuagens...',

    // Empty state
    emptyTitle: 'Ainda sem tatuagens guardadas',
    emptyDescription:
      'Crie e guarde o seu primeiro design de tatuagem! Deslize para baixo para atualizar.',

    // Cloud restore
    restoringFromCloud: 'A restaurar da nuvem...',
    noCloudGenerations: 'Nenhuma geracao encontrada na nuvem',
    restoredCount: 'Restauradas {{restored}} de {{total}} tatuagens',
    restoreFailedTitle: 'Restauro falhado',
    restoreFailedMessage:
      'Nao foi possivel restaurar da nuvem. Por favor, tente novamente.',
    cloudFound: '{{count}} tatuagem encontrada na nuvem',
    cloudFound_other: '{{count}} tatuagens encontradas na nuvem',
    restoring: 'A restaurar...',
    restore: 'Restaurar',
    cloudCount: '{{count}} na nuvem',

    // Detail screen
    tattooNotFound: 'Tatuagem nao encontrada',
    backToHome: 'Voltar ao inicio',
    shareError:
      'Nao foi possivel partilhar a imagem. Por favor, tente novamente.',
    imageAccessError: 'Nao foi possivel aceder ao ficheiro de imagem.',
    deleteTitle: 'Eliminar tatuagem',
    deleteMessage:
      'Tem a certeza de que pretende eliminar este design de tatuagem? Esta acao nao pode ser revertida.',
    deleteError:
      'Nao foi possivel eliminar a imagem. Por favor, tente novamente.',
  },

  generation: {
    // Loading
    applyingDesign: 'A aplicar o seu design de tatuagem...',

    // Error
    invalidRequest: 'Pedido invalido',
    generationFailed: 'Geracao falhada',
    failedToGenerate: 'Falha ao gerar design de tatuagem',
    startOver: 'Recomecar',

    // Success
    tattooReady: 'A sua tatuagem esta pronta!',
    tattooReadyDescription:
      'E assim que o seu design ficaria aplicado',
    saveToGallery: 'Guardar na galeria',
    generateAnother: 'Gerar outra',

    // Save alerts
    savedTitle: 'Guardado!',
    savedMessage:
      'O seu design de tatuagem foi guardado na sua galeria de fotos.',
    viewInGallery: 'Ver na galeria',

    // Generate another alert
    generateAnotherTitle: 'Gerar outra?',
    generateAnotherMessage:
      'Ainda nao guardou esta tatuagem. Gostaria de a guardar antes de continuar?',
    continueWithoutSaving: 'Continuar sem guardar',
    saveAndContinue: 'Guardar e continuar',

    // Cancel alert
    cancelGenerationTitle: 'Cancelar geracao?',
    cancelGenerationMessage:
      'A sua tatuagem ainda esta a ser gerada. Se cancelar agora, esta geracao continuara a contar para o seu limite de utilizacao. Tem a certeza de que pretende cancelar?',
    keepGenerating: 'Continuar a gerar',
    unableToSave:
      'Nao foi possivel guardar a imagem. Por favor, tente novamente.',
  },

  home: {
    // Section headers
    discoverStyles: 'Descubra novos estilos',
    moreStyles: 'Mais estilos',
    moods: 'Ambientes',
    discoverSketches: 'Descubra designs de esbocos',

    // Quick actions
    generateFromIdea: 'Gerar a partir de uma ideia',
    generateFromIdeaDesc: 'Crie uma tatuagem a partir da sua imaginacao',
    seeItOnSkin: 'Veja na sua pele',
    seeItOnSkinDesc: 'Tire uma fotografia e pre-visualize a tatuagem',
    blendTattoo: 'Misturar tatuagem',
    blendTattooDesc: 'Carregue uma tatuagem existente e modifique-a',
    removeTattoo: 'Remover tatuagem',
    removeTattooDesc: 'Remova uma tatuagem existente da pele',
  },

  explore: {
    // Section headers
    byStyles: 'Explorar por estilos',
    byMoods: 'Explorar por ambientes',
    byBodyPart: 'Explorar por parte do corpo',

    // Filter labels
    styles: 'Estilos',
    bodyPart: 'Parte do corpo',
  },

  featureRequest: {
    title: 'Partilhe as suas ideias',
    placeholder: 'Ideias para melhorar a sua experiencia...',
    needHelp: 'Precisa de ajuda? ',
    contactUs: 'Contacte-nos',
    successToast:
      'Pedido de funcionalidade enviado! Obrigado pelo seu feedback.',
    errorToast:
      'Falha ao enviar pedido de funcionalidade. Por favor, tente novamente.',
  },

  promptHistory: {
    title: 'Historico de prompts',
    clearAll: 'Limpar tudo',
    clearAllTitle: 'Limpar historico de prompts',
    clearAllMessage:
      'Tem a certeza de que pretende eliminar todos os prompts guardados?',
    deletePromptTitle: 'Eliminar prompt',
    deletePromptMessage: 'Remover este prompt do historico?',
    emptyTitle: 'Ainda sem prompts',
    emptyDescription:
      'Os seus prompts aparecerao aqui depois de gerar uma tatuagem',
  },
};
