import React from 'react';

export default class Gaurdianalarm extends React.Component {

    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }

    loadMedia() {
        if(this.ref.current) {
            this.ref.current.querySelectorAll('[data-src]').forEach(e => {
                e.setAttribute('src', e.getAttribute('data-src'));
            });
        }
    }

    render() {
        return (
<div ref={this.ref} loadable-media-container="true">
<h1 id="guardian-alarm-web-app">Guardian Alarm Web App</h1>
<h2 id="device-management-portal">device management portal</h2>
<p>My Guardian Online is a customer and support management web application for <a href="https://guardianalarm.com/">Guardian Alarm</a>. The application allows for robust device and system management including testing devices and systems remotely, changing the contact call list on alerts, adjust and view billings, and directly contact customer support and view support documents. The portal also contains interfaces for customer support representatives to manage customer accounts and view customer system details securely.</p>
<p>This project passed numerous audits to ensure the security of sensitive information and features given the nature of the application.</p>
<p>I worked as a full stack developer on this project, managing both functional design of the application and the back end API and database interactions.</p>
<p>Application built using Angular CLI, ASP.NET Core MVC, Entity Framework, Amazon AWS.</p>
<p>Available to Guardian Alarm customers at <a href="https://myguardianonline.com/">https://myguardianonline.com/</a>.</p>
<p><img src="" data-src="https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1586203952/Gaurdian-Dashboard_t2qsxp.jpg" alt=""/></p>
<p><img src="" data-src="https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1586203952/Gaurdian_-Systems_fcjkuk.jpg" alt=""/></p>
<p><img src="" data-src="https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1586203952/Gaurdian-CallList_y8nzdv.jpg" alt=""/></p>

</div>
        );
    }
}