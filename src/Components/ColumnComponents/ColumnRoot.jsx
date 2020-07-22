import React from 'react';

import {Grid, Divider} from '@material-ui/core'
import { SmallView } from 'Tech/Breakpoints';

import Column from './Column';

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
export default function ColumnRoot(props) {

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
                React.Children.map(props.children, child => {
                return (
                    <Column
                        parentId={props.id}
                        sectionId={sectionId}
                        todo={props.todo}
                        previewSrc={props.preview}
                    >
                        {child}
                    </Column>
                )})
            }
            <Divider></Divider>
        </Grid>
    )
}