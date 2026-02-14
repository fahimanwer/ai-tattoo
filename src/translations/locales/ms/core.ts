/**
 * Malay translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const msCore = {
  common: {
    // Actions
    loading: 'Memuatkan...',
    error: 'Ralat',
    success: 'Berjaya',
    cancel: 'Batal',
    confirm: 'Sahkan',
    save: 'Simpan',
    done: 'Selesai',
    close: 'Tutup',
    back: 'Kembali',
    next: 'Seterusnya',
    skip: 'Langkau',
    continue: 'Teruskan',
    retry: 'Cuba Lagi',
    delete: 'Padam',
    edit: 'Edit',
    share: 'Kongsi',
    send: 'Hantar',
    search: 'Cari',
    seeAll: 'Lihat Semua',
    tryAgain: 'Cuba Lagi',
    ok: 'OK',
    yes: 'Ya',
    no: 'Tidak',
    or: 'atau',
    upgrade: 'Naik Taraf',
    processing: 'Memproses...',
    openSettings: 'Buka Tetapan',
    readMore: 'Baca Lagi',
    createTattoo: 'Cipta Tatu',
    style: 'Gaya',

    // States
    on: 'Hidup',
    off: 'Mati',
    enabled: 'Diaktifkan',
    disabled: 'Dinyahaktifkan',

    // Errors
    somethingWentWrong: 'Sesuatu telah berlaku',
    unexpectedError: 'Ralat yang tidak dijangka telah berlaku',
  },

  tabs: {
    home: 'Utama',
    explore: 'Terokai',
    myTattoos: 'Tatu Saya',
    profile: 'Profil',
    tryOnTattoo: 'Cuba Tatu',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Selamat kembali!',
    signInDescription: 'Sila pilih kaedah log masuk pilihan anda',
    signIn: 'Log Masuk',
    alreadyHaveAccount: 'Sudah ada akaun? ',
    termsOfService: 'Terma Perkhidmatan',
    privacyPolicy: 'Dasar Privasi',
    byContinuingAgree: 'Dengan meneruskan, anda bersetuju dengan ',
    inkognitoMode: 'Mod Ink-ognito',
    inkognitoDescription: 'Reka bentuk anda kekal dengan anda, bukan kami.',
    signInToContinue:
      'Sila log masuk untuk meneruskan dan mencipta tatu anda!',
    signInBenefit:
      'Dengan log masuk, kami boleh menjejak penjanaan tatu percuma anda dan memastikan akaun anda disediakan dengan betul.',
    notSignedIn: '(Belum log masuk)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Akaun',
    planAndUsage: 'Pelan & Penggunaan',
    settings: 'Tetapan',
    support: 'Sokongan',
    legal: 'Undang-undang',
    dangerZone: 'Zon Bahaya',
    supportAndFeedback: 'Sokongan & Maklum Balas',
    followUs: 'Ikuti Kami',

    // Sign-in prompt
    notSignedIn: 'Belum log masuk',
    signInPrompt:
      'Log masuk untuk mengakses butiran akaun, maklumat langganan dan ciri yang diperibadikan',

    // Account
    email: 'Emel',
    name: 'Nama',
    model: 'Model',
    userId: 'ID Pengguna',
    memberSince: 'Ahli Sejak',
    signOut: 'Log Keluar',
    logOut: 'Log Keluar',
    signOutConfirmTitle: 'Log Keluar',
    signOutConfirmMessage: 'Adakah anda pasti mahu log keluar?',
    unknownUser: 'Pengguna Tidak Dikenali',

    // Plan
    plan: 'Pelan',
    activeUsagePeriod: 'Tempoh Penggunaan Aktif',
    currentPlan: 'Pelan Semasa',
    planDetails: 'Butiran Pelan',
    status: 'Status',
    renewsOn: 'Diperbaharui Pada',
    expiresOn: 'Tamat Pada',
    daysRemaining: 'Hari Berbaki',
    daysValue: '{{count}} hari',
    price: 'Harga',
    billingPeriod: 'Tempoh Pengebilan',
    managePlan: 'Urus Pelan',
    upgradePlan: 'Naik Taraf Pelan',
    upgradeNow: 'Naik Taraf Sekarang',
    limitReachedFooter:
      'Anda telah mencapai had penjanaan. Naik taraf untuk meneruskan.',
    noSubscription: 'Tiada langganan',
    cancelledActive: 'Dibatalkan (Masih Aktif)',
    cancelledActiveUntilExpiration: 'Dibatalkan (Aktif Sehingga Tamat)',
    activeUntilExpiration: 'Aktif Sehingga Tamat',
    accessEndsOn: 'Akses Tamat Pada',
    autoRenew: 'Pembaharuan Automatik',
    cancelledAt: 'Dibatalkan Pada',
    expiredOn: 'Tamat Pada',
    refreshing: 'Memuat semula...',
    refreshData: 'Muat semula data',
    limitReachedFooterLong:
      'Anda telah mencapai had penjanaan tatu AI untuk pelan ini. Naik taraf untuk terus mencipta tatu atau hubungi kami.',
    weMissYouFooter:
      'Bersedia mencipta tatu yang menakjubkan lagi? Kembali dan mari reka sesuatu yang hebat bersama.',
    unknown: 'Tidak diketahui',
    free: 'Percuma',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Aktif',
    expired: 'Tamat Tempoh',
    cancelled: 'Dibatalkan',
    generationsUsed: 'Penjanaan Digunakan',
    generationsRemaining: 'Penjanaan Berbaki',
    unlimited: 'Tanpa Had',
    na: 'T/B',

    // We Miss You
    weMissYou: 'Kami Rindu Anda!',
    previousPlan: 'Pelan Sebelumnya',
    comeBackAndCreate: 'Kembali & Berkarya',

    // Enjoying the app
    enjoyingApp: 'Menikmati aplikasi ini?',
    enjoyingAppDescription:
      'Jika anda menikmati Tattoo Design AI, ulasan anda membantu pencinta tatu lain menemui kami. Anda juga boleh menghubungi kami pada bila-bila masa dengan maklum balas atau idea ciri.',
    rateOnPlayStore: 'Nilai di Play Store',
    rateOnAppStore: 'Nilai di App Store',
    sendFeedback: 'Hantar Maklum Balas',

    // Are you an artist
    areYouArtist: 'Anda seorang artis?',
    artistDescription:
      'Berminat untuk bekerjasama? Ada cadangan atau aduan? Kami ingin mendengar daripada anda!',
    writeToUs: 'Tulis Kepada Kami',

    // Support
    contactSupport: 'Hubungi Sokongan',
    requestFeature: 'Minta Ciri Baharu',
    rateApp: 'Nilai Aplikasi',
    shareApp: 'Kongsi Aplikasi',
    shareWithFriends: 'Kongsi dengan Rakan',
    shareMessage: 'Cuba Tattoo Design AI \n',

    // Settings
    appearance: 'Penampilan',
    light: 'Cerah',
    dark: 'Gelap',
    system: 'Sistem',
    language: 'Bahasa',
    languageAuto: 'Automatik (Sistem)',
    showOnboarding: 'Tunjukkan Panduan',
    promptEnhancement: 'Peningkatan Prompt',
    promptEnhancementDisabledTitle: 'Peningkatan Prompt Dinyahaktifkan',
    promptEnhancementDisabledMessage:
      'Keputusan mungkin berbeza tanpa peningkatan. Anda boleh menghidupkannya semula pada bila-bila masa.',

    // Legal
    termsOfService: 'Terma Perkhidmatan',
    privacyPolicy: 'Dasar Privasi',

    // Danger
    deleteAccount: 'Padam Akaun',
    deleteAccountConfirmTitle: 'Padam Akaun',
    deleteAccountConfirmMessage:
      'Adakah anda pasti? Tindakan ini tidak boleh dibuat asal. Nota: ini TIDAK membatalkan langganan aktif.',
    dangerZoneFooter:
      'Memadam akaun adalah kekal. Ini TIDAK membatalkan langganan aktif.',
    resetOnboarding: 'Set Semula Panduan',

    // Version
    version: 'Versi',
  },

  emails: {
    support: {
      subject: 'Permintaan Sokongan Aplikasi Tattoo Design AI',
      body: 'Hai,\n\nSaya perlukan bantuan dengan aplikasi Tattoo Design AI.\n\n{{userInfo}}\n\nPenerangan:\n[Sila terangkan masalah anda di sini]\n\nTerima kasih!',
    },
    featureRequest: {
      subject: 'Bantuan Permintaan Ciri Tattoo Design AI',
      body: 'Hai,\n\nSaya perlukan bantuan untuk menghantar permintaan ciri.\n\n',
    },
    feedback: {
      subject: 'Maklum Balas Tattoo Design AI',
      body: 'Hai!\n\nSaya ada maklum balas tentang Tattoo Design AI:\n\n[Maklum balas anda di sini]{{userInfo}}\n\nTerima kasih!',
    },
    artist: {
      subject: 'Anda seorang artis? - Tattoo Design AI',
      body: 'Hai!\n\nSaya berminat untuk bekerjasama atau ada cadangan/aduan.\n\n{{userInfo}}\n\n[Sila kongsi cadangan, aduan, atau ceritakan tentang diri anda sebagai artis]\n\nTerima kasih!',
    },
    userIdLabel: 'ID Pengguna: {{id}}',
    emailLabel: 'Emel: {{email}}',
    accountLabel: 'Emel akaun saya: {{email}}',
    myUserIdLabel: 'ID pengguna saya: {{id}}',
    accountInfo: '\n\nAkaun: {{email}}',
  },

  notFound: {
    title: 'Oops!',
    description: 'Skrin ini tidak wujud.',
    goHome: 'Ke skrin utama!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Mari Mula',
    photoAccessDescription:
      'Kami memerlukan akses ke foto anda untuk menambah imej',
    photoAccessDeniedTitle: 'Akses Foto Diperlukan',
    photoAccessDeniedDescription:
      'Ciri ini memerlukan akses ke galeri foto anda untuk melihat dan menyimpan tatu. Anda boleh mengurus akses foto dalam tetapan peranti.',
    photoLibraryNeeded:
      'Kami memerlukan akses ke galeri foto anda supaya anda boleh melihat dan menyimpan tatu.',

    // Camera
    cameraAccessTitle: 'Mari Mula',
    cameraAccessDescription:
      'Kami memerlukan akses ke kamera anda untuk mengambil foto.',
    cameraAccessDeniedTitle: 'Akses Kamera Diperlukan',
    cameraAccessDeniedDescription:
      'Ciri ini memerlukan akses ke kamera anda. Anda boleh mengurus akses kamera dalam tetapan peranti.',
  },
};
