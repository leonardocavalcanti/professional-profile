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

class JobDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: {},
            open: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            job: nextProps.job
        });
    }

    handleClose = () => {
        this.props.onClose();
    };

    render() {
        const { fullScreen } = this.props;

        const { job } = this.state;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullScreen={fullScreen}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{job.companyName}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <span dangerouslySetInnerHTML={{ __html: job.longDescription }} />
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

JobDetails.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(JobDetails);
