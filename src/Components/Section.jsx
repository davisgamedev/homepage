import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";

import WindowDimensions from '../Tech/WindowDimensions';
import HeaderHeight from '../Tech/HeaderHeight';


const useStyles = makeStyles({
    sectionTitle: {
        textAlign: 'left',
        width: '100%',

        fontFamily: 'Playfair Display, serif',
        fontWeight: '400',
        textTransform: 'uppercase',
        fontSize: '48px',
        
        //fontFamily: "'Saira Extra Condensed', sans-serif",
        // fontWeight: 100,
        // fontSize: 36,
        // textTransform: 'capitalize',

        borderBottom: '1px solid black',
    },
});

export default function Section(props) {

    const {height, width} = WindowDimensions();
    const headerHeight = HeaderHeight();
    const calcMinHeight = height - headerHeight;

    const style = { minWidth: '100%' };

    const title = props.title;
    const id = props.id;

    const classes = useStyles();

    return (
        <div id={id}>
            {
                title? 
                    <h2 className={classes.sectionTitle}>{title}</h2> :
                    <span></span>}
            <Grid container style={style}>{props.children}</Grid>
        </div>
    )
}