import React from 'react';
import {withRouter} from 'react-router-dom';

import ScrollHandler from '../Tech/ScrollHandler';

import Header from '../Components/Header';
import Column from '../Components/Column';
import Section from '../Components/Section';

import { makeStyles } from "@material-ui/core/styles";

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

/*

            <div className="dropdown-content">
                <Link className="dropdown-link" to="/"          >1A: Headlines</Link>
                <Link className="dropdown-link" to="#games"     >2A: Game Projects</Link>
                <Link className="dropdown-link" to="#audio"     >2B: Audio Projects</Link>
                <Link className="dropdown-link" to="#web"       >2C: Web Projects</Link>
                <Link className="dropdown-link" to="#graphics"  >2D: Graphics &amp; Misc</Link>
                <Link className="dropdown-link" to="#contact"   >3A: Write to the Editor</Link>

*/

function Block(props) {
    return (<div style={{fill: 'red', height: '800px'}}></div>);
};

export default function Home(props) {

    const classes = useStyles();


    return(
        <div>
            <ScrollHandler></ScrollHandler>
            <Header></Header>
            {/* <Nav></Nav> */}
            {/* <ExampleBody></ExampleBody> */}

            <div className={classes.content}>
                <Section id="">
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
            </div>

        </div>
    );
}
