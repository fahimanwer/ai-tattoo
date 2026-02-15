/**
 * Czech translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const csCore = {
  common: {
    // Actions
    loading: 'Nacitani...',
    error: 'Chyba',
    success: 'Uspech',
    cancel: 'Zrusit',
    confirm: 'Potvrdit',
    save: 'Ulozit',
    done: 'Hotovo',
    close: 'Zavrit',
    back: 'Zpet',
    next: 'Dalsi',
    skip: 'Preskocit',
    continue: 'Pokracovat',
    retry: 'Zkusit znovu',
    delete: 'Smazat',
    edit: 'Upravit',
    share: 'Sdilet',
    send: 'Odeslat',
    search: 'Hledat',
    seeAll: 'Zobrazit vse',
    tryAgain: 'Zkusit znovu',
    ok: 'OK',
    yes: 'Ano',
    no: 'Ne',
    or: 'nebo',
    upgrade: 'Upgradovat',
    processing: 'Zpracovani...',
    openSettings: 'Otevrit nastaveni',
    readMore: 'Vice informaci',
    createTattoo: 'Vytvorit tetovani',
    style: 'Styl',

    // States
    on: 'Zapnuto',
    off: 'Vypnuto',
    enabled: 'Povoleno',
    disabled: 'Zakazano',

    // Errors
    somethingWentWrong: 'Neco se pokazilo',
    unexpectedError: 'Doslo k neocekavane chybe',
  },

  tabs: {
    home: 'Domov',
    explore: 'Prozkoumat',
    myTattoos: 'Moje tetovani',
    profile: 'Profil',
    tryOnTattoo: 'Vyzkouset tetovani',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Vitejte zpet!',
    signInDescription: 'Vyberte si preferovany zpusob prihlaseni',
    signIn: 'Prihlasit se',
    alreadyHaveAccount: 'Uz mate ucet? ',
    termsOfService: 'Podminky sluzby',
    privacyPolicy: 'Zasady ochrany soukromi',
    byContinuingAgree: 'Pokracovanim souhlasite s nasimi ',
    inkognitoMode: 'Ink-ognito rezim',
    inkognitoDescription: 'Vase navrhy zustanou u vas, ne u nas.',
    signInToContinue:
      'Pro pokracovani se prosim prihlaste a nechte si vytvorit tetovani!',
    signInBenefit:
      'Prihlasenim muzeme sledovat vase bezplatne generovani tetovani a zajistit spravne nastaveni uctu.',
    notSignedIn: '(Neprihlaseno)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Ucet',
    planAndUsage: 'Plan a pouziti',
    settings: 'Nastaveni',
    support: 'Podpora',
    legal: 'Pravni informace',
    dangerZone: 'Nebezpecna zona',
    supportAndFeedback: 'Podpora a zpetna vazba',
    followUs: 'Sledujte nas',

    // Sign-in prompt
    notSignedIn: 'Neprihlaseno',
    signInPrompt:
      'Prihlaste se pro pristup k udajum uctu, informacim o predplatnem a personalizovanym funkcim',

    // Account
    email: 'E-mail',
    name: 'Jmeno',
    model: 'Model',
    userId: 'ID uzivatele',
    memberSince: 'Clenem od',
    signOut: 'Odhlasit se',
    logOut: 'Odhlasit se',
    signOutConfirmTitle: 'Odhlaseni',
    signOutConfirmMessage: 'Opravdu se chcete odhlasit?',
    unknownUser: 'Neznamy uzivatel',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Aktivni obdobi pouzivani',
    currentPlan: 'Aktualni plan',
    planDetails: 'Podrobnosti planu',
    status: 'Stav',
    renewsOn: 'Obnovi se',
    expiresOn: 'Vyprsi',
    daysRemaining: 'Zbyvajicich dni',
    daysValue: '{{count}} dni',
    price: 'Cena',
    billingPeriod: 'Fakturacni obdobi',
    managePlan: 'Spravovat plan',
    upgradePlan: 'Upgradovat plan',
    upgradeNow: 'Upgradovat nyni',
    limitReachedFooter:
      'Dosahli jste limitu generovani. Upgradujte pro pokracovani.',
    noSubscription: 'Zadne predplatne',
    cancelledActive: 'Zruseno (aktivni)',
    cancelledActiveUntilExpiration: 'Zruseno (aktivni do expirace)',
    activeUntilExpiration: 'Aktivni do expirace',
    accessEndsOn: 'Pristup konci',
    autoRenew: 'Automaticke obnoveni',
    cancelledAt: 'Zruseno dne',
    expiredOn: 'Vyprselo dne',
    refreshing: 'Aktualizace...',
    refreshData: 'Aktualizovat data',
    limitReachedFooterLong:
      'Dosahli jste limitu generovani AI tetovani pro tento plan. Upgradujte pro pokracovani v tvorbe tetovani nebo nas kontaktujte.',
    weMissYouFooter:
      'Jste pripraveni tvorit dalsi uzasna tetovani? Vradte se a pojdme spolecne navrhnout neco neobyckejneho.',
    unknown: 'Neznamy',
    free: 'Zdarma',
    pro: 'Pro',
    active: 'Aktivni',
    expired: 'Vyprselo',
    cancelled: 'Zruseno',
    generationsUsed: 'Pouzita generovani',
    generationsRemaining: 'Zbyvajici generovani',
    unlimited: 'Neomezene',
    na: 'Neni k dispozici',

    // We Miss You
    weMissYou: 'Chybite nam!',
    previousPlan: 'Predchozi plan',
    comeBackAndCreate: 'Vradte se a tvorte',

    // Enjoying the app
    enjoyingApp: 'Libi se vam aplikace?',
    enjoyingAppDescription:
      'Pokud se vam Tattoo Design AI libi, recenze pomuze ostatnim milovnikum tetovani nas objevit. Muzete nas take kdykoliv kontaktovat se zpetnou vazbou nebo napady na funkce.',
    rateOnPlayStore: 'Ohodnotit na Play Store',
    rateOnAppStore: 'Ohodnotit na App Store',
    sendFeedback: 'Poslat zpetnou vazbu',

    // Are you an artist
    areYouArtist: 'Jste umelec?',
    artistDescription:
      'Mate zajem o spolupraci? Mate navrhy nebo stiznosti? Radi si vas vyslechneme!',
    writeToUs: 'Napiste nam',

    // Support
    contactSupport: 'Kontaktovat podporu',
    requestFeature: 'Navrhnout funkci',
    rateApp: 'Ohodnotit aplikaci',
    shareApp: 'Sdilet aplikaci',
    shareWithFriends: 'Sdilet s prateli',
    shareMessage: 'Podivejte se na Tattoo Design AI \n',

    // Settings
    appearance: 'Vzhled',
    light: 'Svetly',
    dark: 'Tmavy',
    system: 'System',
    language: 'Jazyk',
    languageAuto: 'Automaticky (system)',
    showOnboarding: 'Zobrazit uvodni pruvodce',
    promptEnhancement: 'Vylepseni promptu',
    promptEnhancementDisabledTitle: 'Vylepseni promptu vypnuto',
    promptEnhancementDisabledMessage:
      'Vysledky se mohou lisit bez vylepseni. Zapnete ho kdykoliv zpet.',

    // Legal
    termsOfService: 'Podminky sluzby',
    privacyPolicy: 'Zasady ochrany soukromi',

    // Danger
    deleteAccount: 'Smazat ucet',
    deleteAccountConfirmTitle: 'Smazat ucet',
    deleteAccountConfirmMessage:
      'Jste si jisti? Tuto akci nelze vratit zpet. Poznamka: toto NERUSI aktivni predplatna.',
    dangerZoneFooter:
      'Smazani uctu je trvale. Toto NERUSI aktivni predplatna.',
    resetOnboarding: 'Obnovit uvodni pruvodce',

    // Version
    version: 'Verze',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI - Zadost o podporu',
      body: 'Dobry den,\n\nPotrebuji pomoc s aplikaci Tattoo Design AI.\n\n{{userInfo}}\n\nPopis:\n[Popiste prosim svuj problem]\n\nDekuji!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI - Navrh funkce',
      body: 'Dobry den,\n\nPotrebuji pomoc s odeslanim navrhu funkce.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI - Zpetna vazba',
      body: 'Dobry den!\n\nMam zpetnou vazbu k Tattoo Design AI:\n\n[Vase zpetna vazba]{{userInfo}}\n\nDekuji!',
    },
    artist: {
      subject: 'Jste umelec? - Tattoo Design AI',
      body: 'Dobry den!\n\nMam zajem o spolupraci nebo mam navrhy/stiznosti.\n\n{{userInfo}}\n\n[Podelte se prosim o sve navrhy, stiznosti nebo nam recknete o sobe jako umelci]\n\nDekuji!',
    },
    userIdLabel: 'ID uzivatele: {{id}}',
    emailLabel: 'E-mail: {{email}}',
    accountLabel: 'E-mail meho uctu: {{email}}',
    myUserIdLabel: 'Moje ID uzivatele: {{id}}',
    accountInfo: '\n\nUcet: {{email}}',
  },

  notFound: {
    title: 'Jejda!',
    description: 'Tato obrazovka neexistuje.',
    goHome: 'Prejit na domovskou obrazovku!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Zacneme',
    photoAccessDescription:
      'Pro pridani obrazku potrebujeme pristup k vasim fotkam',
    photoAccessDeniedTitle: 'Potrebujeme pristup k fotkam',
    photoAccessDeniedDescription:
      'Tato funkce vyzaduje pristup k vasi knihovne fotek pro zobrazeni a ulozeni vasich tetovani. Pristup k fotkam muzete spravovat v nastaveni zarizeni.',
    photoLibraryNeeded:
      'Potrebujeme pristup k vasi knihovne fotek, abyste mohli zobrazovat a ukladat svoja tetovani.',

    // Camera
    cameraAccessTitle: 'Zacneme',
    cameraAccessDescription:
      'Pro foceni potrebujeme pristup k vasi kamere.',
    cameraAccessDeniedTitle: 'Potrebujeme pristup ke kamere',
    cameraAccessDeniedDescription:
      'Tato funkce vyzaduje pristup k vasi kamere. Pristup ke kamere muzete spravovat v nastaveni zarizeni.',
  },
};
