
// =========================================
// LUXECART BLOG PAGE
// =========================================

// =========================================
// BLOG SEARCH
// =========================================

const searchInput =
document.getElementById(
"blogSearch"
);

const blogCards =
document.querySelectorAll(
".blog-card"
);

if(searchInput){

    searchInput.addEventListener(
    "keyup",
    ()=>{

        const value =
        searchInput.value
        .toLowerCase();

        blogCards.forEach(card => {

            const text =
            card.textContent
            .toLowerCase();

            if(
                text.includes(value)
            ){

                card.style.display =
                "block";

            }else{

                card.style.display =
                "none";

            }

        });

    });

}

// =========================================
// NEWSLETTER
// =========================================

const newsletterForm =
document.getElementById(
"newsletterForm"
);

if(newsletterForm){

    newsletterForm.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const email =
        this.querySelector(
        "input"
        ).value.trim();

        if(!email){

            showToast(
            "Please enter email"
            );

            return;
        }

        showToast(
        "Subscribed successfully!"
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
// SCROLL REVEAL
// =========================================

const revealItems =
document.querySelectorAll(
`
.blog-card,
.sidebar-card,
.featured-card,
.newsletter-box
`
);

const revealObserver =
new IntersectionObserver(

entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            entry.target.classList.add(
            "revealed"
            );

        }

    });

},

{
    threshold:0.15
}

);

revealItems.forEach(item => {

    item.classList.add(
    "reveal-item"
    );

    revealObserver.observe(
    item
    );

});

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
"Furni Blog Loaded"
);