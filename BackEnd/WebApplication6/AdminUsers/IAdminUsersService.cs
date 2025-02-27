namespace WebApplication6.AdminUsers;

public interface IAdminUsersService
{
    public Task<int> GetAmountOfUsers();
    
    public Task<ICollection<UserTranslatorDTO>> GetUsersPaginated( int startIndex, int amountToShow);
    
    public Task<bool> DeleteUser(int userId);
    
    public Task<UserTranslatorDTO> EditUser(int userId, UserTranslatorDTO userTranslatorDto);
    
    
}