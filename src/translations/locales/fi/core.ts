/**
 * Finnish translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const fiCore = {
  common: {
    // Actions
    loading: 'Ladataan...',
    error: 'Virhe',
    success: 'Onnistui',
    cancel: 'Peruuta',
    confirm: 'Vahvista',
    save: 'Tallenna',
    done: 'Valmis',
    close: 'Sulje',
    back: 'Takaisin',
    next: 'Seuraava',
    skip: 'Ohita',
    continue: 'Jatka',
    retry: 'Yrita uudelleen',
    delete: 'Poista',
    edit: 'Muokkaa',
    share: 'Jaa',
    send: 'Laheta',
    search: 'Hae',
    seeAll: 'Nayta kaikki',
    tryAgain: 'Yrita uudelleen',
    ok: 'OK',
    yes: 'Kylla',
    no: 'Ei',
    or: 'tai',
    upgrade: 'Paivita',
    processing: 'Kasitellaan...',
    openSettings: 'Avaa asetukset',
    readMore: 'Lue lisaa',
    createTattoo: 'Luo tatuointi',
    style: 'Tyyli',

    // States
    on: 'Paalla',
    off: 'Pois',
    enabled: 'Kaytos',
    disabled: 'Pois kaytosta',

    // Errors
    somethingWentWrong: 'Jokin meni pieleen',
    unexpectedError: 'Odottamaton virhe tapahtui',
  },

  tabs: {
    home: 'Koti',
    explore: 'Tutustu',
    myTattoos: 'Omat tatuoinnit',
    profile: 'Profiili',
    tryOnTattoo: 'Kokeile tatuointia',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Tervetuloa takaisin!',
    signInDescription: 'Valitse haluamasi kirjautumistapa',
    signIn: 'Kirjaudu sisaan',
    alreadyHaveAccount: 'Onko sinulla jo tili? ',
    termsOfService: 'Kayttoehdot',
    privacyPolicy: 'Tietosuojakaytanto',
    byContinuingAgree: 'Jatkamalla hyvaksyt ',
    inkognitoMode: 'Ink-ognito mode',
    inkognitoDescription: 'Suunnitelmasi pysyvat sinulla, eivat meilla.',
    signInToContinue:
      'Kirjaudu sisaan jatkaaksesi ja luodaksesi tatuointisi!',
    signInBenefit:
      'Kirjautumalla voimme seurata ilmaisia tatuointigeneraatioitasi ja varmistaa, etta tilisi on oikein maaritetty.',
    notSignedIn: '(Ei kirjautunut)',
  },

  profile: {
    // Screen header
    title: 'Profiili',

    // Section headers
    account: 'Tili',
    planAndUsage: 'Tilaus ja kaytto',
    settings: 'Asetukset',
    support: 'Tuki',
    legal: 'Oikeudelliset',
    dangerZone: 'Vaaravyohyke',
    supportAndFeedback: 'Tuki ja palaute',
    followUs: 'Seuraa meita',

    // Sign-in prompt
    notSignedIn: 'Ei kirjautunut',
    signInPrompt:
      'Kirjaudu sisaan paastaksesi tilisi tietoihin, tilaustietoihin ja henkilokohtaisiin ominaisuuksiin',

    // Account
    email: 'Sahkoposti',
    name: 'Nimi',
    model: 'Malli',
    userId: 'Kayttajatunnus',
    memberSince: 'Jasen alkaen',
    signOut: 'Kirjaudu ulos',
    logOut: 'Kirjaudu ulos',
    signOutConfirmTitle: 'Kirjaudu ulos',
    signOutConfirmMessage: 'Haluatko varmasti kirjautua ulos?',
    unknownUser: 'Tuntematon kayttaja',

    // Plan
    plan: 'Tilaus',
    activeUsagePeriod: 'Aktiivinen kayttojakso',
    currentPlan: 'Nykyinen tilaus',
    planDetails: 'Tilauksen tiedot',
    status: 'Tila',
    renewsOn: 'Uusiutuu',
    expiresOn: 'Paattyy',
    daysRemaining: 'Paivia jaljella',
    daysValue: '{{count}} paivaa',
    price: 'Hinta',
    billingPeriod: 'Laskutusjakso',
    managePlan: 'Hallitse tilausta',
    upgradePlan: 'Paivita tilaus',
    upgradeNow: 'Paivita nyt',
    limitReachedFooter:
      'Olet saavuttanut generointirajan. Paivita jatkaaksesi.',
    noSubscription: 'Ei tilausta',
    cancelledActive: 'Peruutettu (aktiivinen)',
    cancelledActiveUntilExpiration: 'Peruutettu (aktiivinen paattymiseen asti)',
    activeUntilExpiration: 'Aktiivinen paattymiseen asti',
    accessEndsOn: 'Kayttooikeus paattyy',
    autoRenew: 'Automaattinen uusiminen',
    cancelledAt: 'Peruutettu',
    expiredOn: 'Paattynyt',
    refreshing: 'Paivitetaan...',
    refreshData: 'Paivita tiedot',
    limitReachedFooterLong:
      'Olet saavuttanut AI-tatuointigeneroinnin rajan tassa tilauksessa. Paivita jatkaaksesi tatuointien luomista tai ota meihin yhteytta.',
    weMissYouFooter:
      'Valmis luomaan lisaa upeita tatuointeja? Tule takaisin ja suunnitellaan yhdessa jotain uskomatonta.',
    unknown: 'Tuntematon',
    free: 'Ilmainen',
    pro: 'Pro',
    active: 'Aktiivinen',
    expired: 'Paattynyt',
    cancelled: 'Peruutettu',
    generationsUsed: 'Kaytetyt generoinnit',
    generationsRemaining: 'Jaljella olevat generoinnit',
    unlimited: 'Rajoittamaton',
    na: 'Ei saatavilla',

    // We Miss You
    weMissYou: 'Kaipaamme sinua!',
    previousPlan: 'Edellinen tilaus',
    comeBackAndCreate: 'Tule takaisin ja luo',

    // Enjoying the app
    enjoyingApp: 'Pidatko sovelluksesta?',
    enjoyingAppDescription:
      'Jos pidat Tattoo Design AI:sta, arvostelu auttaa muita tatuointiharrastajia loytamaan meidat. Voit myos milloin tahansa lahettaa palautetta tai ideoita uusista ominaisuuksista.',
    rateOnPlayStore: 'Arvioi Play Storessa',
    rateOnAppStore: 'Arvioi App Storessa',
    sendFeedback: 'Laheta palautetta',

    // Are you an artist
    areYouArtist: 'Oletko taiteilija?',
    artistDescription:
      'Kiinnostunut yhteistyosta? Onko sinulla ehdotuksia tai palautetta? Kuulemme mielellaamme!',
    writeToUs: 'Kirjoita meille',

    // Support
    contactSupport: 'Ota yhteytta tukeen',
    requestFeature: 'Ehdota ominaisuutta',
    rateApp: 'Arvioi sovellus',
    shareApp: 'Jaa sovellus',
    shareWithFriends: 'Jaa ystaville',
    shareMessage: 'Tutustu Tattoo Design AI:hin \n',

    // Settings
    appearance: 'Ulkoasu',
    light: 'Vaalea',
    dark: 'Tumma',
    system: 'Jarjestelma',
    language: 'Kieli',
    languageAuto: 'Automaattinen (jarjestelma)',
    showOnboarding: 'Nayta perehdytys',
    promptEnhancement: 'Kehotteen parantaminen',
    promptEnhancementDisabledTitle: 'Kehotteen parantaminen pois kaytosta',
    promptEnhancementDisabledMessage:
      'Tulokset voivat vaihdella ilman parannusta. Voit ottaa sen uudelleen kayttoon milloin tahansa.',

    // Legal
    termsOfService: 'Kayttoehdot',
    privacyPolicy: 'Tietosuojakaytanto',

    // Danger
    deleteAccount: 'Poista tili',
    deleteAccountConfirmTitle: 'Poista tili',
    deleteAccountConfirmMessage:
      'Oletko varma? Tata ei voi peruuttaa. Huomaa: tama EI peruuta aktiivisia tilauksia.',
    dangerZoneFooter:
      'Tilin poistaminen on pysyvaa. Tama EI peruuta aktiivisia tilauksia.',
    resetOnboarding: 'Nollaa perehdytys',

    // Version
    version: 'Versio',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI - Tukipyynto',
      body: 'Hei,\n\nTarvitsen apua Tattoo Design AI -sovelluksen kanssa.\n\n{{userInfo}}\n\nKuvaus:\n[Kuvaile ongelmasi tahan]\n\nKiitos!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI - Ominaisuusehdotus',
      body: 'Hei,\n\nTarvitsen apua ominaisuusehdotuksen lahettamisessa.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI - Palaute',
      body: 'Hei!\n\nMinulla on palautetta Tattoo Design AI:sta:\n\n[Palautteesi tahan]{{userInfo}}\n\nKiitos!',
    },
    artist: {
      subject: 'Oletko taiteilija? - Tattoo Design AI',
      body: 'Hei!\n\nOlen kiinnostunut yhteistyosta tai minulla on ehdotuksia/palautetta.\n\n{{userInfo}}\n\n[Jaa ehdotuksesi, palautteesi tai kerro itsestasi taiteilijana]\n\nKiitos!',
    },
    userIdLabel: 'Kayttajatunnus: {{id}}',
    emailLabel: 'Sahkoposti: {{email}}',
    accountLabel: 'Tilini sahkoposti: {{email}}',
    myUserIdLabel: 'Oma kayttajatunnus: {{id}}',
    accountInfo: '\n\nTili: {{email}}',
  },

  notFound: {
    title: 'Hups!',
    description: 'Tata nayttoa ei ole olemassa.',
    goHome: 'Siirry aloitusnaytolle!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Aloitetaan',
    photoAccessDescription:
      'Tarvitsemme paasyn kuviisi lisataksemme kuvia',
    photoAccessDeniedTitle: 'Kuvien kayttooikeus tarvitaan',
    photoAccessDeniedDescription:
      'Tama ominaisuus vaatii paasyn kuvakirjastoosi tatuointien katselua ja tallennusta varten. Voit hallita kuvien kayttooikeutta laitteen asetuksissa.',
    photoLibraryNeeded:
      'Tarvitsemme paasyn kuvakirjastoosi, jotta voit katsella ja tallentaa tatuointejasi.',

    // Camera
    cameraAccessTitle: 'Aloitetaan',
    cameraAccessDescription:
      'Tarvitsemme paasyn kameraasi kuvien ottamista varten.',
    cameraAccessDeniedTitle: 'Kameran kayttooikeus tarvitaan',
    cameraAccessDeniedDescription:
      'Tama ominaisuus vaatii paasyn kameraasi. Voit hallita kameran kayttooikeutta laitteen asetuksissa.',
  },
};
