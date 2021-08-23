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
      avgViagem: { $avg: "$diferencaTime" },
    },
  },
  {
    $addFields: {
      resultadoMinutos: { $divide: ["$avgViagem", 1000] },
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
      bikeId: "$_id",
      duracaoMedia: { $ceil: { $divide: ["$resultadoMinutos", 60] } },
    },
  },
  {
    $limit: 5,
  },
]);
