import React from 'react';

import Header from '../Components/Header';
import ExampleBody from '../Components/ExampleColumns/ExampleBody';

import Column from '../Components/Column';

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


export default function Home() {

    const classes = useStyles();

    return(
        <div>
            <Header></Header>
            {/* <Nav></Nav> */}
            {/* <ExampleBody></ExampleBody> */}
            <div className={classes.content}>
                <Column></Column>
                <Column></Column>
                <Column></Column>
                <Column></Column>
                <Column></Column>
                <Column></Column>
                <Column></Column>
                <Column></Column>
                <Column></Column>
                <Column></Column>
            </div>

        </div>
    );
}
