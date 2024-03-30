import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const Login = () => {

    const { singInUser, createUserWithGoogle, forgetPassword } = useContext(AuthContext);
    const [userEmail, setUserEmail] = useState('')
    const [forgetEmailMessage, setForgetEmailMessage] = useState('')

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        // console.log(email, password);
        singInUser(email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                alert('user Login successfully')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage);
            });

    }


    const googleLogin = () => {
        createUserWithGoogle()
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

    const handleOnBlue = (event) => {
        const email = event.target.value;
        setUserEmail(email)
    }

    const handleForgetEmail = () => {
        if (!userEmail) {
            setForgetEmailMessage('Please fill up the email field for forget Password')
            return
        }

        setForgetEmailMessage('')

        forgetPassword(userEmail)
            .then(() => {
                alert('check your email and reset the password')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                setForgetEmailMessage(errorMessage)
            });

    }


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="card shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input onBlur={handleOnBlue} name='email' type="email" placeholder="email" className="input input-bordered" required />
                            <p className='text-red-500'>{forgetEmailMessage}</p>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                            <label className="label">
                                <button onClick={handleForgetEmail} className="label-text text-primary">Forgat Password </button>
                            </label>
                        </div>


                        <div className="form-control mt-0">
                            <button type='submit' className="btn btn-primary">Login </button>
                        </div>

                        <div className='text-small text-center'>New to website <Link className='text-primary' to="/sign-up">Please Sign up</Link></div>

                        <div className="divider mt-7">OR</div>

                        <div className="form-control mt-6">
                            <button onClick={googleLogin} className="btn btn-outline">Login With Google</button>
                        </div>

                        <div className="form-control mt-6">
                            <button type='submit' className="btn btn-outline">Login With Github</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;