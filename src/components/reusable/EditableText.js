import React, { useState, useEffect } from 'react';
import './EditableText.css';
import { AiTwotoneEdit } from 'react-icons/ai';
import { RxEyeOpen } from 'react-icons/rx';
import { RxEyeClosed } from 'react-icons/rx';
import { BsCheckLg } from 'react-icons/bs';
import { useAuth } from '../utils/auth';
import axios, { editUser } from '../../api/axios';

export default function EditableText(props) {

    const auth = useAuth();

    const [toggle, setToggle] = useState(true);

    let eyeIconOpen = <RxEyeOpen className="icon eye" size={"1.25rem"} onClick={() => setEyeIcon(eyeIconClosed)} />
    let eyeIconClosed = <RxEyeClosed className="icon eye" size={"1.25rem"} onClick={() => setEyeIcon(eyeIconOpen)} />

    const [eyeIcon, setEyeIcon] = useState(toggle === true ? eyeIconOpen : eyeIconClosed);
    const [passwordDisplay, setPasswordDisplay] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(props.value);
    const [isValid, setIsValid] = useState(false);
    const [user, setUser] = useState(auth.user);

    console.log(value)

    useEffect(() => {
        setToggle(!toggle)
    }, [eyeIcon])

    useEffect(() => {
        if (props.label === "Hasło" && toggle === false) {
            let passwordCharacters = auth.user[props.id].split('');
            let password = '';
            passwordCharacters.forEach(element => {
                password = password + '*';
            });

            setPasswordDisplay(password);
        } else if (props.label === "Hasło" && toggle === true) {
            setPasswordDisplay(auth.user[props.id]);
        }
    }, [toggle, editMode])

    const handleSubmit = async (e) => {
        e.preventDefault();
        let editedUser = auth.user;
        editedUser[props.id] = value;

        await editUser(editedUser);
        auth.updateUser(editedUser);
        setEditMode(!editMode);
        props.trigger();
    }

    if (editMode === true) {
        return (
            <div className="label-value-container">
                <form onSubmit={handleSubmit}>
                    <label>{props.label}</label>
                    <input type="text" placeholder={props.value} onChange={(e) => setValue(e.target.value)} />
                    <button type='submit'><BsCheckLg className="icon" size={"1.25rem"} /></button>
                </form>
            </div>
        );
    }

    return (
        <div className="label-value-container">
            <label>{props.label}</label>
            {props.label === "Hasło" ?
                <p className="user-data-p">{passwordDisplay}</p> :
                <p className="user-data-p">{auth.user[props.id]}</p>}
            <AiTwotoneEdit className="icon" size={"1.25rem"} onClick={() => setEditMode(!editMode)} />
            {props.label === "Hasło" ? eyeIcon : <></>}
        </div>
    )
}
