import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
    withMobileDialog
} from 'material-ui/Dialog';

class MessageDetails extends Component {
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

    deleteMessage = () => {
        this.props.onClose();
        this.props.deleteMessage(this.state.message);
    }

    render() {
        const { fullScreen } = this.props;

        const { message } = this.state;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullScreen={fullScreen}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Message</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Sent on: {new Date(message.date).toLocaleString()} <br />
                            From: {message.name} ({message.email}) <br />
                        </DialogContentText>
                        <DialogContentText style={{ marginTop: 10 }}>
                            {message.message}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.deleteMessage} color="primary">
                            Delete
                        </Button>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

MessageDetails.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(MessageDetails);
