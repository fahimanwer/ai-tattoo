/**
 * Ukrainian translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const ukFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Переглядайте тату перед нанесенням.',
    whatsYourName: 'Як вас звати?',
    namePlaceholder: 'Ваше ім\u0027я',
    nameDescription: 'Ми використаємо це для персоналізації вашого досвіду.',
    welcome: 'Ласкаво просимо',
    welcomeDescription: 'Налаштуймо ваш досвід у Tattoo Design AI прямо зараз.',
    describeYou: 'Що найкраще\n описує вас?',
    describeYouDescription:
      'Це допоможе нам персоналізувати досвід на основі вашого ставлення до тату',
    whatToDo: 'Що б ви\n хотіли зробити?',
    whatToDoDescription:
      'Це допоможе нам зрозуміти, як ви хочете досліджувати тату та які інструменти будуть для вас найкориснішими.',
    designTattoo: 'Створіть тату,\n яке ви бажаєте',
    designTattooDescription:
      'Введіть кілька слів або завантажте зображення, і миттєво створіть унікальні дизайни тату.',
    whereTattoo: 'Де ви хочете\n зробити тату?',
    whereTattooDescription:
      'Розташування впливає на дизайн, розмір та форму, що допоможе нам підлаштувати ідеї під ваше тіло.',
    pickStyles: 'Оберіть до 5\n стилів, які вам подобаються',
    pickStylesDescription:
      'Ваш вибір стилів допоможе нам підібрати дизайни, що відповідають вашому смаку.',
    whenTattoo: 'Коли ви плануєте\n зробити тату?',
    whenTattooDescription:
      'Це допоможе нам підлаштувати\n досвід під ваші терміни.',
    whatVibe: 'Який настрій\n ви шукаєте?',
    whatVibeDescription:
      'Тату несуть емоції — це допоможе нам зрозуміти історію, що стоїть за вашим.',
    settingUp: 'Налаштовуємо\n все для вас',
    youreAllSet: 'Все готово!',
    youreAllSetDescription: 'Все готово, щоб почати.',

    // CTA
    alreadyHaveAccount: 'Вже маєте акаунт? ',
    signIn: 'Увійти',

    // User description options
    userDescription: {
      artist: 'Я створюю тату',
      client: 'Я хочу зробити тату',
      model: 'Я використовую тату для контенту',
      explorer: 'Я просто досліджую',
    },

    // Goal options
    goal: {
      tryOn: 'Приміряти тату на моїх фото',
      generate: 'Згенерувати ідеї для тату',
      browse: 'Просто переглядаю або шукаю натхнення',
      coverUp: 'Перекрити/переробити наявне тату',
    },

    // Location options
    location: {
      wrist: 'Зап\u0027ясток',
      chest: 'Груди',
      hand: 'Кисть',
      back: 'Спина',
      legs: 'Ноги',
      forearm: 'Передпліччя',
      neck: 'Шия',
      jaw: 'Щелепа',
      forehead: 'Лоб',
      knuckles: 'Кісточки пальців',
      fingers: 'Пальці',
      cheek: 'Щока',
      shoulder: 'Плече',
      temple: 'Скроня',
      ribs: 'Ребра',
      abdomen: 'Живіт',
      face: 'Обличчя',
      hips: 'Стегна',
      thigh: 'Стегно',
      tricep: 'Трицепс',
      bicep: 'Біцепс',
      collarbone: 'Ключиця',
      ankle: 'Щиколотка',
      foot: 'Стопа',
      palm: 'Долоня',
      notSure: 'Не впевнений(-а)',
    },

    // Style options
    styles: {
      traditional: 'Традиційне',
      realism: 'Реалізм',
      minimal: 'Мінімалізм',
      celtic: 'Кельтське',
      blackwork: 'Блекворк',
      illustrative: 'Ілюстративне',
      lettering: 'Леттерінг',
      irezumi: 'Ірезумі',
      geometric: 'Геометричне',
      religious: 'Релігійне',
      anime: 'Аніме',
      fineLine: 'Тонкі лінії',
      dotwork: 'Дотворк',
      linework: 'Лайнворк',
      calligraphy: 'Каліграфія',
      portrait: 'Портрет',
      floral: 'Квіткове',
      polynesian: 'Полінезійське',
      tribal: 'Трайбл',
      maori: 'Маорі',
      gothic: 'Готичне',
      patchwork: 'Печворк',
      abstract: 'Абстракція',
      cyberpunk: 'Кіберпанк',
      threeD: '3D',
      astrology: 'Астрологія',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Цього тижня',
      thisMonth: 'Цього місяця',
      oneToThreeMonths: 'Через 1-3 місяці',
      someday: 'Колись, я просто досліджую',
    },

    // Vibe options
    vibe: {
      bold: 'Сміливе',
      confident: 'Впевнене',
      soft: 'Ніжне',
      dark: 'Темне',
      edgy: 'Зухвале',
      elegant: 'Елегантне',
      spiritual: 'Духовне',
      cute: 'Миле',
      symbolic: 'Символічне',
      playful: 'Грайливе',
      clean: 'Чисте',
      modern: 'Сучасне',
      meaningful: 'Змістовне',
      personalStory: 'Особиста історія',
      family: 'Сім\u0027я',
      love: 'Кохання',
      memory: 'Спогад',
      rebirth: 'Відродження',
      freedom: 'Свобода',
      mystical: 'Містичне',
      rebellious: 'Бунтівне',
      serene: 'Спокійне',
      empowered: 'Наснажене',
      ethereal: 'Ефірне',
      fearless: 'Безстрашне',
      wanderlust: 'Потяг до мандрів',
      transcendent: 'Трансцендентне',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Розуміємо бачення {{name}}',
      understandingVisionDefault: 'Розуміємо ваше бачення',
      tailoringDesigns: 'Підбираємо дизайни під ваш стиль',
      settingUpCoverUp: 'Налаштовуємо інструменти для перекриття',
      personalizingExperience: 'Персоналізуємо ваш досвід',
      preparingStudio: 'Готуємо вашу дизайн-студію',
      configuringWorkspace: 'Налаштовуємо ваш робочий простір',
      applyingPreferences: 'Застосовуємо ваші налаштування',
      journeyStartsNow: 'Ваша подорож у світ тату починається зараз',
    },

    // Reviews
    reviews: {
      review1Title: 'Чудовий додаток!',
      review1Body:
        'Додаток працює, виглядає та відчувається чудово! Вражений тим, як добре він накладає тату, враховуючи точне освітлення та тіні.',
      review1Author: 'Jacob C.',
      review2Title: 'Справді корисний',
      review2Body:
        'Дизайни тату чіткі та деталізовані. Деякі зображення генеруються трохи довше, але загалом це один з найкращих AI-додатків для тату.',
      review2Author: 'Alexrays1',
      review3Title: 'Мені це подобається',
      review3Body: 'Дуже рекомендую \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Генеруйте тату миттєво',
    containerDesc1:
      'Введіть кілька слів і миттєво створіть унікальні дизайни тату.',
    containerTitle2: 'Персоналізуйте свій дизайн',
    containerDesc2:
      'Змінюйте кольори, композицію та стиль, щоб зробити тату ідеальним.',
    containerTitle3: 'Перегляньте на своїй шкірі',
    containerDesc3:
      'Переглядайте будь-яке тату на своїй шкірі — змінюйте розмір та розташування миттєво.',
    paused: 'Призупинено',

    // Relative time
    time: {
      today: 'Сьогодні',
      yesterday: 'Вчора',
      daysAgo: '{{count}} днів тому',
      weeksAgo: '{{count}} тижнів тому',
      monthsAgo: '{{count}} місяців тому',
      yearsAgo: '{{count}} років тому',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Технологія примірки',
      tryOnTechnologyDesc: 'Подивіться тату на шкірі перед нанесенням',
      aiTattooGenerator: 'AI-генератор тату',
      aiTattooGeneratorDesc: 'Створюйте унікальні дизайни з ваших ідей',
      coverUpAssistant: 'Помічник із перекриття',
      coverUpAssistantDesc: 'Перетворіть наявні тату на нове мистецтво',
      artistTools: 'Інструменти для художників',
      artistToolsDesc:
        'Миттєво показуйте клієнтам дизайни на їх тілі',
      precisePlacement: 'Точне розташування',
      precisePlacementDesc:
        'Ідеальний розмір для вашого тату на {{location}}',
      styleMatchedDesigns: 'Дизайни відповідного стилю',
      styleMatchedDesignsDesc:
        'Підібране натхнення у стилі {{style}}',
      readyWhenYouAre: 'Готові, коли ви готові',
      readyWhenYouAreDesc: 'Почніть дизайн сьогодні, нанесіть завтра',
      realisticTryOn: 'Реалістична примірка',
      realisticTryOnDesc: 'Побачте точно, як це виглядатиме на вас',
      saveAndShare: 'Зберегти та поділитися',
      saveAndShareDesc:
        'Зберігайте вподобані та діліться з художником',
      aiDesignStudio: 'AI дизайн-студія',
      aiDesignStudioDesc: 'Миттєво генеруйте унікальні дизайни тату',

      // Personalized greetings
      greetingArtist: 'Ваш новий інструмент для роботи з клієнтами готовий',
      greetingCoverUp: 'Готові перетворити ваше тату',
      greetingGenerate: 'Ваша AI дизайн-студія чекає',
      greetingDefault: 'Ваша подорож у світ тату починається зараз',
      welcomeAboard: 'Ласкаво просимо, {{name}}!',
      welcomeName: 'Ласкаво просимо, {{name}}',

      // Urgency messages
      urgencyArtist: 'Показуйте клієнтам реальні прев\u0027ю миттєво.',
      urgencyCoverUp: 'Виправте своє тату з впевненістю.',
      urgencyTryOn: 'Приміряйте тату перед нанесенням.',
      urgencyDefault: 'Необмежені дизайни. Жодних жалів.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Продовжити',
    restorePurchase: 'Відновити покупку',
    current: 'ПОТОЧНИЙ',

    // Plan terms
    week: 'Тиждень',
    month: 'Місяць',
    weekly: 'Щотижня',
    perWeek: '/Тиждень',

    // Content
    loadingPlans: 'Завантаження планів…',
    restoreSubscription: 'Відновити підписку',
    fairUseNote: 'Генерація AI-дизайну має обмеження справедливого використання.',
    saveBadge: 'Знижка {{percent}}%',
    subtitle:
      'Досліджуйте ідеї для тату, вдосконалюйте дизайни через нескінченні варіації, приміряйте їх на будь-яку частину тіла та експортуйте високоякісні результати з впевненістю.',

    // Personalized headlines
    headlineArtist: 'Покажіть клієнтам їхнє тату перед нанесенням',
    headlineCoverUp: 'Перетворіть своє тату з впевненістю',
    headlineTryOn: 'Побачте своє тату перед нанесенням',
    headlineDesign: 'Створіть тату, про яке ви завжди мріяли',
    headlineBrowse: 'Знайдіть ідеальний дизайн тату',

    // Purchase flow alerts
    successTitle: 'Успішно!',
    subscriptionActiveMessage:
      'Ваша підписка тепер активна. Насолоджуйтесь необмеженими дизайнами тату!',
    almostThereTitle: 'Майже готово!',
    createAccountMessage:
      'Створіть акаунт, щоб активувати підписку та почати проєктувати.',
    purchaseRestoredTitle: 'Покупку відновлено!',
    subscriptionNowActive: 'Ваша підписка тепер активна.',
    purchaseFoundTitle: 'Покупку знайдено!',
    purchasesRestoredMessage: 'Ваші покупки було відновлено.',
    noPurchasesFoundTitle: 'Покупок не знайдено',
    noPurchasesFoundMessage:
      'Попередніх покупок для відновлення не знайдено.',
    purchaseFailedTitle: 'Помилка покупки',
    purchaseFailedMessage:
      'Не вдалося завершити покупку. Будь ласка, спробуйте ще раз.',
    errorRestoringTitle: 'Помилка відновлення покупок',
    errorRestoringMessage:
      'Не вдалося відновити покупки. Будь ласка, спробуйте ще раз.',
    subscriptionActivated: 'Підписку активовано!',

    // Alerts
    purchaseError: 'Помилка покупки',
    restoreSuccess: 'Покупку відновлено',
    restoreError: 'Помилка відновлення',
    noPurchaseFound: 'Попередніх покупок не знайдено',

    // Pricing overhaul
    annual: 'Річний',
    year: 'Рік',
    perYear: '/Рік',
    freeTrialBadge: '{{days}}-ДЕННА БЕЗКОШТОВНА ПРОБНА ВЕРСІЯ',
    startTrialButton: 'Почати безкоштовну пробну версію на {{days}} днів',
    specialOffer: 'Спеціальна пропозиція',
    limitedTimeOffer: 'Обмежена пропозиція',
    discountSubtitle: 'Тільки для нових користувачів — відкрийте повний доступ сьогодні',
    savePercent: 'Заощаджуйте {{percent}}%',
    annualPerWeek: '{{price}}/тиждень',
    todayOnly: 'Тільки сьогодні',
    offerExpires: 'Пропозиція закінчується через',
    perWeekBilled: 'на тиждень, оплата {{period}}',
    originalPrice: 'Було {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Скасувати генерацію',
    cancelGenerationTitle: 'Скасувати генерацію?',
    cancelGenerationMessage:
      'Ви збираєтесь скасувати поточну генерацію. Це видалить поточну генерацію та почне нову сесію.',
    clearEverythingTitle: 'Очистити все?',
    clearEverythingMessage:
      'Ви збираєтесь очистити цю сесію. Це видалить усі згенеровані тату. Збережіть усе необхідне перед продовженням.',
    clearEverything: 'Очистити все',

    // Input
    enterText: 'Введіть текст',
    describeTattoo: 'Опишіть своє тату або оберіть пропозицію нижче',

    // Try on alert
    tryOnTitle: 'Приміряти {{style}}',
    tryOnMessage:
      'Зробіть фото частини тіла, щоб побачити, як це тату виглядатиме на вас!',
    choosePhoto: 'Обрати фото',
    later: 'Пізніше',

    // Preview on body
    previewOnBody: 'Переглянути тату на тілі',
    imageSelectedCombine: '1 зображення вибрано — додайте ще одне для поєднання',

    // Suggestions
    createTattoo: 'Створити тату {{title}}',
    createStyleTattoo: 'Створити тату у стилі {{title}}',
    tryStyle: 'Спробувати стиль {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Оновлюємо ваше тату...',
      startingNew: 'Починаємо нове тату...',
      warmingUp: 'Тату-машинка розігрівається...',
      summoningSpirits: 'Викликаємо духів чорнила...',
      drawingInspiration: 'Черпаємо натхнення з Всесвіту...',
      brewingMasterpiece: 'Майже завершили ваш шедевр...',
      sprinkleCreativity: 'Додаємо дрібку креативності...',
      perfectingPixels: 'Вдосконалюємо кожен піксель вашого тату...',
      injectingCreativity: 'Вводимо креативність у вашу шкіру...',
      mixingShade: 'Змішуємо ідеальний відтінок...',
      sharpeningNeedles: 'Заточуємо віртуальні голки...',
      calibratingVibes: 'Калібруємо вайб вашого тату...',
      consultingOracle: 'Консультуємось з оракулом тату...',
    },

    // Error states
    error: {
      keepCreating: 'Продовжуйте творити без обмежень',
      limitReachedFree:
        'Ви досягли поточного ліміту генерацій. Покращіть план зараз, щоб досліджувати варіації, вдосконалювати дизайни та творити без очікування.',
      unlockUnlimited: 'Розблокувати необмежені дизайни \u2192',
      limitReachedSubscribed:
        'Ви досягли ліміту на цей період',
      limitReachedSubscribedDesc:
        'Ліміт генерацій вашого плану вичерпано. Ваш ліміт скинеться на початку наступного розрахункового періоду.',
      tryAgainLater: 'Спробуйте пізніше',
      contactSupport: 'Зв\u0027язатися з підтримкою',
    },

    // Session history actions
    actions: 'Дії',
    saveToGallery: 'Зберегти в галерею',

    // Result image actions
    imageActions: 'Дії із зображенням',
    copyToClipboard: 'Копіювати в буфер обміну',
    imageCopied: 'Зображення скопійовано в буфер обміну',
    imageCopyFailed: 'Не вдалося скопіювати зображення',
    imageSaved: 'Зображення збережено в галерею!',
    imageSaveFailed: 'Не вдалося зберегти зображення. Спробуйте ще раз.',

    // Context alerts
    photoAccessTitle: 'Потрібен доступ до фото',
    photoAccessMessage:
      'Щоб зберігати зображення в галерею, нам потрібен доступ до ваших фото. Ви можете увімкнути це в налаштуваннях.',
    resetSessionTitle: 'Скинути сесію?',
    resetSessionMessage:
      'Ви впевнені, що хочете скинути сесію? Це видалить усі згенеровані тату та почне нову сесію.',
    resetButton: 'Скинути',
    shareError: 'Не вдалося поділитися зображенням',
    imageDataError: 'Не вдалося отримати дані зображення',
    pickImageError: 'Не вдалося вибрати зображення з галереї',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Зображення не знайдено',
    useTattoo: 'Використати тату',
    useTattooError: 'Не вдалося використати це тату. Спробуйте ще раз.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Усі фото',
    addPhotos: 'Додати {{count}} фото',
    addPhotos_other: 'Додати {{count}} фото',
    recentPhotos: 'Нещодавні фото',
    selectOneMore: 'Виберіть ще 1 для поєднання',

    // Options
    tryOn: 'Приміряти',
    tryOnDescriptionWithTattoo:
      'Додайте фото тіла для перегляду',
    tryOnDescriptionNoTattoo:
      'Спочатку виберіть тату, потім додайте фото',
    createNewTattoo: 'Створити нове тату',
    createNewTattooDescription:
      'Опишіть ідею тату, і ми його згенеруємо',
    tattooCoverUp: 'Ідея перекриття тату',
    tattooCoverUpDescription:
      'Згенеруйте ідею для перекриття наявного тату, використовуючи фото як зразок',
    removeTattoo: 'Видалити тату',
    removeTattooDescription:
      'Видалити наявне тату з фото',
    promptHistory: 'Історія запитів',
    promptHistoryDescription: 'Переглянути попередні запити',
    requestFeature: 'Запропонувати функцію',
    requestFeatureDescription:
      'Розкажіть, що б ви хотіли бачити в Tattoo Design AI',

    // Try on alerts
    addYourPhoto: 'Додайте ваше фото',
    addPhotoQuestion:
      'Як ви хочете додати фото місця, де бажаєте тату?',
    takePhoto: 'Зробити фото',
    chooseFromLibrary: 'Обрати з бібліотеки',
    createTattooFirst: 'Спочатку створіть тату',
    createTattooFirstMessage:
      'Щоб приміряти тату, потрібно:\n\n1. Згенерувати або вибрати дизайн тату\n2. Потім додати фото вашого тіла\n\nМи поєднаємо їх, щоб показати, як це виглядатиме!',
    createTattoo: 'Створити тату',
  },

  tattoos: {
    // Screen header
    title: 'Мої тату',

    // Loading
    loading: 'Завантаження тату...',

    // Empty state
    emptyTitle: 'Збережених тату ще немає',
    emptyDescription:
      'Створіть і збережіть свій перший дизайн тату! Потягніть вниз для оновлення.',

    // Cloud restore
    restoringFromCloud: 'Відновлення з хмари...',
    noCloudGenerations: 'Хмарних генерацій не знайдено',
    restoredCount: 'Відновлено {{restored}} з {{total}} тату',
    restoreFailedTitle: 'Помилка відновлення',
    restoreFailedMessage:
      'Не вдалося відновити з хмари. Будь ласка, спробуйте ще раз.',
    cloudFound: '{{count}} тату знайдено в хмарі',
    cloudFound_other: '{{count}} тату знайдено в хмарі',
    restoring: 'Відновлення...',
    restore: 'Відновити',
    cloudCount: '{{count}} у хмарі',

    // Detail screen
    tattooNotFound: 'Тату не знайдено',
    backToHome: 'На головну',
    shareError: 'Не вдалося поділитися зображенням. Спробуйте ще раз.',
    imageAccessError: 'Не вдалося отримати доступ до файлу зображення.',
    deleteTitle: 'Видалити тату',
    deleteMessage:
      'Ви впевнені, що хочете видалити цей дизайн тату? Цю дію неможливо скасувати.',
    deleteError: 'Не вдалося видалити зображення. Спробуйте ще раз.',
  },

  generation: {
    // Loading
    applyingDesign: 'Накладаємо ваш дизайн тату...',

    // Error
    invalidRequest: 'Невірний запит',
    generationFailed: 'Помилка генерації',
    failedToGenerate: 'Не вдалося згенерувати дизайн тату',
    startOver: 'Почати спочатку',

    // Success
    tattooReady: 'Ваше тату готове!',
    tattooReadyDescription:
      'Ось як виглядатиме ваш дизайн після нанесення',
    saveToGallery: 'Зберегти в галерею',
    generateAnother: 'Згенерувати ще',

    // Save alerts
    savedTitle: 'Збережено!',
    savedMessage:
      'Ваш дизайн тату збережено у фотогалерею.',
    viewInGallery: 'Переглянути в галереї',

    // Generate another alert
    generateAnotherTitle: 'Згенерувати ще?',
    generateAnotherMessage:
      'Ви ще не зберегли це тату. Бажаєте зберегти перед продовженням?',
    continueWithoutSaving: 'Продовжити без збереження',
    saveAndContinue: 'Зберегти та продовжити',

    // Cancel alert
    cancelGenerationTitle: 'Скасувати генерацію?',
    cancelGenerationMessage:
      'Ваше тату ще генерується. Якщо ви скасуєте зараз, ця генерація все одно буде зарахована до вашого ліміту. Ви впевнені, що хочете скасувати?',
    keepGenerating: 'Продовжити генерацію',
    unableToSave: 'Не вдалося зберегти зображення. Спробуйте ще раз.',
  },

  home: {
    // Section headers
    discoverStyles: 'Відкрийте нові стилі',
    moreStyles: 'Більше стилів',
    moods: 'Настрої',
    discoverSketches: 'Відкрийте дизайни ескізів',

    // Quick actions
    generateFromIdea: 'Згенерувати з ідеї',
    generateFromIdeaDesc: 'Створіть тату з вашої уяви',
    seeItOnSkin: 'Побачте на шкірі',
    seeItOnSkinDesc: 'Зробіть фото та переглядайте тату',
    blendTattoo: 'Змішати тату',
    blendTattooDesc: 'Завантажте наявне тату та змініть його',
    removeTattoo: 'Видалити тату',
    removeTattooDesc: 'Видаліть наявне тату зі шкіри',
  },

  explore: {
    // Section headers
    byStyles: 'За стилями',
    byMoods: 'За настроями',
    byBodyPart: 'За частиною тіла',

    // Filter labels
    styles: 'Стилі',
    bodyPart: 'Частина тіла',
  },

  featureRequest: {
    title: 'Поділіться ідеями',
    placeholder: 'Ідеї для покращення вашого досвіду...',
    needHelp: 'Потрібна допомога? ',
    contactUs: 'Зв\u0027яжіться з нами',
    successToast:
      'Запит на функцію надіслано! Дякуємо за ваш відгук.',
    errorToast:
      'Не вдалося надіслати запит на функцію. Спробуйте ще раз.',
  },

  promptHistory: {
    title: 'Історія запитів',
    clearAll: 'Очистити все',
    clearAllTitle: 'Очистити історію запитів',
    clearAllMessage:
      'Ви впевнені, що хочете видалити всі збережені запити?',
    deletePromptTitle: 'Видалити запит',
    deletePromptMessage: 'Видалити цей запит з історії?',
    emptyTitle: 'Запитів ще немає',
    emptyDescription:
      'Ваші запити з\u0027являться тут після генерації тату',
  },
};
