import React from 'react';
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const Debug = true;//"production" !== process.env.NODE_ENV;
export const LogTrace = Debug && true;

/*
    The webpack package we have forces lint warnings despite eslintignore
    This hides critical logs during page startup, so we have to disable warning
    for the first bit of page loading to prevent spam from eslint
*/
if(Debug) {
    const warn = console.warn;
    console.warn = ()=>{};
    setTimeout(() => console.warn = warn, 3000);
}

function getLocalTrace() {

    let obj = {};
    Error.captureStackTrace(obj, getLocalTrace);

    let stack = obj.stack.replace(
        /Report|DebugDir|DebugLog|DebugColorLog|Error|\s*at\s+[^A-Z].*(\s|$)|(\(.*\))|at|[\w\d\/]+[.\[\]]+[\w\d]*|[\[][A-z]*/gm, '');
    
    let split = stack
        .split(/\W/gm)
        .filter(x => x.length > 0)
        .reverse()

    let message = split.length < 1 ? '[anonymous callback]' 
                : split.reduce((acc, curr, i, arr) => acc + curr + (i < arr.length - 1 ? ' => ' : ''), '');

    return message;
}

export function Report(func) {
    if(!LogTrace) return;

    const message = `%c${func.name}() called from: ${getLocalTrace()}`;

    console.log(message, 'color: grey; font-size: 10px; font-style: italic');
}

export function DebugDir(obj) {
    if(Debug) {
        console.dir(obj);
        Report(DebugDir);
    }
}

export default function DebugLog(...args){
    if(Debug) {
        console.log(...args);
        Report(DebugLog);
    }
}

export function DebugColorLog(message, color, background='none') {
    if(Debug) {
        console.log('%c' + message, `color: ${color}; background-color: ${background}`);
        Report(DebugColorLog);
    }
}

export function DebugList(...args) {
    if(Debug) {
        console.log(`
        [ ${args.reduce(
            (acc, curr) => acc + curr + ', ',
            ''
        )}];
        `)
        Report(DebugList);
    }
}

// just gonna keep this here for a bit
//window.addEventListener('keydown', function(e){ if(e.key === 'F8') {debugger;} }, false);

export function WarnDebug() {
    return (
        <Snackbar 
        open={Debug} 
        autoHideDuration={1000000} 
        anchorOrigin={{
            vertical: 'top',
            horizontal: 'center'
        }}
        >
            <Alert severity="warning">Debug logging is enabled!!</Alert>
        </Snackbar>
    );
}

export function DebugBox(x, y, w, h, outlineColor) {
    let box = document.createElement("DIV");
    box.style = {
        position: "absolute",
        zIndex: Number.POSITIVE_INFINITY,
        top: x, left: y, width: w, height: h,
        border: '1px solid ' + outlineColor
    };
    box.id = "box_" + Math.random() * 1000000;
    document.body.appendChild(box);
    return box.id;
}

export function RemoveBox(id) {
    document.body.removeChild(document.getElementById(id));
}
