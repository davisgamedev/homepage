import React, { useEffect } from 'react';

import { makeStyles } from "@material-ui/core/styles";
import { NativeSelect, Grid } from '@material-ui/core';

const useStyles = makeStyles({

    container: {
        textAlign: 'center',
        position: 'relative',
    },  
    headerWrapper: {
        color: "#2f2f2f",
    },

    title: {
        fontFamily: 'Olde-English, Playfair Display, serif',
        fontSize: '96px',
        lineHeight: "72px",
        margin: '15px 0 20px 0',
    },
    subtitle: {
        fontFamily: 'Lora',
        fontSize: '14px',
        fontWeight: '100',
        textTransform: 'uppercase',
        borderBottom: '1px solid #2f2f2f',
        borderTop: '1px solid #2f2f2f',
        padding: '6px 0 6px 0',
    },

    sectionSelect: {
        fontFamily: 'Lora',
        fontWeight: '100',
        position: 'relative',
        left: '0px',
        textAlign: 'left',
        marginLeft: 20,
        fontSize: '14px',
        paddingRight: 0,
    },
    sectionItem: {
        display: 'inline-block',
        fontSize: '14px',

        fontFamily: 'Lora',
        fontWeight: '100',
        position: 'relative',
        left: '0px',
        textAlign: 'left',
        marginLeft: 20,
        paddingRight: 0,
    },

    date: {
        display: 'inline-block',
        textAlign: 'center',
    }
});


export default function Header(props){

    const classes = useStyles();
    const { ...rest } = props;

    const event = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

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
                    The Davis Smith Report
                </div>   

                <Grid container className={classes.subtitle}>

                    <Grid item xs={4} style={{textAlign: "left",}}>
                        <NativeSelect 
                        className={classes.sectionSelect} 
                        defaultValue={0}
                        style={{padding: 0}}
                        >
                            <option className={classes.sectionItem} value={0}>
                                Today's Featured News
                                </option>
                            <option className={classes.sectionItem} value={1}>
                                Audio Projects
                                </option>
                            <option className={classes.sectionItem} value={2}>
                                Game Projects
                                </option>
                            <option className={classes.sectionItem} value={3}>
                                Web Projects
                                </option>
                            <option className={classes.sectionItem} value={4}>
                                Graphics and Other Projects
                                </option>
                        </NativeSelect>
                    </Grid>

                    <Grid item xs={4}>
                        <div className={classes.date}>
                            {event.toLocaleDateString('en-US', options)}
                        </div>
                    </Grid>

                    <Grid item xs={4}></Grid>
                </Grid>
            </div>
        </div>
        );
}
