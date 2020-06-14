import React from 'react';
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

export const Debug = true;//"production" !== process.env.NODE_ENV;

/*
    The webpack package we have forces lint warnings despite eslintignore
    This hides critical logs during page startup, so we have to disable warning
    for the first bit of page loading to prevent spam from eslint
*/
if(Debug) {
    const warn = console.warn;
    console.warn = ()=>{};
    setTimeout(() => console.warn = warn, 1000);
}


export function DebugDir(obj) {
    if(Debug) console.dir(obj);
}

export default function DebugLog(...args){
    if(Debug) console.log(...args);
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