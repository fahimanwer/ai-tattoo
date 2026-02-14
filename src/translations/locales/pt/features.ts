/**
 * Portuguese (Brazil) translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const ptFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Visualize sua tatuagem antes de se comprometer.',
    whatsYourName: 'Qual é o seu nome?',
    namePlaceholder: 'Seu nome',
    nameDescription: 'Usaremos isso para personalizar sua experiência.',
    welcome: 'Bem-vindo',
    welcomeDescription: 'Vamos personalizar sua experiência no Tattoo Design AI agora.',
    describeYou: 'O que melhor \n te descreve?',
    describeYouDescription:
      'Isso nos ajuda a personalizar a experiência com base na sua relação com tatuagens',
    whatToDo: 'O que você\n gostaria de fazer?',
    whatToDoDescription:
      'Isso nos ajuda a entender como você quer explorar tatuagens e quais ferramentas seriam mais úteis para você.',
    designTattoo: 'Crie a \n tatuagem que você quer',
    designTattooDescription:
      'Digite algumas palavras ou envie uma imagem e gere designs de tatuagem únicos instantaneamente.',
    whereTattoo: 'Onde você quer\n a tatuagem?',
    whereTattooDescription:
      'A localização afeta o design, o tamanho e o fluxo, o que nos ajuda a adaptar as ideias ao seu corpo.',
    pickStyles: 'Escolha até 5 \n estilos que você gosta',
    pickStylesDescription:
      'Suas escolhas de estilo nos ajudam a encontrar designs que combinam com seu gosto.',
    whenTattoo: 'Quando está pensando\n em fazer a tatuagem?',
    whenTattooDescription:
      'Isso nos ajuda a adaptar\n a experiência ao seu cronograma.',
    whatVibe: 'Qual vibe você\n está buscando?',
    whatVibeDescription:
      'Tatuagens carregam emoções - isso nos ajuda a entender a história por trás da sua.',
    settingUp: 'Estamos preparando\n tudo para você',
    youreAllSet: 'Tudo pronto!',
    youreAllSetDescription: 'Você está pronto para começar.',

    // CTA
    alreadyHaveAccount: 'Já tem uma conta? ',
    signIn: 'Entrar',

    // User description options
    userDescription: {
      artist: 'Eu crio tatuagens',
      client: 'Vou fazer uma tatuagem',
      model: 'Uso tatuagens para conteúdo',
      explorer: 'Estou apenas explorando',
    },

    // Goal options
    goal: {
      tryOn: 'Experimentar tatuagens nas minhas fotos',
      generate: 'Gerar ideias de tatuagens',
      browse: 'Apenas navegar ou buscar inspiração',
      coverUp: 'Cobrir/Refazer uma tatuagem existente',
    },

    // Location options
    location: {
      wrist: 'Pulso',
      chest: 'Peito',
      hand: 'Mão',
      back: 'Costas',
      legs: 'Pernas',
      forearm: 'Antebraço',
      neck: 'Pescoço',
      jaw: 'Mandíbula',
      forehead: 'Testa',
      knuckles: 'Juntas',
      fingers: 'Dedos',
      cheek: 'Bochecha',
      shoulder: 'Ombro',
      temple: 'Têmpora',
      ribs: 'Costelas',
      abdomen: 'Abdômen',
      face: 'Rosto',
      hips: 'Quadris',
      thigh: 'Coxa',
      tricep: 'Tríceps',
      bicep: 'Bíceps',
      collarbone: 'Clavícula',
      ankle: 'Tornozelo',
      foot: 'Pé',
      palm: 'Palma',
      notSure: 'Não tenho certeza',
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
      calligraphy: 'Caligrafia',
      portrait: 'Retrato',
      floral: 'Floral',
      polynesian: 'Polinésio',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gótico',
      patchwork: 'Patchwork',
      abstract: 'Abstrato',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologia',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Esta semana',
      thisMonth: 'Este mês',
      oneToThreeMonths: 'Em 1-3 meses',
      someday: 'Algum dia, estou apenas explorando',
    },

    // Vibe options
    vibe: {
      bold: 'Ousado',
      confident: 'Confiante',
      soft: 'Suave',
      dark: 'Sombrio',
      edgy: 'Ousado',
      elegant: 'Elegante',
      spiritual: 'Espiritual',
      cute: 'Fofo',
      symbolic: 'Simbólico',
      playful: 'Divertido',
      clean: 'Limpo',
      modern: 'Moderno',
      meaningful: 'Significativo',
      personalStory: 'História pessoal',
      family: 'Família',
      love: 'Amor',
      memory: 'Memória',
      rebirth: 'Renascimento',
      freedom: 'Liberdade',
      mystical: 'Místico',
      rebellious: 'Rebelde',
      serene: 'Sereno',
      empowered: 'Empoderado',
      ethereal: 'Etéreo',
      fearless: 'Destemido',
      wanderlust: 'Wanderlust',
      transcendent: 'Transcendente',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Entendendo a visão de {{name}}',
      understandingVisionDefault: 'Entendendo sua visão',
      tailoringDesigns: 'Adaptando designs ao seu estilo',
      settingUpCoverUp: 'Preparando ferramentas de cobertura',
      personalizingExperience: 'Personalizando sua experiência',
      preparingStudio: 'Preparando seu estúdio de design',
      configuringWorkspace: 'Configurando seu espaço de trabalho',
      applyingPreferences: 'Aplicando suas preferências',
      journeyStartsNow: 'Sua jornada de tatuagem começa agora',
    },

    // Reviews
    reviews: {
      review1Title: 'App incrível!',
      review1Body:
        'O app funciona, é bonito e agradável! Impressionado com a qualidade de aplicação da tatuagem, considerando iluminação e sombras com precisão.',
      review1Author: 'Jacob C.',
      review2Title: 'Realmente útil',
      review2Body:
        'Os designs são limpos e detalhados. Algumas imagens demoram um pouco mais para gerar, mas no geral é um dos melhores apps de tatuagem com IA.',
      review2Author: 'Alexrays1',
      review3Title: 'Eu amo isso',
      review3Body: 'Altamente recomendado \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Gere tatuagens instantaneamente',
    containerDesc1:
      'Digite algumas palavras e gere designs de tatuagem únicos instantaneamente.',
    containerTitle2: 'Personalize seu design',
    containerDesc2:
      'Ajuste cores, layout e estilo para tornar a tatuagem perfeitamente sua.',
    containerTitle3: 'Visualize na sua pele',
    containerDesc3:
      'Visualize qualquer tatuagem na sua pele — ajuste tamanho e posição instantaneamente.',
    paused: 'Pausado',

    // Relative time
    time: {
      today: 'Hoje',
      yesterday: 'Ontem',
      daysAgo: 'Há {{count}} dias',
      weeksAgo: 'Há {{count}} semanas',
      monthsAgo: 'Há {{count}} meses',
      yearsAgo: 'Há {{count}} anos',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Tecnologia de experimentação',
      tryOnTechnologyDesc: 'Veja tatuagens na sua pele antes de se comprometer',
      aiTattooGenerator: 'Gerador de tatuagens IA',
      aiTattooGeneratorDesc: 'Crie designs únicos a partir das suas ideias',
      coverUpAssistant: 'Assistente de cobertura',
      coverUpAssistantDesc: 'Transforme tatuagens existentes em arte nova',
      artistTools: 'Ferramentas de artista',
      artistToolsDesc:
        'Mostre aos clientes designs no corpo deles instantaneamente',
      precisePlacement: 'Posicionamento preciso',
      precisePlacementDesc:
        'Tamanho perfeito para sua tatuagem no {{location}}',
      styleMatchedDesigns: 'Designs no seu estilo',
      styleMatchedDesignsDesc:
        'Inspiração de tatuagem {{style}} selecionada',
      readyWhenYouAre: 'Pronto quando você estiver',
      readyWhenYouAreDesc: 'Comece a projetar hoje, tatue amanhã',
      realisticTryOn: 'Experimentação realista',
      realisticTryOnDesc: 'Veja exatamente como vai ficar em você',
      saveAndShare: 'Salvar e compartilhar',
      saveAndShareDesc:
        'Guarde seus favoritos e compartilhe com seu artista',
      aiDesignStudio: 'Estúdio de design IA',
      aiDesignStudioDesc: 'Gere designs de tatuagem únicos instantaneamente',

      // Personalized greetings
      greetingArtist: 'Sua nova ferramenta de experiência do cliente está pronta',
      greetingCoverUp: 'Pronto para transformar sua tatuagem',
      greetingGenerate: 'Seu estúdio de design IA está esperando',
      greetingDefault: 'Sua jornada de tatuagem começa agora',
      welcomeAboard: 'Bem-vindo a bordo, {{name}}!',
      welcomeName: 'Bem-vindo {{name}}',

      // Urgency messages
      urgencyArtist: 'Mostre aos clientes prévias reais instantaneamente.',
      urgencyCoverUp: 'Renove sua tatuagem com confiança.',
      urgencyTryOn: 'Experimente sua tatuagem antes de se comprometer.',
      urgencyDefault: 'Designs ilimitados. Zero arrependimento.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Continuar',
    restorePurchase: 'Restaurar compra',
    current: 'ATUAL',

    // Plan terms
    week: 'Semana',
    month: 'Mês',
    weekly: 'Semanal',
    monthly: 'Mensal',
    perWeek: '/Semana',

    // Content
    loadingPlans: 'Carregando planos\u2026',
    restoreSubscription: 'Restaurar assinatura',
    fairUseNote: 'A geração de designs com IA inclui limites de uso justo.',
    saveBadge: 'Economize {{percent}}%',
    subtitle:
      'Explore ideias de tatuagens, refine designs com variações infinitas, experimente-os em qualquer parte do corpo e exporte resultados de alta qualidade com confiança.',

    // Personalized headlines
    headlineArtist: 'Mostre aos clientes a tatuagem antes de tatuar',
    headlineCoverUp: 'Transforme sua tatuagem com confiança',
    headlineTryOn: 'Veja sua tatuagem antes de se comprometer',
    headlineDesign: 'Crie a tatuagem que você sempre quis',
    headlineBrowse: 'Encontre o design de tatuagem perfeito',

    // Purchase flow alerts
    successTitle: 'Sucesso!',
    subscriptionActiveMessage:
      'Sua assinatura está ativa. Aproveite designs de tatuagem ilimitados!',
    almostThereTitle: 'Quase lá!',
    createAccountMessage:
      'Crie uma conta para ativar sua assinatura e começar a criar.',
    purchaseRestoredTitle: 'Compra restaurada!',
    subscriptionNowActive: 'Sua assinatura está ativa.',
    purchaseFoundTitle: 'Compra encontrada!',
    purchasesRestoredMessage: 'Suas compras foram restauradas.',
    noPurchasesFoundTitle: 'Nenhuma compra encontrada',
    noPurchasesFoundMessage:
      'Nenhuma compra anterior encontrada para restaurar.',
    purchaseFailedTitle: 'Falha na compra',
    purchaseFailedMessage:
      'Não foi possível concluir a compra. Tente novamente.',
    errorRestoringTitle: 'Erro ao restaurar compras',
    errorRestoringMessage:
      'Não foi possível restaurar as compras. Tente novamente.',
    subscriptionActivated: 'Assinatura ativada!',

    // Alerts
    purchaseError: 'Erro na compra',
    restoreSuccess: 'Compra restaurada',
    restoreError: 'Falha na restauração',
    noPurchaseFound: 'Nenhuma compra anterior encontrada',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Cancelar geração',
    cancelGenerationTitle: 'Cancelar geração?',
    cancelGenerationMessage:
      'Você está prestes a cancelar a geração atual. Isso removerá a geração atual e iniciará uma nova sessão.',
    clearEverythingTitle: 'Limpar tudo?',
    clearEverythingMessage:
      'Você está prestes a limpar esta sessão. Isso removerá todas as tatuagens geradas. Salve o que quiser manter antes de continuar.',
    clearEverything: 'Limpar tudo',

    // Input
    enterText: 'Digitar texto',
    describeTattoo: 'Descreva sua tatuagem ou escolha uma sugestão abaixo',

    // Try on alert
    tryOnTitle: 'Experimentar {{style}}',
    tryOnMessage:
      'Tire uma foto da parte do seu corpo para ver como essa tatuagem fica em você!',
    choosePhoto: 'Escolher foto',
    later: 'Depois',

    // Preview on body
    previewOnBody: 'Visualizar tatuagem no corpo',
    imageSelectedCombine: '1 imagem selecionada – adicione mais uma para combinar',

    // Suggestions
    createTattoo: 'Criar uma tatuagem {{title}}',
    createStyleTattoo: 'Criar uma tatuagem estilo {{title}}',
    tryStyle: 'Experimentar estilo {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Atualizando sua tatuagem...',
      startingNew: 'Iniciando nova tatuagem...',
      warmingUp: 'A máquina de tatuar está esquentando...',
      summoningSpirits: 'Invocando os espíritos da tinta...',
      drawingInspiration: 'Buscando inspiração no universo...',
      brewingMasterpiece: 'Sua obra-prima está quase pronta...',
      sprinkleCreativity: 'Adicionando uma pitada de criatividade...',
      perfectingPixels: 'Aperfeiçoando cada pixel da sua tatuagem...',
      injectingCreativity: 'Injetando criatividade na sua pele...',
      mixingShade: 'Misturando o tom perfeito...',
      sharpeningNeedles: 'Afiando agulhas virtuais...',
      calibratingVibes: 'Calibrando suas vibes de tatuagem...',
      consultingOracle: 'Consultando o oráculo da tatuagem...',
    },

    // Error states
    error: {
      keepCreating: 'Continue criando sem limites',
      limitReachedFree:
        'Você atingiu seu limite de geração atual. Melhore agora para explorar variações, refinar designs e continuar criando sem esperar.',
      unlockUnlimited: 'Desbloqueie designs ilimitados \u2192',
      limitReachedSubscribed:
        'Você atingiu seu limite para este período',
      limitReachedSubscribedDesc:
        'O limite de geração do seu plano foi atingido. Seu limite será redefinido no início do próximo período de cobrança.',
      tryAgainLater: 'Tentar mais tarde',
      contactSupport: 'Contatar suporte',
    },

    // Session history actions
    actions: 'Ações',
    saveToGallery: 'Salvar na galeria',

    // Result image actions
    imageActions: 'Ações de imagem',
    copyToClipboard: 'Copiar para a área de transferência',
    imageCopied: 'Imagem copiada para a área de transferência',
    imageCopyFailed: 'Falha ao copiar a imagem',
    imageSaved: 'Imagem salva na galeria!',
    imageSaveFailed: 'Falha ao salvar a imagem. Tente novamente.',

    // Context alerts
    photoAccessTitle: 'Acesso às fotos necessário',
    photoAccessMessage:
      'Para salvar imagens na sua galeria, precisamos de acesso às suas fotos. Você pode ativar isso nas Configurações.',
    resetSessionTitle: 'Redefinir sessão?',
    resetSessionMessage:
      'Tem certeza de que deseja redefinir a sessão? Isso apagará todas as tatuagens geradas e iniciará uma nova sessão.',
    resetButton: 'Redefinir',
    shareError: 'Falha ao compartilhar a imagem',
    imageDataError: 'Falha ao obter dados da imagem',
    pickImageError: 'Falha ao selecionar imagem da galeria',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Imagem não encontrada',
    useTattoo: 'Usar tatuagem',
    useTattooError: 'Não foi possível usar esta tatuagem. Tente novamente.',
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
      'Adicione uma foto do seu corpo para visualizar',
    tryOnDescriptionNoTattoo:
      'Selecione uma tatuagem primeiro, depois adicione sua foto',
    createNewTattoo: 'Criar nova tatuagem',
    createNewTattooDescription:
      'Descreva sua ideia de tatuagem e nós a geraremos',
    tattooCoverUp: 'Ideia de cobertura de tatuagem',
    tattooCoverUpDescription:
      'Gere uma ideia para cobrir uma tatuagem existente usando uma foto como referência',
    removeTattoo: 'Remover tatuagem',
    removeTattooDescription:
      'Remover uma tatuagem existente da foto',
    promptHistory: 'Histórico de prompts',
    promptHistoryDescription: 'Ver seus prompts anteriores',
    requestFeature: 'Sugerir recurso',
    requestFeatureDescription:
      'Diga-nos o que você gostaria que o Tattoo Design AI suportasse a seguir',

    // Try on alerts
    addYourPhoto: 'Adicione sua foto',
    addPhotoQuestion:
      'Como você gostaria de adicionar uma foto de onde quer a tatuagem?',
    takePhoto: 'Tirar foto',
    chooseFromLibrary: 'Escolher da biblioteca',
    createTattooFirst: 'Crie uma tatuagem primeiro',
    createTattooFirstMessage:
      'Para experimentar uma tatuagem, você precisa:\n\n1. Gerar ou selecionar um design de tatuagem\n2. Depois adicionar uma foto do seu corpo\n\nVamos combiná-los para mostrar como fica!',
    createTattoo: 'Criar tatuagem',
  },

  tattoos: {
    // Screen header
    title: 'Minhas tatuagens',

    // Loading
    loading: 'Carregando tatuagens...',

    // Empty state
    emptyTitle: 'Nenhuma tatuagem salva ainda',
    emptyDescription:
      'Crie e salve seu primeiro design de tatuagem! Deslize para baixo para atualizar.',

    // Cloud restore
    restoringFromCloud: 'Restaurando da nuvem...',
    noCloudGenerations: 'Nenhuma geração na nuvem encontrada',
    restoredCount: '{{restored}} de {{total}} tatuagens restauradas',
    restoreFailedTitle: 'Falha na restauração',
    restoreFailedMessage:
      'Não foi possível restaurar da nuvem. Tente novamente.',
    cloudFound: '{{count}} tatuagem encontrada na nuvem',
    cloudFound_other: '{{count}} tatuagens encontradas na nuvem',
    restoring: 'Restaurando...',
    restore: 'Restaurar',
    cloudCount: '{{count}} na nuvem',

    // Detail screen
    tattooNotFound: 'Tatuagem não encontrada',
    backToHome: 'Voltar ao início',
    shareError: 'Não foi possível compartilhar a imagem. Tente novamente.',
    imageAccessError: 'Não foi possível acessar o arquivo de imagem.',
    deleteTitle: 'Excluir tatuagem',
    deleteMessage:
      'Tem certeza de que deseja excluir este design de tatuagem? Esta ação não pode ser desfeita.',
    deleteError: 'Não foi possível excluir a imagem. Tente novamente.',
  },

  generation: {
    // Loading
    applyingDesign: 'Aplicando seu design de tatuagem...',

    // Error
    invalidRequest: 'Solicitação inválida',
    generationFailed: 'Falha na geração',
    failedToGenerate: 'Não foi possível gerar o design da tatuagem',
    startOver: 'Recomeçar',

    // Success
    tattooReady: 'Sua tatuagem está pronta!',
    tattooReadyDescription:
      'É assim que seu design ficaria aplicado',
    saveToGallery: 'Salvar na galeria',
    generateAnother: 'Gerar outra',

    // Save alerts
    savedTitle: 'Salvo!',
    savedMessage:
      'Seu design de tatuagem foi salvo na sua galeria de fotos.',
    viewInGallery: 'Ver na galeria',

    // Generate another alert
    generateAnotherTitle: 'Gerar outra?',
    generateAnotherMessage:
      'Você ainda não salvou esta tatuagem. Gostaria de salvá-la antes de continuar?',
    continueWithoutSaving: 'Continuar sem salvar',
    saveAndContinue: 'Salvar e continuar',

    // Cancel alert
    cancelGenerationTitle: 'Cancelar geração?',
    cancelGenerationMessage:
      'Sua tatuagem ainda está sendo gerada. Se cancelar agora, esta geração ainda contará no seu limite de uso. Tem certeza?',
    keepGenerating: 'Continuar gerando',
    unableToSave: 'Não foi possível salvar a imagem. Tente novamente.',
  },

  home: {
    // Section headers
    discoverStyles: 'Descubra novos estilos',
    moreStyles: 'Mais estilos',
    moods: 'Vibes',
    discoverSketches: 'Descubra designs de esboço',

    // Quick actions
    generateFromIdea: 'Gerar a partir de uma ideia',
    generateFromIdeaDesc: 'Crie uma tatuagem a partir da sua imaginação',
    seeItOnSkin: 'Veja na sua pele',
    seeItOnSkinDesc: 'Tire uma foto e visualize a tatuagem',
    blendTattoo: 'Mesclar tatuagem',
    blendTattooDesc: 'Envie uma tatuagem existente e modifique-a',
    removeTattoo: 'Remover tatuagem',
    removeTattooDesc: 'Remova uma tatuagem existente da pele',
  },

  explore: {
    // Section headers
    byStyles: 'Explorar por estilos',
    byMoods: 'Explorar por vibes',
    byBodyPart: 'Explorar por parte do corpo',

    // Filter labels
    styles: 'Estilos',
    bodyPart: 'Parte do corpo',
  },

  featureRequest: {
    title: 'Compartilhe suas ideias',
    placeholder: 'Ideias para melhorar sua experiência...',
    needHelp: 'Precisa de ajuda? ',
    contactUs: 'Fale conosco',
    successToast:
      'Sugestão enviada! Obrigado pelo seu feedback.',
    errorToast:
      'Falha ao enviar a sugestão. Tente novamente.',
  },

  promptHistory: {
    title: 'Histórico de prompts',
    clearAll: 'Limpar tudo',
    clearAllTitle: 'Limpar histórico de prompts',
    clearAllMessage:
      'Tem certeza de que deseja excluir todos os prompts salvos?',
    deletePromptTitle: 'Excluir prompt',
    deletePromptMessage: 'Remover este prompt do histórico?',
    emptyTitle: 'Nenhum prompt ainda',
    emptyDescription:
      'Seus prompts aparecerão aqui depois de gerar uma tatuagem',
  },
};
