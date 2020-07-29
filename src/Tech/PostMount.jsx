import React, { Suspense } from 'react';
import { Skeleton } from '@material-ui/lab';
import DebugLog from './DebugLog';
import { DebugDir } from './DebugLog';


export default class PostMount extends React.Component {

    constructor(props) {
        super(props);

        this.placeholder = this.props.placeholder || 
            (<Skeleton variant={this.props.variant || 'rect'} animation="wave" />);

        this.mounted = false;

        this.state = { mounted: false, toRender: this.placeholder};
    }

    componentDidMount() { 
        this.setState({
            mounted: true,
            toRender: this.props.children
        })

        if(this.props.callback) this.props.callback();
    }

    render() {
        return(
        <Suspense fallback={this.placeholder}>
            {this.state.toRender}
        </Suspense>
        );
    }
}