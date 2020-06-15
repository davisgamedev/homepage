import React from 'react';

const mediaContainerQuery = "[loadable-media-container]"

export default class LoadMedia extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() {
        if(this.ref.current) {
            console.log('ref-current');
            console.dir(this.ref.current.querySelectorAll(mediaContainerQuery));
            this.ref.current.querySelectorAll(mediaContainerQuery).forEach(e => {
                if(e.loadMedia) e.loadMedia();
            });
        }
        console.dir(React.Children);
        React.Children.forEach(this.props.children, c => {
            console.dir(c);
            if(c.loadMedia) c.loadMedia();
        });
    }

    render() {
        return (
            <div ref={this.ref}>
                {this.props.children}
            </div>

        );
    }

}