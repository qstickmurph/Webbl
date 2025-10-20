using Entities = Webbl.Data.Entities;

namespace Webbl.Api.ApiServices;

public sealed class GameService {
  public Entities.Game GetGame() {
    return new Entities.Game {
      Id = Guid.NewGuid(),
      Players = []
    };
  }
}
