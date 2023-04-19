import React from 'react';
import  '../styles/firewall_table.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {connectToServer} from "../../actions/serverActions.js";

// let onKillClick = (e,pid, serverId, userId, connectToServer) => {
//     e.preventDefault();
//     connectToServer(serverId, userId, "sudo kill -9 "+pid);
// };

function firewallTable(props) {
    const { data, serverId } = props;

    // Check if the data prop is defined
    if (!data) {
        return null;
    }

    const { user } = props.auth;

    return (
        <table className="table-firewall">
            <thead className="thead-firewall">
            <tr className="tr-firewall">
                <th className="th-firewall">interface</th>
                <th className="th-firewall">active zones</th>
             
               
            </tr>
            </thead>
            <tbody className="tbody-firewall">
            {data.map((item) => (
                <tr className="tr-firewall" key={item.pid}>
                    <td className="td-firewall">{item.interface}</td>
                    <td className="td-firewall">{item.activeZones}</td>
                  
                    
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

firewallTable.propTypes = {
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



export default connect(mapStateToProps, { connectToServer })(firewallTable);
