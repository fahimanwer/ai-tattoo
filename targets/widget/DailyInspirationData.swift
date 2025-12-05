import Foundation

struct InspirationTattoo {
    let id: Int
    let title: String
    let style: String
    let imageUrl: String
}

let inspirationTattoos: [InspirationTattoo] = [
    InspirationTattoo(id: 1, title: "Japanese", style: "Japanese", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/demos/test-image-widget-2.avif")
]

func getDailyInspiration() -> InspirationTattoo {
    let calendar = Calendar.current
    let dayOfYear = calendar.ordinality(of: .day, in: .year, for: Date()) ?? 1
    let index = (dayOfYear - 1) % inspirationTattoos.count
    return inspirationTattoos[index]
}
