/**
 * Malay translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const msFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Pratonton tatu anda sebelum membuat keputusan.',
    whatsYourName: 'Siapa nama anda?',
    namePlaceholder: 'Nama anda',
    nameDescription: 'Kami akan gunakan nama ini untuk menyesuaikan pengalaman anda.',
    welcome: 'Selamat Datang',
    welcomeDescription: 'Mari sesuaikan pengalaman Tattoo Design AI anda.',
    describeYou: 'Yang mana paling\n menggambarkan anda?',
    describeYouDescription:
      'Ini membantu kami menyesuaikan pengalaman berdasarkan hubungan anda dengan tatu',
    whatToDo: 'Apa yang anda\n ingin lakukan?',
    whatToDoDescription:
      'Ini membantu kami memahami bagaimana anda ingin meneroka tatu dan alat apa yang paling berguna.',
    designTattoo: 'Reka tatu\n yang anda mahu',
    designTattooDescription:
      'Taip beberapa perkataan atau muat naik imej dan hasilkan reka bentuk tatu unik serta-merta.',
    whereTattoo: 'Di mana anda mahu\n tatu itu?',
    whereTattooDescription:
      'Penempatan mempengaruhi reka bentuk, saiz dan aliran yang membantu kami menyesuaikan idea untuk badan anda.',
    pickStyles: 'Pilih sehingga 5\n gaya yang anda suka',
    pickStylesDescription:
      'Pilihan gaya anda membantu kami menyempitkan reka bentuk yang sepadan dengan citarasa anda.',
    whenTattoo: 'Bila anda merancang\n untuk membuat tatu?',
    whenTattooDescription:
      'Ini membantu kami menyesuaikan\n pengalaman dengan jadual anda.',
    whatVibe: 'Suasana apa yang\n anda mahukan?',
    whatVibeDescription:
      'Tatu membawa emosi, ini membantu kami memahami cerita di sebalik tatu anda.',
    settingUp: 'Menyediakan semuanya\n untuk anda',
    youreAllSet: 'Anda sudah sedia!',
    youreAllSetDescription: 'Anda sudah sedia untuk bermula.',

    // CTA
    alreadyHaveAccount: 'Sudah ada akaun? ',
    signIn: 'Log Masuk',

    // User description options
    userDescription: {
      artist: 'Saya mencipta tatu',
      client: 'Saya ingin buat tatu',
      model: 'Saya gunakan tatu untuk kandungan',
      explorer: 'Saya hanya meneroka',
    },

    // Goal options
    goal: {
      tryOn: 'Cuba tatu pada foto saya',
      generate: 'Jana idea tatu',
      browse: 'Sekadar melihat atau mencari inspirasi',
      coverUp: 'Cover-up/Ubah suai tatu sedia ada',
    },

    // Location options
    location: {
      wrist: 'Pergelangan tangan',
      chest: 'Dada',
      hand: 'Tangan',
      back: 'Belakang',
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
      face: 'Muka',
      hips: 'Pinggul',
      thigh: 'Peha',
      tricep: 'Trisep',
      bicep: 'Bisep',
      collarbone: 'Tulang selangka',
      ankle: 'Buku lali',
      foot: 'Kaki',
      palm: 'Tapak tangan',
      notSure: 'Belum pasti',
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
      religious: 'Keagamaan',
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
      someday: 'Suatu hari nanti, saya hanya meneroka',
    },

    // Vibe options
    vibe: {
      bold: 'Berani',
      confident: 'Yakin',
      soft: 'Lembut',
      dark: 'Gelap',
      edgy: 'Tajam',
      elegant: 'Elegan',
      spiritual: 'Spiritual',
      cute: 'Comel',
      symbolic: 'Simbolik',
      playful: 'Riang',
      clean: 'Bersih',
      modern: 'Moden',
      meaningful: 'Bermakna',
      personalStory: 'Cerita peribadi',
      family: 'Keluarga',
      love: 'Cinta',
      memory: 'Kenangan',
      rebirth: 'Kelahiran semula',
      freedom: 'Kebebasan',
      mystical: 'Mistik',
      rebellious: 'Memberontak',
      serene: 'Tenang',
      empowered: 'Berdaya',
      ethereal: 'Etereal',
      fearless: 'Tanpa takut',
      wanderlust: 'Jiwa pengembara',
      transcendent: 'Transenden',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Memahami visi {{name}}',
      understandingVisionDefault: 'Memahami visi anda',
      tailoringDesigns: 'Menyesuaikan reka bentuk dengan gaya anda',
      settingUpCoverUp: 'Menyediakan alat cover-up',
      personalizingExperience: 'Memperibadikan pengalaman anda',
      preparingStudio: 'Menyediakan studio reka bentuk anda',
      configuringWorkspace: 'Mengkonfigurasi ruang kerja anda',
      applyingPreferences: 'Menerapkan pilihan anda',
      journeyStartsNow: 'Perjalanan tatu anda bermula sekarang',
    },

    // Reviews
    reviews: {
      review1Title: 'Aplikasi hebat!',
      review1Body:
        'Aplikasi berfungsi dengan baik, tampilan dan rasa yang bagus! Terkesan dengan cara mengaplikasikan tatu, mengambil kira pencahayaan dan bayangan dengan tepat.',
      review1Author: 'Jacob C.',
      review2Title: 'Sangat berguna',
      review2Body:
        'Reka bentuk tatu bersih dan terperinci. Sesetengah imej mengambil masa lebih lama untuk dijana, tetapi secara keseluruhan ia antara aplikasi tatu AI terbaik.',
      review2Author: 'Alexrays1',
      review3Title: 'Saya suka ini',
      review3Body: 'Sangat disyorkan \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Jana Tatu Serta-Merta',
    containerDesc1:
      'Taip beberapa perkataan dan hasilkan reka bentuk tatu unik serta-merta.',
    containerTitle2: 'Peribadikan Reka Bentuk Anda',
    containerDesc2:
      'Laraskan warna, susun atur dan gaya untuk menjadikan tatu benar-benar milik anda.',
    containerTitle3: 'Pratonton pada Kulit Anda',
    containerDesc3:
      'Pratonton mana-mana tatu pada kulit anda — laraskan saiz dan penempatan serta-merta.',
    paused: 'Dijeda',

    // Relative time
    time: {
      today: 'Hari ini',
      yesterday: 'Semalam',
      daysAgo: '{{count}} hari lepas',
      weeksAgo: '{{count}} minggu lepas',
      monthsAgo: '{{count}} bulan lepas',
      yearsAgo: '{{count}} tahun lepas',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Teknologi Cuba Tatu',
      tryOnTechnologyDesc: 'Lihat tatu pada kulit anda sebelum membuat keputusan',
      aiTattooGenerator: 'Penjana Tatu AI',
      aiTattooGeneratorDesc: 'Cipta reka bentuk unik daripada idea anda',
      coverUpAssistant: 'Pembantu Cover-Up',
      coverUpAssistantDesc: 'Ubah tatu lama menjadi karya seni baharu',
      artistTools: 'Alat Artis',
      artistToolsDesc:
        'Tunjukkan reka bentuk pada badan pelanggan serta-merta',
      precisePlacement: 'Penempatan Tepat',
      precisePlacementDesc:
        'Saiz sempurna untuk tatu di {{location}} anda',
      styleMatchedDesigns: 'Reka Bentuk Sepadan Gaya',
      styleMatchedDesignsDesc:
        'Inspirasi tatu {{style}} yang dikurasi',
      readyWhenYouAre: 'Sedia Bila Anda Sedia',
      readyWhenYouAreDesc: 'Mula mereka hari ini, tatu esok',
      realisticTryOn: 'Cuba Tatu Realistik',
      realisticTryOnDesc: 'Lihat tepat bagaimana ia akan kelihatan pada anda',
      saveAndShare: 'Simpan & Kongsi',
      saveAndShareDesc:
        'Simpan kegemaran anda dan kongsi dengan artis tatu',
      aiDesignStudio: 'Studio Reka Bentuk AI',
      aiDesignStudioDesc: 'Jana reka bentuk tatu unik serta-merta',

      // Personalized greetings
      greetingArtist: 'Alat pengalaman pelanggan baharu anda sudah sedia',
      greetingCoverUp: 'Sedia untuk mengubah tatu anda',
      greetingGenerate: 'Studio reka bentuk AI anda menanti',
      greetingDefault: 'Perjalanan tatu anda bermula sekarang',
      welcomeAboard: 'Selamat datang, {{name}}!',
      welcomeName: 'Selamat datang {{name}}',

      // Urgency messages
      urgencyArtist: 'Tunjukkan pratonton sebenar kepada pelanggan serta-merta.',
      urgencyCoverUp: 'Perbaiki tatu anda dengan yakin.',
      urgencyTryOn: 'Cuba tatu anda sebelum membuat keputusan.',
      urgencyDefault: 'Reka bentuk tanpa had. Tanpa penyesalan.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Teruskan',
    restorePurchase: 'Pulihkan Pembelian',
    current: 'SEMASA',

    // Plan terms
    week: 'Minggu',
    month: 'Bulan',
    weekly: 'Mingguan',
    monthly: 'Bulanan',
    perWeek: '/Minggu',

    // Content
    loadingPlans: 'Memuatkan pelan...',
    restoreSubscription: 'Pulihkan Langganan',
    fairUseNote: 'Penjanaan reka bentuk AI termasuk had penggunaan wajar.',
    saveBadge: 'Jimat {{percent}}%',
    subtitle:
      'Terokai idea tatu, perhalusi reka bentuk melalui variasi tanpa had, cuba pada mana-mana bahagian badan, dan eksport hasil berkualiti tinggi dengan yakin.',

    // Personalized headlines
    headlineArtist: 'Tunjukkan tatu kepada pelanggan sebelum ditatu',
    headlineCoverUp: 'Ubah tatu anda dengan yakin',
    headlineTryOn: 'Lihat tatu anda sebelum membuat keputusan',
    headlineDesign: 'Reka tatu yang anda sentiasa impikan',
    headlineBrowse: 'Cari reka bentuk tatu sempurna anda',

    // Purchase flow alerts
    successTitle: 'Berjaya!',
    subscriptionActiveMessage:
      'Langganan anda kini aktif. Nikmati reka bentuk tatu tanpa had!',
    almostThereTitle: 'Hampir siap!',
    createAccountMessage:
      'Cipta akaun untuk mengaktifkan langganan dan mula mereka.',
    purchaseRestoredTitle: 'Pembelian Dipulihkan!',
    subscriptionNowActive: 'Langganan anda kini aktif.',
    purchaseFoundTitle: 'Pembelian Dijumpai!',
    purchasesRestoredMessage: 'Pembelian anda telah dipulihkan.',
    noPurchasesFoundTitle: 'Tiada Pembelian Dijumpai',
    noPurchasesFoundMessage:
      'Tiada pembelian terdahulu dijumpai untuk dipulihkan.',
    purchaseFailedTitle: 'Pembelian Gagal',
    purchaseFailedMessage:
      'Tidak dapat menyelesaikan pembelian. Sila cuba lagi.',
    errorRestoringTitle: 'Ralat Memulihkan Pembelian',
    errorRestoringMessage:
      'Tidak dapat memulihkan pembelian. Sila cuba lagi.',
    subscriptionActivated: 'Langganan diaktifkan!',

    // Alerts
    purchaseError: 'Ralat Pembelian',
    restoreSuccess: 'Pembelian Dipulihkan',
    restoreError: 'Pemulihan Gagal',
    noPurchaseFound: 'Tiada pembelian terdahulu dijumpai',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Batalkan Penjanaan',
    cancelGenerationTitle: 'Batalkan Penjanaan?',
    cancelGenerationMessage:
      'Anda akan membatalkan penjanaan semasa. Ini akan membuang penjanaan semasa dan memulakan sesi baharu.',
    clearEverythingTitle: 'Padam Semuanya?',
    clearEverythingMessage:
      'Anda akan memadam sesi ini. Ini akan membuang semua tatu yang dijana. Simpan apa sahaja yang anda mahu kekalkan sebelum meneruskan.',
    clearEverything: 'Padam Semuanya',

    // Input
    enterText: 'Masukkan teks',
    describeTattoo: 'Huraikan tatu anda atau pilih cadangan di bawah',

    // Try on alert
    tryOnTitle: 'Cuba {{style}}',
    tryOnMessage:
      'Ambil gambar bahagian badan anda untuk melihat bagaimana tatu ini kelihatan pada anda!',
    choosePhoto: 'Pilih Foto',
    later: 'Nanti',

    // Preview on body
    previewOnBody: 'Pratonton Tatu pada Badan',
    imageSelectedCombine: '1 imej dipilih - tambah satu lagi untuk digabungkan',

    // Suggestions
    createTattoo: 'Cipta tatu {{title}}',
    createStyleTattoo: 'Cipta tatu gaya {{title}}',
    tryStyle: 'Cuba gaya {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Mengemas kini tatu anda...',
      startingNew: 'Memulakan tatu baharu...',
      warmingUp: 'Mesin tatu sedang memanaskan...',
      summoningSpirits: 'Memanggil roh dakwat...',
      drawingInspiration: 'Mencari inspirasi dari alam semesta...',
      brewingMasterpiece: 'Hampir siap meramu karya agung anda...',
      sprinkleCreativity: 'Menambah sedikit kreativiti...',
      perfectingPixels: 'Menyempurnakan setiap piksel tatu anda...',
      injectingCreativity: 'Menyuntik kreativiti ke kulit anda...',
      mixingShade: 'Mencampur warna yang sempurna...',
      sharpeningNeedles: 'Mengasah jarum maya...',
      calibratingVibes: 'Menentukur vibes tatu anda...',
      consultingOracle: 'Berunding dengan oracle tatu...',
    },

    // Error states
    error: {
      keepCreating: 'Terus mencipta tanpa had',
      limitReachedFree:
        'Anda telah mencapai had penjanaan semasa. Naik taraf sekarang untuk meneroka variasi, memperhalusi reka bentuk dan terus mencipta tanpa menunggu.',
      unlockUnlimited: 'Buka kunci reka bentuk tanpa had \u2192',
      limitReachedSubscribed:
        'Anda telah mencapai had untuk tempoh ini',
      limitReachedSubscribedDesc:
        'Had penjanaan pelan anda telah dicapai. Had akan ditetapkan semula pada permulaan tempoh pengebilan seterusnya.',
      tryAgainLater: 'Cuba lagi nanti',
      contactSupport: 'Hubungi sokongan',
    },

    // Session history actions
    actions: 'Tindakan',
    saveToGallery: 'Simpan ke Galeri',

    // Result image actions
    imageActions: 'Tindakan Imej',
    copyToClipboard: 'Salin ke Papan Klip',
    imageCopied: 'Imej disalin ke papan klip',
    imageCopyFailed: 'Gagal menyalin imej',
    imageSaved: 'Imej disimpan ke galeri!',
    imageSaveFailed: 'Gagal menyimpan imej. Sila cuba lagi.',

    // Context alerts
    photoAccessTitle: 'Akses Foto Diperlukan',
    photoAccessMessage:
      'Untuk menyimpan imej ke galeri, kami memerlukan akses ke foto anda. Anda boleh mengaktifkannya dalam Tetapan.',
    resetSessionTitle: 'Set Semula Sesi?',
    resetSessionMessage:
      'Adakah anda pasti mahu set semula sesi? Ini akan memadam semua tatu yang dijana dan memulakan sesi baharu.',
    resetButton: 'Set Semula',
    shareError: 'Gagal berkongsi imej',
    imageDataError: 'Gagal mendapatkan data imej',
    pickImageError: 'Gagal memilih imej dari galeri',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Imej tidak dijumpai',
    useTattoo: 'Guna Tatu',
    useTattooError: 'Gagal menggunakan tatu ini. Sila cuba lagi.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Semua Foto',
    addPhotos: 'Tambah {{count}} foto',
    addPhotos_other: 'Tambah {{count}} foto',
    recentPhotos: 'Foto Terkini',
    selectOneMore: 'Pilih 1 lagi untuk digabungkan',

    // Options
    tryOn: 'Cuba Tatu',
    tryOnDescriptionWithTattoo:
      'Tambah foto badan anda untuk pratonton',
    tryOnDescriptionNoTattoo:
      'Pilih tatu dahulu, kemudian tambah foto anda',
    createNewTattoo: 'Cipta Tatu Baharu',
    createNewTattooDescription:
      'Huraikan idea tatu anda dan kami akan jananya',
    tattooCoverUp: 'Idea Cover-Up Tatu',
    tattooCoverUpDescription:
      'Jana idea untuk menutup tatu sedia ada menggunakan foto sebagai rujukan',
    removeTattoo: 'Buang Tatu',
    removeTattooDescription:
      'Buang tatu sedia ada daripada foto',
    promptHistory: 'Sejarah Prompt',
    promptHistoryDescription: 'Lihat prompt terdahulu anda',
    requestFeature: 'Minta Ciri Baharu',
    requestFeatureDescription:
      'Beritahu kami apa yang anda mahu Tattoo Design AI sokong seterusnya',

    // Try on alerts
    addYourPhoto: 'Tambah Foto Anda',
    addPhotoQuestion:
      'Bagaimana anda ingin menambah foto tempat anda mahu tatu?',
    takePhoto: 'Ambil Foto',
    chooseFromLibrary: 'Pilih dari Perpustakaan',
    createTattooFirst: 'Cipta Tatu Dahulu',
    createTattooFirstMessage:
      'Untuk mencuba tatu, anda perlu:\n\n1. Jana atau pilih reka bentuk tatu\n2. Kemudian tambah foto badan anda\n\nKami akan gabungkan untuk menunjukkan bagaimana ia kelihatan!',
    createTattoo: 'Cipta Tatu',
  },

  tattoos: {
    // Screen header
    title: 'Tatu Saya',

    // Loading
    loading: 'Memuatkan tatu...',

    // Empty state
    emptyTitle: 'Belum ada tatu yang disimpan',
    emptyDescription:
      'Cipta dan simpan reka bentuk tatu pertama anda! Leret ke bawah untuk muat semula.',

    // Cloud restore
    restoringFromCloud: 'Memulihkan dari awan...',
    noCloudGenerations: 'Tiada penjanaan awan dijumpai',
    restoredCount: 'Dipulihkan {{restored}} daripada {{total}} tatu',
    restoreFailedTitle: 'Pemulihan Gagal',
    restoreFailedMessage:
      'Tidak dapat memulihkan dari awan. Sila cuba lagi.',
    cloudFound: '{{count}} tatu dijumpai di awan',
    cloudFound_other: '{{count}} tatu dijumpai di awan',
    restoring: 'Memulihkan...',
    restore: 'Pulihkan',
    cloudCount: '{{count}} di awan',

    // Detail screen
    tattooNotFound: 'Tatu tidak dijumpai',
    backToHome: 'Kembali ke utama',
    shareError: 'Tidak dapat berkongsi imej. Sila cuba lagi.',
    imageAccessError: 'Tidak dapat mengakses fail imej.',
    deleteTitle: 'Padam Tatu',
    deleteMessage:
      'Adakah anda pasti mahu memadam reka bentuk tatu ini? Tindakan ini tidak boleh dibuat asal.',
    deleteError: 'Tidak dapat memadam imej. Sila cuba lagi.',
  },

  generation: {
    // Loading
    applyingDesign: 'Mengaplikasikan reka bentuk tatu anda...',

    // Error
    invalidRequest: 'Permintaan Tidak Sah',
    generationFailed: 'Penjanaan Gagal',
    failedToGenerate: 'Gagal menjana reka bentuk tatu',
    startOver: 'Mula Semula',

    // Success
    tattooReady: 'Tatu Anda Sudah Sedia!',
    tattooReadyDescription:
      'Ini bagaimana reka bentuk anda kelihatan apabila diaplikasikan',
    saveToGallery: 'Simpan ke Galeri',
    generateAnother: 'Jana Lagi',

    // Save alerts
    savedTitle: 'Tersimpan!',
    savedMessage:
      'Reka bentuk tatu anda telah disimpan ke galeri foto.',
    viewInGallery: 'Lihat di galeri',

    // Generate another alert
    generateAnotherTitle: 'Jana Lagi?',
    generateAnotherMessage:
      'Anda belum menyimpan tatu ini. Adakah anda ingin menyimpannya sebelum meneruskan?',
    continueWithoutSaving: 'Teruskan Tanpa Menyimpan',
    saveAndContinue: 'Simpan dan Teruskan',

    // Cancel alert
    cancelGenerationTitle: 'Batalkan Penjanaan?',
    cancelGenerationMessage:
      'Tatu anda masih dijana. Jika anda membatalkan sekarang, penjanaan ini masih akan dikira ke had penggunaan anda. Adakah anda pasti mahu membatalkan?',
    keepGenerating: 'Teruskan Menjana',
    unableToSave: 'Tidak dapat menyimpan imej. Sila cuba lagi.',
  },

  home: {
    // Section headers
    discoverStyles: 'Terokai gaya baharu',
    moreStyles: 'Lagi gaya',
    moods: 'Suasana',
    discoverSketches: 'Terokai reka bentuk lakaran',

    // Quick actions
    generateFromIdea: 'Jana dari Idea',
    generateFromIdeaDesc: 'Cipta tatu daripada imaginasi anda',
    seeItOnSkin: 'Lihat pada Kulit Anda',
    seeItOnSkinDesc: 'Ambil foto dan pratonton tatu',
    blendTattoo: 'Gabungkan Tatu',
    blendTattooDesc: 'Muat naik tatu sedia ada dan ubah suai',
    removeTattoo: 'Buang Tatu',
    removeTattooDesc: 'Buang tatu sedia ada dari kulit',
  },

  explore: {
    // Section headers
    byStyles: 'Terokai mengikut gaya',
    byMoods: 'Terokai mengikut suasana',
    byBodyPart: 'Terokai mengikut bahagian badan',

    // Filter labels
    styles: 'Gaya',
    bodyPart: 'Bahagian badan',
  },

  featureRequest: {
    title: 'Kongsi Idea Anda',
    placeholder: 'Idea untuk meningkatkan pengalaman anda...',
    needHelp: 'Perlukan bantuan? ',
    contactUs: 'Hubungi kami',
    successToast:
      'Permintaan ciri dihantar! Terima kasih atas maklum balas anda.',
    errorToast:
      'Gagal menghantar permintaan ciri. Sila cuba lagi.',
  },

  promptHistory: {
    title: 'Sejarah Prompt',
    clearAll: 'Padam Semua',
    clearAllTitle: 'Padam Sejarah Prompt',
    clearAllMessage:
      'Adakah anda pasti mahu memadam semua prompt yang disimpan?',
    deletePromptTitle: 'Padam Prompt',
    deletePromptMessage: 'Buang prompt ini dari sejarah?',
    emptyTitle: 'Belum ada prompt',
    emptyDescription:
      'Prompt anda akan muncul di sini selepas anda menjana tatu',
  },
};
