import {useState, useEffect} from 'react';
import DebugLog from '../Tech/DebugLog';
import { Debug } from './DebugLog';

/******** UPDATE NEW HEIGHT HERE **********/
const knownHeight = 145;
/*****************************************/

let logResize = Debug && true;

const spamDelay = 500;

function getHeight() {
    const header = document.getElementById('header');

    if(header) {

        let height = header.offsetHeight;

        if(height !== knownHeight) { 

            if(logResize) {
                logResize = false;
                setTimeout(
                    () => {
                        DebugLog("%cHEADER STYLED HEIGHT HAS CHANGED", "font-size:32px,color:'red'");
                        DebugLog(
                            `%c Please update HeaderHeight.knownHeight to: %c${height}%c to prevent a scroll jitter on load;`,
                            'color:#17A589;',
                            `   color:orange;
                                font-weight:bold;
                                font-style:italic;
                                text-decoration:underline;
                            `,
                            'color:#17A589;',
                        );
                        logResize = true;
                    }, 500
                );
            }
        }

        return height;
    }
    else return knownHeight;

}

export default function HeaderHeight() {
    
    const [height, setHeight] = useState(getHeight());

    useEffect(() => {

        function handleResize() {
            setHeight(getHeight());
        }
    
        const report = () =>  DebugLog("HeaderHeight: header resized!");

        function delayReport() {
            clearTimeout(report);
            setTimeout(report, spamDelay);
        }

        delayReport();
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
        
    }, []);
    return height;
}