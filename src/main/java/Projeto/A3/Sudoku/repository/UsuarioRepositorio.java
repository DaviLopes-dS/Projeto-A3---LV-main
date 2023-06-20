package Projeto.A3.Sudoku.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import Projeto.A3.Sudoku.model.*;

public interface UsuarioRepositorio extends MongoRepository <Usuario, String> {
}
