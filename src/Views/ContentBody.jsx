
import React from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Section from '../Components/Section';

function Block(props) {

    return (
        <div style={{border: '1px solid red', minHeight: '800px', minWidth:'400px'}}>
            <p style={{color: 'black'}}>Top</p>
        </div>
    );
}

const useStyles = makeStyles({
    content: {  
        fontSize: 0,
        lineHeight: 0,
        wordSpacing: '-.31em',
        display: 'inline-block',
        margin: '30px 2% 0 2%',
        textAlign: 'center',
    }
});

export default function ContentBody(props) {

    const classes = useStyles();


    return (<div className={classes.content}>
        <Section id="featured" >
            <Block />
        </Section>

        <Section id="games" title="games">
            <Block />
        </Section>

        <Section id="audio" title="audio">
            <Block />
        </Section>

        <Section id="web" title="web">
            <Block />
        </Section>

        <Section id="graphics" title="graphics">
            <Block />
        </Section>

        <Section id="contact" title="contact">
            <Block />
    </Section>
</div>);
}