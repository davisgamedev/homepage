import React from 'react';
import DebugLog from './DebugLog';

const mediaContainerQuery = "[loadable-media-container]";
const unloadedMediaQuery = "[data-src]";

export default class LoadMedia extends React.Component {

    loaded = false;

    loadMedia() {
        if(this.ref.current) {
            DebugLog('Media loaded!');

            console.dir(this.ref.current.querySelectorAll(mediaContainerQuery));
            this.ref.current.querySelectorAll(mediaContainerQuery).forEach(c => {
                c.querySelectorAll(unloadedMediaQuery).forEach(m => {
                    m.setAttribute('src', m.getAttribute('data-src'));
                })
            });

            this.loaded = true;
        }
        else console.error("why aint my ref");
    }

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    componentDidMount() { this.loadMedia();}

    render() {
        return (
            <div ref={this.ref}>
                {this.props.children}
            </div>
        );
    }

}