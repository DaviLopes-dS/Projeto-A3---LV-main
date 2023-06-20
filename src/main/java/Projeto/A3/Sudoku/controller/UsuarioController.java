package Projeto.A3.Sudoku.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import Projeto.A3.Sudoku.model.*;
import Projeto.A3.Sudoku.repository.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    @GetMapping
    public Map<String, List<Usuario>> pegarUsuarios() {
        List<Usuario> usuarios = usuarioRepositorio.findAll();
        Map<String, List<Usuario>> response = new HashMap<>();
        response.put("usuario", usuarios);
        return response;
    }
    /*
     * public List <Usuario> pegarUsuarios() {
     * return usuarioRepositorio.findAll();
     * }
     */

    @GetMapping("/{id}")
    public Optional<Usuario> pegarUsuario(@PathVariable String id) {
        return usuarioRepositorio.findById(id);
    }

    @PostMapping
    public Usuario criarUsuario(@RequestBody Usuario usuario) {
        Usuario novoUsuario = new Usuario();
        novoUsuario.setUsuarioNome(usuario.getUsuarioNome());
        novoUsuario.setUsuarioSenha(usuario.getUsuarioSenha());
        novoUsuario.setUsuarioVitorias(usuario.getUsuarioVitorias());

        return usuarioRepositorio.save(novoUsuario);
    }

    @PutMapping("/{id}")
    public Usuario atualizarVitorias(@PathVariable String id, @RequestBody Usuario usuario) {
        Optional<Usuario> usuarioExistente = usuarioRepositorio.findById(id);
        if (usuarioExistente.isPresent()) {
            Usuario usuarioAtualizado = usuarioExistente.get();
            usuarioAtualizado.setUsuarioVitorias(usuario.getUsuarioVitorias());
            return usuarioRepositorio.save(usuarioAtualizado);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletarUsuario(@PathVariable String id) {
        Optional<Usuario> usuarioExistente = usuarioRepositorio.findById(id);
        if (usuarioExistente.isPresent()) {
            usuarioRepositorio.deleteById(id);
            return ResponseEntity.ok("Usuário excluído com sucesso");
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    
    @PatchMapping("/{id}")
    public ResponseEntity<Usuario> alterarNomeUsuario(@PathVariable String id,
            @RequestBody Map<String, String> nomeNovo) {
        Optional<Usuario> usuarioExistente = usuarioRepositorio.findById(id);

        if (usuarioExistente.isPresent()) {
            Usuario usuario = usuarioExistente.get();
            String novoNome = nomeNovo.get("usuarioNome");

            usuario.setUsuarioNome(novoNome);
            Usuario usuarioAtualizado = usuarioRepositorio.save(usuario);

            return ResponseEntity.ok(usuarioAtualizado);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    /* 
    @DeleteMapping("/{id}")
    public void apagarUsuario(@PathVariable String id){
        usuarioRepositorio.deleteById(id); 
    }*/
}
