using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;
using WebApplication6.Models;

namespace WebApplication6.Context;

public partial class TlumaczeniaContext : DbContext
{
    public TlumaczeniaContext()
    {
    }

    public TlumaczeniaContext(DbContextOptions<TlumaczeniaContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Jezyk> Jezyks { get; set; }

    public virtual DbSet<Obsługuje> Obsługujes { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Tłumacz> Tłumaczs { get; set; }

    public virtual DbSet<Tłumaczeniewykonane> Tłumaczeniewykonanes { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;database=tlumaczenia;uid=root;pwd=1Dc7a543946!", Microsoft.EntityFrameworkCore.ServerVersion.Parse("9.1.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Jezyk>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("jezyk");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Nazwa).HasMaxLength(50);
        });

        modelBuilder.Entity<Obsługuje>(entity =>
        {
            entity.HasKey(e => new { e.JezykId, e.TłumaczId })
                .HasName("PRIMARY")
                .HasAnnotation("MySql:IndexPrefixLength", new[] { 0, 0 });

            entity.ToTable("obsługuje");

            entity.HasIndex(e => e.TłumaczId, "Obsługuje_Tłumacz");

            entity.Property(e => e.JezykId).HasColumnName("JezykID");
            entity.Property(e => e.TłumaczId).HasColumnName("TłumaczID");
            entity.Property(e => e.Poziom).HasMaxLength(50);

            entity.HasOne(d => d.Jezyk).WithMany(p => p.Obsługujes)
                .HasForeignKey(d => d.JezykId)
                .HasConstraintName("ObsługujeJezyk");

            entity.HasOne(d => d.Tłumacz).WithMany(p => p.Obsługujes)
                .HasForeignKey(d => d.TłumaczId)
                .HasConstraintName("Obsługuje_Tłumacz");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Nazwa).HasMaxLength(50);
        });

        modelBuilder.Entity<Tłumacz>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.ToTable("tłumacz");

            entity.Property(e => e.UserId)
                .ValueGeneratedNever()
                .HasColumnName("UserID");
            entity.Property(e => e.DataDołaczenia).HasColumnType("datetime");
            entity.Property(e => e.DataOdejścia).HasColumnType("datetime");

            entity.HasOne(d => d.User).WithOne(p => p.Tłumacz)
                .HasForeignKey<Tłumacz>(d => d.UserId)
                .HasConstraintName("Tłumacz_User");
        });

        modelBuilder.Entity<Tłumaczeniewykonane>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tłumaczeniewykonane");

            entity.HasIndex(e => e.JęzykŹródłowy, "TłumaczenieWykonaneJezyk1");

            entity.HasIndex(e => e.JęzykDocelowy, "TłumaczenieWykonaneJezyk2");

            entity.HasIndex(e => e.TłumaczId, "TłumaczenieWykonane_Tłumacz");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.DataWykonania).HasColumnType("datetime");
            entity.Property(e => e.NazwaDokumentu).HasMaxLength(50);
            entity.Property(e => e.TłumaczId).HasColumnName("TłumaczID");

            entity.HasOne(d => d.JęzykDocelowyNavigation).WithMany(p => p.TłumaczeniewykonaneJęzykDocelowyNavigations)
                .HasForeignKey(d => d.JęzykDocelowy)
                .HasConstraintName("TłumaczenieWykonaneJezyk2");

            entity.HasOne(d => d.JęzykŹródłowyNavigation).WithMany(p => p.TłumaczeniewykonaneJęzykŹródłowyNavigations)
                .HasForeignKey(d => d.JęzykŹródłowy)
                .HasConstraintName("TłumaczenieWykonaneJezyk1");

            entity.HasOne(d => d.Tłumacz).WithMany(p => p.Tłumaczeniewykonanes)
                .HasForeignKey(d => d.TłumaczId)
                .HasConstraintName("TłumaczenieWykonane_Tłumacz");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.RoleId, "User_Role");

            entity.Property(e => e.Id).HasColumnName("ID");
            entity.Property(e => e.Email).HasMaxLength(50);
            entity.Property(e => e.Hasło).HasMaxLength(100);
            entity.Property(e => e.Imie).HasMaxLength(50);
            entity.Property(e => e.Nazwisko).HasMaxLength(50);
            entity.Property(e => e.RoleId).HasColumnName("Role_ID");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.RoleId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("User_Role");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
