import React from 'react';
import { Skeleton } from '@material-ui/lab';

export default function ParagraphSkeleton(props) {
    return (<div className={"skeletonContainer"}>
        {
            (new Array(12).fill(null).map(
            (x, i) => 
            (props.todo && i === 4) ? 
                <p key={i} className={'placeholder'}>
                    Document not imported yet
                </p> :
            <Skeleton 
                key={i} 
                className="skeleton" 
                variant="text"
                animation="wave"
            >
            </Skeleton>
            ))
        }
    </div>)
}