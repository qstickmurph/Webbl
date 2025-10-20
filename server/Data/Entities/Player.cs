namespace Webbl.Data.Entities;

public class Player {
  public required Guid Id { get; set; }

  public required string Name { get; set; }

  public required int MA { get; set; }

  public required int ST { get; set; }

  public required int AG { get; set; }

  public required int PA { get; set; }

  public required int AV { get; set; }
}
