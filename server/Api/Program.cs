using System.Text.Json;
using System.Text.Json.Serialization;

using Webbl.Api.ApiServices;

namespace Webbl.Api;

public static class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);
        
        builder.Services.AddControllers().AddJsonOptions(options => 
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)));
        builder.Services.AddOpenApi();

        builder.Services.AddSingleton<IGameService, GameService>();
        
        var app = builder.Build();

        app.MapControllers();
        
        app.Run();
    }
}