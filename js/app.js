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

let navbarList = document.querySelector("#navbar__list");
const sections = document.querySelectorAll("section");

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

//Function to check if an element is in viewport or not
var isInViewport = function (elem) {
 var top = elem.offsetTop;
  var left = elem.offsetLeft;
  var width = elem.offsetWidth;
  var height = elem.offsetHeight;

  while(elem.offsetParent) {
    elem = elem.offsetParent;
    top += elem.offsetTop;
    left += elem.offsetLeft;
  }

  return (
    top < (window.pageYOffset + window.innerHeight) &&
    left < (window.pageXOffset + window.innerWidth) &&
    (top + height) > window.pageYOffset &&
    (left + width) > window.pageXOffset
  );
};

//Function to remove active classes
function deactivateSections() {
    sections.forEach((element)=>{
        element.classList.remove("active");
    });
}

function deactivateNavLinks() {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    navbarAnchors.forEach((element)=>{
        element.classList.remove("active-nav");
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
window.addEventListener('load', buildNavbar())

// Add class 'active' to section when near top of viewport
function activateCurrentSection(currentSection) {
    currentSection.classList.add("active");

    deactivateNavLinks();
    activateNavLinks(currentSection.getAttribute('id'));
}

function activateNavLinks(currentSectionId) {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    //console.log(navbarAnchors);
        navbarAnchors.forEach((element)=>{
            if(element.getAttribute('href') == `#${currentSectionId}`) {
                element.classList.add("active-nav");
            }
        });
}

// Scroll to anchor ID using scrollTO event
function scrollToSectionOnClick() {
    let navbarAnchors = document.querySelectorAll(".nav__hyperlink");
    navbarAnchors.forEach((element) => {
        element.addEventListener("click", function(event) {
            event.preventDefault();
            document.querySelector(element.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu
function buildNavbar() {
	sections.forEach((element)=>{
	    let listItem = document.createElement("li");
	    listItem.classList.add("navbar__list__item");
    	let sectionName = element.getAttribute("data-nav");
    	let currentSectionId = element.getAttribute("id");
        listItem.innerHTML = `<a href="#${currentSectionId}" class="nav__hyperlink">${sectionName}</a>`;
        navbarList.appendChild(listItem);
    });
}

// Scroll to section on link click
scrollToSectionOnClick();

// Set sections as active
window.addEventListener('scroll', function (event) {
    sections.forEach((element)=>{
        //console.log(element);
        if (isInViewport(element)) {
            deactivateSections();
            activateCurrentSection(element);
            //console.log('In viewport!');
        } else if(window.scrollY==0) {
            deactivateSections();
            deactivateNavLinks();
            //console.log('No Change');
        }
    }, false);
});