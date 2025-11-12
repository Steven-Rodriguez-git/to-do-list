namespace TodoApp.Api.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = default!;
    public string PasswordHash { get; set; } = default!; // Para la prueba puedes guardar el password plano si quieres simplificar
    public string FullName { get; set; } = default!;
}
