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
        borderBottom: '1px solid #fafafa',
    },
    smallTitle: {
        textAlign: 'right',
        flexGrow: 1,

        fontFamily: 'Roboto, serif',
        fontWeight: '100',
        textTransform: 'capitalize',
        fontSize: '20px',

        margin: 20,
        borderBottom: '1px solid grey',
    },
    grid: {
        flexGrow: 1,
        flexDirection: 'row',
    }
});

export default class Section extends React.Component {

    state = {id: this.props.id}

    render(){ return (
        <div id={this.props.id} className="section">
            <SectionContents
            {...this.props}
            />
        </div>
    );}
}

function SectionContents(props) {
    const title = props.title;
    const classes = useStyles();
    const {small} = SmallView();
    return (
        <div>
            <h2 
                className={
                    small? classes.smallTitle : 
                    classes.sectionTitle}
            >
                {title}
            </h2>
            <Grid 
                container 
                spacing={1}
                className={classes.grid + " sectionRow"}
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
    );
}
