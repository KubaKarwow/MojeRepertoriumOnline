using Microsoft.EntityFrameworkCore;
using WebApplication6.Context;
using WebApplication6.Models;

namespace WebApplication6.Tlumacz;

public class TlumaczService : ITlumaczService
{
    private readonly TlumaczeniaContext _context;

    public TlumaczService(TlumaczeniaContext context)
    {
        _context = context;
    }

    public async Task<CredentialsDTO> ChangeCredentials(CredentialsDTO credentialsDto, int userId)
    {
        var countAsync = await _context.Users
            .Where(user => user.Email.Equals(credentialsDto.email) && user.Id!=userId).CountAsync();

        if (countAsync != 0)
        {
            throw new Exception("Ten email jest już przypisany do jakiegoś konta");
        }

        var countAsync2 = await _context.Tłumaczs
            .Where(user => user.NumerIndeksuTłumacza.Equals(credentialsDto.translatorNumber) && user.UserId!=userId).CountAsync();

        if (countAsync2 != 0)
        {
            throw new Exception("Taki numer tłumacza jest już zarezerwowany upewnij się, że jest on poprawny.");
        }


        var user = await _context.Users
            .Include(user => user.Tłumacz)
            .FirstOrDefaultAsync(user => user.Id == userId);

        
        user.Imie = credentialsDto.name;
        user.Nazwisko = credentialsDto.surname;
        user.Email = credentialsDto.email;
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(credentialsDto.password); 
        user.Hasło = hashedPassword;
        user.Tłumacz.NumerIndeksuTłumacza = credentialsDto.translatorNumber;

        await _context.SaveChangesAsync();
        return credentialsDto;
    }

    public async Task<CredentialsDTO> GetCredentials(int userId)
    {
        await foreach (var contextUser in _context.Users)
        {
            Console.WriteLine(contextUser.Id);
            Console.WriteLine(userId);
            Console.WriteLine(userId == contextUser.Id);
        }

        var credentials = await _context.Users
            .Include(u => u.Tłumacz)
            .Where(user => user.Id.Equals(userId))
            .Select(user => new CredentialsDTO
            {
                email = user.Email,
                name = user.Imie,
                surname = user.Nazwisko,
                password = user.Hasło,
                translatorNumber = user.Tłumacz.NumerIndeksuTłumacza,
                joinDate = user.Tłumacz.DataDołaczenia
            }).FirstOrDefaultAsync();
        return credentials;
    }

    public async Task<int> GetAmountOfLanguages(int userId)
    {
        var countAsync = await _context.Tłumaczs
            .Where(t => t.UserId==userId)
            .SelectMany(t => t.Obsługujes)
            .CountAsync();
        return countAsync;
    }

    
    public async Task<ReturnLangTransRecordDTO> AddLanguage(LanguageDTO languageDto, int userId)
    {
        var translator = await _context.Tłumaczs.FirstOrDefaultAsync(t => t.UserId == userId);
        

        var language = await _context.Jezyks.FirstOrDefaultAsync(l => l.Nazwa.Equals(languageDto.name));
        Console.WriteLine(language.Id);
        
        var newEntry = new Obsługuje()
        {
            JezykId = language.Id,
            TłumaczId = userId,
            IlośćWykonanychTłumaczeń = 0, 
            Poziom = languageDto.level
        };
        _context.Obsługujes.Add(newEntry);
        await _context.SaveChangesAsync();

        return new ReturnLangTransRecordDTO()
        {
            level = languageDto.level,
            name = languageDto.name,
            amountOfTranslatesDone = 0,
            id = language.Id
        };
    }

    public async Task<bool> DeleteLanguage(int languageId, int userId)
    {
        var listAsync = await _context.Tłumaczs
            .Where(tlumacz => tlumacz.UserId == userId)
            .SelectMany(tlumacz => tlumacz.Obsługujes)
            .Include(obs => obs.Jezyk)
            .Where(obsluguje => obsluguje.Jezyk.Id.Equals(languageId))
            .ToListAsync();
        foreach (var obsługuje in listAsync)
        {
            _context.Obsługujes.Remove(obsługuje);
        }

        await _context.SaveChangesAsync();
        return true;
    }
    public async Task<ReturnLangTransRecordDTO> ChangeLanguageData(ReturnLangTransRecordDTO languageTranslatorRecordDto,
        int userId)
    {
        var firstOrDefaultAsync = await _context.Obsługujes
            .Include(obs => obs.Tłumacz)
            .Include(obs => obs.Jezyk)
            .Where(obs => obs.Jezyk.Id.Equals(languageTranslatorRecordDto.id) && obs.Tłumacz.UserId==userId)
                .FirstOrDefaultAsync();

        _context.Obsługujes.Remove(firstOrDefaultAsync);
        await _context.SaveChangesAsync();

        var orDefaultAsync = await _context.Jezyks.Where(j => j.Nazwa.Equals(languageTranslatorRecordDto.name)).FirstOrDefaultAsync();

        var obsługuje = new Obsługuje()
        {
           JezykId = orDefaultAsync.Id,
           Jezyk = orDefaultAsync,
           IlośćWykonanychTłumaczeń = languageTranslatorRecordDto.amountOfTranslatesDone,
           Poziom = languageTranslatorRecordDto.level,
           TłumaczId = firstOrDefaultAsync.TłumaczId,
           Tłumacz = firstOrDefaultAsync.Tłumacz
        };
        _context.Obsługujes.AddAsync(obsługuje);
        _context.SaveChangesAsync();

        return languageTranslatorRecordDto;
    }


    public async Task<ICollection<ReturnLangTransRecordDTO>> GetLanguagesPaginated(int userId, int startIndex, int amountToShow)
    {
        var listAsync = await _context.Users
            .Where(user => user.Id == userId)
            .SelectMany(user => user.Tłumacz.Obsługujes)
            .Include(obs => obs.Jezyk) 
            .Skip(startIndex)
            .Take(amountToShow)
            .ToListAsync();

        var result = new List<ReturnLangTransRecordDTO>();
        foreach (var obsługuje in listAsync)
        {
            var languageTranslatorRecordDto = new ReturnLangTransRecordDTO()
            {
                amountOfTranslatesDone = obsługuje.IlośćWykonanychTłumaczeń,
                name = obsługuje.Jezyk.Nazwa,
                level = obsługuje.Poziom,
                id = obsługuje.JezykId
            };
            result.Add(languageTranslatorRecordDto);
        }

        return result;
    }
}