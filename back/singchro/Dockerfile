From python:3

ENV PYTHONUNBUFFERED 1

RUN mkdir /srv/server
ADD . /srv/server
WORKDIR /srv/server
COPY ./wait-for-it.sh .

RUN echo "Acquire::Check-Valid-Until \"false\";\nAcquire::Check-Date \"false\";" | cat > /etc/apt/apt.conf.d/10no--check-valid-until
RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get install -y pip
RUN apt-get -y install systemd
RUN pip install --upgrade pip

COPY ./uwsgi/uwsgi.service /etc/systemd/system/uwsgi.service

EXPOSE 8000

RUN pip install -r requirements.txt
#RUN python manage.py collectstatic --no-input
CMD ["python", "manage.py", "collectstatic", "--no-input"]

#ONBUILD RUN set -xe \
#    && chmod +x .wait-fot-it.sh \
#    && ./wait-for-it.sh db:3306 -t 1000 \
#    && python manage.py makemigrations \
#    && python manage.py migrate
# CMD ["chmod", "+x", ".wait-for-it.sh"]
# CMD ["./wiat-for-it.sh", "db:3306", "-t", "1000"]
# CMD ["python", "manage.py", "makemigrations"]
# CMD ["python", "manage.py", "migrate"]

WORKDIR /srv/server/singchro/uwsgi
CMD ["uwsgi", "--ini", "/srv/server/singchro/uwsgi/uwsgi.ini"]

##RUN python manage.py makemigrations
##RUN python manage.py migrate
#CMD ["systemctl" , "start", "uwsgi"]
#CMD ["systemctl", "enable", "uwsgi"]
#CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
