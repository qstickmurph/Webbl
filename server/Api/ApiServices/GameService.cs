using Webbl.Api.Dtos;
using Webbl.Api.MappingExtensions;
using Webbl.Data;

namespace Webbl.Api.ApiServices;

public sealed class GameService(ApplicationDbContext applicationDbContext) : IGameService {
    private readonly ApplicationDbContext _applicationDbContext = applicationDbContext;

    public GameDto GetGame() {
        var game = _applicationDbContext.Games.First();

        return game.ToDto();
    }
}