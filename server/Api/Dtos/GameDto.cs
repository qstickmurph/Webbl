using Webbl.Api.Dtos;

namespace Webbl.Api.Dtos;

public readonly record struct GameDto {
    public Guid Id { get; init; }
    public IReadOnlyCollection<PlayerDto> Players { get; init; }
}