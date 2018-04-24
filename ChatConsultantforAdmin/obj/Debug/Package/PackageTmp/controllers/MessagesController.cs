using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using ChatConsultantforAdmin.models;
using System.Globalization;

namespace ChatConsultantforAdmin.controllers
{
    public class MessagesController : Controller
    {
        MsgRepository repository1;
        ClntRepository repository2;

        public MessagesController(MsgRepository repo1, ClntRepository repo2)
        {
            repository1 = repo1;
            repository2 = repo2;
        }
        // GET: Messages
        public ActionResult DialogWindow()
        {
            return View(repository1.List());
        }

        [HttpPost]
        public JsonResult AddMessage(string msgText, string msgFrom, string msgTo)
        {
            JsonResult jsonMsg = Json("");                    

            if (msgText != null)
            {         
                repository1.Save(msgText, msgFrom, msgTo);
                repository2.SetLastMsg(msgTo, DateTime.Now);

                jsonMsg = Json("success");
            }                      

            return jsonMsg;
        }

        [HttpGet]
        public JsonResult SetClient(string client)
        {
            var clientMessages = repository1.SetClient(client);

            return Json(clientMessages, JsonRequestBehavior.AllowGet);
        }
    }
}