/**
 * Hungarian translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const huCore = {
  common: {
    // Actions
    loading: 'Betoltes...',
    error: 'Hiba',
    success: 'Sikeres',
    cancel: 'Megse',
    confirm: 'Megerosites',
    save: 'Mentes',
    done: 'Kesz',
    close: 'Bezaras',
    back: 'Vissza',
    next: 'Kovetkezo',
    skip: 'Kihagy',
    continue: 'Folytatas',
    retry: 'Ujraproba',
    delete: 'Torles',
    edit: 'Szerkesztes',
    share: 'Megosztas',
    send: 'Kuldes',
    search: 'Kereses',
    seeAll: 'Osszes megtekintese',
    tryAgain: 'Probald ujra',
    ok: 'OK',
    yes: 'Igen',
    no: 'Nem',
    or: 'vagy',
    upgrade: 'Frissites',
    processing: 'Feldolgozas...',
    openSettings: 'Beallitasok megnyitasa',
    readMore: 'Tovabb olvasom',
    createTattoo: 'Tetovalas keszitese',
    style: 'Stilus',

    // States
    on: 'Be',
    off: 'Ki',
    enabled: 'Engedelyezve',
    disabled: 'Letiltva',

    // Errors
    somethingWentWrong: 'Valami hiba tortent',
    unexpectedError: 'Varatlan hiba tortent',
  },

  tabs: {
    home: 'Fooldal',
    explore: 'Felfedezes',
    myTattoos: 'Tetovalasaim',
    profile: 'Profil',
    tryOnTattoo: 'Tetovalas felprobalasa',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Ujra itt vagy!',
    signInDescription:
      'Kerlek valaszd ki a preferalt bejelentkezesi modszered',
    signIn: 'Bejelentkezes',
    alreadyHaveAccount: 'Mar van fiokod? ',
    termsOfService: 'Felhasznalasi feltetelek',
    privacyPolicy: 'Adatvedelmi iranyelv',
    byContinuingAgree: 'A folytatassal elfogadod a ',
    inkognitoMode: 'Ink-ognito mod',
    inkognitoDescription:
      'A terveid nalad maradnak, nem nalunk.',
    signInToContinue:
      'Kerlek jelentkezz be a folytatashoz es a tetovalasod elkeszitesehez!',
    signInBenefit:
      'A bejelentkezessel nyomon kovethetjuk az ingyenes tetovalas-generarasaidat es biztositjuk a fiokod megfelelo beallitasat.',
    notSignedIn: '(Nincs bejelentkezve)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Fiok',
    planAndUsage: 'Csomag es hasznalat',
    settings: 'Beallitasok',
    support: 'Tamogatas',
    legal: 'Jogi informaciok',
    dangerZone: 'Veszelyes zona',
    supportAndFeedback: 'Tamogatas es visszajelzes',
    followUs: 'Kovess minket',

    // Sign-in prompt
    notSignedIn: 'Nincs bejelentkezve',
    signInPrompt:
      'Jelentkezz be a fiokadataid, elofizetesi informacioid es szemelyre szabott funkcioid eleresehez',

    // Account
    email: 'E-mail',
    name: 'Nev',
    model: 'Modell',
    userId: 'Felhasznaloi azonosito',
    memberSince: 'Tag ota',
    signOut: 'Kijelentkezes',
    logOut: 'Kijelentkezes',
    signOutConfirmTitle: 'Kijelentkezes',
    signOutConfirmMessage:
      'Biztosan ki szeretnel jelentkezni?',
    unknownUser: 'Ismeretlen felhasznalo',

    // Plan
    plan: 'Csomag',
    activeUsagePeriod: 'Aktiv hasznalati idoszak',
    currentPlan: 'Jelenlegi csomag',
    planDetails: 'Csomag reszletei',
    status: 'Allapot',
    renewsOn: 'Megujulas datuma',
    expiresOn: 'Lejarati datum',
    daysRemaining: 'Hatralevo napok',
    daysValue: '{{count}} nap',
    price: 'Ar',
    billingPeriod: 'Szamlazasi idoszak',
    managePlan: 'Csomag kezelese',
    upgradePlan: 'Csomag frissitese',
    upgradeNow: 'Frissites most',
    limitReachedFooter:
      'Elereted a generalasi limitedet. Frissits a folytatashoz.',
    noSubscription: 'Nincs elofizetes',
    cancelledActive: 'Lemondva (Aktiv)',
    cancelledActiveUntilExpiration: 'Lemondva (Aktiv a lejaratig)',
    activeUntilExpiration: 'Aktiv a lejaratig',
    accessEndsOn: 'Hozzaferes vege',
    autoRenew: 'Automatikus megujitas',
    cancelledAt: 'Lemondva',
    expiredOn: 'Lejart',
    refreshing: 'Frissites...',
    refreshData: 'Adatok frissitese',
    limitReachedFooterLong:
      'Elereted az AI tetovalas-generalasi limitedet erre a csomagra. Frissits a folytatashoz vagy lepj velunk kapcsolatba.',
    weMissYouFooter:
      'Kesz vagy tobb csodas tetovalast kesziteni? Gyere vissza es tervezzunk valami hihetetlent egyutt.',
    unknown: 'Ismeretlen',
    free: 'Ingyenes',
    pro: 'Pro',
    active: 'Aktiv',
    expired: 'Lejart',
    cancelled: 'Lemondva',
    generationsUsed: 'Felhasznalt generalasok',
    generationsRemaining: 'Hatralevo generalasok',
    unlimited: 'Korlatlan',
    na: 'N/A',

    // We Miss You
    weMissYou: 'Hianyzol nekunk!',
    previousPlan: 'Elozo csomag',
    comeBackAndCreate: 'Gyere vissza es alkoss',

    // Enjoying the app
    enjoyingApp: 'Tetszik az alkalmazas?',
    enjoyingAppDescription:
      'Ha tetszik a Tattoo Design AI, egy ertekeles segit mas tetovalas-rajongoknak felfedezni minket. Barmikor irj nekunk visszajelzest vagy otleteket is.',
    rateOnPlayStore: 'Ertekelj a Play Store-ban',
    rateOnAppStore: 'Ertekelj az App Store-ban',
    sendFeedback: 'Visszajelzes kuldese',

    // Are you an artist
    areYouArtist: 'Muvesz vagy?',
    artistDescription:
      'Erdekel az egyuttmukodes? Vannak javaslataid vagy panaszaid? Orommel hallanank rolad!',
    writeToUs: 'Irj nekunk',

    // Support
    contactSupport: 'Kapcsolatfelvetel a tamogatassal',
    requestFeature: 'Funkcio kerese',
    rateApp: 'Alkalmazas ertekelese',
    shareApp: 'Alkalmazas megosztasa',
    shareWithFriends: 'Megosztas baratokkal',
    shareMessage: 'Nezd meg a Tattoo Design AI-t \n',

    // Settings
    appearance: 'Megjelenes',
    light: 'Vilagos',
    dark: 'Sotet',
    system: 'Rendszer',
    language: 'Nyelv',
    languageAuto: 'Automatikus (Rendszer)',
    showOnboarding: 'Bevezeto mutatasa',
    promptEnhancement: 'Prompt javitasa',
    promptEnhancementDisabledTitle: 'Prompt javitas kikapcsolva',
    promptEnhancementDisabledMessage:
      'Az eredmenyek javitas nelkul valtozhatnak. Barmikor visszakapcsolhatod.',

    // Legal
    termsOfService: 'Felhasznalasi feltetelek',
    privacyPolicy: 'Adatvedelmi iranyelv',

    // Danger
    deleteAccount: 'Fiok torlese',
    deleteAccountConfirmTitle: 'Fiok torlese',
    deleteAccountConfirmMessage:
      'Biztos vagy benne? Ez nem vonhato vissza. Megjegyzes: ez NEM mondja le az aktiv elofizeteseket.',
    dangerZoneFooter:
      'A fiok torlese vegleges. Ez NEM mondja le az aktiv elofizeteseket.',
    resetOnboarding: 'Bevezeto visszaallitasa',

    // Version
    version: 'Verzio',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI alkalmazas tamogatasi kerelem',
      body: 'Szia,\n\nSegitsegre van szuksegem a Tattoo Design AI alkalmazassal kapcsolatban.\n\n{{userInfo}}\n\nLeiras:\n[Kerlek ird le a problemad itt]\n\nKoszonom!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI funkcio kerelmi segitseg',
      body: 'Szia,\n\nSegitsegre van szuksegem egy funkcio kerelem benyujtasaval kapcsolatban.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI visszajelzes',
      body: 'Szia!\n\nVisszajelzesem van a Tattoo Design AI-rol:\n\n[A visszajelzesed ide]{{userInfo}}\n\nKoszonom!',
    },
    artist: {
      subject: 'Muvesz vagy? - Tattoo Design AI',
      body: 'Szia!\n\nErdekel az egyuttmukodes, vagy javaslatokat/panaszokat szeretnek megosztani.\n\n{{userInfo}}\n\n[Kerlek oszd meg a javaslataidat, panaszaidat, vagy meseld el magadrol mint muvesz]\n\nKoszonom!',
    },
    userIdLabel: 'Felhasznaloi azonosito: {{id}}',
    emailLabel: 'E-mail: {{email}}',
    accountLabel: 'A fiokom e-mailje: {{email}}',
    myUserIdLabel: 'Az en felhasznaloi azonositom: {{id}}',
    accountInfo: '\n\nFiok: {{email}}',
  },

  notFound: {
    title: 'Huppsz!',
    description: 'Ez a kepernyo nem letezik.',
    goHome: 'Vissza a fookepernyre!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Kezdjuk el',
    photoAccessDescription:
      'Szuksegunk van a fotoidhoz valo hozzaferesre kepek hozzaadasahoz',
    photoAccessDeniedTitle: 'Foto hozzaferes szukseges',
    photoAccessDeniedDescription:
      'Ez a funkcio hozzaferest igenyel a fotokonywtaradhoz a tetovalasaid megtekintegesehez es mentesehez. A foto hozzaferest az eszkoz beallitasaiban kezelheted.',
    photoLibraryNeeded:
      'Szuksegunk van a fotokonywtaradhoz valo hozzaferesre, hogy megtekinthesd es mentsd a tetovalasaidat.',

    // Camera
    cameraAccessTitle: 'Kezdjuk el',
    cameraAccessDescription:
      'Szuksegunk van a kamerahoz valo hozzaferesre fotok keszitesehez.',
    cameraAccessDeniedTitle: 'Kamera hozzaferes szukseges',
    cameraAccessDeniedDescription:
      'Ez a funkcio kamera hozzaferest igenyel. A kamera hozzaferest az eszkoz beallitasaiban kezelheted.',
  },
};
