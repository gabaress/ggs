import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { ListGroup } from 'react-bootstrap';

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
                <Card className='d-flex justify-content-center align-items-center' style={{ width: '18rem', margin: '10px' }}>
                    <Card.Body>
                    <Card.Title>Order #{id}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Status: {status.get(data.status)}</Card.Subtitle>
                    </Card.Body>
                    <ListGroup variant="flush">
                    <ListGroup.Item><strong>Address:</strong> {data.shipping_addr}</ListGroup.Item>
                    <ListGroup.Item><strong>Date Ordered:</strong> {data.date_ordered}</ListGroup.Item>
                    </ListGroup>
                </Card>
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
          <div className="product-list">
            <ListGroup>
              {orderItems.map(orderItem => {
                // Find the corresponding product for the current order item
                const product = allProducts.find(p => p.url === orderItem.product);
                return (
                  <ListGroup.Item key={orderItem.url}>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <div><strong>Product Name:</strong> {product.name}</div>
                        <div><strong>Price:</strong> {product.price}</div>
                        <div><strong>Quantity Ordered:</strong> {orderItem.quantity}</div>
                      </div>
                    </div>
                  </ListGroup.Item>
                );
              })}
            </ListGroup>
            <div className="total-price" style={{marginLeft: '4vw', marginTop: '2vh'}}>
              <strong>Total Price:</strong> €{totalPrice}
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