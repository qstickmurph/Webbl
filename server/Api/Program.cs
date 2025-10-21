using System.Text.Json;
using System.Text.Json.Serialization;

using Microsoft.EntityFrameworkCore;

using Webbl.Api.ApiServices;
using Webbl.Data;

namespace Webbl.Api;

public static class Program {
    public static void Main(string[] args) {
        var builder = WebApplication.CreateBuilder(args);

        var connectionString =
            builder.Configuration.GetConnectionString("ApplicationDbConnectionString")
            ?? throw new InvalidOperationException("Connection string 'ApplicationDbConnectionString' not found.");
        builder.Services.AddDbContext<ApplicationDbContext>(options =>
                options.UseNpgsql(connectionString)
        );

        builder.Services.AddControllers().AddJsonOptions(options => 
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)));
        builder.Services.AddOpenApi();

        builder.Services.AddSingleton<IGameService, GameService>();

        var app = builder.Build();

        app.MapControllers();

        app.Run();
    }
}