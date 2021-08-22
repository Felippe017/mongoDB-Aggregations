db.trips.aggregate([
  {
    $addFields: {
      week: {
        $dayOfWeek: "$startTime",
      },
    },
  },
  {
    $group: {
      _id: {
        week: "$week",
        startStationName: "$startStationName",
      },
      totalViagens: { $count: { } },
    },
  },
  {
    $sort: {
      totalViagens: -1,
    },
  },
  {
    $limit: 1,
  },
  {
    $project: {
      _id: 0,
      nomeEstacao: "$_id.startStationName",
      total: "$totalViagens",
    },
  },
]);
