import React from 'react';
//import Image from

import Grid from '@material-ui/core/Grid';
import GridContainer from "common/components/Grid/GridContainer.js";
import GridItem from "common/components/Grid/GridItem.js";
import Parallax from "common/components/Parallax/Parallax.js";

import WindowDimensions from '../Tech/WindowDimensions';
import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        position: 'relative',
    },  
    headerWrapper: {
        color: "#2f2f2f",
    },
    title: {
        fontFamily: 'Playfair Display',
        fontWeight: 900,
        fontSize: 80,
        textTransform: 'uppercase',
        lineHeight: "72px",
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: 'Lora',
        textTransform: 'uppercase',
        borderBottom: '2px solid #2f2f2f',
        borderTop: '2px solid #2f2f2f',
        padding: '12px 0 12px 0',
    },
});


export default function Header(props){
    //constructor(){}
    const classes = useStyles();
    const { ...rest } = props;

    // will have to add an img tag
    return (
        <div className={classes.container}>
            <div className={classes.headerWrapper}>
                <div className={classes.title}>
                    Davis Smith
                </div>   

                <div className={classes.subtitle}>
                    Is a Game and Audio Developer
                </div>
            </div>
        </div>);
}
