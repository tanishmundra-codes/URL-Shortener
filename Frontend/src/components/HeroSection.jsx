import React, { useState } from 'react';
import backendUrl from "../api";

const HeroSection = () => {
    const [inputValue, setInputValue] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleShorten() {
        if (inputValue.length === 0) {
            alert("Please enter a URL first!");
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(`${backendUrl}/url`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: inputValue }),
                credentials: "include"
            });

            if (response.status === 401) {
                alert("Please login first!");
                window.location.href = "/signup";
                return;
            }

            const data = await response.json();

            if (data.shortID) {
                const fullUrl = `${backendUrl}/${data.shortID}`;
                setShortenedUrl(fullUrl);
            } else {
                alert("Failed to shorten. Check backend response.");
            }

        } catch (error) {
            console.error("Error:", error);
            alert("Network error. Make sure backend is running.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="w-full bg-[#f0f4f8] min-h-[calc(100vh-64px)] p-4 md:p-6 font-sans flex justify-center">

            <div className="w-full max-w-4xl flex flex-col items-center mt-10 md:mt-32 space-y-6 md:space-y-8">
                
                <div className="text-center space-y-2">
                    <h1 className="text-3xl md:text-5xl font-bold text-gray-800">
                        Shorten Your Links
                    </h1>
                    <p className="text-gray-500 text-sm md:text-base">
                        Copy your long link and paste it below.
                    </p>
                </div>

                <div className="w-full relative">
                    <input
                        type="text"
                        placeholder="Paste long URL here..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="w-full h-14 md:h-20 pl-4 md:pl-8 pr-4 md:pr-44 rounded-xl md:rounded-2xl border border-blue-100/50 shadow-sm focus:outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-400 text-base md:text-lg text-gray-700 placeholder-gray-400 bg-white transition-all duration-300"
                    />
                    
                    <button
                        onClick={handleShorten}
                        disabled={isLoading}
                        className={`
                            w-full md:w-auto md:absolute md:right-3 md:top-3 md:bottom-3 
                            mt-3 md:mt-0 
                            bg-blue-500 hover:bg-blue-600 text-white font-semibold 
                            h-12 md:h-auto px-8 rounded-xl transition-all duration-200 
                            shadow-lg shadow-blue-200 hover:shadow-blue-300 hover:-translate-y-0.5 transform
                            ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
                        `}
                    >
                        {isLoading ? "Shortening..." : "Shorten"}
                    </button>
                </div>
                
                {shortenedUrl && (
                    <div className="w-full bg-white p-4 md:p-5 pl-4 md:pl-8 rounded-2xl border border-blue-50 shadow-lg flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0">
                        
                        <div className="text-base md:text-lg font-medium truncate w-full pr-0 md:pr-4 text-center md:text-left">
                            <span className="text-gray-400 block md:inline mr-0 md:mr-3 text-sm md:text-base">Shortened URL:</span>
                            <a href={shortenedUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline tracking-tight break-all">
                                {shortenedUrl}
                            </a>
                        </div>
                        
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(shortenedUrl);
                                alert("Copied to clipboard!");
                            }}
                            className="w-full md:w-auto p-3 hover:bg-blue-50 rounded-xl border border-gray-100 text-gray-400 hover:text-blue-400 transition-all duration-200 flex justify-center"
                            title="Copy to clipboard"
                        >
                            <span className="md:hidden mr-2">Copy</span>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default HeroSection;