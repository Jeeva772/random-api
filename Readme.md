#API

* BatchUpdate data from Random-api
    > get http://localhost:8000/batchUpdate
* Get Users
    > get http://localhost:8000/users

Steps for docker setup:
1. Bild and creating the docker image
    * App:
        > cd app
        >docker build . -t app
    * Api:
        > cd api
        >docker build . -t api
2. start the application
    > docker-compose up
3. To check the running containers
    > docker ps 
4. To check the docker logs
    > docker logs <containerId>
5. To kill the running container
    > docker kill <containerId>
6. To remove docker image 
    > docker image rm -f <imageId>
7. To go into the container
    > docker exec -u 0 -it <containerid> /bin/bash