const fs=require('fs');
const data=fs.readFileSync('./input.txt','utf-8');
const lines=data.split(`\n`).filter(line=>line.trim()!=='');
const words=data.split(` `).filter(word=>word.trim()!=='');
const result=`Lines: ${lines.length}\nWords: ${words.length}`;
fs.writeFileSync('./output.txt', result);