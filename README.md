# Run

- ```gradle build``` (if you have gradle installed)
- ```gradlew build``` (if you don't have gradle installed)
- ```gradle appRun``` (to run Jetty server )

# Run in labs

in labs java_home is wrong. To set java_home for current run you can use ``` gradle build -Dorg.gradle.java.home="C:\Program Files\Java\jdk1.8.0_60" ``` 

- Or you can change ```gradle.build``` to take it from ```config.properties```, but it's not done yet

don't set it in ```gradlew.bat``` or ```gradle.build```, as others won't be able to run on their pcs



# Database (update!)

create a ```config.properties``` file in this folder (check ```config.properties.EXAMPLE```). Set database credentials in ```config.properties```.( ```hibernate.cfg.xml``` is overwritten by these). You don't have to set them anywhere else. 


## Migrations

If you make any changes to database schema, add a migration sql file (containing all changes) to ```src/main/resources/db/migrations```. Migration file name starts with a version number (V1) and a separator ("__").

- ```gradle flywayInfo``` to check if there are pending migrations
- ```gradle flywayMigrate``` to run database migrations  (if you already have some tables, you need to drop them)

more at https://flywaydb.org/
