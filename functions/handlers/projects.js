const { admin, db } = require('../util/admin');

const {validateProjectData} = require('../util/validators');

exports.createProject = (req, res) => {
    const project = {
        rank: req.body.rank,
        name: req.body.name,
        technologies: req.body.technologies,
        about: req.body.about,
        linkSet: req.body.linkSet,
        isPrivate: req.body.isPrivate,
        inProgress: req.body.inProgress,
        banner: req.body.banner,
    };

    const { valid, errors } = validateProjectData(project);
    if (!valid) return res.status(400).json(errors);

    db.collection('projects')
        .add(project)
        .then((doc) => {
            const resProject = project;
            resProject.projectId = doc.id;
            return res.json(resProject);
        })
        .catch((err) => {
            res.status(500).json({error : 'Error creating project'});
            return console.error(err);
        });
};

exports.updateProject = (req, res) => {

    const newProjectData = {
        rank: req.body.rank,
        name: req.body.name,
        technologies: req.body.technologies,
        about: req.body.about,
        linkSet: req.body.linkSet,
        isPrivate: req.body.isPrivate,
        inProgress: req.body.inProgress,
        banner: req.body.banner,
    };

    const { valid, errors } = validateProjectData(newProjectData);
    if (!valid) return res.status(400).json(errors);

    db.collection('projects').doc(req.params.projectId)
        .set(newProjectData)
        .then(() => {
            return res.status(200).json({message : "Successfully updated project data"});
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });

}

exports.getProject = (req, res) => {
    let projectData = {};
    db.doc(`/projects/${req.params.projectId}`)
        .get()
        .then((doc) => {
            if(!doc.exists){
                return res.status(404).json({error : "Project not found"});
            }
            projectData = doc.data();
            projectData.documentId = doc.id;
            return res.json(projectData);
        })
        .catch((err) => {
            console.error(err);
            return res.status(500).json({error: err.code});
        });
};

exports.getProjects = (req, res) => {
    db.collection('projects').orderBy('rank').get().then(function(querySnapshot){
        let projects = [];
        querySnapshot.forEach(function(doc){
            projects.push({
                rank: doc.data().rank,
                name: doc.data().name,
                technologies: doc.data().technologies,
                about: doc.data().about,
                linkSet: doc.data().linkSet,
                isPrivate: doc.data().isPrivate,
                inProgress: doc.data().inProgress,
                banner: doc.data().banner,
            });
        });
        return res.status(200).json(projects);
    }).catch((err) => {
        console.error(err);
        return res.status(500).json({error: err.code});
    });
};