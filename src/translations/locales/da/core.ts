/**
 * Danish translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const daCore = {
  common: {
    // Actions
    loading: 'Indlaeser...',
    error: 'Fejl',
    success: 'Succes',
    cancel: 'Annuller',
    confirm: 'Bekraeft',
    save: 'Gem',
    done: 'Faerdig',
    close: 'Luk',
    back: 'Tilbage',
    next: 'Naeste',
    skip: 'Spring over',
    continue: 'Fortsaet',
    retry: 'Prov igen',
    delete: 'Slet',
    edit: 'Rediger',
    share: 'Del',
    send: 'Send',
    search: 'Sog',
    seeAll: 'Se alle',
    tryAgain: 'Prov igen',
    ok: 'OK',
    yes: 'Ja',
    no: 'Nej',
    or: 'eller',
    upgrade: 'Opgrader',
    processing: 'Behandler...',
    openSettings: 'Abn indstillinger',
    readMore: 'Laes mere',
    createTattoo: 'Opret tatovering',
    style: 'Stil',

    // States
    on: 'Til',
    off: 'Fra',
    enabled: 'Aktiveret',
    disabled: 'Deaktiveret',

    // Errors
    somethingWentWrong: 'Noget gik galt',
    unexpectedError: 'Der opstod en uventet fejl',
  },

  tabs: {
    home: 'Hjem',
    explore: 'Udforsk',
    myTattoos: 'Mine tatoveringer',
    profile: 'Profil',
    tryOnTattoo: 'Prov tatovering',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Velkommen tilbage!',
    signInDescription: 'Vaelg din foretrukne loginmetode',
    signIn: 'Log ind',
    alreadyHaveAccount: 'Har du allerede en konto? ',
    termsOfService: 'Servicevilkar',
    privacyPolicy: 'Privatlivspolitik',
    byContinuingAgree: 'Ved at fortsaette accepterer du vores ',
    inkognitoMode: 'Ink-ognito mode',
    inkognitoDescription: 'Dine designs forbliver hos dig, ikke hos os.',
    signInToContinue:
      'Log ind for at fortsaette og fa din tatovering lavet!',
    signInBenefit:
      'Ved at logge ind kan vi holde styr pa dine gratis tatoveringsgeneringer og sikre, at din konto er korrekt opsat.',
    notSignedIn: '(Ikke logget ind)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Konto',
    planAndUsage: 'Plan og forbrug',
    settings: 'Indstillinger',
    support: 'Support',
    legal: 'Juridisk',
    dangerZone: 'Farezone',
    supportAndFeedback: 'Support og feedback',
    followUs: 'Folg os',

    // Sign-in prompt
    notSignedIn: 'Ikke logget ind',
    signInPrompt:
      'Log ind for at fa adgang til kontooplysninger, abonnementsinformation og personlige funktioner',

    // Account
    email: 'E-mail',
    name: 'Navn',
    model: 'Model',
    userId: 'Bruger-ID',
    memberSince: 'Medlem siden',
    signOut: 'Log ud',
    logOut: 'Log ud',
    signOutConfirmTitle: 'Log ud',
    signOutConfirmMessage: 'Er du sikker pa, at du vil logge ud?',
    unknownUser: 'Ukendt bruger',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Aktiv brugsperiode',
    currentPlan: 'Nuvaerende plan',
    planDetails: 'Plandetaljer',
    status: 'Status',
    renewsOn: 'Fornyes',
    expiresOn: 'Udlober',
    daysRemaining: 'Dage tilbage',
    daysValue: '{{count}} dage',
    price: 'Pris',
    billingPeriod: 'Faktureringsperiode',
    managePlan: 'Administrer plan',
    upgradePlan: 'Opgrader plan',
    upgradeNow: 'Opgrader nu',
    limitReachedFooter:
      'Du har naet din genereringsgraense. Opgrader for at fortsaette.',
    noSubscription: 'Intet abonnement',
    cancelledActive: 'Opsagt (aktiv)',
    cancelledActiveUntilExpiration: 'Opsagt (aktiv til udlob)',
    activeUntilExpiration: 'Aktiv til udlob',
    accessEndsOn: 'Adgang udlober',
    autoRenew: 'Automatisk fornyelse',
    cancelledAt: 'Opsagt',
    expiredOn: 'Udlobet',
    refreshing: 'Opdaterer...',
    refreshData: 'Opdater data',
    limitReachedFooterLong:
      'Du har naet graensen for AI-tatoveringsgenerering i denne plan. Opgrader for at fortsaette med at lave tatoveringer eller kontakt os.',
    weMissYouFooter:
      'Klar til at lave flere fantastiske tatoveringer? Kom tilbage og lad os designe noget utroligt sammen.',
    unknown: 'Ukendt',
    free: 'Gratis',
    pro: 'Pro',
    active: 'Aktiv',
    expired: 'Udlobet',
    cancelled: 'Opsagt',
    generationsUsed: 'Brugte genereringer',
    generationsRemaining: 'Resterende genereringer',
    unlimited: 'Ubegreanset',
    na: 'Ikke tilgaengelig',

    // We Miss You
    weMissYou: 'Vi savner dig!',
    previousPlan: 'Tidligere plan',
    comeBackAndCreate: 'Kom tilbage og skab',

    // Enjoying the app
    enjoyingApp: 'Kan du lide appen?',
    enjoyingAppDescription:
      'Hvis du kan lide Tattoo Design AI, hjaelper en anmeldelse andre tatoveringselskere med at finde os. Du kan ogsa nar som helst sende feedback eller ideer til nye funktioner.',
    rateOnPlayStore: 'Bedm pa Play Store',
    rateOnAppStore: 'Bedm pa App Store',
    sendFeedback: 'Send feedback',

    // Are you an artist
    areYouArtist: 'Er du kunstner?',
    artistDescription:
      'Interesseret i samarbejde? Har du forslag eller klager? Vi vil gerne hore fra dig!',
    writeToUs: 'Skriv til os',

    // Support
    contactSupport: 'Kontakt support',
    requestFeature: 'Foresla en funktion',
    rateApp: 'Bedm appen',
    shareApp: 'Del appen',
    shareWithFriends: 'Del med venner',
    shareMessage: 'Tjek Tattoo Design AI ud \n',

    // Settings
    appearance: 'Udseende',
    light: 'Lyst',
    dark: 'Morkt',
    system: 'System',
    language: 'Sprog',
    languageAuto: 'Automatisk (system)',
    showOnboarding: 'Vis introduktion',
    promptEnhancement: 'Promptforbedring',
    promptEnhancementDisabledTitle: 'Promptforbedring deaktiveret',
    promptEnhancementDisabledMessage:
      'Resultaterne kan variere uden forbedring. Du kan aktivere den igen nar som helst.',

    // Legal
    termsOfService: 'Servicevilkar',
    privacyPolicy: 'Privatlivspolitik',

    // Danger
    deleteAccount: 'Slet konto',
    deleteAccountConfirmTitle: 'Slet konto',
    deleteAccountConfirmMessage:
      'Er du sikker? Dette kan ikke fortrydes. Bemaeark: dette annullerer IKKE aktive abonnementer.',
    dangerZoneFooter:
      'Sletning af konto er permanent. Dette annullerer IKKE aktive abonnementer.',
    resetOnboarding: 'Nulstil introduktion',

    // Version
    version: 'Version',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI - Supportanmodning',
      body: 'Hej,\n\nJeg har brug for hjaelp med Tattoo Design AI-appen.\n\n{{userInfo}}\n\nBeskrivelse:\n[Beskriv venligst dit problem her]\n\nTak!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI - Funktionsforslag',
      body: 'Hej,\n\nJeg har brug for hjaelp med at indsende et funktionsforslag.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI - Feedback',
      body: 'Hej!\n\nJeg har feedback om Tattoo Design AI:\n\n[Din feedback her]{{userInfo}}\n\nTak!',
    },
    artist: {
      subject: 'Er du kunstner? - Tattoo Design AI',
      body: 'Hej!\n\nJeg er interesseret i samarbejde eller har forslag/klager.\n\n{{userInfo}}\n\n[Del venligst dine forslag, klager eller fortael os om dig selv som kunstner]\n\nTak!',
    },
    userIdLabel: 'Bruger-ID: {{id}}',
    emailLabel: 'E-mail: {{email}}',
    accountLabel: 'Min konto-e-mail: {{email}}',
    myUserIdLabel: 'Mit bruger-ID: {{id}}',
    accountInfo: '\n\nKonto: {{email}}',
  },

  notFound: {
    title: 'Ups!',
    description: 'Denne skaerm findes ikke.',
    goHome: 'Ga til startskaermen!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Lad os komme i gang',
    photoAccessDescription:
      'Vi har brug for adgang til dine fotos for at tilfoje billeder',
    photoAccessDeniedTitle: 'Fotoadgang kraeves',
    photoAccessDeniedDescription:
      'Denne funktion kraever adgang til dit fotobibliotek for at se og gemme dine tatoveringer. Du kan administrere fotoadgang i enhedens indstillinger.',
    photoLibraryNeeded:
      'Vi har brug for adgang til dit fotobibliotek, sa du kan se og gemme dine tatoveringer.',

    // Camera
    cameraAccessTitle: 'Lad os komme i gang',
    cameraAccessDescription:
      'Vi har brug for adgang til dit kamera for at tage fotos.',
    cameraAccessDeniedTitle: 'Kameraadgang kraeves',
    cameraAccessDeniedDescription:
      'Denne funktion kraever adgang til dit kamera. Du kan administrere kameraadgang i enhedens indstillinger.',
  },
};
