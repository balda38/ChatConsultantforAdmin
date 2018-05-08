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
        public JsonResult AddMessage(DialogsMessages newMsg)
        {
            JsonResult jsonMsg = Json("");                    

            if (newMsg.msgText != null)
            {
                CultureInfo provider = CultureInfo.GetCultureInfo("ru-RU");
                var date = DateTime.Now;
                newMsg.date = DateTime.Parse(date.ToString(), provider);

                repository1.Save(newMsg);
                repository2.SetLastMsg(newMsg.msgFrom, newMsg.date);

                jsonMsg = Json(newMsg.date, JsonRequestBehavior.AllowGet);
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