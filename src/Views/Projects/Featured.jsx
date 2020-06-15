import React from 'react';
import Section from '../../Components/Section';
import MakeColumns, {EncapRef} from '../../Components/MakeColumns';

const Flashbang = React.lazy(() => import('Content-Out/audio/flashbang'));
const Otterspace = React.lazy(() => import('Content-Out/audio/otterspace'));
const Planetsprocessing = React.lazy(() => import('Content-Out/graphics/planetsprocessing'));
const Estimator = React.lazy(() => import('Content-Out/web/estimator'));
const Gaurdianalarm = React.lazy(() => import('Content-Out/web/gaurdianalarm'));
const Gulpcontentequals = React.lazy(() => import('Content-Out/web/gulpcontentequals'));
const Gulphtmltoreactclass = React.lazy(() => import('Content-Out/web/gulphtmltoreactclass'));

export default class Featured extends React.Component {

    domRef = React.createRef();

    Posts = [
        {
            id: "FlashBang",       
            el: (<Flashbang />),
        },
        {
            id: "Return-To-Otter-Space",    
            el: (<Otterspace />),
            preview: 'https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1585425860/otterspace-ship_httiiq.jpg',
        },
        {
            id: "Planets-Processing",       
            el: (<Planetsprocessing />),   
            todo: true
        },
        {
            id: "Estimator",    
            el: (<Estimator />),   
        },
        {
            id: "Gaurdian-Alarm", 
            el: (<Gaurdianalarm />),   
        },
        {
            id: "gulp-contentequals", 
            el: (<Gulpcontentequals />),   
            todo: true
        },
        {
            id: "gulp-htmltoreactclass", 
            el: (<Gulphtmltoreactclass />),   
            todo: true
        },
    ];

    render() { 
        return(
        <Section id="projects" ref={this.domRef} title="featured projects">
            {MakeColumns(this.Posts, EncapRef(this.domRef))}
        </Section>
    ); }
}