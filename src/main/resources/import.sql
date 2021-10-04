-- Load some test data
drop sequence if exists hibernate_sequence;
create sequence hibernate_sequence start 30 increment 1;

insert into SLOT (id, slot, startTime, endTime, peak) values (1, 1, '05:00', '05:45', true);
insert into SLOT (id, slot, startTime, endTime, peak) values (2, 2, '05:45', '06:30', true);
insert into SLOT (id, slot, startTime, endTime, peak) values (3, 3, '06:30', '07:15', true);
insert into SLOT (id, slot, startTime, endTime, peak) values (4, 4, '07:15', '08:00', true);
insert into SLOT (id, slot, startTime, endTime, peak) values (5, 5, '08:00', '08:45', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (6, 6, '08:45', '09:30', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (7, 7, '09:30', '10:15', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (8, 8, '10:15', '11:00', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (9, 9, '11:00', '11:45', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (10, 10, '11:45', '12:30', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (11, 11, '12:30', '13:15', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (12, 12, '13:15', '14:00', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (13, 13, '14:00', '14:45', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (14, 14, '14:45', '15:30', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (15, 15, '15:30', '16:15', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (16, 16, '16:15', '17:00', true);
insert into SLOT (id, slot, startTime, endTime, peak) values (17, 17, '17:00', '17:45', true);
insert into SLOT (id, slot, startTime, endTime, peak) values (18, 18, '17:45', '18:30', true);
insert into SLOT (id, slot, startTime, endTime, peak) values (19, 19, '18:30', '19:15', true);
insert into SLOT (id, slot, startTime, endTime, peak) values (20, 20, '19:15', '20:00', true);
insert into SLOT (id, slot, startTime, endTime, peak) values (21, 21, '20:00', '20:45', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (22, 22, '20:45', '21:30', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (23, 23, '21:30', '22:15', false);
insert into SLOT (id, slot, startTime, endTime, peak) values (24, 24, '22:15', '23:00', false);


insert into BOOKING (id, court, forDate, madeBy, madeOn, slot) values (25, 1, '2021-10-04', 'phillip.kruger', '2021-10-04', 1);
insert into BOOKING (id, court, forDate, madeBy, madeOn, slot) values (26, 1, '2021-10-04', 'leon.duvenage', '2021-10-04', 16);
insert into BOOKING (id, court, forDate, madeBy, madeOn, slot) values (27, 2, '2021-10-04', 'jeanine.vaneyssen', '2021-10-04', 16);
insert into BOOKING (id, court, forDate, madeBy, madeOn, slot) values (28, 1, '2021-10-04', 'corne.duvenage', '2021-10-04', 17);
insert into BOOKING (id, court, forDate, madeBy, madeOn, slot) values (29, 2, '2021-10-04', 'koch.dejager', '2021-10-04', 17);

