import React from 'react';
import {Link} from 'react-router-dom';

export default class ColumnFooter extends React.Component {
    render() {
        return(
            <p className="footer">
                If you would like to request more information on this project, please
                feel free to {' '}
                <Link 
                    className="generalLink" 
                    onClick={this.props.contact} 
                    to={"/contact"}>
                        contact me!
                </Link>
            </p>
        );
    }
}