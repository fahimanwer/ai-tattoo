/**
 * Norwegian translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const noFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Forhåndsvis tatoveringen din for du bestemmer deg.',
    whatsYourName: 'Hva heter du?',
    namePlaceholder: 'Ditt navn',
    nameDescription: 'Vi bruker dette til a tilpasse opplevelsen din.',
    welcome: 'Velkommen',
    welcomeDescription: 'La oss tilpasse Tattoo Design AI-opplevelsen din na.',
    describeYou: 'Hva beskriver\n deg best?',
    describeYouDescription:
      'Dette hjelper oss a tilpasse opplevelsen basert pa hvordan du forholder deg til tatoveringer',
    whatToDo: 'Hva vil du\n gjore?',
    whatToDoDescription:
      'Dette hjelper oss a forsta hvordan du vil utforske tatoveringer og hvilke verktoy som er mest nyttige for deg.',
    designTattoo: 'Design\n tatoveringen du vil ha',
    designTattooDescription:
      'Skriv noen ord eller last opp et bilde og generer unike tatoveringsdesign umiddelbart.',
    whereTattoo: 'Hvor vil du ha\n tatoveringen?',
    whereTattooDescription:
      'Plassering pavirker designen, storrelsen og flyten, noe som hjelper oss a skreddersy ideer til kroppen din.',
    pickStyles: 'Velg opptil 5\n stiler du liker',
    pickStylesDescription:
      'Stilvalgene dine hjelper oss a begrense design som matcher smaken din.',
    whenTattoo: 'Nar tenker du\n a ta tatoveringen?',
    whenTattooDescription:
      'Dette hjelper oss a tilpasse\n opplevelsen til tidsplanen din.',
    whatVibe: 'Hvilken stemning\n er du ute etter?',
    whatVibeDescription:
      'Tatoveringer baerer folelser, dette hjelper oss a forsta historien bak din.',
    settingUp: 'Setter opp\n alt for deg',
    youreAllSet: 'Du er klar!',
    youreAllSetDescription: 'Du er klar til a komme i gang.',

    // CTA
    alreadyHaveAccount: 'Har du allerede en konto? ',
    signIn: 'Logg inn',

    // User description options
    userDescription: {
      artist: 'Jeg lager tatoveringer',
      client: 'Jeg skal ta en tatovering',
      model: 'Jeg bruker tatoveringer til innhold',
      explorer: 'Jeg bare utforsker',
    },

    // Goal options
    goal: {
      tryOn: 'Prov tatoveringer pa bildene mine',
      generate: 'Generer tatoveringsideer',
      browse: 'Bare titter eller soker inspirasjon',
      coverUp: 'Dekke over/omarbeide en eksisterende tatovering',
    },

    // Location options
    location: {
      wrist: 'Handledd',
      chest: 'Bryst',
      hand: 'Hand',
      back: 'Rygg',
      legs: 'Ben',
      forearm: 'Underarm',
      neck: 'Nakke',
      jaw: 'Kjeve',
      forehead: 'Panne',
      knuckles: 'Knoker',
      fingers: 'Fingre',
      cheek: 'Kinn',
      shoulder: 'Skulder',
      temple: 'Tinning',
      ribs: 'Ribben',
      abdomen: 'Mage',
      face: 'Ansikt',
      hips: 'Hofter',
      thigh: 'Lar',
      tricep: 'Triceps',
      bicep: 'Biceps',
      collarbone: 'Krageben',
      ankle: 'Ankel',
      foot: 'Fot',
      palm: 'Handflate',
      notSure: 'Ikke sikker',
    },

    // Style options
    styles: {
      traditional: 'Tradisjonell',
      realism: 'Realisme',
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
      portrait: 'Portrett',
      floral: 'Blomster',
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
      thisWeek: 'Denne uken',
      thisMonth: 'Denne maneden',
      oneToThreeMonths: 'Om 1-3 maneder',
      someday: 'En dag, jeg bare utforsker',
    },

    // Vibe options
    vibe: {
      bold: 'Modig',
      confident: 'Selvsikker',
      soft: 'Myk',
      dark: 'Mork',
      edgy: 'Skarp',
      elegant: 'Elegant',
      spiritual: 'Spirituell',
      cute: 'Sot',
      symbolic: 'Symbolsk',
      playful: 'Leken',
      clean: 'Ren',
      modern: 'Moderne',
      meaningful: 'Meningsfull',
      personalStory: 'Personlig historie',
      family: 'Familie',
      love: 'Kjaerlighet',
      memory: 'Minne',
      rebirth: 'Gjenfodelse',
      freedom: 'Frihet',
      mystical: 'Mystisk',
      rebellious: 'Opproersk',
      serene: 'Rolig',
      empowered: 'Styrket',
      ethereal: 'Eterisk',
      fearless: 'Fryktlos',
      wanderlust: 'Reiselyst',
      transcendent: 'Transcendent',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Forstar {{name}}s visjon',
      understandingVisionDefault: 'Forstar visjonen din',
      tailoringDesigns: 'Skreddersyr design til stilen din',
      settingUpCoverUp: 'Setter opp overdekkingsverktoy',
      personalizingExperience: 'Tilpasser opplevelsen din',
      preparingStudio: 'Forbereder designstudioet ditt',
      configuringWorkspace: 'Konfigurerer arbeidsomradet ditt',
      applyingPreferences: 'Bruker innstillingene dine',
      journeyStartsNow: 'Tatoveringsreisen din begynner na',
    },

    // Reviews
    reviews: {
      review1Title: 'Fantastisk app!',
      review1Body:
        'Appen fungerer, ser ut og foeles bra! Imponert over hvor godt den paforte tatoveringen, med noyaktig belysning og skyggelegging.',
      review1Author: 'Jacob C.',
      review2Title: 'Faktisk nyttig',
      review2Body:
        'Tatoveringsdesignene er rene og detaljerte. Noen bilder tar litt lengre tid a generere, men totalt sett er det en av de beste AI-tatoveringsappene der ute.',
      review2Author: 'Alexrays1',
      review3Title: 'Elsker den',
      review3Body: 'Sterkt anbefalt \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Generer tatoveringer umiddelbart',
    containerDesc1:
      'Skriv noen ord og generer unike tatoveringsdesign umiddelbart.',
    containerTitle2: 'Tilpass designen din',
    containerDesc2:
      'Juster farger, layout og stil for a gjore tatoveringen helt din.',
    containerTitle3: 'Forhåndsvis pa huden din',
    containerDesc3:
      'Forhåndsvis hvilken som helst tatovering pa huden din — juster storrelse og plassering umiddelbart.',
    paused: 'Pauset',

    // Relative time
    time: {
      today: 'I dag',
      yesterday: 'I gar',
      daysAgo: '{{count}} dager siden',
      weeksAgo: '{{count}} uker siden',
      monthsAgo: '{{count}} maneder siden',
      yearsAgo: '{{count}} ar siden',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Proveteknologi',
      tryOnTechnologyDesc: 'Se tatoveringer pa huden din for du bestemmer deg',
      aiTattooGenerator: 'AI-tatoveringsgenerator',
      aiTattooGeneratorDesc: 'Lag unike design fra ideene dine',
      coverUpAssistant: 'Overdekkingsassistent',
      coverUpAssistantDesc: 'Forvandle eksisterende tatoveringer til ny kunst',
      artistTools: 'Kunstnerverktoy',
      artistToolsDesc:
        'Vis kunder design pa kroppen deres umiddelbart',
      precisePlacement: 'Noyaktig plassering',
      precisePlacementDesc:
        'Perfekt storrelse for {{location}}-tatoveringen din',
      styleMatchedDesigns: 'Stilmatchede design',
      styleMatchedDesignsDesc:
        'Kuratert {{style}} tatoveringsinspirasjoon',
      readyWhenYouAre: 'Klar nar du er',
      readyWhenYouAreDesc: 'Begynn a designe i dag, blekk i morgen',
      realisticTryOn: 'Realistisk proving',
      realisticTryOnDesc: 'Se noyaktig hvordan det vil se ut pa deg',
      saveAndShare: 'Lagre og dele',
      saveAndShareDesc:
        'Behold favorittene dine og del med tatovoren din',
      aiDesignStudio: 'AI-designstudio',
      aiDesignStudioDesc: 'Generer unike tatoveringsdesign umiddelbart',

      // Personalized greetings
      greetingArtist: 'Ditt nye kundeopplevelsesverktoy er klart',
      greetingCoverUp: 'Klar til a forvandle tatoveringen din',
      greetingGenerate: 'AI-designstudioet ditt venter',
      greetingDefault: 'Tatoveringsreisen din begynner na',
      welcomeAboard: 'Velkommen om bord, {{name}}!',
      welcomeName: 'Velkommen {{name}}',

      // Urgency messages
      urgencyArtist: 'Vis kunder realistiske forhåndsvisninger umiddelbart.',
      urgencyCoverUp: 'Fiks tatoveringen din med selvtillit.',
      urgencyTryOn: 'Prov tatoveringen din for du bestemmer deg.',
      urgencyDefault: 'Ubegrensede design. Null anger.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Fortsett',
    restorePurchase: 'Gjenopprett kjop',
    current: 'NAVARENDE',

    // Plan terms
    week: 'Uke',
    month: 'Maned',
    weekly: 'Ukentlig',
    monthly: 'Manedlig',
    perWeek: '/Uke',

    // Content
    loadingPlans: 'Laster planer...',
    restoreSubscription: 'Gjenopprett abonnement',
    fairUseNote: 'AI-designgenerering inkluderer begrensninger for rimelig bruk.',
    saveBadge: 'Spar {{percent}}%',
    subtitle:
      'Utforsk tatoveringsideer, forfin design gjennom uendelige variasjoner, prov dem pa hvilken som helst kroppsdel og eksporter resultater i hoy kvalitet.',

    // Personalized headlines
    headlineArtist: 'Vis kunder tatoveringen for du tatoverernr',
    headlineCoverUp: 'Forvandle tatoveringen din med selvtillit',
    headlineTryOn: 'Se tatoveringen din for du bestemmer deg',
    headlineDesign: 'Design tatoveringen du alltid har dromt om',
    headlineBrowse: 'Finn din perfekte tatoveringsdesign',

    // Purchase flow alerts
    successTitle: 'Suksess!',
    subscriptionActiveMessage:
      'Abonnementet ditt er na aktivt. Nyt ubegrensede tatoveringsdesign!',
    almostThereTitle: 'Nesten der!',
    createAccountMessage:
      'Opprett en konto for a aktivere abonnementet ditt og begynne a designe.',
    purchaseRestoredTitle: 'Kjop gjenopprettet!',
    subscriptionNowActive: 'Abonnementet ditt er na aktivt.',
    purchaseFoundTitle: 'Kjop funnet!',
    purchasesRestoredMessage: 'Kjopene dine har blitt gjenopprettet.',
    noPurchasesFoundTitle: 'Ingen kjop funnet',
    noPurchasesFoundMessage:
      'Ingen tidligere kjop ble funnet a gjenopprette.',
    purchaseFailedTitle: 'Kjop mislyktes',
    purchaseFailedMessage:
      'Kunne ikke fullforetkjopet. Vennligst prov igjen.',
    errorRestoringTitle: 'Feil ved gjenoppretting av kjop',
    errorRestoringMessage:
      'Kunne ikke gjenopprette kjop. Vennligst prov igjen.',
    subscriptionActivated: 'Abonnement aktivert!',

    // Alerts
    purchaseError: 'Kjopsfeil',
    restoreSuccess: 'Kjop gjenopprettet',
    restoreError: 'Gjenoppretting mislyktes',
    noPurchaseFound: 'Ingen tidligere kjop funnet',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Avbryt generering',
    cancelGenerationTitle: 'Avbryte generering?',
    cancelGenerationMessage:
      'Du er i ferd med a avbryte den pagaende genereringen. Dette vil fjerne den navaerende genereringen og starte en ny okt.',
    clearEverythingTitle: 'Fjern alt?',
    clearEverythingMessage:
      'Du er i ferd med a fjerne denne okten. Dette vil fjerne alle genererte tatoveringer. Lagre alt du vil beholde for du fortsetter.',
    clearEverything: 'Fjern alt',

    // Input
    enterText: 'Skriv tekst',
    describeTattoo: 'Beskriv tatoveringen din eller velg et forslag nedenfor',

    // Try on alert
    tryOnTitle: 'Prov {{style}}',
    tryOnMessage:
      'Ta et bilde av kroppsdelen din for a se hvordan denne tatoveringen ser ut pa deg!',
    choosePhoto: 'Velg bilde',
    later: 'Senere',

    // Preview on body
    previewOnBody: 'Forhåndsvis tatovering pa kroppen',
    imageSelectedCombine: '1 bilde valgt - legg til ett til for a kombinere',

    // Suggestions
    createTattoo: 'Lag en {{title}}-tatovering',
    createStyleTattoo: 'Lag en tatovering i {{title}}-stil',
    tryStyle: 'Prov {{title}}-stilen',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Oppdaterer tatoveringen din...',
      startingNew: 'Starter ny tatovering...',
      warmingUp: 'Tatoveringsmaskinen varmer opp...',
      summoningSpirits: 'Paamaner blekkandene...',
      drawingInspiration: 'Henter inspirasjon fra universet...',
      brewingMasterpiece: 'Nesten ferdig med mesterverket ditt...',
      sprinkleCreativity: 'Legger til et dryss kreativitet...',
      perfectingPixels: 'Perfeksjonerer hver piksel av tatoveringen din...',
      injectingCreativity: 'Injiserer kreativitet i huden din...',
      mixingShade: 'Blander den perfekte nyansen av fantastisk...',
      sharpeningNeedles: 'Skjerper virtuelle naler...',
      calibratingVibes: 'Kalibrerer tatoveringsvisbraasjoonene dine...',
      consultingOracle: 'Konsulterer tatoveringsorakelet...',
    },

    // Error states
    error: {
      keepCreating: 'Fortsett a skape uten begrensninger',
      limitReachedFree:
        'Du har nadd den navaerende genereringsgrensen din. Oppgrader na for a utforske variasjoner, forfine design og fortsette a skape uten a vente.',
      unlockUnlimited: 'Las opp ubegrensede design \u2192',
      limitReachedSubscribed:
        'Du har nadd grensen for denne perioden',
      limitReachedSubscribedDesc:
        'Planens genereringsgrense er nadd. Grensen din tilbakestilles ved starten av neste faktureringsperiode.',
      tryAgainLater: 'Prov igjen senere',
      contactSupport: 'Kontakt support',
    },

    // Session history actions
    actions: 'Handlinger',
    saveToGallery: 'Lagre til galleri',

    // Result image actions
    imageActions: 'Bildehandlinger',
    copyToClipboard: 'Kopier til utklippstavle',
    imageCopied: 'Bilde kopiert til utklippstavlen',
    imageCopyFailed: 'Kunne ikke kopiere bildet',
    imageSaved: 'Bilde lagret i galleriet!',
    imageSaveFailed: 'Kunne ikke lagre bildet. Prov igjen.',

    // Context alerts
    photoAccessTitle: 'Fototilgang krevd',
    photoAccessMessage:
      'For a lagre bilder til galleriet ditt trenger vi tilgang til bildene dine. Du kan aktivere dette i Innstillinger.',
    resetSessionTitle: 'Tilbakestille okt?',
    resetSessionMessage:
      'Er du sikker pa at du vil tilbakestille okten? Dette vil fjerne alle genererte tatoveringer og starte en ny okt.',
    resetButton: 'Tilbakestill',
    shareError: 'Kunne ikke dele bildet',
    imageDataError: 'Kunne ikke hente bildedata',
    pickImageError: 'Kunne ikke velge bilde fra galleriet',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Bilde ikke funnet',
    useTattoo: 'Bruk tatovering',
    useTattooError: 'Kunne ikke bruke denne tatoveringen. Prov igjen.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Alle bilder',
    addPhotos: 'Legg til {{count}} bilde',
    addPhotos_other: 'Legg til {{count}} bilder',
    recentPhotos: 'Nylige bilder',
    selectOneMore: 'Velg 1 til for a kombinere',

    // Options
    tryOn: 'Prov pa',
    tryOnDescriptionWithTattoo:
      'Legg til et bilde av kroppen din for a forhåndsvise',
    tryOnDescriptionNoTattoo:
      'Velg en tatovering forst, legg deretter til bildet ditt',
    createNewTattoo: 'Lag ny tatovering',
    createNewTattooDescription:
      'Beskriv tatoveringsideen din, sa genererer vi den',
    tattooCoverUp: 'Overdekkingsidee',
    tattooCoverUpDescription:
      'Generer en idee for a dekke over en eksisterende tatovering med et bilde som referanse',
    removeTattoo: 'Fjern tatovering',
    removeTattooDescription:
      'Fjern en eksisterende tatovering fra bildet',
    promptHistory: 'Prompthistorikk',
    promptHistoryDescription: 'Se dine tidligere prompter',
    requestFeature: 'Foresla en funksjon',
    requestFeatureDescription:
      'Fortell oss hva du vil at Tattoo Design AI skal stotte videre',

    // Try on alerts
    addYourPhoto: 'Legg til bildet ditt',
    addPhotoQuestion:
      'Hvordan vil du legge til et bilde av hvor du vil ha tatoveringen?',
    takePhoto: 'Ta bilde',
    chooseFromLibrary: 'Velg fra bibliotek',
    createTattooFirst: 'Lag en tatovering forst',
    createTattooFirstMessage:
      'For a prove pa en tatovering, ma du:\n\n1. Generere eller velge en tatoveringsdesign\n2. Deretter legge til et bilde av kroppen din\n\nVi kombinerer dem for a vise hvordan det ser ut!',
    createTattoo: 'Lag tatovering',
  },

  tattoos: {
    // Screen header
    title: 'Mine tatoveringer',

    // Loading
    loading: 'Laster tatoveringer...',

    // Empty state
    emptyTitle: 'Ingen lagrede tatoveringer enna',
    emptyDescription:
      'Lag og lagre din forste tatoveringsdesign! Sveip ned for a oppdatere.',

    // Cloud restore
    restoringFromCloud: 'Gjenoppretter fra skyen...',
    noCloudGenerations: 'Ingen skygenerasjoner funnet',
    restoredCount: 'Gjenopprettet {{restored}} av {{total}} tatoveringer',
    restoreFailedTitle: 'Gjenoppretting mislyktes',
    restoreFailedMessage:
      'Kunne ikke gjenopprette fra skyen. Prov igjen.',
    cloudFound: '{{count}} tatovering funnet i skyen',
    cloudFound_other: '{{count}} tatoveringer funnet i skyen',
    restoring: 'Gjenoppretter...',
    restore: 'Gjenopprett',
    cloudCount: '{{count}} i skyen',

    // Detail screen
    tattooNotFound: 'Tatovering ikke funnet',
    backToHome: 'Tilbake til hjem',
    shareError: 'Kunne ikke dele bildet. Prov igjen.',
    imageAccessError: 'Kunne ikke fa tilgang til bildefilen.',
    deleteTitle: 'Slett tatovering',
    deleteMessage:
      'Er du sikker pa at du vil slette denne tatoveringsdesignen? Denne handlingen kan ikke angres.',
    deleteError: 'Kunne ikke slette bildet. Prov igjen.',
  },

  generation: {
    // Loading
    applyingDesign: 'Paforer tatoveringsdesignen din...',

    // Error
    invalidRequest: 'Ugyldig foresporsel',
    generationFailed: 'Generering mislyktes',
    failedToGenerate: 'Kunne ikke generere tatoveringsdesign',
    startOver: 'Start pa nytt',

    // Success
    tattooReady: 'Tatoveringen din er klar!',
    tattooReadyDescription:
      'Slik ville designen din sett ut pafort',
    saveToGallery: 'Lagre til galleri',
    generateAnother: 'Generer en til',

    // Save alerts
    savedTitle: 'Lagret!',
    savedMessage:
      'Tatoveringsdesignen din har blitt lagret i fotogalleriet ditt.',
    viewInGallery: 'Vis i galleriet',

    // Generate another alert
    generateAnotherTitle: 'Generere en til?',
    generateAnotherMessage:
      'Du har ikke lagret denne tatoveringen enna. Vil du lagre den for du fortsetter?',
    continueWithoutSaving: 'Fortsett uten a lagre',
    saveAndContinue: 'Lagre og fortsett',

    // Cancel alert
    cancelGenerationTitle: 'Avbryte generering?',
    cancelGenerationMessage:
      'Tatoveringen din genereres fortsatt. Hvis du avbryter na, vil denne genereringen fortsatt telle mot bruksgrensen din. Er du sikker pa at du vil avbryte?',
    keepGenerating: 'Fortsett a generere',
    unableToSave: 'Kunne ikke lagre bildet. Prov igjen.',
  },

  home: {
    // Section headers
    discoverStyles: 'Oppdag nye stiler',
    moreStyles: 'Flere stiler',
    moods: 'Stemninger',
    discoverSketches: 'Oppdag skissedesign',

    // Quick actions
    generateFromIdea: 'Generer fra idee',
    generateFromIdeaDesc: 'Lag en tatovering fra fantasien din',
    seeItOnSkin: 'Se den pa huden din',
    seeItOnSkinDesc: 'Ta et bilde og forhåndsvis tatoveringen',
    blendTattoo: 'Bland tatovering',
    blendTattooDesc: 'Last opp en eksisterende tatovering og endre den',
    removeTattoo: 'Fjern tatovering',
    removeTattooDesc: 'Fjern en eksisterende tatovering fra huden',
  },

  explore: {
    // Section headers
    byStyles: 'Utforsk etter stiler',
    byMoods: 'Utforsk etter stemninger',
    byBodyPart: 'Utforsk etter kroppsdel',

    // Filter labels
    styles: 'Stiler',
    bodyPart: 'Kroppsdel',
  },

  featureRequest: {
    title: 'Del ideene dine',
    placeholder: 'Ideer for a forbedre opplevelsen din...',
    needHelp: 'Trenger du hjelp? ',
    contactUs: 'Kontakt oss',
    successToast:
      'Funksjonsforslag sendt! Takk for tilbakemeldingen din.',
    errorToast:
      'Kunne ikke sende funksjonsforslaget. Prov igjen.',
  },

  promptHistory: {
    title: 'Prompthistorikk',
    clearAll: 'Fjern alt',
    clearAllTitle: 'Fjern prompthistorikk',
    clearAllMessage:
      'Er du sikker pa at du vil slette alle lagrede prompter?',
    deletePromptTitle: 'Slett prompt',
    deletePromptMessage: 'Fjerne denne prompten fra historikken?',
    emptyTitle: 'Ingen prompter enna',
    emptyDescription:
      'Promptene dine vises her etter at du har generert en tatovering',
  },
};
