import {
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../../services/auth.services';
import { createUserHandle, getUserByHandle, getUserByPhone } from '../../../services/user.service';
import { Link, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import { customStylesSignUp } from '../../../common/modal.helper.functions';


const SignUp = ({ isOpen, onClose, switchModals }) => {
    const { register, handleSubmit, watch,reset, formState: { errors } } = useForm();
    const toast = useToast();
    const navigate = useNavigate();
    const isPasswordValid = (password) => {
        const passwordPattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,30}$/;
        return passwordPattern.test(password);
    };
    const onSubmit = async (data) => {
        try {
            const existingUsernameSnapshot = await getUserByHandle(data.username);
            if (existingUsernameSnapshot.exists()) {
                toast({
                    title: "Registration Error",
                    description: "Username already exists. Please choose a different username.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }
            const existingPhoneSnapshot = await getUserByPhone(data.phone);
            if (existingPhoneSnapshot.exists()) {
                toast({
                    title: "Registration Error",
                    description: "Phone number already exists. Please use a different phone number.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
                return;
            }

            const credential = await registerUser(data.email, data.password);

            const userData = {
                uid: credential.user.uid,
                firstName: data.firstName,
                lastName: data.lastName,
                username: data.username,
                email: data.email,
                phone: data.phone,
                role: 'user',
                createdOn: Date.now(),
                city: '',
                country: '',
                photo: ''
            };

            await createUserHandle(userData);

            toast({
                title: "Registration Successful",
                description: "You have successfully registered.",
                status: "success",
                duration: 5000,
                isClosable: true,
            });
            navigate('/');
        } catch (error) {
            toast({
                title: "Registration Error",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStylesSignUp} >
            <div className="h-full flex justify-center items-center">
                <div className="p-4 w-4/5">
                    <h1 className="text-3xl font-bold mb-4 text-white border-b-2 border-purple-800">Sign up</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>                        
                        <div className="flex-grow">
                            <label className="block font-bold mb-1">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                className={`border p-2 w-full ${errors.firstName ? 'border-red-500' : ''}`}
                                {...register('firstName', {
                                    required: 'First name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'First name must be at least 3 characters',
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'First name must not exceed 30 characters',
                                    },
                                })}
                            />
                            {errors.firstName && <span className="text-red-500">{errors.firstName.message}</span>}
                        </div>

                        <div className="flex-grow">
                            <label className="block font-bold mb-1">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                className={`border p-2 w-full ${errors.lastName ? 'border-red-500' : ''}`}
                                {...register('lastName', {
                                    required: 'Last name is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Last name must be at least 3 characters',
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Last name must not exceed 30 characters',
                                    },
                                })}
                            />
                            {errors.lastName && <span className="text-red-500">{errors.lastName.message}</span>}
                        </div>

                        <div className="flex-grow">
                            <label className="block font-bold mb-1">Username</label>
                            <input
                                type="text"
                                name="username"
                                className={`border p-2 w-full ${errors.username ? 'border-red-500' : ''}`}
                                {...register('username', {
                                    required: 'Username is required',
                                    minLength: {
                                        value: 3,
                                        message: 'Username must be at least 3 characters',
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Username must not exceed 30 characters',
                                    },
                                })}
                            />
                            {errors.username && <span className="text-red-500">{errors.username.message}</span>}
                        </div>

                        <div className="flex-grow">
                            <label className="block font-bold mb-1">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={`border p-2 w-full ${errors.email ? 'border-red-500' : ''}`}
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: 'Invalid email format',
                                    },
                                })}
                            />
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>

                        <div className="flex-grow">
                            <label className="block font-bold mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                className={`border p-2 w-full ${errors.phone ? 'border-red-500' : ''}`}
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    minLength: {
                                        value: 10,
                                        message: 'Phone number must be 10 digits',
                                    },
                                    maxLength: {
                                        value: 10,
                                        message: 'Phone number must be 10 digits',
                                    },
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Invalid phone number format',
                                    },
                                })}
                            />
                            {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                        </div>

                        <div className="flex-grow">
                            <label className="block font-bold mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                className={`border p-2 w-full ${errors.password ? 'border-red-500' : ''}`}
                                {...register('password', {
                                    required: 'Password is required',
                                    minLength: {
                                        value: 8,
                                        message: 'Password must be at least 8 characters',
                                    },
                                    maxLength: {
                                        value: 30,
                                        message: 'Password must not exceed 30 characters',
                                    },
                                    validate: (value) =>
                                        isPasswordValid(value) ||
                                        'Password must include at least one number and one symbol',
                                })}
                            />
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>

                        <div className="flex-grow">
                            <label className="block font-bold mb-1">Confirm Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                className={`border p-2 w-full ${errors.confirmPassword ? 'border-red-500' : ''}`}
                                {...register('confirmPassword', {
                                    required: 'Confirm password is required',
                                    validate: (value) =>
                                        value === watch('password') || 'Passwords do not match',
                                })}
                            />
                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                        </div>
                        <div className="text-center">
                            <p>Already have an account? <Link className="text-purple-800" onClick={switchModals}>Sign in here</Link></p>
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-purple-800 hover:bg-purple-500 text-white py-2 px-4 mt-5 rounded w-4/5 mx-auto" type="submit">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default SignUp;