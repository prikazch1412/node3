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
    //data(tempArray);
    unique(tempArray);
}); 


 
function unique(arr1) {
        for (let i=0; i<arr1.length; i++) {    
        arr.push(arr1[i][10].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
        }
    //console.log(arr);

       
var arr2 =[];
for(let i in arr) {
  if(arr2.indexOf(arr[i])==-1)arr2.push(arr[i]);
}

db.serialize(function() {
var stmt = db.prepare("insert into sports values(null,?)");
for (let i=0;i<arr2.length;i++){
 
stmt.run(arr2[i]);

}
        stmt.finalize();
    });
    db.each("select * from sports",function(err,row) {
      console.log(row.name);
  });
  db.close();

}

