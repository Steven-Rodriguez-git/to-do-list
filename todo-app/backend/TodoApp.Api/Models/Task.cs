namespace TodoApp.Api.Models;

public class TodoTask
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? DueDate { get; set; }

    #region  Relación con User
    public int? UserId { get; set; }
    public User? User { get; set; }
    #endregion
}
