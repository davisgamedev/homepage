import React, {useRef} from 'react';
import Section from '../Components/Section'

import DebugLog from 'Tech/DebugLog';
import {breakpointsValues} from 'Tech/Breakpoints';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { 
    Grid, 
    TextField, 
    Button, 
    Snackbar,
 } from '@material-ui/core';
 import {
    Alert,
 } from '@material-ui/lab';

import "./Contact.css";

export default function Contact() {

    return(
    <Section id="contact" title="contact">
        <ContactForm></ContactForm>
    </Section>
    );
}

class ContactForm extends React.Component {
    state = {
        formData: {
            name: '',
            email: '',
            company: '',

            cc: '',
            bcc: '',

            message: '',
        },
        submitted: false,
        success: false,
        snack: false,
    }

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = () => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });
    }

    open() {
        this.setState({snack: true});
    }

    close() {
        this.setState({snack: false});
    }

    render() {
        const { formData, submitted, success, snack } = this.state;
 
        const small = window.innerWidth <= breakpointsValues.sm;
        const extraSmall = window.innerWidth <= breakpointsValues.xs;

        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                id="emailForm"     
                className={extraSmall? "extraSmall" : "" + small ? "small" : "'"}
            >
            <Grid item xs={12} id="emailGrid">
            <Grid container direction="row" className="nameInputs" spacing={4}>
                <Grid item xs={4}>
                    <TextValidator
                        label="Name"
                        onChange={this.handleChange}
                        name="name"
                        value={formData.name}
                        validators={['required']}
                        errorMessages={['this field is required']}

                        required
                        variant="outlined"
                    />
                </Grid>
                <Grid item xs={4}>
                <TextValidator
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={formData.email}
                    validators={['required', 'isEmail']}
                    errorMessages={['this field is required', 'email is not valid']}

                    required
                    variant="outlined"
                />
                </Grid>
                <Grid item xs={4}>
                    <TextValidator
                        onChange={this.handleChange}
                        name="company"

                        variant="outlined"
                        label="Company"
                        value={formData.company}
                        
                        required
                        validators={['required']}
                        errorMessages={['this field is required']}
                    >
                    </TextValidator>
                </Grid>
            </Grid>
            <Grid container direction="row" className="emailInputs" spacing={4}>
                <Grid item xs={6}>
                    <TextValidator
                        onChange={this.handleChange}
                        name="cc"

                        validators={['isEmail']}
                        errorMessages={['not a valid email']}
                        value={formData.cc}

                        variant="outlined"
                        label="CC"
                    >
                    </TextValidator>
                </Grid>
                <Grid item xs={6}>
                    <TextValidator
                        onChange={this.handleChange}
                        name="bcc"

                        validators={['isEmail']}
                        errorMessages={['not a valid email']}
                        value={formData.bcc}


                        variant="outlined"
                        label="BCC"
                    >
                    </TextValidator>
                </Grid>
            </Grid>
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <TextField
                    onChange={this.handleChange}
                    name="message"

                    multiline
                    rows="5"

                    variant="outlined"
                    label="Message"
                    placeholder="I'd like to get in touch!"
                    value={formData.message}


                    ></TextField>
                </Grid>
            </Grid>
                 
            <Grid container spacing={4}>
                <Grid item xs={12} id="contactSubmitContainer">
                    <Button
                        color="primary"
                        variant="outlined"
                        type="submit"
                        disabled={submitted}
                        id="contactSubmit"
                    >
                        {
                            (submitted && 'Email Submitted!')
                            || (!submitted && 'Submit')
                        }
                    </Button>
                </Grid>
                </Grid>
            </Grid>

            <Snackbar open={snack} autoHideDuration={6000} onClose={this.close}>
                { success?
                    (<Alert onClose={this.close} severity="success">
                        Email sent successfuly!
                    </Alert>)
                    :
                    (<Alert onClose={this.close} severity="alert">
                        Email failed to send!
                    </Alert>)
            
                }
            </Snackbar>

            </ValidatorForm>
        );
    }
}
