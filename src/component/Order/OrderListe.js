import React from "react";
import { map } from 'lodash';
import { Query } from 'react-apollo';

import ResolveOrder from './ResolveOrder';
import GET_CART from '../../greaphql/Client/queries/cart/getCart';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import Paper from '@material-ui/core/Paper';

const CustomTableCell = withStyles(theme => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const styles = theme => ({
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
    },
    table: {
        minWidth: 700,
    },
    row: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.background.default,
        },
    },
});


const OrderListe = (props) => {
    const { classes } = props;
    return (
        <Query query={GET_CART}>
            {
                ({ error, loading, data }) => {
                    if (loading) return <div>Loainding...</div>
                    if (error) return <div>Error</div>
                    return (
                        <div>
                            <div style={{ marginTop: 20, marginBottom: 20 }}> Page Order</div>
                            <Paper className={classes.root} id="order-screen-shot">
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            <CustomTableCell>Product</CustomTableCell>
                                            <CustomTableCell align="right">Price</CustomTableCell>
                                            <CustomTableCell align="right">Quantity</CustomTableCell>
                                            
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {map(data.cart.items, (item) => {
                                            return (
                                                <TableRow className={classes.row} key={item.product._id}>
                                                    <CustomTableCell component="th" scope="row">
                                                        <ExpansionPanel>
                                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                               {item.product.name}
                                                            </ExpansionPanelSummary>
                                                            <ExpansionPanelDetails>
                                                            <ResolveOrder _id={item.product._id} />
                                                            </ExpansionPanelDetails>
                                                        </ExpansionPanel>
                                                       
                                                    </CustomTableCell>
                                                    <CustomTableCell align="right">{item.product.price} $</CustomTableCell>
                                                    <CustomTableCell align="right">{item.quantity}</CustomTableCell>
                                                    
                                                </TableRow>
                                            )
                                        })}
                                        <TableRow className={classes.row}>
                                            <CustomTableCell rowSpan={1} />
                                            <CustomTableCell colSpan={1}>Total Quantity</CustomTableCell>
                                            <CustomTableCell align="right">{data.cart.totalQuantity}</CustomTableCell>
                                        </TableRow>
                                        <TableRow>
                                            <CustomTableCell colSpan={1}>Total</CustomTableCell>
                                            <CustomTableCell align="right">
                                                <div className="u-center-text ">
                                                    {data.cart.totalPrice} $
                                                </div>
                                            </CustomTableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </Paper>
                        </div>
                    )
                }
            }
        </Query>
    )
}
OrderListe.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(OrderListe);