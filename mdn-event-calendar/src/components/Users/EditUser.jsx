import {
    useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import Modal from "react-modal";
import { customStylesSignUp } from '../../common/modal.helper.functions';
import { editUserHandle } from '../../services/user.service';
import { useAuth } from '../../contexts/AuthContext';



const EditUser = ({ isOpen, onClose, data }) => {
    const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
    const { setUser } = useAuth();

    const toast = useToast();
    const navigate = useNavigate();

    const onSubmit = async (info) => {
        try {
            const updatedUser = await editUserHandle({ ...data, ...info });
            setUser({ ...data, ...info });
            toast({
                title: "User updated successfully.",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
            onClose();
        } catch (error) {
            toast({
                title: "An error occurred.",
                description: "Failed to update user.",
                status: "error",
                position: "top",
                duration: 5000,
                isClosable: true,
            });
        }
    }
    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStylesSignUp} >
            <div className="h-full flex justify-center items-center">
                <div className="p-4 w-4/5">
                    <h1 className="text-3xl font-bold mb-4 text-white border-b-2 border-purple-800">Edit user</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
                            <label className="block font-bold mb-1">First name</label>
                            <input
                                type="text"
                                name="firstName"
                                defaultValue={data?.firstName}
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

                        <div className="mb-4">
                            <label className="block font-bold mb-1">Last name</label>
                            <input
                                type="text"
                                name="lastName"
                                defaultValue={data?.lastName}
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

                        <div className="mb-4">
                            <label className="block font-bold mb-1">City</label>
                            <input
                                type="text"
                                name="city"
                                defaultValue={data?.city}
                                className={`border p-2 w-full ${errors.city ? 'border-red-500' : ''}`}
                                {...register('city')}
                            />
                            {errors.city && <span className="text-red-500">{errors.city.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-1">Country</label>
                            <input
                                type="text"
                                name="country"
                                defaultValue={data?.country}
                                className={`border p-2 w-full ${errors.country ? 'border-red-500' : ''}`}
                                {...register('country')}
                            />
                            {errors.country && <span className="text-red-500">{errors.country.message}</span>}
                        </div>

                        <div className="mb-4">
                            <label className="block font-bold mb-1">Photo</label>
                            <input
                                type="text"
                                name="photo"
                                defaultValue={data?.photo}
                                className={`border p-2 w-full ${errors.photo ? 'border-red-500' : ''}`}
                                {...register('photo')}
                            />
                            {errors.photo && <span className="text-red-500">{errors.photo.message}</span>}
                        </div>


                        <div className="mb-4">
                            <label className="block font-bold mb-1">Phone Number</label>
                            <input
                                type="tel"
                                name="phone"
                                defaultValue={data?.phone}
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

                        <div className="flex justify-center">
                            <button className="bg-purple-800 hover:bg-purple-500 text-white py-2 px-4 mt-5 rounded w-4/5 mx-auto" type="submit">
                                Edit Profile
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal>
    );
};

export default EditUser;