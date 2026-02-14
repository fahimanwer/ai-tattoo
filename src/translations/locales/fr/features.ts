/**
 * French translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const frFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Visualisez votre tatouage avant de vous engager.',
    whatsYourName: 'Comment vous appelez-vous ?',
    namePlaceholder: 'Votre nom',
    nameDescription: 'Nous utiliserons ceci pour personnaliser votre expérience.',
    welcome: 'Bienvenue',
    welcomeDescription: 'Personnalisons votre expérience Tattoo Design AI maintenant.',
    describeYou: 'Qu\'est-ce qui vous \n décrit le mieux ?',
    describeYouDescription:
      'Cela nous aide à personnaliser l\'expérience selon votre relation avec les tatouages',
    whatToDo: 'Que souhaitez-vous\n faire ?',
    whatToDoDescription:
      'Cela nous aide à comprendre comment vous souhaitez explorer les tatouages et quels outils vous seraient les plus utiles.',
    designTattoo: 'Créez le \n tatouage de vos rêves',
    designTattooDescription:
      'Tapez quelques mots ou téléchargez une image et générez instantanément des designs uniques.',
    whereTattoo: 'Où voulez-vous\n le tatouage ?',
    whereTattooDescription:
      'L\'emplacement affecte le design, la taille et le flux, ce qui nous aide à adapter les idées à votre corps.',
    pickStyles: 'Choisissez jusqu\'à 5 \n styles que vous aimez',
    pickStylesDescription:
      'Vos choix de styles nous aident à cibler les designs qui correspondent à vos goûts.',
    whenTattoo: 'Quand pensez-vous\n vous faire tatouer ?',
    whenTattooDescription:
      'Cela nous aide à adapter\n l\'expérience à votre calendrier.',
    whatVibe: 'Quelle ambiance\n recherchez-vous ?',
    whatVibeDescription:
      'Les tatouages portent des émotions - cela nous aide à comprendre l\'histoire derrière le vôtre.',
    settingUp: 'Nous préparons tout\n pour vous',
    youreAllSet: 'Vous êtes prêt !',
    youreAllSetDescription: 'Vous êtes prêt à commencer.',

    // CTA
    alreadyHaveAccount: 'Déjà un compte ? ',
    signIn: 'Se connecter',

    // User description options
    userDescription: {
      artist: 'Je crée des tatouages',
      client: 'Je me fais tatouer',
      model: 'J\'utilise les tatouages pour du contenu',
      explorer: 'Je ne fais que regarder',
    },

    // Goal options
    goal: {
      tryOn: 'Essayer des tatouages sur mes photos',
      generate: 'Générer des idées de tatouages',
      browse: 'Juste regarder ou chercher de l\'inspiration',
      coverUp: 'Recouvrir/Retoucher un tatouage existant',
    },

    // Location options
    location: {
      wrist: 'Poignet',
      chest: 'Poitrine',
      hand: 'Main',
      back: 'Dos',
      legs: 'Jambes',
      forearm: 'Avant-bras',
      neck: 'Nuque',
      jaw: 'Mâchoire',
      forehead: 'Front',
      knuckles: 'Phalanges',
      fingers: 'Doigts',
      cheek: 'Joue',
      shoulder: 'Épaule',
      temple: 'Tempe',
      ribs: 'Côtes',
      abdomen: 'Abdomen',
      face: 'Visage',
      hips: 'Hanches',
      thigh: 'Cuisse',
      tricep: 'Triceps',
      bicep: 'Biceps',
      collarbone: 'Clavicule',
      ankle: 'Cheville',
      foot: 'Pied',
      palm: 'Paume',
      notSure: 'Pas sûr',
    },

    // Style options
    styles: {
      traditional: 'Traditionnel',
      realism: 'Réalisme',
      minimal: 'Minimal',
      celtic: 'Celtique',
      blackwork: 'Blackwork',
      illustrative: 'Illustratif',
      lettering: 'Lettrage',
      irezumi: 'Irezumi',
      geometric: 'Géométrique',
      religious: 'Religieux',
      anime: 'Anime',
      fineLine: 'Fine Line',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Calligraphie',
      portrait: 'Portrait',
      floral: 'Floral',
      polynesian: 'Polynésien',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gothique',
      patchwork: 'Patchwork',
      abstract: 'Abstrait',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologie',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Cette semaine',
      thisMonth: 'Ce mois-ci',
      oneToThreeMonths: 'Dans 1 à 3 mois',
      someday: 'Un jour, je ne fais que regarder',
    },

    // Vibe options
    vibe: {
      bold: 'Audacieux',
      confident: 'Confiant',
      soft: 'Doux',
      dark: 'Sombre',
      edgy: 'Provocant',
      elegant: 'Élégant',
      spiritual: 'Spirituel',
      cute: 'Mignon',
      symbolic: 'Symbolique',
      playful: 'Ludique',
      clean: 'Épuré',
      modern: 'Moderne',
      meaningful: 'Significatif',
      personalStory: 'Histoire personnelle',
      family: 'Famille',
      love: 'Amour',
      memory: 'Souvenir',
      rebirth: 'Renaissance',
      freedom: 'Liberté',
      mystical: 'Mystique',
      rebellious: 'Rebelle',
      serene: 'Serein',
      empowered: 'Puissant',
      ethereal: 'Éthéré',
      fearless: 'Intrépide',
      wanderlust: 'Wanderlust',
      transcendent: 'Transcendant',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Comprendre la vision de {{name}}',
      understandingVisionDefault: 'Comprendre votre vision',
      tailoringDesigns: 'Adapter les designs à votre style',
      settingUpCoverUp: 'Préparer les outils de recouvrement',
      personalizingExperience: 'Personnaliser votre expérience',
      preparingStudio: 'Préparer votre studio de design',
      configuringWorkspace: 'Configurer votre espace de travail',
      applyingPreferences: 'Appliquer vos préférences',
      journeyStartsNow: 'Votre aventure tatouage commence maintenant',
    },

    // Reviews
    reviews: {
      review1Title: 'Appli géniale !',
      review1Body:
        "L'appli fonctionne, est belle et agréable ! Impressionné par la qualité d'application du tatouage, avec un éclairage et des ombres réalistes.",
      review1Author: 'Jacob C.',
      review2Title: 'Vraiment utile',
      review2Body:
        "Les designs sont propres et détaillés. Certaines images prennent un peu plus de temps, mais dans l'ensemble c'est l'une des meilleures applis de tatouage IA.",
      review2Author: 'Alexrays1',
      review3Title: "J'adore",
      review3Body: 'Hautement recommandé \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Générez des tatouages instantanément',
    containerDesc1:
      'Tapez quelques mots et générez instantanément des designs de tatouages uniques.',
    containerTitle2: 'Personnalisez votre design',
    containerDesc2:
      'Ajustez les couleurs, la disposition et le style pour que le tatouage soit parfaitement le vôtre.',
    containerTitle3: 'Prévisualisez sur votre peau',
    containerDesc3:
      'Prévisualisez n\'importe quel tatouage sur votre peau — ajustez la taille et l\'emplacement instantanément.',
    paused: 'En pause',

    // Relative time
    time: {
      today: "Aujourd'hui",
      yesterday: 'Hier',
      daysAgo: 'Il y a {{count}} jours',
      weeksAgo: 'Il y a {{count}} semaines',
      monthsAgo: 'Il y a {{count}} mois',
      yearsAgo: 'Il y a {{count}} ans',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Technologie d\'essayage',
      tryOnTechnologyDesc: 'Voyez les tatouages sur votre peau avant de vous engager',
      aiTattooGenerator: 'Générateur de tatouages IA',
      aiTattooGeneratorDesc: 'Créez des designs uniques à partir de vos idées',
      coverUpAssistant: 'Assistant recouvrement',
      coverUpAssistantDesc: 'Transformez des tatouages existants en nouvelles œuvres',
      artistTools: 'Outils artiste',
      artistToolsDesc:
        'Montrez aux clients les designs sur leur corps instantanément',
      precisePlacement: 'Placement précis',
      precisePlacementDesc:
        'Dimensionnement parfait pour votre tatouage {{location}}',
      styleMatchedDesigns: 'Designs assortis au style',
      styleMatchedDesignsDesc:
        'Inspiration tatouage {{style}} sélectionnée',
      readyWhenYouAre: 'Prêt quand vous l\'êtes',
      readyWhenYouAreDesc: 'Commencez à designer aujourd\'hui, encrez demain',
      realisticTryOn: 'Essayage réaliste',
      realisticTryOnDesc: 'Voyez exactement à quoi il ressemblera sur vous',
      saveAndShare: 'Sauvegarder & Partager',
      saveAndShareDesc:
        'Gardez vos favoris et partagez avec votre artiste',
      aiDesignStudio: 'Studio de design IA',
      aiDesignStudioDesc: 'Générez des designs de tatouages uniques instantanément',

      // Personalized greetings
      greetingArtist: 'Votre nouvel outil d\'expérience client est prêt',
      greetingCoverUp: 'Prêt à transformer votre tatouage',
      greetingGenerate: 'Votre studio de design IA vous attend',
      greetingDefault: 'Votre aventure tatouage commence maintenant',
      welcomeAboard: 'Bienvenue à bord, {{name}} !',
      welcomeName: 'Bienvenue {{name}}',

      // Urgency messages
      urgencyArtist: 'Montrez aux clients des aperçus réels instantanément.',
      urgencyCoverUp: 'Retouchez votre tatouage en toute confiance.',
      urgencyTryOn: 'Essayez votre tatouage avant de vous engager.',
      urgencyDefault: 'Designs illimités. Zéro regret.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Continuer',
    restorePurchase: 'Restaurer l\'achat',
    current: 'ACTUEL',

    // Plan terms
    week: 'Semaine',
    month: 'Mois',
    weekly: 'Hebdomadaire',
    monthly: 'Mensuel',
    perWeek: '/Semaine',

    // Content
    loadingPlans: 'Chargement des plans\u2026',
    restoreSubscription: 'Restaurer l\'abonnement',
    fairUseNote: 'La génération de designs IA inclut des limites d\'utilisation raisonnable.',
    saveBadge: 'Économisez {{percent}}%',
    subtitle:
      'Explorez des idées de tatouages, affinez vos designs avec des variations infinies, essayez-les sur n\'importe quelle partie du corps et exportez des résultats haute qualité en toute confiance.',

    // Personalized headlines
    headlineArtist: 'Montrez aux clients leur tatouage avant de tatouer',
    headlineCoverUp: 'Transformez votre tatouage en toute confiance',
    headlineTryOn: 'Voyez votre tatouage avant de vous engager',
    headlineDesign: 'Créez le tatouage dont vous avez toujours rêvé',
    headlineBrowse: 'Trouvez le design de tatouage parfait',

    // Purchase flow alerts
    successTitle: 'Succès !',
    subscriptionActiveMessage:
      'Votre abonnement est maintenant actif. Profitez de designs de tatouages illimités !',
    almostThereTitle: 'Presque terminé !',
    createAccountMessage:
      'Créez un compte pour activer votre abonnement et commencer à designer.',
    purchaseRestoredTitle: 'Achat restauré !',
    subscriptionNowActive: 'Votre abonnement est maintenant actif.',
    purchaseFoundTitle: 'Achat trouvé !',
    purchasesRestoredMessage: 'Vos achats ont été restaurés.',
    noPurchasesFoundTitle: 'Aucun achat trouvé',
    noPurchasesFoundMessage:
      'Aucun achat précédent à restaurer n\'a été trouvé.',
    purchaseFailedTitle: 'Échec de l\'achat',
    purchaseFailedMessage:
      'Impossible de finaliser l\'achat. Veuillez réessayer.',
    errorRestoringTitle: 'Erreur de restauration des achats',
    errorRestoringMessage:
      'Impossible de restaurer les achats. Veuillez réessayer.',
    subscriptionActivated: 'Abonnement activé !',

    // Alerts
    purchaseError: 'Erreur d\'achat',
    restoreSuccess: 'Achat restauré',
    restoreError: 'Échec de la restauration',
    noPurchaseFound: 'Aucun achat précédent trouvé',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Annuler la génération',
    cancelGenerationTitle: 'Annuler la génération ?',
    cancelGenerationMessage:
      'Vous êtes sur le point d\'annuler la génération en cours. Cela supprimera la génération actuelle et démarrera une nouvelle session.',
    clearEverythingTitle: 'Tout effacer ?',
    clearEverythingMessage:
      'Vous êtes sur le point d\'effacer cette session. Cela supprimera tous les tatouages générés. Sauvegardez tout ce que vous souhaitez garder avant de continuer.',
    clearEverything: 'Tout effacer',

    // Input
    enterText: 'Saisir du texte',
    describeTattoo: 'Décrivez votre tatouage ou choisissez une suggestion ci-dessous',

    // Try on alert
    tryOnTitle: 'Essayer {{style}}',
    tryOnMessage:
      'Prenez une photo de la partie de votre corps pour voir ce tatouage sur vous !',
    choosePhoto: 'Choisir une photo',
    later: 'Plus tard',

    // Preview on body
    previewOnBody: 'Prévisualiser le tatouage sur le corps',
    imageSelectedCombine: '1 image sélectionnée – ajoutez-en une autre pour combiner',

    // Suggestions
    createTattoo: 'Créer un tatouage {{title}}',
    createStyleTattoo: 'Créer un tatouage style {{title}}',
    tryStyle: 'Essayer le style {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Mise à jour de votre tatouage...',
      startingNew: 'Démarrage d\'un nouveau tatouage...',
      warmingUp: 'La machine à tatouer chauffe...',
      summoningSpirits: 'Invocation des esprits de l\'encre...',
      drawingInspiration: 'Puiser l\'inspiration dans l\'univers...',
      brewingMasterpiece: 'Votre chef-d\'œuvre est presque prêt...',
      sprinkleCreativity: 'Ajout d\'une touche de créativité...',
      perfectingPixels: 'Peaufinage de chaque pixel de votre tatouage...',
      injectingCreativity: 'Injection de créativité dans votre peau...',
      mixingShade: 'Mélange de la teinte parfaite...',
      sharpeningNeedles: 'Affûtage des aiguilles virtuelles...',
      calibratingVibes: 'Calibrage de vos vibes tatouage...',
      consultingOracle: 'Consultation de l\'oracle du tatouage...',
    },

    // Error states
    error: {
      keepCreating: 'Continuez à créer sans limites',
      limitReachedFree:
        'Vous avez atteint votre limite de génération actuelle. Améliorez maintenant pour explorer des variations, affiner des designs et continuer à créer sans attendre.',
      unlockUnlimited: 'Débloquez des designs illimités \u2192',
      limitReachedSubscribed:
        'Vous avez atteint votre limite pour cette période',
      limitReachedSubscribedDesc:
        'La limite de génération de votre plan a été atteinte. Votre limite sera réinitialisée au début de votre prochaine période de facturation.',
      tryAgainLater: 'Réessayer plus tard',
      contactSupport: 'Contacter le support',
    },

    // Session history actions
    actions: 'Actions',
    saveToGallery: 'Sauvegarder dans la galerie',

    // Result image actions
    imageActions: 'Actions image',
    copyToClipboard: 'Copier dans le presse-papiers',
    imageCopied: 'Image copiée dans le presse-papiers',
    imageCopyFailed: 'Échec de la copie de l\'image',
    imageSaved: 'Image sauvegardée dans la galerie !',
    imageSaveFailed: 'Échec de la sauvegarde. Veuillez réessayer.',

    // Context alerts
    photoAccessTitle: 'Accès aux photos requis',
    photoAccessMessage:
      'Pour sauvegarder des images dans votre galerie, nous avons besoin d\'accéder à vos photos. Vous pouvez activer cela dans les Réglages.',
    resetSessionTitle: 'Réinitialiser la session ?',
    resetSessionMessage:
      'Êtes-vous sûr de vouloir réinitialiser la session ? Cela effacera tous les tatouages générés et démarrera une nouvelle session.',
    resetButton: 'Réinitialiser',
    shareError: 'Échec du partage de l\'image',
    imageDataError: 'Échec de la récupération des données de l\'image',
    pickImageError: 'Échec de la sélection de l\'image depuis la galerie',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Image introuvable',
    useTattoo: 'Utiliser ce tatouage',
    useTattooError: 'Impossible d\'utiliser ce tatouage. Veuillez réessayer.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Toutes les photos',
    addPhotos: 'Ajouter {{count}} photo',
    addPhotos_other: 'Ajouter {{count}} photos',
    recentPhotos: 'Photos récentes',
    selectOneMore: 'Sélectionnez 1 de plus pour combiner',

    // Options
    tryOn: 'Essayer',
    tryOnDescriptionWithTattoo:
      'Ajoutez une photo de votre corps pour prévisualiser',
    tryOnDescriptionNoTattoo:
      'Sélectionnez d\'abord un tatouage, puis ajoutez votre photo',
    createNewTattoo: 'Créer un nouveau tatouage',
    createNewTattooDescription:
      'Décrivez votre idée de tatouage et nous le générerons',
    tattooCoverUp: 'Idée de recouvrement',
    tattooCoverUpDescription:
      'Générez une idée pour recouvrir un tatouage existant en utilisant une photo comme référence',
    removeTattoo: 'Supprimer le tatouage',
    removeTattooDescription:
      'Supprimer un tatouage existant de la photo',
    promptHistory: 'Historique des prompts',
    promptHistoryDescription: 'Voir vos prompts précédents',
    requestFeature: 'Proposer une fonctionnalité',
    requestFeatureDescription:
      'Dites-nous ce que Tattoo Design AI devrait proposer ensuite',

    // Try on alerts
    addYourPhoto: 'Ajoutez votre photo',
    addPhotoQuestion:
      'Comment souhaitez-vous ajouter une photo de l\'endroit où vous voulez le tatouage ?',
    takePhoto: 'Prendre une photo',
    chooseFromLibrary: 'Choisir dans la bibliothèque',
    createTattooFirst: 'Créez d\'abord un tatouage',
    createTattooFirstMessage:
      'Pour essayer un tatouage, vous devez :\n\n1. Générer ou sélectionner un design\n2. Puis ajouter une photo de votre corps\n\nNous les combinerons pour montrer le résultat !',
    createTattoo: 'Créer un tatouage',
  },

  tattoos: {
    // Screen header
    title: 'Mes tatouages',

    // Loading
    loading: 'Chargement des tatouages...',

    // Empty state
    emptyTitle: 'Aucun tatouage sauvegardé',
    emptyDescription:
      'Créez et sauvegardez votre premier design ! Glissez vers le bas pour actualiser.',

    // Cloud restore
    restoringFromCloud: 'Restauration depuis le cloud...',
    noCloudGenerations: 'Aucune génération cloud trouvée',
    restoredCount: '{{restored}} sur {{total}} tatouages restaurés',
    restoreFailedTitle: 'Échec de la restauration',
    restoreFailedMessage:
      'Impossible de restaurer depuis le cloud. Veuillez réessayer.',
    cloudFound: '{{count}} tatouage trouvé dans le cloud',
    cloudFound_other: '{{count}} tatouages trouvés dans le cloud',
    restoring: 'Restauration...',
    restore: 'Restaurer',
    cloudCount: '{{count}} dans le cloud',

    // Detail screen
    tattooNotFound: 'Tatouage introuvable',
    backToHome: 'Retour à l\'accueil',
    shareError: 'Impossible de partager l\'image. Veuillez réessayer.',
    imageAccessError: 'Impossible d\'accéder au fichier image.',
    deleteTitle: 'Supprimer le tatouage',
    deleteMessage:
      'Êtes-vous sûr de vouloir supprimer ce design ? Cette action est irréversible.',
    deleteError: 'Impossible de supprimer l\'image. Veuillez réessayer.',
  },

  generation: {
    // Loading
    applyingDesign: 'Application de votre design...',

    // Error
    invalidRequest: 'Requête invalide',
    generationFailed: 'Échec de la génération',
    failedToGenerate: 'Impossible de générer le design',
    startOver: 'Recommencer',

    // Success
    tattooReady: 'Votre tatouage est prêt !',
    tattooReadyDescription:
      'Voici à quoi ressemblerait votre design appliqué',
    saveToGallery: 'Sauvegarder dans la galerie',
    generateAnother: 'En générer un autre',

    // Save alerts
    savedTitle: 'Sauvegardé !',
    savedMessage:
      'Votre design a été sauvegardé dans votre galerie photo.',
    viewInGallery: 'Voir dans la galerie',

    // Generate another alert
    generateAnotherTitle: 'En générer un autre ?',
    generateAnotherMessage:
      'Vous n\'avez pas encore sauvegardé ce tatouage. Souhaitez-vous le sauvegarder avant de continuer ?',
    continueWithoutSaving: 'Continuer sans sauvegarder',
    saveAndContinue: 'Sauvegarder et continuer',

    // Cancel alert
    cancelGenerationTitle: 'Annuler la génération ?',
    cancelGenerationMessage:
      'Votre tatouage est encore en cours de génération. Si vous annulez maintenant, cette génération comptera quand même dans votre limite d\'utilisation. Êtes-vous sûr ?',
    keepGenerating: 'Continuer la génération',
    unableToSave: 'Impossible de sauvegarder l\'image. Veuillez réessayer.',
  },

  home: {
    // Section headers
    discoverStyles: 'Découvrir de nouveaux styles',
    moreStyles: 'Plus de styles',
    moods: 'Ambiances',
    discoverSketches: 'Découvrir des croquis',

    // Quick actions
    generateFromIdea: 'Générer depuis une idée',
    generateFromIdeaDesc: 'Créez un tatouage à partir de votre imagination',
    seeItOnSkin: 'Voir sur votre peau',
    seeItOnSkinDesc: 'Prenez une photo et prévisualisez le tatouage',
    blendTattoo: 'Fusionner un tatouage',
    blendTattooDesc: 'Téléchargez un tatouage existant et modifiez-le',
    removeTattoo: 'Supprimer un tatouage',
    removeTattooDesc: 'Supprimez un tatouage existant de la peau',
  },

  explore: {
    // Section headers
    byStyles: 'Explorer par styles',
    byMoods: 'Explorer par ambiances',
    byBodyPart: 'Explorer par partie du corps',

    // Filter labels
    styles: 'Styles',
    bodyPart: 'Partie du corps',
  },

  featureRequest: {
    title: 'Partagez vos idées',
    placeholder: 'Des idées pour améliorer votre expérience...',
    needHelp: 'Besoin d\'aide ? ',
    contactUs: 'Contactez-nous',
    successToast:
      'Demande envoyée ! Merci pour votre retour.',
    errorToast:
      'Échec de l\'envoi de la demande. Veuillez réessayer.',
  },

  promptHistory: {
    title: 'Historique des prompts',
    clearAll: 'Tout effacer',
    clearAllTitle: 'Effacer l\'historique des prompts',
    clearAllMessage:
      'Êtes-vous sûr de vouloir supprimer tous les prompts sauvegardés ?',
    deletePromptTitle: 'Supprimer le prompt',
    deletePromptMessage: 'Retirer ce prompt de l\'historique ?',
    emptyTitle: 'Aucun prompt',
    emptyDescription:
      'Vos prompts apparaîtront ici après avoir généré un tatouage',
  },
};
