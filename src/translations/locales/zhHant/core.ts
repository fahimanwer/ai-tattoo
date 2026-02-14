/**
 * Traditional Chinese translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const zhHantCore = {
  common: {
    // Actions
    loading: '載入中...',
    error: '錯誤',
    success: '成功',
    cancel: '取消',
    confirm: '確認',
    save: '儲存',
    done: '完成',
    close: '關閉',
    back: '返回',
    next: '下一步',
    skip: '略過',
    continue: '繼續',
    retry: '重試',
    delete: '刪除',
    edit: '編輯',
    share: '分享',
    send: '傳送',
    search: '搜尋',
    seeAll: '查看全部',
    tryAgain: '再試一次',
    ok: '好的',
    yes: '是',
    no: '否',
    or: '或',
    upgrade: '升級',
    processing: '處理中...',
    openSettings: '開啟設定',
    readMore: '了解更多',
    createTattoo: '建立刺青',
    style: '風格',

    // States
    on: '開',
    off: '關',
    enabled: '已啟用',
    disabled: '已停用',

    // Errors
    somethingWentWrong: '出了點問題',
    unexpectedError: '發生了意外錯誤',
  },

  tabs: {
    home: '首頁',
    explore: '探索',
    myTattoos: '我的刺青',
    profile: '個人檔案',
    tryOnTattoo: '試戴刺青',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: '歡迎回來！',
    signInDescription: '請選擇您偏好的登入方式',
    signIn: '登入',
    alreadyHaveAccount: '已有帳號？ ',
    termsOfService: '服務條款',
    privacyPolicy: '隱私權政策',
    byContinuingAgree: '繼續即表示您同意我們的 ',
    inkognitoMode: 'Ink-ognito 模式',
    inkognitoDescription: '您的設計只屬於您，不會保存在我們這裡。',
    signInToContinue:
      '請登入以繼續建立您的刺青！',
    signInBenefit:
      '登入後，我們可以追蹤您的免費刺青生成次數，並確保您的帳號設定正確。',
    notSignedIn: '（未登入）',
  },

  profile: {
    // Screen header
    title: '個人檔案',

    // Section headers
    account: '帳號',
    planAndUsage: '方案與用量',
    settings: '設定',
    support: '支援',
    legal: '法律資訊',
    dangerZone: '危險操作',
    supportAndFeedback: '支援與回饋',
    followUs: '追蹤我們',

    // Sign-in prompt
    notSignedIn: '未登入',
    signInPrompt:
      '登入以存取您的帳號詳情、訂閱資訊和個人化功能',

    // Account
    email: '電子郵件',
    name: '姓名',
    model: '模型',
    userId: '使用者ID',
    memberSince: '註冊時間',
    signOut: '登出',
    logOut: '登出',
    signOutConfirmTitle: '登出',
    signOutConfirmMessage: '確定要登出嗎？',
    unknownUser: '未知使用者',

    // Plan
    plan: '方案',
    activeUsagePeriod: '有效使用期',
    currentPlan: '目前方案',
    planDetails: '方案詳情',
    status: '狀態',
    renewsOn: '續訂日期',
    expiresOn: '到期日期',
    daysRemaining: '剩餘天數',
    daysValue: '{{count}}天',
    price: '價格',
    billingPeriod: '計費週期',
    managePlan: '管理方案',
    upgradePlan: '升級方案',
    upgradeNow: '立即升級',
    limitReachedFooter:
      '您已達到生成上限。升級以繼續使用。',
    noSubscription: '無訂閱',
    cancelledActive: '已取消（仍有效）',
    cancelledActiveUntilExpiration: '已取消（到期前有效）',
    activeUntilExpiration: '到期前有效',
    accessEndsOn: '存取截止日期',
    autoRenew: '自動續訂',
    cancelledAt: '取消日期',
    expiredOn: '過期日期',
    refreshing: '重新整理中...',
    refreshData: '重新整理資料',
    limitReachedFooterLong:
      '您已達到此方案的AI刺青生成上限。升級以繼續建立刺青，或聯絡我們。',
    weMissYouFooter:
      '準備好建立更多精彩刺青了嗎？回來吧，一起設計出令人驚豔的作品。',
    unknown: '未知',
    free: '免費',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: '有效',
    expired: '已過期',
    cancelled: '已取消',
    generationsUsed: '已使用生成次數',
    generationsRemaining: '剩餘生成次數',
    unlimited: '無限制',
    na: 'N/A',

    // We Miss You
    weMissYou: '我們想念你！',
    previousPlan: '先前的方案',
    comeBackAndCreate: '回來繼續創作',

    // Enjoying the app
    enjoyingApp: '喜歡這個應用程式嗎？',
    enjoyingAppDescription:
      '如果您喜歡Tattoo Design AI，您的評價可以幫助其他刺青愛好者發現我們。您也可以隨時向我們傳送回饋或功能建議。',
    rateOnPlayStore: '在Play Store上評價',
    rateOnAppStore: '在App Store上評價',
    sendFeedback: '傳送回饋',

    // Are you an artist
    areYouArtist: '你是藝術家嗎？',
    artistDescription:
      '有興趣合作嗎？有建議或意見嗎？我們很樂意聽到您的聲音！',
    writeToUs: '聯絡我們',

    // Support
    contactSupport: '聯絡客服',
    requestFeature: '功能請求',
    rateApp: '評價應用程式',
    shareApp: '分享應用程式',
    shareWithFriends: '分享給朋友',
    shareMessage: '看看Tattoo Design AI \n',

    // Settings
    appearance: '外觀',
    light: '淺色',
    dark: '深色',
    system: '跟隨系統',
    language: '語言',
    languageAuto: '自動（系統）',
    showOnboarding: '顯示引導',
    promptEnhancement: '提示詞增強',
    promptEnhancementDisabledTitle: '提示詞增強已停用',
    promptEnhancementDisabledMessage:
      '不使用增強功能，結果可能會有所不同。您可以隨時重新開啟。',

    // Legal
    termsOfService: '服務條款',
    privacyPolicy: '隱私權政策',

    // Danger
    deleteAccount: '刪除帳號',
    deleteAccountConfirmTitle: '刪除帳號',
    deleteAccountConfirmMessage:
      '確定嗎？此操作無法復原。注意：這不會取消有效的訂閱。',
    dangerZoneFooter:
      '刪除帳號是永久性的。這不會取消有效的訂閱。',
    resetOnboarding: '重置引導',

    // Version
    version: '版本',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI 應用程式支援請求',
      body: '您好，\n\n我需要關於Tattoo Design AI應用程式的協助。\n\n{{userInfo}}\n\n問題描述：\n[請在此描述您的問題]\n\n謝謝！',
    },
    featureRequest: {
      subject: 'Tattoo Design AI 功能請求協助',
      body: '您好，\n\n我需要關於提交功能請求的協助。\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI 回饋',
      body: '您好！\n\n我對Tattoo Design AI有一些回饋：\n\n[在此填寫您的回饋]{{userInfo}}\n\n謝謝！',
    },
    artist: {
      subject: '你是藝術家嗎？ - Tattoo Design AI',
      body: '您好！\n\n我有興趣合作，或有建議/意見想要分享。\n\n{{userInfo}}\n\n[請分享您的建議、意見，或介紹一下您作為藝術家的情況]\n\n謝謝！',
    },
    userIdLabel: '使用者ID: {{id}}',
    emailLabel: '電子郵件: {{email}}',
    accountLabel: '我的帳號郵件: {{email}}',
    myUserIdLabel: '我的使用者ID: {{id}}',
    accountInfo: '\n\n帳號: {{email}}',
  },

  notFound: {
    title: '哎呀！',
    description: '此頁面不存在。',
    goHome: '返回首頁！',
  },

  permissions: {
    // Photo library
    photoAccessTitle: '開始吧',
    photoAccessDescription:
      '我們需要存取您的照片以新增圖片',
    photoAccessDeniedTitle: '需要照片存取權限',
    photoAccessDeniedDescription:
      '此功能需要存取您的照片圖庫來檢視和儲存刺青。您可以在裝置設定中管理照片存取權限。',
    photoLibraryNeeded:
      '我們需要存取您的照片圖庫，以便您檢視和儲存刺青。',

    // Camera
    cameraAccessTitle: '開始吧',
    cameraAccessDescription:
      '我們需要存取您的相機來拍照。',
    cameraAccessDeniedTitle: '需要相機存取權限',
    cameraAccessDeniedDescription:
      '此功能需要相機存取權限。您可以在裝置設定中管理相機存取權限。',
  },
};
