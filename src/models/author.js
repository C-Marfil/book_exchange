module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: 'We need the name of the author',
                    },
                notEmpty: {
                    args: [true],
                    msg: 'Author name cannot be empty',
                    },
                },
            },
        };
        
    const AuthorModel = connection.define('Author', schema, {
        timestamps: false
      });
    return AuthorModel;
}; 