import React from 'react';

import Section from '../../Components/Section';
import Column from '../../Components/Column';
import Example from 'Content-Out/web/example';

export default class Featured extends React.Component {

    domRef = React.createRef();

    getParentComp = () => { return this.domRef; }

    render() { 
        return(
        <Section id="projects" ref={this.domRef} title="featured projects">
            <Column id="post1" getParentComp={this.getParentComp}>
                <Example></Example>
            </Column>
            <Column>
                <Example></Example>
            </Column>
            <Column>
                <Example></Example>
            </Column>
            <Column>
                <Example></Example>
            </Column>
            <Column>
                <Example></Example>
            </Column>
            <Column>
                <Example></Example>
            </Column>
            <Column>
                <Example></Example>
            </Column>
            <Column>
                <Example></Example>
            </Column>
            <Column>
                <Example></Example>
            </Column>
            <Column>
                <Example></Example>
            </Column>
        </Section>
    ); }
}