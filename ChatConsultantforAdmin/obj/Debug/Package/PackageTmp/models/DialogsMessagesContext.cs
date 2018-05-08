using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using System.Globalization;

namespace ChatConsultantforAdmin.models
{
    public class DialogsMessagesContext : DbContext
    {
        public DialogsMessagesContext() : base("DbConnection")
        { }

        public DbSet<DialogsMessages> DialogsMessages { get; set; }
    }

    public interface MsgRepository
    {
        IEnumerable<DialogsMessages> List();
        void Save(DialogsMessages msg);
        IEnumerable<DialogsMessages> SetClient(string client);
    }

    public class MessagesRepository : IDisposable, MsgRepository
    {
        private DialogsMessagesContext db = new DialogsMessagesContext();

        public IEnumerable<DialogsMessages> List()
        {
            return db.DialogsMessages;
        }

        public void Save(DialogsMessages msg)
        {
            db.DialogsMessages.Add(msg);
            db.SaveChanges();
        }

        public IEnumerable<DialogsMessages> SetClient(string client)
        {
            return db.DialogsMessages.Where(x => (x.msgTo == client) || (x.msgFrom == client)).ToList();
        }

        protected void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (db != null)
                {
                    db.Dispose();
                    db = null;
                }
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}