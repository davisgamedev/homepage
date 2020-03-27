import React from 'react';
import { withRouter } from 'react-router-dom';

import HeaderHeight from './HeaderHeight';
import DebugLog from './DebugLog';

import {Pages} from '../Components/Nav';

// modified from https://stackoverflow.com/a/56250408

const timeout = 500;
window.SuppressScroll = window.SuppressScroll || false;

function Suppressed() {
    return window.SuppressScroll;
}

function setSuppress(val) {
    window.SuppressScroll = val;
}

function setSuppressTimeout() {
    if(window.SuppressScrollTimeout) clearTimeout(window.SuppressScrollTimeout);
    window.SuppressScrollTimeout = setTimeout(() => setSuppress(false), timeout);
}

export function SuppressScroll() {
    setSuppress(true);
    setSuppressTimeout();
}

const ScrollHandler = ({ location, history }) => {

    const height = HeaderHeight();

    let autoScrolling = false;

    let element;
    let elementHeight;
    let scrollTarget;
    let sectionId;
    let pageElements;

    let scrollTimeoutHandler;
    
    let currentDocId = undefined;

    
    // function getPageElements() {
    //     pageElements = Pages.map(p => {
    //         const id = p.route.replace('/', '');
    //         console.log(id);
    //         return document.getElementById(id);
    //     });
        
    //     return pageElements;
    // }
    /*
        returns the section id from the path
        sets the current document var
    */

    // eslint-disable-next-line
    //const pathRegex = /(?<=\/)[^\/]*(?=\/|$)/;

    function getSectionIdFromPath() {
        const results = location.pathname.split('/').filter(x => x);

        if(results) {
            if(results.length > 1) currentDocId = results[results.length-1];

            const element = document.getElementById(results[0]);
            console.log(element);

            if(element && element.className !== "section") {
                currentDocId = results[0];
                return null;
            }
            else return results[0];
        }

        return null;
    }

    function getElementHeight() {
        return element ? element.offsetTop : 0;
    }

    function scrollDone() {
        DebugLog("scroll done called");
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
        else {
            
        }
        if(currentDocId) {
            console.log("called");
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
            autoScroll(true);
            DebugLog("%cElement height updated mid scroll", "background-color: orange; color: white");
        }
        if(scrollTimeoutHandler) clearTimeout(scrollTimeoutHandler);
        scrollTimeoutHandler = setTimeout(scrollDone, 200);
    }

    window.addEventListener('scroll', checkScroll);

    function autoScroll(force=false) {
        if(Suppressed()) return;
        
        let previousId = sectionId;
        sectionId = getSectionIdFromPath();
        
        /*
            We call this once, because the route has changed and not suppressed
            in page initalization a scroll event can be called without an actual
            scroll occuring if at the top of the page
        */
        scrollDone();

        autoScrolling = (force || previousId !== sectionId);


        if(!autoScrolling) {
            return;
        }

        element = document.getElementById(sectionId);
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

    React.useEffect(autoScroll, [location]);

    return(<span></span>);
  };

export default withRouter(ScrollHandler);