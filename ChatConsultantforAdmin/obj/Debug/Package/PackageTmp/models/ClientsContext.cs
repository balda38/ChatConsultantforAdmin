using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Globalization;

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
        void NewClient(Clients client);
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
            nedeedClient.last_message = date;
            db.SaveChanges();
        }

        public void NewClient(Clients client)
        {
            CultureInfo provider = CultureInfo.GetCultureInfo("ru-RU");
            var date = DateTime.Now;
            client.last_message = DateTime.Parse(date.ToString(), provider);

            db.Clients.Add(client);
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