package com.group12;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class Initialiser implements ServletContextListener{
    ServletContext context;
    public void contextInitialized(ServletContextEvent contextEvent) {
        System.out.println("Context Created");
        ConfigurationLoader.load();
        
    }
    public void contextDestroyed(ServletContextEvent contextEvent) {

        System.out.println("Context Destroyed");
    }
}