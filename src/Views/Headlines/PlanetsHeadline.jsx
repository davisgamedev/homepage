import React, { Suspense } from 'react';
import Headline from 'Components/Headline';

const Planets = React.lazy(() => import('Content-Out/graphics/planetsprocessing'));

export default class PlanetsHeadline extends React.Component {

    render() {
        return (
        <Headline todo={true}>
            <Planets></Planets>
        </Headline>
        );
    }
}