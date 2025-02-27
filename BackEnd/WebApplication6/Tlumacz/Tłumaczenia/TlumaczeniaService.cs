using Microsoft.EntityFrameworkCore;
using WebApplication6.Context;
using WebApplication6.Models;

namespace WebApplication6.Tlumacz.Tłumaczenia;

public class TlumaczeniaService:ITlumaczeniaService
{
    private readonly TlumaczeniaContext _context;

    public TlumaczeniaService(TlumaczeniaContext context)
    {
        _context = context;
    }

    public async Task<int> GetAmountOfTranslates(int userId)
    {
        var amountOfTranslates = await _context.Tłumaczs
            .Where(tl => tl.UserId==userId)
            .Include(tl => tl.Tłumaczeniewykonanes)
            .SelectMany(tl => tl.Tłumaczeniewykonanes).CountAsync();

        return amountOfTranslates;
    }
    public async Task<ICollection<TranslateDTO>> GetTranslates(int userId,int startIndex, int amountToShow)
    {
        var translates = await _context.Tłumaczs
            .Where(tl => tl.UserId == userId)
            .Include(tl => tl.Tłumaczeniewykonanes) 
            .SelectMany(tl => tl.Tłumaczeniewykonanes) 
            .Include(tl => tl.JęzykDocelowyNavigation)
            .Include(tl => tl.JęzykŹródłowyNavigation)
            .OrderBy(t => t.Id) 
            .Skip(startIndex) 
            .Take(amountToShow) 
            .Select(t => new TranslateDTO
            {
                translateId = t.Id,
                documentName = t.NazwaDokumentu,
                originalLanguage = t.JęzykŹródłowyNavigation.Nazwa,
                translateLanguage = t.JęzykDocelowyNavigation.Nazwa,
                date = t.DataWykonania
            }) 
            .ToListAsync();
        return translates;
    }

    public async Task<FullTranslateDTO> GetTranslateDetails(int userId, int translateId)
    {
        var fullTranslateDto = await _context.Tłumaczs
            .Include(tl => tl.Tłumaczeniewykonanes)
            .Where(tl => tl.UserId==userId)
            .SelectMany(tl => tl.Tłumaczeniewykonanes)
            .Where(tw => tw.Id==translateId)
            .Include(tw => tw.JęzykDocelowyNavigation)
            .Include(tw => tw.JęzykŹródłowyNavigation)
            .Select(tw => new FullTranslateDTO()
            {
                originalLanguage = tw.JęzykŹródłowyNavigation.Nazwa,
                translateLanguage = tw.JęzykDocelowyNavigation.Nazwa,
                date = tw.DataWykonania,
                name = tw.NazwaDokumentu
            }).FirstOrDefaultAsync();
        return fullTranslateDto;
    }

    private async Task<int> GetLanguageIdByName(string name)
    {
        var languageId = await _context.Jezyks.Where(j=> j.Nazwa.Equals(name))
            .Select(j => j.Id).FirstOrDefaultAsync();
        return languageId;
    }
    public async Task<ChangedTranslateDTO> ChangeTranslateData(int userId, int translateId,ChangedTranslateDTO changedTranslateDto)
    {
        var translateRecord = await _context.Tłumaczs
            .Where(tl => tl.UserId == userId)
            .Include(tl => tl.Tłumaczeniewykonanes)
            .SelectMany(tl => tl.Tłumaczeniewykonanes)
            .Where(tw => tw.Id == translateId)
            .FirstOrDefaultAsync();

        translateRecord.JęzykDocelowy = await GetLanguageIdByName(changedTranslateDto.translateLanguage);
        translateRecord.JęzykŹródłowy = await GetLanguageIdByName(changedTranslateDto.originalLanguage);
        translateRecord.DataWykonania = changedTranslateDto.date;
        translateRecord.NazwaDokumentu =  changedTranslateDto.name;

        await _context.SaveChangesAsync();
        return changedTranslateDto;
    }

   

    public async Task<bool> DeleteTranslateRecord(int userId, int translateId)
    {
        var toDelete = await  _context.Tłumaczeniewykonanes.Where(tw => tw.Id==translateId)
            .FirstOrDefaultAsync();
        _context.Tłumaczeniewykonanes.Remove(toDelete);

        _context.SaveChangesAsync();
        return true;
    }

    public async Task<FullTranslateDTO> AddTranslate(int userId, FullTranslateDTO fullTranslateDto)
    {
        
        _context.Tłumaczeniewykonanes.Add(new Tłumaczeniewykonane()
        {
            NazwaDokumentu = fullTranslateDto.name,
            TłumaczId = userId,
            DataWykonania = fullTranslateDto.date,
            JęzykDocelowy = await GetLanguageIdByName(fullTranslateDto.translateLanguage),
            JęzykŹródłowy= await GetLanguageIdByName(fullTranslateDto.originalLanguage)
        } );
        await _context.SaveChangesAsync();
        return fullTranslateDto;
    }
}