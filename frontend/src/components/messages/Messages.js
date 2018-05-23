import React, { Component } from 'react';

import ReCAPTCHA from 'react-google-recaptcha';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    getMessages,
    saveMessage
} from '../../store/messages/actions'

import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Card, { CardHeader, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

import FetchControl from '../shared/FetchControl';
import EmptyList from '../shared/EmptyList';

import MessageDetails from './MessageDetails';
import MessageDelete from './MessageDelete';

let captcha;

class Messages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {},
            currentMessage: {},
            isMessageDetailsOpen: false,
            isMessageDeleteOpen: false,
            formErrors: {
                name: '',
                email: '',
                message: ''
            },
            formValid: false
        };
    }

    openMessageDetails = (message) => {
        if (!message.read) {
            let currentMessage = Object.assign({}, message);

            currentMessage.read = true;

            this.save(currentMessage)
                .then(() => { this.getMessages() });
        }

        this.setState({ isMessageDetailsOpen: true, currentMessage: message });
    }

    closeMessageDetails = () => {
        this.setState({ isMessageDetailsOpen: false });
    }

    openMessageDelete = message => {
        this.setState({ isMessageDeleteOpen: true, currentMessage: message });
    }

    closeMessageDelete = () => {
        this.setState({ isMessageDeleteOpen: false });
    }

    save = (message, captchaToken) => {
        this.props.dispatch(saveMessage(message, captchaToken))
            .then(() => {
                if (!message.id) {
                    this.reset();
                    this.props.showMessage('Successfuly sended message');
                }
            })
            .catch(ex => {
                this.props.showMessage(`Unable to ${message.id ? 'update' : 'send'} message: ${ex.message}`);
            });
    }

    reset = () => {
        this.setState({
            message: {
                name: '',
                email: '',
                message: ''
            },
            formErrors: {
                name: '',
                email: '',
                message: ''
            },
            formValid: false
        })
    }

    onCaptchaChange = value => {
        if (value) {
            this.save(this.state.message, value);
            captcha.reset();
        }
    }

    inputChangeHandler = (event) => {
        let { message } = this.state;
        const target = event.target;

        message[target.name] = target.value;

        this.setState({ message }, () => { this.validateField(target.name, target.value) });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        switch (fieldName) {
            case 'name':
                fieldValidationErrors.name = value.length > 0 ? null : ' is required';
                break;
            case 'email':
                if (value.length === 0) {
                    fieldValidationErrors.email = ' is required';
                } else if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                    fieldValidationErrors.email = ' is invalid';
                } else {
                    fieldValidationErrors.email = null;
                }

                break;
            case 'message':
                fieldValidationErrors.message = value.length > 0 ? null : ' is required';
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
                this.state.formErrors.name === null &&
                this.state.formErrors.email === null &&
                this.state.formErrors.message === null
            )
        });
    }

    componentDidMount() {
        if (this.props.loggedIn) {
            this.getMessages();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.loggedIn !== this.props.loggedIn && nextProps.loggedIn) {
            this.getMessages();
        }
    }

    getMessages = () => {
        return this.props.dispatch(getMessages());
    }

    render() {
        const { message, currentMessage, formValid } = this.state;

        const { messages, isLoading, isProcessing, hasError } = this.props;

        return (
            <div>
                {this.props.loggedIn &&
                    <div>
                        {(isLoading || hasError) &&
                            <FetchControl
                                isLoading={isLoading}
                                hasError={hasError}
                                refresh={this.getMessages} />
                        }
                        {!isLoading && !hasError &&
                            <div>
                                <MessageDelete
                                    open={this.state.isMessageDeleteOpen}
                                    message={currentMessage}
                                    getMessages={this.getMessages}
                                    onClose={this.closeMessageDelete}
                                    showMessage={this.props.showMessage}
                                    {...this.props} />
                                <MessageDetails
                                    open={this.state.isMessageDetailsOpen}
                                    message={currentMessage}
                                    getMessages={this.getMessages}
                                    onClose={this.closeMessageDetails}
                                    deleteMessage={this.openMessageDelete} />
                                {messages.length === 0 && <EmptyList />}
                                {messages.length > 0 && messages.map((message, index) =>
                                    <Card key={index} style={{ marginTop: 10 }}>
                                        <CardHeader
                                            title={<Typography style={!message.read ? { fontWeight: 'bold' } : {}} type="subheading">{message.name} ({message.email})</Typography>}
                                            subheader={new Date(message.date).toLocaleString()} />
                                        <CardActions disableActionSpacing>
                                            <Button
                                                color="primary"
                                                onClick={() => { this.openMessageDetails(message) }}>Read</Button>
                                            <div style={{ marginLeft: 'auto' }}>
                                                <Tooltip id="tooltip-icon" title="Delete">
                                                    <IconButton onClick={() => { this.openMessageDelete(message) }}><Icon>delete</Icon></IconButton>
                                                </Tooltip>
                                            </div>
                                        </CardActions>
                                    </Card>
                                )}
                            </div>
                        }
                    </div>
                }
                {!this.props.loggedIn &&
                    <div>
                        <Typography type="subheading">Fill the form to send me a message</Typography>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.name)}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input name="name" onChange={this.inputChangeHandler} value={message.name} />
                            <FormHelperText>{this.state.formErrors.name}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.email)}>
                            <InputLabel htmlFor="email">E-mail</InputLabel>
                            <Input name="email" onChange={this.inputChangeHandler} value={message.email} />
                            <FormHelperText>{this.state.formErrors.email}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.message)}>
                            <InputLabel htmlFor="message">Message</InputLabel>
                            <Input
                                name="message"
                                multiline
                                rowsMax="4"
                                onChange={this.inputChangeHandler}
                                value={message.message} />
                            <FormHelperText>{this.state.formErrors.message}</FormHelperText>
                        </FormControl>
                        <ReCAPTCHA
                            ref={(el) => { captcha = el; }}
                            size="invisible"
                            sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                            onChange={this.onCaptchaChange}
                        />
                        <div style={{ position: 'relative', display: 'table' }}>
                            <Button
                                variant="raised"
                                color="primary"
                                disabled={isProcessing || !formValid}
                                onClick={() => { captcha.execute(); }}>
                                Send
                                </Button>
                            {isProcessing && <CircularProgress size={24} style={{
                                position: 'absolute',
                                top: '50%',
                                left: '50%',
                                marginTop: -12,
                                marginLeft: -12
                            }} />}
                        </div>
                    </div>
                }
            </div>
        );
    }
}

Messages.propTypes = {
    messages: PropTypes.array.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const props = {
        messages: state.messages.items,
        isLoading: state.messages.isLoading,
        isProcessing: state.messages.isProcessing,
        hasError: state.messages.hasError
    }

    return props
}

export default connect(mapStateToProps)(Messages)