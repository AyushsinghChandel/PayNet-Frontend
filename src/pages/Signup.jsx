import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import axios from "../axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
    const navigate = useNavigate();
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({
        firstname: "",
        lastname: "",
        username: "",
        password: ""
    });

    const validatePassword = (password) => {
        // Regex for password validation: at least one capital letter, one number, and one special character
        const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return regex.test(password);
    };

    const handleSignup = async () => {
        setErrors({
            firstname: "",
            lastname: "",
            username: "",
            password: ""
        });

        // Validate the form before sending the request
        if (!firstname || !lastname || !username || !password) {
            setErrors(prevErrors => ({
                ...prevErrors,
                firstname: !firstname ? "Firstname is required" : "",
                lastname: !lastname ? "Lastname is required" : "",
                username: !username ? "Username is required" : "",
                password: !password ? "Password is required" : ""
            }));
            return; // Stop if validation fails
        }

        // Password validation (capital letter, special character, number)
        if (!validatePassword(password)) {
            setErrors(prevErrors => ({
                ...prevErrors,
                password: "Password must contain at least one uppercase letter, one number, and one special character"
            }));
            return;
        }

        try {
            const response = await axios.post('/user/signup', {
                firstname,
                lastname,
                username,
                password
            });
            navigate("/signin");
            console.log('Signup Success:', response.data);
        } catch (error) {
            console.error('Signup Error:', error.response?.data || error.message);

            // Handle specific error messages based on response
            if (error.response?.data?.message === "Username already taken") {
                setErrors(prevErrors => ({
                    ...prevErrors,
                    username: "Username is already taken"
                }));
            } else {
                // Handle other errors (optional)
                setErrors(prevErrors => ({
                    ...prevErrors,
                    username: error.response?.data?.message || "An error occurred"
                }));
            }
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Signup"} />
                    <SubHeading label={"Enter your information to create an account"} />
                    <InputputBox 
                        onChange={e => setFirstname(e.target.value)} 
                        placeholder={"John"} 
                        label={"Firstname"} 
                    />
                    {errors.firstname && <p className="text-red-500 text-sm">{errors.firstname}</p>}
                    
                    <InputputBox 
                        onChange={e => setLastname(e.target.value)} 
                        placeholder={"Doe"} 
                        label={"Lastname"} 
                    />
                    {errors.lastname && <p className="text-red-500 text-sm">{errors.lastname}</p>}
                    
                    <InputputBox 
                        onChange={e => setUsername(e.target.value)} 
                        placeholder={"example@gmail.com"} 
                        label={"Email"} 
                    />
                    {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
                    
                    <InputputBox 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder={"password"} 
                        label={"Password"} 
                    />
                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                    
                    <div className="pt-4">
                        <Button onClick={handleSignup} label={"Sign Up"} />
                    </div>
                    <div>
                        <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={"/signin"} />
                    </div>
                </div>
            </div>
        </div>
    );
};
