module.exports = (connection, DataTypes) => {
  const schema = {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          args: [true],
          msg: "We need the book title",
        },
        notEmpty: {
          args: [true],
          msg: "Book title cannot be empty",
        },
      },
    },
    ISBN: DataTypes.STRING,
  };

  const BookModel = connection.define("Book", schema, {
    timestamps: false,
  });

  return BookModel;
};
