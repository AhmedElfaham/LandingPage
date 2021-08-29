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
var unordedlst = document.getElementsByTagName("ul")[0];
var frgmt =  document.createDocumentFragment();
var sectionsLST=document.querySelectorAll('section');


/**
 * End Global Variables
 * Start Helper Functions
 * 
*/ 
/**
 * @description 
 * Removing Active class From All Sections 
 * Mark active class to section
 * @param {Element } section section element that will be set to active
 */
function setSectionActive(section)
{
   //Removing Active class From All Sections
    sectionsLST.forEach( element => {
        element.classList.remove('your-active-class');
    });
    //Mark section as an active
    section.classList.add('your-active-class');
}

/**
 * @description Reset navigtion menue item links to Defualt
 */
function resetnavBar()
{
    var selectedAnchors= unordedlst.querySelectorAll('a.menu__link2');
   
      selectedAnchors.forEach (element => {
             element.classList.remove('menu__link2'); 
    });
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
/**
 * Creat Dynamicly items for unorderlist with links for each section 
 */
function createNavBar()
{
    
sectionsLST.forEach(section =>  
        {
                var txt = document.createTextNode(section.getAttribute('data-nav'));
                var ancr=document.createElement('a');
                ancr.className ='menu__link';
                ancr.appendChild(txt);
                
                ancr.addEventListener('click', event=> 
                {
                    setSectionActive(section);
                    section.scrollIntoView({ behavior :'smooth'});
                    event.preventDefault();
                });
                var itm=document.createElement('li');
                itm.setAttribute('data-nav',section.getAttribute('data-nav')); 
                itm.appendChild(ancr);
                frgmt.appendChild(itm);
        });
        unordedlst.appendChild(frgmt);

}


/**
 * @description Detect the current section and set active class while scrolling
 */
function sectionAutoSelect()
{
    document.addEventListener('scroll',() =>
    { 
        sectionsLST.forEach(section => {
            
            var sectionRect=section.getBoundingClientRect();
            if (sectionRect.top > -25 && sectionRect.top <300 )
            {
                setSectionActive(section);
                //equivilant navigation item link
                var secAnchor=document.querySelectorAll('li[data-nav="'+section.getAttribute('data-nav')+"\"] a")[0] ;
                resetnavBar(); 
                secAnchor.classList.add('menu__link2');
            }

        });
    } 
    );
     

}


/**
 * 
 * @param {object} Observeroptions the intersection Observer options that will use to fire intersection Observer callback function
 */
function sectionAutoSelect(Observeroptions)
{
            
        const SecObserver = new IntersectionObserver((entries) => 
        {
        var intersection =entries.find(entry=> entry.isIntersecting === true );
                if ( intersection != null )
                {
                    var section =intersection.target;
                    setSectionActive(section); 
                    var  secAnchor  = document.querySelector('li[data-nav="'+section.getAttribute('data-nav')+"\"] a") ;
                    resetnavBar(); 
                    if( secAnchor != null )
                    { secAnchor.classList.add('menu__link2') ;}
                    
                    console.log(section); 

                } 
        }
            ,Observeroptions
        );

        sectionsLST.forEach( section => {
        SecObserver.observe(section);

        });

     

}


// Add class 'active' to section when near top of viewport
//document.addEventListener('scrollTo ',function(){});

// Scroll to anchor ID using scrollTO event


/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
// call main Functions
createNavBar();
var intersectionObserverOptions={
    /**
     * @property the intersection ratio between viewport and Section,
     *  which represent of the section  partial  appearance  at the viewport before callback function fire.     */
    threshold:0.8
};
//Use Scrolling and viewport to detect Sections and it's equivalent Navigation list item 
sectionAutoSelect(intersectionObserverOptions);

// Scroll to section on link click

// Set sections as active


