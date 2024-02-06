using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace PizzeriaApi.DbContexts;

public class PizzeriaDbContext : DbContext
{
    public DbSet<Order> Orders { get; set; }

    public PizzeriaDbContext(DbContextOptions<PizzeriaDbContext> options)
        : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder builder)
    {

        builder.Entity<Order>(entity =>
        {
            entity.HasKey(o => o.Id);
            entity.Property(o => o.Id).ValueGeneratedOnAdd();
            entity.Property(o => o.Name).IsRequired().HasMaxLength(50);
            entity.Property(o => o.PhoneNumber).IsRequired();
            entity.Property(o => o.Address).IsRequired().HasMaxLength(100);
            entity.Property(o => o.Count).IsRequired();
            entity.Property(o => o.Pizza).IsRequired();
            entity.Property(o => o.Note).HasMaxLength(200);
            entity.Property(o => o.IsDelivered).HasDefaultValue(false);
        });
    }
}