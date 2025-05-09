using ProdutosCRUD.Routes;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using ProdutosCRUD.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var key = "sua_chave_super_secreta_256_bits_aqui1234567890"; // 32+ caracteres
var secretKey = Encoding.ASCII.GetBytes(key);

var builder = WebApplication.CreateBuilder(args);

// Carregar variáveis de ambiente
Env.Load();

// Configuração do JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(secretKey)
        };
    });

builder.Services.AddAuthorization();

// Entity Framework
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"),
        ServerVersion.AutoDetect(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"))
    ));

// CORS — política nomeada
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials(); // Permite cookies ou Authorization
    });
});

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseAuthorization();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "ProdutosCRUD v1");
    });
}

// HTTPS redirection (pode ficar antes ou depois)
app.UseHttpsRedirection();

// Rotas
app.ProductRoutes();

app.Run();
