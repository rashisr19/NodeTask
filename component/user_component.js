const { response } = require("express");
const shortid = require('shortid');


module.exports = function (mongo, ObjectID, url, assert, User) {
    var user_module = {

        add_user: function (new_user, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection('User').insertOne(new_user, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "User Added Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        delete_user: function (id, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection('User').deleteOne({
                        "_id": new ObjectID(id)
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "User Removed Successfully");
                        }
                        db.close();
                    }
                    )

                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        view_all_users: function (callBack) {
            try {
                users = [];
                mongo.connect(url, { useNewUrlParser: true }, function (err, db) {
                    assert.equal(null, err);
                    var cursor = db.db().collection('User').find();
                    cursor.forEach(function (doc, err) {
                        if (err) {
                            callBack(null, true, err);
                            db.close();
                        }
                        else {
                            users.push(doc);
                        }
                    }, function () {
                        if (users.length == 0) {
                            callBack(null, true, "No user found");
                        }
                        else {
                            callBack(users, false, "User found");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },

        update_user : function(id,updated_user ,callBack) {
            try{
                mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db){
                    assert.equal(null, err);
                    db.db().collection('User').updateOne({
                        "_id": new ObjectID(id) },{ $set : updated_user
                    }, function (err, result) {
                        if (err) {
                            callBack(null, true, "Error Occurred");
                        }
                        else {
                            callBack(result, false, "User Updated Successfully");
                        }
                        db.close();
                    })
                })
            } catch (e) {
                callBack(null, true, e);
            }
        },


        view_specific_user : function(id, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection('User').findOne({"_id": new ObjectID(id)},
                        function (err, result) {
                            if (err) {
                                callBack(null, true, "Error Occurred");
                            }
                            else {
                                callBack(result, false, "Specific User found Successfully");
                            }
                            db.close();
                        }
                    )
                
                })

            } catch(e) {
                callBack(null, true, e);
            }
        },

        copy_user : function(id, callBack) {
            try {
                mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, function (err, db) {
                    assert.equal(null, err);
                    db.db().collection('User').findOne({"_id": new ObjectID(id)})
                        .then((response) => {
                        const firstName = response.firstName;
                        const lastName = response.lastName;
                        const email = response.email;
                        const phone = response.phone;
                        const address = response.address;
                        var copied_user = {firstName, lastName, email, phone, address};
                        db.db().collection('User').insertOne(copied_user, function (err, result) {
                            if (err) {
                                callBack(null, true, "Error Occurred");
                            }
                            else {
                                callBack(result, false, "User Added Successfully");
                            }
                            db.close();
                        })

                    }, (err) => next(err))
                    .catch((err) => next(err));
                    
                
                })

            } catch(e) {
                callBack(null, true, e);
            }
        }

    }
    return user_module;
}