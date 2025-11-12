using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.DTOs;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class DashboardController : ControllerBase
{
    private readonly AppDbContext _context;

    public DashboardController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<DashboardDto>> Get()
    {
        var total = await _context.Tasks.CountAsync();
        var completed = await _context.Tasks.CountAsync(t => t.IsCompleted);
        var pending = total - completed;

        return Ok(new DashboardDto
        {
            TotalTasks = total,
            CompletedTasks = completed,
            PendingTasks = pending
        });
    }
}
