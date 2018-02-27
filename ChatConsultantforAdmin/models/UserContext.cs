﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ChatConsultantforAdmin.models
{
    public class UserContext : DbContext
    {
        public UserContext() : base("DbConnection")
        { }

        public DbSet<Users> Users { get; set; }
    }
}