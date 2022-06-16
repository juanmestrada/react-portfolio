import React from 'react';
import Input from '../../components/UI/Input/Input';
import classes from './Contact.module.scss';
import axios from '../../axios-orders';

class ContactData extends React.Component {
    state = {
        contactForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 2
                },
                valid: false,
                touched: false
            },
            company: {
                elementType: 'input',
                elementConfig: {
                    type: 'company',
                    placeholder: 'Company Name (optional) '
                },
                value: '',
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'phone',
                    placeholder: 'Phone Number (optional)'
                },
                value: '',
                validation: {
                    required: false,
                    minLength: null
                },
                valid: true,
                touched: false
            },
            message: {
                elementType: 'input',
                elementConfig: {
                    type: 'textarea',
                    placeholder: 'Your Message'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 10
                },
                valid: false,
                touched: false
            }
        }, 
        formIsValid: false,
        messagesent: false
    }
    componentDidMount(){
        
    }

    messageHandler = (event) => {
        event.preventDefault();

        const formData = {};

        for (let formElementIdentifier in this.state.contactForm) {
            formData[formElementIdentifier] = this.state.contactForm[formElementIdentifier].value;
        }

        const email = {
            message: formData
        }
        axios.post('/messages.json', email)
            .then(this.setState( {messagesent: true} ))
            .catch(error => console.log(error));
        console.log(this.state.contactForm);
    }

    checkValidity(value, rules) {
        let isValid = true;
        
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if(rules.minLength) {
            isValid= value.length >= rules.minLength && isValid;
        }

        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }

        return isValid;
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const updatedForm = {
            ...this.state.contactForm
        };

        const updatedFormElement = {
            ...updatedForm[inputIdentifier]
        };

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedForm[inputIdentifier] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedForm) {
            formIsValid = updatedForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({contactForm: updatedForm, formIsValid: formIsValid});
        
    }

    render () {
        const formElementsArr = [];
        for (let key in this.state.contactForm) {
            formElementsArr.push({
                id: key,
                config: this.state.contactForm[key]
            });
        }
         formElementsArr.pop();
        let form = (
            <form onSubmit={this.messageHandler}>
                <div className={classes.message}> 
                    <Input key="message" elementType='input' elementConfig={{type: "textarea", placeholder: "Your Message"}}  value={this.state.contactForm.message.value} invalid={!this.state.contactForm.message.valid} touched={this.state.contactForm.message.touched} changed={(event) => this.inputChangedHandler(event, "message")} />
                </div>
                <div className={classes.info}>
                    {formElementsArr.map(formElement => (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        touched={formElement.config.touched}
                        changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                ))}
                </div>
                <button disabled={!this.state.formIsValid}>Send</button>
            </form>
        );
        let frontClasses = [classes.front, classes.startfront];
        let backClasses = [classes.back, classes.startback];

        if(this.state.messagesent){
            frontClasses = [classes.front, classes.flippedfront];
            backClasses = [classes.back, classes.flippedback];
        }
        return (
            
            <div className={classes.CardContainer}>
                <div className={classes.container}>
                    <div className={frontClasses.join(' ')}>
                        <div className={classes.inner}>
                            <div className={classes.CardInfo}>
                                {form}
                            </div>
                        </div>   
                    </div>
                    <div className={backClasses.join(' ')}>
                        <div className={classes.inner}>
                            <h1>Thank You</h1>
                            <h2>Your message has been sent</h2>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};

export default ContactData;