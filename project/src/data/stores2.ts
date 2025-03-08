import { Store } from '../types/store';

export const additionalStores: Store[] = [
  {
    id: 4,
    name: "Earth & Fire Pottery",
    description: "Handcrafted ceramic pieces made with traditional techniques.",
    image: "https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?w=800&q=80",
    rating: 4.9,
    priceRange: "$40-$300",
    featured: ["Dinner Sets", "Tea Ceremonies", "Wall Art"],
    products: [
      {
        id: "pottery-1",
        name: "Handcrafted Tea Set",
        description: "Complete tea ceremony set including teapot, 4 cups, and serving tray. Glazed in celadon with crystalline effects.",
        image: "https://images.unsplash.com/photo-1530968033775-2c92736b131e?w=800&q=80",
        price: 285.00,
        category: "Tea Ceremony",
        ingredients: ["Stoneware clay", "Celadon glaze"],
        rating: 5.0,
        reviews: 34,
        inStock: true
      },
      {
        id: "pottery-2",
        name: "Dinner Plates Set (4)",
        description: "Set of four 10-inch dinner plates. Each piece uniquely glazed in shades of ocean blue and sandy beige.",
        image: "https://images.unsplash.com/photo-1516216628859-9bccb4f1aa39?w=800&q=80",
        price: 160.00,
        category: "Tableware",
        ingredients: ["Porcelain", "Food-safe glazes"],
        rating: 4.8,
        reviews: 56,
        inStock: true
      },
      {
        id: "pottery-3",
        name: "Wall-Mounted Vase",
        description: "Sculptural wall vase with textured surface. Perfect for dried or fresh flowers. Each piece unique.",
        image: "https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?w=800&q=80",
        price: 120.00,
        category: "Wall Art",
        ingredients: ["Stoneware clay", "Matte glaze"],
        rating: 4.9,
        reviews: 28,
        inStock: true
      },
      {
        id: "pottery-4",
        name: "Large Serving Bowl",
        description: "Statement serving bowl with reactive glaze. Each piece develops unique patterns in the kiln.",
        image: "https://images.unsplash.com/photo-1610701596061-2ecf227e85b2?w=800&q=80",
        price: 145.00,
        category: "Tableware",
        ingredients: ["Stoneware clay", "Reactive glaze"],
        rating: 4.7,
        reviews: 42,
        inStock: true
      },
      {
        id: "pottery-5",
        name: "Sake Set",
        description: "Traditional sake set including server and 4 cups. Wood-fired with natural ash glaze.",
        image: "https://images.unsplash.com/photo-1579541637431-4e3cd6f6c9e3?w=800&q=80",
        price: 195.00,
        category: "Drinkware",
        ingredients: ["Porcelain", "Natural ash glaze"],
        rating: 4.9,
        reviews: 31,
        inStock: true
      }
    ]
  },
  {
    id: 5,
    name: "Jungle Room Plants",
    description: "Exotic and rare plants sourced from sustainable nurseries worldwide.",
    image: "https://images.unsplash.com/photo-1463320726281-696a485928c7?w=800&q=80",
    rating: 4.8,
    priceRange: "$25-$500",
    featured: ["Rare Aroids", "Exotic Orchids", "Carnivorous Plants"],
    products: [
      {
        id: "plant-1",
        name: "Philodendron Pink Princess",
        description: "Highly variegated specimen with stunning pink leaves. Well-rooted in 6-inch pot.",
        image: "https://images.unsplash.com/photo-1637967886160-fd0a8454fd21?w=800&q=80",
        price: 250.00,
        category: "Rare Aroids",
        dietaryInfo: ["Toxic to pets"],
        rating: 4.9,
        reviews: 67,
        inStock: true
      },
      {
        id: "plant-2",
        name: "Nepenthes Pitcher Plant",
        description: "Large specimen of this carnivorous beauty. Already producing mature pitchers.",
        image: "https://images.unsplash.com/photo-1591454371758-644f9d123a81?w=800&q=80",
        price: 95.00,
        category: "Carnivorous",
        dietaryInfo: ["Safe for pets"],
        rating: 4.7,
        reviews: 45,
        inStock: true
      },
      {
        id: "plant-3",
        name: "Monstera Albo Variegata",
        description: "Established plant with multiple leaves showing stunning white variegation.",
        image: "https://images.unsplash.com/photo-1632320208708-7524e630e3f7?w=800&q=80",
        price: 450.00,
        category: "Rare Aroids",
        dietaryInfo: ["Toxic to pets"],
        rating: 5.0,
        reviews: 34,
        inStock: true
      },
      {
        id: "plant-4",
        name: "Phalaenopsis 'Blue Mystique'",
        description: "Rare blue orchid variety. Comes in decorative pot with care instructions.",
        image: "https://images.unsplash.com/photo-1524598961841-d3f66c61c3e2?w=800&q=80",
        price: 75.00,
        category: "Orchids",
        dietaryInfo: ["Pet safe"],
        rating: 4.8,
        reviews: 89,
        inStock: true
      },
      {
        id: "plant-5",
        name: "Venus Flytrap 'King Henry'",
        description: "Large cultivar with red interior traps. Comes potted in mineral-free soil mix.",
        image: "https://images.unsplash.com/photo-1628497622741-3f9e8081c673?w=800&q=80",
        price: 45.00,
        category: "Carnivorous",
        dietaryInfo: ["Pet safe"],
        rating: 4.6,
        reviews: 56,
        inStock: true
      }
    ]
  }
];