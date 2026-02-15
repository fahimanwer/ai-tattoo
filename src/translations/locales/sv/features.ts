/**
 * Swedish translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const svFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Forhandsgranska din tatuering innan du bestammer dig.',
    whatsYourName: 'Vad heter du?',
    namePlaceholder: 'Ditt namn',
    nameDescription: 'Vi anvander detta for att anpassa din upplevelse.',
    welcome: 'Valkommen',
    welcomeDescription: 'Lat oss anpassa din Tattoo Design AI-upplevelse nu.',
    describeYou: 'Vad beskriver\n dig bast?',
    describeYouDescription:
      'Detta hjalper oss att anpassa upplevelsen baserat pa hur du forhaller dig till tatueringar',
    whatToDo: 'Vad vill du\n gora?',
    whatToDoDescription:
      'Detta hjalper oss att forsta hur du vill utforska tatueringar och vilka verktyg som ar mest anvanbara for dig.',
    designTattoo: 'Designa den\n tatuering du vill ha',
    designTattooDescription:
      'Skriv nagra ord eller ladda upp en bild och generera unika tatueringsdesigner direkt.',
    whereTattoo: 'Var vill du ha\n tatueringen?',
    whereTattooDescription:
      'Placeringen paverkar designen, storleken och flodet, vilket hjalper oss att skraddarsy ideer for din kropp.',
    pickStyles: 'Valj upp till 5\n stilar du gillar',
    pickStylesDescription:
      'Dina stilval hjalper oss att begransera designer som matchar din smak.',
    whenTattoo: 'Nar tanker du\n skaffa tatueringen?',
    whenTattooDescription:
      'Detta hjalper oss att matcha\n upplevelsen med din tidsplan.',
    whatVibe: 'Vilken staming\n ar du ute efter?',
    whatVibeDescription:
      'Tatueringar bar kanslor, detta hjalper oss att forsta historien bakom din.',
    settingUp: 'Staller i ordning\n allt at dig',
    youreAllSet: 'Du ar redo!',
    youreAllSetDescription: 'Du ar redo att borja.',

    // CTA
    alreadyHaveAccount: 'Har du redan ett konto? ',
    signIn: 'Logga in',

    // User description options
    userDescription: {
      artist: 'Jag skapar tatueringar',
      client: 'Jag ska tatuera mig',
      model: 'Jag anvander tatueringar for innehall',
      explorer: 'Jag bara utforskar',
    },

    // Goal options
    goal: {
      tryOn: 'Provtesta tatueringar pa mina foton',
      generate: 'Generera tatueringsideer',
      browse: 'Bara tittar eller soker inspiration',
      coverUp: 'Tacka over/omarbeta en befintlig tatuering',
    },

    // Location options
    location: {
      wrist: 'Handled',
      chest: 'Brost',
      hand: 'Hand',
      back: 'Rygg',
      legs: 'Ben',
      forearm: 'Underarm',
      neck: 'Nacke',
      jaw: 'Kake',
      forehead: 'Panna',
      knuckles: 'Knogar',
      fingers: 'Fingrar',
      cheek: 'Kind',
      shoulder: 'Axel',
      temple: 'Tinning',
      ribs: 'Revben',
      abdomen: 'Mage',
      face: 'Ansikte',
      hips: 'Hofter',
      thigh: 'Lar',
      tricep: 'Triceps',
      bicep: 'Biceps',
      collarbone: 'Nyckelben',
      ankle: 'Ankel',
      foot: 'Fot',
      palm: 'Handflata',
      notSure: 'Inte saker',
    },

    // Style options
    styles: {
      traditional: 'Traditionell',
      realism: 'Realism',
      minimal: 'Minimal',
      celtic: 'Keltisk',
      blackwork: 'Blackwork',
      illustrative: 'Illustrativ',
      lettering: 'Bokstaver',
      irezumi: 'Irezumi',
      geometric: 'Geometrisk',
      religious: 'Religios',
      anime: 'Anime',
      fineLine: 'Fin linje',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Kalligrafi',
      portrait: 'Portratt',
      floral: 'Blommig',
      polynesian: 'Polynesisk',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gotisk',
      patchwork: 'Patchwork',
      abstract: 'Abstrakt',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologi',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Denna vecka',
      thisMonth: 'Denna manad',
      oneToThreeMonths: 'Om 1-3 manader',
      someday: 'Nagon gang, jag bara utforskar',
    },

    // Vibe options
    vibe: {
      bold: 'Djrv',
      confident: 'Sjalvsaker',
      soft: 'Mjuk',
      dark: 'Mork',
      edgy: 'Kantigt',
      elegant: 'Elegant',
      spiritual: 'Spirituell',
      cute: 'Sot',
      symbolic: 'Symbolisk',
      playful: 'Lekfull',
      clean: 'Ren',
      modern: 'Modern',
      meaningful: 'Meningsfull',
      personalStory: 'Personlig historia',
      family: 'Familj',
      love: 'Karlek',
      memory: 'Minne',
      rebirth: 'Panytt fodelse',
      freedom: 'Frihet',
      mystical: 'Mystisk',
      rebellious: 'Rebellisk',
      serene: 'Lugn',
      empowered: 'Starkgjord',
      ethereal: 'Eterisk',
      fearless: 'Oradd',
      wanderlust: 'Reselust',
      transcendent: 'Transcendent',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Forstar {{name}}s vision',
      understandingVisionDefault: 'Forstar din vision',
      tailoringDesigns: 'Skraddarsyr designer efter din stil',
      settingUpCoverUp: 'Staller in overtackningsverktyg',
      personalizingExperience: 'Anpassar din upplevelse',
      preparingStudio: 'Forbereder din designstudio',
      configuringWorkspace: 'Konfigurerar ditt arbetsomrade',
      applyingPreferences: 'Tillmpar dina installningar',
      journeyStartsNow: 'Din tatueringsresa borjar nu',
    },

    // Reviews
    reviews: {
      review1Title: 'Fantastisk app!',
      review1Body:
        'Appen fungerar, ser ut och kanns bra! Imponerad av hur val den applicerade tatueringen, med honsyn till korrekt ljussattning och skuggning.',
      review1Author: 'Jacob C.',
      review2Title: 'Faktiskt anvandbar',
      review2Body:
        'Tatueringsdesignerna ar rena och detaljerade. Vissa bilder tar lite langre tid att generera, men overlag ar det en av de basta AI-tatueringsapparna dar ute.',
      review2Author: 'Alexrays1',
      review3Title: 'Alskar den',
      review3Body: 'Rekommenderas varmt \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Generera tatueringar direkt',
    containerDesc1:
      'Skriv nagra ord och generera unika tatueringsdesigner direkt.',
    containerTitle2: 'Anpassa din design',
    containerDesc2:
      'Justera farger, layout och stil for att gora tatueringen helt din.',
    containerTitle3: 'Forhandsgranska pa din hud',
    containerDesc3:
      'Forhandsgranska vilken tatuering som helst pa din hud — justera storlek och placering direkt.',
    paused: 'Pausad',

    // Relative time
    time: {
      today: 'Idag',
      yesterday: 'Igar',
      daysAgo: '{{count}} dagar sedan',
      weeksAgo: '{{count}} veckor sedan',
      monthsAgo: '{{count}} manader sedan',
      yearsAgo: '{{count}} ar sedan',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Provtestteknologi',
      tryOnTechnologyDesc: 'Se tatueringar pa din hud innan du bestammer dig',
      aiTattooGenerator: 'AI-tatueringsgenerator',
      aiTattooGeneratorDesc: 'Skapa unika designer fran dina ideer',
      coverUpAssistant: 'Overtackningsassistent',
      coverUpAssistantDesc: 'Forvandla befintliga tatueringar till ny konst',
      artistTools: 'Konstnaersverktyg',
      artistToolsDesc:
        'Visa kunder designer pa deras kropp direkt',
      precisePlacement: 'Exakt placering',
      precisePlacementDesc:
        'Perfekt storlek for din {{location}}-tatuering',
      styleMatchedDesigns: 'Stilmatchade designer',
      styleMatchedDesignsDesc:
        'Kuraterad {{style}} tatueringsinspiration',
      readyWhenYouAre: 'Redo nar du ar',
      readyWhenYouAreDesc: 'Borja designa idag, farg imorgon',
      realisticTryOn: 'Realistisk provtestning',
      realisticTryOnDesc: 'Se exakt hur det kommer att se ut pa dig',
      saveAndShare: 'Spara och dela',
      saveAndShareDesc:
        'Behall dina favoriter och dela med din tatuerare',
      aiDesignStudio: 'AI-designstudio',
      aiDesignStudioDesc: 'Generera unika tatueringsdesigner direkt',

      // Personalized greetings
      greetingArtist: 'Ditt nya kundupplevelsverktyg ar redo',
      greetingCoverUp: 'Redo att forvandla din tatuering',
      greetingGenerate: 'Din AI-designstudio vantar',
      greetingDefault: 'Din tatueringsresa borjar nu',
      welcomeAboard: 'Valkommen ombord, {{name}}!',
      welcomeName: 'Valkommen {{name}}',

      // Urgency messages
      urgencyArtist: 'Visa kunder realistiska forhandsvisningar direkt.',
      urgencyCoverUp: 'Fixa din tatuering med sjalvfortroende.',
      urgencyTryOn: 'Provtesta din tatuering innan du bestammer dig.',
      urgencyDefault: 'Obegransade designer. Noll anget.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Fortsatt',
    restorePurchase: 'Aterstall kop',
    current: 'NUVARANDE',

    // Plan terms
    week: 'Vecka',
    month: 'Manad',
    weekly: 'Veckovis',
    perWeek: '/Vecka',

    // Content
    loadingPlans: 'Laddar planer...',
    restoreSubscription: 'Aterstall prenumeration',
    fairUseNote: 'AI-designgenerering inkluderar galeater for rimlig anvandning.',
    saveBadge: 'Spara {{percent}}%',
    subtitle:
      'Utforska tatueringsideer, forfina designer genom oandliga variationer, provtesta dem pa vilken kroppsdel som helst och exportera resultat i hog kvalitet.',

    // Personalized headlines
    headlineArtist: 'Visa kunder deras tatuering innan du tatuerarnr',
    headlineCoverUp: 'Forvandla din tatuering med sjalvfortroende',
    headlineTryOn: 'Se din tatuering innan du bestammer dig',
    headlineDesign: 'Designa tatueringen du alltid dromta om',
    headlineBrowse: 'Hitta din perfekta tatueringsdesign',

    // Purchase flow alerts
    successTitle: 'Klart!',
    subscriptionActiveMessage:
      'Din prenumeration ar nu aktiv. Njut av obegransade tatueringsdesigner!',
    almostThereTitle: 'Nastan dar!',
    createAccountMessage:
      'Skapa ett konto for att aktivera din prenumeration och borja designa.',
    purchaseRestoredTitle: 'Kop aterstllt!',
    subscriptionNowActive: 'Din prenumeration ar nu aktiv.',
    purchaseFoundTitle: 'Kop hittat!',
    purchasesRestoredMessage: 'Dina kop har aterstallts.',
    noPurchasesFoundTitle: 'Inga kop hittades',
    noPurchasesFoundMessage:
      'Inga tidigare kop hittades att aterstalla.',
    purchaseFailedTitle: 'Kopet misslyckades',
    purchaseFailedMessage:
      'Det gick inte att genomfora kopet. Forsok igen.',
    errorRestoringTitle: 'Fel vid aterstallning av kop',
    errorRestoringMessage:
      'Det gick inte att aterstalla kop. Forsok igen.',
    subscriptionActivated: 'Prenumeration aktiverad!',

    // Alerts
    purchaseError: 'Kopfel',
    restoreSuccess: 'Kop aterstllt',
    restoreError: 'Aterstallning misslyckades',
    noPurchaseFound: 'Inget tidigare kop hittades',

    // Pricing overhaul
    annual: 'Årlig',
    year: 'År',
    perYear: '/År',
    freeTrialBadge: '{{days}}-DAGARS GRATIS PROVPERIOD',
    startTrialButton: 'Starta {{days}} dagars gratis provperiod',
    specialOffer: 'Specialerbjudande',
    limitedTimeOffer: 'Tidsbegränsat erbjudande',
    discountSubtitle: 'Endast nya användare — lås upp full åtkomst idag',
    savePercent: 'Spara {{percent}}%',
    annualPerWeek: '{{price}}/vecka',
    todayOnly: 'Endast idag',
    offerExpires: 'Erbjudandet upphör om',
    perWeekBilled: 'per vecka, faktureras {{period}}',
    originalPrice: 'Var {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Avbryt generering',
    cancelGenerationTitle: 'Avbryta generering?',
    cancelGenerationMessage:
      'Du ar pa vag att avbryta den pagaende genereringen. Detta tar bort den aktuella genereringen och startar en ny session.',
    clearEverythingTitle: 'Rensa allt?',
    clearEverythingMessage:
      'Du ar pa vag att rensa denna session. Detta tar bort alla genererade tatueringar. Spara allt du vill behalla innan du fortsatter.',
    clearEverything: 'Rensa allt',

    // Input
    enterText: 'Skriv text',
    describeTattoo: 'Beskriv din tatuering eller valj ett forslag nedan',

    // Try on alert
    tryOnTitle: 'Provtesta {{style}}',
    tryOnMessage:
      'Ta ett foto av din kroppsdel for att se hur den har tatueringen ser ut pa dig!',
    choosePhoto: 'Valj foto',
    later: 'Senare',

    // Preview on body
    previewOnBody: 'Forhandsgranska tatuering pa kroppen',
    imageSelectedCombine: '1 bild vald - lagg till en till for att kombinera',

    // Suggestions
    createTattoo: 'Skapa en {{title}}-tatuering',
    createStyleTattoo: 'Skapa en tatuering i {{title}}-stil',
    tryStyle: 'Testa {{title}}-stilen',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Uppdaterar din tatuering...',
      startingNew: 'Startar ny tatuering...',
      warmingUp: 'Tatueringsmaskinen varmer upp...',
      summoningSpirits: 'Frammanar blackandarna...',
      drawingInspiration: 'Hamtar inspiration fran universum...',
      brewingMasterpiece: 'Nastan klar med ditt masterverk...',
      sprinkleCreativity: 'Lagger till en gnutta kreativitet...',
      perfectingPixels: 'Perfekterar varje pixel av din tatuering...',
      injectingCreativity: 'Injicerar kreativitet i din hud...',
      mixingShade: 'Blandar den perfekta nyansen av fantastiskt...',
      sharpeningNeedles: 'Vassar virtuella nalar...',
      calibratingVibes: 'Kalibrerar dina tatueringsvibrationer...',
      consultingOracle: 'Konsulterar tatueringsoraklet...',
    },

    // Error states
    error: {
      keepCreating: 'Fortsatt skapa utan begrnsningar',
      limitReachedFree:
        'Du har natt din nuvarande genereringsgrans. Uppgradera nu for att utforska variationer, forfina designer och fortsatta skapa utan att vanta.',
      unlockUnlimited: 'Las upp obegransade designer \u2192',
      limitReachedSubscribed:
        'Du har natt din grans for denna period',
      limitReachedSubscribedDesc:
        'Din plans genereringsgrans har natts. Din grans aterstalls i borjan av nasta faktureringsperiod.',
      tryAgainLater: 'Forsok igen senare',
      contactSupport: 'Kontakta support',
    },

    // Session history actions
    actions: 'Atgarder',
    saveToGallery: 'Spara till galleri',

    // Result image actions
    imageActions: 'Bildatgarder',
    copyToClipboard: 'Kopiera till urklipp',
    imageCopied: 'Bild kopierad till urklipp',
    imageCopyFailed: 'Det gick inte att kopiera bilden',
    imageSaved: 'Bild sparad i galleriet!',
    imageSaveFailed: 'Det gick inte att spara bilden. Forsok igen.',

    // Context alerts
    photoAccessTitle: 'Fotoatkomst kravs',
    photoAccessMessage:
      'For att spara bilder till ditt galleri behover vi tillgang till dina foton. Du kan aktivera detta i Installningar.',
    resetSessionTitle: 'Aterstall session?',
    resetSessionMessage:
      'Ar du saker pa att du vill aterstalla sessionen? Detta rensar alla genererade tatueringar och startar en ny session.',
    resetButton: 'Aterstall',
    shareError: 'Det gick inte att dela bilden',
    imageDataError: 'Det gick inte att hamta bilddata',
    pickImageError: 'Det gick inte att valja bild fran galleriet',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Bild hittades inte',
    useTattoo: 'Anvand tatuering',
    useTattooError: 'Det gick inte att anvanda denna tatuering. Forsok igen.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Alla foton',
    addPhotos: 'Lagg till {{count}} foto',
    addPhotos_other: 'Lagg till {{count}} foton',
    recentPhotos: 'Senaste foton',
    selectOneMore: 'Valj 1 till for att kombinera',

    // Options
    tryOn: 'Provtesta',
    tryOnDescriptionWithTattoo:
      'Lagg till ett foto av din kropp for att forhandsvisa',
    tryOnDescriptionNoTattoo:
      'Valj en tatuering forst, lagg sedan till ditt foto',
    createNewTattoo: 'Skapa ny tatuering',
    createNewTattooDescription:
      'Beskriv din tatueringsidee sa genererar vi den',
    tattooCoverUp: 'Overtackningsidee',
    tattooCoverUpDescription:
      'Generera en idee for att tacka over en befintlig tatuering med ett foto som referens',
    removeTattoo: 'Ta bort tatuering',
    removeTattooDescription:
      'Ta bort en befintlig tatuering fran fotot',
    promptHistory: 'Prompthistorik',
    promptHistoryDescription: 'Visa dina tidigare promptar',
    requestFeature: 'Foresla en funktion',
    requestFeatureDescription:
      'Beratta for oss vad du vill att Tattoo Design AI ska stodja harnast',

    // Try on alerts
    addYourPhoto: 'Lagg till ditt foto',
    addPhotoQuestion:
      'Hur vill du lagga till ett foto pa var du vill ha tatueringen?',
    takePhoto: 'Ta foto',
    chooseFromLibrary: 'Valj fran bibliotek',
    createTattooFirst: 'Skapa en tatuering forst',
    createTattooFirstMessage:
      'For att provtesta en tatuering behover du:\n\n1. Generera eller valja en tatueringsdesign\n2. Sedan lagga till ett foto av din kropp\n\nVi kombinerar dem for att visa hur det ser ut!',
    createTattoo: 'Skapa tatuering',
  },

  tattoos: {
    // Screen header
    title: 'Mina tatueringar',

    // Loading
    loading: 'Laddar tatueringar...',

    // Empty state
    emptyTitle: 'Inga sparade tatueringar annu',
    emptyDescription:
      'Skapa och spara din forsta tatueringsdesign! Svep nedat for att uppdatera.',

    // Cloud restore
    restoringFromCloud: 'Aterstaller fran molnet...',
    noCloudGenerations: 'Inga molngenereringar hittades',
    restoredCount: 'Aterstallde {{restored}} av {{total}} tatueringar',
    restoreFailedTitle: 'Aterstallning misslyckades',
    restoreFailedMessage:
      'Det gick inte att aterstalla fran molnet. Forsok igen.',
    cloudFound: '{{count}} tatuering hittad i molnet',
    cloudFound_other: '{{count}} tatueringar hittade i molnet',
    restoring: 'Aterstaller...',
    restore: 'Aterstall',
    cloudCount: '{{count}} i molnet',

    // Detail screen
    tattooNotFound: 'Tatuering hittades inte',
    backToHome: 'Tillbaka till hem',
    shareError: 'Det gick inte att dela bilden. Forsok igen.',
    imageAccessError: 'Det gick inte att komma at bildfilen.',
    deleteTitle: 'Radera tatuering',
    deleteMessage:
      'Ar du saker pa att du vill radera denna tatueringsdesign? Denna atgard kan inte angras.',
    deleteError: 'Det gick inte att radera bilden. Forsok igen.',
  },

  generation: {
    // Loading
    applyingDesign: 'Applicerar din tatueringsdesign...',

    // Error
    invalidRequest: 'Ogiltig forfragan',
    generationFailed: 'Genereringen misslyckades',
    failedToGenerate: 'Det gick inte att generera tatueringsdesign',
    startOver: 'Borja om',

    // Success
    tattooReady: 'Din tatuering ar redo!',
    tattooReadyDescription:
      'Sa har skulle din design se ut applicerad',
    saveToGallery: 'Spara till galleri',
    generateAnother: 'Generera en till',

    // Save alerts
    savedTitle: 'Sparad!',
    savedMessage:
      'Din tatueringsdesign har sparats i ditt fotogalleri.',
    viewInGallery: 'Visa i galleriet',

    // Generate another alert
    generateAnotherTitle: 'Generera en till?',
    generateAnotherMessage:
      'Du har inte sparat denna tatuering annu. Vill du spara den innan du fortsatter?',
    continueWithoutSaving: 'Fortsatt utan att spara',
    saveAndContinue: 'Spara och fortsatt',

    // Cancel alert
    cancelGenerationTitle: 'Avbryta generering?',
    cancelGenerationMessage:
      'Din tatuering genereras fortfarande. Om du avbryter nu raaknas denna generering fortfarande mot din anvandningsgrans. Ar du saker pa att du vill avbryta?',
    keepGenerating: 'Fortsatt generera',
    unableToSave: 'Det gick inte att spara bilden. Forsok igen.',
  },

  home: {
    // Section headers
    discoverStyles: 'Upptack nya stilar',
    moreStyles: 'Fler stilar',
    moods: 'Stamningar',
    discoverSketches: 'Upptack skissdesigner',

    // Quick actions
    generateFromIdea: 'Generera fran idee',
    generateFromIdeaDesc: 'Skapa en tatuering fran din fantasi',
    seeItOnSkin: 'Se det pa din hud',
    seeItOnSkinDesc: 'Ta ett foto och forhandsgranska tatueringen',
    blendTattoo: 'Blanda tatuering',
    blendTattooDesc: 'Ladda upp en befintlig tatuering och anpassa den',
    removeTattoo: 'Ta bort tatuering',
    removeTattooDesc: 'Ta bort en befintlig tatuering fran huden',
  },

  explore: {
    // Section headers
    byStyles: 'Utforska efter stilar',
    byMoods: 'Utforska efter stamningar',
    byBodyPart: 'Utforska efter kroppsdel',

    // Filter labels
    styles: 'Stilar',
    bodyPart: 'Kroppsdel',
  },

  featureRequest: {
    title: 'Dela dina ideer',
    placeholder: 'Ideer for att forbattra din upplevelse...',
    needHelp: 'Behover du hjalp? ',
    contactUs: 'Kontakta oss',
    successToast:
      'Funktionsforslag skickat! Tack for din feedback.',
    errorToast:
      'Det gick inte att skicka funktionsforslaget. Forsok igen.',
  },

  promptHistory: {
    title: 'Prompthistorik',
    clearAll: 'Rensa allt',
    clearAllTitle: 'Rensa prompthistorik',
    clearAllMessage:
      'Ar du saker pa att du vill radera alla sparade promptar?',
    deletePromptTitle: 'Radera prompt',
    deletePromptMessage: 'Ta bort denna prompt fran historiken?',
    emptyTitle: 'Inga promptar annu',
    emptyDescription:
      'Dina promptar visas har efter att du genererat en tatuering',
  },
};
