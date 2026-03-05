import ExpoModulesCore
import TikTokBusinessSDK

public class TiktokBusinessModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TiktokBusiness")

    AsyncFunction("initialize") { (config: [String: Any], promise: Promise) in
      guard let appId = config["appId"] as? String,
            let tiktokAppId = config["tiktokAppId"] as? String else {
        promise.resolve(false)
        return
      }

      guard let sdkConfig = TikTokConfig(appId: appId, tiktokAppId: tiktokAppId) else {
        promise.resolve(false)
        return
      }

      if let debugMode = config["debugMode"] as? Bool, debugMode {
        sdkConfig.enableDebugMode()
      }

      TikTokBusiness.initializeSdk(sdkConfig) { success, error in
        if !success {
          print("TikTok SDK init failed: \(error?.localizedDescription ?? "unknown")")
        }
        if success && TikTokBusiness.isDebugMode() {
          print("TikTok SDK test event code: \(TikTokBusiness.getTestEventCode() ?? "none")")
        }
        promise.resolve(success)
      }
    }

    Function("getTestEventCode") { () -> String? in
      return TikTokBusiness.getTestEventCode()
    }

    AsyncFunction("trackEvent") { (eventName: String, eventData: [String: Any]) -> Bool in
      TikTokBusiness.trackEvent(eventName, withProperties: eventData)
      return true
    }
  }
}
