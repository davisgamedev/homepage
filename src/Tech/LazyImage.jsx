import React, {Suspense} from 'react';
import { Image } from 'cloudinary-react'
import { makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

const useStyles = makeStyles({
    resize: {
        width: '100%',
        height: '100%'
    }
});

export default function LazyImage(props) {

    const classes = useStyles();

    return <div className={classes.resize}>
        <Suspense fallback={<Skeleton variant="rect" animation="wave" />}>
            <Image publicId={props.src}>
                {props.Children}
            </Image>
        </Suspense>
    </div>;
}