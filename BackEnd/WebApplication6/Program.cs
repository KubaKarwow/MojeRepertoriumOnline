using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebApplication6.Admin;
using WebApplication6.AdminUsers;
using WebApplication6.Context;
using WebApplication6.Login;
using WebApplication6.Services;
using WebApplication6.Tlumacz;
using WebApplication6.Tlumacz.Tłumaczenia;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // Zezwól na żądania z frontendu
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});

var jwtSettings = builder.Configuration.GetSection("Jwt");
var key = Encoding.ASCII.GetBytes(jwtSettings["Key"]);
builder.Services.AddAuthentication(options =>
    {
        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(key)
        };
    });
builder.Services.AddDbContext<TlumaczeniaContext>(options =>
    options.UseMySql(builder.Configuration.GetConnectionString("Default"), 
        new MySqlServerVersion(new Version(8, 0, 2)))); 
builder.Services.AddScoped<ILoginService, LoginService>();
builder.Services.AddScoped<ITlumaczService, TlumaczService>();
builder.Services.AddScoped<ITlumaczeniaService, TlumaczeniaService>();
builder.Services.AddScoped<IAdminService, AdminService>();
builder.Services.AddScoped<IAdminUsersService, AdminUsersService>();
builder.Services.AddScoped<IEmailService, EmailService>();

var app = builder.Build();

// Użyj CORS po UseRouting(), ale przed UseEndpoints()
app.UseRouting();
app.UseCors("AllowFrontend"); // Dodaj to tutaj
app.UseAuthentication();
app.UseAuthorization();

// Reszta konfiguracji
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();

// Mapowanie kontrolerów
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();