// =========================================
// CART PAGE SYSTEM
// LuxeCart 2026
// =========================================

// DOM ELEMENTS

const cartContainer =
document.getElementById("cartPageItems");

const subtotalElement =
document.getElementById("subtotal");

const taxElement =
document.getElementById("tax");

const grandTotalElement =
document.getElementById("grandTotal");

const checkoutBtn =
document.querySelector(".checkout-btn");

// =========================================
// GET CART FROM LOCALSTORAGE
// =========================================

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

// =========================================
// SAVE CART
// =========================================

function saveCart(){

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );

}

// =========================================
// CALCULATE TOTALS
// =========================================

function updateTotals(){

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
        item.price * item.qty;

    });

    const tax =
    subtotal * 0.10;

    const shipping =
    cart.length > 0 ? 20 : 0;

    const grandTotal =
    subtotal + tax + shipping;

    subtotalElement.textContent =
    `$${subtotal.toFixed(2)}`;

    taxElement.textContent =
    `$${tax.toFixed(2)}`;

    grandTotalElement.textContent =
    `$${grandTotal.toFixed(2)}`;

}

// =========================================
// RENDER CART
// =========================================

function renderCart(){

    if(!cartContainer) return;

    if(cart.length === 0){

        cartContainer.innerHTML = `

        <div class="empty-cart">

            <i class="fas fa-shopping-cart"></i>

            <h3>
                Your Cart Is Empty
            </h3>

            <p>
                Add products from the shop page.
            </p>

        </div>

        `;

        subtotalElement.textContent =
        "$0.00";

        taxElement.textContent =
        "$0.00";

        grandTotalElement.textContent =
        "$0.00";

        return;
    }

    cartContainer.innerHTML = "";

    cart.forEach(item => {

        cartContainer.innerHTML += `

        <div class="cart-page-item">

            <img
            src="${item.image}"
            alt="${item.name}">

            <div class="cart-page-info">

                <h3>
                    ${item.name}
                </h3>

                <div class="cart-page-price">

                    $${item.price}

                </div>

                <div class="cart-qty">

                    <button
                    class="minus-btn"
                    data-id="${item.id}">
                        -
                    </button>

                    <span>
                        ${item.qty}
                    </span>

                    <button
                    class="plus-btn"
                    data-id="${item.id}">
                        +
                    </button>

                </div>

                <button
                class="remove-btn"
                data-id="${item.id}">

                    Remove Item

                </button>

            </div>

        </div>

        `;

    });

    updateTotals();

}

// =========================================
// QUANTITY + REMOVE
// =========================================

document.addEventListener(
"click",
function(e){

    const plus =
    e.target.closest(".plus-btn");

    const minus =
    e.target.closest(".minus-btn");

    const remove =
    e.target.closest(".remove-btn");

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

    }

});

// =========================================
// CHECKOUT BUTTON
// =========================================

if(checkoutBtn){

    checkoutBtn.addEventListener(
    "click",
    ()=>{

        if(cart.length === 0){

            alert(
            "Your cart is empty."
            );

            return;
        }

        alert(
        "Checkout page coming soon!"
        );

    });

}

// =========================================
// INITIAL LOAD
// =========================================

renderCart();

// =========================================
// DARK MODE SUPPORT
// =========================================

const savedTheme =
localStorage.getItem("theme");

if(savedTheme === "dark"){

    document.body.classList.add(
    "dark"
    );

}

// =========================================
// PAGE READY
// =========================================

console.log(
"Furni Page Loaded"
);

