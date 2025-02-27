using Microsoft.EntityFrameworkCore;
using WebApplication6.Context;
using WebApplication6.Models;

namespace WebApplication6.Admin;

public class AdminService:IAdminService
{
    private readonly TlumaczeniaContext _context;

    public AdminService(TlumaczeniaContext context)
    {
        _context = context;
    }

    public async Task<ICollection<LanguageDTO>> GetAllLanguages()
    {
        var listAsync = await _context.Jezyks
            .Select(jezyk => new LanguageDTO()
            {
                nazwa = jezyk.Nazwa,
                Id = jezyk.Id
            }).ToListAsync();
            
        return listAsync;
    }

    public async Task<LanguageDTO> EditLanguage(int languageId, string nazwa)
    {
        var firstOrDefaultAsync = await _context.Jezyks
            .Where(jezyk => jezyk.Id==languageId).FirstOrDefaultAsync();

        firstOrDefaultAsync.Nazwa = nazwa;

        await _context.SaveChangesAsync();
        return new LanguageDTO()
        {
            Id = languageId,
            nazwa = nazwa
        };
    }

    public async Task<LanguageDTO> DeleteLanguage(int languageId)
    {
        var listAsync = await _context.Tłumaczeniewykonanes
            .Where(tw => tw.JęzykŹródłowy==languageId
                         || tw.JęzykDocelowy==languageId).ToListAsync();
        
        _context.Tłumaczeniewykonanes.RemoveRange(listAsync);
        await _context.SaveChangesAsync();
        
        var listAsync2 = await _context.Obsługujes
            .Where(o => o.JezykId==languageId)
            .ToListAsync();
        
        _context.Obsługujes.RemoveRange(listAsync2);
        await _context.SaveChangesAsync();
        

        var firstOrDefaultAsync = await _context.Jezyks
            .Where(j => j.Id==languageId)
            .FirstOrDefaultAsync();
        
        _context.Jezyks.Remove(firstOrDefaultAsync);
        await _context.SaveChangesAsync();

        return new LanguageDTO()
        {
            Id = languageId,
            nazwa = firstOrDefaultAsync.Nazwa
        };
    }

    public async Task<LanguageDTO> CreateLanguage(string name)
    {
        var entity = new Jezyk()
        {
            Nazwa = name
        };
        await _context.Jezyks.AddAsync(entity);
        await _context.SaveChangesAsync();
        return new LanguageDTO()
        {
            Id = entity.Id,
            nazwa = entity.Nazwa
        };
    }
}