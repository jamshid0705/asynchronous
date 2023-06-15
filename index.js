const fs = require('fs');
const superagent = require('superagent');

function readFile(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (err, data) => {
      // console.log(reject());
      if (err) reject('I could not find this file 😓!');
      resolve(data);
    });
  });
}

function writeFile(filename, file) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, file, (err) => {
      if (err) reject('I could not find this file 😓!');
      resolve('Yozildi !');
    });
  });
}

const getDog = async (fayl) => {
  try {
    const data = await readFile(fayl);
    console.log(data);

    const res1 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res2 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const res3 = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all=await Promise.all([res1,res2,res3])
    const newAll=all.map((val)=>val.body.message)
    console.log(newAll)

    await writeFile('dog-image', newAll.join('\n'));
    console.log('Fayl yozildi !');
  } catch (error) {
    console.log(error);
    // throw error;
  }
  return '2:Dog';
};
getDog(`${__dirname}/dog.txt`);

// (async()=>{
//   try {
//     console.log('1:Dog');
//     const x =await getDog(`${__dirname}/doggg.txt`);
//     console.log(x)
//     console.log('3:Dog');
//   } catch (error) {
//     console.log('Error!')
//   }

// })()
// console.log('3:Dog');

// getDog(`${__dirname}/doggg.txt`)
//   .then((res) => {
//     console.log(res);
//     console.log('3:Dog');
//   })
//   .catch((err) => {
//     console.log('Error!');
//   });

// readFile(`${__dirname}/dog.txt`)
//   .then((data) => {
//     console.log(11,data);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then((res) => {
//     console.log(res.body.message)
//     return writeFile("dog-image", res.body.message);
//   })
//   .then(() => {
//     console.log("Yozildi");
//   })
//   .catch((err) => {
//     console.log(err);
//   });
