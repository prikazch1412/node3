var fs = require('fs');
var csv = require('fast-csv');
var countM = 0;
var countF = 0;
var sumHeight = 0;
var sumWeight = 0;
var arr_length = 0;
var arr = [];
var full = new Array();
var countries = new Array();
var first_col = new Array();
var firstName = new Array();
var firstCountry = new Array();
fs.createReadStream('people.csv').pipe(csv())
.on('data',function(data){
 arr = data[0].split(';');
if (arr[0]!='id')
{
  full.push(arr);
  countries.push(arr[6]);
  first_col.push(arr[1]);
   arr_length++;
   sumHeight+=Number(JSON.parse(arr[7]));
   sumWeight+=Number(JSON.parse(arr[8]));
              if (arr[4]==="Male")
              {
                  countM++;
                  return countM;
              }
             if (arr[4]==="Female")
             {
               countF++;
             }
     
          
}
})
.on('end',function (data){ 

  let num = first_col[0];
  let max_frq = 1;
    for (let i=0; i < first_col.length-1; i++) {
        let frq = 1;
        for (let k = i+1; k<first_col.length; k++) 
            if (first_col[i] == first_col[k])
                frq += 1;
        if (frq > max_frq) {
            max_frq = frq;
            num = first_col[i];
        }
    }
 
    if (max_frq > 1) 
        console.log(`Самое популярное имя: ${num}`);


  console.log(`Количество мужчин: ${countM} Количество женщин: ${countF}`);
  console.log('Средний рост: ' + sumHeight/arr_length);
  console.log('Средний вес: ' + sumWeight/arr_length);
  let num1 = countries[0];
  let max_frq1 = 1;
    for (let i=0; i < countries.length-1; i++) {
        let frq1 = 1;
        for (let k = i+1; k<countries.length; k++) 
            if (countries[i] == countries[k])
                frq1 += 1;
        if (frq1 > max_frq1) {
            max_frq1 = frq1;
            num1 = countries[i];
        }
    }
 
    if (max_frq1 > 1) 
        console.log(`Название самой популярной страны: ${num1}`);

        for (let i=0;i<full.length;i++){
          if (full[i][1] == num){

          firstName.push(JSON.stringify(full[i]));
        }
        if (full[i][6] == num1){
          
          firstCountry.push(JSON.stringify(full[i]));

        }
          }
          console.log(firstName[0].replace(/['"]+/g, ''));
          console.log(firstCountry[0].replace(/['"]+/g, ''));
});

  




