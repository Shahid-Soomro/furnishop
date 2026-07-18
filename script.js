// =========================================
// MOBILE MENU
// =========================================

const menuBtn = document.getElementById("menuBtn");
const closeMenu = document.getElementById("closeMenu");
const mobileMenu = document.getElementById("mobileMenu");
const overlay = document.getElementById("overlay");

if(menuBtn){
    menuBtn.addEventListener("click", () => {
        mobileMenu.classList.add("active");
        overlay.classList.add("active");
        document.body.style.overflow = "hidden";
    });
}

if(closeMenu){
    closeMenu.addEventListener("click", closeMobileMenu);
}

if(overlay){
    overlay.addEventListener("click", closeMobileMenu);
}

function closeMobileMenu(){
    mobileMenu.classList.remove("active");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
}

// =========================================
// DARK MODE
// =========================================

const themeToggle = document.getElementById("themeToggle");

const savedTheme = localStorage.getItem("theme");

if(savedTheme === "dark"){
    document.body.classList.add("dark");
}

if(themeToggle){

    themeToggle.addEventListener("click", () => {

        document.body.classList.toggle("dark");

        const isDark =
        document.body.classList.contains("dark");

        localStorage.setItem(
            "theme",
            isDark ? "dark" : "light"
        );

        const icon =
        themeToggle.querySelector("i");

        if(icon){

            if(isDark){
                icon.classList.remove("fa-moon");
                icon.classList.add("fa-sun");
            }else{
                icon.classList.remove("fa-sun");
                icon.classList.add("fa-moon");
            }

        }

    });

}

// Set icon on load

if(themeToggle){

    const icon =
    themeToggle.querySelector("i");

    if(document.body.classList.contains("dark")){
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
    }

}

// =========================================
// SCROLL TO TOP
// =========================================

const scrollTopBtn =
document.getElementById("scrollTopBtn");

window.addEventListener("scroll", () => {

    if(window.scrollY > 400){
        scrollTopBtn.classList.add("show");
    }else{
        scrollTopBtn.classList.remove("show");
    }

});

if(scrollTopBtn){

    scrollTopBtn.addEventListener("click", () => {

        window.scrollTo({
            top:0,
            behavior:"smooth"
        });

    });

}

// =========================================
// HEADER SHADOW ON SCROLL
// =========================================

const header =
document.querySelector(".header");

window.addEventListener("scroll", () => {

    if(window.scrollY > 50){

        header.style.boxShadow =
        "0 10px 30px rgba(0,0,0,.08)";

    }else{

        header.style.boxShadow =
        "none";

    }

});

// =========================================
// CART SYSTEM
// =========================================

let cartCount =
parseInt(localStorage.getItem("cartCount")) || 0;

const cartCounter =
document.querySelector(".cart-count");

updateCartCounter();

const addCartButtons =
document.querySelectorAll(".add-cart");

addCartButtons.forEach(btn => {

    btn.addEventListener("click", () => {

        cartCount++;

        localStorage.setItem(
            "cartCount",
            cartCount
        );

        updateCartCounter();

        showToast("Product added to cart");

    });

});

function updateCartCounter(){

    if(cartCounter){

        cartCounter.textContent =
        cartCount;

    }

}

// =========================================
// NEWSLETTER FORM
// =========================================

const newsletterForm =
document.querySelector(".newsletter-form");

if(newsletterForm){

    newsletterForm.addEventListener(
        "submit",
        (e)=>{

            e.preventDefault();

            const email =
            newsletterForm.querySelector("input");

            if(email.value.trim() === ""){

                showToast(
                    "Please enter your email"
                );

                return;
            }

            showToast(
                "Successfully subscribed!"
            );

            newsletterForm.reset();

        }
    );

}

// =========================================
// SMOOTH SCROLL LINKS
// =========================================

document
.querySelectorAll('a[href^="#"]')
.forEach(link => {

    link.addEventListener("click", function(e){

        const target =
        document.querySelector(
            this.getAttribute("href")
        );

        if(target){

            e.preventDefault();

            target.scrollIntoView({
                behavior:"smooth"
            });

            closeMobileMenu();

        }

    });

});

// =========================================
// TOAST NOTIFICATIONS
// =========================================

function createToastContainer(){

    let container =
    document.querySelector(".toast-container");

    if(container) return container;

    container =
    document.createElement("div");

    container.className =
    "toast-container";

    document.body.appendChild(container);

    return container;

}

function showToast(message){

    const container =
    createToastContainer();

    const toast =
    document.createElement("div");

    toast.className =
    "toast";

    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    },100);

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {
            toast.remove();
        },300);

    },3000);

}

// =========================================
// FADE IN ANIMATION
// =========================================

const observer =
new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add(
                "animate"
            );

        }

    });

},{
    threshold:0.15
});

document
.querySelectorAll(
`
.hero-content,
.hero-image,
.product-card,
.feature-card,
.testimonial-card,
.blog-card
`
)
.forEach(item => {

    item.classList.add("fade-item");

    observer.observe(item);

});

// =========================================
// LOADED
// =========================================

window.addEventListener("load", () => {

    console.log(
        "LuxeCart Loaded Successfully"
    );

});

