import React from 'react';

import Section from '../../Components/Section';
import Column from '../../Components/Column';

import Aquaticgame from 'Content-Out/audio/aquaticgame';
import Autocomposer from 'Content-Out/audio/autocomposer';
import Flashbang from 'Content-Out/audio/flashbang';
import Jumptherope from 'Content-Out/audio/jumptherope';
import Otterspace from 'Content-Out/audio/otterspace';
import Paintrain from 'Content-Out/audio/paintrain';

export default class Audio extends React.Component {

    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

    Posts = [
        {id: "Aquatic-Game",    el: (<Aquaticgame />),   todo: true},
        {id: "Autocomposer",    el: (<Autocomposer />),   todo: true},
        {id: "FlashBang",       el: (<Flashbang />),   todo: true},
        {id: "Jump-The-Rope",   el: (<Jumptherope />),   todo: true},
        {id: "Return-To-Otter-Space",    el: (<Otterspace />),   todo: true},
        {id: "Pain-Train",    el: (<Paintrain />), todo: true},
    ];

    render() { 
        return(
        <Section id="audio" ref={this.domRef} title="audio projects">
           {
               this.Posts.map((p, i) => {
                   return (
                   <Column 
                   key={p.id + i}
                   id={p.id}
                   getParentComp={this.getParentComp}
                   todo={p.todo}
                   >
                       {p.el}
                   </Column>)
               })
           }
        </Section>
    ); }
}