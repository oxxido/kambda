"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING,
        hash: DataTypes.STRING
    });

    User.sync().then(() => {
        // Table created
        return User.findOrCreate({ where: {
            username: 'oxxido@gmail.com',
            password: '1234',
            hash: '3c1337aa7b616dc84055c9376e92bf9f806ddc74'
        }});
    });

  return User;
};
