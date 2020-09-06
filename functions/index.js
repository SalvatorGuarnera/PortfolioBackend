const functions = require('firebase-functions');
//Cors policy going here
const cors = require('cors');
const app = require('express')();
app.use(cors({origin: true}));

// const { db } = require('./util/admin');

const {login, getResume, sendEmail} = require('./handlers/users');
const {createProject, getProject, getProjects, updateProject} = require('./handlers/projects');
const fbAuth = require('./util/fbAuth');

app.post('/login', login);
app.post('/createProject', fbAuth, createProject);
app.post('/updateProject/:projectId', fbAuth, updateProject);
app.post('/sendEmail', sendEmail);

app.get('/getProject/:projectId', getProject);
app.get('/getProjects', getProjects);
app.get('/getResume', getResume);


exports.api = functions.https.onRequest(app);