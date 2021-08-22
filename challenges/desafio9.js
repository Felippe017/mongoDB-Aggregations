db.trips.aggregate([
  {
    $match: {
      birthYear: { $exists: true, $ne: "" },
    },
  },
  {
    $addFields: {
      birthInt: { $toInt: "$birthYear" },
    },
  },
  {
    $group: {
      _id: null,
      mAnoNascimento: { $max: "$birthInt" },
      meAnoNascimento: { $min: "$birthInt" },
    },
  },
  {
    $project: {
      _id: 0,
      maiorAnoNascimento: "$mAnoNascimento",
      menorAnoNascimento: "$meAnoNascimento",
    },
  },
]);
