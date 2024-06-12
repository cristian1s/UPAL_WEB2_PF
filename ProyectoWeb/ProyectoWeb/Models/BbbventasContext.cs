using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace ProyectoWeb.Models;

public partial class BbbventasContext : DbContext
{
    public BbbventasContext()
    {
    }

    public BbbventasContext(DbContextOptions<BbbventasContext> options)
        : base(options)
    {
    }

    public virtual DbSet<TbCategoria> TbCategorias { get; set; }

    public virtual DbSet<TbCliente> TbClientes { get; set; }

    public virtual DbSet<TbDetalleVenta> TbDetalleVentas { get; set; }

    public virtual DbSet<TbMarca> TbMarcas { get; set; }

    public virtual DbSet<TbModelo> TbModelos { get; set; }

    public virtual DbSet<TbProducto> TbProductos { get; set; }

    public virtual DbSet<TbSubcategoria> TbSubcategorias { get; set; }

    public virtual DbSet<TbUsuario> TbUsuarios { get; set; }

    public virtual DbSet<TbVenta> TbVentas { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySQL("server=localhost;port=3306;user=root;password=;database=bbbventas");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<TbCategoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_categorias");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Descripcion)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("estado");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<TbCliente>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_clientes");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Apellido)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("apellido");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("correo");
            entity.Property(e => e.Direccion)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("direccion");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("estado");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<TbDetalleVenta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_detalle_ventas");

            entity.HasIndex(e => e.ProductoId, "productoId");

            entity.HasIndex(e => e.VentaId, "ventaId");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Cantidad)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("cantidad");
            entity.Property(e => e.PrecioUnitario)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("precio_unitario");
            entity.Property(e => e.ProductoId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("productoId");
            entity.Property(e => e.Subtotal)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("subtotal");
            entity.Property(e => e.VentaId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("ventaId");

            entity.HasOne(d => d.Producto).WithMany(p => p.TbDetalleVenta)
                .HasForeignKey(d => d.ProductoId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("tb_detalle_ventas_ibfk_2");

            entity.HasOne(d => d.Venta).WithMany(p => p.TbDetalleVenta)
                .HasForeignKey(d => d.VentaId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("tb_detalle_ventas_ibfk_1");
        });

        modelBuilder.Entity<TbMarca>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_marcas");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Descripcion)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("estado");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("nombre");
        });

        modelBuilder.Entity<TbModelo>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_modelos");

            entity.HasIndex(e => e.MarcaId, "marcaId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Descripcion)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("estado");
            entity.Property(e => e.MarcaId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("marcaId");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("nombre");

            entity.HasOne(d => d.Marca).WithMany(p => p.TbModelos)
                .HasForeignKey(d => d.MarcaId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("tb_modelos_ibfk_1");
        });

        modelBuilder.Entity<TbProducto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_productos");

            entity.HasIndex(e => e.CategoriaId, "categoriaId");

            entity.HasIndex(e => e.MarcaId, "marcaId");

            entity.HasIndex(e => e.ModeloId, "modeloId");

            entity.HasIndex(e => e.SubcategoriaId, "subcategoriaId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Caracteristicas)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("caracteristicas");
            entity.Property(e => e.CategoriaId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("categoriaId");
            entity.Property(e => e.Descuento)
                .HasPrecision(5)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("descuento");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("estado");
            entity.Property(e => e.Estrellas)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("estrellas");
            entity.Property(e => e.MarcaId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("marcaId");
            entity.Property(e => e.ModeloId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("modeloId");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("nombre");
            entity.Property(e => e.Precio)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("precio");
            entity.Property(e => e.Stock)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("stock");
            entity.Property(e => e.StockMinimo)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("stockMinimo");
            entity.Property(e => e.SubcategoriaId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("subcategoriaId");

            entity.HasOne(d => d.Categoria).WithMany(p => p.TbProductos)
                .HasForeignKey(d => d.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("tb_productos_ibfk_1");

            entity.HasOne(d => d.Marca).WithMany(p => p.TbProductos)
                .HasForeignKey(d => d.MarcaId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("tb_productos_ibfk_3");

            entity.HasOne(d => d.Modelo).WithMany(p => p.TbProductos)
                .HasForeignKey(d => d.ModeloId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("tb_productos_ibfk_4");

            entity.HasOne(d => d.Subcategoria).WithMany(p => p.TbProductos)
                .HasForeignKey(d => d.SubcategoriaId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("tb_productos_ibfk_2");
        });

        modelBuilder.Entity<TbSubcategoria>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_subcategorias");

            entity.HasIndex(e => e.CategoriaId, "categoriaId");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.CategoriaId)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("categoriaId");
            entity.Property(e => e.Descripcion)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("text")
                .HasColumnName("descripcion");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("estado");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("nombre");

            entity.HasOne(d => d.Categoria).WithMany(p => p.TbSubcategoria)
                .HasForeignKey(d => d.CategoriaId)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("tb_subcategorias_ibfk_1");
        });

        modelBuilder.Entity<TbUsuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_usuarios");

            entity.Property(e => e.Id).HasColumnType("int(11)");
            entity.Property(e => e.Apellido)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("apellido");
            entity.Property(e => e.Correo)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("correo");
            entity.Property(e => e.Estado)
                .HasMaxLength(50)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("estado");
            entity.Property(e => e.Nombre)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("nombre");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("password");
            entity.Property(e => e.Username)
                .HasMaxLength(255)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("username");
        });

        modelBuilder.Entity<TbVenta>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PRIMARY");

            entity.ToTable("tb_ventas");

            entity.HasIndex(e => e.Cliente, "fk_tb_ventas_clientes");

            entity.Property(e => e.Id)
                .HasColumnType("int(11)")
                .HasColumnName("id");
            entity.Property(e => e.Cliente)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("int(11)")
                .HasColumnName("cliente");
            entity.Property(e => e.Fecha)
                .HasDefaultValueSql("'NULL'")
                .HasColumnType("date")
                .HasColumnName("fecha");
            entity.Property(e => e.Total)
                .HasPrecision(10)
                .HasDefaultValueSql("'NULL'")
                .HasColumnName("total");

            entity.HasOne(d => d.ClienteNavigation).WithMany(p => p.TbVenta)
                .HasForeignKey(d => d.Cliente)
                .OnDelete(DeleteBehavior.Restrict)
                .HasConstraintName("fk_tb_ventas_clientes");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
