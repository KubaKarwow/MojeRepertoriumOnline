using Microsoft.EntityFrameworkCore;
using WebApplication6.Context;

namespace WebApplication6.AdminUsers;

public class AdminUsersService:IAdminUsersService
{
    private readonly TlumaczeniaContext _context;

    public AdminUsersService(TlumaczeniaContext _context)
    {
        this._context = _context;
    }

    public async Task<int> GetAmountOfUsers()
    {
        var countAsync = await _context.Users.Where(u => u.Role.Nazwa.Equals("User")).CountAsync();
        return countAsync;
    }

    public async Task<ICollection<UserTranslatorDTO>> GetUsersPaginated( int startIndex, int amountToShow)
    {
        var users = await _context.Users
            .Include(u => u.Role)
            .Where(u => u.Role.Nazwa.Equals("User"))
            .Include(tl => tl.Tłumacz) 
            .Skip(startIndex) 
            .Take(amountToShow) 
            .Select(t => new UserTranslatorDTO
            {
                Id = t.Id,
                email = t.Email,
                hasło = t.Hasło,
                imie = t.Imie,
                nazwisko = t.Nazwisko,
                rola = t.Role.Nazwa,
                DataDołaczenia = t.Tłumacz.DataDołaczenia,
                DataOdejścia = t.Tłumacz.DataOdejścia,
                numerIndeksuTłumacza = t.Tłumacz.NumerIndeksuTłumacza
            }) 
            .ToListAsync();

        return users;
    }

    public async Task<bool> DeleteUser(int userId)
    {
        var firstOrDefaultAsync = await _context.Users.Where(u => u.Id==userId).FirstOrDefaultAsync();

        _context.Users.Remove(firstOrDefaultAsync);

        _context.SaveChangesAsync();

        return true;
    }

    public async Task<UserTranslatorDTO> EditUser(int userId, UserTranslatorDTO userTranslatorDto)
    {
        
        var async = await _context.Roles.Where(r => r.Nazwa.Equals(userTranslatorDto.rola)).CountAsync();
        if (async == 0)
        {
            throw new Exception("Nie ma takiej roli, User Administrator to jedyne akceptowalne");
        }

        int roleId = 0;
        if (userTranslatorDto.rola.Equals("User")) roleId = 1;
        else roleId = 2;
        var user = await _context.Users
            .Include(u => u.Role)
            .Include(u => u.Tłumacz)
            .Where(u => u.Id==userId).FirstOrDefaultAsync();

        user.Email = userTranslatorDto.email;
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(userTranslatorDto.hasło); 
        user.Hasło = hashedPassword;
        user.RoleId = roleId;
        user.Imie = userTranslatorDto.imie;
        user.Nazwisko = userTranslatorDto.nazwisko;
        user.Tłumacz.NumerIndeksuTłumacza = userTranslatorDto.numerIndeksuTłumacza;
        user.Tłumacz.DataDołaczenia = userTranslatorDto.DataDołaczenia;
        user.Tłumacz.DataOdejścia = userTranslatorDto.DataOdejścia;

        await _context.SaveChangesAsync();
        userTranslatorDto.hasło = hashedPassword;
        return userTranslatorDto;
    }
}