# magma

To run services:

* Create .env file in main directory (same level as docker-compose.yml file) as shown in .env.example

Then: 
* Run commands:
```
docker network create magma;
docker-compose up -d;
```


or
* Run runServices.sh script
```
bash runServices.sh
```