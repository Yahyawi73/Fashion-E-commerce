import React from 'react';
import OrderList from './OrderListe';
import withSession from '../session/withSession';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Query, Mutation, compose, graphql, } from 'react-apollo';
import SEND_EMAIL from '../../greaphql/mutations/sendEmail';
import GET_CART from '../../greaphql/Client/queries/cart/getCart';
import ADD_ORDER from '../../greaphql/mutations/addOrder';
import Upload from './Uplod';

const createFile = (canvas) => {
    const imge = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    pdf.addImage(imge, 'PNG', 0, 0);
    // pdf.save('download.pdf');
    const a = pdf.output('blob');
    console.log('blob', a);
    return pdf.output('blob');
};

const Order = ({ session, sendEmail }) => (
    <div className="section-order">
        <OrderList />
        <Query query={GET_CART}>
            {
                ({ data: { cart } }) => (
                    <Mutation mutation={ADD_ORDER}>
                        {
                            (addOrder, { loading }) => (
                                <div className="u-center-text u-margin-top-big u-margin-bottom-small">
                                    <button
                                        className="btn btn--green"
                                        onClick={async () => {
                                            const input = document.getElementById('order-screen-shot');
                                            const canvas = await html2canvas(input);

                                            const orderItems = cart.items.map((item) => ({
                                                productID: item.product._id,
                                                quantity: item.quantity,
                                            }));

                                            const orderPdf = await createFile(canvas);


                                            // const file = new Blob([this.state.content], { type: 'text/plain' })
                                            // file.name = `${this.state.name}.txt`

                                            console.log('orderPdf', orderPdf)
                                            await sendEmail({
                                                variables: {
                                                    input: {
                                                        file: orderPdf,
                                                        email: 'abdelftt@gmail.com',
                                                        name: 'yhyawi abdelfatteh',
                                                    },
                                                },
                                            });

                                            await addOrder({
                                                variables: {
                                                    input: {
                                                        userName: session.getCurrentUSer.userName,
                                                        items: orderItems,
                                                        totalPrice: cart.totalPrice,
                                                        totalQuantity: cart.totalQuantity,
                                                    },
                                                },
                                            });


                                        }}
                                    >
                                        Confirme
                                                </button>
                                    <Upload />
                                </div>
                            )
                        }
                    </Mutation>

                )}
        </Query>
    </div>
)

export default compose(
    graphql(SEND_EMAIL, { name: 'sendEmail' }))(withSession(Order));
