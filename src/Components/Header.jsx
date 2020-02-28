import React from 'react';
//import Image from

import Parallax from '../common/components/Parallax/Parallax';

import './Components.css'

export default class Header extends React.Component{
    //constructor(){}

    render() {
        return (
        <div className="Header">
            <Parallax image={require("../Assets/Nebula.jpg")}></Parallax>

        </div>
    )}
}
