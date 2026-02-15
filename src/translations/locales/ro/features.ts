/**
 * Romanian translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const roFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Previzualizeaza tatuajul inainte sa te decizi.',
    whatsYourName: 'Cum te numesti?',
    namePlaceholder: 'Numele tau',
    nameDescription: 'Il vom folosi pentru a personaliza experienta ta.',
    welcome: 'Bine ai venit',
    welcomeDescription: 'Hai sa personalizam experienta ta Tattoo Design AI.',
    describeYou: 'Ce te descrie \n cel mai bine?',
    describeYouDescription:
      'Ne ajuta sa personalizam experienta in functie de relatia ta cu tatuajele',
    whatToDo: 'Ce ai vrea\n sa faci?',
    whatToDoDescription:
      'Ne ajuta sa intelegem cum vrei sa explorezi tatuajele si ce instrumente ti-ar fi cele mai utile.',
    designTattoo: 'Proiecteaza \n tatuajul dorit',
    designTattooDescription:
      'Scrie cateva cuvinte sau incarca o imagine si genereaza instant designuri unice de tatuaje.',
    whereTattoo: 'Unde vrei\n tatuajul?',
    whereTattooDescription:
      'Plasarea afecteaza designul, dimensiunea si fluxul, ceea ce ne ajuta sa adaptam ideile la corpul tau.',
    pickStyles: 'Alege pana la 5\n stiluri',
    pickStylesDescription:
      'Alegerile tale de stil ne ajuta sa restrangem designurile care se potrivesc gustului tau.',
    whenTattoo: 'Cand te gandesti\n sa-ti faci tatuajul?',
    whenTattooDescription:
      'Ne ajuta sa potrivim\n experienta cu calendarul tau.',
    whatVibe: 'Ce vibe\n cauti?',
    whatVibeDescription:
      'Tatuajele poarta emotii, ne ajuta sa intelegem povestea din spatele tautuajului tau.',
    settingUp: 'Pregatim totul\n pentru tine',
    youreAllSet: 'Esti pregatit!',
    youreAllSetDescription: 'Esti pregatit sa incepi.',

    // CTA
    alreadyHaveAccount: 'Ai deja un cont? ',
    signIn: 'Autentifica-te',

    // User description options
    userDescription: {
      artist: 'Creez tatuaje',
      client: 'Imi fac un tatuaj',
      model: 'Folosesc tatuaje pentru continut',
      explorer: 'Doar explorez',
    },

    // Goal options
    goal: {
      tryOn: 'Incearca tatuaje pe fotografiile mele',
      generate: 'Genereaza idei de tatuaje',
      browse: 'Doar rasfoiesc sau caut inspiratie',
      coverUp: 'Acopera/Reface un tatuaj existent',
    },

    // Location options
    location: {
      wrist: 'Incheietura',
      chest: 'Piept',
      hand: 'Mana',
      back: 'Spate',
      legs: 'Picioare',
      forearm: 'Antebrat',
      neck: 'Gat',
      jaw: 'Maxilar',
      forehead: 'Frunte',
      knuckles: 'Articulatii',
      fingers: 'Degete',
      cheek: 'Obraz',
      shoulder: 'Umar',
      temple: 'Tamplă',
      ribs: 'Coaste',
      abdomen: 'Abdomen',
      face: 'Fata',
      hips: 'Solduri',
      thigh: 'Coapse',
      tricep: 'Triceps',
      bicep: 'Biceps',
      collarbone: 'Clavicula',
      ankle: 'Glezna',
      foot: 'Picior',
      palm: 'Palma',
      notSure: 'Nu sunt sigur',
    },

    // Style options
    styles: {
      traditional: 'Traditional',
      realism: 'Realism',
      minimal: 'Minimal',
      celtic: 'Celtic',
      blackwork: 'Blackwork',
      illustrative: 'Ilustrativ',
      lettering: 'Lettering',
      irezumi: 'Irezumi',
      geometric: 'Geometric',
      religious: 'Religios',
      anime: 'Anime',
      fineLine: 'Fine Line',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Caligrafie',
      portrait: 'Portret',
      floral: 'Floral',
      polynesian: 'Polinezian',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gotic',
      patchwork: 'Patchwork',
      abstract: 'Abstract',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologie',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Saptamana aceasta',
      thisMonth: 'Luna aceasta',
      oneToThreeMonths: 'In 1-3 luni',
      someday: 'Candva, doar explorez',
    },

    // Vibe options
    vibe: {
      bold: 'Indraznet',
      confident: 'Increzator',
      soft: 'Delicat',
      dark: 'Intunecat',
      edgy: 'Provocator',
      elegant: 'Elegant',
      spiritual: 'Spiritual',
      cute: 'Dragut',
      symbolic: 'Simbolic',
      playful: 'Jucaus',
      clean: 'Curat',
      modern: 'Modern',
      meaningful: 'Semnificativ',
      personalStory: 'Poveste personala',
      family: 'Familie',
      love: 'Dragoste',
      memory: 'Amintire',
      rebirth: 'Renastere',
      freedom: 'Libertate',
      mystical: 'Mistic',
      rebellious: 'Rebel',
      serene: 'Senin',
      empowered: 'Imputernicit',
      ethereal: 'Eteric',
      fearless: 'Neinfricat',
      wanderlust: 'Dorinta de a calatori',
      transcendent: 'Transcendent',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Intelegem viziunea lui {{name}}',
      understandingVisionDefault: 'Intelegem viziunea ta',
      tailoringDesigns: 'Adaptam designurile la stilul tau',
      settingUpCoverUp: 'Pregatim instrumentele de acoperire',
      personalizingExperience: 'Personalizam experienta ta',
      preparingStudio: 'Pregatim studioul tau de design',
      configuringWorkspace: 'Configuram spatiul tau de lucru',
      applyingPreferences: 'Aplicam preferintele tale',
      journeyStartsNow: 'Calatoria ta spre tatuaj incepe acum',
    },

    // Reviews
    reviews: {
      review1Title: 'Aplicatie uimitoare!',
      review1Body:
        'Aplicatia functioneaza, arata si se simte grozav! Impresionat de cat de bine a aplicat tatuajul, tinand cont de iluminare si umbrire.',
      review1Author: 'Jacob C.',
      review2Title: 'Chiar utila',
      review2Body:
        'Designurile de tatuaje sunt curate si detaliate. Unele imagini dureaza putin mai mult sa se genereze, dar per total este una dintre cele mai bune aplicatii AI pentru tatuaje.',
      review2Author: 'Alexrays1',
      review3Title: 'Ador',
      review3Body: 'Foarte recomandat \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Genereaza tatuaje instant',
    containerDesc1:
      'Scrie cateva cuvinte si genereaza instant designuri unice de tatuaje.',
    containerTitle2: 'Personalizeaza-ti designul',
    containerDesc2:
      'Ajusteaza culorile, aspectul si stilul pentru a face tatuajul perfect al tau.',
    containerTitle3: 'Previzualizeaza pe piele',
    containerDesc3:
      'Previzualizeaza orice tatuaj pe pielea ta — ajusteaza dimensiunea si plasarea instant.',
    paused: 'In pauza',

    // Relative time
    time: {
      today: 'Astazi',
      yesterday: 'Ieri',
      daysAgo: 'acum {{count}} zile',
      weeksAgo: 'acum {{count}} saptamani',
      monthsAgo: 'acum {{count}} luni',
      yearsAgo: 'acum {{count}} ani',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Tehnologie de incercare',
      tryOnTechnologyDesc: 'Vezi tatuajele pe pielea ta inainte sa te decizi',
      aiTattooGenerator: 'Generator AI de tatuaje',
      aiTattooGeneratorDesc: 'Creeaza designuri unice din ideile tale',
      coverUpAssistant: 'Asistent de acoperire',
      coverUpAssistantDesc: 'Transforma tatuajele existente in arta noua',
      artistTools: 'Instrumente pentru artisti',
      artistToolsDesc:
        'Arata clientilor designuri pe corpul lor instant',
      precisePlacement: 'Plasare precisa',
      precisePlacementDesc:
        'Dimensionare perfecta pentru tatuajul tau pe {{location}}',
      styleMatchedDesigns: 'Designuri potrivite stilului',
      styleMatchedDesignsDesc:
        'Inspiratie curatoriata pentru tatuaje {{style}}',
      readyWhenYouAre: 'Gata cand esti tu',
      readyWhenYouAreDesc: 'Incepe sa proiectezi astazi, fa-ti tatuajul maine',
      realisticTryOn: 'Incercare realista',
      realisticTryOnDesc: 'Vezi exact cum va arata pe tine',
      saveAndShare: 'Salveaza si distribuie',
      saveAndShareDesc:
        'Pastreaza-ti favoritele si distribuie-le artistului tau',
      aiDesignStudio: 'Studio AI de design',
      aiDesignStudioDesc: 'Genereaza designuri unice de tatuaje instant',

      // Personalized greetings
      greetingArtist: 'Noul tau instrument pentru clienti este pregatit',
      greetingCoverUp: 'Pregatit sa-ti transformi tatuajul',
      greetingGenerate: 'Studioul tau AI de design te asteapta',
      greetingDefault: 'Calatoria ta spre tatuaj incepe acum',
      welcomeAboard: 'Bine ai venit la bord, {{name}}!',
      welcomeName: 'Bine ai venit {{name}}',

      // Urgency messages
      urgencyArtist: 'Arata clientilor previzualizari reale instant.',
      urgencyCoverUp: 'Repara-ti tatuajul cu incredere.',
      urgencyTryOn: 'Incearca tatuajul inainte sa te decizi.',
      urgencyDefault: 'Designuri nelimitate. Zero regrete.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Continua',
    restorePurchase: 'Restaureaza achizitia',
    current: 'CURENT',

    // Plan terms
    week: 'Saptamana',
    month: 'Luna',
    weekly: 'Saptamanal',
    perWeek: '/saptamana',

    // Content
    loadingPlans: 'Se incarca planurile...',
    restoreSubscription: 'Restaureaza abonamentul',
    fairUseNote: 'Generarea designului AI include limite de utilizare corecta.',
    saveBadge: 'Economisesti {{percent}}%',
    subtitle:
      'Exploreaza idei de tatuaje, rafineaza designuri prin variatii infinite, incearca-le pe orice parte a corpului si exporta rezultate de inalta calitate.',

    // Personalized headlines
    headlineArtist: 'Arata clientilor tatuajul inainte de realizare',
    headlineCoverUp: 'Transforma-ti tatuajul cu incredere',
    headlineTryOn: 'Vezi tatuajul inainte sa te decizi',
    headlineDesign: 'Proiecteaza tatuajul pe care l-ai dorit mereu',
    headlineBrowse: 'Gaseste designul perfect de tatuaj',

    // Purchase flow alerts
    successTitle: 'Succes!',
    subscriptionActiveMessage:
      'Abonamentul tau este acum activ. Bucura-te de designuri nelimitate de tatuaje!',
    almostThereTitle: 'Aproape gata!',
    createAccountMessage:
      'Creeaza un cont pentru a activa abonamentul si a incepe sa proiectezi.',
    purchaseRestoredTitle: 'Achizitie restaurata!',
    subscriptionNowActive: 'Abonamentul tau este acum activ.',
    purchaseFoundTitle: 'Achizitie gasita!',
    purchasesRestoredMessage: 'Achizitiile tale au fost restaurate.',
    noPurchasesFoundTitle: 'Nicio achizitie gasita',
    noPurchasesFoundMessage:
      'Nu s-au gasit achizitii anterioare de restaurat.',
    purchaseFailedTitle: 'Achizitie esuata',
    purchaseFailedMessage:
      'Nu s-a putut finaliza achizitia. Te rugam sa incerci din nou.',
    errorRestoringTitle: 'Eroare la restaurarea achizitiilor',
    errorRestoringMessage:
      'Nu s-au putut restaura achizitiile. Te rugam sa incerci din nou.',
    subscriptionActivated: 'Abonament activat!',

    // Alerts
    purchaseError: 'Eroare achizitie',
    restoreSuccess: 'Achizitie restaurata',
    restoreError: 'Restaurare esuata',
    noPurchaseFound: 'Nicio achizitie anterioara gasita',

    // Pricing overhaul
    annual: 'Anual',
    year: 'An',
    perYear: '/An',
    freeTrialBadge: 'PERIOADĂ DE PROBĂ GRATUITĂ DE {{days}} ZILE',
    startTrialButton: 'Începe perioada de probă gratuită de {{days}} zile',
    specialOffer: 'Ofertă Specială',
    limitedTimeOffer: 'Ofertă pe Timp Limitat',
    discountSubtitle: 'Doar utilizatori noi — deblochează accesul complet astăzi',
    savePercent: 'Economisește {{percent}}%',
    annualPerWeek: '{{price}}/săptămână',
    todayOnly: 'Doar Astăzi',
    offerExpires: 'Oferta expiră în',
    perWeekBilled: 'pe săptămână, facturat {{period}}',
    originalPrice: 'Era {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Anuleaza generarea',
    cancelGenerationTitle: 'Anulezi generarea?',
    cancelGenerationMessage:
      'Esti pe cale sa anulezi generarea curenta. Aceasta va elimina generarea curenta si va incepe o sesiune noua.',
    clearEverythingTitle: 'Stergi totul?',
    clearEverythingMessage:
      'Esti pe cale sa stergi aceasta sesiune. Aceasta va elimina toate tatuajele generate. Salveaza ce vrei sa pastrezi inainte de a continua.',
    clearEverything: 'Sterge totul',

    // Input
    enterText: 'Introdu text',
    describeTattoo: 'Descrie tatuajul tau sau alege o sugestie de mai jos',

    // Try on alert
    tryOnTitle: 'Incearca {{style}}',
    tryOnMessage:
      'Fa o fotografie a partii corpului pentru a vedea cum arata acest tatuaj pe tine!',
    choosePhoto: 'Alege fotografie',
    later: 'Mai tarziu',

    // Preview on body
    previewOnBody: 'Previzualizeaza tatuajul pe corp',
    imageSelectedCombine: '1 imagine selectata - adauga inca una pentru a combina',

    // Suggestions
    createTattoo: 'Creeaza un tatuaj {{title}}',
    createStyleTattoo: 'Creeaza un tatuaj in stil {{title}}',
    tryStyle: 'Incearca stilul {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Se actualizeaza tatuajul tau...',
      startingNew: 'Se incepe un tatuaj nou...',
      warmingUp: 'Masina de tatuaj se incalzeste...',
      summoningSpirits: 'Invocam spiritele cernelii...',
      drawingInspiration: 'Cautam inspiratie in univers...',
      brewingMasterpiece: 'Aproape gata cu capodopera ta...',
      sprinkleCreativity: 'Adaugam un strop de creativitate...',
      perfectingPixels: 'Perfectionam fiecare pixel al tatuajului tau...',
      injectingCreativity: 'Injectam creativitate in pielea ta...',
      mixingShade: 'Amestecam nuanta perfecta de incredibil...',
      sharpeningNeedles: 'Ascutim acele virtuale...',
      calibratingVibes: 'Calibram vibes-urile tatuajului tau...',
      consultingOracle: 'Consultam oracolul tatuajelor...',
    },

    // Error states
    error: {
      keepCreating: 'Continua sa creezi fara limite',
      limitReachedFree:
        'Ai atins limita curenta de generare. Fa upgrade acum pentru a explora variatii, rafina designuri si a continua sa creezi fara sa astepti.',
      unlockUnlimited: 'Deblocheaza designuri nelimitate \u2192',
      limitReachedSubscribed:
        'Ai atins limita pentru aceasta perioada',
      limitReachedSubscribedDesc:
        'Limita de generare a planului tau a fost atinsa. Limita se va reseta la inceputul urmatoarei perioade de facturare.',
      tryAgainLater: 'Incearca mai tarziu',
      contactSupport: 'Contacteaza suportul',
    },

    // Session history actions
    actions: 'Actiuni',
    saveToGallery: 'Salveaza in galerie',

    // Result image actions
    imageActions: 'Actiuni imagine',
    copyToClipboard: 'Copiaza in clipboard',
    imageCopied: 'Imagine copiata in clipboard',
    imageCopyFailed: 'Copierea imaginii a esuat',
    imageSaved: 'Imagine salvata in galerie!',
    imageSaveFailed: 'Salvarea imaginii a esuat. Te rugam sa incerci din nou.',

    // Context alerts
    photoAccessTitle: 'Acces la fotografii necesar',
    photoAccessMessage:
      'Pentru a salva imagini in galerie, avem nevoie de acces la fotografiile tale. Poti activa acest lucru in Setari.',
    resetSessionTitle: 'Resetezi sesiunea?',
    resetSessionMessage:
      'Esti sigur ca vrei sa resetezi sesiunea? Aceasta va sterge toate tatuajele generate si va incepe o sesiune noua.',
    resetButton: 'Reseteaza',
    shareError: 'Distribuirea imaginii a esuat',
    imageDataError: 'Obtinerea datelor imaginii a esuat',
    pickImageError: 'Selectarea imaginii din galerie a esuat',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Imagine negasita',
    useTattoo: 'Foloseste tatuajul',
    useTattooError: 'Nu s-a putut folosi acest tatuaj. Te rugam sa incerci din nou.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Toate fotografiile',
    addPhotos: 'Adauga {{count}} fotografie',
    addPhotos_other: 'Adauga {{count}} fotografii',
    recentPhotos: 'Fotografii recente',
    selectOneMore: 'Selecteaza inca 1 pentru a combina',

    // Options
    tryOn: 'Incearca',
    tryOnDescriptionWithTattoo:
      'Adauga o fotografie a corpului tau pentru previzualizare',
    tryOnDescriptionNoTattoo:
      'Selecteaza mai intai un tatuaj, apoi adauga fotografia ta',
    createNewTattoo: 'Creeaza tatuaj nou',
    createNewTattooDescription:
      'Descrie ideea ta de tatuaj si o vom genera',
    tattooCoverUp: 'Idee de acoperire tatuaj',
    tattooCoverUpDescription:
      'Genereaza o idee pentru a acoperi un tatuaj existent folosind o fotografie ca referinta',
    removeTattoo: 'Elimina tatuajul',
    removeTattooDescription:
      'Elimina un tatuaj existent din fotografie',
    promptHistory: 'Istoric prompturi',
    promptHistoryDescription: 'Vizualizeaza prompturile anterioare',
    requestFeature: 'Sugereaza o functie',
    requestFeatureDescription:
      'Spune-ne ce ai vrea ca Tattoo Design AI sa suporte in continuare',

    // Try on alerts
    addYourPhoto: 'Adauga fotografia ta',
    addPhotoQuestion:
      'Cum ai vrea sa adaugi o fotografie a locului unde vrei tatuajul?',
    takePhoto: 'Fa o fotografie',
    chooseFromLibrary: 'Alege din biblioteca',
    createTattooFirst: 'Creeaza mai intai un tatuaj',
    createTattooFirstMessage:
      'Pentru a incerca un tatuaj, va trebui sa:\n\n1. Generezi sau selectezi un design de tatuaj\n2. Apoi adaugi o fotografie a corpului tau\n\nLe vom combina pentru a arata cum arata!',
    createTattoo: 'Creeaza tatuaj',
  },

  tattoos: {
    // Screen header
    title: 'Tatuajele mele',

    // Loading
    loading: 'Se incarca tatuajele...',

    // Empty state
    emptyTitle: 'Niciun tatuaj salvat inca',
    emptyDescription:
      'Creeaza si salveaza primul tau design de tatuaj! Trage in jos pentru a reincarca.',

    // Cloud restore
    restoringFromCloud: 'Se restaureaza din cloud...',
    noCloudGenerations: 'Nicio generare din cloud gasita',
    restoredCount: 'Restaurate {{restored}} din {{total}} tatuaje',
    restoreFailedTitle: 'Restaurare esuata',
    restoreFailedMessage:
      'Nu s-a putut restaura din cloud. Te rugam sa incerci din nou.',
    cloudFound: '{{count}} tatuaj gasit in cloud',
    cloudFound_other: '{{count}} tatuaje gasite in cloud',
    restoring: 'Se restaureaza...',
    restore: 'Restaureaza',
    cloudCount: '{{count}} in cloud',

    // Detail screen
    tattooNotFound: 'Tatuaj negasit',
    backToHome: 'Inapoi acasa',
    shareError: 'Nu s-a putut distribui imaginea. Te rugam sa incerci din nou.',
    imageAccessError: 'Nu s-a putut accesa fisierul imaginii.',
    deleteTitle: 'Sterge tatuajul',
    deleteMessage:
      'Esti sigur ca vrei sa stergi acest design de tatuaj? Aceasta actiune nu poate fi anulata.',
    deleteError: 'Nu s-a putut sterge imaginea. Te rugam sa incerci din nou.',
  },

  generation: {
    // Loading
    applyingDesign: 'Se aplica designul tau de tatuaj...',

    // Error
    invalidRequest: 'Cerere invalida',
    generationFailed: 'Generare esuata',
    failedToGenerate: 'Nu s-a putut genera designul de tatuaj',
    startOver: 'Incepe de la inceput',

    // Success
    tattooReady: 'Tatuajul tau este gata!',
    tattooReadyDescription:
      'Asa ar arata designul tau aplicat',
    saveToGallery: 'Salveaza in galerie',
    generateAnother: 'Genereaza altul',

    // Save alerts
    savedTitle: 'Salvat!',
    savedMessage:
      'Designul tau de tatuaj a fost salvat in galeria de fotografii.',
    viewInGallery: 'Vizualizeaza in galerie',

    // Generate another alert
    generateAnotherTitle: 'Generezi altul?',
    generateAnotherMessage:
      'Nu ai salvat inca acest tatuaj. Ai vrea sa-l salvezi inainte de a continua?',
    continueWithoutSaving: 'Continua fara salvare',
    saveAndContinue: 'Salveaza si continua',

    // Cancel alert
    cancelGenerationTitle: 'Anulezi generarea?',
    cancelGenerationMessage:
      'Tatuajul tau este inca in curs de generare. Daca anulezi acum, aceasta generare va fi contorizata in limita ta de utilizare. Esti sigur ca vrei sa anulezi?',
    keepGenerating: 'Continua generarea',
    unableToSave: 'Nu s-a putut salva imaginea. Te rugam sa incerci din nou.',
  },

  home: {
    // Section headers
    discoverStyles: 'Descopera stiluri noi',
    moreStyles: 'Mai multe stiluri',
    moods: 'Stari',
    discoverSketches: 'Descopera designuri schita',

    // Quick actions
    generateFromIdea: 'Genereaza din idee',
    generateFromIdeaDesc: 'Creeaza un tatuaj din imaginatia ta',
    seeItOnSkin: 'Vezi-l pe piele',
    seeItOnSkinDesc: 'Fa o fotografie si previzualizeaza tatuajul',
    blendTattoo: 'Combina tatuajul',
    blendTattooDesc: 'Incarca un tatuaj existent si modifica-l',
    removeTattoo: 'Elimina tatuajul',
    removeTattooDesc: 'Elimina un tatuaj existent de pe piele',
  },

  explore: {
    // Section headers
    byStyles: 'Exploreaza dupa stiluri',
    byMoods: 'Exploreaza dupa stari',
    byBodyPart: 'Exploreaza dupa parte a corpului',

    // Filter labels
    styles: 'Stiluri',
    bodyPart: 'Parte a corpului',
  },

  featureRequest: {
    title: 'Impartaseste-ti ideile',
    placeholder: 'Idei pentru a imbunatati experienta ta...',
    needHelp: 'Ai nevoie de ajutor? ',
    contactUs: 'Contacteaza-ne',
    successToast:
      'Sugestie de functie trimisa! Multumim pentru feedback.',
    errorToast:
      'Trimiterea sugestiei de functie a esuat. Te rugam sa incerci din nou.',
  },

  promptHistory: {
    title: 'Istoric prompturi',
    clearAll: 'Sterge tot',
    clearAllTitle: 'Sterge istoricul prompturilor',
    clearAllMessage:
      'Esti sigur ca vrei sa stergi toate prompturile salvate?',
    deletePromptTitle: 'Sterge promptul',
    deletePromptMessage: 'Elimini acest prompt din istoric?',
    emptyTitle: 'Niciun prompt inca',
    emptyDescription:
      'Prompturile tale vor aparea aici dupa ce generezi un tatuaj',
  },
};
