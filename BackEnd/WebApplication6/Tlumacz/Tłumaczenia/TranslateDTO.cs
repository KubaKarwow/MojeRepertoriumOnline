namespace WebApplication6.Tlumacz.Tłumaczenia;

public class TranslateDTO
{
    public int translateId { get; set; }
    public string documentName { get; set; }
    public string originalLanguage { get; set; }
    public string translateLanguage { get; set; }
    public DateTime date { get; set; }
}