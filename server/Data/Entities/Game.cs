namespace Webbl.Data.Entities;

public class Game {
  public Guid Id;

  public IEnumerable<Player> Players = [];
}