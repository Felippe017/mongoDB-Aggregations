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
      _id: "$usertype",
      mediaViagem: { $avg: "$diferencaTime" },
    },
  },
  {
    $addFields: {
      hora: { $divide: ["$mediaViagem", 1000 * 60 * 60] },
    },
  },
  {
    $sort: {
      hora: 1,
    },
  },
  {
    $project: {
      _id: 0,
      tipo: "$_id",
      duracaoMedia: { $round: ["$hora", 2] },
    },
  },
]);
