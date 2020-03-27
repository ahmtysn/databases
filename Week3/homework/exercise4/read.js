const { MongoClient } = require("mongodb");

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // find city according to name
    await findCityByName(client, "Athens");
    // find city according to country code
    await findCityByCountryCode(client, "NL");
    // find all cities according to country code
    await findAllCityByCountryCode(client, "TR");
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

async function findCityByCountryCode(client, countryCode) {
  const result = await client
    .db("world")
    .collection("city")
    .findOne({ CountryCode: countryCode });
  if (result) {
    console.log(`Found a city with the country code '${countryCode}':`);
    console.log(result);
  } else console.log(`No city with ${countryCode} country code..`);
}

async function findAllCityByCountryCode(client, countryCode) {
  await client
    .db("world")
    .collection("city")
    .find({ CountryCode: countryCode })
    .toArray((err, result) => {
      if (err) throw err;
      if (result) {
        console.log(`Found cities with the country code '${countryCode}':`);
        console.log(result);
      } else console.log(`No city with ${countryCode} country code..`);
    });
}
