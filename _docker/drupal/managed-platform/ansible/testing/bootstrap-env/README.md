### Testing for bootstrap-env.yml Ansible Playbook

This directory provides a `docker-compose` environment for testing the `bootstrap-env.yml` playbook.

To use this directory for testing, the following is required:

```bash
docker-compose build --pull
```

and then:

```bash
docker-compose run --rm local_seed
```

This will ensure that you have the latest production DB dump and config in your development environment

Next run the following:

```bash
docker-compose run --rm bootstrap_env
```

This will drop you into a `bash` shell where you can apply the playbook using `ansible-playbook bootstrap-env.yml`.

Before running the playbook, it's worth checking that the database is up an running first:

```bash
mysql -h mysql -u root --password=password -e "show databases;"
```

Once that command executes successfully, you're clear to run the playbook with:

```bash
ansible-playbook bootstrap-env.yml
```

All Ansible configuration is mounted into the container as a volume, so you can edit them in your favourite IDE
and then re-run the playbook in the container.

#### Simulating another deployment

To simulate a 2nd deployment, you just can just re-run the seed process and then the playbook with the value of the
environment variable `DRUPAL_DEPLOYMENT_ID` set to something else e.g:

```bash
> docker-compose run --rm -e DRUPAL_DEPLOYMENT_ID=2 local_seed
```

and then:

```bash
docker-compose run --rm -e DRUPAL_DEPLOYMENT_ID=2 bootstrap_env
ansible-playbook bootstrap-env.yml
``` 