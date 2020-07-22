import React, { Suspense } from 'react';
import Section from '../Components/Section';
import LazyImage from 'Tech/LazyImage';
import ParagraphSkeleton from 'Components/ColumnComponents/ParagraphSkeleton';
import { Grid, Divider, Button } from '@material-ui/core';
import { SmallView } from 'Tech/Breakpoints';
import Column from './ColumnComponents/Column';
import { withRouter } from 'react-router-dom';
import Preview from './ColumnComponents/Preview';
import { DebugDir } from 'Tech/DebugLog';


import './ColumnComponents/Column.css';


const colGrid = {
    sm: 12,
    md: 4,
    lg: 2,
    className: 'column'
}

const imgGrid = {
    sm: 12,
    md: 8,
    lg: 10,
}


function HeadlineImage(props){

    const {extraSmall} = SmallView();

    return(
        <Grid 
            item 
            className="column"
            xs={extraSmall? 12: 6} 
            {...imgGrid}
            id={props.id}
        >
            {props.children}
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
            className="column"
            xs={extraSmall? 12: 6} 
            {...colGrid}
            id={id}
        >
            <Button 
                className={"container collapsed " + (extraSmall? 'extraSmall' : '')}
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

    domRef = React.createRef();

    render() {
        return(
            <Section id="headline" ref={this.domRef}>
                <HeadlineImage>
                    <LazyImage src="sample"></LazyImage>
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