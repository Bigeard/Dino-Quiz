FROM mongo

COPY data.json /data.json
CMD mongoimport -h="mongo_quiz" -d="quiz" -c="questions" --file="./data.json"
