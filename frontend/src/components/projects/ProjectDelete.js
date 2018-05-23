import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    deleteProject
} from '../../store/projects/actions'

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from 'material-ui/Dialog';

class ProjectDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            open: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            project: nextProps.project
        });
    }

    handleClose = () => {
        this.props.onClose();
    };

    delete = () => {
        const { project } = this.state;

        this.props.dispatch(deleteProject(project))
            .then(() => {
                this.handleClose();
                
                this.props.showMessage('Successfuly deleted project');
            })
            .catch(ex => {
                this.props.showMessage(`Unable to delete project: ${ex.message}`)
            });
    }

    render() {
        const { project } = this.state;

        const { isProcessing } = this.props;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Delete project "{project.name}"</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm project deletion?
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

ProjectDelete.propTypes = {
    isProcessing: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const props = {
        isProcessing: state.projects.isProcessing
    }

    return props
}

export default connect(mapStateToProps)(ProjectDelete)