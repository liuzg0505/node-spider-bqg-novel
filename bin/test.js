"use strict";
const log = require('single-line-log2').stdout;
console.log(111111);
console.log(222222);
console.log(333333);
let i = 0;
const ti = setInterval(() => {
    if (i > 9) {
        clearInterval(ti);
        console.log(6666);
        console.log('...end...');
    }
    else {
        log('进度: ', i, '\n');
        i++;
    }
}, 1000);
console.log(44444);
console.log(55555);
