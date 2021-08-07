import React, { useState } from "react";
import { connect } from "react-redux";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signInWithGoogle, signInWithEmail } from "../../redux/user/user.actions";

import "./sign-in.styles.scss";

const SignIn = ({ signInWithGoogle, signInWithEmail }) => {
    const [userCredentials, setUserCredentials] = useState({
        email: '',
        password: ''
    })

    const { email, password } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();

        signInWithEmail(email, password);
    }

    const handleChange = event => {
        const { value, name } = event.target;

        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className='sign-in'>
            <h2 className='title'>I already have an account</h2>
            <span className='detail-title'>Sign in with your email and password.</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name='email'
                    type='email'
                    value={email}
                    handleChange={handleChange}
                    label='Email'
                    required>
                </FormInput>
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='Password'
                    required>
                </FormInput>
                <div className='buttons'>
                    <CustomButton type='submit' > Sign in</CustomButton>
                    <CustomButton onClick={signInWithGoogle} isGoogleSignIn> Sign in with google</CustomButton>
                </div>
            </form>
        </div>
    );
}

const mapDispatchToProps = dispatch => ({
    signInWithGoogle: () => dispatch(signInWithGoogle()),
    signInWithEmail: (email, password) => dispatch(signInWithEmail({ email, password }))
})


export default connect(null, mapDispatchToProps)(SignIn);