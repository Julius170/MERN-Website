import Address from 'ipaddr.js';
import React, { useState } from 'react';
import Form from 'react-bootstrap'; 
import { Helmet } from 'react-helmet-async';



export default function ShippingAddressScreen() {

    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [country, setCountry] = useState('');
    
    const submitHandler = (e) => {
        e.preventDefault();
    }
  return (
    <div>
        <Helmet>
        <titke> Shipping Address </titke>
        <h1 className="my-3">Shiping Address</h1>
        <Form> onSubmit={submitHandler}
            <Form.Group className="mb-3" controlId="fullName">
                <Form.Label> Full Name </Form.Label>
                <From.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
                <Form.Label> Address</Form.Label>
                <From.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
                <Form.Label> City</Form.Label>
                <From.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="postalCode">
                <Form.Label> Postal Code</Form.Label>
                <From.Control
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="country">
                <Form.Label> Country</Form.Label>
                <From.Control
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
                />
            </Form.Group>
        </Form>
        </Helmet>
    </div>
  )
}
