import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function OrderSingle() {

    const { id } = useParams();
    const [data, setData] = useState({});
    const [orderItems, setOrderItems] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/order/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/orderitem/?order=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setOrderItems(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/`)
            .then((response) => response.json())
            .then((data) => {
                setAllProducts(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const OrderInfo = (data) => {
      const status = new Map();
      status.set('O', 'Ordered');
      status.set('P', 'Processing');
      status.set('S', 'Shipped');
      status.set('D', 'Delivered');
  
      return (
          <div>
              <div>
                  <h2>Order #{id}</h2>
                  <h4>Status: {status.get(data.status)}</h4>
              </div>
              <ul>
                  <li><strong>Address:</strong> {data.shipping_addr}</li>
                  <li><strong>Date Ordered:</strong> {data.date_ordered}</li>
              </ul>
          </div>
      );
  };

  const ProductList = ({ orderItems, allProducts }) => {
    // Calculate the subtotal for each item and sum up to get the total order price
    const totalPrice = orderItems.reduce((total, item) => {
        // Find the corresponding product for the current order item
        const product = allProducts.find(p => p.url === item.product);
        // Calculate the subtotal for the current item
        const subtotal = product.price * item.quantity;
        // Add the subtotal to the total
        return total + subtotal;
    }, 0);

    return (
        <div>
            <ul>
                {orderItems.map(orderItem => {
                    // Find the corresponding product for the current order item
                    const product = allProducts.find(p => p.url === orderItem.product);
                    return (
                        <li key={orderItem.url}>
                            <div>
                                <p><strong>Product Name:</strong> {product.name}</p>
                                <p><strong>Price:</strong> {product.price}</p>
                                <p><strong>Quantity Ordered:</strong> {orderItem.quantity}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
            <div>
                <p><strong>Total Price:</strong> €{totalPrice}</p>
            </div>
        </div>
    );
};

    return (
        <div>
            <h1 className='d-flex justify-content-center align-items-center' style={{marginTop: '5vh'}}>Order Info</h1>
            <div className='d-flex justify-content-center align-items-center' style={{marginTop: '2.5vh'}}>
            {OrderInfo(data)}
            </div>
            <h2 className='d-flex justify-content-center align-items-center' style={{marginTop: '2.5vh'}}>Products Ordered</h2>
            <div className='d-flex justify-content-center align-items-center' style={{marginTop: '2.5vh'}}>
            {ProductList({orderItems, allProducts})}
            </div>
        </div>
    )
}

export default OrderSingle;