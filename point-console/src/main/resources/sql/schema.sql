create table if not exists t_agent(
    id INTEGER PRIMARY KEY NOT NULL,
    host TEXT not null,
    port int not null,
    online_date datetime,
    offline_date datetime
);