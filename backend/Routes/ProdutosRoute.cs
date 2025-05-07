namespace ProdutosCRUD.Routes;
using Models;
using Microsoft.EntityFrameworkCore;

public static class ProdutosRoute

{
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


    }
}