import React, { useState } from "react";
import { useAuth } from "../Components/AuthContext.jsx"; 
import { useNavigate } from "react-router-dom";

export default function Profile() {
    const { user, setUser, logout } = useAuth();
    const navigate = useNavigate();

    // إنشاء نسخة من بيانات المستخدم للتعديل
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState(user || {});

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = (e) => {
        e.preventDefault();
        setUser(formData);
        localStorage.setItem("user", JSON.stringify(formData));
        setEditMode(false);
    };

    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-2xl font-bold mb-6">Profile</h2>

                {user ? (
                    <>
                        {!editMode ? (
                            <div>
                                <p className="mb-2"><strong>First Name:</strong> {user.firstName}</p>
                                <p className="mb-2"><strong>Last Name:</strong> {user.lastName}</p>
                                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                                <p className="mb-2"><strong>Mobile:</strong> {user.mobile}</p>
                                <p className="mb-2"><strong>Address:</strong> {user.address}</p>

                                <div className="mt-6 flex justify-between">
                                    <button 
                                        onClick={() => setEditMode(true)} 
                                        className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        onClick={handleLogout} 
                                        className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSave} className="space-y-4 text-left">
                                <input 
                                    type="text" 
                                    name="firstName" 
                                    value={formData.firstName || ""} 
                                    onChange={handleChange} 
                                    placeholder="First Name"
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    name="lastName" 
                                    value={formData.lastName || ""} 
                                    onChange={handleChange} 
                                    placeholder="Last Name"
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={formData.email || ""} 
                                    onChange={handleChange} 
                                    placeholder="Email"
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    name="mobile" 
                                    value={formData.mobile || ""} 
                                    onChange={handleChange} 
                                    placeholder="Mobile"
                                    className="w-full p-2 border rounded"
                                />
                                <input 
                                    type="text" 
                                    name="address" 
                                    value={formData.address || ""} 
                                    onChange={handleChange} 
                                    placeholder="Address"
                                    className="w-full p-2 border rounded"
                                />
                                <div className="flex justify-between mt-4">
                                    <button 
                                        type="submit" 
                                        className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg"
                                    >
                                        Save
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => setEditMode(false)} 
                                        className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2 px-4 rounded-lg"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        )}
                    </>
                ) : (
                    <p className="text-red-500">You are not logged in.</p>
                )}
            </div>
        </div>
    );
}
