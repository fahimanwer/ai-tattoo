/**
 * European Portuguese translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const ptPTCore = {
  common: {
    // Actions
    loading: 'A carregar...',
    error: 'Erro',
    success: 'Sucesso',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Guardar',
    done: 'Concluido',
    close: 'Fechar',
    back: 'Voltar',
    next: 'Seguinte',
    skip: 'Saltar',
    continue: 'Continuar',
    retry: 'Tentar novamente',
    delete: 'Eliminar',
    edit: 'Editar',
    share: 'Partilhar',
    send: 'Enviar',
    search: 'Pesquisar',
    seeAll: 'Ver tudo',
    tryAgain: 'Tentar novamente',
    ok: 'OK',
    yes: 'Sim',
    no: 'Nao',
    or: 'ou',
    upgrade: 'Atualizar',
    processing: 'A processar...',
    openSettings: 'Abrir Definicoes',
    readMore: 'Ler mais',
    createTattoo: 'Criar tatuagem',
    style: 'Estilo',

    // States
    on: 'Ligado',
    off: 'Desligado',
    enabled: 'Ativado',
    disabled: 'Desativado',

    // Errors
    somethingWentWrong: 'Algo correu mal',
    unexpectedError: 'Ocorreu um erro inesperado',
  },

  tabs: {
    home: 'Inicio',
    explore: 'Explorar',
    myTattoos: 'As minhas tatuagens',
    profile: 'Perfil',
    tryOnTattoo: 'Experimentar tatuagem',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Bem-vindo de volta!',
    signInDescription:
      'Por favor, escolha o seu metodo de inicio de sessao preferido',
    signIn: 'Iniciar sessao',
    alreadyHaveAccount: 'Ja tem uma conta? ',
    termsOfService: 'Termos de Servico',
    privacyPolicy: 'Politica de Privacidade',
    byContinuingAgree: 'Ao continuar, concorda com os nossos ',
    inkognitoMode: 'Modo Ink-ognito',
    inkognitoDescription:
      'Os seus designs ficam consigo, nao connosco.',
    signInToContinue:
      'Por favor, inicie sessao para continuar e criar a sua tatuagem!',
    signInBenefit:
      'Ao iniciar sessao, podemos acompanhar as suas geracoes de tatuagens gratuitas e garantir que a sua conta esta configurada corretamente.',
    notSignedIn: '(Sessao nao iniciada)',
  },

  profile: {
    // Screen header
    title: 'Perfil',

    // Section headers
    account: 'Conta',
    planAndUsage: 'Plano e utilizacao',
    settings: 'Definicoes',
    support: 'Suporte',
    legal: 'Legal',
    dangerZone: 'Zona de perigo',
    supportAndFeedback: 'Suporte e feedback',
    followUs: 'Siga-nos',

    // Sign-in prompt
    notSignedIn: 'Sessao nao iniciada',
    signInPrompt:
      'Inicie sessao para aceder aos detalhes da sua conta, informacoes de subscricao e funcionalidades personalizadas',

    // Account
    email: 'Email',
    name: 'Nome',
    model: 'Modelo',
    userId: 'ID de utilizador',
    memberSince: 'Membro desde',
    signOut: 'Terminar sessao',
    logOut: 'Terminar sessao',
    signOutConfirmTitle: 'Terminar sessao',
    signOutConfirmMessage: 'Tem a certeza de que pretende terminar sessao?',
    unknownUser: 'Utilizador desconhecido',

    // Plan
    plan: 'Plano',
    activeUsagePeriod: 'Periodo de utilizacao ativo',
    currentPlan: 'Plano atual',
    planDetails: 'Detalhes do plano',
    status: 'Estado',
    renewsOn: 'Renova a',
    expiresOn: 'Expira a',
    daysRemaining: 'Dias restantes',
    daysValue: '{{count}} dias',
    price: 'Preco',
    billingPeriod: 'Periodo de faturacao',
    managePlan: 'Gerir plano',
    upgradePlan: 'Atualizar plano',
    upgradeNow: 'Atualizar agora',
    limitReachedFooter:
      'Atingiu o seu limite de geracoes. Atualize para continuar.',
    noSubscription: 'Sem subscricao',
    cancelledActive: 'Cancelado (Ativo)',
    cancelledActiveUntilExpiration: 'Cancelado (Ativo ate a expiracao)',
    activeUntilExpiration: 'Ativo ate a expiracao',
    accessEndsOn: 'Acesso termina a',
    autoRenew: 'Renovacao automatica',
    cancelledAt: 'Cancelado a',
    expiredOn: 'Expirado a',
    refreshing: 'A atualizar...',
    refreshData: 'Atualizar dados',
    limitReachedFooterLong:
      'Atingiu o seu limite de geracao de tatuagens com IA para este plano. Atualize para continuar a criar tatuagens ou contacte-nos.',
    weMissYouFooter:
      'Pronto para criar mais tatuagens incriveis? Volte e vamos desenhar algo incrivel juntos.',
    unknown: 'Desconhecido',
    free: 'Gratuito',
    pro: 'Pro',
    premium: 'Premium',
    plus: 'Plus',
    starter: 'Starter',
    active: 'Ativo',
    expired: 'Expirado',
    cancelled: 'Cancelado',
    generationsUsed: 'Geracoes utilizadas',
    generationsRemaining: 'Geracoes restantes',
    unlimited: 'Ilimitado',
    na: 'N/D',

    // We Miss You
    weMissYou: 'Sentimos a sua falta!',
    previousPlan: 'Plano anterior',
    comeBackAndCreate: 'Volte e crie',

    // Enjoying the app
    enjoyingApp: 'Esta a gostar da aplicacao?',
    enjoyingAppDescription:
      'Se esta a gostar do Tattoo Design AI, uma avaliacao ajuda outros amantes de tatuagens a descobrir-nos. Pode tambem contactar-nos a qualquer momento com feedback ou ideias para funcionalidades.',
    rateOnPlayStore: 'Avaliar na Play Store',
    rateOnAppStore: 'Avaliar na App Store',
    sendFeedback: 'Enviar feedback',

    // Are you an artist
    areYouArtist: 'E artista?',
    artistDescription:
      'Interessado em colaborar? Tem sugestoes ou reclamacoes? Adorariamos ouvir a sua opiniao!',
    writeToUs: 'Escreva-nos',

    // Support
    contactSupport: 'Contactar suporte',
    requestFeature: 'Pedir uma funcionalidade',
    rateApp: 'Avaliar aplicacao',
    shareApp: 'Partilhar aplicacao',
    shareWithFriends: 'Partilhar com amigos',
    shareMessage: 'Veja o Tattoo Design AI \n',

    // Settings
    appearance: 'Aparencia',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema',
    language: 'Idioma',
    languageAuto: 'Automatico (Sistema)',
    showOnboarding: 'Mostrar introducao',
    promptEnhancement: 'Melhoria de prompt',
    promptEnhancementDisabledTitle: 'Melhoria de prompt desativada',
    promptEnhancementDisabledMessage:
      'Os resultados podem variar sem melhoria. Pode reativa-la a qualquer momento.',

    // Legal
    termsOfService: 'Termos de Servico',
    privacyPolicy: 'Politica de Privacidade',

    // Danger
    deleteAccount: 'Eliminar conta',
    deleteAccountConfirmTitle: 'Eliminar conta',
    deleteAccountConfirmMessage:
      'Tem a certeza? Esta acao nao pode ser revertida. Nota: isto NAO cancela subscricoes ativas.',
    dangerZoneFooter:
      'Eliminar a sua conta e permanente. Isto NAO cancela subscricoes ativas.',
    resetOnboarding: 'Reiniciar introducao',

    // Version
    version: 'Versao',
  },

  emails: {
    support: {
      subject: 'Pedido de suporte - Aplicacao Tattoo Design AI',
      body: 'Ola,\n\nPreciso de ajuda com a aplicacao Tattoo Design AI.\n\n{{userInfo}}\n\nDescricao:\n[Por favor, descreva o seu problema aqui]\n\nObrigado!',
    },
    featureRequest: {
      subject: 'Ajuda com pedido de funcionalidade - Tattoo Design AI',
      body: 'Ola,\n\nPreciso de ajuda para submeter um pedido de funcionalidade.\n\n',
    },
    feedback: {
      subject: 'Feedback - Tattoo Design AI',
      body: 'Ola!\n\nTenho algum feedback sobre o Tattoo Design AI:\n\n[O seu feedback aqui]{{userInfo}}\n\nObrigado!',
    },
    artist: {
      subject: 'E artista? - Tattoo Design AI',
      body: 'Ola!\n\nEstou interessado em colaborar ou tenho sugestoes/reclamacoes.\n\n{{userInfo}}\n\n[Por favor, partilhe as suas sugestoes, reclamacoes ou conte-nos sobre si como artista]\n\nObrigado!',
    },
    userIdLabel: 'ID de utilizador: {{id}}',
    emailLabel: 'Email: {{email}}',
    accountLabel: 'Email da minha conta: {{email}}',
    myUserIdLabel: 'O meu ID de utilizador: {{id}}',
    accountInfo: '\n\nConta: {{email}}',
  },

  notFound: {
    title: 'Ups!',
    description: 'Este ecra nao existe.',
    goHome: 'Ir para o ecra inicial!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Vamos comecar',
    photoAccessDescription:
      'Precisamos de acesso as suas fotos para adicionar imagens',
    photoAccessDeniedTitle: 'Acesso a fotos necessario',
    photoAccessDeniedDescription:
      'Esta funcionalidade requer acesso a sua biblioteca de fotos para ver e guardar as suas tatuagens. Pode gerir o acesso a fotos nas definicoes do dispositivo.',
    photoLibraryNeeded:
      'Precisamos de acesso a sua biblioteca de fotos para poder ver e guardar as suas tatuagens.',

    // Camera
    cameraAccessTitle: 'Vamos comecar',
    cameraAccessDescription:
      'Precisamos de acesso a sua camara para tirar fotografias.',
    cameraAccessDeniedTitle: 'Acesso a camara necessario',
    cameraAccessDeniedDescription:
      'Esta funcionalidade requer acesso a sua camara. Pode gerir o acesso a camara nas definicoes do dispositivo.',
  },
};
