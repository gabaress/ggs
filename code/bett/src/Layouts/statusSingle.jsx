import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
          <div className="order-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
              {data.map(order => (
                  <div key={order.url} style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '15px', margin: '10px', width: '18rem', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                      <h3 style={{ marginBottom: '10px' }}>Order #{getID(order.url)}</h3>
                      <p style={{ color: 'gray', marginBottom: '10px' }}>Date Ordered: {order.date_ordered}</p>
                      <p style={{ marginBottom: '10px' }}>
                          <strong>Shipping Address:</strong> {order.shipping_addr}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <a href={`/customers/${getID(order.customer)}`} style={{ textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '8px 12px', borderRadius: '4px' }}>View Customer</a>
                          <a href={`/orders/${getID(order.url)}`} style={{ textDecoration: 'none', color: 'white', backgroundColor: 'blue', padding: '8px 12px', borderRadius: '4px' }}>View Order</a>
                      </div>
                  </div>
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