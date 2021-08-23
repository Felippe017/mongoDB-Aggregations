db.trips.aggregate([
  {
    $addFields: {
      month: { $month: "$startTime" },
      day: { $dayOfMonth: "$startTime" },
    },
  },
  {
    $match: {
      month: { $eq: 3 },
      day: { $eq: 10 },
    },
  },
  {
    $addFields: {
      diferencaTime: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: null,
      avgViagens: { $avg: "$diferencaTime" },
    },
  },
  {
    $addFields: {
      resultadoMinutos: { $divide: ["$avgViagens", 1000] },
    },
  },
  {
    $project: {
      _id: 0,
      duracaoMediaEmMinutos: { $ceil: { $divide: ["$resultadoMinutos", 60] } },
    },
  },
]);
