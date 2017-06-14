"use strict";

module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true
        },
        password: DataTypes.STRING
    });

    User.sync().then(() => {
        // Table created
        return User.findOrCreate({ where: {
            username: 'oxxido@gmail.com',
            password: '1234'
        }});
    });

  return User;
};
