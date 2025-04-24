import { useState } from "react";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import axios from "../axios";

export const Signin = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // Added state to handle error message

    const handleSignin = async () => {
        try {
            const response = await axios.post("/user/signin", {
                username,
                password,
            });
            const token = response.data.token;
            localStorage.setItem("token", token);
            localStorage.setItem("email", username);
            navigate("/dashboard");
        } catch (error) {
            if (error.response && error.response.status === 401) {
                // Handling incorrect credentials error from backend
                setErrorMessage(error.response.data.message); // Display the backend error message
            } else {
                // General error handling
                setErrorMessage("An error occurred. Please try again.");
            }
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputputBox
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="harkirat@gmail.com"
                        label={"Email"}
                    />
                    <InputputBox
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="123456"
                        label={"Password"}
                    />
                    {errorMessage && (
                        <div className="text-red-500 text-sm mt-2">{errorMessage}</div> // Show error in red
                    )}
                    <div className="pt-4">
                        <Button onClick={handleSignin} label={"Sign in"} />
                    </div>
                    <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
                </div>
            </div>
        </div>
    );
};
