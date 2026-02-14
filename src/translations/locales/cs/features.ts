/**
 * Czech translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const csFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Podivejte se na tetovani pred rozhodnutim.',
    whatsYourName: 'Jak se jmenujete?',
    namePlaceholder: 'Vase jmeno',
    nameDescription: 'Pouzijeme ho k personalizaci vaseho zazitku.',
    welcome: 'Vitejte',
    welcomeDescription: 'Pojdme prizpusobit vas zazitek s Tattoo Design AI.',
    describeYou: 'Co vas nejlepe \n vystihuje?',
    describeYouDescription:
      'Pomaha nam personalizovat zazitek na zaklade vaseho vztahu k tetovani',
    whatToDo: 'Co byste chteli\n delat?',
    whatToDoDescription:
      'Pomaha nam pochopit, jak chcete prozkoumat tetovani a jake nastroje by vam byly nejuzitecnejsi.',
    designTattoo: 'Navrhni si\n tetovani',
    designTattooDescription:
      'Napiste par slov nebo nahrajte obrazek a okamzite vygenerujte jedinecne navrhy tetovani.',
    whereTattoo: 'Kam chcete\n tetovani?',
    whereTattooDescription:
      'Umisteni ovlivnuje design, velikost a tok, coz nam pomaha prizpusobit napady vasemu telu.',
    pickStyles: 'Vyberte az 5\n stylu',
    pickStylesDescription:
      'Vase volba stylu nam pomaha zuzit navrhy, ktere odpovidaji vasemu vkusu.',
    whenTattoo: 'Kdy uvazujete\n o tetovani?',
    whenTattooDescription:
      'Pomaha nam prizpusobit\n zazitek vasemu casovemu planu.',
    whatVibe: 'Jaky pocit\n hledate?',
    whatVibeDescription:
      'Tetovani nesou emoce, pomaha nam to pochopit pribeh za vasim.',
    settingUp: 'Nastavujeme vse\n pro vas',
    youreAllSet: 'Vse je pripraveno!',
    youreAllSetDescription: 'Vse je pripraveno, muzete zacit.',

    // CTA
    alreadyHaveAccount: 'Uz mate ucet? ',
    signIn: 'Prihlasit se',

    // User description options
    userDescription: {
      artist: 'Tvorim tetovani',
      client: 'Chci si nechat udelat tetovani',
      model: 'Pouzivam tetovani pro obsah',
      explorer: 'Jen prozkoumavam',
    },

    // Goal options
    goal: {
      tryOn: 'Vyzkouset tetovani na svych fotkach',
      generate: 'Generovat napady na tetovani',
      browse: 'Jen se rozhlizim nebo hledam inspiraci',
      coverUp: 'Zakryt/Prepracovat existujici tetovani',
    },

    // Location options
    location: {
      wrist: 'Zapesti',
      chest: 'Hrudnik',
      hand: 'Ruka',
      back: 'Zada',
      legs: 'Nohy',
      forearm: 'Predlokti',
      neck: 'Krk',
      jaw: 'Celist',
      forehead: 'Celo',
      knuckles: 'Klouby',
      fingers: 'Prsty',
      cheek: 'Tvare',
      shoulder: 'Rameno',
      temple: 'Spanek',
      ribs: 'Zebra',
      abdomen: 'Bricho',
      face: 'Oblicej',
      hips: 'Boky',
      thigh: 'Stehno',
      tricep: 'Triceps',
      bicep: 'Biceps',
      collarbone: 'Klicni kost',
      ankle: 'Kotniky',
      foot: 'Chodidlo',
      palm: 'Dlan',
      notSure: 'Nevim jeste',
    },

    // Style options
    styles: {
      traditional: 'Traditional',
      realism: 'Realismus',
      minimal: 'Minimalisticky',
      celtic: 'Keltsky',
      blackwork: 'Blackwork',
      illustrative: 'Ilustrativni',
      lettering: 'Lettering',
      irezumi: 'Irezumi',
      geometric: 'Geometricky',
      religious: 'Nabozensky',
      anime: 'Anime',
      fineLine: 'Fine Line',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Kaligrafie',
      portrait: 'Portret',
      floral: 'Kvetinovy',
      polynesian: 'Polynezsky',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Goticky',
      patchwork: 'Patchwork',
      abstract: 'Abstraktni',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologie',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Tento tyden',
      thisMonth: 'Tento mesic',
      oneToThreeMonths: 'Za 1-3 mesice',
      someday: 'Nekdy, jen prozkoumavam',
    },

    // Vibe options
    vibe: {
      bold: 'Razantni',
      confident: 'Sebejisty',
      soft: 'Jemny',
      dark: 'Temny',
      edgy: 'Odvazny',
      elegant: 'Elegantni',
      spiritual: 'Duchovno',
      cute: 'Roztomily',
      symbolic: 'Symbolicky',
      playful: 'Hravy',
      clean: 'Cisty',
      modern: 'Moderni',
      meaningful: 'Vyznamny',
      personalStory: 'Osobni pribeh',
      family: 'Rodina',
      love: 'Laska',
      memory: 'Vzpominka',
      rebirth: 'Znovuzrozeni',
      freedom: 'Svoboda',
      mystical: 'Mysticky',
      rebellious: 'Rebelsky',
      serene: 'Klidny',
      empowered: 'Posilneny',
      ethereal: 'Nezemsky',
      fearless: 'Nebojacny',
      wanderlust: 'Touha cestovat',
      transcendent: 'Transcendentni',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Chapeme vizi uzivatele {{name}}',
      understandingVisionDefault: 'Chapeme vasi vizi',
      tailoringDesigns: 'Prizpusobujeme navrhy vasemu stylu',
      settingUpCoverUp: 'Nastavujeme nastroje pro zakryti',
      personalizingExperience: 'Personalizujeme vas zazitek',
      preparingStudio: 'Pripravujeme vase designove studio',
      configuringWorkspace: 'Konfigurujeme vas pracovni prostor',
      applyingPreferences: 'Aplikujeme vase preference',
      journeyStartsNow: 'Vase cesta k tetovani zacina nyni',
    },

    // Reviews
    reviews: {
      review1Title: 'Uzasna aplikace!',
      review1Body:
        'Aplikace funguje, vypada a pusobi skvele! Jsem ohromen tim, jak dobre aplikovala tetovani se spravnym osvetlenim a stinovaim.',
      review1Author: 'Jacob C.',
      review2Title: 'Opravdu uzitecne',
      review2Body:
        'Navrhy tetovani jsou ciste a detailni. Nektere obrazky se generuji trochu dele, ale celkove je to jedna z nejlepsich AI aplikaci pro tetovani.',
      review2Author: 'Alexrays1',
      review3Title: 'Miluji to',
      review3Body: 'Vrele doporucuji \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Generujte tetovani okamzite',
    containerDesc1:
      'Napiste par slov a okamzite vygenerujte jedinecne navrhy tetovani.',
    containerTitle2: 'Personalizujte svuj navrh',
    containerDesc2:
      'Upravte barvy, rozlozeni a styl, aby bylo tetovani dokonale vase.',
    containerTitle3: 'Nahled na vasi kuzi',
    containerDesc3:
      'Podivejte se na tetovani na sve kuzi — upravte velikost a umisteni okamzite.',
    paused: 'Pozastaveno',

    // Relative time
    time: {
      today: 'Dnes',
      yesterday: 'Vcera',
      daysAgo: 'pred {{count}} dny',
      weeksAgo: 'pred {{count}} tydny',
      monthsAgo: 'pred {{count}} mesici',
      yearsAgo: 'pred {{count}} lety',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Technologie zkouseni',
      tryOnTechnologyDesc: 'Podivejte se na tetovani na kuzi pred rozhodnutim',
      aiTattooGenerator: 'AI generator tetovani',
      aiTattooGeneratorDesc: 'Vytvarejte jedinecne navrhy z vasich napadu',
      coverUpAssistant: 'Asistent pro zakryti',
      coverUpAssistantDesc: 'Premente stavajici tetovani v nove umeni',
      artistTools: 'Nastroje pro umelce',
      artistToolsDesc:
        'Ukazte klientum navrhy na jejich tele okamzite',
      precisePlacement: 'Presne umisteni',
      precisePlacementDesc:
        'Dokonala velikost pro vase tetovani na {{location}}',
      styleMatchedDesigns: 'Navrhy podle stylu',
      styleMatchedDesignsDesc:
        'Kurovana inspirace pro {{style}} tetovani',
      readyWhenYouAre: 'Pripraveno kdyz jste vy',
      readyWhenYouAreDesc: 'Zacnete navrhovat dnes, tetovani zitra',
      realisticTryOn: 'Realisticke zkouseni',
      realisticTryOnDesc: 'Podivejte se presne, jak to bude vypadat na vas',
      saveAndShare: 'Ulozit a sdilet',
      saveAndShareDesc:
        'Uchovejte sve oblibene a sdliejte je se svym umelcem',
      aiDesignStudio: 'AI designove studio',
      aiDesignStudioDesc: 'Generujte jedinecne navrhy tetovani okamzite',

      // Personalized greetings
      greetingArtist: 'Vas novy nastroj pro klienty je pripraven',
      greetingCoverUp: 'Pripraveno pretvorit vase tetovani',
      greetingGenerate: 'Vase AI designove studio ceka',
      greetingDefault: 'Vase cesta k tetovani zacina nyni',
      welcomeAboard: 'Vitejte na palube, {{name}}!',
      welcomeName: 'Vitejte {{name}}',

      // Urgency messages
      urgencyArtist: 'Ukazte klientum realne nahledy okamzite.',
      urgencyCoverUp: 'Opravte sve tetovani s jistotou.',
      urgencyTryOn: 'Vyzkouste tetovani pred rozhodnutim.',
      urgencyDefault: 'Neomezene navrhy. Zadna litost.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Pokracovat',
    restorePurchase: 'Obnovit nakup',
    current: 'AKTUALNI',

    // Plan terms
    week: 'Tyden',
    month: 'Mesic',
    weekly: 'Tydne',
    monthly: 'Mesicne',
    perWeek: '/tyden',

    // Content
    loadingPlans: 'Nacitani planu...',
    restoreSubscription: 'Obnovit predplatne',
    fairUseNote: 'Generovani AI designu zahrnuje limity fer pouzivani.',
    saveBadge: 'Usetrite {{percent}} %',
    subtitle:
      'Prozkoumejte napady na tetovani, zdokonalujte navrhy nekonecnymi variacemi, vyzkouste je na jakekoli casti tela a exportujte vysledky ve vysoke kvalite.',

    // Personalized headlines
    headlineArtist: 'Ukazte klientum jejich tetovani pred realizaci',
    headlineCoverUp: 'Premente sve tetovani s jistotou',
    headlineTryOn: 'Podivejte se na tetovani pred rozhodnutim',
    headlineDesign: 'Navrhete tetovani, o kterem jste vzdy snili',
    headlineBrowse: 'Najdete svuj dokonaly navrh tetovani',

    // Purchase flow alerts
    successTitle: 'Uspech!',
    subscriptionActiveMessage:
      'Vase predplatne je nyni aktivni. Uzijte si neomezene navrhy tetovani!',
    almostThereTitle: 'Skoro tam!',
    createAccountMessage:
      'Vytvorte si ucet pro aktivaci predplatneho a zacnete navrhovat.',
    purchaseRestoredTitle: 'Nakup obnoven!',
    subscriptionNowActive: 'Vase predplatne je nyni aktivni.',
    purchaseFoundTitle: 'Nakup nalezen!',
    purchasesRestoredMessage: 'Vase nakupy byly obnoveny.',
    noPurchasesFoundTitle: 'Zadne nakupy nenalezeny',
    noPurchasesFoundMessage:
      'Nebyly nalezeny zadne predchozi nakupy k obnoveni.',
    purchaseFailedTitle: 'Nakup se nezdaril',
    purchaseFailedMessage:
      'Nelze dokoncit nakup. Zkuste to prosim znovu.',
    errorRestoringTitle: 'Chyba pri obnove nakupu',
    errorRestoringMessage:
      'Nelze obnovit nakupy. Zkuste to prosim znovu.',
    subscriptionActivated: 'Predplatne aktivovano!',

    // Alerts
    purchaseError: 'Chyba nakupu',
    restoreSuccess: 'Nakup obnoven',
    restoreError: 'Obnova selhala',
    noPurchaseFound: 'Zadny predchozi nakup nenalezen',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Zrusit generovani',
    cancelGenerationTitle: 'Zrusit generovani?',
    cancelGenerationMessage:
      'Chystaste se zrusit aktualni generovani. Tim se odstrani aktualni generovani a zacne nova relace.',
    clearEverythingTitle: 'Vymazat vse?',
    clearEverythingMessage:
      'Chystaste se vymazat tuto relaci. Tim se odstraini vsechna vygenerovana tetovani. Pred pokracovanim si ulozte vse, co chcete zachovat.',
    clearEverything: 'Vymazat vse',

    // Input
    enterText: 'Zadejte text',
    describeTattoo: 'Popiste sve tetovani nebo vyberte navrh nize',

    // Try on alert
    tryOnTitle: 'Vyzkouset {{style}}',
    tryOnMessage:
      'Vyfodte cast sveho tela a podivejte se, jak toto tetovani vypada na vas!',
    choosePhoto: 'Vybrat fotku',
    later: 'Pozdeji',

    // Preview on body
    previewOnBody: 'Nahled tetovani na tele',
    imageSelectedCombine: '1 obrazek vybran - pridejte dalsi ke kombinaci',

    // Suggestions
    createTattoo: 'Vytvorit tetovani {{title}}',
    createStyleTattoo: 'Vytvorit tetovani ve stylu {{title}}',
    tryStyle: 'Zkusit styl {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Aktualizace vaseho tetovani...',
      startingNew: 'Zaciname nove tetovani...',
      warmingUp: 'Tetovaci stroj se zahreva...',
      summoningSpirits: 'Vyvolavame duchy inkoustu...',
      drawingInspiration: 'Cerpame inspiraci z vesmiru...',
      brewingMasterpiece: 'Skoro hotovo, varime vase mistrovske dilo...',
      sprinkleCreativity: 'Pridavame spetku kreativity...',
      perfectingPixels: 'Zdokonalujeme kazdy pixel vaseho tetovani...',
      injectingCreativity: 'Vstrikujeme kreativitu do vasi kuze...',
      mixingShade: 'Michame dokonaly odstin uzasnosti...',
      sharpeningNeedles: 'Ostrime virtualni jehly...',
      calibratingVibes: 'Kalibrujeme vibe vaseho tetovani...',
      consultingOracle: 'Konzultujeme s tetovacim orakuem...',
    },

    // Error states
    error: {
      keepCreating: 'Tvorte bez limitu',
      limitReachedFree:
        'Dosahli jste aktualniho limitu generovani. Upgradujte nyni a prozkoumejte variace, zdokonalte navrhy a tvorte bez cekani.',
      unlockUnlimited: 'Odemknout neomezene navrhy \u2192',
      limitReachedSubscribed:
        'Dosahli jste limitu pro toto obdobi',
      limitReachedSubscribedDesc:
        'Limit generovani vaseho planu byl dosazen. Vas limit se obnovi na zacatku dalsiho fakturacniho obdobi.',
      tryAgainLater: 'Zkuste to pozdeji',
      contactSupport: 'Kontaktovat podporu',
    },

    // Session history actions
    actions: 'Akce',
    saveToGallery: 'Ulozit do galerie',

    // Result image actions
    imageActions: 'Akce s obrazkem',
    copyToClipboard: 'Kopirovat do schranky',
    imageCopied: 'Obrazek zkopirovan do schranky',
    imageCopyFailed: 'Kopirovani obrazku selhalo',
    imageSaved: 'Obrazek ulozen do galerie!',
    imageSaveFailed: 'Ulozeni obrazku selhalo. Zkuste to prosim znovu.',

    // Context alerts
    photoAccessTitle: 'Potrebujeme pristup k fotkam',
    photoAccessMessage:
      'Pro ulozeni obrazku do galerie potrebujeme pristup k vasim fotkam. Muzete to povolit v Nastaveni.',
    resetSessionTitle: 'Obnovit relaci?',
    resetSessionMessage:
      'Opravdu chcete obnovit relaci? Tim se vymazou vsechna vygenerovana tetovani a zacne nova relace.',
    resetButton: 'Obnovit',
    shareError: 'Sdileni obrazku selhalo',
    imageDataError: 'Ziskani dat obrazku selhalo',
    pickImageError: 'Vyber obrazku z galerie selhal',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Obrazek nenalezen',
    useTattoo: 'Pouzit tetovani',
    useTattooError: 'Nepodailro se pouzit toto tetovani. Zkuste to prosim znovu.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Vsechny fotky',
    addPhotos: 'Pridat {{count}} fotku',
    addPhotos_other: 'Pridat {{count}} fotek',
    recentPhotos: 'Nedavne fotky',
    selectOneMore: 'Vyberte jeste 1 ke kombinaci',

    // Options
    tryOn: 'Vyzkouset',
    tryOnDescriptionWithTattoo:
      'Pridejte fotku sveho tela pro nahled',
    tryOnDescriptionNoTattoo:
      'Nejprve vyberte tetovani, pak pridejte fotku',
    createNewTattoo: 'Vytvorit nove tetovani',
    createNewTattooDescription:
      'Popiste svuj napad na tetovani a my ho vygenerujeme',
    tattooCoverUp: 'Napad na zakryti tetovani',
    tattooCoverUpDescription:
      'Vygenerujte napad na zakryti existujiciho tetovani pomoci fotky jako reference',
    removeTattoo: 'Odstranit tetovani',
    removeTattooDescription:
      'Odstranit existujici tetovani z fotky',
    promptHistory: 'Historie promptu',
    promptHistoryDescription: 'Zobrazte sve predchozi prompty',
    requestFeature: 'Navrhnout funkci',
    requestFeatureDescription:
      'Recte nam, co byste chteli, aby Tattoo Design AI dale podporoval',

    // Try on alerts
    addYourPhoto: 'Pridejte svou fotku',
    addPhotoQuestion:
      'Jak chcete pridat fotku mista, kam chcete tetovani?',
    takePhoto: 'Vyfotit',
    chooseFromLibrary: 'Vybrat z knihovny',
    createTattooFirst: 'Nejprve vytvorte tetovani',
    createTattooFirstMessage:
      'Pro vyzkouset tetovani budete muset:\n\n1. Vygenerovat nebo vybrat navrh tetovani\n2. Pak pridat fotku sveho tela\n\nSpojime je, abychom ukazali, jak to vypada!',
    createTattoo: 'Vytvorit tetovani',
  },

  tattoos: {
    // Screen header
    title: 'Moje tetovani',

    // Loading
    loading: 'Nacitani tetovani...',

    // Empty state
    emptyTitle: 'Zatim zadna ulozena tetovani',
    emptyDescription:
      'Vytvorte a ulozte svuj prvni navrh tetovani! Potahnete dolu pro obnoveni.',

    // Cloud restore
    restoringFromCloud: 'Obnovujeme z cloudu...',
    noCloudGenerations: 'Zadna cloudova generovani nenalezena',
    restoredCount: 'Obnoveno {{restored}} z {{total}} tetovani',
    restoreFailedTitle: 'Obnova selhala',
    restoreFailedMessage:
      'Nelze obnovit z cloudu. Zkuste to prosim znovu.',
    cloudFound: '{{count}} tetovani nalezeno v cloudu',
    cloudFound_other: '{{count}} tetovani nalezeno v cloudu',
    restoring: 'Obnovujeme...',
    restore: 'Obnovit',
    cloudCount: '{{count}} v cloudu',

    // Detail screen
    tattooNotFound: 'Tetovani nenalezeno',
    backToHome: 'Zpet na domov',
    shareError: 'Nelze sdilet obrazek. Zkuste to prosim znovu.',
    imageAccessError: 'Nelze pristoupit k souboru obrazku.',
    deleteTitle: 'Smazat tetovani',
    deleteMessage:
      'Opravdu chcete smazat tento navrh tetovani? Tuto akci nelze vratit zpet.',
    deleteError: 'Nelze smazat obrazek. Zkuste to prosim znovu.',
  },

  generation: {
    // Loading
    applyingDesign: 'Aplikujeme vas navrh tetovani...',

    // Error
    invalidRequest: 'Neplatny pozadavek',
    generationFailed: 'Generovani selhalo',
    failedToGenerate: 'Nepodarilo se vygenerovat navrh tetovani',
    startOver: 'Zacit znovu',

    // Success
    tattooReady: 'Vase tetovani je pripraveno!',
    tattooReadyDescription:
      'Takto by vas navrh vypadal aplikovany',
    saveToGallery: 'Ulozit do galerie',
    generateAnother: 'Vygenerovat dalsi',

    // Save alerts
    savedTitle: 'Ulozeno!',
    savedMessage:
      'Vas navrh tetovani byl ulozen do vasi galerie fotek.',
    viewInGallery: 'Zobrazit v galerii',

    // Generate another alert
    generateAnotherTitle: 'Vygenerovat dalsi?',
    generateAnotherMessage:
      'Toto tetovani jste jeste neulozili. Chcete ho ulozit pred pokracovanim?',
    continueWithoutSaving: 'Pokracovat bez ulozeni',
    saveAndContinue: 'Ulozit a pokracovat',

    // Cancel alert
    cancelGenerationTitle: 'Zrusit generovani?',
    cancelGenerationMessage:
      'Vase tetovani se stale generuje. Pokud nyni zrusite, toto generovani se stale zapocita do vaseho limitu pouziti. Opravdu chcete zrusit?',
    keepGenerating: 'Pokracovat v generovani',
    unableToSave: 'Nelze ulozit obrazek. Zkuste to prosim znovu.',
  },

  home: {
    // Section headers
    discoverStyles: 'Objevte nove styly',
    moreStyles: 'Dalsi styly',
    moods: 'Nalady',
    discoverSketches: 'Objevte navrhy skic',

    // Quick actions
    generateFromIdea: 'Generovat z napadu',
    generateFromIdeaDesc: 'Vytvorte tetovani z vasi predstavivosti',
    seeItOnSkin: 'Podivejte se na kuzi',
    seeItOnSkinDesc: 'Vyfodte se a podivejte se na nahled tetovani',
    blendTattoo: 'Smichat tetovani',
    blendTattooDesc: 'Nahrajte existujici tetovani a upravte ho',
    removeTattoo: 'Odstranit tetovani',
    removeTattooDesc: 'Odstrante existujici tetovani z kuze',
  },

  explore: {
    // Section headers
    byStyles: 'Prozkoumat podle stylu',
    byMoods: 'Prozkoumat podle nalady',
    byBodyPart: 'Prozkoumat podle casti tela',

    // Filter labels
    styles: 'Styly',
    bodyPart: 'Cast tela',
  },

  featureRequest: {
    title: 'Podelte se o sve napady',
    placeholder: 'Napady pro zlepseni vaseho zazitku...',
    needHelp: 'Potrebujete pomoc? ',
    contactUs: 'Kontaktujte nas',
    successToast:
      'Navrh funkce odeslan! Dekujeme za vasi zpetnou vazbu.',
    errorToast:
      'Odeslani navrhu funkce selhalo. Zkuste to prosim znovu.',
  },

  promptHistory: {
    title: 'Historie promptu',
    clearAll: 'Vymazat vse',
    clearAllTitle: 'Vymazat historii promptu',
    clearAllMessage:
      'Opravdu chcete smazat vsechny ulozene prompty?',
    deletePromptTitle: 'Smazat prompt',
    deletePromptMessage: 'Odstranit tento prompt z historie?',
    emptyTitle: 'Zatim zadne prompty',
    emptyDescription:
      'Vase prompty se zde zobrazi po vygenerovani tetovani',
  },
};
