import React, { useEffect } from 'react';

import '../Assets/css/fonts.css';


import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    container: {
        textAlign: 'center',
        position: 'relative',
    },  
    headerWrapper: {
        color: "#2f2f2f",
    },
    title: {
        fontWeight: 900,
        fontFamily: 'Playfair Display, serif',
        fontSize: '80px',
        textTransform: 'uppercase',
        lineHeight: "72px",
        marginBottom: 20,
    },
    subtitle: {
        fontFamily: 'Lora',
        textTransform: 'uppercase',
        borderBottom: '2px solid #2f2f2f',
        borderTop: '2px solid #2f2f2f',
        padding: '12px 0 12px 0',
    },
});


export default function Header(props){

    const classes = useStyles();
    const { ...rest } = props;

    const titleId = 'fontTitleUpdateTarget';

    useEffect(() => {
        // let title = document.getElementById(titleId);
        // title.style.fontFamily = 'Playfair Display';
    });

    // will have to add an img tag
    return (
        <div className={classes.container}>
            <div className={classes.headerWrapper}>
                <div className={classes.title}>
                    The Newsport Times
                </div>   

                <div className={classes.subtitle}>
                    Is a Game and Audio Developer
                </div>
            </div>
        </div>
        );
}
