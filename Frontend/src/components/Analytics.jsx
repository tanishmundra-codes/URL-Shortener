import React, { useState, useEffect } from 'react';

const Analytics = () => {
    const [data, setData] = useState([]);
    const [stats, setStats] = useState({ totalClicks: 0, totalLinks: 0 });


    useEffect(() => {
        async function fetchAllData() {
            try {
                const response = await fetch("http://localhost:3000/url/analytics", {
                    credentials: "include"
                });
                const result = await response.json();

                setData(result);

                const totalLinks = result.length;
                const totalClicks = result.reduce((acc, item) => {
                    const history = item.visit_history || [];
                    return acc + history.length;
                }, 0);

                setStats({ totalClicks, totalLinks });

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
        fetchAllData();
    }, []);

    return (
        <div className="w-full bg-[#f0f4f8] p-6 font-sans flex justify-center pb-20">
            <div className="w-full max-w-5xl flex flex-col items-center space-y-8">

                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-50 relative overflow-hidden group transition-all duration-300 hover:shadow-xl">
                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Total System Clicks</p>
                            <p className="text-4xl font-bold text-gray-800">{stats.totalClicks}</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-400/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl shadow-lg border border-blue-50 relative overflow-hidden group transition-all duration-300 hover:shadow-xl">
                        <div className="relative z-10">
                            <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-1">Active Short Links</p>
                            <p className="text-4xl font-bold text-gray-800">{stats.totalLinks}</p>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-blue-400/10 rounded-full group-hover:scale-110 transition-transform duration-300"></div>
                    </div>
                </div>

                <div className="w-full bg-white rounded-2xl shadow-lg border border-blue-50 overflow-hidden">

                    <div className="p-6 border-b border-gray-50 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800">All Shortened Links</h2>
                            <p className="text-gray-400 text-sm mt-1">Full history from your PostgreSQL database.</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50">
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Short ID</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider">Original URL</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">Clicks</th>
                                    <th className="py-4 px-6 text-xs font-semibold text-gray-400 uppercase tracking-wider text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {data.length > 0 ? (
                                    data.map((row) => (
                                        <tr key={row.short_id} className="hover:bg-blue-50/30 transition-colors duration-150 group">

                                            <td className="py-4 px-6">
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(`http://localhost:3000/${row.short_id}`)}
                                                    className="font-medium text-blue-500 hover:text-blue-600 transition-colors bg-blue-50 px-3 py-1 rounded-md text-sm"
                                                    title="Click to copy link"
                                                >
                                                    {row.short_id}
                                                </button>
                                            </td>

                                            <td className="py-4 px-6 max-w-xs">
                                                <a
                                                    href={row.redirect_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="truncate block text-gray-500 text-sm hover:text-blue-500 transition-colors"
                                                >
                                                    {row.redirect_url}
                                                </a>
                                            </td>

                                            <td className="py-4 px-6 text-center">
                                                <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-md">
                                                    {row.visit_history ? row.visit_history.length : 0}
                                                </span>
                                            </td>

                                            <td className="py-4 px-6 text-right">
                                                <a
                                                    href={`http://localhost:3000/${row.short_id}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="text-sm font-medium text-gray-400 hover:text-blue-500 transition-colors"
                                                >
                                                    Visit
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-10 text-center text-gray-400 italic">
                                            Database is empty. Go create some links!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Analytics;