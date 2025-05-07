using ProdutosCRUD.Routes;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;
using ProdutosCRUD.Models;

var builder = WebApplication.CreateBuilder(args);
Env.Load();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseMySql(
        Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"),  // Certifique-se de usar a variável de ambiente correta
        ServerVersion.AutoDetect(Environment.GetEnvironmentVariable("DB_CONNECTION_STRING"))
    ));
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod();
    });
});

var app = builder.Build();
app.UseCors();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "ProdutosCRUD v1");
    });
}

app.ProductRoutes();

app.UseHttpsRedirection();

app.Run();
