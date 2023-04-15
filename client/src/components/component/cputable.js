import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { connectToServer } from "../../actions/serverActions.js";
import "../styles/cpu_table.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


function CpuTable(props) {
  const { data, serverId } = props;
  const [cpuData, setCpuData] = useState([]);

  // Check if the data prop is defined
  if (!data) {
    return null;
  }

  const { user } = props.auth;

  useEffect(() => {
    // Update the CPU data when the `data` prop changes
    setCpuData(data.map((item) => {
      return { 
        cpu: item.cpu,
        pid: item.pid,
        user: item.user,
        root: item.root,
      };
    }));
  }, [data]);

  return (
    <div>
      <div className="graph-container">
        <LineChart width={800} height={300} data={cpuData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="pid" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="cpu" stroke="#8884d8" />
        </LineChart>
      </div>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

CpuTable.propTypes = {
  status: PropTypes.object.isRequired,
  connectToServer: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  serverError: PropTypes.string.isRequired,
  serverId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  serverError: state.serverError,
  status: state.server,
});

export default connect(mapStateToProps, { connectToServer })(CpuTable);
