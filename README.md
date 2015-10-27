OSFA WordPress Repo
===================

This repository houses the bulk of the OSFA WordPress site code. Not included in this repository are:

1. Uploaded media.
2. Database contents.
3. The wp-config.php file.


30 Second WordPress Site Recovery Procedure
-------------------------------------------

In the event of an intrusion or other disruption, this site may be recovered from source/backup in approximately thirty seconds.

### Prerequisites

This procedure:

1. requires a *complete* backup as produced by the [BackUpWordPress plugin](https://wordpress.org/plugins/backupwordpress/). A complete backup includes the word "complete" in the zip file name.
2. that the database has been created, and the database name and credentials are the same as on the original install.
3. that the web path is the same as on the original install.

### Procedure

```
$ wget https://github.com/UWEnrollmentManagement/OSFAWordpress/archive/master.zip
$ unzip master
$ rm master.zip
$ mv master blog
$ ./blog/recovery.sh /path/to/complete-backup.zip
```
