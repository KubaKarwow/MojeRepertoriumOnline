using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApplication6.Context;
using WebApplication6.Login;
using WebApplication6.Models;
using WebApplication6.Services;

public class LoginService : ILoginService
{
    private readonly TlumaczeniaContext _context;
    private readonly IConfiguration _configuration;
    private readonly IEmailService _emailService;

    public LoginService(TlumaczeniaContext context, IEmailService emailService, IConfiguration configuration)
    {
        this._context = context;
        _configuration = configuration;
        _emailService = emailService;
    }

    public async Task<List<User>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    private async Task<bool> CheckIfValidEmail(RegisterDTO registerDTo)
    {
        var countAsync = await _context.Users.Where(user => user.Email.Equals(registerDTo.email)).CountAsync();
        if (countAsync != 0)
        {
            return false;
        }

        return true;
    }

    private async Task<bool> CheckIfValidTranslatorNumber(RegisterDTO registerDTo)
    {
        var countAsync = await _context.Tłumaczs
            .Where(tłumacz => tłumacz.NumerIndeksuTłumacza.Equals(registerDTo.translatorNumber)).CountAsync();
        if (countAsync != 0)
        {
            return false;
        }

        return true;
    }

    public async Task ConfirmRegister(int id)
    {
        var userToConfirm = await _context.Users.FirstOrDefaultAsync(user => user.Id == id);

        if (userToConfirm == null)
        {
            throw new ArgumentException("Nie znaleziono takiego użytkownika.");
        }

        userToConfirm.Potwierdzony = true;
        
        Console.WriteLine("zapisalem takiego usera mordo");

        await _context.SaveChangesAsync();
    }
    public async Task<RegisterDTO>? RegisterClient(RegisterDTO registerDto)
    {
        var validEmail = await CheckIfValidEmail(registerDto);
        if (!validEmail)
        {
            throw new Exception("Istnieje już taki email");
        }

        var validTranslatorNumber = await CheckIfValidTranslatorNumber(registerDto);
        if (!validTranslatorNumber)
        {
            throw new Exception("Taki numer tłumacza jest już zarezerwowany upewnij się, że jest on poprawny.");
        }

        var maxAsync = await _context.Users.Select(user => user.Id).MaxAsync();
        var fromDateTime = DateTime.Now;
        Console.Write(registerDto.password);
        var hashedPassword = BCrypt.Net.BCrypt.HashPassword(registerDto.password);
        var tłumacz = new Tłumacz()
        {
            NumerIndeksuTłumacza = registerDto.translatorNumber,
            DataDołaczenia = fromDateTime,
            DataOdejścia = null,
            UserId = maxAsync + 1
        };
        var entity = new User()
        {
            Email = registerDto.email,
            Hasło = hashedPassword,
            Id = maxAsync + 1,
            Imie = registerDto.name,
            Nazwisko = registerDto.surname,
            RoleId = 1,
            Tłumacz = tłumacz,
            Potwierdzony = false
        }; 
        string backendUrl = $"http://localhost:5253/MojeRep/login/{entity.Id}";
        string emailBody = $@"
    <h1>Witaj!</h1>
    <p>Kliknij w przycisk poniżej, aby potwierdzić:</p>
    <a href='{backendUrl}' style='padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;'>Kliknij tutaj</a>
";
        Console.WriteLine("wysylam maila");
        _emailService.SendEmail(entity.Email, "Potwierdź swój adres email.", emailBody);
        
        await _context.Users.AddAsync(entity);
        await _context.SaveChangesAsync();
        return registerDto;
    }

    private string GenerateJwtToken(int userId, int roleId)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        // Tworzenie zawartości tokena
        var claims = new[]
        {
            new Claim("id", userId.ToString()),
            new Claim("role", roleId.ToString())
        };

        var token = new JwtSecurityToken(
            issuer: "MojeRepertorium", // Wydawca tokena
            audience: "MojeRepertorium", // Odbiorca tokena
            claims: claims,
            expires: DateTime.Now.AddHours(24), // Czas ważności tokena
            signingCredentials: credentials
        );

        // Serializacja tokena do postaci tekstowej
        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<string> ValidateLoginInfo(LoginDTO loginDto)
    {
        var firstOrDefaultAsync = await _context.Users
            .Where(u => u.Email.Equals(loginDto.email)).FirstOrDefaultAsync();
        if (firstOrDefaultAsync == null)
        {
            throw new Exception("Ten email nie jest przypisany do żadnego użytkownika");
        }
        if (firstOrDefaultAsync.Potwierdzony==false)
        {
            throw new Exception("Ten email jeszcze nie został potwierdzony, sprawdź maila.");
        }

        var correctPassowrd = BCrypt.Net.BCrypt.Verify(loginDto.password, firstOrDefaultAsync.Hasło);
        if (!correctPassowrd)
        {
            throw new Exception("Podano złe hasło");
        }

        var generateJwtToken = GenerateJwtToken(firstOrDefaultAsync.Id, firstOrDefaultAsync.RoleId);
        return generateJwtToken;
    }
}