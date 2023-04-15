import React from 'react';
import  '../styles/bandwidth_table.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {connectToServer} from "../../actions/serverActions.js";

// let onKillClick = (e,pid, serverId, userId, connectToServer) => {
//     e.preventDefault();
//     connectToServer(serverId, userId, "sudo kill -9 "+pid);
// };

function bandwidthTable(props) {
    const { data, serverId } = props;

    // Check if the data prop is defined
    if (!data) {
        return null;
    }

    const { user } = props.auth;

    return (
        <table className="table-bandwidth">
            <thead className="thead-bandwidth">
            <tr className="tr-bandwidth">
                <th className="th-bandwidth">device</th>
                <th className="th-bandwidth">rate</th>
            
               
            </tr>
            </thead>
            <tbody className="tbody-bandwidth">
            {data.map((item) => (
                <tr className="tr-bandwidth" key={item.pid}>
                    <td className="td-bandwidth">{item.device}</td>
                    <td className="td-bandwidth">{item.rate}</td>
                   
                    
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

bandwidthTable.propTypes = {
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

export default connect(mapStateToProps, { connectToServer })(bandwidthTable);
