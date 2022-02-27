import React, { useEffect, useLayoutEffect, useState } from 'react';
import { Button, Card, CardBody, Col, Input, Row } from "reactstrap";
import '../pages/index.css';
import DeleteModal from "./delete-modal";
import { BsPlusLg } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";

function List({ page, data, change, optionChange }) {
    const [display, setDisplay] = useState('none');
    const [cardId, setCardId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [item, setItem] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(4);
    const [pn, setPn] = useState([]);

    useEffect(() => {
        pageData();
        pageNumber();
    }, [data, change]);

    useEffect(() => {
        pn.length === 1 && setCurrentPage(1);
    }, [pn]);

    function upVote(id) {
        const data = JSON.parse(localStorage.getItem('data'));
        const arr = [...data]
        arr[id].vote += 1;
        localStorage.setItem('data', JSON.stringify(arr));
    }

    function downVote(id) {
        const data = JSON.parse(localStorage.getItem('data'));
        const arr = [...data]
        arr[id].vote -= 1;
        localStorage.setItem('data', JSON.stringify(arr));
    }

    function pageData() {
        const indexOfLastVote = currentPage * perPage;
        const indexOfFirstVote = indexOfLastVote - perPage;
        return data.slice(indexOfFirstVote, indexOfLastVote);
    }

    const pageNumber = () => {
        const d = [];
        for (let i = 1; i <= Math.ceil(data.length / perPage); i++) {
            d.push(i);
        }
        setPn(d);
    }

    function changePageNumber(number) {
        setCurrentPage(number);
    }

    return <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <div style={{ width: 400, height: 'auto' }}>
            <Row style={{ marginTop: 10 }}>
                <Col md={3}>
                    <Button outline color="primary" onClick={() => page('add')} style={{ height: '43px' }}> <BsPlusLg /> </Button>
                </Col>
                <Col md={9}>
                    <span style={{ fontSize: 26, fontWeight: 'bold', marginLeft: '-30px' }}>OTEL EKLE</span>
                </Col>
            </Row>
            <Row style={{ margin: '20px 0 0 0' }}>
                <Input type={'select'} style={{ width: '170px' }} onChange={(val) => optionChange(val.target.value)}>
                    <option>Sıralama</option>
                    <option value={'Azalan'}>Puan (Azalan)</option>
                    <option value={'Artan'}>Puan (Artan)</option>
                </Input>
            </Row>
            {pageData().map((item, index) => {
                return <Card key={index} style={{ marginTop: 10 }} onMouseEnter={() => {
                    setDisplay('block')
                    setCardId(item.id)
                }} onMouseLeave={() => {
                    setDisplay('none')
                    setCardId(item.id)
                }}>
                    {
                        cardId === item.id &&
                        <div style={{ display: display }}
                            className={'delete_vote'}
                            onClick={() => {
                                setIsOpen(true);
                                setItem(item)
                            }}><i><AiOutlineClose style={{ marginLeft: '-0.5px', marginTop: '-3px' }} /> </i></div>
                    }
                    <Row style={{ margin: '10px 0' }}>
                        <Col md={3}>
                            <img
                                src={'https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/hotel.png'}
                                alt={item.name} style={{ width: '112%', height: '94px' }} />
                        </Col>
                        <Col md={9} style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontWeight: 'bold' }}>{item.name}</span>
                            <div style={{ backgroundColor: 'rgba(220,220,220,0.2)', margin: '5px 0', width: 140, paddingLeft: 5 }}>
                                <span style={{ color: 'rgba(0,128,0,0.5)' }}>{item.vote} Puan</span>
                            </div>
                            <Row style={{ margin: 0, justifyContent: 'space-between' }}>
                                <Button color={'primary'} outline style={{ width: '40%' }} onClick={() => {
                                    change()
                                    upVote(index)
                                }}>Puan Arttır</Button>
                                <Button color={'primary'} outline style={{ width: '40%' }} onClick={() => {
                                    change()
                                    downVote(index)
                                }}>Puan Azalt</Button>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            })}
            <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
               {pn && pn.length > 1 && <Button outline disabled={currentPage === 1 ? true : false} color={'primary'} style={{ marginRight: '5px' }} onClick={() => {setCurrentPage(currentPage - 1)}}><span>{'<'}</span></Button>} 
                {pn && pn.length > 1 && pn.map((number, index) => {
                    return <>
                        <Button
                            outline={number === currentPage ? false : true}
                            color={'primary'}
                            style={{ marginRight: '5px' }}
                            key={`key_$(index)`}
                            id={number}
                            onClick={() => changePageNumber(number)}
                        >
                            {number}
                        </Button>
                    </>
                })}
              {pn && pn.length > 1 && <Button outline disabled={currentPage===pn.length -1 ? false : true } color={'primary'} style={{ marginLeft: '0px' }} onClick={() => {setCurrentPage(currentPage + 1)}}><span>{'>'}</span></Button>}  
            </div>
        </div>
        <DeleteModal isOpen={isOpen} data={item} close={() => setIsOpen(!isOpen)} change={change} />
    </div>
}

export default List;