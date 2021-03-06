module.exports = (sequelize, type) => {
    return sequelize.define('post', {
        id: {
            type: type.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
            unique: true
        },
        title: {
            type: type.STRING,
            allowNull: false
        },
        author: {
            type: type.STRING,
            allowNull: false
        },
        body: {
            type: type.STRING,
            allowNull: false
        }
    })
}