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
import { withRouter, Link } from 'react-router-dom';
import { Skeleton } from '@material-ui/lab';
import DebugLog from 'Tech/DebugLog';
import LoadMedia from 'Tech/LoadMedia';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow 
    ref={ref} 
    {...props} 
    id="grow"
    />
});

export const ParagraphSkeleton = (props) => {
    return (<div className={"skelContainer"}>
        {
            (new Array(9).fill(null).map(
            (x, i) => 
            (props.todo && i === 2) ? <p key={i} className={'placeholder'}>Document not imported yet</p> :
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

const TodoBody = () => {
    return(
        <p>
            It seems the full documentation has not been migrated yet. Please check again soon!
        </p>
    );
}

const Interactable = withRouter(props => {

    // toggleable classes
    const [expanded, setExpanded] = React.useState(false);

    const {extraSmall} = SmallView();

    const section = props.sectionId ? '/' + props.sectionId : null;
    const post = props.parentId ? '/' + props.parentId : null;
    const path = (post && section) ? section + post : null;

    const loadMediaRef = React.useRef();

    function putProjectPath() {
        SuppressRouteChangeHandler();
        if(path) props.history.push(path);
    }

    function putSectionPath() {
        SuppressRouteChangeHandler();
        if(section) props.history.push(section);
    }

    function open() {
        if(expanded) return;
        setExpanded(true);
        putProjectPath();
        window.docIsOpen = true;

        console.dir(loadMediaRef);

        // if(!loadMediaRef.loaded) {
        //     DebugLog("%cMedia force loaded through column", "background-color: purple; color: white");
        //     loadMediaRef.loadMedia();
        // }
    }

    function close() {
        setExpanded(false);
        putSectionPath();
        window.docIsOpen = false;
    }

    function contact() {
        setExpanded(false);
        setTimeout(() => {props.history.push("/contact")}, 100);
    }

    return (
        <Button 
        className={"container collapsed " + (extraSmall? 'extraSmall' : '')}
        onClick={open}
        >
            <div className="innerContainer">
            {props.children}
            {
                props.empty? <ParagraphSkeleton todo={true}></ParagraphSkeleton> : null
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
                        <LoadMedia ref={loadMediaRef}>{props.children}</LoadMedia>
                        {props.todo ? <TodoBody /> : null}
                        <p className="footer">
                            If you would like to request more information on this project, please
                            feel free to <Link 
                                            className="generalLink" 
                                            onClick={contact} 
                                            to={"/contact"}>
                                            contact me!
                                            </Link>
                        </p>
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

/*
    TODO: FIX THIS LOGIC
        SEE VIEWS
        we NEED some kind of factory function to correctly link all these props 
            besides just passing them on all sloppy
*/
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