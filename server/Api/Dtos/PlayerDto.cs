namespace Webbl.Api.Dtos;

public readonly record struct PlayerDto {
    public Guid Id { get; init; }

    public readonly string Name { get; init; }

    public readonly int MA { get; init; }

    public readonly int ST { get; init; }

    public readonly int AG { get; init; }

    public readonly int PA { get; init; }

    public readonly int AV { get; init; }
}