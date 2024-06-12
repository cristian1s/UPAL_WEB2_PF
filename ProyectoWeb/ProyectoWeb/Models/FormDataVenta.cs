namespace ProyectoWeb.Models
{
    public class FormDataVenta
    {
        public int id { get; set; }
        public int productoId   { get; set; }
        public int clienteId { get; set; }
        public decimal preciounitario { get; set; }
        public int cantidad { get; set; }
        public decimal total { get; set; }
        public DateTime fecha { get; set; }
    }
}
