import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";
import { useEffect, useState } from "react";
import axios from "../axios"; // assuming you have axios setup

export const Dashboard = () => {
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        async function fetchBalance() {
            try {
                const response = await axios.get("/account/balance", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token")
                    }
                });
                setBalance(response.data.balance);
            } catch (error) {
                console.error("Failed to fetch balance:", error);
            }
        }

        fetchBalance();
    }, []);

    return (
        <div>
            <Appbar />
            <div className="m-8">
                <Balance value={balance.toFixed(2)} />
                <Users />
            </div>
        </div>
    );
};
