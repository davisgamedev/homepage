import React from 'react';
import { withRouter } from 'react-router-dom';

export default class ScrollTo extends React.Component {
    constructor(props) {
        super(props);
        this.props = props;
    }

    //https://github.com/ReactTraining/react-router/blob/master/packages/react-router-dom/docs/guides/scroll-restoration.md
    componentDidUpdate(oldProps) {
        if(this.props.location.pathname != oldProps.location.pathName) {
            window.scrollTo(0, 0);
        }
    }

    render() {
        return null;
    }
}