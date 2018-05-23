import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux';

import {
    saveSkill
} from '../../store/skills/actions'

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

class SkillForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: {},
            open: false,
            formErrors: {
                name: '',
                description: ''
            },
            formValid: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            skill: nextProps.skill,
            formErrors: {
                name: nextProps.skill.id ? null : '',
                description: nextProps.skill.id ? null : ''
            },
            formValid: nextProps.skill.id ? true : false
        });
    }

    save = () => {
        const { skill } = this.state

        this.props.dispatch(saveSkill(skill))
            .then(() => {
                this.handleClose();

                this.props.showMessage(`Successfuly ${skill.id ? 'updated' : 'created'} skill`);
            })
            .catch(ex => {
                this.props.showMessage(`Unable to ${skill.id ? 'update' : 'create'} skill: ${ex.message}`);
            });
    }

    handleClose = () => {
        this.props.closeSkillForm();
    };

    inputChangeHandler = (event) => {
        let { skill } = this.state;
        const target = event.target;

        skill[target.name] = target.value;

        this.setState({ skill }, () => { this.validateField(target.name, target.value) });
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
                    <DialogTitle id="form-dialog-title">{this.state.skill.id ? 'Edit' : 'Add New'} Skill</DialogTitle>
                    <DialogContent>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.name)}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input name="name" onChange={this.inputChangeHandler} value={this.state.skill.name} />
                            <FormHelperText>{this.state.formErrors.name}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.description)}>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input
                                name="description"
                                multiline
                                rowsMax="2"
                                onChange={this.inputChangeHandler}
                                value={this.state.skill.description} />
                            <FormHelperText>{this.state.formErrors.description}</FormHelperText>
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

SkillForm.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const props = {
        isProcessing: state.skills.isProcessing
    }

    return props
}

export default compose(
    connect(mapStateToProps),
    withMobileDialog()
)(SkillForm);