import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../styles/fab.css';
import '../styles/my_servers.css';
import '../styles/loading.css';
import { connectToServer } from '../../actions/serverActions.js';

// import Startbutton from "./components/component/startbutton.js";




class Startbutton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFetching: false,
            connection: null,
            option:"start_firewall",
            server: this.props.match.params.id,
           
           
        };
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/login');
        } else {
            const { user } = this.props.auth;
            this.setState({ ...this.state, server: this.props.match.params.id });
            this.props.connectToServer(this.state.server, user.id, this.state.option);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.status.data !== this.props.status.data) {
            this.setState({ ...this.state, connection: this.props.status.data });
        }
    }

    render() {
        const { connection } = this.state;
        const {server} = this.state
        if (connection!==null) {
            console.log(server)
        }

        return (<div style={((this.props.serverError === "") && (connection == null)) ?{
            display: "flex", justifyContent: "center", alignItems: "center", height:"92.5%", width:"100%", position: "absolute"}: {display: "flex",justifyContent: "space-between",alignItems: "center"}}>
                {(this.props.serverError === "" && connection == null) && <div className="loader"></div>}
                {connection != null && <>
                    <Startbutton data={connection.start_firewall[0]} serverId={server}>
                    </Startbutton>
                 
                </>}
                <div>{this.props.serverError !== "" && <div>{this.props.serverError.toString()}</div>}
                </div>
        </div>
        );
    }
}

Startbutton.propTypes = {
    status: PropTypes.object.isRequired,
    connectToServer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    serverError: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    serverError: state.serverError,
    status: state.server
});

export default connect(mapStateToProps, { connectToServer })(Startbutton);

