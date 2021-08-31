# SHAN NLP (experimental project)

[Demo တီႈၸၢမ်း](https://shan-nlp.netlify.app)


### CDN Link
```
https://cdn.jsdelivr.net/gh/kwarm/shan-nlp@master/functions/shannlp.min.js
```

### Usage

```javascript

const nlp    = new ShanNLP();
const tagging = nlp.tagging('တေၸႂ်ႉတိုဝ်းလႆႈ တၢင်း font unicode ၵူၺ်းၶႃႈ ယဝ်ႉၵေႃႈ ဢၼ်ၼႆႉပဵၼ်ဢၼ်ၸၢမ်းတူၺ်းၵူၺ်းၶႃႈ');
console.log(tagging) 
console.log(nlp.stopWords())

// Result ⬇ 
// Tagging
// [
//     "ၸႂ်ႉ(v)_တိုဝ်း(v)",
//     "font",
//     "unicode",
//     "ပဵၼ်(prep)",
//     "ၸၢမ်းတူၺ်း(v)"
// ]

// Stopwords
// [
//     "တေ",
//     "တၢင်း",
//     "ယဝ်ႉၵေႃႈ",
//     "ဢၼ်",
//     "ၼႆႉ",
//     "ၵူၺ်း",
//     "ၶႃႈ",
//     "လႆႈ"
// ]

```

### Methods 

**tagging()**
Tagging words - remove stopwords and add word's type such as (noun,verb,prep,adj,adv) 

**tokenize()**
Tokenize - splitting the sentence into word array.

**stopWords()**
Stop words - extract stop words from the sentence.
