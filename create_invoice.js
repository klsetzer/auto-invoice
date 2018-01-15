#!/usr/bin/env node

// TODO
// X download json report from toggl
// X read toggl api token from file
// X read user_agent and workspace id from file
// Make sure date range in report request is correct
// save json into variable = how do I get the scope right?
// compute all values
// Create invoice date and number
// render into file
// git commit and push
// copy invoice to rothtechs Dropbox folder

var ejs = require('ejs');
var request = require('request');
const yaml = require('js-yaml');
const fs = require('fs');
var prettyjson = require('prettyjson');

try {
    var toggl = yaml.safeLoad(fs.readFileSync('toggl_config.yml', 'utf8'));
} catch (e) {
    console.log(e);
}

var http_options = {
    url: toggl.api_url,
    qs: {
        user_agent: toggl.email_address,
        workspace_id: toggl.workspace_id
    },
    method: 'GET',
    auth: {
        user: toggl.api_token,
        pass: 'api_token'
    }
};

request(http_options, function (error, response, body) {
    if (!error && response.statusCode == 200) {
        // console.log(body);
        invoice = JSON.parse(body);
        console.log(JSON.stringify(invoice, null, 4));
    }
});

// ejs.renderFile(__dirname + '/html-invoice/index.html', invoice, function(err, ata) {
//     console.log(err || data)
// });


