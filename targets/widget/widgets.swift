import WidgetKit
import SwiftUI

// MARK: - Timeline Provider
struct Provider: TimelineProvider {
  
  func placeholder(in context: Context) -> DailyInspirationEntry {
    DailyInspirationEntry(date: Date(), tattoo: inspirationTattoos[0], imageData: nil)
  }
  
  func getSnapshot(in context: Context, completion: @escaping (DailyInspirationEntry) -> Void) {
    let tattoo = getRandomInspiration()
    var imageData: Data? = nil
    
    if let url = URL(string: tattoo.imageUrl) {
      imageData = try? Data(contentsOf: url)
    }
    
    completion(DailyInspirationEntry(date: Date(), tattoo: tattoo, imageData: imageData))
  }
  
  func getTimeline(in context: Context, completion: @escaping (Timeline<DailyInspirationEntry>) -> Void) {
    let currentDate = Date()
    let tattoo = getRandomInspiration()
    let nextRefresh = getNextMidnight()
    
    var imageData: Data? = nil
    if let url = URL(string: tattoo.imageUrl) {
      imageData = try? Data(contentsOf: url)
    }
    
    let entry = DailyInspirationEntry(date: currentDate, tattoo: tattoo, imageData: imageData)
    let timeline = Timeline(entries: [entry], policy: .after(nextRefresh))
    completion(timeline)
  }
  
  private func getRandomInspiration() -> InspirationTattoo {
    inspirationTattoos.randomElement() ?? inspirationTattoos[0]
  }
  
  private func getNextMidnight() -> Date {
    let calendar = Calendar.current
    return calendar.startOfDay(for: calendar.date(byAdding: .day, value: 1, to: Date())!)
  }
}

// MARK: - Entry
struct DailyInspirationEntry: TimelineEntry {
  let date: Date
  let tattoo: InspirationTattoo
  let imageData: Data?
}

// MARK: - Widget View
struct DailyInspirationWidgetView: View {
  var entry: Provider.Entry
  @Environment(\.widgetFamily) var family
  
  var body: some View {
    content
      .containerBackground(for: .widget) {
        ZStack {
          // Background image or placeholder
          backgroundView
          
          // Gradient overlay for legibility (full bleed)
          gradientOverlay
        }
      }
  }
  
  // MARK: Background View
  @ViewBuilder
  private var backgroundView: some View {
    if let data = entry.imageData,
       let img = UIImage(data: data) {
      Image(uiImage: img)
        .resizable()
        .scaledToFill()
    } else {
      ZStack {
        LinearGradient(
          colors: [
            Color(red: 0.08, green: 0.08, blue: 0.08),
            Color.black
          ],
          startPoint: .topLeading,
          endPoint: .bottomTrailing
        )
        
        Image(systemName: "sparkles")
          .font(.system(size: 50))
          .foregroundStyle(
            LinearGradient(
              colors: [.yellow.opacity(0.3), .orange.opacity(0.2)],
              startPoint: .topLeading,
              endPoint: .bottomTrailing
            )
          )
      }
    }
  }
  
  // MARK: Gradient Overlay (full bleed)
  @ViewBuilder
  private var gradientOverlay: some View {
    if family == .systemMedium {
      // Horizontal gradient from right to left for medium (text is on right)
      HStack(spacing: 0) {
        Spacer()
        LinearGradient(
          colors: [
            .clear,
            .black.opacity(0.5),
            .black.opacity(0.8)
          ],
          startPoint: .leading,
          endPoint: .trailing
        )
        .frame(width: 200)
      }
    } else {
      // Vertical gradient from bottom for small & large
      VStack(spacing: 0) {
        Spacer()
        LinearGradient(
          colors: [
            .clear,
            .black.opacity(0.4),
            .black.opacity(0.75)
          ],
          startPoint: .top,
          endPoint: .bottom
        )
        .frame(height: family == .systemLarge ? 160 : 80)
      }
    }
  }
  
  // MARK: Foreground Content
  @ViewBuilder
  private var content: some View {
    VStack(alignment: family == .systemMedium ? .trailing : .leading, spacing: 4) {
      Spacer()
      
      // Badge
      HStack(spacing: 4) {
        Image(systemName: "sparkle")
          .font(.system(size: family == .systemSmall ? 7 : 8, weight: .bold))
        Text("DAILY INSPIRATION")
          .font(.system(size: family == .systemSmall ? 7 : 8, weight: .bold))
          .tracking(0.5)
      }
      .foregroundColor(.yellow)
      
      // Title
      Text(entry.tattoo.title)
        .font(.system(size: titleSize, weight: .bold))
        .foregroundColor(.white)
        .shadow(color: .black.opacity(0.5), radius: 2, x: 0, y: 1)
      
      // Style (medium & large only)
      if family != .systemSmall {
        Text(entry.tattoo.style)
          .font(.system(size: family == .systemLarge ? 14 : 11, weight: .medium))
          .foregroundColor(.white.opacity(0.7))
      }
      
      // CTA (large only)
      if family == .systemLarge {
        Spacer().frame(height: 8)
        
        HStack(spacing: 6) {
          Text("Tap to create")
            .font(.system(size: 12, weight: .medium))
            .foregroundColor(.white.opacity(0.8))
          
          Image(systemName: "arrow.right")
            .font(.system(size: 10, weight: .bold))
            .foregroundColor(.yellow)
        }
      }
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity,
           alignment: family == .systemMedium ? .bottomTrailing : .bottomLeading)
  }
  
  // MARK: Helpers
  private var titleSize: CGFloat {
    switch family {
    case .systemSmall: return 15
    case .systemMedium: return 18
    case .systemLarge: return 24
    default: return 15
    }
  }
}

// MARK: - Widget Configuration
struct DailyInspirationWidget: Widget {
  let kind: String = "DailyInspirationWidget"
  
  var body: some WidgetConfiguration {
    StaticConfiguration(kind: kind, provider: Provider()) { entry in
      DailyInspirationWidgetView(entry: entry)
        .widgetURL(URL(string: "ai-tattoo://(playground)"))
    }
    .configurationDisplayName("Daily Inspiration")
    .description("Get daily tattoo inspiration and tap to create your own.")
    .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
  }
}

// MARK: - Previews
#Preview(as: .systemSmall) {
    DailyInspirationWidget()
} timeline: {
  DailyInspirationEntry(date: .now, tattoo: inspirationTattoos[0], imageData: nil)
}

#Preview(as: .systemMedium) {
    DailyInspirationWidget()
} timeline: {
    DailyInspirationEntry(date: .now, tattoo: inspirationTattoos[0], imageData: nil)
}

#Preview(as: .systemLarge) {
    DailyInspirationWidget()
} timeline: {
    DailyInspirationEntry(date: .now, tattoo: inspirationTattoos[0], imageData: nil)
}
