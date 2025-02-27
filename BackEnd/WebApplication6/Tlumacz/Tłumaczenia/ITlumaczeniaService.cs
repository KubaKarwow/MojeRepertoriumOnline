namespace WebApplication6.Tlumacz.Tłumaczenia;

public interface ITlumaczeniaService
{
    public Task<int> GetAmountOfTranslates(int userId);

    public Task<ICollection<TranslateDTO>> GetTranslates(int userId, int startIndex, int amountToShow);

    public Task<ChangedTranslateDTO> ChangeTranslateData(int userId, int translateId, ChangedTranslateDTO changedTranslateDto);

    public Task<FullTranslateDTO> GetTranslateDetails(int userId, int translateId);

    public Task<bool> DeleteTranslateRecord(int userId, int translateId);

    public Task<FullTranslateDTO> AddTranslate(int userId, FullTranslateDTO fullTranslateDto );
    
   
}