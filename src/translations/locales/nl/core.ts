/**
 * Dutch translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const nlCore = {
  common: {
    // Actions
    loading: 'Laden...',
    error: 'Fout',
    success: 'Gelukt',
    cancel: 'Annuleren',
    confirm: 'Bevestigen',
    save: 'Opslaan',
    done: 'Klaar',
    close: 'Sluiten',
    back: 'Terug',
    next: 'Volgende',
    skip: 'Overslaan',
    continue: 'Doorgaan',
    retry: 'Opnieuw proberen',
    delete: 'Verwijderen',
    edit: 'Bewerken',
    share: 'Delen',
    send: 'Verzenden',
    search: 'Zoeken',
    seeAll: 'Alles bekijken',
    tryAgain: 'Opnieuw proberen',
    ok: 'OK',
    yes: 'Ja',
    no: 'Nee',
    or: 'of',
    upgrade: 'Upgraden',
    processing: 'Verwerken...',
    openSettings: 'Instellingen openen',
    readMore: 'Meer lezen',
    createTattoo: 'Tattoo maken',
    style: 'Stijl',

    // States
    on: 'Aan',
    off: 'Uit',
    enabled: 'Ingeschakeld',
    disabled: 'Uitgeschakeld',

    // Errors
    somethingWentWrong: 'Er ging iets mis',
    unexpectedError: 'Er is een onverwachte fout opgetreden',
  },

  tabs: {
    home: 'Home',
    explore: 'Ontdekken',
    myTattoos: 'Mijn Tattoos',
    profile: 'Profiel',
    tryOnTattoo: 'Tattoo Passen',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Welkom terug!',
    signInDescription: 'Kies je gewenste inlogmethode',
    signIn: 'Inloggen',
    alreadyHaveAccount: 'Heb je al een account? ',
    termsOfService: 'Gebruiksvoorwaarden',
    privacyPolicy: 'Privacybeleid',
    byContinuingAgree: 'Door verder te gaan ga je akkoord met onze ',
    inkognitoMode: 'Ink-ognito modus',
    inkognitoDescription: 'Jouw ontwerpen blijven bij jou, niet bij ons.',
    signInToContinue:
      'Log in om verder te gaan en je tattoo te laten maken!',
    signInBenefit:
      'Door in te loggen kunnen we je gratis tattoo-generaties bijhouden en je account correct instellen.',
    notSignedIn: '(Niet ingelogd)',
  },

  profile: {
    // Screen header
    title: 'Profiel',

    // Section headers
    account: 'Account',
    planAndUsage: 'Abonnement & Gebruik',
    settings: 'Instellingen',
    support: 'Ondersteuning',
    legal: 'Juridisch',
    dangerZone: 'Gevarenzone',
    supportAndFeedback: 'Ondersteuning & Feedback',
    followUs: 'Volg Ons',

    // Sign-in prompt
    notSignedIn: 'Niet ingelogd',
    signInPrompt:
      'Log in om toegang te krijgen tot je accountgegevens, abonnementsinformatie en gepersonaliseerde functies',

    // Account
    email: 'E-mail',
    name: 'Naam',
    model: 'Model',
    userId: 'Gebruikers-ID',
    memberSince: 'Lid sinds',
    signOut: 'Uitloggen',
    logOut: 'Uitloggen',
    signOutConfirmTitle: 'Uitloggen',
    signOutConfirmMessage: 'Weet je zeker dat je wilt uitloggen?',
    unknownUser: 'Onbekende gebruiker',

    // Plan
    plan: 'Abonnement',
    activeUsagePeriod: 'Actieve gebruiksperiode',
    currentPlan: 'Huidig abonnement',
    planDetails: 'Abonnementsdetails',
    status: 'Status',
    renewsOn: 'Verlenging op',
    expiresOn: 'Verloopt op',
    daysRemaining: 'Resterende dagen',
    daysValue: '{{count}} dagen',
    price: 'Prijs',
    billingPeriod: 'Factureringsperiode',
    managePlan: 'Abonnement beheren',
    upgradePlan: 'Abonnement upgraden',
    upgradeNow: 'Nu upgraden',
    limitReachedFooter:
      'Je hebt je generatielimiet bereikt. Upgrade om door te gaan.',
    noSubscription: 'Geen abonnement',
    cancelledActive: 'Opgezegd (Actief)',
    cancelledActiveUntilExpiration: 'Opgezegd (Actief tot vervaldatum)',
    activeUntilExpiration: 'Actief tot vervaldatum',
    accessEndsOn: 'Toegang eindigt op',
    autoRenew: 'Automatisch verlengen',
    cancelledAt: 'Opgezegd op',
    expiredOn: 'Verlopen op',
    refreshing: 'Vernieuwen...',
    refreshData: 'Gegevens vernieuwen',
    limitReachedFooterLong:
      'Je hebt de AI-tattoogeneratielimiet voor dit abonnement bereikt. Upgrade om door te gaan met het maken van tattoos of neem contact met ons op.',
    weMissYouFooter:
      'Klaar om weer geweldige tattoos te maken? Kom terug en laten we samen iets ongelooflijks ontwerpen.',
    unknown: 'Onbekend',
    free: 'Gratis',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Actief',
    expired: 'Verlopen',
    cancelled: 'Opgezegd',
    generationsUsed: 'Gebruikte generaties',
    generationsRemaining: 'Resterende generaties',
    unlimited: 'Onbeperkt',
    na: 'N.v.t.',

    // We Miss You
    weMissYou: 'We missen je!',
    previousPlan: 'Vorig abonnement',
    comeBackAndCreate: 'Kom terug en creëer',

    // Enjoying the app
    enjoyingApp: 'Bevalt de app?',
    enjoyingAppDescription:
      'Als je Tattoo Design AI leuk vindt, helpt een review andere tattoo-liefhebbers ons te ontdekken. Je kunt ons ook altijd bereiken met feedback of ideeën voor functies.',
    rateOnPlayStore: 'Beoordeel in Play Store',
    rateOnAppStore: 'Beoordeel in App Store',
    sendFeedback: 'Feedback sturen',

    // Are you an artist
    areYouArtist: 'Ben je een artiest?',
    artistDescription:
      'Geïnteresseerd in samenwerking? Suggesties of klachten? We horen graag van je!',
    writeToUs: 'Schrijf ons',

    // Support
    contactSupport: 'Contact opnemen',
    requestFeature: 'Functie aanvragen',
    rateApp: 'App beoordelen',
    shareApp: 'App delen',
    shareWithFriends: 'Delen met vrienden',
    shareMessage: 'Bekijk Tattoo Design AI \n',

    // Settings
    appearance: 'Weergave',
    light: 'Licht',
    dark: 'Donker',
    system: 'Systeem',
    language: 'Taal',
    languageAuto: 'Automatisch (Systeem)',
    showOnboarding: 'Welkomstscherm tonen',
    promptEnhancement: 'Promptverbetering',
    promptEnhancementDisabledTitle: 'Promptverbetering uitgeschakeld',
    promptEnhancementDisabledMessage:
      'Resultaten kunnen variëren zonder verbetering. Je kunt het op elk moment weer inschakelen.',

    // Legal
    termsOfService: 'Gebruiksvoorwaarden',
    privacyPolicy: 'Privacybeleid',

    // Danger
    deleteAccount: 'Account verwijderen',
    deleteAccountConfirmTitle: 'Account verwijderen',
    deleteAccountConfirmMessage:
      'Weet je het zeker? Dit kan niet ongedaan worden gemaakt. Let op: dit annuleert GEEN actieve abonnementen.',
    dangerZoneFooter:
      'Het verwijderen van je account is permanent. Dit annuleert GEEN actieve abonnementen.',
    resetOnboarding: 'Welkomstscherm resetten',

    // Version
    version: 'Versie',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI App Ondersteuningsverzoek',
      body: 'Hallo,\n\nIk heb hulp nodig met de Tattoo Design AI-app.\n\n{{userInfo}}\n\nBeschrijving:\n[Beschrijf hier je probleem]\n\nBedankt!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI Functieverzoek Hulp',
      body: 'Hallo,\n\nIk heb hulp nodig bij het indienen van een functieverzoek.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI Feedback',
      body: 'Hallo!\n\nIk heb feedback over Tattoo Design AI:\n\n[Jouw feedback hier]{{userInfo}}\n\nBedankt!',
    },
    artist: {
      subject: 'Ben je een artiest? - Tattoo Design AI',
      body: 'Hallo!\n\nIk ben geïnteresseerd in samenwerking of heb suggesties/klachten.\n\n{{userInfo}}\n\n[Deel je suggesties, klachten of vertel ons over jezelf als artiest]\n\nBedankt!',
    },
    userIdLabel: 'Gebruikers-ID: {{id}}',
    emailLabel: 'E-mail: {{email}}',
    accountLabel: 'Mijn account e-mail: {{email}}',
    myUserIdLabel: 'Mijn gebruikers-ID: {{id}}',
    accountInfo: '\n\nAccount: {{email}}',
  },

  notFound: {
    title: 'Oeps!',
    description: 'Dit scherm bestaat niet.',
    goHome: 'Naar het startscherm!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Laten we beginnen',
    photoAccessDescription:
      'We hebben toegang tot je foto\'s nodig om afbeeldingen toe te voegen',
    photoAccessDeniedTitle: 'Fototoegang nodig',
    photoAccessDeniedDescription:
      'Deze functie vereist toegang tot je fotobibliotheek om je tattoos te bekijken en op te slaan. Je kunt fototoegang beheren in je apparaatinstellingen.',
    photoLibraryNeeded:
      'We hebben toegang tot je fotobibliotheek nodig zodat je je tattoos kunt bekijken en opslaan.',

    // Camera
    cameraAccessTitle: 'Laten we beginnen',
    cameraAccessDescription:
      'We hebben toegang tot je camera nodig om foto\'s te maken.',
    cameraAccessDeniedTitle: 'Cameratoegang nodig',
    cameraAccessDeniedDescription:
      'Deze functie vereist toegang tot je camera. Je kunt cameratoegang beheren in je apparaatinstellingen.',
  },
};
