import { NativeModule, requireNativeModule } from "expo";

declare class TiktokBusinessModule extends NativeModule {
  initialize(config: {
    appId: string;
    tiktokAppId: string;
    debugMode?: boolean;
  }): Promise<boolean>;
  getTestEventCode(): string | null;
  trackEvent(eventName: string, eventData: Record<string, any>): Promise<boolean>;
}

export default requireNativeModule<TiktokBusinessModule>("TiktokBusiness");
