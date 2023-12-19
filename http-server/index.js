const http = require("http");
const fs = require("fs");
const url = require("url");
const argv = require('minimist')(process.argv.slice(2));

let homeContent = "";
let projectContent = "";
let registrationContent = "";

fs.readFile("home.html", (err, home) => {
    if (err) {
        throw err;
    }
    homeContent = home;
});

fs.readFile("project.html", (err, project) => {
    if (err) {
        throw err;
    }
    projectContent = project;
});

fs.readFile("registration.html", (err, registration) => {
    if (err) {
        throw err;
    }
    registrationContent = registration;
});

const server = http.createServer((request, response) => {
    let urlPath = url.parse(request.url).pathname;
    response.writeHead(200, { "Content-Type": "text/html" });

    switch (urlPath) {
        case "/project":
            response.write(projectContent);
            break;
        case "/project/registration":
            response.write(registrationContent);
            break;
        default:
            response.write(homeContent);
            break;
    }
    response.end();
});

const port = argv.port || 3000;

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
