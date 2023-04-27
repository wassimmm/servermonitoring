


function parseProcessLinecpu(str,error){
    var result={}
    var regex=/(?<=)\S+/g //capture values beetween spaces
    var result={}
    try{
        var data=[...str.matchAll(regex)]
        
       
        let maxNumElements = 0;
        for (let i = 0; i < data[0][0].length; i++) {
          if (data[i].length > maxNumElements) {
            maxNumElements = data[i].length;
          }
        }
        let numColumns = maxNumElements;
        console.log("Number of columns: " + numColumns);
        

        

       
       
        


        // var totalCpu = 0;

        // let i = 0;
        // while (i < data.length) {
        //     let cpuValue = parseFloat(data[0][0].split(":")[0]);
        //     if (!isNaN(cpuValue)) {
        //     totalCpu += cpuValue;
        // i++;
        // }  
        //  }

        // console.log("*---***" + data.length +"--"+ totalCpu);
        
          
        result= {
            "cpu":data[0][0],
            // "TotalCpu":totalCpu,
            "pid":data[1][0],
            "user":data[2][0],
            "root":data[3][0],

            
        }
    }catch(err){error(err)}
    return result
}

module.exports=function(data,options={pid_sort(a,b){return a.cpu-b.cpu}},error=(error)=>{/*parser error messages*/ console.log(error)}){
     var data=data.split("\n").filter(v=>v!="")
     var result={

         cpuUsage:[...( [
                 (()=>{
                 var result=[]
                 for (var i=1;i<data.length-1;i++){
                     var proc=null
                     try{
                         var proc=parseProcessLinecpu(data[i],error)
                         console.log("**"+proc)
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