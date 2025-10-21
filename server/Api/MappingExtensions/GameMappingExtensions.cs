using System.Collections.Immutable;
using System.Collections.ObjectModel;

using Webbl.Api.Dtos;
using Entities = Webbl.Data.Entities;

namespace Webbl.Api.MappingExtensions;

public static class GameMappingExtensions {
    public static GameDto ToDto(this Entities.Game game) {
        return new GameDto {
            Id = game.Id,
            Players = [.. game.Players.Select(player => player.ToDto())]
        };
    }
}