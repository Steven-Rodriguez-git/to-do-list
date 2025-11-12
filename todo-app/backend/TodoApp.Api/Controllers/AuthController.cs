using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.DTOs;
using TodoApp.Api.Services;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ITokenService _tokenService;

    public AuthController(AppDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDto>> Login([FromBody] LoginRequestDto request)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Email == request.Email && u.PasswordHash == request.Password);

        if (user is null)
        {
            return Unauthorized(new { message = "Credenciales inválidas" });
        }

        var token = _tokenService.GenerateToken(user);

        var response = new LoginResponseDto
        {
            Token = token,
            FullName = user.FullName,
            Email = user.Email
        };

        return Ok(response);
    }
}
