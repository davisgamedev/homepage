import React from 'react';

import Section from '../../Components/Section';
import Column from '../../Components/Column';
import Example from 'Content-Out/web/example';
import Warpdrive from 'Content-Out/graphics/warpdrive';
import Planetsprocessing from 'Content-Out/graphics/planetsprocessing';
import Planetsthreejs from 'Content-Out/graphics/planetsthreejs';
import Planetsweb from 'Content-Out/graphics/planetsweb';
import Jumptherope from 'Content-Out/audio/jumptherope';


export default class Graphics extends React.Component {

    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

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