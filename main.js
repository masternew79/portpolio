// Scss
import './assets/scss/style.scss';
import './assets/scss/_responsive.scss';
import '@fortawesome/fontawesome-free';

// jquery
window.$ = require('jquery');

// gsap
import { TimelineLite, Power1, SteppedEase, Power4, Bounce, Back, Elastic, TweenMax, TimelineMax } from 'gsap';

// scroll magic
import ScrollMagic from 'scrollmagic';
import fullpage from 'fullpage.js';
require('fullpage.js/vendors/scrolloverflow');

require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');

// drag and drop
import interact from 'interactjs'



function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

    // translate the element
    target.style.webkitTransform =
    target.style.transform =
        'translate(' + x + 'px, ' + y + 'px)';

    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

// this is used later in the resizing and gesture demos
window.dragMoveListener = dragMoveListener;

function isMobile() {
    return $('.is-mobile').css('display') == 'none';
}


function topIntroParagraphs() {
    return isMobile() ? '120px' : '60px';
}

function topMoon() {
    return isMobile() ? '74%' : '74%';
}


$(document).ready(function() {

    /**========================================== Variables ======================================*/
    const color = {
        primary: '#203a43',
        black: '#1c1b20',
        gray: '#203a43',
        red: '#c0392b',
        white: '#fff',
        yellow: '#fdcb6e',
        gradient: 'linear-gradient(to bottom, #0f2027, #203a43, #2c5364)'
    };
    const colorPalete = ['#4CAF50', '#FFC107', '#03A9F4'];
    let currentColor = colorPalete[0];

    /**
     * navigation
     */
    const navigation = $('#navigation');
    const navItems = $('#navigation ul li');
    const buttonCloseNav = $('#navigation .button');
    const buttonOpenNav = $('.button-open-navigation');

    /**
     * background
     */
    const background = $('.background');
    const circle = $('.background .circle');
    const circleSpan = $('.background .circle span');

    /**
     * home
     */
    const scrollDown = $('.scroll-down');
    const introParagraphs = $('.intro p span.wrapper');
    const hamburgerBtn = $('.button-open-navigation');
    const fireSpaceShip1 = $('#fire1');
    const fireSpaceShip2 = $('#fire2');
    const spaceship = $('#spaceship');
    const earth = $('#earth');
    const moon = $('#moon');
    const stars = $('#stars');
    const masternew = $('#masternew svg');


    /**
     * portfolio
    */
    const mars = $('#mars');
    const planet1 = $('#planet1');
    const subHeaderPortfolio = $('.portfolio .header p .wrapper');
    const svgPortfolio = $('svg#portfolio');
    const dots = $('.pagination .dot');
    const pagination = $('.pagination');
    const projectSection = $('.projects');

    /**
     * skills
    */
    const planet2 = $('#planet2');
    const svgSkills = $('svg#skills');
    const skillsLevel = $('.skill-level');

    /**
     * contact
    */
    const svgContact = $('svg#contact');

    /**==========================================Tweens=========================================*/

    /**
     * navigation open
     */
    function openNavigationTween() {
        let tl = new TimelineMax({paused: true});
        tl.to(navigation, 0.5, { css: { width: '300px'}, ease: Power1.easeOut })
        tl.staggerFromTo(navItems, 0.5, {x: 30, autoAlpha: 0}, {x: 0, autoAlpha: 1}, 0.2, '-=0.5')

        return tl;
    }

    /**
     * navigation close
     */
    function closeNavigationTween() {
        let tl = new TimelineMax({paused: true});
        tl.staggerTo(navItems, 0.5, {x: 30, autoAlpha: 0}, 0.2, '-=0.3')
        tl.to(navigation, 0.6, { css: { width: '0px'}, ease: Power1.easeIn });

        return tl;
    }


    /**
     * home
     */
    function showHomePageFirstTime() {
        const tl = new TimelineMax();
        tl.to(spaceship, 1, {css: {top: '30%'}, ease: Power1.easeOut, delay: 1})
        tl.to(earth, 1, {css: {top: '120%'}, ease: Power1.easeOut}, '-=0.7')
        tl.to(stars, 1, {css: {top: '0%'}, ease: Power1.easeOut}, '-=0.7')
        tl.to(spaceship, 0.7, {css: {top: '-50%'}, ease: Power1.easeIn}, '-=1')
        tl.to(moon, 1, {css: {top: topMoon()}, ease: Power1.easeOut})
        tl.fromTo(masternew, 1.5, {css: {'stroke-dashoffset': '600'}}, {css: {opacity: 1, 'stroke-dashoffset': '0'}, ease: Power1.easeOut}, '-=0.7')
        return tl;
    }

    function showHomePage() {
        const tl = new TimelineMax();
        tl.to(moon, 1.5, {css: {top: topMoon()}, ease: Power1.easeOut})
        tl.fromTo(masternew, 1.5, {css: {'stroke-dashoffset': '600'}}, {css: {opacity: 1, 'stroke-dashoffset': '0'}, ease: Power1.easeOut}, '-=0.7')
        return tl;
    }

    function hideHomePage() {
        const tl = new TimelineMax();
        tl.to(moon, 0.4, {css: {top: '150%'}, ease: Power1.easeIn})
        tl.to(masternew, 0.3, {css: {'stroke-dashoffset': '600'}, ease: Power1.easeIn}, '-=0.4')
        return tl;
    }

    // function fireBurn() {
    //     const tl = new TimelineMax();
    //     tl.to(fireSpaceShip1, 0.5, {scaleY: '1.2', yoyo: true, repeat: -1});
    //     tl.to(fireSpaceShip2, 0.5, {scaleY: '1.2', yoyo: true, repeat: -1}, '-=0.5');
    //     return tl;
    // }
    // fireBurn();


    /**
     * hide introParagrapgs
    */
    function hideIntroParagraphs() {
        return TweenMax.staggerTo(introParagraphs, 0, {autoAlpha: 0, y: 40})
    }
    hideIntroParagraphs();

    /**
     * portfolio, skills, contact header
    */
    function showHeaderTween(svg) {
        const tl = new TimelineMax();
        tl.to(svg, 0, {css: {fill: color.red}})
        tl.to(svg, 0.5, {css: {filter: `drop-shadow(-1px -1px 2px ${color.black})`}, ease: Power1.easeOut, immediateRender: false})
        tl.fromTo(svg, 2, {autoAlpha: 0}, {autoAlpha: 1, x: 0, ease: Power1.easeOut, immediateRender: false}, '-=1')

        return tl;
    }

    function hideHeaderTween(svg) {
        const tl = new TimelineMax({paused: true});
        tl.to(svg, 0.5, {css: {filter: 'none'}, ease: Power1.easeOut, immediateRender: false})
        tl.fromTo(svg, 1, {autoAlpha: 1, x: 0}, {autoAlpha: 0, ease: Power1.easeOut, immediateRender: false}, '-=1')
        return tl;
    }

    function showSubHeader(subHeader) {
        return TweenMax.to(subHeader, 1,{css: {top: '0px'}, y: 0, immediateRender: false})
    }


    function showPortfolioPage() {
        const tl = new TimelineMax();
        tl.to(mars, 1.5, {css: {bottom: '0%'}, ease: Power1.easeOut})
        return tl;
    }

    function hidePortfolioPage() {
        const tl = new TimelineMax();
        tl.to(mars, 0.2, {css: {bottom: '-50%'}, ease: Power1.easeIn})
        return tl;
    }

    /**
     * projects
    */
    function showProjectPage() {
        const tl = new TimelineMax();
        tl.to(planet1, 1.5, {css: {top: '80%'}, ease: Power1.easeOut})
        return tl;
    }

    function hideProjectPage() {
        const tl = new TimelineMax();
        tl.to(planet1, 0.2, {css: {top: '100%'}, ease: Power1.easeIn})
        return tl;
    }

    function showPagination() {
        return TweenMax.to(pagination, 1, {css: {opacity: 1}, ease: Back.easeOut});
    }

    function hidePagination() {
        return TweenMax.to(pagination, 1, {css: {opacity: 0}, ease: Back.easeOut});
    }

    function showProject(index) {
        const tl = new TimelineMax({paused: true});
        const image = $(`.project:eq(${index}) .pin-wrapper .image`);
        const content = $(`.project:eq(${index}) .pin-wrapper .content`);
        tl.to(image, 1, {css: {left: '7%'}, ease: Power1. easeOut, immediateRender: false})
        tl.to(content, 1, {css: {right: '7%'}, ease: Power1.easeOut, immediateRender: false}, '-=1')

        return tl;
    }

    function changeSlide(index) {
        return TweenMax.to(projectSection, 1, {css: {transform: `translate(-${index * 100}vw)`}, ease: Power1.easeOut})
    }

    /**
     * skill level
    */
   function showSkillPage() {
        const tl = new TimelineMax();
        tl.to(planet2, 1.5, {css: {top: '75%'}, ease: Power1.easeOut})
        return tl;
    }

    function hideSkillPage() {
        const tl = new TimelineMax();
        tl.to(planet2, 0.2, {css: {top: '100%'}, ease: Power1.easeIn})
        return tl;
    }

    function showSkills() {
        const tl = new TimelineMax({paused: true})
        tl.staggerFrom(skillsLevel, 1, {css: {width: '0%'}, immediateRender: false}, 0.1);

        return tl;
    }

    /**==========================================Sences=========================================*/

    const controller = new ScrollMagic.Controller(); // Init controller scroll magin


    /**
     * home
     */

    /**
     * portpolio
    */
    const portfolioScene = new ScrollMagic.Scene({
        triggerHook: 0.7,
        triggerElement: '.portfolio',
        duration: '100%'
    })
    .addTo(controller);
    portfolioScene.on('enter', function() {
        const tl = new TimelineMax();
        tl.add(showHeaderTween(svgPortfolio))
        tl.add(showSubHeader(subHeaderPortfolio), '-=1.5')
    });
    portfolioScene.on('leave', function() {
        hideHeaderTween(svgPortfolio).play();
    });

    /**
     * projects
    */
    const projectScene = new ScrollMagic.Scene({
        triggerElement: '.projects',
        triggerHook: 0.5,
        duration: '75%'
    })
    .addTo(controller)

    projectScene.on('enter', function() {
        // const tl = new TimelineMax();
        showPagination()


        dots.each(function(index) {
            if ($(this).hasClass('active') && index == 0) {
                showProject(0).play();
            }
        })

    })
    projectScene.on('leave', function() {
        hidePagination();
    })

    /**
     * skills
    */
    const skillsScene = new ScrollMagic.Scene({
        triggerHook: 0.5,
        triggerElement: '.skills',
        duration: '100%'
    })
    .addTo(controller);
    skillsScene.on('enter', function() {
        showHeaderTween(svgSkills).play();
        showSkills().play();
    });
    skillsScene.on('leave', function() {
        hideHeaderTween(svgSkills).play();
    });

    /**
     * contact
    */
    const contactScene = new ScrollMagic.Scene({
        triggerHook: 0.7,
        triggerElement: '.contact',
        duration: '100%'
    })
    .addTo(controller);
    contactScene.on('enter', function() {
        showHeaderTween(svgContact).play();
    });
    contactScene.on('leave', function() {
        hideHeaderTween(svgContact).play();
    });

    /**==========================================Events=========================================*/
    /**
     * Open navigation
     */
    buttonOpenNav.click(function() {
        openNavigationTween().restart();
    });

    /**
     * Open navigation
     */
    buttonCloseNav.click(function() {
        closeNavigationTween().restart();
    });

    /**
     * Click navigation items
    */
    navItems.click(function() {
        $('#navigation ul li a').removeClass('active');
        $(this).children('a').addClass('active');
    })

    /**
     * pagination
     */

    dots.on('touchstart click', function() {
        if(!$(this).hasClass('active')) {
            $('.pagination .dot').removeClass('active');
            $(this).addClass('active');
            const index = dots.index(this);
            changeSlide(index);
            showProject(index).restart();
            currentColor = colorPalete[index];
        }
    })


    /**==========================================Drag and drop=========================================*/
    if (!isMobile()) {

        interact('#astronaut')
            .draggable({
            // enable inertial throwing
            inertia: true,
            // keep the element within the area of it's parent
            restrict: {
                restriction: "parent",
                endOnly: true,
                elementRect: { top: 0.5, left: 0, bottom: 1, right: 1 }
            },
            // enable autoScroll
            autoScroll: true,

            // call this function on every dragmove event
            onmove: dragMoveListener,
            // call this function on every dragend event
            onend: function (event) {
                var textEl = event.target.querySelector('p');

                textEl && (textEl.textContent =
                'moved a distance of '
                + (Math.sqrt(Math.pow(event.pageX - event.x0, 2) +
                                Math.pow(event.pageY - event.y0, 2) | 0))
                    .toFixed(2) + 'px');
            }
        });
    }

    /**==========================================fullPage=========================================*/
    new fullpage('#fullpage', {
        autoScrolling:true,
        scrollingSpeed: 1000,
        licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
        afterRender: function(){
            showHomePageFirstTime();
        },
        onLeave: function(origin, destination){
            switch(origin.index) {
                case 0:
                    hideHomePage();
                    break;
                case 1:
                    hidePortfolioPage();
                    break;
                case 2:
                    hideProjectPage();
                    break;
                case 3:
                    hideSkillPage();
                    break;

            }

            switch(destination.index) {
                case 0:
                    showHomePage();
                    break;
                case 1:
                    showPortfolioPage();
                    break;
                case 2:
                    showProjectPage();
                    break;
                case 3:
                    showSkillPage();
                    break;

            }



        }
    });

});
