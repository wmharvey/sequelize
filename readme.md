# Using Sequelize with Express, single resource routing

Possible routes:

GET '/drinks' => Gets all drinks in the DB
GET '/drinks/:id' => Gets drink with specific id
GET '/drinks/?type=type&name=name' => Gets drinks filtered by type and/or name
POST '/drinks' => Post a new drink object to the DB with fields {type, name, price, ingredients, caffeine OR calories}
DELETE '/drinks/:id' => Delete drink with specific id
PATCH '/drinks/:id' => updates only the given fields in request body
PUT '/drinks/:id' => updates all fields so request body must be complete
