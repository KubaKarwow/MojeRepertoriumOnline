namespace WebApplication6.Login;

public class RegisterDTO
{
    public string email { get; set; }
    public string password { get; set; }

    public string name { get; set; }

    public string surname { get; set; }

    public int translatorNumber { get; set; }

    public RegisterDTO(string email, string password, string name, string surname, int translatorNumber)
    {
        this.email = email;
        this.password = password;
        this.name = name;
        this.surname = surname;
        this.translatorNumber = translatorNumber;
    }
}