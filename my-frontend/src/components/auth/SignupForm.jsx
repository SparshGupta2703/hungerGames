import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { signup } from "../../api/Auth";
import { useAuthStore } from "../../stores/AuthStore";

const SignupForm = ({ closeModal }) => {

    const navigate = useNavigate();

    const { loginAuth } = useAuthStore();

    const [loading, setLoading] = useState(false);

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });

    const handleChange = (e) => {

        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));

    };

    const handleSignup = async (e) => {

        e.preventDefault();

        if (
            !formData.name ||
            !formData.email ||
            !formData.password ||
            !formData.confirmPassword
        ) {

            return toast.error("Please fill all fields");

        }

        if (formData.password.length < 6) {

            return toast.error("Password must be at least 6 characters");

        }

        if (formData.password !== formData.confirmPassword) {

            return toast.error("Passwords do not match");

        }

        try {

            setLoading(true);

            const response = await signup({
                name: formData.name,
                email: formData.email,
                password: formData.password
            });

            if (response.success) {

                toast.success("Account created!");

                /*
                    Preferred backend response

                    {
                      success:true,
                      token,
                      user
                    }

                */

                if (response.token) {

                    loginAuth(
                        response.user,
                        response.token
                    );

                    closeModal();

                    navigate("/home");

                }

                /*
                    If your backend DOESN'T return token,
                    temporarily do this:

                    navigate("/");

                    and later we'll modify backend
                    in literally 5 lines.
                */

            }

        }
        catch (err) {

            toast.error(
                err.response?.message ||
                "Signup failed"
            );

        }
        finally {

            setLoading(false);

        }

    };

    return (

        <form
            className="space-y-5"
            onSubmit={handleSignup}
        >

            <div>

                <label className="label">
                    <span className="label-text">
                        Full Name
                    </span>
                </label>

                <input
                    type="text"
                    name="name"
                    className="input input-bordered w-full"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                />

            </div>

            <div>

                <label className="label">
                    <span className="label-text">
                        Email
                    </span>
                </label>

                <input
                    type="email"
                    name="email"
                    className="input input-bordered w-full"
                    placeholder="john@gmail.com"
                    value={formData.email}
                    onChange={handleChange}
                />

            </div>

            <div>

                <label className="label">
                    <span className="label-text">
                        Password
                    </span>
                </label>

                <div className="relative">

                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        className="input input-bordered w-full pr-12"
                        placeholder="Create password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={() =>
                            setShowPassword(!showPassword)
                        }
                    >

                        {
                            showPassword
                                ? <EyeOff size={20} />
                                : <Eye size={20} />
                        }

                    </button>

                </div>

            </div>

            <div>

                <label className="label">
                    <span className="label-text">
                        Confirm Password
                    </span>
                </label>

                <div className="relative">

                    <input
                        type={
                            showConfirmPassword
                                ? "text"
                                : "password"
                        }
                        name="confirmPassword"
                        className="input input-bordered w-full pr-12"
                        placeholder="Confirm password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />

                    <button
                        type="button"
                        className="absolute right-3 top-3"
                        onClick={() =>
                            setShowConfirmPassword(
                                !showConfirmPassword
                            )
                        }
                    >

                        {
                            showConfirmPassword
                                ? <EyeOff size={20} />
                                : <Eye size={20} />
                        }

                    </button>

                </div>

            </div>

            <button
                disabled={loading}
                className="btn btn-primary w-full"
            >

                {

                    loading ?

                        <>

                            <Loader2
                                size={18}
                                className="animate-spin"
                            />

                            Creating Account...

                        </>

                        :

                        "Create Account"

                }

            </button>

        </form>

    );

};

export default SignupForm;