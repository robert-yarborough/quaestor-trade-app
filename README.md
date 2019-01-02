#Acquia lightning Kickstart template

Here is a template for local environment for creating pipelines and testing. It is a combination of [Acquia Lightning distribution](https://github.com/acquia/lightning) and [Docker4Drupal Environment](https://github.com/wodby/docker4drupal). So please refer that docs if you have any question

#Topics
- [Requirements](#markdown-header-requirements) 
- [Local setup (from scratch)](#markdown-header-from-scratch-local-install)
- [Setup with existing database](#markdown-header-setup-with-existing-database)
- [Checking code styles](#markdown-header-checking-code-styles)
- [Working with drush aliases](#markdown-header-working-with-drush-aliases)
- [Building theme](#markdown-header-building-theme)
- [Testing](#markdown-header-testing)
- [Pipelines](#markdown-header-pipelines)
- [Bitbucket Pipelines](#markdown-header-bitbucket-pipelines)
- [Acquia aliases](#markdown-header-acquia-aliases)
 
## Requirements

- [Docker](https://docs.docker.com/install)
- [Docker compose](https://docs.docker.com/compose/install/#install-compose)

### From scratch local install

- Clone repository
- Remove .git/ folder
- Setup environment. See and edit (if needed) .env file in the root folder.
- Run `docker-compose up -d` in the root folder.
- You should see something like:
```bash 
$ docker-compose up -d 
Creating network "<PROJECT_NAME>_default" with the default driver
Creating <PROJECT_NAME>_traefik   ... done
Creating <PROJECT_NAME>_mailhog   ... done
Creating <PROJECT_NAME>_php       ... done
Creating <PROJECT_NAME>_portainer ... done
Creating <PROJECT_NAME>_mariadb   ... done
Creating <PROJECT_NAME>_nginx     ... done
```
- Enter in the container: `docker exec -it <PROJECT_NAME>_php bash` (Don't forget to replace container name on the yours)
- Run `sh scripts/develop/install.sh`. (Press enter if script asks anything)
- If everything went correct you will see something like
```bash  
[OK] Your Drupal 8 installation was completed successfully
```
or
```bash
[OK] Done clearing cache(s).
```

- Add row `127.0.0.1 drupal.localhost:8000` (optional) For the newest docker it doesn't needed anymore
- That's it. visit your  `http://drupal.localhost:8000/user/login` (admin/1111)
 
The URL could be different if you change .env file. **You also can work with `drush`, `drupal console`, `composer` and all needed features** use opened terminal for that.

## Setup with existing database
ToDo.

## Checking code styles
Please do that before any commits.

1. Enter to you php container `docker exec -it <PROJECT_NAME>_php bash`
2. run `sh scripts/qa/phpcs_local.sh`
3. You will see report if you code has errors or warnings. **Note!** Some part of your code will be autofixed using [phpcbf](https://github.com/squizlabs/PHP_CodeSniffer)

## Working with drush aliases

1. Set up host parameters./drush/sites/dev.site.yml
2. Create somewhere folder with .ssh keys. This folder will be linked to the Docker image
3. Rename `example.docker-compose.override.yml` to `docker-compose.override.yml`
4. Replace <PATH_TO_YOUR_SSH_KEYS_FOLDER> in the `docker-compose.override.yml` on the path from #2
###### Drush use cases and troubleshooting
- `drush cc drush` - clean drush cache
- `drush sa` - see all available aliases
- `drush @alias <command>` - run `<command>` on the remote environment `@alias`. Examples:
  - `drush @alias status` - see project status;
  - `drush sql-sync @alias @self` - download database from the @alias and import to the current environment **Note! It will destroy all your changes in the DB. READ ALL DRUSH MESSAGES**;
  - `drush rsync @alias:%files @self:%files` **Note! It could wipe out files. READ ALL DRUSH MESSAGES**;
    
##Building theme
ToDo.

##Testing
ToDo.

##Pipelines
ToDo.

##Bitbucket pipelines
ToDo.

##Acquia aliases
ToDo.