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
        console.log(results);
        if(results && results.length > 1) currentDoc = results[results.length-1];
        return (results) ? results[0] : null;
    }

    function getElementHeight() {
        return element ? element.offsetTop : 0;
    }

    function scrollDone() {
        console.log("scroll done called");
        if(autoScrolling
            && window.scrollY === scrollTarget
            ) {
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

            if(Math.abs(elementHeight - recalcHeight) > 5) {
                console.warn("Rescrolling to new height");
                autoScroll(true);
            }
        }
        else {
        
        }
    }


    function checkScroll() {
        DebugLog("Scrolling..");
        if(scrollTimeoutHandler) clearTimeout(scrollTimeoutHandler);
        scrollTimeoutHandler = setTimeout(scrollDone, 200);
    }

    window.addEventListener('scroll', checkScroll);

    function autoScroll(force=false) {

        let previousId = sectionId;
        sectionId = getElementFromPath();
        console.log(sectionId);

        autoScrolling = (force || previousId !== sectionId);
        if(!autoScrolling) return;

        element = document.getElementById(sectionId);
        elementHeight = getElementHeight();

        DebugLog("%cAutoscrolling!", "color: orange");

        scrollTarget = elementHeight - height;


        setTimeout(() => {

          DebugLog(`Scrolling to ${scrollTarget}, which is ${scrollTarget - window.scrollY} lower.`);

          window.scrollTo({
            //behavior: element ? "smooth" : "auto",
            behavior: "smooth",
            top: scrollTarget
          });

        }, 100);
    }

    React.useEffect(autoScroll, [location]);

    return(<span></span>);
  };

export default withRouter(ScrollHandler);