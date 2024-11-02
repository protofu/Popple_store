-- 2024.11.01 COMPANY 테이블 UPDATE
INSERT INTO company (id,address,buisiness_number,created_at,deleted_at,leader,name,sector,tel,updated_at) VALUES(1,'서울특별시 강남구 삼성동','123-45-67890','2022-05-06 21:56:24',NULL,'이재용','삼성전자','정보기술','02-123-4567','2022-05-06 21:56:24'),(2,'캘리포니아주 쿠퍼티노','987-65-43210','2022-05-06 21:56:24',NULL,'Steve Jobs','Apple_Computer_Inc','소프트웨어','408-996-1010','2022-05-06 21:56:24'),(3,'캘리포니아주 팰로알토','555-55-55555','2022-05-06 21:56:24',NULL,'Elon Musk','Tesla','자동차','650-681-5000','2022-05-06 21:56:24'),(4,'서울특별시 마포구 서교동','111-11-11111','2022-05-06 21:56:24',NULL,'지성욱','그라운드시소','교육','02-111-2222','2022-05-06 21:56:24'),(5,'서울특별시 종로구','222-22-22222','2022-05-06 21:56:24',NULL,'정병국','한국문화예술위원회','문화예술','02-333-4444','2022-05-06 21:56:24');
-- 2024.11.02 USER 테이블 UPDATE(성제현 제거, test계정 업데이트(user))
INSERT INTO `user` (id,birth,comp_id,created_at,deleted_at,email,gender,name,nickname,password,refresh_token,`role`,updated_at) VALUES(1,'1977-12-30',1,'2022-05-06 21:56:24',NULL,'nowdragon@samsung.com',1,'이재용','삼성전자','$2a$10$RsEnRU6QobVsjS.VNuMdOeB0L/9tqf9jruNTMzjlsmDwKKPxklEya','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWFtLXBvcHBsZSIsImlhdCI6MTczMDQyNzM4MSwiZXhwIjoxNzMwNTEzNzgxLCJzdWIiOiJub3dkcmFnb25Ac2Ftc3VuZy5jb20iLCJpZCI6MSwibmlja25hbWUiOiLsgrzshLHsoITsnpAiLCJuYW1lIjoi7J207J6s7JqpIiwicm9sZSI6IlJPTEVfQ09NUEFOWSJ9.l7MnHfAYKDnfg5UiBcqsPPD1bJGmoiGjNlPdCKCW0RA','ROLE_COMPANY','2024-11-01 11:16:21.979511'),(2,'1990-01-15',2,'2022-05-07 21:56:24',NULL,'SteveJobs@apple.com',1,'SteveJobs','Apple_Computer_Inc','$2a$10$TCOacYxGsy6XtalvMlcQQOk2aIJG3HYNp6BEcBgnORi6pr8XTJ1km','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWFtLXBvcHBsZSIsImlhdCI6MTczMDE5ODkxMiwiZXhwIjoxNzMwMjg1MzEyLCJzdWIiOiJTdGV2ZUpvYnNAYXBwbGUuY29tIiwiaWQiOjIsIm5pY2tuYW1lIjoiQXBwbGVfQ29tcHV0ZXJfSW5jIiwibmFtZSI6IlN0ZXZlSm9icyIsInJvbGUiOiJST0xFX0NPTVBBTlkifQ.JODbCqy8iOEe5bMY0rfpMaQn7t_xS-h0FYWutmirOc0','ROLE_COMPANY','2024-10-29 19:48:32.784233'),(3,'1985-11-20',3,'2022-05-08 21:56:24',NULL,'musk00@tesla.com',1,'Elon_Reeve_Musk','Tesla','$2a$10$0bVy9bOzjTLGXrgNqyRoUueXmLAwQgnuQaD51s17gQCMjCsV/X.tm','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWFtLXBvcHBsZSIsImlhdCI6MTczMDE5OTU3MywiZXhwIjoxNzMwMjg1OTczLCJzdWIiOiJtdXNrMDBAdGVzbGEuY29tIiwiaWQiOjMsIm5pY2tuYW1lIjoiVGVzbGEiLCJuYW1lIjoiRWxvbl9SZWV2ZV9NdXNrIiwicm9sZSI6IlJPTEVfQ09NUEFOWSJ9.7QiXM5iIwvQ4CqlRThCppKV-xJVj4YktNhk8LP_yaNs','ROLE_COMPANY','2024-10-29 19:59:33.075550'),(4,'1977-12-30',4,'2022-05-09 21:56:24',NULL,'ground12@seesaw.com',1,'지성욱','그라운드시소','$2a$10$.0olH0sPE70rhsb5VkULse60rgjgVxE/igLlrJV8xKbPXXld2Egm6',NULL,'ROLE_COMPANY','2022-05-09 21:56:24'),(5,'1958-12-30',5,'2022-05-09 21:56:24',NULL,'korea@korea.com',1,'정병국','한국문화예술위원회','$2a$10$WDFhOpejxTPsDf6OK/dpru7ytIy901CzPbfYVBaRELAMKBMZaiUUW','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWFtLXBvcHBsZSIsImlhdCI6MTczMDQzNzEwOCwiZXhwIjoxNzMwNTIzNTA4LCJzdWIiOiJrb3JlYUBrb3JlYS5jb20iLCJpZCI6NSwibmlja25hbWUiOiLtlZzqta3rrLjtmZTsmIjsiKDsnITsm5DtmowiLCJuYW1lIjoi7KCV67OR6rWtIiwicm9sZSI6IlJPTEVfQ09NUEFOWSJ9.4WKcqaoH80HzfD3H3_mr41g90NS_Y0l_l_xmh5_O3Yo','ROLE_COMPANY','2024-11-01 13:58:28.694724'),(6,'1993-12-30',NULL,'2022-05-06 21:56:24',NULL,'cunjaju@dreamwiz.com',0,'장정호','흥미로운상어','$2b$10$2ncQrMz8O.YPB5gXkLttuejW3RP0HSlKm/wc17oS3.xruEFIdfGSq',NULL,'ROLE_USER','2022-05-06 21:56:24'),(7,'1986-02-10',NULL,'2021-06-06 12:24:42',NULL,'jaehoi@hanmail.net',1,'한주원','현명한상어','$2b$10$ND0yAjYajB1e4C3IYM71.erXv1KmTUxDQ2PzGJ2XaBQnA29Y1zxne',NULL,'ROLE_USER','2021-06-06 12:24:42'),(8,'1984-12-25',NULL,'2023-03-14 16:36:14',NULL,'minjunbag@naver.com',1,'김정남','도회적인벌','$2b$10$OwQwQ3vJqFgMqPoSIKhAYOKKd.Gn/a2R5rj1OL.4FNCBOlPlbE3cO',NULL,'ROLE_USER','2023-03-14 16:36:14'),(9,'1986-10-20',NULL,'2021-02-07 16:03:05',NULL,'sumin67@dreamwiz.com',1,'배지아','이해심 있는곰','$2b$10$FmjDeCkX3.naMViVs1vLMOlE1cEhYJn1032KmH/Xnu3eMyGTP/LsK',NULL,'ROLE_USER','2021-02-07 16:03:05'),(10,'1987-11-23',NULL,'2022-08-03 04:32:48',NULL,'coejeongsug@daum.net',1,'박명숙','신중한고양이','$2b$10$3GM67HxwfipcLtSPp/WWneyZiVJXkL2Db9kk/ODZ0OIRP18X8j2J.',NULL,'ROLE_USER','2022-08-03 04:32:48'),(11,'2005-12-11',NULL,'2020-09-05 18:39:18',NULL,'dbag@daum.net',0,'김정순','고요한오리','$2b$10$iTqp5tceBDWCJVADSI1qgeBShd.UaQ1RA3MWze7T68rsOXUBsG3Uu',NULL,'ROLE_USER','2020-09-05 18:39:18'),(12,'1998-12-16',NULL,'2021-07-05 21:16:32',NULL,'imyeongsug@hotmail.com',0,'이영길','상쾌한말미잘','$2b$10$zkwdbtHk6nalhAmjjHlRMeBSpXnI6p8.TktZ0wmxZrwRyJaKZs/lW',NULL,'ROLE_USER','2021-07-05 21:16:32'),(13,'1994-01-14',NULL,'2023-04-10 12:12:14',NULL,'ugim@nate.com',1,'이순옥','매끄러운소','$2b$10$thshW2eNrAkqBtxoyr2TFOjOLsSdqc1os6lubUNSsqnn8v6ytzocK',NULL,'ROLE_USER','2023-04-10 12:12:14'),(14,'1989-04-13',NULL,'2023-03-22 13:11:45',NULL,'jihuni@hotmail.com',0,'한채원','뚜렷한고양이','$2b$10$5o3FpoOvH7y3kLBCcvQZrOfO8r1PrZDJCKFMSNlQJRWe2rZjcO3My',NULL,'ROLE_USER','2023-03-22 13:11:45'),(15,'1993-08-24',NULL,'2022-09-05 09:08:00',NULL,'dohyeongim@gmail.com',1,'최서준','상냥한개구리','$2b$10$cKlhDR4Kl1BQR.ufjMnVy.meiVAsVgpZns3fie88fportvuF7gH5q',NULL,'ROLE_USER','2022-09-05 09:08:00'),(16,'1983-12-01',NULL,'2021-06-19 19:51:25',NULL,'tcoe@dreamwiz.com',0,'이은주','신중한벌','$2b$10$FSrZoQwvaDdtcKmssx5Noe19zoBjxzhrgW/OM84P0w7t8HUa6T0QC',NULL,'ROLE_USER','2021-06-19 19:51:25'),(17,'1994-02-09',NULL,'2024-05-18 03:32:07',NULL,'cunjabag@hotmail.com',0,'김정식','아름다운악어','$2b$10$jmlr0.6qo4qTQyxIcZOwY.kSvjTTK7CTicN2ir.RVy6.wuq5yd/I2',NULL,'ROLE_USER','2024-05-18 03:32:07'),(18,'1985-10-09',NULL,'2020-01-01 14:34:57',NULL,'jinhoi@gmail.com',1,'이병철','매력적인개구리','$2b$10$acF48PKLCGE5aOHODqIsn.RKIsOxNzqBMLv3FkBxEw7kNKleokVVu',NULL,'ROLE_USER','2020-01-01 14:34:57'),(19,'1993-02-12',NULL,'2023-10-06 15:01:50',NULL,'doyunbag@nate.com',1,'이경희','겸손한말','$2b$10$xlvEvdUvmVvbEGFjI44ywuMgKBu6od9sfcbzxjci3U7OIJo0GxL3q',NULL,'ROLE_USER','2023-10-06 15:01:50'),(20,'1994-05-02',NULL,'2020-12-01 00:04:56',NULL,'jogyeongja@hotmail.com',0,'박민지','지적인다람쥐','$2b$10$XjA4z9RgUQd01UP4bwnUf.sJEFahEIsHedIFw4XbX9v1WqRddpnn2',NULL,'ROLE_USER','2020-12-01 00:04:56'),(21,'1995-10-19',NULL,'2023-03-31 00:02:49',NULL,'yejunbag@hotmail.com',0,'김옥자','아찔한매','$2b$10$rqfdXeOkC3R.qbLX.imonek8078.7knWLdjIqBpwVx6KAvn9Z/ziG',NULL,'ROLE_USER','2023-03-31 00:02:49'),(22,'1989-02-07',NULL,'2024-07-03 16:24:41',NULL,'gno@hotmail.com',1,'박영호','신비한여우','$2b$10$0Op5/8EYyyLlOvTp.dVc8ejKKDTtXTRh4vfZ/L.iqELMaw.tOB7Py',NULL,'ROLE_USER','2024-07-03 16:24:41'),(23,'1993-04-11',NULL,'2023-10-16 01:18:52',NULL,'wsim@hanmail.net',1,'송진우','안정적인염소','$2b$10$GkPLoUnYGPG26fwVHIIUdufBspevK7SSPMuCbLf5poCYtUyFojX9S',NULL,'ROLE_USER','2023-10-16 01:18:52'),(24,'1999-10-10',NULL,'2024-06-14 21:52:55',NULL,'gimhyeonju@naver.com',1,'장민준','한가로운기린','$2b$10$DV2zfT94zvtb2U9g6DSXxe5q9KIl9Jrh6yIErgV8BEZDvtsPBUDe6',NULL,'ROLE_USER','2024-06-14 21:52:55'),(25,'2004-02-20',NULL,'2020-12-03 05:06:57',NULL,'hyeonjuni@nate.com',0,'이지후','한가로운사자','$2b$10$NnYBSyr84jGXmrSWqndXU.nFVgrWttm3vjqu62f2hf7Q5o6uK/K1C',NULL,'ROLE_USER','2020-12-03 05:06:57'),(26,'1989-10-31',NULL,'2023-05-05 10:00:47',NULL,'xhong@live.com',0,'이영수','기억에 남는전갈','$2b$10$Odgpo8oNVrPZlXYuaSAONuikRmE/MZ92YHyOBZOSWq6Yrqhmudxui',NULL,'ROLE_USER','2023-05-05 10:00:47'),(27,'1999-10-20',NULL,'2020-07-27 23:22:27',NULL,'yujini@hotmail.com',1,'안지우','역동적인오리','$2b$10$1YhBqjUX4W2zsqb5IAetp.5/yk8t5J1QsDzOa4/BQwL0PKQfCTopO',NULL,'ROLE_USER','2020-07-27 23:22:27'),(28,'1991-06-29',NULL,'2020-11-21 02:13:28',NULL,'jgim@hotmail.com',1,'진지연','고귀한곰','$2b$10$CjYOTXBnS00poWgOmQqqrujNjaAp.pa6hrdqP9rzzx/N.JVdIGEE2',NULL,'ROLE_USER','2020-11-21 02:13:28'),(29,'1986-05-29',NULL,'2024-04-20 09:49:11',NULL,'jgim@hanmail.net',1,'이현준','도회적인개구리','$2b$10$B/C8D1mob7Vnk2WBp98FKOUKa23jftrHnhSOm0DsESovHzLeQR7xa',NULL,'ROLE_USER','2024-04-20 09:49:11'),(30,'2003-01-10',NULL,'2023-09-06 11:33:04',NULL,'iyeongceol@daum.net',1,'김준호','지적인말','$2b$10$kde8vqt0Fi3H7MlrHvTisuPFAHbRkvtZW93OqFSxmSYuTET0kWIDK',NULL,'ROLE_USER','2023-09-06 11:33:04'),(31,'1990-09-05',NULL,'2024-09-15 23:45:23',NULL,'bagjinho@live.com',0,'류승현','신나는하이에나','$2b$10$vnqzgASuUwMF34FZLkNiteNPnWT93uorm/8TizKFdto8Uf4J0BvkK',NULL,'ROLE_USER','2024-09-15 23:45:23'),(32,'1988-02-03',NULL,'2023-12-29 15:03:10',NULL,'nbag@hotmail.com',1,'권미정','정직한거위','$2b$10$ARjvTqIpZnTdNSVUSLauk.ozZbQUJ9H249wU.gJj/Zvb2rmdMeVXK',NULL,'ROLE_USER','2023-12-29 15:03:10'),(33,'1999-08-03',NULL,'2020-02-01 18:15:26',NULL,'gweonseonghun@daum.net',0,'서진우','도전적인무당벌레','$2b$10$ujkOR9X/7Gb8NNWBQztTEuxjCkQ1nMaNUZrGxRrcRhJCm3Norjuqm',NULL,'ROLE_USER','2020-02-01 18:15:26'),(34,'1989-04-16',NULL,'2023-05-09 03:52:01',NULL,'zbag@nate.com',0,'윤채원','우아한문어','$2b$10$LiFAYZYkvcrh15rhtqIJt.C9L1l8w8nDx8gn9355DvhO546vDDKXK',NULL,'ROLE_USER','2023-05-09 03:52:01'),(35,'1996-07-02',NULL,'2024-10-15 14:27:51',NULL,'ogyeonghyi@hanmail.net',0,'박정호','귀여운말','$2b$10$h4EqOSF9HH.f2XXR8eiU.u14/GL.AFrSneRpQzZvKiScTnQiZhWme',NULL,'ROLE_USER','2024-10-15 14:27:51'),(36,'1997-04-30',NULL,'2021-12-11 22:40:09',NULL,'pbag@nate.com',0,'이지아','화려한닭','$2b$10$KV7TTAHo7nlWjrt53yKgde.XdkCPG0dtGkm.sMS8.bdB4auQaWzVq',NULL,'ROLE_USER','2021-12-11 22:40:09'),(37,'1996-10-11',NULL,'2022-11-19 03:20:57',NULL,'shong@nate.com',0,'이현준','빛나는기린','$2b$10$qE4a6X.yGqQwN0wsmXidHOtURlbaiOrMH0lND7EwD4.wfN9yC5vDO',NULL,'ROLE_USER','2022-11-19 03:20:57'),(38,'1996-05-14',NULL,'2023-07-09 07:48:08',NULL,'sangceoljang@hanmail.net',1,'최영철','미소 짓는호랑이','$2b$10$FVhigkEnd75cE9wPaJZmMebhdMiyW7xf7m.Lp31CYnPpiHNWKU2ia',NULL,'ROLE_USER','2023-07-09 07:48:08'),(39,'1987-03-16',NULL,'2021-09-10 02:50:57',NULL,'wgim@gmail.com',0,'이정자','미소 짓는부엉이','$2b$10$ZgC1c5fWMJ5LfcItd/c/4eO.ix5nklkVypmlRsRtwxki3MRur38vW',NULL,'ROLE_USER','2021-09-10 02:50:57'),(40,'1984-10-18',NULL,'2024-04-03 18:31:22',NULL,'sjang@naver.com',0,'김준혁','깨끗한고양이','$2b$10$LsUaLiP1I5YD7yZ8154rbOud8/8LlgWswATEN8g7yyISVlcFVpyZ6',NULL,'ROLE_USER','2024-04-03 18:31:22'),(41,'1989-11-11',NULL,'2023-05-22 01:26:13',NULL,'misug26@naver.com',0,'김영환','매력적인고양이','$2b$10$Nbz1t2vCJ9ypdXORIGdU9OlBtY5VH0goe8h8kIgsb7ki0c1H.q7fq',NULL,'ROLE_USER','2023-05-22 01:26:13'),(42,'1994-11-15',NULL,'2022-08-29 04:58:09',NULL,'ogja33@hotmail.com',0,'김성민','우울한늑대','$2b$10$/wZRmdDVJmOtSVeRU.99WeHmizYXQ5es2HgeUDJjKaAfFZ8UqAfR2',NULL,'ROLE_USER','2022-08-29 04:58:09'),(43,'1992-03-25',NULL,'2020-01-18 09:35:01',NULL,'ogeonu@hotmail.com',0,'김정식','깨끗한곰','$2b$10$IJDGhGl1RkYNZUFPcuC7E./aoqDqOIbhLTsTft7eLuTog0IzCg0tW',NULL,'ROLE_USER','2020-01-18 09:35:01'),(44,'1989-03-21',NULL,'2023-11-15 01:42:02',NULL,'namjaeho@live.com',1,'엄정남','귀여운모기','$2b$10$0J6GfrSrtG3M1d3p5YSvKuK6PkTVaeuFGNI6AVS1.0Kf5KTA6mLqW',NULL,'ROLE_USER','2023-11-15 01:42:02'),(45,'1992-10-09',NULL,'2020-11-24 22:33:33',NULL,'sangho47@hanmail.net',1,'우민재','영리한호랑이','$2b$10$dX92n4LFiEK5w.TJAV8bPetyYhUTwjGzODMl1LcRC6hLqjWCS2C9y',NULL,'ROLE_USER','2020-11-24 22:33:33'),(46,'2003-01-18',NULL,'2020-04-30 20:38:10',NULL,'oi@naver.com',1,'이정순','고귀한쥐','$2b$10$wlVRTqewWhtA9/gMTU/Oj.dri3d4k2xBZ6p9IG8n0DPhDbR4LXU8y',NULL,'ROLE_USER','2020-04-30 20:38:10'),(47,'2006-06-05',NULL,'2024-04-10 23:31:47',NULL,'byeongceol57@daum.net',0,'정준호','도회적인악어','$2b$10$pDr8kVWUmELQt9M80I3aP.ieUhz.CBJ4Ax3DN6UAfaYSFotAX3I0W',NULL,'ROLE_USER','2024-04-10 23:31:47'),(48,'1998-07-16',NULL,'2024-03-04 11:58:13',NULL,'umijeong@naver.com',1,'조아름','고귀한독수리','$2b$10$WdBmAuD72RDrakYOVZMe3.81.40z7tvJNAC2IpbHNwU0/Ggyq8WkG',NULL,'ROLE_USER','2024-03-04 11:58:13'),(49,'1998-07-16',NULL,'2022-12-14 17:52:34',NULL,'ijuweon@nate.com',1,'이하윤','열정적인염소','$2b$10$0BpC89k2bgGMFWaWojN8u.qzPAXy.u/D3DmbV2rSL9.i4exbjA1o2',NULL,'ROLE_USER','2022-12-14 17:52:34'),(50,'1987-09-11',NULL,'2021-04-22 00:54:56',NULL,'ino@gmail.com',1,'김경숙','애절한하이에나','$2b$10$PoithibCHMwDo8mwCHqgZ.RIPqqDtx1xE6/Hd7wXDpX/0mQO0tJ2y',NULL,'ROLE_USER','2021-04-22 00:54:56'),(51,'2004-09-22',NULL,'2024-04-01 11:12:19',NULL,'nbag@naver.com',1,'이예은','지적인물소','$2b$10$LgYv5Qp9d5XSXcRAzaOiSO.UMn872JAK887OelWn4w/smmwIHR.W6',NULL,'ROLE_USER','2024-04-01 11:12:19'),(52,'2006-04-27',NULL,'2020-03-30 19:20:57',NULL,'sanghun14@gmail.com',1,'서서현','자신감 있는말미잘','$2b$10$kQ6SA6CngfWg322WBa4SF.FylnZSloqqHR7OUopN.hbdW8h9XNudC',NULL,'ROLE_USER','2020-03-30 19:20:57'),(53,'1996-12-12',NULL,'2022-05-19 21:01:27',NULL,'gimjaehyeon@nate.com',1,'고정호','불안한쥐','$2b$10$aQ1xyANGzKex.5pevgv4wu0JSTJE6Ymxrc1W9Qqpc.0J0nLx0JCf6',NULL,'ROLE_USER','2022-05-19 21:01:27'),(54,'1999-12-11',NULL,'2024-07-26 21:24:04',NULL,'sunog76@hanmail.net',1,'최종수','묘한코뿔소','$2b$10$l./.PDNa5pPW6qed7uUQWeRheVYPVwdki80ivnlpvFq46HoQDd.wy',NULL,'ROLE_USER','2024-07-26 21:24:04'),(55,'2006-08-31',NULL,'2021-04-20 00:00:08',NULL,'gimhyeonjun@naver.com',1,'이유진','부드러운사자','$2b$10$w1643aMRopQuDrBKNDJfKuVokVSZ/QkoFPLeLawkDFt74PTU3nPwO',NULL,'ROLE_USER','2021-04-20 00:00:08'),(56,'1991-09-06',NULL,'2020-08-08 11:48:04',NULL,'juweongim@daum.net',0,'김재호','밝은개','$2b$10$32UAWQ3CnrDwXLgj1xHb2uheu4Dcy8c5pbeHeT51sI.9nGm73/lcK',NULL,'ROLE_USER','2020-08-08 11:48:04'),(57,'2006-04-22',NULL,'2024-05-18 23:34:14',NULL,'hi@gmail.com',0,'강경숙','애절한바다거북','$2b$10$toncMZdBQvpIdSX1Op297e9YRqk2XVaJmIWkcLFkj7CuVVOb6DIna',NULL,'ROLE_USER','2024-05-18 23:34:14'),(58,'1984-04-13',NULL,'2022-06-14 14:09:47',NULL,'gimgyeongja@hotmail.com',0,'박현우','활발한전갈','$2b$10$shXu5ia27anza1BkxL93/OKbprOUOgDSrFcBpEA5hVCSNkaMcgrUu',NULL,'ROLE_USER','2022-06-14 14:09:47'),(59,'1987-07-18',NULL,'2023-04-18 11:12:25',NULL,'cno@hotmail.com',0,'한우진','세련된소','$2b$10$hVv.CrwBH1Vp/sZabSNQY.3Gh/ob2wbAwrp6B3PSN.p05BprDRmva',NULL,'ROLE_USER','2023-04-18 11:12:25'),(60,'1997-11-28',NULL,'2023-05-06 05:51:04',NULL,'gimyeweon@naver.com',0,'김영환','서정적인소','$2b$10$D/NYuL1I8/Y7Vv8VLxMMPuouzxt2QXt95uWodfMaFll.eVAqO.cWi',NULL,'ROLE_USER','2023-05-06 05:51:04'),(61,'2005-07-03',NULL,'2020-11-02 16:26:39',NULL,'jihui@hanmail.net',1,'신정순','역동적인부엉이','$2b$10$AlKtGLs0JGC7ndLorPfyweOcB74gxgjKucHpl8KpJwirSWOwtgOb6',NULL,'ROLE_USER','2020-11-02 16:26:39'),(62,'1995-09-21',NULL,'2023-09-19 18:47:06',NULL,'byeongceoli@hanmail.net',1,'최순옥','빛나는고양이','$2b$10$jF1Tg/cShAH1d3PJO4zEA.aDddtaQ3u/YuKKHpFcqwkrAD.jKjS6a',NULL,'ROLE_USER','2023-09-19 18:47:06'),(63,'1999-05-08',NULL,'2023-12-27 13:11:59',NULL,'seoseongsu@hotmail.com',1,'문진호','강한닭','$2b$10$u86y9TiXVY3anaHeZUR.TuEBGds1nwBom3NKq1u6gCJjjr7k89uLG',NULL,'ROLE_USER','2023-12-27 13:11:59'),(64,'1986-09-04',NULL,'2024-08-25 11:59:22',NULL,'ijaeho@dreamwiz.com',1,'고숙자','섬세한염소','$2b$10$qlVAnU9fJtKaMPIzVz5qoOik3tHAGdH3VqDBtlSB0h76gjQn4yHei',NULL,'ROLE_USER','2024-08-25 11:59:22'),(65,'2002-10-21',NULL,'2021-06-27 11:01:52',NULL,'bagjunseo@naver.com',0,'서수빈','세심한말','$2b$10$.temtENuwcoYr1EMDMcG7e1PIXLe9UYf4u3OssKToT5AE/9RlKzNO',NULL,'ROLE_USER','2021-06-27 11:01:52'),(66,'2006-06-01',NULL,'2022-10-06 02:46:55',NULL,'yunseo36@hotmail.com',1,'이준호','신중한코뿔소','$2b$10$myR5VqCmSNGy2rmOqNKBoO9DkUCg.VTBUWyEdzil5f2fv5.hgtqam',NULL,'ROLE_USER','2022-10-06 02:46:55'),(67,'2005-09-18',NULL,'2022-02-28 04:56:19',NULL,'hyejin13@daum.net',0,'배준호','화려한다람쥐','$2b$10$gxGhPqE3ZH/j90ApEz32qObk0C8zPeeXVeUl8CiyVHpVMx02zvTo2',NULL,'ROLE_USER','2022-02-28 04:56:19'),(68,'1988-08-16',NULL,'2024-02-11 17:57:24',NULL,'iyunseo@dreamwiz.com',0,'전중수','열정적인원숭이','$2b$10$SrzCvh3m/yxh9qKYGuF3COJoZQnAfzy2.4V3A8QYQCEXfuqgGndNK',NULL,'ROLE_USER','2024-02-11 17:57:24'),(69,'1985-06-13',NULL,'2023-08-21 22:19:20',NULL,'migyeong83@gmail.com',1,'장은경','차가운오리','$2b$10$jJKc98Sbrxve2VC1MqXikue7fT1/stxDK.cLNn7e21dgzY.Os4NyG',NULL,'ROLE_USER','2023-08-21 22:19:20'),(70,'1995-04-03',NULL,'2024-01-30 05:28:35',NULL,'gwangsu28@hotmail.com',1,'이미정','편안한하마','$2b$10$7e5yC5a4d7FcTletTqen5u/GtBULk5e/aei6KCxUYNbYydkMBTYHS',NULL,'ROLE_USER','2024-01-30 05:28:35'),(71,'1994-08-01',NULL,'2021-11-19 06:40:36',NULL,'yeonggilbag@live.com',0,'최영환','세련된오리','$2b$10$hf9/L25ivSTbkgjYh9OtfugcdL.o.w2.zVTJzkDjt/Kizash0v80G',NULL,'ROLE_USER','2021-11-19 06:40:36'),(72,'2000-07-08',NULL,'2022-02-14 10:51:50',NULL,'hyeonjugang@gmail.com',1,'오우진','어둡고무당벌레','$2b$10$Zn2.2CTMd1TVybn1QO1kDuj6FaJ5Ms7PQWQKeWL6QuLjsKZJje.lS',NULL,'ROLE_USER','2022-02-14 10:51:50'),(73,'2002-10-28',NULL,'2021-07-04 21:57:30',NULL,'gweonsangho@live.com',0,'심민준','부드러운파리','$2b$10$pHvyMG7ZWq308bhkWFmk6eXr.e981DGIILmeXBOH0BdDrOWiE.bMa',NULL,'ROLE_USER','2021-07-04 21:57:30'),(74,'1994-04-26',NULL,'2024-02-28 01:39:31',NULL,'minseogbag@hanmail.net',0,'장미영','상냥한개','$2b$10$rfc2dGQjuwQCNUnU8UVr4ueVIA/iXbvGmUh2Qdtmq./qn18LKlHbW',NULL,'ROLE_USER','2024-02-28 01:39:31'),(75,'1993-04-07',NULL,'2024-08-19 03:00:32',NULL,'ijuweon@gmail.com',1,'배지민','지속적인개','$2b$10$KvaYbZVHNQgXuz/ZlQG8Putw0mV946cJYH0XlzolKUcoRmRQPjhKC',NULL,'ROLE_USER','2024-08-19 03:00:32'),(76,'1988-05-28',NULL,'2022-06-08 20:18:58',NULL,'igim@hanmail.net',0,'류민지','결단력 있는사자','$2b$10$5HI8sW4.J.2uYMzgivTa9uupclDlY6mon3Y.uBB2B8mx1KPuum8tO',NULL,'ROLE_USER','2022-06-08 20:18:58'),(77,'1990-09-04',NULL,'2023-12-16 04:51:46',NULL,'jeonghocoe@live.com',1,'김지혜','부유한닭','$2b$10$r.ZKgXM/LfCGt/wL1p0gB.r0PLkjd3udRzODF23yWPX18vpHPi2zO',NULL,'ROLE_USER','2023-12-16 04:51:46'),(78,'1995-11-01',NULL,'2021-03-06 21:27:00',NULL,'jangyeji@daum.net',0,'송지민','깨끗한거북이','$2b$10$zP0hOdGhi9nrgvcNB4lN6eHb9pTEdfxGZ9sUYyAiAOU4MqeXE7j9m',NULL,'ROLE_USER','2021-03-06 21:27:00'),(79,'1986-12-29',NULL,'2020-07-25 04:03:44',NULL,'hyejinsong@gmail.com',1,'조정식','강렬한개구리','$2b$10$mPOvM6nSBiNXYYau/r8igOgZz79iYgfuHTeT74E8e1SGu5HXgEI/2',NULL,'ROLE_USER','2020-07-25 04:03:44'),(80,'1989-05-09',NULL,'2020-11-09 02:38:46',NULL,'yeongsu24@live.com',1,'정민지','어둡고거위','$2b$10$CRIzN9quuKFAsRcHjXsKI.KTNIQrSgWf/Jd.jEyIv868.lCQIm1c.',NULL,'ROLE_USER','2020-11-09 02:38:46'),(81,'1993-04-30',NULL,'2024-09-20 10:05:25',NULL,'seonghyeon81@gmail.com',0,'김지우','활기찬문어','$2b$10$.Y.C36N7TPsRS78ur6eGeOxz.nwNruuT49uVg/oOwWrP0BmRfdFQ6',NULL,'ROLE_USER','2024-09-20 10:05:25'),(82,'1989-03-25',NULL,'2022-03-23 05:52:24',NULL,'myeongsug81@hanmail.net',1,'박상호','재미있는염소','$2b$10$azwvFMpXMi0aFcflQdmDNOyxIcLiW24ogshRGoYd.jvQosigjREQC',NULL,'ROLE_USER','2022-03-23 05:52:24'),(83,'2004-08-22',NULL,'2021-06-28 10:11:40',NULL,'ei@live.com',0,'김지연','열정적인여우','$2b$10$E/gJMeRIZw2z9S8IaLs/Ou9tB2235qMZFt/3nUSBX8WXhiIFeLf3.',NULL,'ROLE_USER','2021-06-28 10:11:40'),(84,'1990-09-18',NULL,'2021-10-14 01:26:24',NULL,'cunja59@nate.com',1,'김성수','귀여운무당벌레','$2b$10$zDxSVQY98D.IamEZYl24ZOGcoR6OHUWBX0YuXYSPbiLyH7H65YE.m',NULL,'ROLE_USER','2021-10-14 01:26:24'),(85,'1989-06-01',NULL,'2020-09-20 10:41:34',NULL,'ngweon@daum.net',1,'하지연','용의주도한개구리','$2b$10$NSnPsBNyitmjG7y6D2hAzunk1hpiFWPy8qKqvuGZLzohj8ArItRf2',NULL,'ROLE_USER','2020-09-20 10:41:34'),(86,'2005-02-28',NULL,'2021-12-02 06:04:35',NULL,'sunja51@gmail.com',1,'이중수','상쾌한다람쥐','$2b$10$rZ00c1.rdR8nHua9KU8rweOmG0XbHtPlimxMBcODA0118E1EdTDYq',NULL,'ROLE_USER','2021-12-02 06:04:35'),(87,'1992-08-05',NULL,'2024-07-02 10:50:40',NULL,'jeongjagim@live.com',1,'류주원','열정적인고래','$2b$10$6wjr0NLbz7dQa2GAH8R7jeVrDAtKXEJ9fH4mI4B9UxwRcWDxaIqA2',NULL,'ROLE_USER','2024-07-02 10:50:40'),(88,'1990-09-19',NULL,'2021-05-12 23:05:22',NULL,'byeongceolgim@gmail.com',0,'김수민','맑은수리','$2b$10$HPCIw0h8Fw2IOE3Xrd9FHe2k8LQ7Ogd7gG4OlXUie30//FiGNuEbO',NULL,'ROLE_USER','2021-05-12 23:05:22'),(89,'1997-10-03',NULL,'2021-07-15 13:02:09',NULL,'sanghomin@nate.com',1,'오영일','강한원숭이','$2b$10$qbrJfrB/6zBTMEL8nsPbnuG4gnx99aCUeBKaE9I7JrCkvEq4Cu2ji',NULL,'ROLE_USER','2021-07-15 13:02:09'),(90,'1987-10-14',NULL,'2023-01-29 11:16:13',NULL,'seongjin06@hotmail.com',0,'곽민서','우아한나비','$2b$10$Vfn8WEvCGS7n/EKuTCONAOB0TnjUZcFa30J1.e1MkLjlQsaoKizSS',NULL,'ROLE_USER','2023-01-29 11:16:13'),(91,'2001-06-01',NULL,'2024-04-11 11:51:11',NULL,'minsui@dreamwiz.com',1,'김영희','조용한전갈','$2b$10$sk2Do7xG36aUksZqdKrvDurYuNYDYZMbj70ac/5EFdraLrq9Tw2Y.',NULL,'ROLE_USER','2024-04-11 11:51:11'),(92,'1984-12-04',NULL,'2024-03-07 13:21:07',NULL,'seunghyeon23@nate.com',1,'이영호','이해심 있는사자','$2b$10$Z.LSfHFgyXZ/o7AwiQ3Ao.Qv6o.nx6B0bzvrjuaXShv.0UJAolmPa',NULL,'ROLE_USER','2024-03-07 13:21:07'),(93,'1993-09-05',NULL,'2020-01-13 13:38:40',NULL,'fgim@live.com',0,'김정수','한가로운거위','$2b$10$/6EmMlgiVPux6qCqp9dyceIZxSHNvk1t1WcJoKwvC3FNDgn3/wZ1y',NULL,'ROLE_USER','2020-01-13 13:38:40'),(94,'1999-02-17',NULL,'2024-08-31 05:15:34',NULL,'eungyeong66@hanmail.net',1,'안성수','비극적인거위','$2b$10$F.8mWBc2s4Yt6i6qdat7beznAKW9hBGGKX11E4TjXGTjZzkRwLETK',NULL,'ROLE_USER','2024-08-31 05:15:34'),(95,'1993-11-26',NULL,'2020-02-11 10:46:19',NULL,'hanjunhyeog@daum.net',1,'김영자','영리한타조','$2b$10$h.EEHtNnpdAQBajacHlmquJyasYUPLy1LFlYzAErNryjQnJa5pgii',NULL,'ROLE_USER','2020-02-11 10:46:19'),(96,'2002-03-31',NULL,'2022-05-31 00:39:46',NULL,'seoyeong93@hotmail.com',0,'김도윤','현명한개','$2b$10$.iANujyEQOABNiELCcr7oO.KNjDbB3yMvjTtP1bp2lHqTPiUOXV7K',NULL,'ROLE_USER','2022-05-31 00:39:46'),(97,'2004-07-22',NULL,'2023-02-08 17:55:19',NULL,'iseonghun@hotmail.com',0,'이은지','우아한거위','$2b$10$fCa6ZLmFO8UyWawhnqWuY..1ZrpAvzcEKuE/qb8Dyuqz2RNAJA5mK',NULL,'ROLE_USER','2023-02-08 17:55:19'),(98,'2005-04-16',NULL,'2022-11-10 15:01:45',NULL,'hi@live.com',1,'안지훈','겸손한독수리','$2b$10$L6HDLVV2AhG1Q8iKbi2y3.juE8bv9aoxPWdeu5sjc4Q9VCwf.FBuC',NULL,'ROLE_USER','2022-11-10 15:01:45'),(99,'1989-05-21',NULL,'2023-03-05 17:31:00',NULL,'baegjiyeon@live.com',1,'박재현','불안한코뿔소','$2b$10$NSPggMLS95RsIra.LSZ4Ze41fS.ppX0bR2.B2mChTzIj0/iEXDGe.',NULL,'ROLE_USER','2023-03-05 17:31:00'),(100,'1993-12-01',NULL,'2022-05-01 06:08:45',NULL,'miyeong14@dreamwiz.com',0,'최광수','불안한독수리','$2b$10$p.crc0CMCdkQQyPN241PAuj/Z4zlX6GTK4JK6w.9WPHdDAAGzWKfu',NULL,'ROLE_USER','2022-05-01 06:08:45'),(101,'2004-06-21',NULL,'2024-01-29 11:25:56',NULL,'seoyeon45@gmail.com',1,'윤민준','비극적인개구리','$2b$10$xNkyTxkvubjOP5tN2P6iM.pOeFfFBviVSlegrfmEnlkF1oCt7bz0O',NULL,'ROLE_USER','2024-01-29 11:25:56'),(102,'1998-05-05',NULL,'2021-03-24 13:42:59',NULL,'haeun49@dreamwiz.com',1,'김지원','독창적인개','$2b$10$qKSkjFvWmx35QcpHE3PQiuC4K5W.vUSh3yUhqb6XO4fdCTztOeEfO',NULL,'ROLE_USER','2021-03-24 13:42:59'),(103,'1994-08-29',NULL,'2024-09-29 12:17:56',NULL,'hyeonjun84@gmail.com',1,'김민석','주목받는펭귄','$2b$10$Cn7Nh2RWdWzDfg4P2hCF3eyNMXEHQUCW2C34z.9lPNrQIiQHEe8I.',NULL,'ROLE_USER','2024-09-29 12:17:56'),(104,'1998-10-06',NULL,'2023-02-17 11:15:11',NULL,'sangceol78@hotmail.com',1,'한예은','비극적인전갈','$2b$10$wpPSR4/Ny0RthKaJX3X.IujjZgeGPMi8TIx04EC42Hq.w76gs8Fwa',NULL,'ROLE_USER','2023-02-17 11:15:11'), (105,'1996-05-12',NULL,'2022-05-06 21:56:24',NULL,'test@test.com',1,'test','test','$2a$10$MQ/eG5pGp7kOxChb0yabNuPcmwiM7M6YB/ApGj4s/PtgoiMC/XZdC','eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJ0ZWFtLXBvcHBsZSIsImlhdCI6MTczMDQyNzM4MSwiZXhwIjoxNzMwNTEzNzgxLCJzdWIiOiJub3dkcmFnb25Ac2Ftc3VuZy5jb20iLCJpZCI6MSwibmlja25hbWUiOiLsgrzshLHsoITsnpAiLCJuYW1lIjoi7J207J6s7JqpIiwicm9sZSI6IlJPTEVfQ09NUEFOWSJ9.l7MnHfAYKDnfg5UiBcqsPPD1bJGmoiGjNlPdCKCW0RA','ROLE_USER','2024-11-01 11:16:21.979511');
-- 2024.11.01 EXHI_TYPE 테이블 UPDATE
INSERT INTO exhi_type (id,name) VALUES(1,'팝업'),(2,'전시');
-- 2024.11.01 EXHIBITION 테이블 UPDATE
INSERT INTO exhibition (id,address,camera,created_at,detail_description,end_at,exhibition_name,fee,food,`free`,friday,grade,homepage_link,instagram_link,is_deleted,kids,monday,notice,park,pet,saturday,start_at,sub_title,sunday,terms,thursday,tuesday,updated_at,wednesday,wifi,type_id,user_id,reserve,visit_count) VALUES
	 (1,'서울 성동구 연무장7길 3 ',0,'2024-10-29 17:52:37.104697','✨진짜 크림 잘하는 집 성수 OPEN!

**리얼베리어 팝업스토어 <REAL CREAM HOUSE>** 🏠

 

10월 25일부터 11월 4일까지 운영하는 크림 맛집을 사전 예약을 통해 현장 대기없이 편하게 이용해보세요 : )

 

장소 : 서울 성동구 연무장7길 7, 1층
운영 시간 : 12:00~20:00

 

방문 시에 다양한 이벤트를 통해 본품 마스크팩과 BEST 3종 기프트부터 100% 당첨 럭키드로우까지!','2024-11-04','리얼베리어 팝업스토어 <REAL CREAM HOUSE>','0',0,1,'12:00-20:00',0,'https://brand.naver.com/realbarrier','https://www.instagram.com/realbarrier.official',0,0,'12:00-20:00','',1,0,'12:00-20:00','2024-10-29','','12:00-20:00','','12:00-20:00','12:00-20:00','2024-11-01 13:58:35.842258','12:00-20:00',0,1,1,1,441),
	 (2,'서울 성동구 왕십리로 80-1 ',0,'2024-10-29 18:08:47.130994','**[KioskKiosk Presentation]**

KioskKiosk에서 블루아워 위빙 스튜디오의 프레젠테이션을 진행합니다. 이번 팝업은 2023년에 출간된 이상희 작가의 도서 <위빙앳홈>에 수록된 작업들과 그 연장선에 있는 새로운 작업들을 소개합니다. 자연스러운 재료와 손길이 주는 편안함이 특징인 블루아워의 작업은 일상 속에서 사용할 수 있는 오브제를 손으로 엮어 섬세한 패턴과 따뜻한 감각으로 만들어냅니다. 이번 팝업에서는 블루아워의 위빙 작업과 함께, 도서 <위빙앳홈>과 작가가 직접 조합한 3가지 색상의 실 세트가 포함된 위빙키트 또한 만나실 수 있습니다.','2024-11-03','블루아워 팝업스토어','0',0,1,'13:00-19:00',0,'https://bluehour.kr/','https://www.instagram.com/bluehour_seoul',0,0,'13:00-19:00',':: Weaving at Home by Blue Hour

2024.10.23.목 - 11.3.일 1-7pm (월요일 휴무)

KioskKiosk, 성동구 왕십리로 80-1 상가 2층',1,0,'13:00-19:00','2024-10-29','','13:00-19:00','','13:00-19:00','13:00-19:00','2024-10-31 11:11:37.334084','13:00-19:00',0,1,1,0,1),
	 (3,'서울 송파구 올림픽로 240 ',0,'2024-10-29 18:17:07.399444','**요거트월드, 롯데백화점에서 만나요!**

 

10/4(금)부터 롯데백화점 잠실점에서 요거트월드를 만나볼 수 있어요.

◾장소: 롯데백화점 잠실점 B1F

◾기간: 10.4(금) ~ 11.10(일)

 

요거트월드 인기메뉴 저당 요거트아이스크림 뿐만 아니라 팝업에서만 한정 판매되는 제주 말차 요거트아이스크림도 준비되어 있으니 요거트월드가 궁금하셨던 분들 우리 롯데백화점 잠실에서 새롭게 만나요.🍧','2024-11-10','요거트월드 팝업스토어','0',0,1,'11:30-20:30',0,'https://yogurtworld.co.kr/','https://www.instagram.com/yogurtworld_official',0,0,'11:30-20:00','💙EVENT💙

요거트월드 팝업스토어 소식을 소문내주세요!

1. @yogurtworld_official 팔로우, 이벤트 게시물 좋아요 필수

2. 함께 갈 친구 태그 + 팝업스토어 소문내기

(게시물을 스토리로 공유하면 당첨 확률 UP‼)

 

💙경품

요거트월드 모바일상품권 1만원권 증정(총 5인)

⠀

💙이벤트 기간

10/2(수)~10/8(화), ※10/10(목) 당첨자 발표',1,0,'11:30-20:30','2024-10-29','요거트월드, 롯데백화점에서 만나요!','11:30-20:30','','11:30-20:00','11:30-20:00','2024-11-01 12:15:44.918439','11:30-20:00',0,1,1,0,13),
	 (4,'서울 동대문구 왕산로 214 ',0,'2024-10-29 18:20:14.296858','**청량리역 커넥트플레이스 팝업스토어 오픈!**

 

태극당의 전통이 깃든 찹쌀떡, 월병 등

정성스러운 마음이 담긴 선물상자를 만나보세요!','2024-11-14','태극당 청량리역 커넥트플레이스 팝업스토어','0',0,1,'09:00-22:00',0,'http://www.taegeukdang.com/','https://www.instagram.com/taegeukdang',0,0,'09:00-22:00','🏛 청량리역 커넥트플레이스 3층

🕰 10.28(월) ~ 11.14(목)',1,0,'09:00-22:00','2024-10-29','청량리역 커넥트플레이스 팝업스토어 오픈!','09:00-22:00','','09:00-22:00','09:00-22:00','2024-10-29 18:20:14.296858','09:00-22:00',0,1,1,0,2),
	 (5,'서울 성동구 연무장길 37 ',0,'2024-10-29 18:34:55.399866','AOZ 팝업스토어 in 성수

더현대 완판 향수를 성수에서 직접 시향하고 선물까지 챙겨갈 수 있는 팝업스토어입니다!

 

✅AOZ 향수 시향

더현대가 반한 향기를 직접 느껴 보세요

 

✅꽝 없는 제비뽑기 이벤트

1등 30ml 향수 본품 증정

팝업 방문한 고객 전원에게 여행용 바디로션 2팩 증정

 

✅팝업 단독 할인

30ml - 57,600원(정가 63,000원)

75ml - 101,500원(정가 145,000원)','2024-11-20','AOZ 팝업스토어 in 성수','0',0,1,'11:00-20:00',0,'https://alienodorz.com/','https://www.instagram.com/alienodorz',0,0,'11:00-20:00','',1,0,'11:00-20:00','2024-10-29','AOZ 팝업스토어 in 성수','11:00-20:00','','11:00-20:00','11:00-20:00','2024-11-01 09:56:06.977882','11:00-20:00',0,1,1,0,48),
	 (6,'부산 부산진구 서면로 39 ',0,'2024-10-29 18:41:38.293603','𝗣𝗢𝗣-𝗨𝗣 𝗦𝗧𝗢𝗥𝗘 𝘄𝗶𝘁𝗵 아키리🧸

 

”나야, 가을“ 그런데 곰돌이를 이븐하게 곁들인..

아키리와 함께 특별한 가을 추억을 만들어보아요!

 

상상마당 부산 2층 디자인스퀘어에서 핸드메이드로 한땀한땀 만든 모루인형 친구들이 총 출동했어요!

가을 묻은 곰돌이부터 붕어빵을 쥔 수달과 카피바라까지!

가을 묻히러 어서와 어서와~','2024-11-17','아키리 팝업스토어 in 부산','0',0,1,'11:00-21:00',0,'https://smartstore.naver.com/makeakiri','https://www.instagram.com/lets.akiri',0,0,'11:00-21:00','🐾 방문 이벤트

방문고객 전원 포토카드 증정(랜덤 1인 1매 / 소진 시까지)

 

🐾 팔로우 이벤트

상상마당 부산(@sangsangmadang_busan)과 아키리(@lets.akiri) 인스타그램 팔로우 시, 가을 곰 스티커 3종 증정

👆🏻필수태그 #아키리 #AKIRI #아키리인형키링샵

 

🐾 구매이벤트

5만원 이상 구매 시, 선클토끼 페이스 키링 증정

(영수증 1건당 1개 / 소진 시까지)',1,0,'11:00-21:00','2024-10-29','𝗣𝗢𝗣-𝗨𝗣 𝗦𝗧𝗢𝗥𝗘 𝘄𝗶𝘁𝗵 아키리🧸','11:00-21:00','','11:00-21:00','11:00-21:00','2024-10-29 18:41:38.293603','11:00-21:00',0,1,1,0,14),
	 (7,'전북특별자치도 군산시 구영신창길 63 ',0,'2024-10-29 18:46:26.910079','맥심골목에는 어떤 가게가 있을까?

아기자기한 귀여움이 묻어나는 맥심골목의 모습😋

 

나들이 하기 좋은 요즘 날씨 맥심 골목으로 놀러오세요!

 

📍운영 시간: 11월 17일까지 매일 오전 10시~오후 7시

📍찾아오시는 곳: 전북 군산시 구영신창길 63','2024-11-17','맥심커피 팝업스토어 맥심골목','0',0,1,'10:00-19:00',0,'http://www.maximcoffee.co.kr/','https://www.instagram.com/maxim_coffee_mix',0,0,'10:00-19:00','',0,0,'10:00-19:00','2024-10-29','맥심커피 팝업스토어 맥심골목','10:00-19:00','','10:00-19:00','10:00-19:00','2024-11-01 11:32:31.573941','10:00-19:00',0,1,2,0,5),
	 (8,'서울 종로구 계동길 77 ',0,'2024-10-29 18:50:18.061211','𝐀𝐧𝐢𝐥𝐥𝐨 𝐒𝐡𝐨𝐰𝐞𝐫 𝐇𝐨𝐮𝐬𝐞

“𝐅𝐫𝐞𝐧𝐜𝐡 𝐏𝐞𝐫𝐟𝐮𝐦𝐞𝐫''𝐬 𝐀𝐭𝐞𝐥𝐢𝐞𝐫 𝐢𝐧 𝐁𝐮𝐤𝐜𝐡𝐨𝐧"

Take a shower, Wash off the day

 

따뜻한 물줄기가 몸에 닿는 순간,

욕실을 가득 채우며 시작되는 나만의 시간,

아닐로와 함께 따뜻한 휴식을 즐기세요.

 

2024년 가을, 북촌의 편안하고 여유로운 감성을 담은 프렌치 아뜰리에 공간에서 아닐로만의 특별한 향기를 느낄 수 있는 퍼퓸 라인을 새롭게 선보입니다.

부드럽고 편안한 향을 통해 일상의 무게를 씻어내고 마음의 평화를 찾을 수 있는 샤워하우스에 놀러오세요!

 

🎈POP-UP INFO

✔️ Date : 2024.10.28 - 2024.11.18

✔️ Time : 11:00~19:00

✔️ Location : 서울특별시 종로구 계동길 77 (안국역 근처)','2024-11-18','아닐로 팝업스토어','0',0,1,'11:00-19:00',0,'https://anillo.co.kr/index.html','https://www.instagram.com/anillo_official',0,0,'11:00-19:00','',0,0,'11:00-19:00','2024-10-29','“𝐅𝐫𝐞𝐧𝐜𝐡 𝐏𝐞𝐫𝐟𝐮𝐦𝐞𝐫''𝐬 𝐀𝐭𝐞𝐥𝐢𝐞𝐫 𝐢𝐧 𝐁𝐮𝐤𝐜𝐡𝐨𝐧"','11:00-19:00','','11:00-19:00','11:00-19:00','2024-10-29 18:50:18.061211','11:00-19:00',0,1,2,0,7),
	 (9,'서울 중구 남대문로 81 ',1,'2024-10-29 19:31:07.423812','🌟 노랑풍선 팝업스토어 오픈! ✈️

 

10월 28일부터 11월 5일까지 총 9일 동안 롯데백화점 본점(명동점)에서 다양한 여행 상품을 만나보세요!

💬 상담 데스크에서 직접 소통하며 할인 혜택과 포인트 적립도 받을 수 있어요!

 

🎁 노랑풍선 트래블 라운지 특별 혜택

1️⃣해외 패키지 여행 상품 예약 시 최대 10만원 할인!

2️⃣ 단거리 여행지 예약 시 노랑풍선 2만 포인트, 장거리 여행지 예약 시 3만 포인트 추가 혜택!

3️⃣ 지역별 특전으로 와인, 망고, 대추야자 초콜릿 제공!

4️⃣ 현장 예약 고객에게 스크래치 복권 증정, 특별 경품 제공!

 

📆기간 : 10월 28일부터 11월 5일까지 총 9일

📍 위치: 롯데백화점 본점(명동점) 지하 1층 코스모너지 광장

 

업계 최초 백화점 내 팝업스토어에서 특별한 경험을 즐겨보세요! 💛','2024-11-05','노랑풍선 팝업스토어','0',1,1,'10:30-20:30',0,'https://www.ybtour.co.kr/','https://www.instagram.com/yellowballoon_official',0,1,'10:30-20:00','',0,1,'10:30-20:30','2024-10-29','노랑풍선 팝업스토어 오픈!','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-29 19:31:07.423812','10:30-20:00',0,1,2,0,15),
	 (10,'서울 마포구 와우산로35길 13 ',1,'2024-10-29 19:37:24.580352','귀여움에 귀여움을 더하다! 🐶

삭스어필과 모구타카하시가 만났어요! 🙌🏻

 

[ 오브젝트 서교점,삼청점 ] : MOGU TAKAHASHI X socks appeal🧦

 

도쿄를 베이스로 작품 활동을 전개하는 모구타카하시,

주변의 사물로부터 영감을 받아 양말을 디자인하는 삭스어필!

 

사랑스러운 모구타카하시의 아트워크와 따뜻함을 전하는 삭스어필의 콜라보 전시가 서교점과 삼청점에서 시작되었습니다.

 

아이와 성인 모두를 위한 양말부터, 도톰하고 귀여운 니트의류🧶

목도리, 모자, 악세사리까지 만나볼 수 있어요.

 

조금씩 찬 바람이 불어오는 지금, 따뜻한 아이템이 가득한 삭스어필 전시로 놀러 오세요! 🐻

 

✨ EXHIBITION EVENT✨

• 전시 기간 모구타카하시 콜라보 제품 10% 할인','2024-11-20','오브젝트 서교점 : 모구타카하시 X 삭스어필','0',1,1,'12:00-21:00',0,'https://insideobject.com/','https://www.instagram.com/insideobject',0,1,'12:00-21:00','',0,1,'12:00-21:00','2024-10-29','삭스어필과 모구타카하시가 만났어요! 🙌🏻','12:00-21:00','','12:00-21:00','12:00-21:00','2024-10-29 19:37:24.580352','12:00-21:00',1,1,2,0,0),
	 (11,'부산 부산진구 서면로 39 ',1,'2024-10-29 19:42:53.051788','빵빵이와 옥지의 만물상 IN 부산

 

만물트럭을 타고 도착한 부산에서 장사를 시작한 빵빵이와 옥지

12월, 부산에서 만나요!

 

🎪일시 : 2024.12.01(일) ~ 2024.12.31(화)

🎪장소 : KT&G 상상마당 부산 (부산 부산진구 서면로 39)','2024-12-31','빵빵이와 옥지의 만물상 IN 부산 팝업스토어','0',1,1,'11:00-21:00',0,'','https://www.instagram.com/b2ang_official',0,1,'11:00-21:00','',0,1,'11:00-21:00','2024-12-01','빵빵이와 옥지의 만물상 IN 부산','11:00-21:00','','11:00-21:00','11:00-21:00','2024-10-29 19:42:53.051788','11:00-21:00',1,1,2,0,7),
	 (12,'서울 종로구 삼청로 37 ',1,'2024-10-29 19:51:14.914122','어린이박물관 상설전시 2 <총총! 별이 빛나는 밤>

 

국립민속박물관 어린이박물관은 상설전시 <총총! 별이 빛나는 밤>을 새롭게 선보입니다. 도시의 화려한 불빛 속에서 잊힌 밤하늘의 별을 다시 아이들에게 보여주기 위해 기획된 특별한 전시입니다. 빛공해로 인한 생태계의 어려움을 다양한 생명체의 관점에서 공감하고, ''밤''과 ''어둠''의 소중함을 되새길 수 있도록 구성했습니다. 별을 통해 시간과 방향을 알았던 옛사람들의 지혜를 떠올리며, 아이들은 어둠 속에서 빛나는 별의 가치를 느끼고, 자연을 지키는 작은 실천의 중요성을 배우는 뜻깊은 경험이 될 것입니다.

 

- 전시 기간: 2024. 10. 30.(수)~2026. 8. 30.(일)

- 전시 장소: 국립민속박물관 어린이박물관 상설전시실 2

- 전시 주제: 밤하늘의 빛나는 별을 보고 싶어요!

- 관람료: 무료','2026-08-30','전시 <총총! 별이 빛나는 밤>','0',0,1,'09:30-17:30',0,'https://www.nfm.go.kr/kids/','https://www.instagram.com/tnfmk',0,1,'09:30-17:30','',0,0,'09:30-17:30','2024-10-30','<총총! 별이 빛나는 밤>','09:30-17:30','','09:30-17:30','09:30-17:30','2024-11-01 11:04:26.164917','09:30-17:30',1,2,2,0,3),
	 (13,'부산 해운대구 센텀남대로 35 ',1,'2024-10-29 19:56:23.606995','짱구는 여행중!🚆

24년 팝업스토어 한정판 굿즈 공.개.

 

<짱구는 못말려 피규어 무드등>

서울, 전주, 대구, 부산 4개 팝업스토어 지역을 담은 피규어에서 불빛이 반-짝!

 

오직 짱구 팝업스토에서만 만날 수 있으니 짱덕들아 우리 11월에 만나 🙌','2024-11-24','24년 짱구는 못말려 부산 팝업스토어 <짱구는 여행중!>','0',1,1,'10:30-20:30',0,'https://brand.naver.com/daewonmedia/category/15a696fc69124fcbbfd1707b35f2ffe8?cp=1','https://www.instagram.com/shinchan_kr',0,1,'10:30-20:00','',1,1,'10:30-20:30','2024-11-15','짱구는 여행중!🚆','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-29 19:56:23.606995','10:30-20:00',1,1,2,1,21),
	 (14,'서울 영등포구 여의대로 108 ',1,'2024-10-29 20:10:09.778233','영화 <위키드> 팝업스토어 in 더현대 𝘾𝙊𝙈𝙄𝙉𝙂 𝙎𝙊𝙊𝙉! ✨

11월 1일(금) 부터 12월 1일(일)까지 더현대 서울에서 2024년 하반기 최고 기대작 위키드의 팝업스토어가 운영됩니다💚💖

 

📢영화 <위키드> 팝업스토어 in 더현대 굿즈 LIST 공개

📆11월 1일부터 #더현대 서울에서 열리는 위키드 팝업스토어에서 다양한 한정판 상품과 콜라보 상품을 만나보실 수 있어요!💚

 

✨ <위키드> 팝업스토어 상품 LIST✨

 

* [팝업 단독]  위키드 인형키링 세트

* [팝업 단독] 위키드 인형 꽃카 에디션

* [팝업 단독] 엘파바 뱃지

* [팝업 단독]  매직 변온 머그

* [팝업 단독]  위키드 거울 3종

* [루아페] 퍼퓸 캔들 세트 2종

* [마녀공장] 미니 어드벤트 캘리더

* [레고]  에메랄드 시티

* [레고]  엘파바와 글린다

* [위니비니] 스위트 매직북

 

🎁더 많은 상품도 준비 중이니 기대해 주세요!

팝업스토어 한정 상품은 오직 <위키드> 더현대 팝업에서만 만나볼 수 있습니다! 놓치지 마세요!💖','2024-12-01','영화 <위키드> 팝업스토어 in 더현대','0',1,0,'10:30-20:30',0,'','https://www.instagram.com/universalkorea',0,1,'10:30-20:00','',1,1,'10:30-20:30','2024-11-01','영화 <위키드> 팝업스토어 in 더현대','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-29 20:10:09.778233','10:30-20:00',1,1,3,1,6),(2531,'서울특별시 마포구 양화로 188 애경타워 3층',1,'2024-10-30 10:45:15','사랑스러운 코리락쿠마가 20주년을 맞이하여 특별한 팝업스토어를 열었습니다. 다양한 한정판 굿즈와 포토존에서 추억을 남기고, 코리락쿠마의 세계에 빠져보세요!','2025-01-19','코리락쿠마 20주년 기념 팝업스토어 in 서울','0',0,0,'10:30-20:30',0,'https://www.korilakkuma20th.com','@Korilakkuma20th',0,1,'10:30-20:00','',0,1,'10:30-20:30','2024-11-29','20년의 사랑, 코리락쿠마의 특별한 여정','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-31 15:37:26.220135','10:30-20:00',0,1,3,0,1),(2532,'서울특별시 마포구 양화로 188 애경타워 4층',0,'2024-10-30 10:45:15','대베르세르크의 매혹적인 세계를 탐험하세요. 작품 전시와 함께 작가의 창작 과정, 그리고 스토리의 깊이를 느낄 수 있는 특별한 전시입니다.','2025-01-05','전시 <대베르세르크전>','0',0,0,'10:30-20:30',0,'https://www.daberserkexhibition.com','@DaBerserkExhibition',0,0,'10:30-20:00','',1,0,'10:30-20:30','2024-10-23','어둠 속의 빛, 대서사시의 만남','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-31 17:48:14.744313','10:30-20:00',0,2,4,1,2),(2534,'서울특별시 성동구 연무장17길 7',1,'2024-10-30 10:45:15','풀무원의 신선한 재료로 만들어진 다양한 요리를 체험할 수 있는 팝업스토어입니다. 맛있는 요리와 함께 건강한 식습관을 배워보세요!','2024-10-28','풀떼기의 맛탐정사무소 <풀무원더랜드 팝업스토어>','0',0,0,'10:30-20:30',0,'https://www.pulmuonewonderland.com','@PulmuoneWonderland',0,0,'10:30-20:00','',1,1,'10:30-20:30','2024-10-22','신선함을 찾아 떠나는 미식 탐험','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',0,1,4,0,0),(2535,'서울특별시 성동구 성수이로26길 27-20 키르스튜디오 A, B동',1,'2024-10-30 10:45:15','자라와 나누시카의 특별한 콜라보레이션 팝업스토어에서 패션의 혁신을 만나보세요. 지속 가능한 패션을 위한 다양한 스타일과 아이디어를 제공하는 공간입니다.','2024-10-27','자라 X 나누시카 팝업스토어','0',0,0,'10:30-20:30',0,'https://www.zaraxnausicaa.com','@ZaraXNausicaa',0,0,'10:30-20:00','',1,0,'10:30-20:30','2024-10-25','패션의 새로운 물결, 지속 가능성을 만나다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',0,1,2,0,0),(2536,'서울 성동구 연무장길 33',0,'2024-10-30 10:45:15','테라브레스와 토대리가 함께하는 특별한 팝업스토어! 혁신적인 제품을 체험하고, 건강한 라이프스타일을 위한 다양한 정보를 얻어보세요.','2024-11-03','[테라브레스 X 토대리] 팝업스토어','0',1,0,'10:30-20:30',0,'https://www.terrabreathxtodo.com','@TerraBreathXTodo',0,0,'10:30-20:00','',0,0,'10:30-20:30','2024-10-26','건강과 혁신의 만남, 상쾌한 경험을 선사하다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',0,1,1,0,0),(2538,'서울특별시 용산구 서빙고로 137 국립중앙박물관 기획전시실',1,'2024-10-30 10:45:15','오는 11월 30일(토) 국립중앙박물관 기획전시실에서 특별전<비엔나 1900, 꿈꾸는 예술가들 - 구스타프 클림트부터 에곤 실레까지>이 개최됩니다.','2025-03-03','전시 <비엔나 1900, 꿈꾸는 예술가들 - 구스타프 클림트부터 에곤 실레까지>','0',1,0,'10:30-20:30',0,'https://www.vienna1900exhibition.com','@Vienna1900Exhibition',0,1,'10:30-20:00','서울 성동구 연무장길 38-1 1층 도어투성수  10/23(수)~10/31(목)',0,0,'10:30-20:30','2024-11-30','예술의 향연, 세기의 거장들을 만나다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-11-01 10:57:45.931735','10:30-20:00',0,2,4,0,3),(2539,'서울특별시 성동구 연무장길 38-1 엘리자베스빌딩 1층 도어투성수',0,'2024-10-30 10:45:15','유니버셜 스튜디오와 협업하여 한정판 와인 출시 기념 GS25X19크라임스 팝업스토어 오픈! 감옥 컨셉에서 사진도 찍고 한정판 19크라임스 와인도 만나보자!','2024-10-31','19크라임스 X GS25 in 도어투성수 팝업스토어','0',0,0,'10:30-20:30',0,'https://www.19crimesxgs25.com','@19CrimesXGS25',0,1,'10:30-20:00','',0,1,'10:30-20:30','2024-10-23','사건의 전말, 맛과 이야기를 동시에!','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',0,1,4,0,0),(2541,'서울특별시 광진구 능동로 209 세종대학교 대양홀 앞',0,'2024-10-30 10:45:15','서울시에서 지원하는 다양한 청년정책을 알고 싶다면? 2024년 10월 28일(월)~29(화) 이틀간 ✨세종대 대양홀 앞✨으로 모두 모여라~!🤗','2024-10-29','청년행복 팝업스토어 in 세종대','0',0,0,'10:30-20:30',0,'https://www.younghappinesspopup.com','@YoungHappinessPopup',0,0,'10:30-20:00','',0,1,'10:30-20:30','2024-10-28','젊음의 에너지, 미래를 꿈꾸다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',0,1,3,0,0),(2542,'부산광역시 기장군 기장읍 기장해안로 147 롯데몰 동부산점 1층',1,'2024-10-30 10:45:15','롯데몰 동부산점에  벨리곰X위글위글 팝업 스토어가 찾아왔습니다! 팝업 스토어 곳곳에 있는 귀여운 벨리곰들과 함께 사진도 찍고 📸 럭키 드로우, 구매 금액대별 사은품, 인스타그램 인증샷 이벤트까지 다양한 콘텐츠를 즐겨보세요! ','2024-11-03','벨리곰 X 위글위글 팝업스토어 in 롯데몰 동부산점','0',1,0,'10:30-20:30',0,'https://www.bellybearxwigglewiggle.com','@BellyBearXWiggleWiggle',0,1,'10:30-20:00','',0,1,'10:30-20:30','2024-10-18','귀여움의 매력, 특별한 콜라보','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,3,0,0),(2543,'서울특별시 영등포구 여의대로 108 파크원 더현대 서울 지하2층',0,'2024-10-30 10:45:15','< LMR POP-UP STORE > IN 더 현대 서울🐈‍⬛ 귀여운 샹뇽이를 직접 만나고 싶다면, 더 현대 서울로 놀러오세요!','2024-10-30','엘엠알 팝업스토어 in 더현대 서울','0',0,0,'10:30-20:30',0,'https://www.lmrpopup.com','@LMRPopup',0,1,'10:30-20:00','',0,0,'10:30-20:30','2024-10-24','트렌드의 정점, 스타일의 혁신','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,3,0,0),(2545,'서울특별시 강남구 강남대로 426 진우빌딩 강남 일상비일상의틈byU+',1,'2024-10-30 10:45:15','정년이와 잔망루피의 콜라보 팝업스토어! 특별한 굿즈와 다양한 이벤트를 통해 팬들과의 소통을 즐길 수 있는 공간입니다.','2024-11-10','정년이 X 잔망루피 팝업스토어','0',1,0,'10:30-20:30',0,'https://www.jeongnyeonxjamangloopy.com','@JeongnyeonXJamangLoopy',0,0,'10:30-20:00','',1,1,'10:30-20:30','2024-10-30','젊음과 놀이의 조화, 즐거움이 가득','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,2,0,0),(2546,'인천광역시 중구 월미로 33 상상플랫폼 다목적홀',1,'2024-10-30 10:45:15','제물포 웨이브 마켓의 3회차! 다양한 크리에이터와 셀러들이 모여 독창적인 상품을 선보이며, 지역 커뮤니티와의 연결을 도모합니다.','2024-11-03','제물포 웨이브 마켓 3회차','0',1,0,'10:30-20:30',0,'https://www.jewolpowavemarket.com','@JewolpoWaveMarket',0,0,'10:30-20:00','',0,0,'10:30-20:30','2024-11-02','신선한 감각, 지역의 매력을 만나다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-31 16:10:28.215610','10:30-20:00',0,1,1,0,4),(2547,'서울특별시 송파구 올림픽로 240 롯데월드 롯데백화점 잠실점 2층',0,'2024-10-30 10:45:15','롯데백화점 잠실에서 열리는 컴젠 팝업스토어! 혁신적인 IT 제품을 직접 체험하고, 다양한 할인 혜택을 누릴 수 있는 기회를 제공합니다.','2024-12-31','컴젠 롯데백화점 잠실 팝업스토어','0',1,0,'10:30-20:30',0,'https://www.compgenlottejamsil.com','@CompgenLotteJamsil',0,1,'10:30-20:00','',1,0,'10:30-20:30','2024-10-25','기술과 쇼핑의 혁신, 미래의 편리함','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',0,1,2,0,0),(2548,'서울특별시 성동구 연무장17길 7',0,'2024-10-30 10:45:15','성수에서 열리는 업모스트 팝업스토어! 독특한 디자인의 상품을 만나볼 수 있으며, 다양한 아트와 문화 콘텐츠로 꾸며진 특별한 경험을 선사합니다.','2024-11-03','업모스트 성수 팝업스토어','0',1,0,'10:30-20:30',0,'https://www.upmostseongsu.com','@UpmostSeongsu',0,1,'10:30-20:00','',0,0,'10:30-20:30','2024-10-31','최고의 선택, 개성 넘치는 아이템','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,2,0,0),(2549,'경기도 의왕시 바라산로 1 롯데프리미엄아울렛의왕점 FINE VILLE 1층',1,'2024-10-30 10:45:15','플레이모빌 세종대왕 한글날 팝업스토어! 아이들과 함께 즐길 수 있는 다양한 놀이와 교육적인 체험을 제공합니다. 세종대왕의 업적을 기념하는 공간입니다.','2024-10-20','플레이모빌 세종대왕 한글날 팝업스토어','0',1,0,'10:30-20:30',0,'https://www.playmobilhangeulday.com','@PlaymobilHangeulDay',0,1,'10:30-20:00','',0,0,'10:30-20:30','2024-10-08','역사를 배우다, 놀이와 함께하는 한글의 세계','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,2,0,0),(2550,'서울특별시 영등포구 여의대로 108 파크원 더현대 서울',0,'2024-10-30 10:45:15','이치란 라멘 더현대 팝업스토어에서 진정한 일본 라멘을 맛볼 수 있습니다. 특별한 레시피로 만든 라멘을 통해 일본의 맛을 경험해보세요!','2024-11-07','이치란 라멘 더현대 팝업스토어','0',1,0,'10:30-20:30',0,'https://www.ichiranramenpopup.com','@IchiranRamenPopup',0,1,'10:30-20:00','',1,1,'10:30-20:30','2024-10-25','일본의 맛, 진정한 라멘의 향연','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,4,0,0),(2551,'서울특별시 영등포구 여의대로 108 파크원 더현대 서울 지하2층 아이코닉존',1,'2024-10-30 10:45:15','재친구 팝업스토어에서 친구들과의 특별한 순간을 공유하세요. 다양한 굿즈와 포토존이 마련되어 있어 잊지 못할 추억을 만들 수 있습니다.','2024-10-30','재친구 팝업스토어','0',0,0,'10:30-20:30',0,'https://www.refriendspopup.com','@ReFriendsPopup',0,1,'10:30-20:00','',1,0,'10:30-20:30','2024-10-24','친구와 함께, 특별한 추억을 만들어 가다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,3,0,0),(2552,'서울특별시 성동구 서울숲2길 27',1,'2024-10-30 10:45:15','템츠 팝업스토어에서 다양한 제품을 만나보세요. 혁신적인 디자인과 기능성을 갖춘 제품들로 여러분을 초대합니다.','2024-11-03','템츠 팝업스토어','0',0,0,'10:30-20:30',0,'https://www.temptspopup.com','@TemptsPopup',0,1,'10:30-20:00','',1,0,'10:30-20:30','2024-10-31','새로운 트렌드, 독특한 매력을 발견하다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',0,1,2,0,0),(2553,'부산광역시 해운대구 센텀남대로 35 신세계백화점센텀시티점 지하2층 중앙광장',0,'2024-10-30 10:45:15','2024 패패부산 팝업스토어! 최신 패션 트렌드를 경험하고, 다양한 스타일을 만나볼 수 있는 기회를 제공합니다.','2024-11-04','2024 패패부산 팝업스토어','0',1,0,'10:30-20:30',0,'https://www.papbusan2024.com','@PAPBUSAN2024',0,0,'10:30-20:00','',0,0,'10:30-20:30','2024-10-31','부산의 패션, 새로운 물결을 엿보다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',0,1,3,0,0),(2554,'서울특별시 성동구 상원6길 7 플랫폼빌딩 1층',1,'2024-10-30 10:45:15','앱톤 X 밭의 특별한 팝업스토어 <버튼팟> 성수! 독창적인 디자인과 기능을 갖춘 제품들을 만나보며, 특별한 체험을 즐겨보세요.','2024-11-01','앱톤 X 밭 <버튼팟> 성수 팝업스토어','0',0,0,'10:30-20:30',0,'https://www.aptonxbatchbuttonpot.com','@AptonXBatchButtonPot',0,0,'10:30-20:00','',1,0,'10:30-20:30','2024-10-28','창의적인 만남, 일상 속의 예술','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,1,0,0),(2555,'서울특별시 성동구 성수이로18길 43 1층 무신사 스퀘어 성수3',1,'2024-10-30 10:45:15','이외들의 가을 겨울 컬렉션 팝업스토어! 새로운 시즌의 패션 아이템을 선보이며, 스타일을 완성할 수 있는 기회를 제공합니다.','2024-10-28','이외들 가을 겨울 컬렉션 팝업스토어','0',1,0,'10:30-20:30',0,'https://www.eoideulautumnwinter.com','@EoideulAutumnWinter',0,0,'10:30-20:00','',0,1,'10:30-20:30','2024-10-23','계절을 만나다, 따뜻함이 느껴지는 패션','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,3,0,0),(2556,'부산광역시 동구 범일로65번길 21 범일가옥',0,'2024-10-30 10:45:15','<와! 싸다. 홍박사2 마트> 전시에서 다양한 상품을 만나고, 즐거운 쇼핑 경험을 누리세요. 재미있는 이벤트와 할인 혜택이 가득합니다.','2024-11-09','<와! 싸다. 홍박사2 마트> 전시','0',1,0,'10:30-20:30',0,'https://www.wowcheaphongdoctor2.com','@WowCheapHongDoctor2',0,1,'10:30-20:00','',1,0,'10:30-20:30','2024-10-20','일상의 즐거움, 재미있는 쇼핑의 세계','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,4,0,0),(2557,'부산광역시 수영구 구락로123번길 20 F1963 석천홀',1,'2024-10-30 10:45:15','영국 국립자연사박물관 특별전에서 올해의 야생동물 사진작가전 월드투어를 만날 수 있습니다. 아름다운 자연과 동물을 담은 사진들을 통해 감동을 느껴보세요.','2024-11-05','영국 국립자연사박물관 특별전 올해의 야생동물 사진작가전 월드투어 in 부산','0',1,0,'10:30-20:30',0,'https://www.naturalhistorymuseumtour.com','@NaturalHistoryMuseumTour',0,0,'10:30-20:00','',1,0,'10:30-20:30','2024-09-07','자연의 아름다움, 야생의 순간을 담다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-11-01 11:32:35.339731','10:30-20:00',1,2,1,0,5),(2560,'서울특별시 종로구 북촌로5길 6 오브젝트 삼청점',1,'2024-10-30 10:45:15','오브젝트 삼청점에서 모구타카하시 X 삭스어필의 특별한 콜라보 제품을 만나보세요. 다양한 아트와 디자인이 결합된 제품들을 선보입니다.','2024-11-20','오브젝트 삼청점 : 모구타카하시 X 삭스어필','0',1,0,'10:30-20:30',0,'https://www.objectsamcheong.com','@ObjectSamcheong',0,0,'10:30-20:00','',1,1,'10:30-20:30','2024-10-21','독특한 시선, 디자인의 새로운 기준','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,2,0,0),(2561,'서울특별시 성동구 연무장길 77',0,'2024-10-30 10:45:15','성수에서 열리는 취 팝업스토어! 다양한 취향을 반영한 상품들을 만나볼 수 있는 기회입니다. 나만의 스타일을 찾는 즐거움을 느껴보세요.','2025-01-16','취 팝업스토어 in 성수','0',1,0,'10:30-20:30',0,'https://www.chwipop.com','@ChwiPopup',0,0,'10:30-20:00','',1,0,'10:30-20:30','2024-10-19','자연의 향기, 심신을 치유하는 공간','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,3,0,0),(2562,'서울특별시 양천구 목동동로 257 현대하이페리온 현대백화점 목동점 5층 이벤트홀',0,'2024-10-30 10:45:15','꼬모 데로리 팝업스토어에서 유니크한 아이템들을 만나보세요. 특별한 디자인과 품질을 자랑하는 제품들이 여러분을 기다립니다.','2024-10-31','꼬모 데로리 팝업스토어','0',0,0,'10:30-20:30',0,'https://www.comodelori.com','@ComoDeLori',0,0,'10:30-20:00','',0,0,'10:30-20:30','2024-10-25','귀여움의 매력, 소중한 순간을 기록하다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,2,0,0),(2563,'서울특별시 성동구 연무장17길 7 토로토로 스튜디오 1층',1,'2024-10-30 10:45:15','새활용사 업사이클 팝업스토어에서 환경을 생각하는 제품들을 만나보세요. 재활용된 소재로 만들어진 다양한 아이템이 준비되어 있습니다.','2024-11-03','새활용사 업사이클 팝업스토어','0',0,0,'10:30-20:30',0,'https://www.reuseupcyclepopup.com','@ReuseUpcyclePopup',0,0,'10:30-20:00','',0,1,'10:30-20:30','2024-10-30','지속 가능한 미래, 창의적인 재활용의 세계','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,4,0,0),(2566,'서울특별시 송파구 올림픽로 300 롯데월드타워앤드롯데월드몰 1층 아트리움',0,'2024-10-30 10:45:15','잠실에서 열리는 드래곤볼 팝업스토어! 인기 캐릭터들의 다양한 굿즈와 함께 신나는 이벤트를 즐겨보세요.','2024-11-20','드래곤볼 팝업스토어 in 잠실','0',1,0,'10:30-20:30',0,'https://www.dragonballpopup.com','@DragonBallPopup',0,1,'10:30-20:00','',1,0,'10:30-20:30','2024-11-07','상상의 세계로, 드래곤볼의 모험을 만나다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,2,0,0),(2567,'경기도 고양시 덕양구 고양대로 1955 스타필드 고양 3층 토이킹덤',0,'2024-10-30 10:45:15','퍼피구조대 팝업 in 토이킹덤 고양에서 어린이들을 위한 다양한 놀이와 교육적인 체험을 제공합니다. 사랑스러운 캐릭터들과 함께하는 특별한 경험입니다.','2024-10-20','퍼피구조대 팝업 in 토이킹덤 고양','0',0,0,'10:30-20:30',0,'https://www.pawpatrolpopupgoyang.com','@PawPatrolPopupGoyang',0,0,'10:30-20:00','',0,1,'10:30-20:30','2024-10-19','우리의 친구, 강아지와 함께하는 특별한 시간','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,2,0,0),(2568,'경기도 하남시 미사대로 750 스타필드 하남 3층 토이킹덤',1,'2024-10-30 10:45:15','퍼피구조대 팝업 in 토이킹덤 하남에서 재미있고 교육적인 체험을 통해 어린이들과의 특별한 시간을 만들어 보세요.','2024-10-27','퍼피구조대 팝업 in 토이킹덤 하남','0',1,0,'10:30-20:30',0,'https://www.pawpatrolpophanam.com','@PawPatrolPopupHanam',0,1,'10:30-20:00','',0,1,'10:30-20:30','2024-10-26','아이들과 함께하는 즐거운 순간, 강아지의 세계를 탐험하다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',0,1,4,0,0),(2571,'서울특별시 중구 동호로24길 7 태극당',1,'2024-10-30 10:45:15','헤지스 X 태극당 팝업스토어에서 스타일리시한 패션 아이템과 맛있는 간식을 함께 만나볼 수 있는 기회를 제공합니다.','2024-11-03','헤지스 X 태극당 팝업스토어','0',1,0,'10:30-20:30',0,'https://www.hazzysxtaegukdang.com','@HazzysXTaegukdang',0,1,'10:30-20:00','',1,1,'10:30-20:30','2024-10-21','디자인의 새로운 경계, 전통의 아름다움을 담다','10:30-20:30','','10:30-20:00','10:30-20:00','2024-10-30 10:45:15','10:30-20:00',1,1,3,0,0),(2572,'서울 서초구 남부순환로 2406 ',0,'2024-10-31 17:17:29.480333','','2025-02-28','［라스트 얼리버드］빛의 거장 카라바조 ＆ 바로크의 얼굴들','15,400',0,0,'10:00-19:00',0,'https://www.thinkmuseum.com','https://www.instagram.com/caravaggio_acts',0,1,'10:00-19:00','화~일 오전 10시 ~ 오후 7시(입장 마감 오후 6시)
*매주 월요일 휴관


*라스트 얼리버드 30%할인

- 얼리버드 30% 할인가격 성인 15,400원/청소년 11,900원/어린이 9,800원
(정상가 성인 22,000원/청소년 17,000원/어린이 14,000원)
- 판매기간: 2024년 10월 23일 - 11월 8일
- 관람기간: ~2025년 2월 28일',0,0,'10:00-19:00','2024-11-09','빛의 거장 카라바조 & 바로크의 얼굴들','10:00-19:00','','10:00-19:00','10:00-19:00','2024-10-31 17:51:18.815150','10:00-19:00',0,2,1,1,13),
	 (2573,'서울 중구 을지로 281 ',0,'2024-11-01 09:41:40.828122','','2025-02-06','미나 페르호넨 디자인 여정: 기억의 순환','20,000',0,0,'10:00-20:00',0,'','https://www.instagram.com/minaperhonen_ddp',0,1,'10:00-20:00','입장권 - 성인(만19세-64세)
20,000원
입장권 - 청소년(만13세-18세이하)
15,000원
입장권 - 어린이(만7세-12세이하)
10,000원


10:00 - 20:00 (입장마감 19:00)
휴관일 없음',1,0,'10:00-20:00','2024-11-01','미나 페르호넨 디자인 여정: 기억의 순환','10:00-20:00','입장마감은 19:00 입니다.','10:00-20:00','10:00-20:00','2024-11-01 09:41:40.828122','10:00-20:00',0,2,5,1,0),
	 (2574,'서울 중구 세종대로 14 ',0,'2024-11-01 14:03:40.472342','','2025-04-13','우연히 웨스 앤더슨 2','18,000',0,0,'10:00-19:00',0,'https://groundseesaw.co.kr','https://www.instagram.com/GROUNDSEESAW',0,0,'10:00-19:00','＊본 티켓은 별도 배송 되지 않으며, 현장 매표소에서 예매자 성함 및 연락처 확인 후 입장하실 수 있습니다.
＊취소 및 환불 규정은 2025년 4월 12일 17시까지 가능하며, 이후 취소 및 환불은 불가합니다.',1,0,'10:00-19:00','2024-11-01','우연히 웨스 앤더슨 2','10:00-19:00','입장마감은 18:00 입니다.','10:00-19:00','10:00-19:00','2024-11-01 14:03:40.472342','10:00-19:00',1,2,5,1,0);
-- 2024.11.01 EVENT 테이블 UPDATE
INSERT INTO event (id,created_at,description,end_at,event_name,start_at,summary,updated_at,exhibition_id) VALUES(2,'2024-11-01 14:06:00.128136','','2024-11-30','［예매 20% 할인］ 우연히 웨스 앤더슨 2','2024-11-01','우연히 웨스 앤더슨 2','2024-11-01 14:06:00.128136',2574);
-- 2024.11.01 EVENT_IMAGE 테이블 UPDATE
INSERT INTO event_image (id,file_size,image,is_main,saved_name,event_id) VALUES(1,482018,'anderson.PNG',0,'9a90073d-3d3c-457c-9fb9-1edc4a0d8029_anderson.PNG',2);
-- 2024.11.01 EVENT_POSTER 테이블 UPDATE
INSERT INTO event_poster (id,file_size,poster_name,saved_name,event_id) VALUES(1,54921,'24013174_p.gif','24013174_p.gif',2);
-- 2024.11.01 IMAGE 테이블 UPDATE
INSERT INTO image (id,file_size,image_name,is_main,saved_name,exhibition_id) VALUES(1,280013,'image1_1.jfif',0,'bd13cb95-8650-415e-908d-32b0db1653a6_image1_1.jfif',1),(2,298666,'image1_2.jfif',0,'a6137224-2a5a-42ea-a963-f6afdcee6b6b_image1_2.jfif',1),(3,148437,'image2_1.jfif',0,'19c3c255-f8b5-490e-a42b-5b4e6bdaa119_image2_1.jfif',2),(4,149843,'image2_2.jfif',0,'3d338300-4f41-479c-9838-15eae07678fa_image2_2.jfif',2),(5,59646,'image3_2.jfif',0,'1c02ddd9-8126-4f7a-aaf8-6766c82eb339_image3_2.jfif',3),(6,51221,'image3_1.jfif',0,'d66b9767-35c9-48ac-884d-86a68b5cfa25_image3_1.jfif',3),(7,182357,'image4_1.jfif',0,'310ed11b-352a-4fb4-9a13-1edbac8b192a_image4_1.jfif',4),(8,590508,'image5_1.jfif',0,'27300553-aedd-4558-b6a4-d213d97f13a1_image5_1.jfif',5),(9,199230,'image6_1.jfif',0,'2ce5a4f6-646e-4ed1-9312-30d1ed4a9a1a_image6_1.jfif',6),(10,204954,'image7_1.jfif',0,'3b9ccf68-e469-4d32-99b5-bc92258c00c0_image7_1.jfif',7),(11,292893,'image7_2.jfif',0,'32e9b21c-4a97-421a-9d2a-801d989e3266_image7_2.jfif',7),(12,211357,'image8_1.jfif',0,'fa4add2a-b449-425c-a8de-06ebd3f7e4ab_image8_1.jfif',8),(13,746837,'image9_1.jfif',0,'65372367-c20d-47f7-9e3e-b834d2192632_image9_1.jfif',9),(14,333575,'image9_2.jfif',0,'6e2f9102-0d93-4730-bf50-75e25d029b1a_image9_2.jfif',9),(15,627346,'image9_3.jfif',0,'2532f5ea-866e-4be1-bf90-e23ff8f85fd1_image9_3.jfif',9),(16,820596,'image10_2.jfif',0,'1a6d1c95-0b65-4097-b72c-5af0f9882092_image10_2.jfif',10),(17,783266,'image10_1.jfif',0,'b3fdbb72-9507-41cb-a908-f07512d2495d_image10_1.jfif',10),(18,204479,'image11_1.jfif',0,'35e47d45-0dd8-4caf-8bdc-b11b10222e23_image11_1.jfif',11),(19,124646,'image12_1.jfif',0,'20d8a7b3-725c-461b-b632-42f7b4531ade_image12_1.jfif',12),(20,257135,'image13_1.jfif',0,'8075db91-58fd-4cc7-9d06-bb2e9e9512f1_image13_1.jfif',13),(21,143986,'image13_2.jfif',0,'92eeaaaf-d325-413e-bb3a-dd14e9b0f7df_image13_2.jfif',13),(22,304746,'image14_1.jfif',0,'ff3764a9-3d51-4957-ac9c-1d5b468561b7_image14_1.jfif',14),(23,113612,'image14_2.jfif',0,'abc001b9-9a68-4463-b94d-cae67b0012c5_image14_2.jfif',14),(24,185053,'image14_3.jfif',0,'93bb5a0c-c974-4c7c-ada2-4f3c5148eb76_image14_3.jfif',14),(25,103456,'image14_4.jfif',0,'2ade2c26-3b9e-4360-8c03-bf7c20190bb2_image14_4.jfif',14),(32,1000,'image_2531.jpg',1,'image_2531.jpg',2531),(33,1000,'image_2532.jpg',1,'image_2532.jpg',2532),(35,1000,'image_2534.jpg',1,'image_2534.jpg',2534),(36,1000,'image_2535.jpg',1,'image_2535.jpg',2535),(37,1000,'image_2536.jpg',1,'image_2536.jpg',2536),(39,1000,'image_2538.jpg',1,'image_2538.jpg',2538),(40,1000,'image_2539.jpg',1,'image_2539.jpg',2539),(42,1000,'image_2541.jpg',1,'image_2541.jpg',2541),(43,1000,'image_2542.jpg',1,'image_2542.jpg',2542),(44,1000,'image_2543.jpg',1,'image_2543.jpg',2543),(46,1000,'image_2545.jpg',1,'image_2545.jpg',2545),(47,1000,'image_2546.jpg',1,'image_2546.jpg',2546),(48,1000,'image_2547.jpg',1,'image_2547.jpg',2547),(49,1000,'image_2548.jpg',1,'image_2548.jpg',2548),(50,1000,'image_2549.jpg',1,'image_2549.jpg',2549),(52,1000,'image_2551.jpg',1,'image_2551.jpg',2551),(53,1000,'image_2552.jpg',1,'image_2552.jpg',2552),(54,1000,'image_2553.jpg',1,'image_2553.jpg',2553),(55,1000,'image_2554.jpg',1,'image_2554.jpg',2554),(56,1000,'image_2555.jpg',1,'image_2555.jpg',2555),(57,1000,'image_2556.jpg',1,'image_2556.jpg',2556),(58,1000,'image_2557.jpg',1,'image_2557.jpg',2557),(61,1000,'image_2560.jpg',1,'image_2560.jpg',2560),(62,1000,'image_2561.jpg',1,'image_2561.jpg',2561),(63,1000,'image_2562.jpg',1,'image_2562.jpg',2562),(64,1000,'image_2563.jpg',1,'image_2563.jpg',2563),(67,1000,'image_2566.jpg',1,'image_2566.jpg',2566),(68,1000,'image_2567.jpg',1,'image_2567.jpg',2567),(72,1000,'image_2571.jpg',1,'image_2571.jpg',2571),(73,5132264,'24015420-01.jpg',0,'5a836f74-bb8b-41dc-8af1-3edace147094_24015420-01.jpg',2572),(74,878868,'24013237-02.jpg',0,'42abc0fb-526a-4eaf-8a16-94941abc0925_24013237-02.jpg',2573),(75,2492782,'24013174-04.jpg',0,'e9922540-fec4-4a06-85be-fc68489c7dd7_24013174-04.jpg',2574);
-- 2024.11.01 POSTER 테이블 UPDATE
INSERT INTO poster (id,file_size,poster_name,saved_name,exhibition_id) VALUES(1,280013,'poster_1.jfif','258523ea-0eb6-435b-a1ec-6d435f0d29cc_poster_1.jfif',1),(2,149843,'poster_2.jfif','14f026f3-7898-47ab-bd80-c6f82bdb358a_poster_2.jfif',2),(3,51221,'poster_3.jfif','661ac272-97de-4d43-a77e-f691fc8fd794_poster_3.jfif',3),(4,182357,'poster_4.jfif','cf001ece-4341-4ba9-a289-2f1d8c31822d_poster_4.jfif',4),(5,1083868,'poster_5.jfif','06c042f8-07ff-49cf-99e7-16e1d65fda33_poster_5.jfif',5),(6,188525,'poster_6.jfif','1d33884c-db35-4e49-902c-49bcc6b1432a_poster_6.jfif',6),(7,204954,'poster_7.jfif','d279acc2-5221-4b64-9a88-970d15c11690_poster_7.jfif',7),(8,723572,'poster_8.jfif','f895be05-c716-45ff-9a5a-a21fe00a0446_poster_8.jfif',8),(9,333575,'poster_9.jfif','3ceedafc-dcfa-4b65-94de-8633d50ca073_poster_9.jfif',9),(10,820596,'poster_10.jfif','58d269a1-55d2-47b4-9a5a-dc6c992b2bd5_poster_10.jfif',10),(11,204479,'poster_11.jfif','78100dd4-46eb-4565-90f1-9c54af84f5a6_poster_11.jfif',11),(12,124646,'image12_1.jfif','788ab934-44fb-41e8-8953-cdf43f2d285a_image12_1.jfif',12),(13,257135,'poster_13.jfif','8678371a-b5c0-4dd4-94f4-04ed90b0bb09_poster_13.jfif',13),(14,113612,'poster_14.jfif','38b452dc-c365-4aa4-b9ef-4f10535790c9_poster_14.jfif',14),(32,1000,'image_2531.jpg','image_2531.jpg',2531),(33,1000,'image_2532.jpg','image_2532.jpg',2532),(35,1000,'image_2534.jpg','image_2534.jpg',2534),(36,1000,'image_2535.jpg','image_2535.jpg',2535),(37,1000,'image_2536.jpg','image_2536.jpg',2536),(39,1000,'image_2538.jpg','image_2538.jpg',2538),(40,1000,'image_2539.jpg','image_2539.jpg',2539),(42,1000,'image_2541.jpg','image_2541.jpg',2541),(43,1000,'image_2542.jpg','image_2542.jpg',2542),(44,1000,'image_2543.jpg','image_2543.jpg',2543),(46,1000,'image_2545.jpg','image_2545.jpg',2545),(47,1000,'image_2546.jpg','image_2546.jpg',2546),(48,1000,'image_2547.jpg','image_2547.jpg',2547),(49,1000,'image_2548.jpg','image_2548.jpg',2548),(50,1000,'image_2549.jpg','image_2549.jpg',2549),(52,1000,'image_2551.jpg','image_2551.jpg',2551),(53,1000,'image_2552.jpg','image_2552.jpg',2552),(54,1000,'image_2553.jpg','image_2553.jpg',2553),(55,1000,'image_2554.jpg','image_2554.jpg',2554),(56,1000,'image_2555.jpg','image_2555.jpg',2555),(57,1000,'image_2556.jpg','image_2556.jpg',2556),(58,1000,'image_2557.jpg','image_2557.jpg',2557),(61,1000,'image_2560.jpg','image_2560.jpg',2560),(62,1000,'image_2561.jpg','image_2561.jpg',2561),(63,1000,'image_2562.jpg','image_2562.jpg',2562),(64,1000,'image_2563.jpg','image_2563.jpg',2563),(67,1000,'image_2566.jpg','image_2566.jpg',2566),(68,1000,'image_2567.jpg','image_2567.jpg',2567),(69,1000,'image_2568.jpg','image_2568.jpg',2568),(72,1000,'image_2571.jpg','image_2571.jpg',2571),(73,67711,'24015420_p.gif','10ef5330-67ac-43e0-8275-1623bb149220_24015420_p.gif',2572),(74,16806,'24013237_p.gif','79fef8c6-5d63-4d97-bc63-ca893eb6d854_24013237_p.gif',2573),(75,54921,'24013174_p.gif','1cae2861-f0ed-46bf-a801-96f8a1ce096e_24013174_p.gif',2574);
-- 2024.11.01 VISIT 테이블 UPDATE
INSERT INTO visit (id,time_zone,visit_time,weekday,company_id,exhibition_id,user_id) VALUES(1,1,'2024-10-30 08:30:00',1,1,1,6),(2,2,'2024-10-31 10:15:00',2,1,1,7),(3,3,'2024-11-01 12:45:00',3,1,1,8),(4,4,'2024-11-02 14:30:00',4,1,1,9),(5,5,'2024-11-03 16:05:00',5,1,1,10),(6,6,'2024-11-04 19:30:00',6,1,1,11),(7,7,'2024-10-29 09:00:00',7,1,1,12),(8,1,'2024-10-30 10:45:00',1,1,1,13),(9,2,'2024-11-01 11:30:00',2,1,1,14),(10,3,'2024-11-02 13:15:00',3,1,1,15),(11,4,'2024-11-03 15:00:00',4,1,1,16),(12,5,'2024-11-04 18:00:00',5,1,1,17),(13,6,'2024-10-30 08:45:00',6,1,1,18),(14,7,'2024-10-31 13:00:00',7,1,1,19),(15,1,'2024-11-01 12:00:00',1,1,1,20),(16,2,'2024-11-02 10:30:00',2,1,1,21),(17,3,'2024-11-03 14:15:00',3,1,1,22),(18,4,'2024-11-04 15:45:00',4,1,1,23),(19,5,'2024-10-29 09:30:00',5,1,1,24),(20,6,'2024-10-30 18:15:00',6,1,1,25),(21,7,'2024-10-31 20:05:00',7,1,1,26),(22,1,'2024-11-01 10:00:00',1,1,1,27),(23,2,'2024-11-02 12:30:00',2,1,1,28),(24,3,'2024-11-03 11:45:00',3,1,1,29),(25,4,'2024-11-04 14:30:00',4,1,1,30),(26,5,'2024-10-30 17:15:00',5,1,1,31),(27,6,'2024-10-31 10:30:00',6,1,1,32),(28,7,'2024-11-01 21:00:00',7,1,1,33),(29,1,'2024-11-02 09:15:00',1,1,1,34),(30,2,'2024-11-03 12:00:00',2,1,1,35),(31,3,'2024-11-04 18:45:00',3,1,1,36),(32,4,'2024-10-29 11:30:00',4,1,1,37),(33,5,'2024-10-30 16:30:00',5,1,1,38),(34,6,'2024-10-31 19:00:00',6,1,1,39),(35,7,'2024-11-01 14:15:00',7,1,1,40),(36,1,'2024-11-02 15:30:00',1,1,1,41),(37,2,'2024-11-03 12:45:00',2,1,1,42),(38,3,'2024-11-04 20:00:00',3,1,1,43),(39,4,'2024-10-30 10:00:00',4,1,1,44),(40,5,'2024-10-31 13:30:00',5,1,1,45),(41,6,'2024-11-01 11:00:00',6,1,1,46),(42,7,'2024-11-02 19:15:00',7,1,1,47),(43,1,'2024-11-03 09:45:00',1,1,1,48),(44,2,'2024-11-04 12:15:00',2,1,1,49),(45,3,'2024-10-30 15:00:00',3,1,1,50),(46,4,'2024-10-31 08:30:00',4,1,1,51),(47,5,'2024-11-01 14:30:00',5,1,1,52),(48,6,'2024-11-02 19:45:00',6,1,1,53),(49,7,'2024-11-03 11:30:00',7,1,1,54),(50,1,'2024-11-04 20:30:00',1,1,1,55),(51,2,'2024-10-29 16:00:00',2,1,1,56),(52,3,'2024-10-30 09:00:00',3,1,1,57),(53,4,'2024-10-31 10:45:00',4,1,1,58),(54,5,'2024-11-01 12:15:00',5,1,1,59),(55,6,'2024-11-02 13:00:00',6,1,1,60),(56,7,'2024-11-03 17:30:00',7,1,1,61),(57,1,'2024-11-04 19:00:00',1,1,1,62),(58,2,'2024-10-29 08:45:00',2,1,1,63),(59,3,'2024-10-30 14:30:00',3,1,1,64),(60,4,'2024-10-31 16:15:00',4,1,1,65),(61,5,'2024-11-01 18:00:00',5,1,1,66),(62,6,'2024-11-02 21:30:00',6,1,1,67),(63,7,'2024-11-03 10:00:00',7,1,1,68),(64,1,'2024-11-04 12:45:00',1,1,1,69),(65,2,'2024-10-29 09:15:00',2,1,1,70),(66,3,'2024-10-30 11:30:00',3,1,1,71),(67,4,'2024-10-31 19:15:00',4,1,1,72),(68,5,'2024-11-01 14:30:00',5,1,1,73),(69,6,'2024-11-02 08:00:00',6,1,1,74),(70,7,'2024-11-03 20:15:00',7,1,1,75),(71,1,'2024-11-04 13:30:00',1,1,1,76),(72,2,'2024-10-29 15:00:00',2,1,1,77),(73,3,'2024-10-30 12:00:00',3,1,1,78),(74,4,'2024-10-31 10:15:00',4,1,1,79),(75,5,'2024-11-01 19:30:00',5,1,1,80),(76,6,'2024-11-02 17:00:00',6,1,1,81),(77,7,'2024-11-03 21:00:00',7,1,1,82),(78,1,'2024-11-04 12:00:00',1,1,1,83),(79,2,'2024-10-29 16:45:00',2,1,1,84),(80,3,'2024-10-30 09:30:00',3,1,1,85),(81,4,'2024-10-31 14:30:00',4,1,1,86),(82,5,'2024-11-01 19:45:00',5,1,1,87),(83,6,'2024-11-02 18:00:00',6,1,1,88),(84,7,'2024-11-03 10:15:00',7,1,1,89),(85,1,'2024-11-04 21:15:00',1,1,1,90);
