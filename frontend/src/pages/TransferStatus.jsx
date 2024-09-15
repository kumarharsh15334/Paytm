import { useSearchParams, useNavigate } from "react-router-dom";

export const TransferStatus = () => {
    const [searchParams] = useSearchParams();
    const result = searchParams.get("result");
    const amount = searchParams.get("amount");
    const navigate = useNavigate();

    return (
        <div className="flex justify-center h-screen bg-gray-100">
            <div className="h-full flex flex-col justify-center">
                <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
                    <div className="flex flex-col space-y-1.5 p-6">
                        <h2 className="text-3xl font-bold text-center">Transfer Status</h2>
                        <div className="mt-4 text-center">
                            {result === "success" ? (
                                <div className="text-green-500">
                                    <h3 className="text-2xl font-semibold">Transfer Successful!</h3>
                                    <p>You have successfully transferred ₹{amount}.</p>
                                </div>
                            ) : result === "error" ? (
                                <div className="text-red-500">
                                    <h3 className="text-2xl font-semibold">Transfer Failed</h3>
                                    <p>There was an issue with your transfer of ₹{amount}. Please try again.</p>
                                </div>
                            ) : (
                                <div>
                                    <h3 className="text-2xl font-semibold">Transfer Status Unknown</h3>
                                    <p>There was an issue determining the transfer status.</p>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-center mt-6">
                            <button
                                onClick={() => navigate("/dashboard")}
                                className="rounded-md text-sm font-medium h-10 px-4 py-2 bg-green-500 text-white"
                            >
                                OK
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
