/**
 * Danish translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const daFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Se din tatovering for du beslutter dig.',
    whatsYourName: 'Hvad hedder du?',
    namePlaceholder: 'Dit navn',
    nameDescription: 'Vi bruger dette til at tilpasse din oplevelse.',
    welcome: 'Velkommen',
    welcomeDescription: 'Lad os tilpasse din Tattoo Design AI-oplevelse nu.',
    describeYou: 'Hvad beskriver\n dig bedst?',
    describeYouDescription:
      'Dette hjaelper os med at tilpasse oplevelsen baseret pa dit forhold til tatoveringer',
    whatToDo: 'Hvad vil du\n gerne gore?',
    whatToDoDescription:
      'Dette hjaelper os med at forsta, hvordan du vil udforske tatoveringer, og hvilke vaerktoejer der er mest nyttige for dig.',
    designTattoo: 'Design den\n tatovering du vil have',
    designTattooDescription:
      'Skriv et par ord eller upload et billede og generer unikke tatoveringsdesigns ojeblikkelig.',
    whereTattoo: 'Hvor vil du have\n tatoveringen?',
    whereTattooDescription:
      'Placeringen pavirker designet, storrelsen og flowet, hvilket hjaelper os med at skraeddersy ideer til din krop.',
    pickStyles: 'Vaelg op til 5\n stile du kan lide',
    pickStylesDescription:
      'Dine stilvalg hjaelper os med at indsnavre designs, der matcher din smag.',
    whenTattoo: 'Hvornår taenker du\n at fa tatoveringen?',
    whenTattooDescription:
      'Dette hjaelper os med at matche\n oplevelsen til din tidsplan.',
    whatVibe: 'Hvilken stemning\n gar du efter?',
    whatVibeDescription:
      'Tatoveringer baerer folelser, dette hjaelper os med at forsta historien bag din.',
    settingUp: 'Saetter alt op\n til dig',
    youreAllSet: 'Du er klar!',
    youreAllSetDescription: 'Du er klar til at ga i gang.',

    // CTA
    alreadyHaveAccount: 'Har du allerede en konto? ',
    signIn: 'Log ind',

    // User description options
    userDescription: {
      artist: 'Jeg laver tatoveringer',
      client: 'Jeg skal have en tatovering',
      model: 'Jeg bruger tatoveringer til indhold',
      explorer: 'Jeg udforsker bare',
    },

    // Goal options
    goal: {
      tryOn: 'Prov tatoveringer pa mine billeder',
      generate: 'Generer tatoveringsideer',
      browse: 'Bare kigger eller soger inspiration',
      coverUp: 'Daekke over/omarbejde en eksisterende tatovering',
    },

    // Location options
    location: {
      wrist: 'Handled',
      chest: 'Bryst',
      hand: 'Hand',
      back: 'Ryg',
      legs: 'Ben',
      forearm: 'Underarm',
      neck: 'Nakke',
      jaw: 'Kaebe',
      forehead: 'Pande',
      knuckles: 'Knoer',
      fingers: 'Fingre',
      cheek: 'Kind',
      shoulder: 'Skulder',
      temple: 'Tinding',
      ribs: 'Ribben',
      abdomen: 'Mave',
      face: 'Ansigt',
      hips: 'Hofter',
      thigh: 'Lar',
      tricep: 'Triceps',
      bicep: 'Biceps',
      collarbone: 'Kraveben',
      ankle: 'Ankel',
      foot: 'Fod',
      palm: 'Handfladen',
      notSure: 'Ikke sikker',
    },

    // Style options
    styles: {
      traditional: 'Traditionel',
      realism: 'Realisme',
      minimal: 'Minimal',
      celtic: 'Keltisk',
      blackwork: 'Blackwork',
      illustrative: 'Illustrativ',
      lettering: 'Bogstaver',
      irezumi: 'Irezumi',
      geometric: 'Geometrisk',
      religious: 'Religios',
      anime: 'Anime',
      fineLine: 'Fin linje',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Kalligrafi',
      portrait: 'Portraet',
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
      thisWeek: 'I denne uge',
      thisMonth: 'I denne maned',
      oneToThreeMonths: 'Om 1-3 maneder',
      someday: 'En dag, jeg udforsker bare',
    },

    // Vibe options
    vibe: {
      bold: 'Modig',
      confident: 'Selvsikker',
      soft: 'Blod',
      dark: 'Mork',
      edgy: 'Skarp',
      elegant: 'Elegant',
      spiritual: 'Spirituel',
      cute: 'Sod',
      symbolic: 'Symbolsk',
      playful: 'Legesyg',
      clean: 'Ren',
      modern: 'Moderne',
      meaningful: 'Meningsfuld',
      personalStory: 'Personlig historie',
      family: 'Familie',
      love: 'Kaerlighed',
      memory: 'Minde',
      rebirth: 'Genfoedsel',
      freedom: 'Frihed',
      mystical: 'Mystisk',
      rebellious: 'Oproorsk',
      serene: 'Rolig',
      empowered: 'Styrket',
      ethereal: 'Eterisk',
      fearless: 'Frygtloes',
      wanderlust: 'Rejselyst',
      transcendent: 'Transcendent',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Forstar {{name}}s vision',
      understandingVisionDefault: 'Forstar din vision',
      tailoringDesigns: 'Skraeddersyr designs til din stil',
      settingUpCoverUp: 'Saetter overddaekningsvaerktoejer op',
      personalizingExperience: 'Tilpasser din oplevelse',
      preparingStudio: 'Forbereder dit designstudie',
      configuringWorkspace: 'Konfigurerer dit arbejdsomrade',
      applyingPreferences: 'Anvender dine praeferencer',
      journeyStartsNow: 'Din tatoveringsrejse begynder nu',
    },

    // Reviews
    reviews: {
      review1Title: 'Fantastisk app!',
      review1Body:
        'Appen virker, ser ud og foeles fantastisk! Imponeret over, hvor godt den paforte tatoveringen med nojagtig belysning og skyggelaegning.',
      review1Author: 'Jacob C.',
      review2Title: 'Faktisk brugbar',
      review2Body:
        'Tatoveringsdesignene er rene og detaljerede. Nogle billeder tager lidt laengere tid at generere, men samlet set er det en af de bedste AI-tatoveringsapps derude.',
      review2Author: 'Alexrays1',
      review3Title: 'Elsker den',
      review3Body: 'Staerkt anbefalet \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Generer tatoveringer ojeblikkelig',
    containerDesc1:
      'Skriv et par ord og generer unikke tatoveringsdesigns ojeblikkelig.',
    containerTitle2: 'Tilpas dit design',
    containerDesc2:
      'Juster farver, layout og stil for at gore tatoveringen helt din.',
    containerTitle3: 'Se den pa din hud',
    containerDesc3:
      'Se enhver tatovering pa din hud — juster storrelse og placering ojeblikkelig.',
    paused: 'Sat pa pause',

    // Relative time
    time: {
      today: 'I dag',
      yesterday: 'I gar',
      daysAgo: '{{count}} dage siden',
      weeksAgo: '{{count}} uger siden',
      monthsAgo: '{{count}} maneder siden',
      yearsAgo: '{{count}} ar siden',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Proveteknologi',
      tryOnTechnologyDesc: 'Se tatoveringer pa din hud for du beslutter dig',
      aiTattooGenerator: 'AI-tatoveringsgenerator',
      aiTattooGeneratorDesc: 'Skab unikke designs fra dine ideer',
      coverUpAssistant: 'Overdaekningsassistent',
      coverUpAssistantDesc: 'Forvandl eksisterende tatoveringer til ny kunst',
      artistTools: 'Kunstnervaerktoejer',
      artistToolsDesc:
        'Vis kunder designs pa deres krop ojeblikkelig',
      precisePlacement: 'Praecis placering',
      precisePlacementDesc:
        'Perfekt storrelse til din {{location}}-tatovering',
      styleMatchedDesigns: 'Stilmatchede designs',
      styleMatchedDesignsDesc:
        'Kurateret {{style}} tatoveringsinspiration',
      readyWhenYouAre: 'Klar nar du er',
      readyWhenYouAreDesc: 'Begynd at designe i dag, blaek i morgen',
      realisticTryOn: 'Realistisk proving',
      realisticTryOnDesc: 'Se praecis, hvordan den vil se ud pa dig',
      saveAndShare: 'Gem og del',
      saveAndShareDesc:
        'Behold dine favoritter og del med din tatovr',
      aiDesignStudio: 'AI-designstudie',
      aiDesignStudioDesc: 'Generer unikke tatoveringsdesigns ojeblikkelig',

      // Personalized greetings
      greetingArtist: 'Dit nye kundeoplevelsesvaerktoj er klar',
      greetingCoverUp: 'Klar til at forvandle din tatovering',
      greetingGenerate: 'Dit AI-designstudie venter',
      greetingDefault: 'Din tatoveringsrejse begynder nu',
      welcomeAboard: 'Velkommen ombord, {{name}}!',
      welcomeName: 'Velkommen {{name}}',

      // Urgency messages
      urgencyArtist: 'Vis kunder realistiske forhåndsvisninger ojeblikkelig.',
      urgencyCoverUp: 'Fiks din tatovering med selvtillid.',
      urgencyTryOn: 'Prov din tatovering for du beslutter dig.',
      urgencyDefault: 'Ubegraensede designs. Nul fortrydelse.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Fortsaet',
    restorePurchase: 'Gendan kob',
    current: 'NUVAERENDE',

    // Plan terms
    week: 'Uge',
    month: 'Maned',
    weekly: 'Ugentligt',
    monthly: 'Manedligt',
    perWeek: '/Uge',

    // Content
    loadingPlans: 'Indlaeser planer...',
    restoreSubscription: 'Gendan abonnement',
    fairUseNote: 'AI-designgenerering inkluderer rimelige brugsbegrnsninger.',
    saveBadge: 'Spar {{percent}}%',
    subtitle:
      'Udforsk tatoveringsideer, forfin designs gennem uendelige variationer, prov dem pa enhver kroppsdel og eksporter resultater i hoj kvalitet.',

    // Personalized headlines
    headlineArtist: 'Vis kunder deres tatovering for du tatoverer',
    headlineCoverUp: 'Forvandl din tatovering med selvtillid',
    headlineTryOn: 'Se din tatovering for du beslutter dig',
    headlineDesign: 'Design tatoveringen du altid har dromt om',
    headlineBrowse: 'Find dit perfekte tatoveringsdesign',

    // Purchase flow alerts
    successTitle: 'Succes!',
    subscriptionActiveMessage:
      'Dit abonnement er nu aktivt. Nyd ubegraensede tatoveringsdesigns!',
    almostThereTitle: 'Naesten der!',
    createAccountMessage:
      'Opret en konto for at aktivere dit abonnement og begynde at designe.',
    purchaseRestoredTitle: 'Kob gendannet!',
    subscriptionNowActive: 'Dit abonnement er nu aktivt.',
    purchaseFoundTitle: 'Kob fundet!',
    purchasesRestoredMessage: 'Dine kob er blevet gendannet.',
    noPurchasesFoundTitle: 'Ingen kob fundet',
    noPurchasesFoundMessage:
      'Ingen tidligere kob blev fundet at gendanne.',
    purchaseFailedTitle: 'Kob mislykkedes',
    purchaseFailedMessage:
      'Kunne ikke gennemfore kobet. Prov venligst igen.',
    errorRestoringTitle: 'Fejl ved gendannelse af kob',
    errorRestoringMessage:
      'Kunne ikke gendanne kob. Prov venligst igen.',
    subscriptionActivated: 'Abonnement aktiveret!',

    // Alerts
    purchaseError: 'Kobsfejl',
    restoreSuccess: 'Kob gendannet',
    restoreError: 'Gendannelse mislykkedes',
    noPurchaseFound: 'Intet tidligere kob fundet',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Annuller generering',
    cancelGenerationTitle: 'Annullere generering?',
    cancelGenerationMessage:
      'Du er ved at annullere den igangvaerende generering. Dette vil fjerne den aktuelle generering og starte en ny session.',
    clearEverythingTitle: 'Ryd alt?',
    clearEverythingMessage:
      'Du er ved at rydde denne session. Dette vil fjerne alle genererede tatoveringer. Gem alt, du vil beholde, for du fortsaetter.',
    clearEverything: 'Ryd alt',

    // Input
    enterText: 'Indtast tekst',
    describeTattoo: 'Beskriv din tatovering eller vaelg et forslag nedenfor',

    // Try on alert
    tryOnTitle: 'Prov {{style}}',
    tryOnMessage:
      'Tag et billede af din kroppsdel for at se, hvordan denne tatovering ser ud pa dig!',
    choosePhoto: 'Vaelg billede',
    later: 'Senere',

    // Preview on body
    previewOnBody: 'Se tatovering pa kroppen',
    imageSelectedCombine: '1 billede valgt - tilf j et mere for at kombinere',

    // Suggestions
    createTattoo: 'Opret en {{title}}-tatovering',
    createStyleTattoo: 'Opret en tatovering i {{title}}-stil',
    tryStyle: 'Prov {{title}}-stilen',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Opdaterer din tatovering...',
      startingNew: 'Starter ny tatovering...',
      warmingUp: 'Tatoveringsmaskinen varmer op...',
      summoningSpirits: 'Paakalder blaekanderne...',
      drawingInspiration: 'Henter inspiration fra universet...',
      brewingMasterpiece: 'Naesten faerdig med dit mestervaerk...',
      sprinkleCreativity: 'Tilfojer et staeank kreativitet...',
      perfectingPixels: 'Perfekterer hver pixel af din tatovering...',
      injectingCreativity: 'Injicerer kreativitet i din hud...',
      mixingShade: 'Blander den perfekte nuance af fantastisk...',
      sharpeningNeedles: 'Sliber virtuelle nale...',
      calibratingVibes: 'Kalibrerer dine tatoveringsvibrationer...',
      consultingOracle: 'Konsulterer tatoveringsoraklet...',
    },

    // Error states
    error: {
      keepCreating: 'Bliv ved med at skabe uden begransninger',
      limitReachedFree:
        'Du har naet din aktuelle genereringsgraense. Opgrader nu for at udforske variationer, forfine designs og fortsaette med at skabe uden at vente.',
      unlockUnlimited: 'Las ubegraensede designs op \u2192',
      limitReachedSubscribed:
        'Du har naet din graense for denne periode',
      limitReachedSubscribedDesc:
        'Din plans genereringsgraense er naet. Din graense nulstilles ved starten af din naeste faktureringsperiode.',
      tryAgainLater: 'Prov igen senere',
      contactSupport: 'Kontakt support',
    },

    // Session history actions
    actions: 'Handlinger',
    saveToGallery: 'Gem i galleri',

    // Result image actions
    imageActions: 'Billedhandlinger',
    copyToClipboard: 'Kopier til udklipsholder',
    imageCopied: 'Billede kopieret til udklipsholder',
    imageCopyFailed: 'Kunne ikke kopiere billedet',
    imageSaved: 'Billede gemt i galleriet!',
    imageSaveFailed: 'Kunne ikke gemme billedet. Prov igen.',

    // Context alerts
    photoAccessTitle: 'Fotoadgang kraeves',
    photoAccessMessage:
      'For at gemme billeder i dit galleri har vi brug for adgang til dine fotos. Du kan aktivere dette i Indstillinger.',
    resetSessionTitle: 'Nulstil session?',
    resetSessionMessage:
      'Er du sikker pa, at du vil nulstille sessionen? Dette vil rydde alle genererede tatoveringer og starte en ny session.',
    resetButton: 'Nulstil',
    shareError: 'Kunne ikke dele billedet',
    imageDataError: 'Kunne ikke hente billeddata',
    pickImageError: 'Kunne ikke vaelge billede fra galleriet',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Billede ikke fundet',
    useTattoo: 'Brug tatovering',
    useTattooError: 'Kunne ikke bruge denne tatovering. Prov igen.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Alle fotos',
    addPhotos: 'Tilf j {{count}} foto',
    addPhotos_other: 'Tilf j {{count}} fotos',
    recentPhotos: 'Seneste fotos',
    selectOneMore: 'Vaelg 1 mere for at kombinere',

    // Options
    tryOn: 'Prov pa',
    tryOnDescriptionWithTattoo:
      'Tilf j et billede af din krop for at se en forhåndsvisning',
    tryOnDescriptionNoTattoo:
      'Vaelg forst en tatovering, tilf j derefter dit billede',
    createNewTattoo: 'Opret ny tatovering',
    createNewTattooDescription:
      'Beskriv din tatoveringsidee, og vi genererer den',
    tattooCoverUp: 'Overdaekningsidee',
    tattooCoverUpDescription:
      'Generer en idee til at daekke over en eksisterende tatovering med et billede som reference',
    removeTattoo: 'Fjern tatovering',
    removeTattooDescription:
      'Fjern en eksisterende tatovering fra billedet',
    promptHistory: 'Prompthistorik',
    promptHistoryDescription: 'Se dine tidligere prompter',
    requestFeature: 'Foresla en funktion',
    requestFeatureDescription:
      'Fortael os, hvad du gerne vil have, at Tattoo Design AI stotter neste gang',

    // Try on alerts
    addYourPhoto: 'Tilf j dit billede',
    addPhotoQuestion:
      'Hvordan vil du tilfoje et billede af, hvor du vil have tatoveringen?',
    takePhoto: 'Tag billede',
    chooseFromLibrary: 'Vaelg fra bibliotek',
    createTattooFirst: 'Opret en tatovering forst',
    createTattooFirstMessage:
      'For at prove en tatovering pa skal du:\n\n1. Generere eller vaelge et tatoveringsdesign\n2. Derefter tilfoje et billede af din krop\n\nVi kombinerer dem for at vise, hvordan det ser ud!',
    createTattoo: 'Opret tatovering',
  },

  tattoos: {
    // Screen header
    title: 'Mine tatoveringer',

    // Loading
    loading: 'Indlaeser tatoveringer...',

    // Empty state
    emptyTitle: 'Ingen gemte tatoveringer endnu',
    emptyDescription:
      'Opret og gem dit forste tatoveringsdesign! Swipe ned for at opdatere.',

    // Cloud restore
    restoringFromCloud: 'Gendanner fra skyen...',
    noCloudGenerations: 'Ingen sky-generationer fundet',
    restoredCount: 'Gendannet {{restored}} af {{total}} tatoveringer',
    restoreFailedTitle: 'Gendannelse mislykkedes',
    restoreFailedMessage:
      'Kunne ikke gendanne fra skyen. Prov igen.',
    cloudFound: '{{count}} tatovering fundet i skyen',
    cloudFound_other: '{{count}} tatoveringer fundet i skyen',
    restoring: 'Gendanner...',
    restore: 'Gendan',
    cloudCount: '{{count}} i skyen',

    // Detail screen
    tattooNotFound: 'Tatovering ikke fundet',
    backToHome: 'Tilbage til hjem',
    shareError: 'Kunne ikke dele billedet. Prov igen.',
    imageAccessError: 'Kunne ikke fa adgang til billedfilen.',
    deleteTitle: 'Slet tatovering',
    deleteMessage:
      'Er du sikker pa, at du vil slette dette tatoveringsdesign? Denne handling kan ikke fortrydes.',
    deleteError: 'Kunne ikke slette billedet. Prov igen.',
  },

  generation: {
    // Loading
    applyingDesign: 'Paforer dit tatoveringsdesign...',

    // Error
    invalidRequest: 'Ugyldig anmodning',
    generationFailed: 'Generering mislykkedes',
    failedToGenerate: 'Kunne ikke generere tatoveringsdesign',
    startOver: 'Start forfra',

    // Success
    tattooReady: 'Din tatovering er klar!',
    tattooReadyDescription:
      'Sadan ville dit design se ud pafort',
    saveToGallery: 'Gem i galleri',
    generateAnother: 'Generer en mere',

    // Save alerts
    savedTitle: 'Gemt!',
    savedMessage:
      'Dit tatoveringsdesign er blevet gemt i dit fotogalleri.',
    viewInGallery: 'Se i galleriet',

    // Generate another alert
    generateAnotherTitle: 'Generere en mere?',
    generateAnotherMessage:
      'Du har endnu ikke gemt denne tatovering. Vil du gemme den for du fortsaetter?',
    continueWithoutSaving: 'Fortsaet uden at gemme',
    saveAndContinue: 'Gem og fortsaet',

    // Cancel alert
    cancelGenerationTitle: 'Annullere generering?',
    cancelGenerationMessage:
      'Din tatovering genereres stadig. Hvis du annullerer nu, taeller denne generering stadig mod din brugsgraense. Er du sikker pa, at du vil annullere?',
    keepGenerating: 'Fortsaet med at generere',
    unableToSave: 'Kunne ikke gemme billedet. Prov igen.',
  },

  home: {
    // Section headers
    discoverStyles: 'Opdag nye stile',
    moreStyles: 'Flere stile',
    moods: 'Stemninger',
    discoverSketches: 'Opdag skitsedesigns',

    // Quick actions
    generateFromIdea: 'Generer fra idee',
    generateFromIdeaDesc: 'Opret en tatovering fra din fantasi',
    seeItOnSkin: 'Se den pa din hud',
    seeItOnSkinDesc: 'Tag et billede og se tatoveringen',
    blendTattoo: 'Bland tatovering',
    blendTattooDesc: 'Upload en eksisterende tatovering og aendr den',
    removeTattoo: 'Fjern tatovering',
    removeTattooDesc: 'Fjern en eksisterende tatovering fra huden',
  },

  explore: {
    // Section headers
    byStyles: 'Udforsk efter stile',
    byMoods: 'Udforsk efter stemninger',
    byBodyPart: 'Udforsk efter kroppsdel',

    // Filter labels
    styles: 'Stile',
    bodyPart: 'Kroppsdel',
  },

  featureRequest: {
    title: 'Del dine ideer',
    placeholder: 'Ideer til at forbedre din oplevelse...',
    needHelp: 'Brug for hjaelp? ',
    contactUs: 'Kontakt os',
    successToast:
      'Funktionsforslag sendt! Tak for din feedback.',
    errorToast:
      'Kunne ikke sende funktionsforslaget. Prov igen.',
  },

  promptHistory: {
    title: 'Prompthistorik',
    clearAll: 'Ryd alt',
    clearAllTitle: 'Ryd prompthistorik',
    clearAllMessage:
      'Er du sikker pa, at du vil slette alle gemte prompter?',
    deletePromptTitle: 'Slet prompt',
    deletePromptMessage: 'Fjern denne prompt fra historikken?',
    emptyTitle: 'Ingen prompter endnu',
    emptyDescription:
      'Dine prompter vises her, nar du har genereret en tatovering',
  },
};
