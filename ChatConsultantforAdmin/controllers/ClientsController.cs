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
        public JsonResult NewClient(string name, string site)
        {
            var admins = repository2.List().Where(x => x.status == true);

            Clients client = new Clients();
            client.name = name;
            client.site = site;

            //Random rnd = new Random();
            client.admin = "admin1";

            repository1.NewClient(client);

            return Json("done");
        }

        [HttpGet]
        public JsonResult GetClients(string admin)
        {
            return Json(repository1.List(admin), JsonRequestBehavior.AllowGet);
        }
    }
}