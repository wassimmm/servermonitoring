import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { connectToServer } from "../../actions/serverActions.js";
import "../styles/cpu_table.css";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

function CpuTable(props) {
  const { data, serverId } = props;
  const [cpuData, setCpuData] = useState([]);

  // Check if the data prop is defined
  if (!data) {
    return null;
  }

  const componentRef = useRef();

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

  const handlePrint = () => {
    html2canvas(componentRef.current).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF();
      pdf.addImage(imgData, 'PNG', 0, 50, 180, 80);
      pdf.save("cpu-data.pdf");
    });
  };
  const headingStyle = {
    textAlign: 'center',
    color: 'blue',
  };
  return (
    <div><div className="print_section">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1>Print this out !</h1>

            <button onClick={handlePrint} className="printButton">Print</button>

            <div className="graph-container" ref={componentRef}>
            <div>
      <h2 style={headingStyle}>This is the graph of CPU</h2>
    </div>
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
                  <th className="th-cpu">CPU</th>
                  <th className="th-cpu">PID</th>
                  <th className="th-cpu">User</th>
                  <th className="th-cpu">Root</th>
                </tr>
              </thead>
              <tbody className="tbody-cpu">
                {cpuData.map((item) => (
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
        </div>
      </div>
      </div>
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
