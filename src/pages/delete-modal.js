import React, {useEffect} from 'react';
import {Button, Modal, ModalBody, Row} from "reactstrap";

function DeleteModal({isOpen, data, close, change}) {

    function deleteOtel(id) {
        const dataLocal = JSON.parse(localStorage.getItem('data'));
        dataLocal.map((item, index) => {
            if (item.id === id) {
                dataLocal.splice(index, 1);
            }
        })
        localStorage.setItem('data', JSON.stringify(dataLocal));
        change();
        close()
    }

    return <Modal centered isOpen={isOpen} toggle={() => close()}>
        <ModalBody>
            <h3>Oteli Sil</h3>
            <span>{data.name}'i silmek istediğinizden emin misiniz?</span>
            <Row style={{margin: '10px 0 0 0', justifyContent: 'space-between', padding: '0 20px'}}>
                <Button style={{width: '40%'}} color={'primary'}
                        onClick={() => {
                            deleteOtel(data.id)
                        }}>Oteli Sil</Button>
                <Button style={{width: '40%'}} outline color={'primary'} onClick={() => close()}>Vazgeç</Button>
            </Row>
        </ModalBody>
    </Modal>
}

export default DeleteModal;