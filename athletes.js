var fast_csv = require('fast-csv');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('olympic_history.db');

var tempArray = new Array();

fast_csv.fromPath("athlete.csv").on("data", function(data){
    str = data[0].replace(/""/g,'').replace(/(\(.*?\))/g, '');
    tempArray.push(str.match(/(?!\,\")([\&\`\#\/\.\'\d\w\s,-]+)/ig));
    
})
  .on("end", function(){
    tempArray.shift();
    data(tempArray);
});

function data(arr) {
    var age_heigh_weig = [];
    var str2 =[];
    var arr3 = [];
    var id = [];
    var noc_name = [];
    var str3 = [];
    
    db.serialize(function() {
        var stmt = db.prepare("insert into athletes values(null,?,?,?,?,?)");
        db.each("select * from teams",function(err,row) {
        
           
            id.push(row.id);
            noc_name.push(row.noc_name);
           //console.log(row.id);
    for (let i=0; i<id.length;i++){
        arr3[i] = Array.of (id[i], noc_name[i]);
    //console.log(arr3[i][0]);
    }
    for (let i=0; i<arr.length; i++){
        age_heigh_weig[i] = arr[i][3].substring(1, arr[i][3].length-1);
        for (let i=0;i<age_heigh_weig.length;i++){
            str2[i] = age_heigh_weig[i].split(',');
          // console.log(str2[i])
        }
        for(let i = 0; i < str2.length; i++) {
            if(str2[i][1] == 'NA' && str2[i][2] == 'NA') {
                var hw = {};
            } else if (str2[i][1] == 'NA') {
                var hw = {weight: str2[i][2]};
            } else if (str2[i][2] == 'NA') {
                var hw = {height: str2[i][1]};
            } else {
                var hw = {height: str2[i][1], weight: str2[i][2]};
            }     
        }
        for (let j=0; j<arr3.length; j++) { 
        if (arr[i][5] == arr3[j][1]){ 
            console.log(arr[i][1], arr[i][2], str2[i][0], JSON.stringify(hw), arr3[j][0]);
             
                }
        }
    }
        });
        
        

    stmt.finalize();                 
    });
    db.close();
}
