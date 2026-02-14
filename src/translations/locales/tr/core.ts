/**
 * Turkish translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const trCore = {
  common: {
    // Actions
    loading: 'Yükleniyor...',
    error: 'Hata',
    success: 'Başarılı',
    cancel: 'İptal',
    confirm: 'Onayla',
    save: 'Kaydet',
    done: 'Tamam',
    close: 'Kapat',
    back: 'Geri',
    next: 'İleri',
    skip: 'Atla',
    continue: 'Devam',
    retry: 'Tekrar Dene',
    delete: 'Sil',
    edit: 'Düzenle',
    share: 'Paylaş',
    send: 'Gönder',
    search: 'Ara',
    seeAll: 'Tümünü Gör',
    tryAgain: 'Tekrar Dene',
    ok: 'Tamam',
    yes: 'Evet',
    no: 'Hayır',
    or: 'veya',
    upgrade: 'Yükselt',
    processing: 'İşleniyor...',
    openSettings: 'Ayarları Aç',
    readMore: 'Devamını Oku',
    createTattoo: 'Dövme Oluştur',
    style: 'Stil',

    // States
    on: 'Açık',
    off: 'Kapalı',
    enabled: 'Etkin',
    disabled: 'Devre Dışı',

    // Errors
    somethingWentWrong: 'Bir şeyler yanlış gitti',
    unexpectedError: 'Beklenmeyen bir hata oluştu',
  },

  tabs: {
    home: 'Ana Sayfa',
    explore: 'Keşfet',
    myTattoos: 'Dövmelerim',
    profile: 'Profil',
    tryOnTattoo: 'Dövme Dene',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Tekrar hoş geldiniz!',
    signInDescription: 'Lütfen tercih ettiğiniz giriş yöntemini seçin',
    signIn: 'Giriş Yap',
    alreadyHaveAccount: 'Zaten bir hesabınız var mı? ',
    termsOfService: 'Kullanım Koşulları',
    privacyPolicy: 'Gizlilik Politikası',
    byContinuingAgree: 'Devam ederek şunları kabul etmiş olursunuz: ',
    inkognitoMode: 'Ink-ognito modu',
    inkognitoDescription: 'Tasarımlarınız sizde kalır, bizde değil.',
    signInToContinue:
      'Devam etmek ve dövmenizi oluşturmak için lütfen giriş yapın!',
    signInBenefit:
      'Giriş yaparak ücretsiz dövme oluşturma haklarınızı takip edebilir ve hesabınızı doğru şekilde ayarlayabiliriz.',
    notSignedIn: '(Giriş yapılmadı)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Hesap',
    planAndUsage: 'Plan ve Kullanım',
    settings: 'Ayarlar',
    support: 'Destek',
    legal: 'Yasal',
    dangerZone: 'Tehlikeli Bölge',
    supportAndFeedback: 'Destek ve Geri Bildirim',
    followUs: 'Bizi Takip Edin',

    // Sign-in prompt
    notSignedIn: 'Giriş yapılmadı',
    signInPrompt:
      'Hesap bilgilerinize, abonelik durumunuza ve kişiselleştirilmiş özelliklere erişmek için giriş yapın',

    // Account
    email: 'E-posta',
    name: 'İsim',
    model: 'Model',
    userId: 'Kullanıcı Kimliği',
    memberSince: 'Üyelik Tarihi',
    signOut: 'Çıkış Yap',
    logOut: 'Çıkış Yap',
    signOutConfirmTitle: 'Çıkış Yap',
    signOutConfirmMessage: 'Çıkış yapmak istediğinize emin misiniz?',
    unknownUser: 'Bilinmeyen Kullanıcı',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Aktif Kullanım Dönemi',
    currentPlan: 'Mevcut Plan',
    planDetails: 'Plan Detayları',
    status: 'Durum',
    renewsOn: 'Yenilenme Tarihi',
    expiresOn: 'Bitiş Tarihi',
    daysRemaining: 'Kalan Gün',
    daysValue: '{{count}} gün',
    price: 'Fiyat',
    billingPeriod: 'Fatura Dönemi',
    managePlan: 'Planı Yönet',
    upgradePlan: 'Planı Yükselt',
    upgradeNow: 'Şimdi Yükselt',
    limitReachedFooter:
      'Oluşturma limitinize ulaştınız. Devam etmek için yükseltin.',
    noSubscription: 'Abonelik yok',
    cancelledActive: 'İptal Edildi (Aktif)',
    cancelledActiveUntilExpiration: 'İptal Edildi (Sona Erene Kadar Aktif)',
    activeUntilExpiration: 'Sona Erene Kadar Aktif',
    accessEndsOn: 'Erişim Bitiş Tarihi',
    autoRenew: 'Otomatik Yenileme',
    cancelledAt: 'İptal Tarihi',
    expiredOn: 'Sona Erme Tarihi',
    refreshing: 'Yenileniyor...',
    refreshData: 'Verileri yenile',
    limitReachedFooterLong:
      'Bu plan için AI dövme oluşturma limitinize ulaştınız. Dövme oluşturmaya devam etmek için yükseltin veya bizimle iletişime geçin.',
    weMissYouFooter:
      'Harika dövmeler oluşturmaya hazır mısınız? Geri dönün ve birlikte muhteşem bir şeyler tasarlayalım.',
    unknown: 'Bilinmiyor',
    free: 'Ücretsiz',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Aktif',
    expired: 'Süresi Dolmuş',
    cancelled: 'İptal Edildi',
    generationsUsed: 'Kullanılan Oluşturmalar',
    generationsRemaining: 'Kalan Oluşturmalar',
    unlimited: 'Sınırsız',
    na: 'Yok',

    // We Miss You
    weMissYou: 'Sizi Özledik!',
    previousPlan: 'Önceki Plan',
    comeBackAndCreate: 'Geri Dönün ve Oluşturun',

    // Enjoying the app
    enjoyingApp: 'Uygulamayı beğeniyor musunuz?',
    enjoyingAppDescription:
      'Tattoo Design AI uygulamasını beğendiyseniz, bir değerlendirme diğer dövme tutkunlarının bizi keşfetmesine yardımcı olur. Ayrıca geri bildirim veya önerileriniz için istediğiniz zaman bize ulaşabilirsiniz.',
    rateOnPlayStore: 'Play Store\'da Değerlendir',
    rateOnAppStore: 'App Store\'da Değerlendir',
    sendFeedback: 'Geri Bildirim Gönder',

    // Are you an artist
    areYouArtist: 'Sanatçı mısınız?',
    artistDescription:
      'İş birliği yapmak ister misiniz? Önerileriniz veya şikayetleriniz mi var? Sizden duymak isteriz!',
    writeToUs: 'Bize Yazın',

    // Support
    contactSupport: 'Destek ile İletişim',
    requestFeature: 'Özellik Talep Et',
    rateApp: 'Uygulamayı Değerlendir',
    shareApp: 'Uygulamayı Paylaş',
    shareWithFriends: 'Arkadaşlarınla Paylaş',
    shareMessage: 'Tattoo Design AI uygulamasına göz atın \n',

    // Settings
    appearance: 'Görünüm',
    light: 'Açık',
    dark: 'Koyu',
    system: 'Sistem',
    language: 'Dil',
    languageAuto: 'Otomatik (Sistem)',
    showOnboarding: 'Karşılamayı Göster',
    promptEnhancement: 'İstem İyileştirme',
    promptEnhancementDisabledTitle: 'İstem İyileştirme Devre Dışı',
    promptEnhancementDisabledMessage:
      'İyileştirme olmadan sonuçlar değişebilir. İstediğiniz zaman tekrar açabilirsiniz.',

    // Legal
    termsOfService: 'Kullanım Koşulları',
    privacyPolicy: 'Gizlilik Politikası',

    // Danger
    deleteAccount: 'Hesabı Sil',
    deleteAccountConfirmTitle: 'Hesabı Sil',
    deleteAccountConfirmMessage:
      'Emin misiniz? Bu işlem geri alınamaz. Not: Bu, aktif abonelikleri İPTAL ETMEZ.',
    dangerZoneFooter:
      'Hesap silme işlemi kalıcıdır. Bu, aktif abonelikleri İPTAL ETMEZ.',
    resetOnboarding: 'Karşılamayı Sıfırla',

    // Version
    version: 'Sürüm',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI Uygulama Destek Talebi',
      body: 'Merhaba,\n\nTattoo Design AI uygulaması ile ilgili yardıma ihtiyacım var.\n\n{{userInfo}}\n\nAçıklama:\n[Lütfen sorununuzu burada açıklayın]\n\nTeşekkürler!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI Özellik Talebi Yardımı',
      body: 'Merhaba,\n\nÖzellik talebi göndermek için yardıma ihtiyacım var.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI Geri Bildirimi',
      body: 'Merhaba!\n\nTattoo Design AI hakkında geri bildirimim var:\n\n[Geri bildiriminizi buraya yazın]{{userInfo}}\n\nTeşekkürler!',
    },
    artist: {
      subject: 'Sanatçı mısınız? - Tattoo Design AI',
      body: 'Merhaba!\n\nİş birliği yapmak istiyorum veya önerilerim/şikayetlerim var.\n\n{{userInfo}}\n\n[Lütfen önerilerinizi, şikayetlerinizi paylaşın veya kendinizi bir sanatçı olarak tanıtın]\n\nTeşekkürler!',
    },
    userIdLabel: 'Kullanıcı Kimliği: {{id}}',
    emailLabel: 'E-posta: {{email}}',
    accountLabel: 'Hesap e-postam: {{email}}',
    myUserIdLabel: 'Kullanıcı kimliğim: {{id}}',
    accountInfo: '\n\nHesap: {{email}}',
  },

  notFound: {
    title: 'Hay aksi!',
    description: 'Bu ekran mevcut değil.',
    goHome: 'Ana sayfaya git!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Haydi Başlayalım',
    photoAccessDescription:
      'Görsel eklemek için fotoğraflarınıza erişmemiz gerekiyor',
    photoAccessDeniedTitle: 'Fotoğraf Erişimi Gerekli',
    photoAccessDeniedDescription:
      'Bu özellik, dövmelerinizi görüntülemek ve kaydetmek için fotoğraf kitaplığınıza erişim gerektirir. Fotoğraf erişimini cihaz ayarlarından yönetebilirsiniz.',
    photoLibraryNeeded:
      'Dövmelerinizi görüntüleyebilmeniz ve kaydedebilmeniz için fotoğraf kitaplığınıza erişmemiz gerekiyor.',

    // Camera
    cameraAccessTitle: 'Haydi Başlayalım',
    cameraAccessDescription:
      'Fotoğraf çekmek için kameranıza erişmemiz gerekiyor.',
    cameraAccessDeniedTitle: 'Kamera Erişimi Gerekli',
    cameraAccessDeniedDescription:
      'Bu özellik kameranıza erişim gerektirir. Kamera erişimini cihaz ayarlarından yönetebilirsiniz.',
  },
};
