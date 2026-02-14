/**
 * Hindi translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const hiCore = {
  common: {
    // Actions
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफल',
    cancel: 'रद्द करें',
    confirm: 'पुष्टि करें',
    save: 'सहेजें',
    done: 'हो गया',
    close: 'बंद करें',
    back: 'पीछे',
    next: 'अगला',
    skip: 'छोड़ें',
    continue: 'जारी रखें',
    retry: 'पुनः प्रयास करें',
    delete: 'हटाएं',
    edit: 'संपादित करें',
    share: 'साझा करें',
    send: 'भेजें',
    search: 'खोजें',
    seeAll: 'सभी देखें',
    tryAgain: 'फिर से प्रयास करें',
    ok: 'ठीक है',
    yes: 'हाँ',
    no: 'नहीं',
    or: 'या',
    upgrade: 'अपग्रेड करें',
    processing: 'प्रोसेसिंग...',
    openSettings: 'सेटिंग्स खोलें',
    readMore: 'और पढ़ें',
    createTattoo: 'टैटू बनाएं',
    style: 'शैली',

    // States
    on: 'चालू',
    off: 'बंद',
    enabled: 'सक्रिय',
    disabled: 'निष्क्रिय',

    // Errors
    somethingWentWrong: 'कुछ गलत हो गया',
    unexpectedError: 'एक अप्रत्याशित त्रुटि हुई',
  },

  tabs: {
    home: 'होम',
    explore: 'खोजें',
    myTattoos: 'मेरे टैटू',
    profile: 'प्रोफ़ाइल',
    tryOnTattoo: 'टैटू आज़माएं',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'वापसी पर स्वागत है!',
    signInDescription: 'कृपया अपनी पसंदीदा साइन इन विधि चुनें',
    signIn: 'साइन इन करें',
    alreadyHaveAccount: 'पहले से खाता है? ',
    termsOfService: 'सेवा की शर्तें',
    privacyPolicy: 'गोपनीयता नीति',
    byContinuingAgree: 'जारी रखकर आप हमारी शर्तों से सहमत होते हैं ',
    inkognitoMode: 'Ink-ognito मोड',
    inkognitoDescription: 'आपके डिज़ाइन आपके पास रहते हैं, हमारे पास नहीं।',
    signInToContinue:
      'कृपया जारी रखने और अपना टैटू बनाने के लिए साइन इन करें!',
    signInBenefit:
      'साइन इन करके, हम आपकी मुफ्त टैटू जनरेशन को ट्रैक कर सकते हैं और आपका खाता सही तरीके से सेट कर सकते हैं।',
    notSignedIn: '(साइन इन नहीं किया)',
  },

  profile: {
    // Screen header
    title: 'प्रोफ़ाइल',

    // Section headers
    account: 'खाता',
    planAndUsage: 'प्लान और उपयोग',
    settings: 'सेटिंग्स',
    support: 'सहायता',
    legal: 'कानूनी',
    dangerZone: 'खतरनाक क्षेत्र',
    supportAndFeedback: 'सहायता और फ़ीडबैक',
    followUs: 'हमें फ़ॉलो करें',

    // Sign-in prompt
    notSignedIn: 'साइन इन नहीं किया',
    signInPrompt:
      'अपने खाते की जानकारी, सदस्यता विवरण और व्यक्तिगत सुविधाओं तक पहुँचने के लिए साइन इन करें',

    // Account
    email: 'ईमेल',
    name: 'नाम',
    model: 'मॉडल',
    userId: 'यूज़र आईडी',
    memberSince: 'सदस्य कब से',
    signOut: 'साइन आउट',
    logOut: 'लॉग आउट',
    signOutConfirmTitle: 'साइन आउट',
    signOutConfirmMessage: 'क्या आप वाकई साइन आउट करना चाहते हैं?',
    unknownUser: 'अज्ञात उपयोगकर्ता',

    // Plan
    plan: 'प्लान',
    activeUsagePeriod: 'सक्रिय उपयोग अवधि',
    currentPlan: 'वर्तमान प्लान',
    planDetails: 'प्लान विवरण',
    status: 'स्थिति',
    renewsOn: 'नवीनीकरण तिथि',
    expiresOn: 'समाप्ति तिथि',
    daysRemaining: 'शेष दिन',
    daysValue: '{{count}} दिन',
    price: 'मूल्य',
    billingPeriod: 'बिलिंग अवधि',
    managePlan: 'प्लान प्रबंधित करें',
    upgradePlan: 'प्लान अपग्रेड करें',
    upgradeNow: 'अभी अपग्रेड करें',
    limitReachedFooter:
      'आपकी जनरेशन सीमा पूरी हो गई है। जारी रखने के लिए अपग्रेड करें।',
    noSubscription: 'कोई सदस्यता नहीं',
    cancelledActive: 'रद्द (सक्रिय)',
    cancelledActiveUntilExpiration: 'रद्द (समाप्ति तक सक्रिय)',
    activeUntilExpiration: 'समाप्ति तक सक्रिय',
    accessEndsOn: 'पहुँच समाप्ति तिथि',
    autoRenew: 'ऑटो-रिन्यू',
    cancelledAt: 'रद्द किया गया',
    expiredOn: 'समाप्त हुआ',
    refreshing: 'रिफ्रेश हो रहा है...',
    refreshData: 'डेटा रिफ्रेश करें',
    limitReachedFooterLong:
      'इस प्लान के लिए आपकी AI टैटू जनरेशन सीमा पूरी हो गई है। टैटू बनाना जारी रखने के लिए अपग्रेड करें या हमसे संपर्क करें।',
    weMissYouFooter:
      'अद्भुत टैटू बनाने के लिए तैयार हैं? वापस आइए और साथ मिलकर कुछ शानदार बनाते हैं।',
    unknown: 'अज्ञात',
    free: 'मुफ़्त',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'सक्रिय',
    expired: 'समाप्त',
    cancelled: 'रद्द',
    generationsUsed: 'उपयोग की गई जनरेशन',
    generationsRemaining: 'शेष जनरेशन',
    unlimited: 'असीमित',
    na: 'लागू नहीं',

    // We Miss You
    weMissYou: 'हम आपको याद करते हैं!',
    previousPlan: 'पिछला प्लान',
    comeBackAndCreate: 'वापस आएं और बनाएं',

    // Enjoying the app
    enjoyingApp: 'ऐप पसंद आ रहा है?',
    enjoyingAppDescription:
      'अगर आपको Tattoo Design AI पसंद आ रहा है, तो एक रिव्यू अन्य टैटू प्रेमियों को हमें खोजने में मदद करता है। आप कभी भी फ़ीडबैक या फ़ीचर आइडिया के लिए हमसे संपर्क कर सकते हैं।',
    rateOnPlayStore: 'Play Store पर रेट करें',
    rateOnAppStore: 'App Store पर रेट करें',
    sendFeedback: 'फ़ीडबैक भेजें',

    // Are you an artist
    areYouArtist: 'क्या आप कलाकार हैं?',
    artistDescription:
      'सहयोग में रुचि है? सुझाव या शिकायतें हैं? हम आपसे सुनना चाहेंगे!',
    writeToUs: 'हमें लिखें',

    // Support
    contactSupport: 'सहायता से संपर्क करें',
    requestFeature: 'फ़ीचर का अनुरोध करें',
    rateApp: 'ऐप को रेट करें',
    shareApp: 'ऐप साझा करें',
    shareWithFriends: 'दोस्तों के साथ साझा करें',
    shareMessage: 'Tattoo Design AI देखें \n',

    // Settings
    appearance: 'दिखावट',
    light: 'लाइट',
    dark: 'डार्क',
    system: 'सिस्टम',
    language: 'भाषा',
    languageAuto: 'ऑटो (सिस्टम)',
    showOnboarding: 'ऑनबोर्डिंग दिखाएं',
    promptEnhancement: 'प्रॉम्प्ट सुधार',
    promptEnhancementDisabledTitle: 'प्रॉम्प्ट सुधार बंद',
    promptEnhancementDisabledMessage:
      'सुधार के बिना परिणाम भिन्न हो सकते हैं। आप इसे कभी भी वापस चालू कर सकते हैं।',

    // Legal
    termsOfService: 'सेवा की शर्तें',
    privacyPolicy: 'गोपनीयता नीति',

    // Danger
    deleteAccount: 'खाता हटाएं',
    deleteAccountConfirmTitle: 'खाता हटाएं',
    deleteAccountConfirmMessage:
      'क्या आप सुनिश्चित हैं? यह पूर्ववत नहीं किया जा सकता। नोट: यह सक्रिय सदस्यताओं को रद्द नहीं करता।',
    dangerZoneFooter:
      'खाता हटाना स्थायी है। यह सक्रिय सदस्यताओं को रद्द नहीं करता।',
    resetOnboarding: 'ऑनबोर्डिंग रीसेट करें',

    // Version
    version: 'संस्करण',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI ऐप सहायता अनुरोध',
      body: 'नमस्ते,\n\nमुझे Tattoo Design AI ऐप में मदद चाहिए।\n\n{{userInfo}}\n\nविवरण:\n[कृपया यहां अपनी समस्या का वर्णन करें]\n\nधन्यवाद!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI फ़ीचर अनुरोध सहायता',
      body: 'नमस्ते,\n\nमुझे फ़ीचर अनुरोध सबमिट करने में मदद चाहिए।\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI फ़ीडबैक',
      body: 'नमस्ते!\n\nमेरे पास Tattoo Design AI के बारे में कुछ फ़ीडबैक है:\n\n[आपका फ़ीडबैक यहां]{{userInfo}}\n\nधन्यवाद!',
    },
    artist: {
      subject: 'क्या आप कलाकार हैं? - Tattoo Design AI',
      body: 'नमस्ते!\n\nमुझे सहयोग में रुचि है या मेरे पास सुझाव/शिकायतें हैं।\n\n{{userInfo}}\n\n[कृपया अपने सुझाव, शिकायतें साझा करें या एक कलाकार के रूप में अपने बारे में बताएं]\n\nधन्यवाद!',
    },
    userIdLabel: 'यूज़र आईडी: {{id}}',
    emailLabel: 'ईमेल: {{email}}',
    accountLabel: 'मेरा खाता ईमेल: {{email}}',
    myUserIdLabel: 'मेरा यूज़र आईडी: {{id}}',
    accountInfo: '\n\nखाता: {{email}}',
  },

  notFound: {
    title: 'उफ़!',
    description: 'यह स्क्रीन मौजूद नहीं है।',
    goHome: 'होम स्क्रीन पर जाएं!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'शुरू करते हैं',
    photoAccessDescription:
      'छवियां जोड़ने के लिए हमें आपकी फ़ोटो तक पहुँच चाहिए',
    photoAccessDeniedTitle: 'फ़ोटो एक्सेस आवश्यक',
    photoAccessDeniedDescription:
      'इस सुविधा के लिए आपकी फ़ोटो लाइब्रेरी तक पहुँच आवश्यक है ताकि आप अपने टैटू देख और सहेज सकें। आप डिवाइस सेटिंग्स में फ़ोटो एक्सेस प्रबंधित कर सकते हैं।',
    photoLibraryNeeded:
      'हमें आपकी फ़ोटो लाइब्रेरी तक पहुँच चाहिए ताकि आप अपने टैटू देख और सहेज सकें।',

    // Camera
    cameraAccessTitle: 'शुरू करते हैं',
    cameraAccessDescription:
      'फ़ोटो लेने के लिए हमें आपके कैमरे तक पहुँच चाहिए।',
    cameraAccessDeniedTitle: 'कैमरा एक्सेस आवश्यक',
    cameraAccessDeniedDescription:
      'इस सुविधा के लिए आपके कैमरे तक पहुँच आवश्यक है। आप डिवाइस सेटिंग्स में कैमरा एक्सेस प्रबंधित कर सकते हैं।',
  },
};
