import React, { useState, useEffect } from 'react';
import './index.css';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ClearOutlinedIcon from '@material-ui/icons/ClearOutlined';
import { borderRadius } from '@material-ui/system';



const Todo = () => {

    const [text, setText] = useState('');
    const [activeCount, setactiveCount] = useState(0);
    const [list, setList] = useState([]);
    const [filterlist, setFilterList] = useState([]);

    const [editable, setEditable] = useState(false);


    useEffect(() => {
        if (filterlist.length) {
            const updatedActiveCount = filterlist.filter(val => !val.check)
            setactiveCount(updatedActiveCount.length || 0)
        }
    }, [filterlist])


    const textChange = (e) => {
        setText(e.target.value);
    }


    const showResult = e => {
        
        if (text.trim().length > 0) {

            setList([...list, { text: text.trim(), check: false, id: Math.random().toString() }])

            setFilterList([...list, { text: text, check: false, id: Math.random().toString() }])
        }
        else {
            alert('List can\'t\ be empty', 'List name cannot be empty', [
                { text: 'OK', onPress: () => console.log('alert closed') }
            ]);
        }
        setText('');
        e.preventDefault();
    }


    const setCheck = (item) => {
        const newList = list.map(todo => {
            if (todo.id === item.id) {
                // console.log(item.id, todo.id)
                return { ...todo, check: !todo.check }
            } else {
                return { ...todo }
            }
        })
        const checkAllChecked = newList.filter(val => val.check)
        if (checkAllChecked.length === newList.length) {
            setEditable(true)
        }

        setList(newList);
        setFilterList(newList)
    }



    // For deleting a item from list
    const removeList = (id) => {
        const updatedList = list.filter(item => item.id !== id)
        setList(updatedList);
        setFilterList(updatedList)
    }


    // Show all the items in the List
    const allList = () => {
        setList(filterlist);
    }


    // Show all the completed items in the list
    const completeList = () => {
        let listData = filterlist.filter(item => {
            if (item.check) {
                return item
            }
        })
        setList(listData)
    }


    // Show all the active items in the list
    const activeList = () => {
        const listData = filterlist.filter(item => {
            if (!item.check) {
                return item
            }
        })
        setList(listData)
    }



    // Delete all the completed list from original list
    const onComplete = () => {
        const finalData = filterlist.filter(item => {
            if (!item.check) {
                return item
            }
        })
        setList(finalData)
        setFilterList(finalData)
    }


    // To select/unselect all the items in the list
    const selectAll = () => {

        const listUpadte = [...list]
        const updatedList = listUpadte.map(val => {
            return { ...val, check: !editable }
        })
        setList(updatedList);
        setFilterList(updatedList)
        setEditable(!editable)

    }

    const editListText = (e, id) => {
        // console.log(e.target.value)
        e.preventDefault();
        // setText(e.target.value)
        //console.log(e.target.value,id)
        const RemovedList = list.map((item, i) => {
            if (i === id) {
                return { ...item, text: e.target.value }
            }
            else {
                return { ...item }
            }
        })
        setList(RemovedList)
    }
    const fixText = (e) => {

        e.preventDefault();
        setText('')
    }



    return (
        <div className="mainDiv">
            <div className="main_subDiv">
                {filterlist.length > 0 &&
                    <KeyboardArrowDownIcon onClick={selectAll} className="form_button" />
                }
                <div className="form_Div">
                    <form className="input_form" onSubmit={showResult}>
                        <input
                            className="input_field"
                            type="text"
                            placeholder="What needs to be done?"
                            value={text}
                            onChange={textChange}
                        />
                    </form>
                </div>
            </div>



            {
                list.map((item, id) =>
                    <form onSubmit={fixText}>
                        <div className="list_div" key={id}>
                            <input
                                className="input_checkBox"
                                type="checkbox"
                                checked={item.check}
                                onChange={() => setCheck(item)}
                            />

                            {
                                item.check ?

                                    <a className="anchor_tag"> <del><input className="anchor_inputBox" type="text" value={item.text} onChange={(e) => editListText(e, id)} /></del></a>
                                    :
                                    <span ><input className="span_inputBox" type="text" value={item.text} onChange={(e) => editListText(e, id)} /></span>

                            }

                            <ClearOutlinedIcon onClick={() => removeList(item.id)} className="button_list"> </ClearOutlinedIcon>
                            {/* <button type='button' onClick={() => removeList(item.id)} className="button_list">x</button> */}
                        </div>
                    </form>
                )
            }


            {
                filterlist.length > 0 &&
                <div className="footerDiv">
                    <span className="footerspan"> {activeCount} item left</span>
                    <button onClick={allList} className="footerBtn_1" color="black">All</button>
                    <button onClick={activeList} className="footerBtn_1" color="black">Active</button>
                    <button onClick={completeList} className="footerBtn_1" color="black">Completed</button>
                    <button onClick={onComplete} className="footerBtn_2" color="black">Clear Completed</button>
                </div>
            }
        </div >
    );
}
export default Todo;
