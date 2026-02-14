/**
 * Indonesian translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const idCore = {
  common: {
    // Actions
    loading: 'Memuat...',
    error: 'Kesalahan',
    success: 'Berhasil',
    cancel: 'Batal',
    confirm: 'Konfirmasi',
    save: 'Simpan',
    done: 'Selesai',
    close: 'Tutup',
    back: 'Kembali',
    next: 'Selanjutnya',
    skip: 'Lewati',
    continue: 'Lanjutkan',
    retry: 'Coba Lagi',
    delete: 'Hapus',
    edit: 'Edit',
    share: 'Bagikan',
    send: 'Kirim',
    search: 'Cari',
    seeAll: 'Lihat Semua',
    tryAgain: 'Coba Lagi',
    ok: 'OK',
    yes: 'Ya',
    no: 'Tidak',
    or: 'atau',
    upgrade: 'Upgrade',
    processing: 'Memproses...',
    openSettings: 'Buka Pengaturan',
    readMore: 'Baca Selengkapnya',
    createTattoo: 'Buat Tato',
    style: 'Gaya',

    // States
    on: 'Aktif',
    off: 'Nonaktif',
    enabled: 'Diaktifkan',
    disabled: 'Dinonaktifkan',

    // Errors
    somethingWentWrong: 'Terjadi kesalahan',
    unexpectedError: 'Terjadi kesalahan yang tidak terduga',
  },

  tabs: {
    home: 'Beranda',
    explore: 'Jelajahi',
    myTattoos: 'Tato Saya',
    profile: 'Profil',
    tryOnTattoo: 'Coba Tato',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Selamat datang kembali!',
    signInDescription: 'Silakan pilih metode masuk yang Anda inginkan',
    signIn: 'Masuk',
    alreadyHaveAccount: 'Sudah punya akun? ',
    termsOfService: 'Ketentuan Layanan',
    privacyPolicy: 'Kebijakan Privasi',
    byContinuingAgree: 'Dengan melanjutkan, Anda menyetujui ',
    inkognitoMode: 'Mode Ink-ognito',
    inkognitoDescription: 'Desain Anda tetap milik Anda, bukan milik kami.',
    signInToContinue:
      'Silakan masuk untuk melanjutkan dan membuat tato Anda!',
    signInBenefit:
      'Dengan masuk, kami dapat melacak jumlah pembuatan tato gratis Anda dan memastikan akun Anda diatur dengan benar.',
    notSignedIn: '(Belum masuk)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Akun',
    planAndUsage: 'Paket & Penggunaan',
    settings: 'Pengaturan',
    support: 'Bantuan',
    legal: 'Hukum',
    dangerZone: 'Zona Berbahaya',
    supportAndFeedback: 'Bantuan & Masukan',
    followUs: 'Ikuti Kami',

    // Sign-in prompt
    notSignedIn: 'Belum masuk',
    signInPrompt:
      'Masuk untuk mengakses detail akun, info langganan, dan fitur yang dipersonalisasi',

    // Account
    email: 'Email',
    name: 'Nama',
    model: 'Model',
    userId: 'ID Pengguna',
    memberSince: 'Anggota Sejak',
    signOut: 'Keluar',
    logOut: 'Keluar',
    signOutConfirmTitle: 'Keluar',
    signOutConfirmMessage: 'Apakah Anda yakin ingin keluar?',
    unknownUser: 'Pengguna Tidak Dikenal',

    // Plan
    plan: 'Paket',
    activeUsagePeriod: 'Periode Penggunaan Aktif',
    currentPlan: 'Paket Saat Ini',
    planDetails: 'Detail Paket',
    status: 'Status',
    renewsOn: 'Diperpanjang Pada',
    expiresOn: 'Berakhir Pada',
    daysRemaining: 'Hari Tersisa',
    daysValue: '{{count}} hari',
    price: 'Harga',
    billingPeriod: 'Periode Penagihan',
    managePlan: 'Kelola Paket',
    upgradePlan: 'Upgrade Paket',
    upgradeNow: 'Upgrade Sekarang',
    limitReachedFooter:
      'Anda telah mencapai batas pembuatan. Upgrade untuk melanjutkan.',
    noSubscription: 'Tidak ada langganan',
    cancelledActive: 'Dibatalkan (Masih Aktif)',
    cancelledActiveUntilExpiration: 'Dibatalkan (Aktif Hingga Berakhir)',
    activeUntilExpiration: 'Aktif Hingga Berakhir',
    accessEndsOn: 'Akses Berakhir Pada',
    autoRenew: 'Perpanjangan Otomatis',
    cancelledAt: 'Dibatalkan Pada',
    expiredOn: 'Berakhir Pada',
    refreshing: 'Memperbarui...',
    refreshData: 'Perbarui data',
    limitReachedFooterLong:
      'Anda telah mencapai batas pembuatan tato AI untuk paket ini. Upgrade untuk terus membuat tato atau hubungi kami.',
    weMissYouFooter:
      'Siap membuat tato menakjubkan lagi? Kembali dan mari desain sesuatu yang luar biasa bersama.',
    unknown: 'Tidak diketahui',
    free: 'Gratis',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Aktif',
    expired: 'Kedaluwarsa',
    cancelled: 'Dibatalkan',
    generationsUsed: 'Pembuatan Digunakan',
    generationsRemaining: 'Pembuatan Tersisa',
    unlimited: 'Tidak Terbatas',
    na: 'T/A',

    // We Miss You
    weMissYou: 'Kami Rindu Anda!',
    previousPlan: 'Paket Sebelumnya',
    comeBackAndCreate: 'Kembali & Berkreasi',

    // Enjoying the app
    enjoyingApp: 'Menikmati aplikasinya?',
    enjoyingAppDescription:
      'Jika Anda menikmati Tattoo Design AI, ulasan Anda membantu pecinta tato lain menemukan kami. Anda juga bisa menghubungi kami kapan saja untuk masukan atau ide fitur.',
    rateOnPlayStore: 'Nilai di Play Store',
    rateOnAppStore: 'Nilai di App Store',
    sendFeedback: 'Kirim Masukan',

    // Are you an artist
    areYouArtist: 'Apakah Anda seorang seniman?',
    artistDescription:
      'Tertarik berkolaborasi? Punya saran atau keluhan? Kami ingin mendengar dari Anda!',
    writeToUs: 'Tulis Kepada Kami',

    // Support
    contactSupport: 'Hubungi Dukungan',
    requestFeature: 'Minta Fitur Baru',
    rateApp: 'Nilai Aplikasi',
    shareApp: 'Bagikan Aplikasi',
    shareWithFriends: 'Bagikan ke Teman',
    shareMessage: 'Coba Tattoo Design AI yuk \n',

    // Settings
    appearance: 'Tampilan',
    light: 'Terang',
    dark: 'Gelap',
    system: 'Sistem',
    language: 'Bahasa',
    languageAuto: 'Otomatis (Sistem)',
    showOnboarding: 'Tampilkan Panduan',
    promptEnhancement: 'Peningkatan Prompt',
    promptEnhancementDisabledTitle: 'Peningkatan Prompt Dinonaktifkan',
    promptEnhancementDisabledMessage:
      'Hasil mungkin bervariasi tanpa peningkatan. Anda bisa mengaktifkannya kembali kapan saja.',

    // Legal
    termsOfService: 'Ketentuan Layanan',
    privacyPolicy: 'Kebijakan Privasi',

    // Danger
    deleteAccount: 'Hapus Akun',
    deleteAccountConfirmTitle: 'Hapus Akun',
    deleteAccountConfirmMessage:
      'Apakah Anda yakin? Tindakan ini tidak dapat dibatalkan. Catatan: ini TIDAK membatalkan langganan aktif.',
    dangerZoneFooter:
      'Menghapus akun bersifat permanen. Ini TIDAK membatalkan langganan aktif.',
    resetOnboarding: 'Reset Panduan',

    // Version
    version: 'Versi',
  },

  emails: {
    support: {
      subject: 'Permintaan Dukungan Aplikasi Tattoo Design AI',
      body: 'Halo,\n\nSaya membutuhkan bantuan dengan aplikasi Tattoo Design AI.\n\n{{userInfo}}\n\nDeskripsi:\n[Silakan jelaskan masalah Anda di sini]\n\nTerima kasih!',
    },
    featureRequest: {
      subject: 'Bantuan Permintaan Fitur Tattoo Design AI',
      body: 'Halo,\n\nSaya membutuhkan bantuan untuk mengirim permintaan fitur.\n\n',
    },
    feedback: {
      subject: 'Masukan Tattoo Design AI',
      body: 'Halo!\n\nSaya punya masukan tentang Tattoo Design AI:\n\n[Masukan Anda di sini]{{userInfo}}\n\nTerima kasih!',
    },
    artist: {
      subject: 'Apakah Anda seorang seniman? - Tattoo Design AI',
      body: 'Halo!\n\nSaya tertarik berkolaborasi atau punya saran/keluhan.\n\n{{userInfo}}\n\n[Silakan bagikan saran, keluhan, atau ceritakan tentang diri Anda sebagai seniman]\n\nTerima kasih!',
    },
    userIdLabel: 'ID Pengguna: {{id}}',
    emailLabel: 'Email: {{email}}',
    accountLabel: 'Email akun saya: {{email}}',
    myUserIdLabel: 'ID pengguna saya: {{id}}',
    accountInfo: '\n\nAkun: {{email}}',
  },

  notFound: {
    title: 'Ups!',
    description: 'Halaman ini tidak ada.',
    goHome: 'Ke halaman utama!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Mari Mulai',
    photoAccessDescription:
      'Kami memerlukan akses ke foto Anda untuk menambahkan gambar',
    photoAccessDeniedTitle: 'Akses Foto Diperlukan',
    photoAccessDeniedDescription:
      'Fitur ini memerlukan akses ke galeri foto Anda untuk melihat dan menyimpan tato. Anda dapat mengelola akses foto di pengaturan perangkat.',
    photoLibraryNeeded:
      'Kami memerlukan akses ke galeri foto Anda agar Anda dapat melihat dan menyimpan tato.',

    // Camera
    cameraAccessTitle: 'Mari Mulai',
    cameraAccessDescription:
      'Kami memerlukan akses ke kamera Anda untuk mengambil foto.',
    cameraAccessDeniedTitle: 'Akses Kamera Diperlukan',
    cameraAccessDeniedDescription:
      'Fitur ini memerlukan akses ke kamera Anda. Anda dapat mengelola akses kamera di pengaturan perangkat.',
  },
};
