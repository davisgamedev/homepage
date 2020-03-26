import React from 'react';
import { withRouter } from 'react-router-dom';

import HeaderHeight from './HeaderHeight';
import DebugLog from './DebugLog';

// modified from https://stackoverflow.com/a/56250408

const ScrollHandler = ({ location, history }) => {

    const height = HeaderHeight();

    let autoScrolling = false;

    let element;
    let elementHeight;
    let scrollTarget;
    let sectionId;

    let scrollTimeoutHandler;
    
    let suppressScroll = false;
    let currentDoc = undefined;
    
    /*
        returns the section id from the path
        sets the current document var
    */

    // eslint-disable-next-line
    const pathRegex = /(?<=\/)[^\/]*(?=\/|$)/;

    function getElementFromPath() {
        const results = location.pathname.match(pathRegex);
        if(results && results.length > 1) currentDoc = results[results.length-1];
        return (results) ? results[0] : null;
    }

    function getElementHeight() {
        return element ? element.offsetTop : 0;
    }

    function scrollDone() {
        DebugLog("scroll done called");
        if(autoScrolling ) {

            if(currentDoc) {

            }

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

        let previousId = sectionId;
        sectionId = getElementFromPath();
        autoScrolling = (force || previousId !== sectionId);
        if(!autoScrolling) return;

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