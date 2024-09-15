import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate replaces useHistory in React Router v6
import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { Button } from '../components/Button';

export const Dashboard = () => {
    const navigate = useNavigate(); // useNavigate hook
    const [token, setToken] = useState(null); // State to hold the token
    const [balance, setBalance] = useState(null);
    const [firstName, setFirstName] = useState(''); // State to hold the first name

    useEffect(() => {
        // Check if token is stored locally
        const storedToken = localStorage.getItem('token');

        if (!storedToken) {
            // Redirect to login or other page if token is not stored
            navigate('/signin'); // useNavigate replaces history.push()
        } else {
            // Set the token if available
            setToken(storedToken);
            fetchUserBalance(storedToken);
            fetchFirstName(storedToken); // Fetch the first name
        }
    }, [navigate]);

    const fetchUserBalance = async (token) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/account/balance', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // Use the token for authentication
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setBalance(parseFloat(data.balance).toFixed(2)); // Assuming the API response contains { balance: <value> }
            } else {
                console.error('Failed to fetch balance');
            }
        } catch (error) {
            console.log("Error fetching balance: " + error);
        }
    };

    const fetchFirstName = async (token) => {
        try {
            const response = await fetch('http://localhost:3000/api/v1/user/me', { // Adjust the URL to your endpoint
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setFirstName(data.firstName); // Assuming the API response contains { firstName: <value> }
            } else {
                console.error('Failed to fetch first name');
            }
        } catch (error) {
            console.log("Error fetching first name: " + error);
        }
    };

    const handleLogout = () => {
        // Handle logout logic here, e.g., clear token from localStorage and redirect to signin page
        localStorage.removeItem('token');
        navigate('/signin');
    };

    if (!token) {
        // Render nothing or a loading indicator until token is checked
        return null;
    }

    // Once token is available, render the Dashboard
    return (
        <div>
            <Appbar firstName={firstName} />
            <div className="m-8">
                <Balance value={balance} />
                <Users />
            </div>
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2">
                <Button
                    onClick={handleLogout}
                    label={"Log Out"}
                    size="small"
                />
            </div>
        </div>
    );
};
