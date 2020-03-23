import React from 'react';
import Section from '../Components/Section'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import DebugLog from 'Tech/DebugLog';
import { Grid, TextField } from '@material-ui/core';

import "./Contact.css";

export default function Contact() {

    return(
    <Section id="contact" title="contact">
        <ContactForm></ContactForm>
    </Section>
    );
}

function ContactForm(props) {

    const [email, setEmail] = React.useState('');

    function handleChange(event) {
        const emailObj = Object.assign(email, event.target.value);
        setEmail(emailObj);
        DebugLog(...emailObj);
    }

    function handleSubmit(event) {
        console.log(email);
    }

    return(
        <ValidatorForm
            forwardRef="form"
            onSubmit={handleSubmit}
            onError={errors=>DebugLog(errors)}
            id="emailForm"
        >
        <Grid item xs={12} id="emailGrid" spacing={5}>
            <Grid container direction="row" className="nameInputs" spacing={8}>
                <Grid item xs={4}>
                    <TextValidator
                        onChange={handleChange}
                        name="name"
                        value={email.name}
                        
                        variant="outlined"
                        label="Name"

                        required
                        validators={['required']}
                        errorMessages={['this field is required']}
                    >
                    </TextValidator>
                </Grid>
                <Grid item xs={4}>
                    <TextValidator
                        onChange={handleChange}
                        name="email address"
                        value={email.replyTo}

                        variant="outlined"
                        label="Email Address"
                        
                        required
                        validators={['required', 'isEmail']}
                        errorMessages={['this field is required', 'not a valid email']}
                    >
                    </TextValidator>
                </Grid>
                <Grid item xs={4}>
                    <TextValidator
                        onChange={handleChange}
                        name="company"
                        value={email.company}

                        variant="outlined"
                        label="Company"
                        
                        required
                        validators={['required']}
                        errorMessages={['this field is required']}
                    >
                    </TextValidator>
                </Grid>
            </Grid>
            <Grid container direction="row" className="emailInputs" spacing={8}>
                <Grid item xs={6}>
                    <TextValidator
                        onChange={handleChange}
                        name="cc"
                        value={email.cc}

                        validators={['isEmail']}
                        errorMessages={['not a valid email']}

                        variant="outlined"
                        label="CC"
                    >
                    </TextValidator>
                </Grid>
                <Grid item xs={6}>
                    <TextValidator
                        onChange={handleChange}
                        name="bcc"
                        value={email.bcc}

                        validators={['isEmail']}
                        errorMessages={['not a valid email']}

                        variant="outlined"
                        label="BCC"
                    >
                    </TextValidator>
                </Grid>
            </Grid>
        <Grid container spacing={8}>
            <Grid item xs={12} spacing={8}>
                <TextField
                onChange={handleChange}
                name="message"
                value={email.message}

                multiline
                rows="5"

                variant="outlined"
                label="Message"
                placeholder="I'd like to get in touch!"


                ></TextField>
            </Grid>
        </Grid>
        
           
        </Grid>
        </ValidatorForm>
    );
}