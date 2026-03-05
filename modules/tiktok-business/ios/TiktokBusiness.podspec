Pod::Spec.new do |s|
  s.name           = 'TiktokBusiness'
  s.version        = '1.0.0'
  s.summary        = 'TikTok Business SDK wrapper for Expo'
  s.description    = 'Expo module wrapping the TikTok Business SDK for ad tracking and conversions'
  s.author         = ''
  s.homepage       = 'https://docs.expo.dev/modules/'
  s.platforms      = {
    :ios => '15.1',
    :tvos => '15.1'
  }
  s.source         = { git: '' }
  s.static_framework = true

  s.dependency 'ExpoModulesCore'
  s.dependency 'TikTokBusinessSDK'

  s.pod_target_xcconfig = {
    'DEFINES_MODULE' => 'YES',
  }

  s.source_files = "**/*.{h,m,mm,swift,hpp,cpp}"
end
