# AzuShop - Dynamic E-commerce Platform

A modern, responsive e-commerce platform built with HTML, CSS, and JavaScript. Features a comprehensive shopping experience with product browsing, cart management, and a complete checkout process.

## 🚀 Features

### Core E-commerce Functionality
- **Product Catalog** - Browse 24+ products across 6 categories
- **Shopping Cart** - Add, remove, and modify cart items with persistent storage
- **Product Filtering** - Filter products by category (Electronics, Clothing, Home & Garden, Books, Sports, Beauty)
- **Search Functionality** - Search products by name, description, or category
- **Product Details** - Modal view with detailed product information
- **Checkout Process** - Complete purchase flow with form validation

### User Experience
- **Responsive Design** - Optimized for desktop, tablet, and mobile devices
- **Modern UI/UX** - Clean, professional interface with smooth animations
- **Interactive Elements** - Hover effects, loading states, and success notifications
- **Accessibility** - Proper ARIA labels and keyboard navigation support

### Technical Features
- **Local Storage** - Cart persistence across browser sessions
- **Form Validation** - Real-time validation for checkout forms
- **Loading States** - Simulated API calls with loading animations
- **Error Handling** - Graceful error handling and user feedback

## 📱 Screenshots

### Desktop View
![AzuShop Desktop](https://github.com/user-attachments/assets/5a3c76ff-7920-47b8-9a4c-aba0fb7b5e1c)

### Mobile View  
![AzuShop Mobile](https://github.com/user-attachments/assets/a0f7af05-fdd2-4035-bbc6-62daddb69b4e)

## 🛠 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Styling**: CSS Grid, Flexbox, CSS Variables
- **Icons**: Font Awesome
- **Fonts**: Inter (Google Fonts)
- **Images**: Unsplash (placeholder images)

## 📂 Project Structure

```
azushop/
├── index.html              # Main HTML file
├── styles/
│   └── main.css           # Main stylesheet with responsive design
├── scripts/
│   ├── data.js            # Product data and helper functions
│   ├── cart.js            # Shopping cart functionality
│   └── main.js            # Main application logic
├── .gitignore             # Git ignore file
└── README.md              # Project documentation
```

## 🚦 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/JoyTaribagshaw/azushop.git
   cd azushop
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python3 -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

3. **Open in browser**
   Navigate to `http://localhost:8000`

## 🎯 Key Components

### Shopping Cart
- **Persistent Storage** - Cart items saved to localStorage
- **Quantity Management** - Increase/decrease item quantities
- **Real-time Updates** - Cart count and totals update instantly
- **Clear Cart** - Remove all items with confirmation

### Product Filtering
- **Category Filters** - Filter by product categories
- **Search** - Full-text search across product data
- **Loading States** - Smooth transitions during filtering

### Checkout Process
- **Form Validation** - Real-time validation for all form fields
- **Payment Simulation** - Simulated payment processing
- **Order Confirmation** - Success state with order confirmation

### Responsive Design
- **Mobile-First** - Designed for mobile devices first
- **Breakpoints** - Responsive breakpoints at 640px and 968px
- **Touch-Friendly** - Optimized for touch interactions

## 🎨 Design System

### Colors
- **Primary**: #2563eb (Blue)
- **Secondary**: #64748b (Gray)
- **Success**: #059669 (Green)
- **Error**: #dc2626 (Red)
- **Text**: #1f2937 (Dark Gray)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700

### Layout
- **Container**: Max-width 1200px
- **Grid**: CSS Grid with responsive columns
- **Spacing**: Consistent spacing using CSS variables

## 🔧 Customization

### Adding Products
Edit `scripts/data.js` to add new products:

```javascript
{
    id: 25,
    title: "New Product",
    description: "Product description",
    price: 99.99,
    image: "image-url",
    category: "electronics",
    inStock: true,
    rating: 4.5,
    reviews: 123
}
```

### Adding Categories
Add new categories to the `categories` array in `scripts/data.js`:

```javascript
{
    id: 7,
    name: "New Category",
    description: "Category description",
    image: "category-image-url",
    slug: "new-category"
}
```

### Styling
Modify CSS variables in `styles/main.css` to customize the theme:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... other variables */
}
```

## 📋 Browser Support

- **Chrome** 88+
- **Firefox** 85+
- **Safari** 14+
- **Edge** 88+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Images from [Unsplash](https://unsplash.com)
- Icons from [Font Awesome](https://fontawesome.com)
- Fonts from [Google Fonts](https://fonts.google.com)

## 📞 Support

If you have any questions or need help with the project, please open an issue or contact the maintainer.

---

**AzuShop** - Your premium shopping destination for quality products at great prices.