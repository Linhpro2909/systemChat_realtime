const path = require('path')
const express = require('express')
const expressLayouts = require('express-ejs-layouts');
const configViewEngine = (app) => {
    // view engine
    app.set('views', path.join(__dirname, '../views'))
    app.set('view engine', 'ejs');
    app.use(express.static(path.join(__dirname, '../public')))
    app.use(expressLayouts);
    app.set('layout', 'mater');
}
module.exports = configViewEngine;