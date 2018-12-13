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
        arr.push(arr1[i][5].replace(/^"(.+)"$/,'$1'));
        newArr.push(arr1[i][4].replace(/^"(.+)"$/,'$1'));
    
        }
    //console.log(arr.length);

       
var arr2 =[];
for(let i in arr) {
  if(arr2.indexOf(arr[i])==-1)arr2.push(arr[i]);
}
console.log(arr2.length);

 var ArrayC = [];
var arr3 =[];
for(let i in newArr) {
  if(arr3.indexOf(newArr[i].replace(/(^[^ ]* )|([0-9])|(-)|(#)/g, '$1'))==-1)arr3.push(newArr[i].replace(/(^[^ ]* )|([0-9])|(-)|(#)/g, '$1'));


}
for (let i=0;i<arr3.length;i++){
if (arr2[i]!=null){
ArrayC[i] = Array.of (arr3[i], arr2[i]);
console.log(ArrayC[i][0],ArrayC[i][1]);
}
}
}

