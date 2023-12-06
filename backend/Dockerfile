FROM python:3.9.12

WORKDIR /app

COPY . .

# RUN pip install --upgrade pip
RUN pip install flask
# RUN pip install requests
RUN pip install psycopg2
RUN pip install psycopg2
RUN pip install flask-cors
RUN pip3 install cloudinary
RUN pip3 install python-dotenv

EXPOSE 5555

CMD ["python3", "-u", "webapp.py", "functionality.py"]
