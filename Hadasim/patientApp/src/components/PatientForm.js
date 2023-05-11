import React, { useState } from 'react';
import axios from 'axios';
import './PatientForm.css';
import { API_BASE_URL } from '../config';

function PatientForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [identityCard, setIdentityCard] = useState('');
  const [address, setAddress] = useState('');
  const [picture, setPicture] = useState(null);

  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // create form data object to send to server
    const formData = new FormData();
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('identityCard', identityCard);
    formData.append('picture', picture);

    try {
      // send form data to server
      const response = await axios.post(API_BASE_URL + '/api/patients', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      console.log('Patient created:', response.data.picture.data);
    //   setImageUrl(response.data.picture.url);
    //   const blob = new Blob([response.data.picture.data.data], { type: response.data.picture.contentType });
    //   setImageUrl(URL.createObjectURL(blob))
    // setImageUrl(Buffer.from(buffer).toString('base64'));
    // setImageUrl(`data:${response.data.picture.contentType};base64,${response.data.picture.data.data.toString('base64')}`);
    const typedArray = new Uint8Array(response.data.picture.data.data);

    // create a blob from the typed array with the appropriate MIME type
    const blob = new Blob([typedArray], { type: response.data.picture.data.contentType });

    // create a URL object from the blob
    const url = URL.createObjectURL(blob);

    // set the URL as the source of the image
    setImageUrl(url);
    } catch (error) {
      console.log('Error creating patient:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="patient-form">
      <label className="patient-form__label">
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(event) => setFirstName(event.target.value)}
          className="patient-form__input"
        />
      </label>
      <br />
      <label className="patient-form__label">
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(event) => setLastName(event.target.value)}
          className="patient-form__input"
        />
      </label>
      <br />
      <label className="patient-form__label">
        Identity Card:
        <input
          type="text"
          value={identityCard}
          onChange={(event) => setIdentityCard(event.target.value)}
          className="patient-form__input"
        />
      </label>
      <br />
      <label className="patient-form__label">
        Picture:
        <input
          type="file"
          onChange={(event) => setPicture(event.target.files[0])}
          className="patient-form__file-input"
        />
      </label>
      <br />
      <button type="submit" className="patient-form__submit-btn">Create Patient</button>
      {imageUrl && <img src={`data:image/png;base64,${imageUrl}`} alt="Patient" />}
    </form>
  );
}

export default PatientForm;
