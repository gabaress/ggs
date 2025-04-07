import React from "react";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function OrdersByStatus() {

    return (
        <div>
            <h1 className='d-flex justify-content-center align-items-center' style={{marginTop: '5vh'}}> Orders by Status</h1>
            <div className="card-list d-flex justify-content-center align-items-center">
                <Card style={{ width: '18rem', margin: '10px' }}>
                    <Card.Body>
                    <Card.Title>Ordered</Card.Title>
                    <Button variant="primary" href={`/status/O`}>View Orders</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem', margin: '10px' }}>
                    <Card.Body>
                    <Card.Title>Processing</Card.Title>
                    <Button variant="primary" href={`/status/P`}>View Orders</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem', margin: '10px' }}>
                    <Card.Body>
                    <Card.Title>Shipped</Card.Title>
                    <Button variant="primary" href={`/status/S`}>View Orders</Button>
                    </Card.Body>
                </Card>
                <Card style={{ width: '18rem', margin: '10px' }}>
                    <Card.Body>
                    <Card.Title>Delivered</Card.Title>
                    <Button variant="primary" href={`/status/D`}>View Orders</Button>
                    </Card.Body>
                </Card>
            </div>
        </div>
    )
}

export default OrdersByStatus;