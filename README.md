# **DESAFIO-VC**

## **Configuração do Banco de Dados**

Adicione a seguinte variável de ambiente ao seu arquivo `.env` para configurar a conexão com o banco de dados:

```text
DB_CONNECTION_STRING=server=localhost;port=<SUA PORTA>;database=<SUA DATABASE>;user=<SEU USUARIO>;password=<SUA SENHA DO USUARIO>;
```

#### **Comando SQL para criação da tabela produtos:**

```mysql
CREATE TABLE `table_produtos` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`Nome` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Descricao` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Valor` DECIMAL(10,2) NOT NULL DEFAULT '0.00',
	`Quantidade` INT(11) NOT NULL,
	`userId` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=25
;
```

#### **Comando SQL para criação da tabela usuarios:**

```mysql
CREATE TABLE `table_users` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`Nome` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Email` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Usuario` VARCHAR(50) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Senha` VARCHAR(255) NOT NULL COLLATE 'utf8mb4_general_ci',
	`Role` VARCHAR(50) NOT NULL DEFAULT 'user' COLLATE 'utf8mb4_general_ci',
	PRIMARY KEY (`id`) USING BTREE,
	UNIQUE INDEX `Usuario` (`Usuario`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
AUTO_INCREMENT=19
;
```
