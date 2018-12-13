var fast_csv = require('fast-csv');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('olympic_history.db');
var tempArray = new Array();
var arr = new Array();
var newArr = new Array();
var str;
fast_csv.fromPath("athlete.csv").on("data", function(data){
    str = data[0].replace(/""/g,'').replace(/(\(.*?\))/g, '');
    tempArray.push(str.match(/(?!\,\")([\&\`\#\/\.\'\d\w\s,-]+)/ig));

})
  .on("end", function(){
    tempArray.shift();
    unique(tempArray);
}); 

var arr2 =[];
var ArrayC = [];
var ArrayD = [];
function unique(arr1) {
        for (let i=0; i<arr1.length; i++) {    
            arr.push(arr1[i][5].replace(/^"(.+)"$/,'$1'));
            newArr.push(arr1[i][4].replace(/^"(.+)"$/,'$1'));
        }
        for (let i=0; i<arr.length; i++) { 
            ArrayC[i] = Array.of (arr[i], newArr[i].replace(/(^[^ ]* )|([0-9])|(-)|(#)/g, '$1'));  
            
        }

    for(let i in ArrayC) {
        if(arr2.indexOf(ArrayC[i][0])==-1)arr2.push(ArrayC[i][0],ArrayC[i][1]);
    }
    var first = [];
    var second = [];
    var fullArr = [];
    for (let i=0; i<arr2.length; i++) {  
        if(i%2==0){
        first.push(arr2[i]);
    }
    if(i%2==1){
        second.push(arr2[i]);
    }
    
    }
     
    db.serialize(function() {
            var stmt = db.prepare("insert into teams values(null,?,?)");
            for (let i=0; i<first.length; i++) { 
                fullArr[i] = Array.of (first[i], second[i]); 
             
            stmt.run(fullArr[i][1],fullArr[i][0]);
            
            }
          stmt.finalize();
          });
          db.each("select * from teams",function(err,row) {
             console.log(row.name, row.noc_name);
          });
     db.close();
}
