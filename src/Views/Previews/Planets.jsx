import React from 'react';
import Section from '../../Components/Section';
import LazyImage from 'Tech/LazyImage';
import MakeColumns from 'Components/MakeColumns';
import { EncapRef } from 'Components/MakeColumns';

const Planetsprocessing = React.lazy(() => import('Content-Out/graphics/planetsprocessing'));

export default class Planets extends React.Component {

    //useEffect

    domRef = React.createRef();
    
    Post = [{
        id: 'Planets-Preview', 
        el: (<Planetsprocessing />), 
        todo:true
    }]

    render() {
        return(
            <Section id="previews" ref={this.domRef}>
                <LazyImage src="sample"></LazyImage>
                {MakeColumns(this.Post, EncapRef(this.domRef))}
            </Section>
        );
    } 

}