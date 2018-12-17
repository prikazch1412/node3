var fast_csv = require('fast-csv');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('olympic_history.db');
var tempArray = new Array();

fast_csv.fromPath("athlete3.csv").on("data", function(data){
    str = data[0].replace(/""/g,'').replace(/(\(.*?\))/g, '');
    tempArray.push(str.match(/(?!\,\")([\&\`\#\/\.\'\d\w\s,-]+)/ig));   
}) .on("end", function(){
    tempArray.shift();
    data(tempArray);
});

function data(arr) {
    var age_heigh_weig = [];
    var str2 =[];
    db.serialize(function() {
        // db.run("drop table athletes");
        // db.run("CREATE TABLE `athletes` (`id`	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `full_name`	TEXT NOT NULL,`year_of_birth`	INTEGER,`sex`	INTEGER,`params`	TEXT NOT NULL,`team_id`	INTEGER NOT NULL);");
        var stmt = db.prepare("insert into athletes values(null,?,?,?,?,?)");
    let sql = `select * from teams`;
            
db.all(sql, [], (err, rows) => {  if (err) { throw err; }
    for (let i=0; i<arr.length; i++){
            age_heigh_weig[i] = arr[i][3].substring(1, arr[i][3].length-1);
            for (let i=0;i<age_heigh_weig.length;i++){
                str2[i] = age_heigh_weig[i].split(',');           
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
        for (let j in rows) { 
        if (arr[i][5] == rows[j].noc_name){ 
            stmt.run(arr[i][1], str2[i][0], arr[i][2],  JSON.stringify(hw), rows[j].id);
        }
    } 
}    
stmt.finalize();
});                
    });
    db.close(function(){
        console.log("Запись в БД окончена")
    });
}
