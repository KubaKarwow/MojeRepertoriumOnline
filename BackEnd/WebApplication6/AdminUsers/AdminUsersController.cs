using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication6.AdminUsers;

[ApiController]
[Route("MojeRep/admin/users")]
[EnableCors("AllowFrontend")] // Dodaj to, jeśli problem nie ustąpi

public class AdminUsersController : ControllerBase
{
    private readonly IAdminUsersService _service;

    public AdminUsersController(IAdminUsersService service)
    {
        _service = service;
    }

    [HttpGet("{startIndex}/{amountToShow}")]
    [Authorize(Roles = "2")] 
    public async Task<IActionResult> GetUsersPaginated([FromRoute] int startIndex, [FromRoute] int amountToShow)
    {
        var usersPaginated = await _service.GetUsersPaginated(startIndex, amountToShow);
        return Ok(usersPaginated);
    }

    [HttpGet("amount")]
    [Authorize(Roles = "2")] 
    public async Task<IActionResult> GetAmountOfUsers()
    {
        var usersPaginated = await _service.GetAmountOfUsers();
        return Ok(usersPaginated);
    }

    [HttpPut("{userId}")]
    [Authorize(Roles = "2")] 
    public async Task<IActionResult> EditUser([FromRoute] int userId, [FromBody] UserTranslatorDTO userTranslatorDto)
    {
        try
        {
            var usersPaginated = await _service.EditUser( userId, userTranslatorDto);
            return Ok(usersPaginated);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [HttpDelete("{userId}")]
    [Authorize(Roles = "2")] 
    public async Task<IActionResult> DeleteUser([FromRoute] int userId)
    {
        var usersPaginated = await _service.DeleteUser(userId);
        return Ok(usersPaginated);
    }
}