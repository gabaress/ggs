import { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';


function CategoriesAll() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/category/`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const CategoryList = ({ data }) => {
        return (
          <div className="card-list d-flex justify-content-center align-items-center">
            {data.map(item => (
              <Card key={item.shortcode} style={{ width: '18rem', margin: '10px' }}>
                <Card.Body>
                  <Card.Title>{item.display_name}</Card.Title>
                  <Button variant="primary" href={`/categories/${item.shortcode}`}>View Products</Button>
                </Card.Body>
              </Card>
            ))}
          </div>
        );
      };

    return (
        <div>
            <h1 className='d-flex justify-content-center align-items-center' style={{marginTop: '5vh'}}> All categories</h1>
            {CategoryList({data})}
        </div>
    )
}

export default CategoriesAll;