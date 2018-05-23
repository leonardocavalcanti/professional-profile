import React, { Component } from 'react';

import {
    deleteMessage
} from '../../store/messages/actions'

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from 'material-ui/Dialog';

class MessageDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: {},
            open: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            message: nextProps.message
        });
    }

    handleClose = () => {
        this.props.onClose();
    };

    delete = () => {
        this.setState({ isProcessing: true });

        const { message } = this.state;

        this.props.dispatch(deleteMessage(message))
            .then(() => {
                this.handleClose();

                this.setState({ isProcessing: false });

                this.props.getMessages();
                this.props.showMessage('Successfuly deleted message');
            })
            .catch(ex => {
                this.setState({ isProcessing: false });

                this.props.showMessage(`Unable to delete message: ${ex.message}`)
            });
    }

    render() {
        const { message } = this.state;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Delete message from "{message.name}"</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm message deletion?
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
                                disabled={this.state.isProcessing}
                                onClick={this.delete}>
                                Confirm
                            </Button>
                            {this.state.isProcessing && <CircularProgress size={24} style={{
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

export default MessageDelete;
