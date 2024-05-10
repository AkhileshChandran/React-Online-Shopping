import React, { useState } from 'react';
import axios from 'axios';
import orderReturnData from './orderReturnData.json'; 
import Workflow from './Workflow';
import './App.css';

const App = () => {
  const [orderStage, setOrderStage] = useState('orderPlaced');
  const [returnReason, setReturnReason] = useState(''); 

  const handleSuccessfulDelivery = async () => {
    try {
      const response = await axios.get('https://3f096af4-e0bf-4789-be5e-4c859cde5ad7.mock.pstmn.io/delivered');
      if (response.status === 200) {
        console.log('Order delivered successfully!');
      } else {
        console.error('Failed to deliver order:', response.statusText);
      }
    } catch (error) {
      console.error('Error delivering order:', error.message);
    }
  };

  const handleReturn = () => {
    console.log('Initiating return process with reason:', returnReason);
  };

  return (
    <div className="App">
      <h1>Online-Shopping Order Processing</h1>
      <div className="order-stage">
        {orderStage === 'orderPlaced' && (
          <div>
            <p>Order placed. Awaiting shipment.</p>
            <button onClick={() => setOrderStage('shipped')} className="animated-button">
            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
  <span class="text">Ship Order</span>
  <span class="circle"></span>
  <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
</button>
            <br />
            <button onClick={() => setOrderStage('canceled')} className="animated-button2">
            <svg viewBox="0 0 24 24" class="arr-22" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
  <span class="text2">Cancel Order</span>
  <span class="circle2"></span>
  <svg viewBox="0 0 24 24" class="arr-12" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
</button>
          </div>
        )}
        {orderStage === 'shipped' && (
          <div>
            <p>Order shipped. Out for delivery.</p>
            <button onClick={() => setOrderStage('outForDelivery')} className="animated-button">
            <svg viewBox="0 0 24 24" class="arr-2" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
  <span class="text">Out For Delivery</span>
  <span class="circle"></span>
  <svg viewBox="0 0 24 24" class="arr-1" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
</button>
 <br />
<button style={{marginLeft: '37px'}}  onClick={() => setOrderStage('canceled')} className="animated-button2">
            <svg viewBox="0 0 24 24" class="arr-22" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
  <span class="text2">Cancel Order</span>
  <span class="circle2"></span>
  <svg viewBox="0 0 24 24" class="arr-12" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"
    ></path>
  </svg>
</button>     
          </div>
        )}
        {orderStage === 'outForDelivery' && (
          <div>
            <p>Order out for delivery.</p>
            <button id='delbut' onClick={handleSuccessfulDelivery}>Delivered</button>
            <br />
            <br />
            <select value={returnReason} onChange={(e) => setReturnReason(e.target.value)}>
              <option value="">Select reason for return</option>
              {orderReturnData.map((reason, index) => (
                <option key={index} value={reason.action}>{reason.reason}</option>
              ))}
            </select>
            <button onClick={handleReturn} >Initiate Return</button> 
          </div>
        )}
        {orderStage === 'canceled' && (
          <p>Order canceled.</p>
        )}
      </div>
      <Workflow />
    </div>
  );
};

export default App;
