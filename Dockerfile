FROM mcr.microsoft.com/mssql/server

ENV ACCEPT_EULA=Y
ENV SA_PASSWORD=YourStrongPassword123

WORKDIR /usr/src/app

COPY ./db_scripts/schema.sql /usr/src/app/schema.sql

CMD /opt/mssql-tools/bin/sqlcmd -S database -U SA -P MyStrongPassword123 -d Pizzeria -i /usr/src/app/schema.sql
