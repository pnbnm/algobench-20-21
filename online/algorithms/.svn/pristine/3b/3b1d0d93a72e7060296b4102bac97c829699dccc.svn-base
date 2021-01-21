package com.inf2b.algorithms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;

import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

@SpringBootApplication
public class AlgoBench {

    public static String PathToTaskRunner;
    public static String JarDirectory;

    public static Properties properties = new Properties();

    public static void main(String[] args) throws Exception {

        init();
        PathToTaskRunner = args[0];
        SpringApplication.run(AlgoBench.class, args);
    }

    private static void init() throws IOException {
        String config = "/config.properties";
        InputStream fis = AlgoBench.class.getResourceAsStream(config);
        properties.load(fis);
        JarDirectory = AlgoBench.class.getResource("/").getPath();

        String osName = System.getProperty("os.name").toUpperCase();


        System.out.println("=========osName:" + osName);


        /*String albName;
        if (osName.contains("WINDOWS")) {
            albName = "/algobench_b_back.exe";
        } else {
            albName = "/algobench_b_back";
        }


        PathToTaskRunner = AlgoBench.class.getResource(albName).getPath();*/
    }


    @GetMapping("/")
    public String index() {
        return "index";
    }


}
