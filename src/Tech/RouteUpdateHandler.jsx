import React from 'react';
import { withRouter } from 'react-router-dom';

import HeaderHeight from './HeaderHeight';
import DebugLog from './DebugLog';

// modified from https://stackoverflow.com/a/56250408

 ///////////////// SUPPRESS SCROLL LOGIC ////////////////


/*
    Sets supress global to true, which suppresses automatic scrolling in scroll handler
    after the timeout period suppress bool is reset
*/
export function SuppressRouteChangeHandler() {
    setSuppress(true);
    setSuppressTimeout();
}


const timeout = 500;
window.SuppressRouteChangeHandler = window.SuppressRouteChangeHandler || false;

// get global
function Suppressed() {
    return window.SuppressRouteChangeHandler;
}

// set global
function setSuppress(val) {
    console.log("Supress set! " + val);
    window.SuppressRouteChangeHandler = val;
}

// set timeout on global
function setSuppressTimeout() {
    if(window.SuppressScrollTimeout) clearTimeout(window.SuppressScrollTimeout);
    window.SuppressScrollTimeout = setTimeout(() => setSuppress(false), timeout);
}

/////////// global scroll listeners

let scrollListener = ()=>{};
window.addEventListener('scroll', ()=>scrollListener());

function windowLineIntersects(windowLine, section){
    return windowLine < section.bottom && windowLine > section.top;
}


/////////// section element retrievals
let Sections = {};
let SectionsIdArray = [];
let sectionsSet = false;

// used within element, but should be updated by setSections
let section = {id: null};
let previousId;

function setSections() {
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

    window.addEventListener('resize', setSections);
}
// yes this is awful for initalizations, but best I can come up with for now
//  front end web is ductape and my soul is glue
setTimeout(setSections, 500);


/////////////////// SCROLL HANDLER FUNCTIONAL COMPONENT //////////////////

const RouteUpdateHandler = ({ location, history }) => {

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
        const results = location.pathname.split('/').filter(x => x);
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
            
            if(!windowLineIntersects(windowLine, section)) {

                console.log(section);
                console.log("line does not intersect");

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
            if(el) {
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
        DebugLog("Scrolling..");
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

    scrollListener = checkScroll;


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

export default withRouter(RouteUpdateHandler);