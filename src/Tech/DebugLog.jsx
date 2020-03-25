export const Debug = "production" !== process.env.NODE_ENV;

export function DebugDir(obj) {
    if(Debug) console.dir(obj);
}

export default function DebugLog(...args){
    if(Debug) console.log(...args);
}

if(Debug) {
    window.addEventListener('keydown', function(e){ if(e.key === 'F8') {debugger;} }, false);
}