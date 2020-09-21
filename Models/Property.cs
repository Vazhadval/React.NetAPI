﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace React.Models
{
    public class Property
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string PropertyName { get; set; }
        [Required]
        public string PropertyValue { get; set; }
    }

    public class PropertyForRequest
    {
        public string propertyname { get; set; }
        public string PropertyValue { get; set; }
    }
}
