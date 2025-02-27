using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace WebApplication6.Tlumacz.Tłumaczenia;

[ApiController]
[Route("MojeRep/tlumacz/{userId}/tlumaczenia")]
[EnableCors("AllowFrontend")] // Dodaj to, jeśli problem nie ustąpi

public class TlumaczeniaController:ControllerBase
{

    private readonly ITlumaczeniaService _service;

    public TlumaczeniaController(ITlumaczeniaService service)
    {
        _service = service;
    }

    [HttpPost]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> AddTranslateRecord([FromRoute] int userId,
        [FromBody] FullTranslateDTO fullTranslateDto)
    {
        var addTranslate = await _service.AddTranslate(userId,fullTranslateDto);
        return Ok(addTranslate);
    }

    [HttpPut("{translateId}")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> ChangeTranslateRecord([FromRoute] int userId, [FromRoute] int translateId,
       [FromBody] ChangedTranslateDTO changedTranslateDto)
    {
        var changeTranslateData = await _service.ChangeTranslateData(userId, translateId, changedTranslateDto);
        return Ok(changedTranslateDto);
    }
    [HttpDelete("{translateId}")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> DeleteTranslateRecord([FromRoute] int userId, [FromRoute] int translateId)
    {
        var deleteTranslateRecord = await _service.DeleteTranslateRecord(userId, translateId);
        return Ok("Deleted a record");
    }
    [HttpGet("Ilosc")]
    [Authorize(Roles = "1")] 

    public async Task<IActionResult> GetAmountOfTranslates([FromRoute] int userId)
    {
        var amountOfTranslates = await _service.GetAmountOfTranslates(userId);
        return Ok(amountOfTranslates);
    }
    
    [HttpGet("{startIndex}/{amountToShow}")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> GetTranslates([FromRoute] int userId,[FromRoute] int startIndex,[FromRoute] int amountToShow)
    {
        var translates = await _service.GetTranslates(userId, startIndex,amountToShow);
        return Ok(translates);
    }

    [HttpGet("{translateId}")]
    [Authorize(Roles = "1")] 
    public async Task<IActionResult> GetTranslateDetails([FromRoute] int userId, [FromRoute] int translateId)
    {
        var translateDetails = await _service.GetTranslateDetails(userId,translateId);
        return Ok(translateDetails);
    }
    
    
    
}