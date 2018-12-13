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
    db.serialize(function() {
        var stmt = db.prepare("insert into athletes values(null,?,?,?,?,?)");
        for(var i = 0; i < arr.length; i++) {
            if(arr[i][4] == 'NA' && arr[i][5] == 'NA') {
                var hw = {};
            } else if (arr[i][4] == 'NA') {
                var hw = {weight: arr[i][5]};
            } else if (arr[i][5] == 'NA') {
                var hw = {height: arr[i][4]};
            } else {
                var hw = {height: arr[i][4], weight: arr[i][5]};
            }
            stmt.run(arr[i][1].replace(/(\['"]|\(.*?\)) */g, ''), arr[i][2], arr[i][2], JSON.stringify(hw), arr[i][5]);
        }
        stmt.finalize();
    });
    db.each("select * from athletes",function(err,row) {
        console.log(row.full_name);
    });
    db.close();
}