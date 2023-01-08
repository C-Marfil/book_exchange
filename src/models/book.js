module.exports = (connection, DataTypes) => {
    const schema = {
        title: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: 'We need the book title',
                    },
                notEmpty: {
                    args: [true],
                    msg: 'Book title cannot be empty',
                    },
                },
            },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notNull: {
                    args: [true],
                    msg: 'We need the book title',
                },
                notEmpty: {
                    args: [true],
                    msg: 'Book title cannot be empty',
                },
            },
        },
        genre: DataTypes.STRING,
        ISBN: DataTypes.STRING,
    };

    const BookModel = connection.define('Book', schema);
    return BookModel;
}; 