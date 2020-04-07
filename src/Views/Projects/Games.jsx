import React, { Suspense } from 'react';
import { ParagraphSkeleton } from 'Components/Column';

import Section from '../../Components/Section';
import Column from '../../Components/Column';

const Bellearg = React.lazy(() => import('Content-Out/games/bellearg'));
const Bellboardgame = React.lazy(() => import('Content-Out/games/bellboardgame'));
const Belleweb = React.lazy(() => import('Content-Out/games/belleweb'));
const Yars3D = React.lazy(() => import('Content-Out/games/yars3D'));
const Queensfodder = React.lazy(() => import('Content-Out/games/queensfodder'));
const Otterspace = React.lazy(() => import('Content-Out/audio/otterspace'));
const KoCDemos = React.lazy(() => import('Content-Out/other/KoCDemos'));


export default class Games extends React.Component {
    
    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

    Posts = [
        {id: "Return-To-Otter-Space",    el: (<Otterspace />)},
        {id: "Yars-3d", el: (<Yars3D />),   todo: true},
        {id: "Belle-of-the-Ball-Board-Game", el: (<Bellboardgame />),   todo: true},
        {id: "Queens-Fodder", el: (<Queensfodder />),   todo: true},
        {id: "Belle-of-the-Ball-Web-Game", el: (<Belleweb />),   todo: true},
        {id: "Belle-of-the-Ball-ARG", el: (<Bellearg/>),   todo: true},
        {id: "KoC-Demos", el: (<KoCDemos />), todo: true}
    ];

    render(){return(
        <Section id="games" ref={this.domRef} title="game projects">
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