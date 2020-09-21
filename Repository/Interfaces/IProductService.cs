using Microsoft.AspNetCore.Http;
using React.Dtos;
using React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Repository.Interfaces
{
    public interface IProductService
    {
        Task<IEnumerable<Product>> GetProducts();
        Task<Product> GetById(int id);
        Task<Product> EditProduct(Product p);
        Task<Product> AddProduct(AddProductRequest p);
        Task<List<Product>> SearchProduct(string searchTerm);
        Task SaveChanges();
    }
}
