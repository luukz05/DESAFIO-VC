namespace ProdutosCRUD.Routes;
using Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

public static class ProdutosRoute

{
    public class LoginDTO
    {
        public string Usuario { get; set; }
        public string Senha { get; set; }
    }

    public static void ProductRoutes(this WebApplication app) //extension methosd
    {
        app.MapGet("/", () => "API funcionando!"); //rota teste
        
        app.MapPost("/adicionar_produtos", async (AppDbContext db, Produto produto) => //Create
        {
            db.Produtos.Add(produto); // adiciona produto
            await db.SaveChangesAsync(); //salva as mudanças no banco
            return Results.Created($"/produtos/{produto.Id}", produto);
            
        });
        
        app.MapGet("/listar_produtos", async (AppDbContext db) => //Read
        {
            var produtos = await db.Produtos.ToListAsync(); // lista os produtos
            return produtos.Any() ? Results.Ok(produtos) : Results.NotFound(); 
        });

        app.MapPatch("/editar_produto/{id}", async (int id, Produto produto, AppDbContext db) => //Update
        {
            // busca por id
            var produtoExistente = await db.Produtos.FindAsync(id);

            if (produtoExistente == null)
            {
                return Results.NotFound("Produto não encontrado.");
            }

            // atualiza os campos de produtoExistente
            produtoExistente.Nome = produto.Nome ?? produtoExistente.Nome;
            produtoExistente.Descricao = produto.Descricao ?? produtoExistente.Descricao;
            produtoExistente.Valor = produto.Valor != 0 ? produto.Valor : produtoExistente.Valor;
            produtoExistente.Quantidade = produto.Quantidade != 0 ? produto.Quantidade : produtoExistente.Quantidade;

            
            await db.SaveChangesAsync(); //salva
            
            return Results.Ok(produtoExistente);
        });

        app.MapDelete("deletar_produto/{id}", async (int id, AppDbContext db) =>
        {
            // busca por id
            var produtoExistente = await db.Produtos.FindAsync(id);

            if (produtoExistente == null)
            {
                return Results.NotFound("Produto não encontrado.");
            }
            db.Remove(produtoExistente);
            
            await db.SaveChangesAsync(); //salva

            
            
            return Results.Ok($"Produto com ID {id} foi deletado com sucesso.");
        });
        
        app.MapPost("register", async (Usuario_Class usuario, AppDbContext db) =>
        {
            var hasher = new PasswordHasher<Usuario_Class>();
            usuario.Senha = hasher.HashPassword(usuario, usuario.Senha); //define a senha de usuario como o hash da senha para o usuario especificado
            usuario.Role = "user";
            db.Usuarios.Add(usuario); // Adiciona o usuário ao banco
            await db.SaveChangesAsync(); // Salva as mudanças

            return Results.Created($"/usuarios/{usuario.Id}", usuario);
        });

        app.MapPost("login", async (LoginDTO dados, AppDbContext db) =>
        {
            
            var hasher = new PasswordHasher<Usuario_Class>();
            
            // Busca por usuário com base no nome de usuário
            var usuarioExistente = await db.Usuarios
                .FirstOrDefaultAsync(usuario => usuario.Usuario == dados.Usuario); //
            var verificacao = hasher.VerifyHashedPassword(usuarioExistente, usuarioExistente.Senha, dados.Senha);
            // Verifica se o usuário existe
            if (usuarioExistente == null)
            {
                return Results.NotFound("Usuário não encontrado.");
            }

            // Verifica se a senha está correta (aqui, seria necessário criptografar a senha)
            if (verificacao == PasswordVerificationResult.Failed) // Isso é inseguro; utilize hashing de senha!
            {
                return Results.Unauthorized();
            }

            return Results.Ok(new { mensagem = "Login bem-sucedido", usuario = usuarioExistente });
        });

        app.MapGet("/listar_usuarios", async (AppDbContext db) => //Read
        {
            var usuarios = await db.Usuarios.ToListAsync(); // lista os usuarios
            return usuarios.Any() ? Results.Ok(usuarios) : Results.NotFound(); 
        });



    }
}