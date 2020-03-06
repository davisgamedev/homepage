import React from 'react';
//import Image from

import Grid from '@material-ui/core/Grid';
import GridContainer from "common/components/Grid/GridContainer.js";
import GridItem from "common/components/Grid/GridItem.js";
import Parallax from "common/components/Parallax/Parallax.js";
import Nav from './Nav';
import './Components.css'

import WindowDimensions from '../Tech/WindowDimensions';
import { makeStyles } from "@material-ui/core/styles";
import image from "../Assets/warp2.webp";

const useStyles = makeStyles({
    container: {
        position: "relative",
        top: 80,
        margin: "0 auto",
        padding: 50,
        textAlign: "left",
        WebKitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
    },
    screen: {
        backgroundImage: "linear-gradient(to right, rgba(0, 0, 0, 0.8) 50%, rgba(0, 0, 0, 0))",
        //backgroundColor: "#000000cc",
        zIndex: 100,
    },
    title: {
        fontSize: '60px',
        color: 'white',
        fontFamily: 'roboto mono',
        fontWeight: '300',
    },
    subtitle: {
        position: 'relative',
        top: 50,
        left: 100,
        fontSize: '30px',
        color: 'white',
        fontFamily: 'roboto mono',
        fontWeight: '300',
        textAlign: "left",
    },
    bgImage: {
        position: "absolute",
        top: 0,
        left: 0,
        display: "block",
        margin: "0 auto",
        float: "left",
        clear: "both",
        width: "100%",
        height: "100%",
        zIndex: -100,
    }
});


export default function Header(props){
    //constructor(){}
    const classes = useStyles();
    const { ...rest } = props;
    const { height, width } = WindowDimensions();

    // will have to add an img tag
    return (
        <div className={classes.screen}>
        <img src={image} alt="k" className={classes.bgImage}/>
        <Nav></Nav>
            <div className={classes.container}
                style={{height: height}}>
                <h1 className={classes.title}>{`Davis Smith`}</h1>                
                <h1 className={classes.title}>{`{`}</h1>
                <h3 className={classes.subtitle}>
                    Audio {"{"} Programmer, Designer, Producer {"};"}<br></br>
                    Game &nbsp;{"{"} Programmer, Designer, Producer  {"};"}<br></br>
                    Composer;<br></br> Web Developer;<br></br>
                </h3>
                <h1 className={classes.title}>
                <br></br>{`};`}
                </h1>
            </div>
        </div>);
}
