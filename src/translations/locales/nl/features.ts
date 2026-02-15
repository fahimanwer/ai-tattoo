/**
 * Dutch translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const nlFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Bekijk je tattoo voordat je de stap zet.',
    whatsYourName: 'Hoe heet je?',
    namePlaceholder: 'Je naam',
    nameDescription: 'We gebruiken dit om je ervaring te personaliseren.',
    welcome: 'Welkom',
    welcomeDescription: 'Laten we je Tattoo Design AI-ervaring nu afstemmen.',
    describeYou: 'Wat beschrijft\n jou het beste?',
    describeYouDescription:
      'Dit helpt ons de ervaring te personaliseren op basis van hoe jij met tattoos omgaat',
    whatToDo: 'Wat zou je\n willen doen?',
    whatToDoDescription:
      'Dit helpt ons begrijpen hoe je tattoos wilt verkennen en welke tools het meest nuttig voor je zijn.',
    designTattoo: 'Ontwerp de\n tattoo die je wilt',
    designTattooDescription:
      'Typ een paar woorden of upload een afbeelding en genereer direct unieke tattoo-ontwerpen.',
    whereTattoo: 'Waar wil je\n de tattoo?',
    whereTattooDescription:
      'Plaatsing beïnvloedt het ontwerp, de grootte en het verloop, wat ons helpt ideeën af te stemmen op je lichaam.',
    pickStyles: 'Kies maximaal\n 5 stijlen',
    pickStylesDescription:
      'Je stijlkeuzes helpen ons ontwerpen te vinden die bij je smaak passen.',
    whenTattoo: 'Wanneer denk je\n de tattoo te nemen?',
    whenTattooDescription:
      'Dit helpt ons de ervaring\n af te stemmen op je tijdlijn.',
    whatVibe: 'Welke sfeer\n zoek je?',
    whatVibeDescription:
      'Tattoos dragen emoties; dit helpt ons het verhaal achter de jouwe te begrijpen.',
    settingUp: 'We maken alles\n voor je klaar',
    youreAllSet: 'Je bent er klaar voor!',
    youreAllSetDescription: 'Je bent helemaal klaar om te beginnen.',

    // CTA
    alreadyHaveAccount: 'Heb je al een account? ',
    signIn: 'Inloggen',

    // User description options
    userDescription: {
      artist: 'Ik maak tattoos',
      client: 'Ik laat een tattoo zetten',
      model: 'Ik gebruik tattoos voor content',
      explorer: 'Ik ben gewoon aan het verkennen',
    },

    // Goal options
    goal: {
      tryOn: 'Tattoos uitproberen op mijn foto\'s',
      generate: 'Tattoo-ideeën genereren',
      browse: 'Gewoon rondkijken of inspiratie zoeken',
      coverUp: 'Een bestaande tattoo bedekken/herwerken',
    },

    // Location options
    location: {
      wrist: 'Pols',
      chest: 'Borst',
      hand: 'Hand',
      back: 'Rug',
      legs: 'Benen',
      forearm: 'Onderarm',
      neck: 'Nek',
      jaw: 'Kaak',
      forehead: 'Voorhoofd',
      knuckles: 'Knokkels',
      fingers: 'Vingers',
      cheek: 'Wang',
      shoulder: 'Schouder',
      temple: 'Slaap',
      ribs: 'Ribben',
      abdomen: 'Buik',
      face: 'Gezicht',
      hips: 'Heupen',
      thigh: 'Dij',
      tricep: 'Triceps',
      bicep: 'Biceps',
      collarbone: 'Sleutelbeen',
      ankle: 'Enkel',
      foot: 'Voet',
      palm: 'Handpalm',
      notSure: 'Weet ik niet zeker',
    },

    // Style options
    styles: {
      traditional: 'Traditioneel',
      realism: 'Realisme',
      minimal: 'Minimalistisch',
      celtic: 'Keltisch',
      blackwork: 'Blackwork',
      illustrative: 'Illustratief',
      lettering: 'Lettering',
      irezumi: 'Irezumi',
      geometric: 'Geometrisch',
      religious: 'Religieus',
      anime: 'Anime',
      fineLine: 'Fine Line',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Kalligrafie',
      portrait: 'Portret',
      floral: 'Bloemen',
      polynesian: 'Polynesisch',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gotisch',
      patchwork: 'Patchwork',
      abstract: 'Abstract',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologie',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Deze week',
      thisMonth: 'Deze maand',
      oneToThreeMonths: 'Over 1-3 maanden',
      someday: 'Op een dag, ik ben gewoon aan het verkennen',
    },

    // Vibe options
    vibe: {
      bold: 'Gedurfd',
      confident: 'Zelfverzekerd',
      soft: 'Zacht',
      dark: 'Donker',
      edgy: 'Scherp',
      elegant: 'Elegant',
      spiritual: 'Spiritueel',
      cute: 'Schattig',
      symbolic: 'Symbolisch',
      playful: 'Speels',
      clean: 'Strak',
      modern: 'Modern',
      meaningful: 'Betekenisvol',
      personalStory: 'Persoonlijk verhaal',
      family: 'Familie',
      love: 'Liefde',
      memory: 'Herinnering',
      rebirth: 'Wedergeboorte',
      freedom: 'Vrijheid',
      mystical: 'Mystiek',
      rebellious: 'Rebels',
      serene: 'Sereen',
      empowered: 'Krachtig',
      ethereal: 'Etherisch',
      fearless: 'Onverschrokken',
      wanderlust: 'Reislust',
      transcendent: 'Transcendent',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'De visie van {{name}} begrijpen',
      understandingVisionDefault: 'Je visie begrijpen',
      tailoringDesigns: 'Ontwerpen afstemmen op je stijl',
      settingUpCoverUp: 'Cover-up tools instellen',
      personalizingExperience: 'Je ervaring personaliseren',
      preparingStudio: 'Je ontwerpstudio voorbereiden',
      configuringWorkspace: 'Je werkruimte configureren',
      applyingPreferences: 'Je voorkeuren toepassen',
      journeyStartsNow: 'Je tattoo-reis begint nu',
    },

    // Reviews
    reviews: {
      review1Title: 'Geweldige app!',
      review1Body:
        'App werkt, ziet er geweldig uit en voelt fantastisch! Onder de indruk van hoe goed het de tattoo aanbrengt, met nauwkeurige belichting en schaduw.',
      review1Author: 'Jacob C.',
      review2Title: 'Echt nuttig',
      review2Body:
        'De tattoo-ontwerpen zijn clean en gedetailleerd. Sommige afbeeldingen duren wat langer om te genereren, maar over het geheel genomen is het een van de beste AI tattoo-apps.',
      review2Author: 'Alexrays1',
      review3Title: 'Ik hou ervan',
      review3Body: 'Sterk aanbevolen \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Genereer direct tattoos',
    containerDesc1:
      'Typ een paar woorden en genereer direct unieke tattoo-ontwerpen.',
    containerTitle2: 'Personaliseer je ontwerp',
    containerDesc2:
      'Pas kleuren, lay-out en stijl aan om de tattoo helemaal van jou te maken.',
    containerTitle3: 'Bekijk op je huid',
    containerDesc3:
      'Bekijk elke tattoo op je huid — pas grootte en plaatsing direct aan.',
    paused: 'Gepauzeerd',

    // Relative time
    time: {
      today: 'Vandaag',
      yesterday: 'Gisteren',
      daysAgo: '{{count}} dagen geleden',
      weeksAgo: '{{count}} weken geleden',
      monthsAgo: '{{count}} maanden geleden',
      yearsAgo: '{{count}} jaar geleden',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Pas-technologie',
      tryOnTechnologyDesc: 'Bekijk tattoos op je huid voordat je beslist',
      aiTattooGenerator: 'AI Tattoo Generator',
      aiTattooGeneratorDesc: 'Creëer unieke ontwerpen uit je ideeën',
      coverUpAssistant: 'Cover-up Assistent',
      coverUpAssistantDesc: 'Verander bestaande tattoos in nieuwe kunst',
      artistTools: 'Artiest Tools',
      artistToolsDesc:
        'Toon klanten ontwerpen op hun lichaam direct',
      precisePlacement: 'Nauwkeurige Plaatsing',
      precisePlacementDesc:
        'Perfecte afmetingen voor je {{location}} tattoo',
      styleMatchedDesigns: 'Stijlafgestemde Ontwerpen',
      styleMatchedDesignsDesc:
        'Geselecteerde {{style}} tattoo-inspiratie',
      readyWhenYouAre: 'Klaar Wanneer Jij Dat Bent',
      readyWhenYouAreDesc: 'Begin vandaag met ontwerpen, laat morgen tatoeëren',
      realisticTryOn: 'Realistische Pas-ervaring',
      realisticTryOnDesc: 'Zie precies hoe het er op je uitziet',
      saveAndShare: 'Opslaan & Delen',
      saveAndShareDesc:
        'Bewaar je favorieten en deel ze met je artiest',
      aiDesignStudio: 'AI Ontwerpstudio',
      aiDesignStudioDesc: 'Genereer direct unieke tattoo-ontwerpen',

      // Personalized greetings
      greetingArtist: 'Je nieuwe klantervaring-tool is klaar',
      greetingCoverUp: 'Klaar om je tattoo te transformeren',
      greetingGenerate: 'Je AI-ontwerpstudio wacht',
      greetingDefault: 'Je tattoo-reis begint nu',
      welcomeAboard: 'Welkom aan boord, {{name}}!',
      welcomeName: 'Welkom {{name}}',

      // Urgency messages
      urgencyArtist: 'Toon klanten direct realistische previews.',
      urgencyCoverUp: 'Verbeter je tattoo met vertrouwen.',
      urgencyTryOn: 'Probeer je tattoo voordat je beslist.',
      urgencyDefault: 'Onbeperkte ontwerpen. Nul spijt.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Doorgaan',
    restorePurchase: 'Aankoop herstellen',
    current: 'HUIDIG',

    // Plan terms
    week: 'Week',
    month: 'Maand',
    weekly: 'Wekelijks',
    perWeek: '/Week',

    // Content
    loadingPlans: 'Abonnementen laden…',
    restoreSubscription: 'Abonnement herstellen',
    fairUseNote: 'AI-ontwerpgeneratie omvat redelijk-gebruik limieten.',
    saveBadge: 'Bespaar {{percent}}%',
    subtitle:
      'Verken tattoo-ideeën, verfijn ontwerpen door eindeloze variaties, probeer ze op elk lichaamsdeel en exporteer resultaten van hoge kwaliteit met vertrouwen.',

    // Personalized headlines
    headlineArtist: 'Toon klanten hun tattoo voordat je inkt',
    headlineCoverUp: 'Transformeer je tattoo met vertrouwen',
    headlineTryOn: 'Bekijk je tattoo voordat je beslist',
    headlineDesign: 'Ontwerp de tattoo waar je altijd van hebt gedroomd',
    headlineBrowse: 'Vind je perfecte tattoo-ontwerp',

    // Purchase flow alerts
    successTitle: 'Gelukt!',
    subscriptionActiveMessage:
      'Je abonnement is nu actief. Geniet van onbeperkte tattoo-ontwerpen!',
    almostThereTitle: 'Bijna klaar!',
    createAccountMessage:
      'Maak een account aan om je abonnement te activeren en te beginnen met ontwerpen.',
    purchaseRestoredTitle: 'Aankoop Hersteld!',
    subscriptionNowActive: 'Je abonnement is nu actief.',
    purchaseFoundTitle: 'Aankoop Gevonden!',
    purchasesRestoredMessage: 'Je aankopen zijn hersteld.',
    noPurchasesFoundTitle: 'Geen Aankopen Gevonden',
    noPurchasesFoundMessage:
      'Er zijn geen eerdere aankopen gevonden om te herstellen.',
    purchaseFailedTitle: 'Aankoop Mislukt',
    purchaseFailedMessage:
      'Kan aankoop niet voltooien. Probeer het opnieuw.',
    errorRestoringTitle: 'Fout bij Herstellen Aankopen',
    errorRestoringMessage:
      'Kan aankopen niet herstellen. Probeer het opnieuw.',
    subscriptionActivated: 'Abonnement geactiveerd!',

    // Alerts
    purchaseError: 'Aankoopfout',
    restoreSuccess: 'Aankoop Hersteld',
    restoreError: 'Herstellen Mislukt',
    noPurchaseFound: 'Geen eerdere aankoop gevonden',

    // Pricing overhaul
    annual: 'Jaarlijks',
    year: 'Jaar',
    perYear: '/Jaar',
    freeTrialBadge: '{{days}} DAGEN GRATIS PROEFPERIODE',
    startTrialButton: 'Start {{days}} dagen gratis proefperiode',
    specialOffer: 'Speciale Aanbieding',
    limitedTimeOffer: 'Tijdelijke Aanbieding',
    discountSubtitle: 'Alleen voor nieuwe gebruikers — ontgrendel vandaag volledige toegang',
    savePercent: 'Bespaar {{percent}}%',
    annualPerWeek: '{{price}}/week',
    todayOnly: 'Alleen Vandaag',
    offerExpires: 'Aanbieding verloopt over',
    perWeekBilled: 'per week, gefactureerd {{period}}',
    originalPrice: 'Was {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Generatie annuleren',
    cancelGenerationTitle: 'Generatie annuleren?',
    cancelGenerationMessage:
      'Je staat op het punt de huidige generatie te annuleren. Dit verwijdert de huidige generatie en start een nieuwe sessie.',
    clearEverythingTitle: 'Alles wissen?',
    clearEverythingMessage:
      'Je staat op het punt deze sessie te wissen. Alle gegenereerde tattoos worden verwijderd. Sla alles op wat je wilt bewaren voordat je doorgaat.',
    clearEverything: 'Alles wissen',

    // Input
    enterText: 'Voer tekst in',
    describeTattoo: 'Beschrijf je tattoo of kies een suggestie hieronder',

    // Try on alert
    tryOnTitle: '{{style}} uitproberen',
    tryOnMessage:
      'Maak een foto van je lichaamsdeel om te zien hoe deze tattoo op je staat!',
    choosePhoto: 'Foto kiezen',
    later: 'Later',

    // Preview on body
    previewOnBody: 'Tattoo op lichaam bekijken',
    imageSelectedCombine: '1 afbeelding geselecteerd - voeg er nog 1 toe om te combineren',

    // Suggestions
    createTattoo: 'Maak een {{title}} tattoo',
    createStyleTattoo: 'Maak een {{title}} stijl tattoo',
    tryStyle: 'Probeer {{title}} stijl',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Je tattoo wordt bijgewerkt...',
      startingNew: 'Nieuwe tattoo starten...',
      warmingUp: 'Tattooapparaat warmt op...',
      summoningSpirits: 'Inkt-geesten worden opgeroepen...',
      drawingInspiration: 'Inspiratie putten uit het universum...',
      brewingMasterpiece: 'Je meesterwerk is bijna klaar...',
      sprinkleCreativity: 'Een vleugje creativiteit toevoegen...',
      perfectingPixels: 'Elke pixel van je tattoo perfectioneren...',
      injectingCreativity: 'Creativiteit in je huid injecteren...',
      mixingShade: 'De perfecte tint mixen...',
      sharpeningNeedles: 'Virtuele naalden slijpen...',
      calibratingVibes: 'Je tattoo-vibes kalibreren...',
      consultingOracle: 'Het tattoo-orakel raadplegen...',
    },

    // Error states
    error: {
      keepCreating: 'Blijf onbeperkt creëren',
      limitReachedFree:
        'Je hebt je huidige generatielimiet bereikt. Upgrade nu om variaties te verkennen, ontwerpen te verfijnen en zonder te wachten te blijven creëren.',
      unlockUnlimited: 'Ontgrendel onbeperkte ontwerpen \u2192',
      limitReachedSubscribed:
        'Je hebt je limiet voor deze periode bereikt',
      limitReachedSubscribedDesc:
        'De generatielimiet van je abonnement is bereikt. Je limiet wordt gereset aan het begin van je volgende factureringsperiode.',
      tryAgainLater: 'Probeer het later opnieuw',
      contactSupport: 'Contact opnemen',
    },

    // Session history actions
    actions: 'Acties',
    saveToGallery: 'Opslaan in galerij',

    // Result image actions
    imageActions: 'Afbeeldingsacties',
    copyToClipboard: 'Kopiëren naar klembord',
    imageCopied: 'Afbeelding gekopieerd naar klembord',
    imageCopyFailed: 'Kan afbeelding niet kopiëren',
    imageSaved: 'Afbeelding opgeslagen in galerij!',
    imageSaveFailed: 'Kan afbeelding niet opslaan. Probeer het opnieuw.',

    // Context alerts
    photoAccessTitle: 'Fototoegang nodig',
    photoAccessMessage:
      'Om afbeeldingen in je galerij op te slaan, hebben we toegang tot je foto\'s nodig. Je kunt dit inschakelen in Instellingen.',
    resetSessionTitle: 'Sessie resetten?',
    resetSessionMessage:
      'Weet je zeker dat je de sessie wilt resetten? Alle gegenereerde tattoos worden gewist en er wordt een nieuwe sessie gestart.',
    resetButton: 'Resetten',
    shareError: 'Kan afbeelding niet delen',
    imageDataError: 'Kan afbeeldingsgegevens niet ophalen',
    pickImageError: 'Kan geen afbeelding uit galerij kiezen',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Afbeelding niet gevonden',
    useTattoo: 'Tattoo gebruiken',
    useTattooError: 'Kan deze tattoo niet gebruiken. Probeer het opnieuw.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Alle foto\'s',
    addPhotos: '{{count}} foto toevoegen',
    addPhotos_other: '{{count}} foto\'s toevoegen',
    recentPhotos: 'Recente foto\'s',
    selectOneMore: 'Selecteer er nog 1 om te combineren',

    // Options
    tryOn: 'Uitproberen',
    tryOnDescriptionWithTattoo:
      'Voeg een foto van je lichaam toe voor een preview',
    tryOnDescriptionNoTattoo:
      'Selecteer eerst een tattoo, voeg dan je foto toe',
    createNewTattoo: 'Nieuwe Tattoo Maken',
    createNewTattooDescription:
      'Beschrijf je tattoo-idee en wij genereren het',
    tattooCoverUp: 'Tattoo Cover-Up Idee',
    tattooCoverUpDescription:
      'Genereer een idee om een bestaande tattoo te bedekken met een foto als referentie',
    removeTattoo: 'Tattoo Verwijderen',
    removeTattooDescription:
      'Verwijder een bestaande tattoo van de foto',
    promptHistory: 'Promptgeschiedenis',
    promptHistoryDescription: 'Bekijk je eerdere prompts',
    requestFeature: 'Functie Aanvragen',
    requestFeatureDescription:
      'Vertel ons wat je graag wilt dat Tattoo Design AI als volgende ondersteunt',

    // Try on alerts
    addYourPhoto: 'Voeg Je Foto Toe',
    addPhotoQuestion:
      'Hoe wil je een foto toevoegen van waar je de tattoo wilt?',
    takePhoto: 'Foto Maken',
    chooseFromLibrary: 'Kiezen uit Bibliotheek',
    createTattooFirst: 'Maak Eerst een Tattoo',
    createTattooFirstMessage:
      'Om een tattoo uit te proberen, moet je:\n\n1. Een tattoo-ontwerp genereren of selecteren\n2. Dan een foto van je lichaam toevoegen\n\nWe combineren ze om te laten zien hoe het eruitziet!',
    createTattoo: 'Tattoo Maken',
  },

  tattoos: {
    // Screen header
    title: 'Mijn Tattoos',

    // Loading
    loading: 'Tattoos laden...',

    // Empty state
    emptyTitle: 'Nog geen tattoos opgeslagen',
    emptyDescription:
      'Maak en sla je eerste tattoo-ontwerp op! Veeg naar beneden om te vernieuwen.',

    // Cloud restore
    restoringFromCloud: 'Herstellen vanuit de cloud...',
    noCloudGenerations: 'Geen cloud-generaties gevonden',
    restoredCount: '{{restored}} van {{total}} tattoos hersteld',
    restoreFailedTitle: 'Herstellen Mislukt',
    restoreFailedMessage:
      'Kan niet herstellen vanuit de cloud. Probeer het opnieuw.',
    cloudFound: '{{count}} tattoo gevonden in de cloud',
    cloudFound_other: '{{count}} tattoos gevonden in de cloud',
    restoring: 'Herstellen...',
    restore: 'Herstellen',
    cloudCount: '{{count}} in de cloud',

    // Detail screen
    tattooNotFound: 'Tattoo niet gevonden',
    backToHome: 'Terug naar home',
    shareError: 'Kan afbeelding niet delen. Probeer het opnieuw.',
    imageAccessError: 'Kan het afbeeldingsbestand niet openen.',
    deleteTitle: 'Tattoo Verwijderen',
    deleteMessage:
      'Weet je zeker dat je dit tattoo-ontwerp wilt verwijderen? Deze actie kan niet ongedaan worden gemaakt.',
    deleteError: 'Kan afbeelding niet verwijderen. Probeer het opnieuw.',
  },

  generation: {
    // Loading
    applyingDesign: 'Je tattoo-ontwerp wordt toegepast...',

    // Error
    invalidRequest: 'Ongeldig Verzoek',
    generationFailed: 'Generatie Mislukt',
    failedToGenerate: 'Kan tattoo-ontwerp niet genereren',
    startOver: 'Opnieuw beginnen',

    // Success
    tattooReady: 'Je Tattoo is Klaar!',
    tattooReadyDescription:
      'Zo zou je ontwerp eruit zien als het is aangebracht',
    saveToGallery: 'Opslaan in Galerij',
    generateAnother: 'Nog Een Genereren',

    // Save alerts
    savedTitle: 'Opgeslagen!',
    savedMessage:
      'Je tattoo-ontwerp is opgeslagen in je fotogalerij.',
    viewInGallery: 'Bekijk in galerij',

    // Generate another alert
    generateAnotherTitle: 'Nog Een Genereren?',
    generateAnotherMessage:
      'Je hebt deze tattoo nog niet opgeslagen. Wil je opslaan voordat je verdergaat?',
    continueWithoutSaving: 'Doorgaan Zonder Opslaan',
    saveAndContinue: 'Opslaan en Doorgaan',

    // Cancel alert
    cancelGenerationTitle: 'Generatie Annuleren?',
    cancelGenerationMessage:
      'Je tattoo wordt nog gegenereerd. Als je nu annuleert, telt deze generatie nog mee voor je gebruikslimiet. Weet je zeker dat je wilt annuleren?',
    keepGenerating: 'Blijven Genereren',
    unableToSave: 'Kan afbeelding niet opslaan. Probeer het opnieuw.',
  },

  home: {
    // Section headers
    discoverStyles: 'Ontdek nieuwe stijlen',
    moreStyles: 'Meer stijlen',
    moods: 'Stemmingen',
    discoverSketches: 'Ontdek schetsontwerpen',

    // Quick actions
    generateFromIdea: 'Genereer vanuit Idee',
    generateFromIdeaDesc: 'Maak een tattoo vanuit je verbeelding',
    seeItOnSkin: 'Bekijk op Je Huid',
    seeItOnSkinDesc: 'Maak een foto en bekijk de tattoo-preview',
    blendTattoo: 'Tattoo Mengen',
    blendTattooDesc: 'Upload een bestaande tattoo en pas deze aan',
    removeTattoo: 'Tattoo Verwijderen',
    removeTattooDesc: 'Verwijder een bestaande tattoo van de huid',
  },

  explore: {
    // Section headers
    byStyles: 'Verken op stijl',
    byMoods: 'Verken op stemming',
    byBodyPart: 'Verken op lichaamsdeel',

    // Filter labels
    styles: 'Stijlen',
    bodyPart: 'Lichaamsdeel',
  },

  featureRequest: {
    title: 'Deel Je Ideeën',
    placeholder: 'Ideeën om je ervaring te verbeteren...',
    needHelp: 'Hulp nodig? ',
    contactUs: 'Neem contact op',
    successToast:
      'Functieverzoek verzonden! Bedankt voor je feedback.',
    errorToast:
      'Kan functieverzoek niet verzenden. Probeer het opnieuw.',
  },

  promptHistory: {
    title: 'Promptgeschiedenis',
    clearAll: 'Alles Wissen',
    clearAllTitle: 'Promptgeschiedenis Wissen',
    clearAllMessage:
      'Weet je zeker dat je alle opgeslagen prompts wilt verwijderen?',
    deletePromptTitle: 'Prompt Verwijderen',
    deletePromptMessage: 'Deze prompt uit de geschiedenis verwijderen?',
    emptyTitle: 'Nog geen prompts',
    emptyDescription:
      'Je prompts verschijnen hier nadat je een tattoo hebt gegenereerd',
  },
};
