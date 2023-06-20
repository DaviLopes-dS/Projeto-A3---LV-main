package Projeto.A3.Sudoku.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "usuario")
public class Usuario {
    @Id
    private String id; 

    private String usuarioNome;
    private String usuarioSenha; 
    private int usuarioVitorias;

    //SETTERS
    public void setUsuarioNome(String usuarioNome) {
        this.usuarioNome = usuarioNome;
    }

    public void setUsuarioSenha(String usuarioSenha) {
        this.usuarioSenha = usuarioSenha;
    }

    public void setUsuarioVitorias(int usuarioVitorias) {
        this.usuarioVitorias = usuarioVitorias;
    }

    //GETTERS
    public String getUsuarioNome() {
        return usuarioNome;
    }

    public String getUsuarioSenha() {
        return usuarioSenha;
    }

    public int getUsuarioVitorias() {
        return usuarioVitorias;
    }

    public String getId() {
        return id;
    }

    //CONSTRUCTORS

    public Usuario() {

    }
    
    public Usuario(String id, String usuarioNome, String usuarioSenha, int usuarioVitorias) {
        this.id = id; 
        this.usuarioNome = usuarioNome;
        this.usuarioSenha = usuarioSenha;
        this.usuarioVitorias = usuarioVitorias;
    }
}
