# ucm-sql-cli

![My Gif](https://media.giphy.com/media/wtpIw2SckoyuBB1lY6/giphy.gif)

# UCM SQL CLI

A Node.js package to query Cisco UCM from your command line.

Do you often access your Cisco UCM platform CLI to run SQL queries against the admin database?  If so, this package will make that process a little easier.  This package leverages the UCM AXL API to query the database and store the results in a csv file on your system.  You can save your UCM server settings and query multiple systems in one shot.


### Prerequisites

- An account configured in your UCM servers with the AXL API role.
- [node and npm](https://nodejs.org/en/)


### Installing

```
npm install -g ucm-sql-cli
```

Note - if you've just installed node and npm, you might receive some `EACCESS` permission errors when installing this package globally.  If you do, check out [this page](https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally) for the fix.

### Usage

Add UCM Servers

```
ucm-sql --add [-a]
```

Remove UCM Servers

```
ucm-sql --remove [-r]
```

List UCM Servers

```
ucm-sql --list [-l]
```

Query the server(s)

```
ucm-sql
```

### TODO

- **Handle AXL throttle response**:  If your query results are too large, the AXL API will send a throttle response and the query needs to be broken up into multiple queries.  Support for this will come soon.

- **Edit Servers feature**
- **Test on Windows**
