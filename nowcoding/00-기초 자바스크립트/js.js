'Use strict'

function a(a,b) {
    console.log(a);
    console.log(b);
}


a(1,"asdasd");

const aa = {
    name:"민선",
    age:30
}

const bb = aa;


console.log(bb);
bb.name = "성철";
console.log(aa);

const c = "1";
const d = 1;

console.log(c===d);
