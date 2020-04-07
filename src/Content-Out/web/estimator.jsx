import React from 'react';

export default class Estimator extends React.Component {

    constructor(props){
        super(props);
    } 

    render() {
        return (
<div>
<h1 id="envative-estimator">Envative Estimator</h1>
<h2 id="project-cost-estimation-tool">project cost estimation tool</h2>
<p>Envative Estimator is an online survey app allowing potential clients to view estimated costs on a potential product based on its desired specifications. On the final summary page potential clients can enter in contact information to contact sales representatives for follow-up communications or save and email the results to colleagues for further review.</p>
<p>The tool is hosted at <a href="https://estimator.envative.com/">https://estimator.envative.com/</a></p>
<p>I was a full stack developer on this project. Built using Angular, ASP.NET Core MVC, Entity Framework. Questionnaire verbiage, tooltips, and data values for estimation were provided on JSON files, and results were serialized and sent to a SalesForce API.</p>
<p>I also developed a fun little confetti simulation with Canvas on the first summary click.</p>
<p><img src="https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1586228562/Estimator-Splash_cm1fx6.jpg" alt=""/></p>
<p><img src="https://res.cloudinary.com/dyzmnhqpr/image/upload/q_auto:eco/v1586203951/Estimator-Questions_w3qiwr.jpg" alt=""/></p>
<p><img src="https://res.cloudinary.com/dyzmnhqpr/video/upload/ac_none,c_scale,q_auto:eco,w_1060/v1586229230/Estimator-Confetti_bocbcw.gif" alt=""/></p>

</div>
        );
    }
}