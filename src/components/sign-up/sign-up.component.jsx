import React, { useState } from 'react';
import { connect } from 'react-redux';

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { signUpAndSignInAfterSignUp } from '../../redux/user/user.actions';

import "./sign-up.styles.scss";

const SignUp = ({ signUpAndSignInAfterSignUp }) => {
    const [userCredentials, setUserCredentials] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
    })

    const { displayName, email, password, confirmPassword } = userCredentials;
    const handleSubmit = async event => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert('passwords not match');
            return;
        }
        signUpAndSignInAfterSignUp({email,password,displayName});
    }

    const handleChange = event => {
        const { name, value } = event.target;
        setUserCredentials({ ...userCredentials, [name]: value });
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>I do not have a account</h2>
            <span className='detail-title'>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    name='displayName'
                    type='text'
                    value={displayName}
                    handleChange={handleChange}
                    label='Display Name'
                    required
                />
                <FormInput
                    name='email'
                    type='email'
                    value={email}
                    handleChange={handleChange}
                    label='Email'
                    required
                />
                <FormInput
                    name='password'
                    type='password'
                    value={password}
                    handleChange={handleChange}
                    label='Password'
                    required
                />
                <FormInput
                    name='confirmPassword'
                    type='password'
                    value={confirmPassword}
                    handleChange={handleChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type='submit'>SIGN UP</CustomButton>
            </form>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    signUpAndSignInAfterSignUp: (userCredentials) => dispatch(signUpAndSignInAfterSignUp(userCredentials))
})


export default connect(null, mapDispatchToProps)(SignUp);