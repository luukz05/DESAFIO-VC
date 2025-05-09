using System.ComponentModel.DataAnnotations; // Para usar as anotações de validação, como [Key]
using System.ComponentModel.DataAnnotations.Schema; // Para usar a anotação [Table]

namespace ProdutosCRUD.Models
{
    [Table("table_users")]
    public class Usuario_Class
    {
        [Key]
        public int Id { get; set; }
        
        public string Nome { get; set; }
        
        public string Email { get; set; }
        
        public string Usuario { get; set; }
        
        public string Senha { get; set; } //criptografar
        
        public string Role { get; set; }
    }
}

