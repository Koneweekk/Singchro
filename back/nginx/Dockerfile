FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf
COPY singchro.conf /etc/nginx/sites-enabled/singchro.conf

CMD ["cd"]
CMD ["mkdir", "log"]
CMD ["touch", "access.log"]
CMD ["nginx", "-g", "daemon off;"]
