/**
 * Italian translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const itFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Visualizza il tuo tatuaggio prima di impegnarti.',
    whatsYourName: 'Come ti chiami?',
    namePlaceholder: 'Il tuo nome',
    nameDescription: 'Lo useremo per personalizzare la tua esperienza.',
    welcome: 'Benvenuto',
    welcomeDescription: 'Personalizziamo la tua esperienza Tattoo Design AI ora.',
    describeYou: 'Cosa ti \n descrive meglio?',
    describeYouDescription:
      'Questo ci aiuta a personalizzare l\'esperienza in base al tuo rapporto con i tatuaggi',
    whatToDo: 'Cosa vorresti\n fare?',
    whatToDoDescription:
      'Questo ci aiuta a capire come vuoi esplorare i tatuaggi e quali strumenti sarebbero più utili per te.',
    designTattoo: 'Crea il \n tatuaggio che desideri',
    designTattooDescription:
      'Digita qualche parola o carica un\'immagine e genera design di tatuaggi unici istantaneamente.',
    whereTattoo: 'Dove vuoi\n il tatuaggio?',
    whereTattooDescription:
      'La posizione influisce sul design, la dimensione e il flusso, il che ci aiuta ad adattare le idee al tuo corpo.',
    pickStyles: 'Scegli fino a 5 \n stili che ti piacciono',
    pickStylesDescription:
      'Le tue scelte di stile ci aiutano a trovare design che corrispondono ai tuoi gusti.',
    whenTattoo: 'Quando pensi\n di fare il tatuaggio?',
    whenTattooDescription:
      'Questo ci aiuta ad adattare\n l\'esperienza ai tuoi tempi.',
    whatVibe: 'Che atmosfera\n cerchi?',
    whatVibeDescription:
      'I tatuaggi portano emozioni - questo ci aiuta a capire la storia dietro il tuo.',
    settingUp: 'Stiamo preparando\n tutto per te',
    youreAllSet: 'Tutto pronto!',
    youreAllSetDescription: 'Sei pronto per iniziare.',

    // CTA
    alreadyHaveAccount: 'Hai già un account? ',
    signIn: 'Accedi',

    // User description options
    userDescription: {
      artist: 'Creo tatuaggi',
      client: 'Mi sto facendo un tatuaggio',
      model: 'Uso i tatuaggi per contenuti',
      explorer: 'Sto solo esplorando',
    },

    // Goal options
    goal: {
      tryOn: 'Provare tatuaggi sulle mie foto',
      generate: 'Generare idee di tatuaggi',
      browse: 'Solo navigare o cercare ispirazione',
      coverUp: 'Coprire/Rifare un tatuaggio esistente',
    },

    // Location options
    location: {
      wrist: 'Polso',
      chest: 'Petto',
      hand: 'Mano',
      back: 'Schiena',
      legs: 'Gambe',
      forearm: 'Avambraccio',
      neck: 'Collo',
      jaw: 'Mandibola',
      forehead: 'Fronte',
      knuckles: 'Nocche',
      fingers: 'Dita',
      cheek: 'Guancia',
      shoulder: 'Spalla',
      temple: 'Tempia',
      ribs: 'Costole',
      abdomen: 'Addome',
      face: 'Viso',
      hips: 'Fianchi',
      thigh: 'Coscia',
      tricep: 'Tricipite',
      bicep: 'Bicipite',
      collarbone: 'Clavicola',
      ankle: 'Caviglia',
      foot: 'Piede',
      palm: 'Palmo',
      notSure: 'Non sono sicuro',
    },

    // Style options
    styles: {
      traditional: 'Tradizionale',
      realism: 'Realismo',
      minimal: 'Minimale',
      celtic: 'Celtico',
      blackwork: 'Blackwork',
      illustrative: 'Illustrativo',
      lettering: 'Lettering',
      irezumi: 'Irezumi',
      geometric: 'Geometrico',
      religious: 'Religioso',
      anime: 'Anime',
      fineLine: 'Fine Line',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Calligrafia',
      portrait: 'Ritratto',
      floral: 'Floreale',
      polynesian: 'Polinesiano',
      tribal: 'Tribale',
      maori: 'Maori',
      gothic: 'Gotico',
      patchwork: 'Patchwork',
      abstract: 'Astratto',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologia',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Questa settimana',
      thisMonth: 'Questo mese',
      oneToThreeMonths: 'Tra 1-3 mesi',
      someday: 'Un giorno, sto solo esplorando',
    },

    // Vibe options
    vibe: {
      bold: 'Audace',
      confident: 'Sicuro',
      soft: 'Delicato',
      dark: 'Cupo',
      edgy: 'Provocatorio',
      elegant: 'Elegante',
      spiritual: 'Spirituale',
      cute: 'Carino',
      symbolic: 'Simbolico',
      playful: 'Giocoso',
      clean: 'Pulito',
      modern: 'Moderno',
      meaningful: 'Significativo',
      personalStory: 'Storia personale',
      family: 'Famiglia',
      love: 'Amore',
      memory: 'Ricordo',
      rebirth: 'Rinascita',
      freedom: 'Libertà',
      mystical: 'Mistico',
      rebellious: 'Ribelle',
      serene: 'Sereno',
      empowered: 'Empowerment',
      ethereal: 'Etereo',
      fearless: 'Senza paura',
      wanderlust: 'Wanderlust',
      transcendent: 'Trascendente',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Comprendere la visione di {{name}}',
      understandingVisionDefault: 'Comprendere la tua visione',
      tailoringDesigns: 'Adattare i design al tuo stile',
      settingUpCoverUp: 'Preparare gli strumenti di copertura',
      personalizingExperience: 'Personalizzare la tua esperienza',
      preparingStudio: 'Preparare il tuo studio di design',
      configuringWorkspace: 'Configurare il tuo spazio di lavoro',
      applyingPreferences: 'Applicare le tue preferenze',
      journeyStartsNow: 'Il tuo viaggio nel tatuaggio inizia ora',
    },

    // Reviews
    reviews: {
      review1Title: 'App fantastica!',
      review1Body:
        "L'app funziona, è bella e piacevole! Colpito dalla qualità di applicazione del tatuaggio, con illuminazione e ombre accurate.",
      review1Author: 'Jacob C.',
      review2Title: 'Davvero utile',
      review2Body:
        "I design sono puliti e dettagliati. Alcune immagini richiedono un po' più di tempo, ma nel complesso è una delle migliori app di tatuaggi IA.",
      review2Author: 'Alexrays1',
      review3Title: 'Lo adoro',
      review3Body: 'Altamente raccomandato \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Genera tatuaggi istantaneamente',
    containerDesc1:
      'Digita qualche parola e genera design di tatuaggi unici istantaneamente.',
    containerTitle2: 'Personalizza il tuo design',
    containerDesc2:
      'Regola colori, layout e stile per rendere il tatuaggio perfettamente tuo.',
    containerTitle3: 'Anteprima sulla tua pelle',
    containerDesc3:
      'Visualizza qualsiasi tatuaggio sulla tua pelle — regola dimensione e posizione istantaneamente.',
    paused: 'In pausa',

    // Relative time
    time: {
      today: 'Oggi',
      yesterday: 'Ieri',
      daysAgo: '{{count}} giorni fa',
      weeksAgo: '{{count}} settimane fa',
      monthsAgo: '{{count}} mesi fa',
      yearsAgo: '{{count}} anni fa',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Tecnologia di prova',
      tryOnTechnologyDesc: 'Vedi i tatuaggi sulla tua pelle prima di impegnarti',
      aiTattooGenerator: 'Generatore di tatuaggi IA',
      aiTattooGeneratorDesc: 'Crea design unici dalle tue idee',
      coverUpAssistant: 'Assistente copertura',
      coverUpAssistantDesc: 'Trasforma tatuaggi esistenti in arte nuova',
      artistTools: 'Strumenti artista',
      artistToolsDesc:
        'Mostra ai clienti i design sul loro corpo istantaneamente',
      precisePlacement: 'Posizionamento preciso',
      precisePlacementDesc:
        'Dimensionamento perfetto per il tuo tatuaggio {{location}}',
      styleMatchedDesigns: 'Design abbinati allo stile',
      styleMatchedDesignsDesc:
        'Ispirazione tatuaggio {{style}} selezionata',
      readyWhenYouAre: 'Pronto quando lo sei tu',
      readyWhenYouAreDesc: 'Inizia a progettare oggi, tatuati domani',
      realisticTryOn: 'Prova realistica',
      realisticTryOnDesc: 'Vedi esattamente come apparirà su di te',
      saveAndShare: 'Salva e condividi',
      saveAndShareDesc:
        'Conserva i tuoi preferiti e condividili con il tuo artista',
      aiDesignStudio: 'Studio di design IA',
      aiDesignStudioDesc: 'Genera design di tatuaggi unici istantaneamente',

      // Personalized greetings
      greetingArtist: 'Il tuo nuovo strumento per l\'esperienza clienti è pronto',
      greetingCoverUp: 'Pronto a trasformare il tuo tatuaggio',
      greetingGenerate: 'Il tuo studio di design IA ti aspetta',
      greetingDefault: 'Il tuo viaggio nel tatuaggio inizia ora',
      welcomeAboard: 'Benvenuto a bordo, {{name}}!',
      welcomeName: 'Benvenuto {{name}}',

      // Urgency messages
      urgencyArtist: 'Mostra ai clienti anteprime reali istantaneamente.',
      urgencyCoverUp: 'Rinnova il tuo tatuaggio con sicurezza.',
      urgencyTryOn: 'Prova il tuo tatuaggio prima di impegnarti.',
      urgencyDefault: 'Design illimitati. Zero rimpianti.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Continua',
    restorePurchase: 'Ripristina acquisto',
    current: 'ATTUALE',

    // Plan terms
    week: 'Settimana',
    month: 'Mese',
    weekly: 'Settimanale',
    perWeek: '/Settimana',

    // Content
    loadingPlans: 'Caricamento piani\u2026',
    restoreSubscription: 'Ripristina abbonamento',
    fairUseNote: 'La generazione di design IA include limiti di utilizzo equo.',
    saveBadge: 'Risparmia {{percent}}%',
    subtitle:
      'Esplora idee di tatuaggi, perfeziona i design con variazioni infinite, provale su qualsiasi parte del corpo ed esporta risultati di alta qualità con sicurezza.',

    // Personalized headlines
    headlineArtist: 'Mostra ai clienti il loro tatuaggio prima di tatuare',
    headlineCoverUp: 'Trasforma il tuo tatuaggio con sicurezza',
    headlineTryOn: 'Vedi il tuo tatuaggio prima di impegnarti',
    headlineDesign: 'Crea il tatuaggio che hai sempre desiderato',
    headlineBrowse: 'Trova il design di tatuaggio perfetto',

    // Purchase flow alerts
    successTitle: 'Successo!',
    subscriptionActiveMessage:
      'Il tuo abbonamento è ora attivo. Goditi design di tatuaggi illimitati!',
    almostThereTitle: 'Quasi fatto!',
    createAccountMessage:
      'Crea un account per attivare il tuo abbonamento e iniziare a progettare.',
    purchaseRestoredTitle: 'Acquisto ripristinato!',
    subscriptionNowActive: 'Il tuo abbonamento è ora attivo.',
    purchaseFoundTitle: 'Acquisto trovato!',
    purchasesRestoredMessage: 'I tuoi acquisti sono stati ripristinati.',
    noPurchasesFoundTitle: 'Nessun acquisto trovato',
    noPurchasesFoundMessage:
      'Non sono stati trovati acquisti precedenti da ripristinare.',
    purchaseFailedTitle: 'Acquisto fallito',
    purchaseFailedMessage:
      'Impossibile completare l\'acquisto. Riprova.',
    errorRestoringTitle: 'Errore nel ripristino degli acquisti',
    errorRestoringMessage:
      'Impossibile ripristinare gli acquisti. Riprova.',
    subscriptionActivated: 'Abbonamento attivato!',

    // Alerts
    purchaseError: 'Errore acquisto',
    restoreSuccess: 'Acquisto ripristinato',
    restoreError: 'Ripristino fallito',
    noPurchaseFound: 'Nessun acquisto precedente trovato',

    // Pricing overhaul
    annual: 'Annuale',
    year: 'Anno',
    perYear: '/Anno',
    freeTrialBadge: 'PROVA GRATUITA DI {{days}} GIORNI',
    startTrialButton: 'Inizia la prova gratuita di {{days}} giorni',
    specialOffer: 'Offerta Speciale',
    limitedTimeOffer: 'Offerta a Tempo Limitato',
    discountSubtitle: 'Solo nuovi utenti — sblocca accesso completo oggi',
    savePercent: 'Risparmia {{percent}}%',
    annualPerWeek: '{{price}}/settimana',
    todayOnly: 'Solo Oggi',
    offerExpires: 'L\'offerta scade tra',
    perWeekBilled: 'a settimana, fatturato {{period}}',
    originalPrice: 'Era {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Annulla generazione',
    cancelGenerationTitle: 'Annullare la generazione?',
    cancelGenerationMessage:
      'Stai per annullare la generazione corrente. Questo rimuoverà la generazione attuale e avvierà una nuova sessione.',
    clearEverythingTitle: 'Cancellare tutto?',
    clearEverythingMessage:
      'Stai per cancellare questa sessione. Questo rimuoverà tutti i tatuaggi generati. Salva quello che vuoi conservare prima di continuare.',
    clearEverything: 'Cancella tutto',

    // Input
    enterText: 'Inserisci testo',
    describeTattoo: 'Descrivi il tuo tatuaggio o scegli un suggerimento qui sotto',

    // Try on alert
    tryOnTitle: 'Prova {{style}}',
    tryOnMessage:
      'Scatta una foto della parte del corpo per vedere come appare questo tatuaggio su di te!',
    choosePhoto: 'Scegli foto',
    later: 'Dopo',

    // Preview on body
    previewOnBody: 'Anteprima tatuaggio sul corpo',
    imageSelectedCombine: '1 immagine selezionata – aggiungine un\'altra per combinare',

    // Suggestions
    createTattoo: 'Crea un tatuaggio {{title}}',
    createStyleTattoo: 'Crea un tatuaggio stile {{title}}',
    tryStyle: 'Prova lo stile {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Aggiornamento del tuo tatuaggio...',
      startingNew: 'Avvio nuovo tatuaggio...',
      warmingUp: 'La macchina per tatuaggi si sta scaldando...',
      summoningSpirits: 'Evocazione degli spiriti dell\'inchiostro...',
      drawingInspiration: 'Attingere ispirazione dall\'universo...',
      brewingMasterpiece: 'Il tuo capolavoro è quasi pronto...',
      sprinkleCreativity: 'Aggiungere un tocco di creatività...',
      perfectingPixels: 'Perfezionare ogni pixel del tuo tatuaggio...',
      injectingCreativity: 'Iniettare creatività nella tua pelle...',
      mixingShade: 'Mescolare la sfumatura perfetta...',
      sharpeningNeedles: 'Affilare aghi virtuali...',
      calibratingVibes: 'Calibrare le tue vibrazioni da tatuaggio...',
      consultingOracle: 'Consultare l\'oracolo del tatuaggio...',
    },

    // Error states
    error: {
      keepCreating: 'Continua a creare senza limiti',
      limitReachedFree:
        'Hai raggiunto il tuo limite di generazione attuale. Migliora ora per esplorare variazioni, perfezionare design e continuare a creare senza attese.',
      unlockUnlimited: 'Sblocca design illimitati \u2192',
      limitReachedSubscribed:
        'Hai raggiunto il limite per questo periodo',
      limitReachedSubscribedDesc:
        'Il limite di generazione del tuo piano è stato raggiunto. Il limite verrà ripristinato all\'inizio del prossimo periodo di fatturazione.',
      tryAgainLater: 'Riprova più tardi',
      contactSupport: 'Contatta il supporto',
    },

    // Session history actions
    actions: 'Azioni',
    saveToGallery: 'Salva nella galleria',

    // Result image actions
    imageActions: 'Azioni immagine',
    copyToClipboard: 'Copia negli appunti',
    imageCopied: 'Immagine copiata negli appunti',
    imageCopyFailed: 'Impossibile copiare l\'immagine',
    imageSaved: 'Immagine salvata nella galleria!',
    imageSaveFailed: 'Impossibile salvare l\'immagine. Riprova.',

    // Context alerts
    photoAccessTitle: 'Accesso alle foto necessario',
    photoAccessMessage:
      'Per salvare le immagini nella tua galleria, abbiamo bisogno dell\'accesso alle tue foto. Puoi attivarlo nelle Impostazioni.',
    resetSessionTitle: 'Ripristinare la sessione?',
    resetSessionMessage:
      'Sei sicuro di voler ripristinare la sessione? Questo cancellerà tutti i tatuaggi generati e avvierà una nuova sessione.',
    resetButton: 'Ripristina',
    shareError: 'Impossibile condividere l\'immagine',
    imageDataError: 'Impossibile ottenere i dati dell\'immagine',
    pickImageError: 'Impossibile selezionare l\'immagine dalla galleria',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Immagine non trovata',
    useTattoo: 'Usa tatuaggio',
    useTattooError: 'Impossibile usare questo tatuaggio. Riprova.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Tutte le foto',
    addPhotos: 'Aggiungi {{count}} foto',
    addPhotos_other: 'Aggiungi {{count}} foto',
    recentPhotos: 'Foto recenti',
    selectOneMore: 'Seleziona 1 in più per combinare',

    // Options
    tryOn: 'Prova',
    tryOnDescriptionWithTattoo:
      'Aggiungi una foto del tuo corpo per l\'anteprima',
    tryOnDescriptionNoTattoo:
      'Seleziona prima un tatuaggio, poi aggiungi la tua foto',
    createNewTattoo: 'Crea nuovo tatuaggio',
    createNewTattooDescription:
      'Descrivi la tua idea di tatuaggio e lo genereremo',
    tattooCoverUp: 'Idea copertura tatuaggio',
    tattooCoverUpDescription:
      'Genera un\'idea per coprire un tatuaggio esistente usando una foto come riferimento',
    removeTattoo: 'Rimuovi tatuaggio',
    removeTattooDescription:
      'Rimuovi un tatuaggio esistente dalla foto',
    promptHistory: 'Cronologia dei prompt',
    promptHistoryDescription: 'Visualizza i tuoi prompt precedenti',
    requestFeature: 'Suggerisci una funzionalità',
    requestFeatureDescription:
      'Dicci cosa vorresti che Tattoo Design AI supportasse in futuro',

    // Try on alerts
    addYourPhoto: 'Aggiungi la tua foto',
    addPhotoQuestion:
      'Come vorresti aggiungere una foto di dove vuoi il tatuaggio?',
    takePhoto: 'Scatta foto',
    chooseFromLibrary: 'Scegli dalla libreria',
    createTattooFirst: 'Crea prima un tatuaggio',
    createTattooFirstMessage:
      'Per provare un tatuaggio, devi:\n\n1. Generare o selezionare un design\n2. Poi aggiungere una foto del tuo corpo\n\nLi combineremo per mostrarti come appare!',
    createTattoo: 'Crea tatuaggio',
  },

  tattoos: {
    // Screen header
    title: 'I miei tatuaggi',

    // Loading
    loading: 'Caricamento tatuaggi...',

    // Empty state
    emptyTitle: 'Nessun tatuaggio salvato',
    emptyDescription:
      'Crea e salva il tuo primo design! Scorri verso il basso per aggiornare.',

    // Cloud restore
    restoringFromCloud: 'Ripristino dal cloud...',
    noCloudGenerations: 'Nessuna generazione cloud trovata',
    restoredCount: '{{restored}} di {{total}} tatuaggi ripristinati',
    restoreFailedTitle: 'Ripristino fallito',
    restoreFailedMessage:
      'Impossibile ripristinare dal cloud. Riprova.',
    cloudFound: '{{count}} tatuaggio trovato nel cloud',
    cloudFound_other: '{{count}} tatuaggi trovati nel cloud',
    restoring: 'Ripristino...',
    restore: 'Ripristina',
    cloudCount: '{{count}} nel cloud',

    // Detail screen
    tattooNotFound: 'Tatuaggio non trovato',
    backToHome: 'Torna alla home',
    shareError: 'Impossibile condividere l\'immagine. Riprova.',
    imageAccessError: 'Impossibile accedere al file immagine.',
    deleteTitle: 'Elimina tatuaggio',
    deleteMessage:
      'Sei sicuro di voler eliminare questo design? Questa azione è irreversibile.',
    deleteError: 'Impossibile eliminare l\'immagine. Riprova.',
  },

  generation: {
    // Loading
    applyingDesign: 'Applicazione del tuo design...',

    // Error
    invalidRequest: 'Richiesta non valida',
    generationFailed: 'Generazione fallita',
    failedToGenerate: 'Impossibile generare il design del tatuaggio',
    startOver: 'Ricominciare',

    // Success
    tattooReady: 'Il tuo tatuaggio è pronto!',
    tattooReadyDescription:
      'Ecco come apparirebbe il tuo design applicato',
    saveToGallery: 'Salva nella galleria',
    generateAnother: 'Generane un altro',

    // Save alerts
    savedTitle: 'Salvato!',
    savedMessage:
      'Il tuo design è stato salvato nella tua galleria foto.',
    viewInGallery: 'Vedi nella galleria',

    // Generate another alert
    generateAnotherTitle: 'Generarne un altro?',
    generateAnotherMessage:
      'Non hai ancora salvato questo tatuaggio. Vuoi salvarlo prima di continuare?',
    continueWithoutSaving: 'Continua senza salvare',
    saveAndContinue: 'Salva e continua',

    // Cancel alert
    cancelGenerationTitle: 'Annullare la generazione?',
    cancelGenerationMessage:
      'Il tuo tatuaggio è ancora in fase di generazione. Se annulli ora, questa generazione conterà comunque nel tuo limite di utilizzo. Sei sicuro?',
    keepGenerating: 'Continua a generare',
    unableToSave: 'Impossibile salvare l\'immagine. Riprova.',
  },

  home: {
    // Section headers
    discoverStyles: 'Scopri nuovi stili',
    moreStyles: 'Altri stili',
    moods: 'Atmosfere',
    discoverSketches: 'Scopri design di bozzetti',

    // Quick actions
    generateFromIdea: 'Genera da un\'idea',
    generateFromIdeaDesc: 'Crea un tatuaggio dalla tua immaginazione',
    seeItOnSkin: 'Vedilo sulla tua pelle',
    seeItOnSkinDesc: 'Scatta una foto e visualizza il tatuaggio',
    blendTattoo: 'Fondere tatuaggio',
    blendTattooDesc: 'Carica un tatuaggio esistente e modificalo',
    removeTattoo: 'Rimuovi tatuaggio',
    removeTattooDesc: 'Rimuovi un tatuaggio esistente dalla pelle',
  },

  explore: {
    // Section headers
    byStyles: 'Esplora per stili',
    byMoods: 'Esplora per atmosfere',
    byBodyPart: 'Esplora per parte del corpo',

    // Filter labels
    styles: 'Stili',
    bodyPart: 'Parte del corpo',
  },

  featureRequest: {
    title: 'Condividi le tue idee',
    placeholder: 'Idee per migliorare la tua esperienza...',
    needHelp: 'Hai bisogno di aiuto? ',
    contactUs: 'Contattaci',
    successToast:
      'Suggerimento inviato! Grazie per il tuo feedback.',
    errorToast:
      'Impossibile inviare il suggerimento. Riprova.',
  },

  promptHistory: {
    title: 'Cronologia dei prompt',
    clearAll: 'Cancella tutto',
    clearAllTitle: 'Cancella cronologia dei prompt',
    clearAllMessage:
      'Sei sicuro di voler eliminare tutti i prompt salvati?',
    deletePromptTitle: 'Elimina prompt',
    deletePromptMessage: 'Rimuovere questo prompt dalla cronologia?',
    emptyTitle: 'Nessun prompt ancora',
    emptyDescription:
      'I tuoi prompt appariranno qui dopo aver generato un tatuaggio',
  },
};
