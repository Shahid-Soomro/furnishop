
// =========================================
// LUXECART ABOUT PAGE
// =========================================

// =========================================
// COUNTER ANIMATION
// =========================================

const counters =
document.querySelectorAll(
".counter"
);

let counterStarted = false;

function startCounters(){

    if(counterStarted) return;

    counterStarted = true;

    counters.forEach(counter => {

        const target =
        Number(
        counter.dataset.target
        );

        let current = 0;

        const increment =
        Math.ceil(target / 100);

        const timer =
        setInterval(()=>{

            current += increment;

            if(current >= target){

                current = target;

                clearInterval(timer);

            }

            counter.textContent =
            current;

        },20);

    });

}

// =========================================
// INTERSECTION OBSERVER
// =========================================

const statsSection =
document.querySelector(
".stats-section"
);

if(statsSection){

    const observer =
    new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if(entry.isIntersecting){

                startCounters();

            }

        });

    },

    {
        threshold:0.3
    }

    );

    observer.observe(
    statsSection
    );

}

// =========================================
// NEWSLETTER FORM
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
        "Successfully subscribed!"
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
.choose-card,
.team-card,
.stat-card,
.testimonial-card
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
"LuxeCart About Page Loaded"
);