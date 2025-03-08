export interface Store {
  id: number;
  name: string;
  description: string;
  image: string;
  rating: number;
  priceRange: string;
  featured: string[];
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    showPublicly: boolean;
  };
  products: Product[];
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export const stores: Store[] = [
  {
    id: 1,
    name: "Brushstrokes & Beyond",
    description: "Contemporary art gallery featuring unique paintings and prints",
    image: "https://images.unsplash.com/photo-1581337666847-6c2c86c869cc?w=800&q=80",
    rating: 4.8,
    priceRange: "$$$",
    featured: ["Art"],
    address: {
      street: "123 Gallery Row",
      city: "Santa Fe",
      state: "NM",
      zipCode: "87501",
      showPublicly: true
    },
    products: [
      {
        id: 101,
        name: "Desert Sunset",
        description: "Original acrylic painting on canvas",
        price: 1200,
        image: "https://images.unsplash.com/photo-1618331835717-801e976710b2?w=800&q=80",
        category: "Paintings"
      },
      // Additional products...
    ]
  },
  {
    id: 2,
    name: "Modern Minimalist",
    description: "Contemporary fashion boutique",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    rating: 4.6,
    priceRange: "$$",
    featured: ["Clothing"],
    address: {
      street: "456 Fashion Ave",
      city: "New York",
      state: "NY",
      zipCode: "10018",
      showPublicly: true
    },
    products: [
      {
        id: 201,
        name: "Essential White Tee",
        description: "100% organic cotton t-shirt",
        price: 45,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
        category: "Clothing"
      },
      // Additional products...
    ]
  },
  {
    id: 3,
    name: "Vintage Treasures",
    description: "Curated collection of vintage items",
    image: "https://images.unsplash.com/photo-1631729371254-42c2892f0e6e?w=800&q=80",
    rating: 4.7,
    priceRange: "$$",
    featured: ["Vintage"],
    address: {
      street: "789 Antique Row",
      city: "Portland",
      state: "OR",
      zipCode: "97205",
      showPublicly: true
    },
    products: [
      {
        id: 301,
        name: "Mid-Century Modern Chair",
        description: "Restored 1960s lounge chair",
        price: 850,
        image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&q=80",
        category: "Furniture"
      },
      // Additional products...
    ]
  },
  {
    id: 4,
    name: "Coastal Dreams",
    description: "Handcrafted coastal-inspired jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
    rating: 4.9,
    priceRange: "$$",
    featured: ["Jewelry"],
    address: {
      street: "321 Ocean Drive",
      city: "San Diego",
      state: "CA",
      zipCode: "92109",
      showPublicly: true
    },
    products: [
      {
        id: 401,
        name: "Sea Glass Pendant",
        description: "Sterling silver and genuine sea glass",
        price: 125,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80",
        category: "Jewelry"
      },
      // Additional products...
    ]
  },
  {
    id: 5,
    name: "Desert Wind",
    description: "Southwestern pottery and ceramics",
    image: "https://images.unsplash.com/photo-1565193298357-c5b46b0ac8fb?w=800&q=80",
    rating: 4.8,
    priceRange: "$$$",
    featured: ["Home & Living"],
    address: {
      street: "567 Adobe Way",
      city: "Tucson",
      state: "AZ",
      zipCode: "85701",
      showPublicly: true
    },
    products: [
      {
        id: 501,
        name: "Hand-Painted Vase",
        description: "Traditional Southwest design",
        price: 280,
        image: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&q=80",
        category: "Pottery"
      },
      // Additional products...
    ]
  }
];