namespace WebApplication6.Services;

public interface IEmailService
{
    public void SendEmail(string toAddress, string subject, string body);
}