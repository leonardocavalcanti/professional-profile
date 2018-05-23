import React, { Component } from 'react';

import PropTypes from 'prop-types'

import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    message: theme.typography.title
});

class FetchControl extends Component {
    render() {
        const { classes, isLoading, hasError } = this.props;

        return (
            <div>
                {isLoading &&
                    <div style={{ paddingTop: 80 }}>
                        <CircularProgress size={60} style={{
                            margin: 'auto',
                            display: 'block'
                        }} />
                    </div>
                }
                {hasError &&
                    <div style={{ paddingTop: 80, width: '100%' }}>
                        <div style={{ margin: 'auto', display: 'table' }}>
                            <IconButton onClick={() => this.props.refresh()}><Icon style={{ fontSize: 40 }}>refresh</Icon></IconButton>
                        </div>
                        <div style={{ margin: 'auto', display: 'table' }}>
                            <div className={classes.message} style={{ opacity: 0.5 }}>Unable to load click to retry</div>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

FetchControl.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(FetchControl);
