/**
 * Portuguese (Brazil) translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const ptCore = {
  common: {
    // Actions
    loading: 'Carregando...',
    error: 'Erro',
    success: 'Sucesso',
    cancel: 'Cancelar',
    confirm: 'Confirmar',
    save: 'Salvar',
    done: 'Pronto',
    close: 'Fechar',
    back: 'Voltar',
    next: 'Próximo',
    skip: 'Pular',
    continue: 'Continuar',
    retry: 'Tentar novamente',
    delete: 'Excluir',
    edit: 'Editar',
    share: 'Compartilhar',
    send: 'Enviar',
    search: 'Buscar',
    seeAll: 'Ver tudo',
    tryAgain: 'Tentar novamente',
    ok: 'OK',
    yes: 'Sim',
    no: 'Não',
    or: 'ou',
    upgrade: 'Melhorar',
    processing: 'Processando...',
    openSettings: 'Abrir configurações',
    readMore: 'Ler mais',
    createTattoo: 'Criar tatuagem',
    style: 'Estilo',

    // States
    on: 'Ligado',
    off: 'Desligado',
    enabled: 'Ativado',
    disabled: 'Desativado',

    // Errors
    somethingWentWrong: 'Algo deu errado',
    unexpectedError: 'Ocorreu um erro inesperado',
  },

  tabs: {
    home: 'Início',
    explore: 'Explorar',
    myTattoos: 'Minhas tatuagens',
    profile: 'Perfil',
    tryOnTattoo: 'Experimentar tatuagem',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Bem-vindo de volta!',
    signInDescription: 'Escolha seu método de login preferido',
    signIn: 'Entrar',
    alreadyHaveAccount: 'Já tem uma conta? ',
    termsOfService: 'Termos de serviço',
    privacyPolicy: 'Política de privacidade',
    byContinuingAgree: 'Ao continuar, você concorda com nossos ',
    inkognitoMode: 'Modo Ink-ognito',
    inkognitoDescription: 'Seus designs ficam com você, não conosco.',
    signInToContinue:
      'Faça login para continuar e ter sua tatuagem criada!',
    signInBenefit:
      'Ao fazer login, podemos acompanhar suas gerações gratuitas de tatuagens e garantir que sua conta esteja configurada corretamente.',
    notSignedIn: '(Não conectado)',
  },

  profile: {
    // Screen header
    title: 'Perfil',

    // Section headers
    account: 'Conta',
    planAndUsage: 'Plano e uso',
    settings: 'Configurações',
    support: 'Suporte',
    legal: 'Legal',
    dangerZone: 'Zona de perigo',
    supportAndFeedback: 'Suporte e feedback',
    followUs: 'Siga-nos',

    // Sign-in prompt
    notSignedIn: 'Não conectado',
    signInPrompt:
      'Faça login para acessar os detalhes da sua conta, informações de assinatura e recursos personalizados',

    // Account
    email: 'E-mail',
    name: 'Nome',
    model: 'Modelo',
    userId: 'ID do usuário',
    memberSince: 'Membro desde',
    signOut: 'Sair',
    logOut: 'Sair',
    signOutConfirmTitle: 'Sair',
    signOutConfirmMessage: 'Tem certeza de que deseja sair?',
    unknownUser: 'Usuário desconhecido',

    // Plan
    plan: 'Plano',
    activeUsagePeriod: 'Período de uso ativo',
    currentPlan: 'Plano atual',
    planDetails: 'Detalhes do plano',
    status: 'Status',
    renewsOn: 'Renova em',
    expiresOn: 'Expira em',
    daysRemaining: 'Dias restantes',
    daysValue: '{{count}} dias',
    price: 'Preço',
    billingPeriod: 'Período de cobrança',
    managePlan: 'Gerenciar plano',
    upgradePlan: 'Melhorar plano',
    upgradeNow: 'Melhorar agora',
    limitReachedFooter:
      'Você atingiu seu limite de geração. Melhore seu plano para continuar.',
    noSubscription: 'Sem assinatura',
    cancelledActive: 'Cancelado (Ativo)',
    cancelledActiveUntilExpiration: 'Cancelado (Ativo até expiração)',
    activeUntilExpiration: 'Ativo até expiração',
    accessEndsOn: 'Acesso termina em',
    autoRenew: 'Renovação automática',
    cancelledAt: 'Cancelado em',
    expiredOn: 'Expirado em',
    refreshing: 'Atualizando...',
    refreshData: 'Atualizar dados',
    limitReachedFooterLong:
      'Você atingiu seu limite de geração de tatuagens com IA para este plano. Melhore para continuar criando tatuagens ou entre em contato conosco.',
    weMissYouFooter:
      'Pronto para criar mais tatuagens incríveis? Volte e vamos criar algo incrível juntos.',
    unknown: 'Desconhecido',
    free: 'Grátis',
    pro: 'Pro',
    active: 'Ativo',
    expired: 'Expirado',
    cancelled: 'Cancelado',
    generationsUsed: 'Gerações usadas',
    generationsRemaining: 'Gerações restantes',
    unlimited: 'Ilimitado',
    na: 'N/A',

    // We Miss You
    weMissYou: 'Sentimos sua falta!',
    previousPlan: 'Plano anterior',
    comeBackAndCreate: 'Volte e crie',

    // Enjoying the app
    enjoyingApp: 'Curtindo o app?',
    enjoyingAppDescription:
      'Se você gosta do Tattoo Design AI, uma avaliação ajuda outros amantes de tatuagens a nos descobrir. Você também pode nos enviar feedback ou ideias para novos recursos a qualquer momento.',
    rateOnPlayStore: 'Avaliar na Play Store',
    rateOnAppStore: 'Avaliar na App Store',
    sendFeedback: 'Enviar feedback',

    // Are you an artist
    areYouArtist: 'Você é artista?',
    artistDescription:
      'Interessado em colaborar? Tem sugestões ou reclamações? Adoraríamos ouvir de você!',
    writeToUs: 'Escreva para nós',

    // Support
    contactSupport: 'Contatar suporte',
    requestFeature: 'Sugerir recurso',
    rateApp: 'Avaliar o app',
    shareApp: 'Compartilhar o app',
    shareWithFriends: 'Compartilhar com amigos',
    shareMessage: 'Confira o Tattoo Design AI \n',

    // Settings
    appearance: 'Aparência',
    light: 'Claro',
    dark: 'Escuro',
    system: 'Sistema',
    language: 'Idioma',
    languageAuto: 'Automático (Sistema)',
    showOnboarding: 'Mostrar introdução',
    promptEnhancement: 'Aprimoramento de prompt',
    promptEnhancementDisabledTitle: 'Aprimoramento de prompt desativado',
    promptEnhancementDisabledMessage:
      'Os resultados podem variar sem aprimoramento. Você pode reativá-lo a qualquer momento.',

    // Legal
    termsOfService: 'Termos de serviço',
    privacyPolicy: 'Política de privacidade',

    // Danger
    deleteAccount: 'Excluir conta',
    deleteAccountConfirmTitle: 'Excluir conta',
    deleteAccountConfirmMessage:
      'Tem certeza? Isso não pode ser desfeito. Nota: isso NÃO cancela assinaturas ativas.',
    dangerZoneFooter:
      'Excluir sua conta é permanente. Isso NÃO cancela assinaturas ativas.',
    resetOnboarding: 'Redefinir introdução',

    // Version
    version: 'Versão',
  },

  emails: {
    support: {
      subject: 'Solicitação de suporte Tattoo Design AI',
      body: 'Olá,\n\nPreciso de ajuda com o app Tattoo Design AI.\n\n{{userInfo}}\n\nDescrição:\n[Por favor descreva seu problema aqui]\n\nObrigado!',
    },
    featureRequest: {
      subject: 'Ajuda com solicitação de recurso Tattoo Design AI',
      body: 'Olá,\n\nPreciso de ajuda para enviar uma solicitação de recurso.\n\n',
    },
    feedback: {
      subject: 'Feedback sobre Tattoo Design AI',
      body: 'Olá!\n\nTenho um feedback sobre o Tattoo Design AI:\n\n[Seu feedback aqui]{{userInfo}}\n\nObrigado!',
    },
    artist: {
      subject: 'Você é artista? - Tattoo Design AI',
      body: 'Olá!\n\nTenho interesse em colaborar ou tenho sugestões/reclamações.\n\n{{userInfo}}\n\n[Por favor compartilhe suas sugestões, reclamações, ou conte-nos sobre você como artista]\n\nObrigado!',
    },
    userIdLabel: 'ID do usuário: {{id}}',
    emailLabel: 'E-mail: {{email}}',
    accountLabel: 'E-mail da minha conta: {{email}}',
    myUserIdLabel: 'Meu ID de usuário: {{id}}',
    accountInfo: '\n\nConta: {{email}}',
  },

  notFound: {
    title: 'Ops!',
    description: 'Esta tela não existe.',
    goHome: 'Ir para a tela inicial!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Vamos começar',
    photoAccessDescription:
      'Precisamos de acesso às suas fotos para adicionar imagens',
    photoAccessDeniedTitle: 'Acesso às fotos necessário',
    photoAccessDeniedDescription:
      'Este recurso requer acesso à sua biblioteca de fotos para visualizar e salvar suas tatuagens. Você pode gerenciar o acesso às fotos nas configurações do seu dispositivo.',
    photoLibraryNeeded:
      'Precisamos de acesso à sua biblioteca de fotos para que você possa visualizar e salvar suas tatuagens.',

    // Camera
    cameraAccessTitle: 'Vamos começar',
    cameraAccessDescription:
      'Precisamos de acesso à sua câmera para tirar fotos.',
    cameraAccessDeniedTitle: 'Acesso à câmera necessário',
    cameraAccessDeniedDescription:
      'Este recurso requer acesso à sua câmera. Você pode gerenciar o acesso à câmera nas configurações do seu dispositivo.',
  },
};
