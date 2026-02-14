/**
 * Simplified Chinese translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const zhCore = {
  common: {
    // Actions
    loading: '加载中...',
    error: '错误',
    success: '成功',
    cancel: '取消',
    confirm: '确认',
    save: '保存',
    done: '完成',
    close: '关闭',
    back: '返回',
    next: '下一步',
    skip: '跳过',
    continue: '继续',
    retry: '重试',
    delete: '删除',
    edit: '编辑',
    share: '分享',
    send: '发送',
    search: '搜索',
    seeAll: '查看全部',
    tryAgain: '再试一次',
    ok: '好的',
    yes: '是',
    no: '否',
    or: '或',
    upgrade: '升级',
    processing: '处理中...',
    openSettings: '打开设置',
    readMore: '了解更多',
    createTattoo: '创建纹身',
    style: '风格',

    // States
    on: '开',
    off: '关',
    enabled: '已启用',
    disabled: '已禁用',

    // Errors
    somethingWentWrong: '出了点问题',
    unexpectedError: '发生了意外错误',
  },

  tabs: {
    home: '首页',
    explore: '探索',
    myTattoos: '我的纹身',
    profile: '个人资料',
    tryOnTattoo: '试戴纹身',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: '欢迎回来！',
    signInDescription: '请选择您偏好的登录方式',
    signIn: '登录',
    alreadyHaveAccount: '已有账号？ ',
    termsOfService: '服务条款',
    privacyPolicy: '隐私政策',
    byContinuingAgree: '继续即表示您同意我们的 ',
    inkognitoMode: 'Ink-ognito 模式',
    inkognitoDescription: '您的设计只属于您，不会保存在我们这里。',
    signInToContinue:
      '请登录以继续创建您的纹身！',
    signInBenefit:
      '登录后，我们可以跟踪您的免费纹身生成次数，并确保您的账号正确设置。',
    notSignedIn: '（未登录）',
  },

  profile: {
    // Screen header
    title: '个人资料',

    // Section headers
    account: '账号',
    planAndUsage: '套餐与用量',
    settings: '设置',
    support: '支持',
    legal: '法律信息',
    dangerZone: '危险操作',
    supportAndFeedback: '支持与反馈',
    followUs: '关注我们',

    // Sign-in prompt
    notSignedIn: '未登录',
    signInPrompt:
      '登录以访问您的账号详情、订阅信息和个性化功能',

    // Account
    email: '邮箱',
    name: '姓名',
    model: '模型',
    userId: '用户ID',
    memberSince: '注册时间',
    signOut: '退出登录',
    logOut: '退出登录',
    signOutConfirmTitle: '退出登录',
    signOutConfirmMessage: '确定要退出登录吗？',
    unknownUser: '未知用户',

    // Plan
    plan: '套餐',
    activeUsagePeriod: '有效使用期',
    currentPlan: '当前套餐',
    planDetails: '套餐详情',
    status: '状态',
    renewsOn: '续订日期',
    expiresOn: '到期日期',
    daysRemaining: '剩余天数',
    daysValue: '{{count}}天',
    price: '价格',
    billingPeriod: '计费周期',
    managePlan: '管理套餐',
    upgradePlan: '升级套餐',
    upgradeNow: '立即升级',
    limitReachedFooter:
      '您已达到生成上限。升级以继续使用。',
    noSubscription: '无订阅',
    cancelledActive: '已取消（仍有效）',
    cancelledActiveUntilExpiration: '已取消（到期前有效）',
    activeUntilExpiration: '到期前有效',
    accessEndsOn: '访问截止日期',
    autoRenew: '自动续订',
    cancelledAt: '取消日期',
    expiredOn: '过期日期',
    refreshing: '刷新中...',
    refreshData: '刷新数据',
    limitReachedFooterLong:
      '您已达到此套餐的AI纹身生成上限。升级以继续创建纹身，或联系我们。',
    weMissYouFooter:
      '准备好创建更多精彩纹身了吗？回来吧，一起设计出令人惊叹的作品。',
    unknown: '未知',
    free: '免费',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: '有效',
    expired: '已过期',
    cancelled: '已取消',
    generationsUsed: '已使用生成次数',
    generationsRemaining: '剩余生成次数',
    unlimited: '无限制',
    na: 'N/A',

    // We Miss You
    weMissYou: '我们想念你！',
    previousPlan: '之前的套餐',
    comeBackAndCreate: '回来继续创作',

    // Enjoying the app
    enjoyingApp: '喜欢这个应用吗？',
    enjoyingAppDescription:
      '如果您喜欢Tattoo Design AI，您的评价可以帮助其他纹身爱好者发现我们。您也可以随时向我们发送反馈或功能建议。',
    rateOnPlayStore: '在Play Store上评价',
    rateOnAppStore: '在App Store上评价',
    sendFeedback: '发送反馈',

    // Are you an artist
    areYouArtist: '你是艺术家吗？',
    artistDescription:
      '有兴趣合作吗？有建议或意见吗？我们很乐意听到您的声音！',
    writeToUs: '联系我们',

    // Support
    contactSupport: '联系客服',
    requestFeature: '功能请求',
    rateApp: '评价应用',
    shareApp: '分享应用',
    shareWithFriends: '分享给朋友',
    shareMessage: '看看Tattoo Design AI \n',

    // Settings
    appearance: '外观',
    light: '浅色',
    dark: '深色',
    system: '跟随系统',
    language: '语言',
    languageAuto: '自动（系统）',
    showOnboarding: '显示引导',
    promptEnhancement: '提示词增强',
    promptEnhancementDisabledTitle: '提示词增强已禁用',
    promptEnhancementDisabledMessage:
      '不使用增强功能，结果可能会有所不同。您可以随时重新开启。',

    // Legal
    termsOfService: '服务条款',
    privacyPolicy: '隐私政策',

    // Danger
    deleteAccount: '删除账号',
    deleteAccountConfirmTitle: '删除账号',
    deleteAccountConfirmMessage:
      '确定吗？此操作不可撤销。注意：这不会取消活跃的订阅。',
    dangerZoneFooter:
      '删除账号是永久性的。这不会取消活跃的订阅。',
    resetOnboarding: '重置引导',

    // Version
    version: '版本',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI 应用支持请求',
      body: '您好，\n\n我需要关于Tattoo Design AI应用的帮助。\n\n{{userInfo}}\n\n问题描述：\n[请在此描述您的问题]\n\n谢谢！',
    },
    featureRequest: {
      subject: 'Tattoo Design AI 功能请求帮助',
      body: '您好，\n\n我需要关于提交功能请求的帮助。\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI 反馈',
      body: '您好！\n\n我对Tattoo Design AI有一些反馈：\n\n[在此填写您的反馈]{{userInfo}}\n\n谢谢！',
    },
    artist: {
      subject: '你是艺术家吗？ - Tattoo Design AI',
      body: '您好！\n\n我有兴趣合作，或有建议/意见想要分享。\n\n{{userInfo}}\n\n[请分享您的建议、意见，或介绍一下您作为艺术家的情况]\n\n谢谢！',
    },
    userIdLabel: '用户ID: {{id}}',
    emailLabel: '邮箱: {{email}}',
    accountLabel: '我的账号邮箱: {{email}}',
    myUserIdLabel: '我的用户ID: {{id}}',
    accountInfo: '\n\n账号: {{email}}',
  },

  notFound: {
    title: '哎呀！',
    description: '此页面不存在。',
    goHome: '返回首页！',
  },

  permissions: {
    // Photo library
    photoAccessTitle: '开始吧',
    photoAccessDescription:
      '我们需要访问您的照片以添加图片',
    photoAccessDeniedTitle: '需要照片访问权限',
    photoAccessDeniedDescription:
      '此功能需要访问您的照片库来查看和保存纹身。您可以在设备设置中管理照片访问权限。',
    photoLibraryNeeded:
      '我们需要访问您的照片库，以便您查看和保存纹身。',

    // Camera
    cameraAccessTitle: '开始吧',
    cameraAccessDescription:
      '我们需要访问您的相机来拍照。',
    cameraAccessDeniedTitle: '需要相机访问权限',
    cameraAccessDeniedDescription:
      '此功能需要相机访问权限。您可以在设备设置中管理相机访问权限。',
  },
};
