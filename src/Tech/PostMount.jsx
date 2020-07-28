import React, { Suspense } from 'react';
import { Skeleton } from '@material-ui/lab';


export default class PostMount extends React.Component {

    constructor(props) {
        super(props);

        this.placeholder = this.props.placeholder || 
            (<Skeleton variant={this.props.variant || 'rect'} animation="wave" />);

        this.mounted = false;
    }

    componentDidMount() { 
        this.mounted = true;
        if(this.props.callback) this.props.callback();
    }

    render() {
        return(
        <Suspense fallback={this.placeholder}>
            {this.mounted ? this.props.children : this.placeholder}
        </Suspense>
        );
    }
}