import React, { Suspense } from 'react';
import Headline from 'Components/Headline';

const Guardian = React.lazy(() => import('Content-Out/web/gaurdianalarm'));

export default class GuardianHeadline extends React.Component {

    render() {
        return (
        <Headline 
        src={'Gaurdian-Dashboard_t2qsxp.jpg'}
        link={"/web/Guardian-Alarm"}
        >
            <Guardian></Guardian>
        </Headline>
        );
    }
}