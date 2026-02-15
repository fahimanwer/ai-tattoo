/**
 * Norwegian translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const noCore = {
  common: {
    // Actions
    loading: 'Laster...',
    error: 'Feil',
    success: 'Suksess',
    cancel: 'Avbryt',
    confirm: 'Bekreft',
    save: 'Lagre',
    done: 'Ferdig',
    close: 'Lukk',
    back: 'Tilbake',
    next: 'Neste',
    skip: 'Hopp over',
    continue: 'Fortsett',
    retry: 'Prov igjen',
    delete: 'Slett',
    edit: 'Rediger',
    share: 'Del',
    send: 'Send',
    search: 'Sok',
    seeAll: 'Se alle',
    tryAgain: 'Prov igjen',
    ok: 'OK',
    yes: 'Ja',
    no: 'Nei',
    or: 'eller',
    upgrade: 'Oppgrader',
    processing: 'Behandler...',
    openSettings: 'Apne innstillinger',
    readMore: 'Les mer',
    createTattoo: 'Lag tatovering',
    style: 'Stil',

    // States
    on: 'Pa',
    off: 'Av',
    enabled: 'Aktivert',
    disabled: 'Deaktivert',

    // Errors
    somethingWentWrong: 'Noe gikk galt',
    unexpectedError: 'En uventet feil oppsto',
  },

  tabs: {
    home: 'Hjem',
    explore: 'Utforsk',
    myTattoos: 'Mine tatoveringer',
    profile: 'Profil',
    tryOnTattoo: 'Prov tatovering',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Velkommen tilbake!',
    signInDescription: 'Velg din foretrukne innloggingsmetode',
    signIn: 'Logg inn',
    alreadyHaveAccount: 'Har du allerede en konto? ',
    termsOfService: 'Vilkar for bruk',
    privacyPolicy: 'Personvernerklaering',
    byContinuingAgree: 'Ved a fortsette godtar du vare ',
    inkognitoMode: 'Ink-ognito mode',
    inkognitoDescription: 'Designene dine forblir hos deg, ikke hos oss.',
    signInToContinue:
      'Logg inn for a fortsette og fa tatoveringen din laget!',
    signInBenefit:
      'Ved a logge inn kan vi holde oversikt over dine gratis tatoveringsgenerasjoner og sikre at kontoen din er riktig konfigurert.',
    notSignedIn: '(Ikke innlogget)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Konto',
    planAndUsage: 'Plan og bruk',
    settings: 'Innstillinger',
    support: 'Stotte',
    legal: 'Juridisk',
    dangerZone: 'Faresone',
    supportAndFeedback: 'Stotte og tilbakemeldinger',
    followUs: 'Folg oss',

    // Sign-in prompt
    notSignedIn: 'Ikke innlogget',
    signInPrompt:
      'Logg inn for a fa tilgang til kontodetaljer, abonnementsinformasjon og personlige funksjoner',

    // Account
    email: 'E-post',
    name: 'Navn',
    model: 'Modell',
    userId: 'Bruker-ID',
    memberSince: 'Medlem siden',
    signOut: 'Logg ut',
    logOut: 'Logg ut',
    signOutConfirmTitle: 'Logg ut',
    signOutConfirmMessage: 'Er du sikker pa at du vil logge ut?',
    unknownUser: 'Ukjent bruker',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Aktiv bruksperiode',
    currentPlan: 'Navaerende plan',
    planDetails: 'Plandetaljer',
    status: 'Status',
    renewsOn: 'Fornyes',
    expiresOn: 'Utloper',
    daysRemaining: 'Dager igjen',
    daysValue: '{{count}} dager',
    price: 'Pris',
    billingPeriod: 'Faktureringsperiode',
    managePlan: 'Administrer plan',
    upgradePlan: 'Oppgrader plan',
    upgradeNow: 'Oppgrader na',
    limitReachedFooter:
      'Du har nadd genereringsgrensen din. Oppgrader for a fortsette.',
    noSubscription: 'Ingen abonnement',
    cancelledActive: 'Kansellert (aktiv)',
    cancelledActiveUntilExpiration: 'Kansellert (aktiv til utlop)',
    activeUntilExpiration: 'Aktiv til utlop',
    accessEndsOn: 'Tilgang utloper',
    autoRenew: 'Automatisk fornyelse',
    cancelledAt: 'Kansellert',
    expiredOn: 'Utlopt',
    refreshing: 'Oppdaterer...',
    refreshData: 'Oppdater data',
    limitReachedFooterLong:
      'Du har nadd grensen for AI-tatoveringsgenerering i denne planen. Oppgrader for a fortsette a lage tatoveringer eller kontakt oss.',
    weMissYouFooter:
      'Klar for a lage flere fantastiske tatoveringer? Kom tilbake og la oss designe noe utrolig sammen.',
    unknown: 'Ukjent',
    free: 'Gratis',
    pro: 'Pro',
    active: 'Aktiv',
    expired: 'Utlopt',
    cancelled: 'Kansellert',
    generationsUsed: 'Brukte genereringer',
    generationsRemaining: 'Gjenstående genereringer',
    unlimited: 'Ubegrenset',
    na: 'Ikke tilgjengelig',

    // We Miss You
    weMissYou: 'Vi savner deg!',
    previousPlan: 'Tidligere plan',
    comeBackAndCreate: 'Kom tilbake og skap',

    // Enjoying the app
    enjoyingApp: 'Liker du appen?',
    enjoyingAppDescription:
      'Hvis du liker Tattoo Design AI, hjelper en anmeldelse andre tatoveringsentusiaster med a finne oss. Du kan ogsa nar som helst sende tilbakemeldinger eller forslag til nye funksjoner.',
    rateOnPlayStore: 'Vurder pa Play Store',
    rateOnAppStore: 'Vurder pa App Store',
    sendFeedback: 'Send tilbakemelding',

    // Are you an artist
    areYouArtist: 'Er du en kunstner?',
    artistDescription:
      'Interessert i samarbeid? Har du forslag eller klager? Vi vil gjerne hore fra deg!',
    writeToUs: 'Skriv til oss',

    // Support
    contactSupport: 'Kontakt support',
    requestFeature: 'Foresla en funksjon',
    rateApp: 'Vurder appen',
    shareApp: 'Del appen',
    shareWithFriends: 'Del med venner',
    shareMessage: 'Sjekk ut Tattoo Design AI \n',

    // Settings
    appearance: 'Utseende',
    light: 'Lyst',
    dark: 'Morkt',
    system: 'System',
    language: 'Sprak',
    languageAuto: 'Automatisk (system)',
    showOnboarding: 'Vis introduksjon',
    promptEnhancement: 'Promptforbedring',
    promptEnhancementDisabledTitle: 'Promptforbedring deaktivert',
    promptEnhancementDisabledMessage:
      'Resultatene kan variere uten forbedring. Du kan aktivere den igjen nar som helst.',

    // Legal
    termsOfService: 'Vilkar for bruk',
    privacyPolicy: 'Personvernerklaering',

    // Danger
    deleteAccount: 'Slett konto',
    deleteAccountConfirmTitle: 'Slett konto',
    deleteAccountConfirmMessage:
      'Er du sikker? Dette kan ikke angres. Merk: dette kansellerer IKKE aktive abonnementer.',
    dangerZoneFooter:
      'Sletting av konto er permanent. Dette kansellerer IKKE aktive abonnementer.',
    resetOnboarding: 'Tilbakestill introduksjon',

    // Version
    version: 'Versjon',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI - Supporthenvendelse',
      body: 'Hei,\n\nJeg trenger hjelp med Tattoo Design AI-appen.\n\n{{userInfo}}\n\nBeskrivelse:\n[Beskriv problemet ditt her]\n\nTakk!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI - Funksjonsforslag',
      body: 'Hei,\n\nJeg trenger hjelp med a sende inn et funksjonsforslag.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI - Tilbakemelding',
      body: 'Hei!\n\nJeg har tilbakemeldinger om Tattoo Design AI:\n\n[Din tilbakemelding her]{{userInfo}}\n\nTakk!',
    },
    artist: {
      subject: 'Er du en kunstner? - Tattoo Design AI',
      body: 'Hei!\n\nJeg er interessert i samarbeid eller har forslag/klager.\n\n{{userInfo}}\n\n[Del gjerne dine forslag, klager eller fortell oss om deg selv som kunstner]\n\nTakk!',
    },
    userIdLabel: 'Bruker-ID: {{id}}',
    emailLabel: 'E-post: {{email}}',
    accountLabel: 'Min konto-e-post: {{email}}',
    myUserIdLabel: 'Min bruker-ID: {{id}}',
    accountInfo: '\n\nKonto: {{email}}',
  },

  notFound: {
    title: 'Oops!',
    description: 'Denne skjermen finnes ikke.',
    goHome: 'Ga til startskjermen!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'La oss komme i gang',
    photoAccessDescription:
      'Vi trenger tilgang til bildene dine for a legge til bilder',
    photoAccessDeniedTitle: 'Fototilgang krevd',
    photoAccessDeniedDescription:
      'Denne funksjonen krever tilgang til fotobiblioteket ditt for a vise og lagre tatoveringene dine. Du kan administrere fototilgang i enhetens innstillinger.',
    photoLibraryNeeded:
      'Vi trenger tilgang til fotobiblioteket ditt slik at du kan se og lagre tatoveringene dine.',

    // Camera
    cameraAccessTitle: 'La oss komme i gang',
    cameraAccessDescription:
      'Vi trenger tilgang til kameraet ditt for a ta bilder.',
    cameraAccessDeniedTitle: 'Kameratilgang krevd',
    cameraAccessDeniedDescription:
      'Denne funksjonen krever tilgang til kameraet ditt. Du kan administrere kameratilgang i enhetens innstillinger.',
  },
};
