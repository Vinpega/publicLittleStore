using System;
using System.Collections.Generic;
using LittleStore1.Models;
using Microsoft.EntityFrameworkCore;

namespace LittleStore1.Data.DataContext;

public partial class LittleStoreContext : DbContext
{
    public LittleStoreContext()
    {
    }
    
    public LittleStoreContext(DbContextOptions<LittleStoreContext> options)
       : base(options)
    {

    }

    public virtual DbSet<Articulo> Articulos { get; set; }

    public virtual DbSet<ArticuloTienda> ArticuloTienda { get; set; }

    public virtual DbSet<Cliente> Clientes { get; set; }

    public virtual DbSet<Compra> Compras { get; set; }

    public virtual DbSet<CompraArticulo> CompraArticulos { get; set; }

    public virtual DbSet<Tienda> Tiendas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) { 
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Articulo>(entity =>
        {
            entity.HasKey(e => e.Codigo).HasName("PK__Articulo__06370DAD80265E81");

            entity.ToTable("Articulo");

            entity.Property(e => e.Codigo)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Descripcion)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Precio).HasColumnType("numeric(10, 2)");
        });

        modelBuilder.Entity<ArticuloTienda>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Articulo__3214EC07A44095E7");

            entity.ToTable("Articulo_tienda");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CodigoArticulo)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Codigo_articulo");
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.TiendaSucursal)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Tienda_sucursal");

            entity.HasOne(d => d.CodigoArticuloNavigation).WithMany(p => p.ArticuloTienda)
                .HasForeignKey(d => d.CodigoArticulo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Articulo___Codig__286302EC");

            entity.HasOne(d => d.TiendaSucursalNavigation).WithMany(p => p.ArticuloTienda)
                .HasForeignKey(d => d.TiendaSucursal)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Articulo___Tiend__29572725");
        });

        modelBuilder.Entity<Cliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cliente__3214EC072D8C38FF");

            entity.ToTable("Cliente");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Apellidos)
                .HasMaxLength(100)
                .IsUnicode(false);
            entity.Property(e => e.Clave)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Direccion)
                .HasMaxLength(500)
                .IsUnicode(false);
            entity.Property(e => e.Nombre)
                .HasMaxLength(50)
                .IsUnicode(false);
        });

        modelBuilder.Entity<Compra>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Compra__3214EC07A3D95D38");

            entity.ToTable("Compra");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.Fecha).HasColumnType("datetime");
            entity.Property(e => e.IdCliente).HasColumnName("Id_cliente");
            entity.Property(e => e.Total).HasColumnType("numeric(10, 2)");
            entity.Property(e => e.Pagada).HasColumnType("bit");

            entity.HasOne(d => d.IdClienteNavigation).WithMany(p => p.Compras)
                .HasForeignKey(d => d.IdCliente)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Compra__Id_clien__30F848ED");
        });

        modelBuilder.Entity<CompraArticulo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Cliente___3214EC078DEE2F82");

            entity.ToTable("Compra_articulo");

            entity.Property(e => e.Id).ValueGeneratedNever();
            entity.Property(e => e.CodigoArticulo)
                .HasMaxLength(20)
                .IsUnicode(false)
                .HasColumnName("Codigo_articulo");
            entity.Property(e => e.IdCompra).HasColumnName("Id_compra");

            entity.HasOne(d => d.CodigoArticuloNavigation).WithMany(p => p.CompraArticulos)
                .HasForeignKey(d => d.CodigoArticulo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cliente_a__Codig__34C8D9D1");

            entity.HasOne(d => d.IdCompraNavigation).WithMany(p => p.CompraArticulos)
                .HasForeignKey(d => d.IdCompra)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Cliente_a__Id_co__33D4B598");
        });

        modelBuilder.Entity<Tienda>(entity =>
        {
            entity.HasKey(e => e.Sucursal).HasName("PK__Tienda__25B372A047EB92C1");

            entity.ToTable("Tienda");

            entity.Property(e => e.Sucursal)
                .HasMaxLength(20)
                .IsUnicode(false);
            entity.Property(e => e.Direccion)
                .HasMaxLength(500)
                .IsUnicode(false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
