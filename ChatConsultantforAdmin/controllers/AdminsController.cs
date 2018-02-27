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

            db.Admins.Add(admin);
            db.SaveChanges();

            return Json("All ok");
        }
    }
}
