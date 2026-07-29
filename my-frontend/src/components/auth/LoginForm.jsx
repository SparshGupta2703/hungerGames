import { useState } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { login } from "../../api/Auth";
import { useAuthStore } from "../../stores/AuthStore";

const LoginForm = ({ closeModal }) => {
  const navigate = useNavigate();

  const { loginAuth } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const response = await login(formData);

      if (response.success) {
        loginAuth(
          response.user,
          response.token
        );

        toast.success("Welcome back!");

        closeModal();

        navigate("/home");
      } else {
        toast.error(response.message);
      }
    } catch (err) {
      toast.error(
        err.response?.message ||
          "Login failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleLogin}
      className="space-y-5"
    >
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
          placeholder="Enter your email"
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
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            className="input input-bordered w-full pr-12"
            placeholder="Enter password"
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
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>

        </div>

      </div>

      <button
        disabled={loading}
        className="btn btn-primary w-full"
      >
        {loading ? (
          <>
            <Loader2
              size={18}
              className="animate-spin"
            />
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </button>

    </form>
  );
};

export default LoginForm;