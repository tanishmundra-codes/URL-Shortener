import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Signup Data:", formData);
        try {
            const response = await fetch("http://localhost:3000/user/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("uid", "logged_in");
                navigate('/login');
            } else {
                console.error("Signup failed:", data.error);
                alert(data.error || "Signup failed");
            }
        } catch (error) {
            console.error("Network Error:", error);
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-64px)] bg-[#f0f4f8] flex justify-center items-center p-6 font-sans">

            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg border border-blue-50 animate-fade-in-up">

                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-gray-800">Join the Hub</h2>
                    <p className="text-gray-400 text-sm mt-2">Start shortening links in seconds.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">

                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">Full Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-700 placeholder-gray-300"
                            placeholder="John Doe"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">Email Address</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-700 placeholder-gray-300"
                            placeholder="john@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-700 placeholder-gray-300"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5"
                    >
                        Create Account
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-400 font-medium hover:text-blue-500 transition-colors">
                        Log in
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Signup;