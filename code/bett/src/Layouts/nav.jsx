import React from 'react';
//import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <div>
      <div>
        <h1><a href="/">Clothes Inc.</a></h1>
      </div>
      <nav>
        <ul>
          <li><a href="/categoriesAll">Categories</a></li>
          <li><a href="/orderByStatus">Orders By Status</a></li>
          <li><a href="/customersAll">Customers</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default CustomNavbar;
