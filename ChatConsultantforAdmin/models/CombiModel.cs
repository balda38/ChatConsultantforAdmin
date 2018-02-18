using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;

namespace ChatConsultantforAdmin.models
{
    public class CombiModel
    {
        public IEnumerable<Clients> client { get; set; }
        public IEnumerable<DialogsMessages> dialogMessage { get; set; }
    }
}