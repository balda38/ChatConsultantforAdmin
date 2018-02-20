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
        private ClientsContext db = new ClientsContext();
        // GET: Message
        public ActionResult Index()
        {
            return View(db.Clients.OrderByDescending(x => x.last_message).ToList());
        }        
    }
}