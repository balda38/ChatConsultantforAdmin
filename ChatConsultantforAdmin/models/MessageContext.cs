using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ChatConsultantforAdmin.models
{
    public class MessageContext : DbContext
    {
        public MessageContext() : base("DbConnection")
        { }

        public DbSet<Messages> Messages { get; set; }
    }
}