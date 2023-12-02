select * from users
select * from rooms
select * from photos
select * from profile_img


create table users (id varchar(250)  not null,
				   first_name varchar(250) not null,
				   last_name varchar(250) not null,
				   email varchar(250) PRIMARY KEY not null,
				   password varchar(250) not null,
				   profile_img_url text not null,
				   created timestamp default now())

create table photos (id text references rooms(id),
					 url text not null,
					created timestamp default now())
					 
create table profile_img (id text references rooms(id),
					 url text not null,
				      created timestamp default now())

delete  from photos where id = 'd756f6f7-0ce8-417d-a8fc-e612d3584cfb'
delete  from profile_img where id = 'd756f6f7-0ce8-417d-a8fc-e612d3584cfb'
delete from rooms where id = 'd756f6f7-0ce8-417d-a8fc-e612d3584cfb'




create table rooms (id varchar(250) PRIMARY KEY not null,
				   email varchar(250) references users(email),
				   city varchar(250) not null,
				   fulladdress text, 
					size varchar(250),
				   longitude varchar(250) not null,
				   attitude varchar(250) not null,
				   age varchar(250),
				   availability varchar(250),
				   title varchar(250) not null,
				   description text not null,
				   comforts text,
				   cleanliness varchar(250),
				   getup varchar(250),
				   gotobed varchar(250),
				   maxage varchar(250),
				   maxpeople varchar(250),
				   name varchar(250),
				   people_in_household varchar(250),
				   pets varchar(250),
				   petspref varchar(250),
				   rate varchar(250),
				   schedule varchar(250),
				   smokepref varchar(250),
				   smoker varchar(250),
				   type varchar(250),
				   created timestamp default now()
				   )
				   
				   
				   
				   select * from photos where id = '6b61d367-dd29-48fe-b846-56b4b1891ff2'
				   
				   SELECT * FROM rooms
				   