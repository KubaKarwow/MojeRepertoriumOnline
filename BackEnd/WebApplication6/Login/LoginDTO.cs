using System.ComponentModel.DataAnnotations;

namespace WebApplication6.Login;

public class LoginDTO
{
    [EmailAddress]
    public string email { get; set; }

    public string password { get; set; }
    
    
    

}