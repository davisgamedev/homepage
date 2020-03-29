import React from 'react';

import Section from '../../Components/Section';
import Column from '../../Components/Column';
import Example from 'Content-Out/web/example';
import Flashbang from 'Content-Out/audio/flashbang';
import Otterspace from 'Content-Out/audio/otterspace';
import Planetsprocessing from 'Content-Out/graphics/planetsprocessing';
import Estimator from 'Content-Out/web/estimator';
import Gaurdianalarm from 'Content-Out/web/gaurdianalarm';
import Gulpcontentequals from 'Content-Out/web/gulpcontentequals';
import Gulphtmltoreactclass from 'Content-Out/web/gulphtmltoreactclass';

export default class Featured extends React.Component {

    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

    Posts = [
        {id: "FlashBang",       el: (<Flashbang />),   todo: true},
        {id: "Return-To-Otter-Space",    el: (<Otterspace />),   todo: true},
        {id: "Planets-Processing",       el: (<Planetsprocessing />),   todo: true},
        {id: "Estimator",    el: (<Estimator />),   todo: true},
        {id: "Gaurdian-Alarm", el: (<Gaurdianalarm />),   todo: true},
        {id: "gulp-contentequals", el: (<Gulpcontentequals />),   todo: true},
        {id: "gulp-htmltoreactclass", el: (<Gulphtmltoreactclass />),   todo: true},
    ];

    render() { 
        return(
        <Section id="projects" ref={this.domRef} title="featured projects">
            {
               this.Posts.map((p, i) => {
                   return (
                   <Column 
                   key={p.id + i}
                   id={p.id}
                   getParentComp={this.getParentComp}
                   todo={p.todo}
                   double={p.double? true : false}
                   >
                       {p.el}
                   </Column>)
               })
           }
        </Section>
    ); }
}