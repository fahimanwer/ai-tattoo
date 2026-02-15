/**
 * German translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const deFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Sieh dir dein Tattoo an, bevor du dich entscheidest.',
    whatsYourName: 'Wie heißt du?',
    namePlaceholder: 'Dein Name',
    nameDescription: 'Wir verwenden dies, um dein Erlebnis zu personalisieren.',
    welcome: 'Willkommen',
    welcomeDescription: 'Lass uns dein Tattoo Design AI Erlebnis jetzt anpassen.',
    describeYou: 'Was beschreibt \n dich am besten?',
    describeYouDescription:
      'Das hilft uns, das Erlebnis basierend auf deiner Beziehung zu Tattoos zu personalisieren',
    whatToDo: 'Was möchtest du\n gerne tun?',
    whatToDoDescription:
      'Das hilft uns zu verstehen, wie du Tattoos erkunden möchtest und welche Tools für dich am nützlichsten sind.',
    designTattoo: 'Gestalte das \n Tattoo deiner Wahl',
    designTattooDescription:
      'Gib ein paar Worte ein oder lade ein Bild hoch und generiere sofort einzigartige Tattoo-Designs.',
    whereTattoo: 'Wo möchtest du\n das Tattoo?',
    whereTattooDescription:
      'Die Platzierung beeinflusst Design, Größe und Fluss, was uns hilft, Ideen an deinen Körper anzupassen.',
    pickStyles: 'Wähle bis zu 5 \n Stile, die dir gefallen',
    pickStylesDescription:
      'Deine Stilwahl hilft uns, Designs einzugrenzen, die deinem Geschmack entsprechen.',
    whenTattoo: 'Wann denkst du daran,\n das Tattoo zu bekommen?',
    whenTattooDescription:
      'Das hilft uns, das\n Erlebnis an deinen Zeitplan anzupassen.',
    whatVibe: 'Welche Stimmung\n schwebt dir vor?',
    whatVibeDescription:
      'Tattoos tragen Emotionen – das hilft uns, die Geschichte hinter deinem zu verstehen.',
    settingUp: 'Wir richten alles\n für dich ein',
    youreAllSet: 'Alles bereit!',
    youreAllSetDescription: 'Du bist bereit loszulegen.',

    // CTA
    alreadyHaveAccount: 'Bereits ein Konto? ',
    signIn: 'Anmelden',

    // User description options
    userDescription: {
      artist: 'Ich erstelle Tattoos',
      client: 'Ich lasse mir ein Tattoo stechen',
      model: 'Ich nutze Tattoos für Content',
      explorer: 'Ich schaue mich nur um',
    },

    // Goal options
    goal: {
      tryOn: 'Tattoos auf meinen Fotos ausprobieren',
      generate: 'Tattoo-Ideen generieren',
      browse: 'Nur stöbern oder Inspiration suchen',
      coverUp: 'Ein bestehendes Tattoo überdecken/überarbeiten',
    },

    // Location options
    location: {
      wrist: 'Handgelenk',
      chest: 'Brust',
      hand: 'Hand',
      back: 'Rücken',
      legs: 'Beine',
      forearm: 'Unterarm',
      neck: 'Nacken',
      jaw: 'Kiefer',
      forehead: 'Stirn',
      knuckles: 'Fingerknöchel',
      fingers: 'Finger',
      cheek: 'Wange',
      shoulder: 'Schulter',
      temple: 'Schläfe',
      ribs: 'Rippen',
      abdomen: 'Bauch',
      face: 'Gesicht',
      hips: 'Hüften',
      thigh: 'Oberschenkel',
      tricep: 'Trizeps',
      bicep: 'Bizeps',
      collarbone: 'Schlüsselbein',
      ankle: 'Knöchel',
      foot: 'Fuß',
      palm: 'Handfläche',
      notSure: 'Nicht sicher',
    },

    // Style options
    styles: {
      traditional: 'Traditional',
      realism: 'Realismus',
      minimal: 'Minimal',
      celtic: 'Keltisch',
      blackwork: 'Blackwork',
      illustrative: 'Illustrativ',
      lettering: 'Lettering',
      irezumi: 'Irezumi',
      geometric: 'Geometrisch',
      religious: 'Religiös',
      anime: 'Anime',
      fineLine: 'Fine Line',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Kalligrafie',
      portrait: 'Porträt',
      floral: 'Floral',
      polynesian: 'Polynesisch',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gotisch',
      patchwork: 'Patchwork',
      abstract: 'Abstrakt',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Astrologie',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Diese Woche',
      thisMonth: 'Diesen Monat',
      oneToThreeMonths: 'In 1-3 Monaten',
      someday: 'Irgendwann, ich schaue mich nur um',
    },

    // Vibe options
    vibe: {
      bold: 'Mutig',
      confident: 'Selbstbewusst',
      soft: 'Sanft',
      dark: 'Düster',
      edgy: 'Kantig',
      elegant: 'Elegant',
      spiritual: 'Spirituell',
      cute: 'Süß',
      symbolic: 'Symbolisch',
      playful: 'Verspielt',
      clean: 'Klar',
      modern: 'Modern',
      meaningful: 'Bedeutungsvoll',
      personalStory: 'Persönliche Geschichte',
      family: 'Familie',
      love: 'Liebe',
      memory: 'Erinnerung',
      rebirth: 'Wiedergeburt',
      freedom: 'Freiheit',
      mystical: 'Mystisch',
      rebellious: 'Rebellisch',
      serene: 'Gelassen',
      empowered: 'Ermächtigt',
      ethereal: 'Ätherisch',
      fearless: 'Furchtlos',
      wanderlust: 'Fernweh',
      transcendent: 'Transzendent',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: '{{name}}s Vision verstehen',
      understandingVisionDefault: 'Deine Vision verstehen',
      tailoringDesigns: 'Designs an deinen Stil anpassen',
      settingUpCoverUp: 'Cover-Up-Tools einrichten',
      personalizingExperience: 'Dein Erlebnis personalisieren',
      preparingStudio: 'Dein Design-Studio vorbereiten',
      configuringWorkspace: 'Deinen Arbeitsbereich konfigurieren',
      applyingPreferences: 'Deine Vorlieben anwenden',
      journeyStartsNow: 'Deine Tattoo-Reise beginnt jetzt',
    },

    // Reviews
    reviews: {
      review1Title: 'Tolle App!',
      review1Body:
        'App funktioniert, sieht toll aus und fühlt sich super an! Beeindruckt, wie gut das Tattoo angewendet wurde – mit genauer Berücksichtigung von Licht und Schatten.',
      review1Author: 'Jacob C.',
      review2Title: 'Wirklich nützlich',
      review2Body:
        'Die Tattoo-Designs sind sauber und detailliert. Einige Bilder brauchen etwas länger zum Generieren, aber insgesamt ist es eine der besten KI-Tattoo-Apps.',
      review2Author: 'Alexrays1',
      review3Title: 'Ich liebe das',
      review3Body: 'Sehr empfehlenswert \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Tattoos sofort generieren',
    containerDesc1:
      'Gib ein paar Worte ein und generiere sofort einzigartige Tattoo-Designs.',
    containerTitle2: 'Dein Design personalisieren',
    containerDesc2:
      'Passe Farben, Layout und Stil an, um das Tattoo perfekt zu deinem zu machen.',
    containerTitle3: 'Vorschau auf deiner Haut',
    containerDesc3:
      'Sieh dir jedes Tattoo auf deiner Haut an – Größe und Platzierung sofort anpassen.',
    paused: 'Pausiert',

    // Relative time
    time: {
      today: 'Heute',
      yesterday: 'Gestern',
      daysAgo: 'Vor {{count}} Tagen',
      weeksAgo: 'Vor {{count}} Wochen',
      monthsAgo: 'Vor {{count}} Monaten',
      yearsAgo: 'Vor {{count}} Jahren',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Anprobe-Technologie',
      tryOnTechnologyDesc: 'Sieh Tattoos auf deiner Haut, bevor du dich entscheidest',
      aiTattooGenerator: 'KI-Tattoo-Generator',
      aiTattooGeneratorDesc: 'Erstelle einzigartige Designs aus deinen Ideen',
      coverUpAssistant: 'Cover-Up-Assistent',
      coverUpAssistantDesc: 'Verwandle bestehende Tattoos in neue Kunst',
      artistTools: 'Künstler-Tools',
      artistToolsDesc:
        'Zeige Kunden Designs sofort auf ihrem Körper',
      precisePlacement: 'Präzise Platzierung',
      precisePlacementDesc:
        'Perfekte Größe für dein {{location}}-Tattoo',
      styleMatchedDesigns: 'Stilangepasste Designs',
      styleMatchedDesignsDesc:
        'Kuratierte {{style}}-Tattoo-Inspiration',
      readyWhenYouAre: 'Bereit, wenn du es bist',
      readyWhenYouAreDesc: 'Beginne heute mit dem Design, morgen mit der Tinte',
      realisticTryOn: 'Realistische Anprobe',
      realisticTryOnDesc: 'Sieh genau, wie es an dir aussehen wird',
      saveAndShare: 'Speichern & Teilen',
      saveAndShareDesc:
        'Behalte deine Favoriten und teile sie mit deinem Künstler',
      aiDesignStudio: 'KI-Design-Studio',
      aiDesignStudioDesc: 'Generiere sofort einzigartige Tattoo-Designs',

      // Personalized greetings
      greetingArtist: 'Dein neues Kundenerlebnis-Tool ist bereit',
      greetingCoverUp: 'Bereit, dein Tattoo zu verwandeln',
      greetingGenerate: 'Dein KI-Design-Studio wartet',
      greetingDefault: 'Deine Tattoo-Reise beginnt jetzt',
      welcomeAboard: 'Willkommen an Bord, {{name}}!',
      welcomeName: 'Willkommen {{name}}',

      // Urgency messages
      urgencyArtist: 'Zeige Kunden sofort echte Vorschauen.',
      urgencyCoverUp: 'Lass dein Tattoo mit Sicherheit überarbeiten.',
      urgencyTryOn: 'Probiere dein Tattoo an, bevor du dich entscheidest.',
      urgencyDefault: 'Unbegrenzte Designs. Null Reue.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Weiter',
    restorePurchase: 'Kauf wiederherstellen',
    current: 'AKTUELL',

    // Plan terms
    week: 'Woche',
    month: 'Monat',
    weekly: 'Wöchentlich',
    perWeek: '/Woche',

    // Content
    loadingPlans: 'Pläne laden\u2026',
    restoreSubscription: 'Abonnement wiederherstellen',
    fairUseNote: 'KI-Design-Generierung unterliegt fairer Nutzung.',
    saveBadge: '{{percent}}% sparen',
    subtitle:
      'Erkunde Tattoo-Ideen, verfeinere Designs durch endlose Variationen, probiere sie auf jedem Körperteil aus und exportiere hochwertige Ergebnisse mit Vertrauen.',

    // Personalized headlines
    headlineArtist: 'Zeige Kunden ihr Tattoo, bevor du stichst',
    headlineCoverUp: 'Verwandle dein Tattoo mit Sicherheit',
    headlineTryOn: 'Sieh dein Tattoo, bevor du dich entscheidest',
    headlineDesign: 'Gestalte das Tattoo, das du dir immer gewünscht hast',
    headlineBrowse: 'Finde dein perfektes Tattoo-Design',

    // Purchase flow alerts
    successTitle: 'Erfolg!',
    subscriptionActiveMessage:
      'Dein Abonnement ist jetzt aktiv. Genieße unbegrenzte Tattoo-Designs!',
    almostThereTitle: 'Fast geschafft!',
    createAccountMessage:
      'Erstelle ein Konto, um dein Abonnement zu aktivieren und mit dem Designen zu beginnen.',
    purchaseRestoredTitle: 'Kauf wiederhergestellt!',
    subscriptionNowActive: 'Dein Abonnement ist jetzt aktiv.',
    purchaseFoundTitle: 'Kauf gefunden!',
    purchasesRestoredMessage: 'Deine Käufe wurden wiederhergestellt.',
    noPurchasesFoundTitle: 'Keine Käufe gefunden',
    noPurchasesFoundMessage:
      'Es wurden keine früheren Käufe zum Wiederherstellen gefunden.',
    purchaseFailedTitle: 'Kauf fehlgeschlagen',
    purchaseFailedMessage:
      'Kauf konnte nicht abgeschlossen werden. Bitte versuche es erneut.',
    errorRestoringTitle: 'Fehler beim Wiederherstellen der Käufe',
    errorRestoringMessage:
      'Käufe konnten nicht wiederhergestellt werden. Bitte versuche es erneut.',
    subscriptionActivated: 'Abonnement aktiviert!',

    // Alerts
    purchaseError: 'Kauffehler',
    restoreSuccess: 'Kauf wiederhergestellt',
    restoreError: 'Wiederherstellung fehlgeschlagen',
    noPurchaseFound: 'Kein früherer Kauf gefunden',

    // Pricing overhaul
    annual: 'Jährlich',
    year: 'Jahr',
    perYear: '/Jahr',
    freeTrialBadge: '{{days}}-TAGE KOSTENLOS TESTEN',
    startTrialButton: '{{days}} Tage kostenlos testen',
    specialOffer: 'Sonderangebot',
    limitedTimeOffer: 'Zeitlich begrenztes Angebot',
    discountSubtitle: 'Nur für neue Nutzer — schalte heute vollen Zugang frei',
    savePercent: '{{percent}}% sparen',
    annualPerWeek: '{{price}}/Woche',
    todayOnly: 'Nur heute',
    offerExpires: 'Angebot läuft ab in',
    perWeekBilled: 'pro Woche, abgerechnet {{period}}',
    originalPrice: 'War {{price}}',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Generierung abbrechen',
    cancelGenerationTitle: 'Generierung abbrechen?',
    cancelGenerationMessage:
      'Du bist dabei, die aktuelle Generierung abzubrechen. Dies wird die aktuelle Generierung entfernen und eine neue Sitzung starten.',
    clearEverythingTitle: 'Alles löschen?',
    clearEverythingMessage:
      'Du bist dabei, diese Sitzung zu löschen. Dies entfernt alle generierten Tattoos. Speichere alles, was du behalten möchtest, bevor du fortfährst.',
    clearEverything: 'Alles löschen',

    // Input
    enterText: 'Text eingeben',
    describeTattoo: 'Beschreibe dein Tattoo oder wähle einen Vorschlag unten',

    // Try on alert
    tryOnTitle: '{{style}} anprobieren',
    tryOnMessage:
      'Mache ein Foto deines Körperteils, um zu sehen, wie dieses Tattoo an dir aussieht!',
    choosePhoto: 'Foto wählen',
    later: 'Später',

    // Preview on body
    previewOnBody: 'Tattoo auf Körper ansehen',
    imageSelectedCombine: '1 Bild ausgewählt – füge ein weiteres zum Kombinieren hinzu',

    // Suggestions
    createTattoo: 'Ein {{title}}-Tattoo erstellen',
    createStyleTattoo: 'Ein {{title}}-Stil-Tattoo erstellen',
    tryStyle: '{{title}}-Stil ausprobieren',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Dein Tattoo wird aktualisiert...',
      startingNew: 'Neues Tattoo starten...',
      warmingUp: 'Tattoo-Maschine wärmt sich auf...',
      summoningSpirits: 'Die Tintengeister werden beschworen...',
      drawingInspiration: 'Inspiration aus dem Universum schöpfen...',
      brewingMasterpiece: 'Dein Meisterwerk wird fast fertig gebraut...',
      sprinkleCreativity: 'Eine Prise Kreativität hinzufügen...',
      perfectingPixels: 'Jedes Pixel deines Tattoos perfektionieren...',
      injectingCreativity: 'Kreativität in deine Haut injizieren...',
      mixingShade: 'Den perfekten Farbton mischen...',
      sharpeningNeedles: 'Virtuelle Nadeln schärfen...',
      calibratingVibes: 'Deine Tattoo-Vibes kalibrieren...',
      consultingOracle: 'Das Tattoo-Orakel befragen...',
    },

    // Error states
    error: {
      keepCreating: 'Ohne Limits weiter gestalten',
      limitReachedFree:
        'Du hast dein aktuelles Generierungslimit erreicht. Upgrade jetzt, um Variationen zu erkunden, Designs zu verfeinern und ohne Wartezeit weiterzumachen.',
      unlockUnlimited: 'Unbegrenzte Designs freischalten \u2192',
      limitReachedSubscribed:
        'Du hast dein Limit für diesen Zeitraum erreicht',
      limitReachedSubscribedDesc:
        'Das Generierungslimit deines Plans wurde erreicht. Dein Limit wird zu Beginn deines nächsten Abrechnungszeitraums zurückgesetzt.',
      tryAgainLater: 'Später erneut versuchen',
      contactSupport: 'Support kontaktieren',
    },

    // Session history actions
    actions: 'Aktionen',
    saveToGallery: 'In Galerie speichern',

    // Result image actions
    imageActions: 'Bild-Aktionen',
    copyToClipboard: 'In Zwischenablage kopieren',
    imageCopied: 'Bild in Zwischenablage kopiert',
    imageCopyFailed: 'Bild konnte nicht kopiert werden',
    imageSaved: 'Bild in Galerie gespeichert!',
    imageSaveFailed: 'Bild konnte nicht gespeichert werden. Bitte versuche es erneut.',

    // Context alerts
    photoAccessTitle: 'Fotozugriff benötigt',
    photoAccessMessage:
      'Um Bilder in deiner Galerie zu speichern, benötigen wir Zugriff auf deine Fotos. Du kannst dies in den Einstellungen aktivieren.',
    resetSessionTitle: 'Sitzung zurücksetzen?',
    resetSessionMessage:
      'Bist du sicher, dass du die Sitzung zurücksetzen möchtest? Dies löscht alle generierten Tattoos und startet eine neue Sitzung.',
    resetButton: 'Zurücksetzen',
    shareError: 'Bild konnte nicht geteilt werden',
    imageDataError: 'Bilddaten konnten nicht abgerufen werden',
    pickImageError: 'Bild konnte nicht aus der Galerie geladen werden',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Bild nicht gefunden',
    useTattoo: 'Tattoo verwenden',
    useTattooError: 'Dieses Tattoo konnte nicht verwendet werden. Bitte versuche es erneut.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Alle Fotos',
    addPhotos: '{{count}} Foto hinzufügen',
    addPhotos_other: '{{count}} Fotos hinzufügen',
    recentPhotos: 'Neueste Fotos',
    selectOneMore: 'Wähle 1 weiteres zum Kombinieren',

    // Options
    tryOn: 'Anprobieren',
    tryOnDescriptionWithTattoo:
      'Füge ein Foto deines Körpers hinzu, um eine Vorschau zu sehen',
    tryOnDescriptionNoTattoo:
      'Wähle zuerst ein Tattoo, dann füge dein Foto hinzu',
    createNewTattoo: 'Neues Tattoo erstellen',
    createNewTattooDescription:
      'Beschreibe deine Tattoo-Idee und wir generieren sie',
    tattooCoverUp: 'Tattoo-Cover-Up-Idee',
    tattooCoverUpDescription:
      'Generiere eine Idee, um ein bestehendes Tattoo mit einem Foto als Referenz zu überdecken',
    removeTattoo: 'Tattoo entfernen',
    removeTattooDescription:
      'Ein bestehendes Tattoo vom Foto entfernen',
    promptHistory: 'Prompt-Verlauf',
    promptHistoryDescription: 'Deine vorherigen Prompts ansehen',
    requestFeature: 'Feature vorschlagen',
    requestFeatureDescription:
      'Sag uns, was Tattoo Design AI als nächstes unterstützen soll',

    // Try on alerts
    addYourPhoto: 'Dein Foto hinzufügen',
    addPhotoQuestion:
      'Wie möchtest du ein Foto der Stelle hinzufügen, an der du das Tattoo möchtest?',
    takePhoto: 'Foto aufnehmen',
    chooseFromLibrary: 'Aus Bibliothek wählen',
    createTattooFirst: 'Erstelle zuerst ein Tattoo',
    createTattooFirstMessage:
      'Um ein Tattoo anzuprobieren, musst du:\n\n1. Ein Tattoo-Design generieren oder auswählen\n2. Dann ein Foto deines Körpers hinzufügen\n\nWir kombinieren sie, um dir zu zeigen, wie es aussieht!',
    createTattoo: 'Tattoo erstellen',
  },

  tattoos: {
    // Screen header
    title: 'Meine Tattoos',

    // Loading
    loading: 'Tattoos laden...',

    // Empty state
    emptyTitle: 'Noch keine Tattoos gespeichert',
    emptyDescription:
      'Erstelle und speichere dein erstes Tattoo-Design! Wische nach unten zum Aktualisieren.',

    // Cloud restore
    restoringFromCloud: 'Aus der Cloud wiederherstellen...',
    noCloudGenerations: 'Keine Cloud-Generierungen gefunden',
    restoredCount: '{{restored}} von {{total}} Tattoos wiederhergestellt',
    restoreFailedTitle: 'Wiederherstellung fehlgeschlagen',
    restoreFailedMessage:
      'Wiederherstellung aus der Cloud nicht möglich. Bitte versuche es erneut.',
    cloudFound: '{{count}} Tattoo in der Cloud gefunden',
    cloudFound_other: '{{count}} Tattoos in der Cloud gefunden',
    restoring: 'Wird wiederhergestellt...',
    restore: 'Wiederherstellen',
    cloudCount: '{{count}} in der Cloud',

    // Detail screen
    tattooNotFound: 'Tattoo nicht gefunden',
    backToHome: 'Zurück zur Startseite',
    shareError: 'Das Bild konnte nicht geteilt werden. Bitte versuche es erneut.',
    imageAccessError: 'Auf die Bilddatei konnte nicht zugegriffen werden.',
    deleteTitle: 'Tattoo löschen',
    deleteMessage:
      'Bist du sicher, dass du dieses Tattoo-Design löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden.',
    deleteError: 'Das Bild konnte nicht gelöscht werden. Bitte versuche es erneut.',
  },

  generation: {
    // Loading
    applyingDesign: 'Dein Tattoo-Design wird angewendet...',

    // Error
    invalidRequest: 'Ungültige Anfrage',
    generationFailed: 'Generierung fehlgeschlagen',
    failedToGenerate: 'Tattoo-Design konnte nicht generiert werden',
    startOver: 'Neu beginnen',

    // Success
    tattooReady: 'Dein Tattoo ist fertig!',
    tattooReadyDescription:
      'So würde dein Design angewendet aussehen',
    saveToGallery: 'In Galerie speichern',
    generateAnother: 'Noch eins generieren',

    // Save alerts
    savedTitle: 'Gespeichert!',
    savedMessage:
      'Dein Tattoo-Design wurde in deiner Fotogalerie gespeichert.',
    viewInGallery: 'In Galerie ansehen',

    // Generate another alert
    generateAnotherTitle: 'Noch eins generieren?',
    generateAnotherMessage:
      'Du hast dieses Tattoo noch nicht gespeichert. Möchtest du es vor dem Fortfahren speichern?',
    continueWithoutSaving: 'Ohne Speichern fortfahren',
    saveAndContinue: 'Speichern und fortfahren',

    // Cancel alert
    cancelGenerationTitle: 'Generierung abbrechen?',
    cancelGenerationMessage:
      'Dein Tattoo wird noch generiert. Wenn du jetzt abbrichst, wird diese Generierung trotzdem auf dein Nutzungslimit angerechnet. Bist du sicher?',
    keepGenerating: 'Weiter generieren',
    unableToSave: 'Bild konnte nicht gespeichert werden. Bitte versuche es erneut.',
  },

  home: {
    // Section headers
    discoverStyles: 'Neue Stile entdecken',
    moreStyles: 'Mehr Stile',
    moods: 'Stimmungen',
    discoverSketches: 'Skizzen-Designs entdecken',

    // Quick actions
    generateFromIdea: 'Aus Idee generieren',
    generateFromIdeaDesc: 'Erstelle ein Tattoo aus deiner Vorstellung',
    seeItOnSkin: 'Auf deiner Haut sehen',
    seeItOnSkinDesc: 'Mache ein Foto und sieh die Tattoo-Vorschau',
    blendTattoo: 'Tattoo überblenden',
    blendTattooDesc: 'Lade ein bestehendes Tattoo hoch und bearbeite es',
    removeTattoo: 'Tattoo entfernen',
    removeTattooDesc: 'Entferne ein bestehendes Tattoo von der Haut',
  },

  explore: {
    // Section headers
    byStyles: 'Nach Stilen erkunden',
    byMoods: 'Nach Stimmungen erkunden',
    byBodyPart: 'Nach Körperteil erkunden',

    // Filter labels
    styles: 'Stile',
    bodyPart: 'Körperteil',
  },

  featureRequest: {
    title: 'Teile deine Ideen',
    placeholder: 'Ideen zur Verbesserung deines Erlebnisses...',
    needHelp: 'Brauchst du Hilfe? ',
    contactUs: 'Kontaktiere uns',
    successToast:
      'Feature-Vorschlag gesendet! Danke für dein Feedback.',
    errorToast:
      'Feature-Vorschlag konnte nicht gesendet werden. Bitte versuche es erneut.',
  },

  promptHistory: {
    title: 'Prompt-Verlauf',
    clearAll: 'Alle löschen',
    clearAllTitle: 'Prompt-Verlauf löschen',
    clearAllMessage:
      'Bist du sicher, dass du alle gespeicherten Prompts löschen möchtest?',
    deletePromptTitle: 'Prompt löschen',
    deletePromptMessage: 'Diesen Prompt aus dem Verlauf entfernen?',
    emptyTitle: 'Noch keine Prompts',
    emptyDescription:
      'Deine Prompts erscheinen hier, nachdem du ein Tattoo generiert hast',
  },
};
