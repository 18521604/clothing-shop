import { auth, googleProvider, createUserProfileDocument, getCurrentUser } from '../../firebase/firebase.utils';

import { clearCart } from '../cart/cart.actions';
import { UserActionTypes } from './user.types';

export const setCurrentUser = user => ({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
})

export const googleSignInStart = () => ({
    type: UserActionTypes.GOOGLE_SIGN_IN_START
})

export const signInSuccess = user => ({
    type: UserActionTypes.SIGN_IN_SUCCESS,
    payload: user
})

export const signInFailure = errorMessage => ({
    type: UserActionTypes.SIGN_IN_FAILURE,
    payload: errorMessage
})

export const emailSignInStart = (emailAndPassword) => ({
    type: UserActionTypes.EMAIL_SIGN_IN_START,
    payload: emailAndPassword
})

export const signOutStart = () => ({
    type: UserActionTypes.SIGN_OUT_START
})

export const signOutSuccess = () => ({
    type: UserActionTypes.SIGN_OUT_SUCCESS
})

export const signOutFailure = (errorMessage) => ({
    type: UserActionTypes.SIGN_OUT_FAILURE,
    payload: errorMessage
})

export const checkUserSession = () => ({
    type: UserActionTypes.CHECK_USER_SESSION
})

export const signUpStart = (userCredentials) => ({
    type: UserActionTypes.SIGN_UP_START,
    payload: userCredentials
})

export const signUpSuccess = ({ user, additionalData }) => ({
    type: UserActionTypes.SIGN_UP_SUCCESS,
    payload: { user, additionalData }
})

export const signUpFailure = (errorMessage) => ({
    type: UserActionTypes.SIGN_UP_FAILURE,
    payload: errorMessage
})



//-------------------Redux-thunk (instead actions return a object. Redux-thunk can help actions as function)--------------------
export const signInWithEmail = ({ email, password }) => {
    return async dispatch => {
        try {
            await dispatch(emailSignInStart({ email, password }));
            const { user } = await auth.signInWithEmailAndPassword(email, password);

            //get Snapshot from userAuth
            const userRef = await createUserProfileDocument(user);
            const userSnapshot = await userRef.get();
            await dispatch(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        } catch (error) {
            await dispatch(signInFailure(error));
        }
    }
}

export const signInWithGoogle = () => {
    return async dispatch => {
        try {
            await dispatch(googleSignInStart());
            const { user } = await auth.signInWithPopup(googleProvider);

            //get Snapshot from userAuth
            const userRef = await createUserProfileDocument(user);
            const userSnapshot = await userRef.get();
            await dispatch(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        }
        catch (error) {
            await dispatch(signInFailure(error));
        }
    }
}

export const signOut = () => {
    return async dispatch => {
        try {
            await dispatch(signOutStart());
            await auth.signOut();
            await dispatch(signOutSuccess());
            await dispatch(clearCart());
        } catch (error) {
            await dispatch(signOutFailure(error));
        }
    }
}

//Persistent user
export const isUserAuthenticated = () => {
    return async dispatch => {
        try {
            await dispatch(checkUserSession());
            const userAuth = await getCurrentUser();
            if (!userAuth)
                return;

            //get Snapshot from userAuth
            const userRef = await createUserProfileDocument(userAuth);
            const userSnapshot = await userRef.get();
            await dispatch(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        } catch (error) {
            await dispatch(signInFailure(error));
        }
    }
}

export const signUpAndSignInAfterSignUp = ({ email, password, displayName }) => {
    return async dispatch => {
        try {
            await dispatch(signUpStart({ email, password }));
            const { user } = await auth.createUserWithEmailAndPassword(email, password);
            await dispatch(signUpSuccess({ user, additionalData: { displayName } }));

            const userRef = await createUserProfileDocument(user, { displayName });
            const userSnapshot = await userRef.get();
            await dispatch(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
        } catch (error) {
            await dispatch(signUpFailure(error));
        }
    }
}

