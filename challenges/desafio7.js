db.movies.aggregate([
  {
    $match: {
      cast: { $exists: true },
      languages: { $all: ["English"] },
    },
  },
  {
    $unwind: "$cast",
  },
  {
    $group: {
      _id: "$cast",
      numeroFilmes: { $count: { } },
      meIMDB: { $avg: "$imdb.rating" },
    },
  },
  {
    $sort: {
      numeroFilmes: -1,
      _id: -1,
    },
  },
  {
    $project: {
      numeroFilmes: 1,
      mediaIMDB: { $round: ["$meIMDB", 1] },
    },
  },
]);
