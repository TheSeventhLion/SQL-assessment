SELECT make, model, year, owner_id FROM vehicles
INNER JOIN users ON vehicles.owner_id = users.id
WHERE email = $1;