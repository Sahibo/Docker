using Microsoft.EntityFrameworkCore;
using PizzeriaApi.DbContexts;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var connectionString = builder.Configuration.GetConnectionString("Pizzeria") ?? throw new InvalidOperationException("Connection string 'ApplicationDbContextConnection' not found.");
builder.Services.AddDbContext<PizzeriaDbContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseCors(builder =>
{
    builder.AllowAnyOrigin()  // Allow requests from any origin
        .AllowAnyHeader()
        .AllowAnyMethod();
    // Do not use .AllowCredentials() when using AllowAnyOrigin()
});
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();