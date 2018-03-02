using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ChatConsultantforAdmin.models;

namespace ChatConsultantforAdmin.controllers
{
    public class AdminsController : Controller
    {
        private AdminContext db = new AdminContext();

        // GET: Admins
        public ActionResult Index()
        {
            return View(db.Admins.ToList());
        }

        [HttpPost]
        public JsonResult NewAdmin(string login, string password)
        {
            Admin admin = new Admin();
            admin.login = login;
            admin.password = password;

            JsonResult jsonMsg = Json("");
            IQueryable<Admin> admins = db.Admins;

            if (db.Admins.Where(x => x.login == login).FirstOrDefault() == null)
            {
                db.Admins.Add(admin);
                db.SaveChanges();
                jsonMsg = Json("Успешная регистрация");
            }
            else
            {
                jsonMsg = Json("Учетная запись администратора с таким именем уже существует");
            }            

            return jsonMsg;
        }

        [HttpGet]
        public JsonResult AdminEnter(string login, string password)
        {
            JsonResult jsonMsg = Json("Неверное имя пользователя или пароль", JsonRequestBehavior.AllowGet);

            foreach (var admin in db.Admins)
            {
                if ((admin.login == login) && (admin.password == password))
                {
                    jsonMsg = Json("Успешный вход", JsonRequestBehavior.AllowGet);
                    break;
                }
            }        

            return jsonMsg;
        }
    }
}
