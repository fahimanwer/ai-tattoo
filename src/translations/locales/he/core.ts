/**
 * Hebrew translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const heCore = {
  common: {
    // Actions
    loading: '...טוען',
    error: 'שגיאה',
    success: 'הצלחה',
    cancel: 'ביטול',
    confirm: 'אישור',
    save: 'שמירה',
    done: 'סיום',
    close: 'סגירה',
    back: 'חזרה',
    next: 'הבא',
    skip: 'דילוג',
    continue: 'המשך',
    retry: 'נסה שוב',
    delete: 'מחיקה',
    edit: 'עריכה',
    share: 'שיתוף',
    send: 'שליחה',
    search: 'חיפוש',
    seeAll: 'הצג הכל',
    tryAgain: 'נסה שוב',
    ok: 'אישור',
    yes: 'כן',
    no: 'לא',
    or: 'או',
    upgrade: 'שדרוג',
    processing: '...מעבד',
    openSettings: 'פתח הגדרות',
    readMore: 'קרא עוד',
    createTattoo: 'צור קעקוע',
    style: 'סגנון',

    // States
    on: 'פעיל',
    off: 'כבוי',
    enabled: 'מופעל',
    disabled: 'מושבת',

    // Errors
    somethingWentWrong: 'משהו השתבש',
    unexpectedError: 'אירעה שגיאה בלתי צפויה',
  },

  tabs: {
    home: 'בית',
    explore: 'גלה',
    myTattoos: 'הקעקועים שלי',
    profile: 'פרופיל',
    tryOnTattoo: 'נסה קעקוע',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: '!ברוך שובך',
    signInDescription: 'בחר את שיטת ההתחברות המועדפת עליך',
    signIn: 'התחברות',
    alreadyHaveAccount: 'כבר יש לך חשבון? ',
    termsOfService: 'תנאי שימוש',
    privacyPolicy: 'מדיניות פרטיות',
    byContinuingAgree: 'בהמשך אתה מסכים ל',
    inkognitoMode: 'מצב Ink-ognito',
    inkognitoDescription: 'העיצובים שלך נשארים אצלך, לא אצלנו.',
    signInToContinue:
      'אנא התחבר כדי להמשיך ולקבל את הקעקוע שלך!',
    signInBenefit:
      'בהתחברות, נוכל לעקוב אחרי יצירות הקעקוע החינמיות שלך ולוודא שהחשבון שלך מוגדר כראוי.',
    notSignedIn: '(לא מחובר)',
  },

  profile: {
    // Screen header
    title: 'פרופיל',

    // Section headers
    account: 'חשבון',
    planAndUsage: 'מנוי ושימוש',
    settings: 'הגדרות',
    support: 'תמיכה',
    legal: 'משפטי',
    dangerZone: 'אזור מסוכן',
    supportAndFeedback: 'תמיכה ומשוב',
    followUs: 'עקבו אחרינו',

    // Sign-in prompt
    notSignedIn: 'לא מחובר',
    signInPrompt:
      'התחבר כדי לגשת לפרטי החשבון, מידע על המנוי ותכונות מותאמות אישית',

    // Account
    email: 'דוא"ל',
    name: 'שם',
    model: 'מודל',
    userId: 'מזהה משתמש',
    memberSince: 'חבר מאז',
    signOut: 'התנתקות',
    logOut: 'התנתקות',
    signOutConfirmTitle: 'התנתקות',
    signOutConfirmMessage: 'האם אתה בטוח שברצונך להתנתק?',
    unknownUser: 'משתמש לא ידוע',

    // Plan
    plan: 'מנוי',
    activeUsagePeriod: 'תקופת שימוש פעילה',
    currentPlan: 'מנוי נוכחי',
    planDetails: 'פרטי מנוי',
    status: 'סטטוס',
    renewsOn: 'מתחדש ב',
    expiresOn: 'פג תוקף ב',
    daysRemaining: 'ימים שנותרו',
    daysValue: '{{count}} ימים',
    price: 'מחיר',
    billingPeriod: 'תקופת חיוב',
    managePlan: 'ניהול מנוי',
    upgradePlan: 'שדרוג מנוי',
    upgradeNow: 'שדרג עכשיו',
    limitReachedFooter:
      'הגעת למגבלת היצירות שלך. שדרג כדי להמשיך.',
    noSubscription: 'אין מנוי',
    cancelledActive: 'בוטל (פעיל)',
    cancelledActiveUntilExpiration: 'בוטל (פעיל עד תום התקופה)',
    activeUntilExpiration: 'פעיל עד תום התקופה',
    accessEndsOn: 'הגישה מסתיימת ב',
    autoRenew: 'חידוש אוטומטי',
    cancelledAt: 'בוטל ב',
    expiredOn: 'פג תוקף ב',
    refreshing: '...מרענן',
    refreshData: 'רענן נתונים',
    limitReachedFooterLong:
      'הגעת למגבלת יצירת קעקועים ב-AI עבור המנוי שלך. שדרג כדי להמשיך ליצור קעקועים או צור קשר.',
    weMissYouFooter:
      'מוכן ליצור עוד קעקועים מדהימים? חזור ובוא נעצב משהו מדהים ביחד.',
    unknown: 'לא ידוע',
    free: 'חינם',
    pro: 'Pro',
    active: 'פעיל',
    expired: 'פג תוקף',
    cancelled: 'בוטל',
    generationsUsed: 'יצירות בשימוש',
    generationsRemaining: 'יצירות שנותרו',
    unlimited: 'ללא הגבלה',
    na: 'לא זמין',

    // We Miss You
    weMissYou: '!התגעגענו אליך',
    previousPlan: 'מנוי קודם',
    comeBackAndCreate: 'חזור וצור',

    // Enjoying the app
    enjoyingApp: 'נהנה מהאפליקציה?',
    enjoyingAppDescription:
      'אם אתה נהנה מ-Tattoo Design AI, ביקורת עוזרת לחובבי קעקועים אחרים לגלות אותנו. אתה גם מוזמן ליצור קשר בכל עת עם משוב או רעיונות לתכונות.',
    rateOnPlayStore: 'דרג ב-Play Store',
    rateOnAppStore: 'דרג ב-App Store',
    sendFeedback: 'שלח משוב',

    // Are you an artist
    areYouArtist: 'אתה אמן?',
    artistDescription:
      'מעוניין לשתף פעולה? יש לך הצעות או תלונות? נשמח לשמוע ממך!',
    writeToUs: 'כתוב לנו',

    // Support
    contactSupport: 'צור קשר עם התמיכה',
    requestFeature: 'בקש תכונה',
    rateApp: 'דרג את האפליקציה',
    shareApp: 'שתף את האפליקציה',
    shareWithFriends: 'שתף עם חברים',
    shareMessage: 'בדוק את Tattoo Design AI \n',

    // Settings
    appearance: 'מראה',
    light: 'בהיר',
    dark: 'כהה',
    system: 'מערכת',
    language: 'שפה',
    languageAuto: 'אוטומטי (מערכת)',
    showOnboarding: 'הצג הדרכה',
    promptEnhancement: 'שיפור פרומפט',
    promptEnhancementDisabledTitle: 'שיפור פרומפט מושבת',
    promptEnhancementDisabledMessage:
      'התוצאות עשויות להשתנות ללא שיפור. ניתן להפעיל מחדש בכל עת.',

    // Legal
    termsOfService: 'תנאי שימוש',
    privacyPolicy: 'מדיניות פרטיות',

    // Danger
    deleteAccount: 'מחיקת חשבון',
    deleteAccountConfirmTitle: 'מחיקת חשבון',
    deleteAccountConfirmMessage:
      'האם אתה בטוח? לא ניתן לבטל פעולה זו. הערה: פעולה זו לא מבטלת מנויים פעילים.',
    dangerZoneFooter:
      'מחיקת החשבון היא לצמיתות. פעולה זו לא מבטלת מנויים פעילים.',
    resetOnboarding: 'איפוס הדרכה',

    // Version
    version: 'גרסה',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI App Support Request',
      body: 'שלום,\n\nאני זקוק לעזרה עם אפליקציית Tattoo Design AI.\n\n{{userInfo}}\n\nתיאור:\n[אנא תאר את הבעיה שלך כאן]\n\nתודה!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI Feature Request Help',
      body: 'שלום,\n\nאני זקוק לעזרה עם שליחת בקשה לתכונה חדשה.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI Feedback',
      body: 'שלום!\n\nיש לי משוב על Tattoo Design AI:\n\n[המשוב שלך כאן]{{userInfo}}\n\nתודה!',
    },
    artist: {
      subject: 'Are you an artist? - Tattoo Design AI',
      body: 'שלום!\n\nאני מעוניין לשתף פעולה או שיש לי הצעות/תלונות.\n\n{{userInfo}}\n\n[אנא שתף את ההצעות, התלונות שלך, או ספר לנו על עצמך כאמן]\n\nתודה!',
    },
    userIdLabel: 'מזהה משתמש: {{id}}',
    emailLabel: 'דוא"ל: {{email}}',
    accountLabel: 'דוא"ל החשבון שלי: {{email}}',
    myUserIdLabel: 'מזהה המשתמש שלי: {{id}}',
    accountInfo: '\n\nחשבון: {{email}}',
  },

  notFound: {
    title: '!אופס',
    description: 'מסך זה לא קיים.',
    goHome: '!עבור למסך הבית',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'בואו נתחיל',
    photoAccessDescription:
      'אנחנו צריכים גישה לתמונות שלך כדי להוסיף תמונות',
    photoAccessDeniedTitle: 'נדרשת גישה לתמונות',
    photoAccessDeniedDescription:
      'תכונה זו דורשת גישה לספריית התמונות שלך כדי לצפות ולשמור את הקעקועים שלך. ניתן לנהל גישה לתמונות בהגדרות המכשיר.',
    photoLibraryNeeded:
      'אנחנו צריכים גישה לספריית התמונות שלך כדי שתוכל לצפות ולשמור את הקעקועים שלך.',

    // Camera
    cameraAccessTitle: 'בואו נתחיל',
    cameraAccessDescription:
      'אנחנו צריכים גישה למצלמה שלך כדי לצלם תמונות.',
    cameraAccessDeniedTitle: 'נדרשת גישה למצלמה',
    cameraAccessDeniedDescription:
      'תכונה זו דורשת גישה למצלמה שלך. ניתן לנהל גישה למצלמה בהגדרות המכשיר.',
  },
};
