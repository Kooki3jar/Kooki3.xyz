import { Store } from '../types/store';

export const themedStores: Store[] = [
  {
    id: 6,
    name: "Gallery Modern",
    description: "Contemporary art gallery featuring emerging and established artists. Original paintings, prints, and sculptures for the discerning collector.",
    image: "https://images.unsplash.com/photo-1577720580479-7d839d829c73?w=800&q=80",
    rating: 4.9,
    priceRange: "$100-$5000",
    featured: ["Original Paintings", "Limited Prints", "Sculptures"],
    products: [
      {
        id: "art-1",
        name: "Urban Landscape - Original Oil Painting",
        description: "Contemporary cityscape in vibrant colors. Oil on canvas, 36x48 inches. Signed by the artist with certificate of authenticity.",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&q=80",
        price: 2400.00,
        category: "Original Paintings",
        ingredients: ["Oil paint", "Canvas"],
        rating: 5.0,
        reviews: 12,
        inStock: true
      },
      {
        id: "art-2",
        name: "Abstract Motion - Limited Edition Print",
        description: "Limited edition of 50. Museum-quality print on archival paper. Numbered and signed by the artist.",
        image: "https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=800&q=80",
        price: 350.00,
        category: "Prints",
        ingredients: ["Archival ink", "Cotton rag paper"],
        rating: 4.8,
        reviews: 28,
        inStock: true
      },
      {
        id: "art-3",
        name: "Bronze Wave - Sculpture",
        description: "Abstract bronze sculpture on marble base. Limited edition of 25. Height: 18 inches.",
        image: "https://images.unsplash.com/photo-1554188248-986adbb73be4?w=800&q=80",
        price: 1800.00,
        category: "Sculpture",
        ingredients: ["Cast bronze", "Marble"],
        rating: 4.9,
        reviews: 15,
        inStock: true
      },
      {
        id: "art-4",
        name: "Desert Dreams - Original Acrylic",
        description: "Large-scale abstract landscape inspired by desert formations. Acrylic on canvas, 48x60 inches.",
        image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&q=80",
        price: 3200.00,
        category: "Original Paintings",
        ingredients: ["Acrylic paint", "Canvas"],
        rating: 4.9,
        reviews: 8,
        inStock: true
      }
    ]
  },
  {
    id: 7,
    name: "Precious & Stone",
    description: "Handcrafted fine jewelry featuring unique designs and ethically sourced gemstones. Each piece tells a story.",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    rating: 4.9,
    priceRange: "$200-$5000",
    featured: ["Engagement Rings", "Statement Necklaces", "Custom Pieces"],
    products: [
      {
        id: "jewelry-1",
        name: "Moonstone Halo Ring",
        description: "Rainbow moonstone surrounded by conflict-free diamonds in 14k gold setting. Size 6-8 available.",
        image: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80",
        price: 1200.00,
        category: "Rings",
        ingredients: ["14k Gold", "Moonstone", "Diamonds"],
        rating: 5.0,
        reviews: 34,
        inStock: true
      },
      {
        id: "jewelry-2",
        name: "Sapphire Drop Earrings",
        description: "Natural blue sapphires in vintage-inspired 18k white gold settings. French wire backs.",
        image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80",
        price: 1800.00,
        category: "Earrings",
        ingredients: ["18k White Gold", "Sapphires"],
        rating: 4.9,
        reviews: 22,
        inStock: true
      },
      {
        id: "jewelry-3",
        name: "Emerald Art Deco Necklace",
        description: "Vintage-inspired pendant featuring Colombian emerald and diamond accents. 18k gold chain.",
        image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80",
        price: 2500.00,
        category: "Necklaces",
        ingredients: ["18k Gold", "Emerald", "Diamonds"],
        rating: 4.8,
        reviews: 19,
        inStock: true
      },
      {
        id: "jewelry-4",
        name: "Pearl Constellation Bracelet",
        description: "Freshwater pearls linked with 14k gold stars and diamond accents. Adjustable length.",
        image: "https://images.unsplash.com/photo-1602752275197-9e5bb0f68407?w=800&q=80",
        price: 850.00,
        category: "Bracelets",
        ingredients: ["14k Gold", "Pearls", "Diamonds"],
        rating: 4.7,
        reviews: 28,
        inStock: true
      }
    ]
  },
  {
    id: 8,
    name: "Time Capsule Vintage",
    description: "Curated collection of authentic vintage clothing and accessories from the 1920s-1980s.",
    image: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&q=80",
    rating: 4.8,
    priceRange: "$50-$1000",
    featured: ["1950s Dresses", "Designer Bags", "Menswear"],
    products: [
      {
        id: "vintage-1",
        name: "1950s Cocktail Dress",
        description: "Authentic 1950s silk cocktail dress with full skirt. Excellent condition. Size: Modern 4-6.",
        image: "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?w=800&q=80",
        price: 450.00,
        category: "Dresses",
        ingredients: ["Silk", "Original zipper"],
        rating: 4.9,
        reviews: 18,
        inStock: true
      },
      {
        id: "vintage-2",
        name: "1970s Leather Jacket",
        description: "Classic motorcycle jacket in distressed brown leather. Men's size M.",
        image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=800&q=80",
        price: 375.00,
        category: "Menswear",
        ingredients: ["Leather", "Original hardware"],
        rating: 4.8,
        reviews: 24,
        inStock: true
      },
      {
        id: "vintage-3",
        name: "1960s Gucci Handbag",
        description: "Authentic Gucci bamboo handle bag. Recently restored. Includes dust bag.",
        image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&q=80",
        price: 895.00,
        category: "Bags",
        ingredients: ["Leather", "Bamboo", "Brass hardware"],
        rating: 5.0,
        reviews: 12,
        inStock: true
      }
    ]
  },
  {
    id: 9,
    name: "Modern Habitat",
    description: "Contemporary home decor and furniture focusing on sustainable materials and timeless design.",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=800&q=80",
    rating: 4.7,
    priceRange: "$50-$3000",
    featured: ["Furniture", "Lighting", "Textiles"],
    products: [
      {
        id: "home-1",
        name: "Walnut Lounge Chair",
        description: "Mid-century inspired lounge chair in solid walnut with wool upholstery. Handcrafted in small batches.",
        image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&q=80",
        price: 1200.00,
        category: "Furniture",
        ingredients: ["Walnut", "Wool fabric"],
        rating: 4.8,
        reviews: 45,
        inStock: true
      },
      {
        id: "home-2",
        name: "Ceramic Table Lamp",
        description: "Handmade ceramic lamp with linen shade. Each piece unique with subtle variations.",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&q=80",
        price: 340.00,
        category: "Lighting",
        ingredients: ["Ceramic", "Linen", "Brass"],
        rating: 4.9,
        reviews: 32,
        inStock: true
      },
      {
        id: "home-3",
        name: "Wool Area Rug",
        description: "Hand-knotted wool rug in geometric pattern. Size: 6x9 feet.",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&q=80",
        price: 895.00,
        category: "Textiles",
        ingredients: ["New Zealand wool"],
        rating: 4.7,
        reviews: 28,
        inStock: true
      }
    ]
  },
  {
    id: 10,
    name: "Atelier Threads",
    description: "Sustainable and ethically made clothing featuring natural fibers and timeless designs.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    rating: 4.8,
    priceRange: "$80-$500",
    featured: ["Linen Collection", "Knitwear", "Accessories"],
    products: [
      {
        id: "clothing-1",
        name: "Organic Linen Dress",
        description: "Midi-length dress in heavyweight linen. Features deep pockets and adjustable waist tie. Available in sizes XS-XL.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&q=80",
        price: 245.00,
        category: "Dresses",
        ingredients: ["Organic linen", "Coconut buttons"],
        rating: 4.9,
        reviews: 67,
        inStock: true
      },
      {
        id: "clothing-2",
        name: "Merino Wool Sweater",
        description: "Classic crew neck sweater in superfine merino wool. Available in multiple colors.",
        image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&q=80",
        price: 185.00,
        category: "Knitwear",
        ingredients: ["Merino wool"],
        rating: 4.8,
        reviews: 45,
        inStock: true
      },
      {
        id: "clothing-3",
        name: "Cotton Canvas Tote",
        description: "Large tote bag in heavyweight organic cotton canvas. Features leather straps and interior pocket.",
        image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=800&q=80",
        price: 95.00,
        category: "Accessories",
        ingredients: ["Organic cotton", "Vegetable-tanned leather"],
        rating: 4.7,
        reviews: 38,
        inStock: true
      }
    ]
  },
  {
    id: 11,
    name: "Light & Shadow Studio",
    description: "Fine art photography prints capturing landscapes, urban scenes, and abstract compositions.",
    image: "https://images.unsplash.com/photo-1452421822248-d4c2b47f0c81?w=800&q=80",
    rating: 4.9,
    priceRange: "$150-$2000",
    featured: ["Limited Editions", "Large Format", "Black & White"],
    products: [
      {
        id: "photo-1",
        name: "Desert Dawn - Limited Edition",
        description: "Archival pigment print of Namibian desert at sunrise. Limited edition of 25. Size: 40x60 inches.",
        image: "https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=800&q=80",
        price: 850.00,
        category: "Limited Editions",
        ingredients: ["Archival paper", "Pigment inks"],
        rating: 5.0,
        reviews: 23,
        inStock: true
      },
      {
        id: "photo-2",
        name: "Urban Geometry Series",
        description: "Set of three architectural abstracts. Black and white prints on fiber paper. 16x20 inches each.",
        image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80",
        price: 450.00,
        category: "Black & White",
        ingredients: ["Fiber paper", "Archival inks"],
        rating: 4.8,
        reviews: 31,
        inStock: true
      },
      {
        id: "photo-3",
        name: "Ocean Waves Triptych",
        description: "Three-panel seascape in large format. Each panel 24x36 inches. Museum-quality printing.",
        image: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&q=80",
        price: 1200.00,
        category: "Large Format",
        ingredients: ["Fine art paper", "UV-resistant inks"],
        rating: 4.9,
        reviews: 19,
        inStock: true
      }
    ]
  }
];