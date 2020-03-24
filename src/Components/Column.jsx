import React from 'react';

import Grid from '@material-ui/core/Grid';

import {
    Button, 
    Dialog,
    Paper,
    ClickAwayListener,
    Grow,
    Divider,
} from '@material-ui/core';

import './Column.css';
import { SmallView } from 'Tech/Breakpoints';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow 
    ref={ref} 
    {...props} 
    id="grow"
    />
});


function Interactable(props) {

    // toggleable classes
    const [expanded, setExpanded] = React.useState(false);

    const {small, extraSmall} = SmallView();


    return (
        <Button 
        className={"container collapsed " + (extraSmall? 'extraSmall' : '')}
        onClick={()=>setExpanded(true)}
        >
            {props.children}

            <Dialog 
                className="container expanded"
                onClose={()=>setExpanded(false)} 
                open={expanded}
                maxWidth={'md'}
                fullWidth={true}
                scroll={'body'}
                transitionDuration={{enter:500, exit:250}}
                TransitionComponent={Transition}
            >
                <ClickAwayListener onClickAway={()=>setExpanded(false)}>
                    <Paper 
                    className='paperContainer' 
                    elevation={3}
                    >
                        {props.children}
                    </Paper>
                </ClickAwayListener>

            </Dialog>
        </Button>
    );
}

export default function Column(props) {

    const {extraSmall} = SmallView();

    return (
        <Grid 
        item 
        className="column"
        xs={extraSmall? 12: 6} 
        sm={4}
        md={3}
        lg={2}
        xl={2}
        >
            {
            React.Children.map(props.children, c => {
                return (<Interactable>{c}</Interactable>)
            })
            }
            <Divider></Divider>
        </Grid>

    )
}