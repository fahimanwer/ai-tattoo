/**
 * English translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const enCore = {
  common: {
    // Actions
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    cancel: 'Cancel',
    confirm: 'Confirm',
    save: 'Save',
    done: 'Done',
    close: 'Close',
    back: 'Back',
    next: 'Next',
    skip: 'Skip',
    continue: 'Continue',
    retry: 'Retry',
    delete: 'Delete',
    edit: 'Edit',
    share: 'Share',
    send: 'Send',
    search: 'Search',
    seeAll: 'See All',
    tryAgain: 'Try Again',
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    or: 'or',
    upgrade: 'Upgrade',
    processing: 'Processing...',
    openSettings: 'Open Settings',
    readMore: 'Read More',
    createTattoo: 'Create Tattoo',
    style: 'Style',

    // States
    on: 'On',
    off: 'Off',
    enabled: 'Enabled',
    disabled: 'Disabled',

    // Errors
    somethingWentWrong: 'Something went wrong',
    unexpectedError: 'An unexpected error occurred',
  },

  tabs: {
    home: 'Home',
    explore: 'Explore',
    myTattoos: 'My Tattoos',
    profile: 'Profile',
    tryOnTattoo: 'Try On Tattoo',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Welcome back!',
    signInDescription: 'Please choose your preferred sign in method',
    signIn: 'Sign In',
    alreadyHaveAccount: 'Already have an account? ',
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',
    byContinuingAgree: 'By continuing you agree to our ',
    inkognitoMode: 'Ink-ognito mode',
    inkognitoDescription: 'Your designs stay with you, not with us.',
    signInToContinue:
      'Please sign in to continue and get your tattoo created!',
    signInBenefit:
      'By signing in, we can keep track of your free tattoo generations and ensure your account is set up properly.',
    notSignedIn: '(Not signed in)',
  },

  profile: {
    // Screen header
    title: 'Profile',

    // Section headers
    account: 'Account',
    planAndUsage: 'Plan & Usage',
    settings: 'Settings',
    support: 'Support',
    legal: 'Legal',
    dangerZone: 'Danger Zone',
    supportAndFeedback: 'Support & Feedback',
    followUs: 'Follow Us',

    // Sign-in prompt
    notSignedIn: 'Not signed in',
    signInPrompt:
      'Sign in to access your account details, subscription info, and personalized features',

    // Account
    email: 'Email',
    name: 'Name',
    model: 'Model',
    userId: 'User ID',
    memberSince: 'Member Since',
    signOut: 'Sign Out',
    logOut: 'Log Out',
    signOutConfirmTitle: 'Sign Out',
    signOutConfirmMessage: 'Are you sure you want to sign out?',
    unknownUser: 'Unknown User',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: 'Active Usage Period',
    currentPlan: 'Current Plan',
    planDetails: 'Plan Details',
    status: 'Status',
    renewsOn: 'Renews On',
    expiresOn: 'Expires On',
    daysRemaining: 'Days Remaining',
    daysValue: '{{count}} days',
    price: 'Price',
    billingPeriod: 'Billing Period',
    managePlan: 'Manage Plan',
    upgradePlan: 'Upgrade Plan',
    upgradeNow: 'Upgrade Now',
    limitReachedFooter:
      "You've reached your generation limit. Upgrade to continue.",
    noSubscription: 'No subscription',
    cancelledActive: 'Cancelled (Active)',
    cancelledActiveUntilExpiration: 'Cancelled (Active Until Expiration)',
    activeUntilExpiration: 'Active Until Expiration',
    accessEndsOn: 'Access Ends On',
    autoRenew: 'Auto-Renew',
    cancelledAt: 'Cancelled At',
    expiredOn: 'Expired On',
    refreshing: 'Refreshing...',
    refreshData: 'Refresh data',
    limitReachedFooterLong:
      "You've reached your AI tattoo generation limit for this plan. Upgrade to continue creating tattoos or contact us.",
    weMissYouFooter:
      "Ready to create more amazing tattoos? Come back and let's design something incredible together.",
    unknown: 'Unknown',
    free: 'Free',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Active',
    expired: 'Expired',
    cancelled: 'Cancelled',
    generationsUsed: 'Generations Used',
    generationsRemaining: 'Generations Remaining',
    unlimited: 'Unlimited',
    na: 'N/A',

    // We Miss You
    weMissYou: 'We Miss You!',
    previousPlan: 'Previous Plan',
    comeBackAndCreate: 'Come Back & Create',

    // Enjoying the app
    enjoyingApp: 'Enjoying the app?',
    enjoyingAppDescription:
      "If you're enjoying Tattoo Design AI, a review helps other tattoo lovers discover us. You can also reach out anytime with feedback or feature ideas.",
    rateOnPlayStore: 'Rate on Play Store',
    rateOnAppStore: 'Rate on App Store',
    sendFeedback: 'Send Feedback',

    // Are you an artist
    areYouArtist: 'Are you an artist?',
    artistDescription:
      "Interested in collaborating? Have suggestions or complaints? We'd love to hear from you!",
    writeToUs: 'Write to Us',

    // Support
    contactSupport: 'Contact Support',
    requestFeature: 'Request a Feature',
    rateApp: 'Rate App',
    shareApp: 'Share App',
    shareWithFriends: 'Share with Friends',
    shareMessage: 'Check out Tattoo Design AI \n',

    // Settings
    appearance: 'Appearance',
    light: 'Light',
    dark: 'Dark',
    system: 'System',
    language: 'Language',
    languageAuto: 'Auto (System)',
    showOnboarding: 'Show Onboarding',
    promptEnhancement: 'Prompt Enhancement',
    promptEnhancementDisabledTitle: 'Prompt Enhancement Disabled',
    promptEnhancementDisabledMessage:
      'Results may vary without enhancement. Turn it back on anytime.',

    // Legal
    termsOfService: 'Terms of Service',
    privacyPolicy: 'Privacy Policy',

    // Danger
    deleteAccount: 'Delete Account',
    deleteAccountConfirmTitle: 'Delete Account',
    deleteAccountConfirmMessage:
      'Are you sure? This cannot be undone. Note: this does NOT cancel active subscriptions.',
    dangerZoneFooter:
      'Deleting your account is permanent. This does NOT cancel active subscriptions.',
    resetOnboarding: 'Reset Onboarding',

    // Version
    version: 'Version',
  },

  emails: {
    support: {
      subject: 'Tattoo Design AI App Support Request',
      body: 'Hi,\n\nI need help with the Tattoo Design AI app.\n\n{{userInfo}}\n\nDescription:\n[Please describe your issue here]\n\nThanks!',
    },
    featureRequest: {
      subject: 'Tattoo Design AI Feature Request Help',
      body: 'Hi,\n\nI need help with submitting a feature request.\n\n',
    },
    feedback: {
      subject: 'Tattoo Design AI Feedback',
      body: 'Hi!\n\nI have some feedback about Tattoo Design AI:\n\n[Your feedback here]{{userInfo}}\n\nThanks!',
    },
    artist: {
      subject: 'Are you an artist? - Tattoo Design AI',
      body: "Hi!\n\nI'm interested in collaborating or have suggestions/complaints.\n\n{{userInfo}}\n\n[Please share your suggestions, complaints, or tell us about yourself as an artist]\n\nThanks!",
    },
    userIdLabel: 'User ID: {{id}}',
    emailLabel: 'Email: {{email}}',
    accountLabel: 'My account email: {{email}}',
    myUserIdLabel: 'My user ID: {{id}}',
    accountInfo: '\n\nAccount: {{email}}',
  },

  notFound: {
    title: 'Oops!',
    description: 'This screen does not exist.',
    goHome: 'Go to home screen!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: "Let's Get Started",
    photoAccessDescription:
      'We need access to your photos to add images',
    photoAccessDeniedTitle: 'Photo Access Needed',
    photoAccessDeniedDescription:
      'This feature requires access to your photo library to view and save your tattoos. You can manage photo access in your device settings.',
    photoLibraryNeeded:
      'We need access to your photo library so you can view and save your tattoos.',

    // Camera
    cameraAccessTitle: "Let's Get Started",
    cameraAccessDescription:
      'We need access to your camera to take photos.',
    cameraAccessDeniedTitle: 'Camera Access Needed',
    cameraAccessDeniedDescription:
      'This feature requires access to your camera. You can manage camera access in your device settings.',
  },
};
