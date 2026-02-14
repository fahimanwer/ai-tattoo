/**
 * Indonesian translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const idFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Lihat pratinjau tato sebelum memutuskan.',
    whatsYourName: 'Siapa nama Anda?',
    namePlaceholder: 'Nama Anda',
    nameDescription: 'Kami akan menggunakan nama ini untuk mempersonalisasi pengalaman Anda.',
    welcome: 'Selamat Datang',
    welcomeDescription: 'Mari sesuaikan pengalaman Tattoo Design AI Anda.',
    describeYou: 'Mana yang paling\n menggambarkan Anda?',
    describeYouDescription:
      'Ini membantu kami mempersonalisasi pengalaman berdasarkan hubungan Anda dengan tato',
    whatToDo: 'Apa yang ingin\n Anda lakukan?',
    whatToDoDescription:
      'Ini membantu kami memahami bagaimana Anda ingin menjelajahi tato dan alat apa yang paling berguna.',
    designTattoo: 'Desain tato\n yang Anda inginkan',
    designTattooDescription:
      'Ketik beberapa kata atau unggah gambar dan langsung hasilkan desain tato yang unik.',
    whereTattoo: 'Di mana Anda ingin\n tatonya?',
    whereTattooDescription:
      'Penempatan memengaruhi desain, ukuran, dan aliran yang membantu kami menyesuaikan ide untuk tubuh Anda.',
    pickStyles: 'Pilih hingga 5\n gaya yang Anda suka',
    pickStylesDescription:
      'Pilihan gaya Anda membantu kami mempersempit desain yang sesuai dengan selera Anda.',
    whenTattoo: 'Kapan Anda berencana\n membuat tato?',
    whenTattooDescription:
      'Ini membantu kami menyesuaikan\n pengalaman dengan jadwal Anda.',
    whatVibe: 'Suasana apa yang\n Anda cari?',
    whatVibeDescription:
      'Tato membawa emosi, ini membantu kami memahami cerita di balik tato Anda.',
    settingUp: 'Menyiapkan semuanya\n untuk Anda',
    youreAllSet: 'Anda sudah siap!',
    youreAllSetDescription: 'Anda sudah siap untuk memulai.',

    // CTA
    alreadyHaveAccount: 'Sudah punya akun? ',
    signIn: 'Masuk',

    // User description options
    userDescription: {
      artist: 'Saya membuat tato',
      client: 'Saya ingin ditato',
      model: 'Saya menggunakan tato untuk konten',
      explorer: 'Saya hanya menjelajahi',
    },

    // Goal options
    goal: {
      tryOn: 'Coba tato di foto saya',
      generate: 'Buat ide tato',
      browse: 'Hanya melihat-lihat atau mencari inspirasi',
      coverUp: 'Cover-up/Perbaiki tato yang sudah ada',
    },

    // Location options
    location: {
      wrist: 'Pergelangan tangan',
      chest: 'Dada',
      hand: 'Tangan',
      back: 'Punggung',
      legs: 'Kaki',
      forearm: 'Lengan bawah',
      neck: 'Leher',
      jaw: 'Rahang',
      forehead: 'Dahi',
      knuckles: 'Buku jari',
      fingers: 'Jari',
      cheek: 'Pipi',
      shoulder: 'Bahu',
      temple: 'Pelipis',
      ribs: 'Tulang rusuk',
      abdomen: 'Perut',
      face: 'Wajah',
      hips: 'Pinggul',
      thigh: 'Paha',
      tricep: 'Trisep',
      bicep: 'Bisep',
      collarbone: 'Tulang selangka',
      ankle: 'Pergelangan kaki',
      foot: 'Kaki',
      palm: 'Telapak tangan',
      notSure: 'Belum yakin',
    },

    // Style options
    styles: {
      traditional: 'Traditional',
      realism: 'Realism',
      minimal: 'Minimalis',
      celtic: 'Celtic',
      blackwork: 'Blackwork',
      illustrative: 'Illustrative',
      lettering: 'Lettering',
      irezumi: 'Irezumi',
      geometric: 'Geometric',
      religious: 'Religius',
      anime: 'Anime',
      fineLine: 'Fine Line',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Kaligrafi',
      portrait: 'Potret',
      floral: 'Bunga',
      polynesian: 'Polynesian',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gothic',
      patchwork: 'Patchwork',
      abstract: 'Abstrak',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologi',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Minggu ini',
      thisMonth: 'Bulan ini',
      oneToThreeMonths: 'Dalam 1-3 bulan',
      someday: 'Suatu hari nanti, saya hanya menjelajahi',
    },

    // Vibe options
    vibe: {
      bold: 'Berani',
      confident: 'Percaya diri',
      soft: 'Lembut',
      dark: 'Gelap',
      edgy: 'Tajam',
      elegant: 'Elegan',
      spiritual: 'Spiritual',
      cute: 'Imut',
      symbolic: 'Simbolis',
      playful: 'Ceria',
      clean: 'Bersih',
      modern: 'Modern',
      meaningful: 'Bermakna',
      personalStory: 'Cerita pribadi',
      family: 'Keluarga',
      love: 'Cinta',
      memory: 'Kenangan',
      rebirth: 'Kelahiran kembali',
      freedom: 'Kebebasan',
      mystical: 'Mistis',
      rebellious: 'Pemberontak',
      serene: 'Tenang',
      empowered: 'Berdaya',
      ethereal: 'Etereal',
      fearless: 'Tanpa takut',
      wanderlust: 'Jiwa petualang',
      transcendent: 'Transenden',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Memahami visi {{name}}',
      understandingVisionDefault: 'Memahami visi Anda',
      tailoringDesigns: 'Menyesuaikan desain dengan gaya Anda',
      settingUpCoverUp: 'Menyiapkan alat cover-up',
      personalizingExperience: 'Mempersonalisasi pengalaman Anda',
      preparingStudio: 'Menyiapkan studio desain Anda',
      configuringWorkspace: 'Mengonfigurasi ruang kerja Anda',
      applyingPreferences: 'Menerapkan preferensi Anda',
      journeyStartsNow: 'Perjalanan tato Anda dimulai sekarang',
    },

    // Reviews
    reviews: {
      review1Title: 'Aplikasi luar biasa!',
      review1Body:
        'Aplikasi berfungsi dengan baik, tampilan dan nuansa yang bagus! Terkesan dengan cara mengaplikasikan tato, memperhitungkan pencahayaan dan bayangan secara akurat.',
      review1Author: 'Jacob C.',
      review2Title: 'Sangat berguna',
      review2Body:
        'Desain tato bersih dan detail. Beberapa gambar membutuhkan waktu lebih lama untuk dihasilkan, tetapi secara keseluruhan ini salah satu aplikasi tato AI terbaik.',
      review2Author: 'Alexrays1',
      review3Title: 'Saya suka ini',
      review3Body: 'Sangat direkomendasikan \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Buat Tato Secara Instan',
    containerDesc1:
      'Ketik beberapa kata dan langsung hasilkan desain tato yang unik.',
    containerTitle2: 'Personalisasi Desain Anda',
    containerDesc2:
      'Sesuaikan warna, tata letak, dan gaya agar tato menjadi milik Anda sepenuhnya.',
    containerTitle3: 'Pratinjau di Kulit Anda',
    containerDesc3:
      'Pratinjau tato apa pun di kulit Anda — sesuaikan ukuran dan penempatan secara instan.',
    paused: 'Dijeda',

    // Relative time
    time: {
      today: 'Hari ini',
      yesterday: 'Kemarin',
      daysAgo: '{{count}} hari yang lalu',
      weeksAgo: '{{count}} minggu yang lalu',
      monthsAgo: '{{count}} bulan yang lalu',
      yearsAgo: '{{count}} tahun yang lalu',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Teknologi Coba Tato',
      tryOnTechnologyDesc: 'Lihat tato di kulit Anda sebelum memutuskan',
      aiTattooGenerator: 'Generator Tato AI',
      aiTattooGeneratorDesc: 'Buat desain unik dari ide Anda',
      coverUpAssistant: 'Asisten Cover-Up',
      coverUpAssistantDesc: 'Ubah tato lama menjadi karya seni baru',
      artistTools: 'Alat Seniman',
      artistToolsDesc:
        'Tunjukkan desain di tubuh klien secara instan',
      precisePlacement: 'Penempatan Presisi',
      precisePlacementDesc:
        'Ukuran sempurna untuk tato di {{location}} Anda',
      styleMatchedDesigns: 'Desain Sesuai Gaya',
      styleMatchedDesignsDesc:
        'Inspirasi tato {{style}} yang dikurasi',
      readyWhenYouAre: 'Siap Saat Anda Siap',
      readyWhenYouAreDesc: 'Mulai desain hari ini, tato besok',
      realisticTryOn: 'Coba Tato Realistis',
      realisticTryOnDesc: 'Lihat persis tampilannya di tubuh Anda',
      saveAndShare: 'Simpan & Bagikan',
      saveAndShareDesc:
        'Simpan favorit Anda dan bagikan dengan seniman tato',
      aiDesignStudio: 'Studio Desain AI',
      aiDesignStudioDesc: 'Hasilkan desain tato unik secara instan',

      // Personalized greetings
      greetingArtist: 'Alat pengalaman klien baru Anda sudah siap',
      greetingCoverUp: 'Siap mengubah tato Anda',
      greetingGenerate: 'Studio desain AI Anda menunggu',
      greetingDefault: 'Perjalanan tato Anda dimulai sekarang',
      welcomeAboard: 'Selamat datang, {{name}}!',
      welcomeName: 'Selamat datang {{name}}',

      // Urgency messages
      urgencyArtist: 'Tunjukkan pratinjau nyata ke klien secara instan.',
      urgencyCoverUp: 'Perbaiki tato Anda dengan percaya diri.',
      urgencyTryOn: 'Coba tato sebelum Anda memutuskan.',
      urgencyDefault: 'Desain tanpa batas. Tanpa penyesalan.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Lanjutkan',
    restorePurchase: 'Pulihkan Pembelian',
    current: 'SAAT INI',

    // Plan terms
    week: 'Minggu',
    month: 'Bulan',
    weekly: 'Mingguan',
    monthly: 'Bulanan',
    perWeek: '/Minggu',

    // Content
    loadingPlans: 'Memuat paket...',
    restoreSubscription: 'Pulihkan Langganan',
    fairUseNote: 'Pembuatan desain AI termasuk batas penggunaan wajar.',
    saveBadge: 'Hemat {{percent}}%',
    subtitle:
      'Jelajahi ide tato, perbaiki desain melalui variasi tak terbatas, coba di bagian tubuh mana pun, dan ekspor hasil berkualitas tinggi dengan percaya diri.',

    // Personalized headlines
    headlineArtist: 'Tunjukkan tato ke klien sebelum ditato',
    headlineCoverUp: 'Ubah tato Anda dengan percaya diri',
    headlineTryOn: 'Lihat tato sebelum memutuskan',
    headlineDesign: 'Desain tato yang selalu Anda impikan',
    headlineBrowse: 'Temukan desain tato sempurna Anda',

    // Purchase flow alerts
    successTitle: 'Berhasil!',
    subscriptionActiveMessage:
      'Langganan Anda sekarang aktif. Nikmati desain tato tanpa batas!',
    almostThereTitle: 'Hampir selesai!',
    createAccountMessage:
      'Buat akun untuk mengaktifkan langganan dan mulai mendesain.',
    purchaseRestoredTitle: 'Pembelian Dipulihkan!',
    subscriptionNowActive: 'Langganan Anda sekarang aktif.',
    purchaseFoundTitle: 'Pembelian Ditemukan!',
    purchasesRestoredMessage: 'Pembelian Anda telah dipulihkan.',
    noPurchasesFoundTitle: 'Tidak Ada Pembelian Ditemukan',
    noPurchasesFoundMessage:
      'Tidak ditemukan pembelian sebelumnya untuk dipulihkan.',
    purchaseFailedTitle: 'Pembelian Gagal',
    purchaseFailedMessage:
      'Tidak dapat menyelesaikan pembelian. Silakan coba lagi.',
    errorRestoringTitle: 'Gagal Memulihkan Pembelian',
    errorRestoringMessage:
      'Tidak dapat memulihkan pembelian. Silakan coba lagi.',
    subscriptionActivated: 'Langganan diaktifkan!',

    // Alerts
    purchaseError: 'Kesalahan Pembelian',
    restoreSuccess: 'Pembelian Dipulihkan',
    restoreError: 'Pemulihan Gagal',
    noPurchaseFound: 'Tidak ditemukan pembelian sebelumnya',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Batalkan Pembuatan',
    cancelGenerationTitle: 'Batalkan Pembuatan?',
    cancelGenerationMessage:
      'Anda akan membatalkan pembuatan saat ini. Ini akan menghapus pembuatan saat ini dan memulai sesi baru.',
    clearEverythingTitle: 'Hapus Semuanya?',
    clearEverythingMessage:
      'Anda akan menghapus sesi ini. Ini akan menghapus semua tato yang dihasilkan. Simpan apa pun yang ingin Anda pertahankan sebelum melanjutkan.',
    clearEverything: 'Hapus Semuanya',

    // Input
    enterText: 'Masukkan teks',
    describeTattoo: 'Deskripsikan tato Anda atau pilih saran di bawah',

    // Try on alert
    tryOnTitle: 'Coba {{style}}',
    tryOnMessage:
      'Ambil foto bagian tubuh Anda untuk melihat tampilan tato ini di tubuh Anda!',
    choosePhoto: 'Pilih Foto',
    later: 'Nanti',

    // Preview on body
    previewOnBody: 'Pratinjau Tato di Tubuh',
    imageSelectedCombine: '1 gambar dipilih - tambah satu lagi untuk menggabungkan',

    // Suggestions
    createTattoo: 'Buat tato {{title}}',
    createStyleTattoo: 'Buat tato gaya {{title}}',
    tryStyle: 'Coba gaya {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Memperbarui tato Anda...',
      startingNew: 'Memulai tato baru...',
      warmingUp: 'Mesin tato sedang pemanasan...',
      summoningSpirits: 'Memanggil roh tinta...',
      drawingInspiration: 'Menarik inspirasi dari alam semesta...',
      brewingMasterpiece: 'Hampir selesai meracik mahakarya Anda...',
      sprinkleCreativity: 'Menambahkan sentuhan kreativitas...',
      perfectingPixels: 'Menyempurnakan setiap piksel tato Anda...',
      injectingCreativity: 'Menyuntikkan kreativitas ke kulit Anda...',
      mixingShade: 'Mencampur warna sempurna...',
      sharpeningNeedles: 'Mengasah jarum virtual...',
      calibratingVibes: 'Mengkalibrasi vibes tato Anda...',
      consultingOracle: 'Berkonsultasi dengan oracle tato...',
    },

    // Error states
    error: {
      keepCreating: 'Terus berkreasi tanpa batas',
      limitReachedFree:
        'Anda telah mencapai batas pembuatan. Upgrade sekarang untuk menjelajahi variasi, menyempurnakan desain, dan terus berkreasi tanpa menunggu.',
      unlockUnlimited: 'Buka desain tanpa batas \u2192',
      limitReachedSubscribed:
        'Anda telah mencapai batas untuk periode ini',
      limitReachedSubscribedDesc:
        'Batas pembuatan paket Anda telah tercapai. Batas akan direset pada awal periode penagihan berikutnya.',
      tryAgainLater: 'Coba lagi nanti',
      contactSupport: 'Hubungi dukungan',
    },

    // Session history actions
    actions: 'Tindakan',
    saveToGallery: 'Simpan ke Galeri',

    // Result image actions
    imageActions: 'Tindakan Gambar',
    copyToClipboard: 'Salin ke Clipboard',
    imageCopied: 'Gambar disalin ke clipboard',
    imageCopyFailed: 'Gagal menyalin gambar',
    imageSaved: 'Gambar disimpan ke galeri!',
    imageSaveFailed: 'Gagal menyimpan gambar. Silakan coba lagi.',

    // Context alerts
    photoAccessTitle: 'Akses Foto Diperlukan',
    photoAccessMessage:
      'Untuk menyimpan gambar ke galeri, kami memerlukan akses ke foto Anda. Anda dapat mengaktifkannya di Pengaturan.',
    resetSessionTitle: 'Reset Sesi?',
    resetSessionMessage:
      'Apakah Anda yakin ingin mereset sesi? Ini akan menghapus semua tato yang dihasilkan dan memulai sesi baru.',
    resetButton: 'Reset',
    shareError: 'Gagal membagikan gambar',
    imageDataError: 'Gagal mendapatkan data gambar',
    pickImageError: 'Gagal memilih gambar dari galeri',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Gambar tidak ditemukan',
    useTattoo: 'Gunakan Tato',
    useTattooError: 'Gagal menggunakan tato ini. Silakan coba lagi.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Semua Foto',
    addPhotos: 'Tambah {{count}} foto',
    addPhotos_other: 'Tambah {{count}} foto',
    recentPhotos: 'Foto Terbaru',
    selectOneMore: 'Pilih 1 lagi untuk menggabungkan',

    // Options
    tryOn: 'Coba Tato',
    tryOnDescriptionWithTattoo:
      'Tambahkan foto tubuh Anda untuk pratinjau',
    tryOnDescriptionNoTattoo:
      'Pilih tato terlebih dahulu, lalu tambahkan foto Anda',
    createNewTattoo: 'Buat Tato Baru',
    createNewTattooDescription:
      'Deskripsikan ide tato Anda dan kami akan membuatnya',
    tattooCoverUp: 'Ide Cover-Up Tato',
    tattooCoverUpDescription:
      'Buat ide untuk menutupi tato yang sudah ada menggunakan foto sebagai referensi',
    removeTattoo: 'Hapus Tato',
    removeTattooDescription:
      'Hapus tato yang sudah ada dari foto',
    promptHistory: 'Riwayat Prompt',
    promptHistoryDescription: 'Lihat prompt sebelumnya',
    requestFeature: 'Minta Fitur',
    requestFeatureDescription:
      'Beritahu kami apa yang Anda ingin Tattoo Design AI dukung selanjutnya',

    // Try on alerts
    addYourPhoto: 'Tambahkan Foto Anda',
    addPhotoQuestion:
      'Bagaimana Anda ingin menambahkan foto tempat Anda ingin tato?',
    takePhoto: 'Ambil Foto',
    chooseFromLibrary: 'Pilih dari Perpustakaan',
    createTattooFirst: 'Buat Tato Terlebih Dahulu',
    createTattooFirstMessage:
      'Untuk mencoba tato, Anda perlu:\n\n1. Membuat atau memilih desain tato\n2. Kemudian menambahkan foto tubuh Anda\n\nKami akan menggabungkannya untuk menunjukkan tampilannya!',
    createTattoo: 'Buat Tato',
  },

  tattoos: {
    // Screen header
    title: 'Tato Saya',

    // Loading
    loading: 'Memuat tato...',

    // Empty state
    emptyTitle: 'Belum ada tato yang disimpan',
    emptyDescription:
      'Buat dan simpan desain tato pertama Anda! Geser ke bawah untuk memperbarui.',

    // Cloud restore
    restoringFromCloud: 'Memulihkan dari cloud...',
    noCloudGenerations: 'Tidak ada pembuatan cloud ditemukan',
    restoredCount: 'Dipulihkan {{restored}} dari {{total}} tato',
    restoreFailedTitle: 'Pemulihan Gagal',
    restoreFailedMessage:
      'Tidak dapat memulihkan dari cloud. Silakan coba lagi.',
    cloudFound: '{{count}} tato ditemukan di cloud',
    cloudFound_other: '{{count}} tato ditemukan di cloud',
    restoring: 'Memulihkan...',
    restore: 'Pulihkan',
    cloudCount: '{{count}} di cloud',

    // Detail screen
    tattooNotFound: 'Tato tidak ditemukan',
    backToHome: 'Kembali ke beranda',
    shareError: 'Tidak dapat membagikan gambar. Silakan coba lagi.',
    imageAccessError: 'Tidak dapat mengakses file gambar.',
    deleteTitle: 'Hapus Tato',
    deleteMessage:
      'Apakah Anda yakin ingin menghapus desain tato ini? Tindakan ini tidak dapat dibatalkan.',
    deleteError: 'Tidak dapat menghapus gambar. Silakan coba lagi.',
  },

  generation: {
    // Loading
    applyingDesign: 'Mengaplikasikan desain tato Anda...',

    // Error
    invalidRequest: 'Permintaan Tidak Valid',
    generationFailed: 'Pembuatan Gagal',
    failedToGenerate: 'Gagal membuat desain tato',
    startOver: 'Mulai Ulang',

    // Success
    tattooReady: 'Tato Anda Sudah Siap!',
    tattooReadyDescription:
      'Ini tampilan desain Anda saat diaplikasikan',
    saveToGallery: 'Simpan ke Galeri',
    generateAnother: 'Buat Lagi',

    // Save alerts
    savedTitle: 'Tersimpan!',
    savedMessage:
      'Desain tato Anda telah disimpan ke galeri foto.',
    viewInGallery: 'Lihat di galeri',

    // Generate another alert
    generateAnotherTitle: 'Buat Lagi?',
    generateAnotherMessage:
      'Anda belum menyimpan tato ini. Apakah Anda ingin menyimpannya sebelum melanjutkan?',
    continueWithoutSaving: 'Lanjutkan Tanpa Menyimpan',
    saveAndContinue: 'Simpan dan Lanjutkan',

    // Cancel alert
    cancelGenerationTitle: 'Batalkan Pembuatan?',
    cancelGenerationMessage:
      'Tato Anda masih dalam proses pembuatan. Jika Anda membatalkan sekarang, pembuatan ini tetap akan dihitung ke batas penggunaan Anda. Apakah Anda yakin ingin membatalkan?',
    keepGenerating: 'Lanjutkan Membuat',
    unableToSave: 'Tidak dapat menyimpan gambar. Silakan coba lagi.',
  },

  home: {
    // Section headers
    discoverStyles: 'Temukan gaya baru',
    moreStyles: 'Gaya lainnya',
    moods: 'Suasana',
    discoverSketches: 'Temukan desain sketsa',

    // Quick actions
    generateFromIdea: 'Buat dari Ide',
    generateFromIdeaDesc: 'Buat tato dari imajinasi Anda',
    seeItOnSkin: 'Lihat di Kulit Anda',
    seeItOnSkinDesc: 'Ambil foto dan pratinjau tato',
    blendTattoo: 'Gabungkan Tato',
    blendTattooDesc: 'Unggah tato yang sudah ada dan modifikasi',
    removeTattoo: 'Hapus Tato',
    removeTattooDesc: 'Hapus tato yang sudah ada dari kulit',
  },

  explore: {
    // Section headers
    byStyles: 'Jelajahi berdasarkan gaya',
    byMoods: 'Jelajahi berdasarkan suasana',
    byBodyPart: 'Jelajahi berdasarkan bagian tubuh',

    // Filter labels
    styles: 'Gaya',
    bodyPart: 'Bagian tubuh',
  },

  featureRequest: {
    title: 'Bagikan Ide Anda',
    placeholder: 'Ide untuk meningkatkan pengalaman Anda...',
    needHelp: 'Butuh bantuan? ',
    contactUs: 'Hubungi kami',
    successToast:
      'Permintaan fitur terkirim! Terima kasih atas masukan Anda.',
    errorToast:
      'Gagal mengirim permintaan fitur. Silakan coba lagi.',
  },

  promptHistory: {
    title: 'Riwayat Prompt',
    clearAll: 'Hapus Semua',
    clearAllTitle: 'Hapus Riwayat Prompt',
    clearAllMessage:
      'Apakah Anda yakin ingin menghapus semua prompt yang tersimpan?',
    deletePromptTitle: 'Hapus Prompt',
    deletePromptMessage: 'Hapus prompt ini dari riwayat?',
    emptyTitle: 'Belum ada prompt',
    emptyDescription:
      'Prompt Anda akan muncul di sini setelah Anda membuat tato',
  },
};
