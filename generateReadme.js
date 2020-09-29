const fs = require('fs');
const path = require('path');

let template = fs.readFileSync("./doc/README.md", "utf-8")
let content = template.replace(/\/\/ #include<(.*)>/g, (match, p1) => {
    try {
        return fs.readFileSync(path.join("./", p1), "utf-8")
    } catch (e) {
        console.log(e)
    }
})
fs.writeFileSync("./README.md", content, "utf-8")