using Microsoft.AspNetCore.Mvc;
using Webbl.Api.ApiServices;
using Webbl.Api.Dtos;

namespace Webbl.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public sealed class GameController(IGameService gameService) : ControllerBase {
  [HttpGet]
  public ActionResult<GameDto> GetGame() {
    var gameDto = gameService.GetGame();
    return Ok(gameDto);
  }
}