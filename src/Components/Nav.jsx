import React from 'react';

import './Components.css'

export default class Nav extends React.Component{
    //constructor(){}

    render() {
        return (
        <div className="Nav">
            <ul>
                <li>
                    Home
                </li>
                <li>
                    Projects
                    {/* Projects dropdown should be divided sections, also with a bit of a message statement on the stuff i work on
                            in each category */}
                </li>
                <li>
                    Blog Entries
                </li>
                <li>
                    Contact
                </li>
            </ul>
        </div>
    )}
}