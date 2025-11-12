using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Models;

namespace TodoApp.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();
    public DbSet<TodoTask> Tasks => Set<TodoTask>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        // Seed de ejemplo para login rápido
        modelBuilder.Entity<User>().HasData(
            new User
            {
                Id = 1,
                Email = "test@todo.com",
                PasswordHash = "123456", // Solo para la prueba
                FullName = "Test User"
            }
        );
    }
}
