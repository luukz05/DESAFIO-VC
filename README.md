# Desafio-VC

## Comando SQL para criação da tabela:

```sql
CREATE TABLE `table_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `Descricao` varchar(255) NOT NULL,
  `Valor` decimal(10,2) NOT NULL DEFAULT 0.00,
  `Quantidade` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Nome` (`Nome`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
