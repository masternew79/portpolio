import './assets/scss/style.scss';
import './assets/scss/_responsive.scss';
window.$ = require('jquery');
import { TimelineLite, Power1, SteppedEase } from 'gsap';
import scrollmagic from 'scrollmagic';
require('scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap');
require('scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators');

$(document).ready(function() {
    const reloaderLogo = $('.reloader svg');
    const reloaderText = $('.reloader h3');
    const reloader = $('.reloader');
    const navigation = $('#navigation');

    const buttonCloseNav = $('#navigation .button');
    const buttonOpenNav = $('.button-open-navigation');
    const navItems = $('#navigation ul li');

    const typingName = $('.typingName');
    const typingUsedSkills = $('.typingUsedSkills');
    const typingJob = $('.typingJob');
    const typingKnowledgeSkills = $('.typingKnowledgeSkills');
    const usedSkills = $('.used span');
    const knowledgeSkills = $('.knowledge span');
    const buttonCTA = $('.cta');


    const tlHomePage = new TimelineLite({paused: true});
    tlHomePage
        .fromTo(
            typingName,
            0.5,
            { width: '0', y: 200 },
            { width: widthTypingName(), ease: SteppedEase.config(37)},
            '+=2'
        )
        .to(typingName, 0.8, { y: 0 })
        .fromTo(
            typingJob,
            0.5,
            { width: '0' },
            { width: '360px', ease: SteppedEase.config(37) }
        )
        .fromTo(
            typingUsedSkills,
            0.5,
            { width: '0' },
            { width: '360px', ease: SteppedEase.config(37) }
        )
        .staggerFrom(
            usedSkills,
            1,
            { rotationX: 90, ease: Power4.easeOut },
            0.1
        )
        .fromTo(
            typingKnowledgeSkills,
            0.5,
            { width: '0' },
            { width: '360px', ease: SteppedEase.config(37) },
            '-=1'
        )
        .staggerFrom(
            knowledgeSkills,
            1,
            { rotationX: 90, ease: Power4.easeOut },
            0.1,
            '-=0.4'
        )
        .fromTo(buttonCTA, 1, { autoAlpha: 0 }, { autoAlpha: 1 }, '-=0.5');
    // Open navigation
    buttonOpenNav.click(function() {
        let tl = new TimelineLite();
        tl.to(navigation, 0.5, { x: -250, ease: Power1.easeOut })
            .fromTo(
                navItems[0],
                0.5,
                { x: 30, autoAlpha: 0 },
                { x: 0, autoAlpha: 1 },
                '-=0.2'
            )
            .fromTo(
                navItems[1],
                0.5,
                { x: 30, autoAlpha: 0 },
                { x: 0, autoAlpha: 1 },
                '-=0.2'
            )
            .fromTo(
                navItems[2],
                0.5,
                { x: 30, autoAlpha: 0 },
                { x: 0, autoAlpha: 1 },
                '-=0.2'
            )
            .fromTo(
                navItems[3],
                0.5,
                { x: 30, autoAlpha: 0 },
                { x: 0, autoAlpha: 1 },
                '-=0.2'
            );
    });

    // Close navigation
    buttonCloseNav.click(function() {
        let tl = new TimelineLite();
        tl.fromTo(
            navItems[0],
            0.5,
            { x: 0, autoAlpha: 1 },
            { x: 30, autoAlpha: 0 },
            '-=0.25'
        )
            .fromTo(
                navItems[1],
                0.5,
                { x: 0, autoAlpha: 1 },
                { x: 30, autoAlpha: 0 },
                '-=0.25'
            )
            .fromTo(
                navItems[2],
                0.5,
                { x: 0, autoAlpha: 1 },
                { x: 30, autoAlpha: 0 },
                '-=0.25'
            )
            .fromTo(
                navItems[3],
                0.5,
                { x: 0, autoAlpha: 1 },
                { x: 30, autoAlpha: 0 },
                '-=0.25'
            )
            .to(navigation, 0.5, { x: 0, ease: Power1.easeIn }, '-=0.5');
    });

    // Timeline
    const tl = new TimelineLite();
    tl.to(reloaderText, 0.8, { autoAlpha: 0 }, '+=1.8')
        .to(reloaderLogo, 0.8, { y: -20, autoAlpha: 0 }, '-=0.8')
        .to(reloader, 0.8, { autoAlpha: 0 }, '-=0.8');


    //controller scrollmagic
    const controller = new scrollmagic.Controller();

    // Scene home
    const homeScene = new scrollmagic.Scene({
        triggerHook: 0.9,
        triggerElement: '.home',
        duration: '100%'
    })
    .addIndicators()
    .addTo(controller);

    homeScene.on('enter', function() {
        tlHomePage.play();
    })


});

function widthTypingName() {
    return isMobile() ? '370px' : '600px';
}

function isMobile() {
    return $('.is-mobile').css('display') == 'none';
}
