import React, { Suspense } from 'react';
import Headline from 'Components/Headline';

const HeadlinePost = React.lazy(() => import('Content-Out/graphics/planetsprocessing'));

export default class Planets extends React.Component {

    render() {
        return (
        <Headline todo={true}>
            <HeadlinePost></HeadlinePost>
        </Headline>
        );
    }
}