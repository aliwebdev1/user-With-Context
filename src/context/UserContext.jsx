import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.init';


export const AuthContext = createContext();
const auth = getAuth(app);


const UserContext = ({ children }) => {

    const googleAuthProvider = new GoogleAuthProvider();

    const [user, setUser] = useState({})



    const createUserWithGoogle = () => {
        return signInWithPopup(auth, googleAuthProvider);
    }


    const createUser = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const singInUser = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const updateUser = (name) => {
        console.log(name);
        return updateProfile(auth.currentUser, {
            displayName: name
        })

    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false)
            console.log('User Observing Running', currentUser);

        })
        return () => unsubscribe()
    }, [])


    const LogOut = () => {
        signOut(auth).then(() => {
        }).catch((error) => {
        });
    }


    const verifyEmail = () => {
        return sendEmailVerification(auth.currentUser)

    }

    const forgetPassword = (email) => {
        return sendPasswordResetEmail(auth, email)

    }



    const userInfo = {
        createUserWithGoogle,
        createUser,
        singInUser,
        updateUser,
        user,
        LogOut,
        forgetPassword,
        verifyEmail
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default UserContext;