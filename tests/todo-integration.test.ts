/*
 * Migrate empty DB
 * Create todo
 * should return created todo  with ID
 * todo should be in db -> execute query to db for looking
 */
describe('CRUD operations tests for TODO', () => {
  it('Should passed', () => {});
});

/*
 * For testing updation
 * Migrate db with well known db
 */

/*
 * For testing deletion
 * just delete
 */
/**

drop database if exists people;
create database if not exists people;
use people;

create table Person
(
    id    int primary key auto_increment,
    name  varchar(50)  not null,
    email varchar(100) not null

);

query çalıştır : her testten önce beforeEach sil oluştur vb.

https://sequelize.org/docs/v6/core-concepts/raw-queries/

github ci ortamında test etmek için:

  */
