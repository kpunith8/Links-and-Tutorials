## SQL Developer: Oracle PL/SQL:

### Shortcuts:

- `F9` - To execute the query

- `Ctrl + Shift + <1-10>` - To add a bookmark in the editor (maximum of 10 bookmarks can be added)
  right click on bookmark and select toggle bookmark to remove it.

- `Ctrl + <1-10>` - Navigates to the bookmark number saved before.

### Connecting to DB:

- `TNSNAMES.ORA` - configuration file, has addresses

- `TNS_ADMIN` system variable needs to be set in windows environment variables to use '.ora' files, specify the path where '.ora' file resides, this can
  also be set in preferences -> database -> advanced section

- It can used in while connecting to db, connections can be exported and imported

### Browsing the DB, Creating, and Modifying Objects:

- Add Foreign key to the table - Select the table -> in the Worksheet - select constraints tab -> select actions -> constraint --> Add foreign key

- Add Sequence - go to sequences and add one starting with any number - compile it

- Add Triggers - go to triggers - Create a new triger - name it - Choose Base Object as table name you want, Timing as BEFORE, select INSERT event,
  un-check statement level option - press ok - it opens newly created trigger

- Add the custom code between BEGIN and END for ex: SELECT orders_SEQ.nextval INTO :NEW.*ORDER_ID* from dual;
