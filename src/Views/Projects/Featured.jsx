import React, { Suspense } from 'react';
import { ParagraphSkeleton } from 'Components/Column';

import Section from '../../Components/Section';
import Column from '../../Components/Column';

const Flashbang = React.lazy(() => import('Content-Out/audio/flashbang'));
const Otterspace = React.lazy(() => import('Content-Out/audio/otterspace'));
const Planetsprocessing = React.lazy(() => import('Content-Out/graphics/planetsprocessing'));
const Estimator = React.lazy(() => import('Content-Out/web/estimator'));
const Gaurdianalarm = React.lazy(() => import('Content-Out/web/gaurdianalarm'));
const Gulpcontentequals = React.lazy(() => import('Content-Out/web/gulpcontentequals'));
const Gulphtmltoreactclass = React.lazy(() => import('Content-Out/web/gulphtmltoreactclass'));

export default class Featured extends React.Component {

    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

    Posts = [
        {id: "FlashBang",       el: (<Flashbang />)},
        {id: "Return-To-Otter-Space",    el: (<Otterspace />)},
        {id: "Planets-Processing",       el: (<Planetsprocessing />),   todo: true},
        {id: "Estimator",    el: (<Estimator />),   todo: false},
        {id: "Gaurdian-Alarm", el: (<Gaurdianalarm />),   todo: false},
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
                       <Suspense fallback={<ParagraphSkeleton />}>
                            {p.el}
                        </Suspense>
                   </Column>)
               })
           }
        </Section>
    ); }
}