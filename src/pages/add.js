import React, {useState} from 'react'
import {Button, FormGroup, Input, Label, Row} from "reactstrap";
import {AiOutlineCheck} from "react-icons/ai";

function Add({page}) {
    const [value, setValue] = useState('');
    const [load, setLoad] = useState(false);

    function addItem() {
        const data = JSON.parse(localStorage.getItem('data')); // get data from localStorage
        const array = [...data]; // clone data
        array.push({id: array.length + 1, name: value, vote: 0}); // add new item
        localStorage.setItem('data', JSON.stringify(array)); // save data to localStorage
        setLoad(true)
        setTimeout(() => {
            page('list');
        }, 1000);
    }

    return <div style={{width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 50}}>
        <div style={{width: 400}}>
            <FormGroup>
                <Label for="otel-name">Otel Adı</Label>
                <Input type={'text'} id="otel-name" style={{height: 50}}
                       onChange={(event) => setValue(event.target.value)}/>
            </FormGroup>
            <Row style={{justifyContent: 'end', margin: '20px 0 0 0'}}>
                <Button color={load ? 'success' : 'primary'} style={{width: '100px'}} onClick={addItem}>{!load ?<span>Ekle</span>  : <span><AiOutlineCheck /> Eklendi</span>}</Button>
            </Row>
        </div>
    </div>
}

export default Add;