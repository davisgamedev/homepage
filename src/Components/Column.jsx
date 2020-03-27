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
import { withRouter } from 'react-router-dom';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow 
    ref={ref} 
    {...props} 
    id="grow"
    />
});


const Interactable = withRouter(props => {

    // toggleable classes
    const [expanded, setExpanded] = React.useState(false);

    const {extraSmall} = SmallView();

    function open() {
        setExpanded(true);
        if(props.parentId && props.sectionId) {
            const path = props.sectionId + '/' + props.parentId;
            console.log(path);
            props.history.push(path);
        }
    }


    return (
        <Button 
        className={"container collapsed " + (extraSmall? 'extraSmall' : '')}
        onClick={open}
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
});

const singleProps = {
    sm: 4,
    md: 3,
    lg: 2,
    className: 'column'
}

const doubleProps = {
    sm: 8,
    md: 5,
    lg: 4,
    className: 'column double'
}

const tripleProps = {
    sm: 12,
    md: 7,
    lg: 8,
    className: 'column triple'
}

export default function Column(props) {

    const {extraSmall} = SmallView();
    let gridProps = singleProps;
    if(props.double) gridProps = doubleProps;
    if(props.triple) gridProps = tripleProps;
    
    let sectionId;

    if(props.id && props.getParentComp().current) {
        sectionId = props.getParentComp().current.props.id;
    }

    return (
        <Grid 
        item 
        className="column"
        xs={extraSmall? 12: 6} 
        {...gridProps}
        id={props.id}
        >
            {
            React.Children.map(props.children, c => {
                return (
                <Interactable
                parentId={props.id}
                sectionId={sectionId}
                >
                    {c}
                </Interactable>)
            })
            }
            <Divider></Divider>
        </Grid>

    )
}