import React, {Suspense} from 'react';

import { ParagraphSkeleton } from 'Components/Column';
import Column from './Column';


export default function MakeColumns(posts, getParentCompFunc) {
    return(
        posts.map((p, i) => {
            return (
                <Column 
                key={p.id + i}
                getParentComp={getParentCompFunc}
                {...p}
                >
                    <Suspense fallback={<ParagraphSkeleton />}>
                        {p.el}
                    </Suspense>
                </Column>
            );
        })
    );
}