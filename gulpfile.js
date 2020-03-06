const gulp = require("gulp");
const gap = require("gulp-append-prepend");

const fs = require('fs');
const argv = require('yargs').argv;


const credits = `
LICENSES AND ATTRIBUTION:


=========================================================
* Now UI Kit PRO React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-pro-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)

* Coded by Creative Tim

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
=========================================================

* Hexagon Texture Attribution: 
=========================================================
* Attribute Link: https://www.freepik.com/free-photos-vectors/background
*   Background vector created by kbibibi - www.freepik.com
=========================================================
`;



gulp.task("licenses", async function() {
  // this is to add Creative Tim licenses in the production mode for the minified js
  gulp
    .src("build/static/js/*chunk.js", { base: "./" })
    .pipe(
      gap.prependText(`/*!
      ${credits}
      */`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified html
  gulp
    .src("build/index.html", { base: "./" })
    .pipe(
      gap.prependText(`<!--
      ${credits}
      -->`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));

  // this is to add Creative Tim licenses in the production mode for the minified css
  gulp
    .src("build/static/css/*chunk.css", { base: "./" })
    .pipe(
      gap.prependText(`/*!
      ${credits}
      */`)
    )
    .pipe(gulp.dest("./", { overwrite: true }));
  return;
});

let classdir = './src/Components';

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
