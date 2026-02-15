/**
 * Swedish translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const svCore = {
  common: {
    // Actions
    loading: 'Laddar...',
    error: 'Fel',
    success: 'Klart',
    cancel: 'Avbryt',
    confirm: 'Bekrafta',
    save: 'Spara',
    done: 'Klar',
    close: 'Stang',
    back: 'Tillbaka',
    next: 'Nasta',
    skip: 'Hoppa over',
    continue: 'Fortsatt',
    retry: 'Forsok igen',
    delete: 'Radera',
    edit: 'Redigera',
    share: 'Dela',
    send: 'Skicka',
    search: 'Sok',
    seeAll: 'Visa alla',
    tryAgain: 'Forsok igen',
    ok: 'OK',
    yes: 'Ja',
    no: 'Nej',
    or: 'eller',
    upgrade: 'Uppgradera',
    processing: 'Bearbetar...',
    openSettings: 'Oppna installningar',
    readMore: 'Las mer',
    createTattoo: 'Skapa tatuering',
    style: 'Stil',

    // States
    on: 'Pa',
    off: 'Av',
    enabled: 'Aktiverad',
    disabled: 'Inaktiverad',

    // Errors
    somethingWentWrong: 'Nagot gick fel',
    unexpectedError: 'Ett ovantat fel uppstod',
  },

  tabs: {
    home: 'Hem',
    explore: 'Utforska',
    myTattoos: 'Mina tatueringar',
    profile: 'Profil',
    tryOnTattoo: 'Provtesta tatuering',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Valkommen tillbaka!',
    signInDescription: 'Valj din foredragen inloggningsmetod',
    signIn: 'Logga in',
    alreadyHaveAccount: 'Har du redan ett konto? ',
    termsOfService: 'Anvandarvillkor',
    privacyPolicy: 'Integritetspolicy',
    byContinuingAgree: 'Genom att fortsatta godkanner du vara ',
    inkognitoMode: 'Ink-ognito mode',
    inkognitoDescription: 'Dina designer stannar hos dig, inte hos oss.',
    signInToContinue:
      'Logga in for att fortsatta och skapa din tatuering!',
    signInBenefit:
      'Genom att logga in kan vi halla koll pa dina gratis tatueringsgenerationer och sakerstalla att ditt konto ar korrekt konfigurerat.',
    notSignedIn: '(Ej inloggad)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Konto',
    planAndUsage: 'Plan och anvandning',
    settings: 'Installningar',
    support: 'Support',
    legal: 'Juridiskt',
    dangerZone: 'Farozon',
    supportAndFeedback: 'Support och feedback',
    followUs: 'Folj oss',

    // Sign-in prompt
    notSignedIn: 'Ej inloggad',
    signInPrompt:
      'Logga in for att fa tillgang till kontouppgifter, prenumerationsinformation och personliga funktioner',

    // Account
    email: 'E-post',
    name: 'Namn',
    model: 'Modell',
    userId: 'Anvander-ID',
    memberSince: 'Medlem sedan',
    signOut: 'Logga ut',
    logOut: 'Logga ut',
    signOutConfirmTitle: 'Logga ut',
    signOutConfirmMessage: 'Ar du saker pa att du vill logga ut?',
    unknownUser: 'Okand anvandare',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Aktiv anvandningsperiod',
    currentPlan: 'Nuvarande plan',
    planDetails: 'Plandetaljer',
    status: 'Status',
    renewsOn: 'Fornyelse',
    expiresOn: 'Utgar',
    daysRemaining: 'Dagar kvar',
    daysValue: '{{count}} dagar',
    price: 'Pris',
    billingPeriod: 'Faktureringsperiod',
    managePlan: 'Hantera plan',
    upgradePlan: 'Uppgradera plan',
    upgradeNow: 'Uppgradera nu',
    limitReachedFooter:
      'Du har natt din genereringsgrans. Uppgradera for att fortsatta.',
    noSubscription: 'Ingen prenumeration',
    cancelledActive: 'Uppsagd (aktiv)',
    cancelledActiveUntilExpiration: 'Uppsagd (aktiv till utgang)',
    activeUntilExpiration: 'Aktiv till utgang',
    accessEndsOn: 'Atkomst utgar',
    autoRenew: 'Automatisk fornyelse',
    cancelledAt: 'Uppsagd',
    expiredOn: 'Utgangen',
    refreshing: 'Uppdaterar...',
    refreshData: 'Uppdatera data',
    limitReachedFooterLong:
      'Du har natt gransen for AI-tatueringsgenerering i den har planen. Uppgradera for att fortsatta skapa tatueringar eller kontakta oss.',
    weMissYouFooter:
      'Redo att skapa fler fantastiska tatueringar? Kom tillbaka och lat oss designa nagot otroligt tillsammans.',
    unknown: 'Okand',
    free: 'Gratis',
    pro: 'Pro',
    active: 'Aktiv',
    expired: 'Utgangen',
    cancelled: 'Uppsagd',
    generationsUsed: 'Anvanda genereringar',
    generationsRemaining: 'Aterstaende genereringar',
    unlimited: 'Obegransat',
    na: 'Ej tillampligt',

    // We Miss You
    weMissYou: 'Vi saknar dig!',
    previousPlan: 'Tidigare plan',
    comeBackAndCreate: 'Kom tillbaka och skapa',

    // Enjoying the app
    enjoyingApp: 'Gillar du appen?',
    enjoyingAppDescription:
      'Om du gillar Tattoo Design AI hjalper ett omdome andra tatueringsfantaster att hitta oss. Du kan ocksa nar som helst skicka feedback eller forslag pa nya funktioner.',
    rateOnPlayStore: 'Betygsatt pa Play Store',
    rateOnAppStore: 'Betygsatt pa App Store',
    sendFeedback: 'Skicka feedback',

    // Are you an artist
    areYouArtist: 'Ar du en konstnr?',
    artistDescription:
      'Intresserad av samarbete? Har du forslag eller synpunkter? Vi vill garna hora fran dig!',
    writeToUs: 'Skriv till oss',

    // Support
    contactSupport: 'Kontakta support',
    requestFeature: 'Foreslå en funktion',
    rateApp: 'Betygsatt appen',
    shareApp: 'Dela appen',
    shareWithFriends: 'Dela med vanner',
    shareMessage: 'Kolla in Tattoo Design AI \n',

    // Settings
    appearance: 'Utseende',
    light: 'Ljust',
    dark: 'Morkt',
    system: 'System',
    language: 'Sprak',
    languageAuto: 'Automatiskt (system)',
    showOnboarding: 'Visa introduktion',
    promptEnhancement: 'Promptforbattring',
    promptEnhancementDisabledTitle: 'Promptforbattring inaktiverad',
    promptEnhancementDisabledMessage:
      'Resultaten kan variera utan forbattring. Du kan aktivera den igen nar som helst.',

    // Legal
    termsOfService: 'Anvandarvillkor',
    privacyPolicy: 'Integritetspolicy',

    // Danger
    deleteAccount: 'Radera konto',
    deleteAccountConfirmTitle: 'Radera konto',
    deleteAccountConfirmMessage:
      'Ar du saker? Det gar inte att angra. Obs: detta avbryter INTE aktiva prenumerationer.',
    dangerZoneFooter:
      'Att radera kontot ar permanent. Detta avbryter INTE aktiva prenumerationer.',
    resetOnboarding: 'Aterstall introduktion',

    // Version
    version: 'Version',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI - Supportforfragan',
      body: 'Hej,\n\nJag behover hjalp med Tattoo Design AI-appen.\n\n{{userInfo}}\n\nBeskrivning:\n[Beskriv ditt problem har]\n\nTack!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI - Funktionsforslag',
      body: 'Hej,\n\nJag behover hjalp med att skicka in ett funktionsforslag.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI - Feedback',
      body: 'Hej!\n\nJag har feedback om Tattoo Design AI:\n\n[Din feedback har]{{userInfo}}\n\nTack!',
    },
    artist: {
      subject: 'Ar du konstnr? - Tattoo Design AI',
      body: 'Hej!\n\nJag ar intresserad av samarbete eller har forslag/synpunkter.\n\n{{userInfo}}\n\n[Dela garna dina forslag, synpunkter eller beratta om dig sjalv som konstnr]\n\nTack!',
    },
    userIdLabel: 'Anvander-ID: {{id}}',
    emailLabel: 'E-post: {{email}}',
    accountLabel: 'Mitt konto e-post: {{email}}',
    myUserIdLabel: 'Mitt anvander-ID: {{id}}',
    accountInfo: '\n\nKonto: {{email}}',
  },

  notFound: {
    title: 'Hoppsan!',
    description: 'Den har sidan finns inte.',
    goHome: 'Ga till startskarm!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Lat oss borja',
    photoAccessDescription:
      'Vi behover tillgang till dina foton for att lagga till bilder',
    photoAccessDeniedTitle: 'Fotoatkomst kravs',
    photoAccessDeniedDescription:
      'Den har funktionen kraver tillgang till ditt fotobibliotek for att visa och spara dina tatueringar. Du kan hantera fotoatkomst i enhetens installningar.',
    photoLibraryNeeded:
      'Vi behover tillgang till ditt fotobibliotek sa att du kan visa och spara dina tatueringar.',

    // Camera
    cameraAccessTitle: 'Lat oss borja',
    cameraAccessDescription:
      'Vi behover tillgang till din kamera for att ta foton.',
    cameraAccessDeniedTitle: 'Kameraatkomst kravs',
    cameraAccessDeniedDescription:
      'Den har funktionen kraver tillgang till din kamera. Du kan hantera kameraatkomst i enhetens installningar.',
  },
};
