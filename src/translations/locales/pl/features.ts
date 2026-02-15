/**
 * Polish translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const plFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Podejrzyj tatuaz zanim zdecydujesz.',
    whatsYourName: 'Jak masz na imie?',
    namePlaceholder: 'Twoje imie',
    nameDescription: 'Uzyjem tego, aby spersonalizowac Twoje doswiadczenie.',
    welcome: 'Witaj',
    welcomeDescription: 'Dostosujmy teraz Twoje doswiadczenie z Tattoo Design AI.',
    describeYou: 'Co najlepiej\n Cie opisuje?',
    describeYouDescription:
      'To pomaga nam spersonalizowac doswiadczenie na podstawie Twojego stosunku do tatuazy',
    whatToDo: 'Co chcialbyś\n zrobic?',
    whatToDoDescription:
      'To pomaga nam zrozumiec, jak chcesz odkrywac tatuaze i jakie narzedzia beda dla Ciebie najbardziej przydatne.',
    designTattoo: 'Zaprojektuj\n wymarzony tatuaz',
    designTattooDescription:
      'Wpisz kilka slow lub przeslij obraz i natychmiast wygeneruj unikalne projekty tatuazy.',
    whereTattoo: 'Gdzie chcesz\n miec tatuaz?',
    whereTattooDescription:
      'Umiejscowienie wplywa na projekt, rozmiar i uklad, co pomaga nam dopasowac pomysly do Twojego ciala.',
    pickStyles: 'Wybierz do 5\n stylow',
    pickStylesDescription:
      'Twoje wybory stylowe pomagaja nam zawezic projekty pasujace do Twojego gustu.',
    whenTattoo: 'Kiedy planujesz\n zrobic tatuaz?',
    whenTattooDescription:
      'To pomaga nam dopasowac\n doswiadczenie do Twojego harmonogramu.',
    whatVibe: 'Jaki klimat\n Cie interesuje?',
    whatVibeDescription:
      'Tatuaze niosa emocje, to pomaga nam zrozumiec historie za Twoim tatuazem.',
    settingUp: 'Przygotowujemy\n wszystko dla Ciebie',
    youreAllSet: 'Wszystko gotowe!',
    youreAllSetDescription: 'Wszystko gotowe, mozesz zaczynac.',

    // CTA
    alreadyHaveAccount: 'Masz juz konto? ',
    signIn: 'Zaloguj sie',

    // User description options
    userDescription: {
      artist: 'Tworze tatuaze',
      client: 'Chce miec tatuaz',
      model: 'Uzywam tatuazy do tresci',
      explorer: 'Po prostu ogladam',
    },

    // Goal options
    goal: {
      tryOn: 'Przymierz tatuaze na moich zdjeciach',
      generate: 'Wygeneruj pomysly na tatuaze',
      browse: 'Tylko przegladam lub szukam inspiracji',
      coverUp: 'Zakrycie/Przerobienie istniejacego tatuazu',
    },

    // Location options
    location: {
      wrist: 'Nadgarstek',
      chest: 'Klatka piersiowa',
      hand: 'Dlon',
      back: 'Plecy',
      legs: 'Nogi',
      forearm: 'Przedramie',
      neck: 'Szyja',
      jaw: 'Szczeka',
      forehead: 'Czolo',
      knuckles: 'Knykcie',
      fingers: 'Palce',
      cheek: 'Policzek',
      shoulder: 'Ramie',
      temple: 'Skron',
      ribs: 'Zebra',
      abdomen: 'Brzuch',
      face: 'Twarz',
      hips: 'Biodra',
      thigh: 'Udo',
      tricep: 'Triceps',
      bicep: 'Biceps',
      collarbone: 'Obojczyk',
      ankle: 'Kostka',
      foot: 'Stopa',
      palm: 'Wnetrze dloni',
      notSure: 'Nie wiem',
    },

    // Style options
    styles: {
      traditional: 'Tradycyjny',
      realism: 'Realizm',
      minimal: 'Minimalistyczny',
      celtic: 'Celtycki',
      blackwork: 'Blackwork',
      illustrative: 'Ilustracyjny',
      lettering: 'Liternictwo',
      irezumi: 'Irezumi',
      geometric: 'Geometryczny',
      religious: 'Religijny',
      anime: 'Anime',
      fineLine: 'Cienka linia',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Kaligrafia',
      portrait: 'Portret',
      floral: 'Kwiatowy',
      polynesian: 'Polinezyjski',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gotycki',
      patchwork: 'Patchwork',
      abstract: 'Abstrakcyjny',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologia',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'W tym tygodniu',
      thisMonth: 'W tym miesiacu',
      oneToThreeMonths: 'Za 1-3 miesiace',
      someday: 'Kiedys, po prostu ogladam',
    },

    // Vibe options
    vibe: {
      bold: 'Odwazny',
      confident: 'Pewny siebie',
      soft: 'Delikatny',
      dark: 'Mroczny',
      edgy: 'Ostry',
      elegant: 'Elegancki',
      spiritual: 'Duchowy',
      cute: 'Slodki',
      symbolic: 'Symboliczny',
      playful: 'Zabawny',
      clean: 'Czysty',
      modern: 'Nowoczesny',
      meaningful: 'Znaczacy',
      personalStory: 'Osobista historia',
      family: 'Rodzina',
      love: 'Milosc',
      memory: 'Wspomnienie',
      rebirth: 'Odrodzenie',
      freedom: 'Wolnosc',
      mystical: 'Mistyczny',
      rebellious: 'Buntowniczy',
      serene: 'Spokojny',
      empowered: 'Silny',
      ethereal: 'Eteryczny',
      fearless: 'Nieustraszony',
      wanderlust: 'Wedrowny',
      transcendent: 'Transcendentny',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Rozumiem wizje {{name}}',
      understandingVisionDefault: 'Rozumiem Twoja wizje',
      tailoringDesigns: 'Dostosowuje projekty do Twojego stylu',
      settingUpCoverUp: 'Przygotowuje narzedzia do zakrywania',
      personalizingExperience: 'Personalizuje Twoje doswiadczenie',
      preparingStudio: 'Przygotowuje Twoje studio projektowe',
      configuringWorkspace: 'Konfiguruję Twoja przestrzen robocza',
      applyingPreferences: 'Stosuje Twoje preferencje',
      journeyStartsNow: 'Twoja przygoda z tatuazem zaczyna sie teraz',
    },

    // Reviews
    reviews: {
      review1Title: 'Swietna aplikacja!',
      review1Body:
        'Aplikacja dziala, wyglada i sprawia sie swietnie! Jestem pod wrazeniem, jak dobrze naklada tatuaz, uwzgledniajac dokladne oswietlenie i cieniowanie.',
      review1Author: 'Jacob C.',
      review2Title: 'Naprawde przydatna',
      review2Body:
        'Projekty tatuazy sa czyste i szczegolowe. Niektore obrazy generuja sie troche dluzej, ale ogolnie to jedna z najlepszych aplikacji AI do tatuazy.',
      review2Author: 'Alexrays1',
      review3Title: 'Uwielbiam to',
      review3Body: 'Goraco polecam \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Generuj tatuaze natychmiast',
    containerDesc1:
      'Wpisz kilka slow i natychmiast wygeneruj unikalne projekty tatuazy.',
    containerTitle2: 'Spersonalizuj swoj projekt',
    containerDesc2:
      'Dostosuj kolory, uklad i styl, aby tatuaz byl idealnie Twoj.',
    containerTitle3: 'Podejrzyj na swojej skorze',
    containerDesc3:
      'Podejrzyj dowolny tatuaz na swojej skorze — dostosuj rozmiar i umiejscowienie natychmiast.',
    paused: 'Wstrzymano',

    // Relative time
    time: {
      today: 'Dzisiaj',
      yesterday: 'Wczoraj',
      daysAgo: '{{count}} dni temu',
      weeksAgo: '{{count}} tygodni temu',
      monthsAgo: '{{count}} miesiecy temu',
      yearsAgo: '{{count}} lat temu',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Technologia przymierzania',
      tryOnTechnologyDesc: 'Zobacz tatuaze na skorze przed decyzja',
      aiTattooGenerator: 'Generator tatuazy AI',
      aiTattooGeneratorDesc: 'Twórz unikalne projekty ze swoich pomyslow',
      coverUpAssistant: 'Asystent zakrywania',
      coverUpAssistantDesc: 'Przeksztalc istniejace tatuaze w nowa sztuke',
      artistTools: 'Narzedzia dla artystow',
      artistToolsDesc:
        'Pokaz klientom projekty na ich ciele natychmiast',
      precisePlacement: 'Precyzyjne umiejscowienie',
      precisePlacementDesc:
        'Idealny rozmiar dla tatuazu na {{location}}',
      styleMatchedDesigns: 'Projekty dopasowane stylem',
      styleMatchedDesignsDesc:
        'Wyselekcjonowana inspiracja tatuazy {{style}}',
      readyWhenYouAre: 'Gotowi, gdy Ty jestes',
      readyWhenYouAreDesc: 'Zacznij projektowac dzis, tatuaz jutro',
      realisticTryOn: 'Realistyczne przymierzanie',
      realisticTryOnDesc: 'Zobacz dokladnie, jak bedzie wygladac na Tobie',
      saveAndShare: 'Zapisz i udostepnij',
      saveAndShareDesc:
        'Zachowaj ulubione i udostepnij swojemu tatuazyscie',
      aiDesignStudio: 'Studio projektowe AI',
      aiDesignStudioDesc: 'Generuj unikalne projekty tatuazy natychmiast',

      // Personalized greetings
      greetingArtist: 'Twoje nowe narzedzie obslugi klientow jest gotowe',
      greetingCoverUp: 'Gotowy do przeksztalcenia Twojego tatuazu',
      greetingGenerate: 'Twoje studio projektowe AI czeka',
      greetingDefault: 'Twoja przygoda z tatuazem zaczyna sie teraz',
      welcomeAboard: 'Witaj na pokladzie, {{name}}!',
      welcomeName: 'Witaj {{name}}',

      // Urgency messages
      urgencyArtist: 'Pokaz klientom realistyczne podglady natychmiast.',
      urgencyCoverUp: 'Napraw swoj tatuaz z pewnoscia.',
      urgencyTryOn: 'Przymierz tatuaz zanim sie zdecydujesz.',
      urgencyDefault: 'Nieograniczone projekty. Zero zalowania.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Kontynuuj',
    restorePurchase: 'Przywroc zakup',
    current: 'AKTUALNY',

    // Plan terms
    week: 'Tydzien',
    month: 'Miesiac',
    weekly: 'Tygodniowo',
    perWeek: '/Tydzien',

    // Content
    loadingPlans: 'Ladowanie planow...',
    restoreSubscription: 'Przywroc subskrypcje',
    fairUseNote: 'Generowanie projektow AI obejmuje limity uczciwego uzytkowania.',
    saveBadge: 'Zaoszczedz {{percent}}%',
    subtitle:
      'Odkrywaj pomysly na tatuaze, udoskonalaj projekty poprzez nieskonczong ilosc wariantow, przymierzaj je na dowolnej czesci ciala i eksportuj wyniki w wysokiej jakosci.',

    // Personalized headlines
    headlineArtist: 'Pokaz klientom tatuaz zanim go wykonasz',
    headlineCoverUp: 'Przeksztalc swoj tatuaz z pewnoscia',
    headlineTryOn: 'Zobacz swoj tatuaz zanim sie zdecydujesz',
    headlineDesign: 'Zaprojektuj tatuaz, o którym zawsze marzyles',
    headlineBrowse: 'Znajdz swoj idealny projekt tatuazu',

    // Purchase flow alerts
    successTitle: 'Sukces!',
    subscriptionActiveMessage:
      'Twoja subskrypcja jest juz aktywna. Ciesz sie nieograniczonymi projektami tatuazy!',
    almostThereTitle: 'Juz prawie!',
    createAccountMessage:
      'Zaloz konto, aby aktywowac subskrypcje i zaczac projektowac.',
    purchaseRestoredTitle: 'Zakup przywrocony!',
    subscriptionNowActive: 'Twoja subskrypcja jest juz aktywna.',
    purchaseFoundTitle: 'Znaleziono zakup!',
    purchasesRestoredMessage: 'Twoje zakupy zostaly przywrocone.',
    noPurchasesFoundTitle: 'Nie znaleziono zakupow',
    noPurchasesFoundMessage:
      'Nie znaleziono wczesniejszych zakupow do przywrocenia.',
    purchaseFailedTitle: 'Zakup nie powiodl sie',
    purchaseFailedMessage:
      'Nie udalo sie zrealizowac zakupu. Sprobuj ponownie.',
    errorRestoringTitle: 'Blad przywracania zakupow',
    errorRestoringMessage:
      'Nie udalo sie przywrocic zakupow. Sprobuj ponownie.',
    subscriptionActivated: 'Subskrypcja aktywowana!',

    // Alerts
    purchaseError: 'Blad zakupu',
    restoreSuccess: 'Zakup przywrocony',
    restoreError: 'Przywracanie nie powiodlo sie',
    noPurchaseFound: 'Nie znaleziono wczesniejszego zakupu',

    // Pricing overhaul
    annual: 'Roczny',
    year: 'Rok',
    perYear: '/Rok',
    freeTrialBadge: '{{days}}-DNIOWY BEZPŁATNY OKRES PRÓBNY',
    startTrialButton: 'Rozpocznij {{days}} dni bezpłatnego okresu próbnego',
    specialOffer: 'Oferta Specjalna',
    limitedTimeOffer: 'Oferta Ograniczona Czasowo',
    discountSubtitle: 'Tylko dla nowych użytkowników — odblokuj pełny dostęp już dziś',
    savePercent: 'Oszczędź {{percent}}%',
    annualPerWeek: '{{price}}/tydzień',
    todayOnly: 'Tylko Dzisiaj',
    offerExpires: 'Oferta wygasa za',
    perWeekBilled: 'tygodniowo, rozliczane {{period}}',
    originalPrice: 'Było {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Anuluj generowanie',
    cancelGenerationTitle: 'Anulowac generowanie?',
    cancelGenerationMessage:
      'Zamierzasz anulowac biezace generowanie. Spowoduje to usuniecie biezacego generowania i rozpoczecie nowej sesji.',
    clearEverythingTitle: 'Wyczysc wszystko?',
    clearEverythingMessage:
      'Zamierzasz wyczysc ta sesje. Spowoduje to usuniecie wszystkich wygenerowanych tatuazy. Zapisz wszystko, co chcesz zachowac przed kontynuowaniem.',
    clearEverything: 'Wyczysc wszystko',

    // Input
    enterText: 'Wpisz tekst',
    describeTattoo: 'Opisz swoj tatuaz lub wybierz sugestie ponizej',

    // Try on alert
    tryOnTitle: 'Przymierz {{style}}',
    tryOnMessage:
      'Zrob zdjecie czesci ciala, aby zobaczyc, jak ten tatuaz na Tobie wyglada!',
    choosePhoto: 'Wybierz zdjecie',
    later: 'Pozniej',

    // Preview on body
    previewOnBody: 'Podejrzyj tatuaz na ciele',
    imageSelectedCombine: '1 obraz wybrany - dodaj jeszcze jeden, aby polaczyc',

    // Suggestions
    createTattoo: 'Stworz tatuaz {{title}}',
    createStyleTattoo: 'Stworz tatuaz w stylu {{title}}',
    tryStyle: 'Wyprobuj styl {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Aktualizuję Twoj tatuaz...',
      startingNew: 'Rozpoczynam nowy tatuaz...',
      warmingUp: 'Maszyna do tatuazu sie rozgrzewa...',
      summoningSpirits: 'Przywolywa duchy tuszu...',
      drawingInspiration: 'Czerpie inspiracje z wszechswiata...',
      brewingMasterpiece: 'Juz prawie gotowe, tworze arcydzielo...',
      sprinkleCreativity: 'Dodaje szypte kreatywnosci...',
      perfectingPixels: 'Dopracowuje kazdy piksel Twojego tatuazu...',
      injectingCreativity: 'Wstrzykuje kreatywnosc w Twoja skore...',
      mixingShade: 'Mieszam idealny odcien niesamowitosci...',
      sharpeningNeedles: 'Ostrze wirtualne igly...',
      calibratingVibes: 'Kalibruje klimat Twojego tatuazu...',
      consultingOracle: 'Konsultuję z wyroczniq tatuazy...',
    },

    // Error states
    error: {
      keepCreating: 'Twórz dalej bez ograniczen',
      limitReachedFree:
        'Osiagnales biezacy limit generowania. Ulepsz teraz, aby odkrywac warianty, udoskonalac projekty i tworzyc bez czekania.',
      unlockUnlimited: 'Odblokuj nieograniczone projekty \u2192',
      limitReachedSubscribed:
        'Osiagnales limit w tym okresie',
      limitReachedSubscribedDesc:
        'Limit generowania Twojego planu zostal osiagniety. Limit zostanie zresetowany na poczatku nastepnego okresu rozliczeniowego.',
      tryAgainLater: 'Sprobuj ponownie pozniej',
      contactSupport: 'Skontaktuj sie z nami',
    },

    // Session history actions
    actions: 'Akcje',
    saveToGallery: 'Zapisz w galerii',

    // Result image actions
    imageActions: 'Akcje obrazu',
    copyToClipboard: 'Kopiuj do schowka',
    imageCopied: 'Obraz skopiowany do schowka',
    imageCopyFailed: 'Nie udalo sie skopiowac obrazu',
    imageSaved: 'Obraz zapisany w galerii!',
    imageSaveFailed: 'Nie udalo sie zapisac obrazu. Sprobuj ponownie.',

    // Context alerts
    photoAccessTitle: 'Wymagany dostep do zdjec',
    photoAccessMessage:
      'Aby zapisywac obrazy w galerii, potrzebujemy dostepu do Twoich zdjec. Mozesz to wlaczyc w Ustawieniach.',
    resetSessionTitle: 'Zresetowac sesje?',
    resetSessionMessage:
      'Czy na pewno chcesz zresetowac sesje? Spowoduje to wyczyszczenie wszystkich wygenerowanych tatuazy i rozpoczecie nowej sesji.',
    resetButton: 'Resetuj',
    shareError: 'Nie udalo sie udostepnic obrazu',
    imageDataError: 'Nie udalo sie pobrac danych obrazu',
    pickImageError: 'Nie udalo sie wybrac obrazu z galerii',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Nie znaleziono obrazu',
    useTattoo: 'Uzyj tatuazu',
    useTattooError: 'Nie udalo sie uzyc tego tatuazu. Sprobuj ponownie.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Wszystkie zdjecia',
    addPhotos: 'Dodaj {{count}} zdjecie',
    addPhotos_other: 'Dodaj {{count}} zdjec',
    recentPhotos: 'Ostatnie zdjecia',
    selectOneMore: 'Wybierz jeszcze 1, aby polaczyc',

    // Options
    tryOn: 'Przymierz',
    tryOnDescriptionWithTattoo:
      'Dodaj zdjecie swojego ciala, aby zobaczyc podglad',
    tryOnDescriptionNoTattoo:
      'Najpierw wybierz tatuaz, potem dodaj zdjecie',
    createNewTattoo: 'Stworz nowy tatuaz',
    createNewTattooDescription:
      'Opisz swoj pomysl na tatuaz, a my go wygenerujemy',
    tattooCoverUp: 'Pomysl na zakrycie tatuazu',
    tattooCoverUpDescription:
      'Wygeneruj pomysl na zakrycie istniejacego tatuazu na podstawie zdjecia',
    removeTattoo: 'Usun tatuaz',
    removeTattooDescription:
      'Usun istniejacy tatuaz ze zdjecia',
    promptHistory: 'Historia promptow',
    promptHistoryDescription: 'Przejrzyj swoje wczesniejsze prompty',
    requestFeature: 'Zaproponuj funkcje',
    requestFeatureDescription:
      'Powiedz nam, co chcialbyś, aby Tattoo Design AI wspieralo nastepnie',

    // Try on alerts
    addYourPhoto: 'Dodaj swoje zdjecie',
    addPhotoQuestion:
      'Jak chcesz dodac zdjecie miejsca, gdzie chcesz tatuaz?',
    takePhoto: 'Zrob zdjecie',
    chooseFromLibrary: 'Wybierz z biblioteki',
    createTattooFirst: 'Najpierw stworz tatuaz',
    createTattooFirstMessage:
      'Aby przymierzyc tatuaz, musisz:\n\n1. Wygenerowac lub wybrac projekt tatuazu\n2. Nastepnie dodac zdjecie swojego ciala\n\nPolaczyme je, aby pokazac, jak to wyglada!',
    createTattoo: 'Stworz tatuaz',
  },

  tattoos: {
    // Screen header
    title: 'Moje tatuaze',

    // Loading
    loading: 'Ladowanie tatuazy...',

    // Empty state
    emptyTitle: 'Brak zapisanych tatuazy',
    emptyDescription:
      'Stworz i zapisz swoj pierwszy projekt tatuazu! Przeciagnij w dol, aby odswiezyc.',

    // Cloud restore
    restoringFromCloud: 'Przywracanie z chmury...',
    noCloudGenerations: 'Nie znaleziono generacji w chmurze',
    restoredCount: 'Przywrocono {{restored}} z {{total}} tatuazy',
    restoreFailedTitle: 'Przywracanie nie powiodlo sie',
    restoreFailedMessage:
      'Nie udalo sie przywrocic z chmury. Sprobuj ponownie.',
    cloudFound: '{{count}} tatuaz znaleziony w chmurze',
    cloudFound_other: '{{count}} tatuazy znalezionych w chmurze',
    restoring: 'Przywracanie...',
    restore: 'Przywroc',
    cloudCount: '{{count}} w chmurze',

    // Detail screen
    tattooNotFound: 'Nie znaleziono tatuazu',
    backToHome: 'Wroc do strony glownej',
    shareError: 'Nie udalo sie udostepnic obrazu. Sprobuj ponownie.',
    imageAccessError: 'Nie mozna uzyskac dostepu do pliku obrazu.',
    deleteTitle: 'Usun tatuaz',
    deleteMessage:
      'Czy na pewno chcesz usunac ten projekt tatuazu? Tej akcji nie mozna cofnac.',
    deleteError: 'Nie udalo sie usunac obrazu. Sprobuj ponownie.',
  },

  generation: {
    // Loading
    applyingDesign: 'Nakladam Twoj projekt tatuazu...',

    // Error
    invalidRequest: 'Nieprawidlowe zadanie',
    generationFailed: 'Generowanie nie powiodlo sie',
    failedToGenerate: 'Nie udalo sie wygenerowac projektu tatuazu',
    startOver: 'Zacznij od nowa',

    // Success
    tattooReady: 'Twoj tatuaz jest gotowy!',
    tattooReadyDescription:
      'Tak wygladaloby Twoj projekt nałozony na skore',
    saveToGallery: 'Zapisz w galerii',
    generateAnother: 'Wygeneruj kolejny',

    // Save alerts
    savedTitle: 'Zapisano!',
    savedMessage:
      'Twoj projekt tatuazu zostal zapisany w galerii zdjec.',
    viewInGallery: 'Zobacz w galerii',

    // Generate another alert
    generateAnotherTitle: 'Wygenerowac kolejny?',
    generateAnotherMessage:
      'Nie zapisales jeszcze tego tatuazu. Czy chcesz go zapisac przed kontynuowaniem?',
    continueWithoutSaving: 'Kontynuuj bez zapisywania',
    saveAndContinue: 'Zapisz i kontynuuj',

    // Cancel alert
    cancelGenerationTitle: 'Anulowac generowanie?',
    cancelGenerationMessage:
      'Twoj tatuaz jest wciaz generowany. Jesli anulujesz teraz, to generowanie bedzie nadal liczone do Twojego limitu uzycia. Czy na pewno chcesz anulowac?',
    keepGenerating: 'Kontynuuj generowanie',
    unableToSave: 'Nie udalo sie zapisac obrazu. Sprobuj ponownie.',
  },

  home: {
    // Section headers
    discoverStyles: 'Odkrywaj nowe style',
    moreStyles: 'Wiecej stylow',
    moods: 'Nastroje',
    discoverSketches: 'Odkrywaj projekty szkicow',

    // Quick actions
    generateFromIdea: 'Generuj z pomyslu',
    generateFromIdeaDesc: 'Stworz tatuaz z Twojej wyobrazni',
    seeItOnSkin: 'Zobacz na swojej skorze',
    seeItOnSkinDesc: 'Zrob zdjecie i podejrzyj tatuaz',
    blendTattoo: 'Polacz tatuaz',
    blendTattooDesc: 'Przeslij istniejacy tatuaz i zmodyfikuj go',
    removeTattoo: 'Usun tatuaz',
    removeTattooDesc: 'Usun istniejacy tatuaz ze skory',
  },

  explore: {
    // Section headers
    byStyles: 'Przegladaj wedlug stylow',
    byMoods: 'Przegladaj wedlug nastrojow',
    byBodyPart: 'Przegladaj wedlug czesci ciala',

    // Filter labels
    styles: 'Style',
    bodyPart: 'Czesc ciala',
  },

  featureRequest: {
    title: 'Podziel sie pomyslami',
    placeholder: 'Pomysly na poprawe Twojego doswiadczenia...',
    needHelp: 'Potrzebujesz pomocy? ',
    contactUs: 'Skontaktuj sie z nami',
    successToast:
      'Propozycja funkcji wyslana! Dziekujemy za Twoja opinie.',
    errorToast:
      'Nie udalo sie wyslac propozycji funkcji. Sprobuj ponownie.',
  },

  promptHistory: {
    title: 'Historia promptow',
    clearAll: 'Wyczysc wszystko',
    clearAllTitle: 'Wyczysc historie promptow',
    clearAllMessage:
      'Czy na pewno chcesz usunac wszystkie zapisane prompty?',
    deletePromptTitle: 'Usun prompt',
    deletePromptMessage: 'Usunac ten prompt z historii?',
    emptyTitle: 'Brak promptow',
    emptyDescription:
      'Twoje prompty pojawia sie tutaj po wygenerowaniu tatuazu',
  },
};
