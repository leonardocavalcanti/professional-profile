import React, { Component } from 'react';

import PropTypes from 'prop-types'

import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    message: theme.typography.title
});

class EmptyList extends Component {
    render() {
        const { classes } = this.props;

        return (
            <div style={{ marginTop: 50, width: '100%' }}>
                <div style={{ margin: 'auto', display: 'table' }}>
                    <div className={classes.message} style={{ opacity: 0.5 }}>Nothing to show</div>
                </div>
            </div>
        )
    }
}

EmptyList.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(EmptyList);
