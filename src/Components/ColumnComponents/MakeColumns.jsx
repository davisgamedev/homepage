import React, {Suspense} from 'react';
import ParagraphSkeleton from './ParagraphSkeleton'
import ColumnRoot from './ColumnRoot';

export function EncapRef(refArg) {
    const ref = refArg;
    return ()=>ref;
}

export default function MakeColumns(posts, getParentCompFunc) {
    return(
        posts.map((post, i) => {
            let p = Object.assign({}, post, {el: undefined})
            return (
                <ColumnRoot 
                key={p.id + i}
                getParentComp={getParentCompFunc}
                {...p}
                >
                    <Suspense fallback={<ParagraphSkeleton />}>
                        {post.el}
                    </Suspense>
                </ColumnRoot>
            );
        })
    );
}