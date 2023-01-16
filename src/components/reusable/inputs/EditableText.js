import React, { useState, useEffect } from 'react';
import './EditableText.css';
import { AiTwotoneEdit } from 'react-icons/ai';
import { RxEyeOpen } from 'react-icons/rx';
import { RxEyeClosed } from 'react-icons/rx';
import { BsCheckLg } from 'react-icons/bs';
import { useAuth } from '../../utils/auth';
import axios, { editUser, checkUsername } from '../../../api/axios';
import UsernameInput from './UsernameInput';
import MailInput from './MailInput';
import PasswordInput from './PasswordInput';
import ErrorMessage from '../messages/ErrorMessage';
import IconOnlyButton from '../buttons/IconOnlyButton';
import { useSound } from '../../utils/Sound';

export default function EditableText(props) {

    const auth = useAuth();
    const sound = useSound();

    const [toggle, setToggle] = useState(true);

    let eyeIconOpen = <RxEyeOpen className="icon eye" size={"1.25rem"} onClick={() => { setEyeIcon(eyeIconClosed) }} />
    let eyeIconClosed = <RxEyeClosed className="icon eye" size={"1.25rem"} onClick={() => { setEyeIcon(eyeIconOpen) }} />

    const [eyeIcon, setEyeIcon] = useState(toggle === true ? eyeIconOpen : eyeIconClosed);
    const [passwordDisplay, setPasswordDisplay] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [value, setValue] = useState(props.value);
    const [valid, setValid] = useState(true);
    const [errors, setErrors] = useState([]);
    const [usernameTaken, setUsernameTaken] = useState([]);
    const [focus, setFocus] = useState(false);

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

        if (props.id === 'username') {
            if (editedUser.username !== value) {
                let result = await checkUsername(value);
                if (result === false) {
                    setUsernameTaken([
                        <p key="username-taken-error">Podana nazwa użytkownika jest zajęta</p>
                    ])
                    setValid(false);
                    return;
                }
            }
        }

        editedUser[props.id] = value;

        await editUser(editedUser);
        auth.updateUser(editedUser);
        setEditMode(!editMode);
        props.trigger();
    }

    if (editMode === true) {
        return (
            <div className="editable-text-container">
                <div className="label-value-container">
                    <form className="edit-form-container" onSubmit={handleSubmit}>
                        <label>{props.label}</label>
                        {props.id === 'username' ?
                            <UsernameInput
                                size="small"
                                placeholder={props.value}
                                setUsernameTaken={setUsernameTaken}
                                setFocus={setFocus}
                                setValue={setValue}
                                setValid={setValid}
                                setErrors={setErrors}
                                required={false}
                            />
                            : <></>}
                        {props.id === 'mail' ?
                            <MailInput
                                size="small"
                                placeholder={props.value}
                                setFocus={setFocus}
                                setValue={setValue}
                                setValid={setValid}
                                setErrors={setErrors}
                                required={false} />
                            : <></>}
                        {props.id === 'password' ?
                            <PasswordInput
                                size="small"
                                placeholder={props.value}
                                setFocus={setFocus}
                                setValue={setValue}
                                setValid={setValid}
                                setErrors={setErrors}
                                required={false} />
                            : <></>}
                        <IconOnlyButton
                            Icon={BsCheckLg}
                            color={"var(--gradient-1)"}
                            disabled={!valid}
                            onClick={(e) => { sound.playPick(); handleSubmit(e); }}
                            oval={"oval"}
                        />
                    </form>
                </div>
                {
                    focus && !valid ?
                        <div>
                            <ErrorMessage status={false} message={
                                <div>
                                    <ul>
                                        {errors.map((error) => {
                                            return error
                                        })}
                                    </ul>
                                </div>}
                            />
                        </div>
                        : <></>
                }
                {
                    usernameTaken !== [] ?
                        <div>
                            <ErrorMessage status={false} message={
                                <div>
                                    <ul>
                                        {usernameTaken.map((error) => {
                                            return error
                                        })}
                                    </ul>
                                </div>}
                            />
                        </div> : <></>
                }
            </div>

        );
    }

    return (
        <div className="label-value-container">
            <label>{props.label}</label>
            {props.label === "Hasło" ?
                <p className="user-data-p">{passwordDisplay}</p> :
                <p className="user-data-p">{auth.user[props.id]}</p>}
            <AiTwotoneEdit className="icon" size={"1.25rem"} onClick={() => { sound.playPick(); setEditMode(!editMode) }} />
            {props.label === "Hasło" ? eyeIcon : <></>}
        </div>
    )
}
