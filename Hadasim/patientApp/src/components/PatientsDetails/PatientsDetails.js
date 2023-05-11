import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './PatientsDetails.css';
import { API_BASE_URL } from '../../config';

const PatientsDetails = () => {
    const [data, setData] = useState([]);
    const [nonVaccinatedCounter, setNonVaccinatedCounter] = useState(-1);

    useEffect(() => {
        const fetchData = async () => {
            const [sickPatients, nonVaccinated] = await Promise.all([
                axios.get(API_BASE_URL + '/api/patients/sick-from-last-month'),
                axios.get(API_BASE_URL + '/api/patients/non-vaccinated'),
            ])
            setData(sickPatients.data);
            setNonVaccinatedCounter(nonVaccinated.data.length)
        };

        fetchData();
    }, []);

    return (
        <>
            <h5>count of non vaccinated patients: {nonVaccinatedCounter}</h5>
            <h2>patients found positive during the last month:</h2>
            <table>
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Positive Result Date</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.coronaVirusDetails?.positiveResultDate || "no information"}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};

export default PatientsDetails;
