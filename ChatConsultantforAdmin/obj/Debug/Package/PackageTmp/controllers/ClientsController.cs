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
        ClntRepository repository;

        public ClientsController(ClntRepository repo)
        {
            repository = repo;
        }
        // GET: Message
        public ActionResult Index()
        {
            return View(repository.List());
        }        
    }
}