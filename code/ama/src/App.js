import './App.css';
import { Route, Routes } from 'react-router-dom';
import Container from './Layouts/Container';
import HomePage from './Layouts/HomePage';
import FourOhFour from './Layouts/FourOhFour';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomNavbar from './Layouts/nav';
import CategoriesAll from './Layouts/categoriesAll';
import CategoriesSingle from './Layouts/categoriesSingle';
import OrdersByStatus from './Layouts/orderByStatus';
import StatusSingle from './Layouts/statusSingle';
import CustomersAll from './Layouts/customersAll';
import CustomersSingle from './Layouts/customerSingle';
import OrderSingle from './Layouts/ordersSingle';

// WHEN creating routes, make sure to place them 
// BEFORE the FourOhFour page
function App() {
  return (
    <div>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Container />} >
          <Route index element={<HomePage />} />
          <Route path="/categories" element={<CategoriesAll />}/>
          <Route path="/categories/:id" element={<CategoriesSingle />} />
          <Route path="/status" element= {<OrdersByStatus />}/>
          <Route path="/status/:id" element= {<StatusSingle />}/>
          <Route path="/customers" element={<CustomersAll />} />
          <Route path="/customers/:id" element={<CustomersSingle />} />
          <Route path="/orders/:id" element={<OrderSingle />} />
          <Route path="*" element={<FourOhFour />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
