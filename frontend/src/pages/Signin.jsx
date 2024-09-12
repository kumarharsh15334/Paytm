import { useNavigate } from "react-router-dom";
import { BottomWarning } from "../components/BottomWarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useState } from "react";

export const Signin = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(""); // State to handle error messages
    const navigate = useNavigate(); // Hook to navigate programmatically

    const handleSignIn = async () => {
        // Check if username and password fields are filled
        if (!username || !password) {
            setErrorMessage("Please enter both username and password.");
            return;
        }

        // API call to check if the username and password are correct
        try {
            const response = await fetch('http://localhost:3000/api/v1/user/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Ensure the content type is JSON
                },
                body: JSON.stringify({ 
                    username, 
                    password 
                }) // Sending the username and password as the payload
            });

            const data = await response.json();

            if (response.ok) {
                setErrorMessage("");  // Clear any error messages

                // Save the token to localStorage or sessionStorage
                localStorage.setItem('token', data.token);

                console.log('Sign-in successful! Redirecting to dashboard...');
                navigate('/dashboard'); // Navigate to the dashboard page
            } else {
                // Handle errors and display the error message
                setErrorMessage(data.message || 'Sign-in failed. Please try again.');
            }
        } catch (error) {
            setErrorMessage("Error signing in. Please try again.");
            console.error('Error:', error);
        }
    };

    return (
        <div className="bg-slate-300 h-screen flex justify-center">
            <div className="flex flex-col justify-center">
                <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                    <Heading label={"Sign in"} />
                    <SubHeading label={"Enter your credentials to access your account"} />
                    <InputBox 
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="username@gmail.com" 
                        label={"Email"} 
                    />
                    <InputBox 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Password" 
                        label={"Password"} 
                        type="password" // Hide the password input
                    />
                    <div className="pt-4">
                        <Button label={"Sign in"} onClick={handleSignIn} />
                    </div>
                    {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>} {/* Display error message */}
                    <BottomWarning 
                        label={"Don't have an account?"} 
                        buttonText={"Sign up"} 
                        to={"/signup"} 
                    />
                </div>
            </div>
        </div>
    );
};
