import React from 'react';

import Section from '../../Components/Section';
import Column from '../../Components/Column';
import Example from 'Content-Out/web/example';



export default function Games() {

    return(
        <Section id="games" title="games">
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
    );
}