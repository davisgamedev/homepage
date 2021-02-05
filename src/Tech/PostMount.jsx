import React, { Suspense } from 'react';
import { Skeleton } from '@material-ui/lab';
import DebugLog from './DebugTools';
import { DebugDir } from './DebugTools';
import ComponentDimensions from './ComponentDimensions';

export function Placeholder(props) {
    return(
            <Skeleton 
                variant={props.variant||'rect'} 
                animation="pulse" 
                style={{width: props.width, height: props.height}}
                className="placeholderSkeleton"
            />
    );
}

export default class PostMount extends React.Component {

    constructor(props) {
        super(props);
        this.state = {mounted: false};
        this.placeholder = props.placeholder || 
            (<Placeholder width={this.props.width} height={this.props.height} />);
    }

    componentDidMount() { 

        setTimeout(
            () => {
            this.setState({mounted: true})

            this.props.callback?.();
    
            }, 1500
        )
    
    }

    render() {
        return(
        <Suspense 
            style={{
                width: this.props.width,
                height: this.props.height
            }}
            fallback={this.placeholder}
        >
            {
                this.state.mounted? 
                this.props.children : this.placeholder
            }
        </Suspense>
        );
    }
}