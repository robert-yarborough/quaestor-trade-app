<?php
/**
 * This is an example for drush <=8.
 * Note! This command won't work with drush >=9.
 */
$aliases['dev'] = array(
  'uri' => 'http://my-site.com/', // Site base url
  'root' => '/var/www/httpdocs/docroot', // Path to the root folder
  'remote-host' => 'host.com', // Host address (IP address is acceptable)
  'remote-user' => 'user', // User login
  'ssh-options' => '-p 5012',
  'os' => 'Linux',
  'path-aliases' => array(
    '%files' => 'sites/default/files',
  ),
  'command-specific' => array(
    'sql-sync' => array(
      'no-dump' => TRUE,
    ),
  ),
);

