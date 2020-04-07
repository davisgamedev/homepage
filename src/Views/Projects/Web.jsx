import React, { Suspense } from 'react';
import { ParagraphSkeleton } from 'Components/Column';

import Section from '../../Components/Section';
import Column from '../../Components/Column';

const Estimator = React.lazy(() => import('Content-Out/web/estimator'));
const Gulpcontentequals = React.lazy(() => import('Content-Out/web/gulpcontentequals'));
const Gulphtmltoreactclass = React.lazy(() => import('Content-Out/web/gulphtmltoreactclass'));
const Reactnewspaper = React.lazy(() => import('Content-Out/web/reactnewspaper'));
const Gaurdianalarm = React.lazy(() => import('Content-Out/web/gaurdianalarm'));



export default class Web extends React.Component {
    
    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

    Posts = [
        {id: "Estimator",    el: (<Estimator />),   todo: false},
        {id: "Gaurdian-Alarm", el: (<Gaurdianalarm />),   todo: false},
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
                   <Suspense fallback={<ParagraphSkeleton />}>
                        {p.el}
                    </Suspense>
                   </Column>)
               })
           }
        </Section>
    );}
}