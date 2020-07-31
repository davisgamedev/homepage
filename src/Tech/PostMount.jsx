import React, { Suspense } from 'react';
import { Skeleton } from '@material-ui/lab';
import DebugLog from './DebugLog';
import { DebugDir } from './DebugLog';


export default class PostMount extends React.Component {

    constructor(props) {
        super(props);

        this.placeholder = this.props.placeholder || 
            (<Skeleton variant={this.props.variant || 'rect'} animation="wave" />);

        this.state = {mounted: false};
    }

    componentDidMount() { 

        setTimeout(
            () => {
            this.setState({mounted: true})

            if(this.props.callback) this.props.callback();
    
            }, 2000
        )
        


    }

    render() {
        return(
        <Suspense fallback={this.placeholder}>
            {
                this.state.mounted? 
                    this.props.children
                    : this.props.placeholder
            }
        </Suspense>
        );
    }
}