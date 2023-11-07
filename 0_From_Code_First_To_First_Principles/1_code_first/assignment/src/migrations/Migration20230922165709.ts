import { Migration } from '@mikro-orm/migrations';

export class Migration20230922165709 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "users" ("id" serial primary key, "email" varchar(255) not null, "username" varchar(255) not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "password" varchar(255) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');
    this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "users" cascade;');
  }

}
