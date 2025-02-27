using Microsoft.AspNetCore.Mvc;
using WebApplication6.Login;

namespace WebApplication6.Controllers;


[ApiController]
[Route("MojeRep/login")]
public class LoginController:ControllerBase
{

    private readonly ILoginService _service;

    public LoginController(ILoginService service)
    {
        _service = service;
    }

    [HttpPut]
    public async Task<IActionResult> LoginClient([FromBody] LoginDTO loginDto)
    {
        try
        {
            var jwtToken = await _service.ValidateLoginInfo(loginDto);
            return Ok(jwtToken);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpGet("{userId}")]
    public async Task<IActionResult> confirmRegister([FromRoute] int userId)
    {
        await _service.ConfirmRegister(userId);
        return Ok("Konto potwierdzone, możesz przejść do aplikacji.");
    }
    [HttpPost]
    public async Task<IActionResult> RegisterClient([FromBody] RegisterDTO registerDto)
    {
        try
        {
            var registerResponse = await _service.RegisterClient(registerDto);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        return Ok(registerDto);
       
    }
    
    
}