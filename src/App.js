import { useState } from 'react';

import { Container, Row, Col, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { BsFiletypeJson, BsFiletypeSvg, BsFillCloudUploadFill, BsFillCloudDownloadFill } from "react-icons/bs";

import { Background, Haneri, Kimono, Obi, Hakama, Haori } from './Clothing';
import { Field, ColorPicker } from './Fields';


export default function App() {
    const defaultValues = {
        background: {visible: false, color: '#ffffff'},
        haneri: {color: '#ffffff'},
        obi: {color: '#ffffff'},
        kimono: {colorLeft: '#ffffff', colorRight: '#ffffff'},
        hakama: {visible: false, color: '#ffffff'},
        haori: {visible: false, color: '#ffffff'}
    }  

    const [background, setBackground] = useState(defaultValues.background)
    const [haneri, setHaneri] = useState(defaultValues.haneri)
    const [obi, setObi] = useState(defaultValues.obi)
    const [kimono, setKimono] = useState(defaultValues.kimono)
    const [hakama, setHakama] = useState(defaultValues.hakama)
    const [haori, setHaori] = useState(defaultValues.haori)

    const download = (name, content, mimetype='application/octet-stream') => {
        const file = new Blob([content], {type: mimetype})

        const downloadLink = document.createElement('a')
        downloadLink.href = URL.createObjectURL(file)
        downloadLink.download = name
        downloadLink.click()
    }

    const saveImage = () => {
        const srcSvg = document.querySelector('#kimono-preview')

        const dstSvg = document.createElement('svg')
        dstSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
        dstSvg.setAttribute('xmlns:svg', 'http://www.w3.org/2000/svg')
        dstSvg.setAttribute('height', srcSvg.attributes.height.value)
        dstSvg.setAttribute('width', srcSvg.attributes.width.value)
        dstSvg.setAttribute('viewBox', srcSvg.attributes.viewBox.value)
        dstSvg.innerHTML = srcSvg.innerHTML

        download('kimono.svg', dstSvg.outerHTML, 'image/svg+xml')
    }

    const dumpJson = () => {
        const data = {
            background: background, 
            haneri: haneri, 
            obi: obi, 
            kimono: kimono, 
            hakama: hakama, 
            haori: haori
        }

        download('kimono.json', JSON.stringify(data, null, 4), 'application/json')
    }

    const loadJson = () => {
        const element = document.createElement('input')
        element.type = 'file'
        element.click()
        element.onchange = (e) => {
            const reader=new FileReader();
            reader.onload = () => {
                try {
                    const config = (jsonData => Object.fromEntries(
                        Object.entries(defaultValues).map(([key, defaultValue]) => {
                            const updateValue = (jsonSection => Object.fromEntries(
                                Object.entries(jsonSection).filter(([k]) => k in defaultValue)
                            ))(jsonData[key] || {})

                            return [key, {...defaultValue, ...updateValue}]
                        })
                    ))(JSON.parse(reader.result))


                    setBackground(config.background)
                    setHaneri(config.haneri)
                    setKimono(config.kimono)
                    setObi(config.obi)
                    setHakama(config.hakama)
                    setHaori(config.haori)
                } catch (error) {
                    alert('Error: Could\'nt parse this file as JSON')
                }
            }

            reader.readAsText(e.target.files[0]);
        }
    }

    return (
        <div className='App d-flex vh-100'>
            <Container className='my-4 px-0 bg-white rounded d-flex flex-column'>
                <Navbar bg='dark' variant='dark' className='rounded-top'>
                    <Container className='d-flex'>
                        <Navbar.Brand href='#'>Kimono Designer</Navbar.Brand>
                        <Nav className='ms-auto'>
                            <NavDropdown title={<><BsFiletypeSvg/> SVG</>}>
                                <NavDropdown.Item href="#" onClick={saveImage}><BsFillCloudDownloadFill /> Save</NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title={<><BsFiletypeJson/> JSON</>}>
                                <NavDropdown.Item href="#" onClick={loadJson}><BsFillCloudUploadFill /> Load</NavDropdown.Item>
                                <NavDropdown.Item href="#" onClick={dumpJson}><BsFillCloudDownloadFill /> Save</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Container>
                </Navbar>
                <Container className='flex-grow-1 d-flex flex-column overflow-auto'>
                    <Row className='flex-grow-1 my-4 mx-2'>
                        <Col className='d-flex mx-2'>
                            <div className='position-relative flex-grow-1'>
                                <svg id='kimono-preview' viewBox='0 0 220 320' width='220' height='320' className='position-absolute top-0 start-0 h-100 w-100'>
                                    <Background {...background} />
                                    <g stroke='black' strokeWidth='2'>
                                        <Haneri {...haneri} />
                                        <Kimono {...kimono} />
                                        <Obi {...obi} />
                                        <Hakama {...hakama} />
                                        <Haori {...haori} />
                                    </g>
                                </svg>
                            </div>
                        </Col>
                        <Col className='mx-2'>
                            <Field header='Haneri'>
                                <ColorPicker defaultValue={haneri.color} onChange={(v) => setHaneri({...haneri, color: v})}/>
                            </Field>
                            <Field header='Kimono'>
                                <Row>
                                    <Col>
                                        <Field label='Left'>
                                            <ColorPicker defaultValue={kimono.colorLeft} onChange={(v) => setKimono({...kimono, colorLeft: v})} />
                                        </Field>
                                    </Col>
                                    <Col>
                                        <Field label='Right'>
                                            <ColorPicker defaultValue={kimono.colorRight} onChange={(v) => setKimono({...kimono, colorRight: v})} />
                                        </Field>
                                    </Col>
                                </Row>
                            </Field>
                            <Field header='Obi'>
                                <ColorPicker defaultValue={obi.color} onChange={(v) => setObi({ ...obi, color: v})} />
                            </Field>
                            <Field header='Hakama' withCheckbox defaultChecked={hakama.visible} onChange={(v) => setHakama({...hakama, visible: v})}>
                                <ColorPicker defaultValue={hakama.color} onChange={(v) => setHakama({...hakama, color: v})} />
                            </Field>
                            <Field header='Haori' withCheckbox defaultChecked={haori.visible} onChange={(v) => setHaori({...haori, visible: v})}>
                                <ColorPicker defaultValue={haori.color} onChange={(v) => setHaori({...haori, color: v})} />
                            </Field>
                            <Field header='Background' withCheckbox defaultChecked={background.visible} onChange={(v) => setBackground({...background, visible: v})}>
                                <ColorPicker defaultValue={background.color} onChange={(v) => setBackground({...background, color: v})} />
                            </Field>
                        </Col>
                    </Row>
                </Container>
            </Container>
        </div>
    );
}
