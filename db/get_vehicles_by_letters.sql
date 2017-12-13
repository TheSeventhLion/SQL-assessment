SELECT vehiclesFROM vehicles
JOIN users ON vehicles.owner_id = users.id
WHERE users.name LIKE $1;