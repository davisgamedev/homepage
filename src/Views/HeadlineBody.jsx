import React from 'react';
import { Grid } from '@material-ui/core';
import Planets from './Headlines/PlanetsHeadline';
import PlanetsHeadline from './Headlines/PlanetsHeadline';
import Section from 'Components/Section';
import GuardianHeadline from './Headlines/GuardianHeadline';


export default function HeadlineBody(props){

    const domRef = React.createRef(); // todo?

    return(
            // <PlanetsHeadline></PlanetsHeadline>
            <GuardianHeadline></GuardianHeadline>
    );

}