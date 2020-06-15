import React from 'react';
import Section from '../../Components/Section';
import MakeColumns, {EncapRef} from '../../Components/MakeColumns';

const Estimator = React.lazy(() => import('Content-Out/web/estimator'));
const Gulpcontentequals = React.lazy(() => import('Content-Out/web/gulpcontentequals'));
const Gulphtmltoreactclass = React.lazy(() => import('Content-Out/web/gulphtmltoreactclass'));
const Reactnewspaper = React.lazy(() => import('Content-Out/web/reactnewspaper'));
const Gaurdianalarm = React.lazy(() => import('Content-Out/web/gaurdianalarm'));



export default class Web extends React.Component {
    
    domRef = React.createRef();

    Posts = [
        {id: "Estimator",    el: (<Estimator />),   todo: false},
        {id: "Guardian-Alarm", el: (<Gaurdianalarm />),   todo: false},
        {id: "gulp-contentequals", el: (<Gulpcontentequals />),   todo: true},
        {id: "gulp-htmltoreactclass", el: (<Gulphtmltoreactclass />),   todo: true},
        {id: "react-newspaper", el: (<Reactnewspaper />), todo: true}
    ];

    render(){return(
       <Section id="web" ref={this.domRef} title="web projects">
            {MakeColumns(this.Posts, EncapRef(this.domRef))}
        </Section>
    );}
}