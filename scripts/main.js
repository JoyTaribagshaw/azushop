// Main application logic
class AzuShop {
    constructor() {
        this.currentFilter = 'all';
        this.currentSearchQuery = '';
        this.isLoading = false;
        this.init();
    }

    init() {
        this.bindEvents();
        this.loadCategories();
        this.loadProducts();
        this.initializeNavigation();
        this.initializeMobileMenu();
    }

    bindEvents() {
        // Product filters
        const filterButtons = document.querySelectorAll('.filter__btn');
        filterButtons.forEach(btn => {
            btn.addEventListener('click', () => this.handleFilterClick(btn));
        });

        // Search functionality
        const searchInput = document.querySelector('.search__input');
        const searchBtn = document.querySelector('.search__btn');
        
        if (searchInput && searchBtn) {
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.handleSearch(searchInput.value);
                }
            });
            
            searchBtn.addEventListener('click', () => {
                this.handleSearch(searchInput.value);
            });

            // Clear search when input is empty
            searchInput.addEventListener('input', (e) => {
                if (!e.target.value.trim()) {
                    this.currentSearchQuery = '';
                    this.loadProducts();
                }
            });
        }

        // Navigation
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.handleNavigation(link);
            });
        });

        // Hero CTA
        const heroCTA = document.querySelector('.hero__cta');
        if (heroCTA) {
            heroCTA.addEventListener('click', () => {
                document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
            });
        }

        // Product modal events
        this.bindProductModalEvents();
    }

    bindProductModalEvents() {
        const productModal = document.getElementById('productModal');
        const productClose = document.getElementById('productClose');
        const productOverlay = productModal.querySelector('.product__overlay');

        productClose.addEventListener('click', () => this.closeProductModal());
        productOverlay.addEventListener('click', () => this.closeProductModal());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && productModal.classList.contains('active')) {
                this.closeProductModal();
            }
        });
    }

    async loadCategories() {
        try {
            const categoriesGrid = document.getElementById('categoriesGrid');
            if (!categoriesGrid) return;

            // Show loading state
            categoriesGrid.innerHTML = this.getCategoriesLoadingHTML();

            // Simulate API call
            const categoryData = await simulateAPICall(categories, 300);

            // Render categories
            categoriesGrid.innerHTML = categoryData.map(category => `
                <div class="category__card" onclick="app.filterByCategory('${category.slug}')">
                    <img src="${category.image}" alt="${category.name}" class="category__image">
                    <div class="category__content">
                        <h3 class="category__title">${category.name}</h3>
                        <p class="category__description">${category.description}</p>
                    </div>
                </div>
            `).join('');

        } catch (error) {
            console.error('Failed to load categories:', error);
            this.showErrorMessage('Failed to load categories');
        }
    }

    async loadProducts(filter = this.currentFilter, searchQuery = this.currentSearchQuery) {
        try {
            const productsGrid = document.getElementById('productsGrid');
            const loadingElement = document.getElementById('productsLoading');
            
            if (!productsGrid) return;

            // Show loading state
            this.isLoading = true;
            loadingElement.style.display = 'block';
            productsGrid.style.opacity = '0.5';

            // Get products based on filter and search
            let productData;
            if (searchQuery) {
                productData = await simulateAPICall(searchProducts(searchQuery), 500);
            } else {
                productData = await simulateAPICall(getProductsByCategory(filter), 500);
            }

            // Hide loading state
            this.isLoading = false;
            loadingElement.style.display = 'none';
            productsGrid.style.opacity = '1';

            // Render products
            if (productData.length === 0) {
                productsGrid.innerHTML = this.getNoProductsHTML();
            } else {
                productsGrid.innerHTML = productData.map(product => this.getProductCardHTML(product)).join('');
            }

            // Update filter buttons
            this.updateFilterButtons();

        } catch (error) {
            console.error('Failed to load products:', error);
            this.isLoading = false;
            document.getElementById('productsLoading').style.display = 'none';
            this.showErrorMessage('Failed to load products');
        }
    }

    getProductCardHTML(product) {
        const rating = this.generateStarRating(product.rating);
        const stockStatus = product.inStock ? '' : 'style="opacity: 0.6;"';
        const stockBadge = product.inStock ? '' : '<div class="stock-badge">Out of Stock</div>';

        return `
            <div class="product__card" data-product-id="${product.id}" ${stockStatus}>
                ${stockBadge}
                <img src="${product.image}" alt="${product.title}" class="product__image" 
                     onclick="app.showProductDetail(${product.id})">
                <div class="product__content">
                    <h3 class="product__title" onclick="app.showProductDetail(${product.id})">${product.title}</h3>
                    <p class="product__description">${product.description}</p>
                    <div class="product__rating">
                        ${rating}
                        <span class="rating__count">(${product.reviews})</span>
                    </div>
                    <div class="product__price">$${product.price.toFixed(2)}</div>
                    <div class="product__actions">
                        <button class="btn btn--primary add-to-cart-btn" 
                                onclick="app.addToCart(${product.id})" 
                                ${product.inStock ? '' : 'disabled'}>
                            <i class="fas fa-shopping-cart"></i>
                            ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                        </button>
                        <button class="btn quick-view-btn" onclick="app.showProductDetail(${product.id})">
                            <i class="fas fa-eye"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    generateStarRating(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

        let starsHTML = '';
        
        // Full stars
        for (let i = 0; i < fullStars; i++) {
            starsHTML += '<i class="fas fa-star" style="color: #fbbf24;"></i>';
        }
        
        // Half star
        if (hasHalfStar) {
            starsHTML += '<i class="fas fa-star-half-alt" style="color: #fbbf24;"></i>';
        }
        
        // Empty stars
        for (let i = 0; i < emptyStars; i++) {
            starsHTML += '<i class="far fa-star" style="color: #d1d5db;"></i>';
        }

        return `<div class="rating__stars">${starsHTML}</div>`;
    }

    getCategoriesLoadingHTML() {
        return `
            <div class="loading-placeholder" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-spinner fa-spin" style="font-size: 24px; color: var(--text-light);"></i>
                <p style="margin-top: 16px; color: var(--text-light);">Loading categories...</p>
            </div>
        `;
    }

    getNoProductsHTML() {
        return `
            <div class="no-products" style="grid-column: 1 / -1; text-align: center; padding: 40px;">
                <i class="fas fa-search" style="font-size: 48px; color: var(--text-light); margin-bottom: 16px;"></i>
                <h3 style="color: var(--text-secondary); margin-bottom: 8px;">No products found</h3>
                <p style="color: var(--text-light);">
                    ${this.currentSearchQuery 
                        ? `Try adjusting your search for "${this.currentSearchQuery}"`
                        : 'Try a different filter or search term'
                    }
                </p>
                <button class="btn btn--primary" onclick="app.clearFilters()" style="margin-top: 16px;">
                    Show All Products
                </button>
            </div>
        `;
    }

    handleFilterClick(button) {
        if (this.isLoading) return;

        const filter = button.dataset.filter;
        this.currentFilter = filter;
        this.currentSearchQuery = '';
        
        // Clear search input
        const searchInput = document.querySelector('.search__input');
        if (searchInput) searchInput.value = '';

        this.loadProducts(filter);
    }

    updateFilterButtons() {
        const filterButtons = document.querySelectorAll('.filter__btn');
        filterButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.filter === this.currentFilter) {
                btn.classList.add('active');
            }
        });
    }

    handleSearch(query) {
        if (this.isLoading) return;

        const trimmedQuery = query.trim();
        if (!trimmedQuery) return;

        this.currentSearchQuery = trimmedQuery;
        this.currentFilter = 'all';
        this.loadProducts('all', trimmedQuery);
    }

    filterByCategory(categorySlug) {
        // Scroll to products section
        document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        
        // Update filter
        setTimeout(() => {
            this.currentFilter = categorySlug;
            this.currentSearchQuery = '';
            
            // Clear search input
            const searchInput = document.querySelector('.search__input');
            if (searchInput) searchInput.value = '';
            
            this.loadProducts(categorySlug);
        }, 500);
    }

    clearFilters() {
        this.currentFilter = 'all';
        this.currentSearchQuery = '';
        
        // Clear search input
        const searchInput = document.querySelector('.search__input');
        if (searchInput) searchInput.value = '';
        
        this.loadProducts();
    }

    addToCart(productId) {
        const product = getProductById(productId);
        if (product && product.inStock && window.cart) {
            window.cart.addItem(product);
        }
    }

    showProductDetail(productId) {
        const product = getProductById(productId);
        if (!product) return;

        const productModal = document.getElementById('productModal');
        const productDetail = document.getElementById('productDetail');

        const rating = this.generateStarRating(product.rating);
        const stockStatus = product.inStock 
            ? '<span style="color: var(--success-color);">✓ In Stock</span>' 
            : '<span style="color: var(--error-color);">✗ Out of Stock</span>';

        productDetail.innerHTML = `
            <div class="product__detail-image-container">
                <img src="${product.image}" alt="${product.title}" class="product__detail-image">
            </div>
            <div class="product__detail-content">
                <h2>${product.title}</h2>
                <div class="product__detail-rating">
                    ${rating}
                    <span class="rating__count">(${product.reviews} reviews)</span>
                </div>
                <div class="product__detail-price">$${product.price.toFixed(2)}</div>
                <div class="product__stock-status">${stockStatus}</div>
                <p class="product__detail-description">${product.description}</p>
                
                <div class="product__specifications">
                    <h4>Product Details</h4>
                    <ul>
                        <li><strong>Category:</strong> ${this.getCategoryName(product.category)}</li>
                        <li><strong>SKU:</strong> AZU-${product.id.toString().padStart(4, '0')}</li>
                        <li><strong>Availability:</strong> ${product.inStock ? 'In Stock' : 'Out of Stock'}</li>
                    </ul>
                </div>
                
                <div class="product__detail-actions">
                    <button class="btn btn--primary" 
                            onclick="app.addToCart(${product.id}); app.closeProductModal();"
                            ${product.inStock ? '' : 'disabled'}>
                        <i class="fas fa-shopping-cart"></i>
                        ${product.inStock ? 'Add to Cart' : 'Out of Stock'}
                    </button>
                    <button class="btn btn--secondary" onclick="app.closeProductModal()">
                        Continue Shopping
                    </button>
                </div>
            </div>
        `;

        productModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    getCategoryName(slug) {
        const category = getCategoryBySlug(slug);
        return category ? category.name : slug.charAt(0).toUpperCase() + slug.slice(1);
    }

    closeProductModal() {
        const productModal = document.getElementById('productModal');
        productModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    initializeNavigation() {
        // Smooth scrolling for navigation links
        const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                    this.updateActiveNavLink(link);
                }
            });
        });

        // Update active nav link on scroll
        window.addEventListener('scroll', () => this.updateActiveNavOnScroll());
    }

    updateActiveNavLink(activeLink) {
        const navLinks = document.querySelectorAll('.nav__link');
        navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__link[href^="#"]');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollPosition = window.scrollY + 100; // Offset for header
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    initializeMobileMenu() {
        const mobileMenuBtn = document.getElementById('mobileMenuBtn');
        const headerNav = document.querySelector('.header__nav');
        
        if (mobileMenuBtn && headerNav) {
            mobileMenuBtn.addEventListener('click', () => {
                headerNav.classList.toggle('mobile-active');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
                mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
            });

            // Close mobile menu when clicking nav links
            const navLinks = headerNav.querySelectorAll('.nav__link');
            navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    headerNav.classList.remove('mobile-active');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', (e) => {
                if (!headerNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                    headerNav.classList.remove('mobile-active');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
            });
        }
    }

    showErrorMessage(message) {
        // Create or update error message
        let errorElement = document.getElementById('errorMessage');
        
        if (!errorElement) {
            errorElement = document.createElement('div');
            errorElement.id = 'errorMessage';
            errorElement.style.cssText = `
                position: fixed;
                top: 100px;
                right: 20px;
                z-index: 3000;
                background-color: var(--error-color);
                color: white;
                padding: 16px 24px;
                border-radius: var(--border-radius);
                box-shadow: var(--shadow-lg);
                font-weight: 500;
                transform: translateX(100%);
                transition: var(--transition);
            `;
            document.body.appendChild(errorElement);
        }

        errorElement.textContent = message;
        errorElement.style.transform = 'translateX(0)';

        setTimeout(() => {
            errorElement.style.transform = 'translateX(100%)';
        }, 4000);
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Performance monitoring
    getPerformanceMetrics() {
        return {
            loadTime: window.performance.timing.loadEventEnd - window.performance.timing.navigationStart,
            domContentLoaded: window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart,
            currentFilter: this.currentFilter,
            currentSearchQuery: this.currentSearchQuery,
            isLoading: this.isLoading
        };
    }
}

// Mobile menu responsive styles
const mobileMenuStyles = `
    @media (max-width: 968px) {
        .header__nav {
            position: fixed;
            top: var(--header-height);
            left: 0;
            right: 0;
            background-color: var(--background);
            box-shadow: var(--shadow-lg);
            transform: translateY(-100%);
            transition: var(--transition);
            z-index: 999;
        }
        
        .header__nav.mobile-active {
            transform: translateY(0);
        }
        
        .header__nav .nav__list {
            flex-direction: column;
            padding: 20px;
            gap: 16px;
        }
        
        .nav__link.active::after {
            display: none;
        }
        
        .nav__link.active {
            background-color: var(--primary-color);
            color: white;
            padding: 8px 16px;
            border-radius: var(--border-radius);
        }
    }
`;

// Add mobile menu styles
const styleElement = document.createElement('style');
styleElement.textContent = mobileMenuStyles;
document.head.appendChild(styleElement);

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    window.app = new AzuShop();
    
    // Add some loading animation to the body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AzuShop };
}