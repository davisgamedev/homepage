import React from 'react';
import Grid from '@material-ui/core/Grid';


export default function Section(props) {

    const title = props.title;
    const id = props.id;

    return (
        <Grid container id={id} className="section">
            {title? <h2>{title}</h2> : <span></span>}
            {props.children}
        </Grid>
    )
}