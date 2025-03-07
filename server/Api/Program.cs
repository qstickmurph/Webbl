using System.Text.Json;
using System.Text.Json.Serialization;

namespace Webbl.Api;

public static class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);
        
        builder.Services.AddControllers().AddJsonOptions(options => 
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)));
        builder.Services.AddOpenApi();
        
        var app = builder.Build();

        app.MapControllers();
        
        app.Run();
    }
}
