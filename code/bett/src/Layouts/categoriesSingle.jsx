import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
              <li key={item.name} className="d-flex justify-content-center align-items-center" style={{ width: '18rem', margin: '10px' }}>
                  <p>{item.name}</p>
                  <p>
                    €{item.price}
                  </p>
              </li>
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