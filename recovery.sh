# wget https://github.com/UWEnrollmentManagement/OSFAWordpress/archive/master.zip;
# unzip master.zip;
# rm master.zip;

mv OSFAWordpress-master blog;

unzip $1 -d backup;

mv backup/wp-config.php wp-config.php;
mv backup/wp-content/upgrade wp-content/upgrade;
mv backup/wp-content/uploads wp-content/uploads;
mv backup/wp-content/cache wp-content/cache;

# TODO:
# Grab MySQL credentials from wp-config.php
# Restore database
# Maybe a command for domain migration?!?

rm -rf backup;
