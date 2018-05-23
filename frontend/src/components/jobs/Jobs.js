import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    getJobs
} from '../../store/jobs/actions'

import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Avatar from 'material-ui/Avatar';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

import FetchControl from '../shared/FetchControl';
import EmptyList from '../shared/EmptyList';

import JobForm from './JobForm'
import JobDetails from './JobDetails'
import JobDelete from './JobDelete'

import './Jobs.css';

class Jobs extends Component {
    state = {
        currentJob: {},
        isJobDetailsOpen: false,
        isJobFormOpen: false,
        isJobDeleteOpen: false
    };

    openJobForm = job => {
        this.setState({ isJobFormOpen: true, currentJob: job ? Object.assign({}, job) : {} });
    }

    closeJobForm = () => {
        this.setState({ isJobFormOpen: false });
    }

    openJobDetails = (job) => {
        this.setState({ isJobDetailsOpen: true, currentJob: job });
    }

    closeJobDetails = () => {
        this.setState({ isJobDetailsOpen: false });
    }

    openJobDelete = job => {
        this.setState({ isJobDeleteOpen: true, currentJob: job });
    }

    closeJobDelete = () => {
        this.setState({ isJobDeleteOpen: false });
    }

    formatDate(date) {
        return new Date(parseFloat(date)).toLocaleDateString();
    }

    componentDidMount() {
        this.getJobs();
    }

    getJobs = () => {
        this.props.dispatch(getJobs());
    }

    render() {
        const { jobs, isLoading, hasError } = this.props;

        const { currentJob } = this.state;

        return (
            <div>
                {(isLoading || hasError) &&
                    <FetchControl
                        isLoading={isLoading}
                        hasError={hasError}
                        refresh={this.getJobs} />
                }
                {!isLoading && !hasError &&
                    <div>
                        {this.props.loggedIn &&
                            <div>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    onClick={() => { this.openJobForm() }}>
                                    <Icon>add</Icon> Add New
                                </Button>
                                <JobForm
                                    open={this.state.isJobFormOpen}
                                    job={currentJob}
                                    onClose={this.closeJobForm}
                                    showMessage={this.props.showMessage} />
                                <JobDelete
                                    open={this.state.isJobDeleteOpen}
                                    job={currentJob}
                                    onClose={this.closeJobDelete}
                                    showMessage={this.props.showMessage} />
                            </div>
                        }
                        {jobs.length === 0 && <EmptyList />}
                        <div className="timeline">
                            {jobs.length > 0 && jobs.map((job, index) =>
                                <div key={index} className="timeline-event">
                                    <Card className="card timeline-content">
                                        <CardHeader
                                            title={<Typography type="subheading">{`${job.companyName} (${job.role})`}</Typography>}
                                            subheader={this.formatDate(job.startDate.toString()) + " - " + (job.finishDate ? this.formatDate(job.finishDate.toString()) : "Present")} />
                                        <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
                                            <Typography type="body1">{job.description}</Typography>
                                        </CardContent>
                                        <CardActions disableActionSpacing>
                                            <Button color="primary" onClick={() => this.openJobDetails(job)}>View More</Button>
                                            {this.props.loggedIn && (
                                                <div style={{ marginLeft: 'auto' }}>
                                                    <Tooltip id="tooltip-icon" title="Edit">
                                                        <IconButton onClick={() => { this.openJobForm(job) }}><Icon>edit</Icon></IconButton>
                                                    </Tooltip>
                                                    <Tooltip id="tooltip-icon" title="Delete">
                                                        <IconButton onClick={() => { this.openJobDelete(job) }}><Icon>delete</Icon></IconButton>
                                                    </Tooltip>
                                                </div>
                                            )}
                                        </CardActions>
                                    </Card>
                                    <Avatar className="timeline-badge"><Icon>work</Icon></Avatar>
                                </div>
                            )}
                        </div>
                        <JobDetails
                            open={this.state.isJobDetailsOpen}
                            job={currentJob}
                            onClose={this.closeJobDetails} />
                    </div>
                }
            </div>
        );
    }
}

Jobs.propTypes = {
    jobs: PropTypes.array.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const props = {
        jobs: state.jobs.items,
        isLoading: state.jobs.isLoading,
        isProcessing: state.jobs.isProcessing,
        hasError: state.jobs.hasError
    }

    return props
}

export default connect(mapStateToProps)(Jobs)