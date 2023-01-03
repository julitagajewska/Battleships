import React, { Component } from 'react'

export default class EnterName extends Component {
    constructor(props) {
        super(props);

        this.state = { value: '' }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

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
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>Nazwa przeciwnika:</label>
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    <button type='submit'>Zapisz</button>
                </form>
            </div>
        );
    }

}
