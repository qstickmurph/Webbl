using Microsoft.EntityFrameworkCore;

namespace Webbl.Data;

public sealed class ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : DbContext(options) {
    public DbSet<Entities.Game> Games { get; set; }
    public DbSet<Entities.Player> Players { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder) {
        // Table Configurations
        modelBuilder.Entity<Entities.Game>(entityBuilder =>
            entityBuilder.HasKey(g => g.Id)
        );

        modelBuilder.Entity<Entities.Player>(entityBuilder => {
            entityBuilder.HasKey(p => p.Id);
            entityBuilder
                .Property(p => p.Name)
                .HasColumnType("varchar(256)");
        });

        // Relationship Configurations
        modelBuilder.Entity<Entities.Game>()
            .HasMany(g => g.Players)
            .WithMany(p => p.Games);

        // Seed Data
    }
}