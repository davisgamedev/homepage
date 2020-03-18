export default function DebugLog(...args){
    if("production" !== process.env.NODE_ENV) console.log(...args);
}