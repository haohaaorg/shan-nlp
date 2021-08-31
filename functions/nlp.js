const ShanNLP = require('./shannlp.min')

const response = (code,data) =>{
    return {
        statusCode:code,
        body:JSON.stringify(data)
    }
}

exports.handler = async function(event,context){
    const body = JSON.parse(event.body);
    if(!body.str){
        return response(401,[]);
    }
    const nlp = new ShanNLP();
    let data = nlp.tagging(body.str);
    let stop_words = nlp.stopWords();

    let res = {
        message:'Success',
        data,
        stop_words
    };

    return response(200,res)
}