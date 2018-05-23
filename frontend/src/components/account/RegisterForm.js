import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { compose } from 'redux';

import {
    register
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

class RegisterForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {
                username: '',
                password: '',
                confirmPassword: '',
                ownerPassword: ''
            },
            formErrors: {
                username: '',
                password: '',
                confirmPassword: '',
                ownerPassword: ''
            },
            formValid: false
        }
    }

    reset = () => {
        this.setState({
            formErrors: {
                username: '',
                password: '',
                confirmPassword: '',
                ownerPassword: ''
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

    register = () => {
        const { userDetails } = this.state

        this.props.dispatch(register(userDetails))
            .then(() => {
                this.handleClose();

                this.props.login();
                this.props.showMessage('Successfuly created account.');
            })
            .catch(error => defaultErrorHandler(error, this.customErrorHandler))
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
            case 'confirmPassword':
                fieldValidationErrors.confirmPassword = value.length > 0 ? null : ' is required';
                fieldValidationErrors.confirmPassword = value === this.state.userDetails.password ? null : ' must match password';
                break;
            case 'ownerPassword':
                fieldValidationErrors.ownerPassword = value.length > 0 ? null : ' is required';
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
                this.state.formErrors.password === null &&
                this.state.formErrors.confirmPassword === null &&
                this.state.formErrors.ownerPassword === null
            )
        });
    }

    customErrorHandler = (error) => {
        this.props.showMessage(error.message);
    }

    handleClose = () => {
        this.reset();

        this.props.closeRegisterForm();
    }

    handleMouseDownPassword = event => {
        event.preventDefault();
    }

    handleClickShowPasssword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter' && this.state.formValid) {
            this.register();
        }
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
                    <DialogTitle id="form-dialog-title">Register</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill the form to register a new admin user.
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
                                type="password"
                                onChange={this.inputChangeHandler}
                                onKeyPress={this.handleKeyPress}
                            />
                            <FormHelperText>{this.state.formErrors.password}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.confirmPassword)}>
                            <InputLabel htmlFor="confirmPassword">Confirm Password</InputLabel>
                            <Input
                                name="confirmPassword"
                                type="password"
                                onChange={this.inputChangeHandler}
                                onKeyPress={this.handleKeyPress}
                            />
                            <FormHelperText>{this.state.formErrors.password}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.ownerPassword)}>
                            <InputLabel htmlFor="ownerPassword">Owner Password</InputLabel>
                            <Input
                                name="ownerPassword"
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
                                onClick={this.register}>
                                Register
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

RegisterForm.propTypes = {
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
)(RegisterForm);