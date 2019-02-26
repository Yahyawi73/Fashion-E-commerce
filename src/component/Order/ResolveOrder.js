import React, { Component } from "react";
import { Mutation } from 'react-apollo';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';

import DELETE_ITEM from '../../greaphql/Client/mutations/cart/deleteItem';
import PLUS_ONE_ITEM from '../../greaphql/Client/mutations/cart/plusOneItem';
import MINUS_ONE_ITEM from '../../greaphql/Client/mutations/cart/minusItem';

const styles = theme => ({
    fab: {
        margin: theme.spacing.unit,
    },
    extendedIcon: {
        marginRight: theme.spacing.unit,
    },
});


class ResolveOrder extends Component {
    render() {
        const { _id, classes } = this.props;
        return (
            <div>
                <Mutation mutation={MINUS_ONE_ITEM} variables={{ _id }}>
                    {(minusOneItem) => (
                        <Fab
                            onClick={(e) => {
                                e.preventDefault();
                                minusOneItem();
                            }}
                            color="primary"
                            aria-label="Add"
                            className={classes.fab}>
                            ---
                            </Fab>
                    )}
                </Mutation>
                <Mutation mutation={PLUS_ONE_ITEM} variables={{ _id }}>
                    {(plusOneItem) => (
                        <Fab
                            onClick={(e) => {
                                e.preventDefault();
                                plusOneItem();
                            }}
                            color="primary"
                            aria-label="Add"
                            className={classes.fab}>
                            <AddIcon />
                        </Fab>
                    )}
                </Mutation>
                <Mutation mutation={DELETE_ITEM} variables={{ _id }}>
                    {(deleteItem) => (
                        <IconButton
                            onClick={(e) => {
                                e.preventDefault();
                                deleteItem();
                            }}
                            aria-label="Delete" className={classes.margin}>
                            <DeleteIcon />
                        </IconButton>
                    )}
                </Mutation>
            </div>
        )
    }
}

export default withStyles(styles)(ResolveOrder);