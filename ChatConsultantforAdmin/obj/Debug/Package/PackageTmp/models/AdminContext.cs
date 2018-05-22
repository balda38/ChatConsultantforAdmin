using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ChatConsultantforAdmin.models
{
    public class AdminContext : DbContext
    {
        public AdminContext() : base("DbConnection")
        { }

        public DbSet<Admin> Admins { get; set; }
    }

    public interface AdmRepository
    {
        IEnumerable<Admin> List();
        void Save(Admin admin);
        bool Check(string login);
        string Enter(string login, string password);
        void Edit(Admin admin);
        bool ChangeStatus(string login, bool status);
        string GetAdmin(string site);
    }

    public class AdminsRepository : IDisposable, AdmRepository
    {
        private AdminContext db = new AdminContext();

        public IEnumerable<Admin> List()
        {
            return db.Admins;
        }

        public void Save(Admin admin)
        {
            db.Admins.Add(admin);
            db.SaveChanges();
        }

        public bool Check(string login)
        {
            if (db.Admins.Where(x => x.login == login).FirstOrDefault() == null) return false;
            else return true;
        }

        public string Enter(string login, string password)
        {
            if (db.Admins.Where(x => x.login == login && x.password == password && x.status != true).FirstOrDefault() != null) return "Успешный вход";
            else
            {
                if (db.Admins.Where(x => x.login == login && x.password == password && x.status).FirstOrDefault().status == true) return "Данная учетная запись уже авторизована";
                else return "Неправильное имя пользователя или пароль";
            }
        }

        public void Edit(Admin settings)
        {
            if (settings.name != null)
            {
                db.Admins.Where(x => x.login == settings.login).FirstOrDefault().name = settings.name;
                db.SaveChanges();
            }

            if (settings.post != null)
            {
                db.Admins.Where(x => x.login == settings.login).FirstOrDefault().post = settings.post;
                db.SaveChanges();
            }

            if (settings.password != null)
            {
                db.Admins.Where(x => x.login == settings.login).FirstOrDefault().password = settings.password;
                db.SaveChanges();
            }

            if (settings.email != null)
            {
                db.Admins.Where(x => x.login == settings.login).FirstOrDefault().email = settings.email;
                db.SaveChanges();
            }

            if (settings.site != null)
            {
                db.Admins.Where(x => x.login == settings.login).FirstOrDefault().site = settings.site;
                db.SaveChanges();
            }
        }

        public bool ChangeStatus(string login, bool status)
        {
            if (db.Admins.Where(x => x.login == login).FirstOrDefault().status != true || status != true)
            {
                db.Admins.Where(x => x.login == login).FirstOrDefault().status = status;
                db.SaveChanges();
                return true;
            }
            else return false;
        }

        public string GetAdmin(string site)
        {
            var onlineAdmins = db.Admins.Where(x => x.status == true && x.site == site).ToList();
            int rnd;
            if (onlineAdmins.Count == 1) rnd = 0;
            else rnd = new Random().Next(onlineAdmins.Count);

            return onlineAdmins[rnd].name.Split(' ')[0];
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