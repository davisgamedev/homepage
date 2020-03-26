import React from 'react';
import Section from '../Components/Section'

import {breakpointsValues} from 'Tech/Breakpoints';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { 
    Grid, 
    TextField, 
    Button, 
    Snackbar,
 } from '@material-ui/core';
 
 import {
    Alert, AlertTitle,
 } from '@material-ui/lab';

import emailjs from 'emailjs-com';

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

    placeholder = "I'd like to get in touch!";

    handleChange = (event) => {
        const { formData } = this.state;
        formData[event.target.name] = event.target.value;
        this.setState({ formData });
    }

    handleSubmit = () => {
        this.setState({ submitted: true }, () => {
            setTimeout(() => this.setState({ submitted: false }), 5000);
        });

        let template_params = this.state.formData;
        if(template_params.message === '') template_params.message = this.placeholder;

        console.log(template_params);


        const service_id = "default_service";
        const template_id = "contact_request";

        emailjs.send(service_id, template_id, template_params, "user_QNXlqNxwDbbIQF0pexwx9" )
            .then((response) => {
                this.setState({success: true});
                this.open();
            },
            (err) => {
                console.error(err);
                this.setState({success: false})
                this.open();
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

        const close = this.close.bind(this);

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
                    placeholder={this.placeholder}
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

            <Snackbar 
            open={snack} 
            autoHideDuration={6000} 
            onClose={close}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
            }}
            >
                { success?
                    (
                    <Alert onClose={close} severity="success">
                        <AlertTitle>Success</AlertTitle>
                        Email sent successfuly!
                    </Alert>
                    )
                    :
                    (<Alert onClose={close} severity="error">
                        <AlertTitle>Something went wrong!</AlertTitle>
                       Email could not be sent!
                    </Alert>)
            
                }
            </Snackbar>

            </ValidatorForm>
        );
    }
}
