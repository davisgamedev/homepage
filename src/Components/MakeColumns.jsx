import React, {Suspense} from 'react';

import { ParagraphSkeleton } from 'Components/Column';
import Column from './Column';

export function EncapRef(refArg) {
    const ref = refArg;
    return ()=>ref;
}

export default function MakeColumns(posts, getParentCompFunc) {
    console.log(getParentCompFunc());
    return(
        posts.map((post, i) => {
            let p = Object.assign({}, post, {el: undefined})
            return (
                <Column 
                key={p.id + i}
                getParentComp={getParentCompFunc}
                {...p}
                >
                    <Suspense fallback={<ParagraphSkeleton />}>
                        {post.el}
                    </Suspense>
                </Column>
            );
        })
    );
}