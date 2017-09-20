package com.group12;

/*import org.reflections.Reflections;
import org.reflections.scanners.ResourcesScanner;
import org.reflections.util.ClasspathHelper;
import org.reflections.util.ConfigurationBuilder;*/


import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;


/**
 * Application configuration. Taken from Agile module!
 *
 * @author Robert T.
 */

public class ConfigurationLoader {

    private ConfigurationLoader() {} // Static

    public static String DATABASE_HOST = "localhost";
    public static int DATABASE_PORT = 3306;
    public static String DATABASE_SCHEMA = "quizsystem";
    public static String DATABASE_USER;
    public static String DATABASE_PASSWORD;

    private static Properties props;

    static void load() {
        props = new Properties();
        File propsFile = new File("config.properties");
        if (propsFile.exists() && propsFile.isFile() && propsFile.canRead()) {
        	System.out.println(1);
            // Load from disk
            try {
                FileInputStream inputStream = new FileInputStream(propsFile);
                props.load(inputStream);
                inputStream.close();
            } catch (Exception ex) {
                // This shouldn't ever happen.
                throw new RuntimeException(ex);
            }
        } else {
        	System.out.println(2);
            // Load from classpath
            try {
                InputStream is = ConfigurationLoader.class.getClassLoader().getResourceAsStream("config.properties");
                props.load(is);
            } catch (NullPointerException ex) {
                // Pass - not on classpath.
            } catch (IOException ex) {
                throw new RuntimeException(ex);
            }
        }

        String dbHost = getConfigKeyRaw("DATABASE_HOST");
        if (dbHost != null) DATABASE_HOST = dbHost;

        String dbSchema = getConfigKeyRaw("DATABASE_SCHEMA");
        if (dbSchema != null) DATABASE_SCHEMA = dbSchema;

        String dbPortRaw = getConfigKeyRaw("DATABASE_PORT");
        if (dbPortRaw != null) {
            try {
                int dbPort = Integer.parseInt(dbPortRaw);
                if (dbPort < 1 || dbPort > 65535) {
                    throw new RuntimeException("Invalid port in configuration env var or properties: " + dbPort);
                }
                DATABASE_PORT = dbPort;
            } catch (NumberFormatException ex) {
                throw new RuntimeException("Unable to parse integer for jooq port. Check your env var or properties file!", ex);
            }
        }

        String dbUser = getConfigKeyRaw("DATABASE_USER");
        if (dbUser == null) {
            throw new RuntimeException("No DATABASE_USER provided in configuration.");
        }
        DATABASE_USER = dbUser;

        String dbPassword = getConfigKeyRaw("DATABASE_PASSWORD");
        if (dbPassword == null) {
            throw new RuntimeException("No DATABASE_PASSWORD provided in configuration.");
        }
        DATABASE_PASSWORD = dbPassword;
    }

    private static String getConfigKeyRaw(String key) {
        // Check for key in the environment
        String envVar = System.getenv(key);
        if (envVar != null) return envVar;
        // Try for a config file
        return (String)props.get(key);
    }

}
