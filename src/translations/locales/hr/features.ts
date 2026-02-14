/**
 * Croatian translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const hrFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Pregledajte svoju tetovažu prije odluke.',
    whatsYourName: 'Kako se zovete?',
    namePlaceholder: 'Vaše ime',
    nameDescription: 'Koristit ćemo ovo za personalizaciju vašeg iskustva.',
    welcome: 'Dobrodošli',
    welcomeDescription: 'Prilagodimo vaše Tattoo Design AI iskustvo sada.',
    describeYou: 'Što vas \n najbolje opisuje?',
    describeYouDescription:
      'Ovo nam pomaže personalizirati iskustvo na temelju vašeg odnosa s tetovažama',
    whatToDo: 'Što biste\n željeli raditi?',
    whatToDoDescription:
      'Ovo nam pomaže razumjeti kako želite istraživati tetovaže i koji bi vam alati bili najkorisniji.',
    designTattoo: 'Dizajnirajte \n tetovažu kakvu želite',
    designTattooDescription:
      'Upišite par riječi ili učitajte sliku i trenutno generirajte jedinstvene dizajne tetovaža.',
    whereTattoo: 'Gdje želite\n tetovažu?',
    whereTattooDescription:
      'Položaj utječe na dizajn, veličinu i tok, što nam pomaže prilagoditi ideje vašem tijelu.',
    pickStyles: 'Odaberite do 5 \n stilova koji vam se sviđaju',
    pickStylesDescription:
      'Vaš odabir stilova pomaže nam suziti dizajne koji odgovaraju vašem ukusu.',
    whenTattoo: 'Kada razmišljate\n o tetovaži?',
    whenTattooDescription:
      'Ovo nam pomaže prilagoditi\n iskustvo vašem vremenskom okviru.',
    whatVibe: 'Kakav ugođaj\n želite?',
    whatVibeDescription:
      'Tetovaže nose emocije, ovo nam pomaže razumjeti priču iza vaše.',
    settingUp: 'Postavljamo stvari\n za vas',
    youreAllSet: 'Sve je spremno!',
    youreAllSetDescription: 'Sve je spremno za početak.',

    // CTA
    alreadyHaveAccount: 'Već imate račun? ',
    signIn: 'Prijavi se',

    // User description options
    userDescription: {
      artist: 'Kreiram tetovaže',
      client: 'Želim tetovažu',
      model: 'Koristim tetovaže za sadržaj',
      explorer: 'Samo istražujem',
    },

    // Goal options
    goal: {
      tryOn: 'Isprobaj tetovaže na mojim fotografijama',
      generate: 'Generiraj ideje za tetovaže',
      browse: 'Samo pregledavam ili tražim inspiraciju',
      coverUp: 'Prekrivanje/preinaka postojeće tetovaže',
    },

    // Location options
    location: {
      wrist: 'Zapešće',
      chest: 'Prsa',
      hand: 'Ruka',
      back: 'Leđa',
      legs: 'Noge',
      forearm: 'Podlaktica',
      neck: 'Vrat',
      jaw: 'Čeljust',
      forehead: 'Čelo',
      knuckles: 'Zglobovi prstiju',
      fingers: 'Prsti',
      cheek: 'Obraz',
      shoulder: 'Rame',
      temple: 'Sljepoočnica',
      ribs: 'Rebra',
      abdomen: 'Trbuh',
      face: 'Lice',
      hips: 'Bokovi',
      thigh: 'Bedro',
      tricep: 'Triceps',
      bicep: 'Biceps',
      collarbone: 'Ključna kost',
      ankle: 'Gležanj',
      foot: 'Stopalo',
      palm: 'Dlan',
      notSure: 'Nisam siguran/a',
    },

    // Style options
    styles: {
      traditional: 'Tradicionalno',
      realism: 'Realizam',
      minimal: 'Minimalistički',
      celtic: 'Keltski',
      blackwork: 'Blackwork',
      illustrative: 'Ilustrativno',
      lettering: 'Natpisi',
      irezumi: 'Irezumi',
      geometric: 'Geometrijski',
      religious: 'Religijski',
      anime: 'Anime',
      fineLine: 'Tanka linija',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Kaligrafija',
      portrait: 'Portret',
      floral: 'Cvjetni',
      polynesian: 'Polinezijski',
      tribal: 'Plemenski',
      maori: 'Maori',
      gothic: 'Gotički',
      patchwork: 'Patchwork',
      abstract: 'Apstraktno',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologija',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Ovaj tjedan',
      thisMonth: 'Ovaj mjesec',
      oneToThreeMonths: 'Za 1-3 mjeseca',
      someday: 'Jednog dana, samo istražujem',
    },

    // Vibe options
    vibe: {
      bold: 'Odvažno',
      confident: 'Samopouzdano',
      soft: 'Nježno',
      dark: 'Tamno',
      edgy: 'Provokativno',
      elegant: 'Elegantno',
      spiritual: 'Duhovno',
      cute: 'Slatko',
      symbolic: 'Simbolično',
      playful: 'Razigrano',
      clean: 'Čisto',
      modern: 'Moderno',
      meaningful: 'Značajno',
      personalStory: 'Osobna priča',
      family: 'Obitelj',
      love: 'Ljubav',
      memory: 'Sjećanje',
      rebirth: 'Preporod',
      freedom: 'Sloboda',
      mystical: 'Mistično',
      rebellious: 'Buntovno',
      serene: 'Spokojno',
      empowered: 'Osnaženo',
      ethereal: 'Eterično',
      fearless: 'Neustrašivo',
      wanderlust: 'Žudnja za putovanjem',
      transcendent: 'Transcendentno',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Razumijevamo viziju korisnika {{name}}',
      understandingVisionDefault: 'Razumijevamo vašu viziju',
      tailoringDesigns: 'Prilagođavamo dizajne vašem stilu',
      settingUpCoverUp: 'Postavljamo alate za prekrivanje',
      personalizingExperience: 'Personaliziramo vaše iskustvo',
      preparingStudio: 'Pripremamo vaš dizajnerski studio',
      configuringWorkspace: 'Konfiguriramo vaš radni prostor',
      applyingPreferences: 'Primjenjujemo vaše postavke',
      journeyStartsNow: 'Vaše putovanje tetovaže počinje sada',
    },

    // Reviews
    reviews: {
      review1Title: 'Nevjerojatna aplikacija!',
      review1Body:
        'Aplikacija radi, izgleda i djeluje odlično! Impresioniran/a sam koliko dobro primjenjuje tetovažu, uzimajući u obzir točno osvjetljenje i sjene.',
      review1Author: 'Jacob C.',
      review2Title: 'Stvarno korisna',
      review2Body:
        'Dizajni tetovaža su čisti i detaljni. Nekim slikama treba malo duže za generiranje, ali u cjelini je to jedna od najboljih AI aplikacija za tetovaže.',
      review2Author: 'Alexrays1',
      review3Title: 'Obožavam ovo',
      review3Body: 'Toplo preporučujem \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Generirajte tetovaže trenutno',
    containerDesc1:
      'Upišite par riječi i trenutno generirajte jedinstvene dizajne tetovaža.',
    containerTitle2: 'Personalizirajte svoj dizajn',
    containerDesc2:
      'Prilagodite boje, raspored i stil kako bi tetovaža bila savršeno vaša.',
    containerTitle3: 'Pregledajte na svojoj koži',
    containerDesc3:
      'Pregledajte bilo koju tetovažu na svojoj koži — odmah prilagodite veličinu i položaj.',
    paused: 'Pauzirano',

    // Relative time
    time: {
      today: 'Danas',
      yesterday: 'Jučer',
      daysAgo: 'prije {{count}} dana',
      weeksAgo: 'prije {{count}} tjedana',
      monthsAgo: 'prije {{count}} mjeseci',
      yearsAgo: 'prije {{count}} godina',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Tehnologija isprobavanja',
      tryOnTechnologyDesc: 'Pogledajte tetovaže na svojoj koži prije odluke',
      aiTattooGenerator: 'AI generator tetovaža',
      aiTattooGeneratorDesc: 'Kreirajte jedinstvene dizajne iz vaših ideja',
      coverUpAssistant: 'Pomoćnik za prekrivanje',
      coverUpAssistantDesc: 'Pretvorite postojeće tetovaže u novu umjetnost',
      artistTools: 'Alati za umjetnike',
      artistToolsDesc:
        'Pokažite klijentima dizajne na njihovom tijelu trenutno',
      precisePlacement: 'Precizno postavljanje',
      precisePlacementDesc:
        'Savršena veličina za vašu tetovažu na {{location}}',
      styleMatchedDesigns: 'Dizajni prema stilu',
      styleMatchedDesignsDesc:
        'Kurirana {{style}} inspiracija za tetovaže',
      readyWhenYouAre: 'Spremno kad vi jeste',
      readyWhenYouAreDesc: 'Počnite dizajnirati danas, tetovažu sutra',
      realisticTryOn: 'Realistično isprobavanje',
      realisticTryOnDesc: 'Pogledajte točno kako će izgledati na vama',
      saveAndShare: 'Spremi i podijeli',
      saveAndShareDesc:
        'Sačuvajte favorite i podijelite sa svojim tattoo umjetnikom',
      aiDesignStudio: 'AI dizajnerski studio',
      aiDesignStudioDesc: 'Generirajte jedinstvene dizajne tetovaža trenutno',

      // Personalized greetings
      greetingArtist: 'Vaš novi alat za iskustvo klijenata je spreman',
      greetingCoverUp: 'Spremni za transformaciju vaše tetovaže',
      greetingGenerate: 'Vaš AI dizajnerski studio čeka',
      greetingDefault: 'Vaše putovanje tetovaže počinje sada',
      welcomeAboard: 'Dobrodošli, {{name}}!',
      welcomeName: 'Dobrodošli {{name}}',

      // Urgency messages
      urgencyArtist: 'Pokažite klijentima prave preglede trenutno.',
      urgencyCoverUp: 'Popravite svoju tetovažu s povjerenjem.',
      urgencyTryOn: 'Isprobajte tetovažu prije nego se odlučite.',
      urgencyDefault: 'Neograničeni dizajni. Nula žaljenja.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Nastavi',
    restorePurchase: 'Vrati kupnju',
    current: 'TRENUTNO',

    // Plan terms
    week: 'Tjedan',
    month: 'Mjesec',
    weekly: 'Tjedno',
    monthly: 'Mjesečno',
    perWeek: '/Tjedan',

    // Content
    loadingPlans: 'Učitavanje planova…',
    restoreSubscription: 'Vrati pretplatu',
    fairUseNote: 'AI generiranje dizajna uključuje ograničenja poštene upotrebe.',
    saveBadge: 'Uštedite {{percent}}%',
    subtitle:
      'Istražujte ideje za tetovaže, usavršavajte dizajne kroz beskrajne varijacije, isprobajte ih na bilo kojem dijelu tijela i izvozite visokokvalitetne rezultate s povjerenjem.',

    // Personalized headlines
    headlineArtist: 'Pokažite klijentima njihovu tetovažu prije tetoviranja',
    headlineCoverUp: 'Transformirajte svoju tetovažu s povjerenjem',
    headlineTryOn: 'Pogledajte svoju tetovažu prije nego se odlučite',
    headlineDesign: 'Dizajnirajte tetovažu o kojoj ste oduvijek sanjali',
    headlineBrowse: 'Pronađite svoj savršeni dizajn tetovaže',

    // Purchase flow alerts
    successTitle: 'Uspjeh!',
    subscriptionActiveMessage:
      'Vaša pretplata je sada aktivna. Uživajte u neograničenim dizajnima tetovaža!',
    almostThereTitle: 'Skoro pa!',
    createAccountMessage:
      'Kreirajte račun za aktivaciju pretplate i početak dizajniranja.',
    purchaseRestoredTitle: 'Kupnja vraćena!',
    subscriptionNowActive: 'Vaša pretplata je sada aktivna.',
    purchaseFoundTitle: 'Kupnja pronađena!',
    purchasesRestoredMessage: 'Vaše kupnje su vraćene.',
    noPurchasesFoundTitle: 'Kupnje nisu pronađene',
    noPurchasesFoundMessage:
      'Nisu pronađene prethodne kupnje za vraćanje.',
    purchaseFailedTitle: 'Kupnja nije uspjela',
    purchaseFailedMessage:
      'Nije moguće dovršiti kupnju. Pokušajte ponovo.',
    errorRestoringTitle: 'Greška pri vraćanju kupnji',
    errorRestoringMessage:
      'Nije moguće vratiti kupnje. Pokušajte ponovo.',
    subscriptionActivated: 'Pretplata aktivirana!',

    // Alerts
    purchaseError: 'Greška pri kupnji',
    restoreSuccess: 'Kupnja vraćena',
    restoreError: 'Vraćanje nije uspjelo',
    noPurchaseFound: 'Prethodna kupnja nije pronađena',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Otkaži generiranje',
    cancelGenerationTitle: 'Otkazati generiranje?',
    cancelGenerationMessage:
      'Upravo ćete otkazati trenutno generiranje. Ovo će ukloniti trenutno generiranje i pokrenuti novu sesiju.',
    clearEverythingTitle: 'Obrisati sve?',
    clearEverythingMessage:
      'Upravo ćete obrisati ovu sesiju. Ovo će ukloniti sve generirane tetovaže. Spremite sve što želite zadržati prije nastavka.',
    clearEverything: 'Obriši sve',

    // Input
    enterText: 'Unesite tekst',
    describeTattoo: 'Opišite svoju tetovažu ili odaberite prijedlog ispod',

    // Try on alert
    tryOnTitle: 'Isprobajte {{style}}',
    tryOnMessage:
      'Fotografirajte dio tijela da vidite kako ova tetovaža izgleda na vama!',
    choosePhoto: 'Odaberi fotografiju',
    later: 'Kasnije',

    // Preview on body
    previewOnBody: 'Pregledaj tetovažu na tijelu',
    imageSelectedCombine: '1 slika odabrana - dodajte još jednu za kombiniranje',

    // Suggestions
    createTattoo: 'Kreiraj {{title}} tetovažu',
    createStyleTattoo: 'Kreiraj tetovažu u {{title}} stilu',
    tryStyle: 'Isprobaj {{title}} stil',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Ažuriramo vašu tetovažu...',
      startingNew: 'Pokrećemo novu tetovažu...',
      warmingUp: 'Stroj za tetoviranje se zagrijava...',
      summoningSpirits: 'Prizivamo duhove tinte...',
      drawingInspiration: 'Crpimo inspiraciju iz svemira...',
      brewingMasterpiece: 'Gotovo smo s pripremom vašeg remek-djela...',
      sprinkleCreativity: 'Dodajemo prstohvat kreativnosti...',
      perfectingPixels: 'Usavršavamo svaki piksel vaše tetovaže...',
      injectingCreativity: 'Ubrizgavamo kreativnost u vašu kožu...',
      mixingShade: 'Miješamo savršenu nijansu genijalnosti...',
      sharpeningNeedles: 'Oštrimo virtualne igle...',
      calibratingVibes: 'Kalibriramo ugođaj vaše tetovaže...',
      consultingOracle: 'Konzultiramo orakula za tetovaže...',
    },

    // Error states
    error: {
      keepCreating: 'Nastavite stvarati bez ograničenja',
      limitReachedFree:
        'Dosegnuli ste trenutno ograničenje generiranja. Nadogradite sada za istraživanje varijacija, usavršavanje dizajna i nastavak stvaranja bez čekanja.',
      unlockUnlimited: 'Otključajte neograničene dizajne \u2192',
      limitReachedSubscribed:
        'Dosegnuli ste ograničenje za ovo razdoblje',
      limitReachedSubscribedDesc:
        'Ograničenje generiranja vašeg plana je dosegnuto. Vaše ograničenje će se resetirati na početku sljedećeg razdoblja naplate.',
      tryAgainLater: 'Pokušajte ponovo kasnije',
      contactSupport: 'Kontaktirajte podršku',
    },

    // Session history actions
    actions: 'Radnje',
    saveToGallery: 'Spremi u galeriju',

    // Result image actions
    imageActions: 'Radnje sa slikom',
    copyToClipboard: 'Kopiraj u međuspremnik',
    imageCopied: 'Slika kopirana u međuspremnik',
    imageCopyFailed: 'Kopiranje slike nije uspjelo',
    imageSaved: 'Slika spremljena u galeriju!',
    imageSaveFailed: 'Spremanje slike nije uspjelo. Pokušajte ponovo.',

    // Context alerts
    photoAccessTitle: 'Potreban pristup fotografijama',
    photoAccessMessage:
      'Za spremanje slika u vašu galeriju, potreban nam je pristup vašim fotografijama. To možete omogućiti u Postavkama.',
    resetSessionTitle: 'Resetirati sesiju?',
    resetSessionMessage:
      'Jeste li sigurni da želite resetirati sesiju? Ovo će obrisati sve generirane tetovaže i pokrenuti novu sesiju.',
    resetButton: 'Resetiraj',
    shareError: 'Dijeljenje slike nije uspjelo',
    imageDataError: 'Dohvaćanje podataka slike nije uspjelo',
    pickImageError: 'Odabir slike iz galerije nije uspio',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Slika nije pronađena',
    useTattoo: 'Koristi tetovažu',
    useTattooError: 'Korištenje ove tetovaže nije uspjelo. Pokušajte ponovo.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Sve fotografije',
    addPhotos: 'Dodaj {{count}} fotografiju',
    addPhotos_other: 'Dodaj {{count}} fotografija',
    recentPhotos: 'Nedavne fotografije',
    selectOneMore: 'Odaberite još 1 za kombiniranje',

    // Options
    tryOn: 'Isprobaj',
    tryOnDescriptionWithTattoo:
      'Dodajte fotografiju svog tijela za pregled',
    tryOnDescriptionNoTattoo:
      'Prvo odaberite tetovažu, zatim dodajte svoju fotografiju',
    createNewTattoo: 'Kreiraj novu tetovažu',
    createNewTattooDescription:
      'Opišite svoju ideju za tetovažu i mi ćemo je generirati',
    tattooCoverUp: 'Ideja za prekrivanje tetovaže',
    tattooCoverUpDescription:
      'Generirajte ideju za prekrivanje postojeće tetovaže koristeći fotografiju kao referencu',
    removeTattoo: 'Ukloni tetovažu',
    removeTattooDescription:
      'Uklonite postojeću tetovažu s fotografije',
    promptHistory: 'Povijest upita',
    promptHistoryDescription: 'Pregledajte prethodne upite',
    requestFeature: 'Zatražite značajku',
    requestFeatureDescription:
      'Recite nam što biste željeli da Tattoo Design AI podržava sljedeće',

    // Try on alerts
    addYourPhoto: 'Dodajte svoju fotografiju',
    addPhotoQuestion:
      'Kako biste željeli dodati fotografiju mjesta gdje želite tetovažu?',
    takePhoto: 'Fotografiraj',
    chooseFromLibrary: 'Odaberi iz biblioteke',
    createTattooFirst: 'Prvo kreirajte tetovažu',
    createTattooFirstMessage:
      'Za isprobavanje tetovaže, trebate:\n\n1. Generirati ili odabrati dizajn tetovaže\n2. Zatim dodati fotografiju svog tijela\n\nKombinirat ćemo ih da pokažemo kako izgleda!',
    createTattoo: 'Kreiraj tetovažu',
  },

  tattoos: {
    // Screen header
    title: 'Moje tetovaže',

    // Loading
    loading: 'Učitavanje tetovaža...',

    // Empty state
    emptyTitle: 'Još nema spremljenih tetovaža',
    emptyDescription:
      'Kreirajte i spremite svoj prvi dizajn tetovaže! Povucite prema dolje za osvježavanje.',

    // Cloud restore
    restoringFromCloud: 'Vraćanje iz oblaka...',
    noCloudGenerations: 'Generacije u oblaku nisu pronađene',
    restoredCount: 'Vraćeno {{restored}} od {{total}} tetovaža',
    restoreFailedTitle: 'Vraćanje nije uspjelo',
    restoreFailedMessage:
      'Nije moguće vratiti iz oblaka. Pokušajte ponovo.',
    cloudFound: '{{count}} tetovaža pronađena u oblaku',
    cloudFound_other: '{{count}} tetovaža pronađeno u oblaku',
    restoring: 'Vraćanje...',
    restore: 'Vrati',
    cloudCount: '{{count}} u oblaku',

    // Detail screen
    tattooNotFound: 'Tetovaža nije pronađena',
    backToHome: 'Natrag na početnu',
    shareError: 'Dijeljenje slike nije moguće. Pokušajte ponovo.',
    imageAccessError: 'Pristup datoteci slike nije moguć.',
    deleteTitle: 'Izbriši tetovažu',
    deleteMessage:
      'Jeste li sigurni da želite izbrisati ovaj dizajn tetovaže? Ova radnja se ne može poništiti.',
    deleteError: 'Brisanje slike nije moguće. Pokušajte ponovo.',
  },

  generation: {
    // Loading
    applyingDesign: 'Primjenjujemo vaš dizajn tetovaže...',

    // Error
    invalidRequest: 'Nevažeći zahtjev',
    generationFailed: 'Generiranje nije uspjelo',
    failedToGenerate: 'Generiranje dizajna tetovaže nije uspjelo',
    startOver: 'Počni ispočetka',

    // Success
    tattooReady: 'Vaša tetovaža je spremna!',
    tattooReadyDescription:
      'Ovako bi vaš dizajn izgledao primijenjen',
    saveToGallery: 'Spremi u galeriju',
    generateAnother: 'Generiraj drugu',

    // Save alerts
    savedTitle: 'Spremljeno!',
    savedMessage:
      'Vaš dizajn tetovaže je spremljen u vašu galeriju fotografija.',
    viewInGallery: 'Pregledaj u galeriji',

    // Generate another alert
    generateAnotherTitle: 'Generirati drugu?',
    generateAnotherMessage:
      'Još niste spremili ovu tetovažu. Želite li je spremiti prije nastavka?',
    continueWithoutSaving: 'Nastavi bez spremanja',
    saveAndContinue: 'Spremi i nastavi',

    // Cancel alert
    cancelGenerationTitle: 'Otkazati generiranje?',
    cancelGenerationMessage:
      'Vaša tetovaža se još generira. Ako sada otkažete, ovo generiranje će se i dalje računati u vaše ograničenje korištenja. Jeste li sigurni da želite otkazati?',
    keepGenerating: 'Nastavi generiranje',
    unableToSave: 'Spremanje slike nije moguće. Pokušajte ponovo.',
  },

  home: {
    // Section headers
    discoverStyles: 'Otkrijte nove stilove',
    moreStyles: 'Više stilova',
    moods: 'Raspoloženja',
    discoverSketches: 'Otkrijte dizajne skica',

    // Quick actions
    generateFromIdea: 'Generiraj iz ideje',
    generateFromIdeaDesc: 'Kreirajte tetovažu iz vaše mašte',
    seeItOnSkin: 'Pogledajte na koži',
    seeItOnSkinDesc: 'Fotografirajte i pregledajte tetovažu',
    blendTattoo: 'Spoji tetovažu',
    blendTattooDesc: 'Učitajte postojeću tetovažu i izmijenite je',
    removeTattoo: 'Ukloni tetovažu',
    removeTattooDesc: 'Uklonite postojeću tetovažu s kože',
  },

  explore: {
    // Section headers
    byStyles: 'Istražite po stilovima',
    byMoods: 'Istražite po raspoloženjima',
    byBodyPart: 'Istražite po dijelu tijela',

    // Filter labels
    styles: 'Stilovi',
    bodyPart: 'Dio tijela',
  },

  featureRequest: {
    title: 'Podijelite svoje ideje',
    placeholder: 'Ideje za poboljšanje vašeg iskustva...',
    needHelp: 'Trebate pomoć? ',
    contactUs: 'Kontaktirajte nas',
    successToast:
      'Zahtjev za značajku poslan! Hvala na povratnim informacijama.',
    errorToast:
      'Slanje zahtjeva za značajku nije uspjelo. Pokušajte ponovo.',
  },

  promptHistory: {
    title: 'Povijest upita',
    clearAll: 'Obriši sve',
    clearAllTitle: 'Obriši povijest upita',
    clearAllMessage:
      'Jeste li sigurni da želite izbrisati sve spremljene upite?',
    deletePromptTitle: 'Izbriši upit',
    deletePromptMessage: 'Ukloniti ovaj upit iz povijesti?',
    emptyTitle: 'Još nema upita',
    emptyDescription:
      'Vaši upiti će se pojaviti ovdje nakon što generirate tetovažu',
  },
};
