using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using React.Dtos;
using React.Models;
using React.Repository.Interfaces;

namespace React.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService service)
        {
            _productService = service;
        }

        [HttpGet]
        [Route("GetAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _productService.GetProducts());
        }

        [HttpGet]
        [Route("GetById")]
        public async Task<IActionResult> GetById(int id)
        {
            return Ok(await _productService.GetById(id));
        }

        [HttpPost]
        [Route("Addproduct")]
        public async Task<IActionResult> AddProduct([FromForm] AddProductRequest p)
        {
            return Ok(await _productService.AddProduct(p));
        }


        [HttpPost]
        [Route("EditProduct")]
        public async Task<IActionResult> EditProduct([FromBody] Product p)
        {
            return Ok(await _productService.EditProduct(p));
        }

        [HttpPost]
        [Route("SearchProduct")]
        public async Task<IActionResult> SearchProduct(string searchTerm)
        {
            return Ok(await _productService.SearchProduct(searchTerm));
        }
    }

}
public class p
{
    public string Name { get; set; }
    public string Properties { get; set; }
    public string Photo { get; set; }
}
