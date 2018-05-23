import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    getProjects
} from '../../store/projects/actions'

import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Card, { CardHeader, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

import FetchControl from '../shared/FetchControl';
import EmptyList from '../shared/EmptyList';

import ProjectForm from './ProjectForm'
import ProjectDelete from './ProjectDelete'

class Projects extends Component {

    state = {
        currentProject: {},
        isProjectFormOpen: false,
        isProjectDeleteOpen: false
    }

    openProjectForm = project => {
        this.setState({
            isProjectFormOpen: true,
            currentProject: project ? Object.assign({}, project) : {
                name: '',
                description: '',
                icon: '',
                demoURL: '',
                sourceURL: ''
            }
        });
    }

    closeProjectForm = () => {
        this.setState({ isProjectFormOpen: false });
    }

    openProjectDelete = project => {
        this.setState({ isProjectDeleteOpen: true, currentProject: project });
    }

    closeProjectDelete = () => {
        this.setState({ isProjectDeleteOpen: false });
    }

    componentDidMount() {
        this.getProjects();
    }

    getProjects = () => {
        this.props.dispatch(getProjects());
    }

    render() {
        const { projects, isLoading, hasError } = this.props;

        const { currentProject } = this.state;

        return (
            <div>
                {(isLoading || hasError) &&
                    <FetchControl
                        isLoading={isLoading}
                        hasError={hasError}
                        refresh={this.getProjects} />
                }
                {!isLoading && !hasError &&
                    <div>
                        {this.props.loggedIn &&
                            <div>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    onClick={() => { this.openProjectForm() }}>
                                    <Icon>add</Icon> Add New
                                </Button>
                                <ProjectForm
                                    open={this.state.isProjectFormOpen}
                                    project={this.state.currentProject}
                                    closeProjectForm={this.closeProjectForm}
                                    showMessage={this.props.showMessage} />
                                <ProjectDelete
                                    open={this.state.isProjectDeleteOpen}
                                    project={currentProject}
                                    onClose={this.closeProjectDelete}
                                    showMessage={this.props.showMessage} />
                            </div>
                        }
                        {projects.length === 0 && <EmptyList />}
                        {projects.length > 0 && projects.map((project, index) =>
                            <Card key={index} style={{ marginTop: 10 }}>
                                <CardHeader
                                    title={<Typography type="subheading">{project.name}</Typography>}
                                    subheader={project.description}
                                    avatar={<Avatar><Icon className={project.icon} /></Avatar>} />
                                <CardActions disableActionSpacing>
                                    <Button
                                        color="primary"
                                        href={project.demoURL}
                                        target="_blank"
                                        disabled={Boolean(!project.demoURL)}>Demo</Button>
                                    <Button
                                        color="primary"
                                        href={project.sourceURL}
                                        target="_blank"
                                        disabled={Boolean(!project.sourceURL)}>Source</Button>
                                    {this.props.loggedIn &&
                                        <div style={{ marginLeft: 'auto' }}>
                                            <Tooltip id="tooltip-icon" title="Edit">
                                                <IconButton onClick={() => { this.openProjectForm(project) }}><Icon>edit</Icon></IconButton>
                                            </Tooltip>
                                            <Tooltip id="tooltip-icon" title="Delete">
                                                <IconButton onClick={() => { this.openProjectDelete(project) }}><Icon>delete</Icon></IconButton>
                                            </Tooltip>
                                        </div>
                                    }
                                </CardActions>
                            </Card>
                        )}
                    </div>
                }
            </div>
        );
    }
}

Projects.propTypes = {
    projects: PropTypes.array.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const props = {
        projects: state.projects.items,
        isLoading: state.projects.isLoading,
        isProcessing: state.projects.isProcessing,
        hasError: state.projects.hasError
    }

    return props
}

export default connect(mapStateToProps)(Projects)