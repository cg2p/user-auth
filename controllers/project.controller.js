const Project = require('../models/project.model');

//test
exports.test = function (req, res) {
    res.send('Greetings from the Project Test controller!');
    console.log("/test fired");
};

// test id 5b2971149b19ffb44e0ce8d8
// get action triggers read a project by id
exports.project_details = function (req, res) {
    Project.findById(req.params.id, function (err, project) {
        if (err) return next(err);
        res.send(project);
    })
};

// POST action triggers create a project
exports.project_create = function (req, res) {

    let project = new Project(
        {
            name: req.body.name,
            dateCreated: Date.now()
        }
    );

    project.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Project created successfully')
    })
};

// PUT action triggers updated by id
exports.project_update = function (req, res) {
    id = req.params.id;
    Project.findByIdAndUpdate(id, {$set: req.body}, function (err, project) {
        if (err) return next(err);
        res.send(`Project ${id} udpated.`);
    });
};

// DELETE action triggers removed by id
exports.project_delete = function (req, res) {
  id = req.params.id;
    Project.findByIdAndRemove(id, function (err) {
        if (err) return next(err);
        res.send(`Deleted ${id} successfully!`);
    })
};
