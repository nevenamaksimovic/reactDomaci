import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Form from './Form';

export default function RequestsPage() {
    const [requests, setRequests] = useState([])
    const [clients, setClients] = useState([]);
    const [credits, setCredits] = useState([])

    useEffect(() => {
        axios.get('/clients').then(res => {
            setClients(res.data);
        })
        axios.get('/credits').then(res => {
            setCredits(res.data);
        })
        axios.get('/credit-requests').then(res => {
            setRequests(res.data);
        })
    }, [])

    return (
        <div className='container mt-3 bg-light pt-3'>
            <div className='row'>
                <div className='col-8'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Credit</th>
                                <th>Client</th>
                                <th>Amount</th>
                                <th>Period</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                requests.map(element => {
                                    return (
                                        <tr key={element.id}>
                                            <td>{element.id}</td>
                                            <td>{element.credit.id}</td>
                                            <td>{element.client.email}</td>
                                            <td>{element.amount}</td>
                                            <td>{element.period}</td>
                                            <button
                                                className='btn btn-danger bg-danger m-1'
                                                onClick={async () => {
                                                    await axios.delete('/credit-requests/' + element.id);
                                                    setRequests(prev => {
                                                        return prev.filter(e => e.id !== element.id);
                                                    })
                                                }}
                                            >Delete</button>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>

                </div>
                <div className='col-4'>
                    <h2>Create request</h2>
                    <Form
                        onSubmit={async val => {
                            const res = await axios.post('/credit-requests', val);
                            setRequests(prev => [...prev, {
                                ...res.data,
                                client: clients.find(e => e.id == res.data.client_id),
                                credit: credits.find(e => e.id == res.data.credit_id),
                            }]);
                        }}
                    >
                        <Form.Select label='Client'
                            name='client_id'
                            options={clients.map(c => {
                                return {
                                    value: c.id,
                                    label: c.name
                                }
                            })}
                        />
                        <Form.Select label='Credit'
                            name='credit_id'
                            options={credits.map(c => {
                                return {
                                    value: c.id,
                                    label: c.id
                                }
                            })}
                        />
                        <Form.Input name='amount' type='number' label='Amount' required />
                        <Form.Input name='period' type='number' label='Period' required />
                        <Form.Button>Create</Form.Button>
                    </Form>
                </div>
            </div>
        </div>
    )
}
