import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
          <div className="customer-profile" style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', width: '18rem', textAlign: 'center' }}>
              <h2>{data.name}</h2>
              <p style={{ color: 'gray' }}>{data.email}</p>
              <div style={{ marginTop: '10px' }}>
                  <strong>Address:</strong> {data.address}
              </div>
          </div>
      );
  };

    const OrderList = ({ orders }) => {
      return (
          <div className="order-list">
              {orders.map(order => (
                  <div key={order.url} className="order-item" style={{ border: '1px solid #ccc', padding: '10px', margin: '10px 0' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <div>
                              <div><strong>Order Number:</strong> {getID(order.url)}</div>
                              <div><strong>Date Ordered:</strong> {order.date_ordered}</div>
                          </div>
                          <a href={`/orders/${getID(order.url)}`} style={{ textDecoration: 'none', color: 'blue' }}>View Order</a>
                      </div>
                  </div>
              ))}
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