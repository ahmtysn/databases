// i hope it's ok now :)
const numOfAuthorsOnResearch = `select count(r.author_id), r.paper_id, p.paper_title 
from relations r 
left join papers p 
on r.paper_id = p.paper_id 
group by r.paper_id;`;

const femaleResearchers = `select a.gender, count(r.paper_id) 
from relations r 
inner join authors a 
on r.author_id = a.author_no 
where a.gender ='f';`;

const avgH_index = `SELECT university, AVG(h_index) from authors GROUP BY university`;

const sumPapersPerUniversities = `SELECT a.university, COUNT(r.paper_id) as Sum_Research
FROM relations r
JOIN papers p
ON r.paper_id = p.paper_id
JOIN authors a
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

module.exports = { queries };
