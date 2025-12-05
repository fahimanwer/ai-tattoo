import Foundation

struct InspirationTattoo {
    let id: Int
    let title: String
    let style: String
    let imageUrl: String
}

let inspirationTattoos: [InspirationTattoo] = [
    InspirationTattoo(id: 1, title: "Aesthetic", style: "Aesthetic", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/aesthetic.avif"),
    InspirationTattoo(id: 2, title: "Anime", style: "Anime", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/anime.avif"),
    InspirationTattoo(id: 3, title: "Blackwork", style: "Blackwork", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/blackwork.avif"),
    InspirationTattoo(id: 4, title: "Chicano", style: "Chicano", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/chicano.avif"),
    InspirationTattoo(id: 5, title: "Couples", style: "Couples", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/couples.avif"),
    InspirationTattoo(id: 6, title: "Hindu", style: "Hindu Goddess / Hindu Art", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/hindu.avif"),
    InspirationTattoo(id: 7, title: "Japanese", style: "Japanese", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/japanese.avif"),
    InspirationTattoo(id: 8, title: "Mini", style: "Mini", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/mini.avif"),
    InspirationTattoo(id: 9, title: "Neo Traditional", style: "Neo Traditional", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/neo-traditional.avif"),
    InspirationTattoo(id: 10, title: "Old School", style: "Old School", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/oldschool.avif"),
    InspirationTattoo(id: 11, title: "Patchwork", style: "Patchwork", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/patchwork.avif"),
    InspirationTattoo(id: 12, title: "Pattern", style: "Pattern", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/pattern.avif"),
    InspirationTattoo(id: 13, title: "Realistic", style: "Realism / Photorealism", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/realistic.avif"),
    InspirationTattoo(id: 14, title: "Watercolor", style: "Watercolor", imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/watercolor.avif"),
]

func getDailyInspiration() -> InspirationTattoo {
    let calendar = Calendar.current
    let dayOfYear = calendar.ordinality(of: .day, in: .year, for: Date()) ?? 1
    let index = (dayOfYear - 1) % inspirationTattoos.count
    return inspirationTattoos[index]
}
