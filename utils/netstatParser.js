


function parseProcessLinerequest(str,error){
    var result={}
    var regex=/(?<=)\S+/g //capture values beetween spaces
    var result={}
    try{
        var data=[...str.matchAll(regex)]

        result= {
            "protocol":data[0][0],
            "SentQ":data[1][0],
            "RecvQ":data[2][0],
            "LocalAddress":data[3][0],
            "ForeignAddress":data[4][0],
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