import { useState } from "react";
import { api } from "../api/axios.js";

const Signup = () => {
    const [form, setForm] = useState({
        name: "",
        username: "",
        email: "",
        password: ""
    });

    const [msg, setMsg] = useState("");

    const handleChanges = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/users", form);
            setMsg(response.data.message);
        } catch (error) {
            setMsg(error.response?.data?.message || "An error occurred");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-50 px-4 antialiased">
            <div className="bg-white p-8 rounded-2xl shadow-xl shadow-slate-100 w-full max-w-md border border-slate-100">
                <div className="mb-8 text-center">
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Create Account</h2>
                    <p className="text-sm text-slate-500 mt-2">Get started with your commerce journey</p>
                </div>

                {msg && (
                    <div className="mb-6 p-3 rounded-lg text-center text-sm font-medium bg-blue-50 text-blue-700 border border-blue-100 animate-fade-in">
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Full Name</label>
                        <input 
                            name="name"
                            placeholder="John Doe"
                            type="text"
                            value={form.name}
                            onChange={handleChanges}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Username</label>
                        <input 
                            name="username"
                            placeholder="johndoe"
                            type="text"
                            value={form.username}
                            onChange={handleChanges}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Email Address</label>
                        <input 
                            name="email"
                            placeholder="name@example.com"
                            type="email"
                            value={form.email}
                            onChange={handleChanges}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                            required
                        />
                    </div>
                    
                    <div>
                        <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">Password</label>
                        <input 
                            name="password"
                            placeholder="••••••••"
                            type="password"
                            value={form.password}
                            onChange={handleChanges}
                            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100 transition-all duration-200"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        className="w-full mt-2 bg-blue-600 text-white py-3 px-4 rounded-xl font-semibold shadow-lg shadow-blue-100 hover:bg-blue-700 hover:shadow-blue-200 active:scale-[0.98] transition-all duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
