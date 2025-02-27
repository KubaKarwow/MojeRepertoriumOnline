namespace WebApplication6.Tlumacz;

public class LanguageTranslatorRecordDTO
{
    public string name { get; set; }
    public string level { get; set; }
    public int amountOfTranslates { get; set; }

    public LanguageTranslatorRecordDTO()
    {
    }

    public LanguageTranslatorRecordDTO(string name, string level, int amountOfTranslates)
    {
        this.name = name;
        this.level = level;
        this.amountOfTranslates = amountOfTranslates;
    }
}