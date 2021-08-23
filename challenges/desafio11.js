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
      _id: "$week",
      totalViagens: { $count: { } },
    },
  },
  {
    $sort: {
      totalViagens: -1,
    },
  },
  {
    $project: {
      _id: 0,
      diaDaSemana: "$_id",
      total: { $max: "$totalViagens" },
    },
  },
  {
    $limit: 1,
  },
]);
