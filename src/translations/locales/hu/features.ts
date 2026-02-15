/**
 * Hungarian translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const huFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Nezd meg a tetovalasodat mielott elkoteleződnel.',
    whatsYourName: 'Hogy hivnak?',
    namePlaceholder: 'A neved',
    nameDescription: 'Ezt hasznaljuk az elmenyed szemelyre szabasahoz.',
    welcome: 'Udv',
    welcomeDescription:
      'Szabjuk testre a Tattoo Design AI elmenyed most.',
    describeYou: 'Melyik jellemez\n teged a legjobban?',
    describeYouDescription:
      'Ez segit szemelyre szabni az elmenyt aszerint, hogyan viszonyulsz a tetovalasokhoz',
    whatToDo: 'Mit szeretnel\n csinalni?',
    whatToDoDescription:
      'Ez segit megerteni, hogyan szeretned felfedezni a tetovalasokat es milyen eszkozok lennenek a leghasznosabbak szamodra.',
    designTattoo: 'Tervezd meg a\n kivant tetovalast',
    designTattooDescription:
      'Irj be nehany szot vagy tolts fel egy kepet, es azonnal egyedi tetovalas-terveket generalunk.',
    whereTattoo: 'Hova szeretned\n a tetovalast?',
    whereTattooDescription:
      'Az elhelyezes befolyasolja a tervet, meretet es vonalvezetest, ami segit az otleteket a testedhez igazitani.',
    pickStyles: 'Valassz legfeljebb\n 5 stilust',
    pickStylesDescription:
      'A stilusvalasztasaid segitenek leszukiteni az izlesednek megfelelo terveket.',
    whenTattoo: 'Mikor gondolkodsz\n a tetovalasson?',
    whenTattooDescription:
      'Ez segit az elmenyt az\n idovonalodhoz igazitani.',
    whatVibe: 'Milyen hangulatot\n keresz?',
    whatVibeDescription:
      'A tetovalasok erzelmeket hordoznak, ez segit megerteni a mogottuk rejlo tortenetet.',
    settingUp: 'Beallitjuk neked\n a dolgokat',
    youreAllSet: 'Minden kesz!',
    youreAllSetDescription: 'Minden kesz a kezdeshez.',

    // CTA
    alreadyHaveAccount: 'Mar van fiokod? ',
    signIn: 'Bejelentkezes',

    // User description options
    userDescription: {
      artist: 'Tetovalasokat keszetek',
      client: 'Tetovalast szeretnek',
      model: 'Tetovalasokat hasznalok tartalomhoz',
      explorer: 'Csak nezeldok',
    },

    // Goal options
    goal: {
      tryOn: 'Tetovalasok felprobalasa a fotoimon',
      generate: 'Tetovalas otletek generalasa',
      browse: 'Csak nezeldok vagy inspiraciot keresek',
      coverUp: 'Letezo tetovalas elfedese/atalakitasa',
    },

    // Location options
    location: {
      wrist: 'Csuklo',
      chest: 'Mellkas',
      hand: 'Kez',
      back: 'Hat',
      legs: 'Labak',
      forearm: 'Alkar',
      neck: 'Nyak',
      jaw: 'Allkapocs',
      forehead: 'Homlok',
      knuckles: 'Ujjpercek',
      fingers: 'Ujjak',
      cheek: 'Arc',
      shoulder: 'Vall',
      temple: 'Halantek',
      ribs: 'Bordak',
      abdomen: 'Has',
      face: 'Arc',
      hips: 'Csipo',
      thigh: 'Comb',
      tricep: 'Tricepsz',
      bicep: 'Bicepsz',
      collarbone: 'Kulcscsont',
      ankle: 'Boka',
      foot: 'Labfej',
      palm: 'Tenyer',
      notSure: 'Nem tudom',
    },

    // Style options
    styles: {
      traditional: 'Tradicionalis',
      realism: 'Realizmus',
      minimal: 'Minimalista',
      celtic: 'Kelta',
      blackwork: 'Blackwork',
      illustrative: 'Illusztrativ',
      lettering: 'Feliratos',
      irezumi: 'Irezumi',
      geometric: 'Geometrikus',
      religious: 'Vallasi',
      anime: 'Anime',
      fineLine: 'Vekonvyvonalas',
      dotwork: 'Pontozott',
      linework: 'Vonalas',
      calligraphy: 'Kalligrafikus',
      portrait: 'Portre',
      floral: 'Viragos',
      polynesian: 'Polineziai',
      tribal: 'Torzsii',
      maori: 'Maori',
      gothic: 'Gotikus',
      patchwork: 'Foltmunka',
      abstract: 'Absztrakt',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Asztrologiai',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Ezen a heten',
      thisMonth: 'Ebben a honapban',
      oneToThreeMonths: '1-3 honapon belul',
      someday: 'Egyszer, most csak nezeldok',
    },

    // Vibe options
    vibe: {
      bold: 'Merész',
      confident: 'Magabiztos',
      soft: 'Lagy',
      dark: 'Sotet',
      edgy: 'Vaganyos',
      elegant: 'Elegans',
      spiritual: 'Spiritualis',
      cute: 'Aranyos',
      symbolic: 'Szimbolikus',
      playful: 'Jatekos',
      clean: 'Letisztult',
      modern: 'Modern',
      meaningful: 'Jelentessel biro',
      personalStory: 'Szemelyes tortenet',
      family: 'Csalad',
      love: 'Szerelem',
      memory: 'Emlek',
      rebirth: 'Ujjaszuletes',
      freedom: 'Szabadsag',
      mystical: 'Misztikus',
      rebellious: 'Lazado',
      serene: 'Nyugodt',
      empowered: 'Megerosodott',
      ethereal: 'Eteri',
      fearless: 'Felemetes',
      wanderlust: 'Vandorlasi vagy',
      transcendent: 'Transzcendens',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: '{{name}} viziojanak megertese',
      understandingVisionDefault: 'A viziod megertese',
      tailoringDesigns: 'Tervek igazitasa a stilusodhoz',
      settingUpCoverUp: 'Elfedesi eszkozok beallitasa',
      personalizingExperience: 'Az elmenyed szemelyre szabasa',
      preparingStudio: 'A tervezostudiod elokezitese',
      configuringWorkspace: 'A munkaterulet konfigralasa',
      applyingPreferences: 'A beallitasaid alkalmazasa',
      journeyStartsNow: 'A tetovalas utad most kezdodik',
    },

    // Reviews
    reviews: {
      review1Title: 'Fantasztikus alkalmazas!',
      review1Body:
        'Az alkalmazas mukodik, jol nez ki es jol hasznalhato! Lenyugozott, milyen jol alkalmazta a tetovalast, figyelembe veve a pontos megvilagitast es arnyekolast.',
      review1Author: 'Jacob C.',
      review2Title: 'Tenyleg hasznos',
      review2Body:
        'A tetovalas tervek tisztak es reszletesek. Nehany kep generealasa kicsit tovabb tart, de osszessegeben az egyik legjobb AI tetovalas alkalmazas.',
      review2Author: 'Alexrays1',
      review3Title: 'Imadom ezt',
      review3Body: 'Nagyon ajanlom \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Tetovalasok azonnali generalasa',
    containerDesc1:
      'Irj be nehany szot es azonnal egyedi tetovalas-terveket generalunk.',
    containerTitle2: 'Szemelyre szabhatod a terved',
    containerDesc2:
      'Allitsd be a szineket, az elrendezest es a stilust, hogy a tetovalas tokeletes legyen.',
    containerTitle3: 'Elonezet a boroden',
    containerDesc3:
      'Nezd meg barmelyik tetovalast a boroden — allitsd a meretet es az elhelyezest azonnal.',
    paused: 'Szuneteltetve',

    // Relative time
    time: {
      today: 'Ma',
      yesterday: 'Tegnap',
      daysAgo: '{{count}} napja',
      weeksAgo: '{{count}} hete',
      monthsAgo: '{{count}} honapja',
      yearsAgo: '{{count}} eve',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Felprobalas technologia',
      tryOnTechnologyDesc:
        'Lathatod a tetovalasokat a boroden mielott elkoteleződnel',
      aiTattooGenerator: 'AI tetovalas generator',
      aiTattooGeneratorDesc: 'Egyedi tervek az otleteidbol',
      coverUpAssistant: 'Elfedesi asszisztens',
      coverUpAssistantDesc: 'Alakits at letezo tetovalasokat uj muveszetbe',
      artistTools: 'Muvesz eszkozok',
      artistToolsDesc:
        'Mutasd meg az ugyfeleknek a tervet a testukon azonnal',
      precisePlacement: 'Preciz elhelyezes',
      precisePlacementDesc:
        'Tokeletes meretezez a {{location}} tetovalasodhoz',
      styleMatchedDesigns: 'Stilushoz illeszkedő tervek',
      styleMatchedDesignsDesc:
        'Valogatott {{style}} tetovalas inspiracio',
      readyWhenYouAre: 'Keszen allunk, amikor te is',
      readyWhenYouAreDesc: 'Kezdj el tervezni ma, tetovalj holnap',
      realisticTryOn: 'Realisztikus felprobalas',
      realisticTryOnDesc: 'Lasd pontosan, hogyan fog kinezni rajtad',
      saveAndShare: 'Mentes es megosztas',
      saveAndShareDesc:
        'Mentsd el a kedvenceidet es oszd meg a muveszeddel',
      aiDesignStudio: 'AI tervező studio',
      aiDesignStudioDesc: 'Egyedi tetovalas tervek azonnali generalasa',

      // Personalized greetings
      greetingArtist: 'Az uj ugyfelelmenyi eszkozod kesz',
      greetingCoverUp: 'Keszen allunk a tetovalasod atalakitasara',
      greetingGenerate: 'Az AI tervezostudiod var',
      greetingDefault: 'A tetovalas utad most kezdodik',
      welcomeAboard: 'Udv a fedelzeten, {{name}}!',
      welcomeName: 'Udv {{name}}',

      // Urgency messages
      urgencyArtist: 'Mutass az ugyfeleknek valos elonezetet azonnal.',
      urgencyCoverUp: 'Javitsd ki a tetovalasodat magabiztosan.',
      urgencyTryOn: 'Probald fel a tetovalasodat mielott elkoteleződnel.',
      urgencyDefault: 'Korlatlan tervek. Nulla megbanas.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Folytatas',
    restorePurchase: 'Vasarlas visszaallitasa',
    current: 'JELENLEGI',

    // Plan terms
    week: 'Het',
    month: 'Honap',
    weekly: 'Heti',
    perWeek: '/Het',

    // Content
    loadingPlans: 'Csomagok betoltese...',
    restoreSubscription: 'Elofizetes visszaallitasa',
    fairUseNote: 'Az AI terv generalas tisztesseges hasznalati limiteket tartalmaz.',
    saveBadge: 'Sporolj {{percent}}%-ot',
    subtitle:
      'Fedezz fel tetovalas otleteket, finomitsd a terveket vegtelen variaciokkal, probald fel barmelyik testreszre, es exportalj kivasalo minosegu eredmenyeket magabiztosan.',

    // Personalized headlines
    headlineArtist: 'Mutasd meg az ugyfeleknek a tetovalast mielott tetovalnal',
    headlineCoverUp: 'Alakitsd at a tetovalasodat magabiztosan',
    headlineTryOn: 'Lasd a tetovalasodat mielott elkoteleződnel',
    headlineDesign: 'Tervezd meg a tetovalast, amirol mindig almodozttal',
    headlineBrowse: 'Talald meg a tokeletes tetovalas tervet',

    // Purchase flow alerts
    successTitle: 'Sikeres!',
    subscriptionActiveMessage:
      'Az elofizetesed most aktiv. Elvezd a korlatlan tetovalas terveket!',
    almostThereTitle: 'Majdnem kesz!',
    createAccountMessage:
      'Hozz letre egy fiokot az elofizetesed aktivalasahoz es a tervezes megkezdesehez.',
    purchaseRestoredTitle: 'Vasarlas visszaallitva!',
    subscriptionNowActive: 'Az elofizetesed most aktiv.',
    purchaseFoundTitle: 'Vasarlas megtalaltva!',
    purchasesRestoredMessage: 'A vasarlasaid visszaallitasra kerultek.',
    noPurchasesFoundTitle: 'Nem talalhato vasarlas',
    noPurchasesFoundMessage:
      'Nem talaltunk korabbi vasarlast a visszaallitashoz.',
    purchaseFailedTitle: 'Vasarlas sikertelen',
    purchaseFailedMessage:
      'Nem sikerult a vasarlas befejezese. Kerlek probald ujra.',
    errorRestoringTitle: 'Hiba a vasarlasok visszaallitasakor',
    errorRestoringMessage:
      'Nem sikerult a vasarlasok visszaallitasa. Kerlek probald ujra.',
    subscriptionActivated: 'Elofizetes aktivalva!',

    // Alerts
    purchaseError: 'Vasarlasi hiba',
    restoreSuccess: 'Vasarlas visszaallitva',
    restoreError: 'Visszaallitas sikertelen',
    noPurchaseFound: 'Nem talalhato korabbi vasarlas',

    // Pricing overhaul
    annual: 'Éves',
    year: 'Év',
    perYear: '/Év',
    freeTrialBadge: '{{days}} NAPOS INGYENES PRÓBA',
    startTrialButton: '{{days}} napos ingyenes próba indítása',
    specialOffer: 'Különleges ajánlat',
    limitedTimeOffer: 'Korlátozott idejű ajánlat',
    discountSubtitle: 'Csak új felhasználóknak — nyisd meg a teljes hozzáférést ma',
    savePercent: 'Spórolj {{percent}}%-ot',
    annualPerWeek: '{{price}}/hét',
    todayOnly: 'Csak ma',
    offerExpires: 'Az ajánlat lejár',
    perWeekBilled: 'hetente, számlázva {{period}}',
    originalPrice: 'Volt {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Generalas megszakitasa',
    cancelGenerationTitle: 'Generalas megszakitasa?',
    cancelGenerationMessage:
      'A jelenlegi generalas megszakitasara kesz. Ez eltavolitja a jelenlegi generalast es uj munkafolyamatot indit.',
    clearEverythingTitle: 'Minden torlese?',
    clearEverythingMessage:
      'A munkafolyamat torlese keszul. Ez eltavolit minden generalt tetovalast. Mentsd el, amit meg szeretnel tartani a folytatas elott.',
    clearEverything: 'Minden torlese',

    // Input
    enterText: 'Szoveg bevitele',
    describeTattoo: 'Ird le a tetovalasodat vagy valassz az alanti javaslatokbol',

    // Try on alert
    tryOnTitle: '{{style}} felprobalasa',
    tryOnMessage:
      'Keszits egy fotot a testreszedrol, hogy lasd, hogyan nez ki rajtad ez a tetovalas!',
    choosePhoto: 'Foto valasztasa',
    later: 'Kesobb',

    // Preview on body
    previewOnBody: 'Tetovalas elonezete a testen',
    imageSelectedCombine: '1 kep kivalasztva - adj hozza meg egyet a kombinalashoz',

    // Suggestions
    createTattoo: '{{title}} tetovalas keszitese',
    createStyleTattoo: '{{title}} stilusu tetovalas keszitese',
    tryStyle: '{{title}} stilus kiprobalasa',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'A tetovalasod frissitese...',
      startingNew: 'Uj tetovalas inditasa...',
      warmingUp: 'A tetovalogep bemelegit...',
      summoningSpirits: 'A tinta szellemek megidezese...',
      drawingInspiration: 'Inspiraciomereites az univerzumbol...',
      brewingMasterpiece: 'Majdnem kesz a remekmuved...',
      sprinkleCreativity: 'Kreativitas hozzaadasa...',
      perfectingPixels: 'Minden pixel tokeletesitese a tetovalasondon...',
      injectingCreativity: 'Kreativitas injektalasa a borodbe...',
      mixingShade: 'A tokeletes szinarnyalat keverese...',
      sharpeningNeedles: 'Virtualis tuk elesitese...',
      calibratingVibes: 'A tetovalas hangulat kalibrealasa...',
      consultingOracle: 'A tetovalas jorakel megkerdezese...',
    },

    // Error states
    error: {
      keepCreating: 'Alkoss tovabb limitek nelkul',
      limitReachedFree:
        'Elereted a jelenlegi generalasi limitedet. Frissits most a variaciok felfedezésehez, tervek finomitasahoz es a zavartalanul folytatashoz.',
      unlockUnlimited: 'Korlatlan tervek feloldasa \u2192',
      limitReachedSubscribed:
        'Elereted a limitedet erre az idoszakra',
      limitReachedSubscribedDesc:
        'A csomagod generalasi limitje elerve. A limited a kovetkezo szamlazasi idoszak elejen all ujra vissza.',
      tryAgainLater: 'Probald ujra kesobb',
      contactSupport: 'Tamogatas',
    },

    // Session history actions
    actions: 'Muveletek',
    saveToGallery: 'Mentes a galeriaba',

    // Result image actions
    imageActions: 'Kep muveletek',
    copyToClipboard: 'Masolas a vagolapra',
    imageCopied: 'Kep masolva a vagolapra',
    imageCopyFailed: 'Nem sikerult a kep masolasa',
    imageSaved: 'Kep mentve a galeriaba!',
    imageSaveFailed: 'Nem sikerult a kep mentese. Kerlek probald ujra.',

    // Context alerts
    photoAccessTitle: 'Foto hozzaferes szukseges',
    photoAccessMessage:
      'A kepek galeriaba mentesehez szuksegunk van a fotoiidhoz valo hozzaferesre. Ezt a Beallitasokban engedelyezheted.',
    resetSessionTitle: 'Munkafolyamat visszaallitasa?',
    resetSessionMessage:
      'Biztosan visszaallitod a munkafolyamatot? Ez torli az osszes generalt tetovalast es uj munkafolyamatot indit.',
    resetButton: 'Visszaallitas',
    shareError: 'Nem sikerult a kep megosztasa',
    imageDataError: 'Nem sikerult a kep adatainak lekerese',
    pickImageError: 'Nem sikerult kep kivalasztasa a galeriabol',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Kep nem talalhato',
    useTattoo: 'Tetovalas hasznalata',
    useTattooError:
      'Nem sikerult hasznalni ezt a tetovalast. Kerlek probald ujra.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Osszes foto',
    addPhotos: '{{count}} foto hozzaadasa',
    addPhotos_other: '{{count}} foto hozzaadasa',
    recentPhotos: 'Legutobbiiak',
    selectOneMore: 'Valassz meg 1-et a kombinalashoz',

    // Options
    tryOn: 'Felprobalas',
    tryOnDescriptionWithTattoo:
      'Adj hozza egy fotot a testedrol az elonezethez',
    tryOnDescriptionNoTattoo:
      'Eloszor valassz egy tetovalast, majd add hozza a fotod',
    createNewTattoo: 'Uj tetovalas keszitese',
    createNewTattooDescription:
      'Ird le a tetovalas otletedet es legeneraljuk',
    tattooCoverUp: 'Tetovalas elfedesi otlet',
    tattooCoverUpDescription:
      'Generalj otletet egy letezo tetovalas elfedesere foto alapjan',
    removeTattoo: 'Tetovalas eltavolitasa',
    removeTattooDescription:
      'Letezo tetovalas eltavolitasa a fotorol',
    promptHistory: 'Prompt elozmeny',
    promptHistoryDescription: 'Korabbi promptjaid megtekintese',
    requestFeature: 'Funkcio kerese',
    requestFeatureDescription:
      'Mondd el, mit szeretnel, hogy a Tattoo Design AI legkozelebb tamogasson',

    // Try on alerts
    addYourPhoto: 'Add hozza a fotod',
    addPhotoQuestion:
      'Hogyan szeretnel fotot hozzaadni arrol, ahova a tetovalast szeretned?',
    takePhoto: 'Foto keszitese',
    chooseFromLibrary: 'Valasztas a konyvtarbol',
    createTattooFirst: 'Elobb keszits egy tetovalast',
    createTattooFirstMessage:
      'A felprobalashoz:\n\n1. Generalj vagy valassz egy tetovalas tervet\n2. Majd adj hozza egy fotot a testedrol\n\nOsszeallitjuk, hogy lasd hogyan nez ki!',
    createTattoo: 'Tetovalas keszitese',
  },

  tattoos: {
    // Screen header
    title: 'Tetovalasaim',

    // Loading
    loading: 'Tetovalasok betoltese...',

    // Empty state
    emptyTitle: 'Meg nincsenek mentett tetovalasok',
    emptyDescription:
      'Keszitsd el es mentsd az elso tetovalas tervedet! Huzd le a frissiteshez.',

    // Cloud restore
    restoringFromCloud: 'Visszaallitas a felhbol...',
    noCloudGenerations: 'Nem talalhato felhoben tarolt generalas',
    restoredCount: '{{restored}}/{{total}} tetovalas visszaallitva',
    restoreFailedTitle: 'Visszaallitas sikertelen',
    restoreFailedMessage:
      'Nem sikerult a felhbol valo visszaallitas. Kerlek probald ujra.',
    cloudFound: '{{count}} tetovalas talalhato a felhben',
    cloudFound_other: '{{count}} tetovalas talalhato a felhben',
    restoring: 'Visszaallitas...',
    restore: 'Visszaallitas',
    cloudCount: '{{count}} a felhben',

    // Detail screen
    tattooNotFound: 'Tetovalas nem talalhato',
    backToHome: 'Vissza a foodalra',
    shareError: 'Nem sikerult a kep megosztasa. Kerlek probald ujra.',
    imageAccessError: 'Nem sikerult a kep fajl elerese.',
    deleteTitle: 'Tetovalas torlese',
    deleteMessage:
      'Biztosan torolni szeretned ezt a tetovalas tervet? Ez a muvelet nem vonhato vissza.',
    deleteError: 'Nem sikerult a kep torlese. Kerlek probald ujra.',
  },

  generation: {
    // Loading
    applyingDesign: 'A tetovalas terved alkalmazasa...',

    // Error
    invalidRequest: 'Ervenytelen kerelem',
    generationFailed: 'Generalas sikertelen',
    failedToGenerate: 'Nem sikerult a tetovalas terv generalasa',
    startOver: 'Ujrakezdes',

    // Success
    tattooReady: 'A tetovalasod kesz!',
    tattooReadyDescription:
      'Igy nezne ki a terved alkalmazva',
    saveToGallery: 'Mentes a galeriaba',
    generateAnother: 'Ujabb generalasa',

    // Save alerts
    savedTitle: 'Mentve!',
    savedMessage:
      'A tetovalas terved mentesre kerult a fotogaleriaba.',
    viewInGallery: 'Megtekintes a galeriaban',

    // Generate another alert
    generateAnotherTitle: 'Ujabbat generalsz?',
    generateAnotherMessage:
      'Meg nem mentetted ezt a tetovalast. Szeretned elmenteni mielott folytatod?',
    continueWithoutSaving: 'Folytatas mentes nelkul',
    saveAndContinue: 'Mentes es folytatas',

    // Cancel alert
    cancelGenerationTitle: 'Generalas megszakitasa?',
    cancelGenerationMessage:
      'A tetovalasod meg generalas alatt all. Ha most megszakitod, ez a generalas meg beleszamit a hasznalati limitedbe. Biztosan megszakitod?',
    keepGenerating: 'Folytatas generalassal',
    unableToSave: 'Nem sikerult a kep mentese. Kerlek probald ujra.',
  },

  home: {
    // Section headers
    discoverStyles: 'Uj stilusok felfedezese',
    moreStyles: 'Tobb stilus',
    moods: 'Hangulatok',
    discoverSketches: 'Vazlat tervek felfedezese',

    // Quick actions
    generateFromIdea: 'Generalas otletbol',
    generateFromIdeaDesc: 'Keszits tetovalast a kepzeleted alapjan',
    seeItOnSkin: 'Nezd meg a boroden',
    seeItOnSkinDesc: 'Keszits egy fotot es nezd meg a tetovalas elonezetet',
    blendTattoo: 'Tetovalas keverese',
    blendTattooDesc: 'Tolts fel egy letezo tetovalast es modositsd',
    removeTattoo: 'Tetovalas eltavolitasa',
    removeTattooDesc: 'Letezo tetovalas eltavolitasa a borrol',
  },

  explore: {
    // Section headers
    byStyles: 'Felfedezes stilusok szerint',
    byMoods: 'Felfedezes hangulatok szerint',
    byBodyPart: 'Felfedezes testresz szerint',

    // Filter labels
    styles: 'Stilusok',
    bodyPart: 'Testresz',
  },

  featureRequest: {
    title: 'Oszd meg az otleteidet',
    placeholder: 'Otletek az elmenyed javitasahoz...',
    needHelp: 'Segitsegre van szukseged? ',
    contactUs: 'Irj nekunk',
    successToast:
      'Funkcio kerelem elkuldve! Koszonjuk a visszajelzest.',
    errorToast:
      'Nem sikerult a funkcio kerelem kuldese. Kerlek probald ujra.',
  },

  promptHistory: {
    title: 'Prompt elozmeny',
    clearAll: 'Osszes torlese',
    clearAllTitle: 'Prompt elozmeny torlese',
    clearAllMessage:
      'Biztosan torolni szeretned az osszes mentett promptot?',
    deletePromptTitle: 'Prompt torlese',
    deletePromptMessage: 'Eltavolitod ezt a promptot az elozmenykbol?',
    emptyTitle: 'Meg nincsenek promptok',
    emptyDescription:
      'A promptjaid itt jelennek meg miutan generalsz egy tetovalast',
  },
};
