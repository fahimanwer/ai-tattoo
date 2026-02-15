/**
 * Korean translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const koCore = {
  common: {
    // Actions
    loading: '로딩 중...',
    error: '오류',
    success: '성공',
    cancel: '취소',
    confirm: '확인',
    save: '저장',
    done: '완료',
    close: '닫기',
    back: '뒤로',
    next: '다음',
    skip: '건너뛰기',
    continue: '계속',
    retry: '재시도',
    delete: '삭제',
    edit: '편집',
    share: '공유',
    send: '보내기',
    search: '검색',
    seeAll: '전체 보기',
    tryAgain: '다시 시도',
    ok: '확인',
    yes: '예',
    no: '아니오',
    or: '또는',
    upgrade: '업그레이드',
    processing: '처리 중...',
    openSettings: '설정 열기',
    readMore: '더 보기',
    createTattoo: '타투 만들기',
    style: '스타일',

    // States
    on: '켜짐',
    off: '꺼짐',
    enabled: '활성화',
    disabled: '비활성화',

    // Errors
    somethingWentWrong: '문제가 발생했습니다',
    unexpectedError: '예상치 못한 오류가 발생했습니다',
  },

  tabs: {
    home: '홈',
    explore: '탐색',
    myTattoos: '내 타투',
    profile: '프로필',
    tryOnTattoo: '타투 입어보기',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: '다시 오신 것을 환영합니다!',
    signInDescription: '원하시는 로그인 방법을 선택해 주세요',
    signIn: '로그인',
    alreadyHaveAccount: '이미 계정이 있으신가요? ',
    termsOfService: '이용약관',
    privacyPolicy: '개인정보 처리방침',
    byContinuingAgree: '계속하시면 다음에 동의하게 됩니다 ',
    inkognitoMode: 'Ink-ognito 모드',
    inkognitoDescription: '당신의 디자인은 당신에게만 남습니다.',
    signInToContinue:
      '타투를 만들려면 로그인해 주세요!',
    signInBenefit:
      '로그인하시면 무료 타투 생성 횟수를 추적하고 계정을 올바르게 설정할 수 있습니다.',
    notSignedIn: '(로그인하지 않음)',
  },

  profile: {
    // Screen header
    title: '프로필',

    // Section headers
    account: '계정',
    planAndUsage: '플랜 및 사용량',
    settings: '설정',
    support: '지원',
    legal: '법적 정보',
    dangerZone: '위험 구역',
    supportAndFeedback: '지원 및 피드백',
    followUs: '팔로우하기',

    // Sign-in prompt
    notSignedIn: '로그인하지 않음',
    signInPrompt:
      '로그인하여 계정 세부정보, 구독 정보, 맞춤 기능에 접근하세요',

    // Account
    email: '이메일',
    name: '이름',
    model: '모델',
    userId: '사용자 ID',
    memberSince: '가입일',
    signOut: '로그아웃',
    logOut: '로그아웃',
    signOutConfirmTitle: '로그아웃',
    signOutConfirmMessage: '정말 로그아웃하시겠습니까?',
    unknownUser: '알 수 없는 사용자',

    // Plan
    plan: '플랜',
    activeUsagePeriod: '활성 사용 기간',
    currentPlan: '현재 플랜',
    planDetails: '플랜 상세',
    status: '상태',
    renewsOn: '갱신일',
    expiresOn: '만료일',
    daysRemaining: '남은 일수',
    daysValue: '{{count}}일',
    price: '가격',
    billingPeriod: '결제 주기',
    managePlan: '플랜 관리',
    upgradePlan: '플랜 업그레이드',
    upgradeNow: '지금 업그레이드',
    limitReachedFooter:
      '생성 한도에 도달했습니다. 계속하려면 업그레이드해 주세요.',
    noSubscription: '구독 없음',
    cancelledActive: '취소됨 (활성)',
    cancelledActiveUntilExpiration: '취소됨 (만료까지 활성)',
    activeUntilExpiration: '만료까지 활성',
    accessEndsOn: '액세스 종료일',
    autoRenew: '자동 갱신',
    cancelledAt: '취소일',
    expiredOn: '만료일',
    refreshing: '새로고침 중...',
    refreshData: '데이터 새로고침',
    limitReachedFooterLong:
      '이 플랜의 AI 타투 생성 한도에 도달했습니다. 타투 제작을 계속하려면 업그레이드하거나 문의해 주세요.',
    weMissYouFooter:
      '더 멋진 타투를 만들 준비가 되셨나요? 돌아와서 함께 멋진 디자인을 만들어 봐요.',
    unknown: '알 수 없음',
    free: '무료',
    pro: 'Pro',
    active: '활성',
    expired: '만료됨',
    cancelled: '취소됨',
    generationsUsed: '사용한 생성 횟수',
    generationsRemaining: '남은 생성 횟수',
    unlimited: '무제한',
    na: 'N/A',

    // We Miss You
    weMissYou: '보고 싶었어요!',
    previousPlan: '이전 플랜',
    comeBackAndCreate: '돌아와서 만들기',

    // Enjoying the app
    enjoyingApp: '앱이 마음에 드시나요?',
    enjoyingAppDescription:
      'Tattoo Design AI가 마음에 드신다면, 리뷰를 남겨주시면 다른 타투 애호가들이 앱을 발견하는 데 도움이 됩니다. 피드백이나 기능 아이디어도 언제든 환영합니다.',
    rateOnPlayStore: 'Play Store에서 평가',
    rateOnAppStore: 'App Store에서 평가',
    sendFeedback: '피드백 보내기',

    // Are you an artist
    areYouArtist: '아티스트이신가요?',
    artistDescription:
      '협업에 관심이 있으시거나 제안이나 의견이 있으신가요? 연락주세요!',
    writeToUs: '문의하기',

    // Support
    contactSupport: '고객 지원 문의',
    requestFeature: '기능 요청',
    rateApp: '앱 평가',
    shareApp: '앱 공유',
    shareWithFriends: '친구와 공유',
    shareMessage: 'Tattoo Design AI를 확인해 보세요 \n',

    // Settings
    appearance: '외관',
    light: '라이트',
    dark: '다크',
    system: '시스템',
    language: '언어',
    languageAuto: '자동 (시스템)',
    showOnboarding: '온보딩 보기',
    promptEnhancement: '프롬프트 강화',
    promptEnhancementDisabledTitle: '프롬프트 강화 비활성화됨',
    promptEnhancementDisabledMessage:
      '강화 없이는 결과가 다를 수 있습니다. 언제든지 다시 켤 수 있습니다.',

    // Legal
    termsOfService: '이용약관',
    privacyPolicy: '개인정보 처리방침',

    // Danger
    deleteAccount: '계정 삭제',
    deleteAccountConfirmTitle: '계정 삭제',
    deleteAccountConfirmMessage:
      '정말 삭제하시겠습니까? 이 작업은 되돌릴 수 없습니다. 참고: 활성 구독은 취소되지 않습니다.',
    dangerZoneFooter:
      '계정 삭제는 영구적입니다. 활성 구독은 취소되지 않습니다.',
    resetOnboarding: '온보딩 초기화',

    // Version
    version: '버전',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI 앱 지원 요청',
      body: '안녕하세요,\n\nTattoo Design AI 앱에 대해 도움이 필요합니다.\n\n{{userInfo}}\n\n설명:\n[문제를 여기에 설명해 주세요]\n\n감사합니다!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI 기능 요청 도움',
      body: '안녕하세요,\n\n기능 요청 제출에 대해 도움이 필요합니다.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI 피드백',
      body: '안녕하세요!\n\nTattoo Design AI에 대한 피드백이 있습니다:\n\n[여기에 피드백을 작성해 주세요]{{userInfo}}\n\n감사합니다!',
    },
    artist: {
      subject: '아티스트이신가요? - Tattoo Design AI',
      body: '안녕하세요!\n\n협업에 관심이 있거나 제안/의견이 있습니다.\n\n{{userInfo}}\n\n[제안, 의견 또는 아티스트로서의 자기소개를 공유해 주세요]\n\n감사합니다!',
    },
    userIdLabel: '사용자 ID: {{id}}',
    emailLabel: '이메일: {{email}}',
    accountLabel: '내 계정 이메일: {{email}}',
    myUserIdLabel: '내 사용자 ID: {{id}}',
    accountInfo: '\n\n계정: {{email}}',
  },

  notFound: {
    title: '이런!',
    description: '이 화면은 존재하지 않습니다.',
    goHome: '홈 화면으로 이동!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: '시작해 볼까요',
    photoAccessDescription:
      '이미지를 추가하려면 사진 접근 권한이 필요합니다',
    photoAccessDeniedTitle: '사진 접근 권한 필요',
    photoAccessDeniedDescription:
      '이 기능은 사진 라이브러리에 대한 접근 권한이 필요합니다. 타투를 보고 저장하는 데 사용됩니다. 기기 설정에서 사진 접근을 관리할 수 있습니다.',
    photoLibraryNeeded:
      '타투를 보고 저장하려면 사진 라이브러리에 대한 접근 권한이 필요합니다.',

    // Camera
    cameraAccessTitle: '시작해 볼까요',
    cameraAccessDescription:
      '사진을 촬영하려면 카메라 접근 권한이 필요합니다.',
    cameraAccessDeniedTitle: '카메라 접근 권한 필요',
    cameraAccessDeniedDescription:
      '이 기능은 카메라 접근 권한이 필요합니다. 기기 설정에서 카메라 접근을 관리할 수 있습니다.',
  },
};
