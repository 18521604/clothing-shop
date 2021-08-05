import { Component, React } from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import { fetchCollectionsStartAsync } from '../../redux/shop/shop.actions';

import CollectionsOverViewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionContainer from "../collection/collection.container";

class ShopPage extends Component {
    componentDidMount() {
        const { fetchCollectionsStartAsync } = this.props;
        fetchCollectionsStartAsync();
    }
    render() {
        const { match } = this.props;

        return (
            <div className='shop-page'>
                <Route
                    exact
                    path={`${match.path}`}
                    component={CollectionsOverViewContainer}
                />
                <Route
                    path={`${match.path}/:collectionId`}
                    component={CollectionContainer}
                />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);