import React from 'react';
import { Grid } from '@material-ui/core';
import Planets from './Headlines/Planets';


export default class HeadlineBody extends React.Component {


    render() { 
        return <Grid
            container
            spacing={1}
            direction='row'
            justify='flex-start'
            alignItems='stretch'
            wrap='wrap'
        >
            <Planets> </Planets>


        </Grid>; 
    
    }

}