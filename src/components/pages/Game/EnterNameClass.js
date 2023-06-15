import React, { Component } from 'react';
import './EnterName.css';
import { BsCheckLg } from 'react-icons/bs';
import { useSound } from '../../utils/Sound';

export default class EnterName extends Component {
    constructor(props) {
        super(props);

        this.state = { value: '' }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    sound = useSound();

    handleChange = (e) => {
        this.setState({ value: e.target.value });
    }

    handleSubmit = (e) => {
        console.log(this.state.value)
        this.props.setUsername(this.state.value);
        e.preventDefault();
    }

    render() {
        return (
            <div className="upper-layer enter-name-container">
                <h3>NAZWA PRZECIWNIKA</h3>
                <form className="enter-name-form" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <button type='submit' className="enter-name-button" onClick={() => this.sound.playPick()}>
                        <BsCheckLg
                            className='button-icon'
                            size={"20px"} />
                    </button>
                </form>
            </div>
        );
    }

}
