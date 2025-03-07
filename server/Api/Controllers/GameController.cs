using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Mvc;

namespace Webbl.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GameController: ControllerBase {
    [HttpGet]
    public ActionResult<string> GetGame() {
        return Ok("Hello World!");
    }
}