// Shopping Cart Management
class ShoppingCart {
    constructor() {
        this.items = this.loadFromStorage();
        this.listeners = [];
        this.init();
    }

    init() {
        this.updateCartUI();
        this.bindEvents();
    }

    bindEvents() {
        // Cart modal events
        const cartBtn = document.getElementById('cartBtn');
        const cartModal = document.getElementById('cartModal');
        const cartClose = document.getElementById('cartClose');
        const cartOverlay = cartModal.querySelector('.cart__overlay');
        const continueShopping = document.getElementById('continueShopping');
        const clearCart = document.getElementById('clearCart');
        const checkoutBtn = document.getElementById('checkoutBtn');

        // Open cart modal
        cartBtn.addEventListener('click', () => this.openCartModal());
        
        // Close cart modal
        cartClose.addEventListener('click', () => this.closeCartModal());
        cartOverlay.addEventListener('click', () => this.closeCartModal());
        continueShopping.addEventListener('click', () => this.closeCartModal());

        // Clear cart
        clearCart.addEventListener('click', () => this.clearCart());

        // Checkout
        checkoutBtn.addEventListener('click', () => this.proceedToCheckout());

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeCartModal();
            }
        });
    }

    addItem(product, quantity = 1) {
        const existingItem = this.items.find(item => item.id === product.id);
        
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({
                ...product,
                quantity: quantity,
                addedAt: new Date().toISOString()
            });
        }

        this.saveToStorage();
        this.updateCartUI();
        this.showSuccessMessage(`${product.title} added to cart!`);
        this.notifyListeners('itemAdded', { product, quantity });
    }

    removeItem(productId) {
        const index = this.items.findIndex(item => item.id === productId);
        if (index > -1) {
            const removedItem = this.items.splice(index, 1)[0];
            this.saveToStorage();
            this.updateCartUI();
            this.notifyListeners('itemRemoved', { product: removedItem });
        }
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            if (quantity <= 0) {
                this.removeItem(productId);
            } else {
                item.quantity = quantity;
                this.saveToStorage();
                this.updateCartUI();
                this.notifyListeners('quantityUpdated', { productId, quantity });
            }
        }
    }

    clearCart() {
        if (this.items.length === 0) return;
        
        if (confirm('Are you sure you want to clear your cart?')) {
            this.items = [];
            this.saveToStorage();
            this.updateCartUI();
            this.showSuccessMessage('Cart cleared successfully!');
            this.notifyListeners('cartCleared');
        }
    }

    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    getItems() {
        return [...this.items];
    }

    saveToStorage() {
        try {
            localStorage.setItem('azushop_cart', JSON.stringify(this.items));
        } catch (error) {
            console.error('Failed to save cart to localStorage:', error);
        }
    }

    loadFromStorage() {
        try {
            const stored = localStorage.getItem('azushop_cart');
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load cart from localStorage:', error);
            return [];
        }
    }

    updateCartUI() {
        this.updateCartCount();
        this.updateCartItems();
        this.updateCartTotal();
    }

    updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const totalItems = this.getTotalItems();
            cartCount.textContent = totalItems;
            cartCount.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    updateCartItems() {
        const cartItems = document.getElementById('cartItems');
        const cartEmpty = document.getElementById('cartEmpty');
        const cartFooter = document.querySelector('.cart__footer');

        if (!cartItems) return;

        if (this.items.length === 0) {
            cartItems.style.display = 'none';
            cartEmpty.style.display = 'block';
            cartFooter.style.display = 'none';
        } else {
            cartItems.style.display = 'block';
            cartEmpty.style.display = 'none';
            cartFooter.style.display = 'block';

            cartItems.innerHTML = this.items.map(item => `
                <div class="cart__item" data-product-id="${item.id}">
                    <img src="${item.image}" alt="${item.title}" class="cart__item-image">
                    <div class="cart__item-details">
                        <div class="cart__item-title">${item.title}</div>
                        <div class="cart__item-price">$${item.price.toFixed(2)}</div>
                        <div class="cart__item-actions">
                            <button class="quantity__btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">
                                <i class="fas fa-minus"></i>
                            </button>
                            <input type="number" class="quantity__input" value="${item.quantity}" 
                                   min="1" max="99" 
                                   onchange="cart.updateQuantity(${item.id}, parseInt(this.value))">
                            <button class="quantity__btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">
                                <i class="fas fa-plus"></i>
                            </button>
                            <button class="remove__btn" onclick="cart.removeItem(${item.id})">
                                <i class="fas fa-trash"></i> Remove
                            </button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }

    updateCartTotal() {
        const cartTotal = document.getElementById('cartTotal');
        if (cartTotal) {
            cartTotal.textContent = `$${this.getTotalPrice().toFixed(2)}`;
        }

        // Update checkout totals
        const checkoutSubtotal = document.getElementById('checkoutSubtotal');
        const checkoutTotal = document.getElementById('checkoutTotal');
        if (checkoutSubtotal && checkoutTotal) {
            const subtotal = this.getTotalPrice();
            const shipping = subtotal > 0 ? 9.99 : 0;
            const total = subtotal + shipping;

            checkoutSubtotal.textContent = `$${subtotal.toFixed(2)}`;
            checkoutTotal.textContent = `$${total.toFixed(2)}`;
        }
    }

    openCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.updateCartUI();
        }
    }

    closeCartModal() {
        const cartModal = document.getElementById('cartModal');
        if (cartModal) {
            cartModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    proceedToCheckout() {
        if (this.items.length === 0) {
            alert('Your cart is empty!');
            return;
        }

        this.closeCartModal();
        this.openCheckoutModal();
    }

    openCheckoutModal() {
        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal) {
            checkoutModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            this.updateCartTotal();
        }
    }

    closeCheckoutModal() {
        const checkoutModal = document.getElementById('checkoutModal');
        if (checkoutModal) {
            checkoutModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    showSuccessMessage(message) {
        const successMessage = document.getElementById('successMessage');
        const successText = document.getElementById('successText');
        
        if (successMessage && successText) {
            successText.textContent = message;
            successMessage.classList.add('show');
            
            setTimeout(() => {
                successMessage.classList.remove('show');
            }, 3000);
        }
    }

    // Event listener system
    addEventListener(event, callback) {
        if (!this.listeners[event]) {
            this.listeners[event] = [];
        }
        this.listeners[event].push(callback);
    }

    removeEventListener(event, callback) {
        if (this.listeners[event]) {
            const index = this.listeners[event].indexOf(callback);
            if (index > -1) {
                this.listeners[event].splice(index, 1);
            }
        }
    }

    notifyListeners(event, data) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(callback => callback(data));
        }
    }

    // Analytics and tracking
    getCartAnalytics() {
        return {
            totalItems: this.getTotalItems(),
            totalValue: this.getTotalPrice(),
            itemCount: this.items.length,
            averageItemPrice: this.items.length > 0 ? this.getTotalPrice() / this.getTotalItems() : 0,
            categories: [...new Set(this.items.map(item => item.category))],
            oldestItem: this.items.length > 0 ? Math.min(...this.items.map(item => new Date(item.addedAt).getTime())) : null
        };
    }
}

// Checkout functionality
class Checkout {
    constructor(cart) {
        this.cart = cart;
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        const checkoutModal = document.getElementById('checkoutModal');
        const checkoutClose = document.getElementById('checkoutClose');
        const checkoutOverlay = checkoutModal.querySelector('.checkout__overlay');
        const checkoutForm = document.getElementById('checkoutForm');

        // Close checkout modal
        checkoutClose.addEventListener('click', () => this.cart.closeCheckoutModal());
        checkoutOverlay.addEventListener('click', () => this.cart.closeCheckoutModal());

        // Handle form submission
        checkoutForm.addEventListener('submit', (e) => this.handleCheckout(e));

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && checkoutModal.classList.contains('active')) {
                this.cart.closeCheckoutModal();
            }
        });

        // Form validation
        this.addFormValidation();
    }

    addFormValidation() {
        const inputs = document.querySelectorAll('.checkout__form .form__input');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        // Basic validation
        if (field.required && !value) {
            isValid = false;
            errorMessage = 'This field is required';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid email address';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^\+?[\d\s-()]+$/;
            if (!phoneRegex.test(value) || value.replace(/\D/g, '').length < 10) {
                isValid = false;
                errorMessage = 'Please enter a valid phone number';
            }
        }

        // Credit card validation (basic)
        if (field.placeholder.includes('Card Number') && value) {
            const cardRegex = /^\d{4}\s?\d{4}\s?\d{4}\s?\d{4}$/;
            if (!cardRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid card number';
            }
        }

        // CVC validation
        if (field.placeholder.includes('CVC') && value) {
            const cvcRegex = /^\d{3,4}$/;
            if (!cvcRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter a valid CVC';
            }
        }

        // Expiry date validation
        if (field.placeholder.includes('MM/YY') && value) {
            const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
            if (!expiryRegex.test(value)) {
                isValid = false;
                errorMessage = 'Please enter MM/YY format';
            }
        }

        this.showFieldValidation(field, isValid, errorMessage);
        return isValid;
    }

    showFieldValidation(field, isValid, errorMessage) {
        // Remove existing error
        this.clearFieldError(field);

        if (!isValid) {
            field.style.borderColor = 'var(--error-color)';
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = errorMessage;
            errorDiv.style.cssText = `
                color: var(--error-color);
                font-size: 12px;
                margin-top: 4px;
                margin-bottom: 8px;
            `;
            
            field.parentNode.insertBefore(errorDiv, field.nextSibling);
        } else {
            field.style.borderColor = 'var(--success-color)';
        }
    }

    clearFieldError(field) {
        field.style.borderColor = '';
        const errorDiv = field.parentNode.querySelector('.field-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    validateForm() {
        const inputs = document.querySelectorAll('.checkout__form .form__input');
        let isFormValid = true;

        inputs.forEach(input => {
            if (!this.validateField(input)) {
                isFormValid = false;
            }
        });

        return isFormValid;
    }

    async handleCheckout(e) {
        e.preventDefault();

        if (!this.validateForm()) {
            this.cart.showSuccessMessage('Please fix the errors in the form');
            return;
        }

        // Show loading state
        const submitBtn = e.target.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;

        try {
            // Simulate API call
            await this.simulatePaymentProcessing();

            // Show success
            this.showCheckoutSuccess();
            
            // Clear cart
            this.cart.clearCart();
            
            // Close modal
            setTimeout(() => {
                this.cart.closeCheckoutModal();
                this.resetForm();
            }, 2000);

        } catch (error) {
            console.error('Checkout failed:', error);
            this.cart.showSuccessMessage('Payment failed. Please try again.');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    }

    simulatePaymentProcessing() {
        return new Promise((resolve) => {
            setTimeout(resolve, 2000); // Simulate 2-second processing
        });
    }

    showCheckoutSuccess() {
        const checkoutContent = document.querySelector('.checkout__content');
        const successHTML = `
            <div style="padding: 40px; text-align: center;">
                <i class="fas fa-check-circle" style="font-size: 48px; color: var(--success-color); margin-bottom: 16px;"></i>
                <h3 style="color: var(--text-primary); margin-bottom: 16px;">Order Successful!</h3>
                <p style="color: var(--text-secondary); margin-bottom: 24px;">
                    Thank you for your purchase. Your order has been confirmed and will be shipped soon.
                </p>
                <p style="color: var(--text-light); font-size: 14px;">
                    You will receive an email confirmation shortly.
                </p>
            </div>
        `;
        checkoutContent.innerHTML = successHTML;
    }

    resetForm() {
        const checkoutForm = document.getElementById('checkoutForm');
        if (checkoutForm) {
            checkoutForm.reset();
            
            // Clear any validation styles
            const inputs = checkoutForm.querySelectorAll('.form__input');
            inputs.forEach(input => {
                input.style.borderColor = '';
                this.clearFieldError(input);
            });
        }
    }
}

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Create global cart instance
    window.cart = new ShoppingCart();
    window.checkout = new Checkout(window.cart);
});

// Export for module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ShoppingCart, Checkout };
}