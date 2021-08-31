// const words = require('./words.json');
// const categories = require('./w.json');
// const SSB = require('./SSB');
// const express = require("express");
// const app = express();

// app.use(express.static('public'))
// app.use(express.json())

// class ShanNLP {
//     matches = [];
//     stemming = (str) => {
//         const { prefix_suffix, prefix, suffix } = words.stemwords;
//         // pre_suf
//         for (let pre_suf of prefix_suffix) {
//             let reg = new RegExp(`${pre_suf}`, 'gm')
//             str = str.replace(reg, (m)=>{
//                 this.addToMatches(m)
//                 return "_$1";
//             });
//         }

//         // suf
//         for (let suf of suffix) {
//             let reg2 = new RegExp(`${suf}`, 'gm')
//             str = str.replace(reg2, (m)=>{
//                 this.addToMatches(m)
//                 return "_";
//             });
//         }

//         // pre
//         for (let pre of prefix) {
//             let reg3 = new RegExp(`${pre}`, 'gm')
//             str = str.replace(reg3, (m)=>{
//                 this.addToMatches(m)
//                 return "_";
//             });
//         }
//         return str;
//     }

//     removeStopWords = (str) => {
//         const { conjunction, suffix } = words.stopwords;
    
//         // pre
//         for (let pre of conjunction) {
//             let reg = new RegExp(pre,'gm');
//             str = str.replace(reg, (m)=>{
//                 this.addToMatches(m)
//                 return "_";
//             });
//         }

//         // suf
//         for (let suf of suffix) {
//             let reg2 = new RegExp(suf,'gm');
//             str = str.replace(reg2, (m)=>{
//                 this.addToMatches(m)
//                 return "_";
//             });
//         }

//         return str;
//     }

//     tagging = (str) => {
//         if (!str) return '';
//         str = this.stemming(str);
//         str = this.removeStopWords(str);
//         const arr = str.split("_").map((e, i) => {
//             if ((i === 0 && e === "_") || (i === str[str.length - 1] && e === "_")) {
//                 return null;
//             }
//             return /\s/g.test(e)? e.split(" ") : e;
//         }).filter(String);

//         let ssb = new SSB()

//         let data = arr.flat();
//         if( data.length == 0 ){
//             return data;
//         }

//         let final = [];
//         data.forEach(e=>{
//             if(!e) return;
//             let cat = getType(e);
//             if(cat !== '-'){
//                 final.push(e+cat);
//                 return;
//             }
//             let words = ssb.tokenize(e);
//             let w = words.map(w=>{
//                 let cat = getType(w);
//                 if(cat == '-') return w;
//                 return w+cat;
//             }).filter(String).join("_");
//             final.push(w);
//         });
//         return final;
//     }

//     addToMatches = (match) =>{
//         if(this.matches.includes(match)) return;
//         this.matches.push(match)
//     }

//     getMatches = ()=>{
//         return this.matches;
//     }

// }

// const getType = (str)=>{
//       let data = categories.find((c)=>c.w == str);
//       return data ? data.t : '-';
// }

// app.post('/test',(req,res)=>{
//     if(!req.body.str) return;

//     let str = req.body.str;

//     const nlp = new ShanNLP();
//     let data = nlp.tagging(str);
//     let stop_words = nlp.getMatches();

//     res.status(200).send({
//         message:'Success',
//         data,
//         stop_words
//     })
// })

// app.listen(process.env.PORT,()=>{
//     console.log(`Listening on port 4000, http://localhost:4000`)
// })