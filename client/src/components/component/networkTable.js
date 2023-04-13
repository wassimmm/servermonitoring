import React from 'react';
import  '../styles/network_table.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {connectToServer} from "../../actions/serverActions.js";

// let onKillClick = (e,pid, serverId, userId, connectToServer) => {
//     e.preventDefault();
//     connectToServer(serverId, userId, "sudo kill -9 "+pid);
// };

function networkTable(props) {
    const { data, serverId } = props;

    // Check if the data prop is defined
    if (!data) {
        return null;
    }

    const { user } = props.auth;

    return (
        <table className="table-network">
            <thead className="thead-network">
            <tr className="tr-network">
                <th className="th-network">device</th>
                <th className="th-network">type</th>
                <th className="th-network">state</th>
                <th className="th-network">connection</th>
               
            </tr>
            </thead>
            <tbody className="tbody-network">
            {data.map((item) => (
                <tr className="tr-network" key={item.pid}>
                    <td className="td-network">{item.device}</td>
                    <td className="td-network">{item.type}</td>
                    <td className="td-network">{item.state}</td>
                    <td className="td-network">{item.connection}</td>
                    
                    {/* <td
                        className="td-network"
                        style={{ display: "flex", justifyContent: "space-around" }}
                    >
                    
                    </td> */}
                </tr>
                
            ))}
             
            </tbody>
          
        </table>
    );
}

networkTable.propTypes = {
    status: PropTypes.object.isRequired,
    connectToServer: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    serverError: PropTypes.string.isRequired,
    serverId: PropTypes.string.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    serverError: state.serverError,
    status: state.server
});

export default connect(mapStateToProps, { connectToServer })(networkTable);
