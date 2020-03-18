import React from 'react';
import ScrollHandler from '../Tech/ScrollHandler';

import Header from '../Components/Header';
import ContentBody from './ContentBody';
import Spacer from '../Components/Spacer';


export default function Home(props) {

    return(
        <div>
            <Header></Header>
            <ScrollHandler></ScrollHandler>
            <Spacer></Spacer>
            <ContentBody></ContentBody>

        </div>
    );
}
