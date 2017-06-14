"use strict";

module.exports = function(sequelize, DataTypes) {
    var Todo = sequelize.define("Todo", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        text: DataTypes.STRING,
        done: DataTypes.BOOLEAN,
    });

    Todo.sync();

    return Todo;
};
