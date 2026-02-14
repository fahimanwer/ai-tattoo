/**
 * Japanese translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const jaCore = {
  common: {
    // Actions
    loading: '読み込み中...',
    error: 'エラー',
    success: '成功',
    cancel: 'キャンセル',
    confirm: '確認',
    save: '保存',
    done: '完了',
    close: '閉じる',
    back: '戻る',
    next: '次へ',
    skip: 'スキップ',
    continue: '続ける',
    retry: '再試行',
    delete: '削除',
    edit: '編集',
    share: '共有',
    send: '送信',
    search: '検索',
    seeAll: 'すべて見る',
    tryAgain: 'もう一度試す',
    ok: 'OK',
    yes: 'はい',
    no: 'いいえ',
    or: 'または',
    upgrade: 'アップグレード',
    processing: '処理中...',
    openSettings: '設定を開く',
    readMore: '詳しく見る',
    createTattoo: 'タトゥーを作成',
    style: 'スタイル',

    // States
    on: 'オン',
    off: 'オフ',
    enabled: '有効',
    disabled: '無効',

    // Errors
    somethingWentWrong: '問題が発生しました',
    unexpectedError: '予期しないエラーが発生しました',
  },

  tabs: {
    home: 'ホーム',
    explore: '探索',
    myTattoos: 'マイタトゥー',
    profile: 'プロフィール',
    tryOnTattoo: 'タトゥーを試す',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'おかえりなさい！',
    signInDescription: 'ご希望のサインイン方法を選択してください',
    signIn: 'サインイン',
    alreadyHaveAccount: 'すでにアカウントをお持ちですか？ ',
    termsOfService: '利用規約',
    privacyPolicy: 'プライバシーポリシー',
    byContinuingAgree: '続行すると、以下に同意したことになります ',
    inkognitoMode: 'Ink-ognito モード',
    inkognitoDescription: 'あなたのデザインはあなたのもの。私たちには残りません。',
    signInToContinue:
      'タトゥーを作成するには、サインインしてください！',
    signInBenefit:
      'サインインすると、無料タトゥー生成の回数を管理し、アカウントを正しく設定できます。',
    notSignedIn: '（未サインイン）',
  },

  profile: {
    // Screen header
    title: 'プロフィール',

    // Section headers
    account: 'アカウント',
    planAndUsage: 'プラン＆使用状況',
    settings: '設定',
    support: 'サポート',
    legal: '法的情報',
    dangerZone: '危険ゾーン',
    supportAndFeedback: 'サポート＆フィードバック',
    followUs: 'フォローする',

    // Sign-in prompt
    notSignedIn: '未サインイン',
    signInPrompt:
      'サインインして、アカウント詳細、サブスクリプション情報、パーソナライズされた機能にアクセスしましょう',

    // Account
    email: 'メールアドレス',
    name: '名前',
    model: 'モデル',
    userId: 'ユーザーID',
    memberSince: '登録日',
    signOut: 'サインアウト',
    logOut: 'ログアウト',
    signOutConfirmTitle: 'サインアウト',
    signOutConfirmMessage: 'サインアウトしてもよろしいですか？',
    unknownUser: '不明なユーザー',

    // Plan
    plan: 'プラン',
    activeUsagePeriod: '有効な使用期間',
    currentPlan: '現在のプラン',
    planDetails: 'プラン詳細',
    status: 'ステータス',
    renewsOn: '更新日',
    expiresOn: '有効期限',
    daysRemaining: '残り日数',
    daysValue: '{{count}}日',
    price: '価格',
    billingPeriod: '請求期間',
    managePlan: 'プランを管理',
    upgradePlan: 'プランをアップグレード',
    upgradeNow: '今すぐアップグレード',
    limitReachedFooter:
      '生成回数の上限に達しました。続けるにはアップグレードしてください。',
    noSubscription: 'サブスクリプションなし',
    cancelledActive: 'キャンセル済み（有効）',
    cancelledActiveUntilExpiration: 'キャンセル済み（期限まで有効）',
    activeUntilExpiration: '期限まで有効',
    accessEndsOn: 'アクセス終了日',
    autoRenew: '自動更新',
    cancelledAt: 'キャンセル日',
    expiredOn: '期限切れ日',
    refreshing: '更新中...',
    refreshData: 'データを更新',
    limitReachedFooterLong:
      'このプランのAIタトゥー生成回数の上限に達しました。タトゥー作成を続けるにはアップグレードするか、お問い合わせください。',
    weMissYouFooter:
      '素敵なタトゥーをもっと作りませんか？一緒に素晴らしいデザインを作りましょう。',
    unknown: '不明',
    free: '無料',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: '有効',
    expired: '期限切れ',
    cancelled: 'キャンセル済み',
    generationsUsed: '使用済み生成回数',
    generationsRemaining: '残り生成回数',
    unlimited: '無制限',
    na: 'N/A',

    // We Miss You
    weMissYou: 'お待ちしています！',
    previousPlan: '以前のプラン',
    comeBackAndCreate: '戻って作成しよう',

    // Enjoying the app
    enjoyingApp: 'アプリを楽しんでいますか？',
    enjoyingAppDescription:
      'Tattoo Design AIを楽しんでいただけていたら、レビューをお願いします。他のタトゥー好きの方がアプリを見つける手助けになります。フィードバックや機能のアイデアもいつでもお待ちしています。',
    rateOnPlayStore: 'Play Storeで評価',
    rateOnAppStore: 'App Storeで評価',
    sendFeedback: 'フィードバックを送信',

    // Are you an artist
    areYouArtist: 'アーティストですか？',
    artistDescription:
      'コラボレーションに興味がありますか？ご提案やご意見がありましたら、ぜひお聞かせください！',
    writeToUs: 'お問い合わせ',

    // Support
    contactSupport: 'サポートに連絡',
    requestFeature: '機能をリクエスト',
    rateApp: 'アプリを評価',
    shareApp: 'アプリを共有',
    shareWithFriends: '友達と共有',
    shareMessage: 'Tattoo Design AIをチェックしてみて \n',

    // Settings
    appearance: '外観',
    light: 'ライト',
    dark: 'ダーク',
    system: 'システム',
    language: '言語',
    languageAuto: '自動（システム）',
    showOnboarding: 'オンボーディングを表示',
    promptEnhancement: 'プロンプト強化',
    promptEnhancementDisabledTitle: 'プロンプト強化が無効',
    promptEnhancementDisabledMessage:
      '強化なしでは結果が異なる場合があります。いつでも再度オンにできます。',

    // Legal
    termsOfService: '利用規約',
    privacyPolicy: 'プライバシーポリシー',

    // Danger
    deleteAccount: 'アカウントを削除',
    deleteAccountConfirmTitle: 'アカウントを削除',
    deleteAccountConfirmMessage:
      '本当によろしいですか？この操作は元に戻せません。注意：有効なサブスクリプションはキャンセルされません。',
    dangerZoneFooter:
      'アカウントの削除は永久的です。有効なサブスクリプションはキャンセルされません。',
    resetOnboarding: 'オンボーディングをリセット',

    // Version
    version: 'バージョン',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI アプリサポートリクエスト',
      body: 'こんにちは、\n\nTattoo Design AIアプリについてサポートが必要です。\n\n{{userInfo}}\n\n説明：\n[問題の詳細をここに記入してください]\n\nよろしくお願いします！',
    },
    featureRequest: {
      subject: 'Tattoo Design AI 機能リクエストについて',
      body: 'こんにちは、\n\n機能リクエストの送信についてサポートが必要です。\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI フィードバック',
      body: 'こんにちは！\n\nTattoo Design AIについてフィードバックがあります：\n\n[フィードバックをここに記入]{{userInfo}}\n\nよろしくお願いします！',
    },
    artist: {
      subject: 'アーティストですか？ - Tattoo Design AI',
      body: 'こんにちは！\n\nコラボレーションに興味がある、またはご提案・ご意見があります。\n\n{{userInfo}}\n\n[ご提案、ご意見、またはアーティストとしてのご自身について教えてください]\n\nよろしくお願いします！',
    },
    userIdLabel: 'ユーザーID: {{id}}',
    emailLabel: 'メール: {{email}}',
    accountLabel: 'アカウントメール: {{email}}',
    myUserIdLabel: 'マイユーザーID: {{id}}',
    accountInfo: '\n\nアカウント: {{email}}',
  },

  notFound: {
    title: 'おっと！',
    description: 'この画面は存在しません。',
    goHome: 'ホーム画面へ戻る！',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'はじめましょう',
    photoAccessDescription:
      '画像を追加するために写真へのアクセスが必要です',
    photoAccessDeniedTitle: '写真へのアクセスが必要です',
    photoAccessDeniedDescription:
      'この機能はフォトライブラリへのアクセスが必要です。タトゥーの閲覧と保存に使用します。デバイスの設定から写真のアクセスを管理できます。',
    photoLibraryNeeded:
      'タトゥーの閲覧と保存のために、フォトライブラリへのアクセスが必要です。',

    // Camera
    cameraAccessTitle: 'はじめましょう',
    cameraAccessDescription:
      '写真を撮影するためにカメラへのアクセスが必要です。',
    cameraAccessDeniedTitle: 'カメラへのアクセスが必要です',
    cameraAccessDeniedDescription:
      'この機能はカメラへのアクセスが必要です。デバイスの設定からカメラのアクセスを管理できます。',
  },
};
