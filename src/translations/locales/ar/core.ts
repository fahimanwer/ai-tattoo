/**
 * Arabic translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const arCore = {
  common: {
    // Actions
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'تم بنجاح',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    save: 'حفظ',
    done: 'تم',
    close: 'إغلاق',
    back: 'رجوع',
    next: 'التالي',
    skip: 'تخطي',
    continue: 'متابعة',
    retry: 'إعادة المحاولة',
    delete: 'حذف',
    edit: 'تعديل',
    share: 'مشاركة',
    send: 'إرسال',
    search: 'بحث',
    seeAll: 'عرض الكل',
    tryAgain: 'حاول مجدداً',
    ok: 'حسناً',
    yes: 'نعم',
    no: 'لا',
    or: 'أو',
    upgrade: 'ترقية',
    processing: 'جاري المعالجة...',
    openSettings: 'فتح الإعدادات',
    readMore: 'اقرأ المزيد',
    createTattoo: 'إنشاء وشم',
    style: 'نمط',

    // States
    on: 'مفعّل',
    off: 'معطّل',
    enabled: 'مُفعّل',
    disabled: 'مُعطّل',

    // Errors
    somethingWentWrong: 'حدث خطأ ما',
    unexpectedError: 'حدث خطأ غير متوقع',
  },

  tabs: {
    home: 'الرئيسية',
    explore: 'استكشاف',
    myTattoos: 'وشومي',
    profile: 'الملف الشخصي',
    tryOnTattoo: 'تجربة الوشم',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'مرحباً بعودتك!',
    signInDescription: 'يرجى اختيار طريقة تسجيل الدخول المفضلة لديك',
    signIn: 'تسجيل الدخول',
    alreadyHaveAccount: 'لديك حساب بالفعل؟ ',
    termsOfService: 'شروط الخدمة',
    privacyPolicy: 'سياسة الخصوصية',
    byContinuingAgree: 'بالمتابعة فإنك توافق على ',
    inkognitoMode: 'وضع Ink-ognito',
    inkognitoDescription: 'تصاميمك تبقى معك، وليس معنا.',
    signInToContinue:
      'يرجى تسجيل الدخول للمتابعة وإنشاء وشمك!',
    signInBenefit:
      'بتسجيل الدخول، يمكننا تتبع عمليات إنشاء الوشم المجانية وضمان إعداد حسابك بشكل صحيح.',
    notSignedIn: '(لم يتم تسجيل الدخول)',
  },

  profile: {
    // Screen header
    title: 'الملف الشخصي',

    // Section headers
    account: 'الحساب',
    planAndUsage: 'الخطة والاستخدام',
    settings: 'الإعدادات',
    support: 'الدعم',
    legal: 'قانوني',
    dangerZone: 'منطقة الخطر',
    supportAndFeedback: 'الدعم والملاحظات',
    followUs: 'تابعنا',

    // Sign-in prompt
    notSignedIn: 'لم يتم تسجيل الدخول',
    signInPrompt:
      'سجّل الدخول للوصول إلى تفاصيل حسابك ومعلومات الاشتراك والميزات المخصصة',

    // Account
    email: 'البريد الإلكتروني',
    name: 'الاسم',
    model: 'النموذج',
    userId: 'معرّف المستخدم',
    memberSince: 'عضو منذ',
    signOut: 'تسجيل الخروج',
    logOut: 'تسجيل الخروج',
    signOutConfirmTitle: 'تسجيل الخروج',
    signOutConfirmMessage: 'هل أنت متأكد من رغبتك في تسجيل الخروج؟',
    unknownUser: 'مستخدم غير معروف',

    // Plan
    plan: 'الخطة',
    activeUsagePeriod: 'فترة الاستخدام النشطة',
    currentPlan: 'الخطة الحالية',
    planDetails: 'تفاصيل الخطة',
    status: 'الحالة',
    renewsOn: 'يتم التجديد في',
    expiresOn: 'تنتهي في',
    daysRemaining: 'الأيام المتبقية',
    daysValue: '{{count}} أيام',
    price: 'السعر',
    billingPeriod: 'فترة الفوترة',
    managePlan: 'إدارة الخطة',
    upgradePlan: 'ترقية الخطة',
    upgradeNow: 'الترقية الآن',
    limitReachedFooter:
      'لقد وصلت إلى حد الإنشاء. قم بالترقية للمتابعة.',
    noSubscription: 'لا يوجد اشتراك',
    cancelledActive: 'ملغى (نشط)',
    cancelledActiveUntilExpiration: 'ملغى (نشط حتى انتهاء الصلاحية)',
    activeUntilExpiration: 'نشط حتى انتهاء الصلاحية',
    accessEndsOn: 'ينتهي الوصول في',
    autoRenew: 'التجديد التلقائي',
    cancelledAt: 'تاريخ الإلغاء',
    expiredOn: 'انتهت في',
    refreshing: 'جاري التحديث...',
    refreshData: 'تحديث البيانات',
    limitReachedFooterLong:
      'لقد وصلت إلى حد إنشاء وشم الذكاء الاصطناعي لهذه الخطة. قم بالترقية لمتابعة إنشاء الوشوم أو تواصل معنا.',
    weMissYouFooter:
      'مستعد لإنشاء وشوم رائعة أخرى؟ عد وهيا نصمم شيئاً مذهلاً معاً.',
    unknown: 'غير معروف',
    free: 'مجاني',
    pro: 'Pro',
    active: 'نشط',
    expired: 'منتهي',
    cancelled: 'ملغى',
    generationsUsed: 'عمليات الإنشاء المستخدمة',
    generationsRemaining: 'عمليات الإنشاء المتبقية',
    unlimited: 'غير محدود',
    na: 'غ/م',

    // We Miss You
    weMissYou: 'نفتقدك!',
    previousPlan: 'الخطة السابقة',
    comeBackAndCreate: 'عد وأبدع',

    // Enjoying the app
    enjoyingApp: 'هل تستمتع بالتطبيق؟',
    enjoyingAppDescription:
      'إذا كنت تستمتع بـ Tattoo Design AI، فإن تقييمك يساعد محبي الوشم الآخرين على اكتشافنا. يمكنك أيضاً التواصل معنا في أي وقت بملاحظاتك أو أفكارك.',
    rateOnPlayStore: 'قيّم على Play Store',
    rateOnAppStore: 'قيّم على App Store',
    sendFeedback: 'إرسال ملاحظات',

    // Are you an artist
    areYouArtist: 'هل أنت فنان؟',
    artistDescription:
      'مهتم بالتعاون؟ لديك اقتراحات أو شكاوى؟ يسعدنا سماعك!',
    writeToUs: 'اكتب لنا',

    // Support
    contactSupport: 'التواصل مع الدعم',
    requestFeature: 'طلب ميزة',
    rateApp: 'تقييم التطبيق',
    shareApp: 'مشاركة التطبيق',
    shareWithFriends: 'مشاركة مع الأصدقاء',
    shareMessage: 'تعرّف على Tattoo Design AI \n',

    // Settings
    appearance: 'المظهر',
    light: 'فاتح',
    dark: 'داكن',
    system: 'النظام',
    language: 'اللغة',
    languageAuto: 'تلقائي (النظام)',
    showOnboarding: 'عرض شاشة الترحيب',
    promptEnhancement: 'تحسين الأوامر',
    promptEnhancementDisabledTitle: 'تحسين الأوامر معطّل',
    promptEnhancementDisabledMessage:
      'قد تختلف النتائج بدون التحسين. يمكنك تفعيله مرة أخرى في أي وقت.',

    // Legal
    termsOfService: 'شروط الخدمة',
    privacyPolicy: 'سياسة الخصوصية',

    // Danger
    deleteAccount: 'حذف الحساب',
    deleteAccountConfirmTitle: 'حذف الحساب',
    deleteAccountConfirmMessage:
      'هل أنت متأكد؟ لا يمكن التراجع عن هذا الإجراء. ملاحظة: هذا لا يلغي الاشتراكات النشطة.',
    dangerZoneFooter:
      'حذف الحساب نهائي. هذا لا يلغي الاشتراكات النشطة.',
    resetOnboarding: 'إعادة تعيين شاشة الترحيب',

    // Version
    version: 'الإصدار',
  },

  emails: {
    support: {
      subject: 'طلب دعم تطبيق Tattoo Design AI',
      body: 'مرحباً،\n\nأحتاج إلى مساعدة في تطبيق Tattoo Design AI.\n\n{{userInfo}}\n\nالوصف:\n[يرجى وصف مشكلتك هنا]\n\nشكراً!',
    },
    featureRequest: {
      subject: 'مساعدة في طلب ميزة Tattoo Design AI',
      body: 'مرحباً،\n\nأحتاج إلى مساعدة في تقديم طلب ميزة.\n\n',
    },
    feedback: {
      subject: 'ملاحظات Tattoo Design AI',
      body: 'مرحباً!\n\nلدي بعض الملاحظات حول Tattoo Design AI:\n\n[ملاحظاتك هنا]{{userInfo}}\n\nشكراً!',
    },
    artist: {
      subject: 'هل أنت فنان؟ - Tattoo Design AI',
      body: 'مرحباً!\n\nأنا مهتم بالتعاون أو لدي اقتراحات/شكاوى.\n\n{{userInfo}}\n\n[يرجى مشاركة اقتراحاتك أو شكاواك أو أخبرنا عن نفسك كفنان]\n\nشكراً!',
    },
    userIdLabel: 'معرّف المستخدم: {{id}}',
    emailLabel: 'البريد الإلكتروني: {{email}}',
    accountLabel: 'بريد حسابي: {{email}}',
    myUserIdLabel: 'معرّف المستخدم الخاص بي: {{id}}',
    accountInfo: '\n\nالحساب: {{email}}',
  },

  notFound: {
    title: 'عذراً!',
    description: 'هذه الشاشة غير موجودة.',
    goHome: 'الذهاب إلى الشاشة الرئيسية!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'لنبدأ',
    photoAccessDescription:
      'نحتاج إلى الوصول إلى صورك لإضافة الصور',
    photoAccessDeniedTitle: 'الوصول إلى الصور مطلوب',
    photoAccessDeniedDescription:
      'تتطلب هذه الميزة الوصول إلى مكتبة الصور لعرض وحفظ وشومك. يمكنك إدارة الوصول إلى الصور من إعدادات جهازك.',
    photoLibraryNeeded:
      'نحتاج إلى الوصول إلى مكتبة الصور الخاصة بك حتى تتمكن من عرض وحفظ وشومك.',

    // Camera
    cameraAccessTitle: 'لنبدأ',
    cameraAccessDescription:
      'نحتاج إلى الوصول إلى الكاميرا لالتقاط الصور.',
    cameraAccessDeniedTitle: 'الوصول إلى الكاميرا مطلوب',
    cameraAccessDeniedDescription:
      'تتطلب هذه الميزة الوصول إلى الكاميرا. يمكنك إدارة الوصول إلى الكاميرا من إعدادات جهازك.',
  },
};
