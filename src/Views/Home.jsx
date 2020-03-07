import React from 'react';

import Header from '../Components/Header';

import { makeStyles } from "@material-ui/core/styles";
const useStyles = makeStyles({
    body: {
      color: "#2f2f2f",
      backgroundColor: "#f9f7f1",
    }
});


export default function Home() {

    const classes = useStyles();

    return(
        <div>
            <Header></Header>
            {/* <Nav></Nav> */}
            
        </div>
    );
}
