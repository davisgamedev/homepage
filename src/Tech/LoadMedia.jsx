import React from 'react';
import DebugLog from './DebugLog';

const mediaContainerQuery = "[loadable-media-container]";
const unloadedMediaQuery = "[data-src]";

export default class LoadMedia extends React.Component {

    loaded = false;

    loadMedia(recursed=false) {

        DebugLog("Trying to load...");

        if(window.resetPath && !recursed) {
            DebugLog("%cRecursing to wait for <Suspension/> to complete", "background-color: purple; color: white");
            setTimeout(()=>this.loadMedia(true), 1000);
        }

        if(this.ref.current) {
            this.ref.current.querySelectorAll(mediaContainerQuery).forEach(c => {
                c.querySelectorAll(unloadedMediaQuery).forEach(m => {
                    m.setAttribute('src', m.getAttribute('data-src'));
                })
            });

            DebugLog('Media loaded!');
            this.loaded = true;
        }
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