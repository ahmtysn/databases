const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // delete one
    // await findCityByName(client, "Adana");
    // await deleteCityByName(client, "Adana");
    // await findCityByName(client, "Adana");
    // delete many
    // await findAllCitiesByRegion(client, "Europe");
    // await deleteAllCitiesByRegion(client, "Europe");
    await findAllCitiesByRegion(client, "Europe");
  } finally {
    await client.close();
  }
}
main().catch(console.error);

async function findCityByName(client, cityName) {
  const result = await client
    .db("world")
    .collection("city")
    .findOne({ Name: cityName });
  if (result) {
    console.log(`Found a city with the name '${cityName}':`);
    console.log(result);
  } else console.log(`No city name about ${cityName}`);
}

async function deleteCityByName(client, cityName) {
  const result = await client
    .db("world")
    .collection("city")
    .deleteOne({ Name: cityName });
  console.log(`${result.deletedCount} documents was deleted...`);
}

async function findAllCitiesByRegion(client, region) {
  await client
    .db("world")
    .collection("city")
    .find({ Region: region })
    .toArray((err, result) => {
      if (err) throw err;
      if (result) {
        console.log(`Found cities with the region '${region}':`);
        console.log(result);
      } else console.log(`No city with ${region} region..`);
    });
}

async function deleteAllCitiesByRegion(client, region) {
  const result = await client
    .db("world")
    .collection("city")
    .deleteMany({ Region: region });
  console.log(`${result.deletedCount} document(s) was/were deleted.`);
}
