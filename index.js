const words = require('./words.json');

class ShanNLP {
    stemming = (str) => {
        const { prefix_suffix, prefix, suffix } = words.stemwords;
        // pre_suf
        for (let pre_suf of prefix_suffix) {
            let reg = new RegExp(`${pre_suf}`, 'gm')
            str = str.replace(reg, "_$1");
        }

        // suf
        for (let suf of suffix) {
            str = str.replace(suf, "_");
        }

        // pre
        for (let pre of prefix) {
            str = str.replace(pre, "_");
        }
        return str;
    }

    removeStopWords = (str) => {
        const { conjunction, suffix } = words.stopwords;
        // suf
        for (let suf of suffix) {
            str = str.replace(suf, "_");
        }

        // pre
        for (let pre of conjunction) {
            str = str.replace(pre, "_");
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
            return e;
        }).filter(String)
        return arr;
    }

}

const nlp = new ShanNLP();
const res = nlp.tagging('ပေႃးၾူၼ်မႃးၸိူင်ႉၼႆၽူႇလၵ်ႉၵႆႉၼမ်ၼႂ်ဝႃႇ');
console.log(res) // [ 'ၾူၼ်မႃး', 'ၽူႇလၵ်ႉ', 'ၼမ်' ]