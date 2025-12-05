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
    ZStack {
      // Content only — background applied via containerBackground
      content
    }
    .containerBackground(for: .widget) {
      backgroundView   // Full bleed
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
            Color(red: 0.15, green: 0.1, blue: 0.2),
            Color(red: 0.05, green: 0.05, blue: 0.1)
          ],
          startPoint: .topLeading,
          endPoint: .bottomTrailing
        )
        
        Image(systemName: "sparkles")
          .font(.system(size: 50))
          .foregroundColor(.white.opacity(0.15))
      }
    }
  }
  
  // MARK: Foreground Content
  @ViewBuilder
  private var content: some View {
    LinearGradient(
      colors: [.clear, .black.opacity(0.0)],
      startPoint: .top,
      endPoint: .bottom
    )
    
    VStack(alignment: family == .systemMedium ? .trailing : .leading) {
      Spacer()
      
      Text("Daily Inspiration")
        .font(family == .systemLarge ? .subheadline : .caption2)
        .fontWeight(.medium)
        .foregroundColor(.white.opacity(0.8))
      
      Text(entry.tattoo.title)
        .font(family == .systemLarge ? .title :
                (family == .systemMedium ? .title3 : .headline))
        .fontWeight(.bold)
        .foregroundColor(.white)
      
      if family != .systemSmall {
        Text(entry.tattoo.style)
          .font(family == .systemLarge ? .body : .caption)
          .foregroundColor(.white.opacity(0.6))
      }
      
      if family == .systemLarge {
        Spacer().frame(height: 12)
        
        HStack {
          Text("Tap to create your own")
            .font(.footnote)
            .foregroundColor(.white.opacity(0.6))
          
          Spacer()
          
          Image(systemName: "arrow.right.circle.fill")
            .font(.title3)
            .foregroundColor(.white.opacity(0.8))
        }
      }
    }
    .frame(maxWidth: .infinity, maxHeight: .infinity,
           alignment: family == .systemMedium ? .bottomTrailing : .bottomLeading)
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
