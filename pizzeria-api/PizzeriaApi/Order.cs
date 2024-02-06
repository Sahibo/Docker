namespace PizzeriaApi;

public class Order
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string PhoneNumber { get; set; }
    public string Address { get; set; }
    public string Pizza { get; set; }
    public string Note { get; set; }
    public ushort Count { get; set; }
    public bool IsDelivered { get; set; }
}