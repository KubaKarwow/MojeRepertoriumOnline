using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using WebApplication6.Login;

namespace WebApplication6.Tlumacz;

[ApiController]
[Route("MojeRep/tlumacz/{userId}")]
[EnableCors("AllowFrontend")] // Dodaj to, jeśli problem nie ustąpi
public class TlumaczController:ControllerBase
{
    private readonly ITlumaczService _service;

    public TlumaczController(ITlumaczService service)
    {
        _service = service;
    }
    [HttpGet("Credentials")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> GetCredentials([FromRoute] int userId)
    {
        var credentials = await _service.GetCredentials(userId);
        return Ok(credentials);
    }

    [HttpGet("Languages/amount")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> GetAmountOfLanguages([FromRoute] int userId)
    {
        var amountOfLanguages = await _service.GetAmountOfLanguages(userId);
        return Ok(amountOfLanguages);
    }
    [HttpGet("Languages/{startIndex}/{amountToShow}")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> GetLanguages([FromRoute] int userId,[FromRoute] int startIndex,[FromRoute] int amountToShow)
    {
        var languageTranslatorRecordDtos = await _service.GetLanguagesPaginated(userId,startIndex,amountToShow);
        return Ok(languageTranslatorRecordDtos);
    }

    [HttpDelete("Languages/{languageId}")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> DeleteLanguageRecord([FromRoute] int userId, [FromRoute] int languageId)
    {
        var deleteLanguage = await _service.DeleteLanguage(languageId,userId);
        return Ok("Usunieto jezyk " + languageId);
    }

    [HttpPut("Credentials")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> ChangeCredentials([FromRoute] int userId, [FromBody] CredentialsDTO credentialsDto)
    {
        try
        {
            var changeCredentials = await _service.ChangeCredentials(credentialsDto, userId);
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
        return Ok(credentialsDto);
    }

    [HttpPost("Languages")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> AddLanguageRecord([FromBody] LanguageDTO langTransRecordDto, [FromRoute] int userId)
    {
        try
        {
            var addLanguage = await _service.AddLanguage(langTransRecordDto, userId);
            return Ok(addLanguage);

        }
        catch (Exception e)
        {
            return BadRequest("Ten język już jest przypisany do tego tłumacza.");
        }
    }
    
    [HttpPut("Languages")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> ChangeLanguageData([FromBody] ReturnLangTransRecordDTO languageDto, [FromRoute] int userId)
    {
        var changedLanguageData = await _service.ChangeLanguageData(languageDto,userId);
        return Ok(changedLanguageData);
    }
     
    

    

}