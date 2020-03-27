const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();

    // update

    await findCityByName(client, "Adana");
    await updateCityByName(client, "Adana", { Population: 2180420 });
    await findCityByName(client, "Adana");

    // update many

    await updateAllCities(client);
    await showAllCities(client, "city");
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

async function updateCityByName(client, cityName, updateField) {
  const result = await client
    .db("world")
    .collection("city")
    .updateOne({ Name: cityName }, { $set: updateField });
  console.log(result.modifiedCount);
}

async function updateAllCities(client) {
  const result = await client
    .db("world")
    .collection("city")
    .updateMany({ Region: { $exists: false } }, { $set: { Region: "Europe" } });
  console.log(`${result.matchedCount} cities matched the query criteria.`);
  console.log(`${result.modifiedCount} cities were updated.`);
}

async function showAllCities(client, collection) {
  await client
    .db("world")
    .collection(collection)
    .find({})
    .toArray((err, results) => {
      if (err) throw err;
      console.log(results);
    });
}
