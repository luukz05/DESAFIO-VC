# **DESAFIO-VC**

## **Configuração do Banco de Dados**

Adicione a seguinte variável de ambiente ao seu arquivo `.env` para configurar a conexão com o banco de dados:

```mysql
DB_CONNECTION_STRING=server=localhost;port=<SUA PORTA>;database=<SUA DATABASE>;user=<SEU USUARIO>;password=<SUA SENHA DO USUARIO>;
```

#### **Comando SQL para criação da tabela:**

```mysql
CREATE TABLE `table_produtos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Nome` varchar(50) NOT NULL,
  `Descricao` varchar(255) NOT NULL,
  `Valor` decimal(10,2) NOT NULL DEFAULT 0.00,
  `Quantidade` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Nome` (`Nome`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```
