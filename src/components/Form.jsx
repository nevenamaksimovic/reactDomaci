import React, { useContext, useState } from 'react'


const FormContext = React.createContext({});

export default function Form({ onSubmit }) {
    const [formState, setFormState] = useState({});
    return (
        <FormContext.Provider
            value={{
                state: formState,
                onChange: (field, value) => setFormState(prev => {
                    return {
                        ...prev,
                        [field]: value
                    }
                })
            }}
        >
            <form onSubmit={e => {
                e.preventDefault();
                onSubmit(formState);
            }}>

            </form>
        </FormContext.Provider>
    )
}


export const FormInput = ({ name, className, ...rest }) => {
    const { formState, onChange } = useContext(FormContext);
    return (
        <input
            {...rest}
            className={'form-control' + (className || '')}
            value={formState[name] || ''}
            onChange={e => {
                onChange(name, e.currentTarget.value);
            }}
        />
    )
}


export const FormButton = ({ children, ...rest }) => {

    return (
        <button {...rest} type='submit' className='btn btn-primary form-control mt-2'>{children}</button>
    )
}

export const FormSelect = ({ name, options }) => {
    const { formState, onChange } = useContext(FormContext);
    return (
        <select className='form-control' value={formState[name] || 0}
            onChange={e => {
                onChange(name, e.currentTarget.value);
            }}>
            {
                options.map(element => {
                    return (
                        <option value={element.value}>{element.label}</option>
                    )
                })
            }
        </select>
    )
}

Form.Input = FormInput;
Form.Button = FormButton;