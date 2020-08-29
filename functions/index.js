const functions = require('firebase-functions');
//Cors policy
const cors = require('cors');
const app = require('express')();
app.use(cors({origin: true}));

// const { db } = require('./util/admin');

const {login} = require('./handlers/users');
const {createProject, getProject, getProjects} = require('./handlers/projects');
const fbAuth = require('./util/fbAuth');

app.post('/login', login);
app.post('/createProject', fbAuth, createProject);
app.get('/getProject/:projectId', getProject);
app.get('/getProjects', getProjects);

exports.api = functions.https.onRequest(app);