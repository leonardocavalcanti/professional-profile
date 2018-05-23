import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux';

import {
    getProfile
} from '../../store/profile/actions'

import ProfileForm from '../profile/ProfileForm'
import FetchControl from '../shared/FetchControl';

import Avatar from 'material-ui/Avatar';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Tooltip from 'material-ui/Tooltip';
import Paper from 'material-ui/Paper/Paper';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    name: theme.typography.title,
    title: theme.typography.subheading,
    description: theme.typography.body1
});

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentProfile: {},
            anchorUserMenu: null,
            isProfileFormOpen: false
        }
    }

    componentDidMount() {
        this.getProfile();
    }

    getProfile = () => {
        this.props.dispatch(getProfile())
            .then(() => {
                let { profile } = this.props;

                document.title = profile && profile.name ? `${profile.name} | ${profile.title}` : `Professional Profile`;
            })
    }

    openUserMenu = e => {
        this.setState({ anchorUserMenu: e.currentTarget });
    }

    closeUserMenu = () => {
        this.setState({ anchorUserMenu: null });
    }

    openLoginForm = () => {
        this.props.openLoginForm();
    }

    openProfileForm = () => {
        this.closeUserMenu();

        let currentProfile = Object.assign({}, this.props.profile);
        currentProfile.externalPages = [];

        if (this.props.profile.externalPages) {
            this.props.profile.externalPages.map(externalPage => {
                return currentProfile.externalPages.push({
                    name: externalPage.name,
                    icon: externalPage.icon,
                    url: externalPage.url
                });
            });
        }

        this.setState({ currentProfile: currentProfile, isProfileFormOpen: true })
    }

    openChangePasswordForm = () => {
        this.closeUserMenu();
        this.props.openChangePasswordForm();
    }

    closeProfileForm = () => {
        this.setState({ isProfileFormOpen: false });
    }

    logout = () => {
        this.closeUserMenu();

        this.props.logout();
        this.props.showMessage('Successfuly logged out')
    }

    render() {
        const { theme, classes } = this.props;

        const { profile, isLoading, hasError } = this.props;

        return (
            <div>
                {(isLoading || hasError) &&
                    <Paper className="a" style={{ height: 200 }}>
                        <FetchControl
                            isLoading={isLoading}
                            hasError={hasError}
                            refresh={this.getProfile} />
                    </Paper>
                }
                {!isLoading && !hasError &&
                    <Card className="a">
                        <CardHeader
                            style={{ backgroundColor: theme.palette.primary.main }}
                            avatar={
                                <Avatar
                                    style={{ width: 80, height: 80 }}
                                    src={profile.pictureURL}>
                                    {!profile.pictureURL && <Icon>person</Icon>}
                                </Avatar>
                            }
                            title={
                                <div className={classes.name} style={{ color: "rgba(255, 255, 255, 0.87)" }}>{profile.name}</div>
                            }
                            subheader={
                                <div className={classes.title} style={{ color: "rgba(255, 255, 255, 0.54)" }}>{profile.title}</div>
                            }
                            action={
                                (this.props.loggedIn === null && <CircularProgress />) ||
                                (!this.props.loggedIn
                                    ? <IconButton style={{ color: "rgba(255, 255, 255, 0.87)" }} onClick={() => this.openLoginForm()}><Icon>lock</Icon></IconButton>
                                    : <div>
                                        <IconButton key="userMenuButton"
                                            style={{ color: "rgba(255, 255, 255, 0.87)" }}
                                            aria-owns={this.state.anchorUserMenu ? 'userMenu' : null}
                                            onClick={this.openUserMenu}>
                                            <Icon>person</Icon>
                                        </IconButton>
                                        <Menu
                                            id="userMenu"
                                            anchorEl={this.state.anchorUserMenu}
                                            open={Boolean(this.state.anchorUserMenu)}
                                            onClose={this.closeUserMenu}
                                        >
                                            <MenuItem onClick={this.openProfileForm}>Edit Profile</MenuItem>
                                            <MenuItem onClick={this.openChangePasswordForm}>Change Password</MenuItem>
                                            <MenuItem onClick={this.logout}>Logout</MenuItem>
                                        </Menu>
                                    </div>)
                            }
                        />
                        <CardContent>
                            <div className={classes.description}>{profile.description}</div>
                        </CardContent>
                        <CardActions disableActionSpacing>
                            {profile.externalPages && profile.externalPages.map((externalPage, index) =>
                                <Tooltip key={index} id="tooltip-icon" title={externalPage.name}>
                                    <IconButton href={externalPage.url} target="_blank"><Icon className={externalPage.icon} /></IconButton>
                                </Tooltip>
                            )}
                            {profile.resumeURL &&
                                <Tooltip id="tooltip-icon" title="Resume" style={{ marginLeft: 'auto' }}>
                                    <IconButton href={profile.resumeURL} target="_blank"><Icon className="fa fa-file-text-o" /></IconButton>
                                </Tooltip>
                            }
                        </CardActions>
                    </Card>
                }
                {this.props.loggedIn &&
                    <ProfileForm
                        profile={this.state.currentProfile}
                        open={this.state.isProfileFormOpen}
                        getProfile={this.getProfile}
                        onClose={this.closeProfileForm}
                        theme={this.props.theme}
                        showMessage={this.props.showMessage}
                        dispatch={this.props.dispatch} />
                }
            </div>
        );
    }
}

Profile.propTypes = {
    profile: PropTypes.object.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired
}

function mapStateToProps(state) {
    const props = {
        profile: state.profile.item,
        isLoading: state.profile.isLoading,
        isProcessing: state.profile.isProcessing,
        hasError: state.profile.hasError
    }

    return props
}

export default compose(
    connect(mapStateToProps),
    withStyles(styles)
)(Profile);