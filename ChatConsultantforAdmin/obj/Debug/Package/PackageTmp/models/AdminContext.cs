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

    public interface AdmRepository
    {
        IEnumerable<Admin> List();
        void Save(string login, string password);
        bool Check(string login);
        bool Enter(string login, string password);
        void Edit(string password);
    }

    public class AdminsRepository : IDisposable, AdmRepository
    {
        private AdminContext db = new AdminContext();

        public IEnumerable<Admin> List()
        {
            return db.Admins;
        }

        public void Save(string login, string password)
        {
            Admin admin = new Admin();
            admin.login = login;
            admin.password = password;

            db.Admins.Add(admin);
            db.SaveChanges();
        }

        public bool Check(string login)
        {
            if (db.Admins.Where(x => x.login == login).FirstOrDefault() == null) return false;
            else return true;
        }

        public bool Enter(string login, string password)
        {
            if (db.Admins.Where(x => x.login == login && x.password == password).FirstOrDefault() != null) return true;
            else return false;
        }

        public void Edit(string password)
        {
            var adm = "admin1";

            db.Admins.Where(x => x.login == adm).FirstOrDefault().password = password;
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