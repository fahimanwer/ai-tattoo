/**
 * German translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const deCore = {
  common: {
    // Actions
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    cancel: 'Abbrechen',
    confirm: 'Bestätigen',
    save: 'Speichern',
    done: 'Fertig',
    close: 'Schließen',
    back: 'Zurück',
    next: 'Weiter',
    skip: 'Überspringen',
    continue: 'Weiter',
    retry: 'Erneut versuchen',
    delete: 'Löschen',
    edit: 'Bearbeiten',
    share: 'Teilen',
    send: 'Senden',
    search: 'Suchen',
    seeAll: 'Alle anzeigen',
    tryAgain: 'Erneut versuchen',
    ok: 'OK',
    yes: 'Ja',
    no: 'Nein',
    or: 'oder',
    upgrade: 'Upgraden',
    processing: 'Verarbeitung...',
    openSettings: 'Einstellungen öffnen',
    readMore: 'Mehr lesen',
    createTattoo: 'Tattoo erstellen',
    style: 'Stil',

    // States
    on: 'An',
    off: 'Aus',
    enabled: 'Aktiviert',
    disabled: 'Deaktiviert',

    // Errors
    somethingWentWrong: 'Etwas ist schiefgelaufen',
    unexpectedError: 'Ein unerwarteter Fehler ist aufgetreten',
  },

  tabs: {
    home: 'Start',
    explore: 'Entdecken',
    myTattoos: 'Meine Tattoos',
    profile: 'Profil',
    tryOnTattoo: 'Tattoo anprobieren',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Willkommen zurück!',
    signInDescription: 'Bitte wähle deine bevorzugte Anmeldemethode',
    signIn: 'Anmelden',
    alreadyHaveAccount: 'Bereits ein Konto? ',
    termsOfService: 'Nutzungsbedingungen',
    privacyPolicy: 'Datenschutzrichtlinie',
    byContinuingAgree: 'Durch Fortfahren stimmst du unseren ',
    inkognitoMode: 'Ink-ognito Modus',
    inkognitoDescription: 'Deine Designs bleiben bei dir, nicht bei uns.',
    signInToContinue:
      'Bitte melde dich an, um fortzufahren und dein Tattoo erstellen zu lassen!',
    signInBenefit:
      'Durch die Anmeldung können wir deine kostenlosen Tattoo-Generierungen verfolgen und sicherstellen, dass dein Konto richtig eingerichtet ist.',
    notSignedIn: '(Nicht angemeldet)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Konto',
    planAndUsage: 'Plan & Nutzung',
    settings: 'Einstellungen',
    support: 'Support',
    legal: 'Rechtliches',
    dangerZone: 'Gefahrenzone',
    supportAndFeedback: 'Support & Feedback',
    followUs: 'Folge uns',

    // Sign-in prompt
    notSignedIn: 'Nicht angemeldet',
    signInPrompt:
      'Melde dich an, um auf deine Kontodaten, Abo-Informationen und personalisierte Funktionen zuzugreifen',

    // Account
    email: 'E-Mail',
    name: 'Name',
    model: 'Modell',
    userId: 'Benutzer-ID',
    memberSince: 'Mitglied seit',
    signOut: 'Abmelden',
    logOut: 'Ausloggen',
    signOutConfirmTitle: 'Abmelden',
    signOutConfirmMessage: 'Bist du sicher, dass du dich abmelden möchtest?',
    unknownUser: 'Unbekannter Benutzer',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Aktiver Nutzungszeitraum',
    currentPlan: 'Aktueller Plan',
    planDetails: 'Plandetails',
    status: 'Status',
    renewsOn: 'Verlängert am',
    expiresOn: 'Läuft ab am',
    daysRemaining: 'Verbleibende Tage',
    daysValue: '{{count}} Tage',
    price: 'Preis',
    billingPeriod: 'Abrechnungszeitraum',
    managePlan: 'Plan verwalten',
    upgradePlan: 'Plan upgraden',
    upgradeNow: 'Jetzt upgraden',
    limitReachedFooter:
      'Du hast dein Generierungslimit erreicht. Upgrade, um fortzufahren.',
    noSubscription: 'Kein Abonnement',
    cancelledActive: 'Gekündigt (Aktiv)',
    cancelledActiveUntilExpiration: 'Gekündigt (Aktiv bis Ablauf)',
    activeUntilExpiration: 'Aktiv bis Ablauf',
    accessEndsOn: 'Zugang endet am',
    autoRenew: 'Automatische Verlängerung',
    cancelledAt: 'Gekündigt am',
    expiredOn: 'Abgelaufen am',
    refreshing: 'Aktualisierung...',
    refreshData: 'Daten aktualisieren',
    limitReachedFooterLong:
      'Du hast dein KI-Tattoo-Generierungslimit für diesen Plan erreicht. Upgrade, um weiterhin Tattoos zu erstellen, oder kontaktiere uns.',
    weMissYouFooter:
      'Bereit, weitere tolle Tattoos zu erstellen? Komm zurück und lass uns gemeinsam etwas Unglaubliches gestalten.',
    unknown: 'Unbekannt',
    free: 'Kostenlos',
    pro: 'Pro',
    active: 'Aktiv',
    expired: 'Abgelaufen',
    cancelled: 'Gekündigt',
    generationsUsed: 'Generierungen verwendet',
    generationsRemaining: 'Generierungen übrig',
    unlimited: 'Unbegrenzt',
    na: 'N/A',

    // We Miss You
    weMissYou: 'Wir vermissen dich!',
    previousPlan: 'Vorheriger Plan',
    comeBackAndCreate: 'Komm zurück & gestalte',

    // Enjoying the app
    enjoyingApp: 'Gefällt dir die App?',
    enjoyingAppDescription:
      'Wenn dir Tattoo Design AI gefällt, hilft eine Bewertung anderen Tattoo-Liebhabern, uns zu finden. Du kannst uns auch jederzeit Feedback oder Feature-Ideen schicken.',
    rateOnPlayStore: 'Im Play Store bewerten',
    rateOnAppStore: 'Im App Store bewerten',
    sendFeedback: 'Feedback senden',

    // Are you an artist
    areYouArtist: 'Bist du Künstler?',
    artistDescription:
      'Interesse an einer Zusammenarbeit? Hast du Vorschläge oder Beschwerden? Wir freuen uns, von dir zu hören!',
    writeToUs: 'Schreib uns',

    // Support
    contactSupport: 'Support kontaktieren',
    requestFeature: 'Feature vorschlagen',
    rateApp: 'App bewerten',
    shareApp: 'App teilen',
    shareWithFriends: 'Mit Freunden teilen',
    shareMessage: 'Schau dir Tattoo Design AI an \n',

    // Settings
    appearance: 'Erscheinungsbild',
    light: 'Hell',
    dark: 'Dunkel',
    system: 'System',
    language: 'Sprache',
    languageAuto: 'Automatisch (System)',
    showOnboarding: 'Onboarding anzeigen',
    promptEnhancement: 'Prompt-Verbesserung',
    promptEnhancementDisabledTitle: 'Prompt-Verbesserung deaktiviert',
    promptEnhancementDisabledMessage:
      'Ergebnisse können ohne Verbesserung variieren. Du kannst sie jederzeit wieder aktivieren.',

    // Legal
    termsOfService: 'Nutzungsbedingungen',
    privacyPolicy: 'Datenschutzrichtlinie',

    // Danger
    deleteAccount: 'Konto löschen',
    deleteAccountConfirmTitle: 'Konto löschen',
    deleteAccountConfirmMessage:
      'Bist du sicher? Dies kann nicht rückgängig gemacht werden. Hinweis: Aktive Abonnements werden dadurch NICHT gekündigt.',
    dangerZoneFooter:
      'Das Löschen deines Kontos ist dauerhaft. Aktive Abonnements werden dadurch NICHT gekündigt.',
    resetOnboarding: 'Onboarding zurücksetzen',

    // Version
    version: 'Version',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI App Supportanfrage',
      body: 'Hallo,\n\nich benötige Hilfe mit der Tattoo Design AI App.\n\n{{userInfo}}\n\nBeschreibung:\n[Bitte beschreibe dein Problem hier]\n\nDanke!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI Feature-Vorschlag Hilfe',
      body: 'Hallo,\n\nich benötige Hilfe beim Einreichen eines Feature-Vorschlags.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI Feedback',
      body: 'Hallo!\n\nIch habe Feedback zu Tattoo Design AI:\n\n[Dein Feedback hier]{{userInfo}}\n\nDanke!',
    },
    artist: {
      subject: 'Bist du Künstler? - Tattoo Design AI',
      body: 'Hallo!\n\nIch interessiere mich für eine Zusammenarbeit oder habe Vorschläge/Beschwerden.\n\n{{userInfo}}\n\n[Bitte teile deine Vorschläge, Beschwerden oder erzähle uns von dir als Künstler]\n\nDanke!',
    },
    userIdLabel: 'Benutzer-ID: {{id}}',
    emailLabel: 'E-Mail: {{email}}',
    accountLabel: 'Meine Konto-E-Mail: {{email}}',
    myUserIdLabel: 'Meine Benutzer-ID: {{id}}',
    accountInfo: '\n\nKonto: {{email}}',
  },

  notFound: {
    title: 'Hoppla!',
    description: 'Dieser Bildschirm existiert nicht.',
    goHome: 'Zum Startbildschirm!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Los geht\'s',
    photoAccessDescription:
      'Wir benötigen Zugriff auf deine Fotos, um Bilder hinzuzufügen',
    photoAccessDeniedTitle: 'Fotozugriff benötigt',
    photoAccessDeniedDescription:
      'Diese Funktion benötigt Zugriff auf deine Fotobibliothek, um deine Tattoos anzusehen und zu speichern. Du kannst den Fotozugriff in deinen Geräteeinstellungen verwalten.',
    photoLibraryNeeded:
      'Wir benötigen Zugriff auf deine Fotobibliothek, damit du deine Tattoos ansehen und speichern kannst.',

    // Camera
    cameraAccessTitle: 'Los geht\'s',
    cameraAccessDescription:
      'Wir benötigen Zugriff auf deine Kamera, um Fotos aufzunehmen.',
    cameraAccessDeniedTitle: 'Kamerazugriff benötigt',
    cameraAccessDeniedDescription:
      'Diese Funktion benötigt Zugriff auf deine Kamera. Du kannst den Kamerazugriff in deinen Geräteeinstellungen verwalten.',
  },
};
