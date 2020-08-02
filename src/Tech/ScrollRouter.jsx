import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import HeaderHeight from './HeaderHeight';
import DebugLog from './DebugTools';
import { DebugColorLog } from './DebugTools';
import { Debug } from './DebugTools';


const DRAW_DEBUG_ELS = Debug && false;


////////// global suppress update variables ////////////

const suppressTimeout = 500;

// if this var has been previously created in window (404 redirect) capture its value or set false
window.SuppressRouteUpdates = window.SuppressRouteUpdates || false;

function Unsuppress() { window.SuppressRouteUpdates = false; }

export function SuppressRouteUpdates() {
    window.SuppressRouteUpdates = true;
    clearTimeout(Unsuppress);
    setTimeout(Unsuppress, suppressTimeout);
}

// easier syntax
function Suppressed() { return window.SuppressRouteUpdates; }





// viewLine: height of a "line" to test what section we're likely to be viewing
function viewLineIntersects(viewLine, section) {
    return viewLine < section.bottom && viewLine > section.top;
}



/////////// section element retrievals
let Sections = {};
let SectionIds = []; // quickly incr/decr currentSection

// used within element, but should be updated by setSections
let currentSection = {id: null};
let previousSectionId;

function captureSectionBoundingBoxes() {

    Array.from(document.getElementsByClassName("section")).forEach(
        (el, i) => {
            Sections[el.id] = {
                index: i,
                id: el.id,
                top: el.offsetTop,
                bottom: el.offsetTop + el.offsetHeight,
                dom: el
            };
            if(DRAW_DEBUG_ELS) Sections[el.id].debugEl = createSectionDebugEl(Sections[el.id]);
        });
    
    // if sections are recaptured (resize event) reset current section or grab top element
    currentSection = Sections[currentSection.id|| SectionIds[0]];
}

window.addEventListener('resize', captureSectionBoundingBoxes);
window.addEventListener('onload', captureSectionBoundingBoxes);

// this is poor design, find a way to listen to last element resize
setTimeout(captureSectionBoundingBoxes, 3000);

export default function ScrollRouter(props) {

    let history = useHistory();
    const height = HeaderHeight();

    let autoScrolling = false;
    let currentDocumentId = undefined;

    function getSectionId() {
        // extracts the current path elements, x=>x filters out empty elements
        const pathResults = window.location.pathname.split('/').filter(x=>x);

        if(pathResults) {
            currentSection = Sections[pathResults[0]];
            if(pathResults > 1) currentDocumentId = pathResults[1]; 
        }
        else {
            currentSection = Sections[SectionIds[0]];
        }
    }
    
    function scrollFinishedEvent() {
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
    }


}













//////////////////// Debug Elements /////////////

function createSectionDebugEl(sect) {
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
    div.id = "debug-section-" + sect.id;
    document.body.append(div);
    return div;
}


let viewLineDebugEl = (() => {
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
    div.id = "debug-viewline";
    document.body.append(div);
    return div;
})();


