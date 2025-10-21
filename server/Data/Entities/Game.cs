namespace Webbl.Data.Entities;

public sealed class Game {
    public Guid Id;

    public IEnumerable<Player> Players = [];
}