using Webbl.Api.Dtos;
using Webbl.Api.MappingExtensions;

using Entities = Webbl.Data.Entities;

namespace Webbl.Api.ApiServices;

public sealed class GameService : IGameService {
    public GameDto GetGame() {
        var game = new Entities.Game {
            Id = Guid.NewGuid(),
            Players = [
                new() {
                    Id = Guid.NewGuid(),
                    Name = "Player 1",
                    MA = 6,
                    ST = 3,
                    AG = 3,
                    PA = 3,
                    AV = 3
                }
            ]
        };

        return game.ToDto();
    }
}