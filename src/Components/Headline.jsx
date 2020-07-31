import React, { Suspense } from 'react';
import Section from '../Components/Section';
import { Grid, Divider, Button } from '@material-ui/core';
import { SmallView } from 'Tech/Breakpoints';
import Column from './ColumnComponents/Column';
import { withRouter } from 'react-router-dom';
import Preview from './ColumnComponents/Preview';
import { DebugDir } from 'Tech/DebugLog';


import './ColumnComponents/Column.css';
import ParagraphSkeleton from './ColumnComponents/ParagraphSkeleton';
import SmartImage from 'Tech/SmartImage';
import HeaderHeight from 'Tech/HeaderHeight';
import WindowDimensions from 'Tech/WindowDimensions';
import { DebugList } from 'Tech/DebugLog';


const colGrid = {
    sm: 12,
    md: 3,
    lg: 1,
    className: 'column'
}

const imgGrid = {
    sm: 12,
    md: 9,
    lg: 10,
}


function HeadlineImage(props){

    const {extraSmall} = SmallView();

    return(
        <Grid 
            item 
            className="column headlineImg debug"
            xs={extraSmall? 12: 6} 
            {...imgGrid}
            id={props.id}
        >
                <SmartImage src={props.src}></SmartImage>
        </Grid>

        );
}

const HeadlineDescription = withRouter(({
    id, 
    getParentComp, 
    todo, 
    previewSrc,
    
    children,
    history}) => {


    const {extraSmall} = SmallView();

    let sectionId;

    if(id && getParentComp().current) {
        sectionId = getParentComp().current.props.id;
    }

    return (
        <Grid 
            item 
            className="column debug"
            xs={extraSmall? 12: 6} 
            {...colGrid}
            id={id}
        >
            <Button 
                className={"container collapsed debug" + (extraSmall? 'extraSmall' : '')}
                onClick={()=>history.push({pathname: "/graphics/Planets-Processing"})}
                >
                <div className="innerContainer">
                    {
                    previewSrc? 
                        <Preview src={previewSrc}>{children}</Preview> 
                        : children
                    }
                    {
                        todo? <ParagraphSkeleton todo={true}></ParagraphSkeleton> : null
                    }
                </div>
            </Button>
            <Divider></Divider>
        </Grid>
    )


});

export default class Headline extends React.Component {
    render() {
        return(
            <Section id="headlines" title="headlines">
            <HeadlineImage src="sample" getRef={()=>this.columnRef}>
            </HeadlineImage>
            <HeadlineDescription todo={this.props.todo}>
                <Suspense fallback={<ParagraphSkeleton />}>
                    {this.props.children}
                </Suspense>
            </HeadlineDescription>
            </Section>
        );
    } 
}