import './App.css';

import { Component } from 'react';
import { Route, Routes } from "react-router-dom";
import { AuthProvider } from './components/utils/auth';
import { SoundProvider } from './components/utils/Sound';

import NotLoggedIn from './components/pages/Login/NotLoggedIn';
import PrivateRoutes from './components/utils/PrivateRoutes';
import Logout from './components/pages/Logout/Logout';
import Register from './components/pages/Register/Register';
import ConfirmProfileDelete from './components/pages/Profile/ConfirmProfileDelete';
import ProfileDeleted from './components/pages/Profile/ProfileDeleted';
import Menu from './components/pages/Menu/Menu';
import Profile from './components/pages/Profile/Profile';
import NotFound from './components/pages/NotFound/NotFound';
import Login from './components/pages/Login/Login'
import Background from './components/Background/Background';
import Game from './components/pages/Game/Game';

export default class App extends Component {

  render() {

    return (
      <SoundProvider>
        <AuthProvider>
          <div>
            <div className="component-container">

              <Background />

              <Routes>
                <Route element={<PrivateRoutes />}>
                  <Route path="/" element={<Menu />} />
                  <Route path="/game" element={<Game />} />
                  <Route path="/settings" element={<Menu />} />
                </Route>

                <Route path="/register" element={<Register />} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/login" element={<Login />} />
                <Route path="/notLoggedIn" element={<NotLoggedIn />} />
                <Route path="/confirmProfileDelete" element={< ConfirmProfileDelete />} />
                <Route path="/profileDeleted" element={<ProfileDeleted />} />
                <Route path="*" element={<NotFound />} />
              </Routes>

            </div>
          </div>
        </AuthProvider>
      </SoundProvider>
    );
  }
}
