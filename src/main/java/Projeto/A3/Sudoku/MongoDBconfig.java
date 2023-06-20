package Projeto.A3.Sudoku;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.config.AbstractMongoClientConfiguration;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;

import com.mongodb.ConnectionString;
import com.mongodb.MongoClientSettings;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

@Configuration
@EnableMongoRepositories(basePackages = "Projeto.A3.Sudoku")
public class MongoDBconfig extends AbstractMongoClientConfiguration {

    @Override
    protected String getDatabaseName() {
        return "A3A01"; 
    }

    @Override
    @Bean
    public MongoClient mongoClient() {
        ConnectionString connectionString = new ConnectionString("mongodb+srv://Felipe_H:nodesenha@a3a01.ppv0jhw.mongodb.net/?retryWrites=true&w=majority");
        MongoClientSettings mongoClientSettings = MongoClientSettings.builder()
        .applyConnectionString(connectionString)
        .build(); 

        return MongoClients.create(mongoClientSettings); 
    }
}
