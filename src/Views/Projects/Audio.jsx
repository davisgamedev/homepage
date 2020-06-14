import React from 'react';
import Section from '../../Components/Section';
import MakeColumns, {EncapRef} from '../../Components/MakeColumns';

const Aquaticgame = React.lazy(() => import( 'Content-Out/audio/aquaticgame'));
const Autocomposer = React.lazy(() => import( 'Content-Out/audio/autocomposer'));
const Flashbang = React.lazy(() => import( 'Content-Out/audio/flashbang'));
const Jumptherope = React.lazy(() => import( 'Content-Out/audio/jumptherope'));
const Otterspace = React.lazy(() => import( 'Content-Out/audio/otterspace'));
const Paintrain = React.lazy(() => import( 'Content-Out/audio/paintrain'));


export default class Audio extends React.Component {

    domRef = React.createRef();

    //getParentComp = () => { return this.domRef; }

    Posts = [
        {
            id: "FlashBang",       
            el: (<Flashbang />)},
        {
            id: "Return-To-Otter-Space",   
            el: (<Otterspace />)},
        {
            id: "Pain-Train",    
            el: (<Paintrain />), todo: true},
        {
            id: "Jump-The-Rope",   
            el: (<Jumptherope />),   todo: true},
        {
            id: "Aquatic-Game",    
            el: (<Aquaticgame />),   todo: true},
        {
            id: "Autocomposer",    
            el: (<Autocomposer />),   todo: true},
    ];

    render() { 
        return(
        <Section id="audio" ref={this.domRef} title="audio projects">
            {MakeColumns(this.Posts, EncapRef(this.domRef))}
        </Section>
    ); }
}