using TodoApp.Api.Models;

namespace TodoApp.Api.Services;

public interface ITokenService
{
    string GenerateToken(User user);
}
