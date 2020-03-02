import React, { Component } from 'react';
import FormErrors from "./FormErrors";
import Validate from "./FormValidation";
import '../App.css';
import { Auth } from "aws-amplify";
import LoggedIn from '../components/LoggedIn'

class LogIn extends Component {

    state = {
        username: "",
        password: "",
        errors: {
            cognito: null,
            blankfield: false
        }
    };

    handleLogOut = async event => {
        event.preventDefault();
        try {
            Auth.signOut();
            this.props.auth.setAuthStatus(false);
            this.props.auth.setUser(null);
        } catch (error) {
            console.log(error.message);
        }
    }

    clearErrorState = () => {
        this.setState({
            errors: {
                cognito: null,
                blankfield: false
            }
        });
    };

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
        try {
            const user = await Auth.signIn(this.state.username, this.state.password);
            this.props.auth.setAuthStatus(true);
            this.props.auth.setUser(user);
            this.props.history.push("/");
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
    };

    render() {
        return (
            <section className="section auth">
                <div className="app">
                    {this.props.auth.isAuthenticated && this.props.auth.user
                        ? (<>
                            <p>
                                Välkommen {this.props.auth.user.attributes.email}
                            </p>
                            <LoggedIn logOut={this.handleLogOut} />
                        </>
                        )
                        : (
                            <div className="sign-up-background">
                                <FormErrors formerrors={this.state.errors} />
                                <form className="sign-up-text" onSubmit={this.handleSubmit}>
                                    <h1><span style={{ color: '#84ac44' }}>Our</span>Living</h1>
                                    <div>
                                        <span>Email</span>
                                        <input type="text"
                                            id="username"
                                            aria-describedby="usernameHelp"
                                            placeholder="Your Email *"
                                            value={this.state.username}
                                            onChange={this.onInputChange}></input>
                                    </div>
                                    <div>
                                        <span>Password</span>
                                        <input
                                            type="password"
                                            id="password"
                                            placeholder="Your Password *"
                                            value={this.state.password}
                                            onChange={this.onInputChange}></input>
                                    </div>

                                    <div className="sign-up-buttons">
                                        <a className="buttons" href="Sign-up">Sign Up</a>
                                        <button className="buttons">Log in</button>
                                    </div>
                                </form>
                            </div>
                        )
                    }


                </div >
            </section>
        );
    }
}

export default LogIn;
