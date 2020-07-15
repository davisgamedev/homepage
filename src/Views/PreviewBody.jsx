import React from 'react';
import { Grid } from '@material-ui/core';
import Planets from './Previews/Planets';


export default class PreviewBody extends React.Component {


    render() { 
        return <Grid
            container
            spacing={3}
            direction='row'
            justify='flex-start'
            alignItems='stretch'
            wrap='wrap'
        >
            <Planets> </Planets>


        </Grid>; 
    
    }

}