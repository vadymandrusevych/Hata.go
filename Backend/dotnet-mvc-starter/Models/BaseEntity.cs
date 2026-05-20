namespace api.Models;

/// <summary>
///     Базовий клас для всіх основних сутностей.
///     EF автоматично додасть ці поля до кожної таблиці, що його успадковує.
/// </summary>
public abstract class BaseEntity 
{

	public Guid Id { get; set; }

	public DateTime CreatedAt { get; set; }
	public DateTime UpdatedAt { get; set; }

	// Для "Soft Delete". Якщо null - запис активний. Якщо дата - видалений.
	public DateTime? DeletedAt { get; set; }
}