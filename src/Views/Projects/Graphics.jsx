import React from 'react';

import Section from '../../Components/Section';
import Column from '../../Components/Column';
import Example from 'Content-Out/web/example';


export default function Graphics() {

    return(
        <Section id="graphics" title="graphics">
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