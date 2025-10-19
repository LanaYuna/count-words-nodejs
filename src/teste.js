
const paragrafos = ["código", "js", "", "web", "", "array"];

const result = paragrafos.reduce((acum, paragrafo) => {
 if (paragrafo) {
   return [...acum, paragrafo];
 }
 return acum;
}, []);

console.log(result);