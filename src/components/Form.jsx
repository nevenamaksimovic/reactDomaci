import React, { useContext, useState } from 'react'


const FormContext = React.createContext({});

export default function Form({ onSubmit, children }) {
    const [formState, setFormState] = useState({});
    return (
        <FormContext.Provider
            value={{
                formState: formState,
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
                {children}
            </form>
        </FormContext.Provider>
    )
}


export const FormInput = ({ name, className, label, ...rest }) => {
    const { formState, onChange } = useContext(FormContext);
    return (
        <div className='form-group'>
            <label >{label}</label>
            <input
                {...rest}
                className={'form-control' + (className || '')}
                value={formState[name] || ''}
                onChange={e => {
                    onChange(name, e.currentTarget.value);
                }}
            />
        </div>
    )
}


export const FormButton = ({ children, ...rest }) => {

    return (
        <button {...rest} type='submit' className='btn btn-primary form-control mt-2'>{children}</button>
    )
}

export const FormSelect = ({ name, options, label }) => {
    const { formState, onChange } = useContext(FormContext);
    return (
        <div className='form-group'>
            <label >{label}</label>
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
        </div>
    )
}

Form.Input = FormInput;
Form.Button = FormButton;