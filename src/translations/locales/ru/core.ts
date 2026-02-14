/**
 * Russian translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const ruCore = {
  common: {
    // Actions
    loading: 'Загрузка...',
    error: 'Ошибка',
    success: 'Успешно',
    cancel: 'Отмена',
    confirm: 'Подтвердить',
    save: 'Сохранить',
    done: 'Готово',
    close: 'Закрыть',
    back: 'Назад',
    next: 'Далее',
    skip: 'Пропустить',
    continue: 'Продолжить',
    retry: 'Повторить',
    delete: 'Удалить',
    edit: 'Редактировать',
    share: 'Поделиться',
    send: 'Отправить',
    search: 'Поиск',
    seeAll: 'Показать все',
    tryAgain: 'Попробовать снова',
    ok: 'ОК',
    yes: 'Да',
    no: 'Нет',
    or: 'или',
    upgrade: 'Улучшить',
    processing: 'Обработка...',
    openSettings: 'Открыть настройки',
    readMore: 'Подробнее',
    createTattoo: 'Создать тату',
    style: 'Стиль',

    // States
    on: 'Вкл',
    off: 'Выкл',
    enabled: 'Включено',
    disabled: 'Отключено',

    // Errors
    somethingWentWrong: 'Что-то пошло не так',
    unexpectedError: 'Произошла непредвиденная ошибка',
  },

  tabs: {
    home: 'Главная',
    explore: 'Обзор',
    myTattoos: 'Мои тату',
    profile: 'Профиль',
    tryOnTattoo: 'Примерить тату',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'С возвращением!',
    signInDescription: 'Выберите предпочтительный способ входа',
    signIn: 'Войти',
    alreadyHaveAccount: 'Уже есть аккаунт? ',
    termsOfService: 'Условия использования',
    privacyPolicy: 'Политика конфиденциальности',
    byContinuingAgree: 'Продолжая, вы соглашаетесь с нашими ',
    inkognitoMode: 'Ink-ognito режим',
    inkognitoDescription: 'Ваши дизайны остаются с вами, а не с нами.',
    signInToContinue:
      'Пожалуйста, войдите, чтобы продолжить и создать свою тату!',
    signInBenefit:
      'Войдя в систему, мы сможем отслеживать ваши бесплатные генерации тату и правильно настроить ваш аккаунт.',
    notSignedIn: '(Не авторизован)',
  },

  profile: {
    // Screen header
    title: 'Профиль',

    // Section headers
    account: 'Аккаунт',
    planAndUsage: 'Тариф и использование',
    settings: 'Настройки',
    support: 'Поддержка',
    legal: 'Правовая информация',
    dangerZone: 'Опасная зона',
    supportAndFeedback: 'Поддержка и отзывы',
    followUs: 'Подпишитесь на нас',

    // Sign-in prompt
    notSignedIn: 'Не авторизован',
    signInPrompt:
      'Войдите, чтобы получить доступ к данным аккаунта, информации о подписке и персонализированным функциям',

    // Account
    email: 'Email',
    name: 'Имя',
    model: 'Модель',
    userId: 'ID пользователя',
    memberSince: 'Участник с',
    signOut: 'Выйти',
    logOut: 'Выйти',
    signOutConfirmTitle: 'Выход',
    signOutConfirmMessage: 'Вы уверены, что хотите выйти?',
    unknownUser: 'Неизвестный пользователь',

    // Plan
    plan: 'Тариф',
    activeUsagePeriod: 'Активный период использования',
    currentPlan: 'Текущий тариф',
    planDetails: 'Детали тарифа',
    status: 'Статус',
    renewsOn: 'Обновляется',
    expiresOn: 'Истекает',
    daysRemaining: 'Осталось дней',
    daysValue: '{{count}} дней',
    price: 'Цена',
    billingPeriod: 'Период оплаты',
    managePlan: 'Управление тарифом',
    upgradePlan: 'Улучшить тариф',
    upgradeNow: 'Улучшить сейчас',
    limitReachedFooter:
      'Вы достигли лимита генераций. Улучшите тариф, чтобы продолжить.',
    noSubscription: 'Нет подписки',
    cancelledActive: 'Отменена (Активна)',
    cancelledActiveUntilExpiration: 'Отменена (Активна до истечения)',
    activeUntilExpiration: 'Активна до истечения',
    accessEndsOn: 'Доступ заканчивается',
    autoRenew: 'Автопродление',
    cancelledAt: 'Отменена',
    expiredOn: 'Истекла',
    refreshing: 'Обновление...',
    refreshData: 'Обновить данные',
    limitReachedFooterLong:
      'Вы достигли лимита генераций AI-тату для этого тарифа. Улучшите тариф, чтобы продолжить создавать тату, или свяжитесь с нами.',
    weMissYouFooter:
      'Готовы создавать потрясающие тату? Возвращайтесь, и давайте вместе создадим что-то невероятное.',
    unknown: 'Неизвестно',
    free: 'Бесплатный',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Активен',
    expired: 'Истёк',
    cancelled: 'Отменён',
    generationsUsed: 'Использовано генераций',
    generationsRemaining: 'Осталось генераций',
    unlimited: 'Безлимитно',
    na: 'Н/Д',

    // We Miss You
    weMissYou: 'Мы скучаем!',
    previousPlan: 'Предыдущий тариф',
    comeBackAndCreate: 'Вернитесь и творите',

    // Enjoying the app
    enjoyingApp: 'Нравится приложение?',
    enjoyingAppDescription:
      'Если вам нравится Tattoo Design AI, оставьте отзыв, чтобы другие любители тату могли нас найти. Вы также можете связаться с нами в любое время с предложениями или идеями.',
    rateOnPlayStore: 'Оценить в Play Store',
    rateOnAppStore: 'Оценить в App Store',
    sendFeedback: 'Отправить отзыв',

    // Are you an artist
    areYouArtist: 'Вы художник?',
    artistDescription:
      'Хотите сотрудничать? Есть предложения или замечания? Мы будем рады вас услышать!',
    writeToUs: 'Напишите нам',

    // Support
    contactSupport: 'Связаться с поддержкой',
    requestFeature: 'Предложить функцию',
    rateApp: 'Оценить приложение',
    shareApp: 'Поделиться приложением',
    shareWithFriends: 'Поделиться с друзьями',
    shareMessage: 'Попробуйте Tattoo Design AI \n',

    // Settings
    appearance: 'Оформление',
    light: 'Светлая',
    dark: 'Тёмная',
    system: 'Системная',
    language: 'Язык',
    languageAuto: 'Авто (Системный)',
    showOnboarding: 'Показать приветствие',
    promptEnhancement: 'Улучшение запросов',
    promptEnhancementDisabledTitle: 'Улучшение запросов отключено',
    promptEnhancementDisabledMessage:
      'Результаты могут отличаться без улучшения. Вы можете включить его в любое время.',

    // Legal
    termsOfService: 'Условия использования',
    privacyPolicy: 'Политика конфиденциальности',

    // Danger
    deleteAccount: 'Удалить аккаунт',
    deleteAccountConfirmTitle: 'Удалить аккаунт',
    deleteAccountConfirmMessage:
      'Вы уверены? Это действие необратимо. Примечание: это НЕ отменяет активные подписки.',
    dangerZoneFooter:
      'Удаление аккаунта необратимо. Это НЕ отменяет активные подписки.',
    resetOnboarding: 'Сбросить приветствие',

    // Version
    version: 'Версия',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI — Запрос в поддержку',
      body: 'Здравствуйте,\n\nМне нужна помощь с приложением Tattoo Design AI.\n\n{{userInfo}}\n\nОписание:\n[Пожалуйста, опишите вашу проблему здесь]\n\nСпасибо!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI — Запрос новой функции',
      body: 'Здравствуйте,\n\nМне нужна помощь с отправкой запроса на новую функцию.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI — Отзыв',
      body: 'Здравствуйте!\n\nУ меня есть отзыв о Tattoo Design AI:\n\n[Ваш отзыв здесь]{{userInfo}}\n\nСпасибо!',
    },
    artist: {
      subject: 'Вы художник? — Tattoo Design AI',
      body: 'Здравствуйте!\n\nЯ заинтересован в сотрудничестве или хочу оставить предложения/замечания.\n\n{{userInfo}}\n\n[Пожалуйста, поделитесь вашими предложениями, замечаниями или расскажите о себе как о художнике]\n\nСпасибо!',
    },
    userIdLabel: 'ID пользователя: {{id}}',
    emailLabel: 'Email: {{email}}',
    accountLabel: 'Email аккаунта: {{email}}',
    myUserIdLabel: 'Мой ID пользователя: {{id}}',
    accountInfo: '\n\nАккаунт: {{email}}',
  },

  notFound: {
    title: 'Упс!',
    description: 'Этот экран не существует.',
    goHome: 'На главный экран!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Давайте начнём',
    photoAccessDescription:
      'Нам нужен доступ к вашим фото для добавления изображений',
    photoAccessDeniedTitle: 'Необходим доступ к фото',
    photoAccessDeniedDescription:
      'Для этой функции необходим доступ к вашей медиатеке, чтобы просматривать и сохранять тату. Вы можете управлять доступом к фото в настройках устройства.',
    photoLibraryNeeded:
      'Нам нужен доступ к вашей медиатеке, чтобы вы могли просматривать и сохранять свои тату.',

    // Camera
    cameraAccessTitle: 'Давайте начнём',
    cameraAccessDescription:
      'Нам нужен доступ к камере для съёмки фотографий.',
    cameraAccessDeniedTitle: 'Необходим доступ к камере',
    cameraAccessDeniedDescription:
      'Для этой функции необходим доступ к камере. Вы можете управлять доступом к камере в настройках устройства.',
  },
};
