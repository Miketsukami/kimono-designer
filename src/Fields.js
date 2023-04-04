import { useState } from 'react';

import { SketchPicker } from 'react-color';
import { Form, InputGroup, Button } from 'react-bootstrap';


export function ColorPicker ({ defaultValue, onChange }) {
    const [color, setColor] = useState(defaultValue || '#ffffff')
    const [visible, setVisible] = useState(false)

    const handleClick = () => setVisible(!visible)
    const handleClose = () => setVisible(false)

    const handleChange = (color) => {
        setColor(color.hex)
        if (onChange) {
            onChange(color.hex)
        }
    }

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
    return (
        <Form.Group className={ header ? 'my-2' : '' }>
            <Form.Label className={ header ? 'fw-bold' : '' }>
                { header || label }
                {
                    withCheckbox ? (
                        <Form.Check type='checkbox' inline className='ms-2' defaultChecked={defaultChecked} onChange={(e) => onChange(e.target.checked)} />
                    ) : null
                }
            </Form.Label>
            { children }
        </Form.Group>
    )
}
