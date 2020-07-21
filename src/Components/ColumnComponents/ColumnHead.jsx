import React from 'react';

import ParagraphSkeleton from './ParagraphSkeleton';
import Preview from './Preview';

export default function ColumnHead(props) {
    return(
        <div className="innerContainer">
            {
            props.previewSrc? 
                <Preview src={props.previewSrc}>
                    {props.children}
                </Preview> :

                props.children
            }
            {
                props.todo? <ParagraphSkeleton todo={true}></ParagraphSkeleton> : null
            }
        </div>
    );
    
}