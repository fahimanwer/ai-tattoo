import Foundation

struct InspirationTattoo {
    let id: Int
    let title: String
    let style: String
    let styleId: Int  // Maps to featuredTattoos id in the app
    let imageUrl: String
}

// styleId maps to featuredTattoos.id in lib/featured-tattoos.ts
let inspirationTattoos: [InspirationTattoo] = [
    InspirationTattoo(id: 1, title: "Aesthetic", style: "Aesthetic", styleId: 11, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/aesthetic.avif"),
    InspirationTattoo(id: 2, title: "Anime", style: "Anime", styleId: 12, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/anime.avif"),
    InspirationTattoo(id: 3, title: "Blackwork", style: "Blackwork", styleId: 3, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/blackwork.avif"),
    InspirationTattoo(id: 4, title: "Chicano", style: "Chicano", styleId: 9, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/chicano.avif"),
    InspirationTattoo(id: 5, title: "Couples", style: "Couples", styleId: 7, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/couples.avif"),
    InspirationTattoo(id: 6, title: "Hindu", style: "Hindu Goddess", styleId: 8, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/hindu.avif"),
    InspirationTattoo(id: 7, title: "Japanese", style: "Japanese", styleId: 1, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/japanese.avif"),
    InspirationTattoo(id: 8, title: "Mini", style: "Mini", styleId: 10, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/mini.avif"),
    InspirationTattoo(id: 9, title: "Neo Traditional", style: "Neo Traditional", styleId: 5, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/neo-traditional.avif"),
    InspirationTattoo(id: 10, title: "Old School", style: "Old School", styleId: 4, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/oldschool.avif"),
    InspirationTattoo(id: 11, title: "Patchwork", style: "Patchwork", styleId: 14, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/patchwork.avif"),
    InspirationTattoo(id: 12, title: "Geometric", style: "Geometric Animal", styleId: 13, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/pattern.avif"),
    InspirationTattoo(id: 13, title: "Realistic", style: "Photorealism", styleId: 2, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/realistic.avif"),
    InspirationTattoo(id: 14, title: "Watercolor", style: "Watercolor", styleId: 6, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/widget/watercolor.avif"),
      
    InspirationTattoo(id: 15, title: "Sports", style: "Sports", styleId: 100, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/irish-fighter-back.avif"),
    InspirationTattoo(id: 16, title: "Sports", style: "Sports", styleId: 100, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/box-arm.avif"),
    InspirationTattoo(id: 17, title: "Sports", style: "Sports", styleId: 100, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/jump-full.avif"),
    InspirationTattoo(id: 18, title: "Sports", style: "Sports", styleId: 100, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/athletic/running-back.avif"),
    InspirationTattoo(id: 19, title: "Lifestyle", style: "Lifestyle", styleId: 101, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/woman-book-cafe.avif"),
    InspirationTattoo(id: 20, title: "Lifestyle", style: "Lifestyle", styleId: 101, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/urban-train.avif"),
    InspirationTattoo(id: 21, title: "Lifestyle", style: "Lifestyle", styleId: 101, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/travel-arm.avif"),
    InspirationTattoo(id: 22, title: "Lifestyle", style: "Lifestyle", styleId: 101, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/lifestyle/coffee-shop.avif"),
    InspirationTattoo(id: 23, title: "Mythology", style: "Mythology", styleId: 102, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/arm-boxing.avif"),
    InspirationTattoo(id: 24, title: "Mythology", style: "Mythology", styleId: 102, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/roman-arm.avif"),
    InspirationTattoo(id: 25, title: "Mythology", style: "Mythology", styleId: 102, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/mythology/back-gym.avif"),
    InspirationTattoo(id: 26, title: "Vintage Soul", style: "Vintage Soul", styleId: 200, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-camera-female.avif"),
    InspirationTattoo(id: 27, title: "Vintage Soul", style: "Vintage Soul", styleId: 200, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-coffe-female.avif"),
    InspirationTattoo(id: 28, title: "Vintage Soul", style: "Vintage Soul", styleId: 200, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/arm-vinyl-male.avif"),
    InspirationTattoo(id: 29, title: "Vintage Soul", style: "Vintage Soul", styleId: 200, imageUrl: "https://d3ynb031qx3d1.cloudfront.net/ai-tattoo/vintage-soul/back-male-vinyl.avif"),

]

func getDailyInspiration() -> InspirationTattoo {
    let calendar = Calendar.current
    let dayOfYear = calendar.ordinality(of: .day, in: .year, for: Date()) ?? 1
    let index = (dayOfYear - 1) % inspirationTattoos.count
    return inspirationTattoos[index]
}
