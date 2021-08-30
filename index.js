const words = require('./words.json');
const categories = require('./w.json');
const SSB = require('./SSB');
const express = require("express");
const app = express();

app.use(express.static('public'))
app.use(express.json())

if(typeof String.prototype.replaceAll == "undefined") {
    String.prototype.replaceAll = function(match, replace){
       return this.replace(new RegExp(match, 'g'), () => replace);
    }
}

class ShanNLP {
    stemming = (str) => {
        const { prefix_suffix, prefix, suffix } = words.stemwords;
        // pre_suf
        for (let pre_suf of prefix_suffix) {
            let reg = new RegExp(`${pre_suf}`, 'gm')
            str = str.replaceAll(reg, "_$1");
        }

        // suf
        for (let suf of suffix) {
            str = str.replaceAll(suf, "_");
        }

        // pre
        for (let pre of prefix) {
            str = str.replaceAll(pre, "_");
        }
        return str;
    }

    removeStopWords = (str) => {
        const { conjunction, suffix } = words.stopwords;
    
        // pre
        for (let pre of conjunction) {
            str = str.replaceAll(pre, "_");
        }

        // suf
        for (let suf of suffix) {
            str = str.replaceAll(suf, "_");
        }

        return str;
    }

    tagging = (str) => {
        if (!str) return '';
        str = this.stemming(str);
        str = this.removeStopWords(str);
        const arr = str.split("_").map((e, i) => {
            if ((i === 0 && e === "_") || (i === str[str.length - 1] && e === "_")) {
                return null;
            }
            return /\s/g.test(e)? e.split(" ") : e;
        }).filter(String)
        const data = arr.flat();
        return data.length !== 0?data.filter(String):data;
    }

}

const getType = (str)=>{
      let data = categories.find((c)=>c.w == str);
      return data ? data.t : '';
}


app.post('/test',(req,res)=>{
    let matches = [];
    if(!req.body.str) return;

    let str = req.body.str;

    const nlp = new ShanNLP();
    let data = nlp.tagging(str);

        data = data.length > 0? data.map(e=>{
            let ssb = new SSB()
            let words = ssb.tokenize(e);
            return words.map(w=>w+getType(w)).join("_")
        }) : '';

    res.status(200).send({
        message:'Success',
        data,
        matches
    })
})

app.listen(4000,()=>{
    console.log('Listening on port 4000, http://localhost:4000')
})