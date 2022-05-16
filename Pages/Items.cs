using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Zofya.Pages;

public class ItemsModel : PageModel
{
    private readonly ILogger<ItemsModel> _logger;

    public ItemsModel(ILogger<ItemsModel> logger)
    {
      _logger = logger;
    }

    public void OnGet()
    {

    }
}
