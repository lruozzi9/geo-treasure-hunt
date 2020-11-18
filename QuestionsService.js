const fs = require('fs');

module.exports = class QuestionsService {

    constructor() {
        var _this = this;
        fs.readFile("questions.json", function (error, data) {
            _this.questions = JSON.parse(data);
        });
    }

    getQuestions() {
        return this.questions;
    }

    getQuestion(id) {
        return this.questions[id];
    }
    

}