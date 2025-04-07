import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

function StatusSingle() {

    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/order/?status=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const getID = (url) => {
        return url.split('/').reverse()[1];
    }

    const OrderList = ({ data }) => {
        return (
          <div className="order-list d-flex justify-content-center align-items-center">
            {data.map(order => (
              <Card key={order.url} style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>Order #{getID(order.url)}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">Date Ordered: {order.date_ordered}</Card.Subtitle>
                  <Card.Text>
                    Shipping Address: {order.shipping_addr}
                    <br />
                    <Button variant="primary" href={`/customers/${getID(order.customer)}`}>View Customer</Button>
                  </Card.Text>
                  <Button variant="primary" href={`/orders/${getID(order.url)}`}>View Order</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        );
      };

    return (
        <div>
            <h1 className='d-flex justify-content-center align-items-center' style={{marginTop: '5vh'}}>Orders</h1>
            {OrderList({data})}
        </div>
    )
}

export default StatusSingle;