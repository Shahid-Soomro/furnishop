// =========================================
// PRODUCTS DATABASE
// =========================================

const products = [

{
id:1,
name:"Nordic Chair",
category:"chair",
price:89,
rating:4.8,
badge:"New",
image:"https://images.unsplash.com/photo-1582582429416-cf45b4f5d90d?w=800",
description:"Premium Nordic chair with modern comfort."
},

{
id:2,
name:"Luxury Sofa",
category:"sofa",
price:199,
rating:4.9,
badge:"Sale",
image:"https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800",
description:"Luxury sofa crafted with premium materials."
},

{
id:3,
name:"Wood Table",
category:"table",
price:129,
rating:4.7,
badge:"Hot",
image:"https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800",
description:"Elegant wooden table for modern homes."
},

{
id:4,
name:"Premium Decor",
category:"decor",
price:149,
rating:4.6,
badge:"New",
image:"https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800",
description:"Premium decor collection for interiors."
}

];

// =========================================
// DOM ELEMENTS
// =========================================

const productsContainer =
document.getElementById("productsContainer");

const productCount =
document.getElementById("productCount");

const searchInput =
document.getElementById("searchInput");

const categoryFilter =
document.getElementById("categoryFilter");

const sortFilter =
document.getElementById("sortFilter");

// =========================================
// RENDER PRODUCTS
// =========================================

function renderProducts(items){

    productsContainer.innerHTML = "";

    productCount.textContent = items.length;

    items.forEach(product => {

        productsContainer.innerHTML += `

        <div class="shop-product">

            <div class="product-thumb">

                <img src="${product.image}" alt="${product.name}">

                <span class="product-label">
                    ${product.badge}
                </span>

                <button
                class="wishlist-icon"
                data-id="${product.id}">
                    <i class="far fa-heart"></i>
                </button>

            </div>

            <div class="product-content">

                <div class="product-category">
                    ${product.category}
                </div>

                <h3 class="product-name">
                    ${product.name}
                </h3>

                <div class="rating">

                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>

                    <span>
                        ${product.rating}
                    </span>

                </div>

                <div class="price-row">

                    <div class="price">
                        $${product.price}
                    </div>

                </div>

                <div class="product-actions">

                    <button
                    class="add-cart-btn"
                    data-id="${product.id}">
                        Add To Cart
                    </button>

                    <button
                    class="quick-view-btn"
                    data-id="${product.id}">
                        <i class="fas fa-eye"></i>
                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// =========================================
// INITIAL LOAD
// =========================================

renderProducts(products);

// =========================================
// SEARCH PRODUCTS
// =========================================

searchInput.addEventListener("input", () => {

    const value =
    searchInput.value.toLowerCase();

    const filtered =
    products.filter(product =>
        product.name
        .toLowerCase()
        .includes(value)
    );

    renderProducts(filtered);

});

// =========================================
// CATEGORY FILTER
// =========================================

categoryFilter.addEventListener("change", () => {

    const category =
    categoryFilter.value;

    if(category === "all"){

        renderProducts(products);
        return;

    }

    const filtered =
    products.filter(
        product =>
        product.category === category
    );

    renderProducts(filtered);

});

// =========================================
// SORT PRODUCTS
// =========================================

sortFilter.addEventListener("change", () => {

    const value =
    sortFilter.value;

    let sorted =
    [...products];

    if(value === "low"){

        sorted.sort(
        (a,b)=>
        a.price - b.price
        );

    }

    if(value === "high"){

        sorted.sort(
        (a,b)=>
        b.price - a.price
        );

    }

    if(value === "rating"){

        sorted.sort(
        (a,b)=>
        b.rating - a.rating
        );

    }

    renderProducts(sorted);

});

// =========================================
// WISHLIST SYSTEM
// =========================================

let wishlist =
JSON.parse(
localStorage.getItem("wishlist")
) || [];

const wishlistCount =
document.querySelector(
".wishlist-count"
);

updateWishlistCount();

function updateWishlistCount(){

    if(wishlistCount){

        wishlistCount.textContent =
        wishlist.length;
    }

}

// =========================================
// ADD TO WISHLIST
// =========================================

document.addEventListener(
"click",
function(e){

    const btn =
    e.target.closest(".wishlist-icon");

    if(!btn) return;

    const id =
    Number(btn.dataset.id);

    const exists =
    wishlist.find(
    item => item === id
    );

    if(exists){

        showToast(
        "Already in wishlist"
        );

        return;
    }

    wishlist.push(id);

    localStorage.setItem(
    "wishlist",
    JSON.stringify(wishlist)
    );

    updateWishlistCount();

    btn.innerHTML =
    '<i class="fas fa-heart"></i>';

    btn.style.color =
    "#ef4444";

    showToast(
    "Added to wishlist"
    );

});

// =========================================
// CART SYSTEM
// =========================================

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

const cartCounter =
document.querySelector(
".cart-count"
);

updateCartCounter();

function updateCartCounter(){

    if(cartCounter){

        cartCounter.textContent =
        cart.length;
    }

}

// =========================================
// ADD TO CART
// =========================================

document.addEventListener(
"click",
function(e){

    const btn =
    e.target.closest(
    ".add-cart-btn"
    );

    if(!btn) return;

    const id =
    Number(btn.dataset.id);

    const product =
    products.find(
    p => p.id === id
    );

    const existing =
    cart.find(
    item => item.id === id
    );

    if(existing){

        existing.qty++;

    }else{

        cart.push({
            ...product,
            qty:1
        });

    }

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    updateCartCounter();

    showToast(
    "Added to cart"
    );

});

// =========================================
// SAVE CART
// =========================================

function saveCart(){

    localStorage.setItem(
    "cart",
    JSON.stringify(cart)
    );

    updateCartCounter();

}

// =========================================
// SIMPLE TOAST
// =========================================

function showToast(message){

    const container =
    document.querySelector(
    ".toast-container"
    );

    if(!container) return;

    const toast =
    document.createElement("div");

    toast.className =
    "shop-toast";

    toast.innerHTML = `
    <i class="fas fa-check-circle"></i>
    ${message}
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    },100);

    setTimeout(() => {

        toast.classList.remove(
        "show"
        );

        setTimeout(() => {

            toast.remove();

        },300);

    },2500);

}

// =========================================
// QUICK VIEW MODAL
// =========================================

const quickViewModal =
document.getElementById(
"quickViewModal"
);

const modalBody =
document.getElementById(
"modalBody"
);

const closeModal =
document.getElementById(
"closeModal"
);

// =========================================
// OPEN QUICK VIEW
// =========================================

document.addEventListener(
"click",
function(e){

    const btn =
    e.target.closest(
    ".quick-view-btn"
    );

    if(!btn) return;

    const id =
    Number(btn.dataset.id);

    const product =
    products.find(
    item => item.id === id
    );

    if(!product) return;

    modalBody.innerHTML = `

    <div class="modal-product">

        <div>

            <img
            src="${product.image}"
            alt="${product.name}">

        </div>

        <div class="modal-details">

            <span class="product-category">
                ${product.category}
            </span>

            <h2>
                ${product.name}
            </h2>

            <div class="modal-price">
                $${product.price}
            </div>

            <p>
                ${product.description}
            </p>

            <button
            class="add-cart-btn modal-cart-btn"
            data-id="${product.id}">

                Add To Cart

            </button>

        </div>

    </div>

    `;

    quickViewModal.classList.add(
    "active"
    );

});

// =========================================
// CLOSE MODAL
// =========================================

if(closeModal){

    closeModal.addEventListener(
    "click",
    () => {

        quickViewModal.classList.remove(
        "active"
        );

    });

}

if(quickViewModal){

    quickViewModal.addEventListener(
    "click",
    (e)=>{

        if(
        e.target === quickViewModal
        ){

            quickViewModal.classList.remove(
            "active"
            );

        }

    });

}

// =========================================
// CART SIDEBAR
// =========================================

const cartSidebar =
document.getElementById(
"cartSidebar"
);

const cartBtn =
document.getElementById(
"cartBtn"
);

const closeCartBtn =
document.getElementById(
"closeCartBtn"
);

const cartItems =
document.getElementById(
"cartItems"
);

const cartTotal =
document.getElementById(
"cartTotal"
);

// =========================================
// OPEN CART
// =========================================

if(cartBtn){

    cartBtn.addEventListener(
    "click",
    ()=>{

        cartSidebar.classList.add(
        "active"
        );

        renderCart();

    });

}

// =========================================
// CLOSE CART
// =========================================

if(closeCartBtn){

    closeCartBtn.addEventListener(
    "click",
    ()=>{

        cartSidebar.classList.remove(
        "active"
        );

    });

}

// =========================================
// RENDER CART
// =========================================

function renderCart(){

    if(!cartItems) return;

    cartItems.innerHTML = "";

    let total = 0;

    if(cart.length === 0){

        cartItems.innerHTML = `
        <p>
        Your cart is empty
        </p>
        `;

        cartTotal.textContent = "0";

        return;
    }

    cart.forEach(item => {

        total +=
        item.price * item.qty;

        cartItems.innerHTML += `

        <div class="cart-item">

            <img
            src="${item.image}"
            alt="${item.name}">

            <div class="cart-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    $${item.price}
                </p>

                <div class="quantity-box">

                    <button
                    class="qty-btn minus-btn"
                    data-id="${item.id}">
                        -
                    </button>

                    <span>
                        ${item.qty}
                    </span>

                    <button
                    class="qty-btn plus-btn"
                    data-id="${item.id}">
                        +
                    </button>

                </div>

                <br>

                <button
                class="remove-item"
                data-id="${item.id}">

                    Remove

                </button>

            </div>

        </div>

        `;

    });

    cartTotal.textContent =
    total.toFixed(2);

}

// =========================================
// QUANTITY & REMOVE
// =========================================

document.addEventListener(
"click",
function(e){

    const plus =
    e.target.closest(
    ".plus-btn"
    );

    const minus =
    e.target.closest(
    ".minus-btn"
    );

    const remove =
    e.target.closest(
    ".remove-item"
    );

    // PLUS

    if(plus){

        const id =
        Number(
        plus.dataset.id
        );

        const item =
        cart.find(
        p => p.id === id
        );

        if(item){

            item.qty++;

            saveCart();

            renderCart();
        }

    }

    // MINUS

    if(minus){

        const id =
        Number(
        minus.dataset.id
        );

        const item =
        cart.find(
        p => p.id === id
        );

        if(item){

            if(item.qty > 1){

                item.qty--;

            }else{

                cart =
                cart.filter(
                p => p.id !== id
                );

            }

            saveCart();

            renderCart();

        }

    }

    // REMOVE

    if(remove){

        const id =
        Number(
        remove.dataset.id
        );

        cart =
        cart.filter(
        item => item.id !== id
        );

        saveCart();

        renderCart();

        showToast(
        "Item removed"
        );

    }

});

// =========================================
// CHECKOUT DEMO
// =========================================

document.addEventListener(
"click",
function(e){

    const checkout =
    e.target.closest(
    ".checkout-btn"
    );

    if(!checkout) return;

    if(cart.length === 0){

        showToast(
        "Cart is empty"
        );

        return;
    }

    showToast(
    "Checkout page coming soon"
    );

});

// =========================================
// INITIAL CART LOAD
// =========================================

renderCart();