module.exports = (connection, DataTypes) => {
  const schema = {
    genre: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        notNull: {
          arg: [true],
          msg: "Please select a genre",
        },
        notEmpty: {
          args: [true],
          msg: "Genre field cannot be empty",
        },
      },
    },
  };

  const GenreModel = connection.define("Genre", schema, {
    timestamps: false,
  });

  return GenreModel;
};
