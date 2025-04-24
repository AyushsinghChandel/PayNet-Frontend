import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

export const Appbar = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const storedName = localStorage.getItem('email');
        if (storedName) {
            setName(storedName);
        }
    }, []);

    const handleLogout = () => {
        // Remove token and email from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        
        // Redirect to the sign-in page
        navigate('/signin');
    };

    return (
        <div className="shadow h-14 flex justify-between">
            <div className="flex flex-col justify-center h-full ml-4 text-2xl font-bold text-black">
                PayMate
            </div>
            <div className="flex items-center">
                <div className="flex flex-col justify-center h-full ml-4 mr-2 font-semibold">
                    Hello
                </div>
                <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                    <div className="flex flex-col justify-center h-full text-xl">
                        {name ? name[0].toUpperCase() : "U"}
                    </div>
                </div>
                {/* Logout button with icon */}
                <button 
                    onClick={handleLogout} 
                    className="flex items-center justify-center bg-gray-300 text-black rounded-full h-12 w-12 ml-2 hover:bg-gray-400 transition-all"
                    title="Logout"
                >
                    <FontAwesomeIcon icon={faSignOutAlt} className="text-2xl" />
                </button>
            </div>
        </div>
    );
};
