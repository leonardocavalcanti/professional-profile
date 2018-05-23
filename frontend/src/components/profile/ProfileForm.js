import React, { Component } from 'react';
import PropTypes from 'prop-types';

import {
    saveProfile
} from '../../store/profile/actions'

import ProfileExternalPageForm from './ProfileExternalPageForm'

import Button from 'material-ui/Button';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    withMobileDialog
} from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import List, { ListItem, ListItemSecondaryAction, ListItemText, ListItemAvatar } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import Tooltip from 'material-ui/Tooltip';

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profile: props.profile,
            open: false,
            isExternalPageFormOpen: false,
            currentExternalPage: {}
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ open: nextProps.open, profile: nextProps.profile });
    }

    handleClose = () => {
        this.props.onClose();
    };

    inputChangeHandler = (event) => {
        let { profile } = this.state;
        const target = event.target;

        profile[target.name] = target.value;

        this.setState({ profile });
    };

    removeExternalPage = externalPage => {
        let { profile } = this.state;

        let index = profile.externalPages.indexOf(externalPage);

        profile.externalPages.splice(index, 1);

        this.setState({ profile });
    }

    openProfileExternalPageForm = externalPage => {
        if (externalPage) {
            externalPage.current = true;

            this.setState({
                currentExternalPage: {
                    name: externalPage.name,
                    icon: externalPage.icon,
                    url: externalPage.url
                }
            });
        } else {
            this.setState({
                currentExternalPage: {
                    name: '',
                    icon: '',
                    url: '',
                    new: true
                }
            });
        }

        this.setState({ isExternalPageFormOpen: true });
    }

    closeProfileExternalPageForm = () => {
        this.setState({ isExternalPageFormOpen: false });
    }

    saveExternalPage = () => {
        let { externalPages } = this.state.profile;

        if (this.state.currentExternalPage.new) {
            externalPages.push(this.state.currentExternalPage);
        } else {
            var externalPage = externalPages.filter(obj => {
                return obj.current;
            })[0];

            externalPage.name = this.state.currentExternalPage.name;
            externalPage.icon = this.state.currentExternalPage.icon;
            externalPage.url = this.state.currentExternalPage.url;

            externalPage.current = false;
        }

        this.setState({ externalPages });

        this.closeProfileExternalPageForm();
    }

    save = () => {
        this.setState({ isProcessing: true });

        const { profile } = this.state

        this.props.dispatch(saveProfile(profile))
            .then(() => {
                this.handleClose();

                this.setState({ isProcessing: false });

                this.props.getProfile();
                this.props.showMessage(`Successfuly ${profile.id ? 'updated' : 'created'} profile`);
            })
            .catch(ex => {
                this.setState({ isProcessing: false });

                this.props.showMessage(`Unable to ${profile.id ? 'update' : 'create'} profile: ${ex.message}`);
            });
    }

    render() {
        const { fullScreen } = this.props;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    fullScreen={fullScreen}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Edit Profile</DialogTitle>
                    <DialogContent>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="name">Name</InputLabel>
                            <Input name="name" onChange={this.inputChangeHandler} value={this.state.profile.name} />
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="title">Title</InputLabel>
                            <Input name="title" onChange={this.inputChangeHandler} value={this.state.profile.title} />
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="pictureURL">Picture URL</InputLabel>
                            <Input name="pictureURL" onChange={this.inputChangeHandler} value={this.state.profile.pictureURL} />
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="resumeURL">Resume URL</InputLabel>
                            <Input name="resumeURL" onChange={this.inputChangeHandler} value={this.state.profile.resumeURL} />
                        </FormControl>
                        <FormControl style={{ marginBottom: 10 }} fullWidth>
                            <InputLabel htmlFor="description">Description</InputLabel>
                            <Input
                                name="description"
                                multiline
                                rowsMax="4"
                                onChange={this.inputChangeHandler}
                                value={this.state.profile.description} />
                        </FormControl>
                        <List>
                            <ListItem
                                dense
                                button
                                onClick={() => this.openProfileExternalPageForm()}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <Icon>add</Icon>
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary='Add New' />
                            </ListItem>
                            {
                                this.state.profile.externalPages && this.state.profile.externalPages.map((externalPage, index) =>
                                    <ListItem key={index}
                                        dense
                                        button
                                        onClick={() => this.openProfileExternalPageForm(externalPage)}
                                    >
                                        <ListItemAvatar>
                                            <Avatar>
                                                <Icon style={{ marginLeft: 5 }} className={externalPage.icon} />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={externalPage.name} />
                                        <ListItemSecondaryAction>
                                            <Tooltip id="tooltip-icon" title="Remove">
                                                <IconButton onClick={() => { this.removeExternalPage(externalPage) }}>
                                                    <Icon>delete</Icon>
                                                </IconButton>
                                            </Tooltip>
                                        </ListItemSecondaryAction>
                                    </ListItem>
                                )
                            }
                        </List>
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
                                onClick={this.save}>
                                Save
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
                <ProfileExternalPageForm
                    open={this.state.isExternalPageFormOpen}
                    onClose={this.closeProfileExternalPageForm}
                    saveExternalPage={this.saveExternalPage}
                    externalPage={this.state.currentExternalPage} />
            </div>
        )
    }
}

ProfileForm.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
};

export default withMobileDialog()(ProfileForm);
