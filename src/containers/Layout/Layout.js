import React, {Component} from 'react';
import {connect} from 'react-redux';
import Aux from '../../hoc/Auxiliary'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';



class Layout extends Component {
    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false});
    }

    sideDrawerOpenedHandler = () => {
        this.setState({showSideDrawer: true});
        console.log(this.state.showSideDrawer)
    }

    render () {
        return(
            <Aux>
                <Toolbar opened={this.sideDrawerOpenedHandler} isAuth={this.props.isAuth} />
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer} isAuth={this.props.isAuth} />
                <main className='Content'>
                {this.props.children}
                </main>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.logIn.token != null,
    }
}

export default connect(mapStateToProps)(Layout);