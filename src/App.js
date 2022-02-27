import React, {useEffect, useState} from 'react';
import List from "./pages/list";
import Add from "./pages/add";

function App() {
    const [page, setPage] = useState('list');
    const [data, setData] = useState([]);
    const [buttonChange, setButtonChange] = useState(false);
    const [option, setOption] = useState('');

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        if (data === null) {
            localStorage.setItem('data', JSON.stringify([]));
        }
    }, [])

    useEffect(() => {
        if (page === 'list') {
            const data = JSON.parse(localStorage.getItem('data'));
            setData(data);
        }
    }, [page]);

    useEffect(() => {
        const datas = JSON.parse(localStorage.getItem('data'));
        setData(datas.sort((a, b) => (a.vote > b.vote ? -1 : 1)));
        setTimeout(() => {
            localStorage.setItem('data', JSON.stringify(datas));
        }, 500)
    }, [buttonChange]);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('data'));
        if (option === 'Azalan') {
            setData(data.sort((a, b) => (a.vote > b.vote ? -1 : 1)));
        } else if (option === 'Artan') {
            setData(data.sort((a, b) => (a.vote > b.vote ? 1 : -1)));
        }
    }, [option])

    function changeState(state) {
        if (state === 'list') {
            setPage('list');
        } else {
            setPage('add');
        }
    }

    function btnChange() {
        setButtonChange(!buttonChange);
    }

    function changeOption(name) {
        setOption(name)
    }

    return <>
        {page === 'list' ?
            <List page={changeState} data={data} change={() => btnChange()} optionChange={changeOption}/> :
            <Add page={changeState}/>}
    </>
}

export default App;
