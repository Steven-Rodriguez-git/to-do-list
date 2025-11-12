using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.DTOs;
using TodoApp.Api.Models;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize] // Requiere JWT
public class TasksController : ControllerBase
{
    private readonly AppDbContext _context;

    public TasksController(AppDbContext context)
    {
        _context = context;
    }

    // GET /api/tasks?status=all|completed|pending
    [HttpGet]
    public async Task<ActionResult<IEnumerable<TodoTaskDto>>> GetTasks([FromQuery] string status = "all")
    {
        IQueryable<TodoTask> query = _context.Tasks;

        status = status.ToLower();
        if (status == "completed")
        {
            query = query.Where(t => t.IsCompleted);
        }
        else if (status == "pending")
        {
            query = query.Where(t => !t.IsCompleted);
        }

        var tasks = await query
            .OrderByDescending(t => t.CreatedAt)
            .Select(t => new TodoTaskDto
            {
                Id = t.Id,
                Title = t.Title,
                Description = t.Description,
                IsCompleted = t.IsCompleted,
                DueDate = t.DueDate
            })
            .ToListAsync();

        return Ok(tasks);
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<TodoTaskDto>> GetById(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task is null) return NotFound();

        return Ok(new TodoTaskDto
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            IsCompleted = task.IsCompleted,
            DueDate = task.DueDate
        });
    }

    [HttpPost]
    public async Task<ActionResult<TodoTaskDto>> Create([FromBody] TodoTaskDto dto)
    {
        var task = new TodoTask
        {
            Title = dto.Title,
            Description = dto.Description,
            IsCompleted = dto.IsCompleted,
            DueDate = dto.DueDate,
            CreatedAt = DateTime.UtcNow
        };

        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();

        dto.Id = task.Id;

        return CreatedAtAction(nameof(GetById), new { id = task.Id }, dto);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, [FromBody] TodoTaskDto dto)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task is null) return NotFound();

        task.Title = dto.Title;
        task.Description = dto.Description;
        task.IsCompleted = dto.IsCompleted;
        task.DueDate = dto.DueDate;

        await _context.SaveChangesAsync();

        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var task = await _context.Tasks.FindAsync(id);
        if (task is null) return NotFound();

        _context.Tasks.Remove(task);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
