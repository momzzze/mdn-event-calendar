import { useContext } from "react";
import { AuthContext, useAuth } from "../../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { useForm } from "react-hook-form";
import { loginUser } from "../../../services/auth.services";
import Modal from "react-modal";
import { customStylesSignIn } from '../../../common/modal.helper.functions'
import { useData } from "../../../contexts/DataContext";

const SignIn = ({ isOpen, onClose, switchModals }) => {
    const { refreshData } = useData();
    const { appState, setUser } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password)
                .then(credential => {
                    setUser({
                        ...appState,
                        user: credential.user,
                    });
                    toast({
                        title: "You are logged in",
                        status: "success",
                        isClosable: true,
                        position: "top",
                        duration: 5000,
                    });
                }).then(() => {
                    reset();
                    navigate("/");
                });
        } catch (error) {
            toast({
                title: "Logging in failed",
                description: error.message,
                status: "error",
                isClosable: true,
                position: "top",
                duration: 5000,
            });
        } 
        try {
           await refreshData();
        } catch (error) {
            console.log(error.message);
        }       
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose} style={customStylesSignIn}>
            <div className="h-full flex justify-center items-center">
                <div className="p-4 w-4/5">
                    <h1 className="text-3xl font-bold mb-4 text-white border-b-2 border-purple-800">Sign In</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="mb-4">
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
                        <div className="mb-4">
                            <label className="block font-bold mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                className={`border p-2 w-full `}
                                {...register('password')}
                            />
                        </div>
                        <div className="text-center">
                            <p>Not registered? <Link className="text-purple-800" onClick={switchModals}>Sign up here</Link></p>
                        </div>
                        <div className="flex justify-center">
                            <button className="bg-purple-800 hover:bg-purple-500 text-white py-2 px-4 mt-5 rounded w-4/5 mx-auto" type="submit">
                                Sign In
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}

export default SignIn;