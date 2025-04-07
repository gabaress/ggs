import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';

function CustomerSingle() {

    const { id } = useParams();
    const [data, setData] = useState({});
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/customer/${id}/`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/order/?customer=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setOrders(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const getID = (url) => {
        return url.split('/').reverse()[1];
    }

    const CustomerProfile = ({ orders }) => {
        return (
          <Card className='d-flex justify-content-center align-items-center' style={{ width: '18rem', margin: '10px' }}>
            <Card.Body>
              <Card.Title>{data.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{data.email}</Card.Subtitle>
            </Card.Body>
            <ListGroup variant="flush">
              <ListGroup.Item><strong>Address:</strong> {data.address}</ListGroup.Item>
            </ListGroup>
          </Card>
        );
    };

    const OrderList = ({ orders }) => {
        return (
          <div className="order-list">
            <ListGroup>
              {orders.map(order => (
                <ListGroup.Item key={order.url}>
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <div><strong>Order Number:</strong> {getID(order.url)}</div>
                      <div><strong>Date Ordered:</strong> {order.date_ordered}</div>
                    </div>
                    <Button variant="primary" href={`/orders/${getID(order.url)}`}>View Order</Button>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        );
      };

    return (
        <div>
            <h1 className='d-flex justify-content-center align-items-center' style={{marginTop: '5vh'}}>Customer Info</h1>
            <div className='d-flex justify-content-center align-items-center' style={{marginTop: '2.5vh'}}>
            {CustomerProfile({data})}
            </div>
            <h2 className='d-flex justify-content-center align-items-center' style={{marginTop: '2.5vh'}}>Orders</h2>
            {OrderList({orders})}
        </div>
    )
}

export default CustomerSingle;