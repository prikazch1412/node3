var fast_csv = require('fast-csv');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('olympic_history.db');
var tempArray = new Array();
var Year_Season = new Array();
fast_csv.fromPath("athlete3.csv").on("data", function(data){
    str = data[0].replace(/""/g,'').replace(/(\(.*?\))/g, '');
    tempArray.push(str.match(/(?!\,\")([\&\`\#\/\.\'\d\w\s,-]+)/ig));   
}) .on("end", function(){
    tempArray.shift();
    data(tempArray);
});
    var Athlete = new Array();
    var Games = new Array();
    var Sports = new Array();
    var Events = new Array();
    var Awards = new Array(); 
    var other = [];
function data(arr) {
    for (let i=0; i<arr.length; i++){
        if (arr[i][12].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")=='NA'){
            arr[i][12] = 0;
    }  
    if (arr[i][12] == 'Gold'){
        arr[i][12] = 1;
    }  
    if (arr[i][12]=='Silver'){
        arr[i][12] = 2;
    } 
    if (arr[i][12]=='Bronze'){
        arr[i][12] = 3;
    }
    Awards.push(arr[i][12]);
    }
    
    db.serialize(function() {
        db.run("drop table results");
        db.run("CREATE TABLE `results` ( `id` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE, `athlete_id`	INTEGER NOT NULL, `game_id`	INTEGER NOT NULL, `sport_id` INTEGER NOT NULL, `event_id` INTEGER NOT NULL, `medal`	INTEGER NOT NULL);");
    var stmt = db.prepare("insert into results values(null,?,?,?,?,?)");
    let athletes_db = `select * from athletes`;
    let games_db = `select * from games`;
    let sports_db = `select * from sports`;
    let events_db = `select * from events`; 
         
db.all(athletes_db, [], (err, rows) => {  if (err) { throw err; }
        for (let j in rows) { 
            Athlete.push(rows[j].id);     
             }      
});

db.all(games_db, [], (err, rows) => {  if (err) { throw err; }
  for (let i=0; i<arr.length; i++){
        for (let j in rows) {
            if (rows[j].season == '0'){
                rows[j].season = 'Summer'
            } 
            if (rows[j].season == '1'){
                rows[j].season = 'Winter'
            } 
            //Year_Season[i] = Array.of(rows[j].id,rows[j].year,rows[j].season);
            //console.log(Year_Season[j][1].concat(Year_Season[j][2]));
       
    
                if (arr[i][7].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")==rows[j].year && arr[i][8] == rows[j].season ){ 
                    Games[i] = rows[j].id;
                }
                    if (arr[i][7].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")=='1906'){
                        Games[i] = 0;
                   
                        }
             }   
        }
        console.log(Games.length)
          
});

db.all(events_db, [], (err, rows) => {  if (err) { throw err; }
  for (let i=0; i<arr.length; i++){
        for (let j in rows) { 
        if (arr[i][11] == rows[j].name){ 
            Events.push(rows[j].id);
                }
             }
              
        }      
});
db.all(sports_db, [], (err, rows) => {  if (err) { throw err; }
  for (let i=0; i<arr.length; i++){
        for (let j in rows) { 
        if (arr[i][10] == rows[j].name){
            Sports[i] =  rows[j].id;
            if (arr[i][7].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")=='1906'){
                Sports[i] = 0;
            }
        } 
        
    }
   
}
for (let i=0; i<arr.length; i++){

     
stmt.run(Athlete[i],Games[i],Sports[i],Events[i],Awards[i]);
}
stmt.finalize();            
  });
 });
    db.close(function(){
        console.log("Запись в БД окончена")
    });
}