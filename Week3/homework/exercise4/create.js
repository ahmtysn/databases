const MongoClient = require("mongodb").MongoClient;

async function main() {
  const uri = "mongodb://localhost:27017";
  const client = new MongoClient(uri);
  try {
    await client.connect();
    // create one
    await createOneCity(client, {
      Name: "Adana",
      CountryCode: "TR",
      District: 4,
      Population: 1768860
    });
    // create many
    await createMultipleCities(client, [
      {
        Name: "Istanbul",
        CountryCode: "TR",
        District: 1,
        Population: 14377019
      },
      {
        Name: "Athens",
        CountryCode: "GR",
        District: 2,
        Population: 664046
      },
      {
        Name: "Amsterdam",
        CountryCode: "NL",
        District: 3,
        Population: 821452
      }
    ]);
    await showAllCities(client, "city");
  } finally {
    await client.close();
  }
}

main().catch(console.error());

async function createOneCity(client, city) {
  const result = await client
    .db("world")
    .collection("city")
    .insertOne(city);
  console.log(`New city created with the following id: ${result.insertedId}`);
}

async function createMultipleCities(client, cities) {
  const result = await client
    .db("world")
    .collection("city")
    .insertMany(cities);
  console.log(
    `${result.insertedCount} new cities created with the following id(s):}`
  );
  console.log(result.insertedIds);
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
