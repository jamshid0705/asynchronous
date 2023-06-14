const fs = require("fs");
const superagent = require("superagent");

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) reject("I could not find this file 😓!");
      resolve(data);
    });
  });
}

function writeFile(filename, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, file, (err) => {
      if (err) reject("I could not find this file 😓!");
      resolve("Yozildi !");
    });
  });
}

readFile(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(data);

    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    return writeFile("dog-image", res.body.message);
  })
  .then(() => {
    console.log("Yozildi");
  })
  .catch((err) => {
    console.log(err.message);
  });
