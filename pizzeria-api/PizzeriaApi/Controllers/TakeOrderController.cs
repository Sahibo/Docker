using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PizzeriaApi.DbContexts;

namespace PizzeriaApi.Controllers;

[ApiController]
[Route("[controller]")]

public class TakeOrderController : ControllerBase
{
    private readonly PizzeriaDbContext _dbContext;

    public TakeOrderController(PizzeriaDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpPost("Post")]
    public async Task<IActionResult> TakeOrder([FromBody] Order order)
    {
        if (order == null)
        {
            return BadRequest("Invalid order data");
        }

        try
        {
            _dbContext.Orders.Add(order);
            await _dbContext.SaveChangesAsync();

            return Ok("Order placed successfully");
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Custom internal server error: {ex.Message}");
        }
    }
    
    [HttpGet("Get")]
    public async Task<ActionResult<List<Order>>> GetOrders()
    {
        var orders = await _dbContext.Orders.ToListAsync();

        return Ok(orders);
    }
    
    [HttpPatch("{id}")]
    public async Task<IActionResult> PatchOrder(int id)
    {
        var existingOrder = await _dbContext.Orders.FindAsync(id);

        if (existingOrder == null)
        {
            return NotFound("Order not found");
        }

        if(existingOrder.IsDelivered)
        {
            existingOrder.IsDelivered = false;
            await _dbContext.SaveChangesAsync();

            return Ok("Order updated successfully");
        }
        existingOrder.IsDelivered = true;
        await _dbContext.SaveChangesAsync();

        return Ok("Order updated successfully");   
    }
}