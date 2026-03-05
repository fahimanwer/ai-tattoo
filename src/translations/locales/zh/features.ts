/**
 * Simplified Chinese translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const zhFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: '在决定之前预览你的纹身效果。',
    whatsYourName: '你叫什么名字？',
    namePlaceholder: '你的名字',
    nameDescription: '我们将用它来个性化你的体验。',
    welcome: '欢迎',
    welcomeDescription: '让我们定制你的Tattoo Design AI体验。',
    describeYou: '哪个最能\n 描述你？',
    describeYouDescription:
      '根据你与纹身的关系来个性化体验',
    whatToDo: '你想做\n 什么？',
    whatToDoDescription:
      '帮助我们了解你想如何探索纹身，以及哪些工具对你最有用。',
    designTattoo: '设计你想要的\n 纹身',
    designTattooDescription:
      '输入几个词或上传图片，即刻生成独特的纹身设计。',
    whereTattoo: '你想在哪里\n 纹身？',
    whereTattooDescription:
      '位置会影响设计、尺寸和线条流向，帮助我们为你量身打造方案。',
    pickStyles: '最多选择5种\n 你喜欢的风格',
    pickStylesDescription:
      '风格选择帮助我们缩小范围，匹配你的品味。',
    whenTattoo: '你打算什么时候\n 纹身？',
    whenTattooDescription:
      '帮助我们根据你的\n 时间线调整体验。',
    whatVibe: '你想要什么\n 感觉？',
    whatVibeDescription:
      '纹身承载情感，帮助我们理解你纹身背后的故事。',
    settingUp: '正在为你\n 准备',
    youreAllSet: '全部准备好了！',
    youreAllSetDescription: '你已准备好开始了。',

    // CTA
    alreadyHaveAccount: '已有账号？ ',
    signIn: '登录',

    // User description options
    userDescription: {
      artist: '我制作纹身',
      client: '我要去纹身',
      model: '我用纹身做内容',
      explorer: '我只是随便看看',
    },

    // Goal options
    goal: {
      tryOn: '在照片上试戴纹身',
      generate: '生成纹身创意',
      browse: '只是浏览或寻找灵感',
      coverUp: '遮盖/改造现有纹身',
    },

    // Location options
    location: {
      wrist: '手腕',
      chest: '胸部',
      hand: '手',
      back: '背部',
      legs: '腿部',
      forearm: '前臂',
      neck: '脖子',
      jaw: '下颌',
      forehead: '额头',
      knuckles: '指节',
      fingers: '手指',
      cheek: '脸颊',
      shoulder: '肩膀',
      temple: '太阳穴',
      ribs: '肋骨',
      abdomen: '腹部',
      face: '面部',
      hips: '臀部',
      thigh: '大腿',
      tricep: '三头肌',
      bicep: '二头肌',
      collarbone: '锁骨',
      ankle: '脚踝',
      foot: '脚',
      palm: '手掌',
      notSure: '还没想好',
    },

    // Style options
    styles: {
      traditional: '传统',
      realism: '写实',
      minimal: '极简',
      celtic: '凯尔特',
      blackwork: '黑色作品',
      illustrative: '插画',
      lettering: '字体',
      irezumi: '日式入墨',
      geometric: '几何',
      religious: '宗教',
      anime: '动漫',
      fineLine: '细线条',
      dotwork: '点刺',
      linework: '线条',
      calligraphy: '书法',
      portrait: '肖像',
      floral: '花卉',
      polynesian: '波利尼西亚',
      tribal: '部落',
      maori: '毛利',
      gothic: '哥特',
      patchwork: '拼接',
      abstract: '抽象',
      cyberpunk: '赛博朋克',
      threeD: '3D',
      astrology: '星座',
    },

    // Timeframe options
    timeframe: {
      thisWeek: '这周',
      thisMonth: '这个月',
      oneToThreeMonths: '1-3个月内',
      someday: '以后再说，先看看',
    },

    // Vibe options
    vibe: {
      bold: '大胆',
      confident: '自信',
      soft: '柔和',
      dark: '暗黑',
      edgy: '前卫',
      elegant: '优雅',
      spiritual: '灵性',
      cute: '可爱',
      symbolic: '象征',
      playful: '趣味',
      clean: '简洁',
      modern: '现代',
      meaningful: '有意义',
      personalStory: '个人故事',
      family: '家庭',
      love: '爱情',
      memory: '记忆',
      rebirth: '重生',
      freedom: '自由',
      mystical: '神秘',
      rebellious: '叛逆',
      serene: '宁静',
      empowered: '力量',
      ethereal: '空灵',
      fearless: '无畏',
      wanderlust: '漫游',
      transcendent: '超越',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: '理解{{name}}的愿景中',
      understandingVisionDefault: '理解你的愿景中',
      tailoringDesigns: '根据你的风格调整设计',
      settingUpCoverUp: '设置遮盖工具',
      personalizingExperience: '个性化你的体验',
      preparingStudio: '准备设计工作室',
      configuringWorkspace: '配置工作区',
      applyingPreferences: '应用你的偏好',
      journeyStartsNow: '你的纹身之旅即将开始',
    },

    // Reviews
    reviews: {
      review1Title: '很棒的应用！',
      review1Body:
        '应用运行流畅，设计美观，体验出色！纹身效果考虑了精确的光影，令人印象深刻。',
      review1Author: 'Jacob C.',
      review2Title: '确实好用',
      review2Body:
        '纹身设计干净细致。部分图片生成时间稍长，但整体来说是最好的AI纹身应用之一。',
      review2Author: 'Alexrays1',
      review3Title: '太喜欢了',
      review3Body: '强烈推荐 🫵🏼',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: '即时生成纹身',
    containerDesc1:
      '输入几个词，即刻生成独特的纹身设计。',
    containerTitle2: '个性化你的设计',
    containerDesc2:
      '调整颜色、布局和风格，打造完美的专属纹身。',
    containerTitle3: '在皮肤上预览',
    containerDesc3:
      '在你的皮肤上预览任何纹身，即时调整大小和位置。',
    paused: '已暂停',

    // Relative time
    time: {
      today: '今天',
      yesterday: '昨天',
      daysAgo: '{{count}}天前',
      weeksAgo: '{{count}}周前',
      monthsAgo: '{{count}}个月前',
      yearsAgo: '{{count}}年前',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: '试戴技术',
      tryOnTechnologyDesc: '决定前先在皮肤上查看纹身效果',
      aiTattooGenerator: 'AI纹身生成器',
      aiTattooGeneratorDesc: '从你的想法创建独特设计',
      coverUpAssistant: '遮盖助手',
      coverUpAssistantDesc: '将现有纹身转变为新的艺术',
      artistTools: '艺术家工具',
      artistToolsDesc:
        '即时向客户展示身体上的设计效果',
      precisePlacement: '精准定位',
      precisePlacementDesc:
        '为你的{{location}}纹身完美定尺',
      styleMatchedDesigns: '风格匹配设计',
      styleMatchedDesignsDesc:
        '精选{{style}}纹身灵感',
      readyWhenYouAre: '随时为你准备',
      readyWhenYouAreDesc: '今天设计，明天纹身',
      realisticTryOn: '逼真试戴',
      realisticTryOnDesc: '精确查看纹身在你身上的效果',
      saveAndShare: '保存与分享',
      saveAndShareDesc:
        '收藏你的最爱并分享给纹身师',
      aiDesignStudio: 'AI设计工作室',
      aiDesignStudioDesc: '即时生成独特纹身设计',

      // Personalized greetings
      greetingArtist: '你的新客户体验工具已就绪',
      greetingCoverUp: '准备好转变你的纹身了',
      greetingGenerate: '你的AI设计工作室等待中',
      greetingDefault: '你的纹身之旅从这里开始',
      welcomeAboard: '欢迎，{{name}}！',
      welcomeName: '欢迎 {{name}}',

      // Urgency messages
      urgencyArtist: '即时向客户展示真实预览。',
      urgencyCoverUp: '自信地修复你的纹身。',
      urgencyTryOn: '决定之前先试戴你的纹身。',
      urgencyDefault: '无限设计。零后悔。',
    },
  },

  paywall: {
    // CTA
    continueButton: '继续',
    restorePurchase: '恢复购买',
    current: '当前',

    // Plan terms
    week: '周',
    month: '月',
    weekly: '每周',
    perWeek: '/周',

    // Content
    loadingPlans: '加载套餐中…',
    restoreSubscription: '恢复订阅',
    fairUseNote: 'AI设计生成包含合理使用限制。',
    saveBadge: '节省{{percent}}%',
    subtitle:
      '探索纹身创意，通过无限变体打磨设计，在任何身体部位试戴，自信地导出高质量成果。',

    // Personalized headlines
    headlineArtist: '在纹身前向客户展示效果',
    headlineCoverUp: '自信地改造你的纹身',
    headlineTryOn: '决定之前先看看纹身效果',
    headlineDesign: '设计你一直想要的纹身',
    headlineBrowse: '找到你的完美纹身设计',

    // Purchase flow alerts
    successTitle: '成功！',
    subscriptionActiveMessage:
      '你的订阅已激活。尽情享受无限纹身设计吧！',
    almostThereTitle: '快要完成了！',
    createAccountMessage:
      '创建账号以激活订阅并开始设计。',
    purchaseRestoredTitle: '购买已恢复！',
    subscriptionNowActive: '你的订阅现已激活。',
    purchaseFoundTitle: '找到购买记录！',
    purchasesRestoredMessage: '你的购买已恢复。',
    noPurchasesFoundTitle: '未找到购买记录',
    noPurchasesFoundMessage:
      '未找到可恢复的先前购买记录。',
    purchaseFailedTitle: '购买失败',
    purchaseFailedMessage:
      '无法完成购买。请重试。',
    errorRestoringTitle: '恢复购买出错',
    errorRestoringMessage:
      '无法恢复购买。请重试。',
    subscriptionActivated: '订阅已激活！',

    // Alerts
    purchaseError: '购买错误',
    restoreSuccess: '购买已恢复',
    restoreError: '恢复失败',
    noPurchaseFound: '未找到先前购买记录',

    // Pricing overhaul
    annual: '年度',
    year: '年',
    perYear: '/年',
    freeTrialBadge: '{{days}}天免费试用',
    startTrialButton: '开始{{days}}天免费试用',
    specialOffer: '特别优惠',
    limitedTimeOffer: '限时优惠',
    discountSubtitle: '仅限新用户 — 今天解锁全部功能',
    savePercent: '节省{{percent}}%',
    annualPerWeek: '{{price}}/周',
    todayOnly: '仅限今日',
    offerExpires: '优惠到期倒计时',
    perWeekBilled: '每周，按{{period}}计费',
    originalPrice: '原价 {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: '取消生成',
    cancelGenerationTitle: '取消生成？',
    cancelGenerationMessage:
      '你即将取消当前生成。这将移除当前生成并开始新的会话。',
    clearEverythingTitle: '清除所有？',
    clearEverythingMessage:
      '你即将清除此会话。所有生成的纹身将被移除。继续前请保存你想保留的内容。',
    clearEverything: '清除所有',

    // Input
    enterText: '输入文本',
    describeTattoo: '描述你的纹身或从下方建议中选择',

    // Try on alert
    tryOnTitle: '试戴{{style}}',
    tryOnMessage:
      '拍一张身体部位的照片，看看这个纹身在你身上的效果！',
    choosePhoto: '选择照片',
    later: '稍后',

    // Preview on body
    previewOnBody: '在身体上预览纹身',
    imageSelectedCombine: '已选1张 - 再添加1张进行合成',

    // Suggestions
    createTattoo: '创建{{title}}纹身',
    createStyleTattoo: '创建{{title}}风格纹身',
    tryStyle: '试试{{title}}风格',

    // Loading messages
    loadingMessages: {
      updatingTattoo: '更新你的纹身...',
      startingNew: '开始新的纹身...',
      warmingUp: '纹身机预热中...',
      summoningSpirits: '召唤墨水精灵...',
      drawingInspiration: '从宇宙汲取灵感...',
      brewingMasterpiece: '杰作即将诞生...',
      sprinkleCreativity: '加入一点创意...',
      perfectingPixels: '完善纹身的每一个像素...',
      injectingCreativity: '将创意注入皮肤...',
      mixingShade: '调配完美色调...',
      sharpeningNeedles: '磨尖虚拟针头...',
      calibratingVibes: '校准纹身氛围...',
      consultingOracle: '咨询纹身神谕...',
    },

    // Error states
    error: {
      keepCreating: '无限制继续创作',
      limitReachedFree:
        '你已达到当前生成上限。立即升级以探索变体、优化设计、不等待地继续创作。',
      unlockUnlimited: '解锁无限设计 \u2192',
      limitReachedSubscribed:
        '你已达到本期上限',
      limitReachedSubscribedDesc:
        '你的套餐生成上限已达到。下一个计费周期开始时将重置。',
      tryAgainLater: '请稍后再试',
      contactSupport: '联系客服',
    },

    // Session history actions
    actions: '操作',
    saveToGallery: '保存到相册',

    // Result image actions
    imageActions: '图片操作',
    copyToClipboard: '复制到剪贴板',
    imageCopied: '图片已复制到剪贴板',
    imageCopyFailed: '复制图片失败',
    imageSaved: '图片已保存到相册！',
    imageSaveFailed: '保存图片失败。请重试。',

    // Context alerts
    photoAccessTitle: '需要照片访问权限',
    photoAccessMessage:
      '要将图片保存到相册，我们需要访问你的照片。你可以在设置中启用。',
    resetSessionTitle: '重置会话？',
    resetSessionMessage:
      '确定要重置会话吗？所有生成的纹身将被清除并开始新的会话。',
    resetButton: '重置',
    shareError: '分享图片失败',
    imageDataError: '获取图片数据失败',
    pickImageError: '从相册选择图片失败',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: '未找到图片',
    useTattoo: '使用纹身',
    useTattooError: '使用此纹身失败。请重试。',
  },

  sheet: {
    // Photo selection
    allPhotos: '所有照片',
    addPhotos: '添加{{count}}张照片',
    addPhotos_other: '添加{{count}}张照片',
    recentPhotos: '最近照片',
    selectOneMore: '再选1张进行合成',

    // Options
    tryOn: '试戴',
    tryOnDescriptionWithTattoo:
      '添加一张身体照片进行预览',
    tryOnDescriptionNoTattoo:
      '先选择一个纹身，然后添加照片',
    createNewTattoo: '创建新纹身',
    createNewTattooDescription:
      '描述你的纹身想法，我们将为你生成',
    tattooCoverUp: '纹身遮盖创意',
    tattooCoverUpDescription:
      '使用照片作为参考，生成遮盖现有纹身的创意',
    removeTattoo: '去除纹身',
    removeTattooDescription:
      '从照片中去除现有纹身',
    promptHistory: '提示词历史',
    promptHistoryDescription: '查看你之前的提示词',
    requestFeature: '功能请求',
    requestFeatureDescription:
      '告诉我们你希望Tattoo Design AI下一步支持什么',

    // Try on alerts
    addYourPhoto: '添加你的照片',
    addPhotoQuestion:
      '你想怎样添加纹身部位的照片？',
    takePhoto: '拍照',
    chooseFromLibrary: '从相册选择',
    createTattooFirst: '先创建纹身',
    createTattooFirstMessage:
      '要试戴纹身，你需要：\n\n1. 生成或选择一个纹身设计\n2. 然后添加一张身体照片\n\n我们会合成展示效果！',
    createTattoo: '创建纹身',
  },

  tattoos: {
    // Screen header
    title: '我的纹身',

    // Loading
    loading: '加载纹身中...',

    // Empty state
    emptyTitle: '还没有保存的纹身',
    emptyDescription:
      '创建并保存你的第一个纹身设计！向下滑动刷新。',

    // Cloud restore
    restoringFromCloud: '从云端恢复中...',
    noCloudGenerations: '云端未找到生成记录',
    restoredCount: '已恢复{{total}}个中的{{restored}}个纹身',
    restoreFailedTitle: '恢复失败',
    restoreFailedMessage:
      '无法从云端恢复。请重试。',
    cloudFound: '在云端找到{{count}}个纹身',
    cloudFound_other: '在云端找到{{count}}个纹身',
    restoring: '恢复中...',
    restore: '恢复',
    cloudCount: '云端{{count}}个',

    // Detail screen
    tattooNotFound: '未找到纹身',
    backToHome: '返回首页',
    shareError: '无法分享图片。请重试。',
    imageAccessError: '无法访问图片文件。',
    deleteTitle: '删除纹身',
    deleteMessage:
      '确定要删除这个纹身设计吗？此操作无法撤销。',
    deleteError: '无法删除图片。请重试。',
  },

  generation: {
    // Loading
    applyingDesign: '应用纹身设计中...',

    // Error
    invalidRequest: '无效请求',
    generationFailed: '生成失败',
    failedToGenerate: '生成纹身设计失败',
    startOver: '重新开始',

    // Success
    tattooReady: '你的纹身准备好了！',
    tattooReadyDescription:
      '这是你的设计应用后的效果',
    saveToGallery: '保存到相册',
    generateAnother: '生成另一个',

    // Save alerts
    savedTitle: '已保存！',
    savedMessage:
      '你的纹身设计已保存到照片相册。',
    viewInGallery: '在相册中查看',

    // Generate another alert
    generateAnotherTitle: '生成另一个？',
    generateAnotherMessage:
      '这个纹身还没有保存。继续之前要保存吗？',
    continueWithoutSaving: '不保存继续',
    saveAndContinue: '保存后继续',

    // Cancel alert
    cancelGenerationTitle: '取消生成？',
    cancelGenerationMessage:
      '纹身仍在生成中。如果现在取消，此次生成仍会计入使用次数。确定要取消吗？',
    keepGenerating: '继续生成',
    unableToSave: '无法保存图片。请重试。',
  },

  home: {
    // Section headers
    discoverStyles: '发现新风格',
    moreStyles: '更多风格',
    moods: '氛围',
    discoverSketches: '发现草图设计',

    // Quick actions
    generateFromIdea: '从灵感生成',
    generateFromIdeaDesc: '从你的想象创建纹身',
    seeItOnSkin: '在皮肤上查看',
    seeItOnSkinDesc: '拍张照片预览纹身效果',
    blendTattoo: '融合纹身',
    blendTattooDesc: '上传现有纹身并修改',
    removeTattoo: '去除纹身',
    removeTattooDesc: '从皮肤上去除现有纹身',
  },

  explore: {
    // Section headers
    byStyles: '按风格探索',
    byMoods: '按氛围探索',
    byBodyPart: '按身体部位探索',

    // Filter labels
    styles: '风格',
    bodyPart: '身体部位',
  },

  featureRequest: {
    title: '分享你的想法',
    placeholder: '改善体验的想法...',
    needHelp: '需要帮助？ ',
    contactUs: '联系我们',
    successToast:
      '功能请求已发送！感谢你的反馈。',
    errorToast:
      '发送功能请求失败。请重试。',
  },

  promptHistory: {
    title: '提示词历史',
    clearAll: '全部清除',
    clearAllTitle: '清除提示词历史',
    clearAllMessage:
      '确定要删除所有保存的提示词吗？',
    deletePromptTitle: '删除提示词',
    deletePromptMessage: '从历史中移除此提示词？',
    emptyTitle: '还没有提示词',
    emptyDescription:
      '生成纹身后，提示词将显示在这里',
  },

  flows: {
    pickerTitle: 'Creative Studio',
    pickerSubtitle: 'Choose a tool to get started',
    generate: {
      title: 'Generate Design',
      description: 'Create a tattoo from your imagination',
    },
    tryOn: {
      title: 'Try On',
      description: 'Preview a tattoo on your body',
      pickTattoo: 'Pick Tattoo',
      pickBody: 'Pick Body Photo',
      takePhoto: 'Take Photo',
      chooseFromLibrary: 'Choose from Library',
      browseDesigns: 'Browse Designs',
      adjustPosition: 'Adjust position, size & rotation',
      savePreview: 'Save Preview',
      refineWithAi: 'Refine with AI',
      refineDescription: 'AI will blend the tattoo realistically (1 credit)',
      opacity: 'Opacity',
      warpMode: 'Warp',
      moveMode: 'Move',
      warpHint: 'Drag corners to match body contour',
    },
    aiPortrait: {
      title: 'AI Portrait',
      description: 'Turn a selfie into tattoo art',
      pickPhoto: 'Pick Portrait',
      chooseStyle: 'Choose Style',
    },
    petPortrait: {
      title: 'Pet Portrait',
      description: 'Turn your pet into tattoo art',
      pickPhoto: 'Pick Pet Photo',
    },
    combine: {
      title: 'Combine',
      description: 'Merge multiple designs into one',
      addImages: 'Add Images',
      addMore: 'Add More',
      maxImages: 'Up to {{max}} images',
      describeResult: 'Describe the combined result (optional)',
    },
    selectAndEdit: {
      title: 'Select & Edit',
      description: 'Paint an area and edit with AI',
      pickImage: 'Pick Image',
      paintSelection: 'Paint the area to edit',
      describeEdit: 'What should go in the selected area?',
      brushSize: 'Brush Size',
      undo: 'Undo',
      clear: 'Clear',
    },
    upscale: {
      title: 'Upscale',
      description: 'Enhance image quality and detail',
      pickImage: 'Pick Image to Upscale',
      upscaleButton: 'Upscale Image',
    },
    erase: {
      title: 'Erase Tattoo',
      description: 'Remove a tattoo from a photo',
      pickImage: 'Pick Photo',
      paintArea: 'Paint the tattoo to erase',
      eraseButton: 'Erase Tattoo',
    },
    styles: {
      tattoo: 'Tattoo',
      sketch: 'Sketch',
      watercolor: 'Watercolor',
      lineArt: 'Line Art',
      blackwork: 'Blackwork',
      dotwork: 'Dotwork',
    },
  },
};
