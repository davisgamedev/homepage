import React from 'react';

import Section from '../../Components/Section';
import Column from '../../Components/Column';
import Example from 'Content-Out/web/example';
import Bellearg from 'Content-Out/games/bellearg';
import Bellboardgame from 'Content-Out/games/bellboardgame';
import Belleweb from 'Content-Out/games/belleweb';
import Yars3D from 'Content-Out/games/yars3D';
import Queensfodder from 'Content-Out/games/queensfodder';
import Otterspace from 'Content-Out/audio/otterspace';
import KoCDemos from 'Content-Out/other/KoCDemos';


export default class Games extends React.Component {
    
    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

    Posts = [
        {id: "Return-To-Otter-Space",    el: (<Otterspace />),   todo: true},
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
                       {p.el}
                   </Column>)
               })
           }
        </Section>
    );}
}