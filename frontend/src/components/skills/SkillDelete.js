import React, { Component } from 'react';

import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import {
    deleteSkill
} from '../../store/skills/actions'

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogTitle,
    DialogContentText,
} from 'material-ui/Dialog';

class SkillDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
            skill: {},
            open: false
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            open: nextProps.open,
            skill: nextProps.skill
        });
    }

    handleClose = () => {
        this.props.onClose();
    };

    delete = () => {
        const { skill } = this.state;

        this.props.dispatch(deleteSkill(skill))
            .then(() => {
                this.handleClose();
                this.props.showMessage('Successfuly deleted skill');
            })
            .catch(ex => {
                this.props.showMessage(`Unable to delete skill: ${ex.message}`)
            });
    }

    render() {
        const { skill } = this.state;

        const { isProcessing } = this.props;

        return (
            <div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">Delete skill "{skill.name}"</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Confirm skill deletion?
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

SkillDelete.propTypes = {
    isProcessing: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const props = {
        isProcessing: state.skills.isProcessing
    }

    return props
}

export default connect(mapStateToProps)(SkillDelete)
