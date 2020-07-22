import React, { Suspense } from 'react';
import Section from '../../Components/Section';
import LazyImage from 'Tech/LazyImage';
import { EncapRef } from 'Components/MakeColumns';
import ColumnRoot from 'Components/ColumnComponents/ColumnRoot';
import ParagraphSkeleton from 'Components/ColumnComponents/ParagraphSkeleton';
import Headline from 'Components/Headline';

const HeadlinePost = React.lazy(() => import('Content-Out/graphics/planetsprocessing'));

export default class Planets extends React.Component {

    render() {
        return (
        <Headline todo={true}>
            <HeadlinePost></HeadlinePost>
        </Headline>
        );
    }
}