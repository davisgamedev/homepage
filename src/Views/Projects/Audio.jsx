import React, { Suspense } from 'react';
import { ParagraphSkeleton } from 'Components/Column';

import Section from '../../Components/Section';
import Column from '../../Components/Column';

const Aquaticgame = React.lazy(() => import( 'Content-Out/audio/aquaticgame'));
const Autocomposer = React.lazy(() => import( 'Content-Out/audio/autocomposer'));
const Flashbang = React.lazy(() => import( 'Content-Out/audio/flashbang'));
const Jumptherope = React.lazy(() => import( 'Content-Out/audio/jumptherope'));
const Otterspace = React.lazy(() => import( 'Content-Out/audio/otterspace'));
const Paintrain = React.lazy(() => import( 'Content-Out/audio/paintrain'));

export default class Audio extends React.Component {

    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

    Posts = [
        {id: "FlashBang",       el: (<Flashbang />)},
        {id: "Return-To-Otter-Space",    el: (<Otterspace />)},
        {id: "Pain-Train",    el: (<Paintrain />), todo: true},
        {id: "Jump-The-Rope",   el: (<Jumptherope />),   todo: true},
        {id: "Aquatic-Game",    el: (<Aquaticgame />),   todo: true},
        {id: "Autocomposer",    el: (<Autocomposer />),   todo: true},
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
                       <Suspense fallback={<ParagraphSkeleton />}>
                            {p.el}
                        </Suspense>
                   </Column>)
               })
           }
        </Section>
    ); }
}