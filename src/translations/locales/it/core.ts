/**
 * Italian translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const itCore = {
  common: {
    // Actions
    loading: 'Caricamento...',
    error: 'Errore',
    success: 'Successo',
    cancel: 'Annulla',
    confirm: 'Conferma',
    save: 'Salva',
    done: 'Fatto',
    close: 'Chiudi',
    back: 'Indietro',
    next: 'Avanti',
    skip: 'Salta',
    continue: 'Continua',
    retry: 'Riprova',
    delete: 'Elimina',
    edit: 'Modifica',
    share: 'Condividi',
    send: 'Invia',
    search: 'Cerca',
    seeAll: 'Vedi tutto',
    tryAgain: 'Riprova',
    ok: 'OK',
    yes: 'Sì',
    no: 'No',
    or: 'o',
    upgrade: 'Aggiorna',
    processing: 'Elaborazione...',
    openSettings: 'Apri impostazioni',
    readMore: 'Leggi di più',
    createTattoo: 'Crea tatuaggio',
    style: 'Stile',

    // States
    on: 'Attivo',
    off: 'Disattivo',
    enabled: 'Abilitato',
    disabled: 'Disabilitato',

    // Errors
    somethingWentWrong: 'Qualcosa è andato storto',
    unexpectedError: 'Si è verificato un errore imprevisto',
  },

  tabs: {
    home: 'Home',
    explore: 'Esplora',
    myTattoos: 'I miei tatuaggi',
    profile: 'Profilo',
    tryOnTattoo: 'Prova tatuaggio',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Bentornato!',
    signInDescription: 'Scegli il tuo metodo di accesso preferito',
    signIn: 'Accedi',
    alreadyHaveAccount: 'Hai già un account? ',
    termsOfService: 'Termini di servizio',
    privacyPolicy: 'Informativa sulla privacy',
    byContinuingAgree: 'Continuando, accetti i nostri ',
    inkognitoMode: 'Modalità Ink-ognito',
    inkognitoDescription: 'I tuoi design restano con te, non con noi.',
    signInToContinue:
      'Accedi per continuare e far creare il tuo tatuaggio!',
    signInBenefit:
      'Accedendo, possiamo tenere traccia delle tue generazioni gratuite di tatuaggi e assicurarci che il tuo account sia configurato correttamente.',
    notSignedIn: '(Non connesso)',
  },

  profile: {
    // Screen header
    title: 'Profilo',

    // Section headers
    account: 'Account',
    planAndUsage: 'Piano e utilizzo',
    settings: 'Impostazioni',
    support: 'Supporto',
    legal: 'Note legali',
    dangerZone: 'Zona pericolosa',
    supportAndFeedback: 'Supporto e feedback',
    followUs: 'Seguici',

    // Sign-in prompt
    notSignedIn: 'Non connesso',
    signInPrompt:
      'Accedi per visualizzare i dettagli del tuo account, le informazioni sull\'abbonamento e le funzionalità personalizzate',

    // Account
    email: 'E-mail',
    name: 'Nome',
    model: 'Modello',
    userId: 'ID utente',
    memberSince: 'Membro dal',
    signOut: 'Esci',
    logOut: 'Esci',
    signOutConfirmTitle: 'Esci',
    signOutConfirmMessage: 'Sei sicuro di voler uscire?',
    unknownUser: 'Utente sconosciuto',

    // Plan
    plan: 'Piano',
    activeUsagePeriod: 'Periodo di utilizzo attivo',
    currentPlan: 'Piano attuale',
    planDetails: 'Dettagli del piano',
    status: 'Stato',
    renewsOn: 'Si rinnova il',
    expiresOn: 'Scade il',
    daysRemaining: 'Giorni rimanenti',
    daysValue: '{{count}} giorni',
    price: 'Prezzo',
    billingPeriod: 'Periodo di fatturazione',
    managePlan: 'Gestisci piano',
    upgradePlan: 'Migliora piano',
    upgradeNow: 'Migliora ora',
    limitReachedFooter:
      'Hai raggiunto il limite di generazione. Migliora per continuare.',
    noSubscription: 'Nessun abbonamento',
    cancelledActive: 'Annullato (Attivo)',
    cancelledActiveUntilExpiration: 'Annullato (Attivo fino alla scadenza)',
    activeUntilExpiration: 'Attivo fino alla scadenza',
    accessEndsOn: "L'accesso termina il",
    autoRenew: 'Rinnovo automatico',
    cancelledAt: 'Annullato il',
    expiredOn: 'Scaduto il',
    refreshing: 'Aggiornamento...',
    refreshData: 'Aggiorna dati',
    limitReachedFooterLong:
      'Hai raggiunto il limite di generazione di tatuaggi IA per questo piano. Migliora per continuare a creare tatuaggi o contattaci.',
    weMissYouFooter:
      'Pronto a creare altri tatuaggi straordinari? Torna e progettiamo insieme qualcosa di incredibile.',
    unknown: 'Sconosciuto',
    free: 'Gratuito',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Attivo',
    expired: 'Scaduto',
    cancelled: 'Annullato',
    generationsUsed: 'Generazioni utilizzate',
    generationsRemaining: 'Generazioni rimanenti',
    unlimited: 'Illimitato',
    na: 'N/A',

    // We Miss You
    weMissYou: 'Ci manchi!',
    previousPlan: 'Piano precedente',
    comeBackAndCreate: 'Torna e crea',

    // Enjoying the app
    enjoyingApp: "Ti piace l'app?",
    enjoyingAppDescription:
      "Se ti piace Tattoo Design AI, una recensione aiuta altri appassionati di tatuaggi a scoprirci. Puoi anche inviarci feedback o idee per nuove funzionalità in qualsiasi momento.",
    rateOnPlayStore: 'Valuta sul Play Store',
    rateOnAppStore: "Valuta sull'App Store",
    sendFeedback: 'Invia feedback',

    // Are you an artist
    areYouArtist: 'Sei un artista?',
    artistDescription:
      'Interessato a collaborare? Hai suggerimenti o reclami? Ci farebbe piacere sentirti!',
    writeToUs: 'Scrivici',

    // Support
    contactSupport: 'Contatta il supporto',
    requestFeature: 'Suggerisci una funzionalità',
    rateApp: "Valuta l'app",
    shareApp: "Condividi l'app",
    shareWithFriends: 'Condividi con gli amici',
    shareMessage: 'Scopri Tattoo Design AI \n',

    // Settings
    appearance: 'Aspetto',
    light: 'Chiaro',
    dark: 'Scuro',
    system: 'Sistema',
    language: 'Lingua',
    languageAuto: 'Automatico (Sistema)',
    showOnboarding: "Mostra l'introduzione",
    promptEnhancement: 'Miglioramento del prompt',
    promptEnhancementDisabledTitle: 'Miglioramento del prompt disattivato',
    promptEnhancementDisabledMessage:
      'I risultati possono variare senza miglioramento. Puoi riattivarlo in qualsiasi momento.',

    // Legal
    termsOfService: 'Termini di servizio',
    privacyPolicy: 'Informativa sulla privacy',

    // Danger
    deleteAccount: 'Elimina account',
    deleteAccountConfirmTitle: 'Elimina account',
    deleteAccountConfirmMessage:
      'Sei sicuro? Questa azione è irreversibile. Nota: questo NON annulla gli abbonamenti attivi.',
    dangerZoneFooter:
      "L'eliminazione dell'account è permanente. Questo NON annulla gli abbonamenti attivi.",
    resetOnboarding: "Ripristina l'introduzione",

    // Version
    version: 'Versione',
  },

  emails: {
    support: {
      subject: 'Richiesta di supporto Tattoo Design AI',
      body: "Ciao,\n\nHo bisogno di aiuto con l'app Tattoo Design AI.\n\n{{userInfo}}\n\nDescrizione:\n[Descrivi il tuo problema qui]\n\nGrazie!",
    },
    featureRequest: {
      subject: 'Aiuto per richiesta funzionalità Tattoo Design AI',
      body: 'Ciao,\n\nHo bisogno di aiuto per inviare una richiesta di funzionalità.\n\n',
    },
    feedback: {
      subject: 'Feedback su Tattoo Design AI',
      body: 'Ciao!\n\nHo un feedback su Tattoo Design AI:\n\n[Il tuo feedback qui]{{userInfo}}\n\nGrazie!',
    },
    artist: {
      subject: 'Sei un artista? - Tattoo Design AI',
      body: 'Ciao!\n\nSono interessato a collaborare o ho suggerimenti/reclami.\n\n{{userInfo}}\n\n[Condividi i tuoi suggerimenti, reclami, o raccontaci di te come artista]\n\nGrazie!',
    },
    userIdLabel: 'ID utente: {{id}}',
    emailLabel: 'E-mail: {{email}}',
    accountLabel: 'E-mail del mio account: {{email}}',
    myUserIdLabel: 'Il mio ID utente: {{id}}',
    accountInfo: '\n\nAccount: {{email}}',
  },

  notFound: {
    title: 'Ops!',
    description: 'Questa schermata non esiste.',
    goHome: 'Vai alla schermata iniziale!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Iniziamo',
    photoAccessDescription:
      'Abbiamo bisogno di accedere alle tue foto per aggiungere immagini',
    photoAccessDeniedTitle: 'Accesso alle foto necessario',
    photoAccessDeniedDescription:
      'Questa funzionalità richiede l\'accesso alla tua libreria foto per visualizzare e salvare i tuoi tatuaggi. Puoi gestire l\'accesso alle foto nelle impostazioni del dispositivo.',
    photoLibraryNeeded:
      'Abbiamo bisogno di accedere alla tua libreria foto per permetterti di visualizzare e salvare i tuoi tatuaggi.',

    // Camera
    cameraAccessTitle: 'Iniziamo',
    cameraAccessDescription:
      'Abbiamo bisogno di accedere alla tua fotocamera per scattare foto.',
    cameraAccessDeniedTitle: 'Accesso alla fotocamera necessario',
    cameraAccessDeniedDescription:
      'Questa funzionalità richiede l\'accesso alla tua fotocamera. Puoi gestire l\'accesso alla fotocamera nelle impostazioni del dispositivo.',
  },
};
