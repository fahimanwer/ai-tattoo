/**
 * Korean translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const koFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: '결정하기 전에 타투를 미리 확인하세요.',
    whatsYourName: '이름이 뭐예요?',
    namePlaceholder: '이름',
    nameDescription: '경험을 개인화하는 데 사용됩니다.',
    welcome: '환영합니다',
    welcomeDescription: 'Tattoo Design AI 경험을 맞춤 설정해 봅시다.',
    describeYou: '자신을 가장 잘\n 설명하는 것은?',
    describeYouDescription:
      '타투와의 관계에 기반하여 경험을 개인화합니다',
    whatToDo: '무엇을 하고\n 싶으세요?',
    whatToDoDescription:
      '타투를 어떻게 탐색하고 싶은지, 어떤 도구가 유용한지 파악하는 데 도움이 됩니다.',
    designTattoo: '원하는 타투를\n 디자인하세요',
    designTattooDescription:
      '몇 단어를 입력하거나 이미지를 업로드하면 독특한 타투 디자인이 즉시 생성됩니다.',
    whereTattoo: '타투를 어디에\n 넣고 싶으세요?',
    whereTattooDescription:
      '배치는 디자인, 크기, 흐름에 영향을 줍니다. 신체에 맞는 아이디어를 제안해 드립니다.',
    pickStyles: '좋아하는 스타일을\n 최대 5개 선택',
    pickStylesDescription:
      '스타일 선택이 취향에 맞는 디자인을 좁히는 데 도움이 됩니다.',
    whenTattoo: '타투를 언제\n 받을 생각이세요?',
    whenTattooDescription:
      '타임라인에 맞춰\n 경험을 조정합니다.',
    whatVibe: '어떤 분위기를\n 원하세요?',
    whatVibeDescription:
      '타투는 감정을 담습니다. 당신의 타투에 담긴 이야기를 이해하는 데 도움이 됩니다.',
    settingUp: '준비 중\n 입니다',
    youreAllSet: '모든 준비 완료!',
    youreAllSetDescription: '시작할 준비가 되었습니다.',

    // CTA
    alreadyHaveAccount: '이미 계정이 있으신가요? ',
    signIn: '로그인',

    // User description options
    userDescription: {
      artist: '타투를 제작합니다',
      client: '타투를 받으려고 합니다',
      model: '콘텐츠에 타투를 활용합니다',
      explorer: '그냥 둘러보는 중입니다',
    },

    // Goal options
    goal: {
      tryOn: '사진에 타투 입혀보기',
      generate: '타투 아이디어 생성',
      browse: '영감을 찾고 있어요',
      coverUp: '기존 타투 커버업/수정',
    },

    // Location options
    location: {
      wrist: '손목',
      chest: '가슴',
      hand: '손',
      back: '등',
      legs: '다리',
      forearm: '전완',
      neck: '목',
      jaw: '턱',
      forehead: '이마',
      knuckles: '손가락 마디',
      fingers: '손가락',
      cheek: '볼',
      shoulder: '어깨',
      temple: '관자놀이',
      ribs: '갈비뼈',
      abdomen: '복부',
      face: '얼굴',
      hips: '엉덩이',
      thigh: '허벅지',
      tricep: '삼두근',
      bicep: '이두근',
      collarbone: '쇄골',
      ankle: '발목',
      foot: '발',
      palm: '손바닥',
      notSure: '아직 모르겠어요',
    },

    // Style options
    styles: {
      traditional: '트래디셔널',
      realism: '리얼리즘',
      minimal: '미니멀',
      celtic: '켈틱',
      blackwork: '블랙워크',
      illustrative: '일러스트레이티브',
      lettering: '레터링',
      irezumi: '이레즈미',
      geometric: '지오메트릭',
      religious: '종교적',
      anime: '애니메이션',
      fineLine: '파인라인',
      dotwork: '도트워크',
      linework: '라인워크',
      calligraphy: '캘리그라피',
      portrait: '초상화',
      floral: '플로럴',
      polynesian: '폴리네시안',
      tribal: '트라이벌',
      maori: '마오리',
      gothic: '고딕',
      patchwork: '패치워크',
      abstract: '추상',
      cyberpunk: '사이버펑크',
      threeD: '3D',
      astrology: '점성술',
    },

    // Timeframe options
    timeframe: {
      thisWeek: '이번 주',
      thisMonth: '이번 달',
      oneToThreeMonths: '1~3개월 이내',
      someday: '언젠가, 지금은 둘러보는 중',
    },

    // Vibe options
    vibe: {
      bold: '대담한',
      confident: '자신감 있는',
      soft: '부드러운',
      dark: '다크한',
      edgy: '엣지 있는',
      elegant: '우아한',
      spiritual: '영적인',
      cute: '귀여운',
      symbolic: '상징적인',
      playful: '장난스러운',
      clean: '깔끔한',
      modern: '모던한',
      meaningful: '의미 있는',
      personalStory: '개인적인 이야기',
      family: '가족',
      love: '사랑',
      memory: '추억',
      rebirth: '재탄생',
      freedom: '자유',
      mystical: '신비로운',
      rebellious: '반항적인',
      serene: '평온한',
      empowered: '힘이 나는',
      ethereal: '몽환적인',
      fearless: '두려움 없는',
      wanderlust: '방랑벽',
      transcendent: '초월적인',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: '{{name}}님의 비전을 이해하는 중',
      understandingVisionDefault: '당신의 비전을 이해하는 중',
      tailoringDesigns: '스타일에 맞게 디자인 조정 중',
      settingUpCoverUp: '커버업 도구 설정 중',
      personalizingExperience: '경험을 개인화하는 중',
      preparingStudio: '디자인 스튜디오 준비 중',
      configuringWorkspace: '작업 공간 구성 중',
      applyingPreferences: '선호 사항 적용 중',
      journeyStartsNow: '당신의 타투 여정이 시작됩니다',
    },

    // Reviews
    reviews: {
      review1Title: '놀라운 앱!',
      review1Body:
        '앱의 작동, 디자인, 느낌이 훌륭합니다! 정확한 조명과 그림자를 고려한 타투 적용에 감동했습니다.',
      review1Author: 'Jacob C.',
      review2Title: '정말 유용해요',
      review2Body:
        '타투 디자인이 깔끔하고 섬세해요. 일부 이미지는 생성에 시간이 좀 걸리지만, 전체적으로 최고의 AI 타투 앱 중 하나입니다.',
      review2Author: 'Alexrays1',
      review3Title: '너무 좋아요',
      review3Body: '강력 추천합니다 🫵🏼',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: '타투를 즉시 생성',
    containerDesc1:
      '몇 단어만 입력하면 독특한 타투 디자인이 즉시 생성됩니다.',
    containerTitle2: '디자인을 맞춤 설정',
    containerDesc2:
      '색상, 레이아웃, 스타일을 조정하여 완벽한 타투를 만드세요.',
    containerTitle3: '피부 위에서 미리보기',
    containerDesc3:
      '피부 위에서 타투를 미리 확인하세요. 크기와 배치를 즉시 조정할 수 있습니다.',
    paused: '일시정지',

    // Relative time
    time: {
      today: '오늘',
      yesterday: '어제',
      daysAgo: '{{count}}일 전',
      weeksAgo: '{{count}}주 전',
      monthsAgo: '{{count}}개월 전',
      yearsAgo: '{{count}}년 전',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: '트라이온 기술',
      tryOnTechnologyDesc: '결정하기 전에 피부 위에서 타투 확인',
      aiTattooGenerator: 'AI 타투 생성기',
      aiTattooGeneratorDesc: '아이디어에서 독특한 디자인 생성',
      coverUpAssistant: '커버업 어시스턴트',
      coverUpAssistantDesc: '기존 타투를 새로운 아트로 변신',
      artistTools: '아티스트 도구',
      artistToolsDesc:
        '고객의 몸에 디자인을 즉시 보여주기',
      precisePlacement: '정밀한 배치',
      precisePlacementDesc:
        '{{location}} 타투에 완벽한 사이징',
      styleMatchedDesigns: '스타일 매칭 디자인',
      styleMatchedDesignsDesc:
        '엄선된 {{style}} 타투 영감',
      readyWhenYouAre: '준비되면 언제든',
      readyWhenYouAreDesc: '오늘 디자인하고 내일 잉크',
      realisticTryOn: '리얼한 트라이온',
      realisticTryOnDesc: '실제로 어떻게 보일지 정확히 확인',
      saveAndShare: '저장 및 공유',
      saveAndShareDesc:
        '즐겨찾기를 저장하고 아티스트와 공유',
      aiDesignStudio: 'AI 디자인 스튜디오',
      aiDesignStudioDesc: '독특한 타투 디자인을 즉시 생성',

      // Personalized greetings
      greetingArtist: '새로운 고객 경험 도구가 준비되었습니다',
      greetingCoverUp: '타투 변신 준비가 완료되었습니다',
      greetingGenerate: 'AI 디자인 스튜디오가 기다리고 있습니다',
      greetingDefault: '당신의 타투 여정이 시작됩니다',
      welcomeAboard: '환영합니다, {{name}}님!',
      welcomeName: '환영합니다 {{name}}님',

      // Urgency messages
      urgencyArtist: '고객에게 실시간 프리뷰를 즉시 보여주세요.',
      urgencyCoverUp: '자신감 있게 타투를 수정하세요.',
      urgencyTryOn: '결정하기 전에 타투를 미리 입어보세요.',
      urgencyDefault: '무제한 디자인. 후회 제로.',
    },
  },

  paywall: {
    // CTA
    continueButton: '계속',
    restorePurchase: '구매 복원',
    current: '현재',

    // Plan terms
    week: '주',
    month: '월',
    weekly: '주간',
    perWeek: '/주',

    // Content
    loadingPlans: '플랜 불러오는 중…',
    restoreSubscription: '구독 복원',
    fairUseNote: 'AI 디자인 생성에는 공정 사용 제한이 포함됩니다.',
    saveBadge: '{{percent}}% 절약',
    subtitle:
      '타투 아이디어를 탐색하고, 무한한 변형으로 디자인을 다듬고, 모든 신체 부위에 입혀보고, 고품질 결과를 자신감 있게 내보내세요.',

    // Personalized headlines
    headlineArtist: '잉크를 넣기 전에 고객에게 타투를 보여주세요',
    headlineCoverUp: '자신감 있게 타투를 변신시키세요',
    headlineTryOn: '결정하기 전에 타투를 확인하세요',
    headlineDesign: '항상 원하던 타투를 디자인하세요',
    headlineBrowse: '완벽한 타투 디자인을 찾으세요',

    // Purchase flow alerts
    successTitle: '성공!',
    subscriptionActiveMessage:
      '구독이 활성화되었습니다. 무제한 타투 디자인을 즐기세요!',
    almostThereTitle: '거의 다 됐어요!',
    createAccountMessage:
      '계정을 만들어 구독을 활성화하고 디자인을 시작하세요.',
    purchaseRestoredTitle: '구매가 복원되었습니다!',
    subscriptionNowActive: '구독이 활성화되었습니다.',
    purchaseFoundTitle: '구매를 찾았습니다!',
    purchasesRestoredMessage: '구매가 복원되었습니다.',
    noPurchasesFoundTitle: '구매를 찾을 수 없음',
    noPurchasesFoundMessage:
      '복원 가능한 이전 구매를 찾을 수 없습니다.',
    purchaseFailedTitle: '구매 실패',
    purchaseFailedMessage:
      '구매를 완료할 수 없습니다. 다시 시도해 주세요.',
    errorRestoringTitle: '구매 복원 오류',
    errorRestoringMessage:
      '구매를 복원할 수 없습니다. 다시 시도해 주세요.',
    subscriptionActivated: '구독이 활성화되었습니다!',

    // Alerts
    purchaseError: '구매 오류',
    restoreSuccess: '구매 복원됨',
    restoreError: '복원 실패',
    noPurchaseFound: '이전 구매를 찾을 수 없음',

    // Pricing overhaul
    annual: '연간',
    year: '년',
    perYear: '/년',
    freeTrialBadge: '{{days}}일 무료 체험',
    startTrialButton: '{{days}}일 무료 체험 시작',
    specialOffer: '특별 혜택',
    limitedTimeOffer: '한정 기간 혜택',
    discountSubtitle: '신규 사용자 전용 — 오늘 전체 액세스 잠금 해제',
    savePercent: '{{percent}}% 절약',
    annualPerWeek: '{{price}}/주',
    todayOnly: '오늘만',
    offerExpires: '혜택 만료까지',
    perWeekBilled: '주당, {{period}} 청구',
    originalPrice: '기존 {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: '생성 취소',
    cancelGenerationTitle: '생성을 취소하시겠습니까?',
    cancelGenerationMessage:
      '현재 생성을 취소하려 합니다. 현재 생성이 삭제되고 새 세션이 시작됩니다.',
    clearEverythingTitle: '모두 지우시겠습니까?',
    clearEverythingMessage:
      '이 세션을 지우려 합니다. 생성된 모든 타투가 삭제됩니다. 계속하기 전에 보관할 것은 저장해 주세요.',
    clearEverything: '모두 지우기',

    // Input
    enterText: '텍스트 입력',
    describeTattoo: '타투를 설명하거나 아래 제안을 선택하세요',

    // Try on alert
    tryOnTitle: '{{style}} 입어보기',
    tryOnMessage:
      '신체 부위의 사진을 찍어 이 타투가 어떻게 보이는지 확인하세요!',
    choosePhoto: '사진 선택',
    later: '나중에',

    // Preview on body
    previewOnBody: '몸에 타투 미리보기',
    imageSelectedCombine: '1장 선택됨 - 1장 더 추가하여 합성',

    // Suggestions
    createTattoo: '{{title}} 타투 만들기',
    createStyleTattoo: '{{title}} 스타일 타투 만들기',
    tryStyle: '{{title}} 스타일 시도',

    // Loading messages
    loadingMessages: {
      updatingTattoo: '타투 업데이트 중...',
      startingNew: '새 타투 시작 중...',
      warmingUp: '타투 머신 워밍업 중...',
      summoningSpirits: '잉크의 정령을 소환하는 중...',
      drawingInspiration: '우주에서 영감을 끌어오는 중...',
      brewingMasterpiece: '걸작이 거의 완성...',
      sprinkleCreativity: '창의력을 한 방울 더...',
      perfectingPixels: '타투의 모든 픽셀을 완벽하게...',
      injectingCreativity: '창의력을 피부에 주입 중...',
      mixingShade: '완벽한 색조를 조합 중...',
      sharpeningNeedles: '가상 바늘을 갈고 있는 중...',
      calibratingVibes: '타투 바이브를 보정 중...',
      consultingOracle: '타투 오라클에 문의 중...',
    },

    // Error states
    error: {
      keepCreating: '제한 없이 계속 만들기',
      limitReachedFree:
        '현재 생성 한도에 도달했습니다. 지금 업그레이드하여 변형 탐색, 디자인 수정, 대기 없이 계속 만들어 보세요.',
      unlockUnlimited: '무제한 디자인 잠금 해제 \u2192',
      limitReachedSubscribed:
        '이 기간의 한도에 도달했습니다',
      limitReachedSubscribedDesc:
        '플랜의 생성 한도에 도달했습니다. 다음 결제 주기가 시작되면 한도가 초기화됩니다.',
      tryAgainLater: '나중에 다시 시도해 주세요',
      contactSupport: '고객 지원 문의',
    },

    // Session history actions
    actions: '작업',
    saveToGallery: '갤러리에 저장',

    // Result image actions
    imageActions: '이미지 작업',
    copyToClipboard: '클립보드에 복사',
    imageCopied: '이미지가 클립보드에 복사되었습니다',
    imageCopyFailed: '이미지 복사에 실패했습니다',
    imageSaved: '이미지가 갤러리에 저장되었습니다!',
    imageSaveFailed: '이미지 저장에 실패했습니다. 다시 시도해 주세요.',

    // Context alerts
    photoAccessTitle: '사진 접근 권한 필요',
    photoAccessMessage:
      '갤러리에 이미지를 저장하려면 사진 접근 권한이 필요합니다. 설정에서 활성화할 수 있습니다.',
    resetSessionTitle: '세션을 초기화하시겠습니까?',
    resetSessionMessage:
      '세션을 초기화하시겠습니까? 생성된 모든 타투가 지워지고 새 세션이 시작됩니다.',
    resetButton: '초기화',
    shareError: '이미지 공유에 실패했습니다',
    imageDataError: '이미지 데이터를 가져오지 못했습니다',
    pickImageError: '갤러리에서 이미지를 선택하지 못했습니다',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: '이미지를 찾을 수 없음',
    useTattoo: '타투 사용',
    useTattooError: '이 타투를 사용하지 못했습니다. 다시 시도해 주세요.',
  },

  sheet: {
    // Photo selection
    allPhotos: '모든 사진',
    addPhotos: '사진 {{count}}장 추가',
    addPhotos_other: '사진 {{count}}장 추가',
    recentPhotos: '최근 사진',
    selectOneMore: '합성하려면 1장 더 선택',

    // Options
    tryOn: '입어보기',
    tryOnDescriptionWithTattoo:
      '미리보기할 신체 사진 추가',
    tryOnDescriptionNoTattoo:
      '먼저 타투를 선택한 다음 사진을 추가하세요',
    createNewTattoo: '새 타투 만들기',
    createNewTattooDescription:
      '타투 아이디어를 설명하면 생성해 드립니다',
    tattooCoverUp: '타투 커버업 아이디어',
    tattooCoverUpDescription:
      '사진을 참조하여 기존 타투를 덮을 아이디어 생성',
    removeTattoo: '타투 제거',
    removeTattooDescription:
      '사진에서 기존 타투 제거',
    promptHistory: '프롬프트 기록',
    promptHistoryDescription: '이전 프롬프트 보기',
    requestFeature: '기능 요청',
    requestFeatureDescription:
      'Tattoo Design AI에 다음으로 지원했으면 하는 기능을 알려주세요',

    // Try on alerts
    addYourPhoto: '사진 추가',
    addPhotoQuestion:
      '타투를 넣을 부위의 사진을 어떻게 추가하시겠습니까?',
    takePhoto: '사진 촬영',
    chooseFromLibrary: '라이브러리에서 선택',
    createTattooFirst: '먼저 타투를 만드세요',
    createTattooFirstMessage:
      '타투를 입어보려면:\n\n1. 타투 디자인을 생성하거나 선택\n2. 신체 사진을 추가\n\n합성하여 어떻게 보이는지 보여드립니다!',
    createTattoo: '타투 만들기',
  },

  tattoos: {
    // Screen header
    title: '내 타투',

    // Loading
    loading: '타투 불러오는 중...',

    // Empty state
    emptyTitle: '아직 저장된 타투가 없습니다',
    emptyDescription:
      '첫 번째 타투 디자인을 만들고 저장하세요! 아래로 스와이프하여 새로고침.',

    // Cloud restore
    restoringFromCloud: '클라우드에서 복원 중...',
    noCloudGenerations: '클라우드에 생성된 타투 없음',
    restoredCount: '{{total}}개 중 {{restored}}개 타투 복원됨',
    restoreFailedTitle: '복원 실패',
    restoreFailedMessage:
      '클라우드에서 복원할 수 없습니다. 다시 시도해 주세요.',
    cloudFound: '클라우드에서 타투 {{count}}개 발견',
    cloudFound_other: '클라우드에서 타투 {{count}}개 발견',
    restoring: '복원 중...',
    restore: '복원',
    cloudCount: '클라우드에 {{count}}개',

    // Detail screen
    tattooNotFound: '타투를 찾을 수 없음',
    backToHome: '홈으로 돌아가기',
    shareError: '이미지를 공유할 수 없습니다. 다시 시도해 주세요.',
    imageAccessError: '이미지 파일에 접근할 수 없습니다.',
    deleteTitle: '타투 삭제',
    deleteMessage:
      '이 타투 디자인을 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다.',
    deleteError: '이미지를 삭제할 수 없습니다. 다시 시도해 주세요.',
  },

  generation: {
    // Loading
    applyingDesign: '타투 디자인 적용 중...',

    // Error
    invalidRequest: '잘못된 요청',
    generationFailed: '생성 실패',
    failedToGenerate: '타투 디자인 생성에 실패했습니다',
    startOver: '처음부터 다시',

    // Success
    tattooReady: '타투가 완성되었습니다!',
    tattooReadyDescription:
      '디자인을 적용하면 이렇게 보입니다',
    saveToGallery: '갤러리에 저장',
    generateAnother: '다른 디자인 생성',

    // Save alerts
    savedTitle: '저장됨!',
    savedMessage:
      '타투 디자인이 사진 갤러리에 저장되었습니다.',
    viewInGallery: '갤러리에서 보기',

    // Generate another alert
    generateAnotherTitle: '다른 디자인을 생성하시겠습니까?',
    generateAnotherMessage:
      '이 타투가 아직 저장되지 않았습니다. 계속하기 전에 저장하시겠습니까?',
    continueWithoutSaving: '저장하지 않고 계속',
    saveAndContinue: '저장 후 계속',

    // Cancel alert
    cancelGenerationTitle: '생성을 취소하시겠습니까?',
    cancelGenerationMessage:
      '타투가 아직 생성 중입니다. 지금 취소해도 이 생성은 사용 횟수에 포함됩니다. 취소하시겠습니까?',
    keepGenerating: '계속 생성',
    unableToSave: '이미지를 저장할 수 없습니다. 다시 시도해 주세요.',
  },

  home: {
    // Section headers
    discoverStyles: '새로운 스타일 발견',
    moreStyles: '더 많은 스타일',
    moods: '분위기',
    discoverSketches: '스케치 디자인 발견',

    // Quick actions
    generateFromIdea: '아이디어로 생성',
    generateFromIdeaDesc: '상상에서 타투를 만들기',
    seeItOnSkin: '피부 위에서 보기',
    seeItOnSkinDesc: '사진을 찍고 타투를 미리보기',
    blendTattoo: '타투 블렌드',
    blendTattooDesc: '기존 타투를 업로드하고 수정하기',
    removeTattoo: '타투 제거',
    removeTattooDesc: '피부에서 기존 타투 제거',
  },

  explore: {
    // Section headers
    byStyles: '스타일별 탐색',
    byMoods: '분위기별 탐색',
    byBodyPart: '신체 부위별 탐색',

    // Filter labels
    styles: '스타일',
    bodyPart: '신체 부위',
  },

  featureRequest: {
    title: '아이디어 공유',
    placeholder: '경험을 개선할 아이디어...',
    needHelp: '도움이 필요하세요? ',
    contactUs: '문의하기',
    successToast:
      '기능 요청이 전송되었습니다! 피드백 감사합니다.',
    errorToast:
      '기능 요청 전송에 실패했습니다. 다시 시도해 주세요.',
  },

  promptHistory: {
    title: '프롬프트 기록',
    clearAll: '모두 지우기',
    clearAllTitle: '프롬프트 기록 지우기',
    clearAllMessage:
      '저장된 모든 프롬프트를 삭제하시겠습니까?',
    deletePromptTitle: '프롬프트 삭제',
    deletePromptMessage: '이 프롬프트를 기록에서 삭제하시겠습니까?',
    emptyTitle: '아직 프롬프트가 없습니다',
    emptyDescription:
      '타투를 생성하면 프롬프트가 여기에 표시됩니다',
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
