module.exports = (connection, DataTypes) => {
    const schema = {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notNull: {
                    args: [true],
                    msg: 'We need your name',
                  },
                notEmpty: {
                args: [true],
                msg: 'Name cannot be empty',
                },
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
                notNull: {
                    args: [true],
                    msg: 'We need your email',
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
                notNull: {
                    args: [true],
                    msg: 'We need a password',
                  },
            },
        },
    };

    const ReaderModel = connection.define('Reader', schema);
    return ReaderModel;
};