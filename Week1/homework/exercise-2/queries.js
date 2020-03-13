const queries = [
  {
    query: "SELECT name, population FROM country WHERE population > 8000000;",
    description: "Countries names with population greater than 8 million.."
  },
  {
    query: "SELECT name FROM country WHERE name LIKE '%land%';",
    description: "Countries names that have “land” in their names.."
  },
  {
    query:
      "SELECT name, population FROM city WHERE population BETWEEN 500000 AND 1000000;",
    description:
      "Names of the cities with population in between 500,000 and 1 million.."
  },
  {
    query: "SELECT name FROM country WHERE continent = 'Europe';",
    description: "Name of all the countries on the continent 'Europe'.."
  },
  {
    query: "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC;",
    description: "Countries in the descending order of their surface areas.."
  },
  {
    query: "SELECT name, countryCode from city where countryCode = 'NLD';",
    description: "Names of all the cities in the Netherlands.."
  },
  {
    query: "SELECT name, population FROM city WHERE name = 'Rotterdam';",
    description: "The population of Rotterdam.."
  },
  {
    query:
      "SELECT name, SurfaceArea FROM country ORDER BY SurfaceArea DESC LIMIT 10;",
    description: "The top 10 countries by Surface Area.."
  },
  {
    query:
      "SELECT name, population FROM city ORDER BY population DESC LIMIT 10;",
    description: "The top 10 most populated cities.."
  },
  {
    query: "SELECT SUM(population)  AS 'Population of the World' FROM country;",
    description: "The population number of the world.."
  }
];

module.exports = queries;
