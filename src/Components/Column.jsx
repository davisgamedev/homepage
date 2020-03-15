import React from 'react';

import Grid from '@material-ui/core/Grid';


export default function Column(props) {

    const xs = props.xs || '3';

    return (
        <Grid item xs={xs}>
            {props.children}
        </Grid>

    )
}