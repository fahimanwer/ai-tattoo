import WidgetKit
import SwiftUI

// MARK: - App Group
private let appGroupIdentifier = "group.codewithbeto.aitattoo"

// MARK: - Timeline Provider
struct Provider: TimelineProvider {
    
    func placeholder(in context: Context) -> DailyInspirationEntry {
        DailyInspirationEntry(date: Date(), tattoo: inspirationTattoos[0], localImageURL: nil)
    }

    func getSnapshot(in context: Context, completion: @escaping (DailyInspirationEntry) -> Void) {
        let tattoo = getDailyInspiration()
        // For snapshot, try to load cached image or return without image
        let cachedURL = getCachedImageURL()
        completion(DailyInspirationEntry(date: Date(), tattoo: tattoo, localImageURL: cachedURL))
    }
    
    func getTimeline(in context: Context, completion: @escaping (Timeline<DailyInspirationEntry>) -> Void) {
        let currentDate = Date()
        let tattoo = getDailyInspiration()
        
        // Download the image
        guard let imageURL = URL(string: tattoo.imageUrl) else {
            let entry = DailyInspirationEntry(date: currentDate, tattoo: tattoo, localImageURL: nil)
            let timeline = Timeline(entries: [entry], policy: .after(getNextMidnight()))
            completion(timeline)
            return
        }
        
        downloadImage(from: imageURL) { localURL in
            let entry = DailyInspirationEntry(date: currentDate, tattoo: tattoo, localImageURL: localURL)
            let timeline = Timeline(entries: [entry], policy: .after(getNextMidnight()))
            completion(timeline)
        }
    }
    
    // MARK: - Helpers
    
    private func getNextMidnight() -> Date {
        let calendar = Calendar.current
        return calendar.startOfDay(for: calendar.date(byAdding: .day, value: 1, to: Date())!)
    }
    
    private func getCachedImageURL() -> URL? {
        guard let container = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupIdentifier) else {
            return nil
        }
        let fileURL = container.appendingPathComponent("widget-bg.png")
        return FileManager.default.fileExists(atPath: fileURL.path) ? fileURL : nil
    }
    
    private func downloadImage(from url: URL, completion: @escaping (URL?) -> Void) {
        URLSession.shared.dataTask(with: url) { data, _, error in
            guard let data = data, error == nil else {
                completion(getCachedImageURL()) // Fall back to cached image
                return
            }
            
            // Save to App Group container
            guard let container = FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroupIdentifier) else {
                completion(nil)
                return
            }
            
            let fileURL = container.appendingPathComponent("widget-bg.png")
            
            do {
                try data.write(to: fileURL)
                completion(fileURL)
            } catch {
                completion(getCachedImageURL())
            }
        }.resume()
    }
}

// MARK: - Entry
struct DailyInspirationEntry: TimelineEntry {
    let date: Date
    let tattoo: InspirationTattoo
    let localImageURL: URL?
}

// MARK: - Widget View
struct DailyInspirationWidgetView: View {
    var entry: Provider.Entry
    @Environment(\.widgetFamily) var family

    var body: some View {
        switch family {
        case .systemSmall:
            SmallWidgetView(entry: entry)
        case .systemMedium:
            MediumWidgetView(entry: entry)
        case .systemLarge:
            LargeWidgetView(entry: entry)
        default:
            SmallWidgetView(entry: entry)
        }
    }
}

// MARK: - Background Image Helper
struct WidgetBackgroundImage: View {
    let url: URL?
    let size: CGSize
    
    var body: some View {
        if let url = url,
           let uiImage = UIImage(contentsOfFile: url.path) {
            Image(uiImage: uiImage)
                .resizable()
                .aspectRatio(contentMode: .fill)
                .frame(width: size.width, height: size.height)
                .clipped()
        } else {
            Color.black
        }
    }
}

// MARK: - Small Widget
struct SmallWidgetView: View {
    let entry: DailyInspirationEntry
    
    var body: some View {
        GeometryReader { geo in
            ZStack {
                // Background image
                WidgetBackgroundImage(url: entry.localImageURL, size: geo.size)
                
                // Gradient overlay
                LinearGradient(
                    colors: [.clear, .black.opacity(0.7)],
                    startPoint: .top,
                    endPoint: .bottom
                )
                
                // Content
                VStack {
                    Spacer()
                    
                    Text("Daily Inspiration")
                        .font(.caption2)
                        .fontWeight(.medium)
                        .foregroundStyle(.white.opacity(0.8))
                    
                    Text(entry.tattoo.title)
                        .font(.headline)
                        .fontWeight(.bold)
                        .foregroundStyle(.white)
                }
                .padding(12)
            }
        }
    }
}

// MARK: - Medium Widget
struct MediumWidgetView: View {
    let entry: DailyInspirationEntry
    
    var body: some View {
        GeometryReader { geo in
            ZStack {
                // Background image
                WidgetBackgroundImage(url: entry.localImageURL, size: geo.size)
                
                // Gradient overlay
                LinearGradient(
                    colors: [.clear, .black.opacity(0.8)],
                    startPoint: .leading,
                    endPoint: .trailing
                )
                
                // Content
                HStack {
                    Spacer()
                    
                    VStack(alignment: .trailing, spacing: 6) {
                        Text("Daily Inspiration")
                            .font(.caption)
                            .fontWeight(.medium)
                            .foregroundStyle(.white.opacity(0.7))
                        
                        Text(entry.tattoo.title)
                            .font(.title2)
                            .fontWeight(.bold)
                            .foregroundStyle(.white)
                        
                        Text(entry.tattoo.style)
                            .font(.caption)
                            .foregroundStyle(.white.opacity(0.6))
                        
                        Spacer()
                        
                        Text("Tap to create →")
                            .font(.caption2)
                            .foregroundStyle(.white.opacity(0.5))
                    }
                    .padding(16)
                }
            }
        }
    }
}

// MARK: - Large Widget
struct LargeWidgetView: View {
    let entry: DailyInspirationEntry
    
    var body: some View {
        GeometryReader { geo in
            ZStack {
                // Background image
                WidgetBackgroundImage(url: entry.localImageURL, size: geo.size)
                
                // Gradient overlay
                LinearGradient(
                    colors: [.clear, .clear, .black.opacity(0.8)],
                    startPoint: .top,
                    endPoint: .bottom
                )
                
                // Content
                VStack(alignment: .leading) {
                    Spacer()
                    
                    Text("Daily Inspiration")
                        .font(.subheadline)
                        .fontWeight(.medium)
                        .foregroundStyle(.white.opacity(0.8))
                    
                    Text(entry.tattoo.title)
                        .font(.largeTitle)
                        .fontWeight(.bold)
                        .foregroundStyle(.white)
                    
                    Text(entry.tattoo.style)
                        .font(.body)
                        .foregroundStyle(.white.opacity(0.7))
                    
                    Spacer()
                        .frame(height: 16)
                    
                    HStack {
                        Text("Tap to create your own")
                            .font(.footnote)
                            .foregroundStyle(.white.opacity(0.6))
                        
                        Spacer()
                        
                        Image(systemName: "arrow.right.circle.fill")
                            .font(.title3)
                            .foregroundStyle(.white.opacity(0.8))
                    }
                }
                .frame(maxWidth: .infinity, alignment: .leading)
                .padding(20)
            }
        }
    }
}

// MARK: - Widget Configuration
struct DailyInspirationWidget: Widget {
    let kind: String = "DailyInspirationWidget"

    var body: some WidgetConfiguration {
        StaticConfiguration(kind: kind, provider: Provider()) { entry in
            DailyInspirationWidgetView(entry: entry)
                .containerBackground(.black, for: .widget)
                .widgetURL(URL(string: "ai-tattoo://(playground)"))
        }
        .configurationDisplayName("Daily Inspiration")
        .description("Get daily tattoo inspiration and tap to create your own.")
        .supportedFamilies([.systemSmall, .systemMedium, .systemLarge])
        .contentMarginsDisabled()
    }
}

// MARK: - Previews
#Preview(as: .systemSmall) {
    DailyInspirationWidget()
} timeline: {
    DailyInspirationEntry(date: .now, tattoo: inspirationTattoos[0], localImageURL: nil)
}

#Preview(as: .systemMedium) {
    DailyInspirationWidget()
} timeline: {
    DailyInspirationEntry(date: .now, tattoo: inspirationTattoos[0], localImageURL: nil)
}

#Preview(as: .systemLarge) {
    DailyInspirationWidget()
} timeline: {
    DailyInspirationEntry(date: .now, tattoo: inspirationTattoos[0], localImageURL: nil)
}
