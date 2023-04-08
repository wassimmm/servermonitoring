import React from 'react';
import  '../styles/request_table.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {connectToServer} from "../../actions/serverActions.js";

// let onKillClick = (e,pid, serverId, userId, connectToServer) => {
//     e.preventDefault();
//     connectToServer(serverId, userId, "sudo kill -9 "+pid);
// };

function requestTable(props) {
    const { data, serverId } = props;

    // Check if the data prop is defined
    if (!data) {
        return null;
    }

    const { user } = props.auth;

    return (
        <table className="table-request">
            <thead className="thead-request">
            <tr className="tr-request">
                <th className="th-request">protocol</th>
                <th className="th-request">Sent-Q</th>
                <th className="th-request">Recv-Q</th>
                <th className="th-request">Local Address</th>
                <th className="th-request">Foreign Address</th>
                <th className="th-request">State</th>
                <th className="th-request">Program Name</th>
               
            </tr>
            </thead>
            <tbody className="tbody-request">
            {data.map((item) => (
                <tr className="tr-request" key={item.pid}>
                    <td className="td-request">{item.protocol}</td>
                    <td className="td-request">{item.SentQ}</td>
                    <td className="td-request">{item.RecvQ}</td>
                    <td className="td-request">{item.LocalAddress}</td>
                    <td className="td-request">{item.ForeignAddress}</td>
                    <td className="td-request">{item.State}</td>
                    <td className="td-request">{item.ProgramName}</td>
                    
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

requestTable.propTypes = {
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

export default connect(mapStateToProps, { connectToServer })(requestTable);
