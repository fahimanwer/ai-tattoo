/**
 * Finnish translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const fiFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Esikatsele tatuointiasi ennen paatoesta.',
    whatsYourName: 'Mika nimesi on?',
    namePlaceholder: 'Nimesi',
    nameDescription: 'Kaytamme tata personoidaksemme kokemustasi.',
    welcome: 'Tervetuloa',
    welcomeDescription: 'Muokataan Tattoo Design AI -kokemustasi nyt.',
    describeYou: 'Mika kuvaa\n sinua parhaiten?',
    describeYouDescription:
      'Tama auttaa meita personoimaan kokemusta sen perusteella, miten suhtaudut tatuointeihin',
    whatToDo: 'Mita haluaisit\n tehda?',
    whatToDoDescription:
      'Tama auttaa meita ymmartamaan, miten haluat tutkia tatuointeja ja mitka tyokalut ovat sinulle hyodyllisimpia.',
    designTattoo: 'Suunnittele\n haluamasi tatuointi',
    designTattooDescription:
      'Kirjoita muutama sana tai lataa kuva ja luo uniikkeja tatuointimalleja valittomasti.',
    whereTattoo: 'Mihin haluat\n tatuoinnin?',
    whereTattooDescription:
      'Sijainti vaikuttaa suunnitteluun, kokoon ja muotoon, mika auttaa meita raataloiman ideoita kehoosi.',
    pickStyles: 'Valitse enintaan\n 5 tyylialityylista',
    pickStylesDescription:
      'Tyylivalintasi auttavat meita rajaamaan suunnitelmia, jotka vastaavat makuasi.',
    whenTattoo: 'Milloin ajattelet\n ottaa tatuoinnin?',
    whenTattooDescription:
      'Tama auttaa meita sovittamaan\n kokemuksen aikatauluusi.',
    whatVibe: 'Mita tunnelmaa\n haet?',
    whatVibeDescription:
      'Tatuoinnit kantavat tunteita, tama auttaa meita ymmartamaan tarinaa sinun tatuointisi takana.',
    settingUp: 'Valmistellaan\n kaikki sinulle',
    youreAllSet: 'Olet valmis!',
    youreAllSetDescription: 'Olet valmis aloittamaan.',

    // CTA
    alreadyHaveAccount: 'Onko sinulla jo tili? ',
    signIn: 'Kirjaudu sisaan',

    // User description options
    userDescription: {
      artist: 'Teen tatuointeja',
      client: 'Olen ottamassa tatuointia',
      model: 'Kaytan tatuointeja sisaltoon',
      explorer: 'Vain tutkiskelen',
    },

    // Goal options
    goal: {
      tryOn: 'Kokeile tatuointeja kuvillani',
      generate: 'Luo tatuointi-ideoita',
      browse: 'Vain katselemassa tai etsimassa inspiraatiota',
      coverUp: 'Peita/muokkaa olemassa oleva tatuointi',
    },

    // Location options
    location: {
      wrist: 'Ranne',
      chest: 'Rinta',
      hand: 'Kasi',
      back: 'Selka',
      legs: 'Jalat',
      forearm: 'Kyynvarsi',
      neck: 'Niska',
      jaw: 'Leuka',
      forehead: 'Otsa',
      knuckles: 'Rystyset',
      fingers: 'Sormet',
      cheek: 'Poski',
      shoulder: 'Olkapaaa',
      temple: 'Ohimo',
      ribs: 'Kylkiluut',
      abdomen: 'Vatsa',
      face: 'Kasvot',
      hips: 'Lantio',
      thigh: 'Reisi',
      tricep: 'Ojentaja',
      bicep: 'Hauislihas',
      collarbone: 'Solisluu',
      ankle: 'Nilkka',
      foot: 'Jalkatera',
      palm: 'Kammen',
      notSure: 'En ole varma',
    },

    // Style options
    styles: {
      traditional: 'Perinteinen',
      realism: 'Realismi',
      minimal: 'Minimalistinen',
      celtic: 'Kelttilainen',
      blackwork: 'Blackwork',
      illustrative: 'Kuvittava',
      lettering: 'Kirjaimet',
      irezumi: 'Irezumi',
      geometric: 'Geometrinen',
      religious: 'Uskonnollinen',
      anime: 'Anime',
      fineLine: 'Ohut viiva',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Kalligrafia',
      portrait: 'Muotokuva',
      floral: 'Kukka',
      polynesian: 'Polynesialainen',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Goottilaineen',
      patchwork: 'Patchwork',
      abstract: 'Abstrakti',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologia',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Talla viikolla',
      thisMonth: 'Tassa kuussa',
      oneToThreeMonths: '1-3 kuukauden paasta',
      someday: 'Joskus, vain tutkiskelen',
    },

    // Vibe options
    vibe: {
      bold: 'Rohkea',
      confident: 'Itsevarma',
      soft: 'Pehmeae',
      dark: 'Tumma',
      edgy: 'Terava',
      elegant: 'Elegantti',
      spiritual: 'Henkinen',
      cute: 'Soma',
      symbolic: 'Symbolinen',
      playful: 'Leikkisa',
      clean: 'Selkea',
      modern: 'Moderni',
      meaningful: 'Merkityksellinen',
      personalStory: 'Henkilokohtainen tarina',
      family: 'Perhe',
      love: 'Rakkaus',
      memory: 'Muisto',
      rebirth: 'Uudelleensyntyminen',
      freedom: 'Vapaus',
      mystical: 'Mystinen',
      rebellious: 'Kapinallinen',
      serene: 'Rauhallinen',
      empowered: 'Voimaantunut',
      ethereal: 'Eteerinen',
      fearless: 'Peloton',
      wanderlust: 'Matkahaluu',
      transcendent: 'Transsendentti',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Ymmarretaan {{name}}n visio',
      understandingVisionDefault: 'Ymmarretaan visiotasi',
      tailoringDesigns: 'Raataloidaan suunnitelmia tyyliisi',
      settingUpCoverUp: 'Asetetaan peittotyokaluja',
      personalizingExperience: 'Personoidaan kokemustasi',
      preparingStudio: 'Valmistellaan suunnittelustudiotasi',
      configuringWorkspace: 'Maaeritetaan tyotilaasi',
      applyingPreferences: 'Sovelletaan asetuksiasi',
      journeyStartsNow: 'Tatuointimatkasi alkaa nyt',
    },

    // Reviews
    reviews: {
      review1Title: 'Mahtava sovellus!',
      review1Body:
        'Sovellus toimii, nayttaa ja tuntuu hyvalta! Vaikuttunut siita, miten hyvin se asetti tatuoinnin, huomioiden tarkan valaistuksen ja varjostuksen.',
      review1Author: 'Jacob C.',
      review2Title: 'Oikeasti hyodyllinen',
      review2Body:
        'Tatuointisuunnitelmat ovat siisteja ja yksityiskohtaisia. Joidenkin kuvien generointi kestaa hieman pidempaan, mutta kaiken kaikkiaan tama on yksi parhaista AI-tatuointisovelluksista.',
      review2Author: 'Alexrays1',
      review3Title: 'Rakastan tata',
      review3Body: 'Erittain suositeltava \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Luo tatuointeja valittomasti',
    containerDesc1:
      'Kirjoita muutama sana ja luo uniikkeja tatuointimalleja valittomasti.',
    containerTitle2: 'Mukauta suunnitelmasi',
    containerDesc2:
      'Saada vareja, asettelua ja tyylialiti, jotta tatuointi on taydellisesti sinun.',
    containerTitle3: 'Esikatsele ihollasi',
    containerDesc3:
      'Esikatsele mita tahansa tatuointia ihollasi — saada kokoa ja sijoittelua valittomasti.',
    paused: 'Keskeytetty',

    // Relative time
    time: {
      today: 'Tanaan',
      yesterday: 'Eilen',
      daysAgo: '{{count}} paivaa sitten',
      weeksAgo: '{{count}} viikkoa sitten',
      monthsAgo: '{{count}} kuukautta sitten',
      yearsAgo: '{{count}} vuotta sitten',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Kokeiluteknologia',
      tryOnTechnologyDesc: 'Katso tatuoinnit ihollasi ennen paatosta',
      aiTattooGenerator: 'AI-tatuointigeneraattori',
      aiTattooGeneratorDesc: 'Luo ainutlaatuisia suunnitelmia ideoistasi',
      coverUpAssistant: 'Peittoavustaja',
      coverUpAssistantDesc: 'Muuta olemassa olevat tatuoinnit uudeksi taiteeksi',
      artistTools: 'Taiteilijan tyokalut',
      artistToolsDesc:
        'Nayta asiakkaille suunitelmat heidaan kehollaan valittomasti',
      precisePlacement: 'Tarkka sijoittelu',
      precisePlacementDesc:
        'Taydellinen koko {{location}}-tatuoinnillesi',
      styleMatchedDesigns: 'Tyyliin sovitetut suunnitelmat',
      styleMatchedDesignsDesc:
        'Kuratoitu {{style}}-tatuointiinspiraatio',
      readyWhenYouAre: 'Valmis kun sina olet',
      readyWhenYouAreDesc: 'Aloita suunnittelu tanaan, mustetta huomenna',
      realisticTryOn: 'Realistinen kokeilu',
      realisticTryOnDesc: 'Naet tarkalleen miltae se nayttaa sinulla',
      saveAndShare: 'Tallenna ja jaa',
      saveAndShareDesc:
        'Saailyta suosikkisi ja jaa tatuoijallesi',
      aiDesignStudio: 'AI-suunnittelustudio',
      aiDesignStudioDesc: 'Luo ainutlaatuisia tatuointisuunnitelmia valittomasti',

      // Personalized greetings
      greetingArtist: 'Uusi asiakaskokemustyokalusi on valmis',
      greetingCoverUp: 'Valmis muuttamaan tatuointisi',
      greetingGenerate: 'AI-suunnittelustudiosi odottaa',
      greetingDefault: 'Tatuointimatkasi alkaa nyt',
      welcomeAboard: 'Tervetuloa mukaan, {{name}}!',
      welcomeName: 'Tervetuloa {{name}}',

      // Urgency messages
      urgencyArtist: 'Nayta asiakkaille realistiset esikatselut valittomasti.',
      urgencyCoverUp: 'Korjaa tatuointisi luottavaisesti.',
      urgencyTryOn: 'Kokeile tatuointiasi ennen paatosta.',
      urgencyDefault: 'Rajattomat suunnitelmat. Nolla katumusta.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Jatka',
    restorePurchase: 'Palauta ostos',
    current: 'NYKYINEN',

    // Plan terms
    week: 'Viikko',
    month: 'Kuukausi',
    weekly: 'Viikoittain',
    monthly: 'Kuukausittain',
    perWeek: '/Viikko',

    // Content
    loadingPlans: 'Ladataan tilauksia...',
    restoreSubscription: 'Palauta tilaus',
    fairUseNote: 'AI-suunnittelugenerointi sisaltaa kohtuulliset kayttoerajat.',
    saveBadge: 'Saasta {{percent}}%',
    subtitle:
      'Tutki tatuointi-ideoita, hieno suunnitelmia loputtomien variaatioiden kautta, kokeile niita milla tahansa kehonosalla ja vie korkealaatuisia tuloksia.',

    // Personalized headlines
    headlineArtist: 'Nayta asiakkaille tatuointi ennen kuin teett sen',
    headlineCoverUp: 'Muuta tatuointisi luottavaisesti',
    headlineTryOn: 'Naet tatuointisi ennen paatosta',
    headlineDesign: 'Suunnittele tatuointi, josta olet aina haaveillut',
    headlineBrowse: 'Loyda taydellinen tatuointisuunnitelma',

    // Purchase flow alerts
    successTitle: 'Onnistui!',
    subscriptionActiveMessage:
      'Tilauksesi on nyt aktiivinen. Nauti rajattomista tatuointisuunnitelmista!',
    almostThereTitle: 'Melkein perilla!',
    createAccountMessage:
      'Luo tili aktivoidaksesi tilauksesi ja aloittaaksesi suunnittelun.',
    purchaseRestoredTitle: 'Ostos palautettu!',
    subscriptionNowActive: 'Tilauksesi on nyt aktiivinen.',
    purchaseFoundTitle: 'Ostos loytyi!',
    purchasesRestoredMessage: 'Ostoksesi on palautettu.',
    noPurchasesFoundTitle: 'Ostoksia ei loytynyt',
    noPurchasesFoundMessage:
      'Aikaisempia ostoksia ei loytynyt palautettavaksi.',
    purchaseFailedTitle: 'Ostos epaonnistui',
    purchaseFailedMessage:
      'Ostoa ei voitu suorittaa. Yrita uudelleen.',
    errorRestoringTitle: 'Virhe ostosten palauttamisessa',
    errorRestoringMessage:
      'Ostoksia ei voitu palauttaa. Yrita uudelleen.',
    subscriptionActivated: 'Tilaus aktivoitu!',

    // Alerts
    purchaseError: 'Ostosvirhe',
    restoreSuccess: 'Ostos palautettu',
    restoreError: 'Palautus epaonnistui',
    noPurchaseFound: 'Aikaisempaa ostoa ei loytynyt',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Peruuta generointi',
    cancelGenerationTitle: 'Peruutetaanko generointi?',
    cancelGenerationMessage:
      'Olet peruuttamassa nykyista generointia. Tama poistaa nykyisen generoinnin ja aloittaa uuden istunnon.',
    clearEverythingTitle: 'Tyhjenna kaikki?',
    clearEverythingMessage:
      'Olet tyhjentamassa taman istunnon. Tama poistaa kaikki generoidut tatuoinnit. Tallenna kaikki mitae haluat sailyttaa ennen jatkamista.',
    clearEverything: 'Tyhjenna kaikki',

    // Input
    enterText: 'Kirjoita teksti',
    describeTattoo: 'Kuvaile tatuointiasi tai valitse ehdotus alta',

    // Try on alert
    tryOnTitle: 'Kokeile {{style}}',
    tryOnMessage:
      'Ota kuva kehonosastasi nahdaksesi miltae tama tatuointi nayttaa sinulla!',
    choosePhoto: 'Valitse kuva',
    later: 'Myohemmin',

    // Preview on body
    previewOnBody: 'Esikatsele tatuointi keholla',
    imageSelectedCombine: '1 kuva valittu - lisaa yksi lisaa yhdistamiseksi',

    // Suggestions
    createTattoo: 'Luo {{title}}-tatuointi',
    createStyleTattoo: 'Luo tatuointi {{title}}-tyyliin',
    tryStyle: 'Kokeile {{title}}-tyylialitia',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Paivitetaan tatuointiasi...',
      startingNew: 'Aloitetaan uusi tatuointi...',
      warmingUp: 'Tatuointikone lampenee...',
      summoningSpirits: 'Kutsutaan mustehenki...',
      drawingInspiration: 'Haetaan inspiraatiota maailmankaikkeudesta...',
      brewingMasterpiece: 'Mestariteos melkein valmis...',
      sprinkleCreativity: 'Lisataan ripaus luovuutta...',
      perfectingPixels: 'Viimeistellaan jokainen pikseli tatuoinnistasi...',
      injectingCreativity: 'Injektoidaan luovuutta ihoosi...',
      mixingShade: 'Sekoitetaan taydellinnen savyn mahtavuutta...',
      sharpeningNeedles: 'Teroitetaan virtuaalisia neuloja...',
      calibratingVibes: 'Kalibroidaan tatuointitunnelmiasi...',
      consultingOracle: 'Konsultoidaan tatuointioraakkelia...',
    },

    // Error states
    error: {
      keepCreating: 'Jatka luomista ilman rajoituksia',
      limitReachedFree:
        'Olet saavuttanut nykyisen generointirajas. Paivita nyt tutustuaksesi variaatioihin, hioaksesi suunnitelmia ja jatkaaksesi luomista ilman odotusta.',
      unlockUnlimited: 'Avaa rajattomat suunnitelmat \u2192',
      limitReachedSubscribed:
        'Olet saavuttanut rajan talle jaksolle',
      limitReachedSubscribedDesc:
        'Tilauksesi generointiraja on saavutettu. Rajasi nollautuu seuraavan laskutusjakson alussa.',
      tryAgainLater: 'Yrita myohemmin uudelleen',
      contactSupport: 'Ota yhteytta tukeen',
    },

    // Session history actions
    actions: 'Toiminnot',
    saveToGallery: 'Tallenna galleriaan',

    // Result image actions
    imageActions: 'Kuvatoiminnot',
    copyToClipboard: 'Kopioi leikepoydale',
    imageCopied: 'Kuva kopioitu leikepoydale',
    imageCopyFailed: 'Kuvan kopiointi epaonnistui',
    imageSaved: 'Kuva tallennettu galleriaan!',
    imageSaveFailed: 'Kuvan tallennus epaonnistui. Yrita uudelleen.',

    // Context alerts
    photoAccessTitle: 'Kuvien kayttooikeus tarvitaan',
    photoAccessMessage:
      'Kuvien tallentamiseksi galleriaan tarvitsemme paasyn kuviisi. Voit ottaa taman kayttoon Asetuksissa.',
    resetSessionTitle: 'Nollaa istunto?',
    resetSessionMessage:
      'Haluatko varmasti nollata istunnon? Tama tyhjentaa kaikki generoidut tatuoinnit ja aloittaa uuden istunnon.',
    resetButton: 'Nollaa',
    shareError: 'Kuvan jakaminen epaonnistui',
    imageDataError: 'Kuvatietojen hakeminen epaonnistui',
    pickImageError: 'Kuvan valitseminen galleriasta epaonnistui',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Kuvaa ei loytynyt',
    useTattoo: 'Kayta tatuointia',
    useTattooError: 'Tatuoinnin kaytto epaonnistui. Yrita uudelleen.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Kaikki kuvat',
    addPhotos: 'Lisaa {{count}} kuva',
    addPhotos_other: 'Lisaa {{count}} kuvaa',
    recentPhotos: 'Viimeisimmat kuvat',
    selectOneMore: 'Valitse 1 lisaa yhdistamiseksi',

    // Options
    tryOn: 'Kokeile',
    tryOnDescriptionWithTattoo:
      'Lisaa kuva kehostasi esikatselua varten',
    tryOnDescriptionNoTattoo:
      'Valitse ensin tatuointi, lisaa sitten kuvasi',
    createNewTattoo: 'Luo uusi tatuointi',
    createNewTattooDescription:
      'Kuvaile tatuointi-ideasi niin generoimme sen',
    tattooCoverUp: 'Tatuoinnin peittoidea',
    tattooCoverUpDescription:
      'Luo idea olemassa olevan tatuoinnin peittamiseksi kayttaen kuvaa referenssina',
    removeTattoo: 'Poista tatuointi',
    removeTattooDescription:
      'Poista olemassa oleva tatuointi kuvasta',
    promptHistory: 'Kehoitehistoria',
    promptHistoryDescription: 'Naet aiemmat kehotteesi',
    requestFeature: 'Ehdota ominaisuutta',
    requestFeatureDescription:
      'Kerro meille, mita haluaisit Tattoo Design AI:n tukevan seuraavaksi',

    // Try on alerts
    addYourPhoto: 'Lisaa kuvasi',
    addPhotoQuestion:
      'Miten haluat lisata kuvan paikasta, johon haluat tatuoinnin?',
    takePhoto: 'Ota kuva',
    chooseFromLibrary: 'Valitse kirjastosta',
    createTattooFirst: 'Luo ensin tatuointi',
    createTattooFirstMessage:
      'Tatuoinnin kokeilemiseksi sinun taytyy:\n\n1. Generoida tai valita tatuointisuunnitelma\n2. Sitten lisata kuva kehostasi\n\nYhdistamme ne nayttaaksemme miltae se nayttaa!',
    createTattoo: 'Luo tatuointi',
  },

  tattoos: {
    // Screen header
    title: 'Omat tatuoinnit',

    // Loading
    loading: 'Ladataan tatuointeja...',

    // Empty state
    emptyTitle: 'Ei tallennettuja tatuointeja viela',
    emptyDescription:
      'Luo ja tallenna ensimmainen tatuointisuunnitelmasi! Pyyhkaise alas paivittaaksesi.',

    // Cloud restore
    restoringFromCloud: 'Palautetaan pilvestae...',
    noCloudGenerations: 'Pilvigenerointeja ei loytynyt',
    restoredCount: 'Palautettu {{restored}} / {{total}} tatuointia',
    restoreFailedTitle: 'Palautus epaonnistui',
    restoreFailedMessage:
      'Pilvesta palauttaminen epaonnistui. Yrita uudelleen.',
    cloudFound: '{{count}} tatuointi loytyi pilvestae',
    cloudFound_other: '{{count}} tatuointia loytyi pilvestae',
    restoring: 'Palautetaan...',
    restore: 'Palauta',
    cloudCount: '{{count}} pilvessa',

    // Detail screen
    tattooNotFound: 'Tatuointia ei loytynyt',
    backToHome: 'Takaisin etusivulle',
    shareError: 'Kuvan jakaminen epaonnistui. Yrita uudelleen.',
    imageAccessError: 'Kuvatiedostoon ei paasty kasiksi.',
    deleteTitle: 'Poista tatuointi',
    deleteMessage:
      'Haluatko varmasti poistaa taman tatuointisuunnitelman? Tata toimintoa ei voi peruuttaa.',
    deleteError: 'Kuvan poistaminen epaonnistui. Yrita uudelleen.',
  },

  generation: {
    // Loading
    applyingDesign: 'Asetetaan tatuointisuunnitelmaasi...',

    // Error
    invalidRequest: 'Virheellinen pyynto',
    generationFailed: 'Generointi epaonnistui',
    failedToGenerate: 'Tatuointisuunnitelman generointi epaonnistui',
    startOver: 'Aloita alusta',

    // Success
    tattooReady: 'Tatuointisi on valmis!',
    tattooReadyDescription:
      'Nain suunnitelmasi nayttaisi asetettuna',
    saveToGallery: 'Tallenna galleriaan',
    generateAnother: 'Generoi toinen',

    // Save alerts
    savedTitle: 'Tallennettu!',
    savedMessage:
      'Tatuointisuunnitelmasi on tallennettu kuvagalleriaasi.',
    viewInGallery: 'Nayta galleriassa',

    // Generate another alert
    generateAnotherTitle: 'Generoidaanko toinen?',
    generateAnotherMessage:
      'Et ole viela tallentanut tata tatuointia. Haluatko tallentaa sen ennen jatkamista?',
    continueWithoutSaving: 'Jatka tallentamatta',
    saveAndContinue: 'Tallenna ja jatka',

    // Cancel alert
    cancelGenerationTitle: 'Peruutetaanko generointi?',
    cancelGenerationMessage:
      'Tatuointiasi generoidaan yha. Jos peruutat nyt, tama generointi lasketaan silti kaytorajaasi. Haluatko varmasti peruuttaa?',
    keepGenerating: 'Jatka generointia',
    unableToSave: 'Kuvan tallennus epaonnistui. Yrita uudelleen.',
  },

  home: {
    // Section headers
    discoverStyles: 'Loyda uusia tyyleja',
    moreStyles: 'Lisaa tyyleja',
    moods: 'Tunnelmat',
    discoverSketches: 'Loyda luonnossuunnitelmia',

    // Quick actions
    generateFromIdea: 'Generoi ideasta',
    generateFromIdeaDesc: 'Luo tatuointi mielikuvituksestasi',
    seeItOnSkin: 'Naet sen ihollasi',
    seeItOnSkinDesc: 'Ota kuva ja esikatsele tatuointia',
    blendTattoo: 'Yhdista tatuointi',
    blendTattooDesc: 'Lataa olemassa oleva tatuointi ja muokkaa sita',
    removeTattoo: 'Poista tatuointi',
    removeTattooDesc: 'Poista olemassa oleva tatuointi iholta',
  },

  explore: {
    // Section headers
    byStyles: 'Tutustu tyyleittain',
    byMoods: 'Tutustu tunnelmittain',
    byBodyPart: 'Tutustu kehonosittain',

    // Filter labels
    styles: 'Tyylit',
    bodyPart: 'Kehonosa',
  },

  featureRequest: {
    title: 'Jaa ideasi',
    placeholder: 'Ideoita kokemuksesi parantamiseksi...',
    needHelp: 'Tarvitsetko apua? ',
    contactUs: 'Ota meihin yhteytta',
    successToast:
      'Ominaisuusehdotus lahetetty! Kiitos palautteestasi.',
    errorToast:
      'Ominaisuusehdotuksen lahettaminen epaonnistui. Yrita uudelleen.',
  },

  promptHistory: {
    title: 'Kehoitehistoria',
    clearAll: 'Tyhjenna kaikki',
    clearAllTitle: 'Tyhjenna kehoitehistoria',
    clearAllMessage:
      'Haluatko varmasti poistaa kaikki tallennetut kehotteet?',
    deletePromptTitle: 'Poista kehote',
    deletePromptMessage: 'Poista tama kehote historiasta?',
    emptyTitle: 'Ei kehotteita viela',
    emptyDescription:
      'Kehotteesi nayvaat taalla kun olet generoinut tatuoinnin',
  },
};
