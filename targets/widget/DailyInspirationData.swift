import Foundation

struct InspirationTattoo {
    let id: Int
    let title: String
    let style: String
    let imageUrl: String
}

// Extracted from featured-tattoos.ts
let inspirationTattoos: [InspirationTattoo] = [
    InspirationTattoo(id: 1, title: "Japanese", style: "Japanese", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/japanese-2/cover.png"),
    InspirationTattoo(id: 2, title: "Realistic", style: "Photorealism", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/photorealism-2/cover.png"),
    InspirationTattoo(id: 3, title: "Blackwork", style: "Solid Black", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/solid-black-2/cover.png"),
    InspirationTattoo(id: 4, title: "Old School", style: "Old School", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/old-school-2/cover.png"),
    InspirationTattoo(id: 5, title: "Neo Traditional", style: "Neo Traditional", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/neo-traditional-2/cover.png"),
    InspirationTattoo(id: 6, title: "Watercolor", style: "Watercolor", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/watercolor-2/cover.png"),
    InspirationTattoo(id: 7, title: "Couples", style: "Couples / Matching", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/couples/cover.png"),
    InspirationTattoo(id: 8, title: "Hindu Goddess", style: "Hindu Goddess / Mythological", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/hindu-goddess/cover.png"),
    InspirationTattoo(id: 9, title: "Chicano", style: "Chicano", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/chicano/cover.png"),
    InspirationTattoo(id: 10, title: "Mini", style: "Mini", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mini/cover.png"),
    InspirationTattoo(id: 11, title: "Aesthetic", style: "Aesthetic", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/aesthetic/cover.png"),
    InspirationTattoo(id: 12, title: "Anime", style: "Anime", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/anime-2/cover.png"),
    InspirationTattoo(id: 13, title: "Geometric Animal", style: "Geometric Animal", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/geometric-animals/cover.png"),
    InspirationTattoo(id: 14, title: "Patchwork", style: "Patchwork", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/patchwork/cover.png"),
]

func getDailyInspiration() -> InspirationTattoo {
    let calendar = Calendar.current
    let dayOfYear = calendar.ordinality(of: .day, in: .year, for: Date()) ?? 1
    let index = (dayOfYear - 1) % inspirationTattoos.count
    return inspirationTattoos[index]
}
