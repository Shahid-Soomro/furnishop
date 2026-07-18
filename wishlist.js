
// =========================================
// LUXECART WISHLIST SYSTEM
// =========================================

const wishlistContainer =
document.getElementById(
"wishlistContainer"
);

// =========================================
// GET DATA
// =========================================

let wishlist =
JSON.parse(
localStorage.getItem(
"wishlist"
)) || [];

let cart =
JSON.parse(
localStorage.getItem(
"cart"
)) || [];

// =========================================
// SAVE DATA
// =========================================

function saveWishlist(){

    localStorage.setItem(
    "wishlist",
    JSON.stringify(
    wishlist
    ));

}

function saveCart(){

    localStorage.setItem(
    "cart",
    JSON.stringify(
    cart
    ));

}

// =========================================
// RENDER WISHLIST
// =========================================

function renderWishlist(){

    if(!wishlistContainer)
    return;

    if(wishlist.length === 0){

        wishlistContainer.innerHTML = `

        <div class="empty-wishlist">

            <i class="fas fa-heart-broken"></i>

            <h2>
                Wishlist Is Empty
            </h2>

            <p>

                Save products to your
                wishlist first.

            </p>

            <a href="shop.html">

                Continue Shopping

            </a>

        </div>

        `;

        return;
    }

    wishlistContainer.innerHTML = "";

    wishlist.forEach(product => {

        wishlistContainer.innerHTML += `

        <div class="wishlist-card">

            <img
            src="${product.image}"
            alt="${product.name}">

            <div class="wishlist-content">

                <h3>
                    ${product.name}
                </h3>

                <div class="wishlist-price">

                    $${product.price}

                </div>

                <div class="wishlist-actions">

                    <button
                    class="move-cart-btn"
                    data-id="${product.id}">

                        Move To Cart

                    </button>

                    <button
                    class="remove-wishlist-btn"
                    data-id="${product.id}">

                        <i class="fas fa-trash"></i>

                    </button>

                </div>

            </div>

        </div>

        `;

    });

}

// =========================================
// MOVE TO CART
// =========================================

document.addEventListener(
"click",
function(e){

    const moveBtn =
    e.target.closest(
    ".move-cart-btn"
    );

    if(!moveBtn) return;

    const id =
    Number(
    moveBtn.dataset.id
    );

    const product =
    wishlist.find(
    item => item.id === id
    );

    if(!product) return;

    const existing =
    cart.find(
    item => item.id === id
    );

    if(existing){

        existing.qty =
        (existing.qty || 1) + 1;

    }else{

        cart.push({

            ...product,

            qty:1

        });

    }

    wishlist =
    wishlist.filter(
    item => item.id !== id
    );

    saveCart();
    saveWishlist();

    renderWishlist();

    showToast(
    "Moved to cart"
    );

});

// =========================================
// REMOVE ITEM
// =========================================

document.addEventListener(
"click",
function(e){

    const removeBtn =
    e.target.closest(
    ".remove-wishlist-btn"
    );

    if(!removeBtn) return;

    const id =
    Number(
    removeBtn.dataset.id
    );

    wishlist =
    wishlist.filter(
    item => item.id !== id
    );

    saveWishlist();

    renderWishlist();

    showToast(
    "Removed from wishlist"
    );

});

// =========================================
// TOAST
// =========================================

function showToast(message){

    let container =
    document.querySelector(
    ".toast-container"
    );

    if(!container){

        container =
        document.createElement(
        "div"
        );

        container.className =
        "toast-container";

        document.body.appendChild(
        container
        );

    }

    const toast =
    document.createElement(
    "div"
    );

    toast.className =
    "shop-toast";

    toast.innerHTML = `

        <i class="fas fa-check-circle"></i>
        ${message}

    `;

    container.appendChild(
    toast
    );

    setTimeout(()=>{

        toast.classList.add(
        "show"
        );

    },100);

    setTimeout(()=>{

        toast.classList.remove(
        "show"
        );

        setTimeout(()=>{

            toast.remove();

        },300);

    },2500);

}

// =========================================
// DARK MODE
// =========================================

const savedTheme =
localStorage.getItem(
"theme"
);

if(savedTheme === "dark"){

    document.body.classList.add(
    "dark"
    );

}

// =========================================
// INIT
// =========================================

renderWishlist();

console.log(
"Wishlist Loaded"
);

