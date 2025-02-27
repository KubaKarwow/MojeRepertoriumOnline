using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication6.Admin;


[ApiController]
[Route("MojeRep/admin")]
[EnableCors("AllowFrontend")] // Dodaj to, jeśli problem nie ustąpi

public class AdminController:ControllerBase
{

    private readonly IAdminService _service;

    public AdminController(IAdminService service)
    {
        _service = service;
    }

    [HttpGet("Languages")]
    public async Task<IActionResult> GetAllLanguages()
    {
        var allLanguages =await  _service.GetAllLanguages();
        return Ok(allLanguages);
    }
    [HttpDelete("Languages/{languageId}")]
    [Authorize(Roles = "2")] 
    public async Task<IActionResult> DeleteLanguage([FromRoute] int languageId)
    {
        var allLanguages =await  _service.DeleteLanguage(languageId);
        return Ok(allLanguages);
    }
    [HttpPut("Languages/{languageId}")]
    [Authorize(Roles = "2")] 
    public async Task<IActionResult> EditLanguage([FromRoute] int languageId, [FromBody]LanguageChangeDTO languageChangeDto)
    {
        var allLanguages =await  _service.EditLanguage(languageId, languageChangeDto.nazwa);
        return Ok(allLanguages);
    }
    [HttpPost("Languages")]
    [Authorize(Roles = "2")] 
    public async Task<IActionResult> CreateLanguage([FromBody] LanguageChangeDTO languageChangeDto)
    {
        var allLanguages =await  _service.CreateLanguage(languageChangeDto.nazwa);
        return Ok(allLanguages);
    }
}