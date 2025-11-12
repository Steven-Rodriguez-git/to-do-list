namespace TodoApp.Api.DTOs;

public class LoginResponseDto
{
    public string Token { get; set; } = default!;
    public string FullName { get; set; } = default!;
    public string Email { get; set; } = default!;
}
