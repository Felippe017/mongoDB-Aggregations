db.movies.aggregate([
  {
    $match: {
      awards: { $regex: /(won\s.\soscar)|(won\s.\sorcars)/gi },
    },
  },
  {
    $group: {
      _id: null,
      maior_rating: { $max: "$imdb.rating" },
      menor_rating: { $min: "$imdb.rating" },
      avg_rating: { $avg: "$imdb.rating" },
      des_padrão: { $stdDevSamp: "$imdb.rating" },
    },
  },
  {
    $project: {
      _id: 0,
      maior_rating: 1,
      menor_rating: 1,
      media_rating: { $round: ["$avg_rating", 1] },
      desvio_padrão: { $round: ["$des_padrão", 1] },
    },
  },
]);
