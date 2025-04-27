import { useState, useEffect } from 'react';
function CustomersAll() {

    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/api/customer/`)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    const getID = (url) => {
        return url.split('/').reverse()[1];
    }

    const CustomerList = ({ data }) => {
        return (
          <div className="customer-list d-flex justify-content-center align-items-center">
            {data.map(customer => (
              <li key={customer.url} style={{ width: '18rem', margin: '10px' }}>
                  <h1>{customer.name}</h1>
                  <h2 className="mb-2 text-muted">{customer.email}</h2>
                  <p>
                    Address: {customer.address}
                  </p>
                  <button variant="primary" href={`/customers/${getID(customer.url)}`}>View Customer</button>
              </li>
            ))}
          </div>
        );
      };

    return (
        <div>
            <h1 className='d-flex justify-content-center align-items-center' style={{marginTop: '5vh'}}>All Customers</h1>
            {CustomerList({data})}
        </div>
    )
}

export default CustomersAll;