import React from 'react';
import  '../styles/cpu_table.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {connectToServer} from "../../actions/serverActions.js";

// let onKillClick = (e,pid, serverId, userId, connectToServer) => {
//     e.preventDefault();
//     connectToServer(serverId, userId, "sudo kill -9 "+pid);
// };

function cpuTable(props) {
    const { data, serverId } = props;

    // Check if the data prop is defined
    if (!data) {
        return null;
    }

    const { user } = props.auth;

    return (
        <table className="table-cpu">
            <thead className="thead-cpu">
            <tr className="tr-cpu">
                <th className="th-cpu">cpu</th>
                <th className="th-cpu">pid</th>
                <th className="th-cpu">user</th>
                <th className="th-cpu">root</th>
               
            </tr>
            </thead>
            <tbody className="tbody-cpu">
            {data.map((item) => (
                <tr className="tr-cpu" key={item.pid}>
                    <td className="td-cpu">{item.cpu}</td>
                    <td className="td-cpu">{item.pid}</td>
                    <td className="td-cpu">{item.user}</td>
                    <td className="td-cpu">{item.root}</td>
                    
                    {/* <td
                        className="td-cpu"
                        style={{ display: "flex", justifyContent: "space-around" }}
                    >
                   
                    </td> */}
                </tr>
            ))}
            </tbody>
        </table>
    );
}

cpuTable.propTypes = {
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

export default connect(mapStateToProps, { connectToServer })(cpuTable);
