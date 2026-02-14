/**
 * Romanian translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const roCore = {
  common: {
    // Actions
    loading: 'Se incarca...',
    error: 'Eroare',
    success: 'Succes',
    cancel: 'Anuleaza',
    confirm: 'Confirma',
    save: 'Salveaza',
    done: 'Gata',
    close: 'Inchide',
    back: 'Inapoi',
    next: 'Urmatorul',
    skip: 'Sari',
    continue: 'Continua',
    retry: 'Reincearca',
    delete: 'Sterge',
    edit: 'Editeaza',
    share: 'Distribuie',
    send: 'Trimite',
    search: 'Cauta',
    seeAll: 'Vezi tot',
    tryAgain: 'Incearca din nou',
    ok: 'OK',
    yes: 'Da',
    no: 'Nu',
    or: 'sau',
    upgrade: 'Upgrade',
    processing: 'Se proceseaza...',
    openSettings: 'Deschide setarile',
    readMore: 'Citeste mai mult',
    createTattoo: 'Creeaza tatuaj',
    style: 'Stil',

    // States
    on: 'Pornit',
    off: 'Oprit',
    enabled: 'Activat',
    disabled: 'Dezactivat',

    // Errors
    somethingWentWrong: 'Ceva nu a mers bine',
    unexpectedError: 'A aparut o eroare neasteptata',
  },

  tabs: {
    home: 'Acasa',
    explore: 'Exploreaza',
    myTattoos: 'Tatuajele mele',
    profile: 'Profil',
    tryOnTattoo: 'Incearca tatuajul',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Bine ai revenit!',
    signInDescription: 'Alege metoda preferata de autentificare',
    signIn: 'Autentifica-te',
    alreadyHaveAccount: 'Ai deja un cont? ',
    termsOfService: 'Termeni si conditii',
    privacyPolicy: 'Politica de confidentialitate',
    byContinuingAgree: 'Continuand, esti de acord cu ',
    inkognitoMode: 'Modul Ink-ognito',
    inkognitoDescription: 'Designurile tale raman la tine, nu la noi.',
    signInToContinue:
      'Te rugam sa te autentifici pentru a continua si a-ti crea tatuajul!',
    signInBenefit:
      'Autentificandu-te, putem urmari generarile tale gratuite de tatuaje si ne asiguram ca contul tau este configurat corect.',
    notSignedIn: '(Neautentificat)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Cont',
    planAndUsage: 'Plan si utilizare',
    settings: 'Setari',
    support: 'Suport',
    legal: 'Legal',
    dangerZone: 'Zona periculoasa',
    supportAndFeedback: 'Suport si feedback',
    followUs: 'Urmareste-ne',

    // Sign-in prompt
    notSignedIn: 'Neautentificat',
    signInPrompt:
      'Autentifica-te pentru a accesa detaliile contului, informatiile despre abonament si functiile personalizate',

    // Account
    email: 'E-mail',
    name: 'Nume',
    model: 'Model',
    userId: 'ID utilizator',
    memberSince: 'Membru din',
    signOut: 'Deconecteaza-te',
    logOut: 'Deconecteaza-te',
    signOutConfirmTitle: 'Deconectare',
    signOutConfirmMessage: 'Esti sigur ca vrei sa te deconectezi?',
    unknownUser: 'Utilizator necunoscut',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Perioada activa de utilizare',
    currentPlan: 'Planul curent',
    planDetails: 'Detalii plan',
    status: 'Stare',
    renewsOn: 'Se reinnoieste pe',
    expiresOn: 'Expira pe',
    daysRemaining: 'Zile ramase',
    daysValue: '{{count}} zile',
    price: 'Pret',
    billingPeriod: 'Perioada de facturare',
    managePlan: 'Gestioneaza planul',
    upgradePlan: 'Upgrade plan',
    upgradeNow: 'Upgrade acum',
    limitReachedFooter:
      'Ai atins limita de generare. Fa upgrade pentru a continua.',
    noSubscription: 'Fara abonament',
    cancelledActive: 'Anulat (activ)',
    cancelledActiveUntilExpiration: 'Anulat (activ pana la expirare)',
    activeUntilExpiration: 'Activ pana la expirare',
    accessEndsOn: 'Accesul se termina pe',
    autoRenew: 'Reinnoire automata',
    cancelledAt: 'Anulat pe',
    expiredOn: 'Expirat pe',
    refreshing: 'Se actualizeaza...',
    refreshData: 'Actualizeaza datele',
    limitReachedFooterLong:
      'Ai atins limita de generare AI a tatuajelor pentru acest plan. Fa upgrade pentru a continua sa creezi tatuaje sau contacteaza-ne.',
    weMissYouFooter:
      'Pregatit sa creezi mai multe tatuaje uimitoare? Revino si hai sa proiectam ceva incredibil impreuna.',
    unknown: 'Necunoscut',
    free: 'Gratuit',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Activ',
    expired: 'Expirat',
    cancelled: 'Anulat',
    generationsUsed: 'Generari utilizate',
    generationsRemaining: 'Generari ramase',
    unlimited: 'Nelimitat',
    na: 'N/A',

    // We Miss You
    weMissYou: 'Ne e dor de tine!',
    previousPlan: 'Planul anterior',
    comeBackAndCreate: 'Revino si creeaza',

    // Enjoying the app
    enjoyingApp: 'Iti place aplicatia?',
    enjoyingAppDescription:
      'Daca iti place Tattoo Design AI, o recenzie ajuta alti iubitori de tatuaje sa ne descopere. Ne poti contacta oricand cu feedback sau idei de functii.',
    rateOnPlayStore: 'Evalueaza pe Play Store',
    rateOnAppStore: 'Evalueaza pe App Store',
    sendFeedback: 'Trimite feedback',

    // Are you an artist
    areYouArtist: 'Esti artist?',
    artistDescription:
      'Interesat de colaborare? Ai sugestii sau reclamatii? Ne-ar placea sa auzim de la tine!',
    writeToUs: 'Scrie-ne',

    // Support
    contactSupport: 'Contacteaza suportul',
    requestFeature: 'Sugereaza o functie',
    rateApp: 'Evalueaza aplicatia',
    shareApp: 'Distribuie aplicatia',
    shareWithFriends: 'Distribuie prietenilor',
    shareMessage: 'Descopera Tattoo Design AI \n',

    // Settings
    appearance: 'Aspect',
    light: 'Luminos',
    dark: 'Intunecat',
    system: 'Sistem',
    language: 'Limba',
    languageAuto: 'Automat (sistem)',
    showOnboarding: 'Arata ghidul introductiv',
    promptEnhancement: 'Imbunatatire prompt',
    promptEnhancementDisabledTitle: 'Imbunatatire prompt dezactivata',
    promptEnhancementDisabledMessage:
      'Rezultatele pot varia fara imbunatatire. Activeaz-o oricand.',

    // Legal
    termsOfService: 'Termeni si conditii',
    privacyPolicy: 'Politica de confidentialitate',

    // Danger
    deleteAccount: 'Sterge contul',
    deleteAccountConfirmTitle: 'Sterge contul',
    deleteAccountConfirmMessage:
      'Esti sigur? Aceasta actiune nu poate fi anulata. Nota: aceasta NU anuleaza abonamentele active.',
    dangerZoneFooter:
      'Stergerea contului este permanenta. Aceasta NU anuleaza abonamentele active.',
    resetOnboarding: 'Reseteaza ghidul introductiv',

    // Version
    version: 'Versiune',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI - Cerere de suport',
      body: 'Buna,\n\nAm nevoie de ajutor cu aplicatia Tattoo Design AI.\n\n{{userInfo}}\n\nDescriere:\n[Va rugam descrieti problema]\n\nMultumesc!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI - Sugestie de functie',
      body: 'Buna,\n\nAm nevoie de ajutor cu trimiterea unei sugestii de functie.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI - Feedback',
      body: 'Buna!\n\nAm feedback despre Tattoo Design AI:\n\n[Feedback-ul tau aici]{{userInfo}}\n\nMultumesc!',
    },
    artist: {
      subject: 'Esti artist? - Tattoo Design AI',
      body: 'Buna!\n\nSunt interesat de colaborare sau am sugestii/reclamatii.\n\n{{userInfo}}\n\n[Va rugam impartasiti sugestiile, reclamatiile sau spuneti-ne despre dumneavoastra ca artist]\n\nMultumesc!',
    },
    userIdLabel: 'ID utilizator: {{id}}',
    emailLabel: 'E-mail: {{email}}',
    accountLabel: 'E-mailul contului meu: {{email}}',
    myUserIdLabel: 'ID-ul meu de utilizator: {{id}}',
    accountInfo: '\n\nCont: {{email}}',
  },

  notFound: {
    title: 'Ups!',
    description: 'Acest ecran nu exista.',
    goHome: 'Mergi la ecranul principal!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Sa incepem',
    photoAccessDescription:
      'Avem nevoie de acces la fotografiile tale pentru a adauga imagini',
    photoAccessDeniedTitle: 'Acces la fotografii necesar',
    photoAccessDeniedDescription:
      'Aceasta functie necesita acces la biblioteca ta de fotografii pentru a vizualiza si salva tatuajele tale. Poti gestiona accesul la fotografii din setarile dispozitivului.',
    photoLibraryNeeded:
      'Avem nevoie de acces la biblioteca ta de fotografii pentru a vizualiza si salva tatuajele tale.',

    // Camera
    cameraAccessTitle: 'Sa incepem',
    cameraAccessDescription:
      'Avem nevoie de acces la camera ta pentru a face fotografii.',
    cameraAccessDeniedTitle: 'Acces la camera necesar',
    cameraAccessDeniedDescription:
      'Aceasta functie necesita acces la camera ta. Poti gestiona accesul la camera din setarile dispozitivului.',
  },
};
