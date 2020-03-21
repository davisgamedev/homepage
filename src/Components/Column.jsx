import React from 'react';

import Grid from '@material-ui/core/Grid';

import {
    Button, 
    Dialog,
    Paper,
    ClickAwayListener,
    Grow
} from '@material-ui/core';

import './Column.css';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow 
    ref={ref} 
    {...props} 
    transition={1000}
    />
});


function Interactable(props) {

    // toggleable classes
    const [expanded, setExpanded] = React.useState(false);

    return (
        <span>
                <Button className="container collapsed" onClick={()=>setExpanded(true)}>
                    {props.children}

                    <Dialog 
                        className="container expanded"
                        onClose={()=>setExpanded(false)} 
                        open={expanded}
                        maxWidth={'md'}
                        fullWidth={true}
                        scroll={'body'}
                        onRequestClose={props.closeModal}
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
        </span>
    );
}





export default function Column(props) {

    const xs = props.xs || 3;

    return (
        <Grid item xs={xs} className="column">
            {
            React.Children.map(props.children, c => {
                return (<Interactable>{c}</Interactable>)
            })
            }
        </Grid>

    )
}