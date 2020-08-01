import React, { Suspense } from 'react';
import Headline from 'Components/Headline';

const Planets = React.lazy(() => import('Content-Out/graphics/planetsprocessing'));

export default class PlanetsHeadline extends React.Component {

    render() {
        return (
        <Headline 
        todo={true} 
        src={'sample'}
        link={"/graphics/Planets-Processing"}
        >
            <Planets></Planets>
        </Headline>
        );
    }
}