namespace ChatConsultantforAdmin.Migrations
{
    using System;
    using System.Data.Entity.Migrations;

    public partial class InitStatusTime : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.StatusTimes",
                c => new
                {
                    id = c.Int(nullable: false, identity: true),
                    login = c.String(),
                    time = c.Int(nullable: false),
                })
                .PrimaryKey(t => t.id);
        }

        public override void Down()
        {

        }
    }
}
