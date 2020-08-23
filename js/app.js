/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
 */

/**
 * Define Global Variables
 * 
 */
const navbar_menu = document.getElementsByTagName('nav');
const navbar_list = document.getElementById('navbar__list');
const sections = document.querySelectorAll('section');
let currentActiveElement = document.querySelector('.active');


/**
 * End Global Variables
 * Start Helper Functions
 * 
 */
/* this function create the navbar item with for...of loop */
/* use section for single item and use sections for plurailer*/
const buildNavList = () => {
    for (section of sections) {
        const currentSectionId = section.getAttribute('id');
        if (section.attributes['data-nav']) {
            const currentSectionName = section.getAttribute('data-nav');
            let aaa = document.createElement('a');
            let navbar__item = document.createElement('li');
            aaa.textContent = currentSectionName;
            aaa.classList.add('menu__link');
            aaa.setAttribute('id', `${currentSectionId}__link`);
            aaa.setAttribute('href', `#${currentSectionId}`);
            if (section.classList.contains('active')) {
                aaa.classList.add('active');
            }
            navbar__item.setAttribute('class', 'navbar__item');
            navbar__item.onclick = function(ooo) {
                ooo.preventDefault();
                // Scroll to anchor ID using scrollIntoView event
                document.querySelector(`#${currentSectionId}`).scrollIntoView({
                    behavior: 'smooth'
                });
            }
            navbar__item.appendChild(aaa);
            navbar_list.append(navbar__item);
        }
    }
}

const isElementInViewPort = (element) => {
    let rectangle = element.getBoundingClientRect();

    return (
        rectangle.top >= 0 &&
        rectangle.left >= 0 &&
        rectangle.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /* or $(window).height() */
        rectangle.right <= (window.innerWidth || document.documentElement.clientWidth) /* or $(window).width() */
    );
}
const showCurrentActiveSection = () => {
    let navbar__list__links = document.querySelectorAll('nav ul li a');
    for (link of navbar__list__links) {
        let section = document.querySelector(link.hash);
        if (section.classList.contains('active') && section === currentActiveElement) {
            link.classList.add('active');
        } else {
            section.classList.remove('active');
            link.classList.remove('active');
            if (isElementInViewPort(section)) {
                // Add class 'active' to section when near top of viewport
                currentActiveElement.classList.add('active');
                link.classList.add('active');
                currentActiveElement = section;
            }
        }
    }
}


/**
 * End Helper Functions
 * Begin Main Functions
 * 
 */

// build the nav
function init() {
    // build the nav
    buildNavList();
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
function onScroll() {
    showCurrentActiveSection();
    scrollToTop();
}

/**
 * End Main Functions
 * Begin Events
 * 
 */

document.addEventListener('DOMContentLoaded', init);

// Build menu 

// Scroll to section on link click
window.addEventListener('scroll', onScroll);
window.onbeforeunload = function() {
    window.scrollTo(0, 0);
}