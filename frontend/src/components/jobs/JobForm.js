import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux';

import {
    saveJob
} from '../../store/jobs/actions'

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog
} from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import { CircularProgress } from 'material-ui/Progress';
import RichTextEditor from 'react-rte';
import Typography from 'material-ui/Typography';

const getDate = (date) => {
    if (!date) return '';

    date = new Date(date).toISOString();

    return `${date.substring(0, 4)}-${date.substring(5, 7)}-${date.substring(8, 10)}`;
}

const setDate = (date) => {
    if (!date) return;

    return new Date(date.substring(0, 4), date.substring(5, 7) - 1, date.substring(8, 10)).getTime();
}

class JobForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            job: {},
            longDescription: RichTextEditor.createEmptyValue(),
            open: false,
            formErrors: {
                companyName: '',
                role: '',
                startDate: ''
            },
            formValid: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            job: nextProps.job,
            longDescription: nextProps.job.longDescription ? RichTextEditor.createValueFromString(nextProps.job.longDescription, 'html') : RichTextEditor.createEmptyValue(),
            formErrors: {
                companyName: nextProps.job.id ? null : '',
                role: nextProps.job.id ? null : '',
                startDate: nextProps.job.id ? null : ''
            },
            formValid: nextProps.job.id ? true : false
        });
    }

    handleClose = () => {
        this.props.onClose();
    };

    inputChangeHandler = (event) => {
        let { job } = this.state;
        const target = event.target;

        job[target.name] = target.value;

        this.setState({ job }, () => { this.validateField(target.name, target.value) });
    };

    inputDateChangeHandler = (event) => {
        let { job } = this.state;
        const target = event.target;

        job[target.name] = setDate(target.value);

        this.setState({ job }, () => { this.validateField(target.name, target.value) });
    };

    inputRichTextChangeHandler = (value) => {
        this.setState({ longDescription: value });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        switch (fieldName) {
            case 'companyName':
                fieldValidationErrors.companyName = value.length > 0 ? null : ' is required';
                break;
            case 'role':
                fieldValidationErrors.role = value.length > 0 ? null : ' is required';
                break;
            case 'startDate':
                fieldValidationErrors.startDate = value.length > 0 ? null : ' is required';
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
                this.state.formErrors.companyName === null &&
                this.state.formErrors.role === null &&
                this.state.formErrors.startDate === null
            )
        });
    }

    save = () => {
        const { job } = this.state

        job.longDescription = this.state.longDescription.toString('html');

        this.props.dispatch(saveJob(job))
            .then(() => {
                this.handleClose();

                this.props.showMessage(`Successfuly ${job.id ? 'updated' : 'created'} job`);
            })
            .catch(ex => {
                this.props.showMessage(`Unable to ${job.id ? 'update' : 'create'} job: ${ex.message}`);
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
                    <DialogTitle id="form-dialog-title">{this.state.job.id ? 'Edit' : 'Add New'} Job</DialogTitle>
                    <DialogContent>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.companyName)}>
                            <InputLabel htmlFor="companyName">Company Name</InputLabel>
                            <Input name="companyName" onChange={this.inputChangeHandler} value={this.state.job.companyName} />
                            <FormHelperText>{this.state.formErrors.companyName}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.role)}>
                            <InputLabel htmlFor="role">Role</InputLabel>
                            <Input name="role" onChange={this.inputChangeHandler} value={this.state.job.role} />
                            <FormHelperText>{this.state.formErrors.role}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.startDate)}>
                            <InputLabel htmlFor="startDate" shrink>Start Date</InputLabel>
                            <Input
                                name="startDate"
                                type="date"
                                onChange={this.inputDateChangeHandler}
                                value={getDate(this.state.job.startDate)} />
                            <FormHelperText>{this.state.formErrors.startDate}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="finishDate" shrink>Finish Date</InputLabel>
                            <Input
                                name="finishDate"
                                type="date"
                                onChange={this.inputDateChangeHandler}
                                value={getDate(this.state.job.finishDate)} />
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="description">Short Description</InputLabel>
                            <Input name="description"
                                onChange={this.inputChangeHandler}
                                value={this.state.job.description ? this.state.job.description : ''} />
                        </FormControl>
                        <Typography type="subheading">Long Description</Typography>
                        <RichTextEditor
                            style={{ minHeight: 300 }}
                            value={this.state.longDescription}
                            onChange={this.inputRichTextChangeHandler}
                        />
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

JobForm.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const props = {
        isProcessing: state.jobs.isProcessing
    }

    return props
}

export default compose(
    connect(mapStateToProps),
    withMobileDialog()
)(JobForm);