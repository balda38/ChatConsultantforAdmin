using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ChatConsultantforAdmin.models
{
    public class DialogsMessages
    {
        public int id { get; set; }
        public string msgText { get; set; }
        public string msgFrom { get; set; }
        public string msgTo { get; set; }
        [DataType(DataType.DateTime)]
        [DisplayFormat(DataFormatString = "hh:mm:ss dd.MM.yyyy", ApplyFormatInEditMode = true)]
        public DateTime date { get; set; }
    }
}