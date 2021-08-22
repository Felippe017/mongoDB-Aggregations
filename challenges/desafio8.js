db.air_alliances.aggregate([
  {
    $unwind: "$airlines",
  },
  {
    $lookup: {
      from: "air_routes",
      let: { air_list: "$airlines" },
      pipeline: [
        {
          $match: {
            $expr: {
              $eq: ["$$air_list", "$airline.name"],
            },
          },
        },
      ],
      as: "match_company",
    },
  },
  {
    $unwind: "$match_company",
  },
  {
    $match: {
      name: "SkyTeam",
      "match_company.airplane": { $in: ["747", "380"] },
    },
  },
  {
    $group: {
      _id: "$name",
      totalRotas: { $sum: 1 },
    },
  },
  {
    $project: {
      totalRotas: 1,
    },
  },
]);
