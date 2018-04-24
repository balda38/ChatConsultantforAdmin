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

    public interface ClntRepository
    {
        IEnumerable<Clients> List();
        void SetLastMsg(string msgTo, DateTime date);
    }

    public class ClientsRepository : IDisposable, ClntRepository
    {
        private ClientsContext db = new ClientsContext();

        public IEnumerable<Clients> List()
        {
            return db.Clients.OrderByDescending(x => x.last_message);
        }

        public void SetLastMsg(string msgTo, DateTime date)
        {
            var nedeedClient = db.Clients.Where(x => x.name == msgTo).FirstOrDefault();
            nedeedClient.last_message = date.ToString();
            db.SaveChanges();
        }

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}