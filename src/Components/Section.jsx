import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";

import WindowDimensions from '../Tech/WindowDimensions';
import HeaderHeight from '../Tech/HeaderHeight';


const useStyles = makeStyles({
    sectionTitle: {
        textAlign: 'left',
        width: '100%',
        borderBottom: '1px solid lightgrey',
    }
});

export default function Section(props) {

    const {height, width} = WindowDimensions();
    const headerHeight = HeaderHeight();
    const calcMinHeight = height - headerHeight;

    const applyHeight = { minHeight: calcMinHeight };

    const title = props.title;
    const id = props.id;

    const classes = useStyles();

    return (
        <Grid container id={id} style={applyHeight}>
            {
                title? 
                    <h2 className={classes.sectionTitle}>{title}</h2> :
                    <span></span>}
            {props.children}
        </Grid>
    )
}