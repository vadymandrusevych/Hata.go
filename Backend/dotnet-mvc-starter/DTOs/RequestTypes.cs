namespace api.DTOs;

public abstract record RequestTypes
{
	public record RegisterRequest(
		string Email,
		string Username,
		string Password,
		string ConfirmPassword
	);

	public record LoginRequest(
		string Email,
		string Username,
		string Password
	);

	public record UpdateRoleRequest(
		string TargetUsername,
		UserRole NewRole
	);

	public record RenewTokenRequest(string RefreshToken);

	public class UserFilterDto
	{
		public string? SearchTerm { get; set; } // Пошук по імені/email
		public int PageNumber { get; set; } = 1;
		public int PageSize { get; set; } = 10;
	}
}