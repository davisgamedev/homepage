import React from 'react';

import HeaderHeight from '../Tech/HeaderHeight';

export default function Spacer(props) {

    /******** UPDATE NEW HEIGHT HERE **********/
    const knownHeight = 142;
    /*****************************************/

    const calcHeight = HeaderHeight();
    

    let height;

    if(calcHeight <= 0){
        height = knownHeight;
    } 
    else {
        height = calcHeight;

        if(calcHeight != knownHeight) {
            console.error("HEADER STYLED HEIGHT HAS CHANGED");
            console.log(
                `%c Please update Spacer.knownHeight to: %c${142}%c to prevent a scroll jitter on load;`,
                'color:#17A589;',
                `   color:orange;
                    font-weight:bold;
                    font-style:italic;
                    text-decoration:underline;
                `,
                'color:#17A589;',
                );
        }
    }

    /////////////////// DELETE LATER
    height = 0;
    
    return (
        <div style={{minHeight: height}}></div>
    );

}