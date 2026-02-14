/**
 * Vietnamese translations - Feature namespaces
 *
 * Namespaces: onboarding, paywall, playground, sheet, tattoos,
 * generation, home, explore, camera, featureRequest, promptHistory
 */

export const viFeatures = {
  onboarding: {
    // Step titles
    appTitle: 'Tattoo Design AI',
    appSubtitle: 'Xem trước hình xăm trước khi quyết định.',
    whatsYourName: 'Bạn tên gì?',
    namePlaceholder: 'Tên của bạn',
    nameDescription: 'Chúng tôi sẽ dùng tên này để cá nhân hóa trải nghiệm.',
    welcome: 'Chào mừng',
    welcomeDescription: 'Hãy tùy chỉnh trải nghiệm Tattoo Design AI của bạn.',
    describeYou: 'Điều nào mô tả\n bạn đúng nhất?',
    describeYouDescription:
      'Giúp chúng tôi cá nhân hóa trải nghiệm dựa trên mối quan hệ của bạn với hình xăm',
    whatToDo: 'Bạn muốn\n làm gì?',
    whatToDoDescription:
      'Giúp chúng tôi hiểu bạn muốn khám phá hình xăm như thế nào và công cụ nào hữu ích nhất cho bạn.',
    designTattoo: 'Thiết kế hình xăm\n bạn muốn',
    designTattooDescription:
      'Nhập vài từ hoặc tải ảnh lên để tạo ngay thiết kế hình xăm độc đáo.',
    whereTattoo: 'Bạn muốn xăm\n ở đâu?',
    whereTattooDescription:
      'Vị trí ảnh hưởng đến thiết kế, kích thước và đường nét, giúp chúng tôi tùy chỉnh ý tưởng phù hợp với cơ thể bạn.',
    pickStyles: 'Chọn tối đa 5\n phong cách bạn thích',
    pickStylesDescription:
      'Lựa chọn phong cách giúp chúng tôi thu hẹp thiết kế phù hợp với sở thích của bạn.',
    whenTattoo: 'Bạn dự định xăm\n khi nào?',
    whenTattooDescription:
      'Giúp chúng tôi điều chỉnh\n trải nghiệm theo lịch trình của bạn.',
    whatVibe: 'Bạn muốn\n phong cách nào?',
    whatVibeDescription:
      'Hình xăm mang cảm xúc, điều này giúp chúng tôi hiểu câu chuyện đằng sau hình xăm của bạn.',
    settingUp: 'Đang thiết lập\n cho bạn',
    youreAllSet: 'Bạn đã sẵn sàng!',
    youreAllSetDescription: 'Bạn đã sẵn sàng để bắt đầu.',

    // CTA
    alreadyHaveAccount: 'Đã có tài khoản? ',
    signIn: 'Đăng nhập',

    // User description options
    userDescription: {
      artist: 'Tôi tạo hình xăm',
      client: 'Tôi đang muốn xăm',
      model: 'Tôi dùng hình xăm cho nội dung',
      explorer: 'Tôi chỉ khám phá thôi',
    },

    // Goal options
    goal: {
      tryOn: 'Thử hình xăm trên ảnh của tôi',
      generate: 'Tạo ý tưởng hình xăm',
      browse: 'Chỉ xem hoặc tìm cảm hứng',
      coverUp: 'Che/Sửa hình xăm hiện tại',
    },

    // Location options
    location: {
      wrist: 'Cổ tay',
      chest: 'Ngực',
      hand: 'Bàn tay',
      back: 'Lưng',
      legs: 'Chân',
      forearm: 'Cẳng tay',
      neck: 'Cổ',
      jaw: 'Hàm',
      forehead: 'Trán',
      knuckles: 'Đốt ngón tay',
      fingers: 'Ngón tay',
      cheek: 'Má',
      shoulder: 'Vai',
      temple: 'Thái dương',
      ribs: 'Sườn',
      abdomen: 'Bụng',
      face: 'Mặt',
      hips: 'Hông',
      thigh: 'Đùi',
      tricep: 'Bắp tay sau',
      bicep: 'Bắp tay',
      collarbone: 'Xương đòn',
      ankle: 'Mắt cá chân',
      foot: 'Bàn chân',
      palm: 'Lòng bàn tay',
      notSure: 'Chưa chắc',
    },

    // Style options
    styles: {
      traditional: 'Traditional',
      realism: 'Realism',
      minimal: 'Tối giản',
      celtic: 'Celtic',
      blackwork: 'Blackwork',
      illustrative: 'Illustrative',
      lettering: 'Lettering',
      irezumi: 'Irezumi',
      geometric: 'Geometric',
      religious: 'Tôn giáo',
      anime: 'Anime',
      fineLine: 'Fine Line',
      dotwork: 'Dotwork',
      linework: 'Linework',
      calligraphy: 'Thư pháp',
      portrait: 'Chân dung',
      floral: 'Hoa lá',
      polynesian: 'Polynesian',
      tribal: 'Tribal',
      maori: 'Maori',
      gothic: 'Gothic',
      patchwork: 'Patchwork',
      abstract: 'Trừu tượng',
      cyberpunk: 'Cyberpunk',
      threeD: '3D',
      astrology: 'Chiêm tinh',
    },

    // Timeframe options
    timeframe: {
      thisWeek: 'Tuần này',
      thisMonth: 'Tháng này',
      oneToThreeMonths: 'Trong 1-3 tháng',
      someday: 'Một ngày nào đó, tôi chỉ khám phá thôi',
    },

    // Vibe options
    vibe: {
      bold: 'Mạnh mẽ',
      confident: 'Tự tin',
      soft: 'Nhẹ nhàng',
      dark: 'Tối',
      edgy: 'Sắc sảo',
      elegant: 'Thanh lịch',
      spiritual: 'Tâm linh',
      cute: 'Dễ thương',
      symbolic: 'Biểu tượng',
      playful: 'Vui nhộn',
      clean: 'Sạch sẽ',
      modern: 'Hiện đại',
      meaningful: 'Ý nghĩa',
      personalStory: 'Câu chuyện cá nhân',
      family: 'Gia đình',
      love: 'Tình yêu',
      memory: 'Kỷ niệm',
      rebirth: 'Tái sinh',
      freedom: 'Tự do',
      mystical: 'Huyền bí',
      rebellious: 'Nổi loạn',
      serene: 'Thanh bình',
      empowered: 'Trao quyền',
      ethereal: 'Siêu thoát',
      fearless: 'Không sợ hãi',
      wanderlust: 'Đam mê du lịch',
      transcendent: 'Siêu việt',
    },

    // Loading messages (reviews step)
    loading: {
      understandingVision: 'Đang hiểu tầm nhìn của {{name}}',
      understandingVisionDefault: 'Đang hiểu tầm nhìn của bạn',
      tailoringDesigns: 'Tùy chỉnh thiết kế theo phong cách của bạn',
      settingUpCoverUp: 'Thiết lập công cụ che hình xăm',
      personalizingExperience: 'Cá nhân hóa trải nghiệm của bạn',
      preparingStudio: 'Chuẩn bị phòng thiết kế của bạn',
      configuringWorkspace: 'Đang cấu hình không gian làm việc',
      applyingPreferences: 'Đang áp dụng tùy chọn của bạn',
      journeyStartsNow: 'Hành trình hình xăm của bạn bắt đầu ngay',
    },

    // Reviews
    reviews: {
      review1Title: 'Ứng dụng tuyệt vời!',
      review1Body:
        'Ứng dụng hoạt động tốt, giao diện đẹp và dễ dùng! Ấn tượng với cách áp hình xăm, xử lý ánh sáng và bóng đổ chính xác.',
      review1Author: 'Jacob C.',
      review2Title: 'Thực sự hữu ích',
      review2Body:
        'Thiết kế hình xăm sạch và chi tiết. Một số hình mất thời gian tạo lâu hơn, nhưng nhìn chung đây là một trong những ứng dụng hình xăm AI tốt nhất.',
      review2Author: 'Alexrays1',
      review3Title: 'Tôi rất thích',
      review3Body: 'Rất khuyên dùng \uD83E\uDEF5\uD83C\uDFFC',
      review3Author: 'Antoniozam01',
    },

    // Container slides
    containerTitle1: 'Tạo hình xăm ngay lập tức',
    containerDesc1:
      'Nhập vài từ và tạo ngay thiết kế hình xăm độc đáo.',
    containerTitle2: 'Cá nhân hóa thiết kế',
    containerDesc2:
      'Điều chỉnh màu sắc, bố cục và phong cách để hình xăm hoàn toàn là của bạn.',
    containerTitle3: 'Xem trước trên da',
    containerDesc3:
      'Xem trước hình xăm trên da bạn — điều chỉnh kích thước và vị trí ngay lập tức.',
    paused: 'Đã tạm dừng',

    // Relative time
    time: {
      today: 'Hôm nay',
      yesterday: 'Hôm qua',
      daysAgo: '{{count}} ngày trước',
      weeksAgo: '{{count}} tuần trước',
      monthsAgo: '{{count}} tháng trước',
      yearsAgo: '{{count}} năm trước',
    },

    // Congratulations step
    congratulations: {
      // Feature titles
      tryOnTechnology: 'Công nghệ Thử xăm',
      tryOnTechnologyDesc: 'Xem hình xăm trên da trước khi quyết định',
      aiTattooGenerator: 'Trình tạo hình xăm AI',
      aiTattooGeneratorDesc: 'Tạo thiết kế độc đáo từ ý tưởng của bạn',
      coverUpAssistant: 'Trợ lý Che hình xăm',
      coverUpAssistantDesc: 'Biến hình xăm cũ thành tác phẩm nghệ thuật mới',
      artistTools: 'Công cụ cho Nghệ sĩ',
      artistToolsDesc:
        'Hiển thị thiết kế trên cơ thể khách hàng ngay lập tức',
      precisePlacement: 'Đặt vị trí chính xác',
      precisePlacementDesc:
        'Kích thước hoàn hảo cho hình xăm ở {{location}}',
      styleMatchedDesigns: 'Thiết kế phù hợp phong cách',
      styleMatchedDesignsDesc:
        'Cảm hứng hình xăm {{style}} được tuyển chọn',
      readyWhenYouAre: 'Sẵn sàng khi bạn sẵn sàng',
      readyWhenYouAreDesc: 'Bắt đầu thiết kế hôm nay, xăm ngày mai',
      realisticTryOn: 'Thử xăm chân thực',
      realisticTryOnDesc: 'Xem chính xác nó sẽ trông như thế nào trên bạn',
      saveAndShare: 'Lưu & Chia sẻ',
      saveAndShareDesc:
        'Giữ thiết kế yêu thích và chia sẻ với nghệ sĩ xăm',
      aiDesignStudio: 'Phòng thiết kế AI',
      aiDesignStudioDesc: 'Tạo thiết kế hình xăm độc đáo ngay lập tức',

      // Personalized greetings
      greetingArtist: 'Công cụ trải nghiệm khách hàng của bạn đã sẵn sàng',
      greetingCoverUp: 'Sẵn sàng biến đổi hình xăm của bạn',
      greetingGenerate: 'Phòng thiết kế AI của bạn đang chờ',
      greetingDefault: 'Hành trình hình xăm của bạn bắt đầu ngay',
      welcomeAboard: 'Chào mừng {{name}}!',
      welcomeName: 'Chào mừng {{name}}',

      // Urgency messages
      urgencyArtist: 'Hiển thị bản xem trước thực tế cho khách hàng ngay.',
      urgencyCoverUp: 'Sửa hình xăm một cách tự tin.',
      urgencyTryOn: 'Thử hình xăm trước khi quyết định.',
      urgencyDefault: 'Thiết kế không giới hạn. Không hối hận.',
    },
  },

  paywall: {
    // CTA
    continueButton: 'Tiếp tục',
    restorePurchase: 'Khôi phục giao dịch',
    current: 'HIỆN TẠI',

    // Plan terms
    week: 'Tuần',
    month: 'Tháng',
    weekly: 'Hàng tuần',
    monthly: 'Hàng tháng',
    perWeek: '/Tuần',

    // Content
    loadingPlans: 'Đang tải gói...',
    restoreSubscription: 'Khôi phục đăng ký',
    fairUseNote: 'Tạo thiết kế AI bao gồm giới hạn sử dụng hợp lý.',
    saveBadge: 'Tiết kiệm {{percent}}%',
    subtitle:
      'Khám phá ý tưởng hình xăm, tinh chỉnh thiết kế qua vô số biến thể, thử trên mọi phần cơ thể và xuất kết quả chất lượng cao một cách tự tin.',

    // Personalized headlines
    headlineArtist: 'Cho khách hàng xem hình xăm trước khi xăm',
    headlineCoverUp: 'Biến đổi hình xăm một cách tự tin',
    headlineTryOn: 'Xem hình xăm trước khi quyết định',
    headlineDesign: 'Thiết kế hình xăm bạn luôn mong muốn',
    headlineBrowse: 'Tìm thiết kế hình xăm hoàn hảo cho bạn',

    // Purchase flow alerts
    successTitle: 'Thành công!',
    subscriptionActiveMessage:
      'Đăng ký của bạn đã được kích hoạt. Tận hưởng thiết kế hình xăm không giới hạn!',
    almostThereTitle: 'Sắp xong!',
    createAccountMessage:
      'Tạo tài khoản để kích hoạt đăng ký và bắt đầu thiết kế.',
    purchaseRestoredTitle: 'Khôi phục giao dịch thành công!',
    subscriptionNowActive: 'Đăng ký của bạn đã được kích hoạt.',
    purchaseFoundTitle: 'Tìm thấy giao dịch!',
    purchasesRestoredMessage: 'Giao dịch của bạn đã được khôi phục.',
    noPurchasesFoundTitle: 'Không tìm thấy giao dịch',
    noPurchasesFoundMessage:
      'Không tìm thấy giao dịch trước đó để khôi phục.',
    purchaseFailedTitle: 'Giao dịch thất bại',
    purchaseFailedMessage:
      'Không thể hoàn tất giao dịch. Vui lòng thử lại.',
    errorRestoringTitle: 'Lỗi khôi phục giao dịch',
    errorRestoringMessage:
      'Không thể khôi phục giao dịch. Vui lòng thử lại.',
    subscriptionActivated: 'Đã kích hoạt đăng ký!',

    // Alerts
    purchaseError: 'Lỗi giao dịch',
    restoreSuccess: 'Khôi phục giao dịch thành công',
    restoreError: 'Khôi phục thất bại',
    noPurchaseFound: 'Không tìm thấy giao dịch trước đó',
  },

  playground: {
    // Header
    title: 'Tattoo Design AI',

    // Actions
    cancelGeneration: 'Hủy tạo hình',
    cancelGenerationTitle: 'Hủy tạo hình?',
    cancelGenerationMessage:
      'Bạn sắp hủy lần tạo hình hiện tại. Điều này sẽ xóa hình đang tạo và bắt đầu phiên mới.',
    clearEverythingTitle: 'Xóa tất cả?',
    clearEverythingMessage:
      'Bạn sắp xóa phiên này. Điều này sẽ xóa tất cả hình xăm đã tạo. Hãy lưu những gì bạn muốn giữ trước khi tiếp tục.',
    clearEverything: 'Xóa tất cả',

    // Input
    enterText: 'Nhập văn bản',
    describeTattoo: 'Mô tả hình xăm hoặc chọn gợi ý bên dưới',

    // Try on alert
    tryOnTitle: 'Thử {{style}}',
    tryOnMessage:
      'Chụp ảnh phần cơ thể để xem hình xăm này trông như thế nào trên bạn!',
    choosePhoto: 'Chọn ảnh',
    later: 'Để sau',

    // Preview on body
    previewOnBody: 'Xem trước hình xăm trên cơ thể',
    imageSelectedCombine: 'Đã chọn 1 ảnh - thêm 1 ảnh nữa để kết hợp',

    // Suggestions
    createTattoo: 'Tạo hình xăm {{title}}',
    createStyleTattoo: 'Tạo hình xăm phong cách {{title}}',
    tryStyle: 'Thử phong cách {{title}}',

    // Loading messages
    loadingMessages: {
      updatingTattoo: 'Đang cập nhật hình xăm...',
      startingNew: 'Đang bắt đầu hình xăm mới...',
      warmingUp: 'Máy xăm đang khởi động...',
      summoningSpirits: 'Đang triệu hồi linh hồn mực...',
      drawingInspiration: 'Đang lấy cảm hứng từ vũ trụ...',
      brewingMasterpiece: 'Sắp xong, đang tạo kiệt tác...',
      sprinkleCreativity: 'Thêm chút sáng tạo...',
      perfectingPixels: 'Hoàn thiện từng pixel hình xăm...',
      injectingCreativity: 'Tiêm sự sáng tạo vào da...',
      mixingShade: 'Pha màu hoàn hảo...',
      sharpeningNeedles: 'Mài kim ảo...',
      calibratingVibes: 'Điều chỉnh cảm xúc hình xăm...',
      consultingOracle: 'Đang hỏi ý kiến chuyên gia xăm...',
    },

    // Error states
    error: {
      keepCreating: 'Tiếp tục sáng tạo không giới hạn',
      limitReachedFree:
        'Bạn đã đạt giới hạn tạo hình. Nâng cấp ngay để khám phá biến thể, tinh chỉnh thiết kế và tiếp tục sáng tạo không cần chờ.',
      unlockUnlimited: 'Mở khóa thiết kế không giới hạn \u2192',
      limitReachedSubscribed:
        'Bạn đã đạt giới hạn cho chu kỳ này',
      limitReachedSubscribedDesc:
        'Giới hạn tạo hình của gói đã đạt. Giới hạn sẽ được đặt lại khi bắt đầu chu kỳ thanh toán tiếp theo.',
      tryAgainLater: 'Thử lại sau',
      contactSupport: 'Liên hệ hỗ trợ',
    },

    // Session history actions
    actions: 'Hành động',
    saveToGallery: 'Lưu vào Thư viện',

    // Result image actions
    imageActions: 'Tùy chọn ảnh',
    copyToClipboard: 'Sao chép vào Clipboard',
    imageCopied: 'Đã sao chép ảnh vào clipboard',
    imageCopyFailed: 'Sao chép ảnh thất bại',
    imageSaved: 'Đã lưu ảnh vào thư viện!',
    imageSaveFailed: 'Lưu ảnh thất bại. Vui lòng thử lại.',

    // Context alerts
    photoAccessTitle: 'Cần quyền truy cập Ảnh',
    photoAccessMessage:
      'Để lưu ảnh vào thư viện, chúng tôi cần quyền truy cập ảnh. Bạn có thể bật trong Cài đặt.',
    resetSessionTitle: 'Đặt lại phiên?',
    resetSessionMessage:
      'Bạn có chắc muốn đặt lại phiên? Điều này sẽ xóa tất cả hình xăm đã tạo và bắt đầu phiên mới.',
    resetButton: 'Đặt lại',
    shareError: 'Chia sẻ ảnh thất bại',
    imageDataError: 'Lấy dữ liệu ảnh thất bại',
    pickImageError: 'Chọn ảnh từ thư viện thất bại',

    // Preview screen
    preview: {
      title: 'Tattoo Design AI',
    },
  },

  imagePreview: {
    imageNotFound: 'Không tìm thấy ảnh',
    useTattoo: 'Dùng hình xăm',
    useTattooError: 'Không thể dùng hình xăm này. Vui lòng thử lại.',
  },

  sheet: {
    // Photo selection
    allPhotos: 'Tất cả ảnh',
    addPhotos: 'Thêm {{count}} ảnh',
    addPhotos_other: 'Thêm {{count}} ảnh',
    recentPhotos: 'Ảnh gần đây',
    selectOneMore: 'Chọn thêm 1 ảnh để kết hợp',

    // Options
    tryOn: 'Thử xăm',
    tryOnDescriptionWithTattoo:
      'Thêm ảnh cơ thể để xem trước',
    tryOnDescriptionNoTattoo:
      'Chọn hình xăm trước, rồi thêm ảnh của bạn',
    createNewTattoo: 'Tạo hình xăm mới',
    createNewTattooDescription:
      'Mô tả ý tưởng hình xăm và chúng tôi sẽ tạo cho bạn',
    tattooCoverUp: 'Ý tưởng che hình xăm',
    tattooCoverUpDescription:
      'Tạo ý tưởng để che hình xăm hiện tại bằng ảnh tham khảo',
    removeTattoo: 'Xóa hình xăm',
    removeTattooDescription:
      'Xóa hình xăm hiện tại khỏi ảnh',
    promptHistory: 'Lịch sử câu lệnh',
    promptHistoryDescription: 'Xem các câu lệnh trước đó',
    requestFeature: 'Yêu cầu tính năng',
    requestFeatureDescription:
      'Cho chúng tôi biết bạn muốn Tattoo Design AI hỗ trợ gì tiếp theo',

    // Try on alerts
    addYourPhoto: 'Thêm ảnh của bạn',
    addPhotoQuestion:
      'Bạn muốn thêm ảnh vị trí xăm như thế nào?',
    takePhoto: 'Chụp ảnh',
    chooseFromLibrary: 'Chọn từ Thư viện',
    createTattooFirst: 'Tạo hình xăm trước',
    createTattooFirstMessage:
      'Để thử hình xăm, bạn cần:\n\n1. Tạo hoặc chọn thiết kế hình xăm\n2. Sau đó thêm ảnh cơ thể\n\nChúng tôi sẽ kết hợp để cho bạn xem nó trông như thế nào!',
    createTattoo: 'Tạo hình xăm',
  },

  tattoos: {
    // Screen header
    title: 'Hình xăm của tôi',

    // Loading
    loading: 'Đang tải hình xăm...',

    // Empty state
    emptyTitle: 'Chưa có hình xăm nào',
    emptyDescription:
      'Tạo và lưu thiết kế hình xăm đầu tiên! Vuốt xuống để làm mới.',

    // Cloud restore
    restoringFromCloud: 'Đang khôi phục từ đám mây...',
    noCloudGenerations: 'Không tìm thấy hình trên đám mây',
    restoredCount: 'Đã khôi phục {{restored}} trên {{total}} hình xăm',
    restoreFailedTitle: 'Khôi phục thất bại',
    restoreFailedMessage:
      'Không thể khôi phục từ đám mây. Vui lòng thử lại.',
    cloudFound: 'Tìm thấy {{count}} hình xăm trên đám mây',
    cloudFound_other: 'Tìm thấy {{count}} hình xăm trên đám mây',
    restoring: 'Đang khôi phục...',
    restore: 'Khôi phục',
    cloudCount: '{{count}} trên đám mây',

    // Detail screen
    tattooNotFound: 'Không tìm thấy hình xăm',
    backToHome: 'Về trang chủ',
    shareError: 'Không thể chia sẻ ảnh. Vui lòng thử lại.',
    imageAccessError: 'Không thể truy cập file ảnh.',
    deleteTitle: 'Xóa hình xăm',
    deleteMessage:
      'Bạn có chắc muốn xóa thiết kế hình xăm này? Hành động này không thể hoàn tác.',
    deleteError: 'Không thể xóa ảnh. Vui lòng thử lại.',
  },

  generation: {
    // Loading
    applyingDesign: 'Đang áp dụng thiết kế hình xăm...',

    // Error
    invalidRequest: 'Yêu cầu không hợp lệ',
    generationFailed: 'Tạo hình thất bại',
    failedToGenerate: 'Tạo thiết kế hình xăm thất bại',
    startOver: 'Bắt đầu lại',

    // Success
    tattooReady: 'Hình xăm đã sẵn sàng!',
    tattooReadyDescription:
      'Đây là cách thiết kế sẽ trông khi được áp dụng',
    saveToGallery: 'Lưu vào Thư viện',
    generateAnother: 'Tạo thêm',

    // Save alerts
    savedTitle: 'Đã lưu!',
    savedMessage:
      'Thiết kế hình xăm đã được lưu vào thư viện ảnh.',
    viewInGallery: 'Xem trong thư viện',

    // Generate another alert
    generateAnotherTitle: 'Tạo thêm?',
    generateAnotherMessage:
      'Bạn chưa lưu hình xăm này. Bạn có muốn lưu trước khi tiếp tục không?',
    continueWithoutSaving: 'Tiếp tục không lưu',
    saveAndContinue: 'Lưu và tiếp tục',

    // Cancel alert
    cancelGenerationTitle: 'Hủy tạo hình?',
    cancelGenerationMessage:
      'Hình xăm vẫn đang được tạo. Nếu hủy bây giờ, lần tạo này vẫn sẽ được tính vào giới hạn sử dụng. Bạn có chắc muốn hủy không?',
    keepGenerating: 'Tiếp tục tạo',
    unableToSave: 'Không thể lưu ảnh. Vui lòng thử lại.',
  },

  home: {
    // Section headers
    discoverStyles: 'Khám phá phong cách mới',
    moreStyles: 'Thêm phong cách',
    moods: 'Tâm trạng',
    discoverSketches: 'Khám phá thiết kế phác thảo',

    // Quick actions
    generateFromIdea: 'Tạo từ ý tưởng',
    generateFromIdeaDesc: 'Tạo hình xăm từ trí tưởng tượng',
    seeItOnSkin: 'Xem trên da',
    seeItOnSkinDesc: 'Chụp ảnh và xem trước hình xăm',
    blendTattoo: 'Phối hình xăm',
    blendTattooDesc: 'Tải hình xăm hiện có lên và chỉnh sửa',
    removeTattoo: 'Xóa hình xăm',
    removeTattooDesc: 'Xóa hình xăm hiện có khỏi da',
  },

  explore: {
    // Section headers
    byStyles: 'Khám phá theo phong cách',
    byMoods: 'Khám phá theo tâm trạng',
    byBodyPart: 'Khám phá theo vị trí',

    // Filter labels
    styles: 'Phong cách',
    bodyPart: 'Vị trí',
  },

  featureRequest: {
    title: 'Chia sẻ ý tưởng',
    placeholder: 'Ý tưởng cải thiện trải nghiệm...',
    needHelp: 'Cần giúp đỡ? ',
    contactUs: 'Liên hệ chúng tôi',
    successToast:
      'Đã gửi yêu cầu tính năng! Cảm ơn phản hồi của bạn.',
    errorToast:
      'Gửi yêu cầu tính năng thất bại. Vui lòng thử lại.',
  },

  promptHistory: {
    title: 'Lịch sử câu lệnh',
    clearAll: 'Xóa tất cả',
    clearAllTitle: 'Xóa lịch sử câu lệnh',
    clearAllMessage:
      'Bạn có chắc muốn xóa tất cả câu lệnh đã lưu?',
    deletePromptTitle: 'Xóa câu lệnh',
    deletePromptMessage: 'Xóa câu lệnh này khỏi lịch sử?',
    emptyTitle: 'Chưa có câu lệnh nào',
    emptyDescription:
      'Câu lệnh sẽ xuất hiện ở đây sau khi bạn tạo hình xăm',
  },
};
