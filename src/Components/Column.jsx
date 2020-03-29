import React from 'react';

import Grid from '@material-ui/core/Grid';

import {SuppressRouteChangeHandler} from '../Tech/RouteUpdateHandler';

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
import { Skeleton } from '@material-ui/lab';
import DebugLog from 'Tech/DebugLog';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow 
    ref={ref} 
    {...props} 
    id="grow"
    />
});

const ParagraphSkeleton = () => {
    return (<div className={"skelContainer"}>
        {
            (new Array(9).fill(null).map(
            (x, i) => 
            <Skeleton 
            key={i} 
            className="skel" 
            variant="text"
            animation="wave"
            >
            </Skeleton>))
        }
    </div>)
}

const Interactable = withRouter(props => {

    // toggleable classes
    const [expanded, setExpanded] = React.useState(false);

    const {extraSmall} = SmallView();

    const section = props.sectionId ? '/' + props.sectionId : null;
    const post = props.parentId ? '/' + props.parentId : null;


    function putProjectPath() {
        if(section && post) {
            SuppressRouteChangeHandler();
            const path = section + post;
            props.history.push(path);
        }
    }

    function putSectionPath() {
        if(section){
            SuppressRouteChangeHandler();
            props.history.push(section);
        }
    }

    function open() {
        if(expanded) return;
        setExpanded(true);
        putProjectPath();
    }

    function close() {
        setExpanded(false);
        putSectionPath();
    }

    return (
        <Button 
        className={"container collapsed " + (extraSmall? 'extraSmall' : '')}
        onClick={open}
        >
            <div className="innerContainer">
            {
                props.children
            }
            {
                props.empty? <ParagraphSkeleton></ParagraphSkeleton> : null
            }
            </div>
            <Dialog 
                className={"container expanded " + (extraSmall? 'extraSmall' : '') }
                onClose={close} 
                open={expanded}
                maxWidth={'md'}
                fullWidth={true}
                scroll={'body'}
                transitionDuration={{enter:500, exit:250}}
                TransitionComponent={Transition}
            >
                <ClickAwayListener onClickAway={close}>
                    <Paper 
                    className='paperContainer' 
                    elevation={3}
                    variant={extraSmall ? "outlined" : "elevation"}
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
                empty={props.todo}
                >
                    {c}
                </Interactable>)
            })
            }
            <Divider></Divider>
        </Grid>

    )
}