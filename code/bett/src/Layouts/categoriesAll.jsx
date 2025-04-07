import { useState, useEffect } from 'react';
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
          <div>
            <ul>
              {data.map(item => (
                  <li key={item.shortcode}>
                    <p>{item.display_name}</p>
                    {/* Use Link for navigation */}
                    <button href={`/categories/${item.shortcode}`}>View Products</button>
                  </li>
              ))}
            </ul>
          </div>
        );
    };

    return (
        <div>
            <h1>All Categories</h1>
            {CategoryList({ data })}
        </div>
    );
}

export default CategoriesAll;