using System.Net;
using System.Net.Mail;

namespace WebApplication6.Services;

public class EmailService:IEmailService
{
    public async void  SendEmail(string toAddress, string subject, string body)
    {
        Console.WriteLine("wysylam maila mordo z funkcji");
        try
        {
            string fromAddress = "mojerepertoriumonline@gmail.com";
            string fromPassword = "qhyg gnfk nnfe tqce";

            SmtpClient smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential(fromAddress, fromPassword),
                EnableSsl = true,
            };

            MailMessage mailMessage = new MailMessage
            {
                From = new MailAddress(fromAddress),
                Subject = subject,
                Body = body,
                IsBodyHtml = true, // Ustaw na true, aby wysłać HTML
            };

            mailMessage.To.Add(toAddress);

            await smtpClient.SendMailAsync(mailMessage);
        }
        catch (Exception ex)
        {
            Console.WriteLine($"Błąd podczas wysyłania e-maila: {ex.Message}");
        }
    }
}