import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Card from 'react-bootstrap/Card';

function CategoriesSingle() {

    const { id } = useParams();
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/product/?category=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, [id]);

    const ProductList = ({ data }) => {
        return (
          <div className="card-list d-flex justify-content-center align-items-center">
            {data.map(item => (
              <Card key={item.name} className="d-flex justify-content-center align-items-center" style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>
                    €{item.price}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        );
      };

    return (
        <div>
            <h1 className='d-flex justify-content-center align-items-center' style={{marginTop: '5vh'}}>{id}</h1>
            {ProductList({data})}
        </div>
    )
}

export default CategoriesSingle;