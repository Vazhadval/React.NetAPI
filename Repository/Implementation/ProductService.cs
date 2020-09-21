﻿using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using React.Data.DBContext;
using React.Dtos;
using React.Models;
using React.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace React.Repository.Implementation
{
    public class ProductService : IProductService
    {
        private readonly AppDbContext _context;
        private readonly IHostingEnvironment _env;

        public ProductService(AppDbContext context, IHostingEnvironment env)
        {
            _context = context;
            _env = env;
        }
        public async Task<Product> AddProduct(AddProductRequest p)
        {
            var property = JsonConvert.DeserializeObject<List<PropertyForRequest>>(p.Properties);
            var fileName = $"img_{p.Photo.FileName.Substring(0, p.Photo.FileName.LastIndexOf("."))}_{DateTime.Now.ToString("dd-MM-yyyy-hh-mm-ss")}";
            var mime = p.Photo.FileName.Substring(p.Photo.FileName.LastIndexOf("."));
            string url = $"{_env.WebRootPath}\\Uploads\\{fileName + mime}";

            if (p.Photo.Length > 0)
            {

                using (FileStream fileStream = File.Create(url))
                {
                    await p.Photo.CopyToAsync(fileStream);
                    fileStream.Flush();
                }
            }

            var product = new Product()
            {
                Name = p.Name,
                Properties = property.Select(x => new Property() { PropertyName = x.propertyname, PropertyValue = x.PropertyValue }).ToList(),
                PhotoUrl = url
            };

            _context.Products.Add(product);
            _context.SaveChanges();

            return product;

        }

        public async Task<Product> EditProduct(Product p)
        {
            var productFromDb = await _context.Products.SingleOrDefaultAsync(x => x.Id == p.Id);
            productFromDb.Name = p.Name;
            productFromDb.Properties = p.Properties;
            await SaveChanges();
            return productFromDb;
        }

        public async Task<Product> GetById(int id)
        {
            return await _context.Products.SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<IEnumerable<Product>> GetProducts()
        {
            return await _context.Products.Include(x => x.Properties).ToListAsync();
        }


        public async Task<List<Product>> SearchProduct(string searchTerm)
        {
            return await _context.Products.Where(x => x.Name.Contains(searchTerm)).ToListAsync();

        }

        public async Task SaveChanges()
        {
            await _context.SaveChangesAsync();
        }
    }
}
