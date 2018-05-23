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
    public class ClientsController : Controller
    {
        ClntRepository repository1;
        AdmRepository repository2;

        public ClientsController(ClntRepository repo1, AdmRepository repo2)
        {
            repository1 = repo1;
            repository2 = repo2;
        }
        // GET: Message
        public ActionResult Index(string admin)
        {
            return View(repository1.List(admin));
        }

        [HttpPost]
        public JsonResult NewClient(string name, string admin)
        {
            var site = repository2.List().Where(x => x.login == admin).FirstOrDefault().site;
            repository1.NewClient(name, admin, site);

            return Json("done");
        }

        [HttpGet]
        public JsonResult GetClients(string admin)
        {            
            return Json(repository1.List(admin), JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public JsonResult GetClientID(string name, string admin)
        {
            return Json(repository1.List(admin).Where(x => x.name == name).FirstOrDefault().id - 1, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public JsonResult ChangeStatus(string name, bool status)
        {
            repository1.ChangeStatus(name, status);
            return Json("done");
        }
    }
}