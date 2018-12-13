var fast_csv = require('fast-csv');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('olympic_history.db');
var tempArray = new Array();
var arr = new Array();
var full = new Array();
var str;
var ArrayC = [];
var ArrayD = [];
fast_csv.fromPath("athlete2.csv").on("data", function(data){
    str = data[0].replace(/""/g,'').replace(/(\(.*?\))/g, '');
    tempArray.push(str.match(/(?!\,\")([\&\`\#\/\.\'\d\w\s,-]+)/ig));
   
})
  .on("end", function(){
    tempArray.shift();
    unique(tempArray);
}); 

function unique(arr1) {
    for (let i=0; i<arr1.length; i++) {  
        if(arr1[i][7].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " ")!='1906'){
            arr.push(arr1[i][9].replace(/^"(.+)"$/,'$1'));
            full.push( arr1[i][6].replace(/[^\w\s]|_/g, "").replace(/\s+/g, " "));
        }
    }
    
    for (let i=0;i<arr.length;i++){
            ArrayC[i] = Array.of (arr[i], full[i]);
            ArrayD[i] = ArrayC[i].join (',');  
    }    
    
var arr2 =[];
    for(let i in ArrayD) {
        if(arr2.indexOf(ArrayD[i])==-1)arr2.push(ArrayD[i]);
    }

var str2;
var arr3 = [];
    for (let i=0;i<arr2.length;i++){
        str2 = arr2[i].split(',');
        arr3.push(str2);
    }
   

var newArr =[];
var newArr1 = [];
    for(let i in arr3) {
        if(newArr.indexOf(arr3[i][0])==-1){
            newArr.push(arr3[i][0], arr3[i][1]);}
            else{
                newArr1.push(arr3[i][0], arr3[i][1]) ; 
            }
    }
    var first = [];
    var second = [];
    var fullArr = [];
    for (let i=0; i<newArr.length; i++) {  
        if(i%2==0){
            first.push(newArr[i]);
    }
        if(i%2==1){
            second.push(newArr[i]);
    }
    }
    for (let i=0; i<first.length; i++) { 
        fullArr[i] = Array.of (first[i], second[i]);
    }

    var first1 = [];
    var second1 = [];
    var fullArr1 = [];
    for (let i=0; i<newArr1.length; i++) {  
        if(i%2==0){
        first1.push(newArr1[i]);
    }
    if(i%2==1){
        second1.push(newArr1[i]);
    }
    
    }
    for (let i=0; i<first1.length; i++) { 
        fullArr1[i] = Array.of (first1[i], second1[i]);
    }
var last = [];
var last1 = new Array();
var Col2 = new Array();
    for (let i=0; i<fullArr.length; i++) { 
        for (let j=0; j<fullArr1.length; j++) {
            if (fullArr[i][0]==fullArr1[j][0]){
                fullArr[i][1]+=', '+fullArr1[j][1];
                // last1.push(fullArr[i][1]);
                
                // if(Col2.indexOf(fullArr[i][0])==-1){
                last.push(fullArr[i][0],fullArr[i][1]);
                
            }
           
          
            else if(last1.indexOf(fullArr[i][0])==-1){
                last1.push(fullArr[i][0],fullArr[i][1]);
            }
        }   
    }
    
    
    
var first2 = [];
var second2 = [];
var fullArr2 = [];
    for (let i=0; i<last.length; i++) {  
        if(i%2==0){
            first2.push(last[i]);
        }
        if(i%2==1){
            second2.push(last[i]);
        }
    }
    for (let i=0; i<first2.length; i++) { 
        fullArr2[i] = Array.of (first2[i], second2[i]);
        
    }
    
    function compareSecondColumn(a, b) {
        if (a[1] === b[1]) {
            return 0;
        }
        else {
            return (a[1] > b[1]) ? -1 : 1;
        }
    }
    fullArr2.sort(compareSecondColumn);
        
      //  console.log(fullArr2);

        var finish =[];
     
            for(let i in fullArr2) {
                if(finish.indexOf(fullArr2[i][0])==-1){
                    finish.push(fullArr2[i][0], fullArr2[i][1]);}
                }
            
var first6 = [];
var second6 = [];
var fullArr6 = [];
    for (let i=0; i<finish.length; i++) {  
        if(i%2==0){
            first6.push(finish[i]);
        }
        if(i%2==1){
            second6.push(finish[i]);
        }
    }
    for (let i=0; i<first6.length; i++) { 
        fullArr6[i] = Array.of (first6[i], second6[i]);
        //console.log(fullArr6[i]);
    }
    var first3 = [];
    var second3 = [];
    var fullArr3 = [];
        for (let i=0; i<last1.length; i++) {  
            if(i%2==0){
                first3.push(last1[i]);
            }
            if(i%2==1){
                second3.push(last1[i]);
            }
        }
        for (let i=0; i<first3.length; i++) { 
            fullArr3[i] = Array.of (first3[i], second3[i]);
          //console.log(fullArr3[i]);  
        }
     var Final1=new Array();
     Final1 = fullArr6,Array.prototype.push.apply(fullArr6,fullArr3);
     //console.log(Final1); 

     var arr12 =[];
    for(let i in Final1) {
        if(arr12.indexOf(Final1[i][0])==-1)arr12.push(Final1[i][0],Final1[i][1]);
    }
    var first12 = [];
    var second12 = [];
    var Final2 = [];
    for (let i=0; i<arr12.length; i++) {  
        if(i%2==0){
        first12.push(arr12[i]);
    }
    if(i%2==1){
        second12.push(arr12[i]);
    }
}
for (let i=0; i<first12.length; i++) { 
    Final2[i] = Array.of (first12[i], second12[i]); 
console.log(Final2[i]);
}

// var str_last,ss;
// var str_last1 = [];
// var ArrayE = [];
//     for (let i=0;i<Final2.length;i++){
//         str_last = Final2[i][0].split(' ');
//         str_last1.push(str_last);
//     }
    
    

    
    // db.serialize(function() {
    //     db.run('delete from games');
    //     var stmt = db.prepare("insert into games values(null,?,?,?)");
    //     for (let i=0; i<str_last1.length; i++) { 
    //         ArrayE[i] = Array.of (str_last1[i][0], str_last1[i][1], Final2[i][1]);
    //         if (ArrayE[i][1]=='Winter'){
    //             ss=1;
    //         }
    //         if (ArrayE[i][1]=='Summer'){
    //             ss=0;
    //         }
    //     stmt.run(ArrayE[i][0],ss,ArrayE[i][2]);
    //     }
    //     stmt.finalize();
    // });
    // db.each("select * from games",function(err,row) {
    //     console.log(row.year, row.season, row.city);
    // });
    // db.close();   
}
