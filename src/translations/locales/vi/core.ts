/**
 * Vietnamese translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const viCore = {
  common: {
    // Actions
    loading: 'Đang tải...',
    error: 'Lỗi',
    success: 'Thành công',
    cancel: 'Hủy',
    confirm: 'Xác nhận',
    save: 'Lưu',
    done: 'Xong',
    close: 'Đóng',
    back: 'Quay lại',
    next: 'Tiếp theo',
    skip: 'Bỏ qua',
    continue: 'Tiếp tục',
    retry: 'Thử lại',
    delete: 'Xóa',
    edit: 'Chỉnh sửa',
    share: 'Chia sẻ',
    send: 'Gửi',
    search: 'Tìm kiếm',
    seeAll: 'Xem tất cả',
    tryAgain: 'Thử lại',
    ok: 'OK',
    yes: 'Có',
    no: 'Không',
    or: 'hoặc',
    upgrade: 'Nâng cấp',
    processing: 'Đang xử lý...',
    openSettings: 'Mở Cài đặt',
    readMore: 'Đọc thêm',
    createTattoo: 'Tạo hình xăm',
    style: 'Phong cách',

    // States
    on: 'Bật',
    off: 'Tắt',
    enabled: 'Đã bật',
    disabled: 'Đã tắt',

    // Errors
    somethingWentWrong: 'Đã xảy ra lỗi',
    unexpectedError: 'Đã xảy ra lỗi không mong muốn',
  },

  tabs: {
    home: 'Trang chủ',
    explore: 'Khám phá',
    myTattoos: 'Hình xăm của tôi',
    profile: 'Hồ sơ',
    tryOnTattoo: 'Thử hình xăm',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'Chào mừng trở lại!',
    signInDescription: 'Vui lòng chọn phương thức đăng nhập bạn muốn',
    signIn: 'Đăng nhập',
    alreadyHaveAccount: 'Đã có tài khoản? ',
    termsOfService: 'Điều khoản Dịch vụ',
    privacyPolicy: 'Chính sách Quyền riêng tư',
    byContinuingAgree: 'Bằng việc tiếp tục, bạn đồng ý với ',
    inkognitoMode: 'Chế độ Ink-ognito',
    inkognitoDescription: 'Thiết kế của bạn ở với bạn, không phải với chúng tôi.',
    signInToContinue:
      'Vui lòng đăng nhập để tiếp tục và tạo hình xăm của bạn!',
    signInBenefit:
      'Bằng việc đăng nhập, chúng tôi có thể theo dõi số lần tạo hình xăm miễn phí và đảm bảo tài khoản của bạn được thiết lập đúng cách.',
    notSignedIn: '(Chưa đăng nhập)',
  },

  profile: {
    // Screen header
    title: 'Hồ sơ',

    // Section headers
    account: 'Tài khoản',
    planAndUsage: 'Gói & Sử dụng',
    settings: 'Cài đặt',
    support: 'Hỗ trợ',
    legal: 'Pháp lý',
    dangerZone: 'Vùng nguy hiểm',
    supportAndFeedback: 'Hỗ trợ & Phản hồi',
    followUs: 'Theo dõi chúng tôi',

    // Sign-in prompt
    notSignedIn: 'Chưa đăng nhập',
    signInPrompt:
      'Đăng nhập để truy cập thông tin tài khoản, đăng ký và các tính năng được cá nhân hóa',

    // Account
    email: 'Email',
    name: 'Tên',
    model: 'Mô hình',
    userId: 'Mã người dùng',
    memberSince: 'Thành viên từ',
    signOut: 'Đăng xuất',
    logOut: 'Đăng xuất',
    signOutConfirmTitle: 'Đăng xuất',
    signOutConfirmMessage: 'Bạn có chắc muốn đăng xuất không?',
    unknownUser: 'Người dùng không xác định',

    // Plan
    plan: 'Gói',
    activeUsagePeriod: 'Chu kỳ sử dụng hiện tại',
    currentPlan: 'Gói hiện tại',
    planDetails: 'Chi tiết gói',
    status: 'Trạng thái',
    renewsOn: 'Gia hạn vào',
    expiresOn: 'Hết hạn vào',
    daysRemaining: 'Số ngày còn lại',
    daysValue: '{{count}} ngày',
    price: 'Giá',
    billingPeriod: 'Chu kỳ thanh toán',
    managePlan: 'Quản lý gói',
    upgradePlan: 'Nâng cấp gói',
    upgradeNow: 'Nâng cấp ngay',
    limitReachedFooter:
      'Bạn đã đạt giới hạn tạo hình. Nâng cấp để tiếp tục.',
    noSubscription: 'Không có đăng ký',
    cancelledActive: 'Đã hủy (Vẫn hoạt động)',
    cancelledActiveUntilExpiration: 'Đã hủy (Hoạt động đến khi hết hạn)',
    activeUntilExpiration: 'Hoạt động đến khi hết hạn',
    accessEndsOn: 'Quyền truy cập kết thúc vào',
    autoRenew: 'Tự động gia hạn',
    cancelledAt: 'Đã hủy vào',
    expiredOn: 'Hết hạn vào',
    refreshing: 'Đang làm mới...',
    refreshData: 'Làm mới dữ liệu',
    limitReachedFooterLong:
      'Bạn đã đạt giới hạn tạo hình xăm AI cho gói này. Nâng cấp để tiếp tục tạo hình xăm hoặc liên hệ với chúng tôi.',
    weMissYouFooter:
      'Sẵn sàng tạo thêm hình xăm tuyệt vời chưa? Quay lại và cùng thiết kế điều gì đó đặc biệt nhé.',
    unknown: 'Không xác định',
    free: 'Miễn phí',
    pro: 'Pro',
    active: 'Đang hoạt động',
    expired: 'Đã hết hạn',
    cancelled: 'Đã hủy',
    generationsUsed: 'Số lần đã dùng',
    generationsRemaining: 'Số lần còn lại',
    unlimited: 'Không giới hạn',
    na: 'N/A',

    // We Miss You
    weMissYou: 'Chúng tôi nhớ bạn!',
    previousPlan: 'Gói trước đó',
    comeBackAndCreate: 'Quay lại & Sáng tạo',

    // Enjoying the app
    enjoyingApp: 'Bạn thích ứng dụng chứ?',
    enjoyingAppDescription:
      'Nếu bạn thích Tattoo Design AI, một đánh giá sẽ giúp những người yêu hình xăm khác tìm thấy chúng tôi. Bạn cũng có thể gửi phản hồi hoặc ý tưởng tính năng bất cứ lúc nào.',
    rateOnPlayStore: 'Đánh giá trên Play Store',
    rateOnAppStore: 'Đánh giá trên App Store',
    sendFeedback: 'Gửi phản hồi',

    // Are you an artist
    areYouArtist: 'Bạn là nghệ sĩ?',
    artistDescription:
      'Quan tâm đến việc hợp tác? Có góp ý hoặc khiếu nại? Chúng tôi rất muốn nghe từ bạn!',
    writeToUs: 'Viết cho chúng tôi',

    // Support
    contactSupport: 'Liên hệ Hỗ trợ',
    requestFeature: 'Yêu cầu tính năng mới',
    rateApp: 'Đánh giá ứng dụng',
    shareApp: 'Chia sẻ ứng dụng',
    shareWithFriends: 'Chia sẻ với bạn bè',
    shareMessage: 'Hãy thử Tattoo Design AI nhé \n',

    // Settings
    appearance: 'Giao diện',
    light: 'Sáng',
    dark: 'Tối',
    system: 'Theo hệ thống',
    language: 'Ngôn ngữ',
    languageAuto: 'Tự động (Theo hệ thống)',
    showOnboarding: 'Hiển thị hướng dẫn',
    promptEnhancement: 'Cải thiện câu lệnh',
    promptEnhancementDisabledTitle: 'Đã tắt cải thiện câu lệnh',
    promptEnhancementDisabledMessage:
      'Kết quả có thể khác nhau khi không có cải thiện. Bạn có thể bật lại bất cứ lúc nào.',

    // Legal
    termsOfService: 'Điều khoản Dịch vụ',
    privacyPolicy: 'Chính sách Quyền riêng tư',

    // Danger
    deleteAccount: 'Xóa tài khoản',
    deleteAccountConfirmTitle: 'Xóa tài khoản',
    deleteAccountConfirmMessage:
      'Bạn có chắc không? Hành động này không thể hoàn tác. Lưu ý: điều này KHÔNG hủy các đăng ký đang hoạt động.',
    dangerZoneFooter:
      'Xóa tài khoản là vĩnh viễn. Điều này KHÔNG hủy các đăng ký đang hoạt động.',
    resetOnboarding: 'Đặt lại hướng dẫn',

    // Version
    version: 'Phiên bản',
  },

  emails: {
    support: {
      subject: 'Yêu cầu Hỗ trợ ứng dụng Tattoo Design AI',
      body: 'Xin chào,\n\nTôi cần hỗ trợ với ứng dụng Tattoo Design AI.\n\n{{userInfo}}\n\nMô tả:\n[Vui lòng mô tả vấn đề của bạn ở đây]\n\nCảm ơn!',
    },
    featureRequest: {
      subject: 'Hỗ trợ Yêu cầu tính năng Tattoo Design AI',
      body: 'Xin chào,\n\nTôi cần hỗ trợ gửi yêu cầu tính năng.\n\n',
    },
    feedback: {
      subject: 'Phản hồi về Tattoo Design AI',
      body: 'Xin chào!\n\nTôi có phản hồi về Tattoo Design AI:\n\n[Phản hồi của bạn ở đây]{{userInfo}}\n\nCảm ơn!',
    },
    artist: {
      subject: 'Bạn là nghệ sĩ? - Tattoo Design AI',
      body: 'Xin chào!\n\nTôi quan tâm đến việc hợp tác hoặc có góp ý/khiếu nại.\n\n{{userInfo}}\n\n[Vui lòng chia sẻ góp ý, khiếu nại, hoặc giới thiệu về bạn với tư cách nghệ sĩ]\n\nCảm ơn!',
    },
    userIdLabel: 'Mã người dùng: {{id}}',
    emailLabel: 'Email: {{email}}',
    accountLabel: 'Email tài khoản của tôi: {{email}}',
    myUserIdLabel: 'Mã người dùng của tôi: {{id}}',
    accountInfo: '\n\nTài khoản: {{email}}',
  },

  notFound: {
    title: 'Ôi!',
    description: 'Màn hình này không tồn tại.',
    goHome: 'Về trang chủ!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'Bắt đầu nào',
    photoAccessDescription:
      'Chúng tôi cần quyền truy cập ảnh của bạn để thêm hình ảnh',
    photoAccessDeniedTitle: 'Cần quyền truy cập Ảnh',
    photoAccessDeniedDescription:
      'Tính năng này cần quyền truy cập thư viện ảnh để xem và lưu hình xăm. Bạn có thể quản lý quyền truy cập ảnh trong cài đặt thiết bị.',
    photoLibraryNeeded:
      'Chúng tôi cần quyền truy cập thư viện ảnh để bạn có thể xem và lưu hình xăm.',

    // Camera
    cameraAccessTitle: 'Bắt đầu nào',
    cameraAccessDescription:
      'Chúng tôi cần quyền truy cập camera để chụp ảnh.',
    cameraAccessDeniedTitle: 'Cần quyền truy cập Camera',
    cameraAccessDeniedDescription:
      'Tính năng này cần quyền truy cập camera. Bạn có thể quản lý quyền truy cập camera trong cài đặt thiết bị.',
  },
};
