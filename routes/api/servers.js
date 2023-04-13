const express = require("express");
const router = express.Router();
const { exec } = require('child_process');
const User = require("../../models/User");
const Server = require("../../models/Server");
const mongoose = require("mongoose");


const { Client } = require('ssh2');
const topparser = require("../../utils/topParser");
const privParser = require("../../utils/privParser");
const psParser = require("../../utils/psParser");
const nmcliParser = require("../../utils/nmcliParser")
const firewallParser = require("../../utils/firewallParser")
const netstatParser = require("../../utils/netstatParser")
const startParser = require("../../utils/startParser")

async function connectToSSHServer(server) {
    return new Promise((resolve, reject) => {
        const conn = new Client();
        conn.on('ready', () => {
            console.log('SSH connection successful');
            resolve(conn);
        }).on('error', (err) => {
            console.log(`SSH connection error: ${err.message}`);
            reject(err);
        }).connect({
            host: server.host,
            port: server.port || 22,
            username: server.username,
            password: server.password
        });
    });
}

function executeSudoCommand(conn, option, res) {
    console.log(option);
    const password = '08041997';
    let output = '';

    conn.shell((err, stream) => {
        if (err) {
            console.log(`Command execution error: ${err.message}`);
            throw err;
        }
        stream.on('end', async _ => {
            console.log(`Command execution ended`);
            res.status(200).json(await parser(output, option));
        }).on('data', (data) => {
            console.log(`STDOUT: ${data}`);
            if (data.indexOf('Password') > -1) {
                stream.end(`${password}\n${option}\nexit\nexit\n`);
            } else {
                output += data;
            }
        });
        stream.write(`su\n`);
    })
}

async function cmdOption(conn, option, res, serverIp) {
    //  if ( typeof option === 'object'){
    //   if (option.operation === "request"){

    //     conn.exec("sudo tcpflow -p -c -i "+ option.interface +" port 80 | grep -oE '(GET|POST) .* HTTP/1.[01]|Host: .*'",(err,stream) => {
    //         executeCMD(err, stream ,option.operation , res);
    //       })
      if (option === "request")
      {
    //   {  console.log(" ip du serveur " + 'netstat -tupan | grep '+ serverIp)
        conn.exec(`netstat -tupan | grep ${serverIp}` ,(err,stream) => {
            executeCMD(err, stream, option, res);
            
      });
      
         }else if (option === "start_firewall")
        {
           conn.exec('sudo service firewalld start', (error,stdout, stderr) => {
                if (error) {
                  console.error(`exec error: ${error}`);
                  res.status(500).send('Failed to start firewall');
                } else {
                  console.log(`stdout: ${stdout}`);
                  console.error(`stderr: ${stderr}`);
                  res.send('Firewall started successfully');
                }
              });
       
      }
       
      else if (option === "processes") {
         conn.exec('top -n 1 -b', (err, stream) => {
      //  conn.exec('ps aux | grep '+'firefox', (err, stream) => {
        executeCMD(err, stream, option, res)
        });
        }else if (option === 'cpuUsage'){
            conn.exec('ps -eo pcpu,pid,user,args | sort -k 1 -r | grep firefox',(err,stream) => {
                executeCMD(err, stream, option, res);
            })
        }else if (option === 'network'){
            conn.exec('nmcli device status',(err,stream) => {
                executeCMD(err, stream ,option, res);
            })
       
        }else if (option === 'firewall'){
            
            conn.exec('firewall-cmd --get-active-zones ',(err,stream) => {
                executeCMD(err, stream ,option, res);
                })
        }
        
        
         else if (option.startsWith('sudo kill')) {
           console.log('kill process');
           executeSudoCommand(conn, option, res);
        } else if (option.startsWith('sudo -l')) {
          console.log('privileges');
          executeSudoCommand(conn, option, res);
          } else {
         res.status(404).json(`NO OPTION FOR ${option}.`);
         console.log(`NO OPTION FOR ${option}.`);
        }
}

function executeCMD(err, stream, cmd, res) {
    if (err) {
        console.log(`Command execution error: ${err.message}`);
        throw err;
    }

    let dataBuffer = Buffer.from('');
    let response;

    stream.on('data', (data) => {
        response = data;
        dataBuffer = Buffer.concat([dataBuffer, data]);
    });
    stream.on('end', (code) => {
        console.log(code)
        if (code) {
            res.status(400).json('Insufficient Privileges!');
        } else res.status(200).json(parser(dataBuffer,cmd));
        console.log(response);
    }).on('close', (code) => {
        console.log(`Command execution closed with code ${code}`);
    });
}

function parser(data, option){
    console.log(data)
    console.log(option)
    if (option.startsWith('processes')) {
        return topparser(data.toString());
    }
    if(option.startsWith('cpuUsage')) {
        return psParser(data.toString());
        //  console.log(data);
        //  return data.toString();
    }
    if(option.startsWith('network')) {
         return nmcliParser(data.toString());
        //  console.log(data);
        //  return data.toString();
    }
//     if(option.startsWith('request')) {
//       //  return tcpflowParser(data.toString());
//          console.log(data);
//          return data.toString();
//    }
   if(option.startsWith('request')) {
       return netstatParser(data.toString());
    //    console.log(data);
    //    return data.toString();
    }
     if(option.startsWith('start_firewall')) {
          return startParser(data.toString());
        //  console.log(data);
        //  return data.toString();
     }
    if(option.startsWith('firewall')) {
            return firewallParser(data.toString());
            // console.log(data);
            // return data.toString();
    }
    if (option.startsWith('sudo -l')) {
        return privParser(data.toString());
    }
    return data
}






router.post("/add_server", (req, res) => {
    console.log(req.body.owner)
    Server.findOne({ ip: req.body.ip }).then(server => {
        if (server) {
            return res.status(400).json({ ip: "Server already exists" });
        } else {
            const newServer = new Server({
                name: req.body.name,
                ip: req.body.ip,
                username: req.body.username,
                password: req.body.password,
                description: req.body.description,
                owner: req.body.owner,
            });
             Server.create(newServer)
                 .then(server => res.json(server))
                 .catch(err => res.status(404).json(err));
        }
    });
});

router.post("/get_servers", (req, res) => {
    console.log(req.body.owner)
    Server.find({owner :mongoose.Types.ObjectId(req.body.owner)})
                .then(servers => res.json(servers))
                .catch(err => res.status(404).json(err));
});

router.post('/connectToServer', async (req, res) => {
    console.log(req.body.user+":"+req.body.server)
    console.log("body:",req.body)
        await User.findById(mongoose.Types.ObjectId((req.body.user)), async function (err, results) {
            if (err) {
                res.status(404).json(err)
            }
            console.log(results)
            if (results !== null) {
                await Server.findById((mongoose.Types.ObjectId(req.body.server)), async function (err, results) {
                    if (err) {
                        res.status(404).json(err)
                    }
                    if (results !== null) {
                        try {
                            await connectToSSHServer({
                                  host: results.ip,
                                username: results.username,
                                password: results.password
                            }).then(async (conn) => {
                                    // Connection successful, do something with the `conn` object
                                    await cmdOption(conn, req.body.option, res,results.ip)
                                }).catch((err) => {
                                    // Connection failed, handle the error
                                    console.log(`SSH connection error: ${err.message}`);
                                    res.status(404).json(`SSH connection error: ${err.message}`);

                            });

                        } catch (err) {
                            res.status(404).json(`SSH connection error: ${err.message}... Make sure you've entered the correct server info!`);
                        }
                    } else res.status(404).json("Server Not Found")
                })
            } else res.status(404).json("User Not Found")
        })
    });



module.exports = router;
