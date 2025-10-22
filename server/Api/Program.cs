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
            builder.Configuration.GetConnectionString("ApplicationDbContext")
            ?? throw new InvalidOperationException("Connection string 'ApplicationDbContext' not found.");
        builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseNpgsql(connectionString));

        builder.Services.AddControllers().AddJsonOptions(options => 
                options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter(JsonNamingPolicy.CamelCase)));
        builder.Services.AddOpenApi();

        builder.Services.AddScoped<IGameService, GameService>();

        var app = builder.Build();

        app.MapControllers();

        app.Run();
    }
}