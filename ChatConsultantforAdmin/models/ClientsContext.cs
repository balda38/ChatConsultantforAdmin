using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ChatConsultantforAdmin.models
{
    public class ClientsContext : DbContext
    {
        public ClientsContext() : base("DbConnection")
        { }

        public DbSet<Clients> Clients { get; set; }
    }
}