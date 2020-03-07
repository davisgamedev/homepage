import React from 'react';

export default function Fonts() {

    const style = {
        position: "absolute",
        top: 0,
        left: 0,
        float: "left",
         zIndex: -500, 
         width: 0, 
    };

    return (
        <div style={style}>
                <link href="https://fonts.googleapis.com/css?family=Oxanium|Spartan&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css?family=Montserrat|Nunito|Roboto|Roboto+Mono&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Gravitas+One&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Lora&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=PT+Serif&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Anton&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"></link>
            </div>
    );
}