const categories = require('./w.json')
const words = require('./words.json')
const SSB = require('./SSB');

class ShanNLP {
    data = [];
    matches = [];

    tokenize = (str) =>{
        const ssb = new SSB();
        return ssb.tokenize(str);
    }

    stemming = (str) => {
        const { prefix_suffix, prefix, suffix } = words.stemwords;
        // pre_suf
        for (let pre_suf of prefix_suffix) {
            let reg = new RegExp(`${pre_suf}`, 'gm')
            str = str.replace(reg, (m)=>{
                this.addToMatches(m)
                return "_$1";
            });
        }

        // suf
        for (let suf of suffix) {
            let reg2 = new RegExp(`${suf}`, 'gm')
            str = str.replace(reg2, (m)=>{
                this.addToMatches(m)
                return "_";
            });
        }

        // pre
        for (let pre of prefix) {
            let reg3 = new RegExp(`${pre}`, 'gm')
            str = str.replace(reg3, (m)=>{
                this.addToMatches(m)
                return "_";
            });
        }
        return str;
    }

    removeStopWords = (str) => {
        const { conjunction, suffix } = words.stopwords;
    
        // pre
        for (let pre of conjunction) {
            let reg = new RegExp(pre,'gm');
            str = str.replace(reg, (m)=>{
                this.addToMatches(m)
                return "_";
            });
        }

        // suf
        for (let suf of suffix) {
            let reg2 = new RegExp(suf,'gm');
            str = str.replace(reg2, (m)=>{
                this.addToMatches(m)
                return "_";
            });
        }

        return str;
    }

    tagging = () => {
        this.keywords();
        if(this.data.length === 0){
            return;
        }
        let ssb = new SSB()
        let final = [];
        this.data.forEach(e=>{
            if(!e) return;
            let cat = this.getType(e);
            if(cat !== '-'){
                final.push(e+cat);
                return;
            }
            let words = ssb.tokenize(e);
            let w = words.map(w=>{
                let cat = this.getType(w);
                if(cat == '-') return w;
                return w+cat;
            }).filter(String).join("_");
            final.push(w);
        });
        return final;
    }

    keywords = (str) => {
        if (!str) return '';
        str = this.stemming(str);
        str = this.removeStopWords(str);
        const arr = str.split("_").map((e, i) => {
            if ((i === 0 && e === "_") || (i === str[str.length - 1] && e === "_")) {
                return null;
            }
            return /\s/g.test(e)? e.split(" ") : e;
        }).filter(String);
        let data = arr.flat().filter(String);
        console.log(data)
        this.data = data;
        return data;
    }

    addToMatches = (match) =>{
        if(this.matches.includes(match)) return;
        this.matches.push(match)
    }

    stopWords = ()=>{
        return this.matches;
    }

    getType = (str)=>{
        let data = categories.find((c)=>c.w == str);
        return data ? data.t : '-';
   }

}

module.exports = ShanNLP;