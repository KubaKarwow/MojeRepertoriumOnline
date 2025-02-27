namespace WebApplication6.Tlumacz;

public class TlumaczJezykDTO
{
    public string name { get; set; }
    public string level { get; set; }
    public int amountOfTranslatesDone { get; set; }

    public TlumaczJezykDTO(string name, string level, int amountOfTranslatesDone)
    {
        this.name = name;
        this.level = level;
        this.amountOfTranslatesDone = amountOfTranslatesDone;
    }
}