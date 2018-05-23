import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    getSkills
} from '../../store/skills/actions'

import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Card, { CardHeader, CardContent, CardActions } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Tooltip from 'material-ui/Tooltip';

import FetchControl from '../shared/FetchControl';
import EmptyList from '../shared/EmptyList';

import SkillForm from './SkillForm'
import SkillDelete from './SkillDelete'

class Skills extends Component {

    state = {
        currentSkill: {},
        isSkillFormOpen: false,
        isSkillDeleteOpen: false
    }

    openSkillForm = skill => {
        this.setState({ isSkillFormOpen: true, currentSkill: skill ? Object.assign({}, skill) : {} });
    }

    closeSkillForm = () => {
        this.setState({ isSkillFormOpen: false });
    }

    openSkillDelete = skill => {
        this.setState({ isSkillDeleteOpen: true, currentSkill: skill });
    }

    closeSkillDelete = () => {
        this.setState({ isSkillDeleteOpen: false });
    }

    componentDidMount() {
        this.getSkills();
    }

    getSkills = () => {
        this.props.dispatch(getSkills());
    }

    render() {
        const { currentSkill } = this.state;

        const { skills, isLoading, hasError } = this.props;

        return (
            <div>
                {(isLoading || hasError) &&
                    <FetchControl
                        isLoading={isLoading}
                        hasError={hasError}
                        refresh={this.getSkills} />
                }
                {!isLoading && !hasError &&
                    <div>
                        {this.props.loggedIn &&
                            <div>
                                <Button
                                    variant="raised"
                                    color="primary"
                                    onClick={() => { this.openSkillForm() }}>
                                    <Icon>add</Icon> Add New
                                </Button>
                                <SkillForm
                                    open={this.state.isSkillFormOpen}
                                    skill={this.state.currentSkill}
                                    closeSkillForm={this.closeSkillForm}
                                    showMessage={this.props.showMessage} />
                                <SkillDelete
                                    open={this.state.isSkillDeleteOpen}
                                    skill={currentSkill}
                                    onClose={this.closeSkillDelete}
                                    showMessage={this.props.showMessage} />
                            </div>
                        }
                        {skills.length === 0 && <EmptyList />}
                        {skills.length > 0 && skills.map((skill, index) =>
                            <Card key={index} style={{ marginTop: 10 }}>
                                <CardHeader
                                    title={<Typography type="subheading">{skill.name}</Typography>} />
                                <CardContent style={{ paddingTop: 0, paddingBottom: 0 }}>
                                    <Typography type="body1">{skill.description}</Typography>
                                </CardContent>
                                <CardActions disableActionSpacing>
                                    {this.props.loggedIn && (
                                        <div style={{ marginLeft: 'auto' }}>
                                            <Tooltip id="tooltip-icon" title="Edit">
                                                <IconButton onClick={() => { this.openSkillForm(skill) }}><Icon>edit</Icon></IconButton>
                                            </Tooltip>
                                            <Tooltip id="tooltip-icon" title="Delete">
                                                <IconButton onClick={() => { this.openSkillDelete(skill) }}><Icon>delete</Icon></IconButton>
                                            </Tooltip>
                                        </div>
                                    )}
                                </CardActions>
                            </Card>
                        )}
                    </div>
                }
            </div>
        );
    }
}

Skills.propTypes = {
    skills: PropTypes.array.isRequired,
    isProcessing: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    hasError: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const props = {
        skills: state.skills.items,
        isLoading: state.skills.isLoading,
        isProcessing: state.skills.isProcessing,
        hasError: state.skills.hasError
    }

    return props
}

export default connect(mapStateToProps)(Skills)