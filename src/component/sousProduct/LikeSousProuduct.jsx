import React from 'react';
import withSession from '../session/withSession';
import { Mutation } from 'react-apollo';
import { LIKE_SOUS_PRODUCT } from '../../greaphql/mutations/likeSousProduct';
import { UNLIKE_SOUS_PRODUCT } from '../../greaphql/mutations/unlikeSousProduct';
import { GET_SOUS_PRODUCT } from '../../queries/getSousProduct';

class likeSousProduct extends React.Component {
    state = {
        liked: false,
        userName: '',
    }

    componentDidMount() {
        if (this.props.session.getCurrentUSer) {
            const { userName, favorites } = this.props.session.getCurrentUSer;
            const { _id } = this.props;
            const prevLiked = favorites.findIndex(favorite => favorite._id === _id) > -1;
            this.setState({
                liked: prevLiked,
                userName
            });
        }
    }

    handleClick = (likeSousProduct, unLikeSousProduct) => {
        this.setState(prevState => ({
            liked: !prevState.liked
        }),
            () => this.handleLike(likeSousProduct, unLikeSousProduct)
        )
    }

    handleLike = async (likeSousProduct, unLikeSousProduct) => {
        if (this.state.liked) {
            await likeSousProduct().then(
                data => console.log(data)
            )
            await this.props.refetch();
        } else {
            // unlike recipe mutation
            await unLikeSousProduct().then(
                data => console.log(data)
            )
        }
    }

    updateLike = (cache, { data: { likeSousProduct } }) => {
        const { _id } = this.props;
        const { getSousProduct } = cache.readQuery({
            query: GET_SOUS_PRODUCT,
            variables: { _id }
        })

        cache.writeQuery({
            query: GET_SOUS_PRODUCT,
            variables: { _id },
            data: {
                getSousProduct: { ...getSousProduct, likes: likeSousProduct.likes + 1 }
            }
        })
    }

    updateUnLike = (cache, { data: { unLikeSousProduct } }) => {
        const { _id } = this.props;
        const { getSousProduct } = cache.readQuery({
            query: GET_SOUS_PRODUCT,
            variables: { _id }
        })

        cache.writeQuery({
            query: GET_SOUS_PRODUCT,
            variables: { _id },
            data: {
                getSousProduct: { ...getSousProduct, likes: unLikeSousProduct.likes - 1 }
            }
        })
    }

    render() {
        const { userName, liked } = this.state;
        const { _id } = this.props;
        return <Mutation
            mutation={UNLIKE_SOUS_PRODUCT}
            update={this.updateUnLike}
            variables={{ _id, userName }}
        >
            {(unLikeSousProduct) => (
                <Mutation
                    mutation={LIKE_SOUS_PRODUCT}
                    variables={{ _id, userName }}
                    update={this.updateLike}
                >
                    {
                        (likeSousProduct) => {
                            return (
                                userName && <button onClick={() => this.handleClick(likeSousProduct, unLikeSousProduct)}>
                                    {liked ? 'unlike' : "like"}
                                </button>
                            )
                        }
                    }
                </Mutation>
            )}
        </Mutation>
    }
}


export default withSession(likeSousProduct);

