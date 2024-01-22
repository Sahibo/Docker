import './App.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function App() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://localhost:44328/TakeOrder/Get');
      console.log('Orders:', response.data);
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  const toggleDelivery = async (id) => {
    const orderToUpdate = orders.find((order) => order.id === id);

    try {
      const response = await axios.patch(`https://localhost:44328/TakeOrder/${id}`, {
        isDelivered: !orderToUpdate.isDelivered,
      });

      if (response.status === 200) {
        fetchOrders();
      } else {
        console.error('Failed to update delivery status');
      }
    } catch (error) {
      console.error('Error updating delivery status:', error);
    }
  };

  const initialValues = {
    name: '',
    phoneNumber: '',
    address: '',
    pizza: '',
    count: '',
    note: '',
    isDelivered: false,
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phoneNumber: Yup.string().required('Phone Number is required'),
    address: Yup.string().required('Address is required'),
    pizza: Yup.string().required('Pizza is required'),
    count: Yup.number().required('Count is required').positive('Count must be a positive number'),
    note: Yup.string(),
  });

  const onSubmit = async (values, { resetForm }) => {
    try {
      console.log(values);
      const response = await axios.post('https://localhost:44328/TakeOrder/Post', values);
      if (response.status === 200) {
        fetchOrders();
        resetForm(initialValues);
      } else {
        console.error('Failed to add order');
      }
    } catch (error) {
      console.error('Error adding order:', error);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <div className="form-container">
      <form onSubmit={formik.handleSubmit}>
        <div className='column'>
          <label>Name:</label>
          <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} />
          {formik.touched.name && formik.errors.name && <div>{formik.errors.name}</div>}

          <label>Phone Number:</label>
          <input type="text" name="phoneNumber" value={formik.values.phoneNumber} onChange={formik.handleChange} />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && <div>{formik.errors.phoneNumber}</div>}

          <label>Address:</label>
          <input type="text" name="address" value={formik.values.address} onChange={formik.handleChange} />
          {formik.touched.address && formik.errors.address && <div>{formik.errors.address}</div>}
        </div>

        <div className='column'>
          <label>Pizza:</label>
          <input type="text" name="pizza" value={formik.values.pizza} onChange={formik.handleChange} />
          {formik.touched.pizza && formik.errors.pizza && <div>{formik.errors.pizza}</div>}

          <label>Count:</label>
          <input type="text" name="count" value={formik.values.count} onChange={formik.handleChange} />
          {formik.touched.count && formik.errors.count && <div>{formik.errors.count}</div>}

          <label>Note:</label>
          <input type="text" name="note" value={formik.values.note} onChange={formik.handleChange} />
          {formik.touched.note && formik.errors.note && <div>{formik.errors.note}</div>}
        </div>

        <button type="submit">Add Order</button>
      </form>
    </div>
      <div>
        <h2>Order List</h2>
        <table className="styled-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Pizza</th>
              <th>Count</th>
              <th>Note</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.name}</td>
                <td>{order.phoneNumber}</td>
                <td>{order.address}</td>
                <td>{order.pizza}</td>
                <td>{order.count}</td>
                <td>{order.note}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={order.isDelivered}
                    onChange={() => toggleDelivery(order.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
