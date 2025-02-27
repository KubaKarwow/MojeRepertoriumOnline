namespace WebApplication6.Tlumacz;

public interface ITlumaczService
{
    public Task<CredentialsDTO> ChangeCredentials(CredentialsDTO credentialsDto, int userId);
    public Task<CredentialsDTO> GetCredentials(int userId);

    public Task<int> GetAmountOfLanguages(int userId);
    public Task<bool> DeleteLanguage(int languageId, int userId);
    public Task<ReturnLangTransRecordDTO> AddLanguage(LanguageDTO languageDto, int userId);
    public Task<ReturnLangTransRecordDTO> ChangeLanguageData(ReturnLangTransRecordDTO languageTranslatorRecordDto, int userId);
    public Task<ICollection<ReturnLangTransRecordDTO>> GetLanguagesPaginated(int userId, int startIndex, int amountToShow);

}