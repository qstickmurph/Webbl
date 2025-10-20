using Entities = Webbl.Data.Entities;

namespace Webbl.Api.ApiServices;

public interface IGameService {
  public Entities.Game GetGame();
}
