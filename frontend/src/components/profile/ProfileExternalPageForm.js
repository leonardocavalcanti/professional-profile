import React, { Component } from 'react';

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
} from 'material-ui/Dialog';
import Input, { InputLabel, InputAdornment } from 'material-ui/Input';
import { FormControl, FormHelperText } from 'material-ui/Form';
import Icon from 'material-ui/Icon';

class ProfileExternalPageForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            externalPage: props.externalPage,
            open: false,
            formErrors: {
                name: '',
                icon: '',
                url: ''
            },
            formValid: false
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            externalPage: nextProps.externalPage,
            formErrors: {
                name: nextProps.externalPage.name ? null : '',
                icon: nextProps.externalPage.name ? null : '',
                url: nextProps.externalPage.name ? null : ''
            },
            formValid: nextProps.externalPage.name ? true : false
        });
    }

    save = () => {
        this.props.saveExternalPage();
        this.props.onClose();
    }

    handleClose = () => {
        this.props.onClose();
    };

    inputChangeHandler = (event) => {
        let { externalPage } = this.state;
        const target = event.target;

        externalPage[target.name] = target.value;

        this.setState({ externalPage }, () => { this.validateField(target.name, target.value) });
    };

    validateField(fieldName, value) {
        let fieldValidationErrors = this.state.formErrors;

        switch (fieldName) {
            case 'name':
                fieldValidationErrors.name = value.length > 0 ? null : ' is required';
                break;
            case 'icon':
                fieldValidationErrors.icon = value.length > 0 ? null : ' is required';
                break;
            case 'url':
                fieldValidationErrors.url = value.length > 0 ? null : ' is required';
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
                this.state.formErrors.icon === null &&
                this.state.formErrors.url === null
            )
        });
    }

    render() {
        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.state.externalPage.new ? 'Add' : 'Edit'} External Page</DialogTitle>
                    <DialogContent>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.name)}>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input name="name" onChange={this.inputChangeHandler} value={this.state.externalPage.name} />
                            <FormHelperText>{this.state.formErrors.name}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.icon)}>
                            <InputLabel htmlFor="icon">Icon</InputLabel>
                            <Input
                                name="icon"
                                onChange={this.inputChangeHandler}
                                value={this.state.externalPage.icon}
                                endAdornment={<InputAdornment><Icon className={this.state.externalPage.icon} /></InputAdornment>} />
                            <FormHelperText>{this.state.formErrors.icon}</FormHelperText>
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth error={Boolean(this.state.formErrors.url)}>
                            <InputLabel htmlFor="url">URL</InputLabel>
                            <Input name="url" onChange={this.inputChangeHandler} value={this.state.externalPage.url} />
                            <FormHelperText>{this.state.formErrors.url}</FormHelperText>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button
                             variant="raised"
                            color="primary"
                            disabled={!this.state.formValid}
                            onClick={this.save}>
                            Save
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

export default ProfileExternalPageForm;
