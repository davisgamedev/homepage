import React from 'react';

import Section from '../../Components/Section';
import Column from '../../Components/Column';
import Example from 'Content-Out/web/example';
import Estimator from 'Content-Out/web/estimator';
import Gulpcontentequals from 'Content-Out/web/gulpcontentequals';
import Gulphtmltoreactclass from 'Content-Out/web/gulphtmltoreactclass';
import Reactnewspaper from 'Content-Out/web/reactnewspaper';
import Gaurdianalarm from 'Content-Out/web/gaurdianalarm';



export default class Web extends React.Component {
    
    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

    Posts = [
        {id: "Estimator",    el: (<Estimator />),   todo: true},
        {id: "Gaurdian-Alarm", el: (<Gaurdianalarm />),   todo: true},
        {id: "gulp-contentequals", el: (<Gulpcontentequals />),   todo: true},
        {id: "gulp-htmltoreactclass", el: (<Gulphtmltoreactclass />),   todo: true},
        {id: "react-newspaper", el: (<Reactnewspaper />), todo: true}
    ];

    render(){return(
        <Section id="web" ref={this.domRef} title="web projects">
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
    );}
}