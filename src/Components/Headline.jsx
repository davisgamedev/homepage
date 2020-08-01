import React, { Suspense } from 'react';
import Section from '../Components/Section';
import { Grid, Divider, Button } from '@material-ui/core';
import { SmallView } from 'Tech/Breakpoints';
import { withRouter } from 'react-router-dom';
import Preview from './ColumnComponents/Preview';


import './ColumnComponents/Column.css';
import ParagraphSkeleton from './ColumnComponents/ParagraphSkeleton';
import SmartImage from 'Tech/SmartImage';
import WindowDimensions from 'Tech/WindowDimensions';
import BackgroundSpread from 'Tech/BackgroundSpread';


const colGrid = {
    sm: 12,
    md: 3,
    lg: 3,
    className: 'column'
}

const imgGrid = {
    sm: 12,
    md: 9,
    lg: 9,
}


function HeadlineImage(props){

    const {extraSmall} = SmallView();
    
    const {windowWidth, windowHeight} = WindowDimensions();

    return(
        <Grid 
            item 
            className="column"
            xs={extraSmall? 12: 12} 
            {...imgGrid}
            id={props.id}
        >
            <div className="headlineImg headlineImgContainer" style={{minHeight: windowHeight * 2/3}}>
                <BackgroundSpread src={props.src}></BackgroundSpread>
                <SmartImage src={props.src}></SmartImage>
            </div>
        </Grid>

        );
}

const HeadlineDescription = withRouter(({
    id, 
    getParentComp, 
    todo, 
    previewSrc,
    link,
    
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
            className="column"
            xs={extraSmall? 12: 12} 
            {...colGrid}
            id={id}
        >
            <Button 
                className={"container collapsed" + (extraSmall? 'extraSmall' : '')}
                onClick={()=>history.push({pathname: link})}
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
                <HeadlineDescription todo={this.props.todo} link={this.props.link}>
                    <Suspense fallback={<ParagraphSkeleton />}>
                        {this.props.children}
                    </Suspense>
                </HeadlineDescription>
                <HeadlineImage src={this.props.src} getRef={()=>this.columnRef}>
                </HeadlineImage>
            </Section>
        );
    } 
}