const mongoose = require('mongoose');
const loggers = require('loggers');

const Schema = mongoose.Schema;
const Model = mongoose.model;

// Schemas
const Images = new Schema({
    kind: {
        type: String,
        enum: ['thumbnail', 'detail'],
        required: true,
    },
    url: { type: String, required: true },
});

const Article = new Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    images: [Images],
    modified: { type: Date, default: Date.now },
});

// validation
Article.path('title').validate((v) => {
    return v.length > 5 && v.length < 70;
});

const ArticleModel = Model('Article', Article);

module.exports.ArticleModel = ArticleModel;
