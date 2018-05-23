import React, { Component } from 'react';

import Auth from './security/auth';

import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import SwipeableViews from 'react-swipeable-views';

import Tabs, { Tab } from 'material-ui/Tabs';
import Icon from 'material-ui/Icon';
import Paper from 'material-ui/Paper';
import AppBar from 'material-ui/AppBar';
import Snackbar from 'material-ui/Snackbar';

import LoginForm from './components/account/LoginForm'
import RegisterForm from './components/account/RegisterForm'
import ChangePasswordForm from './components/account/ChangePasswordForm';

import Profile from './components/profile/Profile'
import Jobs from './components/jobs/Jobs'
import Skills from './components/skills/Skills'
import Projects from './components/projects/Projects'
import Messages from './components/messages/Messages'

import './App.css';

const styles = {
  headline: {
    fontSize: 24,
    paddingTop: 16,
    marginBottom: 12,
    fontWeight: 400,
  },
  slide: {
    padding: 10,
    minHeight: 400
  },
};

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#1e88e5',
      light: '#6ab7ff',
      dark: '#005cb2',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#0d47a1',
      light: '#5472d3',
      dark: '#002171',
      contrastText: '#ffffff',
    },
  },
});

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
      loggedIn: null,
      openMessage: false,
      message: '',
      isLoginFormOpen: false,
      isRegisterFormOpen: false,
      isChangePasswordFormOpen: false
    };
  }

  openLoginForm = () => {
    this.setState({ isLoginFormOpen: true })
  }

  closeLoginForm = () => {
    this.setState({ isLoginFormOpen: false })
  }

  openRegisterForm = () => {
    this.setState({ isRegisterFormOpen: true })
  }

  closeRegisterForm = () => {
    this.setState({ isRegisterFormOpen: false })
  }

  openChangePasswordForm = () => {
    this.setState({ isChangePasswordFormOpen: true })
  }

  closeChangePasswordForm = () => {
    this.setState({ isChangePasswordFormOpen: false })
  }

  showMessage = message => {
    this.setState({ openMessage: true, message: message })
  }

  handleCloseMessage = () => {
    this.setState({ openMessage: false, message: null });
  }

  login = () => {
    this.setState({ loggedIn: true });
  }

  logout = () => {
    Auth.logOut();
    this.setState({ loggedIn: false });
  }

  handleChange = (event, slideIndex) => {
    this.setState({ slideIndex });
  }

  handleChangeIndex = index => {
    this.setState({ slideIndex: index });
  }

  componentDidMount() {
    (async () => {
      if (await Auth.loggedIn()) {
        this.setState({ loggedIn: true })
      } else {
        this.setState({ loggedIn: false });
      }
    })();
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        {!this.state.loggedIn ?
          <div>
            <LoginForm
              open={this.state.isLoginFormOpen}
              closeLoginForm={this.closeLoginForm}
              login={this.login}
              showMessage={this.showMessage}
              openRegisterForm={this.openRegisterForm} />
            <RegisterForm
              open={this.state.isRegisterFormOpen}
              closeRegisterForm={this.closeRegisterForm}
              login={this.login}
              showMessage={this.showMessage} />
          </div> :
          <div>
            <ChangePasswordForm
              open={this.state.isChangePasswordFormOpen}
              closeChangePasswordForm={this.closeChangePasswordForm}
              showMessage={this.showMessage} />
          </div>
        }
        <div className="container-box">
          <Profile
            loggedIn={this.state.loggedIn}
            login={this.login}
            logout={this.logout}
            showMessage={this.showMessage}
            openLoginForm={this.openLoginForm}
            openChangePasswordForm={this.openChangePasswordForm}
            theme={theme} />
          <Paper className="b">
            <AppBar position="static">
              <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
                fullWidth centered>
                <Tab
                  icon={<Icon>timeline</Icon>}
                  value={0}
                />
                <Tab
                  icon={<Icon>build</Icon>}
                  value={1}
                />
                <Tab
                  icon={<Icon>apps</Icon>}
                  value={2}
                />
                <Tab
                  icon={<Icon>message</Icon>}
                  value={3}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews index={this.state.slideIndex} onChangeIndex={this.handleChangeIndex}>
              <div style={styles.slide}>
                <Jobs
                  loggedIn={this.state.loggedIn}
                  showMessage={this.showMessage} />
              </div>
              <div style={styles.slide}>
                <Skills
                  loggedIn={this.state.loggedIn}
                  showMessage={this.showMessage} />
              </div>
              <div style={styles.slide}>
                <Projects
                  loggedIn={this.state.loggedIn}
                  showMessage={this.showMessage} />
              </div>
              <div style={styles.slide}>
                <Messages
                  loggedIn={this.state.loggedIn}
                  showMessage={this.showMessage} />
              </div>
            </SwipeableViews>
          </Paper>
          <Snackbar
            open={this.state.openMessage}
            message={this.state.message}
            onClose={this.handleCloseMessage}
            autoHideDuration={2000}
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
