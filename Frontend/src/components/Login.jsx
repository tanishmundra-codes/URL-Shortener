import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import backendUrl from "../api";

const Login = ({ setIsLoggedIn }) => { // Accept prop to update UI
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch(`${backendUrl}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include" // Still try to set cookie as backup
            });

            const data = await response.json();

            if (response.ok) {
                if (data.token) {
                    localStorage.setItem("token", data.token);
                    console.log("Token saved to storage:", data.token);
                } else {
                    console.error("Backend did not send a token!");
                }
                setIsLoggedIn(true);
                navigate('/'); 
            } else {
                alert(data.error || "Login failed");
            }
        } catch (error) {
            console.error("Login Error:", error);
            alert("Network error.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="w-full min-h-[calc(100vh-64px)] bg-[#f0f4f8] flex justify-center items-center p-4">
            <div className="w-11/12 max-w-md bg-white p-8 rounded-2xl shadow-lg border border-blue-50">
                <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">Welcome Back</h2>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required 
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <div>
                        <label className="block text-gray-600 text-sm font-medium mb-2">Password</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required 
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 outline-none focus:ring-2 focus:ring-blue-100" />
                    </div>
                    <button type="submit" disabled={isLoading} 
                        className="w-full bg-blue-500 text-white font-semibold py-3.5 rounded-xl shadow-lg hover:bg-blue-600 transition-all">
                        {isLoading ? "Logging in..." : "Log In"}
                    </button>
                </form>
                
                <div className="mt-8 text-center text-sm text-gray-400">
                    Don't have an account? <Link to="/signup" className="text-blue-500 font-medium">Sign up</Link>
                </div>
            </div>
        </div>
    );
};

export default Login;