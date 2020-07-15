import React from 'react';

import {SuppressRouteChangeHandler} from '../../Tech/RouteUpdateHandler';

import {
    Button, 
    Dialog,
    Paper,
    ClickAwayListener,
    Grow,
} from '@material-ui/core';

import './Column.css';
import { SmallView } from 'Tech/Breakpoints';
import { withRouter, Link } from 'react-router-dom';
import DebugLog from 'Tech/DebugLog';
import LoadMedia from 'Tech/LoadMedia';

import ColumnHead from './ColumnHead';
import ColumnFooter from './ColumnFooter';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Grow 
    ref={ref} 
    {...props} 
    id="grow"
    />
});

const TodoBody = () => {
    return(
        <p>
            It seems the full documentation has not been migrated yet. Please check again soon!
        </p>
    );
}

const Column = withRouter(props => {

    // toggleable classes
    const [expanded, setExpanded] = React.useState(false);

    const {extraSmall} = SmallView();

    const section = props.sectionId ? '/' + props.sectionId : null;
    const post = props.parentId ? '/' + props.parentId : null;
    const path = (post && section) ? section + post : null;

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
            <ColumnHead></ColumnHead>

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
                        <LoadMedia>
                            {props.children}
                        </LoadMedia>

                        {
                            props.todo ? 
                            <TodoBody /> : 
                            null
                        }

                        <ColumnFooter contact={() => this.contact}></ColumnFooter>

                    </Paper>
                </ClickAwayListener>

            </Dialog>
        </Button>
    );
});

export default Column;
