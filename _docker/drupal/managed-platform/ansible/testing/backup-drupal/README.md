### Testing for backup-env.yml Ansible Playbook

This directory provides a `docker-compose` environment for testing the `backup-drupal.yml` playbook.

To get to the point where you can run the `backup-drupal.yml` Ansible playbook, use the following:

```bash
docker-compose pull
docker-compose build
docker-compose run --rm local_seed
docker-compose run --rm bootstrap_env
```

Finally, then use:

```bash
docker-compose run --rm backup_drupal
```

This will drop you into a `bash` shell inside the container within the `/ansible` directory. All the playbooks are mounted
as a volume so you can edit them within your favourite ide and changes should be instantly reflected within the container.

#### Check the database is running

Before you try running the `backup-env.yml` playbook, just check the database is running:

```bash
mysql -u root -h mysql --password="password" -e "show databases;"
```

Assuming the above returns OK, you're good to run the backups:

```bash
ansible-playbook backup-drupal.yml
```

*Note:* By default nothing is pushed to S3 from the local dev environment. If you want to ensure that the S3 push is working, 
you'll need to update [env.yml](../env.yml) with a valid S3 access token and bucket location. **DO NOT USE** the prod S3 bucket to test
out backups or "bad things" will likely happen.