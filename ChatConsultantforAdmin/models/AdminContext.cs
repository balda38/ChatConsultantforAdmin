using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ChatConsultantforAdmin.models
{
    public class AdminContext : DbContext
    {
        public AdminContext():base("DbConnection")
        { }

        public DbSet<Admin> Admins { get; set; }
    }
}