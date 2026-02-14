/**
 * French translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const frCore = {
  common: {
    // Actions
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    save: 'Enregistrer',
    done: 'Terminé',
    close: 'Fermer',
    back: 'Retour',
    next: 'Suivant',
    skip: 'Passer',
    continue: 'Continuer',
    retry: 'Réessayer',
    delete: 'Supprimer',
    edit: 'Modifier',
    share: 'Partager',
    send: 'Envoyer',
    search: 'Rechercher',
    seeAll: 'Voir tout',
    tryAgain: 'Réessayer',
    ok: 'OK',
    yes: 'Oui',
    no: 'Non',
    or: 'ou',
    upgrade: 'Améliorer',
    processing: 'Traitement...',
    openSettings: 'Ouvrir les réglages',
    readMore: 'En savoir plus',
    createTattoo: 'Créer un tatouage',
    style: 'Style',

    // States
    on: 'Activé',
    off: 'Désactivé',
    enabled: 'Activé',
    disabled: 'Désactivé',

    // Errors
    somethingWentWrong: 'Quelque chose a mal tourné',
    unexpectedError: 'Une erreur inattendue est survenue',
  },

  tabs: {
    home: 'Accueil',
    explore: 'Explorer',
    myTattoos: 'Mes tatouages',
    profile: 'Profil',
    tryOnTattoo: 'Essayer un tatouage',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Bon retour !',
    signInDescription: 'Veuillez choisir votre méthode de connexion préférée',
    signIn: 'Se connecter',
    alreadyHaveAccount: 'Déjà un compte ? ',
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: 'Politique de confidentialité',
    byContinuingAgree: 'En continuant, vous acceptez nos ',
    inkognitoMode: 'Mode Ink-ognito',
    inkognitoDescription: 'Vos créations restent avec vous, pas avec nous.',
    signInToContinue:
      'Veuillez vous connecter pour continuer et faire créer votre tatouage !',
    signInBenefit:
      'En vous connectant, nous pouvons suivre vos générations gratuites de tatouages et nous assurer que votre compte est correctement configuré.',
    notSignedIn: '(Non connecté)',
  },

  profile: {
    // Screen header
    title: 'Profil',

    // Section headers
    account: 'Compte',
    planAndUsage: 'Plan & Utilisation',
    settings: 'Réglages',
    support: 'Support',
    legal: 'Mentions légales',
    dangerZone: 'Zone de danger',
    supportAndFeedback: 'Support & Retours',
    followUs: 'Suivez-nous',

    // Sign-in prompt
    notSignedIn: 'Non connecté',
    signInPrompt:
      'Connectez-vous pour accéder à vos informations de compte, votre abonnement et les fonctionnalités personnalisées',

    // Account
    email: 'E-mail',
    name: 'Nom',
    model: 'Modèle',
    userId: 'ID utilisateur',
    memberSince: 'Membre depuis',
    signOut: 'Se déconnecter',
    logOut: 'Se déconnecter',
    signOutConfirmTitle: 'Se déconnecter',
    signOutConfirmMessage: 'Êtes-vous sûr de vouloir vous déconnecter ?',
    unknownUser: 'Utilisateur inconnu',

    // Plan
    plan: 'Plan',
    activeUsagePeriod: "Période d'utilisation active",
    currentPlan: 'Plan actuel',
    planDetails: 'Détails du plan',
    status: 'Statut',
    renewsOn: 'Renouvellement le',
    expiresOn: 'Expire le',
    daysRemaining: 'Jours restants',
    daysValue: '{{count}} jours',
    price: 'Prix',
    billingPeriod: 'Période de facturation',
    managePlan: 'Gérer le plan',
    upgradePlan: 'Améliorer le plan',
    upgradeNow: 'Améliorer maintenant',
    limitReachedFooter:
      'Vous avez atteint votre limite de génération. Améliorez pour continuer.',
    noSubscription: 'Pas d\'abonnement',
    cancelledActive: 'Annulé (Actif)',
    cancelledActiveUntilExpiration: "Annulé (Actif jusqu'à expiration)",
    activeUntilExpiration: "Actif jusqu'à expiration",
    accessEndsOn: "L'accès se termine le",
    autoRenew: 'Renouvellement automatique',
    cancelledAt: 'Annulé le',
    expiredOn: 'Expiré le',
    refreshing: 'Actualisation...',
    refreshData: 'Actualiser les données',
    limitReachedFooterLong:
      'Vous avez atteint votre limite de génération de tatouages IA pour ce plan. Améliorez pour continuer à créer des tatouages ou contactez-nous.',
    weMissYouFooter:
      'Prêt à créer plus de tatouages incroyables ? Revenez et créons ensemble quelque chose de magnifique.',
    unknown: 'Inconnu',
    free: 'Gratuit',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Actif',
    expired: 'Expiré',
    cancelled: 'Annulé',
    generationsUsed: 'Générations utilisées',
    generationsRemaining: 'Générations restantes',
    unlimited: 'Illimité',
    na: 'N/A',

    // We Miss You
    weMissYou: 'Vous nous manquez !',
    previousPlan: 'Plan précédent',
    comeBackAndCreate: 'Revenez & Créez',

    // Enjoying the app
    enjoyingApp: "Vous aimez l'appli ?",
    enjoyingAppDescription:
      "Si vous aimez Tattoo Design AI, un avis aide d'autres passionnés de tatouage à nous découvrir. Vous pouvez aussi nous envoyer vos retours ou idées de fonctionnalités à tout moment.",
    rateOnPlayStore: 'Noter sur le Play Store',
    rateOnAppStore: "Noter sur l'App Store",
    sendFeedback: 'Envoyer un retour',

    // Are you an artist
    areYouArtist: 'Vous êtes artiste ?',
    artistDescription:
      'Intéressé par une collaboration ? Des suggestions ou des plaintes ? Nous serions ravis de vous entendre !',
    writeToUs: 'Écrivez-nous',

    // Support
    contactSupport: 'Contacter le support',
    requestFeature: 'Proposer une fonctionnalité',
    rateApp: "Noter l'appli",
    shareApp: "Partager l'appli",
    shareWithFriends: 'Partager avec des amis',
    shareMessage: 'Découvrez Tattoo Design AI \n',

    // Settings
    appearance: 'Apparence',
    light: 'Clair',
    dark: 'Sombre',
    system: 'Système',
    language: 'Langue',
    languageAuto: 'Automatique (Système)',
    showOnboarding: "Afficher l'introduction",
    promptEnhancement: 'Amélioration du prompt',
    promptEnhancementDisabledTitle: 'Amélioration du prompt désactivée',
    promptEnhancementDisabledMessage:
      'Les résultats peuvent varier sans amélioration. Vous pouvez la réactiver à tout moment.',

    // Legal
    termsOfService: "Conditions d'utilisation",
    privacyPolicy: 'Politique de confidentialité',

    // Danger
    deleteAccount: 'Supprimer le compte',
    deleteAccountConfirmTitle: 'Supprimer le compte',
    deleteAccountConfirmMessage:
      "Êtes-vous sûr ? Cette action est irréversible. Note : cela N'annule PAS les abonnements actifs.",
    dangerZoneFooter:
      "La suppression de votre compte est permanente. Cela N'annule PAS les abonnements actifs.",
    resetOnboarding: "Réinitialiser l'introduction",

    // Version
    version: 'Version',
  },

  emails: {
    support: {
      subject: "Demande de support Tattoo Design AI",
      body: 'Bonjour,\n\nJ\'ai besoin d\'aide avec l\'appli Tattoo Design AI.\n\n{{userInfo}}\n\nDescription :\n[Veuillez décrire votre problème ici]\n\nMerci !',
    },
    featureRequest: {
      subject: 'Aide pour une demande de fonctionnalité Tattoo Design AI',
      body: "Bonjour,\n\nJ'ai besoin d'aide pour soumettre une demande de fonctionnalité.\n\n",
    },
    feedback: {
      subject: 'Retour sur Tattoo Design AI',
      body: 'Bonjour !\n\nJ\'ai un retour à faire sur Tattoo Design AI :\n\n[Votre retour ici]{{userInfo}}\n\nMerci !',
    },
    artist: {
      subject: 'Vous êtes artiste ? - Tattoo Design AI',
      body: "Bonjour !\n\nJe suis intéressé par une collaboration ou j'ai des suggestions/plaintes.\n\n{{userInfo}}\n\n[Veuillez partager vos suggestions, plaintes, ou parlez-nous de vous en tant qu'artiste]\n\nMerci !",
    },
    userIdLabel: 'ID utilisateur : {{id}}',
    emailLabel: 'E-mail : {{email}}',
    accountLabel: 'E-mail de mon compte : {{email}}',
    myUserIdLabel: 'Mon ID utilisateur : {{id}}',
    accountInfo: '\n\nCompte : {{email}}',
  },

  notFound: {
    title: 'Oups !',
    description: "Cet écran n'existe pas.",
    goHome: "Aller à l'accueil !",
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'C\'est parti',
    photoAccessDescription:
      'Nous avons besoin d\'accéder à vos photos pour ajouter des images',
    photoAccessDeniedTitle: 'Accès aux photos requis',
    photoAccessDeniedDescription:
      'Cette fonctionnalité nécessite l\'accès à votre photothèque pour visualiser et enregistrer vos tatouages. Vous pouvez gérer l\'accès aux photos dans les réglages de votre appareil.',
    photoLibraryNeeded:
      'Nous avons besoin d\'accéder à votre photothèque pour que vous puissiez visualiser et enregistrer vos tatouages.',

    // Camera
    cameraAccessTitle: 'C\'est parti',
    cameraAccessDescription:
      'Nous avons besoin d\'accéder à votre caméra pour prendre des photos.',
    cameraAccessDeniedTitle: 'Accès à la caméra requis',
    cameraAccessDeniedDescription:
      'Cette fonctionnalité nécessite l\'accès à votre caméra. Vous pouvez gérer l\'accès à la caméra dans les réglages de votre appareil.',
  },
};
