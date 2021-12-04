const mongoose = require('mongoose');


var options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true,
    useUnifiedTopology: true
};

mongoose.connect('mongodb+srv://lacapsule:EXIrgUdaFEllfNSH@cluster0-9xbpy.mongodb.net/blackboard?retryWrites=true&w=majority',
    options,
    function (err) {
        if (err) {
            console.log(`error, failed to connect to the database because ur a failure --> ${err}`);
        } else {
            console.info('*** Database connection : YOU DID IT WELL DONE HANDSOME ***');
        }
    }
);