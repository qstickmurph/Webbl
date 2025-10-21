using Webbl.Api.Dtos;
using Entities = Webbl.Data.Entities;

namespace Webbl.Api.MappingExtensions;

public static class PlayerMappingExtensions {
    public static PlayerDto ToDto(this Entities.Player player) {
        return new PlayerDto {
            Id = player.Id,
            Name = player.Name,
            MA = player.MA,
            ST = player.ST,
            AG = player.AG,
            PA = player.PA,
            AV = player.AV
        };
    }
}