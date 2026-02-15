/**
 * Thai translations - Core namespaces
 *
 * Namespaces: common, tabs, navigation, auth, profile, settings
 * Feature namespaces are in ./features.ts
 */

export const thCore = {
  common: {
    // Actions
    loading: 'กำลังโหลด...',
    error: 'ข้อผิดพลาด',
    success: 'สำเร็จ',
    cancel: 'ยกเลิก',
    confirm: 'ยืนยัน',
    save: 'บันทึก',
    done: 'เสร็จสิ้น',
    close: 'ปิด',
    back: 'กลับ',
    next: 'ถัดไป',
    skip: 'ข้าม',
    continue: 'ดำเนินการต่อ',
    retry: 'ลองใหม่',
    delete: 'ลบ',
    edit: 'แก้ไข',
    share: 'แชร์',
    send: 'ส่ง',
    search: 'ค้นหา',
    seeAll: 'ดูทั้งหมด',
    tryAgain: 'ลองอีกครั้ง',
    ok: 'ตกลง',
    yes: 'ใช่',
    no: 'ไม่',
    or: 'หรือ',
    upgrade: 'อัปเกรด',
    processing: 'กำลังประมวลผล...',
    openSettings: 'เปิดการตั้งค่า',
    readMore: 'อ่านเพิ่มเติม',
    createTattoo: 'สร้างรอยสัก',
    style: 'สไตล์',

    // States
    on: 'เปิด',
    off: 'ปิด',
    enabled: 'เปิดใช้งาน',
    disabled: 'ปิดใช้งาน',

    // Errors
    somethingWentWrong: 'เกิดข้อผิดพลาดบางอย่าง',
    unexpectedError: 'เกิดข้อผิดพลาดที่ไม่คาดคิด',
  },

  tabs: {
    home: 'หน้าแรก',
    explore: 'สำรวจ',
    myTattoos: 'รอยสักของฉัน',
    profile: 'โปรไฟล์',
    tryOnTattoo: 'ลองรอยสัก',
  },

  navigation: {
    appName: 'Tattoo Design AI',
  },

  auth: {
    welcomeBack: 'ยินดีต้อนรับกลับมา!',
    signInDescription: 'กรุณาเลือกวิธีเข้าสู่ระบบที่คุณต้องการ',
    signIn: 'เข้าสู่ระบบ',
    alreadyHaveAccount: 'มีบัญชีอยู่แล้ว? ',
    termsOfService: 'ข้อกำหนดการใช้บริการ',
    privacyPolicy: 'นโยบายความเป็นส่วนตัว',
    byContinuingAgree: 'การดำเนินการต่อแสดงว่าคุณยอมรับ ',
    inkognitoMode: 'โหมด Ink-ognito',
    inkognitoDescription: 'ดีไซน์ของคุณอยู่กับคุณ ไม่ใช่กับเรา',
    signInToContinue:
      'กรุณาเข้าสู่ระบบเพื่อดำเนินการต่อและสร้างรอยสักของคุณ!',
    signInBenefit:
      'การเข้าสู่ระบบช่วยให้เราติดตามจำนวนครั้งที่สร้างรอยสักฟรีของคุณ และตั้งค่าบัญชีของคุณอย่างเหมาะสม',
    notSignedIn: '(ยังไม่ได้เข้าสู่ระบบ)',
  },

  profile: {
    // Screen header
    title: 'โปรไฟล์',

    // Section headers
    account: 'บัญชี',
    planAndUsage: 'แพ็กเกจและการใช้งาน',
    settings: 'การตั้งค่า',
    support: 'ช่วยเหลือ',
    legal: 'ข้อกฎหมาย',
    dangerZone: 'โซนอันตราย',
    supportAndFeedback: 'ช่วยเหลือและความคิดเห็น',
    followUs: 'ติดตามเรา',

    // Sign-in prompt
    notSignedIn: 'ยังไม่ได้เข้าสู่ระบบ',
    signInPrompt:
      'เข้าสู่ระบบเพื่อเข้าถึงรายละเอียดบัญชี ข้อมูลการสมัครสมาชิก และฟีเจอร์ที่ปรับแต่งเฉพาะคุณ',

    // Account
    email: 'อีเมล',
    name: 'ชื่อ',
    model: 'โมเดล',
    userId: 'รหัสผู้ใช้',
    memberSince: 'เป็นสมาชิกตั้งแต่',
    signOut: 'ออกจากระบบ',
    logOut: 'ออกจากระบบ',
    signOutConfirmTitle: 'ออกจากระบบ',
    signOutConfirmMessage: 'คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?',
    unknownUser: 'ผู้ใช้ไม่ทราบชื่อ',

    // Plan
    plan: 'แพ็กเกจ',
    activeUsagePeriod: 'ช่วงเวลาการใช้งาน',
    currentPlan: 'แพ็กเกจปัจจุบัน',
    planDetails: 'รายละเอียดแพ็กเกจ',
    status: 'สถานะ',
    renewsOn: 'ต่ออายุวันที่',
    expiresOn: 'หมดอายุวันที่',
    daysRemaining: 'วันที่เหลือ',
    daysValue: '{{count}} วัน',
    price: 'ราคา',
    billingPeriod: 'รอบการเรียกเก็บเงิน',
    managePlan: 'จัดการแพ็กเกจ',
    upgradePlan: 'อัปเกรดแพ็กเกจ',
    upgradeNow: 'อัปเกรดเลย',
    limitReachedFooter:
      'คุณถึงขีดจำกัดการสร้างแล้ว อัปเกรดเพื่อใช้งานต่อ',
    noSubscription: 'ไม่มีการสมัครสมาชิก',
    cancelledActive: 'ยกเลิกแล้ว (ยังใช้งานได้)',
    cancelledActiveUntilExpiration: 'ยกเลิกแล้ว (ใช้งานได้จนหมดอายุ)',
    activeUntilExpiration: 'ใช้งานได้จนหมดอายุ',
    accessEndsOn: 'สิ้นสุดการเข้าถึงวันที่',
    autoRenew: 'ต่ออายุอัตโนมัติ',
    cancelledAt: 'ยกเลิกเมื่อ',
    expiredOn: 'หมดอายุเมื่อ',
    refreshing: 'กำลังรีเฟรช...',
    refreshData: 'รีเฟรชข้อมูล',
    limitReachedFooterLong:
      'คุณถึงขีดจำกัดการสร้างรอยสักด้วย AI สำหรับแพ็กเกจนี้แล้ว อัปเกรดเพื่อสร้างรอยสักต่อหรือติดต่อเรา',
    weMissYouFooter:
      'พร้อมสร้างรอยสักสุดเจ๋งอีกครั้งไหม? กลับมาออกแบบงานสุดพิเศษด้วยกัน',
    unknown: 'ไม่ทราบ',
    free: 'ฟรี',
    pro: 'Pro',
    active: 'ใช้งานอยู่',
    expired: 'หมดอายุ',
    cancelled: 'ยกเลิกแล้ว',
    generationsUsed: 'จำนวนครั้งที่ใช้ไป',
    generationsRemaining: 'จำนวนครั้งที่เหลือ',
    unlimited: 'ไม่จำกัด',
    na: 'ไม่มีข้อมูล',

    // We Miss You
    weMissYou: 'เราคิดถึงคุณ!',
    previousPlan: 'แพ็กเกจก่อนหน้า',
    comeBackAndCreate: 'กลับมาสร้างสรรค์กัน',

    // Enjoying the app
    enjoyingApp: 'ชอบแอปนี้ไหม?',
    enjoyingAppDescription:
      'หากคุณชอบ Tattoo Design AI การรีวิวช่วยให้คนรักรอยสักคนอื่นค้นพบเรา คุณยังสามารถส่งความคิดเห็นหรือไอเดียฟีเจอร์ให้เราได้ตลอดเวลา',
    rateOnPlayStore: 'ให้คะแนนบน Play Store',
    rateOnAppStore: 'ให้คะแนนบน App Store',
    sendFeedback: 'ส่งความคิดเห็น',

    // Are you an artist
    areYouArtist: 'คุณเป็นศิลปินหรือเปล่า?',
    artistDescription:
      'สนใจร่วมงานกับเราไหม? มีข้อเสนอแนะหรือข้อร้องเรียน? เรายินดีรับฟัง!',
    writeToUs: 'เขียนถึงเรา',

    // Support
    contactSupport: 'ติดต่อฝ่ายสนับสนุน',
    requestFeature: 'ขอฟีเจอร์ใหม่',
    rateApp: 'ให้คะแนนแอป',
    shareApp: 'แชร์แอป',
    shareWithFriends: 'แชร์ให้เพื่อน',
    shareMessage: 'ลองดู Tattoo Design AI สิ \n',

    // Settings
    appearance: 'รูปลักษณ์',
    light: 'สว่าง',
    dark: 'มืด',
    system: 'ตามระบบ',
    language: 'ภาษา',
    languageAuto: 'อัตโนมัติ (ตามระบบ)',
    showOnboarding: 'แสดงการแนะนำ',
    promptEnhancement: 'การปรับปรุงคำสั่ง',
    promptEnhancementDisabledTitle: 'ปิดการปรับปรุงคำสั่งแล้ว',
    promptEnhancementDisabledMessage:
      'ผลลัพธ์อาจแตกต่างกันโดยไม่มีการปรับปรุง คุณสามารถเปิดกลับได้ตลอดเวลา',

    // Legal
    termsOfService: 'ข้อกำหนดการใช้บริการ',
    privacyPolicy: 'นโยบายความเป็นส่วนตัว',

    // Danger
    deleteAccount: 'ลบบัญชี',
    deleteAccountConfirmTitle: 'ลบบัญชี',
    deleteAccountConfirmMessage:
      'คุณแน่ใจหรือไม่? การดำเนินการนี้ไม่สามารถยกเลิกได้ หมายเหตุ: การนี้ไม่ได้ยกเลิกการสมัครสมาชิกที่ใช้งานอยู่',
    dangerZoneFooter:
      'การลบบัญชีเป็นการถาวร การนี้ไม่ได้ยกเลิกการสมัครสมาชิกที่ใช้งานอยู่',
    resetOnboarding: 'รีเซ็ตการแนะนำ',

    // Version
    version: 'เวอร์ชัน',
  },

  emails: {
    support: {
      subject: 'คำขอช่วยเหลือแอป Tattoo Design AI',
      body: 'สวัสดีครับ/ค่ะ\n\nฉันต้องการความช่วยเหลือเกี่ยวกับแอป Tattoo Design AI\n\n{{userInfo}}\n\nรายละเอียด:\n[กรุณาอธิบายปัญหาของคุณที่นี่]\n\nขอบคุณครับ/ค่ะ!',
    },
    featureRequest: {
      subject: 'ขอความช่วยเหลือเรื่องฟีเจอร์ Tattoo Design AI',
      body: 'สวัสดีครับ/ค่ะ\n\nฉันต้องการความช่วยเหลือในการส่งคำขอฟีเจอร์\n\n',
    },
    feedback: {
      subject: 'ความคิดเห็นเกี่ยวกับ Tattoo Design AI',
      body: 'สวัสดีครับ/ค่ะ!\n\nฉันมีความคิดเห็นเกี่ยวกับ Tattoo Design AI:\n\n[ความคิดเห็นของคุณที่นี่]{{userInfo}}\n\nขอบคุณครับ/ค่ะ!',
    },
    artist: {
      subject: 'คุณเป็นศิลปินหรือเปล่า? - Tattoo Design AI',
      body: 'สวัสดีครับ/ค่ะ!\n\nฉันสนใจร่วมงานหรือมีข้อเสนอแนะ/ข้อร้องเรียน\n\n{{userInfo}}\n\n[กรุณาแบ่งปันข้อเสนอแนะ ข้อร้องเรียน หรือเล่าเกี่ยวกับตัวคุณในฐานะศิลปิน]\n\nขอบคุณครับ/ค่ะ!',
    },
    userIdLabel: 'รหัสผู้ใช้: {{id}}',
    emailLabel: 'อีเมล: {{email}}',
    accountLabel: 'อีเมลบัญชีของฉัน: {{email}}',
    myUserIdLabel: 'รหัสผู้ใช้ของฉัน: {{id}}',
    accountInfo: '\n\nบัญชี: {{email}}',
  },

  notFound: {
    title: 'อุ๊ปส์!',
    description: 'ไม่มีหน้าจอนี้',
    goHome: 'ไปหน้าแรก!',
  },

  permissions: {
    // Photo library
    photoAccessTitle: 'เริ่มกันเลย',
    photoAccessDescription:
      'เราต้องการเข้าถึงรูปภาพของคุณเพื่อเพิ่มรูปภาพ',
    photoAccessDeniedTitle: 'ต้องการเข้าถึงรูปภาพ',
    photoAccessDeniedDescription:
      'ฟีเจอร์นี้ต้องการเข้าถึงคลังรูปภาพของคุณเพื่อดูและบันทึกรอยสัก คุณสามารถจัดการการเข้าถึงรูปภาพได้ในการตั้งค่าอุปกรณ์',
    photoLibraryNeeded:
      'เราต้องการเข้าถึงคลังรูปภาพของคุณเพื่อให้คุณดูและบันทึกรอยสักได้',

    // Camera
    cameraAccessTitle: 'เริ่มกันเลย',
    cameraAccessDescription:
      'เราต้องการเข้าถึงกล้องของคุณเพื่อถ่ายรูป',
    cameraAccessDeniedTitle: 'ต้องการเข้าถึงกล้อง',
    cameraAccessDeniedDescription:
      'ฟีเจอร์นี้ต้องการเข้าถึงกล้องของคุณ คุณสามารถจัดการการเข้าถึงกล้องได้ในการตั้งค่าอุปกรณ์',
  },
};
