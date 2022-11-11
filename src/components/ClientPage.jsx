import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function ClientPage() {
    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState('')

    useEffect(() => {
        axios.get('/clients').then(res => {
            setClients(res.data);
        })
    }, [])

    return (
        <div className='container mt-3 bg-light pt-3'>
            <input placeholder='Search' className='form-control mt-2 mb-2' value={search} onChange={e => {
                setSearch(e.currentTarget.value);
            }} />
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        clients
                            .filter(client => {
                                return client.name.includes(search) ||
                                    client.email.includes(search) ||
                                    client.phone.includes(search)
                            })
                            .map(client => {
                                return (
                                    <tr key={client.oid}>
                                        <td>{client.name}</td>
                                        <td>{client.email}</td>
                                        <td>{client.phone}</td>
                                    </tr>
                                )
                            })
                    }
                </tbody>
            </table>
        </div>
    )
}
