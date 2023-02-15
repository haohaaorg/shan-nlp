const ShanNLP = require('./shannlp')

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
    let keywords = nlp.keywords(body.str);
    let taggings = nlp.tagging(body.str);
    let stop_words = nlp.stopWords();

    let res = {
        message:'Success',
        keywords,
        taggings,
        stop_words
    };

    return response(200,res)
}