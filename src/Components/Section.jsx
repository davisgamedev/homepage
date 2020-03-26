import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from "@material-ui/core/styles";

import { SmallView } from 'Tech/Breakpoints';


const useStyles = makeStyles({
    sectionTitle: {
        textAlign: 'left',
        flexGrow: 1,

        fontFamily: 'Playfair Display, serif',
        fontWeight: '400',
        textTransform: 'uppercase',
        fontSize: '36px',

        marginBottom: 20,
        borderBottom: '1px solid black',
    },
    smallTitle: {
        textAlign: 'center',
        flexGrow: 1,

        fontFamily: 'Playfair Display, serif',
        fontWeight: '400',
        textTransform: 'uppercase',
        fontSize: '36px',

        marginBottom: 20,
        borderBottom: '1px solid black',
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row',
    }
});

export default function Section(props) {
    const title = props.title;
    const id = props.id;

    const classes = useStyles();

    const {small} = SmallView();

    return (
        <div id={id}>
            <h2 
                className={
                    small? classes.smallTitle : 
                    classes.sectionTitle}
            >
                {title}
            </h2>
            <Grid 
                container 
                spacing={3}
                className={classes.grid}
                direction='row'
                justify='flex-start'
                alignItems='stretch'
                wrap='wrap'
            >
                {
                    props.children
                }
            </Grid>
        </div>
    )
}