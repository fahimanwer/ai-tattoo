/**
 * Japanese translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const jaFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'コミットする前にタトゥーをプレビュー。',
    whatsYourName: 'お名前は？',
    namePlaceholder: 'あなたの名前',
    nameDescription: '体験をパーソナライズするために使用します。',
    welcome: 'ようこそ',
    welcomeDescription: 'Tattoo Design AIの体験をカスタマイズしましょう。',
    describeYou: 'あなたに一番\n 近いのは？',
    describeYouDescription:
      'タトゥーとの関わり方に基づいて体験をパーソナライズします',
    whatToDo: '何をしたい\n ですか？',
    whatToDoDescription:
      'タトゥーをどのように探索したいか、どんなツールが役立つかを把握するのに役立ちます。',
    designTattoo: '理想のタトゥーを\n デザイン',
    designTattooDescription:
      '数文字入力するか画像をアップロードして、ユニークなタトゥーデザインを即座に生成。',
    whereTattoo: 'タトゥーを入れたい\n 場所は？',
    whereTattooDescription:
      '配置はデザイン、サイズ、流れに影響します。体に合わせたアイデアをご提案します。',
    pickStyles: '好きなスタイルを\n 最大5つ選択',
    pickStylesDescription:
      'スタイルの選択により、お好みに合ったデザインを絞り込めます。',
    whenTattoo: 'タトゥーを入れるのは\n いつ頃ですか？',
    whenTattooDescription:
      'タイムラインに合わせて\n 体験をカスタマイズします。',
    whatVibe: 'どんな雰囲気が\n お好みですか？',
    whatVibeDescription:
      'タトゥーは感情を伝えます。あなたのタトゥーに込めたい思いを教えてください。',
    settingUp: '準備を\n しています',
    youreAllSet: '準備完了！',
    youreAllSetDescription: '始める準備ができました。',

    // CTA
    alreadyHaveAccount: 'すでにアカウントをお持ちですか？ ',
    signIn: 'サインイン',

    // User description options
    userDescription: {
      artist: 'タトゥーを制作しています',
      client: 'タトゥーを入れたいです',
      model: 'コンテンツ用にタトゥーを使います',
      explorer: '探索しているだけです',
    },

    // Goal options
    goal: {
      tryOn: '写真にタトゥーを試す',
      generate: 'タトゥーのアイデアを生成',
      browse: 'インスピレーションを探しています',
      coverUp: '既存のタトゥーのカバーアップ/修正',
    },

    // Location options
    location: {
      wrist: '手首',
      chest: '胸',
      hand: '手',
      back: '背中',
      legs: '脚',
      forearm: '前腕',
      neck: '首',
      jaw: '顎',
      forehead: '額',
      knuckles: '指の関節',
      fingers: '指',
      cheek: '頬',
      shoulder: '肩',
      temple: 'こめかみ',
      ribs: '肋骨',
      abdomen: '腹部',
      face: '顔',
      hips: '腰',
      thigh: '太もも',
      tricep: '上腕三頭筋',
      bicep: '上腕二頭筋',
      collarbone: '鎖骨',
      ankle: '足首',
      foot: '足',
      palm: '手のひら',
      notSure: 'まだ決めていない',
    },

    // Style options
    styles: {
      traditional: 'トラディショナル',
      realism: 'リアリズム',
      minimal: 'ミニマル',
      celtic: 'ケルティック',
      blackwork: 'ブラックワーク',
      illustrative: 'イラストレーティブ',
      lettering: 'レタリング',
      irezumi: '入れ墨',
      geometric: 'ジオメトリック',
      religious: '宗教的',
      anime: 'アニメ',
      fineLine: 'ファインライン',
      dotwork: 'ドットワーク',
      linework: 'ラインワーク',
      calligraphy: '書道',
      portrait: 'ポートレート',
      floral: 'フローラル',
      polynesian: 'ポリネシアン',
      tribal: 'トライバル',
      maori: 'マオリ',
      gothic: 'ゴシック',
      patchwork: 'パッチワーク',
      abstract: 'アブストラクト',
      cyberpunk: 'サイバーパンク',
      threeD: '3D',
      astrology: '占星術',
    },

    // Timeframe options
    timeframe: {
      thisWeek: '今週',
      thisMonth: '今月',
      oneToThreeMonths: '1〜3ヶ月以内',
      someday: 'いつか、今は探索中',
    },

    // Vibe options
    vibe: {
      bold: '大胆',
      confident: '自信',
      soft: 'ソフト',
      dark: 'ダーク',
      edgy: 'エッジー',
      elegant: 'エレガント',
      spiritual: 'スピリチュアル',
      cute: 'キュート',
      symbolic: 'シンボリック',
      playful: '遊び心',
      clean: 'クリーン',
      modern: 'モダン',
      meaningful: '意味深い',
      personalStory: '個人的な物語',
      family: '家族',
      love: '愛',
      memory: '思い出',
      rebirth: '再生',
      freedom: '自由',
      mystical: '神秘的',
      rebellious: '反骨',
      serene: '穏やか',
      empowered: '力強い',
      ethereal: '幻想的',
      fearless: '恐れ知らず',
      wanderlust: '放浪癖',
      transcendent: '超越的',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: '{{name}}さんのビジョンを理解中',
      understandingVisionDefault: 'あなたのビジョンを理解中',
      tailoringDesigns: 'スタイルに合わせてデザインを調整中',
      settingUpCoverUp: 'カバーアップツールを準備中',
      personalizingExperience: '体験をパーソナライズ中',
      preparingStudio: 'デザインスタジオを準備中',
      configuringWorkspace: 'ワークスペースを設定中',
      applyingPreferences: '好みを適用中',
      journeyStartsNow: 'タトゥーの旅が始まります',
    },

    // Reviews
    reviews: {
      review1Title: '素晴らしいアプリ！',
      review1Body:
        'アプリの動作、見た目、使い心地が素晴らしい！正確な光と影を考慮したタトゥーの適用に感動しました。',
      review1Author: 'Jacob C.',
      review2Title: '本当に役立つ',
      review2Body:
        'タトゥーデザインがクリーンで精細。一部の画像は生成に少し時間がかかりますが、全体的にAIタトゥーアプリの中でトップクラスです。',
      review2Author: 'Alexrays1',
      review3Title: '大好きです',
      review3Body: '強くお勧めします 🫵🏼',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'タトゥーを即座に生成',
    containerDesc1:
      '数文字入力するだけで、ユニークなタトゥーデザインを即座に生成。',
    containerTitle2: 'デザインをカスタマイズ',
    containerDesc2:
      'カラー、レイアウト、スタイルを調整して、完璧なタトゥーに仕上げましょう。',
    containerTitle3: '肌の上でプレビュー',
    containerDesc3:
      'あなたの肌にタトゥーをプレビュー。サイズと配置を即座に調整できます。',
    paused: '一時停止中',

    // Relative time
    time: {
      today: '今日',
      yesterday: '昨日',
      daysAgo: '{{count}}日前',
      weeksAgo: '{{count}}週間前',
      monthsAgo: '{{count}}ヶ月前',
      yearsAgo: '{{count}}年前',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'トライオン機能',
      tryOnTechnologyDesc: 'コミットする前に肌の上でタトゥーを確認',
      aiTattooGenerator: 'AIタトゥージェネレーター',
      aiTattooGeneratorDesc: 'あなたのアイデアからユニークなデザインを作成',
      coverUpAssistant: 'カバーアップアシスタント',
      coverUpAssistantDesc: '既存のタトゥーを新しいアートに変身',
      artistTools: 'アーティストツール',
      artistToolsDesc:
        'クライアントの体にデザインを即座に表示',
      precisePlacement: '精密な配置',
      precisePlacementDesc:
        '{{location}}のタトゥーに最適なサイジング',
      styleMatchedDesigns: 'スタイルマッチデザイン',
      styleMatchedDesignsDesc:
        '厳選された{{style}}タトゥーのインスピレーション',
      readyWhenYouAre: '準備ができたら',
      readyWhenYouAreDesc: '今日デザインして、明日インク',
      realisticTryOn: 'リアルなトライオン',
      realisticTryOnDesc: 'あなたの体でどう見えるかを正確に確認',
      saveAndShare: '保存＆共有',
      saveAndShareDesc:
        'お気に入りを保存してアーティストと共有',
      aiDesignStudio: 'AIデザインスタジオ',
      aiDesignStudioDesc: 'ユニークなタトゥーデザインを即座に生成',

      // Personalized greetings
      greetingArtist: 'クライアント体験の新ツールが準備完了',
      greetingCoverUp: 'タトゥーの変身準備ができました',
      greetingGenerate: 'AIデザインスタジオが待っています',
      greetingDefault: 'タトゥーの旅がここから始まります',
      welcomeAboard: 'ようこそ、{{name}}さん！',
      welcomeName: 'ようこそ {{name}}さん',

      // Urgency messages
      urgencyArtist: 'クライアントにリアルなプレビューを即座に表示。',
      urgencyCoverUp: '自信を持ってタトゥーを修正。',
      urgencyTryOn: 'コミットする前にタトゥーを試してみよう。',
      urgencyDefault: '無制限のデザイン。後悔ゼロ。',
    },
  },

  paywall: {
    // CTA
    continueButton: '続ける',
    restorePurchase: '購入を復元',
    current: '現在',

    // Plan terms
    week: '週',
    month: '月',
    weekly: '週間',
    monthly: '月額',
    perWeek: '/週',

    // Content
    loadingPlans: 'プランを読み込み中…',
    restoreSubscription: 'サブスクリプションを復元',
    fairUseNote: 'AIデザイン生成にはフェアユース制限が含まれます。',
    saveBadge: '{{percent}}%お得',
    subtitle:
      'タトゥーのアイデアを探索し、無限のバリエーションでデザインを磨き、体のどの部分にも試着して、自信を持って高品質な結果をエクスポート。',

    // Personalized headlines
    headlineArtist: 'インクを入れる前にクライアントにタトゥーを見せよう',
    headlineCoverUp: '自信を持ってタトゥーを変身させよう',
    headlineTryOn: 'コミットする前にタトゥーを確認しよう',
    headlineDesign: 'ずっと夢見ていたタトゥーをデザイン',
    headlineBrowse: '理想のタトゥーデザインを見つけよう',

    // Purchase flow alerts
    successTitle: '成功！',
    subscriptionActiveMessage:
      'サブスクリプションが有効になりました。無制限のタトゥーデザインをお楽しみください！',
    almostThereTitle: 'あと少し！',
    createAccountMessage:
      'アカウントを作成してサブスクリプションを有効化し、デザインを始めましょう。',
    purchaseRestoredTitle: '購入が復元されました！',
    subscriptionNowActive: 'サブスクリプションが有効になりました。',
    purchaseFoundTitle: '購入が見つかりました！',
    purchasesRestoredMessage: '購入が復元されました。',
    noPurchasesFoundTitle: '購入が見つかりません',
    noPurchasesFoundMessage:
      '復元可能な以前の購入が見つかりませんでした。',
    purchaseFailedTitle: '購入に失敗',
    purchaseFailedMessage:
      '購入を完了できませんでした。もう一度お試しください。',
    errorRestoringTitle: '購入の復元エラー',
    errorRestoringMessage:
      '購入を復元できませんでした。もう一度お試しください。',
    subscriptionActivated: 'サブスクリプションが有効化されました！',

    // Alerts
    purchaseError: '購入エラー',
    restoreSuccess: '購入が復元されました',
    restoreError: '復元に失敗',
    noPurchaseFound: '以前の購入が見つかりません',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: '生成をキャンセル',
    cancelGenerationTitle: '生成をキャンセルしますか？',
    cancelGenerationMessage:
      '現在の生成をキャンセルしようとしています。現在の生成が削除され、新しいセッションが開始されます。',
    clearEverythingTitle: 'すべてクリアしますか？',
    clearEverythingMessage:
      'このセッションをクリアしようとしています。生成されたすべてのタトゥーが削除されます。続ける前に保存したいものは保存してください。',
    clearEverything: 'すべてクリア',

    // Input
    enterText: 'テキストを入力',
    describeTattoo: 'タトゥーを説明するか、下の提案から選択してください',

    // Try on alert
    tryOnTitle: '{{style}}を試す',
    tryOnMessage:
      '体の部位の写真を撮って、このタトゥーがどう見えるか確認しましょう！',
    choosePhoto: '写真を選択',
    later: '後で',

    // Preview on body
    previewOnBody: '体にタトゥーをプレビュー',
    imageSelectedCombine: '1枚選択済み - もう1枚追加して合成',

    // Suggestions
    createTattoo: '{{title}}のタトゥーを作成',
    createStyleTattoo: '{{title}}スタイルのタトゥーを作成',
    tryStyle: '{{title}}スタイルを試す',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'タトゥーを更新中...',
      startingNew: '新しいタトゥーを開始中...',
      warmingUp: 'タトゥーマシンをウォームアップ中...',
      summoningSpirits: 'インクの精霊を召喚中...',
      drawingInspiration: '宇宙からインスピレーションを得ています...',
      brewingMasterpiece: '傑作がもうすぐ完成...',
      sprinkleCreativity: 'クリエイティビティを一振り...',
      perfectingPixels: 'タトゥーの全ピクセルを完璧に...',
      injectingCreativity: 'クリエイティビティを肌に注入中...',
      mixingShade: '最高の色合いを調合中...',
      sharpeningNeedles: 'バーチャルニードルを研ぎ中...',
      calibratingVibes: 'タトゥーのバイブスを調整中...',
      consultingOracle: 'タトゥーの神託に相談中...',
    },

    // Error states
    error: {
      keepCreating: '制限なく作成を続けよう',
      limitReachedFree:
        '現在の生成上限に達しました。今すぐアップグレードして、バリエーションの探索、デザインの調整、待ち時間なしの作成を続けましょう。',
      unlockUnlimited: '無制限デザインをアンロック \u2192',
      limitReachedSubscribed:
        'この期間の上限に達しました',
      limitReachedSubscribedDesc:
        'プランの生成上限に達しました。次の請求期間の開始時にリセットされます。',
      tryAgainLater: '後でもう一度お試しください',
      contactSupport: 'サポートに連絡',
    },

    // Session history actions
    actions: 'アクション',
    saveToGallery: 'ギャラリーに保存',

    // Result image actions
    imageActions: '画像アクション',
    copyToClipboard: 'クリップボードにコピー',
    imageCopied: '画像がクリップボードにコピーされました',
    imageCopyFailed: '画像のコピーに失敗しました',
    imageSaved: '画像がギャラリーに保存されました！',
    imageSaveFailed: '画像の保存に失敗しました。もう一度お試しください。',

    // Context alerts
    photoAccessTitle: '写真へのアクセスが必要です',
    photoAccessMessage:
      'ギャラリーに画像を保存するには、写真へのアクセスが必要です。設定で有効にできます。',
    resetSessionTitle: 'セッションをリセットしますか？',
    resetSessionMessage:
      'セッションをリセットしてもよろしいですか？生成されたすべてのタトゥーがクリアされ、新しいセッションが開始されます。',
    resetButton: 'リセット',
    shareError: '画像の共有に失敗しました',
    imageDataError: '画像データの取得に失敗しました',
    pickImageError: 'ギャラリーからの画像選択に失敗しました',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: '画像が見つかりません',
    useTattoo: 'タトゥーを使用',
    useTattooError: 'このタトゥーの使用に失敗しました。もう一度お試しください。',
  },

  sheet: {
    // Photo selection
    allPhotos: 'すべての写真',
    addPhotos: '{{count}}枚の写真を追加',
    addPhotos_other: '{{count}}枚の写真を追加',
    recentPhotos: '最近の写真',
    selectOneMore: 'あと1枚選択して合成',

    // Options
    tryOn: '試着する',
    tryOnDescriptionWithTattoo:
      'プレビューする体の写真を追加',
    tryOnDescriptionNoTattoo:
      'まずタトゥーを選択してから写真を追加してください',
    createNewTattoo: '新しいタトゥーを作成',
    createNewTattooDescription:
      'タトゥーのアイデアを説明すると生成します',
    tattooCoverUp: 'タトゥーカバーアップアイデア',
    tattooCoverUpDescription:
      '写真を参考にして既存のタトゥーをカバーするアイデアを生成',
    removeTattoo: 'タトゥーを除去',
    removeTattooDescription:
      '写真から既存のタトゥーを除去',
    promptHistory: 'プロンプト履歴',
    promptHistoryDescription: '以前のプロンプトを表示',
    requestFeature: '機能をリクエスト',
    requestFeatureDescription:
      'Tattoo Design AIに次に対応してほしい機能を教えてください',

    // Try on alerts
    addYourPhoto: '写真を追加',
    addPhotoQuestion:
      'タトゥーを入れたい場所の写真をどのように追加しますか？',
    takePhoto: '写真を撮る',
    chooseFromLibrary: 'ライブラリから選択',
    createTattooFirst: 'まずタトゥーを作成',
    createTattooFirstMessage:
      'タトゥーを試着するには：\n\n1. タトゥーデザインを生成または選択\n2. 体の写真を追加\n\n合成してどう見えるかお見せします！',
    createTattoo: 'タトゥーを作成',
  },

  tattoos: {
    // Screen header
    title: 'マイタトゥー',

    // Loading
    loading: 'タトゥーを読み込み中...',

    // Empty state
    emptyTitle: 'まだタトゥーが保存されていません',
    emptyDescription:
      '最初のタトゥーデザインを作成して保存しましょう！下にスワイプして更新。',

    // Cloud restore
    restoringFromCloud: 'クラウドから復元中...',
    noCloudGenerations: 'クラウドに生成が見つかりません',
    restoredCount: '{{total}}個中{{restored}}個のタトゥーを復元しました',
    restoreFailedTitle: '復元に失敗',
    restoreFailedMessage:
      'クラウドからの復元ができませんでした。もう一度お試しください。',
    cloudFound: 'クラウドに{{count}}個のタトゥーが見つかりました',
    cloudFound_other: 'クラウドに{{count}}個のタトゥーが見つかりました',
    restoring: '復元中...',
    restore: '復元',
    cloudCount: 'クラウドに{{count}}個',

    // Detail screen
    tattooNotFound: 'タトゥーが見つかりません',
    backToHome: 'ホームに戻る',
    shareError: '画像を共有できませんでした。もう一度お試しください。',
    imageAccessError: '画像ファイルにアクセスできません。',
    deleteTitle: 'タトゥーを削除',
    deleteMessage:
      'このタトゥーデザインを削除してもよろしいですか？この操作は元に戻せません。',
    deleteError: '画像を削除できませんでした。もう一度お試しください。',
  },

  generation: {
    // Loading
    applyingDesign: 'タトゥーデザインを適用中...',

    // Error
    invalidRequest: '無効なリクエスト',
    generationFailed: '生成に失敗',
    failedToGenerate: 'タトゥーデザインの生成に失敗しました',
    startOver: 'やり直す',

    // Success
    tattooReady: 'タトゥーが完成しました！',
    tattooReadyDescription:
      'デザインを適用するとこのように見えます',
    saveToGallery: 'ギャラリーに保存',
    generateAnother: '別のデザインを生成',

    // Save alerts
    savedTitle: '保存しました！',
    savedMessage:
      'タトゥーデザインがフォトギャラリーに保存されました。',
    viewInGallery: 'ギャラリーで見る',

    // Generate another alert
    generateAnotherTitle: '別のデザインを生成しますか？',
    generateAnotherMessage:
      'このタトゥーはまだ保存されていません。続ける前に保存しますか？',
    continueWithoutSaving: '保存せずに続ける',
    saveAndContinue: '保存して続ける',

    // Cancel alert
    cancelGenerationTitle: '生成をキャンセルしますか？',
    cancelGenerationMessage:
      'タトゥーはまだ生成中です。今キャンセルしても、この生成は使用回数にカウントされます。キャンセルしてもよろしいですか？',
    keepGenerating: '生成を続ける',
    unableToSave: '画像を保存できません。もう一度お試しください。',
  },

  home: {
    // Section headers
    discoverStyles: '新しいスタイルを発見',
    moreStyles: 'その他のスタイル',
    moods: 'ムード',
    discoverSketches: 'スケッチデザインを発見',

    // Quick actions
    generateFromIdea: 'アイデアから生成',
    generateFromIdeaDesc: 'あなたの想像からタトゥーを作成',
    seeItOnSkin: '肌の上で見る',
    seeItOnSkinDesc: '写真を撮ってタトゥーをプレビュー',
    blendTattoo: 'タトゥーをブレンド',
    blendTattooDesc: '既存のタトゥーをアップロードして修正',
    removeTattoo: 'タトゥーを除去',
    removeTattooDesc: '肌から既存のタトゥーを除去',
  },

  explore: {
    // Section headers
    byStyles: 'スタイルで探索',
    byMoods: 'ムードで探索',
    byBodyPart: '部位で探索',

    // Filter labels
    styles: 'スタイル',
    bodyPart: '部位',
  },

  featureRequest: {
    title: 'アイデアを共有',
    placeholder: '体験を改善するアイデア...',
    needHelp: 'お困りですか？ ',
    contactUs: 'お問い合わせ',
    successToast:
      '機能リクエストが送信されました！フィードバックありがとうございます。',
    errorToast:
      '機能リクエストの送信に失敗しました。もう一度お試しください。',
  },

  promptHistory: {
    title: 'プロンプト履歴',
    clearAll: 'すべてクリア',
    clearAllTitle: 'プロンプト履歴をクリア',
    clearAllMessage:
      '保存されたすべてのプロンプトを削除してもよろしいですか？',
    deletePromptTitle: 'プロンプトを削除',
    deletePromptMessage: 'このプロンプトを履歴から削除しますか？',
    emptyTitle: 'まだプロンプトがありません',
    emptyDescription:
      'タトゥーを生成すると、プロンプトがここに表示されます',
  },
};
