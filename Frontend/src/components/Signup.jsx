import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backendUrl from "../api";

const Signup = () => {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    
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
        setIsLoading(true);
        try {
            const response = await fetch(`${backendUrl}/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("uid", "logged_in");
                navigate('/'); 
            } else {
                console.error("Signup failed:", data.error);
                alert(data.error || "Signup failed");
            }
        } catch (error) {
            console.error("Network Error:", error);
            alert("Server not responding. Please try again.");
        } finally {
            setIsLoading(false); 
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-64px)] bg-[#f0f4f8] flex justify-center items-center p-4 md:p-6 font-sans">

            <div className="w-11/12 max-w-md bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-blue-50 animate-fade-in-up">

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
                            required
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
                            required
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
                            required
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/10 outline-none transition-all duration-200 text-gray-700 placeholder-gray-300"
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 
                        ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
                    >
                        {isLoading ? "Creating Account..." : "Create Account"}
                    </button>
                </form>

                <div className="mt-8 text-center text-sm text-gray-400">
                    Already have an account?{' '}
                    <Link to="/login" className="text-blue-500 font-medium hover:text-blue-600 transition-colors">
                        Log in
                    </Link>
                </div>

            </div>
        </div>
    );
};

export default Signup;