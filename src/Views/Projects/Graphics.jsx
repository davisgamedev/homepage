import React, { Suspense } from 'react';
import { ParagraphSkeleton } from 'Components/Column';

import Section from '../../Components/Section';
import Column from '../../Components/Column';

const Warpdrive = React.lazy(() => import('Content-Out/graphics/warpdrive'));
const Planetsprocessing = React.lazy(() => import('Content-Out/graphics/planetsprocessing'));
const Planetsthreejs = React.lazy(() => import('Content-Out/graphics/planetsthreejs'));
const Planetsweb = React.lazy(() => import('Content-Out/graphics/planetsweb'));
const Jumptherope = React.lazy(() => import('Content-Out/audio/jumptherope'));


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
                   <Suspense fallback={<ParagraphSkeleton />}>
                        {p.el}
                    </Suspense>
                   </Column>)
               })
           }
        </Section>
    ); }
}