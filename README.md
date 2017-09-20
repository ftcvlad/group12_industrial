# Run

- gradle build (if you have gradle installed)
- gradlew build (if you don't have gradle installed)
- gradle appRun (to run Jetty server )



# Database (update!)

- create a config.properties file in this folder(check config.properties.EXAMPLE). Set database credentials in config.properties. You don't have to set them anywhere else. 


## Migrations

If you make any changes to database schema, add a migration sql file (containing all changes) to src/main/resources/db/migrations. Migration file name starts with a version number (V1)and a separator ("__").

- "gradle flywayInfo" to check if there are pending migrations
- "gradle flywayMigrate" to run database migrations  (if you already have some tables, you need to drop them)

more at https://flywaydb.org/
