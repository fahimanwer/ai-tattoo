/**
 * Croatian translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const hrCore = {
  common: {
    // Actions
    loading: 'Učitavanje...',
    error: 'Greška',
    success: 'Uspjeh',
    cancel: 'Odustani',
    confirm: 'Potvrdi',
    save: 'Spremi',
    done: 'Gotovo',
    close: 'Zatvori',
    back: 'Natrag',
    next: 'Dalje',
    skip: 'Preskoči',
    continue: 'Nastavi',
    retry: 'Pokušaj ponovo',
    delete: 'Izbriši',
    edit: 'Uredi',
    share: 'Podijeli',
    send: 'Pošalji',
    search: 'Traži',
    seeAll: 'Pogledaj sve',
    tryAgain: 'Pokušaj ponovo',
    ok: 'U redu',
    yes: 'Da',
    no: 'Ne',
    or: 'ili',
    upgrade: 'Nadogradi',
    processing: 'Obrada...',
    openSettings: 'Otvori postavke',
    readMore: 'Pročitaj više',
    createTattoo: 'Kreiraj tetovažu',
    style: 'Stil',

    // States
    on: 'Uključeno',
    off: 'Isključeno',
    enabled: 'Omogućeno',
    disabled: 'Onemogućeno',

    // Errors
    somethingWentWrong: 'Nešto je pošlo po krivu',
    unexpectedError: 'Došlo je do neočekivane greške',
  },

  tabs: {
    home: 'Početna',
    explore: 'Istraži',
    myTattoos: 'Moje tetovaže',
    profile: 'Profil',
    tryOnTattoo: 'Isprobaj tetovažu',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Dobro došli natrag!',
    signInDescription: 'Odaberite željeni način prijave',
    signIn: 'Prijavi se',
    alreadyHaveAccount: 'Već imate račun? ',
    termsOfService: 'Uvjeti korištenja',
    privacyPolicy: 'Pravila privatnosti',
    byContinuingAgree: 'Nastavkom se slažete s našim ',
    inkognitoMode: 'Ink-ognito način',
    inkognitoDescription: 'Vaši dizajni ostaju s vama, ne s nama.',
    signInToContinue:
      'Prijavite se za nastavak i izradu vaše tetovaže!',
    signInBenefit:
      'Prijavom možemo pratiti vaše besplatne generacije tetovaža i osigurati da je vaš račun ispravno postavljen.',
    notSignedIn: '(Niste prijavljeni)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Račun',
    planAndUsage: 'Plan i korištenje',
    settings: 'Postavke',
    support: 'Podrška',
    legal: 'Pravne informacije',
    dangerZone: 'Opasna zona',
    supportAndFeedback: 'Podrška i povratne informacije',
    followUs: 'Pratite nas',

    // Sign-in prompt
    notSignedIn: 'Niste prijavljeni',
    signInPrompt:
      'Prijavite se za pristup detaljima računa, informacijama o pretplati i personaliziranim značajkama',

    // Account
    email: 'E-pošta',
    name: 'Ime',
    model: 'Model',
    userId: 'ID korisnika',
    memberSince: 'Član od',
    signOut: 'Odjavi se',
    logOut: 'Odjavi se',
    signOutConfirmTitle: 'Odjava',
    signOutConfirmMessage: 'Jeste li sigurni da se želite odjaviti?',
    unknownUser: 'Nepoznati korisnik',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Aktivno razdoblje korištenja',
    currentPlan: 'Trenutni plan',
    planDetails: 'Detalji plana',
    status: 'Status',
    renewsOn: 'Obnavlja se',
    expiresOn: 'Istječe',
    daysRemaining: 'Preostali dani',
    daysValue: '{{count}} dana',
    price: 'Cijena',
    billingPeriod: 'Razdoblje naplate',
    managePlan: 'Upravljaj planom',
    upgradePlan: 'Nadogradi plan',
    upgradeNow: 'Nadogradi odmah',
    limitReachedFooter:
      'Dosegnuli ste ograničenje generiranja. Nadogradite za nastavak.',
    noSubscription: 'Nema pretplate',
    cancelledActive: 'Otkazano (aktivno)',
    cancelledActiveUntilExpiration: 'Otkazano (aktivno do isteka)',
    activeUntilExpiration: 'Aktivno do isteka',
    accessEndsOn: 'Pristup završava',
    autoRenew: 'Automatsko obnavljanje',
    cancelledAt: 'Otkazano',
    expiredOn: 'Isteklo',
    refreshing: 'Osvježavanje...',
    refreshData: 'Osvježi podatke',
    limitReachedFooterLong:
      'Dosegnuli ste ograničenje AI generiranja tetovaža za ovaj plan. Nadogradite za nastavak kreiranja tetovaža ili nas kontaktirajte.',
    weMissYouFooter:
      'Spremni za stvaranje još nevjerojatnih tetovaža? Vratite se i zajedno dizajnirajmo nešto nevjerojatno.',
    unknown: 'Nepoznato',
    free: 'Besplatno',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Aktivno',
    expired: 'Isteklo',
    cancelled: 'Otkazano',
    generationsUsed: 'Korištene generacije',
    generationsRemaining: 'Preostale generacije',
    unlimited: 'Neograničeno',
    na: 'N/A',

    // We Miss You
    weMissYou: 'Nedostajete nam!',
    previousPlan: 'Prethodni plan',
    comeBackAndCreate: 'Vratite se i stvarajte',

    // Enjoying the app
    enjoyingApp: 'Uživate u aplikaciji?',
    enjoyingAppDescription:
      'Ako uživate u Tattoo Design AI, recenzija pomaže drugim ljubiteljima tetovaža da nas otkriju. Također nam se slobodno javite s povratnim informacijama ili idejama za značajke.',
    rateOnPlayStore: 'Ocijenite na Play Storeu',
    rateOnAppStore: 'Ocijenite na App Storeu',
    sendFeedback: 'Pošalji povratne informacije',

    // Are you an artist
    areYouArtist: 'Jeste li umjetnik?',
    artistDescription:
      'Zainteresirani ste za suradnju? Imate prijedloge ili pritužbe? Voljeli bismo čuti od vas!',
    writeToUs: 'Pišite nam',

    // Support
    contactSupport: 'Kontaktirajte podršku',
    requestFeature: 'Zatražite značajku',
    rateApp: 'Ocijenite aplikaciju',
    shareApp: 'Podijelite aplikaciju',
    shareWithFriends: 'Podijelite s prijateljima',
    shareMessage: 'Pogledajte Tattoo Design AI \n',

    // Settings
    appearance: 'Izgled',
    light: 'Svijetlo',
    dark: 'Tamno',
    system: 'Sustav',
    language: 'Jezik',
    languageAuto: 'Automatski (sustav)',
    showOnboarding: 'Prikaži uvodni vodič',
    promptEnhancement: 'Poboljšanje upita',
    promptEnhancementDisabledTitle: 'Poboljšanje upita onemogućeno',
    promptEnhancementDisabledMessage:
      'Rezultati mogu varirati bez poboljšanja. Uključite ga natrag bilo kada.',

    // Legal
    termsOfService: 'Uvjeti korištenja',
    privacyPolicy: 'Pravila privatnosti',

    // Danger
    deleteAccount: 'Izbriši račun',
    deleteAccountConfirmTitle: 'Izbriši račun',
    deleteAccountConfirmMessage:
      'Jeste li sigurni? Ovo se ne može poništiti. Napomena: ovo NE otkazuje aktivne pretplate.',
    dangerZoneFooter:
      'Brisanje računa je trajno. Ovo NE otkazuje aktivne pretplate.',
    resetOnboarding: 'Resetiraj uvodni vodič',

    // Version
    version: 'Verzija',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI zahtjev za podršku',
      body: 'Pozdrav,\n\nTrebam pomoć s aplikacijom Tattoo Design AI.\n\n{{userInfo}}\n\nOpis:\n[Molimo opišite svoj problem ovdje]\n\nHvala!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI pomoć za zahtjev značajke',
      body: 'Pozdrav,\n\nTrebam pomoć s podnošenjem zahtjeva za značajku.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI povratne informacije',
      body: 'Pozdrav!\n\nImam povratne informacije o Tattoo Design AI:\n\n[Vaše povratne informacije ovdje]{{userInfo}}\n\nHvala!',
    },
    artist: {
      subject: 'Jeste li umjetnik? - Tattoo Design AI',
      body: 'Pozdrav!\n\nZainteresiran/a sam za suradnju ili imam prijedloge/pritužbe.\n\n{{userInfo}}\n\n[Molimo podijelite svoje prijedloge, pritužbe ili nam recite nešto o sebi kao umjetniku]\n\nHvala!',
    },
    userIdLabel: 'ID korisnika: {{id}}',
    emailLabel: 'E-pošta: {{email}}',
    accountLabel: 'E-pošta mog računa: {{email}}',
    myUserIdLabel: 'Moj ID korisnika: {{id}}',
    accountInfo: '\n\nRačun: {{email}}',
  },

  notFound: {
    title: 'Ups!',
    description: 'Ovaj zaslon ne postoji.',
    goHome: 'Idi na početni zaslon!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Započnimo',
    photoAccessDescription:
      'Potreban nam je pristup vašim fotografijama za dodavanje slika',
    photoAccessDeniedTitle: 'Potreban pristup fotografijama',
    photoAccessDeniedDescription:
      'Ova značajka zahtijeva pristup vašoj biblioteci fotografija za pregled i spremanje vaših tetovaža. Pristup fotografijama možete upravljati u postavkama uređaja.',
    photoLibraryNeeded:
      'Potreban nam je pristup vašoj biblioteci fotografija kako biste mogli pregledavati i spremati vaše tetovaže.',

    // Camera
    cameraAccessTitle: 'Započnimo',
    cameraAccessDescription:
      'Potreban nam je pristup vašoj kameri za fotografiranje.',
    cameraAccessDeniedTitle: 'Potreban pristup kameri',
    cameraAccessDeniedDescription:
      'Ova značajka zahtijeva pristup vašoj kameri. Pristup kameri možete upravljati u postavkama uređaja.',
  },
};
