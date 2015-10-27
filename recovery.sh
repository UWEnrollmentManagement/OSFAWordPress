while getopts u:d:p:f: option
  do case "${option}" in 
  o) OLDPATH=${OPTARG};;
  n) NEWPATH=${OPTARG};;
  esac
done

# TODO:
# If both old path and new path are set, then do a search and replace
# in the sql to effect a domain migration.


mv OSFAWordpress-master blog;

unzip $1 -d backup;

mv backup/wp-config.php wp-config.php;
mv backup/wp-content/upgrade wp-content/upgrade;
mv backup/wp-content/uploads wp-content/uploads;
mv backup/wp-content/cache wp-content/cache;

WPDBNAME=`cat wp-config.php | grep DB_NAME | cut -d \' -f 4`
WPDBUSER=`cat wp-config.php | grep DB_USER | cut -d \' -f 4`
WPDBPASS=`cat wp-config.php | grep DB_PASSWORD | cut -d \' -f 4`
WPSQLBACKUP=`ls backup/database*.sql | head`

mysql -u $WPDBNAME -p$WPDBPASS < $WPSQLBACKUP;

rm -rf backup;
