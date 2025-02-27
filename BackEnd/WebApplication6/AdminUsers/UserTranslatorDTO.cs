namespace WebApplication6.AdminUsers;

public class UserTranslatorDTO
{
    public int Id { get; set; }
    public string imie { get; set; }
    public string nazwisko { get; set; }
    public string email { get; set; }
    public string hasło { get; set; }
    public string rola { get; set; }
    public int numerIndeksuTłumacza { get; set; }
    public DateTime DataDołaczenia { get; set; }
    public DateTime? DataOdejścia { get; set; }
}