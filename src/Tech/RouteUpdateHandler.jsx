import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import HeaderHeight from './HeaderHeight';
import DebugLog from './DebugLog';
import { DebugColorLog } from './DebugLog';
import { Debug } from './DebugLog';

// modified from https://stackoverflow.com/a/56250408

const DRAW_DEBUG_LINES = Debug && false;


 ///////////////// SUPPRESS SCROLL LOGIC ////////////////

/*
    Sets supress global to true, which suppresses automatic scrolling in scroll handler
    after the timeout period suppress bool is reset
*/
export function SuppressRouteChangeHandler() {
    setSuppress(true);
    setSuppressTimeout();
}


const timeout = 1500;
window.SuppressRouteChangeHandler = window.SuppressRouteChangeHandler || false;

// get global
function Suppressed() {
    return window.SuppressRouteChangeHandler;
}

// set global
function setSuppress(val) {
    window.SuppressRouteChangeHandler = val;
}

// set timeout on global
function setSuppressTimeout() {
    if(window.SuppressScrollTimeout) clearTimeout(window.SuppressScrollTimeout);
    window.SuppressScrollTimeout = setTimeout(() => setSuppress(false), timeout);
}

function windowLineIntersects(windowLine, section){
    return windowLine < section.bottom && windowLine > section.top;
}


let windowLineDebug = (() => {

    if(!DRAW_DEBUG_LINES) return {};

    let div = document.createElement("DIV");
    div.style = `
        display: block;
        position: absolute;
        height: 1px;
        width: 500px;
        left: 10px;
        border: 1px solid red;
        z-index: 100000;
        pointer-events:none;
    `;
    div.id = "window-line-debug";
    document.body.append(div);
    return div;
})();


/////////// section element retrievals
let Sections = {};
let SectionsIdArray = [];
let sectionsSet = false;

let sectionsDebug = {};

// used within element, but should be updated by setSections
let section = {id: null};
let previousId;

function setSections() {

    DebugColorLog('SECTIONS ARE NOW SET', 'white', 'red');

    Array.from(document.getElementsByClassName("section")).forEach(
        (el, i) => {
            Sections[el.id] = {
                index: i,
                id: el.id,
                top: el.offsetTop,
                bottom: el.offsetTop + el.offsetHeight,
            };
            SectionsIdArray.push(el.id);
        });
    
    section = Sections[section.id || SectionsIdArray[0]];
    sectionsSet = true;


    if(DRAW_DEBUG_LINES) {
        SectionsIdArray.forEach(el => {

            let sect = Sections[el];

            if(!sectionsDebug[el]) {
                let div = document.createElement("DIV");
                div.style = `
                    display: block;
                    position: absolute;
                    height: ${sect.bottom - sect.top}px;
                    width: 700px;
                    left: 20px;
                    border: 1px solid yellow;
                    z-index: 100000;
                    pointer-events: none;
                `;
                div.id = "debug-section-" + el;
                document.body.append(div);
                sectionsDebug[el] = div;
            }

            let div = sectionsDebug[el];
            div.style.height = (sect.bottom - sect.top) + 'px';
            div.style.top = sect.top + 'px';
        });
    }

    window.removeEventListener('resize', setSections);
    window.addEventListener('resize', setSections);
}
// yes this is awful for initalizations, but best I can come up with for now
//  front end web is ductape and my soul is glue
setTimeout(setSections, 500);
setTimeout(setSections, 3000);

/////////////////// SCROLL HANDLER FUNCTIONAL COMPONENT //////////////////

export default function RouteUpdateHandler() {

    let location = useLocation();
    let history = useHistory();

    let autoScrolling = false;
    let scrollUp = false;
    let prevScroll = 0;
    let scrollTimeoutHandler;

    let currentDocId = undefined;
    let element;
    let elementHeight;
    let scrollTarget;

    const height = HeaderHeight();

    function getElementHeight() { return element ? element.offsetTop : 0; }

    // gets the section id from the url path, also gets the currentDocId
    function getSectionIdFromPath() {

        const results = window.location.pathname.split('/').filter(x => x);

        section = sectionsSet? Sections[SectionsIdArray[0]] : {id: ""};

        if(results) {
            if(results.length > 1) currentDocId = results[results.length-1];

            const element = document.getElementById(results[0]);

            if(element && element.className === "section") {
                section = sectionsSet ? Sections[results[0]] : {id: results[0]}
            }
            else currentDocId = results[0];
        }
    }

    function scrollDone(checkIntersect=true) {

        if(autoScrolling) {
            autoScrolling = false;
            let recalcHeight = getElementHeight();

            DebugLog(`%cDone autoscrolling!
            Currentposition: ${window.scrollY}
            Desiredposition: ${scrollTarget}
            Knownheight: ${elementHeight}
            Recalculatedheight: ${recalcHeight}
            `, "color: green");
        }

        else if(checkIntersect && sectionsSet) {

            const windowLine = (window.scrollY - height) + (window.innerHeight * 3/4);
            
            if(DRAW_DEBUG_LINES) windowLineDebug.style.top = windowLine + 'px';
            
            if(!windowLineIntersects(windowLine, section)) {

                SectionsIdArray.forEach(s => {
                    if(windowLineIntersects(windowLine, Sections[s])){
                        SuppressRouteChangeHandler();
                        section = Sections[s];
                        history.push('/' + section.id);
                    }
                });
            }
        }

        if(currentDocId) {

            const el = document.getElementById(currentDocId);
            if(el && !window.docIsOpen) {
                const button = el.getElementsByTagName('button')[0];
                button.focus();
                button.click();
            }
            currentDocId = null;
        }
    }



    /*
        we can fix the weird initial page load but checking a scroll update here
    */
    function checkScroll() {

        if(autoScrolling && Math.abs(elementHeight - getElementHeight()) > 5){
            onRouteChange(true);
            DebugLog("%cElement height updated mid scroll", "background-color: orange; color: white");
        }
        if(scrollTimeoutHandler) clearTimeout(scrollTimeoutHandler);
        scrollTimeoutHandler = setTimeout(scrollDone, 200);

        if(!autoScrolling) {
            scrollUp = (window.scrollY < prevScroll);
            prevScroll = window.scrollY;
        }
    }

    window.addEventListener('scroll', checkScroll);


    function autoScroll() {
        element = document.getElementById(section.id);
        elementHeight = getElementHeight();
        scrollTarget = elementHeight - height;

        setTimeout(() => {

          DebugLog(`%cScrolling to ${scrollTarget}, which is ${scrollTarget - window.scrollY} lower.`, "color: orange");

          window.scrollTo({
            behavior: "smooth",
            top: scrollTarget
          });

        }, 100);
    }

    function onRouteChange(forceAutoScroll=false) {

        previousId = section.id;
        getSectionIdFromPath();
        if(Suppressed()) return;
        
        /*
            We call this once, because the route has changed and not suppressed
            in page initalization a scroll event can be called without an actual
            scroll occuring if at the top of the page
        */
        scrollDone(false);

        autoScrolling = (forceAutoScroll || previousId !== section.id);
        if(autoScrolling) autoScroll();

    }

    React.useEffect(onRouteChange, [location]);

    return(<span id="RouteUpdateHandler"></span>);
  };