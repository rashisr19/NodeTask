module.exports = {
    configure: function (app, mongo, ObjectID, url, assert, User) {
        var user_module = require('../component/user_component')(mongo, ObjectID, url, assert, User);
        const shortid = require('shortid');



        app.post('/add_user', function (req, res) {
            try {
                // const  _id = shortid.generate();
                const firstName = req.body.firstName;
                const lastName = req.body.lastName;
                const email = req.body.email;
                const phone = req.body.phone;
                const address = req.body.address;
                var new_user = {firstName, lastName, email, phone, address};
                user_module.add_user(new_user, function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            } catch (er) {
                console.log("error occures: " + er);
                res.json({ status: false, message: "failed at try block...!" });
            }
        });

        app.delete('/delete_user/:userid', function (req, res) {
            try {
                if (req.params.userid) {
                    user_module.delete_user(req.params.userid, function (result, error, message) {

                        if (error) {
                            res.json({ status: false, message: message });
                          } else {
                            res.json({ status: true, message: message, result: result });
                          }

                    })
                }
                else {
                      res.json({ status: false, message: "id parameter is missing" });
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

        app.get('/view_users', function (req, res) {
            try {

                user_module.view_all_users(function (result, error, message) {
                    if (error) {
                        res.json({ status: false, message: message });
                    }
                    else {
                        res.json({ status: true, message: message, result: result });
                    }
                })
            }
            catch (er) {
                confirm.log("Error Occured: " + er);
                res.json({ status: false, message: "failed at try" })
            }
        });

        app.put('/update_user/:userid', function(req, res) {
            try{
                if (req.params.userid) {
                    const firstName = req.body.firstName;
                    const lastName = req.body.lastName;
                    const email = req.body.email;
                    const phone = req.body.phone;
                    const address = req.body.address;                    
                    var updated_user = {firstName, lastName, email, phone, address};
                    user_module.update_user(req.params.userid, updated_user, function (result, error, message) {
                        if (error) {
                            res.json({ status: false, message: message });
                        }
                        else {
                            res.json({ result: result, status: true, message: message });
                        }                    
                    })
                }
                else {
                      res.json({ status: false, message: "id parameter is missing" });
                }

            } catch (e) {

            }
        });

        app.get('/view_users/:userid', function (req, res) {
            try {
                if (req.params.userid) {
                    user_module.view_specific_user(req.params.userid, function (result, error, message) {

                        if (error) {
                            res.json({ status: false, message: message });
                          } else {
                            res.json({ status: true, message: message, result: result });
                          }

                    })
                }
                else {
                      res.json({ status: false, message: "id parameter is missing" });
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });


        app.post('/copy_user/:userid', function (req, res) {
            try {
                if (req.params.userid) {
                    user_module.copy_user(req.params.userid, function (result, error, message) {

                        if (error) {
                            res.json({ status: false, message: message });
                          } else {
                            
                            res.json({ status: true, message: message, result: result });
                          }

                    })
                }
                else {
                      res.json({ status: false, message: "id parameter is missing" });
                }
            } catch (er) {
                console.log("error occured : " + er);
                res.json({ status: false, Message: "failed at try" });
            }
        });

    }
}