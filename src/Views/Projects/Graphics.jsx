import React from 'react';
import Section from '../../Components/Section';
import MakeColumns, {EncapRef} from '../../Components/MakeColumns';

const Warpdrive = React.lazy(() => import('Content-Out/graphics/warpdrive'));
const Planetsprocessing = React.lazy(() => import('Views/Headlines/node_modules/Content-Out/graphics/planetsprocessing'));
const Planetsthreejs = React.lazy(() => import('Content-Out/graphics/planetsthreejs'));
const Planetsweb = React.lazy(() => import('Content-Out/graphics/planetsweb'));
const Jumptherope = React.lazy(() => import('Content-Out/audio/jumptherope'));


export default class Graphics extends React.Component {

    domRef = React.createRef();

    Posts = [
        {id: "Jump-The-Rope",   el: (<Jumptherope />),   todo: true},
        {id: "Warpdrive",    el: (<Warpdrive />),   todo: true},
        {id: "Planets-Processing",       el: (<Planetsprocessing />),   todo: true},
        {id: "Planets-ThreeJS",    el: (<Planetsthreejs />),   todo: true},
        {id: "Planets-Canvas",    el: (<Planetsweb />), todo: true},
    ];

    render() { 
        return(
        <Section id="graphics" ref={this.domRef} title="graphics projects">
            {MakeColumns(this.Posts, EncapRef(this.domRef))}
        </Section>
    ); }
}