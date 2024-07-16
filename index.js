const fs = require("fs");
const http = require("http");
/*
// Block model
const fileInput = fs.readFileSync('input.txt', 'utf-8');

console.log(fileInput);

const myText = "I want this text to be in my output.txt"

fs.writeFileSync("output.txt", myText)

console.log("check output.txt");

//Async model
fs.readFile("input.txt", 'utf-8', (err, data) => {
  if(err) {
    console.log(err);
  } else {
    console.log("This is async function " + data);
    fs.readFile(`${data}.txt`, "utf-8", (err, data1) => {
      if(err) {
        console.log(err);
      } else {
        console.log(data1);

        fs.writeFile("output.txt", `Final output: ${data} ${data1}`, "utf-8", err => console.log(err))
      }
    })
  }
})*/

///////////////////////////
// SERVER

const data = fs.readFileSync(`${__dirname}/data.json`, "utf-8");
const dataObj = JSON.parse(data);

const tempOverviw = fs.readFileSync(`${__dirname}/templates/overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/card.html`);
const tempProduct = fs.readFileSync(`${__dirname}/templates/product.html`);

console.log(tempOverviw);

const server = http.createServer((req, res) => {
  const pathName = req.url;

  // Overview page
  if (pathName === "/" || pathName === "/overviev") {
    res.writeHead(200, {'Content-type': 'text/html'})
    res.end(tempOverviw);

    // Product page
  } else if (pathName === "/product") {
    res.end("This is the PRODUCT");

    //API
  } else if (pathName === "/api") {
    res.writeHead(200, { "Content-type": "application/json" });
    res.end(data);

    // Not found
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
      "my-own-header": "hello-world",
    });
    res.end("<h1>Page not found</h1>");
  }
});

server.listen(8000, () => {
  console.log('Listening on port 8000');
});
