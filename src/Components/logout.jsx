import React from 'react';
import { useGlobalContext } from './context.jsx';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx'; // Adjust the import path as necessary

export default function Logout() {
    const { user, logout } = useAuth();

    return (
        <div className="flex justify-center items-center h-screen ">
            <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-2xl font-bold mb-6 text-center text-white">Logout</h2>
                <p className="mb-6 text-white">Are you sure you want to logout?</p>
            
                {/* Logout Button */}
                <button 
                    onClick={logout} 
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
                >
                    Logout
                </button>
            </div>
        

        </div>
    );
}