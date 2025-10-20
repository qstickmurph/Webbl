using Microsoft.AspNetCore.Mvc;
using Webbl.Api.ApiServices;
using Entities = Webbl.Data.Entities;

namespace Webbl.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public sealed class GameController(IGameService gameService) : ControllerBase {
  [HttpGet]
  public ActionResult<Entities.Game> GetGame() {
    var game = gameService.GetGame();
    return game;
  }
}
