import React from "react";

function OrdersByStatus() {
    return (
        <div>
            <h1>Orders by Status</h1>
            <div>
                <div>
                    <h2>Ordered</h2>
                    <a href={`/status/O`}>View Orders</a>
                </div>
                <div>
                    <h2>Processing</h2>
                    <a href={`/status/P`}>View Orders</a>
                </div>
                <div>
                    <h2>Shipped</h2>
                    <a href={`/status/S`}>View Orders</a>
                </div>
                <div>
                    <h2>Delivered</h2>
                    <a href={`/status/D`}>View Orders</a>
                </div>
            </div>
        </div>
    );
}

export default OrdersByStatus;