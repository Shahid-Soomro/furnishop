// =========================================
// LUXECART CHECKOUT SYSTEM
// =========================================

// DOM ELEMENTS

const checkoutItems =
document.getElementById("checkoutItems");

const checkoutSubtotal =
document.getElementById("checkoutSubtotal");

const checkoutTax =
document.getElementById("checkoutTax");

const checkoutTotal =
document.getElementById("checkoutTotal");

const checkoutForm =
document.getElementById("checkoutForm");

// =========================================
// GET CART
// =========================================

let cart =
JSON.parse(
localStorage.getItem("cart")
) || [];

// =========================================
// RENDER CHECKOUT ITEMS
// =========================================

function renderCheckoutItems(){

    if(!checkoutItems) return;

    if(cart.length === 0){

        checkoutItems.innerHTML = `

        <div class="order-success">

            <i class="fas fa-shopping-cart"></i>

            <h2>
                Cart Is Empty
            </h2>

            <p>
                Add products before checkout.
            </p>

        </div>

        `;

        updateTotals();

        return;
    }

    checkoutItems.innerHTML = "";

    cart.forEach(item => {

        checkoutItems.innerHTML += `

        <div class="checkout-item">

            <img
            src="${item.image}"
            alt="${item.name}">

            <div class="checkout-item-info">

                <h4>
                    ${item.name}
                </h4>

                <p>
                    $${item.price}
                </p>

                <small>
                    Quantity: ${item.qty}
                </small>

            </div>

        </div>

        `;

    });

    updateTotals();

}

// =========================================
// TOTALS
// =========================================

function updateTotals(){

    let subtotal = 0;

    cart.forEach(item => {

        subtotal +=
        item.price * item.qty;

    });

    const shipping =
    cart.length > 0 ? 20 : 0;

    const tax =
    subtotal * 0.10;

    const total =
    subtotal + tax + shipping;

    if(checkoutSubtotal){

        checkoutSubtotal.textContent =
        `$${subtotal.toFixed(2)}`;

    }

    if(checkoutTax){

        checkoutTax.textContent =
        `$${tax.toFixed(2)}`;

    }

    if(checkoutTotal){

        checkoutTotal.textContent =
        `$${total.toFixed(2)}`;

    }

}

// =========================================
// VALIDATE FORM
// =========================================

function validateForm(){

    const fullName =
    document.getElementById(
    "fullName"
    ).value.trim();

    const email =
    document.getElementById(
    "email"
    ).value.trim();

    const phone =
    document.getElementById(
    "phone"
    ).value.trim();

    const address =
    document.getElementById(
    "address"
    ).value.trim();

    const city =
    document.getElementById(
    "city"
    ).value.trim();

    const country =
    document.getElementById(
    "country"
    ).value.trim();

    if(
        !fullName ||
        !email ||
        !phone ||
        !address ||
        !city ||
        !country
    ){

        alert(
        "Please fill all fields."
        );

        return false;
    }

    return true;
}

// =========================================
// PLACE ORDER
// =========================================

if(checkoutForm){

    checkoutForm.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        if(cart.length === 0){

            alert(
            "Your cart is empty."
            );

            return;
        }

        if(
        !validateForm()
        ) return;

        // SAVE ORDER

        const order = {

            id:
            Date.now(),

            customer:
            document.getElementById(
            "fullName"
            ).value,

            email:
            document.getElementById(
            "email"
            ).value,

            phone:
            document.getElementById(
            "phone"
            ).value,

            items:cart,

            createdAt:
            new Date()
            .toLocaleString()

        };

        localStorage.setItem(
            "latestOrder",
            JSON.stringify(order)
        );

        // CLEAR CART

        localStorage.removeItem(
        "cart"
        );

        cart = [];

        // SUCCESS UI

        document.querySelector(
        ".checkout-page"
        ).innerHTML = `

        <div class="container">

            <div class="order-success">

                <i class="fas fa-check-circle"></i>

                <h2>
                    Order Placed Successfully
                </h2>

                <p>

                    Thank you for shopping
                    with LuxeCart.

                </p>

                <br>

                <a
                href="index.html"
                class="btn">

                    Back To Home

                </a>

            </div>

        </div>

        `;

        // AUTO REDIRECT

        setTimeout(()=>{

            window.location.href =
            "index.html";

        },5000);

    });

}

// =========================================
// LOAD DARK MODE
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

renderCheckoutItems();

console.log(
"Furni Checkout Loaded"
);