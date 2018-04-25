using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ChatConsultantforAdmin.models
{
    public class Clients
    {
        public int id { get; set; }
        public string name { get; set; }
        public string admin { get; set; }
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "hh:mm:ss dd.MM.yyyy", ApplyFormatInEditMode = true)]
        public DateTime last_message { get; set; }
    }
}