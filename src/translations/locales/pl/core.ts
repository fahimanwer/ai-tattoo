/**
 * Polish translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const plCore = {
  common: {
    // Actions
    loading: 'Wczytywanie...',
    error: 'Blad',
    success: 'Sukces',
    cancel: 'Anuluj',
    confirm: 'Potwierdz',
    save: 'Zapisz',
    done: 'Gotowe',
    close: 'Zamknij',
    back: 'Wstecz',
    next: 'Dalej',
    skip: 'Pomin',
    continue: 'Kontynuuj',
    retry: 'Ponow',
    delete: 'Usun',
    edit: 'Edytuj',
    share: 'Udostepnij',
    send: 'Wyslij',
    search: 'Szukaj',
    seeAll: 'Zobacz wszystko',
    tryAgain: 'Sprobuj ponownie',
    ok: 'OK',
    yes: 'Tak',
    no: 'Nie',
    or: 'lub',
    upgrade: 'Ulepsz',
    processing: 'Przetwarzanie...',
    openSettings: 'Otworz ustawienia',
    readMore: 'Czytaj wiecej',
    createTattoo: 'Stworz tatuaz',
    style: 'Styl',

    // States
    on: 'Wlaczony',
    off: 'Wylaczony',
    enabled: 'Aktywne',
    disabled: 'Nieaktywne',

    // Errors
    somethingWentWrong: 'Cos poszlo nie tak',
    unexpectedError: 'Wystapil nieoczekiwany blad',
  },

  tabs: {
    home: 'Glowna',
    explore: 'Odkrywaj',
    myTattoos: 'Moje tatuaze',
    profile: 'Profil',
    tryOnTattoo: 'Przymierz tatuaz',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Witaj ponownie!',
    signInDescription: 'Wybierz preferowana metode logowania',
    signIn: 'Zaloguj sie',
    alreadyHaveAccount: 'Masz juz konto? ',
    termsOfService: 'Regulamin',
    privacyPolicy: 'Polityka prywatnosci',
    byContinuingAgree: 'Kontynuujac, akceptujesz nasz ',
    inkognitoMode: 'Ink-ognito mode',
    inkognitoDescription: 'Twoje projekty zostaja z Toba, nie z nami.',
    signInToContinue:
      'Zaloguj sie, aby kontynuowac i stworzyc swoj tatuaz!',
    signInBenefit:
      'Logujac sie, mozemy sledzic Twoje darmowe generacje tatuazy i upewnic sie, ze Twoje konto jest poprawnie skonfigurowane.',
    notSignedIn: '(Niezalogowany)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Konto',
    planAndUsage: 'Plan i uzycie',
    settings: 'Ustawienia',
    support: 'Wsparcie',
    legal: 'Prawne',
    dangerZone: 'Strefa zagrozen',
    supportAndFeedback: 'Wsparcie i opinie',
    followUs: 'Obserwuj nas',

    // Sign-in prompt
    notSignedIn: 'Niezalogowany',
    signInPrompt:
      'Zaloguj sie, aby uzyskac dostep do szczegolowych informacji o koncie, subskrypcji i spersonalizowanych funkcji',

    // Account
    email: 'E-mail',
    name: 'Imie',
    model: 'Model',
    userId: 'ID uzytkownika',
    memberSince: 'Czlonek od',
    signOut: 'Wyloguj sie',
    logOut: 'Wyloguj sie',
    signOutConfirmTitle: 'Wyloguj sie',
    signOutConfirmMessage: 'Czy na pewno chcesz sie wylogowac?',
    unknownUser: 'Nieznany uzytkownik',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Aktywny okres uzytkowania',
    currentPlan: 'Aktualny plan',
    planDetails: 'Szczegoly planu',
    status: 'Status',
    renewsOn: 'Odnowienie',
    expiresOn: 'Wygasa',
    daysRemaining: 'Pozostalo dni',
    daysValue: '{{count}} dni',
    price: 'Cena',
    billingPeriod: 'Okres rozliczeniowy',
    managePlan: 'Zarzadzaj planem',
    upgradePlan: 'Ulepsz plan',
    upgradeNow: 'Ulepsz teraz',
    limitReachedFooter:
      'Osiagnales limit generacji. Ulepsz plan, aby kontynuowac.',
    noSubscription: 'Brak subskrypcji',
    cancelledActive: 'Anulowana (aktywna)',
    cancelledActiveUntilExpiration: 'Anulowana (aktywna do wygasniecia)',
    activeUntilExpiration: 'Aktywna do wygasniecia',
    accessEndsOn: 'Dostep konczy sie',
    autoRenew: 'Automatyczne odnawianie',
    cancelledAt: 'Anulowana',
    expiredOn: 'Wygasla',
    refreshing: 'Odswiezanie...',
    refreshData: 'Odswiez dane',
    limitReachedFooterLong:
      'Osiagnales limit generacji tatuazy AI w tym planie. Ulepsz plan, aby kontynuowac tworzenie tatuazy lub skontaktuj sie z nami.',
    weMissYouFooter:
      'Gotowy, by tworzyc wiecej niesamowitych tatuazy? Wroc i zaprojektujmy razem cos wspanialego.',
    unknown: 'Nieznany',
    free: 'Darmowy',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Aktywny',
    expired: 'Wygasly',
    cancelled: 'Anulowany',
    generationsUsed: 'Wykorzystane generacje',
    generationsRemaining: 'Pozostale generacje',
    unlimited: 'Bez limitu',
    na: 'Nie dotyczy',

    // We Miss You
    weMissYou: 'Tesknimy za Toba!',
    previousPlan: 'Poprzedni plan',
    comeBackAndCreate: 'Wroc i twórz',

    // Enjoying the app
    enjoyingApp: 'Podoba Ci sie aplikacja?',
    enjoyingAppDescription:
      'Jesli podoba Ci sie Tattoo Design AI, Twoja recenzja pomoze innym milosnikom tatuazy nas odkryc. Mozesz tez w kazdej chwili przeslac opinie lub pomysly na nowe funkcje.',
    rateOnPlayStore: 'Ocen w Play Store',
    rateOnAppStore: 'Ocen w App Store',
    sendFeedback: 'Wyslij opinie',

    // Are you an artist
    areYouArtist: 'Jestes artystka/artysta?',
    artistDescription:
      'Zainteresowany wspolpraca? Masz sugestie lub uwagi? Chetnie Cie wysluchamy!',
    writeToUs: 'Napisz do nas',

    // Support
    contactSupport: 'Skontaktuj sie z nami',
    requestFeature: 'Zaproponuj funkcje',
    rateApp: 'Ocen aplikacje',
    shareApp: 'Udostepnij aplikacje',
    shareWithFriends: 'Udostepnij znajomym',
    shareMessage: 'Sprawdz Tattoo Design AI \n',

    // Settings
    appearance: 'Wyglad',
    light: 'Jasny',
    dark: 'Ciemny',
    system: 'Systemowy',
    language: 'Jezyk',
    languageAuto: 'Automatyczny (systemowy)',
    showOnboarding: 'Pokaz wprowadzenie',
    promptEnhancement: 'Ulepszanie promptow',
    promptEnhancementDisabledTitle: 'Ulepszanie promptow wylaczone',
    promptEnhancementDisabledMessage:
      'Wyniki moga sie roznic bez ulepszania. Mozesz je wlaczyc ponownie w kazdej chwili.',

    // Legal
    termsOfService: 'Regulamin',
    privacyPolicy: 'Polityka prywatnosci',

    // Danger
    deleteAccount: 'Usun konto',
    deleteAccountConfirmTitle: 'Usun konto',
    deleteAccountConfirmMessage:
      'Czy jestes pewien? Tej operacji nie mozna cofnac. Uwaga: NIE anuluje to aktywnych subskrypcji.',
    dangerZoneFooter:
      'Usuniecie konta jest trwale. NIE anuluje to aktywnych subskrypcji.',
    resetOnboarding: 'Resetuj wprowadzenie',

    // Version
    version: 'Wersja',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI - Prosba o wsparcie',
      body: 'Czesc,\n\nPotrzebuje pomocy z aplikacja Tattoo Design AI.\n\n{{userInfo}}\n\nOpis:\n[Prosze opisac swoj problem tutaj]\n\nDziekuje!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI - Propozycja funkcji',
      body: 'Czesc,\n\nPotrzebuje pomocy z zgloszeniem propozycji funkcji.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI - Opinia',
      body: 'Czesc!\n\nMam opinie na temat Tattoo Design AI:\n\n[Twoja opinia tutaj]{{userInfo}}\n\nDziekuje!',
    },
    artist: {
      subject: 'Jestes artysta? - Tattoo Design AI',
      body: 'Czesc!\n\nJestem zainteresowany/a wspolpraca lub mam sugestie/uwagi.\n\n{{userInfo}}\n\n[Prosze podziel sie swoimi sugestiami, uwagami lub opowiedz o sobie jako artyscie]\n\nDziekuje!',
    },
    userIdLabel: 'ID uzytkownika: {{id}}',
    emailLabel: 'E-mail: {{email}}',
    accountLabel: 'Moj e-mail konta: {{email}}',
    myUserIdLabel: 'Moje ID uzytkownika: {{id}}',
    accountInfo: '\n\nKonto: {{email}}',
  },

  notFound: {
    title: 'Ups!',
    description: 'Ten ekran nie istnieje.',
    goHome: 'Przejdz do ekranu glownego!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Zaczynajmy',
    photoAccessDescription:
      'Potrzebujemy dostepu do Twoich zdjec, aby dodawac obrazy',
    photoAccessDeniedTitle: 'Wymagany dostep do zdjec',
    photoAccessDeniedDescription:
      'Ta funkcja wymaga dostepu do Twojej biblioteki zdjec, aby przegladac i zapisywac tatuaze. Mozesz zarzadzac dostepem do zdjec w ustawieniach urzadzenia.',
    photoLibraryNeeded:
      'Potrzebujemy dostepu do Twojej biblioteki zdjec, abys mogl przegladac i zapisywac tatuaze.',

    // Camera
    cameraAccessTitle: 'Zaczynajmy',
    cameraAccessDescription:
      'Potrzebujemy dostepu do aparatu, aby robic zdjecia.',
    cameraAccessDeniedTitle: 'Wymagany dostep do aparatu',
    cameraAccessDeniedDescription:
      'Ta funkcja wymaga dostepu do aparatu. Mozesz zarzadzac dostepem do aparatu w ustawieniach urzadzenia.',
  },
};
