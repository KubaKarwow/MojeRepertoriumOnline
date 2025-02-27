using WebApplication6.Models;
using WebApplication6.Tlumacz;

namespace WebApplication6.Login;

public interface ILoginService
{
    public Task<string> ValidateLoginInfo(LoginDTO loginDto);
    public Task<RegisterDTO>? RegisterClient(RegisterDTO registerDto);
    public Task ConfirmRegister(int id);
}