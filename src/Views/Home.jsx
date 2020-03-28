import React from 'react';
import RouteUpdateHandler from '../Tech/RouteUpdateHandler';

import Header from '../Components/Header';
import ContentBody from './ContentBody';
import Spacer from '../Components/Spacer';


export default function Home(props) {

    return(
        <div>
            <Header></Header>
            <RouteUpdateHandler></RouteUpdateHandler>
            <Spacer></Spacer>
            <ContentBody></ContentBody>

        </div>
    );
}
