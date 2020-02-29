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
import image from "../Assets/Nebula.jpg";

const useStyles = makeStyles({
    container: {
        position: "relative",
        top: 80,
        margin: "0 auto",
        textAlign: "center",
        WebKitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale'
    },
    screen: {
        backgroundColor: "#000000aa"
    },
    title: {
        fontSize: '150px',
        color: 'white',
        fontFamily: 'Montserrat',
        fontWeight: '300',
    },
    subtitle: {
        position: 'relative',
        top: 50,
        fontSize: '30px',
        color: 'white',
        fontFamily: 'roboto mono',
        fontWeight: '300',
        textAlign: 'center'
    }
});


export default function Header(props){
    //constructor(){}
    const classes = useStyles();
    const { ...rest } = props;
    const { height, width } = WindowDimensions();

    return (
        <div style={{ backgroundImage: "url(" +  image + ")" }}>  
        <div className={classes.screen}>
        <Nav></Nav>
            <div className={classes.container}
                style={{height: (0.6 * height)}}>
                <h1 className={classes.title}>Davis   *   Smith</h1>
                <h3 className={classes.subtitle}>
                    {`Audio ({ Programmer, Designer, Producer });`}<br></br>
                    {`Game\t({ Programmer, Designer, Producer });`}
                </h3>
            </div>
        </div>
        </div>);
}
