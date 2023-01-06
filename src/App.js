import './App.css';
import Game from './components/pages/Game/GameClass';
import Header from './components/header/Header'
import ReusableButton from './components/reusable/ReusableButton';
import { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import Menu from './components/pages/Menu/Menu';
import Profile from './components/pages/Profile/Profile';
import ReusableSidebar from './components/reusable/Sidebar';
import Info from './components/pages/Info/Info'
import NotFound from './components/pages/NotFound/NotFound';
import Login from './components/pages/Login/Login'
import Background from './components/Background/Background';
import { AuthProvider } from './components/utils/auth';


export default class App extends Component {

  constructor() {
    super();

    this.state = {
      startInfoAnimation: false,
      startProfileAnimation: false,
      backgroundFadeDown: false,
    }

    this.toggleInfoVisibility = this.toggleInfoVisibility.bind(this);
    this.toggleProfileVisibility = this.toggleProfileVisibility.bind(this);

  }

  toggleInfoVisibility() {
    let visibility = this.state.startInfoAnimation === true ? false : true;
    this.setState((prevState) => ({
      startInfoAnimation: visibility
    }));
  }

  toggleProfileVisibility() {
    let visibility = this.state.startProfileAnimation === true ? false : true;
    this.setState((prevState) => ({
      startProfileAnimation: visibility
    }));
  }

  toggleBackgroundFade() {
    let fade = this.state.backgroundFadeDown === true ? false : true;
    this.setState((prevState) => ({
      backgroundFadeDown: fade
    }));
  }

  render() {
    return (
      <AuthProvider>
        <div>
          <div className="container">
            <Background backgroundToggle={this.state.backgroundFadeDown} />

            <ReusableSidebar type={"left"} startInfoAnimation={this.state.startInfoAnimation} toggle={this.toggleInfoVisibility}
              children={
                <>
                  <button onClick={() => this.toggleBackgroundFade()}>hehe</button>
                  <Info />
                </>}>
            </ReusableSidebar>

            <Routes>
              <Route path="/" element={<Menu
                type={"right"}
                startInfoAnimation={this.state.startProfileAnimation}
                toggle={this.toggleProfileVisibility}
                children={<Profile />} />} />
              <Route path="/game" element={<Game />} />
              <Route path="/settings" element={<Menu backgroundToggle={this.state.backgroundFadeDown} />} />
              <Route path="/register" element={<Menu />} />
              <Route path="/login" element={<Login backgroundToggle={this.toggleBackgroundFade} />} />
              <Route path="/logout" element={<Menu backgroundToggle={this.toggleBackgroundFade} />} />
              <Route path="*" element={<NotFound />} />
            </Routes>

            <ReusableSidebar type={"right"} startInfoAnimation={this.state.startProfileAnimation} toggle={this.toggleProfileVisibility}
              children={<Profile />}>
            </ReusableSidebar>
          </div>
        </div>
      </AuthProvider>
    );
  }
}
