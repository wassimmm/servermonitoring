
var protocoleByportnumber = { 1 : "TCP", 5: "RJE", 
7: "ECHO",
18: "MSP",
20: "FTP",
21:"FTP",
22:"SSH",
23:"Telnet",
25:"SMTP",
29:"MSG ICP",
37:"Time",
42:"Nameserv",
43:"WhoIs",
49:"Login",
53:"DNS",
69:"TFTP",
70:"Gophe",
79:"Finger",
80:"HTTP",
103:"X.400",
108:"SNA",
109:"POP2",
110:"POP3",
115:"SFTP",
118:"SQL",
119:"NNTP",
137:"NetBIOS",
139:"NetBIOS",
143:"IMAP",
150:"NetBIOS",
156:"SQL Server",
161:"SNMP",
179:"BGP",
190:"GACP",
194:"IRC",
197:"DLS",
389:"LDAP",
396:"Novell",
443:"HTTPS",
444:"SNPP",
445:"Microsoft-DS",
458:"QuickTime",
546:"DHCP",
547:"DHCP",
563:"SNEWS",
569:"MSN",
1080:"Socks"}


const dns = require('dns');
const { hostname } = require('os');
const dnsPromises = dns.promises;
let foreignAddress = "0"

// async function getHostname(foreignAddresse) {
//   return await dns.reverse(foreignAddresse) 
// }



// function parseProcessLinerequest(str, error) {
//   var regex = /(?<=)\S+/g; //capture values between spaces
//   var result = {};

//   try {
//     var data = ["", "", "", "", "", "", "", "", ""];
//     data = [...str.matchAll(regex)];
//     let protocol;
//     let portnumber = data[4][0].match("\:(.*)")[1];
//     if (protocoleByportnumber[parseInt(portnumber)] == undefined)
//       protocol = "other"
//     else
//       protocol = protocoleByportnumber[parseInt(portnumber)]
//     let input = data[4][0];
//     var rege = /^([\d\.]+):\d+$/;
//     let match = input.match(rege);
//     let foreignAddress = match ? match[1] : null;

//     // getHostname(foreignAddress, result, async function() {
//     //   result.protocol = data[0][0];
//     //   result.SentQ = data[1][0];
//     //   result.RecvQ = data[2][0];
//     //   result.LocalAddress = data[3][0];
//     //   result.ForeignAddress = data[4][0];
//     //   result.ApplicationProtocol = protocol;
//     //   result.State = data[5][0];
//     //   result.ProgramName = data[6][0];

//     //   // Return JSON object
      
    
     
//     //   console.log("***"+JSON.stringify(result))   
//     //  });
 
    
  
//     console.log("**"+JSON.stringify(result))
//   } catch(err){error(err)
//   }
//   return result
// }







 function parseProcessLinerequest(str,error,foreignAddress){
    var result={}
    var regex=/(?<=)\S+/g //capture values beetween spaces
    var result={}
    try{
        var data=[...str.matchAll(regex)]
        let protocol; 
             let portnumber=data[4][0].match("\:(.*)").slice(str.indexOf(',') );
             if (protocoleByportnumber [parseInt(portnumber)] == undefined)
             protocol = "other"
             else
             protocol = protocoleByportnumber [parseInt(portnumber)] 
             console.log("****" + portnumber)
 
            //  let porter=data[4][0].match("(.*)").slice(str.indexOf(',') );
            //    const dns = require('dns');

               
                // let foreignAddresse = data[4][0].split(":")[0]; // extract IP address from ForeignAddress
                // let hostname; 
                //   const dns = require('dns');
                //   dns.reverse(foreignAddresse, (err, hostnames) => {
                //     if (err) {
                //         // console.error(err);
                //         hostname = "other"
                //     } else {
                //         const currentHostname = hostnames[0]; // use the first hostname in the list
                //        console.log("****----****" +currentHostname);
                //        hostname = currentHostname
                
                //     }
                //      });
                let input = data[4][0];
                    var rege = /^([\d\.]+):\d+$/;
                    let match = input.match(rege);
                    let foreignAddress = match ? match[1] : null;
                 
                   
          
        //    var hostnom 
        //    let hostnom = dnsPromises.reverse(

        //     "157.240.22.35").then(data => {
        //         //  console.log("**data**"+data)
        //     hostnom = data});
            
            
            //  console.log("****host**"+JSON.stringify(hostnom))
            //  console.log("****host**"+hostnom)

        result= {
            "protocol":data[0][0],
            "SentQ":data[1][0],
            "RecvQ":data[2][0],
            "LocalAddress":data[3][0],
            "ForeignAddress":data[4][0],
            "ApplicationProtocol":protocol,
            // "Hostname":hostnom[0],
            "State":data[5][0],
            "ProgramName":data[6][0],
            
            
            
        }
     
        // console.log("result**"+JSON.stringify(result)+"hst**"+await getHostname("157.240.22.35"))
    }catch(err){error(err)}
    return result
   
}

console.log("***"+foreignAddress)


// module.exports= function(data,options={pid_sort(a,b){return a.cpu-b.cpu}},error=(error)=>{/*parser error messages*/ console.log(error)}){
//      var data=data.split("\n").filter(v=>v!="")
//      var result={

//         request:[...( [
//                  ( function (){
//                  var result=[]
//                  for (var i=1;i<data.length;i++){
//                      var proc=null
//                      try{
//                         var proc;
//                         proc = getHostname("157.240.22.35",proc,parseProcessLinerequest(data[i],error))
//                         //  var proc= parseProcessLinerequest(data[i],error)
                         
//                         //  console.log("*******prochotname"+proc)
//                          if(typeof options.pid_filter=="function"){
//                              proc=options.pid_filter(proc)
//                          }//if
//                      }catch(err){error(err)}
//                      proc?result.push(proc):null
//                  }//for
//                  return result.slice(0,options.pid_limit||result.length).sort(options.pid_sort)
//              })()//for
//          ]
//      )]

//  }//result

//  return result

//  }//export


module.exports=async function(data,options={pid_sort(a,b){return a.cpu-b.cpu}},error=(error)=>{/*parser error messages*/ console.log(error)}){
    var data=data.split("\n").filter(v=>v!="")
    
    var result={

        request:[... ( [
                (()=>{
                var result=[]
                for (var i=1;i<data.length-1;i++){
                    var proc=null
                    
                    try{
                       
                        var proc=parseProcessLinerequest(data[i],error)
                        
                        if(typeof options.pid_filter=="function"){
                            proc=options.pid_filter(proc)
                        }//if
                    }catch(err){error(err)}
                    proc?result.push(proc):null
                }//for
                return result.slice(0,options.pid_limit||result.length).sort(options.pid_sort)
            })()//for
        ]
    )]

}//result
// console.log("result"+JSON.stringify(result.request))
//  await (result.request[0]).map(async e=>{
//     hotname = await dnsPromises.reverse(

//         "157.240.22.35");
//         e.Hostname = hotname[0];
//     return e
// })
// console.log("result:" + JSON.stringify(result))

// let input = data[4][0];
// var rege = /^([\d\.]+):\d+$/;
// let match = input.match(rege);
// let foreignAddress = match ? match[1] : null;

  
  



let resultArray =  await Promise.all((result.request[0]).map(async e=>{
    let input = e.ForeignAddress
    var rege = /^([\d\.]+):\d+$/;
    let match = input.match(rege);
    let foreignAddress = match ? match[1] : null;
    console.log("foreignadress"+foreignAddress)
    let hotname;
    try {
        hotname = await dnsPromises.reverse(foreignAddress);
        console.log("hoooooostname"+hotname)
        e.Hostname = hotname[0];
    }catch(exc){
        e.Hostname = "other";
        console.log("Exception:   "+JSON.stringify(exc))
    }
    return e
}));
result.request[0] = resultArray;
return result


}//export