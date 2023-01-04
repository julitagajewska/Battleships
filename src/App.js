import './App.css';
import Game from './components/pages/Game/GameClass';
import Header from './components/header/Header'
import ReusableButton from './components/reusable/ReusableButton';
import { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import Menu from './components/pages/Menu/Menu';
import Info from './components/pages/Info/Info';
import Profile from './components/pages/Profile/Profile';


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      isInfoVisible: false
    }

    this.toggleInfoVisibility = this.toggleInfoVisibility.bind(this);
  }

  toggleInfoVisibility() {

    let visibility = this.state.isInfoVisible ? false : true;

    this.setState((prevState) => ({
      isInfoVisible: visibility
    }));
  }

  render() {
    return (
      <div className="container">
        <div className="header__container">
          <Header toggleInfoVisibility={this.toggleInfoVisibility} />
        </div>

        <div className="main-content__container">
          <Routes>
            <Route path="/" element={<Menu />} />
            <Route path="/info" element={<Info />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </div>

      </div>
    );
  }
}
