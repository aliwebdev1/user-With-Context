import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const SignUp = () => {
    const { createUser, updateUser, createUserWithGoogle, verifyEmail } = useContext(AuthContext)
    const [passwordError, setPasswordError] = useState('')

    const navigate = useNavigate()

    const handleRegistration = (event) => {
        event.preventDefault();
        const form = event.target;
        const name = form.name.value;
        const email = form.email.value;
        const password = form.password.value;

        if (!/(?=.*?[A-Z].*?[A-Z])/.test(password)) {
            setPasswordError('Password should be two uppercase')
            return
        }

        if (!/(?=.*?[#?!@$%^&*/-])/.test(password)) {
            setPasswordError('Please give a special character')
            return
        }

        if (password.length < 6) {
            setPasswordError('Please should be at least six characters')
            return
        }

        setPasswordError('')

        createUser(email, password)
            .then((userCredential) => {
                // Signed up 
                const user = userCredential.user;
                console.log(user);
                alert('user created successfully')
                updateUser(name)

                // verify user
                verifyEmail()
                    .then(() => {
                        alert('Please check your email and verify the email')
                    });
                form.reset()
                navigate('/')
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
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


    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col ">
                <div className="card shrink-0 w-96 max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleRegistration} className="card-body">

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input name='name' type="text" placeholder="Your Name" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input name='email' type="email" placeholder="email" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input name='password' type="password" placeholder="password" className="input input-bordered" required />
                            <p className='text-red-500'>{passwordError}</p>
                        </div>

                        <div className="form-control mt-3">
                            <button type='submit' className="btn btn-primary">Sign UP</button>
                        </div>

                        <div className='text-small text-center '>Already Have an account <Link className='text-primary' to="/login">Please Login</Link></div>

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

export default SignUp;