import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux';

import {
    login
} from '../../store/account/actions'

import { defaultErrorHandler } from '../../handlers/errorHandlers';

import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    withMobileDialog
} from 'material-ui/Dialog';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Visibility from 'material-ui-icons/Visibility';
import VisibilityOff from 'material-ui-icons/VisibilityOff';
import { CircularProgress } from 'material-ui/Progress';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {
                username: '',
                password: ''
            },
            formErrors: {
                username: '',
                password: ''
            },
            formValid: false
        }
    }

    reset = () => {
        this.setState({
            formErrors: {
                username: '',
                password: ''
            },
            formValid: false
        })
    }

    inputChangeHandler = (event) => {
        let { userDetails } = this.state;
        const target = event.target;

        userDetails[target.name] = target.value;

        this.setState({ userDetails }, () => { this.validateField(target.name, target.value) });
    }

    login = () => {
        const { userDetails } = this.state

        this.props.dispatch(login(userDetails))
            .then(() => {
                this.handleClose();

                this.props.login();
                this.props.showMessage('Successfuly logged in.');
            })
            .catch(error => defaultErrorHandler(error, this.customErrorHandler))
    }

    customErrorHandler = (error) => {
        this.props.showMessage(error.error_description);
    }

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        switch (fieldName) {
            case 'username':
                fieldValidationErrors.username = value.length > 0 ? null : ' is required';
                break;
            case 'password':
                fieldValidationErrors.password = value.length > 0 ? null : ' is required';
                break;
            default:
                break;
        }
        this.setState({
            formErrors: fieldValidationErrors
        }, this.validateForm);
    }

    validateForm() {
        this.setState({
            formValid: (
                this.state.formErrors.username === null &&
                this.state.formErrors.password === null
            )
        });
    }

    handleClose = () => {
        this.reset();

        this.props.closeLoginForm();
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    }

    handleClickShowPasssword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && this.state.formValid) {
            this.login();
        }
    }

    openRegisterForm = () => {
        this.props.closeLoginForm();

        this.props.openRegisterForm();
    }

    render() {
        const { fullScreen, isProcessing } = this.props;

        return (
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.handleClose}
                    fullScreen={fullScreen}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Login</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter username and password to unlock admin functions.
                        </DialogContentText>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.username)}>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input 
                                autoFocus 
                                name="username" 
                                onChange={this.inputChangeHandler}
                                onKeyPress={this.handleKeyPress} />
                            <FormHelperText>{this.state.formErrors.username}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.password)}>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input
                                name="password"
                                type={this.state.showPassword ? 'text' : 'password'}
                                onChange={this.inputChangeHandler}
                                onKeyPress={this.handleKeyPress}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={this.handleClickShowPasssword}
                                            onMouseDown={this.handleMouseDownPassword}
                                        >
                                            {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                            <FormHelperText>{this.state.formErrors.password}</FormHelperText>
                        </FormControl>
                        <DialogContentText>
                            <Button onClick={this.openRegisterForm} color="primary">Register</Button> If you are the owner and wish to create a new account.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <div style={{ position: 'relative' }}>
                            <Button
                                 variant="raised"
                                color="primary"
                                disabled={isProcessing || !this.state.formValid}
                                onClick={this.login}>
                                Login
                        </Button>
                            {isProcessing && <CircularProgress size={24} style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: -12,
                                marginLeft: -12
                            }} />}
                        </div>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

LoginForm.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const props = {
        isProcessing: state.account.isProcessing
    }

    return props
}

export default compose(
    connect(mapStateToProps),
    withMobileDialog()
)(LoginForm);