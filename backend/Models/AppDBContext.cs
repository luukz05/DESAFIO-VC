using Microsoft.EntityFrameworkCore;

namespace ProdutosCRUD.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // Define o DbSet para a tabela 'table_produtos'
        public DbSet<Produto> Produtos { get; set; }
    }
}