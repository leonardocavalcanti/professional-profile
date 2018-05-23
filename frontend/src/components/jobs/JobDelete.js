import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    deleteJob
} from '../../store/jobs/actions'

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from 'material-ui/Dialog';

class JobDelete extends Component {
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

    delete = () => {
        const { job } = this.state;

        this.props.dispatch(deleteJob(job))
            .then(() => {
                this.handleClose();
                
                this.props.showMessage('Successfuly deleted job');
            })
            .catch(ex => {
                this.props.showMessage(`Unable to delete job: ${ex.message}`)
            });
    }

    render() {
        const { job } = this.state;

        const { isProcessing } = this.props;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Delete job "{job.companyName}"</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm job deletion?
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
                                disabled={isProcessing}
                                onClick={this.delete}>
                                Confirm
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

JobDelete.propTypes = {
    isProcessing: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const props = {
        isProcessing: state.jobs.isProcessing
    }

    return props
}

export default connect(mapStateToProps)(JobDelete)
