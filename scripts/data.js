// Sample product data and categories
const categories = [
    {
        id: 1,
        name: "Electronics",
        description: "Latest gadgets and tech accessories",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
        slug: "electronics"
    },
    {
        id: 2,
        name: "Clothing",
        description: "Fashion and apparel for all occasions",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
        slug: "clothing"
    },
    {
        id: 3,
        name: "Home & Garden",
        description: "Everything for your home and outdoor spaces",
        image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
        slug: "home"
    },
    {
        id: 4,
        name: "Books",
        description: "Discover amazing stories and knowledge",
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
        slug: "books"
    },
    {
        id: 5,
        name: "Sports & Fitness",
        description: "Gear up for your active lifestyle",
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
        slug: "sports"
    },
    {
        id: 6,
        name: "Beauty & Health",
        description: "Self-care and wellness products",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=300&fit=crop",
        slug: "beauty"
    }
];

const products = [
    // Electronics
    {
        id: 1,
        title: "Wireless Bluetooth Headphones",
        description: "Premium noise-canceling wireless headphones with 30-hour battery life",
        price: 199.99,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
        category: "electronics",
        inStock: true,
        rating: 4.5,
        reviews: 234
    },
    {
        id: 2,
        title: "Smart Watch Series X",
        description: "Advanced smartwatch with health monitoring and GPS tracking",
        price: 299.99,
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
        category: "electronics",
        inStock: true,
        rating: 4.7,
        reviews: 456
    },
    {
        id: 3,
        title: "Wireless Phone Charger",
        description: "Fast wireless charging pad compatible with all Qi-enabled devices",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
        category: "electronics",
        inStock: true,
        rating: 4.3,
        reviews: 178
    },
    {
        id: 4,
        title: "4K Webcam",
        description: "Ultra HD webcam with auto-focus and built-in microphone",
        price: 89.99,
        image: "https://images.unsplash.com/photo-1587614382346-4ec70e388b28?w=400&h=400&fit=crop",
        category: "electronics",
        inStock: true,
        rating: 4.4,
        reviews: 92
    },

    // Clothing
    {
        id: 5,
        title: "Premium Cotton T-Shirt",
        description: "Soft, comfortable cotton t-shirt in various colors and sizes",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
        category: "clothing",
        inStock: true,
        rating: 4.2,
        reviews: 345
    },
    {
        id: 6,
        title: "Designer Denim Jeans",
        description: "Classic fit denim jeans made from premium quality materials",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
        category: "clothing",
        inStock: true,
        rating: 4.6,
        reviews: 567
    },
    {
        id: 7,
        title: "Cozy Winter Sweater",
        description: "Warm and stylish sweater perfect for cold weather",
        price: 59.99,
        image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
        category: "clothing",
        inStock: true,
        rating: 4.4,
        reviews: 234
    },
    {
        id: 8,
        title: "Athletic Running Shoes",
        description: "Lightweight and comfortable running shoes with excellent grip",
        price: 119.99,
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
        category: "clothing",
        inStock: true,
        rating: 4.8,
        reviews: 789
    },

    // Home & Garden
    {
        id: 9,
        title: "Ceramic Coffee Mug Set",
        description: "Set of 4 beautiful ceramic coffee mugs with ergonomic handles",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1514228742587-6b1558fcf93a?w=400&h=400&fit=crop",
        category: "home",
        inStock: true,
        rating: 4.3,
        reviews: 156
    },
    {
        id: 10,
        title: "LED Desk Lamp",
        description: "Adjustable LED desk lamp with multiple brightness settings",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        category: "home",
        inStock: true,
        rating: 4.5,
        reviews: 287
    },
    {
        id: 11,
        title: "Plant Starter Kit",
        description: "Everything you need to start your indoor herb garden",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=400&fit=crop",
        category: "home",
        inStock: true,
        rating: 4.1,
        reviews: 123
    },
    {
        id: 12,
        title: "Aromatherapy Diffuser",
        description: "Ultrasonic essential oil diffuser with color-changing LED lights",
        price: 64.99,
        image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=400&fit=crop",
        category: "home",
        inStock: true,
        rating: 4.6,
        reviews: 445
    },

    // Books
    {
        id: 13,
        title: "The Art of Programming",
        description: "Comprehensive guide to modern programming techniques and best practices",
        price: 45.99,
        image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&h=400&fit=crop",
        category: "books",
        inStock: true,
        rating: 4.7,
        reviews: 234
    },
    {
        id: 14,
        title: "Mindfulness & Meditation",
        description: "A practical guide to finding peace and clarity in daily life",
        price: 19.99,
        image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&h=400&fit=crop",
        category: "books",
        inStock: true,
        rating: 4.4,
        reviews: 567
    },
    {
        id: 15,
        title: "Cookbook: Healthy Meals",
        description: "100+ delicious and nutritious recipes for everyday cooking",
        price: 32.99,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=400&fit=crop",
        category: "books",
        inStock: true,
        rating: 4.5,
        reviews: 345
    },
    {
        id: 16,
        title: "Science Fiction Anthology",
        description: "Collection of award-winning science fiction short stories",
        price: 27.99,
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
        category: "books",
        inStock: true,
        rating: 4.3,
        reviews: 189
    },

    // Sports & Fitness
    {
        id: 17,
        title: "Yoga Mat Premium",
        description: "Non-slip yoga mat with excellent grip and cushioning",
        price: 39.99,
        image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=400&fit=crop",
        category: "sports",
        inStock: true,
        rating: 4.6,
        reviews: 456
    },
    {
        id: 18,
        title: "Resistance Bands Set",
        description: "Complete set of resistance bands for home workouts",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
        category: "sports",
        inStock: true,
        rating: 4.4,
        reviews: 234
    },
    {
        id: 19,
        title: "Water Bottle Insulated",
        description: "Stainless steel water bottle keeps drinks cold for 24 hours",
        price: 29.99,
        image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&h=400&fit=crop",
        category: "sports",
        inStock: true,
        rating: 4.7,
        reviews: 678
    },
    {
        id: 20,
        title: "Fitness Tracker",
        description: "Advanced fitness tracker with heart rate monitor and GPS",
        price: 149.99,
        image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
        category: "sports",
        inStock: true,
        rating: 4.5,
        reviews: 345
    },

    // Beauty & Health
    {
        id: 21,
        title: "Vitamin C Serum",
        description: "Brightening vitamin C serum for healthy, glowing skin",
        price: 34.99,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
        category: "beauty",
        inStock: true,
        rating: 4.8,
        reviews: 567
    },
    {
        id: 22,
        title: "Natural Face Mask Set",
        description: "Set of 5 natural face masks for different skin types",
        price: 24.99,
        image: "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=400&h=400&fit=crop",
        category: "beauty",
        inStock: true,
        rating: 4.3,
        reviews: 234
    },
    {
        id: 23,
        title: "Electric Toothbrush",
        description: "Rechargeable electric toothbrush with multiple cleaning modes",
        price: 79.99,
        image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop",
        category: "beauty",
        inStock: true,
        rating: 4.6,
        reviews: 445
    },
    {
        id: 24,
        title: "Essential Oils Set",
        description: "Set of 6 pure essential oils for aromatherapy and wellness",
        price: 49.99,
        image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop",
        category: "beauty",
        inStock: true,
        rating: 4.4,
        reviews: 312
    }
];

// Helper functions
function getProductById(id) {
    return products.find(product => product.id === parseInt(id));
}

function getProductsByCategory(category) {
    if (category === 'all') {
        return products;
    }
    return products.filter(product => product.category === category);
}

function getCategoryBySlug(slug) {
    return categories.find(category => category.slug === slug);
}

function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
}

// Simulate API delay for loading states
function simulateAPICall(data, delay = 500) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(data);
        }, delay);
    });
}

// Export data for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        categories,
        products,
        getProductById,
        getProductsByCategory,
        getCategoryBySlug,
        searchProducts,
        simulateAPICall
    };
}