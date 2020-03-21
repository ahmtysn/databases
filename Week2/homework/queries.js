const numOfAuthorsOnResearch = `SELECT DISTINCT(author_name) as Names 
FROM papers p
RIGHT JOIN relations r
ON p.paper_id = r.paper_id
LEFT JOIN authors a
ON a.author_no = r.author_id`;

const femaleResearchers = `SELECT COUNT(DISTINCT(author_name)) as Counts_of_Female_Researchers
FROM authors a
LEFT JOIN relations r
ON a.author_no = r.author_id
WHERE gender = 'f'`;

const avgH_index = `SELECT university, AVG(h_index) from authors GROUP BY university`;

const sumPapersPerUniversities = `SELECT a.university, COUNT(r.paper_id) as Sum_Research
FROM relations r
LEFT JOIN papers p
ON r.paper_id = p.paper_id
LEFT JOIN authors a
ON a.author_no = r.author_id
GROUP BY a.university`;

const minAndMaxH_Index = `SELECT university,min(h_index) as min_point, max(h_index) as max_point
FROM authors
GROUP BY university;`;

const queries = [
  numOfAuthorsOnResearch,
  femaleResearchers,
  avgH_index,
  sumPapersPerUniversities,
  minAndMaxH_Index
];

module.exports = {
  numOfAuthorsOnResearch,
  femaleResearchers,
  avgH_index,
  sumPapersPerUniversities,
  minAndMaxH_Index,
  queries
};
