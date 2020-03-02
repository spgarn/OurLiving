import React, { Component } from 'react';
import FormErrors from "./FormErrors";
import Validate from "./FormValidation";
import { Auth } from "aws-amplify";

class SignUp extends Component {
    state = {
        username: "",
        email: "",
        password: "",
        confirmpassword: "",
        errors: {
            cognito: null,
            blankfield: false,
            passwordmatch: false
        }
    }

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
                blankfield: false,
                passwordmatch: false
            }
        });
    }

    handleSubmit = async event => {
        event.preventDefault();

        // Form validation
        this.clearErrorState();
        const error = Validate(event, this.state);
        if (error) {
            this.setState({
                errors: { ...this.state.errors, ...error }
            });
        }

        // AWS Cognito integration here
        const { username, email, password } = this.state;
        try {
            const signUpResponse = await Auth.signUp({
                username,
                password,
                attributes: {
                    email: email
                }
            });
            console.log(signUpResponse);
            this.props.history.push("/Registered")
        } catch (error) {
            let err = null;
            !error.message ? err = { "message": error } : err = error;
            this.setState({
                errors: {
                    ...this.state.errors,
                    cognito: error
                }
            })

        }
    };

    onInputChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
        document.getElementById(event.target.id).classList.remove("is-danger");
    }

    render() {
        return (
            <section className="section auth">
                <div className="app">
                    <div className="sign-up-background">
                        <FormErrors formerrors={this.state.errors} />
                        <form className="sign-up-text" onSubmit={this.handleSubmit}>
                            <h1><span style={{ color: '#84ac44'/*Green font*/ }}>Our</span>Living</h1>
                            <div>
                                <span>Email</span>
                                <input type="text"
                                    id="username"
                                    className="input"
                                    aria-describedby="userNameHelp"
                                    placeholder="Your Email *"
                                    value={this.state.username}
                                    onChange={this.onInputChange}></input>
                            </div>
                            <div>
                                <span>Password</span>
                                <input type="password"
                                    className="input"
                                    id="password"
                                    placeholder="Your Password *"
                                    value={this.state.password}
                                    onChange={this.onInputChange}></input>
                            </div>
                            <div className="sign-up-buttons">
                                <button className="buttons">Sign Up</button>
                                <a className="buttons" href="/">Back</a>
                            </div>
                        </form>
                    </div>
                </div >
            </section>
        );
    }
}

export default SignUp;