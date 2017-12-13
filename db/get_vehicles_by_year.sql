SELECT v.make, v.model, v.year, v.owner_id, u.name
FROM vehicles v
INNER JOIN users u ON v.owner_id = u.id
WHERE v.year > 2000
ORDER BY v.year DESC;