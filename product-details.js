
// =========================================
// PRODUCT DETAILS PAGE
// LuxeCart 2026
// =========================================

// MAIN IMAGE

const mainImage =
document.getElementById(
"mainProductImage"
);

const thumbnails =
document.querySelectorAll(
".thumb"
);

// =========================================
// THUMBNAIL SWITCH
// =========================================

thumbnails.forEach(thumb => {

    thumb.addEventListener(
    "click",
    () => {

        mainImage.src =
        thumb.src;

        thumbnails.forEach(item =>
        item.classList.remove(
        "active-thumb"
        ));

        thumb.classList.add(
        "active-thumb"
        );

    });

});

// =========================================
// QUANTITY SELECTOR
// =========================================

const quantityValue =
document.getElementById(
"quantityValue"
);

const increaseQty =
document.getElementById(
"increaseQty"
);

const decreaseQty =
document.getElementById(
"decreaseQty"
);

let quantity = 1;

if(increaseQty){

    increaseQty.addEventListener(
    "click",
    ()=>{

        quantity++;

        quantityValue.textContent =
        quantity;

    });

}


// =========================================
// DECREASE QUANTITY
// =========================================

if(decreaseQty){

    decreaseQty.addEventListener(
    "click",
    ()=>{

        if(quantity > 1){

            quantity--;

            quantityValue.textContent =
            quantity;

        }

    });

}

// =========================================
// PRODUCT DATA
// =========================================

const currentProduct = {

    id:999,

    name:"Modern Premium Sofa",

    category:"Luxury Furniture",

    price:249,

    image:
    mainImage
    ? mainImage.src
    : "",

    qty:quantity

};

// =========================================
// ADD TO CART
// =========================================

const addToCartBtn =
document.getElementById(
"addToCartBtn"
);

if(addToCartBtn){

    addToCartBtn.addEventListener(
    "click",
    ()=>{

        let cart =
        JSON.parse(
        localStorage.getItem(
        "cart"
        )) || [];

        const existing =
        cart.find(
        item =>
        item.id === currentProduct.id
        );

        if(existing){

            existing.qty +=
            quantity;

        }else{

            cart.push({

                ...currentProduct,

                image:
                mainImage.src,

                qty:quantity

            });

        }

        localStorage.setItem(
        "cart",
        JSON.stringify(cart)
        );

        showToast(
        "Product added to cart"
        );

    });

}

// =========================================
// BUY NOW
// =========================================

const buyNowBtn =
document.getElementById(
"buyNowBtn"
);

if(buyNowBtn){

    buyNowBtn.addEventListener(
    "click",
    ()=>{

        let cart =
        JSON.parse(
        localStorage.getItem(
        "cart"
        )) || [];

        const existing =
        cart.find(
        item =>
        item.id === currentProduct.id
        );

        if(existing){

            existing.qty +=
            quantity;

        }else{

            cart.push({

                ...currentProduct,

                image:
                mainImage.src,

                qty:quantity

            });

        }

        localStorage.setItem(
        "cart",
        JSON.stringify(cart)
        );

        window.location.href =
        "checkout.html";

    });

}

// =========================================
// REVIEW FORM
// =========================================

const reviewForm =
document.getElementById(
"reviewForm"
);

if(reviewForm){

    reviewForm.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const name =
        this.querySelector(
        "input"
        ).value;

        showToast(
        `Thanks ${name}! Review submitted.`
        );

        this.reset();

    });

}

// =========================================
// TOAST SYSTEM
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
// DARK MODE LOAD
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
// PAGE READY
// =========================================

console.log(
"Product Details Loaded"
);

