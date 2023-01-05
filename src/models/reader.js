module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: {
                arg:[false],
                msg: 'We need a book title'
            },
            unique: {
                arg:[true],
                msg: 'This title already exists'
            }
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isEmail: {
                    arg: true,
                    msg: 'Make sure this is a valid email'
                },
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [8],
                    msg: 'Please make sure your password is at least 8 characters long'
                },
            },
        },
    };

    const ReaderModel = connection.define('Reader', schema);
    return ReaderModel;
};