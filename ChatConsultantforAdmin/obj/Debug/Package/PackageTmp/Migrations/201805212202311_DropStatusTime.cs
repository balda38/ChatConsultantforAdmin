namespace ChatConsultantforAdmin.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DropStatusTime : DbMigration
    {
        public override void Up()
        {
            DropTable("StatusTimes");
        }
        
        public override void Down()
        {
        }
    }
}
