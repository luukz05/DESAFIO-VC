using System.ComponentModel.DataAnnotations; // Para usar as anotações de validação, como [Key]
using System.ComponentModel.DataAnnotations.Schema; // Para usar a anotação [Table]

namespace ProdutosCRUD.Models
{
    [Table("table_produtos")]  // Define o nome da tabela no banco de dados
    public class Produto
    {
        [Key]  // Define que o campo 'Id' é a chave primária da tabela
        public int Id { get; set; }

        public string Nome { get; set; } 
        public string Descricao { get; set; }  
        public decimal Valor { get; set; }  
        public int Quantidade { get; set; }  
    }
}
