db.trips.aggregate([
  {
    $addFields: {
      diferencaTime: {
        $subtract: ["$stopTime", "$startTime"],
      },
    },
  },
  {
    $group: {
      _id: "$bikeid",
      avgViagens: { $avg: "$diferencaTime" },
    },
  },
  {
    $addFields: {
      resultadoMinutos: { $divide: ["$avgViagens", 1000] },
    },
  },
  {
    $sort: {
      resultadoMinutos: -1,
    },
  },
  {
    $project: {
      _id: 0,
      bikeid: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$resultadoMinutos", 60] } },
    },
  },
  {
    $limit: 5,
  },
]);
