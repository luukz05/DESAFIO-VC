namespace ProdutosCRUD.Routes
{
    using Microsoft.AspNetCore.Authorization;
    using Models;
    using Microsoft.EntityFrameworkCore;
    using Microsoft.AspNetCore.Identity;
    using System.Text;
    using System.IdentityModel.Tokens.Jwt;
    using Microsoft.IdentityModel.Tokens;
    using System.Security.Claims;

    public static class ProdutosRoute
    {
        // DTO para login
        public class LoginDTO
        {
            public string Usuario { get; set; }
            public string Senha { get; set; }
        }

        // Método de extensão para adicionar as rotas
        public static void ProductRoutes(this WebApplication app)
        {
            // Rota de teste da API
            app.MapGet("/", () => "API funcionando!");

            // Rota para adicionar um produto (requisição POST)
            app.MapPost("/adicionar_produtos", [Authorize] async (AppDbContext db, Produto produto) =>
            {
                db.Produtos.Add(produto); // Adiciona o produto
                await db.SaveChangesAsync(); // Salva as alterações no banco
                return Results.Created($"/produtos/{produto.Id}", produto); // Retorna produto criado com status 201
            });

            // Rota para listar todos os produtos (requisição GET)
            app.MapGet("/listar_produtos",[Authorize] async (AppDbContext db) =>
            {
                var produtos = await db.Produtos.ToListAsync(); // Lista todos os produtos
                return produtos.Any() ? Results.Ok(produtos) : Results.NotFound(); // Retorna lista ou erro 404
            });

            // Rota para editar um produto existente (requisição PATCH)
            app.MapPatch("/editar_produto/{id}",[Authorize] async (int id, Produto produto, AppDbContext db) =>
            {
                var produtoExistente = await db.Produtos.FindAsync(id); // Busca produto pelo ID

                if (produtoExistente == null)
                {
                    return Results.NotFound("Produto não encontrado.");
                }

                // Atualiza os campos do produto, se fornecidos
                produtoExistente.Nome = produto.Nome ?? produtoExistente.Nome;
                produtoExistente.Descricao = produto.Descricao ?? produtoExistente.Descricao;
                produtoExistente.Valor = produto.Valor != 0 ? produto.Valor : produtoExistente.Valor;
                produtoExistente.Quantidade = produto.Quantidade != 0 ? produto.Quantidade : produtoExistente.Quantidade;

                await db.SaveChangesAsync(); // Salva as alterações no banco

                return Results.Ok(produtoExistente); // Retorna produto atualizado
            });

            // Rota para deletar um produto (requisição DELETE)
            app.MapDelete("/deletar_produto/{id}",[Authorize] async (int id, AppDbContext db) =>
            {
                var produtoExistente = await db.Produtos.FindAsync(id); // Busca produto pelo ID

                if (produtoExistente == null)
                {
                    return Results.NotFound("Produto não encontrado.");
                }

                db.Remove(produtoExistente); // Remove produto do banco
                await db.SaveChangesAsync(); // Salva as alterações no banco

                return Results.Ok($"Produto com ID {id} foi deletado com sucesso."); // Retorna mensagem de sucesso
            });

            // Rota para registrar um novo usuário (requisição POST)
            app.MapPost("/register", async (Usuario_Class usuario, AppDbContext db) =>
            {
                var hasher = new PasswordHasher<Usuario_Class>();
                usuario.Senha = hasher.HashPassword(usuario, usuario.Senha); // Hash da senha do usuário
                usuario.Role = "user"; // Define role como 'user' para o usuário
                db.Usuarios.Add(usuario); // Adiciona usuário ao banco
                await db.SaveChangesAsync(); // Salva as alterações no banco

                return Results.Created($"/usuarios/{usuario.Id}", usuario); // Retorna usuário criado com status 201
            });

            // Rota de login (requisição POST)
            app.MapPost("/login", async (LoginDTO dados, AppDbContext db) =>
            {
                var hasher = new PasswordHasher<Usuario_Class>();

                // Busca o usuário com base no nome de usuário fornecido
                var usuarioExistente = await db.Usuarios
                    .FirstOrDefaultAsync(usuario => usuario.Usuario == dados.Usuario);

                // Verifica se o usuário existe
                if (usuarioExistente == null)
                {
                    return Results.NotFound("Usuário não encontrado.");
                }

                // Verifica se a senha fornecida corresponde à senha criptografada
                var verificacao = hasher.VerifyHashedPassword(usuarioExistente, usuarioExistente.Senha, dados.Senha);
                if (verificacao == PasswordVerificationResult.Failed)
                {
                    return Results.Unauthorized(); // Retorna erro 401 se a senha for inválida
                }

                // Gerando o token JWT
                var key = "sua_chave_super_secreta_256_bits_aqui1234567890"; // Chave secreta para assinatura
                var secretKey = Encoding.ASCII.GetBytes(key); // Converte a chave para bytes

                var credentials = new SigningCredentials(
                    new SymmetricSecurityKey(secretKey),
                    SecurityAlgorithms.HmacSha256 // Algoritmo de assinatura
                );

                // Define as claims do token (informações sobre o usuário)
                var claims = new[]
                {
                    new Claim(ClaimTypes.Name, usuarioExistente.Usuario),
                    new Claim(ClaimTypes.NameIdentifier, usuarioExistente.Id.ToString())
                };

                // Cria o token JWT
                var token = new JwtSecurityToken(
                    claims: claims, // Claims do token
                    expires: DateTime.Now.AddHours(1), // Expiração do token (1 hora)
                    signingCredentials: credentials // Credenciais de assinatura
                );

                var tokenHandler = new JwtSecurityTokenHandler();
                var tokenString = tokenHandler.WriteToken(token); // Gera a string do token

                // Retorna o token para o frontend
                return Results.Ok(new { mensagem = "Login bem-sucedido", token = tokenString });
            });

            // Rota para listar todos os usuários (requisição GET)
            app.MapGet("/listar_usuarios", async (AppDbContext db) =>
            {
                var usuarios = await db.Usuarios.ToListAsync(); // Lista todos os usuários
                return usuarios.Any() ? Results.Ok(usuarios) : Results.NotFound(); // Retorna lista ou erro 404
            });

            // Rota para obter o perfil do usuário autenticado (requisição GET)
            app.MapGet("/perfil", [Authorize] async (HttpContext context, AppDbContext db) =>
            {
                // Obtém o ID e nome do usuário a partir do token JWT
                var usuarioIdClaim = context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                var usuarioNomeClaim = context.User.FindFirst(ClaimTypes.Name)?.Value;

                if (usuarioIdClaim == null || usuarioNomeClaim == null)
                {
                    return Results.Unauthorized(); // Retorna erro 401 se não houver informações no token
                }

                // Busca o usuário no banco com base no ID do JWT
                var usuario = await db.Usuarios
                    .FirstOrDefaultAsync(u => u.Id.ToString() == usuarioIdClaim);

                if (usuario == null)
                {
                    return Results.NotFound("Usuário não encontrado."); // Retorna erro 404 se usuário não for encontrado
                }

                // Retorna as informações do perfil do usuário
                return Results.Ok(new
                {
                    usuario.Id,
                    usuario.Usuario,
                    usuario.Role,
                    usuario.Nome,
                    usuario.Email
                });
            });
        }
    }
}
