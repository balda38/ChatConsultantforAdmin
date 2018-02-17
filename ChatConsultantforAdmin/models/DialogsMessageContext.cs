using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ChatConsultantforAdmin.models
{
    public class DialogsMessageContext : DbContext
    {
        public DialogsMessageContext() : base("DbConnection")
        { }

        public DbSet<DialogsMessages> DialogsMessages { get; set; }
    }
}