using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using React.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace React.Dtos
{
    public class AddProductRequest
    {
        public string Name { get; set; }
        public string Properties { get; set; }
        public IFormFile Photo { get; set; }
    }
}
