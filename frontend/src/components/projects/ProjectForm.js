import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux';

import {
    saveProject
} from '../../store/projects/actions'

import Button from 'material-ui/Button';
import Icon from 'material-ui/Icon';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog
} from 'material-ui/Dialog';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';

class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            project: {},
            open: false,
            formErrors: {},
            formValid: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            project: nextProps.project,
            formErrors: {
                name: nextProps.project.id ? null : '',
                description: nextProps.project.id ? null : ''
            },
            formValid: nextProps.project.id ? true : false
        });
    }

    save = () => {
        const { project } = this.state

        this.props.dispatch(saveProject(project))
            .then(() => {
                this.handleClose();

                this.props.showMessage(`Successfuly ${project.id ? 'updated' : 'created'} project.`);
            })
            .catch(ex => {
                this.props.showMessage(`Unable to ${project.id ? 'update' : 'create'} project: ${ex.message}.`);
            });
    }

    handleClose = () => {
        this.props.closeProjectForm();
    };

    inputChangeHandler = (event) => {
        let { project } = this.state;
        const target = event.target;

        project[target.name] = target.value;

        this.setState({ project }, () => { this.validateField(target.name, target.value) });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        switch (fieldName) {
            case 'name':
                fieldValidationErrors.name = value.length > 0 ? null : ' is required';
                break;
            case 'description':
                fieldValidationErrors.description = value.length > 0 ? null : ' is required';
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
                this.state.formErrors.description === null
            )
        });
    }

    render() {
        const { fullScreen, isProcessing } = this.props;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullScreen={fullScreen}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.state.project.id ? 'Edit' : 'Add New'} Project</DialogTitle>
                    <DialogContent>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.name)}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input autoFocus name="name" onChange={this.inputChangeHandler} value={this.state.project.name} />
                            <FormHelperText>{this.state.formErrors.name}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.description)}>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input name="description" onChange={this.inputChangeHandler} value={this.state.project.description} />
                            <FormHelperText>{this.state.formErrors.description}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="icon">Icon</InputLabel>
                            <Input
                                name="icon"
                                onChange={this.inputChangeHandler}
                                value={this.state.project.icon}
                                endAdornment={<InputAdornment><Icon className={this.state.project.icon} /></InputAdornment>} />
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="demoURL">Demo URL</InputLabel>
                            <Input name="demoURL" onChange={this.inputChangeHandler} value={this.state.project.demoURL} />
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="sourceURL">Source URL</InputLabel>
                            <Input name="sourceURL" onChange={this.inputChangeHandler} value={this.state.project.sourceURL} />
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
                                onClick={this.save}>
                                Save
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

ProjectForm.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const props = {
        isProcessing: state.projects.isProcessing
    }

    return props
}

export default compose(
    connect(mapStateToProps),
    withMobileDialog()
)(ProjectForm);