/**
 * Ukrainian translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const ukCore = {
  common: {
    // Actions
    loading: 'Завантаження...',
    error: 'Помилка',
    success: 'Успішно',
    cancel: 'Скасувати',
    confirm: 'Підтвердити',
    save: 'Зберегти',
    done: 'Готово',
    close: 'Закрити',
    back: 'Назад',
    next: 'Далі',
    skip: 'Пропустити',
    continue: 'Продовжити',
    retry: 'Повторити',
    delete: 'Видалити',
    edit: 'Редагувати',
    share: 'Поділитися',
    send: 'Надіслати',
    search: 'Пошук',
    seeAll: 'Переглянути все',
    tryAgain: 'Спробувати ще раз',
    ok: 'OK',
    yes: 'Так',
    no: 'Ні',
    or: 'або',
    upgrade: 'Покращити',
    processing: 'Обробка...',
    openSettings: 'Відкрити налаштування',
    readMore: 'Детальніше',
    createTattoo: 'Створити тату',
    style: 'Стиль',

    // States
    on: 'Увімк.',
    off: 'Вимк.',
    enabled: 'Увімкнено',
    disabled: 'Вимкнено',

    // Errors
    somethingWentWrong: 'Щось пішло не так',
    unexpectedError: 'Виникла непередбачена помилка',
  },

  tabs: {
    home: 'Головна',
    explore: 'Огляд',
    myTattoos: 'Мої тату',
    profile: 'Профіль',
    tryOnTattoo: 'Приміряти тату',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'З поверненням!',
    signInDescription: 'Оберіть бажаний спосіб входу',
    signIn: 'Увійти',
    alreadyHaveAccount: 'Вже маєте акаунт? ',
    termsOfService: 'Умови використання',
    privacyPolicy: 'Політика конфіденційності',
    byContinuingAgree: 'Продовжуючи, ви погоджуєтесь з нашими ',
    inkognitoMode: 'Ink-ognito режим',
    inkognitoDescription: 'Ваші дизайни залишаються з вами, а не з нами.',
    signInToContinue:
      'Будь ласка, увійдіть, щоб продовжити та створити своє тату!',
    signInBenefit:
      'Увійшовши, ми зможемо відстежувати ваші безкоштовні генерації тату та забезпечити правильне налаштування вашого акаунту.',
    notSignedIn: '(Не увійшли)',
  },

  profile: {
    // Screen header
    title: 'Профіль',

    // Section headers
    account: 'Акаунт',
    planAndUsage: 'План і використання',
    settings: 'Налаштування',
    support: 'Підтримка',
    legal: 'Юридична інформація',
    dangerZone: 'Небезпечна зона',
    supportAndFeedback: 'Підтримка та відгуки',
    followUs: 'Слідкуйте за нами',

    // Sign-in prompt
    notSignedIn: 'Ви не увійшли',
    signInPrompt:
      'Увійдіть, щоб отримати доступ до деталей акаунту, інформації про підписку та персоналізованих функцій',

    // Account
    email: 'Електронна пошта',
    name: "Ім'я",
    model: 'Модель',
    userId: 'ID користувача',
    memberSince: 'Учасник з',
    signOut: 'Вийти',
    logOut: 'Вийти',
    signOutConfirmTitle: 'Вийти',
    signOutConfirmMessage: 'Ви впевнені, що хочете вийти?',
    unknownUser: 'Невідомий користувач',

    // Plan
    plan: 'План',
    activeUsagePeriod: 'Активний період використання',
    currentPlan: 'Поточний план',
    planDetails: 'Деталі плану',
    status: 'Статус',
    renewsOn: 'Поновлюється',
    expiresOn: 'Закінчується',
    daysRemaining: 'Залишилось днів',
    daysValue: '{{count}} днів',
    price: 'Ціна',
    billingPeriod: 'Період оплати',
    managePlan: 'Керувати планом',
    upgradePlan: 'Покращити план',
    upgradeNow: 'Покращити зараз',
    limitReachedFooter:
      'Ви досягли ліміту генерацій. Покращіть план, щоб продовжити.',
    noSubscription: 'Немає підписки',
    cancelledActive: 'Скасовано (Активно)',
    cancelledActiveUntilExpiration: 'Скасовано (Активно до закінчення терміну)',
    activeUntilExpiration: 'Активно до закінчення терміну',
    accessEndsOn: 'Доступ закінчується',
    autoRenew: 'Автопоновлення',
    cancelledAt: 'Скасовано',
    expiredOn: 'Закінчилось',
    refreshing: 'Оновлення...',
    refreshData: 'Оновити дані',
    limitReachedFooterLong:
      'Ви досягли ліміту генерації AI-тату для цього плану. Покращіть план, щоб продовжити створювати тату, або зв\u0027яжіться з нами.',
    weMissYouFooter:
      'Готові створювати ще більше чудових тату? Повертайтесь, і давайте разом створимо щось неймовірне.',
    unknown: 'Невідомо',
    free: 'Безкоштовний',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Активний',
    expired: 'Завершений',
    cancelled: 'Скасований',
    generationsUsed: 'Використано генерацій',
    generationsRemaining: 'Залишилось генерацій',
    unlimited: 'Необмежено',
    na: 'Н/Д',

    // We Miss You
    weMissYou: 'Ми сумуємо за вами!',
    previousPlan: 'Попередній план',
    comeBackAndCreate: 'Повертайтесь і творіть',

    // Enjoying the app
    enjoyingApp: 'Подобається додаток?',
    enjoyingAppDescription:
      'Якщо вам подобається Tattoo Design AI, ваш відгук допоможе іншим любителям тату знайти нас. Ви також можете будь-коли надіслати зворотній зв\u0027язок або ідеї.',
    rateOnPlayStore: 'Оцінити в Play Store',
    rateOnAppStore: 'Оцінити в App Store',
    sendFeedback: 'Надіслати відгук',

    // Are you an artist
    areYouArtist: 'Ви художник?',
    artistDescription:
      'Зацікавлені у співпраці? Маєте пропозиції чи скарги? Ми раді почути вас!',
    writeToUs: 'Напишіть нам',

    // Support
    contactSupport: 'Зв\u0027язатися з підтримкою',
    requestFeature: 'Запропонувати функцію',
    rateApp: 'Оцінити додаток',
    shareApp: 'Поділитися додатком',
    shareWithFriends: 'Поділитися з друзями',
    shareMessage: 'Перегляньте Tattoo Design AI \n',

    // Settings
    appearance: 'Зовнішній вигляд',
    light: 'Світла',
    dark: 'Темна',
    system: 'Системна',
    language: 'Мова',
    languageAuto: 'Авто (Системна)',
    showOnboarding: 'Показати вступ',
    promptEnhancement: 'Покращення запитів',
    promptEnhancementDisabledTitle: 'Покращення запитів вимкнено',
    promptEnhancementDisabledMessage:
      'Результати можуть відрізнятися без покращення. Увімкніть його знову будь-коли.',

    // Legal
    termsOfService: 'Умови використання',
    privacyPolicy: 'Політика конфіденційності',

    // Danger
    deleteAccount: 'Видалити акаунт',
    deleteAccountConfirmTitle: 'Видалити акаунт',
    deleteAccountConfirmMessage:
      'Ви впевнені? Цю дію неможливо скасувати. Примітка: це НЕ скасовує активні підписки.',
    dangerZoneFooter:
      'Видалення акаунту є остаточним. Це НЕ скасовує активні підписки.',
    resetOnboarding: 'Скинути вступ',

    // Version
    version: 'Версія',
  },

  emails: {
    support: {
      subject: 'Запит на підтримку додатку Tattoo Design AI',
      body: 'Привіт,\n\nМені потрібна допомога з додатком Tattoo Design AI.\n\n{{userInfo}}\n\nОпис:\n[Будь ласка, опишіть вашу проблему тут]\n\nДякую!',
    },
    featureRequest: {
      subject: 'Допомога із запитом на функцію Tattoo Design AI',
      body: 'Привіт,\n\nМені потрібна допомога з надсиланням запиту на функцію.\n\n',
    },
    feedback: {
      subject: 'Відгук про Tattoo Design AI',
      body: 'Привіт!\n\nМаю відгук про Tattoo Design AI:\n\n[Ваш відгук тут]{{userInfo}}\n\nДякую!',
    },
    artist: {
      subject: 'Ви художник? - Tattoo Design AI',
      body: 'Привіт!\n\nЯ зацікавлений(-а) у співпраці або маю пропозиції/скарги.\n\n{{userInfo}}\n\n[Будь ласка, поділіться вашими пропозиціями, скаргами або розкажіть про себе як художника]\n\nДякую!',
    },
    userIdLabel: 'ID користувача: {{id}}',
    emailLabel: 'Електронна пошта: {{email}}',
    accountLabel: 'Електронна пошта мого акаунту: {{email}}',
    myUserIdLabel: 'Мій ID користувача: {{id}}',
    accountInfo: '\n\nАкаунт: {{email}}',
  },

  notFound: {
    title: 'Ой!',
    description: 'Цей екран не існує.',
    goHome: 'На головний екран!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Почнімо',
    photoAccessDescription:
      'Нам потрібен доступ до ваших фото, щоб додавати зображення',
    photoAccessDeniedTitle: 'Потрібен доступ до фото',
    photoAccessDeniedDescription:
      'Для цієї функції потрібен доступ до вашої фотобібліотеки для перегляду та збереження тату. Ви можете керувати доступом до фото в налаштуваннях пристрою.',
    photoLibraryNeeded:
      'Нам потрібен доступ до вашої фотобібліотеки, щоб ви могли переглядати та зберігати свої тату.',

    // Camera
    cameraAccessTitle: 'Почнімо',
    cameraAccessDescription:
      'Нам потрібен доступ до камери для зйомки фото.',
    cameraAccessDeniedTitle: 'Потрібен доступ до камери',
    cameraAccessDeniedDescription:
      'Для цієї функції потрібен доступ до вашої камери. Ви можете керувати доступом до камери в налаштуваннях пристрою.',
  },
};
