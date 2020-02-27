const gulp = require('gulp');
const fs = require('fs');
const argv = require('yargs').argv;

let classdir = './src/Components';
let compindex = 'ComponentsIndex.js';

function classContents(classname) {
    return`import React from 'react';

export default class ${classname} extends React.Component{
    //constructor(){}

    render() {
        return (
        <div className=${classname}>
        </div>
    )}
}
`
}
// gulp class --dir ./src/Components --name Example --index ComponentsIndex.js
gulp.task("class", function(done) {
    // todo: make an npm gulp tool based on this
    classdir = argv.dir || classdir;
    let classname = argv.name;
    if(classname) {
        fs.writeFileSync(`${classdir}/${classname}.jsx`, classContents(classname));
    }
    else console.log("ERROR: No --classname supplied!!");
    done();
});