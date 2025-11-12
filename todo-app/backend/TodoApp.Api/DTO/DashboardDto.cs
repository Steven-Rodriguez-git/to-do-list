namespace TodoApp.Api.DTOs;

public class DashboardDto
{
    public int TotalTasks { get; set; }
    public int CompletedTasks { get; set; }
    public int PendingTasks { get; set; }
}
