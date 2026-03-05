package expo.modules.tiktokbusiness

import android.util.Log
import com.tiktok.TikTokBusinessSdk
import com.tiktok.TikTokBusinessSdk.TTConfig
import com.tiktok.TikTokBusinessSdk.LogLevel
import expo.modules.kotlin.modules.Module
import expo.modules.kotlin.modules.ModuleDefinition
import org.json.JSONObject

class TiktokBusinessModule : Module() {
  override fun definition() = ModuleDefinition {
    Name("TiktokBusiness")

    AsyncFunction("initialize") { config: Map<String, Any> ->
      try {
        val appId = config["appId"] as? String
        val tiktokAppId = config["tiktokAppId"] as? String

        if (appId.isNullOrEmpty() || tiktokAppId.isNullOrEmpty()) {
          return@AsyncFunction false
        }

        val context = appContext.reactContext?.applicationContext
          ?: return@AsyncFunction false

        val debugMode = config["debugMode"] as? Boolean ?: false

        val ttConfig = TTConfig(context)
        ttConfig.setAppId(appId)
        ttConfig.setTTAppId(tiktokAppId)

        if (debugMode) {
          ttConfig.setLogLevel(LogLevel.DEBUG)
        }

        TikTokBusinessSdk.initializeSdk(ttConfig)
        return@AsyncFunction true
      } catch (e: Exception) {
        Log.e("TiktokBusiness", "Error initializing TikTok SDK: ${e.message}")
        return@AsyncFunction false
      }
    }

    AsyncFunction("trackEvent") { eventName: String, eventData: Map<String, Any>? ->
      try {
        val jsonProps = if (eventData != null) JSONObject(eventData) else null
        TikTokBusinessSdk.trackEvent(eventName, jsonProps)
        return@AsyncFunction true
      } catch (e: Exception) {
        Log.e("TiktokBusiness", "Error tracking event: ${e.message}")
        return@AsyncFunction false
      }
    }
  }
}
