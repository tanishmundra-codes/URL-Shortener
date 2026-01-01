import React, { useState } from 'react';

const HeroSection = () => {
    const [inputValue, setInputValue] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");

    async function handleShorten() {
        if (inputValue.length === 0) {
            alert("Please enter a URL first!");
            return;
        }

        try {
            const response = await fetch("http://localhost:3000/url", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: inputValue }),
                credentials : "include"
            });

            if (response.status === 401) {
                alert("Please login first!");
                window.location.href = "/login";
                return;
            }

            const data = await response.json();

            if (data.shortID) {
                const fullUrl = `http://localhost:3000/${data.shortID}`;
                setShortenedUrl(fullUrl);
            } else {
                alert("Failed to shorten. Check backend response.");
            }

        } catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className="w-full bg-[#f0f4f8] min-h-[calc(100vh-64px)] p-6 font-sans flex justify-center">

            <div className="w-full max-w-4xl flex flex-col items-center mt-32 space-y-8">
                <div className="w-full relative group">
                    <input
                        type="text"
                        placeholder="Paste long URL here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full h-20 pl-8 pr-44 rounded-2xl border border-blue-100/50 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 text-lg text-gray-700 placeholder-gray-400 bg-white transition-all duration-300"
                    />
                    <button
                        onClick={handleShorten}
                        className="absolute right-3 top-3 bottom-3 bg-blue-400 hover:bg-blue-500 text-white font-semibold px-8 rounded-xl transition-all duration-200 shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transform">
                        Shorten
                    </button>
                </div>
                
                <div className="w-full bg-white p-5 pl-8 rounded-2xl border border-blue-50 shadow-lg flex items-center justify-between">
                    <div className="text-lg font-medium truncate pr-4">
                        <span className="text-gray-400 mr-3">Shortened URL:</span>
                        <span className="text-gray-800 tracking-tight">{shortenedUrl}</span>
                    </div>
                    
                    <button
                        onClick={() => {
                            if (shortenedUrl) navigator.clipboard.writeText(shortenedUrl);
                        }}
                        className="p-3 hover:bg-blue-50 rounded-xl border border-gray-100 text-gray-400 hover:text-blue-400 transition-all duration-200"
                        title="Copy to clipboard"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default HeroSection;