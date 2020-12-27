console.log("1.inventors에서 1500년대에 태어난 인물들만 뽑아보자.(Array.prototype.filter)");
console.log(inventors.filter(inventor => 1499<inventor.year && inventor.year<1600));

console.log("2.inventors에서 first와 last name로만 뽑아서 다시 나열해보자. (Array.prototype.map)");
//1
let inventor = new Array();
inventor.push(inventors.map(inventor => inventor.first + " " + inventor.last));
console.log(inventor);
//2
console.log(inventors.map(inventor => `${inventor.first} ${inventor.last}`));

console.log("3.inventors에 있는 인물들을 태어난 연도를 기준으로 다시 나열해보자. (가장 오래된 순서로) (Array.prototype.sort)");
function compare(key) {
    return (a,b) => a[key]>b[key] ? 1 : (a[key] < b[key] ? -1 : 0);
}
//1
console.log(inventors.sort(compare("year")));
//2
console.log(inventors.sort((a,b) => a.year>b.year? 1:-1));

console.log("4.inventors에 있는 인물들이 생존한 기간은 총 몇 년인가? (Array.prototype.reduce)");
let totalYears = inventors.reduce((total, inventor)=>{
    return total + (inventor.passed - inventor.year);
},0);
console.log(totalYears);

console.log("5.inventors에 있는 인물들을 생존한 기간을 기준으로 다시 나열해보자. (가장 오래된 순서로) (Array.prototype.reduce)");
function compare(year,passed){
    return (a,b) => a[passed]-a[year] > b[passed]-b[year] ? 1 : (a[passed]-a[year]< b[passed]-b[year] ? -1 : 0);
}
//1
console.log(inventors.sort(compare("year","passed")));
//2
console.log(inventors.sort((a,b) => a.passed-a.year > b.passed-b.year ? 1 : -1));

console.log("6.data배열에 있는 각각의 요소가 몇번 반복적으로 나타나는지 구해서, 객체의 형태로 정리해서 반환해보자 (Array.prototype.reduce)다음과 같은 형태로 반환되어야한다. { bike: 2, car: 5, pogostick: 1, ….. }");
//이렇게 하면 안될것 같음
const car = data.filter((item) => item == "car");
const bike = data.filter((item) => item == "bike");
const truck = data.filter((item) => item == "truck");
const van = data.filter((item) => item == "van");
const walk = data.filter((item) => item == "walk");
const returnObj = {
    "bike" : bike.length,
    "car" : car.length,
    "truck" : truck.length,
    "van" : van.length,
    "walk" : walk.length    
}
console.log(returnObj);

console.log("7.people배열에 있는 사람들 중 19살인 사람이 최소 한 명 이상 있는지 확인해보자. (Array.prototype.some)");
console.log(people.some((item) => 2020-item.year===19));

console.log("8.people배열에 있는 사람들이 모두 19살인지 확인해보자. (Array.prototype.every)");
console.log(people.every((item) => 2020-item.year===19));

console.log("9.comments배열에 있는 요소 중 id가 823423인 요소를 꺼내보자. (Array.prototype.find)");
console.log(comments.find((item) => item.id===823423));

console.log("10.comments배열에 있는 요소 중 id가 823423인 요소의 인덱스를 꺼내보자. (Array.prototype.findIndex)");
console.log(comments.findIndex((item) => item.id===823423));