import { useState, useEffect } from 'react';

import { SketchPicker } from 'react-color';
import { Form, InputGroup, Button } from 'react-bootstrap';


export function ColorPicker ({ defaultValue, onChange }) {
    const [color, setColor] = useState(defaultValue || '#ffffff')
    const [visible, setVisible] = useState(false)

    const handleClick = () => setVisible(!visible)
    const handleClose = () => setVisible(false)

    const handleChange = (event) => {
        setColor(event.hex)
        if (onChange) {
            onChange(event.hex)
        }
    }

    useEffect(() => {
        setColor(defaultValue)
    }, [defaultValue])

    return (
        <div className='ColorPicker'>
            <InputGroup onClick={ handleClick }>
                <Button variant='outline-secondary' className='px-3' style={{background: color}} />
                <Form.Control value={color} readOnly />
            </InputGroup>
            {
                visible ? (
                    <div className='position-absolute' style={{zIndex: 3}}>
                        <div onClick={ handleClose } className='position-fixed top-0 bottom-0 start-0 end-0' />
                        <SketchPicker color={ color } onChange={ handleChange } disableAlpha />
                    </div> 
                ) : null
            }
        </div>
    )
}


export function Field ({ label, header, withCheckbox, defaultChecked, onChange, children }) {
    const [checked, setChecked] = useState(defaultChecked)
    
    const handleChange = (event) => {
        setChecked(event.target.checked)
        onChange(checked)
    }

    useEffect(() => {
        setChecked(defaultChecked)
    }, [defaultChecked])

    return (
        <Form.Group className={ header ? 'my-2' : '' }>
            <Form.Label className={ header ? 'fw-bold' : '' }>
                { header || label }
                {
                    withCheckbox ? (
                        <Form.Check type='checkbox' inline className='ms-2' checked={ checked } onChange={ handleChange } />
                    ) : null
                }
            </Form.Label>
            { children }
        </Form.Group>
    )
}
