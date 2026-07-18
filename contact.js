// =========================================
// LUXECART CONTACT PAGE
// =========================================

// =========================================
// CONTACT FORM
// =========================================

const contactForm =
document.getElementById(
"contactForm"
);

if(contactForm){

    contactForm.addEventListener(
    "submit",
    function(e){

        e.preventDefault();

        const name =
        document.getElementById(
        "name"
        ).value.trim();

        const email =
        document.getElementById(
        "email"
        ).value.trim();

        const subject =
        document.getElementById(
        "subject"
        ).value.trim();

        const message =
        document.getElementById(
        "message"
        ).value.trim();

        if(
            !name ||
            !email ||
            !subject ||
            !message
        ){

            showToast(
            "Please fill all fields"
            );

            return;
        }

        const emailRegex =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(
            !emailRegex.test(email)
        ){

            showToast(
            "Enter valid email"
            );

            return;
        }

        showToast(
        "Message sent successfully!"
        );

        contactForm.reset();

    });

}

// =========================================
// FAQ ACCORDION
// =========================================

const faqQuestions =
document.querySelectorAll(
".faq-question"
);

faqQuestions.forEach(item => {

    item.addEventListener(
    "click",
    ()=>{

        const parent =
        item.parentElement;

        document
        .querySelectorAll(
        ".faq-item"
        )
        .forEach(faq => {

            if(faq !== parent){

                faq.classList.remove(
                "active"
                );

            }

        });

        parent.classList.toggle(
        "active"
        );

    });

});

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
            "Enter your email"
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

const revealElements =
document.querySelectorAll(
`
.contact-card,
.faq-item,
.newsletter-box,
.contact-form-wrapper
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

revealElements.forEach(el => {

    el.classList.add(
    "reveal-item"
    );

    revealObserver.observe(
    el
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
"Contact Page Loaded"
);

