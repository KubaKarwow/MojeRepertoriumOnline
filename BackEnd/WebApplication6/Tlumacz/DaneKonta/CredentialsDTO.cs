namespace WebApplication6.Tlumacz;

public class CredentialsDTO
{
    public string name { get; set; }
    public string surname { get; set; }
    public string email { get; set; }
    public string password { get; set; }
    public int translatorNumber { get; set; }
    public DateTime joinDate { get; set; }
    public CredentialsDTO()
    {
    }

    public CredentialsDTO(string name, string surname, string email, string password, int translatorNumber)
    {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
        this.translatorNumber = translatorNumber;
    }
}