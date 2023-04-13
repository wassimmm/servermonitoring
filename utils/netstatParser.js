
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












function parseProcessLinerequest(str,error){
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
    
        result= {
            "protocol":data[0][0],
            "SentQ":data[1][0],
            "RecvQ":data[2][0],
            "LocalAddress":data[3][0],
            "ForeignAddress":data[4][0],
            "applicationProtocol":protocol,
            "State":data[5][0],
            "ProgramName":data[6][0],
            
        }
    }catch(err){error(err)}
    return result
}

module.exports=function(data,options={pid_sort(a,b){return a.cpu-b.cpu}},error=(error)=>{/*parser error messages*/ console.log(error)}){
     var data=data.split("\n").filter(v=>v!="")
     var result={

        request:[...( [
                 (()=>{
                 var result=[]
                 for (var i=1;i<data.length;i++){
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

 return result

 }//export