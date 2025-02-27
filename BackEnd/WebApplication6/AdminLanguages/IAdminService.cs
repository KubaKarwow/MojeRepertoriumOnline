namespace WebApplication6.Admin;

public interface IAdminService
{

    public Task<ICollection<LanguageDTO>> GetAllLanguages();

    public Task<LanguageDTO> EditLanguage(int languageId, string nazwa);
    
    public Task<LanguageDTO> DeleteLanguage(int languageId);

    public Task<LanguageDTO> CreateLanguage(string name);
    
}