import React from 'react'
import Form from './Form'

export default function Login({ onSubmit }) {
    return (
        <div className='bg-white p-3'>
            <Form onSubmit={onSubmit}>
                <Form.Input name='email' type='email' label='Email' required />
                <Form.Input name='password' type='password' label='Password' required />
                <Form.Button>Login</Form.Button>
            </Form>
        </div>
    )
}
