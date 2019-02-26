### Testing for bootstrap-env.yml Ansible Playbook

This directory provides a `docker-compose` environment for testing the `boostrap-drupal.yml` playbook.

To use this directory for testing, the following is required:

```bash
docker-compose build --pull
```

and then:

```bash
docker-compose run --rm local_seed
docker-compose run --rm bootstrap_env
```

This will ensure that you have the latest production DB dump and config in your development environment

Next run the following:

```bash
docker-compose run --rm bootstrap_drupal
```

This will drop you into a `bash` shell where you can apply the playbook using `ansible-playbook bootstrap-drupal.yml`.


All Ansible configuration is mounted into the container as a volume, so you can edit them in your favourite IDE
and then re-run the playbook in the container.